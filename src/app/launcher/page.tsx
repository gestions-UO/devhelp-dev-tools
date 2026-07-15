"use client";

import { motion } from "framer-motion";
import ToolCard from "@/components/ui/ToolCard";
import { CodeFile, ShieldCheck, Text, Clock, ArrowDown, Window, TerminalSquare, Globe, MapPoint, HardDrive, ArrowSwapHorizontal2, Link, MagicWand, Palette, DocumentText2, List, FileContent } from "reicon-react";

export default function Launcher() {
  
  const categories = [
    {
      name: "Data & Formats",
      tools: [
        { id: "MOD_01", title: "JSON Engine", description: "Format, validate & minify data structures.", href: "/tool/json", version: "v1.2", icon: CodeFile, colorName: "mod-json" },
        { id: "MOD_02", title: "XML Parser", description: "Tree view visualization & conversion.", href: "/tool/xml", version: "v1.0", icon: CodeFile, colorName: "mod-xml" },
        { id: "MOD_12", title: "YAML/JSON Converter", description: "Convert between YAML and JSON formats.", href: "/tool/yaml", version: "v1.0", icon: ArrowSwapHorizontal2, colorName: "mod-json", status: "New" as const },
        { id: "MOD_07", title: "Base64 Tool", description: "UTF-8 safe encoder / decoder.", href: "/tool/base64", version: "v1.1", icon: FileContent, colorName: "mod-b64" },
        { id: "MOD_19", title: "Markdown Previewer", description: "Live markdown previewer and exporter.", href: "/tool/markdown", version: "v1.0", icon: DocumentText2, colorName: "mod-html", status: "New" as const }
      ]
    },
    {
      name: "Network & API",
      tools: [
        { id: "MOD_13", title: "API Client", description: "Mini REST/GraphQL client for HTTP requests.", href: "/tool/api", version: "v1.0", icon: HardDrive, colorName: "mod-time", status: "New" as const },
        { id: "MOD_14", title: "URL Parser", description: "Deconstruct URLs and Encode/Decode URI.", href: "/tool/url", version: "v1.0", icon: Link, colorName: "mod-time", status: "New" as const },
        { id: "MOD_11", title: "DNS Checker", description: "Global DNS propagation & WHOIS.", href: "/tool/dns", version: "v1.0", icon: Globe, colorName: "mod-diff" },
        { id: "MOD_10", title: "IP Info Map", description: "IP Geolocation and ASN lookup.", href: "/tool/ipinfo", version: "v1.0", icon: MapPoint, colorName: "mod-time" }
      ]
    },
    {
      name: "Security & Crypto",
      tools: [
        { id: "MOD_03", title: "JWT Decoder", description: "Token claims & signature inspection.", href: "/tool/jwt", version: "v2.1", icon: ShieldCheck, colorName: "mod-jwt" },
        { id: "MOD_15", title: "Crypto Engine", description: "MD5, SHA, AES hashing and encryption.", href: "/tool/hash", version: "v1.0", icon: ShieldCheck, colorName: "mod-jwt", status: "New" as const },
        { id: "MOD_16", title: "ID Generator", description: "Bulk generation of UUIDs and ULIDs.", href: "/tool/uuid", version: "v1.0", icon: List, colorName: "mod-time", status: "New" as const }
      ]
    },
    {
      name: "Web & Dev",
      tools: [
        { id: "MOD_08", title: "HTML Studio", description: "Live render sandbox with CSS support.", href: "/tool/html", version: "v3.0", icon: Window, colorName: "mod-html" },
        { id: "MOD_06", title: "Diff Checker", description: "Visual text comparison utility.", href: "/tool/diff", version: "v2.0", icon: ArrowDown, colorName: "mod-diff" },
        { id: "MOD_17", title: "SQL Formatter", description: "Prettify and format raw SQL queries.", href: "/tool/sql", version: "v1.0", icon: MagicWand, colorName: "mod-xml", status: "New" as const },
        { id: "MOD_18", title: "Color Palette", description: "Color tools, conversions and palettes.", href: "/tool/color", version: "v1.0", icon: Palette, colorName: "mod-css", status: "New" as const }
      ]
    },
    {
      name: "System Utilities",
      tools: [
        { id: "MOD_04", title: "Regex Scanner", description: "Live pattern matching engine.", href: "/tool/regex", version: "v1.5", icon: Text, colorName: "mod-regex" },
        { id: "MOD_05", title: "Epoch Time", description: "Bidirectional timestamp converter.", href: "/tool/epoch", version: "v1.0", icon: Clock, colorName: "mod-time" },
        { id: "MOD_09", title: "Log Viewer", description: "Structured parser for system logs.", href: "/tool/logs", version: "v1.0", icon: TerminalSquare, colorName: "mod-log" }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="relative min-h-screen bg-transparent pt-12 md:pt-20">
      <header className="mx-auto w-full max-w-7xl px-4 pb-12 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="mb-4 inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-blue-600 bg-blue-100/50 px-3 py-1 rounded-full border border-blue-200">
            Workspace
          </span>
          <h2 className="mb-6 text-5xl font-black leading-none tracking-tighter text-gray-900 md:text-7xl">
            Choose your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-400">Instrument.</span>
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-gray-500">
            Select a tool from the grid below. All utilities execute instantly and locally inside your browser.
          </p>
        </motion.div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 pb-24 md:px-6">
        {categories.map((category, catIdx) => (
          <motion.div 
            key={category.name} 
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: catIdx * 0.1 + 0.3 }}
          >
            {/* Section Header */}
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                {category.name}
              </h2>
              <div className="ml-6 h-px flex-grow bg-gradient-to-r from-gray-200 to-transparent"></div>
            </div>

            {/* The Grid */}
            <motion.div 
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {category.tools.map((tool) => (
                <motion.div key={tool.id} variants={itemVariants}>
                  <ToolCard
                    id={tool.id}
                    title={tool.title}
                    description={tool.description}
                    href={tool.href}
                    version={tool.version}
                    icon={tool.icon}
                    colorName={tool.colorName}
                    status={tool.status}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </main>
    </div>
  );
}