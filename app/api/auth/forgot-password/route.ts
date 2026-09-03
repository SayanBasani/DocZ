import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { createPasswordResetToken } from "@/lib/auth/passwordReset";
import { sendMail } from "@/lib/auth/mail";
import { resetPasswordTemplate } from "@/lib/email/templates/resetPassword";
import { ENV } from "@/lib/config/env";

export async function POST(request: Request) {

    try {
        console.log("sayan recive the req");
        const body = await request.json();
        const { email } = body;
        if (!email) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email is required."
                },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email: email.trim().toLowerCase() }
        });

        /**
         * Security:
         * Don't reveal whether the email exists.
         */

        if (!user) {
            return NextResponse.json(
                {
                    success: true,
                    message: "If an account exists, a password reset email has been sent."
                },
                { status: 200 }
            );
        }

        if (!user.emailVerified) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please verify your email before resetting your password."
                },
                { status: 400 }
            );
        }
        const resetToken = await createPasswordResetToken(user.id);
        const resetUrl =
            `${ENV.APP_URL}/reset-password?token=${resetToken}`;
            console.log(resetUrl);
        const html = resetPasswordTemplate({
            username: user.username,
            resetUrl
        });
        await sendMail({
            to: user.email,
            subject: "Reset your password",
            html
        });
        return NextResponse.json(
            {
                success: true,
                message: "If an account exists, a password reset email has been sent."
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