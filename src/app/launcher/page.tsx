"use client";

import ToolCard from "@/components/ui/ToolCard";

// Import technical icons
import { 
  BsFiletypeJson, 
  BsFiletypeXml, 
  BsShieldLock, 
  BsRegex, 
  BsClockHistory, 
  BsArrowsCollapse, 
  BsFileEarmarkBinary, 
  BsWindowSplit, 
  BsTerminal 
} from "react-icons/bs";

export default function Home() {
  
  // Tool definition data
  const tools = [
    {
      id: "MOD_01",
      title: "JSON Engine",
      description: "Format, validate & minify data structures.",
      href: "/tool/json",
      version: "v1.2",
      icon: BsFiletypeJson,
      colorName: "mod-json",
    },
    {
      id: "MOD_02",
      title: "XML Parser",
      description: "Tree view visualization & conversion.",
      href: "/tool/xml",
      version: "v1.0",
      icon: BsFiletypeXml,
      colorName: "mod-xml",
    },
    {
      id: "MOD_03",
      title: "JWT Decoder",
      description: "Token claims & signature inspection.",
      href: "/tool/jwt",
      version: "v2.1",
      icon: BsShieldLock,
      colorName: "mod-jwt",
    },
    {
      id: "MOD_04",
      title: "Regex Tester",
      description: "Live pattern matching engine.",
      href: "/tool/regex",
      version: "v1.5",
      icon: BsRegex,
      colorName: "mod-regex",
    },
    {
      id: "MOD_05",
      title: "Epoch Time",
      description: "Bidirectional timestamp converter.",
      href: "/tool/epoch",
      version: "v1.0",
      icon: BsClockHistory,
      colorName: "mod-time",
    },
    {
      id: "MOD_06",
      title: "Diff Checker",
      description: "Visual text comparison utility.",
      href: "/tool/diff",
      version: "v2.0",
      icon: BsArrowsCollapse,
      colorName: "mod-diff",
    },
    {
      id: "MOD_07",
      title: "Base64 Tool",
      description: "UTF-8 safe encoder / decoder.",
      href: "/tool/base64",
      version: "v1.1",
      icon: BsFileEarmarkBinary,
      colorName: "mod-b64",
    },
    {
      id: "MOD_08",
      title: "HTML Studio",
      description: "Live render sandbox with CSS support.",
      href: "/tool/html",
      version: "v3.0",
      icon: BsWindowSplit,
      colorName: "mod-html",
    },
    {
      id: "MOD_09",
      title: "Log Viewer",
      description: "Structured parser for system logs.",
      href: "/tool/logs",
      version: "v1.0",
      icon: BsTerminal,
      colorName: "mod-log",
    },
  ];

  return (
    <div className="w-full">
      
      {/* HERO SECTION */}
      <header className="mx-auto w-full max-w-7xl animate-fade-in-up px-4 pt-12 pb-8 md:px-6 md:pt-20 md:pb-12">
        <div className="max-w-3xl">
          <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-blue-600 md:mb-4 md:text-xs">
            // The Engineering Toolbox
          </span>
          <h2 className="mb-4 text-4xl font-black leading-none tracking-tight text-tech-black sm:text-5xl md:mb-6 md:text-6xl">
            RAPID. PRECISE.<br />ESSENTIAL UTILITIES.
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-gray-600 md:max-w-none md:text-lg">
            A suite of isolated developer tools designed for speed and technical precision. 
            Zero external dependencies, instant local execution.
          </p>
        </div>
      </header>

      {/* GRID SECTION */}
      <main className="mx-auto w-full max-w-7xl px-4 pb-12 md:px-6 md:pb-24">
        
        {/* Section Header */}
        <div className="mb-6 flex items-end justify-between md:mb-8">
          <h2 className="text-[10px] font-mono uppercase tracking-widest text-gray-500 md:text-xs">
            Available Modules
          </h2>
          <div className="ml-4 h-px flex-grow bg-gray-300"></div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard
              key={tool.id}
              id={tool.id}
              title={tool.title}
              description={tool.description}
              href={tool.href}
              version={tool.version}
              icon={tool.icon}
              colorName={tool.colorName}
            />
          ))}
        </div>
      </main>
    </div>
  );
}