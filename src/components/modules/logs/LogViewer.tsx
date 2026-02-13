"use client";

import { useState, useMemo, useRef, KeyboardEvent } from "react";
import ToolShell from "@/components/layout/ToolShell";
import CodeEditor from "@/components/ui/CodeEditor";
import Button from "@/components/ui/Button";
import { 
  BsSearch, 
  BsTrash, 
  BsExclamationOctagon, 
  BsUpload, 
  BsShieldLock, 
  BsXLg,
  BsTagFill
} from "react-icons/bs";

interface LogEntry {
  id: number;
  raw: string;
  level: "ERROR" | "WARN" | "INFO" | "DEBUG" | "UNKNOWN";
  timestamp: string | null;
  message: string;
}

export default function LogViewer() {
  const [input, setInput] = useState(`2024-05-20 10:15:01 [INFO] User admin logged in\n2024-05-20 10:16:45 [ERROR] Auth timeout for user admin`);
  const [filter, setFilter] = useState<string>("ALL");
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- GESTIÓN DE KEYWORDS ---
  const addKeyword = () => {
    const val = keywordInput.trim().toLowerCase();
    if (val && !keywords.includes(val)) {
      setKeywords([...keywords, val]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (word: string) => {
    setKeywords(keywords.filter(k => k !== word));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addKeyword();
  };

  // --- LÓGICA DE PARSEO ---
  const logs = useMemo(() => {
    return input.split("\n")
      .filter(line => line.trim() !== "")
      .map((line, index) => {
        let level: LogEntry["level"] = "UNKNOWN";
        const upperLine = line.toUpperCase();
        if (upperLine.includes("ERROR") || upperLine.includes("FATAL")) level = "ERROR";
        else if (upperLine.includes("WARN")) level = "WARN";
        else if (upperLine.includes("INFO")) level = "INFO";
        else if (upperLine.includes("DEBUG")) level = "DEBUG";

        const tsMatch = line.match(/\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}/);
        const timestamp = tsMatch ? tsMatch[0] : null;
        const message = line.replace(/\[?(ERROR|WARN|INFO|DEBUG|UNKNOWN)\]?/i, "").replace(timestamp || "", "").trim();

        return { id: index, raw: line, level, timestamp, message };
      });
  }, [input]);

  // --- FILTRADO INTELIGENTE ---
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchesLevel = filter === "ALL" || log.level === filter;
      // Debe contener TODAS las keywords activas
      const matchesKeywords = keywords.every(k => log.raw.toLowerCase().includes(k));
      return matchesLevel && matchesKeywords;
    });
  }, [logs, filter, keywords]);

  // --- HELPER: RESALTADO DE TEXTO ---
  const highlightText = (text: string) => {
    if (keywords.length === 0) return text;
    
    // Creamos una regex que busque todas las keywords (case insensitive)
    const pattern = new RegExp(`(${keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    const parts = text.split(pattern);

    return parts.map((part, i) => 
      keywords.includes(part.toLowerCase()) ? 
        <mark key={i} className="bg-yellow-200 text-black px-0.5 rounded-sm">{part}</mark> : part
    );
  };

  return (
    <>
      <ToolShell
        title="LOG"
        subtitle="VIEWER"
        colorName="mod-log"
        inputLabel="Import / Raw"
        outputLabel={`Matches: ${filteredLogs.length}`}
        statusMessage="Local Sandbox"
        
        inputComponent={
          <div className="relative h-full">
            <CodeEditor value={input} onChange={setInput} theme="dark" placeholder="Paste logs..." />
            <input type="file" ref={fileInputRef} onChange={(e) => {
               const f = e.target.files?.[0];
               if(f) {
                 const r = new FileReader();
                 r.onload = (ev) => setInput(ev.target?.result as string);
                 r.readAsText(f);
               }
            }} className="hidden" />
          </div>
        }
        
        outputComponent={
          <div className="flex flex-col h-full bg-white overflow-hidden">
            {/* SEARCH BAR & TAGS */}
            <div className="bg-gray-50 border-b border-gray-200 p-3 space-y-3">
                <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-sm px-3 py-1.5 focus-within:border-black transition-colors">
                    <BsSearch className="text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Type keyword and press Enter..."
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent text-xs font-mono outline-none w-full"
                    />
                </div>
                
                {/* Keywords Tags Display */}
                {keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {keywords.map(word => (
                      <span key={word} className="inline-flex items-center gap-1.5 bg-black text-white text-[10px] font-bold uppercase px-2 py-1 rounded-sm">
                        <BsTagFill className="text-mod-log" />
                        {word}
                        <button onClick={() => removeKeyword(word)} className="hover:text-red-400">
                          <BsXLg size={8} />
                        </button>
                      </span>
                    ))}
                    <button onClick={() => setKeywords([])} className="text-[10px] font-bold text-gray-400 hover:text-red-500 uppercase underline">
                      Clear all
                    </button>
                  </div>
                )}
            </div>

            {/* LOG LIST */}
            <div className="flex-grow overflow-auto font-mono text-[11px] p-3 space-y-1.5 bg-white">
                {filteredLogs.map(log => (
                    <div key={log.id} className="group flex gap-3 hover:bg-gray-50 p-1 border-l-2 border-transparent hover:border-gray-200">
                        <span className="text-gray-400 shrink-0 w-24">{log.timestamp || "00:00:00"}</span>
                        <span className={`shrink-0 w-14 font-bold ${
                            log.level === 'ERROR' ? 'text-red-600' :
                            log.level === 'WARN' ? 'text-yellow-600' :
                            log.level === 'INFO' ? 'text-blue-600' : 'text-gray-400'
                        }`}>
                            [{log.level}]
                        </span>
                        <span className="text-gray-700 break-all">
                          {highlightText(log.message)}
                        </span>
                    </div>
                ))}
            </div>
          </div>
        }
        
        actionsComponent={
          <>
            <Button size="sm" variant="outline" icon={<BsUpload />} onClick={() => fileInputRef.current?.click()}>Import</Button>
            <div className="mx-2 h-6 w-px bg-gray-300"></div>
            <Button size="sm" variant={filter === "ALL" ? "primary" : "outline"} onClick={() => setFilter("ALL")}>All</Button>
            <Button size="sm" variant="outline" icon={<BsExclamationOctagon />} onClick={() => setFilter("ERROR")} className={filter === "ERROR" ? "bg-red-600 text-white" : ""}>Errors</Button>
            <div className="mx-2 h-6 w-px bg-gray-300"></div>
            <Button size="sm" variant="ghost" icon={<BsShieldLock />} onClick={() => setIsPrivacyModalOpen(true)} className="text-blue-600">Privacy</Button>
            <Button size="sm" variant="danger" icon={<BsTrash />} onClick={() => { setInput(""); setKeywords([]); }} />
          </>
        }
      />

      {/* MODAL PRIVACIDAD (Simplificado para el ejemplo) */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="w-full max-w-md bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-2xl font-black uppercase mb-4 flex items-center gap-2">
              <BsShieldLock className="text-blue-600" /> Privacy Notice
            </h3>
            <p className="font-mono text-sm text-gray-600 mb-6 leading-relaxed">
              No data is ever sent to a server. All parsing, keyword filtering, and highlighting happen <strong>locally</strong> in your browser's memory.
            </p>
            <Button variant="primary" className="w-full" onClick={() => setIsPrivacyModalOpen(false)}>Got it</Button>
          </div>
        </div>
      )}
    </>
  );
}