import { useEffect, RefObject } from 'react';

// Ordered from dark to light
const DENSITY = " .:-=+*#%@";

export function useAsciiVideo(
  videoRef: RefObject<HTMLVideoElement>,
  asciiRef: RefObject<HTMLPreElement>,
  isLoaded: boolean
) {
  useEffect(() => {
    if (!videoRef.current || !asciiRef.current || !isLoaded) return;

    const video = videoRef.current;
    const pre = asciiRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;

    // Adjust this scale to change the density/resolution of the ASCII characters
    // 0.04 means the canvas is rendered at 4% of the video's original resolution.
    const renderScale = 0.05; 
    
    // The font aspect ratio of monospace characters is roughly 0.5 (half as wide as they are tall)
    const fontAspectRatio = 0.5;

    const draw = () => {
      animationFrameId = requestAnimationFrame(draw);

      if (video.paused || video.ended) {
        return;
      }

      const w = Math.floor(video.videoWidth * renderScale);
      const h = Math.floor(video.videoHeight * renderScale * fontAspectRatio);

      if (w === 0 || h === 0) return;

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      ctx.drawImage(video, 0, 0, w, h);
      const imageData = ctx.getImageData(0, 0, w, h);
      const data = imageData.data;

      let asciiStr = '';
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const offset = (y * w + x) * 4;
          const r = data[offset];
          const g = data[offset + 1];
          const b = data[offset + 2];
          
          // Calculate perceived brightness (luminance)
          const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
          
          // Map brightness (0-255) to character index
          const charIndex = Math.floor((brightness / 255) * (DENSITY.length - 1));
          asciiStr += DENSITY[charIndex];
        }
        asciiStr += '\n';
      }

      pre.textContent = asciiStr;
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [videoRef, asciiRef, isLoaded]);
}
