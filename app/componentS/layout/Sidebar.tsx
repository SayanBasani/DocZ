"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    FolderOpen,
    Upload,
    ShieldCheck,
    Bell,
    User,
    Settings,
    ChevronLeft,
    ChevronRight,
    X,
} from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import ThemeToggle from "../theme/theme-toggle-btn";
import { useTheme } from "next-themes";
import { ENV } from "@/lib/config/env";


const menu = [
    {
        title: "Dashboard",
        href: "/home",
        icon: LayoutDashboard,
    },
    {
        title: "Documents",
        href: "/documents",
        icon: FileText,
    },
    {
        title: "Cases",
        href: "/cases",
        icon: FolderOpen,
    },
    {
        title: "Upload Document",
        href: "/documents/upload",
        icon: Upload,
    },
    {
        title: "Audit Trail",
        href: "/audit",
        icon: ShieldCheck,
    },
    {
        title: "Notifications",
        href: "/notifications",
        icon: Bell,
    },
    {
        title: "Profile",
        href: "/profile",
        icon: User,
    },
    {
        title: "Settings",
        href: "/settings",
        icon: Settings,
    },
];


interface SidebarProps {
    collapsed: boolean;
    setCollapsed: Dispatch<SetStateAction<boolean>>;
}


export default function Sidebar({
    collapsed,
    setCollapsed,
}: SidebarProps) {

    const pathname = usePathname();

    const [mobileOpen, setMobileOpen] = useState(false);

    const {
        resolvedTheme,
        setTheme,
    } = useTheme();

    const [mounted, setMounted] = useState(false);


    useEffect(() => {

        setMounted(true);

    }, []);


    if (!mounted) {
        return null;
    }


    return (
        <>
            {/* Mobile Button */}

            <button
                onClick={() => setMobileOpen(true)}
                className="fixed left-2 top-4 z-50 rounded-lg bg-blue-600 p-2 text-white shadow-lg lg:hidden"
            >
                <ChevronRight size={22} />
            </button>


            {/* Mobile Background */}

            {mobileOpen && (

                <div
                    onClick={() => setMobileOpen(false)}
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                />

            )}


            {/* Sidebar */}

            <aside
                className={`
                    fixed
                    left-0
                    top-0
                    z-50
                    h-screen
                    border-r
                    border-slate-200
                    bg-white
                    transition-all
                    duration-300
                    dark:border-slate-700
                    dark:bg-[#101827]

                    ${collapsed ? "w-20" : "w-72"}

                    ${
                        mobileOpen
                            ? "translate-x-0"
                            : "-translate-x-full lg:translate-x-0"
                    }
                `}
            >

                {/* Logo */}

                <div
                    className="
                        flex
                        h-20
                        items-center
                        justify-between
                        border-b
                        border-slate-200
                        px-5
                        dark:border-slate-700
                    "
                >

                    {!collapsed && (

                        <Link
                            href="/"
                            onClick={() => setMobileOpen(false)}
                        >

                            <h1 className="text-2xl font-black text-blue-600">
                                {ENV.APP_NAME || "DocZ"}
                            </h1>

                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Secure Documents
                            </p>

                        </Link>

                    )}


                    {collapsed && (

                        <Link
                            href="/"
                            className="mx-auto text-2xl font-black text-blue-600"
                        >
                            {ENV.APP_NAME?.charAt(0) || "D"}
                        </Link>

                    )}


                    {/* Desktop Collapse */}

                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="
                            hidden
                            rounded-lg
                            p-2
                            text-slate-700
                            transition
                            hover:bg-slate-100
                            dark:text-white
                            dark:hover:bg-slate-700
                            lg:block
                        "
                    >

                        {collapsed ? (
                            <ChevronRight size={20} />
                        ) : (
                            <ChevronLeft size={20} />
                        )}

                    </button>


                    {/* Mobile Close */}

                    <button
                        onClick={() => setMobileOpen(false)}
                        className="
                            rounded-lg
                            p-2
                            text-slate-700
                            dark:text-white
                            lg:hidden
                        "
                    >
                        <X size={20} />
                    </button>

                </div>


                {/* Navigation */}

                <nav className="mt-6 space-y-1.5 px-3">

                    {menu.map((item) => {

                        const Icon = item.icon;

                        const active =
                            pathname === item.href ||
                            pathname.startsWith(`${item.href}/`);

                        return (

                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                title={collapsed ? item.title : undefined}
                                className={`
                                    flex
                                    items-center
                                    rounded-xl
                                    px-4
                                    py-3
                                    transition-all

                                    ${
                                        active
                                            ? "bg-blue-600 text-white shadow-md"
                                            : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                                    }

                                    ${collapsed ? "justify-center" : ""}
                                `}
                            >

                                <Icon size={21} />

                                {!collapsed && (

                                    <span className="ml-4 font-medium">
                                        {item.title}
                                    </span>

                                )}

                            </Link>

                        );

                    })}

                </nav>


                {/* Bottom */}

                <div className="absolute bottom-5 left-0 w-full space-y-3 px-4">


                    {/* Theme */}

                    <button
                        onClick={() => {

                            setTheme(
                                resolvedTheme === "dark"
                                    ? "light"
                                    : "dark"
                            );

                        }}
                        className={`
                            flex
                            w-full
                            items-center
                            rounded-xl
                            px-4
                            py-3
                            text-slate-700
                            transition
                            hover:bg-slate-100
                            dark:text-white
                            dark:hover:bg-slate-700

                            ${collapsed ? "justify-center" : ""}
                        `}
                    >

                        <ThemeToggle btnSize={24} />

                        {!collapsed && (

                            <span className="ml-4 font-medium">
                                {resolvedTheme === "dark"
                                    ? "Dark Mode"
                                    : "Light Mode"}
                            </span>

                        )}

                    </button>


                    {/* Security Card */}

                    <div
                        className={`
                            rounded-2xl
                            bg-gradient-to-r
                            from-blue-600
                            to-indigo-600
                            text-white

                            ${collapsed ? "p-3" : "p-4"}
                        `}
                    >

                        {collapsed ? (

                            <ShieldCheck
                                size={22}
                                className="mx-auto"
                            />

                        ) : (

                            <div className="flex items-center gap-3">

                                <div className="rounded-xl bg-white/15 p-2">

                                    <ShieldCheck size={21} />

                                </div>

                                <div>

                                    <h2 className="text-sm font-semibold">
                                        Secure Workspace
                                    </h2>

                                    <p className="mt-0.5 text-xs text-blue-100">
                                        Your documents are protected
                                    </p>

                                </div>

                            </div>

                        )}

                    </div>

                </div>

            </aside>
        </>
    );
}
