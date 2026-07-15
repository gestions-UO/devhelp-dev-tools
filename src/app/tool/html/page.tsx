"use client";

import { useState, useEffect, useRef } from "react";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import ToolShell from "@/components/layout/ToolShell";
import CodeEditor from "@/components/ui/CodeEditor";
import Button from "@/components/ui/Button";
import { Play, Plus, CodeFile, Trash, Laptop, Tablet, Phone, X, ArrowUpRight2, AlertTriangle, Eraser } from "reicon-react";

interface VirtualFile {
  name: string;
  content: string;
  language: "html" | "css";
  removable: boolean;
}

const DEFAULT_FILES: VirtualFile[] = [
  {
    name: "index.html",
    language: "html",
    removable: false,
    content: `<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>Hello World</h1>
    <p>Welcome to HTML Studio.</p>
    <a href="about.html" class="btn">Go to About Page</a>
  </div>
</body>
</html>`
  },
  {
    name: "style.css",
    language: "css",
    removable: false,
    content: `body {
  font-family: sans-serif;
  background: #f4f4f9;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}
.container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  text-align: center;
}
.btn {
  display: inline-block;
  margin-top: 1rem;
  padding: 10px 20px;
  background: #2563eb;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}
.btn:hover { background: #1d4ed8; }`
  },
  {
    name: "about.html",
    language: "html",
    removable: true,
    content: `<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>About Us</h1>
    <p>This is a secondary page.</p>
    <a href="index.html" class="btn" style="background:#e34c26">Back Home</a>
  </div>
</body>
</html>`
  }
];

