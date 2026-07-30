"use client";

import { motion } from "framer-motion";

// Three cloud layers drifting at different speeds for parallax effect
const cloudLayers = [
  {
    id: "cloud-back",
    y: "12%",
    scale: 0.7,
    opacity: 0.35,
    duration: 60,
    delay: 0,
    width: 220,
    height: 80,
  },
  {
    id: "cloud-mid",
    y: "22%",
    scale: 0.85,
    opacity: 0.55,
    duration: 45,
    delay: -12,
    width: 300,
    height: 100,
  },
  {
    id: "cloud-front",
    y: "35%",
    scale: 1,
    opacity: 0.7,
    duration: 30,
    delay: -6,
    width: 380,
    height: 110,
  },
];

function PaperCloud({
  y,
  scale,
  opacity,
  duration,
  delay,
  width,
  height,
}: (typeof cloudLayers)[0]) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: y, left: "-30%", scale, opacity }}
      animate={{ x: ["0vw", "130vw"] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {/* Paper-cut cloud shape: layered ellipses */}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          cx={width * 0.5}
          cy={height * 0.72}
          rx={width * 0.48}
          ry={height * 0.28}
          fill="rgba(245,237,224,0.9)"
          filter="url(#cloud-shadow)"
        />
        <ellipse
          cx={width * 0.35}
          cy={height * 0.5}
          rx={width * 0.25}
          ry={height * 0.3}
          fill="rgba(245,237,224,0.95)"
        />
        <ellipse
          cx={width * 0.58}
          cy={height * 0.42}
          rx={width * 0.22}
          ry={height * 0.28}
          fill="rgba(245,237,224,0.95)"
        />
        <ellipse
          cx={width * 0.72}
          cy={height * 0.55}
          rx={width * 0.18}
          ry={height * 0.22}
          fill="rgba(245,237,224,0.9)"
        />
        <defs>
          <filter id="cloud-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#2c5f7c" floodOpacity="0.15" />
          </filter>
        </defs>
      </svg>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(180deg, #2c5f7c 0%, #4a7a9b 30%, #c4845a 70%, #d99b6c 100%)",
      }}
    >
      {/* ── Cloud layers (parallax) ─────────────────────────────────── */}
      {cloudLayers.map((cloud) => (
        <PaperCloud key={cloud.id} {...cloud} />
      ))}

      {/* ── Illustration placeholders ───────────────────────────────── */}

      {/* PLACEHOLDER: paper-craft tiger illustration — bottom left */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-64 md:w-80 lg:w-96"
        style={{ filter: "drop-shadow(4px 0px 8px rgba(44,95,124,0.3))" }}
      >
        {/* Insert your paper-craft tiger SVG here */}
      </div>

      {/* PLACEHOLDER: paper-craft tree illustration — bottom right */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-48 md:w-64 lg:w-80"
        style={{ filter: "drop-shadow(-4px 0px 8px rgba(44,95,124,0.3))" }}
      >
        {/* Insert your paper-craft tree SVG here */}
      </div>

      {/* ── Main title ─────────────────────────────────────────────── */}
      <div className="relative z-10 text-center px-6 select-none">
        {/* Decorative horizontal rule — paper-cut stripe */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="block h-px w-16 bg-[#f5ede0] opacity-60" />
          <span
            className="text-[#f5ede0] text-xs tracking-[0.4em] uppercase opacity-70"
            style={{ fontFamily: "var(--font-body)" }}
          >
            物語
          </span>
          <span className="block h-px w-16 bg-[#f5ede0] opacity-60" />
        </div>

        <motion.h1
          className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-none text-[#f5ede0]"
          style={{
            textShadow:
              "0 2px 12px rgba(44,95,124,0.4), 0 8px 32px rgba(44,95,124,0.2)",
            letterSpacing: "0.05em",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
        >
          Japan Tales
        </motion.h1>

        <motion.p
          className="mt-6 text-[#f5ede0] text-sm md:text-base tracking-[0.25em] uppercase opacity-70"
          style={{ fontFamily: "var(--font-body)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 2.2, ease: "easeOut", delay: 0.9 }}
        >
          A paper-cut journey through the land of the rising sun
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-2 opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2, delay: 1.8 }}
        >
          <span className="text-[#f5ede0] text-xs tracking-widest">scroll</span>
          <motion.span
            className="block w-px h-8 bg-[#f5ede0]"
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* ── Ground layer — paper-cut silhouette ────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 md:h-24"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(61,79,110,0.25) 100%)",
        }}
      />
    </section>
  );
}
