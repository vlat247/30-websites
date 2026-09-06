import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import LiquidGlassHeader from "@/components/LiquidGlassHeader";
import ContactButton from "@/components/ContactButton";
import CursorSparks from "@/components/CursorSparks";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VPN Landing Page | The Hero's Journey",
  description: "Experience the ultimate freedom. No logs. No limits. Just you and the open web, shielded by state-of-the-art encryption.",
};

// RootLayout wraps the entire application, providing global fonts and persistent components.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CursorSparks />
        <LiquidGlassHeader />
        <ContactButton />
        {children}
      </body>
    </html>
  );
}
