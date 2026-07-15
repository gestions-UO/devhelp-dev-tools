"use client";

import { useState, useEffect } from "react";
import ToolShell from "@/components/layout/ToolShell";
import CodeEditor from "@/components/ui/CodeEditor";
import Button from "@/components/ui/Button";
import { json } from "@codemirror/lang-json";
import { html } from "@codemirror/lang-html"; // Temporary fallback for yaml if no lang-yaml is installed
import { ArrowSwapHorizontal2, Copy } from "reicon-react";
import yaml from "yaml";

export default function YamlConverter() {
  const [source, setSource] = useState("name: DevHelp\nversion: 1.0.0\ntools:\n  - JSON\n  - YAML\nactive: true");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"YAML_TO_JSON" | "JSON_TO_YAML">("YAML_TO_JSON");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    convert();
  }, [source, mode]);

  const convert = () => {
    setError(null);
    if (!source.trim()) {
      setOutput("");
      return;
    }

    try {
      if (mode === "YAML_TO_JSON") {
        const parsed = yaml.parse(source);
        setOutput(JSON.stringify(parsed, null, 2));
      } else {
        const parsed = JSON.parse(source);
        setOutput(yaml.stringify(parsed));
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const toggleMode = () => {
    setMode(prev => prev === "YAML_TO_JSON" ? "JSON_TO_YAML" : "YAML_TO_JSON");
    // Swap contents to keep workflow smooth
    if (!error && output) {
      setSource(output);
    }
  };

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <ToolShell
      title="YAML/JSON"
      subtitle="CONVERTER"
      colorName="mod-json"
      inputLabel={mode === "YAML_TO_JSON" ? "YAML Input" : "JSON Input"}
      outputLabel={mode === "YAML_TO_JSON" ? "JSON Output" : "YAML Output"}
      statusMessage={error ? "Syntax Error" : "Ready"}
      inputComponent={
        <div className="flex flex-col h-full bg-white">
          <div className="flex-grow relative min-h-0">
             <CodeEditor 
               value={source} 
               onChange={setSource} 
               extensions={mode === "JSON_TO_YAML" ? [json()] : []} 
               theme="light" 
             />
          </div>
          {error && (
            <div className="bg-red-500 text-gray-800 text-xs font-mono p-2 shrink-0 border-t border-red-700">
              {error}
            </div>
          )}
        </div>
      }
      outputComponent={
        <div className="flex flex-col h-full bg-white">
          <div className="flex-grow relative min-h-0">
            <CodeEditor 
              value={output} 
              onChange={() => {}} 
              extensions={mode === "YAML_TO_JSON" ? [json()] : []} 
              theme="light" 
            />
          </div>
        </div>
      }
      actionsComponent={
        <>
          <Button size="sm" variant="outline" icon={<ArrowSwapHorizontal2 />} onClick={toggleMode}>
            Swap: {mode === "YAML_TO_JSON" ? "YAML -> JSON" : "JSON -> YAML"}
          </Button>
          <div className="mx-2 h-6 w-px bg-gray-300"></div>
          <Button size="sm" variant="primary" icon={<Copy />} onClick={handleCopy} disabled={!!error || !output}>
            Copy Output
          </Button>
        </>
      }
    />
  );
}
