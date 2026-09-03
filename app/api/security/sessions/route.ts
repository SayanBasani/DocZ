import { NextResponse } from "next/server";

import { requireUser } from "@/lib/auth/requireUser";
import { prisma } from "@/lib/db/prisma";
import { parseUserAgent } from "@/lib/auth/session";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/auth/jwt";

export async function GET() {

    try {

        const user = await requireUser();

        const cookieStore = await cookies();

        const accessToken = cookieStore.get("accessToken")?.value;

        let currentSessionId: string | null = null;

        if (accessToken) {
            const payload = await verifyAccessToken(accessToken);
            currentSessionId = payload.sessionId;
        }

        const sessions = await prisma.refreshToken.findMany({
            where: {
                userId: user.id,
                revokedAt: null,
            },
            orderBy: {
                lastUsedAt: "desc",
            },
            select: {
                id: true,
                deviceId: true,
                deviceName: true,
                userAgent: true,
                ipAddress: true,
                createdAt: true,
                lastUsedAt: true,
                expiresAt: true,
            },
        });

        const formattedSessions = sessions.map((session) => {

            const parsed = parseUserAgent(session.userAgent);

            return {
                id: session.id,
                browser: parsed.browser,
                os: parsed.os,
                device: parsed.device,
                deviceName:
                    session.deviceName ||
                    parsed.deviceName,
                ipAddress: session.ipAddress ?? "Unknown",
                createdAt: session.createdAt,
                lastUsedAt: session.lastUsedAt,
                expiresAt: session.expiresAt,
                isCurrent: session.id === currentSessionId,
            };
        });

        return NextResponse.json({
            success: true,
            data: formattedSessions,
        });

    }
    catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Unable to load sessions.",
            },
            {
                status: 500,
            }
        );
    }
}