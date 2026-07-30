"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ── Ink brush stroke ────────────────────────────────────────────────────────
function InkStroke({ width = 200, opacity = 0.12 }: { width?: number; opacity?: number }) {
  return (
    <svg width={width} height="30" viewBox="0 0 200 30" fill="none" style={{ opacity }}>
      <path
        d="M0,15 C30,5 60,25 100,14 C140,3 170,22 200,15"
        stroke="#2a1a0a"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── Temple lantern row ──────────────────────────────────────────────────────
function LanternRow() {
  const lanternPositions = [15, 30, 50, 68, 83];
  return (
    <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none">
      {/* Rope */}
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full" style={{ height: 60, display: "block" }}>
        <path d="M0,20 C200,35 400,15 600,25 C800,35 1000,15 1200,25 C1300,30 1380,22 1440,20"
          stroke="rgba(50,25,10,0.35)" strokeWidth="2" fill="none" />
      </svg>
      {lanternPositions.map((x, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${x}%`, top: "8px" }}
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 3 + i * 0.5, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="22" height="46" viewBox="0 0 22 46" fill="none">
            <line x1="11" y1="0" x2="11" y2="7" stroke="rgba(50,25,10,0.4)" strokeWidth="1" />
            <rect x="3" y="7" width="16" height="28" rx="8" fill="#c0513a" fillOpacity="0.9" />
            <rect x="5" y="9" width="12" height="24" rx="6" fill="#e06040" fillOpacity="0.4" />
            <ellipse cx="11" cy="21" rx="5" ry="8" fill="#ffcc88" fillOpacity="0.4" />
            <rect x="4" y="5" width="14" height="5" rx="2" fill="#7a1f1a" />
            <rect x="4" y="33" width="14" height="4" rx="2" fill="#7a1f1a" />
            <line x1="11" y1="37" x2="11" y2="46" stroke="#c9a84c" strokeWidth="1.5" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ── Bamboo stalks ───────────────────────────────────────────────────────────
function BambooGroup({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  const stalks = [
    { x: isLeft ? 30 : 80, height: 500, width: 16 },
    { x: isLeft ? 60 : 55, height: 580, width: 14 },
    { x: isLeft ? 90 : 28, height: 460, width: 18 },
    { x: isLeft ? 115 : 10, height: 520, width: 12 },
  ];

  return (
    <div
      className="absolute bottom-0 pointer-events-none z-20"
      style={{ [isLeft ? "left" : "right"]: 0, width: 160 }}
    >
      <svg viewBox="0 0 160 600" fill="none" className="w-full" style={{ height: 600 }}>
        {stalks.map((s, i) => {
          const segH = 50 + i * 5;
          const segs = Math.ceil(s.height / segH);
          return (
            <g key={i}>
              {/* Main stalk */}
              <rect
                x={s.x}
                y={600 - s.height}
                width={s.width}
                height={s.height}
                rx={s.width / 2}
                fill={`hsl(${115 + i * 8}, 35%, ${30 + i * 3}%)`}
                fillOpacity="0.85"
              />
              {/* Segments */}
              {Array.from({ length: segs }, (_, j) => (
                <rect
                  key={j}
                  x={s.x - 1}
                  y={600 - s.height + j * segH}
                  width={s.width + 2}
                  height={3}
                  rx="1"
                  fill={`hsl(${115 + i * 8}, 25%, 22%)`}
                  fillOpacity="0.6"
                />
              ))}
              {/* Leaves */}
              {Array.from({ length: segs - 1 }, (_, j) => (
                <ellipse
                  key={j}
                  cx={s.x + (j % 2 === 0 ? s.width + 18 : -18)}
                  cy={600 - s.height + j * segH + segH / 2}
                  rx="18"
                  ry="5"
                  fill={`hsl(${120 + i * 5}, 40%, ${25 + i * 4}%)`}
                  fillOpacity="0.7"
                  transform={`rotate(${j % 2 === 0 ? -20 : 20} ${s.x + (j % 2 === 0 ? s.width + 18 : -18)} ${600 - s.height + j * segH + segH / 2})`}
                />
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── Temple gate illustration ────────────────────────────────────────────────
function TempleIllustration() {
  return (
    <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 z-10 pointer-events-none w-full max-w-lg px-8">
      <svg viewBox="0 0 480 300" fill="none" className="w-full">
        {/* Temple body */}
        <rect x="120" y="180" width="240" height="120" fill="#2a1a0a" fillOpacity="0.65" />
        {/* Roof layer 1 */}
        <path d="M60,180 Q240,100 420,180 Z" fill="#7a1f1a" fillOpacity="0.8" />
        {/* Roof layer 2 */}
        <path d="M90,155 Q240,75 390,155 Z" fill="#c0513a" fillOpacity="0.75" />
        {/* Roof curve ends */}
        <path d="M60,180 Q50,200 40,195" stroke="#7a1f1a" strokeWidth="4" fill="none" />
        <path d="M420,180 Q430,200 440,195" stroke="#7a1f1a" strokeWidth="4" fill="none" />
        {/* Top ornament */}
        <path d="M200,75 Q240,55 280,75" stroke="#c9a84c" strokeWidth="3" fill="none" />
        <circle cx="240" cy="60" r="8" fill="#c9a84c" fillOpacity="0.8" />
        {/* Pillars */}
        <rect x="150" y="180" width="18" height="120" fill="#1a0f06" fillOpacity="0.5" />
        <rect x="312" y="180" width="18" height="120" fill="#1a0f06" fillOpacity="0.5" />
        {/* Door */}
        <rect x="205" y="220" width="70" height="80" rx="35" fill="#0d0806" fillOpacity="0.6" />
        {/* Door arc */}
        <path d="M205,255 Q240,215 275,255" fill="#0d0806" fillOpacity="0.5" />
        {/* Steps */}
        <rect x="160" y="300" width="160" height="8" fill="#1a0f06" fillOpacity="0.5" />
        {/* Lanterns flanking door */}
        <rect x="182" y="230" width="10" height="20" rx="4" fill="#c0513a" fillOpacity="0.85" />
        <rect x="288" y="230" width="10" height="20" rx="4" fill="#c0513a" fillOpacity="0.85" />
        {/* Inner glow */}
        <ellipse cx="215" cy="245" rx="6" ry="8" fill="#ffcc88" fillOpacity="0.35" />
        <ellipse cx="293" cy="245" rx="6" ry="8" fill="#ffcc88" fillOpacity="0.35" />
      </svg>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function TempleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.2"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.6], [60, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  return (
    <section
      id="temple"
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
      style={{
        background: `
          linear-gradient(
            180deg,
            #faeee8 0%,
            #f0d4c0 8%,
            #d4a882 18%,
            #b07840 32%,
            #7a5220 48%,
            #4a3010 62%,
            #2a1a08 76%,
            #160e04 90%,
            #0a0604 100%
          )
        `,
      }}
    >
      {/* ── Atmospheric deep glow ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 50% 65%, rgba(180,100,30,0.12) 0%, transparent 65%),
            radial-gradient(ellipse 80% 30% at 50% 90%, rgba(200,80,20,0.15) 0%, transparent 60%)
          `,
        }}
      />

      {/* ── Moon ─────────────────────────────────────────────────── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ top: "12%", right: "18%" }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
          <circle cx="35" cy="35" r="32" fill="#f5e8c0" fillOpacity="0.15" />
          <circle cx="35" cy="35" r="25" fill="#f5e8c0" fillOpacity="0.25" />
          <circle cx="35" cy="35" r="18" fill="#f5e8c0" fillOpacity="0.55" />
          <circle cx="35" cy="35" r="14" fill="#fff9e8" fillOpacity="0.85" />
        </svg>
        {/* Moon glow */}
        <div className="absolute inset-0 rounded-full blur-2xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(245,232,180,0.35) 0%, transparent 70%)", transform: "scale(2)" }} />
      </motion.div>

      {/* ── Stars ────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 40 }, (_, i) => {
          const seed = (i * 173.5) % 100;
          const x = seed;
          const y = (i * 27.3) % 55;
          const size = 0.7 + (i % 3) * 0.5;
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
              animate={{ opacity: [0.15, 0.9, 0.15] }}
              transition={{ duration: 2.5 + (i % 4) * 0.7, delay: (i * 0.22) % 4, repeat: Infinity }}
            />
          );
        })}
      </div>

      {/* ── Lantern row ───────────────────────────────────────────── */}
      <LanternRow />

      {/* ── Bamboo ───────────────────────────────────────────────── */}
      <BambooGroup side="left" />
      <BambooGroup side="right" />

      {/* ── Temple illustration ───────────────────────────────────── */}
      <TempleIllustration />

      {/* ── Wave divider (top) ────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 z-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full" style={{ height: 60, display: "block" }}>
          <path d="M0,30 C300,60 600,0 900,30 C1100,50 1300,10 1440,30 L1440,0 L0,0 Z"
            fill="#faeee8" fillOpacity="0.5" />
        </svg>
      </div>

      {/* ── Ground paper layer ────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: "30%", background: "linear-gradient(180deg, transparent 0%, rgba(8,5,2,0.7) 100%)" }}
      />

      {/* ── Section content ───────────────────────────────────────── */}
      <motion.div
        className="relative z-30 text-center px-8 max-w-2xl"
        style={{ opacity: textOpacity, y: textY, marginBottom: "12%" }}
      >
        {/* Kamon */}
        <motion.div className="flex justify-center mb-5"
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <circle cx="19" cy="19" r="17" stroke="rgba(201,168,76,0.45)" strokeWidth="1" />
            {Array.from({ length: 4 }, (_, i) => {
              const angle = (i * 90 * Math.PI) / 180;
              const cx = 19 + Math.cos(angle) * 8;
              const cy = 19 + Math.sin(angle) * 8;
              return <rect key={i} x={cx - 4} y={cy - 2} width="8" height="4" rx="2"
                fill="rgba(201,168,76,0.5)" transform={`rotate(${i * 90} ${cx} ${cy})`} />;
            })}
            <circle cx="19" cy="19" r="4" fill="rgba(201,168,76,0.65)" />
          </svg>
        </motion.div>

        {/* Label */}
        <div className="flex items-center justify-center gap-4 mb-5">
          <span className="h-px w-12 bg-[#c9a84c] opacity-35" />
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#c9a84c] opacity-65"
            style={{ fontFamily: "var(--font-body)" }}>
            Chapter III
          </span>
          <span className="h-px w-12 bg-[#c9a84c] opacity-35" />
        </div>

        {/* Heading */}
        <h2
          className="font-display leading-tight mb-5"
          style={{
            fontSize: "clamp(2.5rem, 6.5vw, 5rem)",
            color: "#f5e8c0",
            textShadow: "0 2px 20px rgba(201,168,76,0.3), 0 8px 40px rgba(0,0,0,0.5)",
          }}
        >
          Temple Twilight
        </h2>

        {/* Ink divider */}
        <div className="flex justify-center mb-7">
          <InkStroke width={180} opacity={0.25} />
        </div>

        <p
          className="text-sm md:text-base leading-relaxed tracking-wide"
          style={{ fontFamily: "var(--font-body)", color: "#d4b888", opacity: 0.78 }}
        >
          As night falls over the sacred ground, paper lanterns flicker to life —
          each flame a whisper of prayer ascending toward the stars.
        </p>

        {/* Japanese character */}
        <p
          className="mt-6 text-5xl select-none"
          style={{ color: "rgba(201,168,76,0.22)", fontFamily: "var(--font-display)" }}
        >
          夜
        </p>

        {/* Tag */}
        <motion.div
          className="inline-block mt-6 px-6 py-2 text-xs tracking-[0.3em] uppercase"
          style={{
            border: "1px solid rgba(201,168,76,0.3)",
            color: "#c9a84c",
            fontFamily: "var(--font-body)",
            background: "rgba(8,5,2,0.4)",
            boxShadow: "0 0 12px rgba(201,168,76,0.08)",
          }}
          animate={{ rotate: [0.5, -0.5, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          夜の寺 · Yoru no Tera
        </motion.div>
      </motion.div>
    </section>
  );
}
