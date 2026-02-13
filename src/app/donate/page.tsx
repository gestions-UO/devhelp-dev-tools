"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { 
  IoArrowBackOutline, 
  IoCopyOutline, 
  IoCheckmarkOutline, 
  IoWalletOutline,
  IoHeartOutline,
  IoInformationCircleOutline
} from "react-icons/io5";

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
      {/* TECHNICAL GRID BACKGROUND */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#0a0a0a 1px, transparent 1px), linear-gradient(90deg, #0a0a0a 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* HEADER */}
      <nav className="relative z-20 border-b border-[#e5e5e5] bg-white/80 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-black uppercase text-xs tracking-tighter hover:opacity-70 transition-opacity">
            <IoArrowBackOutline /> Back to Workbench
          </Link>
          <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
            Module_Ref: SUPPORT_PROJECT
          </span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-20 pb-32 relative z-10">
        <header className="mb-16">
          <div className="inline-flex items-center gap-2 border border-black px-3 py-1 mb-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <IoHeartOutline className="text-red-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-black">Support Open Source</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-none italic">
            Fuel the <br />Engine.
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl font-medium leading-tight">
            DevHelp is 100% free and open-source. If these tools have saved you time or secured your workflow, consider supporting the development.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* WALLET BOX */}
          <div className="space-y-6">
            <div className="bg-white border-2 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-3 mb-6 text-blue-600">
                <IoWalletOutline size={24} />
                <h3 className="font-black uppercase tracking-widest text-sm text-black">Stellar Wallet (XLM)</h3>
              </div>
              
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2">Network: Stellar Lumens</p>
              
              <div 
                onClick={copyToClipboard}
                className="group relative bg-gray-50 border border-[#e5e5e5] p-4 cursor-pointer hover:border-black transition-all mb-4"
              >
                <code className="block font-mono text-[11px] break-all leading-relaxed text-gray-600 group-hover:text-black">
                  {walletAddress}
                </code>
                <div className="absolute top-2 right-2 p-2 bg-white border border-[#e5e5e5] group-hover:border-black transition-colors">
                  {copied ? <IoCheckmarkOutline className="text-green-500" /> : <IoCopyOutline />}
                </div>
              </div>

              <p className="text-[10px] font-mono text-gray-500 leading-relaxed italic">
                * Please double check the address before sending. XLM transactions are near-instant and non-reversible.
              </p>
            </div>
          </div>

          {/* WHY DONATE */}
          <div className="space-y-8 py-4">
            <div>
              <h4 className="font-black uppercase text-xs tracking-[0.2em] mb-3 flex items-center gap-2">
                <IoInformationCircleOutline className="text-blue-500" /> Why Donate?
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed font-mono uppercase tracking-tight">
                Donations help cover the infrastructure costs for the web launcher and provide resources to develop new modules like a Protobuf Inspector or an SQL Formatter.
              </p>
            </div>

            <div className="border-l-4 border-black pl-6 py-2">
              <h4 className="font-black uppercase text-xs tracking-[0.2em] mb-2">Transparency</h4>
              <p className="text-sm text-gray-500 leading-relaxed font-mono uppercase tracking-tight italic">
                All contributions are used exclusively for DevHelp hardware and software development.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-32 border-t-2 border-black pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.3em]">Hardware_Ready</span>
            <p className="font-black uppercase text-lg italic mt-1">GAKZ...GEGIP</p>
          </div>
          <Link href="/launcher">
            <button className="h-14 px-12 bg-black text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all border border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)]">
              Back to Modules
            </button>
          </Link>
        </div>
      </main>

    </div>
  );
}