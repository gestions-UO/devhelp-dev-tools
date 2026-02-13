import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export default function Button({
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  icon,
  children,
  ...props
}: ButtonProps) {
  
  // 1. Estilos Base (Siempre presentes)
  const baseStyles = "inline-flex items-center justify-center rounded-sm font-bold uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none";

  // 2. Variantes Visuales (Colores)
  const variants = {
    primary: 
      "bg-tech-black text-white border border-tech-black hover:bg-white hover:text-tech-black focus:ring-tech-black",
    outline: 
      "bg-white text-tech-black border border-gray-300 hover:border-tech-black hover:bg-gray-50 focus:ring-gray-400",
    ghost: 
      "bg-transparent text-tech-black hover:bg-gray-100 border border-transparent focus:ring-gray-300",
    danger: 
      "bg-white text-red-600 border border-gray-200 hover:border-red-500 hover:bg-red-50 focus:ring-red-200",
  };

  // 3. Tamaños
  const sizes = {
    sm: "h-8 px-3 text-[10px]",
    md: "h-10 px-6 text-xs",
    lg: "h-12 px-8 text-sm",
    icon: "h-10 w-10 p-2", // Cuadrado para iconos
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {/* Loading Spinner */}
      {isLoading && (
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}

      {/* Icon Slot (Si no está cargando) */}
      {!isLoading && icon && <span className="mr-2">{icon}</span>}

      {/* Text Content */}
      {children}
    </button>
  );
}