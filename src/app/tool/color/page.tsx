"use client";

import { useState, useEffect } from "react";
import ToolShell from "@/components/layout/ToolShell";
import Button from "@/components/ui/Button";
import { Palette, Copy } from "reicon-react";

export default function ColorPalette() {
  const [hex, setHex] = useState("#2563eb");
  const [rgb, setRgb] = useState("rgb(37, 99, 235)");
  const [hsl, setHsl] = useState("hsl(221, 83%, 53%)");

  const hexToRgb = (h: string) => {
    let r = 0, g = 0, b = 0;
    if (h.length === 4) {
      r = parseInt(h[1] + h[1], 16);
      g = parseInt(h[2] + h[2], 16);
      b = parseInt(h[3] + h[3], 16);
    } else if (h.length === 7) {
      r = parseInt(h[1] + h[2], 16);
      g = parseInt(h[3] + h[4], 16);
      b = parseInt(h[5] + h[6], 16);
    }
    return { r, g, b };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHex(val);
    if (/^#[0-9A-Fa-f]{6}$/.test(val) || /^#[0-9A-Fa-f]{3}$/.test(val)) {
      const { r, g, b } = hexToRgb(val);
      setRgb(`rgb(${r}, ${g}, ${b})`);
      const { h, s, l } = rgbToHsl(r, g, b);
      setHsl(`hsl(${h}, ${s}%, ${l}%)`);
    }
  };

  return (
    <ToolShell
      title="Color Tools"
      subtitle="PALETTE"
      colorName="mod-time"
      inputLabel="Color Selector"
      outputLabel="Preview & Values"
      statusMessage="Active"
      inputComponent={
        <div className="flex flex-col h-full bg-white text-gray-800 p-6 font-mono">
          <div className="mb-6">
            <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Pick a Color</label>
            <div className="flex items-center gap-4">
              <input 
                type="color" 
                value={hex} 
                onChange={handleHexChange}
                className="w-16 h-16 cursor-pointer bg-transparent border-0 p-0"
              />
              <input
                type="text"
                value={hex}
                onChange={handleHexChange}
                className="flex-grow bg-gray-50 border border-gray-200 p-3 text-sm focus:border-white outline-none uppercase font-bold"
              />
            </div>
          </div>
          
          <div className="mt-8 text-xs text-gray-500 uppercase tracking-widest leading-relaxed">
            <p>Select a color using the visual picker or enter a valid HEX code manually.</p>
          </div>
        </div>
      }
      outputComponent={
        <div className="w-full h-full bg-white relative p-6 flex flex-col items-center justify-center font-mono">
           <div 
             className="w-48 h-48 rounded-full shadow-2xl mb-8 border-4 border-gray-100 transition-colors duration-300"
             style={{ backgroundColor: hex }}
           />
           
           <div className="w-full max-w-md space-y-4">
             <div className="flex justify-between items-center bg-gray-100 p-3 rounded-sm">
                <span className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">HEX</span>
                <span className="font-bold text-gray-800">{hex.toUpperCase()}</span>
                <button onClick={() => navigator.clipboard.writeText(hex)} className="text-gray-500 hover:text-blue-500"><Copy /></button>
             </div>
             <div className="flex justify-between items-center bg-gray-100 p-3 rounded-sm">
                <span className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">RGB</span>
                <span className="font-bold text-gray-800">{rgb}</span>
                <button onClick={() => navigator.clipboard.writeText(rgb)} className="text-gray-500 hover:text-blue-500"><Copy /></button>
             </div>
             <div className="flex justify-between items-center bg-gray-100 p-3 rounded-sm">
                <span className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">HSL</span>
                <span className="font-bold text-gray-800">{hsl}</span>
                <button onClick={() => navigator.clipboard.writeText(hsl)} className="text-gray-500 hover:text-blue-500"><Copy /></button>
             </div>
           </div>
        </div>
      }
      actionsComponent={<></>}
    />
  );
}
