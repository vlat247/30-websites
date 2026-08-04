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
            className="absolute inset-0 w-full h-full object-cover brightness-90"
          >
            <source src="/vid-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />
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
        <h2 
          style={{ opacity: title3Opacity, pointerEvents: title3Opacity > 0 ? 'auto' : 'none' }}
          className="absolute font-manufacturing-consent text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-wide text-stone-100 drop-shadow-[0_12px_35px_rgba(0,0,0,0.95)]"
        >
          The Destination
        </h2>

      </div>
    </main>
  );
}
