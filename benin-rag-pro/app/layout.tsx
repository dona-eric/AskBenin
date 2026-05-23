import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AskBenin — Votre Assistant IA sur le Bénin",
  description:
    "Explorez le patrimoine, la culture, l'économie et les traditions béninoises à travers une plateforme d'intelligence artificielle moderne et accessible.",
  keywords: [
    "Bénin", "IA", "RAG", "Culture", "Traditions", "Patrimoine",
    "Chat IA", "Agent IA", "Afrique", "AskBenin",
  ],
  openGraph: {
    title: "AskBenin — Votre Assistant IA sur le Bénin",
    description: "Découvrez le Bénin à travers l'intelligence artificielle",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#080d19",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-surface-950 text-surface-200 overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
