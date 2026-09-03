interface ResetPasswordTemplateProps {

    username: string;

    resetUrl: string;

}

export function resetPasswordTemplate({

    username,

    resetUrl

}: ResetPasswordTemplateProps) {

    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8" />
                <title>Reset Your Password</title>
            </head>
            <body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center" style="padding:40px 20px;">
                            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;padding:40px;">
                                <tr>
                                    <td align="center">
                                        <h1 style="margin:0;color:#2563eb;">
                                            Trader Pro
                                        </h1>
                                        <p style="margin-top:10px;color:#6b7280;">
                                            Password Reset Request
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-top:30px;">
                                        <p>
                                            Hi <strong>${username}</strong>,
                                        </p>
                                        <p>
                                            We received a request to reset your password.
                                        </p>
                                        <p>
                                            Click the button below to create a new password.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding:35px 0;">
                                        <a
                                        href="${resetUrl}"
                                        style="
                                        display:inline-block;
                                        background:#2563eb;
                                        color:#ffffff;
                                        text-decoration:none;
                                        padding:14px 28px;
                                        border-radius:8px;
                                        font-weight:bold;
                                        ">
                                            Reset Password
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>
                                            This link will expire in <strong>30 minutes</strong>.
                                        </p>
                                        <p>
                                            If you didn't request a password reset, you can safely ignore this email.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-top:30px;color:#9ca3af;font-size:14px;">
                                        Thanks,
                                        <br>
                                        Trader Pro Team
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