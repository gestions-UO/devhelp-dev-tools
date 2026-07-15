"use client";

import { useState, useEffect } from "react";
import ToolShell from "@/components/layout/ToolShell";
import Button from "@/components/ui/Button";
import { Link } from "reicon-react";

export default function UrlParser() {
  const [urlInput, setUrlInput] = useState("https://example.com:8080/path/to/resource?query=123#fragment");
  const [parsed, setParsed] = useState<URL | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (urlInput.trim()) {
        setParsed(new URL(urlInput));
        setError(null);
      } else {
        setParsed(null);
        setError(null);
      }
    } catch (e) {
      setParsed(null);
      setError("Invalid URL Format");
    }
  }, [urlInput]);

  return (
    <ToolShell
      title="URL Parser"
      subtitle="ENCODER"
      colorName="mod-time"
      inputLabel="Input URL"
      outputLabel="Parsed Components"
      statusMessage={error ? "Syntax Error" : (parsed ? "Parsed" : "Awaiting Input")}
      inputComponent={
        <div className="flex flex-col h-full bg-white text-gray-800 p-6 font-mono">
          <div className="mb-6 flex-grow">
            <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Raw URL String</label>
            <textarea
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://..."
              className="w-full h-40 bg-gray-50 border border-gray-200 p-4 text-sm focus:border-white outline-none resize-none break-all"
            />
          </div>

          <div className="flex gap-4">
             <Button size="sm" variant="outline" onClick={() => setUrlInput(encodeURIComponent(urlInput))}>
               Encode URI Component
             </Button>
             <Button size="sm" variant="outline" onClick={() => setUrlInput(decodeURIComponent(urlInput))}>
               Decode URI Component
             </Button>
          </div>
        </div>
      }
      outputComponent={
        <div className="w-full h-full bg-white relative overflow-auto p-6 text-black font-mono">
           {error ? (
              <div className="text-red-500 text-xs font-bold uppercase tracking-widest bg-red-50 p-4 border border-red-200">
                {error}
              </div>
           ) : parsed ? (
             <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 border-b border-gray-200 pb-2">URL Breakdown</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                     <div><span className="text-gray-500 block text-[10px] uppercase">Protocol</span><span className="font-bold">{parsed.protocol}</span></div>
                     <div><span className="text-gray-500 block text-[10px] uppercase">Host</span><span className="font-bold">{parsed.host}</span></div>
                     <div><span className="text-gray-500 block text-[10px] uppercase">Hostname</span><span className="font-bold">{parsed.hostname}</span></div>
                     <div><span className="text-gray-500 block text-[10px] uppercase">Port</span><span className="font-bold">{parsed.port || "(Default)"}</span></div>
                     <div className="md:col-span-2"><span className="text-gray-500 block text-[10px] uppercase">Pathname</span><span className="font-bold break-all">{parsed.pathname}</span></div>
                     <div className="md:col-span-2"><span className="text-gray-500 block text-[10px] uppercase">Search / Query</span><span className="font-bold break-all">{parsed.search || "(None)"}</span></div>
                     <div className="md:col-span-2"><span className="text-gray-500 block text-[10px] uppercase">Hash / Fragment</span><span className="font-bold break-all">{parsed.hash || "(None)"}</span></div>
                     <div className="md:col-span-2"><span className="text-gray-500 block text-[10px] uppercase">Origin</span><span className="font-bold break-all">{parsed.origin}</span></div>
                  </div>
                </div>

                {Array.from(parsed.searchParams.entries()).length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 border-b border-gray-200 pb-2">Query Parameters</h4>
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-2 border border-gray-200 text-[10px] uppercase text-gray-500">Key</th>
                          <th className="p-2 border border-gray-200 text-[10px] uppercase text-gray-500">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from(parsed.searchParams.entries()).map(([key, value], i) => (
                          <tr key={i}>
                            <td className="p-2 border border-gray-200 font-bold">{key}</td>
                            <td className="p-2 border border-gray-200 break-all">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
             </div>
           ) : (
             <div className="flex flex-col items-center justify-center h-full text-gray-500">
               <Link size={48} className="mb-4 opacity-50" />
               <p className="font-mono text-xs uppercase tracking-widest text-center">
                 Awaiting Valid URL
               </p>
             </div>
           )}
        </div>
      }
      actionsComponent={<></>}
    />
  );
}
