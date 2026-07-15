"use client";

import { useState, useMemo } from "react";
import ToolShell from "@/components/layout/ToolShell";
import Button from "@/components/ui/Button";
import CodeEditor from "@/components/ui/CodeEditor";
import { json } from "@codemirror/lang-json";
import { html } from "@codemirror/lang-html";
import { Play, Globe, TriangleWarning, Clock } from "reicon-react";
import { ReactFlow, Controls, Background, Node, Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS";
type AuthType = "None" | "Bearer" | "Basic";
type TabType = "body" | "headers" | "auth";
type OutputMode = "Raw" | "Map";

// JSON to Graph Helper
const generateGraph = (data: any) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  let idCounter = 0;
  let yCounter = 0;

  const traverse = (obj: any, parentId: string | null = null, depth = 0) => {
    if (!obj || typeof obj !== 'object') return;
    
    let keys = Object.keys(obj);
    if (Array.isArray(obj) && keys.length > 5) {
      keys = keys.slice(0, 5);
    }

    keys.forEach((key) => {
      const currentId = `node_${idCounter++}`;
      const isObject = typeof obj[key] === 'object' && obj[key] !== null;
      
      let label = key;
      if (!isObject) {
        let val = obj[key];
        if (typeof val === 'string' && val.length > 30) val = val.substring(0, 30) + '...';
        label = `${key}: ${val}`;
      }

      nodes.push({
        id: currentId,
        position: { x: depth * 320, y: yCounter * 80 },
        data: { label },
        type: 'default',
        style: {
          background: isObject ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.95)',
          border: isObject ? '1px solid rgba(59, 130, 246, 0.5)' : '1px solid rgba(229, 231, 235, 1)',
          borderRadius: '12px',
          fontSize: '11px',
          fontFamily: 'monospace',
          padding: '12px 16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
          backdropFilter: 'blur(8px)',
          color: isObject ? '#1d4ed8' : '#374151',
          fontWeight: isObject ? 'bold' : 'normal'
        }
      });

      if (parentId) {
        edges.push({
          id: `e_${parentId}_${currentId}`,
          source: parentId,
          target: currentId,
          type: 'smoothstep',
          animated: !isObject,
          style: { stroke: '#94a3b8', strokeWidth: 1.5 }
        });
      }
      
      yCounter++;

      if (isObject) {
        traverse(obj[key], currentId, depth + 1);
      }
    });
  };

  nodes.push({
    id: "root",
    position: { x: 0, y: 0 },
    data: { label: "{ JSON Payload }" },
    style: { 
      background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', 
      color: 'white',
      border: 'none', 
      borderRadius: '12px', 
      fontSize: '14px', 
      fontWeight: 'bold',
      padding: '16px 24px',
      boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)'
    }
  });
  
  if (data && typeof data === 'object') {
     traverse(data, "root", 1);
  } else {
     nodes[0].data.label = "Invalid JSON";
  }

  return { nodes, edges };
};

