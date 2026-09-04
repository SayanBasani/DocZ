import { ENV } from "@/lib/config/env";
import {
    ShieldCheck,
    FileSearch,
    FolderLock,
    History,
} from "lucide-react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (

        <div className="flex min-h-screen bg-slate-100 dark:bg-[#0B1220]">

            {/* Left Section */}

            <section
                className="
                    relative
                    hidden
                    w-1/2
                    flex-col
                    justify-between
                    overflow-hidden
                    bg-gradient-to-br
                    from-blue-600
                    via-blue-700
                    to-indigo-900
                    p-12
                    text-white
                    lg:flex
                    xl:p-16
                "
            >

                {/* Background Effects */}

                <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />

                <div className="absolute -bottom-24 -right-20 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />

                <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/10 blur-3xl" />


                {/* Logo */}

                <div className="relative z-10">

                    <h1 className="text-5xl font-black tracking-tight">
                        {ENV.APP_NAME || "DocZ"}
                    </h1>

                    <p className="mt-4 max-w-lg text-lg leading-8 text-blue-100">

                        Secure digital document management for
                        legal and investigation workflows.

                    </p>

                </div>


                {/* Center Content */}

                <div className="relative z-10 max-w-xl">

                    <div className="mb-8">

                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl">

                            <ShieldCheck size={30} />

                        </div>

                        <h2 className="text-3xl font-bold">
                            Your Documents. Under Control.
                        </h2>

                        <p className="mt-3 leading-7 text-blue-100">

                            Organize sensitive documents, manage
                            investigation records and maintain a clear
                            history of document activity from one
                            centralized workspace.

                        </p>

                    </div>


                    {/* Capabilities */}

                    <div className="grid grid-cols-2 gap-4">

                        <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">

                            <FileSearch size={24} />

                            <h3 className="mt-4 font-semibold">
                                Smart Search
                            </h3>

                            <p className="mt-1 text-sm leading-5 text-blue-100">
                                Find documents using metadata and case information.
                            </p>

                        </div>


                        <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">

                            <FolderLock size={24} />

                            <h3 className="mt-4 font-semibold">
                                Controlled Access
                            </h3>

                            <p className="mt-1 text-sm leading-5 text-blue-100">
                                Manage access to sensitive documents.
                            </p>

                        </div>


                        <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">

                            <ShieldCheck size={24} />

                            <h3 className="mt-4 font-semibold">
                                Document Integrity
                            </h3>

                            <p className="mt-1 text-sm leading-5 text-blue-100">
                                Keep track of document integrity and status.
                            </p>

                        </div>


                        <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">

                            <History size={24} />

                            <h3 className="mt-4 font-semibold">
                                Audit Trail
                            </h3>

                            <p className="mt-1 text-sm leading-5 text-blue-100">
                                Maintain a history of important activity.
                            </p>

                        </div>

                    </div>

                </div>


                {/* Footer */}

                <div className="relative z-10 text-sm text-blue-100">

                    © 2026 {ENV.APP_NAME || "DocZ"}. All Rights Reserved.

                </div>

            </section>


            {/* Right Section */}

            <section className="flex w-full items-center justify-center p-5 sm:p-8 lg:w-1/2 lg:p-12">

                <div className="w-full max-w-md">

                    {/* Mobile Logo */}

                    <div className="mb-8 text-center lg:hidden">

                        <h1 className="text-3xl font-black text-blue-600">
                            {ENV.APP_NAME || "DocZ"}
                        </h1>

                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            Secure Digital Document Management
                        </p>

                    </div>


                    {/* Auth Card */}

                    <div
                        className="
                            ui-fade-up
                            rounded-3xl
                            border
                            border-slate-200
                            bg-white
                            p-7
                            shadow-xl
                            sm:p-9
                            dark:border-slate-700
                            dark:bg-[#162033]
                        "
                    >

                        {children}

                    </div>


                    {/* Small Security Message */}

                    <div className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-slate-400">

                        <ShieldCheck size={15} />

                        <span>
                            Access to your DocZ workspace is protected.
                        </span>

                    </div>

                </div>

            </section>

        </div>

    );
}
