import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

import { prisma } from "@/lib/db/prisma";
import { requireUser } from "@/lib/auth/requireUser";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const user = await requireUser();

    const { id } = await context.params;

    const document =
      await prisma.document.findFirst({
        where: {
          id,
          userId: user.id,
          status: "ACTIVE",
        },
      });

    if (!document) {
      return NextResponse.json(
        {
          success: false,
          message: "Document not found.",
        },
        {
          status: 404,
        }
      );
    }

    const filePath = path.resolve(
      process.cwd(),
      document.storagePath
    );

    const fileBuffer =
      await fs.readFile(filePath);

    await prisma.auditLog.create({
      data: {
        userId: user.id,

        documentId: document.id,

        action: "DOCUMENT_DOWNLOADED",

        ipAddress:
          request.headers.get(
            "x-forwarded-for"
          ) || null,

        userAgent:
          request.headers.get(
            "user-agent"
          ) || null,
      },
    });

    return new NextResponse(
      fileBuffer,
      {
        status: 200,

        headers: {
          "Content-Type":
            document.mimeType,

          "Content-Disposition":
            `attachment; filename="${encodeURIComponent(
              document.originalName
            )}"`,

          "Content-Length":
            fileBuffer.length.toString(),

          "Cache-Control":
            "private, no-store",
        },
      }
    );
  } catch (error) {
    console.error(
      "DOCUMENT_DOWNLOAD_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to download document.",
      },
      {
        status: 500,
      }
    );
  }
}