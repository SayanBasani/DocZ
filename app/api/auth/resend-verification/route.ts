import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { createEmailVerificationToken } from "@/lib/auth/verification";
import { sendMail } from "@/lib/auth/mail";
import { verifyEmailTemplate } from "@/lib/email/templates/verifyEmail";
import { ENV } from "@/lib/config/env";

export async function POST(request: Request) {

    try {

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
            where: { email }
        });

        if (!user) {

            return NextResponse.json(
                {
                    success: false,
                    message: "User not found."
                },
                { status: 404 }
            );
        }

        if (user.emailVerified) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email is already verified."
                },
                { status: 400 }
            );
        }

        const verificationToken = await createEmailVerificationToken(user.id);

        const verificationUrl = `${ENV.APP_URL}/api/auth/verify-email?token=${verificationToken}`;

        const html = verifyEmailTemplate({
            username: user.username,
            verificationUrl
        });

        await sendMail({
            to: user.email,
            subject: "Verify your email",
            html
        });

        return NextResponse.json(
            {
                success: true,
                message: "Verification email sent successfully."
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