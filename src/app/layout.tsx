import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Font Configuration
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "600", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

// Viewport settings for mobile responsiveness and browser theme
export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

// Optimized SEO & Open Graph Metadata
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
    "CLI dev tools",
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
    description: "Secure, local-first development utilities. No cloud, no tracking. Process your data privately.",
    url: "https://devhelp.dev",
    siteName: "DevHelp",
    locale: "en_US",
    type: "website",
    // Note: Next.js automatically detects opengraph-image.tsx in the app directory
  },
  twitter: {
    card: "summary_large_image",
    title: "DevHelp // Engineering Workbench",
    description: "High-precision local-first utility suite for engineers. Security by design.",
    creator: "@jprcdev", // Your Twitter handle
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
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-[#f8f9fa] text-[#0a0a0a] min-h-screen flex flex-col`}
      >
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="iEPYn/QGRMN1cr6ag/DYlg" async></script>
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Technical Footer */}
        <Footer />
      </body>
    </html>
  );
}