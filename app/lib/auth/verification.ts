import { randomBytes } from "crypto";
import { prisma } from "@/lib/db/prisma";
import { hashToken } from "@/lib/auth/tokenHash";

export async function createEmailVerificationToken(userId: string) {

    // Remove any old verification tokens
    await prisma.emailVerificationToken.deleteMany({
        where: {
            userId,
        },
    });

    // Generate a secure random token
    const token = randomBytes(32).toString("hex");

    // Hash the token before storing it
    const tokenHash = hashToken(token);

    // Token expires in 24 hours
    const expiresAt = new Date(
        Date.now() + 24 * 60 * 60 * 1000
    );

    await prisma.emailVerificationToken.create({
        data: {
            tokenHash,
            userId,
            expiresAt,
        },
    });

    // Return the raw token
    return token;

}