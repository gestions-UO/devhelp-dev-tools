"use client";

import { useState } from "react";
import { javascript } from "@codemirror/lang-javascript";
import { diff_match_patch } from "diff-match-patch";
import ToolShell from "@/components/layout/ToolShell";
import CodeEditor from "@/components/ui/CodeEditor";
import Button from "@/components/ui/Button";
import { BsArrowsCollapse, BsArrowLeftRight, BsPencilSquare, BsTrash } from "react-icons/bs";

export default function DiffChecker() {
  const [leftText, setLeftText] = useState("function hello() {\n  return true;\n}");
  const [rightText, setRightText] = useState("function helloWorld() {\n  return false;\n}");
  const [diffResult, setDiffResult] = useState<[number, string][] | null>(null);
  const [status, setStatus] = useState("Ready to compare");

  const handleCompare = () => {
    const dmp = new diff_match_patch();
    const diffs = dmp.diff_main(leftText, rightText);
    dmp.diff_cleanupSemantic(diffs);
    setDiffResult(diffs);
    setStatus("Comparison Complete");
  };

  const handleSwap = () => {
    setLeftText(rightText);
    setRightText(leftText);
    setDiffResult(null); // Reset visual
  };

  // Renderizado del Diff Visual (Estilo GitHub simplificado)
  const renderDiff = () => {
    if (!diffResult) return null;

    return (
      <div className="h-full w-full overflow-auto bg-white p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap">
        {diffResult.map((part, index) => {
          const type = part[0]; // -1 (borrado), 0 (igual), 1 (insertado)
          const text = part[1];

          if (type === 0) {
            return <span key={index} className="opacity-50">{text}</span>;
          } else if (type === -1) {
            // Borrado (Rojo y tachado suave) - A veces se oculta en diff view, aquí lo mostramos tachado
            return (
              <span key={index} className="bg-red-100 text-red-600 line-through decoration-red-300 mx-0.5 rounded px-0.5">
                {text}
              </span>
            );
          } else {
            // Insertado (Verde)
            return (
              <span key={index} className="bg-green-100 text-green-700 font-bold border-b-2 border-green-400 mx-0.5 rounded px-0.5">
                {text}
              </span>
            );
          }
        })}
      </div>
    );
  };

  return (
    <ToolShell
      title="DIFF"
      subtitle="CHECKER"
      colorName="mod-diff"
      inputLabel="Original Text"
      outputLabel={diffResult ? "Visual Differences" : "Modified Text (Editable)"}
      statusMessage={status}
      
      // INPUT (Izquierda): Siempre editable
      inputComponent={
        <CodeEditor 
          value={leftText} 
          onChange={setLeftText} 
          extensions={[javascript()]} 
          theme="dark" 
        />
      }
      
      // OUTPUT (Derecha): Cambia entre Editor y Visualizador
      outputComponent={
        diffResult ? (
          renderDiff()
        ) : (
          <CodeEditor 
            value={rightText} 
            onChange={setRightText} 
            extensions={[javascript()]} 
            theme="light" 
            readOnly={false} // Editable!
          />
        )
      }
      
      actionsComponent={
        <>
          {/* Botón Principal: Alterna entre Comparar y Editar */}
          {!diffResult ? (
            <Button size="sm" variant="primary" icon={<BsArrowsCollapse />} onClick={handleCompare}>
              Compare
            </Button>
          ) : (
            <Button size="sm" variant="outline" icon={<BsPencilSquare />} onClick={() => setDiffResult(null)}>
              Edit Modified
            </Button>
          )}

          <Button size="sm" variant="outline" icon={<BsArrowLeftRight />} onClick={handleSwap}>
            Swap
          </Button>

          <div className="mx-2 h-6 w-px bg-gray-300"></div>

          <Button size="sm" variant="danger" icon={<BsTrash />} onClick={() => { setLeftText(""); setRightText(""); setDiffResult(null); }}>
            Clear All
          </Button>
        </>
      }
    />
  );
}