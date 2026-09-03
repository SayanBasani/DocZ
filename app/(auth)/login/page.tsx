"use client";

import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleLogin = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            const response = await fetch(
                "/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    credentials: "include",

                    body: JSON.stringify({
                        email: email.trim().toLowerCase(),
                        password,
                    }),
                }
            );


            const data = await response.json();


            if (!response.ok) {

                setError(
                    data.message || "Unable to sign in."
                );

                return;

            }


            router.replace("/home");

        }
        catch {

            setError(
                "Something went wrong. Please try again."
            );

        }
        finally {

            setLoading(false);

        }

    };


    return (

        <div className="text-slate-900 dark:text-white">

            {/* Header */}

            <div className="text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30">

                    <ShieldCheck size={28} />

                </div>


                <h1 className="mt-6 text-3xl font-bold sm:text-4xl">

                    Welcome Back to DocZ

                </h1>


                <p className="mx-auto mt-3 max-w-md text-gray-500 dark:text-gray-400">

                    Sign in to securely access your legal,
                    investigation and document workspace.

                </p>

            </div>


            {/* Form */}

            <form
                onSubmit={handleLogin}
                className="mt-9 space-y-5"
            >

                {/* Email */}

                <div>

                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-semibold"
                    >
                        Email Address
                    </label>


                    <div
                        className="
                            flex
                            items-center
                            rounded-xl
                            border
                            border-slate-300
                            bg-slate-50
                            px-4
                            transition
                            focus-within:border-blue-500
                            focus-within:ring-2
                            focus-within:ring-blue-500/10
                            dark:border-slate-700
                            dark:bg-slate-900
                        "
                    >

                        <Mail
                            size={19}
                            className="shrink-0 text-slate-400"
                        />


                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                            className="
                                w-full
                                bg-transparent
                                px-3
                                py-4
                                text-sm
                                outline-none
                                placeholder:text-slate-400
                            "
                        />

                    </div>

                </div>


                {/* Password */}

                <div>

                    <div className="mb-2 flex items-center justify-between">

                        <label
                            htmlFor="password"
                            className="text-sm font-semibold"
                        >
                            Password
                        </label>


                        <Link
                            href="/forgot-password"
                            className="text-sm font-medium text-blue-600 hover:underline"
                        >
                            Forgot Password?
                        </Link>

                    </div>


                    <div
                        className="
                            flex
                            items-center
                            rounded-xl
                            border
                            border-slate-300
                            bg-slate-50
                            px-4
                            transition
                            focus-within:border-blue-500
                            focus-within:ring-2
                            focus-within:ring-blue-500/10
                            dark:border-slate-700
                            dark:bg-slate-900
                        "
                    >

                        <Lock
                            size={19}
                            className="shrink-0 text-slate-400"
                        />


                        <input
                            id="password"
                            name="password"
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                            className="
                                w-full
                                bg-transparent
                                px-3
                                py-4
                                text-sm
                                outline-none
                                placeholder:text-slate-400
                            "
                        />


                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                            aria-label={
                                showPassword
                                    ? "Hide password"
                                    : "Show password"
                            }
                            className="
                                shrink-0
                                rounded-lg
                                p-1.5
                                text-slate-400
                                transition
                                hover:bg-slate-200
                                hover:text-slate-700
                                dark:hover:bg-slate-800
                                dark:hover:text-slate-200
                            "
                        >

                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}

                        </button>

                    </div>

                </div>


                {/* Remember Me */}

                <div className="flex items-center">

                    <label className="flex cursor-pointer items-center gap-2.5">

                        <input
                            type="checkbox"
                            className="
                                h-4
                                w-4
                                rounded
                                border-slate-300
                                text-blue-600
                                focus:ring-blue-500
                                dark:border-slate-600
                            "
                        />

                        <span className="text-sm text-slate-600 dark:text-slate-400">
                            Remember me
                        </span>

                    </label>

                </div>


                {/* Error */}

                {error && (

                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-900/10 dark:text-red-400">

                        {error}

                    </div>

                )}


                {/* Login */}

                <button
                    type="submit"
                    disabled={loading}
                    className="
                        flex
                        w-full
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-600
                        py-4
                        font-semibold
                        text-white
                        shadow-sm
                        transition
                        hover:bg-blue-700
                        hover:shadow-lg
                        disabled:cursor-not-allowed
                        disabled:opacity-70
                    "
                >

                    {loading
                        ? "Signing in..."
                        : "Sign In"}

                </button>

            </form>


            {/* Divider */}

            <div className="my-7 flex items-center">

                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />

                <span className="mx-4 text-xs font-medium text-slate-400">
                    OR
                </span>

                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />

            </div>


            {/* Google */}

            <button
                type="button"
                className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-xl
                    border
                    border-slate-300
                    bg-white
                    py-3.5
                    font-semibold
                    text-slate-700
                    transition
                    hover:bg-slate-50
                    dark:border-slate-700
                    dark:bg-[#162033]
                    dark:text-white
                    dark:hover:bg-slate-800
                "
            >

                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                >

                    <path
                        fill="#FFC107"
                        d="M43.611 20.083H42V20H24v8h11.303C33.651 32.657 29.21 36 24 36c-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.842 1.154 7.955 3.045l5.657-5.657C34.061 6.053 29.27 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                    />

                </svg>

                Continue with Google

            </button>


            {/* Sign Up */}

            <p className="mt-7 text-center text-sm text-slate-500 dark:text-slate-400">

                Don't have a DocZ account?{" "}

                <Link
                    href="/signup"
                    className="font-semibold text-blue-600 hover:underline"
                >
                    Create Account
                </Link>

            </p>


            {/* Security Note */}

            <div className="mt-8 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50">

                <ShieldCheck
                    size={19}
                    className="mt-0.5 shrink-0 text-blue-600"
                />

                <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">

                    DocZ is designed to provide controlled access
                    to sensitive legal and investigation-related
                    documents.

                </p>

            </div>

        </div>

    );
}
