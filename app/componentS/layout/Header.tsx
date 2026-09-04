"use client";

import { SafeUser } from "@/lib/types/user";
import { useState, useRef, useEffect } from "react";
import { Bell, Search, ChevronDown } from "lucide-react";
import ProfileDropDown from "./ProfileDropDown";
import { usePathname } from "next/navigation";


interface SidebarProps { collapsed: boolean; user:SafeUser }


export default function Header({collapsed,user}:SidebarProps) {

  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const pageTitle = pathname.startsWith("/documents/upload")
    ? "Upload document"
    : pathname.startsWith("/documents/")
      ? "Document details"
      : pathname.startsWith("/documents")
        ? "Documents"
        : pathname.startsWith("/profile")
          ? "Profile"
          : pathname.startsWith("/settings")
            ? "Settings"
            : "Dashboard";

  const profileRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
          if (
              profileRef.current &&
              !profileRef.current.contains(event.target as Node)
          ) {
              setProfileOpen(false);
          }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      };
  }, []);
  return (
    <header className={`fixed top-0 right-0 z-30 h-[4.5rem] w-full border-b border-slate-200 bg-white/90 text-slate-900 backdrop-blur-xl transition-all dark:border-slate-800/90 dark:bg-[#091727]/90 dark:text-white ${collapsed ? "lg:w-[calc(100%-5rem)]" : "lg:w-[calc(100%-18rem)]"}`}>
      <div className="flex h-full items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Left */}

        <div className="ml-11 min-w-0 lg:ml-0">

          <div>
            <h1
              className="truncate text-lg font-bold tracking-tight sm:text-xl" >
              {pageTitle}
            </h1>

            <p className="truncate text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
              Welcome back{user?.profile?.firstName ? `, ${user.profile.firstName}` : ""}
            </p>
          </div>

        </div>

        {/* Right */}

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">

          {/* Search */}

          <div
            className="hidden items-center gap-3 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2 dark:border-slate-700 dark:bg-slate-800/70 lg:flex">
            <Search
              size={18}
              className="text-slate-500"
            />

            <input
              type="text"
              placeholder="Search..."

              aria-label="Search workspace"
              className="w-40 bg-transparent text-sm outline-none placeholder:text-slate-500 xl:w-56" />
          </div>

          {/* Notification */}

          <button aria-label="Notifications" className="relative rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-700 sm:p-3">
            <Bell size={20} />

            <span className=" absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 " />
          </button>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button aria-expanded={profileOpen} aria-label="Open profile menu" onClick={()=> setProfileOpen(!profileOpen)} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-2 py-2 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-slate-600 dark:hover:bg-slate-700 sm:px-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white sm:h-10 sm:w-10">
                {user?.username?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="hidden text-left md:block">
                <p className="max-w-28 truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                  {user?.username}
                </p>
                <p className="text-xs capitalize text-slate-500 dark:text-slate-400">
                  {user?.role}
                </p>
              </div>
              <ChevronDown size={18} className="hidden text-slate-500 dark:text-slate-400 md:block" />
            </button>
            {profileOpen && (

                <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40">

                  <ProfileDropDown/>
                  
                </div>

            )}
          </div>
        </div>
      </div>
    </header>
  );
}
