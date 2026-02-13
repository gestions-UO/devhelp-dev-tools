"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { 
  IoTerminalOutline, 
  IoShieldCheckmarkOutline, 
  IoHardwareChipOutline, 
  IoFlashOutline, 
  IoArrowForwardOutline, 
  IoCopyOutline, 
  IoCheckmarkOutline,
  IoCodeSlashOutline,
  IoPlayOutline,
  IoStopOutline,
  IoPulseOutline,
  IoLogoGithub 
} from "react-icons/io5";

export default function LandingPage() {
  const [copied, setCopied] = useState(false);
  const npmCommand = "npm i -g devhelp-tool";
  const githubRepo = "https://github.com/gestions-UO/devhelp-dev-tools.git";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(npmCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0a0a0a] font-sans selection:bg-[#0a0a0a] selection:text-white overflow-x-hidden">
      {/* TECHNICAL GRID BACKGROUND */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#0a0a0a 1px, transparent 1px), linear-gradient(90deg, #0a0a0a 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-16 md:pt-24 pb-20 md:pb-32 border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 border border-[#e5e5e5] px-3 py-1 mb-8 md:mb-10 bg-white relative overflow-hidden">
            <div className="w-1 h-full bg-green-500 absolute left-0 top-0"></div>
            <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-gray-600 flex items-center gap-2">
              <IoCodeSlashOutline className="text-green-500" /> System_Status: Stable // Build_v0.1.8
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-[#0a0a0a] uppercase mb-6 md:mb-8 leading-[0.85]">
            Engineering <br />
            Workbench.
          </h1>
          
          <p className="text-base md:text-xl text-gray-500 mb-10 md:mb-14 max-w-2xl font-medium leading-relaxed">
            High-precision utility suite for local execution. 
            <span className="block text-[#0a0a0a] mt-1 font-mono text-xs md:text-sm tracking-tight uppercase">
              [Cloudless Architecture // Zero Data Leakage]
            </span>
          </p>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <Link href="/launcher" className="w-full sm:w-auto">
                <button className="w-full h-14 px-8 bg-[#0a0a0a] text-white uppercase font-bold tracking-widest border border-black hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 group">
                  Access Modules <IoArrowForwardOutline className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <a href={githubRepo} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <button className="w-full h-14 px-8 bg-white text-black uppercase font-bold tracking-widest border border-black hover:bg-[#f1f1f1] transition-all flex items-center justify-center gap-3">
                  <IoLogoGithub size={20} /> Repository
                </button>
              </a>
            </div>
            
            <div 
              onClick={copyToClipboard}
              className="group flex items-center justify-between bg-white border border-[#e5e5e5] px-4 h-14 cursor-pointer hover:border-black transition-all relative w-full lg:max-w-md"
            >
              <div className="font-mono text-[10px] sm:text-xs flex items-center gap-3 overflow-hidden">
                <IoTerminalOutline className="text-gray-400 group-hover:text-black flex-shrink-0" />
                <span className="text-gray-400 select-none">$</span>
                <span className="font-bold tracking-tight truncate">{npmCommand}</span>
              </div>
              <div className="ml-4 pl-4 border-l border-[#e5e5e5] h-6 flex items-center flex-shrink-0">
                {copied ? <IoCheckmarkOutline className="text-green-500" /> : <IoCopyOutline className="text-gray-400" />}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLI SPECIFICATIONS & COMMAND REFERENCE */}
      <section className="relative z-10 py-16 md:py-24 bg-white border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            <div className="space-y-10 md:space-y-12">
              <div>
                <span className="font-mono text-xs text-blue-600 uppercase tracking-[0.3em]">Documentation</span>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mt-4">Command Reference</h2>
                <p className="text-gray-500 mt-4 leading-relaxed text-sm md:text-base">
                  The DevHelp CLI manages your workbench lifecycle. It operates as a <strong className="text-black font-black">background daemon</strong>, ensuring your terminal remains free while the local server processes data.
                </p>
              </div>

              <div className="space-y-6 md:space-y-8">
                {[
                  { 
                    cmd: "npx devhelp-tool start", 
                    icon: <IoPlayOutline />, 
                    detail: "Initializes the Node.js process as a background service. Serves the workbench at localhost:3000." 
                  },
                  { 
                    cmd: "npx devhelp-tool stop", 
                    icon: <IoStopOutline />, 
                    detail: "Locates the active service process and terminates the background daemon safely." 
                  },
                  { 
                    cmd: "npx devhelp-tool status", 
                    icon: <IoPulseOutline />, 
                    detail: "Verifies the current operational state of the service and confirms port availability." 
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 md:gap-6 group">
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 border border-[#e5e5e5] flex items-center justify-center text-lg md:text-xl bg-[#f8f9fa] group-hover:border-black transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <code className="text-[10px] md:text-[11px] font-bold bg-[#f1f1f1] px-2 py-0.5 rounded-sm break-all md:break-normal">{item.cmd}</code>
                      <p className="text-[10px] md:text-xs text-gray-500 mt-2 leading-relaxed uppercase tracking-tight">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal Visual Mockup */}
            <div className="lg:sticky lg:top-24 mt-8 lg:mt-0">
              <div className="border border-black bg-[#0a0a0a] overflow-hidden shadow-[10px_10px_0px_0px_rgba(0,0,0,0.05)] md:shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)]">
                <div className="bg-[#1a1a1a] px-4 py-3 flex items-center justify-between border-b border-[#333]">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#fbbf24]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]"></div>
                  </div>
                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">zsh — session-logs</span>
                </div>
                <div className="p-5 md:p-8 font-mono text-[10px] md:text-[12px] leading-relaxed text-gray-300">
                  <div className="flex gap-2 md:gap-3">
                    <span className="text-green-500">➜</span>
                    <span className="text-white truncate">~ npx devhelp-tool start</span>
                  </div>
                  <div className="mt-2 ml-4 md:ml-6 space-y-1">
                    <p className="text-blue-400 font-bold uppercase tracking-widest text-[9px] md:text-[11px]">🚀 STARTING DEVHELP SERVICE...</p>
                    <p className="text-green-500 font-bold text-[9px] md:text-[11px]">✅ Workbench live at http://localhost:3000</p>
                  </div>
                  
                  <div className="flex gap-2 md:gap-3 mt-6 md:mt-8">
                    <span className="text-green-500">➜</span>
                    <span className="text-white truncate">~ npx devhelp-tool stop</span>
                  </div>
                  <div className="mt-2 ml-4 md:ml-6 space-y-1">
                    <p className="text-yellow-500 font-bold uppercase tracking-widest text-[9px] md:text-[11px]">🛑 Stopping DevHelp (PID: 48291)...</p>
                    <p className="text-white text-[9px] md:text-[11px]">✅ Service stopped successfully.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GITHUB & OPEN SOURCE SECTION */}
      <section className="relative z-10 py-16 md:py-24 bg-[#0a0a0a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4 italic">Open Source Engineering.</h2>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-mono uppercase tracking-tight text-center md:text-justify">
              DevHelp is a transparent project. We invite the community to audit the code, propose modules, and improve local security. Join the development on GitHub and contribute to the local-first movement.
            </p>
          </div>
          <a 
            href={githubRepo} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full md:w-auto px-10 py-5 border border-white text-white font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4"
          >
            <IoLogoGithub size={24} /> View Repository
          </a>
        </div>
      </section>

      {/* CORE SPECIFICATIONS (BENTO GRID) */}
      <section className="relative z-10 py-16 md:py-24 bg-white border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-10 md:mb-12">
            <span className="font-mono text-xs text-blue-600 uppercase tracking-[0.3em]">Hardware & Safety</span>
            <h2 className="text-3xl font-black uppercase tracking-tighter mt-2">Architecture Pillars</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { title: "Client-Side Execution", icon: <IoShieldCheckmarkOutline />, desc: "All processing occurs within your browser's V8 memory. No cloud processing means zero exposure." },
              { title: "Low System Impact", icon: <IoFlashOutline />, desc: "The background daemon uses minimal CPU resources, activating only during data processing cycles." },
              { title: "Native Integration", icon: <IoHardwareChipOutline />, desc: "Works seamlessly across MacOS, Linux, and Windows terminal environments with universal binary support." }
            ].map((feature, i) => (
              <div key={i} className="border border-[#e5e5e5] p-6 md:p-8 bg-[#f8f9fa] relative group hover:border-black transition-all">
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[12px] border-r-[12px] border-t-transparent border-r-[#e5e5e5] group-hover:border-r-black transition-colors"></div>
                <div className="text-xl md:text-2xl mb-6 md:mb-8 text-[#0a0a0a]">{feature.icon}</div>
                <h3 className="text-xs md:text-sm font-black uppercase tracking-widest mb-4">{feature.title}</h3>
                <p className="text-gray-500 text-[10px] md:text-xs leading-relaxed font-mono uppercase tracking-tight">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INITIALIZE PROCESS SECTION */}
      <section className="py-20 md:py-32 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Initialize_Process</h2>
          <p className="text-gray-400 font-mono text-[10px] md:text-xs uppercase mb-8 md:mb-10 tracking-widest">Ready to secure your technical data?</p>
          <Link href="/launcher">
            <button className="w-full sm:w-auto px-12 py-5 bg-[#0a0a0a] text-white font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs border border-black hover:bg-white hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)]">
              Start Workbench Session
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}