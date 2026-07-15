"use client";

import { useState } from "react";
import ToolShell from "@/components/layout/ToolShell";
import CodeEditor from "@/components/ui/CodeEditor";
import Button from "@/components/ui/Button";
import { markdown } from "@codemirror/lang-markdown";
import ReactMarkdown from "react-markdown";
import { Eye, Download } from "reicon-react";

const DEFAULT_MD = `# DevHelp Markdown Editor

Welcome to the live markdown previewer!

## Features

- **Real-time rendering** as you type.
- Support for [links](https://github.com), \`inline code\`, and blocks:

\`\`\`javascript
function helloWorld() {
  console.log("Hello, DevHelp!");
}
\`\`\`

> Blockquotes and formatting work flawlessly.
`;

export default function MarkdownEditor() {
  const [source, setSource] = useState(DEFAULT_MD);

  const downloadHtml = () => {
    // Generate a basic HTML string
    // In a real robust implementation, we would render ReactMarkdown to string using ReactDOMServer
    // But since this is client-side only and lightweight, we can just grab the container's innerHTML
    const el = document.getElementById("md-preview-container");
    if(!el) return;
    
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Markdown Export</title>
  <style>
    body { font-family: sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; line-height: 1.6; }
    pre { background: #f4f4f4; padding: 1rem; border-radius: 4px; overflow-x: auto; }
    code { font-family: monospace; background: #f4f4f4; padding: 0.2rem 0.4rem; border-radius: 3px; }
    blockquote { border-left: 4px solid #ccc; margin-left: 0; padding-left: 1rem; color: #666; }
  </style>
</head>
<body>
${el.innerHTML}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'export.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolShell
      title="Markdown"
      subtitle="PREVIEWER"
      colorName="mod-html"
      inputLabel="Markdown Source"
      outputLabel="Live Preview"
      statusMessage="Rendering Active"
      inputComponent={
        <div className="flex flex-col h-full bg-white">
          <div className="flex-grow relative min-h-0">
             <CodeEditor 
               value={source} 
               onChange={setSource} 
               extensions={[markdown()]} 
               theme="light" 
             />
          </div>
        </div>
      }
      outputComponent={
        <div className="flex flex-col h-full bg-white relative overflow-auto p-8 text-black">
          <div id="md-preview-container" className="prose prose-sm max-w-none">
            <ReactMarkdown>{source}</ReactMarkdown>
          </div>
        </div>
      }
      actionsComponent={
        <Button size="sm" variant="primary" icon={<Download />} onClick={downloadHtml}>
          Export to HTML
        </Button>
      }
    />
  );
}
