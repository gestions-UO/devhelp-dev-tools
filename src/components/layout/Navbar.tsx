"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-6 inset-x-0 z-50 mx-auto max-w-5xl px-4"
    >
      <div className="flex h-14 items-center justify-between px-6 bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-full">
        
        {/* LOGO AREA */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-7 w-7 items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 rounded-full transition-transform duration-500 group-hover:scale-110 shadow-sm">
            <svg
              className="h-3.5 w-3.5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            DevHelp<span className="text-gray-400 font-medium">.dev</span>
          </h1>
        </Link>

        {/* ATTRIBUTION BADGE & NAV LINKS */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
            <Link href="/launcher" className="hover:text-gray-900 transition-colors">Tools</Link>
            <Link href="/docs" className="hover:text-gray-900 transition-colors">Docs</Link>
          </div>
          <div className="h-4 w-px bg-gray-300 hidden md:block"></div>
          <span className="inline-flex items-center rounded-full bg-white/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-500 shadow-sm border border-white/80">
            By Gestions
          </span>
        </div>
        
      </div>
    </motion.nav>
  );
}