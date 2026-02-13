import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-200 bg-white py-6 md:py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        
        {/* Left: Branding */}
        <div className="flex items-center gap-2">
          <span className="font-black text-xs uppercase md:text-sm">
            DEVHELP.DEV
          </span>
          <span className="text-xs text-gray-400">
            by Gestions.es
          </span>
        </div>

        {/* Center: Links (Technical Style) */}
        <div className="flex gap-6">
            <Link href="/docs" className="text-xs font-bold uppercase text-tech-black hover:text-blue-600 transition-colors">
                Documentation
            </Link>
            <Link href="/legal" className="text-xs font-bold uppercase text-tech-black hover:text-blue-600 transition-colors">
                Legal
            </Link>
        </div>

        {/* Right: Copyright */}
        <div className="text-center font-mono text-[10px] uppercase tracking-widest text-gray-500 md:text-right md:text-xs">
          © {currentYear} All rights reserved.
        </div>
        
      </div>
    </footer>
  );
}