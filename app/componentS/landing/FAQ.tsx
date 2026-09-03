"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "Is Trader Pro free to use?",
        answer: "Yes. You can start with our free plan and upgrade whenever you need more advanced trading features."
    },
    {
        question: "Can I track my portfolio?",
        answer: "Yes. Trader Pro lets you monitor your portfolio, profits, losses and asset allocation in real time."
    },
    {
        question: "Does Trader Pro provide AI trading signals?",
        answer: "Yes. Our AI analyzes market trends and provides intelligent trading insights to help you make better decisions."
    },
    {
        question: "Is my data secure?",
        answer: "Absolutely. Your account is protected using modern encryption and secure authentication methods."
    },
    {
        question: "Can I use Trader Pro on mobile?",
        answer: "Yes. Trader Pro is fully responsive and works perfectly on desktop, tablet and mobile devices."
    }
];

export default function FAQ() {

    const [open, setOpen] = useState<number | null>(0);

    return (

        <section id="faq" className="bg-slate-50 py-24 dark:bg-[#0D1728]">

            <div className="mx-auto max-w-4xl px-6">

                <div className="text-center">

                    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">

                        FAQ

                    </span>

                    <h2 className="mt-6 text-4xl font-black sm:text-5xl">

                        Frequently Asked Questions

                    </h2>

                    <p className="mt-5 text-lg text-gray-600 dark:text-gray-400">

                        Everything you need to know about Trader Pro.

                    </p>

                </div>

                <div className="mt-16 space-y-5">

                    {faqs.map((faq, index) => (

                        <div key={faq.question} className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-[#162033]">

                            <button onClick={() => setOpen(open === index ? null : index)} className="flex w-full items-center justify-between px-6 py-5 text-left">

                                <span className="text-lg font-semibold">

                                    {faq.question}

                                </span>

                                <ChevronDown className={`transition duration-300 ${open === index ? "rotate-180" : ""}`} />

                            </button>

                            <div className={`grid transition-all duration-300 ${open === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>

                                <div className="overflow-hidden">

                                    <p className="px-6 pb-6 leading-7 text-gray-600 dark:text-gray-400">

                                        {faq.answer}

                                    </p>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

}