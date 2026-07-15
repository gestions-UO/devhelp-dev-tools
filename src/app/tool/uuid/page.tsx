"use client";

import { useState, useEffect } from "react";
import ToolShell from "@/components/layout/ToolShell";
import Button from "@/components/ui/Button";
import { List, Copy } from "reicon-react";
import { v1 as uuidv1, v4 as uuidv4 } from "uuid";
import { ulid } from "ulid";

type IdType = "UUIDv4" | "UUIDv1" | "ULID";

export default function UuidGenerator() {
  const [count, setCount] = useState(10);
  const [type, setType] = useState<IdType>("UUIDv4");
  const [results, setResults] = useState<string[]>([]);

  const generate = () => {
    const list: string[] = [];
    for(let i=0; i<count; i++) {
      if(type === "UUIDv4") list.push(uuidv4());
      else if(type === "UUIDv1") list.push(uuidv1());
      else if(type === "ULID") list.push(ulid());
    }
    setResults(list);
  };

  useEffect(() => {
    generate();
  }, [type, count]);

  return (
    <ToolShell
      title="ID Generator"
      subtitle="UUID / ULID"
      colorName="mod-time"
      inputLabel="Configuration"
      outputLabel={`Generated: ${results.length}`}
      statusMessage="Ready"
      inputComponent={
        <div className="flex flex-col h-full bg-white text-gray-800 p-6 font-mono">
          <div className="mb-6">
            <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Identifier Standard</label>
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value as IdType)}
              className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:border-white outline-none text-gray-800 font-bold tracking-widest"
            >
               <option value="UUIDv4">UUID v4 (Random)</option>
               <option value="UUIDv1">UUID v1 (Timestamp)</option>
               <option value="ULID">ULID (Sortable)</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Quantity: {count}</label>
            <input 
              type="range" 
              min="1" 
              max="500" 
              value={count} 
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <Button variant="outline" size="sm" onClick={generate}>Regenerate Batch</Button>

          <div className="mt-8 p-4 border border-gray-200 text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">
            <p className="mb-2 font-bold text-gray-800">Standard Info:</p>
            {type === "UUIDv4" && "Randomly generated UUID. Most common standard for primary keys."}
            {type === "UUIDv1" && "Time-based UUID. Includes timestamp and MAC address layout."}
            {type === "ULID" && "Universally Unique Lexicographically Sortable Identifier. Shorter than UUID and chronologically sortable."}
          </div>
        </div>
      }
      outputComponent={
        <div className="w-full h-full bg-white relative overflow-auto p-6 text-black font-mono flex flex-col">
           <textarea
             readOnly
             value={results.join('\n')}
             className="flex-grow w-full border-none outline-none resize-none font-bold text-sm text-gray-800 break-all"
           />
        </div>
      }
      actionsComponent={
        <Button size="sm" variant="primary" icon={<Copy />} onClick={() => navigator.clipboard.writeText(results.join('\n'))}>
          Copy All
        </Button>
      }
    />
  );
}
