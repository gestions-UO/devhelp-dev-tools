"use client";

import Link from "next/link";
import { ArrowRight, Code, Lightning, ShieldCheck } from "reicon-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fafafa]">
      
      {/* Animated Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <motion.div 
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 mix-blend-multiply blur-3xl filter"
          animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-400/20 mix-blend-multiply blur-3xl filter"
          animate={{ x: [0, -50, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-pink-400/20 mix-blend-multiply blur-3xl filter"
          animate={{ x: [0, 30, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pt-32 pb-20">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <span className="inline-block px-4 py-1.5 mb-8 text-xs font-semibold tracking-widest text-blue-600 uppercase bg-blue-100/50 backdrop-blur-md rounded-full shadow-sm border border-blue-200">
            Introducing DevHelp 2.0
          </span>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500 mb-8 leading-[1.1]">
            Engineering<br />Refined.
          </h1>
          
          <p className="max-w-2xl mx-auto mb-12 text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
            A masterfully crafted suite of developer tools. No cloud dependencies, instant local execution, and a breathtaking spatial interface.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link href="/launcher" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition-all duration-300 bg-gray-900 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:bg-gray-800 hover:-translate-y-1 flex items-center justify-center gap-3">
                Launch Workspace <ArrowRight className="text-lg" />
              </button>
            </Link>
            <Link href="/docs" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 text-sm font-bold tracking-widest text-gray-700 uppercase transition-all duration-300 bg-white/50 backdrop-blur-md border border-gray-200 rounded-full hover:bg-white hover:-translate-y-1 hover:shadow-lg">
                Read Documentation
              </button>
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-6xl mx-auto mt-40 text-left"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left text */}
            <div>
              <span className="text-xs font-bold tracking-widest text-blue-500 uppercase mb-4 block">Documentation</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-6">Command Reference</h2>
              <p className="text-lg text-gray-500 leading-relaxed mb-8">
                The DevHelp CLI manages your workbench lifecycle. It operates as a <strong>background daemon</strong>, ensuring your terminal remains free while the local server processes data.
              </p>

              <div className="flex flex-col gap-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-white/60 backdrop-blur-md shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <code className="text-sm font-mono font-bold bg-gray-100 px-2 py-1 rounded text-gray-800">npx devhelp-tool start</code>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">Initializes the Node.js process as a background service. Serves the workbench at localhost:3000.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-white/60 backdrop-blur-md shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" /></svg>
                  </div>
                  <div>
                    <code className="text-sm font-mono font-bold bg-gray-100 px-2 py-1 rounded text-gray-800">npx devhelp-tool stop</code>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">Locates the active service (PIDs) and terminates the background daemon safely.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-white/60 backdrop-blur-md shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  </div>
                  <div>
                    <code className="text-sm font-mono font-bold bg-gray-100 px-2 py-1 rounded text-gray-800">npx devhelp-tool status</code>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">Verifies the current operational state of the service and confirms port availability.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Terminal Mockup */}
            <div className="relative rounded-[24px] bg-gray-900/90 backdrop-blur-xl border border-gray-700 shadow-2xl p-6 overflow-hidden">
               <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-[10px] font-mono text-gray-500">zsh - DAEMON LOGS</span>
               </div>
               <div className="font-mono text-sm space-y-4">
                 <div>
                   <span className="text-blue-400">~</span> <span className="text-gray-300">npx devhelp-tool start</span>
                   <p className="text-blue-300 mt-1">🚀 STARTING DEVHELP SERVICE...</p>
                   <p className="text-green-400">✅ Workbench live at http://localhost:3000</p>
                 </div>
                 <div className="pt-4">
                   <span className="text-blue-400">~</span> <span className="text-gray-300">npx devhelp-tool stop</span>
                   <p className="text-orange-400 mt-1">🛑 STOPPING DEVHELP (PID: 48291)...</p>
                   <p className="text-green-400">✅ Service stopped successfully.</p>
                 </div>
               </div>
            </div>

          </div>
        </motion.div>

        {/* Architecture Pillars */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-6xl mx-auto mt-40 mb-20 text-left"
        >
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-purple-500 uppercase mb-4 block">Hardware & Safety</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">Architecture Pillars</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/50 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="text-gray-900 mb-6"><ShieldCheck size={28}/></div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider text-sm">Client-Side Execution</h3>
              <p className="text-gray-500 text-sm leading-relaxed">All processing occurs within your browser's V8 memory. No cloud processing means zero data exposure.</p>
            </div>
            <div className="bg-white/50 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="text-gray-900 mb-6"><Lightning size={28}/></div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider text-sm">Lightning Fast</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Bypass network latencies. Tools execute instantly using local processing power.</p>
            </div>
            <div className="bg-white/50 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="text-gray-900 mb-6"><Code size={28}/></div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider text-sm">Native Integration</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Works seamlessly across macOS, Linux, and Windows terminal environments with universal binary support.</p>
            </div>
          </div>
        </motion.div>

        {/* Open Source Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-6xl mx-auto mt-20 mb-40 bg-gray-900 rounded-[40px] p-12 md:p-20 text-left relative overflow-hidden shadow-2xl"
        >
          {/* Subtle gradient glow inside the dark banner */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">Open Source<br/>Engineering.</h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                DevHelp is a transparent project. We invite the community to audit the code, propose modules, and improve local security. Join the development on GitHub and contribute to the local-first movement.
              </p>
            </div>
            <div className="shrink-0">
              <a href="#" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-bold uppercase tracking-widest text-sm rounded-full hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                View Repository
              </a>
            </div>
          </div>
        </motion.div>

        {/* Initialize Process CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full text-center mb-32"
        >
          <h2 className="text-5xl font-black tracking-tighter text-gray-900 mb-4 uppercase">Initialize_Process</h2>
          <p className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-8">Ready to secure your technical data?</p>
          <Link href="/launcher">
            <button className="px-10 py-5 text-xs font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 bg-gray-900 rounded-full shadow-xl hover:shadow-2xl hover:bg-gray-800 hover:-translate-y-1">
              Start Workbench Session
            </button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}