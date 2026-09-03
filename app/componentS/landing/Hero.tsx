"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp, Wallet, BrainCircuit } from "lucide-react";

export default function Hero() {

    return (

        <section className="relative overflow-hidden">

            <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"></div>

            <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"></div>

            <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:py-28">

                <div>

                    <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">

                        🚀 AI Powered Trading Platform

                    </span>

                    <h1 className="mt-8 text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">

                        Trade Smarter

                        <br />

                        With

                        <span className="text-blue-600">

                            {" "}Trader Pro

                        </span>

                    </h1>

                    <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-400">

                        Track your portfolio, analyze the market, receive AI-powered insights and manage every investment from one beautiful dashboard.

                    </p>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">

                        <Link href="/signup" className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:-translate-y-1 hover:bg-blue-700">

                            Start Trading

                            <ArrowRight size={20} />

                        </Link>

                        <Link href="/login" className="flex items-center justify-center rounded-2xl border border-gray-300 px-8 py-4 font-semibold transition hover:bg-gray-100 dark:border-slate-700 dark:hover:bg-slate-800">

                            Live Demo

                        </Link>

                    </div>

                    <div className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-4">

                        <div>

                            <h2 className="text-3xl font-bold text-blue-600">

                                120K+

                            </h2>

                            <p className="mt-2 text-sm text-gray-500">

                                Users

                            </p>

                        </div>

                        <div>

                            <h2 className="text-3xl font-bold text-blue-600">

                                180+

                            </h2>

                            <p className="mt-2 text-sm text-gray-500">

                                Countries

                            </p>

                        </div>

                        <div>

                            <h2 className="text-3xl font-bold text-blue-600">

                                $2.4B

                            </h2>

                            <p className="mt-2 text-sm text-gray-500">

                                Volume

                            </p>

                        </div>

                        <div>

                            <h2 className="text-3xl font-bold text-blue-600">

                                99.9%

                            </h2>

                            <p className="mt-2 text-sm text-gray-500">

                                Uptime

                            </p>

                        </div>

                    </div>

                </div>

                <div className="relative">

                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-700 dark:bg-[#162033]">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-gray-500">

                                    Portfolio Balance

                                </p>

                                <h2 className="mt-2 text-5xl font-bold">

                                    $125,420

                                </h2>

                            </div>

                            <TrendingUp size={44} className="text-green-500" />

                        </div>

                        <div className="mt-10 h-64 rounded-2xl bg-gradient-to-br from-blue-100 via-cyan-100 to-indigo-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-900"></div>

                        <div className="mt-8 grid grid-cols-3 gap-4">

                            <div className="rounded-2xl bg-slate-100 p-4 text-center dark:bg-slate-800">

                                <Wallet className="mx-auto text-blue-600" />

                                <h3 className="mt-3 text-xl font-bold">

                                    $52K

                                </h3>

                                <p className="text-sm text-gray-500">

                                    Assets

                                </p>

                            </div>

                            <div className="rounded-2xl bg-slate-100 p-4 text-center dark:bg-slate-800">

                                <TrendingUp className="mx-auto text-green-500" />

                                <h3 className="mt-3 text-xl font-bold">

                                    +8.2%

                                </h3>

                                <p className="text-sm text-gray-500">

                                    Profit

                                </p>

                            </div>

                            <div className="rounded-2xl bg-slate-100 p-4 text-center dark:bg-slate-800">

                                <BrainCircuit className="mx-auto text-purple-500" />

                                <h3 className="mt-3 text-xl font-bold">

                                    AI

                                </h3>

                                <p className="text-sm text-gray-500">

                                    Signals

                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="absolute -left-8 top-10 hidden rounded-2xl bg-white p-5 shadow-xl dark:bg-[#162033] xl:block">

                        <p className="text-sm text-gray-500">

                            BTC

                        </p>

                        <h3 className="mt-2 text-2xl font-bold">

                            $118,420

                        </h3>

                        <p className="text-green-500">

                            +2.84%

                        </p>

                    </div>

                    <div className="absolute -right-8 bottom-10 hidden rounded-2xl bg-white p-5 shadow-xl dark:bg-[#162033] xl:block">

                        <p className="text-sm text-gray-500">

                            ETH

                        </p>

                        <h3 className="mt-2 text-2xl font-bold">

                            $3,486

                        </h3>

                        <p className="text-green-500">

                            +1.72%

                        </p>

                    </div>

                </div>

            </div>

        </section>

    );

}