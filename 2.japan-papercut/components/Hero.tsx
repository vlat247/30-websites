"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

const inkPaths = {
  blob1: "M45.7,-76.4C58.9,-69.3,68.9,-54.6,76.5,-40.1C84.1,-25.6,89.3,-11.3,86.5,1.7C83.7,14.7,72.9,26.4,62.8,38.2C52.7,50,43.3,62,30.3,69.5C17.3,77,-2.3,80,-20.5,75.4C-38.7,70.8,-55.5,58.6,-66.4,43.4C-77.3,28.2,-82.3,10,-79.4,-6.8C-76.5,-23.6,-65.7,-39,-52.1,-48.5C-38.5,-58,-22,-61.6,-5.5,-54.2C11,-46.8,32.5,-83.5,45.7,-76.4Z",
  blob2: "M39.6,-62.7C52.6,-56.3,65.3,-48.1,72.4,-36.1C79.5,-24.1,81.1,-8.3,77.7,6.3C74.3,20.9,65.9,34.3,55.1,45.1C44.3,55.9,31.1,64.1,16.5,69.2C1.9,74.3,-14.1,76.3,-29.4,72.1C-44.7,67.9,-59.3,57.5,-68.1,43.7C-76.9,29.9,-79.9,12.7,-76.4,-3.3C-72.9,-19.3,-62.9,-34.1,-50.7,-43.8C-38.5,-53.5,-24.1,-58.1,-10.1,-63.3C3.9,-68.5,17.8,-74.3,26.6,-69.1C35.4,-63.9,49.2,-57.7,39.6,-62.7Z",
  blob3: "M39.7,-64.1C51.2,-55.9,60.1,-43.5,65.8,-29.6C71.5,-15.7,74.1,-0.3,70.8,13.8C67.5,27.9,58.4,40.7,46.9,50.7C35.4,60.7,21.5,67.9,6.7,71.2C-8.1,74.5,-23.8,73.9,-36.8,67C-49.8,60.1,-60.1,46.9,-67.6,32.2C-75.1,17.5,-79.8,1.3,-77.3,-13.7C-74.8,-28.7,-65.1,-42.5,-52.3,-51.1C-39.5,-59.7,-23.6,-63.1,-8.7,-64C6.2,-64.9,28.2,-72.3,39.7,-64.1Z"
};

const QUOTE_TEXT = "Happiness can be found, even in the darkest of times, if one only remembers to turn on the light";
const QUOTE_WORDS = QUOTE_TEXT.split(" ");

interface QuoteWordProps {
  word: string;
  index: number;
  totalWords: number;
  progress: MotionValue<number>;
}

