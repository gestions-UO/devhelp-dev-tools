"use client";

import Link from "next/link";
// Cambiamos BsBalanceScale por BsHammer y BsShieldShaded
import { 
  BsArrowLeft, 
  BsHammer, 
  BsShieldShaded, 
  BsFileText,
  BsXLg 
} from "react-icons/bs";
import Button from "@/components/ui/Button";

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-grid-pattern pb-20 font-sans">
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-black uppercase text-sm tracking-tighter hover:text-blue-600 transition-colors">
            <BsArrowLeft /> Workbench
          </Link>
          <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
            Legal_Ref: 2024.REV02
          </span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-16">
        <header className="mb-12">
          <h1 className="text-5xl font-black tracking-tighter uppercase mb-4 md:text-6xl">Legal &<br />Privacy</h1>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">// Clarity in engineering.</p>
        </header>

        <div className="space-y-16">
          
          {/* 1. PRIVACY POLICY */}
          <section className="animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6 text-blue-600">
              <BsShieldShaded size={28} />
              <h2 className="text-2xl font-black uppercase tracking-tight text-black">Privacy Policy</h2>
            </div>
            <div className="prose prose-sm text-gray-600 leading-relaxed space-y-4 font-medium">
              <p>
                <strong>DEVHELP.DEV</strong> operates as a stateless environment. We implement a strict <strong>Zero-Data-Transfer</strong> architecture.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong className="text-black">Local Execution:</strong> Your data (JSON, Logs, etc.) is processed exclusively in your browser's RAM.</li>
                <li><strong className="text-black">No Persistence:</strong> We do not use databases or cloud storage. Closing the tab destroys the session.</li>
                <li><strong className="text-black">No Telemetry:</strong> We do not track your input content or technical payloads.</li>
              </ul>
              <div className="bg-gray-100 p-4 border-l-4 border-black font-mono text-[11px] italic mt-6">
                "Technical privacy is not an option; it is the default state of this workbench."
              </div>
            </div>
          </section>

          {/* 2. OPEN SOURCE LICENSE */}
          <section className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3 mb-6 text-gray-900">
              <BsHammer size={28} />
              <h2 className="text-2xl font-black uppercase tracking-tight">Open Source</h2>
            </div>
            <div className="prose prose-sm text-gray-600 leading-relaxed">
              <p className="mb-6">
                This project is released under the <strong>MIT License</strong>. We believe in open tools for a better developer ecosystem.
              </p>
              <div className="bg-gray-50 border border-gray-300 p-6 font-mono text-[10px] uppercase leading-relaxed text-gray-400 rounded-sm">
                Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files... (MIT Standard)
              </div>
            </div>
          </section>

          {/* 3. DISCLAIMER */}
          <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-6 text-red-600">
              <BsFileText size={28} />
              <h2 className="text-2xl font-black uppercase tracking-tight text-black">Disclaimer</h2>
            </div>
            <div className="prose prose-sm text-gray-600 leading-relaxed">
              <p className="uppercase text-[11px] font-bold tracking-wider mb-4">
                The software is provided "AS IS", without warranty of any kind.
              </p>
              <p>
                In no event shall the authors be liable for any claim, damages or other liability arising from the use of these tools. Use at your own risk in production environments.
              </p>
            </div>
          </section>

        </div>

        <footer className="mt-24 pt-10 border-t border-gray-200">
          <Link href="/">
            <Button variant="outline" className="w-full py-6">
              Return to Workbench
            </Button>
          </Link>
        </footer>
      </main>
    </div>
  );
}