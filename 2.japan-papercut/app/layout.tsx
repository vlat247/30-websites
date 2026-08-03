import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

// ── Metadata ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Japan Tales — A Paper-Cut Journey",
  description:
    "Explore Japan through the art of kirie paper-cutting. A handcrafted visual journey through cherry blossoms, ancient forests, and timeless stories.",
  openGraph: {
    title: "Japan Tales",
    description: "A paper-cut journey through the land of the rising sun.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} font-sans scroll-smooth`}
    >
      <body className="min-h-full antialiased relative">
        {children}
      </body>
    </html>
  );
}
