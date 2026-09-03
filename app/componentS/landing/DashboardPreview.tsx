"use client";

import { ArrowUpRight, ArrowDownRight, Wallet, Activity, PieChart, TrendingUp } from "lucide-react";

export default function DashboardPreview() {

    return (

        <section className="bg-slate-50 py-24 dark:bg-[#0D1728]">

            <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

                <div>

                    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">

                        Dashboard
                    </span>

                    <h2 className="mt-6 text-4xl font-black sm:text-5xl">

                        Professional Trading Dashboard
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">

                        Manage your portfolio, monitor the market and analyze your performance from one beautiful dashboard built for every trader.
                    </p>

                    <div className="mt-10 space-y-6">

                        <div className="flex items-start gap-4">

                            <div className="rounded-2xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30">

                                <Wallet size={28} />

                            </div>

                            <div>

                                <h3 className="text-xl font-bold">

                                    Portfolio Management

                                </h3>

                                <p className="mt-2 text-gray-600 dark:text-gray-400">

                                    Track assets, investments, profits and losses in real time.

                                </p>

                            </div>

                        </div>

                        <div className="flex items-start gap-4">

                            <div className="rounded-2xl bg-green-100 p-3 text-green-600 dark:bg-green-900/30">

                                <Activity size={28} />

                            </div>

                            <div>

                                <h3 className="text-xl font-bold">

                                    Live Analytics

                                </h3>

                                <p className="mt-2 text-gray-600 dark:text-gray-400">

                                    Follow market movements with live performance indicators.

                                </p>

                            </div>

                        </div>

                        <div className="flex items-start gap-4">

                            <div className="rounded-2xl bg-purple-100 p-3 text-purple-600 dark:bg-purple-900/30">

                                <PieChart size={28} />

                            </div>

                            <div>

                                <h3 className="text-xl font-bold">

                                    Smart Reports

                                </h3>

                                <p className="mt-2 text-gray-600 dark:text-gray-400">

                                    Understand your trading habits with AI-powered reports.

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-[#162033]">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-500">

                                Total Balance

                            </p>

                            <h2 className="mt-2 text-4xl font-bold">

                                $248,650

                            </h2>

                        </div>

                        <div className="rounded-2xl bg-green-100 p-4 text-green-600 dark:bg-green-900/30">

                            <TrendingUp size={34} />

                        </div>

                    </div>

                    <div className="mt-8 h-56 rounded-3xl bg-gradient-to-br from-blue-100 via-cyan-100 to-indigo-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-900"></div>

                    <div className="mt-8 space-y-4">

                        <div className="flex items-center justify-between rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">

                            <div>

                                <h4 className="font-bold">

                                    Bitcoin

                                </h4>

                                <p className="text-sm text-gray-500">

                                    BTC

                                </p>

                            </div>

                            <div className="text-right">

                                <p className="font-bold">

                                    $118,420

                                </p>

                                <p className="flex items-center justify-end gap-1 text-green-500">

                                    <ArrowUpRight size={16} />

                                    +2.84%

                                </p>

                            </div>

                        </div>

                        <div className="flex items-center justify-between rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">

                            <div>

                                <h4 className="font-bold">

                                    Ethereum

                                </h4>

                                <p className="text-sm text-gray-500">

                                    ETH

                                </p>

                            </div>

                            <div className="text-right">

                                <p className="font-bold">

                                    $3,486

                                </p>

                                <p className="flex items-center justify-end gap-1 text-green-500">

                                    <ArrowUpRight size={16} />

                                    +1.72%

                                </p>

                            </div>

                        </div>

                        <div className="flex items-center justify-between rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">

                            <div>

                                <h4 className="font-bold">

                                    Solana

                                </h4>

                                <p className="text-sm text-gray-500">

                                    SOL

                                </p>

                            </div>

                            <div className="text-right">

                                <p className="font-bold">

                                    $182.54

                                </p>

                                <p className="flex items-center justify-end gap-1 text-red-500">

                                    <ArrowDownRight size={16} />

                                    -0.68%

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}