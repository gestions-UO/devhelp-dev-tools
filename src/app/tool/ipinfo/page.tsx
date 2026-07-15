"use client";

import { useState, useEffect } from "react";
import ToolShell from "@/components/layout/ToolShell";
import Button from "@/components/ui/Button";
import { Magnifier, MapPoint, Globe, Shield } from "reicon-react";
import dynamic from 'next/dynamic';

// Dynamically import the map to avoid SSR issues with Leaflet
const MapWithNoSSR = dynamic(() => import('@/components/ui/Map'), {
  ssr: false,
  loading: () => <div className="flex h-full items-center justify-center text-gray-500 font-mono text-sm uppercase tracking-widest">Loading Map Engine...</div>
});

interface IPQueryResponse {
  ip: string;
  location: {
    country: string;
    city: string;
    latitude: number;
    longitude: number;
    timezone: string;
  };
  isp: {
    asn: string;
    org: string;
    isp: string;
  };
  risk?: {
    is_proxy: boolean;
    is_vpn: boolean;
    is_tor: boolean;
    risk_score: number;
  };
}

export default function IpInfoTool() {
  const [ipInput, setIpInput] = useState("");
  const [ipData, setIpData] = useState<IPQueryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchIpInfo = async (ipToSearch: string = "") => {
    setIsLoading(true);
    setError(null);
    try {
      const url = ipToSearch ? `https://api.ipquery.io/${ipToSearch}` : "https://api.ipquery.io/";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch IP details.");
      const data = await res.json();
      setIpData(data);
      if (!ipToSearch) setIpInput(data.ip);
    } catch (err: any) {
      setError(err.message || "An error occurred.");
      setIpData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIpInfo();
  }, []);

  const handleSearch = () => {
    if (ipInput.trim()) {
      fetchIpInfo(ipInput.trim());
    }
  };

  return (
    <ToolShell
      title="IP Info"
      subtitle="MAP"
      colorName="mod-time"
      inputLabel="Query Target"
      outputLabel="Geospatial Data"
      statusMessage={isLoading ? "Querying Network..." : (ipData ? "Data Loaded" : "Awaiting Input")}
      inputComponent={
        <div className="flex flex-col h-full bg-white text-gray-800 p-6 font-mono">
          <div className="mb-6">
            <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Target IP Address</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={ipInput}
                onChange={(e) => setIpInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Enter IP address (e.g. 8.8.8.8)"
                className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:border-white outline-none"
              />
            </div>
            <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-tight">Leave blank and search to see your own IP.</p>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-500/50 p-4 mb-6">
              <p className="text-red-400 text-xs uppercase tracking-widest">Error: {error}</p>
            </div>
          )}

          {ipData && (
            <div className="space-y-6 flex-grow overflow-auto no-scrollbar">
              
              <div>
                <div className="flex items-center gap-2 mb-3 border-b border-gray-200 pb-2">
                  <Globe className="text-gray-500" />
                  <span className="text-xs uppercase tracking-widest text-gray-500">Network Info</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[10px] text-gray-500 uppercase">IP Address</span>
                    <span className="text-lg font-bold">{ipData.ip}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-500 uppercase">ISP</span>
                    <span className="text-sm truncate block" title={ipData.isp.isp}>{ipData.isp.isp || "Unknown"}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-500 uppercase">Organization</span>
                    <span className="text-sm truncate block" title={ipData.isp.org}>{ipData.isp.org || "Unknown"}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-500 uppercase">ASN</span>
                    <span className="text-sm">{ipData.isp.asn || "Unknown"}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3 border-b border-gray-200 pb-2">
                  <MapPoint className="text-gray-500" />
                  <span className="text-xs uppercase tracking-widest text-gray-500">Location</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[10px] text-gray-500 uppercase">Country</span>
                    <span className="text-sm">{ipData.location.country || "Unknown"}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-500 uppercase">City</span>
                    <span className="text-sm">{ipData.location.city || "Unknown"}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-500 uppercase">Timezone</span>
                    <span className="text-sm">{ipData.location.timezone || "Unknown"}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-500 uppercase">Coordinates</span>
                    <span className="text-[10px]">{ipData.location.latitude}, {ipData.location.longitude}</span>
                  </div>
                </div>
              </div>

              {ipData.risk && (
                <div>
                  <div className="flex items-center gap-2 mb-3 border-b border-gray-200 pb-2">
                    <Shield className="text-gray-500" />
                    <span className="text-xs uppercase tracking-widest text-gray-500">Risk Assessment</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[10px] text-gray-500 uppercase">Risk Score</span>
                      <span className={`text-lg font-bold ${ipData.risk.risk_score > 50 ? 'text-red-500' : 'text-green-500'}`}>
                        {ipData.risk.risk_score}/100
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 mt-1">
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm inline-block w-fit ${ipData.risk.is_vpn ? 'bg-red-500/20 text-red-400' : 'bg-gray-800 text-gray-500'}`}>VPN: {ipData.risk.is_vpn ? 'YES' : 'NO'}</span>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm inline-block w-fit ${ipData.risk.is_proxy ? 'bg-red-500/20 text-red-400' : 'bg-gray-800 text-gray-500'}`}>PROXY: {ipData.risk.is_proxy ? 'YES' : 'NO'}</span>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm inline-block w-fit ${ipData.risk.is_tor ? 'bg-red-500/20 text-red-400' : 'bg-gray-800 text-gray-500'}`}>TOR: {ipData.risk.is_tor ? 'YES' : 'NO'}</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      }
      outputComponent={
        <div className="w-full h-full relative bg-gray-100 flex items-center justify-center">
          {ipData && ipData.location.latitude && ipData.location.longitude ? (
            <MapWithNoSSR 
              lat={ipData.location.latitude} 
              lon={ipData.location.longitude} 
              locationName={`${ipData.location.city || 'Unknown'}, ${ipData.location.country || 'Unknown'}`} 
            />
          ) : (
             <div className="text-gray-500 font-mono text-sm uppercase tracking-widest flex items-center gap-2">
                <MapPoint size={20} />
                Map Offline (No coordinates)
             </div>
          )}
        </div>
      }
      actionsComponent={
        <Button size="sm" variant="primary" icon={<Magnifier />} onClick={handleSearch} disabled={isLoading}>
          Query IP
        </Button>
      }
    />
  );
}
