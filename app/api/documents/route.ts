import { NextRequest, NextResponse } from "next/server";

import { requireUser } from "@/lib/auth/requireUser";
import { prisma } from "@/lib/db/prisma";

export async function GET(
  request: NextRequest
) {
  try {
    const user = await requireUser();

    const { searchParams } =
      new URL(request.url);

    const search =
      searchParams.get("search")?.trim() || "";

    const type =
      searchParams.get("type") || "";

    const caseReference =
      searchParams.get("caseReference")?.trim() || "";

    const page = Math.max(
      Number(searchParams.get("page")) || 1,
      1
    );

    const limit = Math.min(
      Math.max(
        Number(searchParams.get("limit")) || 20,
        1
      ),
      100
    );

    const skip = (page - 1) * limit;

    const where = {
      userId: user.id,

      status: {
        not: "DELETED" as const,
      },

      ...(type
        ? {
            type: type as
              | "LEGAL_DOCUMENT"
              | "INVESTIGATION_REPORT"
              | "WITNESS_STATEMENT"
              | "EVIDENCE"
              | "CORRESPONDENCE"
              | "OTHER",
          }
        : {}),

      ...(caseReference
        ? {
            caseReference: {
              contains: caseReference,
            },
          }
        : {}),

      ...(search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                },
              },
              {
                originalName: {
                  contains: search,
                },
              },
              {
                caseReference: {
                  contains: search,
                },
              },
              {
                description: {
                  contains: search,
                },
              },
              {
                documentTags: {
                  some: {
                    name: {
                      contains: search,
                    },
                  },
                },
              },
            ],
          }
        : {}),
    };

    const [documents, total] =
      await Promise.all([
        prisma.document.findMany({
          where,

          include: {
            documentTags: true,
          },

          orderBy: {
            createdAt: "desc",
          },

          skip,

          take: limit,
        }),

        prisma.document.count({
          where,
        }),
      ]);

    return NextResponse.json({
      success: true,

      data: {
        documents: documents.map(
          (document) => ({
            id: document.id,

            name: document.name,

            originalName:
              document.originalName,

            mimeType:
              document.mimeType,

            extension:
              document.extension,

            size:
              document.size.toString(),

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
          })
        ),

        pagination: {
          page,

          limit,

          total,

          totalPages:
            Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error(
      "DOCUMENT_LIST_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to retrieve documents.",
      },
      {
        status: 500,
      }
    );
  }
}