import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white">

      <h1 className="text-8xl font-bold text-blue-500">
        404
      </h1>

      <h2 className="mt-4 text-3xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-3 text-slate-400">
        The page you are looking for does not exist.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-xl bg-blue-600 px-6 py-3 hover:bg-blue-700"
      >
        Go Home
      </Link>

    </div>
  );
}