import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NorteNode AI | Agentes de IA para Clínicas de Estética en Porto",
  description: "Instalamos Agentes de IA que facturan por ti 24/7. Webs autogestionadas con triaje inteligente en Gaia y Porto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased h-full`}
    >
      <body className="min-h-full bg-slate-950 text-slate-50 flex flex-col selection:bg-emerald-500/30">
        {children}
      </body>
    </html>
  );
}
