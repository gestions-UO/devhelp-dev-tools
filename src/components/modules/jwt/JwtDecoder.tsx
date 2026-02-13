"use client";

import { useState, useEffect } from "react";
import { json } from "@codemirror/lang-json";
import { javascript } from "@codemirror/lang-javascript";
import ToolShell from "@/components/layout/ToolShell";
import CodeEditor from "@/components/ui/CodeEditor";
import Button from "@/components/ui/Button";
import { BsShieldCheck, BsTrash } from "react-icons/bs";

export default function JwtDecoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("Waiting for Token");

  const b64DecodeUnicode = (str: string) => {
    return decodeURIComponent(
      atob(str.replace(/-/g, "+").replace(/_/g, "/"))
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  };

  const handleDecode = () => {
    if (!input.trim()) return;
    const parts = input.split(".");
    
    if (parts.length !== 3) {
      setStatus("Invalid Token Structure");
      setOutput(JSON.stringify({ error: "JWT must have 3 parts (Header.Payload.Signature)" }, null, 2));
      return;
    }

    try {
      const header = JSON.parse(b64DecodeUnicode(parts[0]));
      const payload = JSON.parse(b64DecodeUnicode(parts[1]));
      const signature = parts[2];

      const result = {
        ALGORITHM: header.alg,
        HEADER: header,
        PAYLOAD: payload,
        SIGNATURE: signature
      };

      setOutput(JSON.stringify(result, null, 2));
      setStatus("Token Decoded Successfully");
    } catch (e) {
      setStatus("Decoding Failed");
      setOutput("// Error decoding Base64 parts.");
    }
  };

  useEffect(() => {
    if (input.includes(".")) handleDecode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return (
    <ToolShell
      title="JWT"
      subtitle="DECODER"
      colorName="mod-jwt"
      inputLabel="Encoded Token"
      outputLabel="Decoded Claims"
      inputStats={`${input.length} Chars`}
      statusMessage={status}
      
      inputComponent={
        <CodeEditor 
          value={input} 
          onChange={setInput} 
          extensions={[javascript()]} 
          theme="dark" 
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
        />
      }
      
      outputComponent={
        <CodeEditor value={output} extensions={[json()]} theme="light" readOnly={true} />
      }
      
      // HORIZONTAL TOOLBAR ACTIONS
      actionsComponent={
        <>
          <Button size="sm" variant="primary" icon={<BsShieldCheck />} onClick={handleDecode}>
            Decode manually
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