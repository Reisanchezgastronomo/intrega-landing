import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = { themeColor: "#0b1115" };

export const metadata: Metadata = {
  title: {
    default: "Rei Sánchez | Dirección Ejecutiva",
    template: "%s | Rei Sánchez",
  },
  description: "Dirección Ejecutiva · Transformación · Autonomía. Producción, multisede, foodservice y rentabilidad. Simplificar para transformar.",
  keywords: ["dirección ejecutiva F&B", "dirección de operaciones", "producción gastronómica", "panadería", "foodservice", "gestión multisede", "rentabilidad"],
  authors: [{ name: "Rei Sánchez" }],
  creator: "Rei Sánchez",
  openGraph: {
    title: "Rei Sánchez | Dirección Ejecutiva",
    description: "Dirección, transformación y autonomía para operaciones gastronómicas y de alimentación.",
    siteName: "Rei Sánchez | Dirección Ejecutiva",
    locale: "es_CO",
    type: "website",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={inter.variable + " " + jetbrainsMono.variable + " antialiased font-sans"}>
        <Header />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
