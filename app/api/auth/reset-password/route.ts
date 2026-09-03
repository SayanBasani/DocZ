import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { prisma } from "@/lib/db/prisma";

function hashToken(token: string) {

    return crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

}

export async function POST(request: Request) {

    try {
        const body = await request.json();
        const { token, password, confirmPassword } = body;

        if ( !token || !password || !confirmPassword ) {

            return NextResponse.json(
                {
                    success: false,
                    message: "All fields are required."
                },
                { status: 400 }
            );
        }

        if (password !== confirmPassword) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Passwords do not match."
                },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Password must be at least 6 characters."
                },
                { status: 400 }
            );
        }

        const hashedToken = hashToken(token);
        const resetToken =
            await prisma.passwordResetToken.findUnique({
                where: { tokenHash: hashedToken },
                include: { user: true }
            });

        if (!resetToken) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid reset link."
                },
                { status: 400 }
            );
        }

        if (resetToken.expiresAt < new Date()) {
            await prisma.passwordResetToken.delete({
                where: { id: resetToken.id }
            });
            return NextResponse.json(
                {
                    success: false,
                    message: "Reset link has expired."
                },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        await prisma.$transaction([
            prisma.user.update({
                where: { id: resetToken.userId },
                data: { 
                    password: hashedPassword,
                    passwordChangedAt: new Date()
                }
            }),

            prisma.passwordResetToken.delete({
                where: { id: resetToken.id }
            }),

            prisma.refreshToken.deleteMany({
                where: { userId: resetToken.userId }
            })
        ]);

        return NextResponse.json(
            {
                success: true,
                message: "Password has been reset successfully."
            },
            { status: 200 }
        );
    }
    catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal server error."
            },
            { status: 500 }
        );
    }
}