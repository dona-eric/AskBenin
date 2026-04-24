import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@components/Header";
import { Footer } from "@components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AskBenin - Plateforme IA RAG Agentic",
  description:
    "Découvrez le patrimoine, la culture et les traditions béninoise à travers une plateforme d'IA RAG intelligente et accessible.",
  keywords: [
    "Bénin",
    "IA",
    "RAG",
    "Culture",
    "Traditions",
    "Patrimoine",
    "Chat IA",
    "Agent IA",
  ],
  openGraph: {
    title: "AskBenin - Plateforme IA RAG Agentic",
    description: "Explorez le Bénin à travers l'intelligence artificielle",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="AskBenin" />
      </head>
      <body className={`${inter.className} bg-white text-benin-900 overflow-x-hidden`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
