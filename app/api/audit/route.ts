import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { requireUser } from "@/lib/auth/requireUser";

export async function GET(request: NextRequest) {
  try {
    const user = await requireUser();

    const { searchParams } = new URL(request.url);

    const page = Math.max(
      Number(searchParams.get("page") || "1"),
      1
    );

    const limit = Math.min(
      Math.max(
        Number(searchParams.get("limit") || "20"),
        1
      ),
      100
    );

    const search = searchParams.get("search")?.trim() || "";
    const action = searchParams.get("action") || "";

    const skip = (page - 1) * limit;

    /*
     * USER:
     *   Can see only their own activity.
     *
     * ADMIN:
     *   Can see system-wide activity.
     */
    const where: any = {};

    if (user.role !== "ADMIN") {
      where.userId = user.id;
    }

    if (action) {
      where.action = action;
    }

    if (search) {
      where.OR = [
        {
          action: {
            contains: search,
          },
        },
        {
          document: {
            originalName: {
              contains: search,
            },
          },
        },
        {
          user: {
            username: {
              contains: search,
            },
          },
        },
        {
          user: {
            email: {
              contains: search,
            },
          },
        },
      ];
    }

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,

        include: {
          document: {
            select: {
              id: true,
              originalName: true,
              type: true,
            },
          },

          user: {
            select: {
              id: true,
              username: true,
              email: true,
              role: true,
            },
          },
        },
      }),

      prisma.auditLog.count({
        where,
      }),
    ]);

    return NextResponse.json({
      success: true,

      data: logs,

      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Audit Trail API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load audit trail.",
      },
      {
        status: 500,
      }
    );
  }
}