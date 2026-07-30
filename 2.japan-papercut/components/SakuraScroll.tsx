"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ── Sakura petal generator ─────────────────────────────────────────────────
interface PetalProps {
  id: number;
  startX: number;
  delay: number;
  duration: number;
  size: number;
  swayAmount: number;
  rotation: number;
  color: string;
}

const PETAL_COUNT = 34;

const petalColors = [
  "#f0b8c8", "#e899b4", "#f9d0de", "#d4789e",
  "#f7c4d4", "#e07098", "#fce4ec", "#c96090",
];

const petals: PetalProps[] = Array.from({ length: PETAL_COUNT }, (_, i) => {
  const seed = (i * 137.5) % 100;
  return {
    id: i,
    startX: (seed + (i % 7) * 12) % 97,
    delay: (i * 0.32) % 5,
    duration: 6 + (i % 6) * 1.4,
    size: 9 + (i % 5) * 4,
    swayAmount: 25 + (i % 7) * 18,
    rotation: (i * 47) % 360,
    color: petalColors[i % petalColors.length],
  };
});

function SakuraPetal({ id, startX, delay, duration, size, swayAmount, rotation, color }: PetalProps) {
  return (
    <motion.div
      key={id}
      className="absolute pointer-events-none top-0"
      style={{ left: `${startX}%` }}
      initial={{ y: -40, opacity: 0, rotate: rotation }}
      animate={{
        y: ["0%", "115vh"],
        opacity: [0, 0.95, 0.9, 0],
        x: [0, swayAmount, -swayAmount * 0.6, swayAmount * 0.4],
        rotate: [rotation, rotation + 200, rotation + 310, rotation + 360],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeIn" }}
    >
      <svg width={size} height={size * 1.35} viewBox="0 0 24 32" fill="none">
        <path
          d="M12 2 C18 6 22 14 12 30 C2 14 6 6 12 2Z"
          fill={color}
          fillOpacity="0.88"
          stroke="rgba(180,60,100,0.25)"
          strokeWidth="0.5"
        />
        <path d="M12 4 Q13.5 16 12 28" stroke="rgba(180,60,100,0.3)" strokeWidth="0.7" fill="none" />
      </svg>
    </motion.div>
  );
}

// ── Sakura branch SVG (left side decoration) ─────────────────────────────
function SakuraBranch() {
  return (
    <div className="absolute left-0 top-0 h-full w-56 md:w-72 lg:w-96 pointer-events-none z-20"
      style={{ filter: "drop-shadow(8px 0px 16px rgba(100,20,40,0.15))" }}>
      <svg viewBox="0 0 220 900" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Main branch */}
        <path d="M30,900 C40,700 20,500 60,300 C80,200 50,100 80,10"
          stroke="#5a2a18" strokeWidth="10" fill="none" strokeLinecap="round" />
        {/* Sub branches */}
        <path d="M55,600 C100,560 140,520 180,490" stroke="#5a2a18" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M48,400 C90,360 130,330 175,310" stroke="#5a2a18" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M62,250 C90,230 120,220 155,205" stroke="#5a2a18" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M70,150 C95,135 120,125 150,112" stroke="#5a2a18" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Blossoms cluster at branch ends */}
        {[
          [175, 490], [170, 510], [188, 498], [165, 478],
          [170, 310], [185, 318], [162, 305], [178, 298],
          [148, 205], [160, 198], [155, 215], [168, 208],
          [145, 112], [158, 107], [152, 122], [163, 116],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={5 + (i % 3) * 2}
            fill={petalColors[i % petalColors.length]} fillOpacity="0.75" />
        ))}
        {/* Smaller petals */}
        {[
          [172, 493], [182, 502], [165, 483],
          [168, 313], [180, 308], [175, 322],
          [152, 202], [162, 210],
          [150, 110], [159, 118],
        ].map(([cx, cy], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx="3" ry="4" fill="rgba(240,184,200,0.6)"
            transform={`rotate(${i * 40} ${cx} ${cy})`} />
        ))}
      </svg>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function SakuraScroll() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.25"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.65], [70, 0]);
  const petalsOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  return (
    <section
      id="sakura"
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
      style={{
        // Rich warm-to-blush gradient
        background: `
          linear-gradient(
            180deg,
            #7a1f1a 0%,
            #a83428 8%,
            #c0513a 18%,
            #c8724a 30%,
            #d4885c 44%,
            #dfa480 58%,
            #e8c4b0 74%,
            #f2d8cc 86%,
            #faeee8 100%
          )
        `,
      }}
    >
      {/* ── Atmospheric warm glow ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 50% 30%, rgba(240,140,100,0.15) 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 80% 60%, rgba(200,80,100,0.10) 0%, transparent 60%)
          `,
        }}
      />

      {/* ── Falling sakura petals ─────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ opacity: petalsOpacity }}
      >
        {petals.map((petal) => (
          <SakuraPetal key={petal.id} {...petal} />
        ))}
      </motion.div>

      {/* ── Branch decoration ─────────────────────────────────────── */}
      <SakuraBranch />

      {/* ── Paper-cut wave divider (top) ──────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 z-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full" style={{ height: 80, display: "block" }}>
          <path d="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 C1300,60 1370,50 1440,40 L1440,0 L0,0 Z"
            fill="#7a1f1a" fillOpacity="0.5" />
        </svg>
      </div>

      {/* ── Section content ───────────────────────────────────────── */}
      <motion.div
        className="relative z-30 text-center px-8 max-w-2xl"
        style={{ opacity: textOpacity, y: textY }}
      >
        {/* Big kanji watermark */}
        <motion.p
          className="text-[7rem] leading-none mb-4 select-none"
          style={{
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(60,20,10,0.18)",
            fontFamily: "var(--font-display)",
          }}
          animate={{ rotate: [-1, 1, -1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          桜
        </motion.p>

        {/* Section label */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="h-px w-14 bg-[#5a2a18] opacity-30" />
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#5a2a18] opacity-60"
            style={{ fontFamily: "var(--font-body)" }}>
            Chapter II
          </span>
          <span className="h-px w-14 bg-[#5a2a18] opacity-30" />
        </div>

        <h2
          className="font-display leading-tight mb-6"
          style={{
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            color: "#3a1208",
            textShadow: "0 2px 16px rgba(100,30,10,0.18), 0 8px 40px rgba(100,30,10,0.10)",
          }}
        >
          Sakura Season
        </h2>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="h-px w-10 bg-[#c0513a] opacity-40" />
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {[0, 72, 144, 216, 288].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = 10 + Math.cos(rad) * 7;
              const y = 10 + Math.sin(rad) * 7;
              return <ellipse key={i} cx={x} cy={y} rx="2.5" ry="4"
                fill="#e07098" fillOpacity="0.7" transform={`rotate(${angle} ${x} ${y})`} />;
            })}
            <circle cx="10" cy="10" r="2.5" fill="#c0513a" opacity="0.8" />
          </svg>
          <span className="h-px w-10 bg-[#c0513a] opacity-40" />
        </div>

        <p
          className="text-base md:text-lg leading-relaxed tracking-wide"
          style={{
            fontFamily: "var(--font-body)",
            color: "#5a2a18",
            opacity: 0.75,
          }}
        >
          Every spring, the cherry blossoms paint the land in a thousand shades of pink —
          a fleeting reminder that beauty lives in the passing moment.
        </p>

        {/* Tag decoration */}
        <motion.div
          className="inline-block mt-10 px-6 py-2 text-xs tracking-[0.3em] uppercase"
          style={{
            border: "1px solid rgba(90,42,24,0.3)",
            color: "#5a2a18",
            fontFamily: "var(--font-body)",
            background: "rgba(245,237,224,0.35)",
            boxShadow: "3px 3px 0px rgba(90,42,24,0.08)",
          }}
          animate={{ rotate: [-1, 1, -1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          花見 · Hanami
        </motion.div>
      </motion.div>

      {/* ── Bottom gradient transition ─────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-0"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(250,238,232,0.6) 100%)" }}
      />
    </section>
  );
}
