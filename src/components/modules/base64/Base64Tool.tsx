"use client";

import { useState } from "react";
import { javascript } from "@codemirror/lang-javascript";
import ToolShell from "@/components/layout/ToolShell";
import CodeEditor from "@/components/ui/CodeEditor";
import Button from "@/components/ui/Button";
import { BsFileEarmarkBinary, BsFileText, BsTrash } from "react-icons/bs";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("Ready");

  const handleEncode = () => {
    if (!input) return;
    try {
      // UTF-8 Safe Encode
      const encoded = btoa(
        encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, (match, p1) => 
          String.fromCharCode(parseInt(p1, 16))
        )
      );
      setOutput(encoded);
      setStatus("Encoded Successfully");
    } catch (e) {
      setStatus("Encoding Failed");
    }
  };

  const handleDecode = () => {
    if (!input) return;
    try {
      // UTF-8 Safe Decode
      const decoded = decodeURIComponent(
        atob(input).split("").map((c) => 
          "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
        ).join("")
      );
      setOutput(decoded);
      setStatus("Decoded Successfully");
    } catch (e) {
      setStatus("Invalid Base64 string");
    }
  };

  return (
    <ToolShell
      title="BASE64"
      subtitle="TOOL"
      colorName="mod-b64"
      inputStats={`${input.length} Chars`}
      statusMessage={status}
      
      inputComponent={
        <CodeEditor 
          value={input} 
          onChange={setInput} 
          extensions={[javascript()]} 
          theme="dark" 
          placeholder="Type text or paste Base64..." 
        />
      }
      
      outputComponent={
        <CodeEditor 
          value={output} 
          extensions={[javascript()]} 
          theme="light" 
          readOnly={true} 
          placeholder="// Result..."
        />
      }
      
      actionsComponent={
        <>
          <Button size="sm" variant="primary" icon={<BsFileEarmarkBinary />} onClick={handleEncode}>
            Encode
          </Button>

          <Button size="sm" variant="outline" icon={<BsFileText />} onClick={handleDecode}>
            Decode
          </Button>

          <div className="mx-2 h-6 w-px bg-gray-300"></div>

          <Button size="sm" variant="danger" icon={<BsTrash />} onClick={() => { setInput(""); setOutput(""); }}>
            Clear
          </Button>
        </>
      }
    />
  );
}