import { prisma } from "@/lib/db/prisma";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} from "@/lib/auth/jwt";
import { hashToken } from "@/lib/auth/tokenHash";
import { ENV } from "../config/env";

type RefreshSessionResult = {
    accessToken: string;
    refreshToken: string;
};

export async function refreshSession(
    refreshToken: string,
    ipAddress?: string | null
): Promise<RefreshSessionResult> {

    const payload = await verifyRefreshToken(refreshToken);

    const hashedRefreshToken = hashToken(refreshToken);

    const session = await prisma.refreshToken.findUnique({
        where: {
            tokenHash: hashedRefreshToken,
        },
    });
    // console.log("Refresh payload:", payload);
    // console.log("Matched session:", session);
    if (!session) {
        throw new Error("Invalid refresh token.");
    }

    if (session.revokedAt) {
        throw new Error("Refresh token revoked.");
    }

    if (session.expiresAt < new Date()) {
        throw new Error("Refresh token expired.");
    }

    if (payload.userId !== session.userId) {
        throw new Error("Invalid refresh token.");
    }

    if (payload.sessionId !== session.id) {
        throw new Error("Invalid session.");
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.userId,
        },
    });

    if (!user) {
        throw new Error("User not found.");
    }

    const newAccessToken = await generateAccessToken({
        userId: user.id,
        email: user.email,
        role: user.role,
        sessionId: session.id,
    });

    const newRefreshToken = await generateRefreshToken({
        userId: user.id,
        email: user.email,
        role: user.role,
        sessionId: session.id,
    });

    const newHashedRefreshToken = hashToken(newRefreshToken);

    await prisma.refreshToken.update({
        where: {
            id: session.id,
        },
        data: {
            tokenHash: newHashedRefreshToken,
            lastUsedAt: new Date(),
            ipAddress: ipAddress ?? session.ipAddress,
            expiresAt: new Date(
                Date.now() +
                1000 * 60 * 60 * 24 * Number(ENV.REFRESH_TOKEN_EXPIRES_IN)
            ),
        },
    });

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
    };
}