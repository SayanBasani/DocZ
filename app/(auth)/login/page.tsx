"use client";

import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {

      e.preventDefault();

      setLoading(true);

      setError("");

      try {

          const response = await fetch("/api/auth/login", {

              method: "POST",

              headers: {
                  "Content-Type": "application/json"
              },

              credentials: "include",

              body: JSON.stringify({
                  email: email.trim().toLowerCase(),
                  password: password
              })

          });

          const data = await response.json();

          if (!response.ok) {

              setError(data.message);

              return;

          }

          router.replace("/home");

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

      {/* Heading */}

      <div className="text-center ">

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Welcome Back 👋
        </h1>

        <p className="mt-3 text-gray-500 dark:text-gray-400">
          Login to continue your trading journey.
        </p>

      </div>

      {/* Form */}

      <form onSubmit={handleLogin} className="mt-10 space-y-6 text-gray-900 dark:text-white">

        {/* Email */}

        <div>

          <label className="mb-2 block font-medium">
            Email Address
          </label>

          <div
            className="flex items-center rounded-xl border border-gray-300 bg-gray-50 px-4 dark:border-slate-700 dark:bg-slate-800 " >

            <Mail size={18} className="text-gray-400" />

            <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent px-3 py-4 outline-none "
            />

          </div>

        </div>

        {/* Password */}

        <div>

          <label className="mb-2 block font-medium">
            Password
          </label>

          <div className=" flex items-center rounded-xl border border-gray-300 bg-gray-50 px-4 dark:border-slate-700 dark:bg-slate-800   " >

            <Lock
              size={18}
              className="text-gray-400"
            />

            <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent px-3 py-4 outline-none"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

        </div>

        {/* Remember */}

        <div className="flex items-center justify-between">

          <label className="flex items-center gap-2">

            <input type="checkbox" />

            <span className="text-sm">
              Remember Me
            </span>

          </label>

          <Link
            href="/forgot-password"
            className="
            text-sm

            text-blue-600

            hover:underline
            "
          >
            Forgot Password?
          </Link>

        </div>

        {/* Login */}

        <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 py-4 font-semibold text-white transition hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
        >
            {loading ? "Logging in..." : "Login"}
        </button>
        {
            error && (

                <p className="text-sm text-red-500">

                    {error}

                </p>

            )
        }

      </form>

      {/* Divider */}

      <div className="my-8 flex items-center">

        <div className="h-px flex-1 bg-gray-300 dark:bg-slate-700" />

        <span className="mx-4 text-sm text-gray-500">
          OR
        </span>

        <div className="h-px flex-1 bg-gray-300 dark:bg-slate-700" />

      </div>

      {/* Google */}

      <button
        className="
        flex

        w-full

        items-center

        justify-center

        gap-3

        rounded-xl

        border

        border-gray-300

        py-3

        transition

        hover:bg-gray-100

        dark:border-slate-700
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

      {/* Footer */}

      <p
        className="
        mt-8

        text-center

        text-sm

        text-gray-500
        "
      >
        Dont have an account?{" "}

        <Link
          href="/signup"
          className="
          font-semibold

          text-blue-600

          hover:underline
          "
        >
          Create Account
        </Link>

      </p>

    </div>
  );
}