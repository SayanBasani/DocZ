import { NextResponse } from "next/server";

import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { clearAuthCookies } from "@/lib/auth/cookies";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { prisma } from "@/lib/db/prisma";

interface RouteContext {
    params: Promise<{
        sessionId: string;
    }>;
}

export async function DELETE(
    request: Request,
    { params }: RouteContext
) {

    try {

        const user = await getCurrentUser();

        if (!user) {
            await clearAuthCookies();

            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized.",
                },
                {
                    status: 401,
                }
            );
        }

        const { sessionId } = await params;

        const cookieStore = await cookies();

        const accessToken = cookieStore.get("accessToken")?.value;

        if (accessToken) {

            const payload = await verifyAccessToken(accessToken);

            if (payload.sessionId === sessionId) {

                return NextResponse.json(
                    {
                        success: false,
                        message: "Use the logout endpoint to logout your current device.",
                    },
                    {
                        status: 400,
                    }
                );

            }

        }

        const session = await prisma.refreshToken.findFirst({
            where: {
                id: sessionId,
                userId: user.id,
                revokedAt: null,
            },
        });

        if (!session) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Session not found.",
                },
                {
                    status: 404,
                }
            );

        }

        await prisma.refreshToken.update({
            where: {
                id: sessionId,
            },
            data: {
                revokedAt: new Date(),
                lastUsedAt: new Date(),
            },
        });

        return NextResponse.json({
            success: true,
            message: "Device logged out successfully.",
        });

    }
    catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Unable to logout device.",
            },
            {
                status: 500,
            }
        );

    }

}