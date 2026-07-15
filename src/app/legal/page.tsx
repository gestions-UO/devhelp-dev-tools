"use client";

import Link from "next/link";
// Cambiamos BsBalanceScale por BsSetting2 y BsShieldShaded
import { ArrowLeft, Setting2, Shield, FileText, X } from "reicon-react";
import Button from "@/components/ui/Button";

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0a0a0a] font-sans selection:bg-[#0a0a0a] selection:text-white">
      {/* TECHNICAL GRID BACKGROUND WITH BLURRY BLOBS */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-red-400/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px]"></div>
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-3xl border-b border-white/50 shadow-sm transition-all duration-300">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3 font-bold uppercase text-xs tracking-[0.2em] hover:text-blue-600 transition-colors bg-white/50 px-4 py-2 rounded-full border border-white shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:-translate-x-1 transition-transform">
              <ArrowLeft size={14} />
            </div>
            Workbench
          </Link>
          <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest bg-white/50 px-3 py-1.5 rounded-full border border-white">
            Legal_Ref: 2024.REV02
          </span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-40 relative z-10">
        <header className="mb-24 text-center animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6 text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-500">Legal &<br />Privacy</h1>
          <p className="inline-block bg-white/60 backdrop-blur-md border border-white shadow-sm text-gray-500 font-mono text-xs uppercase tracking-widest px-6 py-3 rounded-full">// Clarity in engineering.</p>
        </header>

        <div className="space-y-12 mb-32">
          
          {/* 1. PRIVACY POLICY */}
          <section className="animate-fade-in-up bg-white/40 backdrop-blur-xl border border-white p-10 md:p-14 rounded-[40px] shadow-[0_8px_40px_rgb(0,0,0,0.03)] relative overflow-hidden group hover:bg-white/60 transition-all duration-500">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-100/50 rounded-full blur-[60px] pointer-events-none group-hover:bg-blue-200/50 transition-colors"></div>
            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-blue-50 text-blue-600 group-hover:scale-110 transition-transform duration-500">
                    <Shield size={28} />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900">Privacy Policy</h2>
                </div>
                <div className="prose prose-sm text-gray-500 leading-relaxed space-y-6 font-medium max-w-none">
                <p className="text-base bg-white/50 p-6 rounded-3xl border border-white">
                    <strong>DEVHELP.DEV</strong> operates as a stateless environment. We implement a strict <strong className="text-blue-600">Zero-Data-Transfer</strong> architecture.
                </p>
                <ul className="space-y-3">
                    <li className="flex items-start gap-4 bg-white/40 p-4 rounded-2xl border border-white hover:bg-white transition-colors">
                        <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">✓</div>
                        <span><strong className="text-gray-900">Local Execution:</strong> Your data (JSON, Logs, etc.) is processed exclusively in your browser's RAM.</span>
                    </li>
                    <li className="flex items-start gap-4 bg-white/40 p-4 rounded-2xl border border-white hover:bg-white transition-colors">
                        <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">✓</div>
                        <span><strong className="text-gray-900">No Persistence:</strong> We do not use databases or cloud storage. Closing the tab destroys the session.</span>
                    </li>
                    <li className="flex items-start gap-4 bg-white/40 p-4 rounded-2xl border border-white hover:bg-white transition-colors">
                        <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">✓</div>
                        <span><strong className="text-gray-900">No Telemetry:</strong> We do not track your input content or technical payloads.</span>
                    </li>
                </ul>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-3xl border border-blue-100 font-mono text-[11px] font-bold uppercase tracking-widest text-blue-800 mt-8 text-center shadow-inner">
                    "Technical privacy is not an option; it is the default state of this workbench."
                </div>
                </div>
            </div>
          </section>

          {/* 2. OPEN SOURCE LICENSE */}
          <section className="animate-fade-in-up bg-white/40 backdrop-blur-xl border border-white p-10 md:p-14 rounded-[40px] shadow-[0_8px_40px_rgb(0,0,0,0.03)] relative overflow-hidden group hover:bg-white/60 transition-all duration-500" style={{ animationDelay: '100ms' }}>
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gray-200/50 rounded-full blur-[60px] pointer-events-none group-hover:bg-gray-300/50 transition-colors"></div>
            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-gray-100 text-gray-800 group-hover:scale-110 transition-transform duration-500">
                    <Setting2 size={28} />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900">Open Source</h2>
                </div>
                <div className="prose prose-sm text-gray-500 leading-relaxed font-medium max-w-none">
                <p className="text-base bg-white/50 p-6 rounded-3xl border border-white mb-6">
                    This project is released under the <strong className="text-gray-900">MIT License</strong>. We believe in open tools for a better developer ecosystem.
                </p>
                <div className="bg-white border border-gray-100 p-8 font-mono text-[10px] uppercase leading-relaxed text-gray-400 rounded-3xl shadow-inner">
                    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files... (MIT Standard)
                </div>
                </div>
            </div>
          </section>

          {/* 3. DISCLAIMER */}
          <section className="animate-fade-in-up bg-white/40 backdrop-blur-xl border border-white p-10 md:p-14 rounded-[40px] shadow-[0_8px_40px_rgb(0,0,0,0.03)] relative overflow-hidden group hover:bg-white/60 transition-all duration-500" style={{ animationDelay: '200ms' }}>
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-100/50 rounded-full blur-[60px] pointer-events-none group-hover:bg-red-200/50 transition-colors"></div>
            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-red-50 text-red-600 group-hover:scale-110 transition-transform duration-500">
                    <FileText size={28} />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900">Disclaimer</h2>
                </div>
                <div className="prose prose-sm text-gray-500 leading-relaxed font-medium max-w-none space-y-6">
                <p className="uppercase text-[11px] font-bold tracking-widest bg-red-50 p-4 rounded-2xl border border-red-100 text-red-600">
                    The software is provided "AS IS", without warranty of any kind.
                </p>
                <p className="bg-white/50 p-6 rounded-3xl border border-white">
                    In no event shall the authors be liable for any claim, damages or other liability arising from the use of these tools. Use at your own risk in production environments.
                </p>
                </div>
            </div>
          </section>

        </div>

        <footer className="mt-24 pb-20 text-center animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <Link href="/">
            <button className="px-12 py-5 text-sm font-bold tracking-[0.2em] text-gray-600 uppercase transition-all duration-300 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:bg-gray-50 hover:-translate-y-1">
              Return to Workbench
            </button>
          </Link>
        </footer>
      </main>
    </div>
  );
}