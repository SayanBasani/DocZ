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
      <div className=" min-h-screen bg-slate-100 dark:bg-[#0B1220] transition-colors duration-300 " >
        <Sidebar  collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className={` ${collapsed ? "lg:ml-20":"lg:ml-72"} transition-all duration-300 `}>
          <Header collapsed={collapsed} user={user} />
          <main className="p-4 sm:p-6 lg:p-8 pt-24 sm:pt-24 lg:pt-24 min-h-screen ">
            <div className="mx-auto max-w-[1600px]">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}