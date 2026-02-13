"use client";

import Link from "next/link";
import { IoHeartOutline } from "react-icons/io5";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-black bg-white py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        
        {/* LEFT: BRANDING & ORIGIN */}
        <div className="flex flex-col gap-1 items-center md:items-start">
          <div className="flex items-center gap-2">
            <span className="font-black text-xs uppercase tracking-tighter md:text-sm">
              DEVHELP.DEV
            </span>
            <div className="h-3 w-px bg-gray-300 hidden md:block"></div>
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
              Engine_v1.0
            </span>
          </div>
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">
            Developed by <a href="https://gestions.es" target="_blank" className="text-black hover:underline">Gestions.es</a>
          </span>
        </div>

        {/* CENTER: TECHNICAL LINKS */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
          <Link 
            href="/docs" 
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0a0a0a] hover:text-blue-600 transition-colors"
          >
            [ Documentation ]
          </Link>
          <Link 
            href="/legal" 
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0a0a0a] hover:text-blue-600 transition-colors"
          >
            [ Legal_Notice ]
          </Link>
          <Link 
            href="/donate" 
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-600 hover:text-red-700 transition-colors flex items-center gap-1"
          >
            <IoHeartOutline className="animate-pulse" /> [ Support_Project ]
          </Link>
        </nav>

        {/* RIGHT: SYSTEM DATA */}
        <div className="flex flex-col items-center md:items-end gap-1 font-mono text-[10px] uppercase tracking-[0.15em] text-gray-500">
          <span>© {currentYear} All units operational.</span>
          <span className="text-gray-300">Isolated_Environment: Secure</span>
        </div>
        
      </div>
    </footer>
  );
}