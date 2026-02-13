"use client";

import { useState, useEffect, useRef } from "react";
import ToolShell from "@/components/layout/ToolShell";
import CodeEditor from "@/components/ui/CodeEditor";
import Button from "@/components/ui/Button";
import { 
  BsPlayFill, 
  BsTrash, 
  BsBugFill, 
  BsFastForwardFill, 
  BsPauseFill 
} from "react-icons/bs";

// Tipos para nuestro motor de visualización
interface CharState {
  char: string;
  status: "pending" | "scanning" | "match" | "discard";
  index: number;
}

export default function RegexTester() {
  const [textInput, setTextInput] = useState("Contact: admin@gestions.es\nID: 554-232-11");
  const [pattern, setPattern] = useState("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
  const [flags, setFlags] = useState({ g: true, i: true, m: false });
  
  // Estado del Visualizador
  const [visualState, setVisualState] = useState<CharState[]>([]);
  const [cursor, setCursor] = useState<number>(-1); // -1 = Inactivo
  const [isPlaying, setIsPlaying] = useState(false);
  const [matchesMap, setMatchesMap] = useState<Set<number>>(new Set());
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // --- 1. PREPARACIÓN ---
  // Antes de empezar, calculamos dónde están los matches reales para "simular" el descubrimiento
  const prepareSimulation = () => {
    if (!textInput || !pattern) return;

    // 1. Resetear estados
    const initialChars: CharState[] = textInput.split("").map((c, i) => ({
      char: c,
      status: "pending",
      index: i
    }));
    setVisualState(initialChars);
    setCursor(0);
    setIsPlaying(false);

    // 2. Calcular mapa de matches reales (índices que son verdes)
    let flagStr = "";
    if (flags.g) flagStr += "g";
    if (flags.i) flagStr += "i";
    if (flags.m) flagStr += "m";

    try {
      const regex = new RegExp(pattern, flagStr);
      const validIndices = new Set<number>();
      let match;

      // Si es global, buscamos todos. Si no, solo el primero.
      if (!flags.g) {
         match = regex.exec(textInput);
         if (match) {
            for (let i = match.index; i < match.index + match[0].length; i++) {
                validIndices.add(i);
            }
         }
      } else {
         while ((match = regex.exec(textInput)) !== null) {
            // Protección bucles infinitos
            if (match.index === regex.lastIndex) regex.lastIndex++;
            
            for (let i = match.index; i < match.index + match[0].length; i++) {
                validIndices.add(i);
            }
         }
      }
      setMatchesMap(validIndices);
      return true; // Ready to start
    } catch (e) {
      return false; // Error en regex
    }
  };

  // --- 2. EL MOTOR DE PASOS (TICK) ---
  const tick = () => {
    setCursor((prev) => {
        if (prev >= textInput.length) {
            setIsPlaying(false); // Fin del texto
            return prev;
        }

        // Actualizamos el estado visual del caracter ANTERIOR
        setVisualState((prevMap) => {
            const newMap = [...prevMap];
            
            // El carácter que acabamos de pasar: ¿Era match o descarte?
            const isMatch = matchesMap.has(prev);
            
            newMap[prev] = {
                ...newMap[prev],
                status: isMatch ? "match" : "discard"
            };
            
            // El NUEVO carácter actual (si existe) pasa a scanning
            if (prev + 1 < newMap.length) {
                newMap[prev + 1] = { ...newMap[prev + 1], status: "scanning" };
            }
            
            return newMap;
        });

        return prev + 1;
    });
  };

  // --- 3. CONTROLES DE REPRODUCCIÓN ---
  
  // Iniciar / Resetear
  const handleStart = () => {
    if (prepareSimulation()) {
        setIsPlaying(true);
    }
  };

  // Play / Pause Toggle
  const togglePlay = () => {
    if (cursor === -1 || cursor >= textInput.length) {
        handleStart(); // Si estaba parado o terminado, reiniciar
    } else {
        setIsPlaying(!isPlaying);
    }
  };

  // Efecto para el auto-play
  useEffect(() => {
    if (isPlaying) {
      // Velocidad de escaneo: Rápido si es match (consume), lento si es descarte (evalúa)
      // Truco visual: si el caracter actual es match, ir rapido, si no, ir lento para ver el fallo
      const isCurrentMatch = matchesMap.has(cursor);
      const speed = isCurrentMatch ? 50 : 150; 

      timerRef.current = setTimeout(tick, speed);
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  });

  // Paso Manual
  const handleStep = () => {
    setIsPlaying(false); // Pausar si estaba corriendo
    if (cursor === -1) prepareSimulation(); // Iniciar si no estaba listo
    else tick();
  };

  // UI INPUT CONTROLS
  const RegexControls = (
    <div className="flex flex-col h-full">
      {/* Pattern Bar */}
      <div className="bg-[#252526] p-2 border-b border-black flex flex-col gap-2 shrink-0">
        <div className="flex items-center bg-[#1e1e1e] border border-gray-600 rounded px-2 py-1">
          <span className="text-gray-500 font-mono mr-1">/</span>
          <input 
            type="text" 
            value={pattern} 
            onChange={(e) => { setPattern(e.target.value); setCursor(-1); }} 
            className="bg-transparent text-[#ff79c6] border-none outline-none w-full font-mono text-sm placeholder-gray-600 focus:ring-0"
            placeholder="Pattern..."
          />
          <span className="text-gray-500 font-mono ml-1">/</span>
        </div>
        
        <div className="flex gap-4 px-1">
          {['g', 'i', 'm'].map((f) => (
            <label key={f} className="flex items-center gap-1 cursor-pointer select-none group">
              <input 
                type="checkbox" 
                checked={flags[f as keyof typeof flags]} 
                onChange={() => {
                    setFlags(prev => ({...prev, [f]: !prev[f as keyof typeof flags]}));
                    setCursor(-1); // Reset si cambian flags
                }}
                className="accent-mod-regex h-3 w-3 bg-[#1e1e1e] border-gray-600" 
              />
              <span className="text-[10px] font-mono uppercase text-gray-400 group-hover:text-white transition-colors">{f}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex-grow overflow-hidden relative">
         <CodeEditor 
            value={textInput} 
            onChange={(val) => { setTextInput(val); setCursor(-1); }} 
            theme="dark" 
            placeholder="Text to test..." 
         />
      </div>
    </div>
  );

  return (
    <ToolShell
      title="REGEX"
      subtitle="SCANNER"
      colorName="mod-regex"
      inputLabel="Regex Engine Input"
      outputLabel={cursor > -1 ? "Engine Visualization" : "Ready to Scan"}
      statusMessage={cursor > -1 
        ? (isPlaying ? "Scanning..." : "Paused") 
        : "Idle"
      }
      
      inputComponent={RegexControls}
      
      outputComponent={
        <div className="flex flex-col h-full bg-white relative">
            
            {/* PANEL DE ESTADO DEL MOTOR */}
            {cursor > -1 && (
                <div className="bg-gray-50 border-b border-gray-200 p-2 flex items-center justify-between text-xs font-mono shrink-0">
                    <div className="flex gap-4">
                        <div>
                            <span className="text-gray-400 uppercase tracking-wider mr-2">Index:</span>
                            <span className="font-bold text-gray-700">{cursor}</span>
                        </div>
                        <div>
                            <span className="text-gray-400 uppercase tracking-wider mr-2">Char:</span>
                            <span className="font-bold text-black bg-gray-200 px-1 rounded">
                                {visualState[cursor]?.char === '\n' ? '↵' : visualState[cursor]?.char || 'EOF'}
                            </span>
                        </div>
                    </div>
                    
                    {/* Leyenda Visual */}
                    <div className="flex gap-3 text-[10px] uppercase font-bold tracking-widest">
                        <span className="flex items-center gap-1 text-gray-400"><div className="w-2 h-2 bg-red-100 border border-red-300"></div> Discard</span>
                        <span className="flex items-center gap-1 text-green-600"><div className="w-2 h-2 bg-green-100 border border-green-400"></div> Match</span>
                        <span className="flex items-center gap-1 text-blue-600"><div className="w-2 h-2 bg-blue-500"></div> Cursor</span>
                    </div>
                </div>
            )}

            {/* VISUALIZACIÓN DEL TEXTO CARÁCTER A CARÁCTER */}
            <div className="flex-grow p-6 font-mono text-sm leading-relaxed overflow-auto whitespace-pre-wrap break-all">
                {cursor === -1 ? (
                    <span className="text-gray-400 opacity-50 select-none">// Press 'Play' or 'Step' to see the engine in action...</span>
                ) : (
                    visualState.map((item, idx) => {
                        // Determinar clases según estado
                        let bgClass = "";
                        let textClass = "text-gray-800";
                        
                        if (item.status === "match") {
                            bgClass = "bg-green-200 border-b-2 border-green-500";
                            textClass = "text-green-900 font-bold";
                        } else if (item.status === "discard") {
                            bgClass = "bg-red-100 text-red-300 line-through decoration-red-300/50"; // Efecto tachado suave para descarte
                            textClass = "text-red-400 opacity-60";
                        } else if (item.status === "scanning") {
                            bgClass = "bg-blue-500 text-white shadow-lg scale-110 px-1 rounded z-10 inline-block"; // Cursor actual
                            textClass = "text-white font-bold animate-pulse";
                        } else {
                            textClass = "text-gray-300"; // Pendiente (futuro)
                        }

                        return (
                            <span 
                                key={idx} 
                                className={`transition-all duration-200 ${bgClass} ${textClass}`}
                            >
                                {item.char}
                            </span>
                        );
                    })
                )}
            </div>
        </div>
      }
      
      actionsComponent={
        <>
          {/* Botón: Play/Pause */}
          <Button 
            size="sm" 
            variant="primary" 
            icon={isPlaying ? <BsPauseFill /> : <BsPlayFill />} 
            onClick={togglePlay}
            className={isPlaying ? "bg-red-500 border-red-500 hover:bg-red-600" : ""}
          >
            {isPlaying ? "Pause" : (cursor === -1 ? "Start Scan" : "Resume")}
          </Button>
          
          {/* Botón: Step (Paso a paso) */}
          <Button 
            size="sm" 
            variant="outline" 
            icon={<BsFastForwardFill />} 
            onClick={handleStep}
            title="Evaluate next character"
          >
            Step
          </Button>

          <div className="mx-2 h-6 w-px bg-gray-300"></div>

          <Button 
            size="sm" 
            variant="danger" 
            icon={<BsTrash />} 
            onClick={() => { setCursor(-1); setIsPlaying(false); }}
          >
            Reset
          </Button>
        </>
      }
    />
  );
}