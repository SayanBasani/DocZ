"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {

    return (

        <section className="py-24">

            <div className="mx-auto max-w-7xl px-6">

                <div className="overflow-hidden rounded-[40px] bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 px-8 py-16 text-center text-white shadow-2xl lg:px-20">

                    <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">

                        Get Started Today

                    </span>

                    <h2 className="mt-8 text-4xl font-black sm:text-5xl">

                        Start Your Trading Journey With Trader Pro

                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg text-blue-100">

                        Join thousands of traders using AI-powered tools, portfolio tracking and real-time market insights to make smarter investment decisions.

                    </p>

                    <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

                        <Link href="/signup" className="flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-blue-600 transition hover:bg-slate-100">

                            Create Free Account

                            <ArrowRight size={20} />

                        </Link>

                        <Link href="/login" className="flex items-center justify-center rounded-2xl border border-white/40 px-8 py-4 font-semibold transition hover:bg-white/10">

                            Login

                        </Link>

                    </div>

                </div>

            </div>

        </section>

    );

}