import type { Metadata, Viewport } from "next";
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
  manifest: "/manifest.json",
  icons: {
    icon: [
      {
        url: "/favicon-dark-256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        url: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        url: "/apple-icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "NorteNode AI",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
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
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-full bg-slate-950 text-slate-50 flex flex-col selection:bg-emerald-500/30">
        <Navbar />
        {children}
        <FloatingSalesBot />
      </body>
    </html>
  );
}
