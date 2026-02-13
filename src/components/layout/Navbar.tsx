import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-6">
        
        {/* LOGO AREA */}
        <Link href="/" className="flex items-center gap-2 group">
          {/* Icono Geométrico "G" */}
          <div className="flex h-5 w-5 shrink-0 items-center justify-center bg-tech-black transition-transform group-hover:scale-105 md:h-6 md:w-6">
            <svg
              className="h-3 w-3 text-white md:h-4 md:w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          
          {/* Texto del Logo */}
          <h1 className="text-lg font-black tracking-tighter uppercase md:text-2xl">
            DEVHELP<span className="text-gray-400">.DEV</span>
          </h1>
        </Link>

        {/* ATTRIBUTION BADGE */}
        <div className="shrink-0">
          <span className="inline-flex items-center rounded-full border border-gray-300 bg-gray-100 px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-widest text-gray-600 md:px-3 md:py-1.5 md:text-[10px]">
            [ <span className="hidden sm:inline mr-1">BY</span>GESTIONS.ES ]
          </span>
        </div>
        
      </div>
    </nav>
  );
}