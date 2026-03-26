import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FloatingSalesBot from "@/components/FloatingSalesBot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NorteNode AI | Automação e IA para Clínicas no Porto e Gaia",
  description: "Instalamos Agentes de IA e automatizamos agendamentos para clínicas de estética em Vila Nova de Gaia e Porto. Aumente as suas marcações 24/7.",
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-PT"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased h-full`}
    >
      <body className="min-h-full bg-slate-950 text-slate-50 flex flex-col selection:bg-emerald-500/30">
        <Navbar />
        {children}
        <FloatingSalesBot />
      </body>
    </html>
  );
}
