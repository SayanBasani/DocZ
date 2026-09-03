"use client";

import Link from "next/link";
import { ArrowLeft, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();
    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        try {
            setLoading(true);
            setMessage("");
            setError("");
            const response = await fetch(
                "/api/auth/forgot-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email.trim().toLowerCase()
                    })
              }
            );
            const result = await response.json();
            if (!response.ok) {
                setError(result.message);
                return;
            }
            setMessage(result.message)
            router.replace(
                `/check-email?email=${encodeURIComponent(email)}&type=reset`
            );
        }
        catch {
            console.error(error);
            setError("Something went wrong. Please try again.");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div>

            {/* Header */}

            <div className="text-center">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <LockKeyhole size={36} className="text-blue-600" />
                </div>

                <h1 className="mt-6 text-4xl font-bold text-gray-900 dark:text-white">
                    Forgot Password?
                </h1>

                <p className="mt-3 text-gray-500 dark:text-gray-400">
                    Enter your registered email address and we will send you a secure password reset link.
                </p>

            </div>

            {/* Form */}

           <form onSubmit={handleSubmit} className="mt-10 space-y-6" >

                <div>

                    <label className="mb-2 block font-medium">
                        Email Address
                    </label>

                    <div className="flex items-center rounded-xl border border-gray-300 bg-gray-50 px-4 dark:border-slate-700 dark:bg-slate-800">

                        <Mail size={18} className="text-gray-400" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (message) setMessage("");
                                if (error) setError("");
                            }}
                            placeholder="example@email.com"
                            className="w-full bg-transparent px-3 py-4 outline-none"
                            required
                            disabled={loading}
                        />

                    </div>

                </div>

                <button 
                    type="submit" disabled={loading} 
                    // className="w-full rounded-xl bg-linear-to-r from-sky-600 via-blue-600 to-indigo-700 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    className={`w-full rounded-xl py-4 font-semibold text-white transition-all duration-300 ${
                        loading
                            ? "cursor-not-allowed opacity-70"
                            : "bg-linear-to-r from-sky-600 via-blue-600 to-indigo-700 hover:-translate-y-1 hover:shadow-xl"
                    }`}
                    >
                    {loading ? "Sending..." : "Send Reset Link"}
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
            </form>

            {/* Info Card */}

            <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-800 dark:bg-blue-900/20">

                <h2 className="font-semibold text-blue-700 dark:text-blue-300">
                    What happens next?
                </h2>

                <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">

                    <li>• We will send a secure password reset link to your email.</li>
                    <li>• The link expires in 30 minutes.</li>
                    <li>• The link can only be used once.</li>
                    <li>• Create your new password.</li>

                </ul>

            </div>

            {/* Back */}

            <div className="mt-8 text-center">

                <Link href="/login" className="inline-flex items-center gap-2 font-medium text-blue-600 transition hover:underline">

                    <ArrowLeft size={18} />

                    Back to Login

                </Link>

            </div>

        </div>
    );
}