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
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      animationFrameId = requestAnimationFrame(draw);

      if (video.paused || video.ended) {
        return;
      }

      const containerW = window.innerWidth;
      const containerH = window.innerHeight;

      // 120 characters across the screen for good resolution
      const w = 120;
      const fontAspectRatio = 0.6; // Typical monospace width/height ratio
      const charWidth = containerW / w;
      const charHeight = charWidth / fontAspectRatio;
      const h = Math.ceil(containerH / charHeight);

      if (w === 0 || h === 0) return;

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      // Object-fit: cover math for the video source
      const videoRatio = video.videoWidth / video.videoHeight;
      const screenRatio = containerW / containerH;

      let sx = 0, sy = 0, sw = video.videoWidth, sh = video.videoHeight;
      if (screenRatio > videoRatio) {
        sh = video.videoWidth / screenRatio;
        sy = (video.videoHeight - sh) / 2;
      } else {
        sw = video.videoHeight * screenRatio;
        sx = (video.videoWidth - sw) / 2;
      }

      ctx.drawImage(video, sx, sy, sw, sh, 0, 0, w, h);
      const imageData = ctx.getImageData(0, 0, w, h);
      const data = imageData.data;

      const gridMouseX = mouseX / charWidth;
      const gridMouseY = mouseY / charHeight;

      let asciiStr = '';
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const offset = (y * w + x) * 4;
          const r = data[offset];
          const g = data[offset + 1];
          const b = data[offset + 2];
          
          let brightness = (0.299 * r + 0.587 * g + 0.114 * b);
          
          // Interactive hover reveal!
          const dx = x - gridMouseX;
          const dy = y - gridMouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 12) {
             // Boost brightness intensely near the mouse cursor
             brightness += Math.max(0, (12 - dist) * 15);
          }
          
          brightness = Math.min(255, Math.max(0, brightness));
          
          const charIndex = Math.floor((brightness / 255) * (DENSITY.length - 1));
          asciiStr += DENSITY[charIndex];
        }
        asciiStr += '\\n';
      }

      pre.style.fontSize = `${charHeight}px`;
      pre.style.lineHeight = `${charHeight}px`;
      pre.textContent = asciiStr;
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [videoRef, asciiRef, isLoaded]);
}
