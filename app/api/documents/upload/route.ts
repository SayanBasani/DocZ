import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import path from "path";

import { requireUser } from "@/lib/auth/requireUser";
import { saveFile } from "@/lib/storage/local-storage";
import { prisma } from "@/lib/db/prisma";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

const ALLOWED_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".txt",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".zip",
  ".csv",
  ".xlsx",
  ".xls",
];

export async function POST(
  request: NextRequest
) {
  try {
    const user = await requireUser();

    const formData = await request.formData();

    const file = formData.get("file");

    const documentName =
      String(formData.get("documentName") || "").trim();

    const documentType =
      String(formData.get("documentType") || "OTHER");

    const caseReference =
      String(formData.get("caseReference") || "").trim();

    const description =
      String(formData.get("description") || "").trim();

    const tagsString =
      String(formData.get("tags") || "").trim();

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select a file.",
        },
        {
          status: 400,
        }
      );
    }

    if (!documentName) {
      return NextResponse.json(
        {
          success: false,
          message: "Document name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "The selected file is empty.",
        },
        {
          status: 400,
        }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: "Maximum file size is 50 MB.",
        },
        {
          status: 400,
        }
      );
    }

    const extension = path.extname(
      file.name
    ).toLowerCase();

    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      return NextResponse.json(
        {
          success: false,
          message: "This file type is not supported.",
        },
        {
          status: 400,
        }
      );
    }

    const allowedDocumentTypes = [
      "LEGAL_DOCUMENT",
      "INVESTIGATION_REPORT",
      "WITNESS_STATEMENT",
      "EVIDENCE",
      "CORRESPONDENCE",
      "OTHER",
    ];

    if (!allowedDocumentTypes.includes(documentType)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid document type.",
        },
        {
          status: 400,
        }
      );
    }

    const buffer = Buffer.from(
      await file.arrayBuffer()
    );

    const sha256 = crypto
      .createHash("sha256")
      .update(buffer)
      .digest("hex");

    const uniqueName =
      `${crypto.randomUUID()}${extension}`;

    const storedFilePath = await saveFile(
      user.id,
      uniqueName,
      buffer
    );

    const relativeStoragePath = path
      .relative(process.cwd(), storedFilePath)
      .replace(/\\/g, "/");

    const document = await prisma.document.create({
      data: {
        userId: user.id,

        name: documentName,

        originalName: file.name,

        storedName: uniqueName,

        mimeType:
          file.type || "application/octet-stream",

        extension,

        size: BigInt(file.size),

        storagePath: relativeStoragePath,

        sha256,

        type: documentType as
          | "LEGAL_DOCUMENT"
          | "INVESTIGATION_REPORT"
          | "WITNESS_STATEMENT"
          | "EVIDENCE"
          | "CORRESPONDENCE"
          | "OTHER",

        caseReference:
          caseReference || null,

        description:
          description || null,

        status: "ACTIVE",

        documentTags: {
          create: tagsString
            ? tagsString
                .split(",")
                .map((tag) => tag.trim().toLowerCase())
                .filter(Boolean)
                .filter(
                  (tag, index, array) =>
                    array.indexOf(tag) === index
                )
                .map((tag) => ({
                  name: tag,
                }))
            : [],
        },
      },

      include: {
        documentTags: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,

        documentId: document.id,

        action: "DOCUMENT_UPLOADED",

        ipAddress:
          request.headers.get("x-forwarded-for") ||
          request.headers.get("x-real-ip") ||
          null,

        userAgent:
          request.headers.get("user-agent") ||
          null,

        metadata: {
          originalName: file.name,
          size: file.size,
          mimeType:
            file.type || "application/octet-stream",
          sha256,
        },
      },
    });

    return NextResponse.json(
      {
        success: true,

        message: "Document uploaded successfully.",

        data: {
          id: document.id,

          name: document.name,

          originalName:
            document.originalName,

          type: document.type,

          size: document.size.toString(),

          caseReference:
            document.caseReference,

          tags: document.documentTags.map(
            (tag) => tag.name
          ),

          createdAt:
            document.createdAt,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "DOCUMENT_UPLOAD_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to upload document.",
      },
      {
        status: 500,
      }
    );
  }
}