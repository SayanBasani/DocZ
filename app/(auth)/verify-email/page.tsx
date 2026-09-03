"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Clock3 } from "lucide-react";

export default function VerifyEmailPage() {

    const searchParams = useSearchParams();

    const status = searchParams.get("status");

    let title = "";
    let description = "";
    let icon = null;

    switch (status) {

        case "success":

            title = "Email Verified";

            description =
                "Your email has been verified successfully. You can now log in.";

            icon =
                <CheckCircle2 size={60} className="text-green-600" />;

            break;

        case "expired":

            title = "Verification Link Expired";

            description =
                "Your verification link has expired. Please request another email.";

            icon =
                <Clock3 size={60} className="text-yellow-500" />;

            break;

        default:

            title = "Invalid Verification Link";

            description =
                "The verification link is invalid or has already been used.";

            icon =
                <XCircle size={60} className="text-red-600" />;

    }

    return (

        <div className="text-center">

            <div className="flex justify-center">

                {icon}

            </div>

            <h1 className="mt-8 text-4xl font-bold">

                {title}

            </h1>

            <p className="mt-4 text-gray-500">

                {description}

            </p>

            <Link
                href="/login"
                className="mt-10 inline-block rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white"
            >

                Go to Login

            </Link>

        </div>

    );

}