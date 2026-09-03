export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-slate-100 dark:bg-[#0B1220]">

            {/* Left Section */}

            <section className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-linear-to-br from-sky-600 via-blue-700 to-indigo-900 p-12 text-white lg:flex">

                {/* Blur */}
                

                <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

                <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-300/10 blur-3xl" />

                {/* Logo */}

                <div className="relative z-10">

                    <h1 className="text-5xl font-bold ">
                        Trader Pro
                    </h1>

                    <p className="mt-4 max-w-md text-lg text-blue-100">
                        Professional Trading Dashboard for Crypto, Forex and Stocks.
                    </p>

                </div>

                {/* Center */}

                <div className="relative z-10 space-y-8">

                    <div>

                        <h2 className="text-3xl font-bold">
                            Smart Trading
                        </h2>

                        <p className="mt-2 text-blue-100">
                            Track every investment from one dashboard.
                        </p>

                    </div>

                    <div className="grid grid-cols-2 gap-5">

                        <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-xl">

                            <h3 className="text-3xl font-bold">
                                120+
                            </h3>

                            <p className="mt-2 text-blue-100">
                                Markets
                            </p>

                        </div>

                        <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-xl">

                            <h3 className="text-3xl font-bold">
                                24/7
                            </h3>

                            <p className="mt-2 text-blue-100">
                                Live Updates
                            </p>

                        </div>

                        <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-xl">

                            <h3 className="text-3xl font-bold">
                                AI
                            </h3>

                            <p className="mt-2 text-blue-100">
                                Prediction
                            </p>

                        </div>

                        <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-xl">

                            <h3 className="text-3xl font-bold">
                                Secure
                            </h3>

                            <p className="mt-2 text-blue-100">
                                Authentication
                            </p>

                        </div>

                    </div>

                </div>

                {/* Footer */}

                <div className="relative z-10 text-blue-100">
                    © 2026 Trader Pro
                </div>

            </section>

            {/* Right */}

            <section className="flex w-full items-center justify-center p-6 lg:w-1/2 lg:p-12">

                <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl dark:border-slate-700 dark:bg-[#162033]">

                    {children}

                </div>

            </section>

        </div>
    );
}