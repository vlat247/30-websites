"use client";

import React from 'react';

export default function Hero() {
  return (
    <div className="w-full h-screen bg-[#fdfaf6] relative overflow-hidden">
      <img 
        src="/octopus.png" 
        alt="Octopus" 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[120vw] md:w-[100vw] lg:w-[90vw] max-w-none h-auto object-contain pointer-events-none" 
      />
    </div>
  );
}
