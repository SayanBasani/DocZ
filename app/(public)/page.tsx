"use client";

import Link from "next/link";
import {
    ArrowRight,
    ShieldCheck,
    FileSearch,
    FolderLock,
    Search,
    Clock3,
    Fingerprint,
    Upload,
    Database,
    Menu,
    X
} from "lucide-react";
import { useState } from "react";

export default function Page() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const features = [
        {
            icon: FolderLock,
            title: "Secure Document Storage",
            description:
                "Store legal, investigation and sensitive documents in a centralized and protected environment."
        },
        {
            icon: FileSearch,
            title: "Smart Document Search",
            description:
                "Find documents quickly using names, tags, metadata, document types and investigation details."
        },
        {
            icon: Fingerprint,
            title: "Document Integrity",
            description:
                "Maintain document integrity with verification mechanisms and controlled document handling."
        },
        {
            icon: Clock3,
            title: "Complete Audit Trail",
            description:
                "Track important document activities including uploads, downloads, modifications and access."
        },
        {
            icon: ShieldCheck,
            title: "Access Control",
            description:
                "Control who can view, upload, download or manage sensitive documents based on permissions."
        },
        {
            icon: Database,
            title: "Investigation Metadata",
            description:
                "Organize documents with structured metadata such as case, category, status and evidence information."
        }
    ];

    return (
        <main className="min-h-screen bg-white text-slate-900 dark:bg-[#08111F] dark:text-white">

            {/* Navbar */}

            <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-[#08111F]/90">

                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

                    <Link
                        href="/"
                        className="text-3xl font-black tracking-tight text-blue-600"
                    >
                        DocZ
                    </Link>

                    <nav className="hidden items-center gap-8 md:flex">

                        <a
                            href="#features"
                            className="font-medium text-slate-600 transition hover:text-blue-600 dark:text-slate-300"
                        >
                            Features
                        </a>

                        <a
                            href="#security"
                            className="font-medium text-slate-600 transition hover:text-blue-600 dark:text-slate-300"
                        >
                            Security
                        </a>

                        <a
                            href="#workflow"
                            className="font-medium text-slate-600 transition hover:text-blue-600 dark:text-slate-300"
                        >
                            Workflow
                        </a>

                    </nav>

                    <div className="hidden items-center gap-4 md:flex">

                        <Link
                            href="/login"
                            className="font-semibold text-slate-700 transition hover:text-blue-600 dark:text-slate-300"
                        >
                            Login
                        </Link>

                        <Link
                            href="/signup"
                            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            Get Started
                        </Link>

                    </div>

                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="rounded-xl p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
                    >
                        <Menu size={27} />
                    </button>

                </div>

                {/* Mobile Menu */}

                {mobileMenuOpen && (

                    <div className="fixed inset-0 z-50 bg-black/50 md:hidden">

                        <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white p-6 shadow-2xl dark:bg-[#0D1728]">

                            <div className="flex items-center justify-between">

                                <Link
                                    href="/"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-2xl font-black text-blue-600"
                                >
                                    DocZ
                                </Link>

                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                                >
                                    <X size={26} />
                                </button>

                            </div>

                            <nav className="mt-10 flex flex-col gap-2">

                                <a
                                    href="#features"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="rounded-xl px-4 py-4 font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
                                >
                                    Features
                                </a>

                                <a
                                    href="#security"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="rounded-xl px-4 py-4 font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
                                >
                                    Security
                                </a>

                                <a
                                    href="#workflow"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="rounded-xl px-4 py-4 font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
                                >
                                    Workflow
                                </a>

                            </nav>

                            <div className="mt-8 border-t border-slate-200 pt-8 dark:border-slate-700">

                                <Link
                                    href="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="mb-4 flex w-full items-center justify-center rounded-xl border border-slate-300 py-3 font-semibold dark:border-slate-700"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/signup"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 font-semibold text-white"
                                >
                                    Get Started
                                </Link>

                            </div>

                        </div>

                    </div>

                )}

            </header>


            {/* Hero */}

            <section className="relative overflow-hidden">

                <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

                <div className="absolute -right-40 top-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

                <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:py-32">

                    <div>

                        <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            Secure Digital Document Management
                        </span>

                        <h1 className="mt-7 text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">

                            Manage Documents.

                            <br />

                            <span className="text-blue-600">
                                Protect Evidence.
                            </span>

                        </h1>

                        <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">

                            DocZ is a secure digital document management platform
                            designed to organize, store, search and manage legal
                            and investigation-related documents.

                        </p>

                        <div className="mt-9 flex flex-col gap-4 sm:flex-row">

                            <Link
                                href="/signup"
                                className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:-translate-y-1 hover:bg-blue-700"
                            >
                                Get Started
                                <ArrowRight size={20} />
                            </Link>

                            <a
                                href="#features"
                                className="flex items-center justify-center rounded-2xl border border-slate-300 px-8 py-4 font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                            >
                                Explore Features
                            </a>

                        </div>

                    </div>


                    {/* Hero Preview */}

                    <div className="relative">

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-[#162033]">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm text-slate-500">
                                        Document Repository
                                    </p>

                                    <h2 className="mt-1 text-2xl font-bold">
                                        Case Documents
                                    </h2>

                                </div>

                                <div className="rounded-xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30">
                                    <FolderLock size={25} />
                                </div>

                            </div>


                            <div className="mt-6 flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700">

                                <Search
                                    size={20}
                                    className="text-slate-400"
                                />

                                <span className="text-sm text-slate-400">
                                    Search documents...
                                </span>

                            </div>


                            <div className="mt-6 space-y-3">

                                <div className="flex items-center justify-between rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">

                                    <div className="flex items-center gap-3">

                                        <div className="rounded-xl bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30">
                                            <FileSearch size={20} />
                                        </div>

                                        <div>
                                            <p className="font-semibold">
                                                Investigation Report
                                            </p>

                                            <p className="text-xs text-slate-500">
                                                Case #DOC-1024
                                            </p>
                                        </div>

                                    </div>

                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600 dark:bg-green-900/30">
                                        Verified
                                    </span>

                                </div>


                                <div className="flex items-center justify-between rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">

                                    <div className="flex items-center gap-3">

                                        <div className="rounded-xl bg-purple-100 p-2 text-purple-600 dark:bg-purple-900/30">
                                            <FileSearch size={20} />
                                        </div>

                                        <div>
                                            <p className="font-semibold">
                                                Evidence Document
                                            </p>

                                            <p className="text-xs text-slate-500">
                                                Case #DOC-1025
                                            </p>
                                        </div>

                                    </div>

                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-900/30">
                                        Secured
                                    </span>

                                </div>


                                <div className="flex items-center justify-between rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">

                                    <div className="flex items-center gap-3">

                                        <div className="rounded-xl bg-orange-100 p-2 text-orange-600 dark:bg-orange-900/30">
                                            <FileSearch size={20} />
                                        </div>

                                        <div>
                                            <p className="font-semibold">
                                                Legal Document
                                            </p>

                                            <p className="text-xs text-slate-500">
                                                Case #DOC-1026
                                            </p>
                                        </div>

                                    </div>

                                    <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                                        Archived
                                    </span>

                                </div>

                            </div>

                        </div>

                        <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-700 dark:bg-[#162033] sm:block">

                            <div className="flex items-center gap-3">

                                <div className="rounded-xl bg-green-100 p-2 text-green-600 dark:bg-green-900/30">
                                    <ShieldCheck size={22} />
                                </div>

                                <div>
                                    <p className="text-xs text-slate-500">
                                        Security Status
                                    </p>

                                    <p className="font-bold">
                                        Protected
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* Features */}

            <section
                id="features"
                className="bg-slate-50 py-24 dark:bg-[#0D1728]"
            >

                <div className="mx-auto max-w-7xl px-6">

                    <div className="text-center">

                        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            Core Features
                        </span>

                        <h2 className="mt-6 text-4xl font-black sm:text-5xl">
                            Everything Your Documents Need
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                            A centralized platform for securely managing
                            important documents throughout their lifecycle.
                        </p>

                    </div>


                    <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

                        {features.map((feature) => {

                            const Icon = feature.icon;

                            return (

                                <div
                                    key={feature.title}
                                    className="rounded-3xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl dark:border-slate-700 dark:bg-[#162033]"
                                >

                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30">

                                        <Icon size={28} />

                                    </div>

                                    <h3 className="mt-6 text-xl font-bold">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                                        {feature.description}
                                    </p>

                                </div>

                            );

                        })}

                    </div>

                </div>

            </section>


            {/* Security */}

            <section
                id="security"
                className="py-24"
            >

                <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

                    <div>

                        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300">
                            Security First
                        </span>

                        <h2 className="mt-6 text-4xl font-black sm:text-5xl">
                            Built For Sensitive Documents
                        </h2>

                        <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            Legal and investigation documents require more than
                            simple file storage. DocZ focuses on controlled
                            access, document integrity and traceability.
                        </p>

                        <div className="mt-8 space-y-5">

                            <div className="flex items-start gap-4">

                                <div className="rounded-xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30">
                                    <ShieldCheck size={24} />
                                </div>

                                <div>
                                    <h3 className="font-bold">
                                        Controlled Access
                                    </h3>

                                    <p className="mt-1 text-slate-600 dark:text-slate-400">
                                        Only authorized users should be able to
                                        access protected documents.
                                    </p>
                                </div>

                            </div>


                            <div className="flex items-start gap-4">

                                <div className="rounded-xl bg-purple-100 p-3 text-purple-600 dark:bg-purple-900/30">
                                    <Fingerprint size={24} />
                                </div>

                                <div>
                                    <h3 className="font-bold">
                                        Integrity Protection
                                    </h3>

                                    <p className="mt-1 text-slate-600 dark:text-slate-400">
                                        Keep track of document integrity and
                                        important changes.
                                    </p>
                                </div>

                            </div>


                            <div className="flex items-start gap-4">

                                <div className="rounded-xl bg-orange-100 p-3 text-orange-600 dark:bg-orange-900/30">
                                    <Clock3 size={24} />
                                </div>

                                <div>
                                    <h3 className="font-bold">
                                        Auditable Activity
                                    </h3>

                                    <p className="mt-1 text-slate-600 dark:text-slate-400">
                                        Maintain a history of important document
                                        actions and access events.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>


                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-700 dark:bg-[#0D1728]">

                        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl dark:border-slate-700 dark:bg-[#162033]">

                            <div className="flex items-center gap-4">

                                <div className="rounded-2xl bg-blue-100 p-4 text-blue-600 dark:bg-blue-900/30">
                                    <ShieldCheck size={32} />
                                </div>

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Document Security
                                    </p>

                                    <h3 className="text-2xl font-bold">
                                        Protected
                                    </h3>
                                </div>

                            </div>

                            <div className="mt-8 space-y-4">

                                <div className="flex items-center justify-between rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
                                    <span>Access Control</span>
                                    <span className="font-semibold text-green-600">
                                        Enabled
                                    </span>
                                </div>

                                <div className="flex items-center justify-between rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
                                    <span>Integrity Check</span>
                                    <span className="font-semibold text-green-600">
                                        Verified
                                    </span>
                                </div>

                                <div className="flex items-center justify-between rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
                                    <span>Audit Trail</span>
                                    <span className="font-semibold text-green-600">
                                        Active
                                    </span>
                                </div>

                                <div className="flex items-center justify-between rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
                                    <span>Document Status</span>
                                    <span className="font-semibold text-blue-600">
                                        Secure
                                    </span>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* Workflow */}

            <section
                id="workflow"
                className="bg-slate-50 py-24 dark:bg-[#0D1728]"
            >

                <div className="mx-auto max-w-7xl px-6">

                    <div className="text-center">

                        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            Simple Workflow
                        </span>

                        <h2 className="mt-6 text-4xl font-black sm:text-5xl">
                            From Upload To Investigation
                        </h2>

                    </div>


                    <div className="mt-16 grid gap-8 md:grid-cols-3">

                        <div className="relative rounded-3xl border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-[#162033]">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30">
                                <Upload size={30} />
                            </div>

                            <h3 className="mt-6 text-xl font-bold">
                                01. Upload
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                                Upload documents and associate them with the
                                relevant case or investigation.
                            </p>

                        </div>


                        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-[#162033]">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-900/30">
                                <Database size={30} />
                            </div>

                            <h3 className="mt-6 text-xl font-bold">
                                02. Organize
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                                Add metadata, categories, tags and other
                                information to keep documents organized.
                            </p>

                        </div>


                        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-[#162033]">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600 dark:bg-green-900/30">
                                <FileSearch size={30} />
                            </div>

                            <h3 className="mt-6 text-xl font-bold">
                                03. Investigate
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                                Search, review and manage documents while
                                maintaining a clear history of activity.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* CTA */}

            <section className="px-6 py-24">

                <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-blue-600 px-8 py-16 text-center text-white shadow-2xl sm:px-16">

                    <ShieldCheck
                        size={48}
                        className="mx-auto"
                    />

                    <h2 className="mt-6 text-4xl font-black sm:text-5xl">
                        Secure Your Documents With DocZ
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">
                        Organize sensitive documents, control access and keep
                        your document workflow traceable from one platform.
                    </p>

                    <Link
                        href="/signup"
                        className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-bold text-blue-600 transition hover:-translate-y-1 hover:bg-slate-100"
                    >
                        Get Started
                        <ArrowRight size={20} />
                    </Link>

                </div>

            </section>


            {/* Footer */}

            <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-[#08111F]">

                <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <Link
                            href="/"
                            className="text-2xl font-black text-blue-600"
                        >
                            DocZ
                        </Link>

                        <p className="mt-2 text-sm text-slate-500">
                            Secure digital document management.
                        </p>

                    </div>

                    <div className="flex flex-wrap gap-6 text-sm text-slate-500">

                        <Link
                            href="/about"
                            className="transition hover:text-blue-600"
                        >
                            About
                        </Link>

                        <Link
                            href="/privacy"
                            className="transition hover:text-blue-600"
                        >
                            Privacy
                        </Link>

                        <Link
                            href="/terms"
                            className="transition hover:text-blue-600"
                        >
                            Terms
                        </Link>

                        <Link
                            href="/contact"
                            className="transition hover:text-blue-600"
                        >
                            Contact
                        </Link>

                    </div>

                </div>

                <div className="border-t border-slate-200 py-6 text-center text-sm text-slate-500 dark:border-slate-800">
                    © 2026 DocZ. All Rights Reserved.
                </div>

            </footer>

        </main>
    );
}
