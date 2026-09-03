"use client";

import Link from "next/link";
import { MailCheck, RefreshCcw } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckEmailPage() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {

        if (cooldown <= 0) {

            return;

        }

        const timer = setTimeout(() => {

            setCooldown((prev) => prev - 1);

        }, 1000);

        return () => clearTimeout(timer);

    }, [cooldown]);

    const handleResendVerification = async () => {
        if (!email) {
            setError("Email not found.");
            return;
        }
        try {
            setLoading(true);
            setMessage("");
            setError("");
            const response = await fetch("/api/auth/resend-verification", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email
                })
            });
            const result = await response.json();
            if (!response.ok) {
                setError(result.message);
                return;
            }
            setMessage(result.message);
            setCooldown(60);
        }
        catch {
            setError("Something went wrong.");
        }
        finally {
            setLoading(false);
        }
    };
    return (
        <div>

            {/* Icon */}

            <div className="flex justify-center">

                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">

                    <MailCheck size={48} className="text-blue-600" />

                </div>

            </div>

            {/* Header */}

            <div className="mt-8 text-center">

                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Verify Your Email
                </h1>

                <p className="mt-4 text-gray-500 dark:text-gray-400">
                    We have sent a verification link to your email address.
                </p>

                <p className="mt-2 font-semibold text-blue-600">
                    {email ?? "your email address"}
                </p>

            </div>

            {/* Information */}

            <div className="mt-10 rounded-2xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">

                <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                    Next Steps
                </h2>

                <ul className="mt-4 space-y-3 text-sm text-gray-700 dark:text-gray-300">

                    <li>📧 Check your inbox for the verification email.</li>

                    <li>🔗 Click the verification link.</li>

                    <li>✅ Once verified, return here and continue.</li>

                </ul>

            </div>

            {/* Buttons */}

            <div className="mt-8 space-y-4">

                <button className="w-full rounded-xl bg-linear-to-r from-sky-600 via-blue-600 to-indigo-700 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    I have Verified My Email
                </button>

                <button
                    type="button"
                    onClick={handleResendVerification}
                    disabled={loading || cooldown > 0}
                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 py-4 font-semibold transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                    <RefreshCcw size={18} />

                    {
                    loading
                        ? "Sending..."
                        : cooldown > 0
                            ? `Resend in ${cooldown}s`
                            : "Resend Verification Email"
                    }

                </button>
                {message && (
                    <div className="rounded-lg bg-green-100 p-3 text-sm text-green-600 dark:bg-green-900/30 dark:text-green-400">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="rounded-lg bg-red-100 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                        {error}
                    </div>
                )}
            </div>

            {/* Footer */}

            <div className="mt-8 text-center">

                <p className="text-sm text-gray-500">
                    Wrong email?
                </p>

                <Link href="/signup" className="mt-2 inline-block font-semibold text-blue-600 hover:underline">
                    Back to Signup
                </Link>

            </div>

        </div>
    );
}