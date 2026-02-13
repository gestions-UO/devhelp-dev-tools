import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Configuración de Fuentes
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

export const metadata: Metadata = {
  title: "DEVHELP.DEV | by GESTIONS.ES",
  description: "Rapid. Precise. Essential Utilities for Developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* NOTA: Hemos quitado 'bg-grid-pattern' y 'antialiased-tech' de aquí 
         porque ya están aplicados directamente al tag 'body' en globals.css 
      */}
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        
        <Navbar />

        {children}

        <Footer />
        
      </body>
    </html>
  );
}