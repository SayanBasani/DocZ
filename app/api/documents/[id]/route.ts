import { NextRequest, NextResponse } from "next/server";

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
          status: {
            not: "DELETED",
          },
        },

        include: {
          documentTags: true,
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

    await prisma.auditLog.create({
      data: {
        userId: user.id,

        documentId: document.id,

        action: "DOCUMENT_ACCESSED",

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

    return NextResponse.json({
      success: true,

      data: {
        id: document.id,

        name: document.name,

        originalName:
          document.originalName,

        storedName:
          document.storedName,

        mimeType:
          document.mimeType,

        extension:
          document.extension,

        size:
          document.size.toString(),

        storagePath:
          document.storagePath,

        sha256:
          document.sha256,

        type:
          document.type,

        caseReference:
          document.caseReference,

        description:
          document.description,

        status:
          document.status,

        tags:
          document.documentTags.map(
            (tag) => tag.name
          ),

        createdAt:
          document.createdAt,

        updatedAt:
          document.updatedAt,
      },
    });
  } catch (error) {
    console.error(
      "DOCUMENT_DETAILS_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to retrieve document.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
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
          status: {
            not: "DELETED",
          },
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

    await prisma.document.update({
      where: {
        id: document.id,
      },

      data: {
        status: "DELETED",
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,

        documentId: document.id,

        action: "DOCUMENT_DELETED",

        ipAddress:
          request.headers.get(
            "x-forwarded-for"
          ) || null,

        userAgent:
          request.headers.get(
            "user-agent"
          ) || null,

        metadata: {
          originalName:
            document.originalName,
        },
      },
    });

    return NextResponse.json({
      success: true,

      message:
        "Document archived successfully.",
    });
  } catch (error) {
    console.error(
      "DOCUMENT_DELETE_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to archive document.",
      },
      {
        status: 500,
      }
    );
  }
}