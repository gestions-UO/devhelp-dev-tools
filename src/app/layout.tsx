import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Configuración de fuentes originales
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Configuración de Viewport para dispositivos móviles y tema
export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

// Metadatos optimizados para SEO y Previsualizaciones (Social Cards)
export const metadata: Metadata = {
  metadataBase: new URL("https://devhelp.dev"),
  title: {
    default: "DevHelp // Engineering Workbench",
    template: "%s | DevHelp",
  },
  description:
    "Professional local-first developer workbench. Securely process JSON, JWT, Regex, and Logs with zero data leakage. 100% private execution on your machine.",
  keywords: [
    "Developer tools",
    "Local-first",
    "JSON Formatter",
    "JWT Decoder",
    "Regex Tester",
    "Privacy focus",
    "Engineering toolbox",
    "Base64 converter",
    "Epoch time",
    "Web utilities",
    "Security tools",
  ],
  authors: [{ name: "Gestions.es", url: "https://gestions.es" }],
  creator: "Gestions.es",
  publisher: "Gestions.es",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "DevHelp // Engineering Workbench",
    description: "Secure, local-first development utilities. No cloud, no tracking.",
    url: "https://devhelp.dev",
    siteName: "DevHelp",
    locale: "en_US",
    type: "website",
    // Nota: Next.js usará automáticamente el archivo opengraph-image.tsx si existe
  },
  twitter: {
    card: "summary_large_image",
    title: "DevHelp // Engineering Workbench",
    description: "High-precision local-first utility suite for engineers.",
    creator: "@jprcdev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f8f9fa] text-[#0a0a0a] min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}