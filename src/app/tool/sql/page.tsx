"use client";

import { useState } from "react";
import ToolShell from "@/components/layout/ToolShell";
import CodeEditor from "@/components/ui/CodeEditor";
import Button from "@/components/ui/Button";
import { format } from "sql-formatter";
import { sql } from "@codemirror/lang-sql";
import { MagicWand, Copy } from "reicon-react";

export default function SqlFormatter() {
  const [source, setSource] = useState("SELECT id, name, email FROM users WHERE status = 'active' AND created_at >= '2023-01-01' ORDER BY created_at DESC LIMIT 100;");
  const [output, setOutput] = useState("");
  const [dialect, setDialect] = useState<"sql" | "postgresql" | "mysql">("postgresql");
  const [error, setError] = useState<string | null>(null);

  const formatSql = () => {
    setError(null);
    try {
      if (!source.trim()) {
        setOutput("");
        return;
      }
      const formatted = format(source, {
        language: dialect,
        tabWidth: 2,
        keywordCase: "upper",
        linesBetweenQueries: 2,
      });
      setOutput(formatted);
    } catch (e: any) {
      setError(e.message || "Parse Error");
    }
  };

  return (
    <ToolShell
      title="SQL Formatter"
      subtitle="PRETTIFIER"
      colorName="mod-xml"
      inputLabel="Raw Query"
      outputLabel="Formatted Output"
      statusMessage={error ? "Parse Error" : "Ready"}
      inputComponent={
        <div className="flex flex-col h-full bg-white">
          <div className="p-4 border-b border-gray-200 shrink-0 flex items-center gap-4">
             <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Dialect:</label>
             <select 
               value={dialect} 
               onChange={(e) => setDialect(e.target.value as any)}
               className="bg-gray-50 border border-gray-200 text-gray-800 font-mono p-1 text-sm outline-none"
             >
                <option value="postgresql">PostgreSQL</option>
                <option value="mysql">MySQL</option>
                <option value="sql">Standard SQL</option>
             </select>
          </div>
          <div className="flex-grow relative min-h-0">
             <CodeEditor 
               value={source} 
               onChange={setSource} 
               extensions={[sql()]} 
               theme="light" 
             />
          </div>
          {error && (
            <div className="bg-red-500 text-gray-800 text-xs font-mono p-2 shrink-0 border-t border-red-700">
              {error}
            </div>
          )}
        </div>
      }
      outputComponent={
        <div className="flex flex-col h-full bg-white">
          <div className="flex-grow relative min-h-0">
            <CodeEditor 
              value={output} 
              onChange={() => {}} 
              extensions={[sql()]} 
              theme="light" 
            />
          </div>
        </div>
      }
      actionsComponent={
        <>
          <Button size="sm" variant="primary" icon={<MagicWand />} onClick={formatSql}>
            Format Query
          </Button>
          <div className="mx-2 h-6 w-px bg-gray-300"></div>
          <Button size="sm" variant="outline" icon={<Copy />} onClick={() => navigator.clipboard.writeText(output)} disabled={!output}>
            Copy Output
          </Button>
        </>
      }
    />
  );
}
