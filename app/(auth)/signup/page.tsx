"use client";

import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
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
            confirmPassword: formData.confirmPassword
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Something went wrong.");
        return;
      }
      console.log(result);
      
      setMessage(result.message);
      if (result.success){
        router.push(`/check-email?email=${encodeURIComponent(result.data.email)}`);
        // return NextResponse.redirect( new URL(`/check-email?email=${result.data.email}` ) );
      }
      setFormData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: ""
      });
      // setTimeout(() => {
      //   router.replace("/login");
      // }, 1500);
    } catch (err) {
      console.error(err);

      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <div className="text-center">

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Create Account 🚀
        </h1>

        <p className="mt-3 text-gray-500 dark:text-gray-400">
          Join Trader Pro and start your trading journey.
        </p>

      </div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6 text-gray-900 dark:text-white">

        <div className="grid grid-cols-2 gap-4">

          <div>

            <label className="mb-2 block font-medium">
              First Name
            </label>

            <div className="flex items-center rounded-xl border border-gray-300 bg-gray-50 px-4 dark:border-slate-700 dark:bg-slate-800">

              <User size={18} className="text-gray-400" />

              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                className="w-full bg-transparent px-3 py-4 outline-none"
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Last Name
            </label>

            <div className="flex items-center rounded-xl border border-gray-300 bg-gray-50 px-4 dark:border-slate-700 dark:bg-slate-800">

              <User size={18} className="text-gray-400" />

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="w-full bg-transparent px-3 py-4 outline-none"
              />

            </div>

          </div>

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Username
          </label>

          <div className="flex items-center rounded-xl border border-gray-300 bg-gray-50 px-4 dark:border-slate-700 dark:bg-slate-800">

            <User size={18} className="text-gray-400" />

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="john_doe"
              className="w-full bg-transparent px-3 py-4 outline-none"
            />

          </div>

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Email Address
          </label>

          <div className="flex items-center rounded-xl border border-gray-300 bg-gray-50 px-4 dark:border-slate-700 dark:bg-slate-800">

            <Mail size={18} className="text-gray-400" />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="w-full bg-transparent px-3 py-4 outline-none"
            />

          </div>

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Password
          </label>

          <div className="flex items-center rounded-xl border border-gray-300 bg-gray-50 px-4 dark:border-slate-700 dark:bg-slate-800">

            <Lock size={18} className="text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password"
              className="w-full bg-transparent px-3 py-4 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

          </div>

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Confirm Password
          </label>

          <div className="flex items-center rounded-xl border border-gray-300 bg-gray-50 px-4 dark:border-slate-700 dark:bg-slate-800">

            <Lock size={18} className="text-gray-400" />

            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="w-full bg-transparent px-3 py-4 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

          </div>

        </div>

        {error && (
          <div className="rounded-lg bg-red-100 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
            {error}
          </div>
        )}

        {message && (
          <div className="rounded-lg bg-green-100 p-3 text-sm text-green-600 dark:bg-green-900/30 dark:text-green-400">
            {message}
          </div>
        )}

        <label className="flex items-start gap-3 text-sm">

          <input type="checkbox" required className="mt-1" />

          <span className="text-gray-600 dark:text-gray-400">

            I agree to the{" "}

            <Link href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>

            {" "}and{" "}

            <Link href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>

          </span>

        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-linear-to-r from-sky-600 via-blue-600 to-indigo-700 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

      </form>

      <div className="my-8 flex items-center">

        <div className="h-px flex-1 bg-gray-300 dark:bg-slate-700" />

        <span className="mx-4 text-sm text-gray-500">
          OR
        </span>

        <div className="h-px flex-1 bg-gray-300 dark:bg-slate-700" />

      </div>

      <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 py-3 transition hover:bg-gray-100 dark:border-slate-700 dark:hover:bg-slate-800">

        <svg width="20" height="20" viewBox="0 0 48 48">

          <path
            fill="#FFC107"
            d="M43.611 20.083H42V20H24v8h11.303C33.651 32.657 29.21 36 24 36c-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.842 1.154 7.955 3.045l5.657-5.657C34.061 6.053 29.27 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
          />

        </svg>

        Continue with Google

      </button>

      <p className="mt-8 text-center text-sm text-gray-500">

        Already have an account?{" "}

        <Link
          href="/login"
          className="font-semibold text-blue-600 hover:underline"
        >
          Login
        </Link>

      </p>

    </div>
  );
}