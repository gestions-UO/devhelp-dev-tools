"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Squares, ArrowLeft } from "reicon-react";

interface ToolShellProps {
  title: string;
  subtitle: string;
  colorName: string;
  inputLabel?: string;
  outputLabel?: string;
  inputComponent: ReactNode;
  outputComponent: ReactNode;
  actionsComponent: ReactNode;
  inputStats?: string;
  statusMessage?: string;
}

export default function ToolShell({
  title,
  subtitle,
  colorName,
  inputLabel = "Input Source",
  outputLabel = "Processed Result",
  inputComponent,
  outputComponent,
  actionsComponent,
  inputStats = "--",
  statusMessage = "Ready",
}: ToolShellProps) {
  const colorVar = `var(--color-${colorName})`;

  return (
    <div className="relative flex flex-col min-h-screen bg-transparent p-4 md:p-8">
      
      {/* Top Navigation & Breadcrumbs */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[1600px] mx-auto mb-6 flex items-center justify-between z-10"
      >
        <div className="flex items-center gap-4">
          <Link href="/launcher" className="flex items-center justify-center w-10 h-10 bg-white/50 backdrop-blur-md rounded-full shadow-sm border border-white hover:bg-white transition-all text-gray-500 hover:text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: `color-mix(in srgb, ${colorVar}, white 85%)`, color: colorVar }}>
              <Squares className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900 leading-none">{title}</h1>
              <span className="text-xs font-medium text-gray-500">{subtitle}</span>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <div className="px-3 py-1.5 bg-white/50 backdrop-blur-md border border-white rounded-full shadow-sm">
            <span className="text-xs font-mono font-medium text-gray-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              {statusMessage}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Floating macOS-style Workspace */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col flex-grow w-full max-w-[1600px] mx-auto bg-white/60 backdrop-blur-2xl rounded-[32px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border border-white overflow-hidden relative z-10"
      >
        
        {/* Actions Toolbar */}
        <div className="flex items-center gap-2 px-6 py-4 bg-white/40 border-b border-white overflow-x-auto no-scrollbar">
            {actionsComponent}
        </div>

        {/* Workspace Panels */}
        <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
            
            {/* Input Panel */}
            <div className="flex flex-col flex-1 border-b md:border-b-0 md:border-r border-gray-200/50 min-w-0 bg-white/50">
              <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 bg-white/30">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-600">{inputLabel}</span>
                <span className="text-xs font-mono text-gray-400">{inputStats}</span>
              </div>
              <div className="flex-grow relative overflow-hidden p-2">
                <div className="absolute inset-2 rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm">
                  {inputComponent}
                </div>
              </div>
            </div>

            {/* Output Panel */}
            <div className="flex flex-col flex-1 min-w-0 bg-gray-50/50">
              <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200/50 bg-gray-100/50">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-600 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colorVar }}></div>
                  {outputLabel}
                </span>
              </div>
              <div className="flex-grow relative overflow-hidden p-2">
                <div className="absolute inset-2 rounded-2xl overflow-hidden border border-gray-200/50 bg-[#fafafa] shadow-inner">
                  {outputComponent}
                </div>
              </div>
            </div>

        </div>
      </motion.div>
    </div>
  );
}