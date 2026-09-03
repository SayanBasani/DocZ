"use client";

import Link from "next/link";
import { BsTwitter } from "react-icons/bs";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaGithub,
    FaXTwitter
} from "react-icons/fa6";
import { LiaLinkedin } from "react-icons/lia";
const quickLinks = [
    {
        name: "Features",
        href: "#features"
    },
    {
        name: "Markets",
        href: "#markets"
    },
    {
        name: "Pricing",
        href: "#pricing"
    },
    {
        name: "FAQ",
        href: "#faq"
    }
];

const companyLinks = [
    {
        name: "About",
        href: "/about"
    },
    {
        name: "Contact",
        href: "/contact"
    },
    {
        name: "Privacy Policy",
        href: "/privacy"
    },
    {
        name: "Terms & Conditions",
        href: "/terms"
    }
];

export default function Footer() {

    return (

        <footer className="border-t border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-[#08111F]">

            <div className="mx-auto max-w-7xl px-6 py-20">

                <div className="grid gap-12 lg:grid-cols-4">

                    <div>

                        <Link href="/" className="text-3xl font-black text-blue-600">

                            Trader Pro

                        </Link>

                        <p className="mt-6 leading-8 text-gray-600 dark:text-gray-400">

                            Modern AI-powered trading platform designed to help investors trade smarter and manage their portfolios efficiently.

                        </p>

                        <div className="mt-8 flex gap-4">

                            <Link href="#" className="rounded-xl bg-white p-3 shadow transition hover:bg-blue-600 hover:text-white dark:bg-slate-800">

                                <FaFacebookF size={20} />

                            </Link>

                            <Link href="#" className="rounded-xl bg-white p-3 shadow transition hover:bg-blue-600 hover:text-white dark:bg-slate-800">

                                <BsTwitter size={20} />

                            </Link>

                            <Link href="#" className="rounded-xl bg-white p-3 shadow transition hover:bg-blue-600 hover:text-white dark:bg-slate-800">

                                <FaInstagram size={20} />

                            </Link>

                            <Link href="#" className="rounded-xl bg-white p-3 shadow transition hover:bg-blue-600 hover:text-white dark:bg-slate-800">

                                <LiaLinkedin size={20} />

                            </Link>

                            <Link href="#" className="rounded-xl bg-white p-3 shadow transition hover:bg-blue-600 hover:text-white dark:bg-slate-800">

                                <FaGithub size={20} />

                            </Link>

                        </div>

                    </div>

                    <div>

                        <h3 className="text-xl font-bold">

                            Quick Links

                        </h3>

                        <div className="mt-6 flex flex-col gap-4">

                            {quickLinks.map((item) => (

                                <Link key={item.name} href={item.href} className="text-gray-600 transition hover:text-blue-600 dark:text-gray-400">

                                    {item.name}

                                </Link>

                            ))}

                        </div>

                    </div>

                    <div>

                        <h3 className="text-xl font-bold">

                            Company

                        </h3>

                        <div className="mt-6 flex flex-col gap-4">

                            {companyLinks.map((item) => (

                                <Link key={item.name} href={item.href} className="text-gray-600 transition hover:text-blue-600 dark:text-gray-400">

                                    {item.name}

                                </Link>

                            ))}

                        </div>

                    </div>

                    <div>

                        <h3 className="text-xl font-bold">

                            Newsletter

                        </h3>

                        <p className="mt-6 text-gray-600 dark:text-gray-400">

                            Subscribe to receive market news, trading tips and product updates.

                        </p>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="mt-6 w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-900"
                        />

                        <button className="mt-4 w-full rounded-2xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700">

                            Subscribe

                        </button>

                    </div>

                </div>

                <div className="mt-16 border-t border-slate-300 pt-8 text-center text-gray-500 dark:border-slate-700">

                    © 2026 Trader Pro. All Rights Reserved.

                </div>

            </div>

        </footer>

    );

}