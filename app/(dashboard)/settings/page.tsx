"use client";

import { Bell, Check, Laptop, Moon, ShieldCheck, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const settingsGroups = [
  {
    icon: Bell,
    title: "Notifications",
    description: "Control alerts for important document activity.",
    items: [
      ["Document activity", "Receive updates when documents are accessed or changed."],
      ["Security alerts", "Get notified about sign-ins and account activity."],
    ],
  },
  {
    icon: ShieldCheck,
    title: "Workspace security",
    description: "Review security controls for your DocZ workspace.",
    items: [
      ["Active sessions", "Review devices that are currently signed in."],
      ["Password and recovery", "Keep your account recovery information current."],
    ],
  },
];

export default function SettingsPage() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="ui-stagger mx-auto max-w-5xl space-y-8">
      <div>
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Workspace preferences</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Settings</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
          Personalize your workspace and review the controls that help keep documents protected.
        </p>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/10">
        <div className="border-b border-slate-200 px-5 py-5 dark:border-slate-800 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-600 dark:text-blue-400"><Moon size={20} /></div>
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">Appearance</h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Choose the interface theme that feels best for you.</p>
            </div>
          </div>
        </div>
        <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
          {[
            { value: "dark", title: "Dark", description: "Focused and comfortable in low light", icon: Moon },
            { value: "light", title: "Light", description: "A bright workspace with clear contrast", icon: Sun },
          ].map(({ value, title, description, icon: Icon }) => {
            const selected = resolvedTheme === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setTheme(value)}
                aria-pressed={selected}
                className={`ui-interactive flex items-center gap-4 rounded-xl border p-4 text-left ${selected ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-950/15" : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600 dark:hover:bg-slate-800"}`}
              >
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${selected ? "bg-blue-500 text-white" : "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300"}`}><Icon size={20} /></span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium text-slate-900 dark:text-white">{title}</span>
                  <span className="mt-0.5 block text-sm text-slate-600 dark:text-slate-400">{description}</span>
                </span>
                {selected && <Check size={19} className="shrink-0 text-blue-500 dark:text-blue-400" />}
              </button>
            );
          })}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {settingsGroups.map(({ icon: Icon, title, description, items }) => (
          <section key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/10 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-indigo-500/10 p-2.5 text-indigo-600 dark:text-indigo-400"><Icon size={20} /></div>
              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white">{title}</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{description}</p>
              </div>
            </div>
            <div className="mt-5 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-slate-50/70 dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-950/30">
              {items.map(([itemTitle, itemDescription]) => (
                <div key={itemTitle} className="flex items-center gap-3 p-4">
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-slate-800 dark:text-slate-100">{itemTitle}</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-600 dark:text-slate-400">{itemDescription}</span>
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 text-sm text-slate-700 dark:text-slate-300">
        <Laptop size={19} className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400" />
        <p>Your preference is saved on this device and applied across the DocZ workspace.</p>
      </div>
    </div>
  );
}
