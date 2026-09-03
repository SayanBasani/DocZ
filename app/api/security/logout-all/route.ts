import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { clearAuthCookies } from "@/lib/auth/cookies";

export async function POST() {

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
        const cookieStore = await cookies();

        const accessToken = cookieStore.get("accessToken")?.value;

        let currentSessionId: string | null = null;

        if (accessToken) {
            const payload = await verifyAccessToken(accessToken);
            currentSessionId = payload.sessionId;
        }

        await prisma.refreshToken.updateMany({
            where: {
                userId: user.id,
                revokedAt: null,
                id: {
                    not: currentSessionId ?? undefined,
                },
            },
            data: {
                revokedAt: new Date(),
                lastUsedAt: new Date(),
            },
        });

        return NextResponse.json({
            success: true,
            message: "Logged out from all other devices successfully.",
        });

    }
    catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Unable to logout from all devices.",
            },
            {
                status: 500,
            }
        );

    }

}