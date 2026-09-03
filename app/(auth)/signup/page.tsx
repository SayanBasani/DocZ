"use client";

import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          username: formData.username.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Something went wrong.");
        return;
      }

      console.log(result);

      setMessage(result.message);

      if (result.success) {
        router.push(
          `/check-email?email=${encodeURIComponent(result.data.email)}`
        );
      }

      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 text-white shadow-lg">
          <ShieldCheck size={28} />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Create Your DocZ Account
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
          Create a secure workspace to organize, manage, and access your
          legal and investigation-related documents.
        </p>
      </div>

      {/* Signup Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 text-gray-900 dark:text-white"
      >
        {/* Name */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              First Name
            </label>

            <div className="flex items-center rounded-xl border border-gray-300 bg-gray-50 px-4 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/70">
              <User size={18} className="shrink-0 text-gray-400" />

              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                required
                autoComplete="given-name"
                className="w-full bg-transparent px-3 py-3.5 text-sm outline-none placeholder:text-gray-400 dark:placeholder:text-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Last Name
            </label>

            <div className="flex items-center rounded-xl border border-gray-300 bg-gray-50 px-4 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/70">
              <User size={18} className="shrink-0 text-gray-400" />

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                required
                autoComplete="family-name"
                className="w-full bg-transparent px-3 py-3.5 text-sm outline-none placeholder:text-gray-400 dark:placeholder:text-slate-500"
              />
            </div>
          </div>
        </div>

        {/* Username */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Username
          </label>

          <div className="flex items-center rounded-xl border border-gray-300 bg-gray-50 px-4 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/70">
            <User size={18} className="shrink-0 text-gray-400" />

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="john_doe"
              required
              autoComplete="username"
              className="w-full bg-transparent px-3 py-3.5 text-sm outline-none placeholder:text-gray-400 dark:placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Email Address
          </label>

          <div className="flex items-center rounded-xl border border-gray-300 bg-gray-50 px-4 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/70">
            <Mail size={18} className="shrink-0 text-gray-400" />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              required
              autoComplete="email"
              className="w-full bg-transparent px-3 py-3.5 text-sm outline-none placeholder:text-gray-400 dark:placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Password
          </label>

          <div className="flex items-center rounded-xl border border-gray-300 bg-gray-50 px-4 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/70">
            <Lock size={18} className="shrink-0 text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              autoComplete="new-password"
              className="w-full bg-transparent px-3 py-3.5 text-sm outline-none placeholder:text-gray-400 dark:placeholder:text-slate-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 transition hover:text-gray-600 dark:hover:text-gray-200"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Confirm Password
          </label>

          <div className="flex items-center rounded-xl border border-gray-300 bg-gray-50 px-4 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/70">
            <Lock size={18} className="shrink-0 text-gray-400" />

            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              autoComplete="new-password"
              className="w-full bg-transparent px-3 py-3.5 text-sm outline-none placeholder:text-gray-400 dark:placeholder:text-slate-500"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="text-gray-400 transition hover:text-gray-600 dark:hover:text-gray-200"
              aria-label={
                showConfirm
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >
              {showConfirm ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Success */}
        {message && (
          <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-600 dark:border-green-900/40 dark:bg-green-900/20 dark:text-green-400">
            {message}
          </div>
        )}

        {/* Terms */}
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            required
            className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />

          <span className="leading-5 text-gray-500 dark:text-gray-400">
            I agree to the{" "}
            <Link
              href="/terms"
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 py-3.5 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Creating Your Account..." : "Create DocZ Account"}
        </button>
      </form>

      {/* Divider */}
      <div className="my-7 flex items-center">
        <div className="h-px flex-1 bg-gray-200 dark:bg-slate-700" />

        <span className="mx-4 text-xs font-medium text-gray-400">
          OR
        </span>

        <div className="h-px flex-1 bg-gray-200 dark:bg-slate-700" />
      </div>

      {/* Google */}
      <button
        type="button"
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700"
      >
        <svg width="19" height="19" viewBox="0 0 48 48">
          <path
            fill="#FFC107"
            d="M43.611 20.083H42V20H24v8h11.303C33.651 32.657 29.21 36 24 36c-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.842 1.154 7.955 3.045l5.657-5.657C34.061 6.053 29.27 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
          />
          <path
            fill="#FF3D00"
            d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 14 24 14c3.059 0 5.842 1.154 7.955 3.045l5.657-5.657C34.061 6.053 29.27 4 24 4c-7.682 0-14.327 4.337-17.694 10.691z"
          />
          <path
            fill="#4CAF50"
            d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.188 0-9.49-3.329-11.067-7.946l-6.522 5.025C9.753 39.556 16.371 44 24 44z"
          />
          <path
            fill="#1976D2"
            d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.084 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
          />
        </svg>

        Continue with Google
      </button>

      {/* Login */}
      <p className="mt-7 text-center text-sm text-gray-500 dark:text-gray-400">
        Already have a DocZ account?{" "}
        <Link
          href="/login"
          className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
        >
          Sign In
        </Link>
      </p>

      {/* Security Note */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-500">
        <ShieldCheck size={14} />
        <span>Your DocZ workspace is designed for controlled access.</span>
      </div>
    </div>
  );
}
