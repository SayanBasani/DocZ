import nodemailer from "nodemailer";
import { ENV } from "@/lib/config/env";

const transporter = nodemailer.createTransport({
    host: ENV.SMTP_HOST,
    port: ENV.SMTP_PORT,
    secure: ENV.SMTP_PORT === 465,
    auth: {
        user: ENV.SMTP_USER,
        pass: ENV.SMTP_PASS,
    },
});

type SendMailProps = {
    to: string;
    subject: string;
    html: string;
};

export async function sendMail({
    to,
    subject,
    html,
}: SendMailProps) {

    await transporter.sendMail({
        from: `"${ENV.APP_NAME}" <${ENV.SMTP_USER}>`,
        to,
        subject,
        html,
    });

}