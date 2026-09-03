import { ENV } from "@/lib/config/env";

type VerifyEmailTemplateProps = {
    username: string;
    verificationUrl: string;
};

export function verifyEmailTemplate({
    username,
    verificationUrl,
}: VerifyEmailTemplateProps) {

    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>Verify Your Email</title>
        </head>

        <body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;">

            <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                    <td align="center">

                    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;margin:40px 0;border-radius:10px;overflow:hidden;">

                        <tr>
                            <td style="background:#111827;padding:30px;text-align:center;">
                                <h1 style="margin:0;color:#ffffff;">
                                    ${ENV.APP_NAME}
                                </h1>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding:40px;">

                                <h2 style="margin-top:0;color:#111827;">
                                    Hello ${username},
                                </h2>

                                <p style="font-size:16px;color:#4b5563;line-height:1.8;">
                                    Thank you for creating your account.
                                    Please verify your email address by clicking the button below.
                                </p>

                                <div style="text-align:center;margin:40px 0;">

                                    <a
                                    href="${verificationUrl}"
                                    style="
                                    background:#2563eb;
                                    color:#ffffff;
                                    padding:14px 28px;
                                    text-decoration:none;
                                    border-radius:8px;
                                    display:inline-block;
                                    font-weight:bold;
                                    ">

                                        Verify Email

                                    </a>

                                </div>

                                <p style="font-size:14px;color:#6b7280;">
                                    If you didn't create this account, you can safely ignore this email.
                                </p>

                                <hr style="margin:40px 0;border:none;border-top:1px solid #e5e7eb;">

                                <p style="font-size:13px;color:#9ca3af;">
                                    © ${new Date().getFullYear()} ${ENV.APP_NAME}.
                                    All rights reserved.
                                </p>

                            </td>
                        </tr>

                    </table>

                    </td>
                </tr>
            </table>

        </body>
    </html>
    `;

}