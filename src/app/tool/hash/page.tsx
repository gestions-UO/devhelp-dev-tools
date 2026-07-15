"use client";

import { useState, useEffect } from "react";
import ToolShell from "@/components/layout/ToolShell";
import Button from "@/components/ui/Button";
import { ShieldCheck, Copy } from "reicon-react";
import CryptoJS from "crypto-js";

type AlgoType = "MD5" | "SHA1" | "SHA256" | "SHA512" | "AES_ENCRYPT" | "AES_DECRYPT";

export default function CryptoHasher() {
  const [input, setInput] = useState("");
  const [secret, setSecret] = useState(""); // For AES
  const [output, setOutput] = useState("");
  const [algo, setAlgo] = useState<AlgoType>("SHA256");

  useEffect(() => {
    if (!input) {
      setOutput("");
      return;
    }
    try {
      switch (algo) {
        case "MD5": setOutput(CryptoJS.MD5(input).toString()); break;
        case "SHA1": setOutput(CryptoJS.SHA1(input).toString()); break;
        case "SHA256": setOutput(CryptoJS.SHA256(input).toString()); break;
        case "SHA512": setOutput(CryptoJS.SHA512(input).toString()); break;
        case "AES_ENCRYPT": 
          if(secret) setOutput(CryptoJS.AES.encrypt(input, secret).toString());
          else setOutput("Requires Secret Key");
          break;
        case "AES_DECRYPT":
          if(secret) {
            const bytes = CryptoJS.AES.decrypt(input, secret);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
            setOutput(decrypted || "Decryption Failed (Wrong Key or Malformed Input)");
          } else setOutput("Requires Secret Key");
          break;
      }
    } catch (e) {
      setOutput("Error during computation");
    }
  }, [input, algo, secret]);

  return (
    <ToolShell
      title="Crypto Engine"
      subtitle="HASHING"
      colorName="mod-jwt"
      inputLabel="Input Payload"
      outputLabel="Result"
      statusMessage="Local Computation"
      inputComponent={
        <div className="flex flex-col h-full bg-white text-gray-800 p-6 font-mono">
          <div className="mb-6">
            <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Algorithm</label>
            <select 
              value={algo} 
              onChange={(e) => setAlgo(e.target.value as AlgoType)}
              className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:border-white outline-none text-gray-800 font-bold tracking-widest"
            >
              <optgroup label="Hashing (One-way)">
                 <option value="MD5">MD5</option>
                 <option value="SHA1">SHA-1</option>
                 <option value="SHA256">SHA-256</option>
                 <option value="SHA512">SHA-512</option>
              </optgroup>
              <optgroup label="Encryption (Two-way)">
                 <option value="AES_ENCRYPT">AES Encrypt</option>
                 <option value="AES_DECRYPT">AES Decrypt</option>
              </optgroup>
            </select>
          </div>

          {(algo === "AES_ENCRYPT" || algo === "AES_DECRYPT") && (
            <div className="mb-6">
              <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block text-yellow-500">Secret Key</label>
              <input
                type="text"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="SuperSecretPassword"
                className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:border-yellow-500 outline-none"
              />
            </div>
          )}

          <div className="flex-grow flex flex-col">
            <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Plaintext / Ciphertext</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text here..."
              className="flex-grow w-full bg-gray-50 border border-gray-200 p-4 text-sm focus:border-white outline-none resize-none"
            />
          </div>
        </div>
      }
      outputComponent={
        <div className="w-full h-full bg-white relative overflow-auto p-6 text-black font-mono flex flex-col">
           <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 border-b border-gray-200 pb-2">Computed Output</h4>
           <textarea
             readOnly
             value={output}
             className="flex-grow w-full border-none outline-none resize-none font-bold text-sm text-blue-800 break-all"
             placeholder="Output will appear here..."
           />
        </div>
      }
      actionsComponent={
        <Button size="sm" variant="primary" icon={<Copy />} onClick={() => navigator.clipboard.writeText(output)} disabled={!output}>
          Copy Result
        </Button>
      }
    />
  );
}
