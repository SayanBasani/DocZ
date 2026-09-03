"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Eye,
    EyeOff,
    Lock,
    ShieldCheck
} from "lucide-react";
import PasswordStrength from "@/componentS/auth/PasswordStrength";
import PasswordChecklist from "@/componentS/auth/PasswordChecklist";


export default function ResetPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const passwordScore = useMemo(() => {

        let score = 0;

        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return score;

    }, [password]);

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();
        setError("");
        setMessage("");
        if (!token) {
            setError("Invalid reset link.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(
                "/api/auth/reset-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        token,
                        password,
                        confirmPassword
                    })
                }
            );
            const result = await response.json();
            if (!response.ok) {
                setError(result.message);
                return;
            }
            setMessage(result.message);
            setTimeout(() => {
                router.push("/login");
            }, 2500);
        }
        catch { setError("Something went wrong."); }
        finally { setLoading(false); }
    }

    return (

        <div>
            <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">

                    <ShieldCheck
                        size={36}
                        className="text-blue-600"
                    />

                </div>

                <h1 className="mt-6 text-4xl font-bold text-gray-900 dark:text-white">

                    Reset Password

                </h1>

                <p className="mt-3 text-gray-500 dark:text-gray-400">

                    Create a strong password for your account.

                </p>

            </div>

            <form
                onSubmit={handleSubmit}
                className="mt-10 space-y-6"
            >

                <div>

                    <label className="mb-2 block font-medium">

                        New Password

                    </label>

                    <div className="flex items-center rounded-xl border border-gray-300 bg-gray-50 px-4 dark:border-slate-700 dark:bg-slate-800">

                        <Lock
                            size={18}
                            className="text-gray-400"
                        />

                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => {

                                setPassword(e.target.value);

                                if (error) setError("");

                            }}
                            placeholder="Enter new password"
                            required
                            className="w-full bg-transparent px-3 py-4 outline-none"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                        >

                            {
                                showPassword
                                    ? <EyeOff size={18} />
                                    : <Eye size={18} />
                            }

                        </button>

                    </div>

                </div>

                <div>

                    <label className="mb-2 block font-medium">

                        Confirm Password

                    </label>

                    <div className="flex items-center rounded-xl border border-gray-300 bg-gray-50 px-4 dark:border-slate-700 dark:bg-slate-800">

                        <Lock
                            size={18}
                            className="text-gray-400"
                        />

                        <input
                            type={
                                showConfirmPassword
                                    ? "text"
                                    : "password"
                            }
                            value={confirmPassword}
                            onChange={(e) => {

                                setConfirmPassword(e.target.value);

                                if (error) setError("");

                            }}
                            placeholder="Confirm password"
                            required
                            className="w-full bg-transparent px-3 py-4 outline-none"
                        />

                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(
                                !showConfirmPassword
                            )}
                        >

                            {
                                showConfirmPassword
                                    ? <EyeOff size={18} />
                                    : <Eye size={18} />
                            }

                        </button>

                    </div>

                </div>

                <PasswordStrength score={passwordScore} />

                <PasswordChecklist password={password} />

                {

                    message &&

                    <div className="rounded-xl bg-green-100 p-4 text-green-700 dark:bg-green-900/20 dark:text-green-300">

                        {message}

                    </div>

                }

                {

                    error &&

                    <div className="rounded-xl bg-red-100 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-300">

                        {error}

                    </div>

                }

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-linear-to-r from-sky-600 via-blue-600 to-indigo-700 py-4 font-semibold text-white transition hover:shadow-xl disabled:opacity-60"
                >

                    {

                        loading

                            ? "Updating Password..."

                            : "Reset Password"

                    }

                </button>

            </form>

            <div className="mt-8 text-center">

                <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                >

                    <ArrowLeft size={18} />

                    Back to Login

                </Link>

            </div>

        </div>

    );

}