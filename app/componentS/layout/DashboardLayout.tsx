"use client"
import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { SafeUser } from "@/lib/types/user";
import SessionProvider from "../auth/SessionProvider";

interface DashboardLayoutProps {
    children: React.ReactNode;
    user: SafeUser;
    accessTokenLifetime: number;

}

export default function DashboardLayout({
  children,user,accessTokenLifetime,
}: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <SessionProvider accessTokenLifetime={accessTokenLifetime}>
      <div className="min-h-screen bg-slate-100 transition-colors duration-300 dark:bg-[#07111F]">
        <Sidebar  collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className={` ${collapsed ? "lg:ml-20":"lg:ml-72"} transition-all duration-300 `}>
          <Header collapsed={collapsed} user={user} />
          <main className="ui-fade-in min-h-screen p-4 pt-24 sm:p-6 sm:pt-28 lg:p-8 lg:pt-28">
            <div className="mx-auto max-w-[1600px]">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}
