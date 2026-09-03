import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { comparePassword } from "@/lib/password/password";
import { generateAccessToken, generateRefreshToken } from "@/lib/auth/jwt";
import { setAuthCookies } from "@/lib/auth/cookies";
import { hashToken } from "@/lib/auth/tokenHash";
import { getDeviceId } from "@/lib/auth/device";
import { createId } from "@paralleldrive/cuid2";
import { ENV } from "@/lib/config/env";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;
        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: "Email and password are required." },
                { status: 400 }
            );
        }
        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            return NextResponse.json(
                { success: false, message: "Invalid email or password." },
                { status: 401 }
            );
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid email or password."
                },
                { status: 401 }
            );
        }
        if (user.status !== "ACTIVE") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Your account is not active."
                },
                {
                    status: 403
                }
            );
        }

        // const refreshToken = await generateRefreshToken({
        //     userId: user.id,
        //     email: user.email,
        //     role: user.role,
        // });

        const sessionId = createId();

        const accessToken = await generateAccessToken({
            userId: user.id,
            email: user.email,
            role: user.role,
            sessionId,
        });

        const refreshToken = await generateRefreshToken({
            userId: user.id,
            email: user.email,
            role: user.role,
            sessionId,
        });

        const hashedRefreshToken = hashToken(refreshToken);

        const userAgent = request.headers.get("user-agent") ?? "Unknown";

        const ipAddress =
            request.headers.get("x-forwarded-for") ??
            request.headers.get("x-real-ip") ??
            "Unknown";

        const deviceName = userAgent;

        await prisma.refreshToken.create({
            data: {
                id: sessionId,
                tokenHash: hashedRefreshToken,
                userId: user.id,
                deviceId: await getDeviceId(),
                deviceName,
                ipAddress,
                userAgent,
                expiresAt: new Date(
                    Date.now() +
                    1000 * 60 * 60 * 24 * Number(ENV.REFRESH_TOKEN_EXPIRES_IN)
                ),
                lastUsedAt: new Date(),
            },
        });

        await setAuthCookies(accessToken, refreshToken);
                
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                lastLogin: new Date()
            }
        });
        return NextResponse.json(
            {
                success: true,
                message: "Login successful.",
                user: {
                    id: user.id,
                    username: user.username,
                }
            },
            {
                status: 200
            }
        );
    }
    catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "Internal server error." },
            { status: 500 }
        );
    }
}