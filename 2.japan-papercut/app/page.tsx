import Hero from "@/components/Hero";
import SakuraScroll from "@/components/SakuraScroll";
import PlaceholderSection from "@/components/PlaceholderSection";

export default function Home() {
  return (
    <main>
      {/* ── 1. Hero — full-viewport, gradient sky, clouds, title ─── */}
      <Hero />

      {/* ── 2. Sakura — scroll-triggered petal rain, branch placeholder */}
      <SakuraScroll />

      {/* ── 3. Placeholder — scaffold for future chapter ─────────── */}
      <PlaceholderSection />
    </main>
  );
}
