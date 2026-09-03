"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
    {
        label: "Features",
        href: "#features"
    },
    {
        label: "Markets",
        href: "#markets"
    },
    {
        label: "Pricing",
        href: "#pricing"
    },
    {
        label: "FAQ",
        href: "#faq"
    }
];

export default function Navbar() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {

        const handleScroll = () => {

            setScrolled(window.scrollY > 20);

        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);

    }, []);

    useEffect(() => {

        document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";

        return () => {

            document.body.style.overflow = "auto";

        };

    }, [mobileMenuOpen]);

    return (

        <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-slate-200 bg-white/90 shadow-lg backdrop-blur-xl dark:border-slate-700 dark:bg-[#08111F]/90" : "bg-transparent"}`}>

            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

                <Link href="/" className="text-3xl font-extrabold text-blue-600">
                    Trader Pro
                </Link>

                <nav className="hidden items-center gap-10 lg:flex">

                    {navItems.map((item) => (

                        <Link key={item.label} href={item.href} className="font-medium text-slate-700 transition hover:text-blue-600 dark:text-slate-300">

                            {item.label}

                        </Link>

                    ))}

                </nav>

                <div className="hidden items-center gap-4 lg:flex">

                    <Link href="/login" className="font-medium text-slate-700 transition hover:text-blue-600 dark:text-slate-300">

                        Login

                    </Link>

                    <Link href="/signup" className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">

                        Get Started

                    </Link>

                </div>

                <button onClick={() => setMobileMenuOpen(true)} className="rounded-xl p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden">

                    <Menu size={28} />

                </button>

            </div>

            <div className={`fixed inset-0 z-50 transition-all duration-300 lg:hidden ${mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"}`}>

                <div onClick={() => setMobileMenuOpen(false)} className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

                <div className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 dark:bg-[#08111F] ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>

                    <div className="flex items-center justify-between border-b border-slate-200 p-6 dark:border-slate-700">

                        <h2 className="text-2xl font-bold text-blue-600">

                            Trader Pro

                        </h2>

                        <button onClick={() => setMobileMenuOpen(false)} className="rounded-lg p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800">

                            <X size={26} />

                        </button>

                    </div>

                    <nav className="flex flex-col p-6">

                        {navItems.map((item) => (

                            <Link key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-4 py-4 text-lg font-medium transition hover:bg-slate-100 dark:hover:bg-slate-800">

                                {item.label}

                            </Link>

                        ))}

                    </nav>

                    <div className="mt-4 border-t border-slate-200 p-6 dark:border-slate-700">

                        <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="mb-4 flex w-full items-center justify-center rounded-xl border border-slate-300 py-3 font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">

                            Login

                        </Link>

                        <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">

                            Get Started

                        </Link>

                    </div>

                </div>

            </div>

        </header>

    );

}