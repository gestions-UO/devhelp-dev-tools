import Link from "next/link";
import { cn } from "@/lib/utils"; 
import React from "react";

interface ToolCardProps {
  id: string;
  title: string;
  description: string;
  href: string;
  version: string;
  icon: React.ElementType;
  colorName: string;
  status?: "Stable" | "Beta" | "New";
}

export default function ToolCard({
  id,
  title,
  description,
  href,
  version,
  icon: Icon,
  colorName,
  status = "Stable",
}: ToolCardProps) {
  const colorVar = `var(--color-${colorName})`;

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-[280px] flex-col justify-between overflow-hidden rounded-3xl p-8 transition-all duration-500",
        "bg-white/40 backdrop-blur-xl border border-white/60",
        "hover:bg-white/60 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-2"
      )}
    >
      {/* Dynamic Background Glow on Hover */}
      <div 
        className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
        style={{ backgroundColor: colorVar }}
      />

      {/* Header */}
      <div className="flex items-start justify-between z-10">
        <div className="flex items-center gap-3">
          <div 
            className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
            style={{ color: colorVar }}
          >
            <Icon className="w-6 h-6" />
          </div>
        </div>
        <span
          className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-white shadow-sm border border-gray-100"
          style={{ color: colorVar }}
        >
          {status}
        </span>
      </div>

      {/* Body */}
      <div className="z-10 mt-auto pt-6">
        <h3 className="text-2xl font-bold tracking-tight text-gray-900 transition-transform duration-500 group-hover:translate-x-1 mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed font-medium">
          {description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-gray-200/50 pt-5 mt-6 z-10">
        <span className="font-mono text-[10px] font-medium text-gray-400">{id} • {version}</span>
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 text-gray-400 transition-all duration-300 group-hover:bg-gray-900 group-hover:text-white group-hover:border-transparent group-hover:scale-110">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}