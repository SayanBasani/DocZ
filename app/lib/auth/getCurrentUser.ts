import { cookies } from "next/headers";

import { prisma } from "@/lib/db/prisma";

import { verifyAccessToken } from "@/lib/auth/jwt";

export async function getUserFromAccessToken(accessToken: string) {
    try {
        const payload = await verifyAccessToken(accessToken);

        const session = await prisma.refreshToken.findUnique({
            where: {
                id: payload.sessionId,
            },
        });

        if (!session) {
            return null;
        }

        if (session.revokedAt) {
            return null;
        }

        if (session.expiresAt < new Date()) {
            return null;
        }

        const user = await prisma.user.findUnique({
            where: {
                id: payload.userId,
            },
            include: {
                profile: true,
            },
        });

        if (!user) {
            return null;
        }

        if (
            user.passwordChangedAt &&
            payload.iat &&
            payload.iat * 1000 < user.passwordChangedAt.getTime()
        ) {
            return null;
        }

        return user;
    }
    catch {
        return null;
    }
}

export async function getCurrentUser() {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return null;
    }

    return await getUserFromAccessToken(accessToken);
}