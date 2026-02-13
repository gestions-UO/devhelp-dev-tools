import { ReactNode } from "react";

interface ToolShellProps {
  title: string;
  subtitle: string;
  colorName: string;
  inputLabel?: string;
  outputLabel?: string;
  inputComponent: ReactNode;
  outputComponent: ReactNode;
  actionsComponent: ReactNode;
  inputStats?: string;
  statusMessage?: string;
}

export default function ToolShell({
  title,
  subtitle,
  colorName,
  inputLabel = "Input Source",
  outputLabel = "Processed Result",
  inputComponent,
  outputComponent,
  actionsComponent,
  inputStats = "--",
  statusMessage = "Ready",
}: ToolShellProps) {
  
  const colorVar = `var(--color-${colorName})`;

  return (
    <div className="flex h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex-col bg-gray-100 overflow-hidden">
      
      {/* 1. HEADER DE LA HERRAMIENTA + TOOLBAR (NUEVO DISEÑO) */}
      <header className="flex flex-col border-b border-gray-300 bg-white shrink-0 z-20 shadow-sm">
        
        {/* Fila Superior: Título y Status */}
        <div className="flex items-center justify-between px-4 h-12 border-b border-gray-100">
            <div className="flex items-center gap-2 font-black uppercase tracking-tighter">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colorVar }}></div>
                <span className="text-gray-800">{title}</span>
                <span className="text-gray-300">/</span>
                <span style={{ color: colorVar }}>{subtitle}</span>
            </div>
            <div className="text-[10px] font-mono uppercase text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-200">
                {statusMessage}
            </div>
        </div>

        {/* Fila Inferior: BARRA DE ACCIONES (Aquí van tus botones ahora) */}
        <div className="flex items-center gap-2 px-4 py-2 overflow-x-auto no-scrollbar bg-gray-50/50">
            {actionsComponent}
        </div>
      </header>

      {/* 2. ÁREA DE TRABAJO (SPLIT VIEW) */}
      <main className="flex flex-grow min-h-0 flex-col md:flex-row overflow-hidden">
        
        {/* COLUMN 1: INPUT (DARK) - 50% Ancho */}
        <section className="flex flex-1 flex-col min-w-0 overflow-hidden border-b md:border-b-0 md:border-r border-gray-800 bg-vscode-bg relative group">
            {/* Input Header */}
            <div className="flex h-8 shrink-0 items-center justify-between bg-[#252526] px-4 text-gray-400 select-none border-b border-black">
                <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    {inputLabel}
                </span>
                <span className="text-[10px] font-mono opacity-50">{inputStats}</span>
            </div>
            
            {/* Editor */}
            <div className="relative flex-grow min-h-0">
                {inputComponent}
            </div>
        </section>

        {/* COLUMN 2: OUTPUT (LIGHT) - 50% Ancho */}
        <section className="flex flex-1 flex-col min-w-0 overflow-hidden bg-paper-bg relative">
             {/* Output Header */}
             <div className="flex h-8 shrink-0 items-center justify-between bg-gray-100 px-4 text-gray-500 select-none border-b border-gray-300">
                <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {outputLabel}
                </span>
                {/* Decoración visual */}
                <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                </div>
            </div>

            {/* Editor */}
            <div className="relative flex-grow min-h-0">
                {outputComponent}
            </div>
        </section>

      </main>
    </div>
  );
}