import Link from "next/link";
import { cn } from "@/lib/utils"; // Nuestra utilidad para clases
import { IconType } from "react-icons";

interface ToolCardProps {
  id: string;           // Ej: "MOD_01"
  title: string;        // Ej: "JSON Engine"
  description: string;  // Ej: "Format, validate & minify."
  href: string;         // Ej: "/tool/json"
  version: string;      // Ej: "v1.2"
  icon: IconType;       // Componente de Icono
  colorName: string;    // El nombre de la variable definida en globals (ej: "mod-json")
  status?: "Stable" | "Beta" | "New";
}

export default function ToolCard({
  id,
  title,
  description,
  href,
  version,
  icon: Icon,
  colorName,
  status = "Stable",
}: ToolCardProps) {
  // Construimos clases dinámicas basadas en el nombre del color
  // Nota: Tailwind necesita clases completas para detectarlas, pero como definimos
  // los colores en @theme en globals.css, esto funcionará fluidamente.
  
  // Mapeo de colores para bordes y textos específicos (Tailwind v4 style)
  // Usamos style inline para la barra superior para asegurar el color exacto de la variable CSS
  const colorVar = `var(--color-${colorName})`;

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-60 flex-col justify-between overflow-hidden rounded-sm bg-white p-6 transition-all duration-300",
        "border border-tech-border hover:border-tech-black hover:shadow-xl"
      )}
    >
      {/* Barra Superior Deslizante (Hover Effect) */}
      <div
        className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
        style={{ backgroundColor: colorVar }}
      />

      {/* Header: ID & Status */}
      <div className="flex items-start justify-between">
        <span className="font-mono text-[10px] text-gray-400">{id}</span>
        <span
          className="rounded px-2 py-0.5 text-[10px] font-bold uppercase"
          style={{
            backgroundColor: `color-mix(in srgb, ${colorVar}, white 90%)`, // 10% opacidad
            color: colorVar,
          }}
        >
          {status}
        </span>
      </div>

      {/* Body: Icon & Content */}
      <div>
        <div className="mb-4" style={{ color: colorVar }}>
          <Icon className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-bold tracking-tight text-tech-black transition-transform group-hover:translate-x-1">
          {title}
        </h3>
        <p className="mt-2 font-mono text-xs text-gray-500">{description}</p>
      </div>

      {/* Footer: Version & Action */}
      <div className="flex items-center justify-between border-t border-dashed border-gray-200 pt-4 mt-4">
        <span className="font-mono text-[10px] text-gray-400">{version}</span>
        <span
          className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider transition-all group-hover:gap-2"
        >
          Launch <span style={{ color: colorVar }}>→</span>
        </span>
      </div>
    </Link>
  );
}