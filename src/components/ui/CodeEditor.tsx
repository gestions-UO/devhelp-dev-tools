"use client";

import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { eclipse } from "@uiw/codemirror-theme-eclipse";
import { Extension } from "@codemirror/state";

interface CodeEditorProps {
  value: string;
  onChange?: (val: string) => void;
  extensions?: Extension[]; // Para lenguajes (json(), xml(), etc.)
  readOnly?: boolean;
  theme?: "dark" | "light";
  placeholder?: string;
  className?: string;
}

export default function CodeEditor({
  value,
  onChange,
  extensions = [],
  readOnly = false,
  theme = "dark",
  placeholder,
  className,
}: CodeEditorProps) {
  
  // Selección de tema visual
  const editorTheme = theme === "dark" ? dracula : eclipse;

  return (
    <div className={`h-full w-full overflow-hidden text-sm font-mono ${className}`}>
      <CodeMirror
        value={value}
        height="100%"
        theme={editorTheme}
        extensions={extensions}
        onChange={(val) => !readOnly && onChange && onChange(val)}
        readOnly={readOnly}
        placeholder={placeholder}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          highlightActiveLine: !readOnly,
          autocompletion: !readOnly,
        }}
        // Estilos específicos para forzar el look "Industrial"
        className="h-full [&>.cm-editor]:h-full [&>.cm-scroller]:font-mono"
      />
    </div>
  );
}