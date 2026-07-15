"use client";

import Link from "next/link";
import { Heart } from "reicon-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto relative z-10 pt-20 pb-8 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-[32px] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          
          {/* LEFT: BRANDING & ORIGIN */}
          <div className="flex flex-col gap-2 items-center md:items-start">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
                 <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                 </svg>
              </div>
              <span className="font-bold text-gray-900 tracking-tight">
                DevHelp.dev
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white text-[10px] font-mono text-gray-400 uppercase tracking-widest border border-gray-100 shadow-sm">
                v2.0
              </span>
            </div>
            <span className="text-xs text-gray-500 font-medium ml-1">
              Developed by <a href="https://gestions.es" target="_blank" className="text-gray-900 hover:text-blue-600 transition-colors">Gestions.es</a>
            </span>
          </div>

          {/* CENTER: TECHNICAL LINKS */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            <Link href="/docs" className="text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors">
              Documentation
            </Link>
            <Link href="/legal" className="text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors">
              Legal Notice
            </Link>
            <Link href="/donate" className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors flex items-center gap-1.5 bg-red-50 px-3 py-1 rounded-full">
              <Heart className="animate-pulse" /> Support Project
            </Link>
          </nav>

          {/* RIGHT: SYSTEM DATA */}
          <div className="flex flex-col items-center md:items-end gap-1.5 text-xs text-gray-400">
            <span>© {currentYear} All units operational.</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
              <span>Isolated Environment: Secure</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}