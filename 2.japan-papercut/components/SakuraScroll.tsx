"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ── Sakura petal generator ────────────────────────────────────────────────
interface PetalProps {
  id: number;
  startX: number;   // vw percentage
  delay: number;    // animation delay in seconds
  duration: number; // fall duration
  size: number;     // petal size in px
  swayAmount: number;
  rotation: number; // initial rotation
}

const PETAL_COUNT = 22;

// Pre-seeded pseudo-random petal config so SSR is deterministic
const petals: PetalProps[] = Array.from({ length: PETAL_COUNT }, (_, i) => {
  const seed = (i * 137.5) % 100; // golden angle-ish spread
  return {
    id: i,
    startX: (seed + (i % 7) * 12) % 95,
    delay: (i * 0.38) % 4,
    duration: 6 + (i % 5) * 1.2,
    size: 10 + (i % 4) * 4,
    swayAmount: 30 + (i % 6) * 15,
    rotation: (i * 47) % 360,
  };
});

function SakuraPetal({ id, startX, delay, duration, size, swayAmount, rotation }: PetalProps) {
  return (
    <motion.div
      key={id}
      className="absolute pointer-events-none top-0"
      style={{ left: `${startX}%` }}
      initial={{ y: -40, opacity: 0, rotate: rotation }}
      animate={{
        y: ["0%", "110vh"],
        opacity: [0, 0.9, 0.9, 0],
        x: [0, swayAmount, -swayAmount * 0.5, swayAmount * 0.3],
        rotate: [rotation, rotation + 180, rotation + 280, rotation + 360],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeIn",
      }}
    >
      {/* Paper-cut petal shape */}
      <svg
        width={size}
        height={size * 1.3}
        viewBox="0 0 24 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2 C18 6 22 14 12 30 C2 14 6 6 12 2Z"
          fill="#f0b8c8"
          fillOpacity="0.85"
          stroke="#e89ab0"
          strokeWidth="0.5"
        />
        {/* Petal vein */}
        <path
          d="M12 4 Q13 16 12 28"
          stroke="#e89ab0"
          strokeWidth="0.6"
          strokeOpacity="0.5"
          fill="none"
        />
      </svg>
    </motion.div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function SakuraScroll() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.3"],
  });

  // Fade + slide-up for the text content as section enters
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.6], [60, 0]);

  // Petals become visible as section enters viewport
  const petalsOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  return (
    <section
      id="sakura"
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
      style={{
        background: "linear-gradient(180deg, #d99b6c 0%, #e4aa88 20%, #eabba6 50%, #e8b4a0 100%)",
      }}
    >
      {/* ── Falling sakura petals ──────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ opacity: petalsOpacity }}
      >
        {petals.map((petal) => (
          <SakuraPetal key={petal.id} {...petal} />
        ))}
      </motion.div>

      {/* ── Paper-cut branch placeholder (left side) ──────────────── */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-full w-48 md:w-64 lg:w-80 pointer-events-none z-20"
        style={{ filter: "drop-shadow(6px 0px 12px rgba(192,81,58,0.15))" }}
      >
        {/* PLACEHOLDER: sakura branch illustration */}
        {/* Insert your paper-craft sakura branch SVG here — it should span vertically along the left edge */}
      </div>

      {/* ── Section content ────────────────────────────────────────── */}
      <motion.div
        className="relative z-30 text-center px-8 max-w-2xl"
        style={{ opacity: textOpacity, y: textY }}
      >
        {/* Decorative Japanese character */}
        <p
          className="text-5xl mb-6 opacity-30 select-none"
          style={{ color: "#3d4f6e", fontFamily: "var(--font-display)" }}
        >
          桜
        </p>

        <h2
          className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-tight text-[#3d4f6e] mb-6"
          style={{ textShadow: "0 2px 8px rgba(61,79,110,0.12)" }}
        >
          Sakura Season
        </h2>

        {/* Paper-cut decorative divider */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="h-px w-12 bg-[#3d4f6e] opacity-30" />
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="#c0513a" strokeWidth="0.8" />
            <circle cx="6" cy="6" r="2" fill="#c0513a" opacity="0.6" />
          </svg>
          <span className="h-px w-12 bg-[#3d4f6e] opacity-30" />
        </div>

        <p
          className="text-[#3d4f6e] opacity-70 text-base md:text-lg leading-relaxed tracking-wide"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Every spring, the cherry blossoms paint the land in a thousand shades of pink —
          a fleeting reminder that beauty lives in the passing moment.
        </p>

        {/* Paper-cut tag decoration */}
        <div
          className="inline-block mt-10 px-6 py-2 border text-[#3d4f6e] text-xs tracking-[0.3em] uppercase opacity-60"
          style={{
            borderColor: "rgba(61,79,110,0.3)",
            fontFamily: "var(--font-body)",
            transform: "rotate(-1deg)",
            boxShadow: "2px 2px 0px rgba(61,79,110,0.1)",
          }}
        >
          花見 · Hanami
        </div>
      </motion.div>

      {/* ── Ground paper layer ─────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-0"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(61,79,110,0.12) 100%)",
        }}
      />
    </section>
  );
}
