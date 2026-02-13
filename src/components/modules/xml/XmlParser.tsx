"use client";

import { useState } from "react";
import { xml } from "@codemirror/lang-xml";
import { json } from "@codemirror/lang-json";
import ToolShell from "@/components/layout/ToolShell";
import CodeEditor from "@/components/ui/CodeEditor";
import Button from "@/components/ui/Button";
import { BsFileEarmarkCode, BsBraces, BsFileZip } from "react-icons/bs";

export default function XmlParser() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("Waiting for XML");
  const [outputLang, setOutputLang] = useState<"xml" | "json">("xml");

  const formatXML = (xmlString: string) => {
    let formatted = "";
    const reg = /(>)(<)(\/*)/g;
    xmlString = xmlString.replace(reg, "$1\r\n$2$3");
    let pad = 0;
    
    xmlString.split("\r\n").forEach((node) => {
      let indent = 0;
      if (node.match(/.+<\/\w[^>]*>$/)) indent = 0;
      else if (node.match(/^<\/\w/)) { if (pad !== 0) pad -= 1; }
      else if (node.match(/^<\w[^>]*[^\/]>.*$/)) indent = 1;
      
      let padding = "";
      for (let i = 0; i < pad; i++) padding += "  ";
      formatted += padding + node + "\r\n";
      pad += indent;
    });
    return formatted.trim();
  };

  const xmlToJson = (xml: Element): any => {
    let obj: any = {};
    if (xml.nodeType === 1) { 
      if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
        for (let j = 0; j < xml.attributes.length; j++) {
          const attribute = xml.attributes.item(j);
          if(attribute) obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType === 3) { 
      obj = xml.nodeValue;
    }

    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        const item = xml.childNodes.item(i);
        const nodeName = item.nodeName;
        if (typeof obj[nodeName] === "undefined") {
          if (nodeName === "#text") {
            const text = item.nodeValue ? item.nodeValue.trim() : "";
            if (text) obj = text;
          } else {
            obj[nodeName] = xmlToJson(item as Element);
          }
        } else {
          if (typeof obj[nodeName].push === "undefined") {
            const old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xmlToJson(item as Element));
        }
      }
    }
    return obj;
  };

  const handlePrettify = () => {
    if (!input) return;
    try {
      const res = formatXML(input);
      setOutput(res);
      setOutputLang("xml");
      setStatus("XML Formatted");
    } catch (e) {
      setStatus("Invalid XML");
    }
  };

  const handleMinify = () => {
    if (!input) return;
    const res = input.replace(/>\s+</g, "><").trim();
    setOutput(res);
    setOutputLang("xml");
    setStatus("XML Minified");
  };

  const handleToJson = () => {
    if (!input) return;
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(input, "text/xml");
      if (xmlDoc.querySelector("parsererror")) throw new Error("Invalid XML");
      
      const jsonRes = xmlToJson(xmlDoc.documentElement);
      setOutput(JSON.stringify(jsonRes, null, 2));
      setOutputLang("json");
      setStatus("Converted to JSON");
    } catch (e) {
      setStatus("XML Parsing Error");
    }
  };

  return (
    <ToolShell
      title="XML"
      subtitle="PARSER"
      colorName="mod-xml"
      inputStats={`${input.length} Chars`}
      statusMessage={status}
      
      inputComponent={
        <CodeEditor value={input} onChange={setInput} extensions={[xml()]} theme="dark" placeholder="" />
      }
      
      outputComponent={
        <CodeEditor value={output} extensions={outputLang === "json" ? [json()] : [xml()]} theme="light" readOnly={true} />
      }
      
      // HORIZONTAL TOOLBAR ACTIONS
      actionsComponent={
        <>
          <Button size="sm" variant="outline" icon={<BsFileEarmarkCode />} onClick={handlePrettify}>Format</Button>
          <Button size="sm" variant="outline" icon={<BsFileZip />} onClick={handleMinify}>Minify</Button>
          
          <div className="mx-2 h-6 w-px bg-gray-300"></div>

          <Button size="sm" variant="primary" icon={<BsBraces />} onClick={handleToJson}>To JSON</Button>
        </>
      }
    />
  );
}