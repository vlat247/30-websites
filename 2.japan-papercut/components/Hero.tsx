"use client";

import React from 'react';

export default function Hero() {
  return (
    <div className="w-full h-screen bg-transparent relative overflow-hidden font-sans">
      {/* Vignette Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.12) 100%)'
        }}
      />

      {/* Upper Left Section - Styled matching uploaded image */}
      <div className="absolute top-10 left-10 md:top-14 md:left-14 max-w-sm md:max-w-md z-10 flex flex-col">
        {/* Main Title Block */}
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-black">
          Honda Motor Co.
          <span className="block text-neutral-400 font-medium mt-4">
            Power of Dreams
          </span>
        </h1>

        {/* Description Block */}
        <p className="mt-8 text-xs md:text-sm font-light text-neutral-400 leading-relaxed tracking-tight">
          Founded in 1948 by Soichiro Honda, the brand redefined automotive performance through engineering perfection. Its crowning achievement came with the iconic NSX—the world&apos;s first all-aluminum supercar fine-tuned alongside Formula 1 legend Ayrton Senna.
        </p>
      </div>

      {/* Upper Right Corner Date */}
      <div className="absolute top-10 right-10 md:top-12 md:right-12 z-10 text-xs md:text-sm font-light text-neutral-400">
        03/08/26
      </div>

      {/* Bottom Left Corner Text */}
      <div className="absolute bottom-10 left-10 md:bottom-12 md:left-12 z-10 text-sm md:text-base font-bold text-black tracking-tight">
        @vlat247
      </div>

      {/* Honda Sticker Image */}
      <img 
        src="image.png" 
        alt="Honda Sticker" 
        className="absolute bottom-0 right-0 w-[70vw] object-contain translate-x-[10%] translate-y-[24%]"
      />
    </div>
  );
}
