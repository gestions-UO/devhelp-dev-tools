import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://devhelp.dev"),
  title: {
    default: "DevHelp // Engineering Workbench",
    template: "%s | DevHelp",
  },
  description:
    "Professional local-first developer workbench. Securely process JSON, JWT, Regex, and Logs with zero data leakage. 100% private execution.",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "DevHelp // Engineering Workbench",
    description: "High-precision local-first utility suite for engineers.",
    creator: "@jprcdev",
  },
};