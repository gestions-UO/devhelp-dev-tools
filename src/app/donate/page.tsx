"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Copy, Check, Wallet, Heart, InfoCircle } from "reicon-react";

export default function DonatePage() {
  const [copied, setCopied] = useState(false);
  const walletAddress = "GAKZXJVMXJ6GEYN666WNK5ROHWLWK7Q3EQNWIWN3TEAHWDCNXGRGEGIP";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0a0a0a] font-sans selection:bg-[#0a0a0a] selection:text-white">
      {/* TECHNICAL GRID BACKGROUND WITH BLURRY BLOBS */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-red-400/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-orange-400/10 rounded-full blur-[120px]"></div>
      </div>

      {/* HEADER */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-3xl border-b border-white/50 shadow-sm transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3 font-bold uppercase text-xs tracking-[0.2em] hover:text-blue-600 transition-colors bg-white/50 px-4 py-2 rounded-full border border-white shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:-translate-x-1 transition-transform">
              <ArrowLeft size={14} />
            </div>
            Workbench
          </Link>
          <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest bg-white/50 px-3 py-1.5 rounded-full border border-white">
            Module_Ref: SUPPORT_PROJECT
          </span>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-40 pb-32 relative z-10">
        <header className="mb-24 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-white shadow-sm text-gray-800 px-4 py-2 mb-8 rounded-full">
            <Heart className="text-red-500 animate-pulse" size={16} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Support Open Source</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-8 text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-500">
            Fuel the<br />Engine.
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl font-medium leading-relaxed bg-white/40 p-6 rounded-3xl border border-white shadow-sm">
            DevHelp is 100% free and open-source. If these tools have saved you time or secured your workflow, consider supporting the development.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* WALLET BOX */}
          <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="bg-white/40 backdrop-blur-xl border border-white p-10 rounded-[40px] shadow-[0_8px_40px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:shadow-[0_12px_50px_rgb(0,0,0,0.06)] hover:bg-white/60 transition-all duration-500">
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-100/50 rounded-full blur-[60px] pointer-events-none group-hover:bg-blue-200/60 transition-colors duration-700"></div>
              
              <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-blue-50 text-blue-600 group-hover:scale-110 transition-transform duration-500">
                        <Wallet size={28} />
                    </div>
                    <div>
                        <h3 className="font-black uppercase tracking-widest text-lg text-gray-900">Stellar Wallet</h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Network: XLM</p>
                    </div>
                  </div>
                  
                  <div 
                    onClick={copyToClipboard}
                    className="relative bg-white/60 backdrop-blur-md border border-white p-5 rounded-3xl cursor-pointer hover:bg-white transition-all mb-6 shadow-inner group/copy overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover/copy:opacity-100 transition-opacity"></div>
                    <code className="relative z-10 block font-mono text-[11px] font-bold break-all leading-relaxed text-gray-600 group-hover/copy:text-blue-600 transition-colors pr-10">
                      {walletAddress}
                    </code>
                    <div className="absolute top-1/2 -translate-y-1/2 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 text-gray-400 group-hover/copy:text-blue-500 group-hover/copy:border-blue-100 transition-colors">
                      {copied ? <Check className="text-green-500" size={16} /> : <Copy size={16} />}
                    </div>
                  </div>

                  <p className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase tracking-widest flex items-start gap-2 bg-white/50 p-4 rounded-2xl border border-white">
                    <span className="text-red-400 shrink-0 mt-0.5">*</span> Please double check the address before sending. XLM transactions are near-instant and non-reversible.
                  </p>
              </div>
            </div>
          </div>

          {/* WHY DONATE */}
          <div className="space-y-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="bg-white/40 backdrop-blur-xl border border-white p-8 rounded-[32px] shadow-sm hover:bg-white/60 transition-all">
              <h4 className="font-black uppercase text-sm tracking-[0.2em] mb-4 flex items-center gap-3 text-gray-900">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <InfoCircle size={16} />
                </div>
                Why Donate?
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed font-medium pl-11">
                Donations help cover the infrastructure costs for the web launcher and provide resources to develop new modules like a Protobuf Inspector or an SQL Formatter.
              </p>
            </div>

            <div className="bg-white/40 backdrop-blur-xl border border-white p-8 rounded-[32px] shadow-sm hover:bg-white/60 transition-all">
              <h4 className="font-black uppercase text-sm tracking-[0.2em] mb-4 flex items-center gap-3 text-gray-900">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Check size={16} />
                </div>
                Transparency
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed font-medium pl-11">
                All contributions are used exclusively for DevHelp hardware and software development.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-32 pt-12 flex flex-col md:flex-row items-center justify-between gap-8 animate-fade-in-up border-t border-gray-200" style={{ animationDelay: '300ms' }}>
          <div className="text-center md:text-left bg-white/50 backdrop-blur-md px-6 py-4 rounded-3xl border border-white shadow-sm">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               Hardware_Ready
            </span>
            <p className="font-mono font-bold text-gray-900 uppercase text-xs mt-2">GAKZ...GEGIP</p>
          </div>
          <Link href="/launcher">
            <button className="px-12 py-5 text-sm font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 bg-gray-900 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:bg-gray-800 hover:-translate-y-1">
              Back to Modules
            </button>
          </Link>
        </div>
      </main>

    </div>
  );
}