function QuoteWord({ word, index, totalWords, progress }: QuoteWordProps) {
  // Smooth reveal window over scroll progress 0.45 to 0.67
  const startProgress = 0.45 + (index / totalWords) * 0.22;
  const endProgress = startProgress + (0.22 / totalWords) * 1.3;

  const opacity = useTransform(progress, [startProgress, endProgress], [0.12, 1]);
  const y = useTransform(progress, [startProgress, endProgress], [6, 0]);

  const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");
  const isLightWord = cleanWord === "light";
  const isDarkestWord = cleanWord === "darkest";

  const color = useTransform(
    progress,
    [startProgress, endProgress],
    [
      "rgba(255, 255, 255, 0.12)",
      isLightWord
        ? "#fef08a" // glowing warm yellow
        : isDarkestWord
        ? "#cbd5e1" // cool slate white
        : "#ffffff"
    ]
  );

  const textShadow = useTransform(
    progress,
    [startProgress, endProgress],
    [
      "none",
      isLightWord
        ? "0 0 25px rgba(250, 204, 21, 0.95), 0 0 50px rgba(250, 204, 21, 0.6), 0 0 75px rgba(250, 204, 21, 0.35)"
        : "0 2px 10px rgba(0, 0, 0, 0.5)"
    ]
  );

  return (
    <>
      <motion.span
        style={{
          opacity,
          y,
          color,
          textShadow,
        }}
        className={`inline-block mr-[0.4em] mb-[0.25em] ${
          isLightWord ? "font-normal text-amber-200" : ""
        }`}
      >
        {word}
      </motion.span>
      {" "}
    </>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Drop 1 (top right): Starts small and slate-colored, grows and turns black
  const drop1Scale = useTransform(scrollYProgress, [0.20, 0.45, 0.70], [0, 4, 80]);
  const drop1Color = useTransform(scrollYProgress, [0.20, 0.45, 0.65], ["#64748b", "#0f172a", "#000000"]);

  // Drop 2 (bottom left): Appears next
  const drop2Scale = useTransform(scrollYProgress, [0.25, 0.50, 0.75], [0, 5, 90]);
  const drop2Color = useTransform(scrollYProgress, [0.25, 0.48, 0.70], ["#475569", "#0f172a", "#000000"]);

  // Drop 3 (center): Appears last
  const drop3Scale = useTransform(scrollYProgress, [0.30, 0.55, 0.80], [0, 6, 100]);
  const drop3Color = useTransform(scrollYProgress, [0.30, 0.52, 0.75], ["#334155", "#0f172a", "#000000"]);

  // Fade out initial hero content as ink spreads (delayed so hero section stays visible longer)
  const initialContentOpacity = useTransform(scrollYProgress, [0.25, 0.45], [1, 0]);

  // Dark section quote container opacity (fades in as ink covers screen, then completely fades OUT before vlad text)
  const quoteContainerOpacity = useTransform(scrollYProgress, [0.40, 0.46, 0.70, 0.78], [0, 1, 1, 0]);

  // Ambient warm background glow near the end of quote ("turn on the light")
  const lightGlowOpacity = useTransform(scrollYProgress, [0.64, 0.72], [0, 0.8]);
  const lightGlowScale = useTransform(scrollYProgress, [0.64, 0.74], [0.6, 1.3]);

  // "made by vlad" credit appearance AFTER quote completely disappears
  const vladOpacity = useTransform(scrollYProgress, [0.78, 0.86], [0, 1]);
  const vladY = useTransform(scrollYProgress, [0.78, 0.86], [20, 0]);
  const vladScale = useTransform(scrollYProgress, [0.78, 0.86], [0.92, 1]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[600vh] bg-[#fdfaf6] relative"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.65 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperNoise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "180px 180px",
      }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Original Content */}
        <motion.header 
          style={{ opacity: initialContentOpacity }}
          className="absolute top-0 w-full flex justify-between items-center px-8 md:px-16 py-8 z-20"
        >
          <div className="text-xl font-thin tracking-[0.3em] uppercase cursor-pointer">
            Studio
          </div>
          <nav className="hidden md:flex items-center gap-10">
            {['Projects', 'Services', 'About', 'Contact'].map((link) => (
              <a 
                key={link}
                href={`#${link.toLowerCase()}`} 
                className="text-xs font-light tracking-[0.2em] uppercase hover:opacity-50 transition-opacity"
              >
                {link}
              </a>
            ))}
          </nav>
        </motion.header>

        {/* Japan Flag Red Sun Circle with Washi Paper Grain Texture */}
        <motion.div 
          style={{ opacity: initialContentOpacity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 flex justify-center items-center pointer-events-none select-none"
        >
          <div 
            className="relative w-[220px] h-[220px] sm:w-[330px] sm:h-[330px] md:w-[410px] md:h-[410px] lg:w-[470px] lg:h-[470px] rounded-full bg-[#bc002d] shadow-2xl opacity-95 overflow-hidden"
            style={{
              boxShadow: "0 10px 35px rgba(188, 0, 45, 0.35), inset 0 0 25px rgba(0, 0, 0, 0.25)",
            }}
          >
            {/* Paper Grain Overlay on Red Circle */}
            <div 
              className="absolute inset-0 w-full h-full mix-blend-overlay opacity-70 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='circleNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.85 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23circleNoise)'/%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
                backgroundSize: "160px 160px",
              }}
            />
            {/* Inner Paper Cut Shadow Edge */}
            <div className="absolute inset-0 rounded-full border border-black/15 shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)] pointer-events-none" />
          </div>
        </motion.div>

        {/* Giant Japanese Text under the top header */}
        <motion.div 
          style={{ opacity: initialContentOpacity }}
          className="absolute top-[28%] md:top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-none flex justify-center items-center pointer-events-none select-none px-2 sm:px-4"
        >
          <h1 
            style={{ fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", "Shippori Mincho", "Noto Serif JP", serif' }}
            className="font-bold text-[24vw] sm:text-[21vw] md:text-[19vw] lg:text-[18vw] leading-none tracking-tight text-[#1e293b] whitespace-nowrap text-center drop-shadow-md"
          >
            最善を尽くす
          </h1>
        </motion.div>

        <motion.img 
          style={{ opacity: initialContentOpacity }}
          src="/octopus.png" 
          alt="Octopus" 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[120vw] md:w-[100vw] lg:w-[90vw] max-w-none h-auto object-contain pointer-events-none z-10" 
        />

        {/* --- INK DROPS --- */}
        {/* Ink Drop 1 */}
        <motion.svg 
          viewBox="-100 -100 200 200"
          className="absolute top-[10%] right-[15%] w-40 h-40 z-30 origin-center pointer-events-none"
          style={{
            scale: drop1Scale,
            fill: drop1Color,
          }}
        >
          <path d={inkPaths.blob1} />
        </motion.svg>

        {/* Ink Drop 2 */}
        <motion.svg 
          viewBox="-100 -100 200 200"
          className="absolute bottom-[20%] left-[20%] w-48 h-48 z-30 origin-center pointer-events-none"
          style={{
            scale: drop2Scale,
            fill: drop2Color,
          }}
        >
          <path d={inkPaths.blob2} />
        </motion.svg>

        {/* Ink Drop 3 */}
        <motion.svg 
          viewBox="-100 -100 200 200"
          className="absolute top-[40%] left-[45%] w-56 h-56 z-30 origin-center pointer-events-none"
          style={{
            scale: drop3Scale,
            fill: drop3Color,
          }}
        >
          <path d={inkPaths.blob3} />
        </motion.svg>

        {/* --- DARK SECTION QUOTE OVERLAY --- */}
        <motion.div 
          style={{ opacity: quoteContainerOpacity }}
          className="absolute inset-0 z-40 flex flex-col items-center justify-center px-6 md:px-16 text-center pointer-events-none select-none"
        >
          {/* Ambient warm light glow when turning on the light */}
          <motion.div 
            style={{ 
              opacity: lightGlowOpacity,
              scale: lightGlowScale,
              background: "radial-gradient(circle, rgba(251, 191, 36, 0.22) 0%, rgba(245, 158, 11, 0.1) 45%, transparent 70%)"
            }}
            className="absolute w-[350px] sm:w-[550px] md:w-[750px] h-[350px] sm:h-[550px] md:h-[750px] rounded-full blur-[100px] pointer-events-none"
          />

          {/* Quote Container */}
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            <blockquote className="font-display font-light text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide leading-relaxed md:leading-snug">
              {QUOTE_WORDS.map((word, i) => (
                <QuoteWord
                  key={i}
                  word={word}
                  index={i}
                  totalWords={QUOTE_WORDS.length}
                  progress={scrollYProgress}
                />
              ))}
            </blockquote>
          </div>
        </motion.div>

        {/* --- MADE BY VLAD OVERLAY (Appears after quote completely disappears) --- */}
        <motion.div 
          style={{ opacity: vladOpacity }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center px-6 text-center pointer-events-none select-none"
        >
          <motion.div
            style={{
              y: vladY,
              scale: vladScale,
              fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", "Shippori Mincho", "Noto Serif JP", "IM Fell English SC", serif',
            }}
            className="text-2xl sm:text-4xl md:text-5xl tracking-[0.35em] text-slate-100 font-normal drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
          >
            made by vlad
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}