export default function ApiClient() {
  // Request Config
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/users");
  
  // Headers Form
  const [headerList, setHeaderList] = useState<{key: string, value: string, active: boolean}[]>([
    { key: "Content-Type", value: "application/json", active: true }
  ]);
  
  const [body, setBody] = useState("");
  
  // Auth Config
  const [authType, setAuthType] = useState<AuthType>("None");
  const [authToken, setAuthToken] = useState("");
  const [authUser, setAuthUser] = useState("");
  const [authPass, setAuthPass] = useState("");
  
  // Response State
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [responseHeaders, setResponseHeaders] = useState<string>("");
  const [responseData, setResponseData] = useState<string>("");
  const [responseContentType, setResponseContentType] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // UI State
  const [activeTab, setActiveTab] = useState<TabType>("body");
  const [outputMode, setOutputMode] = useState<OutputMode>("Raw");

  const PREDEFINED_HEADERS = [
    "Accept", "Authorization", "Cache-Control", "Content-Type", 
    "User-Agent", "X-Requested-With", "Origin", "Access-Control-Allow-Origin"
  ];

  const addHeaderRow = () => {
    setHeaderList([...headerList, { key: "", value: "", active: true }]);
  };

  const updateHeader = (index: number, field: "key" | "value" | "active", value: any) => {
    const newList = [...headerList];
    newList[index] = { ...newList[index], [field]: value };
    setHeaderList(newList);
  };

  const removeHeader = (index: number) => {
    const newList = headerList.filter((_, i) => i !== index);
    setHeaderList(newList);
  };

  const handleSend = async () => {
    if (!url) return;
    setIsLoading(true);
    setError(null);
    setResponseStatus(null);
    setResponseTime(null);
    setResponseHeaders("");
    setResponseData("");
    setResponseContentType("");
    setOutputMode("Raw");

    const startTime = performance.now();
    try {
      let parsedHeaders: Record<string, string> = {};
      
      // Build Headers from form
      headerList.forEach(h => {
        if (h.active && h.key.trim()) {
          parsedHeaders[h.key.trim()] = h.value.trim();
        }
      });

      // Inject Auth
      if (authType === "Bearer" && authToken) {
        parsedHeaders["Authorization"] = `Bearer ${authToken}`;
      } else if (authType === "Basic" && authUser) {
        const credentials = btoa(`${authUser}:${authPass}`);
        parsedHeaders["Authorization"] = `Basic ${credentials}`;
      }

      const options: RequestInit = {
        method,
        headers: parsedHeaders,
      };

      if (method !== "GET" && (method as string) !== "HEAD" && body.trim()) {
        options.body = body;
      }

      const res = await fetch(url, options);
      const endTime = performance.now();

      setResponseStatus(res.status);
      setResponseTime(Math.round(endTime - startTime));

      const resHeaders: Record<string, string> = {};
      res.headers.forEach((val, key) => {
        resHeaders[key] = val;
      });
      setResponseHeaders(JSON.stringify(resHeaders, null, 2));

      const contentType = res.headers.get("content-type") || "";
      setResponseContentType(contentType);

      if (contentType.includes("application/json")) {
        const data = await res.json();
        setResponseData(JSON.stringify(data, null, 2));
      } else {
        let text = await res.text();
        if (contentType.includes("html")) {
          // Simple HTML formatter for raw text
          let formatted = "";
          let indent = "";
          const tab = "  ";
          text.split(/>\s*</).forEach(function(element) {
            if (element.match(/^\/\w/)) {
              indent = indent.substring(tab.length); // decrease indent
            }
            formatted += indent + '<' + element + '>\r\n';
            if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith("input") && !element.startsWith("img") && !element.startsWith("meta") && !element.startsWith("link") && !element.startsWith("br") && !element.startsWith("hr")) { 
              indent += tab; // increase indent
            }
          });
          text = formatted.substring(1, formatted.length - 3);
        }
        setResponseData(text);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: number | null) => {
    if (!status) return "text-gray-500";
    if (status >= 200 && status < 300) return "text-green-500 bg-green-50";
    if (status >= 300 && status < 400) return "text-yellow-500 bg-yellow-50";
    return "text-red-500 bg-red-50";
  };

  // Generate graph only when needed
  const graphData = useMemo(() => {
    if (outputMode === "Map" && responseData) {
      try {
        return generateGraph(JSON.parse(responseData));
      } catch {
        return { nodes: [], edges: [] };
      }
    }
    return { nodes: [], edges: [] };
  }, [outputMode, responseData]);

  return (
    <ToolShell
      title="API Client"
      subtitle="REST"
      colorName="mod-time"
      inputLabel="Request Configuration"
      outputLabel="Response"
      statusMessage={isLoading ? "Sending Request..." : (responseStatus ? `Status: ${responseStatus}` : "Idle")}
      inputComponent={
        <div className="flex flex-col h-full min-h-0 bg-white">
          <div className="p-4 border-b border-gray-100 shrink-0">
            
            {/* URL Bar */}
            <div className="flex gap-2 mb-4">
              <select 
                value={method} 
                onChange={(e) => setMethod(e.target.value as HttpMethod)}
                className="bg-gray-50 border border-gray-200 text-gray-800 font-bold px-3 py-2 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-100 w-28 shrink-0"
              >
                {["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <input 
                type="text" 
                value={url} 
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="https://api.example.com/v1/users"
                className="flex-grow bg-gray-50 border border-gray-200 text-gray-800 font-mono px-3 py-2 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-100 min-w-0"
              />
            </div>
            
            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-100">
              {(["body", "headers", "auth"] as TabType[]).map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)} 
                  className={`pb-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${
                    activeTab === tab 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab === "auth" ? "Authentication" : tab}
                </button>
              ))}
            </div>
          </div>

          {/* Editors */}
          <div className="flex-grow relative min-h-0 bg-white p-2">
            {activeTab === "body" && (
              <CodeEditor value={body} onChange={setBody} extensions={[json()]} theme="light" />
            )}
            {activeTab === "headers" && (
              <div className="p-4 flex flex-col gap-3 overflow-y-auto h-full">
                {headerList.map((header, index) => (
                  <div key={index} className="flex gap-3 items-center group">
                    <input
                      type="checkbox"
                      checked={header.active}
                      onChange={(e) => updateHeader(index, "active", e.target.checked)}
                      className="w-4 h-4 accent-blue-600 rounded"
                    />
                    <div className="flex-1 relative">
                      <input 
                        type="text"
                        value={header.key}
                        onChange={(e) => updateHeader(index, "key", e.target.value)}
                        placeholder="Header (e.g. Content-Type)"
                        list="preset-headers"
                        className="w-full bg-gray-50 border border-gray-200 text-gray-800 font-mono px-3 py-2 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-100"
                      />
                      <datalist id="preset-headers">
                        {PREDEFINED_HEADERS.map(h => <option key={h} value={h} />)}
                      </datalist>
                    </div>
                    <input 
                      type="text"
                      value={header.value}
                      onChange={(e) => updateHeader(index, "value", e.target.value)}
                      placeholder="Value"
                      className="flex-1 bg-gray-50 border border-gray-200 text-gray-800 font-mono px-3 py-2 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-100"
                    />
                    <button 
                      onClick={() => removeHeader(index)}
                      className="text-gray-300 hover:text-red-500 transition-colors p-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button 
                  onClick={addHeaderRow}
                  className="mt-2 self-start px-4 py-2 text-xs font-bold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  + Add Header
                </button>
              </div>
            )}
            {activeTab === "auth" && (
              <div className="p-4 flex flex-col gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Auth Type</label>
                  <select 
                    value={authType}
                    onChange={(e) => setAuthType(e.target.value as AuthType)}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 px-3 py-2 text-sm rounded-lg outline-none"
                  >
                    <option value="None">No Auth</option>
                    <option value="Bearer">Bearer Token (JWT/OTP)</option>
                    <option value="Basic">Basic Auth</option>
                  </select>
                </div>

                {authType === "Bearer" && (
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Token</label>
                    <input 
                      type="text" 
                      value={authToken} 
                      onChange={(e) => setAuthToken(e.target.value)}
                      placeholder="eyJhbGciOiJIUzI1NiIsInR..."
                      className="w-full bg-gray-50 border border-gray-200 text-gray-800 font-mono px-3 py-2 text-sm rounded-lg outline-none"
                    />
                  </div>
                )}

                {authType === "Basic" && (
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Username</label>
                      <input 
                        type="text" 
                        value={authUser} 
                        onChange={(e) => setAuthUser(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 text-gray-800 px-3 py-2 text-sm rounded-lg outline-none"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Password</label>
                      <input 
                        type="password" 
                        value={authPass} 
                        onChange={(e) => setAuthPass(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 text-gray-800 px-3 py-2 text-sm rounded-lg outline-none"
                      />
                    </div>
                  </div>
                )}
                
                {authType !== "None" && (
                   <div className="mt-4 p-3 bg-blue-50/50 rounded-lg border border-blue-100 text-xs text-blue-600 font-medium">
                     The <code className="font-bold">Authorization</code> header will be automatically injected.
                   </div>
                )}
              </div>
            )}
          </div>
        </div>
      }
      outputComponent={
        <div className="flex flex-col h-full bg-white relative">
          
          {/* Output Toolbar (Shows intelligent options if data exists) */}
          {responseData && !error && (
            <div className="absolute top-2 right-4 z-10 flex gap-2 bg-white/80 backdrop-blur-md p-1 rounded-lg border border-gray-200 shadow-sm">
              <button 
                onClick={() => setOutputMode("Raw")} 
                className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md transition-colors ${outputMode === 'Raw' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                Raw
              </button>
              
              {responseContentType.includes("json") && (
                <button 
                  onClick={() => setOutputMode("Map")} 
                  className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md transition-colors ${outputMode === 'Map' ? 'bg-blue-600 text-white' : 'text-blue-500 hover:bg-blue-50'}`}
                >
                  Visual Map
                </button>
              )}
            </div>
          )}

          {error ? (
            <div className="p-6 h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <TriangleWarning size={24} className="text-red-500" />
              </div>
              <h3 className="text-lg font-black text-gray-900 tracking-tight mb-2">Request Failed</h3>
              <p className="text-sm text-gray-500 font-mono bg-gray-50 p-4 rounded-lg border border-gray-100">{error}</p>
            </div>
          ) : !responseStatus && !isLoading ? (
            <div className="p-6 h-full flex flex-col items-center justify-center text-center text-gray-400">
              <Globe size={48} className="mb-6 opacity-20" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Awaiting Transmission</p>
            </div>
          ) : (
            <>
              {/* Response Stats */}
              <div className="flex items-center gap-4 p-4 border-b border-gray-100 shrink-0 font-mono text-[10px] uppercase tracking-widest">
                <span className={`px-2 py-1 rounded font-bold ${getStatusColor(responseStatus)}`}>
                  {responseStatus || '---'}
                </span>
                <span className="text-blue-500 bg-blue-50 px-2 py-1 rounded flex items-center gap-1 font-bold">
                  <Clock /> {responseTime ? `${responseTime}ms` : '---'}
                </span>
                <span className="text-gray-400 px-2 py-1 truncate max-w-[200px]">
                  {responseContentType || "Unknown Type"}
                </span>
              </div>
              
              {/* Response Body Renderers */}
              <div className="flex-grow relative min-h-0">
                 {outputMode === "Raw" && (
                   <CodeEditor 
                     value={responseData} 
                     onChange={() => {}} 
                     extensions={
                       responseContentType.includes("json") ? [json()] : 
                       responseContentType.includes("html") ? [html()] : 
                       []
                     } 
                     theme="light" 
                   />
                 )}

                 {outputMode === "Map" && responseContentType.includes("json") && (
                   <div className="w-full h-full bg-gray-50">
                     <ReactFlow 
                       nodes={graphData.nodes} 
                       edges={graphData.edges}
                       fitView
                       minZoom={0.1}
                     >
                       <Background color="#ccc" gap={16} />
                       <Controls />
                     </ReactFlow>
                   </div>
                 )}
              </div>
            </>
          )}
        </div>
      }
      actionsComponent={
        <Button size="sm" variant="primary" icon={<Play />} onClick={handleSend} disabled={isLoading}>
          {isLoading ? "Executing..." : "Execute Request"}
        </Button>
      }
    />
  );
}
