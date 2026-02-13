"use client";

import Link from "next/link";
import { 
  BsShieldCheck, 
  BsCloudSlash, 
  BsLightningCharge, 
  BsCodeSlash, 
  BsArrowLeft,
  BsGearWideConnected,
  BsBoxSeam
} from "react-icons/bs";
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
    <div className="min-h-screen bg-grid-pattern pb-20">
      {/* --- STICKY NAVIGATION --- */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-black uppercase text-sm tracking-tighter hover:opacity-70 transition-opacity">
            <BsArrowLeft /> Back to Workbench
          </Link>
          <div className="flex items-center gap-4">
             <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest hidden sm:inline">
                Build: 2024.05.v1
             </span>
             <Link href="/">
                <Button size="sm">Launch App</Button>
             </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-16">
        
        {/* --- HERO SECTION --- */}
        <header className="mb-20">
          <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 mb-6 rounded-sm">
             <BsGearWideConnected className="animate-spin-slow" />
             <span className="text-[10px] font-bold uppercase tracking-widest">Technical Specifications</span>
          </div>
          <h1 className="text-6xl font-black tracking-tighter uppercase mb-6 md:text-8xl">
            DEVHELP<span className="text-gray-300">.CORE</span>
          </h1>
          <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-2xl">
            A comprehensive, client-side engineering suite. Designed for speed, privacy, and technical precision. No backends, no tracking, just pure logic.
          </p>
        </header>

        {/* --- PRIVACY MANIFESTO --- */}
        <section className="mb-24">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-1.5 bg-black"></div>
                <h2 className="text-3xl font-black uppercase tracking-tighter">Privacy Manifesto</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-black text-white p-10 rounded-sm shadow-2xl">
                <div>
                    <h3 className="text-mod-json font-bold uppercase text-xs mb-4 tracking-widest flex items-center gap-2">
                        <BsShieldCheck /> Local-First Execution
                    </h3>
                    <p className="font-mono text-sm opacity-80 leading-relaxed">
                        Data security is our primary architecture. Unlike online formatters that send your payloads to remote servers, DEVHELP processes every single bit of information within your browser's V8 engine.
                    </p>
                </div>
                <ul className="space-y-4 font-mono text-[11px] uppercase tracking-wider text-gray-400">
                    <li className="flex items-start gap-3"><span className="text-mod-json">[✓]</span> No database persistence</li>
                    <li className="flex items-start gap-3"><span className="text-mod-json">[✓]</span> No telemetry on input fields</li>
                    <li className="flex items-start gap-3"><span className="text-mod-json">[✓]</span> Isolated sandbox execution</li>
                    <li className="flex items-start gap-3"><span className="text-mod-json">[✓]</span> Zero data retention policy</li>
                </ul>
            </div>
        </section>

        {/* --- DETAILED MODULE SPECIFICATIONS --- */}
        <section className="mb-24">
            <div className="flex items-center gap-3 mb-10">
                <div className="w-12 h-1.5 bg-black"></div>
                <h2 className="text-3xl font-black uppercase tracking-tighter">Module Specs</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {moduleSpecs.map((spec) => (
                <div key={spec.id} className="group relative bg-white border border-gray-200 p-8 hover:border-black transition-all shadow-sm">
                    <span className="absolute top-4 right-4 font-mono text-[10px] text-gray-300 group-hover:text-black">
                        MOD_{spec.id}
                    </span>
                    <div className="flex items-center gap-3 mb-4">
                        <BsBoxSeam className="text-gray-400 group-hover:text-black" />
                        <h4 className="font-black text-xl uppercase tracking-tighter">{spec.name}</h4>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Logic Core</span>
                            <code className="text-[11px] bg-gray-100 px-2 py-1 rounded text-blue-600 font-bold">{spec.logic}</code>
                        </div>
                        <div>
                            <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Capabilities</span>
                            <p className="text-sm text-gray-600 leading-relaxed">{spec.features}</p>
                        </div>
                    </div>
                </div>
              ))}
            </div>
        </section>

        {/* --- ARCHITECTURE --- */}
        <section className="mb-24 bg-gray-50 border border-gray-200 p-10">
            <div className="max-w-3xl mx-auto text-center">
                <BsCodeSlash className="text-5xl mx-auto mb-6 text-gray-300" />
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Under the hood</h2>
                <p className="text-gray-600 mb-10">Built with a modern stack optimized for developer experience and lightning-fast responsiveness.</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "Framework", val: "Next.js 14" },
                        { label: "Styling", val: "Tailwind v4" },
                        { label: "Editor", val: "CodeMirror 6" },
                        { label: "Icons", val: "React-Icons" }
                    ].map((item, i) => (
                        <div key={i} className="border border-gray-300 p-4 bg-white">
                            <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</span>
                            <span className="font-mono text-xs font-bold text-black">{item.val}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* --- CTA --- */}
        <footer className="text-center">
             <Link href="/">
                <Button size="lg" className="w-full md:w-auto px-20">
                    Initialize Workbench
                </Button>
             </Link>
             <p className="mt-6 text-[10px] font-mono text-gray-400 uppercase tracking-[0.2em]">
                System Status: All Modules Operational
             </p>
        </footer>
      </main>
    </div>
  );
}