"use client";

import Link from "next/link";
import { ShieldCheck, CloudMinus, Lightning, Code, ArrowLeft, Settings, Box } from "reicon-react";
import Button from "@/components/ui/Button";

export default function DocsPage() {
  const moduleSpecs = [
    {
      id: "01",
      name: "JSON Engine",
      logic: "Native JavaScript JSON API",
      features: "Supports recursive parsing, 2-space indentation formatting, and aggressive minification. Real-time syntax validation with atomic error reporting."
    },
    {
      id: "02",
      name: "XML Parser",
      logic: "DOMParser API + Recursive Traversal",
      features: "Converts hierarchical XML structures into JSON objects. Handles attributes, child nodes, and text content mapping via a custom tree-walker."
    },
    {
      id: "03",
      name: "JWT Decoder",
      logic: "Base64Url + UTF-8 Decoding",
      features: "Client-side inspection of Header, Payload, and Signature. Uses decodeURIComponent to ensure character safety for non-ASCII claims."
    },
    {
      id: "04",
      name: "Regex Tester",
      logic: "Stateful Iterative RegExp Evaluation",
      features: "Visual simulation of the regex engine. Maps 'scanning' and 'discarding' states character-by-character to visualize backtracking logic."
    },
    {
      id: "05",
      name: "Epoch Time",
      logic: "JS Date Object + Unix Heuristics",
      features: "Bidirectional conversion. Automatically detects if input is in seconds or milliseconds. Synchronized with the real-time system clock."
    },
    {
      id: "06",
      name: "Diff Checker",
      logic: "diff-match-patch (Google Algorithm)",
      features: "Semantic comparison between two text buffers. Features a visual diff-view mode and a 'swap' functionality for easy source-target comparison."
    },
    {
      id: "07",
      name: "Base64 Tool",
      logic: "Window.btoa / Window.atob",
      features: "Standard-compliant Base64 encoding and decoding. Implements UTF-8 safety wrappers to prevent character corruption during processing."
    },
    {
      id: "08",
      name: "HTML Studio",
      logic: "VFS + Iframe srcdoc Isolation",
      features: "Virtual File System (VFS) simulating a local server. Supports multi-page navigation via postMessage inter-process communication and multi-device viewport simulation."
    },
    {
      id: "09",
      name: "Log Viewer",
      logic: "Pattern-based String Analysis",
      features: "Multi-keyword AND-logic filtering. Implements dynamic highlighting with <mark> tags and automatic log-level detection (ERROR, WARN, INFO, DEBUG)."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0a0a0a] font-sans selection:bg-[#0a0a0a] selection:text-white">
      {/* TECHNICAL GRID BACKGROUND WITH BLURRY BLOBS */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] bg-indigo-400/20 rounded-full blur-[120px]"></div>
      </div>

      {/* --- STICKY NAVIGATION --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-3xl border-b border-white/50 shadow-sm transition-all duration-300">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3 font-bold uppercase text-xs tracking-[0.2em] hover:text-blue-600 transition-colors bg-white/50 px-4 py-2 rounded-full border border-white shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:-translate-x-1 transition-transform">
              <ArrowLeft size={14} />
            </div>
            Back to Workbench
          </Link>
          <div className="flex items-center gap-6">
             <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest hidden sm:inline bg-white/50 px-3 py-1.5 rounded-full border border-white">
                Build: 2024.05.v1
             </span>
             <Link href="/">
                <Button size="sm">Launch App</Button>
             </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-40 relative z-10">
        
        {/* --- HERO SECTION --- */}
        <header className="mb-32 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-white shadow-sm text-gray-800 px-4 py-2 mb-8 rounded-full">
             <Settings className="animate-spin-slow text-blue-500" size={16} />
             <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Technical Specifications</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-8 text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-500">
            DEVHELP<span className="opacity-30">.CORE</span>
          </h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-2xl">
            A comprehensive, client-side engineering suite. Designed for speed, privacy, and technical precision. No backends, no tracking, just <span className="text-blue-600 font-bold">pure logic.</span>
          </p>
        </header>

        {/* --- PRIVACY MANIFESTO --- */}
        <section className="mb-32 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                <h2 className="text-3xl font-black uppercase tracking-tighter">Privacy Manifesto</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/40 backdrop-blur-xl border border-white p-12 rounded-[40px] shadow-[0_8px_40px_rgb(0,0,0,0.04)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-[80px] pointer-events-none"></div>
                
                <div className="relative z-10">
                    <h3 className="text-blue-600 font-bold uppercase text-xs mb-6 tracking-widest flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-blue-50">
                          <ShieldCheck size={20} />
                        </div>
                        Local-First Execution
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed font-medium bg-white/50 p-6 rounded-3xl border border-white">
                        Data security is our primary architecture. Unlike online formatters that send your payloads to remote servers, DEVHELP processes every single bit of information within your browser's V8 engine.
                    </p>
                </div>
                <ul className="space-y-4 font-bold text-[11px] uppercase tracking-widest text-gray-500 relative z-10 flex flex-col justify-center">
                    {["No database persistence", "No telemetry on input fields", "Isolated sandbox execution", "Zero data retention policy"].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 bg-white/50 p-4 rounded-2xl border border-white transition-all hover:bg-white hover:shadow-sm hover:scale-[1.02]">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                          ✓
                        </div>
                        {item}
                      </li>
                    ))}
                </ul>
            </div>
        </section>

        {/* --- DETAILED MODULE SPECIFICATIONS --- */}
        <section className="mb-32 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                <h2 className="text-3xl font-black uppercase tracking-tighter">Module Specs</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {moduleSpecs.map((spec) => (
                <div key={spec.id} className="group relative bg-white/40 backdrop-blur-xl border border-white p-8 rounded-[32px] hover:bg-white/70 transition-all duration-300 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full blur-2xl group-hover:bg-blue-100 transition-colors pointer-events-none"></div>
                    
                    <span className="absolute top-6 right-6 font-mono text-[10px] font-bold text-gray-400 group-hover:text-blue-500 transition-colors bg-white/50 px-3 py-1 rounded-full border border-gray-100">
                        MOD_{spec.id}
                    </span>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-400 group-hover:text-blue-600 group-hover:shadow-md border border-gray-100 transition-all duration-300">
                           <Box size={20} />
                        </div>
                        <h4 className="font-black text-xl uppercase tracking-tighter text-gray-800">{spec.name}</h4>
                    </div>
                    <div className="space-y-6 relative z-10">
                        <div className="bg-white/50 p-4 rounded-2xl border border-white">
                            <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Logic Core</span>
                            <code className="text-xs bg-blue-50 px-3 py-1.5 rounded-lg text-blue-600 font-bold border border-blue-100">{spec.logic}</code>
                        </div>
                        <div className="bg-white/50 p-4 rounded-2xl border border-white">
                            <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Capabilities</span>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">{spec.features}</p>
                        </div>
                    </div>
                </div>
              ))}
            </div>
        </section>

        {/* --- ARCHITECTURE --- */}
        <section className="mb-32">
            <div className="bg-white/40 backdrop-blur-xl border border-white p-12 rounded-[40px] text-center shadow-[0_8px_40px_rgb(0,0,0,0.04)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm border border-gray-100 text-blue-500">
                    <Code size={32} />
                  </div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 text-gray-900">Under the hood</h2>
                  <p className="text-gray-500 mb-12 max-w-xl mx-auto font-medium">Built with a modern stack optimized for developer experience and lightning-fast responsiveness.</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                          { label: "Framework", val: "Next.js 14" },
                          { label: "Styling", val: "Tailwind v4" },
                          { label: "Editor", val: "CodeMirror 6" },
                          { label: "Icons", val: "Reicon-React" }
                      ].map((item, i) => (
                          <div key={i} className="border border-white p-6 bg-white/50 rounded-[24px] hover:bg-white hover:shadow-md transition-all">
                              <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">{item.label}</span>
                              <span className="font-mono text-xs font-bold text-gray-800">{item.val}</span>
                          </div>
                      ))}
                  </div>
                </div>
            </div>
        </section>

        {/* --- CTA --- */}
        <footer className="text-center pb-20">
             <Link href="/">
                <button className="px-12 py-5 text-sm font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 bg-gray-900 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:bg-gray-800 hover:-translate-y-1">
                    Initialize Workbench
                </button>
             </Link>
             <p className="mt-8 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                System Status: All Modules Operational
             </p>
        </footer>
      </main>
    </div>
  );
}