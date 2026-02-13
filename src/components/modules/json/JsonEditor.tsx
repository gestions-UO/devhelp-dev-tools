"use client";

import { useState } from "react";
import { json } from "@codemirror/lang-json";
import ToolShell from "@/components/layout/ToolShell";
import CodeEditor from "@/components/ui/CodeEditor";
import Button from "@/components/ui/Button"; 
import { BsFileEarmarkCode, BsFileZip, BsTrash } from "react-icons/bs";

export default function JsonEditor() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("Waiting for input");

  const handleFormat = () => {
    try {
      if (!input.trim()) return;
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj, null, 2));
      setStatus("Valid JSON Format");
    } catch (e: any) {
      setOutput(e.message);
      setStatus("Syntax Error");
    }
  };

  const handleMinify = () => {
    try {
      if (!input.trim()) return;
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj));
      setStatus("Minified Successfully");
    } catch (e: any) {
      setOutput(e.message);
      setStatus("Syntax Error");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setStatus("Cleared");
  };

  return (
    <ToolShell
      title="JSON"
      subtitle="ENGINE"
      colorName="mod-json"
      statusMessage={status}
      inputStats={input ? `${(new Blob([input]).size / 1024).toFixed(2)} KB` : "0 KB"}
      
      inputComponent={
        <CodeEditor 
          value={input} 
          onChange={setInput} 
          extensions={[json()]} 
          theme="dark" 
          placeholder="// Paste raw JSON here..." 
        />
      }
      
      outputComponent={
        <CodeEditor 
          value={output} 
          extensions={[json()]} 
          theme="light" 
          readOnly={true} 
          placeholder="// Processed result..." 
        />
      }
      
      // HORIZONTAL TOOLBAR ACTIONS
      actionsComponent={
        <>
          <Button size="sm" variant="outline" icon={<BsFileEarmarkCode />} onClick={handleFormat}>
            Format
          </Button>

          <Button size="sm" variant="outline" icon={<BsFileZip />} onClick={handleMinify}>
            Minify
          </Button>

          <div className="mx-2 h-6 w-px bg-gray-300"></div>

          <Button size="sm" variant="danger" icon={<BsTrash />} onClick={handleClear}>
            Clear
          </Button>
        </>
      }
    />
  );
}