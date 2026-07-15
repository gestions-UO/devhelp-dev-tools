"use client";

import { useState } from "react";
import ToolShell from "@/components/layout/ToolShell";
import Button from "@/components/ui/Button";
import { Globe, Magnifier, HardDrive, ShieldCheck, Clock } from "reicon-react";

type DNSRecordType = "A" | "AAAA" | "MX" | "NS" | "TXT" | "CNAME" | "SOA" | "PTR" | "SPF" | "DKIM" | "DMARC";

const DNS_TYPES = ["A", "AAAA", "MX", "NS", "TXT", "CNAME", "SOA", "PTR", "SPF", "DMARC"];

interface RecordResult {
  type: string;
  data: any[];
  error?: string;
  responseTime?: number;
}

export default function DnsChecker() {
  const [domain, setDomain] = useState("");
  const [results, setResults] = useState<RecordResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const fetchDnsRecord = async (type: string, queryDomain: string): Promise<RecordResult> => {
    const startTime = performance.now();
    try {
      // For SPF/DMARC we query TXT records for specific subdomains/patterns
      let targetDomain = queryDomain;
      let targetType = type;
      
      if (type === "SPF") {
        targetType = "TXT";
      } else if (type === "DMARC") {
        targetType = "TXT";
        targetDomain = `_dmarc.${queryDomain}`;
      } else if (type === "DKIM") {
          // DKIM requires a selector, we can't easily guess it without one, we'll skip or use 'default'
          targetType = "TXT";
          targetDomain = `default._domainkey.${queryDomain}`;
      }

      // Using Google DNS over HTTPS
      const url = `https://dns.google/resolve?name=${targetDomain}&type=${targetType}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Fetch failed");
      
      const data = await response.json();
      const endTime = performance.now();
      
      let answers = data.Answer || [];
      
      if (type === "SPF") {
        answers = answers.filter((a: any) => a.data.includes("v=spf1"));
      } else if (type === "DMARC") {
        answers = answers.filter((a: any) => a.data.includes("v=DMARC1"));
      }
      
      return {
        type,
        data: answers,
        responseTime: Math.round(endTime - startTime)
      };
    } catch (err: any) {
      return {
        type,
        data: [],
        error: err.message
      };
    }
  };

  const handleScan = async () => {
    if (!domain) return;
    setIsLoading(true);
    setResults([]);
    setGlobalError(null);
    
    // Basic domain validation
    let cleanDomain = domain.trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
    if (cleanDomain.includes("/")) cleanDomain = cleanDomain.split("/")[0];
    
    setDomain(cleanDomain);

    try {
      const promises = DNS_TYPES.map(type => fetchDnsRecord(type, cleanDomain));
      const res = await Promise.all(promises);
      setResults(res);
    } catch (e: any) {
      setGlobalError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolShell
      title="DNS Checker"
      subtitle="PROPAGATION"
      colorName="mod-diff"
      inputLabel="Query Setup"
      outputLabel="Resolution Data"
      statusMessage={isLoading ? "Querying Root Servers..." : (results.length > 0 ? "Scan Complete" : "Awaiting Input")}
      inputComponent={
        <div className="flex flex-col h-full bg-white text-gray-800 p-6 font-mono">
          <div className="mb-6">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 block">Target Domain</label>
            <div className="flex gap-2 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Globe size={18} />
              </div>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                placeholder="example.com"
                className="w-full bg-white/50 backdrop-blur-xl border border-gray-200 rounded-full py-4 pl-12 pr-6 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 shadow-[0_4px_20px_rgb(0,0,0,0.03)]"
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-3 uppercase tracking-widest pl-4">Enter domain without http:// or https://</p>
          </div>

          <div className="mt-auto p-5 border border-blue-200/50 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 backdrop-blur-md rounded-3xl text-blue-800 shadow-[0_8px_30px_rgb(59,130,246,0.05)]">
            <h4 className="text-xs font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                <ShieldCheck className="text-blue-500" size={16} /> Note on Local Execution
            </h4>
            <p className="text-[11px] leading-relaxed text-blue-600/80 font-medium">
              Because this tool runs strictly in your browser (Client-Side), it relies on DNS-over-HTTPS (DoH). WHOIS, Port Scanning, and SSL checks are natively blocked by browser CORS policies without a backend proxy. DNS records are retrieved securely via Google DNS APIs.
            </p>
          </div>
        </div>
      }
      outputComponent={
        <div className="w-full h-full bg-white relative overflow-auto font-mono text-sm p-6 text-black">
          {globalError && (
            <div className="p-4 border border-red-500 bg-red-50 text-red-700 mb-6 font-bold text-xs">
              SYSTEM ERROR: {globalError}
            </div>
          )}

          {!isLoading && results.length === 0 && !globalError && (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-gray-100">
                <Globe size={32} className="opacity-40" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]">No Data Available</p>
              <p className="text-[10px] mt-2 opacity-50">Enter a domain to begin scanning.</p>
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-blue-500">
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center animate-pulse">
                  <HardDrive size={32} />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-blue-200 border-t-blue-500 animate-spin"></div>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">Querying Root Servers</p>
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="space-y-6 animate-fade-in-up">
              {results.map((r, i) => (
                <div key={i} className="bg-white/40 backdrop-blur-md border border-gray-200/50 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:bg-white/80">
                  <div className="bg-gradient-to-r from-gray-50/80 to-transparent px-6 py-4 flex justify-between items-center border-b border-gray-100/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black text-[10px]">
                        {r.type}
                      </div>
                      <span className="font-bold text-gray-800 tracking-widest uppercase text-xs">Record</span>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1.5 uppercase tracking-widest bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                      <Clock size={12} className="text-blue-400" /> {r.responseTime ? `${r.responseTime}ms` : 'N/A'}
                    </span>
                  </div>
                  <div className="p-6">
                    {r.error ? (
                      <div className="text-red-500 text-xs font-medium flex items-center gap-2 bg-red-50 p-4 rounded-xl border border-red-100">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        Error: {r.error}
                      </div>
                    ) : r.data && r.data.length > 0 ? (
                      <ul className="space-y-3">
                        {r.data.map((ans, idx) => (
                          <li key={idx} className="flex flex-col gap-2 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-3">
                              <span className="text-gray-400 font-bold uppercase text-[9px] tracking-widest w-12 shrink-0">Value</span> 
                              <span className="font-bold text-gray-800 text-xs break-all leading-relaxed">{ans.data}</span>
                            </div>
                            {ans.TTL && (
                                <div className="flex items-center gap-3 mt-1">
                                  <span className="text-gray-400 font-bold uppercase text-[9px] tracking-widest w-12 shrink-0">TTL</span>
                                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">{ans.TTL} seconds</span>
                                </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="flex items-center gap-3 text-gray-400 text-xs font-medium italic bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50">
                         No records found for this type.
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      }
      actionsComponent={
        <Button size="sm" variant="primary" icon={<Magnifier />} onClick={handleScan} disabled={isLoading}>
          Analyze DNS
        </Button>
      }
    />
  );
}