export default function HtmlStudio() {
  const [files, setFiles] = useState<VirtualFile[]>(DEFAULT_FILES);
  const [activeFileName, setActiveFileName] = useState("index.html");
  const [previewPageName, setPreviewPageName] = useState("index.html");
  
  const [isDeviceModalOpen, setDeviceModalOpen] = useState(false);
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

  // --- ESTADOS DE MODALES DE GESTIÓN ---
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newFileNameInput, setNewFileNameInput] = useState("");
  const [createError, setCreateError] = useState("");

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const activeFile = files.find(f => f.name === activeFileName) || files[0];

  const updateFileContent = (val: string) => {
    setFiles(prev => prev.map(f => f.name === activeFileName ? { ...f, content: val } : f));
  };

  // --- ACCIONES DE ARCHIVOS ---
  const handleCreateFile = () => {
    const name = newFileNameInput.trim();
    if (!name) return;
    if (!name.endsWith(".html")) {
      setCreateError("Filename must end with .html");
      return;
    }
    if (files.some(f => f.name === name)) {
      setCreateError("File already exists");
      return;
    }

    const newFile: VirtualFile = {
      name,
      language: "html",
      removable: true,
      content: `<!DOCTYPE html>\n<html>\n<body>\n  <h1>New Page: ${name}</h1>\n  <a href="index.html">Back to Index</a>\n</body>\n</html>`
    };
    setFiles([...files, newFile]);
    setActiveFileName(name);
    setIsCreateModalOpen(false);
    setNewFileNameInput("");
    setCreateError("");
  };

  const handleClearCurrentFile = () => {
    setFiles(prev => prev.map(f => f.name === activeFileName ? { ...f, content: "" } : f));
  };

  const handleResetEverything = () => {
    setFiles([
      { name: "index.html", language: "html", removable: false, content: "" },
      { name: "style.css", language: "css", removable: false, content: "" }
    ]);
    setActiveFileName("index.html");
    setPreviewPageName("index.html");
  };

  const confirmDeleteFile = () => {
    if (!fileToDelete) return;
    setFiles(files.filter(f => f.name !== fileToDelete));
    if (activeFileName === fileToDelete) setActiveFileName("index.html");
    setFileToDelete(null);
  };

  const renderPreview = (targetIframe: HTMLIFrameElement | null) => {
    if (!targetIframe) return;
    const htmlFile = files.find(f => f.name === previewPageName);
    if (!htmlFile) {
        targetIframe.srcdoc = `<h1 style="color:red">404: File ${previewPageName} not found</h1>`;
        return;
    }
    const cssFile = files.find(f => f.name === "style.css");
    const cssContent = cssFile ? cssFile.content : "";
    const interceptorScript = `<script>document.addEventListener('click',(e)=>{const l=e.target.closest('a');if(l){const h=l.getAttribute('href');if(h&&!h.startsWith('http')&&!h.startsWith('#')){e.preventDefault();window.parent.postMessage({type:'NAVIGATE',path:h},'*');}}});</script>`;
    
    targetIframe.srcdoc = `<!DOCTYPE html><html><head><style>${cssContent}</style></head><body>${htmlFile.content}${interceptorScript}</body></html>`;
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "NAVIGATE") setPreviewPageName(event.data.path);
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    renderPreview(iframeRef.current);
  }, [files, previewPageName]);

  const FileTabs = (
    <div className="flex shrink-0 bg-white border-b border-gray-100 overflow-x-auto no-scrollbar p-2 gap-2">
      {files.map(f => (
        <div 
          key={f.name}
          onClick={() => setActiveFileName(f.name)}
          className={`group flex items-center gap-2 px-4 py-2 text-[10px] font-bold tracking-widest uppercase cursor-pointer rounded-full select-none shrink-0 transition-all duration-300 ${activeFileName === f.name ? 'bg-blue-50 text-blue-600 shadow-sm border border-blue-100' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600 border border-transparent'}`}
        >
          {f.language === 'html' ? <CodeFile className={activeFileName === f.name ? "text-blue-500" : "opacity-50"} size={14} /> : <CodeFile className={activeFileName === f.name ? "text-blue-500" : "opacity-50"} size={14} />}
          <span>{f.name}</span>
          {f.removable && (
            <span onClick={(e) => { e.stopPropagation(); setFileToDelete(f.name); }} className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 ml-1 transition-colors bg-white rounded-full p-1 shadow-sm border border-gray-100 hover:border-red-100 hover:bg-red-50">
                <Trash size={10} />
            </span>
          )}
        </div>
      ))}
      <button onClick={() => { setIsCreateModalOpen(true); setCreateError(""); }} className="flex items-center justify-center w-8 h-8 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50 border border-dashed border-gray-300 hover:border-blue-200 transition-colors shrink-0" title="Add Page">
        <Plus size={14} />
      </button>
    </div>
  );

  return (
    <>
      <ToolShell
        title="HTML"
        subtitle="STUDIO"
        colorName="mod-html"
        inputLabel="Project Files"
        outputLabel={`Preview: ${previewPageName}`}
        statusMessage="Live Server Active"
        inputComponent={
          <div className="flex flex-col h-full min-h-0">
            {FileTabs}
            <div className="flex-grow relative min-h-0">
                <CodeEditor value={activeFile.content} onChange={updateFileContent} extensions={activeFile.language === 'css' ? [css()] : [html()]} theme="light" />
            </div>
          </div>
        }
        outputComponent={
          <div className="w-full h-full bg-white relative">
             <iframe ref={iframeRef} className="w-full h-full border-none" title="Live Preview" sandbox="allow-scripts" />
          </div>
        }
        actionsComponent={
          <>
            <Button size="sm" variant="primary" icon={<Play />} onClick={() => renderPreview(iframeRef.current)}>Run / Reload</Button>
            <div className="mx-2 h-6 w-px bg-gray-300"></div>
            <Button size="sm" variant="danger" icon={<Trash />} onClick={handleResetEverything}>Start from Scratch</Button>
            <Button size="sm" variant="outline" icon={<Eraser />} onClick={handleClearCurrentFile}>Clear File</Button>
            <Button size="sm" variant="outline" icon={<ArrowUpRight2 />} onClick={() => setDeviceModalOpen(true)}>Device View</Button>
          </>
        }
      />

      {/* --- MODAL DE BORRADO --- */}
      {fileToDelete && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in-up">
          <div className="w-full max-w-sm bg-white/70 backdrop-blur-3xl border border-white/50 p-8 rounded-[32px] shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
            <h3 className="text-xl font-bold uppercase tracking-widest text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 shadow-inner shrink-0">
                <AlertTriangle size={20} />
              </div>
              Confirm Deletion
            </h3>
            <p className="font-mono text-xs text-gray-600 mb-8 leading-relaxed bg-white/50 p-4 rounded-2xl border border-white">
              Are you sure you want to delete <span className="font-bold text-gray-900">"{fileToDelete}"</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setFileToDelete(null)} className="px-6 py-3 text-sm font-bold tracking-widest text-gray-500 uppercase transition-all duration-300 bg-white border border-gray-200 rounded-full hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={confirmDeleteFile} className="px-6 py-3 text-sm font-bold tracking-widest text-white uppercase transition-all duration-300 bg-red-500 rounded-full shadow-[0_8px_30px_rgb(239,68,68,0.2)] hover:shadow-[0_8px_30px_rgb(239,68,68,0.4)] hover:bg-red-600 hover:-translate-y-1">
                Delete File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL DE CREACIÓN DE ARCHIVO --- */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in-up">
          <div className="w-full max-w-sm bg-white/70 backdrop-blur-3xl border border-white/50 p-8 rounded-[32px] shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
            <h3 className="text-xl font-bold uppercase tracking-widest text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shadow-inner shrink-0">
                <Plus size={20} />
              </div>
              Create New Page
            </h3>
            <div className="mb-8">
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-gray-400">Filename</label>
              <input 
                autoFocus
                type="text" 
                value={newFileNameInput}
                onChange={(e) => setNewFileNameInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateFile()}
                placeholder="contact.html"
                className="w-full bg-white/50 backdrop-blur-xl border border-white rounded-2xl py-3 px-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
              />
              {createError && <p className="mt-2 text-[10px] font-bold text-red-500 uppercase flex items-center gap-1"><AlertTriangle size={12} /> {createError}</p>}
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsCreateModalOpen(false)} className="px-6 py-3 text-sm font-bold tracking-widest text-gray-500 uppercase transition-all duration-300 bg-white border border-gray-200 rounded-full hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={handleCreateFile} className="px-6 py-3 text-sm font-bold tracking-widest text-white uppercase transition-all duration-300 bg-blue-600 rounded-full shadow-[0_8px_30px_rgb(37,99,235,0.2)] hover:shadow-[0_8px_30px_rgb(37,99,235,0.4)] hover:bg-blue-700 hover:-translate-y-1">
                Create File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL DE DISPOSITIVOS --- */}
      {isDeviceModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-md flex flex-col animate-fade-in-up">
            <div className="h-20 flex items-center justify-between px-8 bg-white/70 backdrop-blur-3xl border-b border-white/50 shrink-0 shadow-sm z-10">
                <div className="flex items-center gap-6">
                    <span className="font-bold uppercase tracking-[0.2em] text-gray-900 text-sm flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <ArrowUpRight2 size={16} />
                      </div>
                      Device Preview
                    </span>
                    <div className="flex gap-2 bg-white/50 p-1.5 rounded-full border border-white">
                        <button onClick={() => setDeviceMode("mobile")} className={`p-2.5 rounded-full transition-all duration-300 ${deviceMode === 'mobile' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-800 hover:bg-white'}`}><Phone size={18} /></button>
                        <button onClick={() => setDeviceMode("tablet")} className={`p-2.5 rounded-full transition-all duration-300 ${deviceMode === 'tablet' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-800 hover:bg-white'}`}><Tablet size={18} /></button>
                        <button onClick={() => setDeviceMode("desktop")} className={`p-2.5 rounded-full transition-all duration-300 ${deviceMode === 'desktop' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-800 hover:bg-white'}`}><Laptop size={18} /></button>
                    </div>
                </div>
                <button onClick={() => setDeviceModalOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-400 hover:text-gray-800 hover:bg-gray-50 transition-all shadow-sm"><X size={20} /></button>
            </div>
            <div className="flex-grow flex items-center justify-center overflow-auto p-8 min-h-0 relative">
                <div className="bg-white transition-all duration-300 shadow-2xl relative overflow-hidden flex flex-col shrink-0"
                    style={{
                        width: deviceMode === 'mobile' ? '375px' : deviceMode === 'tablet' ? '768px' : '100%',
                        height: deviceMode === 'desktop' ? '100%' : deviceMode === 'mobile' ? '667px' : '90%',
                        borderRadius: deviceMode === 'desktop' ? '0' : '12px',
                        border: deviceMode !== 'desktop' ? '8px solid #333' : 'none'
                    }}>
                    <div className="h-8 bg-gray-100 border-b border-gray-300 flex items-center px-4 gap-2 shrink-0">
                        <div className="w-2 h-2 rounded-full bg-red-400"></div><div className="w-2 h-2 rounded-full bg-yellow-400"></div><div className="w-2 h-2 rounded-full bg-green-400"></div>
                        <div className="flex-grow bg-white border border-gray-200 rounded-sm h-5 flex items-center px-2 text-[10px] font-mono text-gray-500 mx-2 uppercase">localhost:3000/{previewPageName}</div>
                    </div>
                    <iframe srcDoc={`<!DOCTYPE html><html><head><style>${files.find(f => f.name === "style.css")?.content || ""}</style></head><body>${files.find(f => f.name === previewPageName)?.content || ""} <script>document.addEventListener('click',(e)=>{const l=e.target.closest('a');if(l){e.preventDefault();const h=l.getAttribute('href');window.parent.postMessage({type:'NAVIGATE',path:h},'*');}});</script></body></html>`}
                        className="w-full h-full border-none bg-white" sandbox="allow-scripts" />
                </div>
            </div>
        </div>
      )}
    </>
  );
}