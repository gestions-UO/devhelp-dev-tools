"use client";

import { useState, useEffect } from "react";
import { json } from "@codemirror/lang-json";
import { javascript } from "@codemirror/lang-javascript";
import ToolShell from "@/components/layout/ToolShell";
import CodeEditor from "@/components/ui/CodeEditor";
import Button from "@/components/ui/Button";
import { BsClockHistory, BsCalendarCheck, BsArrowLeftRight, BsTrash } from "react-icons/bs";

export default function EpochConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("Ready");
  const [now, setNow] = useState(Date.now());

  // Reloj interno
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleConvert = (mode: "toHuman" | "toTimestamp") => {
    if (!input.trim()) return;

    try {
      let dateObj: Date;
      
      if (mode === "toHuman") {
        // Si es solo números, asumimos timestamp
        if (/^\d+$/.test(input)) {
          let ts = parseFloat(input);
          // Heurística: Si es menor a 10 billones, es segundos (Unix clásico), si no milisegundos
          if (ts < 10000000000) ts *= 1000;
          dateObj = new Date(ts);
        } else {
          dateObj = new Date(input);
        }
      } else {
        dateObj = new Date(input);
      }

      if (isNaN(dateObj.getTime())) throw new Error("Invalid Date");

      const result = {
        unix_seconds: Math.floor(dateObj.getTime() / 1000),
        unix_milliseconds: dateObj.getTime(),
        iso_8601: dateObj.toISOString(),
        utc: dateObj.toUTCString(),
        local: dateObj.toString(),
        parts: {
            year: dateObj.getUTCFullYear(),
            month: dateObj.getUTCMonth() + 1,
            day: dateObj.getUTCDate(),
            time: dateObj.toTimeString().split(" ")[0]
        }
      };

      setOutput(JSON.stringify(result, null, 2));
      setStatus("Conversion Successful");
    } catch (e) {
      setOutput(JSON.stringify({ error: "Invalid date format or timestamp" }, null, 2));
      setStatus("Error");
    }
  };

  const insertNow = () => {
    setInput(Math.floor(Date.now() / 1000).toString());
    handleConvert("toHuman"); // Auto convertir
  };

  return (
    <ToolShell
      title="EPOCH"
      subtitle="TIME"
      colorName="mod-time"
      inputLabel={`Current Unix: ${Math.floor(now / 1000)}`}
      outputLabel="Time Object"
      statusMessage={status}
      
      inputComponent={
        <CodeEditor 
          value={input} 
          onChange={setInput} 
          extensions={[javascript()]} 
          theme="dark" 
          placeholder="// Paste Timestamp (169...) or Date string here..." 
        />
      }
      
      outputComponent={
        <CodeEditor value={output} extensions={[json()]} theme="light" readOnly={true} />
      }
      
      actionsComponent={
        <>
          <Button size="sm" variant="primary" icon={<BsClockHistory />} onClick={insertNow}>
            Use "Now"
          </Button>

          <div className="mx-2 h-6 w-px bg-gray-300"></div>

          <Button size="sm" variant="outline" icon={<BsCalendarCheck />} onClick={() => handleConvert("toHuman")}>
            To Date
          </Button>

          <Button size="sm" variant="outline" icon={<BsArrowLeftRight />} onClick={() => handleConvert("toTimestamp")}>
            To Timestamp
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