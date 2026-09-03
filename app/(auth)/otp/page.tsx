"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function OTPPage() {
  return (
    <div>

      {/* Icon */}

      <div className="flex justify-center">

        <div
          className="
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-blue-100
          dark:bg-blue-900/30
          "
        >
          <ShieldCheck
            size={40}
            className="text-blue-600"
          />
        </div>

      </div>

      {/* Heading */}

      <div className="mt-6 text-center">

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Verify OTP
        </h1>

        <p className="mt-3 text-gray-500 dark:text-gray-400">
          We have sent a 6-digit verification code to
        </p>

        <p className="mt-1 font-semibold text-blue-600">
          example@email.com
        </p>

      </div>

      {/* OTP */}

      <form className="mt-10">

        <div className="flex justify-center gap-3">

          {[1,2,3,4,5,6].map((item)=>(
            <input
              key={item}
              type="text"
              maxLength={1}
              className="
              h-14
              w-14

              rounded-xl

              border

              border-gray-300

              bg-gray-50

              text-center

              text-xl

              font-bold

              outline-none

              transition

              focus:border-blue-500

              focus:ring-2

              focus:ring-blue-500

              dark:border-slate-700

              dark:bg-slate-800
              "
            />
          ))}

        </div>

        {/* Timer */}

        <div className="mt-8 text-center">

          <p className="text-gray-500 dark:text-gray-400">
            Code expires in
          </p>

          <p className="mt-2 text-2xl font-bold text-red-500">
            01:30
          </p>

        </div>

        {/* Button */}

        <button
          className="
          mt-8

          w-full

          rounded-xl

          bg-gradient-to-r

          from-sky-600

          via-blue-600

          to-indigo-700

          py-4

          font-semibold

          text-white

          transition-all

          duration-300

          hover:-translate-y-1

          hover:shadow-xl
          "
        >
          Verify OTP
        </button>

      </form>

      {/* Resend */}

      <div className="mt-8 text-center">

        <p className="text-gray-500 dark:text-gray-400">
          Didnt receive the code?
        </p>

        <button
          className="
          mt-3

          font-semibold

          text-blue-600

          transition

          hover:underline
          "
        >
          Resend OTP
        </button>

      </div>

      {/* Back */}

      <p className="mt-8 text-center text-sm text-gray-500">

        <Link
          href="/login"
          className="
          font-semibold

          text-blue-600

          hover:underline
          "
        >
          ← Back to Login
        </Link>

      </p>

    </div>
  );
}