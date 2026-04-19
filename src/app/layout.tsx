import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { I18nProvider } from "@/i18n/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nortenode.com"),
  title: {
    default: "NorteNode — Recepcionista IA 24/7 para pequeños negocios",
    template: "%s · NorteNode",
  },
  description:
    "Instalamos agentes de IA que contestan, cualifican y agendan en segundos. " +
    "WhatsApp, widget web, dashboard multi-tenant. Para barberías, tatuadores, " +
    "cerrajeros, gimnasios y más.",
  applicationName: "NorteNode",
  authors: [{ name: "NorteNode", url: "https://nortenode.com" }],
  keywords: [
    "IA", "recepcionista virtual", "WhatsApp business", "agendamiento automático",
    "chatbot SMB", "SaaS", "pequenos negocios", "small business",
  ],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-dark-256.png", sizes: "256x256", type: "image/png" },
      { url: "/icon.png", sizes: "any", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon.png", sizes: "any", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "NorteNode",
  },
  openGraph: {
    type: "website",
    url: "https://nortenode.com",
    siteName: "NorteNode",
    title: "NorteNode — Recepcionista IA 24/7",
    description: "La IA que nunca duerme. WhatsApp + Web, listo en 72h.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NorteNode",
    description: "Recepcionista IA 24/7 para pequeños negocios.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#05060a" },
    { media: "(prefers-color-scheme: light)", color: "#05060a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} dark antialiased h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)] flex flex-col">
        <I18nProvider>
          <LenisProvider>
            <Navbar />
            {children}
          </LenisProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
