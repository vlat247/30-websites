"use client";

import { useEffect, useRef, useState } from "react";

const ASCII_CHARS = " .:-=+*#%@";

export default function AsciiImage({ 
  src, 
  charsPerLine = 80, 
  className = "" 
}: { 
  src: string, 
  charsPerLine?: number, 
  className?: string 
}) {
  const [ascii, setAscii] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      const aspectRatio = img.height / img.width;
      // Monospace characters are roughly twice as tall as they are wide.
      // Adjust this ratio if the image looks squished or stretched.
      const height = Math.floor(charsPerLine * aspectRatio * 0.45); 

      canvas.width = charsPerLine;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, charsPerLine, height);

      const imageData = ctx.getImageData(0, 0, charsPerLine, height);
      const data = imageData.data;

      let asciiStr = "";
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < charsPerLine; x++) {
          const offset = (y * charsPerLine + x) * 4;
          const r = data[offset];
          const g = data[offset + 1];
          const b = data[offset + 2];
          const a = data[offset + 3];

          // Treat completely transparent or very bright pixels as space
          if (a < 50 || (r > 240 && g > 240 && b > 240)) {
            asciiStr += " ";
          } else {
            // Calculate perceived brightness (0 to 1)
            const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
            
            // Invert brightness because we want dark pixels to be dense chars ('@') 
            // and bright pixels to be sparse chars ('.')
            const invertedBrightness = 1 - brightness;
            
            // Map brightness to char
            const charIndex = Math.floor(invertedBrightness * (ASCII_CHARS.length - 1));
            asciiStr += ASCII_CHARS[charIndex];
          }
        }
        asciiStr += "\n";
      }
      setAscii(asciiStr);
    };
    img.src = src;
  }, [src, charsPerLine]);

  return (
    <div className={`flex items-center justify-center overflow-hidden ${className}`}>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <pre className="font-mono text-[4px] sm:text-[5px] md:text-[6px] leading-[1.1] tracking-widest text-inherit">
        {ascii}
      </pre>
    </div>
  );
}
