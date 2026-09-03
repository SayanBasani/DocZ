import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { hashPassword } from "@/lib/password/password";
import { createEmailVerificationToken } from "@/lib/auth/verification";
import { sendMail } from "@/lib/auth/mail";
import { verifyEmailTemplate } from "@/lib/email/templates/verifyEmail";
import { ENV } from "@/lib/config/env";

export async function POST(request: Request) {

    try {

        const body = await request.json();

        const { email, username, password, confirmPassword, firstName, lastName } = body;
        // Required field
        if ( !email || !username || !password || !confirmPassword ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "All required fields must be provided."
                },
                { status: 400 }
            );
        }
        // Password match
        if (password !== confirmPassword) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Passwords do not match."
                },
                { status: 400 }
            );
        }
        // Email exists
        const existingEmail = await prisma.user.findUnique({
            where: { email }
        });

        if (existingEmail) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email already exists."
                },
                { status: 409 }
            );

        }

        // Username exists

        const existingUsername = await prisma.user.findUnique({

            where: { username }
        });

        if (existingUsername) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Username already exists."
                },
                { status: 409 }
            );
        }
        // Hash password
        const hashedPassword = await hashPassword(password);
        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
                profile: { create: { firstName, lastName } },
                status: "PENDING",
                emailVerified: false,
            },
            include: {
                profile: true
            }
        });
        console.log("User is created Sucessfully ",user);
        
        const verificationToken = await createEmailVerificationToken(user.id);

        const verificationUrl = `${ENV.APP_URL}/api/auth/verify-email?token=${verificationToken}`;
        
        console.log("verificationUrl ->",verificationUrl);
        
        const html = verifyEmailTemplate({ username: user.username, verificationUrl, });

        await sendMail({ to: user.email, subject: "Verify your email", html, });

        return NextResponse.json(
            {
                success: true,
                message: "Account created successfully. Please check your email to verify your account.",
                data: {
                    id: user.id,
                    email: user.email,
                    username: user.username
                }
            },
            { status: 201}
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