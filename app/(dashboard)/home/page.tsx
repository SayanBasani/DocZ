import { ENV } from "@/lib/config/env";
import {
  Upload,
  Search,
  FileText,
  FolderOpen,
  ShieldCheck,
  Clock3,
  MoreHorizontal,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {

  const stats = [
    {
      title: "Total Documents",
      value: "248",
      icon: FileText,
      description: "Documents stored",
    },
    {
      title: "Active Cases",
      value: "18",
      icon: FolderOpen,
      description: "Cases in progress",
    },
    {
      title: "Recent Uploads",
      value: "24",
      icon: Upload,
      description: "This month",
    },
    {
      title: "Verified",
      value: "96%",
      icon: ShieldCheck,
      description: "Document integrity",
    },
  ];

  const recentDocuments = [
    {
      name: "Investigation Report",
      type: "PDF",
      case: "CASE-1024",
      status: "Verified",
      date: "Today, 10:42 AM",
    },
    {
      name: "Witness Statement",
      type: "DOCX",
      case: "CASE-1024",
      status: "Verified",
      date: "Today, 09:18 AM",
    },
    {
      name: "Evidence Photograph",
      type: "JPG",
      case: "CASE-1018",
      status: "Verified",
      date: "Yesterday",
    },
    {
      name: "Legal Notice",
      type: "PDF",
      case: "CASE-1015",
      status: "Review",
      date: "Yesterday",
    },
  ];

  const activities = [
    {
      action: "Document uploaded",
      document: "Investigation Report",
      time: "10 minutes ago",
    },
    {
      action: "Document accessed",
      document: "Witness Statement",
      time: "35 minutes ago",
    },
    {
      action: "Document verified",
      document: "Evidence Photograph",
      time: "1 hour ago",
    },
    {
      action: "Case updated",
      document: "CASE-1018",
      time: "2 hours ago",
    },
  ];

  return (
    <div className="ui-stagger space-y-8">

      {/* Welcome */}

      <section className="ui-interactive relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-8 text-white shadow-xl">

        <div className="relative z-10">

          <p className="text-blue-100">
            Welcome back 👋
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Welcome to {ENV.APP_NAME || "DocZ"}
          </h1>

          <p className="mt-3 max-w-2xl text-blue-100">
            Manage your documents, cases and investigation records
            securely from one place.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">

            <Link
              href="/documents/upload"
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              <Upload size={19} />
              Upload Document
            </Link>

            <Link
              href="/documents"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/30 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              <FileText size={19} />
              View Documents
            </Link>

          </div>

        </div>

        <div className="ui-pulse-glow absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="ui-pulse-glow absolute -bottom-32 right-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

      </section>


      {/* Stats */}

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.title}
              className="ui-interactive rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-[#162033]"
            >

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                    {item.value}
                  </h2>

                </div>

                <div className="rounded-xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30">
                  <Icon size={22} />
                </div>

              </div>

              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                {item.description}
              </p>

            </div>

          );

        })}

      </section>


      {/* Search */}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-[#162033]">

        <div className="flex flex-col gap-4 sm:flex-row">

          <div className="relative flex-1">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search documents, cases, tags or metadata..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900"
            />

          </div>

          <Link
            href="/documents"
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Search
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>


      {/* Main Content */}

      <section className="grid gap-6 xl:grid-cols-3">

        {/* Recent Documents */}

        <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-[#162033]">

          <div className="flex items-center justify-between border-b border-slate-200 p-6 dark:border-slate-700">

            <div>

              <h2 className="text-xl font-semibold">
                Recent Documents
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Recently added and accessed documents
              </p>

            </div>

            <Link
              href="/documents"
              className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View All
              <ArrowRight size={16} />
            </Link>

          </div>


          <div className="divide-y divide-slate-100 dark:divide-slate-700">

            {recentDocuments.map((document) => (

              <div
                key={document.name}
                className="flex items-center justify-between gap-4 p-5 transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >

                <div className="flex min-w-0 items-center gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30">
                    <FileText size={21} />
                  </div>

                  <div className="min-w-0">

                    <p className="truncate font-semibold">
                      {document.name}
                    </p>

                    <div className="mt-1 flex flex-wrap gap-x-3 text-xs text-slate-500">

                      <span>
                        {document.type}
                      </span>

                      <span>
                        {document.case}
                      </span>

                      <span>
                        {document.date}
                      </span>

                    </div>

                  </div>

                </div>


                <div className="flex shrink-0 items-center gap-3">

                  {document.status === "Verified" ? (

                    <span className="hidden items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-600 dark:bg-green-900/30 sm:flex">

                      <CheckCircle2 size={14} />
                      Verified

                    </span>

                  ) : (

                    <span className="hidden items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1.5 text-xs font-semibold text-orange-600 dark:bg-orange-900/30 sm:flex">

                      <AlertCircle size={14} />
                      Review

                    </span>

                  )}

                  <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800">
                    <MoreHorizontal size={20} />
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* Activity */}

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-[#162033]">

          <div className="border-b border-slate-200 p-6 dark:border-slate-700">

            <h2 className="text-xl font-semibold">
              Recent Activity
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Latest activity in your workspace
            </p>

          </div>


          <div className="space-y-6 p-6">

            {activities.map((activity, index) => (

              <div
                key={`${activity.action}-${index}`}
                className="flex gap-4"
              >

                <div className="relative">

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30">
                    <Clock3 size={17} />
                  </div>

                  {index !== activities.length - 1 && (

                    <div className="absolute left-1/2 top-9 h-8 w-px -translate-x-1/2 bg-slate-200 dark:bg-slate-700" />

                  )}

                </div>

                <div className="min-w-0">

                  <p className="text-sm font-semibold">
                    {activity.action}
                  </p>

                  <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
                    {activity.document}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {activity.time}
                  </p>

                </div>

              </div>

            ))}

          </div>


          <div className="border-t border-slate-200 p-5 dark:border-slate-700">

            <Link
              href="/audit"
              className="flex items-center justify-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View Audit Trail
              <ArrowRight size={16} />
            </Link>

          </div>

        </div>

      </section>


      {/* Security Status */}

      <section className="rounded-2xl border border-green-200 bg-green-50 p-6 dark:border-green-900/50 dark:bg-green-900/10">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-start gap-4">

            <div className="rounded-xl bg-green-100 p-3 text-green-600 dark:bg-green-900/30">
              <ShieldCheck size={25} />
            </div>

            <div>

              <h2 className="font-semibold text-green-900 dark:text-green-300">
                Your documents are protected
              </h2>

              <p className="mt-1 text-sm text-green-700 dark:text-green-400">
                Access control and document integrity monitoring are active.
              </p>

            </div>

          </div>

          <Link
            href="/audit"
            className="flex items-center gap-2 font-semibold text-green-700 hover:text-green-800 dark:text-green-400"
          >
            Security Details
            <ArrowRight size={17} />
          </Link>

        </div>

      </section>

    </div>
  );
}
