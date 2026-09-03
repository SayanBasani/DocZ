"use client";

import ThemeToggle from "@/componentS/theme/theme-toggle-btn";
import { SafeUser } from "@/lib/types/user";
import { useState, useRef, useEffect } from "react";
import { Bell, Search, ChevronDown } from "lucide-react";
import ProfileDropDown from "./ProfileDropDown";


interface SidebarProps { collapsed: boolean; user:SafeUser }


export default function Header({collapsed,user}:SidebarProps) {

  const [profileOpen, setProfileOpen] = useState(false);

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
    <header className={`text-gray-900 dark:text-white fixed top-0 right-0 z-30 h-20 w-full ${collapsed?"lg:w-[calc(100%-5rem)]":"lg:w-[calc(100%-18rem)]"} border-b border-gray-200 dark:border-slate-700 bg-white/90 dark:bg-[#101827]/90 backdrop-blur-xl transition-all `} >
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8  " >
        {/* Left */}

        <div className="mx-10 lg:mx-0 flex items-center gap-5">

          <div>
            <h1
              className=" text-2xl font-bold" >
              Dashboard
            </h1>

            <p
              className=" text-sm text-gray-500 dark:text-gray-400 " >
              Welcome {user?.profile?.firstName}
            </p>
          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          {/* Search */}

          <div
            className=" hidden md:flex items-center gap-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-800 px-4 py-2 " >
            <Search
              size={18}
              className="text-gray-500"
            />

            <input
              type="text"
              placeholder="Search..."

              className=" w-48 bg-transparent outline-none placeholder:text-gray-500 " />
          </div>

          {/* Theme */}

          {/* <ThemeToggle /> */}

          {/* Notification */}

          <button className=" relative rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 transition hover:scale-105 " >
            <Bell size={20} />

            <span className=" absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 " />
          </button>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button onClick={()=> setProfileOpen(!profileOpen)} className=" flex items-center gap-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 transition hover:bg-gray-100 dark:hover:bg-slate-700 " >
              <div className=" flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold">
                {user?.username.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block text-left">
                <p className="font-medium text-gray-500 dark:text-gray-400">
                  {user?.username}
                </p>
                <p className="text-xs text-gray-800 dark:text-gray-400">
                  {user?.role}
                </p>
              </div>
              <ChevronDown size={18} className="hidden sm:block " />
            </button>
            {profileOpen && (

                <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-2xl">

                  <ProfileDropDown/>
                  
                </div>

            )}
          </div>
        </div>
      </div>
    </header>
  );
}