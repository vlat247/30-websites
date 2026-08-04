"use client";

import { useEffect, useRef, useState } from "react";

function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  if (value <= inMin) return outMin;
  if (value >= inMax) return outMax;
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}

// Reverting to Sine Easing. It provides soft stops without accelerating too much in the middle.
function easeInOutSine(x: number): number {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [title1Opacity, setTitle1Opacity] = useState(1);
  const [title2Opacity, setTitle2Opacity] = useState(0);
  const [title3Opacity, setTitle3Opacity] = useState(0);
  const [footerTranslate, setFooterTranslate] = useState(100);
  
  // This state will control an overlay to hide video glitching during fast scrolls
  const [scrollBlur, setScrollBlur] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let targetProgress = 0;
    let currentProgress = 0;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight;
      const scrollY = window.scrollY;
      
      let progress = (scrollY - containerTop) / (containerHeight - window.innerHeight);
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;
      
      targetProgress = progress;
    };

    const loop = () => {
      // Very smooth interpolation for scroll (lowered to 0.04 for heavier, slower smoothing)
      currentProgress += (targetProgress - currentProgress) * 0.04;

      // Calculate scrubbing speed to add a very subtle smoothing effect (blur) when scrolling fast
      // Removing the dark overlay and keeping only a soft, proportional blur to mask keyframe jumps
      const speed = Math.abs(targetProgress - currentProgress);
      const blurAmount = Math.min(speed * 30, 2); // Max 2px blur for a softer effect
      setScrollBlur(blurAmount);

      // --- TIMELINE MAPPING ---
      let time = 0.05;
      if (currentProgress <= 0.35) {
        // Sine easing applied to make the stop at 6.0s smooth without rushing the middle
        const t = currentProgress / 0.35;
        time = 0.05 + easeInOutSine(t) * (6.0 - 0.05);
      } else if (currentProgress <= 0.55) {
        time = 6.0;
      } else if (currentProgress <= 0.80) {
        // Sine easing applied to make the stop at 10.0s smooth without rushing the middle
        const t = (currentProgress - 0.55) / 0.25;
        time = 6.0 + easeInOutSine(t) * (10.0 - 6.0);
      } else {
        time = 10.0;
      }

      if (videoRef.current) {
        if (Math.abs(videoRef.current.currentTime - time) > 0.03) {
          videoRef.current.currentTime = time;
        }
      }

      // Title 1 (Main Title): fades out from 0 to 0.15
      setTitle1Opacity(mapRange(currentProgress, 0, 0.15, 1, 0));

      // Title 2 (Breakpoint 1): fades in 0.35 to 0.40, stays till 0.50, fades out by 0.55
      if (currentProgress < 0.35) setTitle2Opacity(0);
      else if (currentProgress <= 0.40) setTitle2Opacity(mapRange(currentProgress, 0.35, 0.40, 0, 1));
      else if (currentProgress <= 0.50) setTitle2Opacity(1);
      else setTitle2Opacity(mapRange(currentProgress, 0.50, 0.55, 1, 0));

      // Title 3 (Breakpoint 2): fades in 0.80 to 0.85
      setTitle3Opacity(mapRange(currentProgress, 0.80, 0.85, 0, 1));

      // Footer slides up from bottom much faster (starts at 95%, fully visible by 98%)
      setFooterTranslate(mapRange(currentProgress, 0.95, 0.98, 100, 0));

      animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    loop(); 
    
    const handleLoadedMetadata = () => {
      if (videoRef.current) videoRef.current.currentTime = 0.05;
    };
    if (videoRef.current) {
      videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      videoRef.current.currentTime = 0.05;
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, []);

  return (
    <>
    <main ref={containerRef} className="relative h-[800vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 text-center select-none">
        
        <div 
          className="absolute inset-0 w-full h-full -z-10"
          style={{ filter: `blur(${scrollBlur}px)`, transition: 'filter 0.1s ease-out' }}
        >
          <video
            ref={videoRef}
            playsInline
            muted
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.80]"
          >
            <source src="/vid-bg.mp4" type="video/mp4" />
          </video>
          
          {/* Dark SVG Noise Filter Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-multiply" 
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 pointer-events-none" />
        </div>

        {/* Text 1: The Initial Title */}
        <h1 
          style={{ opacity: title1Opacity, pointerEvents: title1Opacity > 0 ? 'auto' : 'none' }}
          className="absolute font-manufacturing-consent text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-normal tracking-wide text-stone-100 drop-shadow-[0_12px_35px_rgba(0,0,0,0.95)]"
        >
          Hero&apos;s journey
        </h1>

        {/* Text 2: The First Breakpoint */}
        <h2 
          style={{ opacity: title2Opacity, pointerEvents: title2Opacity > 0 ? 'auto' : 'none' }}
          className="absolute font-manufacturing-consent text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-wide text-stone-100 drop-shadow-[0_12px_35px_rgba(0,0,0,0.95)]"
        >
          A New Path Emerges
        </h2>

        {/* Text 3: The Second Breakpoint (End) */}
        <div 
          style={{ opacity: title3Opacity, pointerEvents: title3Opacity > 0 ? 'auto' : 'none' }}
          className="absolute left-[5%] md:left-[8%] top-[25%] md:top-[30%] flex flex-col items-start text-left"
        >
          <h2 className="font-manufacturing-consent text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-wide text-stone-100 drop-shadow-[0_12px_35px_rgba(0,0,0,0.95)]">
            The Destination
          </h2>
          <p className="mt-3 max-w-md text-sm md:text-lg text-stone-300 font-medium tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            Where vision meets reality. A new chapter unfolds across the digital horizon.
          </p>
        </div>

      </div>

      {/* Dark Footer overlay sliding in at the end */}
      <footer 
        style={{ transform: `translateY(${footerTranslate}%)` }}
        className="fixed bottom-0 left-0 w-full z-50 bg-black/90 backdrop-blur-lg text-stone-400 py-6 px-8 border-t border-white/10 will-change-transform"
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium tracking-widest uppercase text-stone-200">
              King's Landing
            </div>
            <div className="text-xs opacity-50 hidden md:block">
              © {new Date().getFullYear()} All rights reserved.
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-stone-400 hover:text-white transition-colors duration-300" aria-label="X (Twitter)">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
            </a>
            <a href="#" className="text-stone-400 hover:text-white transition-colors duration-300" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="text-stone-400 hover:text-white transition-colors duration-300" aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </main>
    </>
  );
}
