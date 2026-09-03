import { cookies } from 'next/headers'
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '@/lib/auth/jwt';
import { prisma } from '@/lib/db/prisma';
import { setAccessTokenCookie, setAuthCookies } from './cookies';
import { hashToken } from './tokenHash';
import { ENV } from '../config/env';

export default async function refreshAccessToken() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken){ return null; }
    const tokenHash = hashToken(refreshToken);
    
    try {
        const payload = await verifyRefreshToken(refreshToken);
        const storedToken = await prisma.refreshToken.findUnique({ where:{tokenHash}});
        if (!storedToken) return null;

        if(storedToken.expiresAt < new Date()) {
            await prisma.refreshToken.delete({
                where: { id: storedToken.id, }
            })
            return null;
        };

        const user = await prisma.user.findUnique({
            where:{id:payload.userId as string},
        });
        if (!user){return null;}

        const accessToken = await generateAccessToken({ userId: user.id, email: user.email, role: user.role, })

        const newRefreshToken = await generateRefreshToken({ userId: user.id, email: user.email, role: user.role, });
        
        await prisma.refreshToken.delete({ where: { id: storedToken.id, } });
        
        const newTokenHash = hashToken(newRefreshToken);
        await prisma.refreshToken.create({
            data: {
                tokenHash: newTokenHash,
                userId: user.id,
                expiresAt: new Date(
                    Date.now() + 1000 * 60 * 60 * 24 * ENV.REFRESH_TOKEN_EXPIRES_IN
                ),
            },
        });
        await setAuthCookies(accessToken, newRefreshToken);

        return accessToken;
        
    } catch (error) {
        console.error("Refresh token error:", error);
        return null;
    }
}

// old version 
export async function old_refreshAccessToken() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;
    if (!refreshToken){ return null; }
    const tokenHash = hashToken(refreshToken);
    try {
        const payload = await verifyRefreshToken(refreshToken);
        const storedToken = await prisma.refreshToken.findUnique({ where:{tokenHash}});
        if (!storedToken) return null;

        if(storedToken.expiresAt < new Date()) {
            await prisma.refreshToken.delete({
                where: { id: storedToken.id, }
            })
            return null;
        };

        const user = await prisma.user.findUnique({
            where:{id:payload.userId as string},
        });
        if (!user){return null;}

        const accessToken = await generateAccessToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        })
        await setAccessTokenCookie(accessToken);

        return accessToken;

    } catch (error) {
        console.error("Refresh token error:", error);
        return null;
    }
}
