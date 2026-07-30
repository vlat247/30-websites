import type { Metadata } from "next";
import { IM_Fell_English_SC, Noto_Serif } from "next/font/google";
import "./globals.css";

// ── Fonts ─────────────────────────────────────────────────────────────────
// Display: elegant serif italics for titles
const imFellEnglish = IM_Fell_English_SC({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

// Body: classical serif — works across all platforms
const notoSerif = Noto_Serif({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600"],
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
      className={`${imFellEnglish.variable} ${notoSerif.variable} scroll-smooth`}
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
