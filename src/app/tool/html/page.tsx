"use client";

import { useState, useEffect, useRef } from "react";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import ToolShell from "@/components/layout/ToolShell";
import CodeEditor from "@/components/ui/CodeEditor";
import Button from "@/components/ui/Button";
import { 
  BsPlayFill, 
  BsPlusLg, 
  BsFileEarmarkCode, 
  BsFiletypeCss, 
  BsTrash, 
  BsLaptop, 
  BsTablet, 
  BsPhone, 
  BsXLg,
  BsBoxArrowUpRight,
  BsExclamationTriangle
} from "react-icons/bs";

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
    <div className="flex shrink-0 bg-[#252526] border-b border-black overflow-x-auto no-scrollbar">
      {files.map(f => (
        <div 
          key={f.name}
          onClick={() => setActiveFileName(f.name)}
          className={`group flex items-center gap-2 px-3 py-2 text-[10px] font-mono cursor-pointer border-r border-black select-none shrink-0 transition-colors ${activeFileName === f.name ? 'bg-[#1e1e1e] text-white border-t-2 border-t-mod-html' : 'text-gray-500 hover:bg-[#2d2d2d] hover:text-gray-300 border-t-2 border-t-transparent'}`}
        >
          {f.language === 'html' ? <BsFileEarmarkCode className="text-mod-html"/> : <BsFiletypeCss className="text-blue-400"/>}
          <span>{f.name}</span>
          {f.removable && (
            <span onClick={(e) => { e.stopPropagation(); setFileToDelete(f.name); }} className="opacity-0 group-hover:opacity-100 hover:text-red-500 ml-1">
                <BsTrash />
            </span>
          )}
        </div>
      ))}
      <button onClick={() => { setIsCreateModalOpen(true); setCreateError(""); }} className="px-3 text-gray-500 hover:text-white hover:bg-[#2d2d2d] transition-colors" title="Add Page">
        <BsPlusLg className="w-3 h-3" />
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
                <CodeEditor value={activeFile.content} onChange={updateFileContent} extensions={activeFile.language === 'css' ? [css()] : [html()]} theme="dark" />
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
            <Button size="sm" variant="primary" icon={<BsPlayFill />} onClick={() => renderPreview(iframeRef.current)}>Run / Reload</Button>
            <div className="mx-2 h-6 w-px bg-gray-300"></div>
            <Button size="sm" variant="outline" icon={<BsBoxArrowUpRight />} onClick={() => setDeviceModalOpen(true)}>Device View</Button>
          </>
        }
      />

      {/* --- MODAL DE BORRADO --- */}
      {fileToDelete && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in-up">
          <div className="w-full max-w-sm border border-gray-200 bg-white p-6 shadow-2xl rounded-sm">
            <div className="mb-4 flex items-center gap-3 text-red-600">
              <BsExclamationTriangle size={24} />
              <h3 className="text-lg font-black uppercase tracking-tighter">Confirm Deletion</h3>
            </div>
            <p className="mb-6 text-sm text-gray-600">
              Are you sure you want to delete <span className="font-mono font-bold text-black">"{fileToDelete}"</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" size="sm" onClick={() => setFileToDelete(null)}>Cancel</Button>
              <Button variant="danger" size="sm" onClick={confirmDeleteFile}>Delete File</Button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL DE CREACIÓN DE ARCHIVO --- */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in-up">
          <div className="w-full max-w-sm border border-black bg-white p-6 shadow-2xl rounded-sm">
            <h3 className="mb-4 text-lg font-black uppercase tracking-tighter">Create New Page</h3>
            <div className="mb-4">
              <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-gray-400">Filename</label>
              <input 
                autoFocus
                type="text" 
                value={newFileNameInput}
                onChange={(e) => setNewFileNameInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateFile()}
                placeholder="contact.html"
                className="w-full border border-gray-300 p-2 font-mono text-sm outline-none focus:border-mod-html"
              />
              {createError && <p className="mt-1 text-[10px] font-bold text-red-500 uppercase">{createError}</p>}
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="ghost" size="sm" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
              <Button variant="primary" size="sm" onClick={handleCreateFile}>Create File</Button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL DE DISPOSITIVOS (Original) --- */}
      {isDeviceModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex flex-col animate-fade-in-up">
            <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800 bg-black text-white shrink-0">
                <div className="flex items-center gap-4">
                    <span className="font-bold uppercase tracking-widest text-mod-html">Device Preview</span>
                    <div className="flex gap-2">
                        <button onClick={() => setDeviceMode("mobile")} className={`p-2 rounded ${deviceMode === 'mobile' ? 'bg-mod-html text-white' : 'text-gray-400 hover:bg-gray-800'}`}><BsPhone size={20} /></button>
                        <button onClick={() => setDeviceMode("tablet")} className={`p-2 rounded ${deviceMode === 'tablet' ? 'bg-mod-html text-white' : 'text-gray-400 hover:bg-gray-800'}`}><BsTablet size={20} /></button>
                        <button onClick={() => setDeviceMode("desktop")} className={`p-2 rounded ${deviceMode === 'desktop' ? 'bg-mod-html text-white' : 'text-gray-400 hover:bg-gray-800'}`}><BsLaptop size={20} /></button>
                    </div>
                </div>
                <button onClick={() => setDeviceModalOpen(false)} className="text-gray-400 hover:text-white"><BsXLg size={24} /></button>
            </div>
            <div className="flex-grow flex items-center justify-center bg-[#1a1a1a] overflow-auto p-8 min-h-0">
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