"use client";

import { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  swaySeed: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    
    // Explosive magic forge sparks that fly to the sides
    this.vx = (Math.random() - 0.5) * 8.0; // Fast horizontal burst (left/right)
    this.vy = (Math.random() - 0.5) * 1.5; // Very little vertical movement initially
    
    this.maxLife = Math.random() * 50 + 30; // 30-80 frames
    this.life = this.maxLife;
    this.size = Math.random() * 3 + 1; // slightly larger for magical feel
    this.swaySeed = Math.random() * Math.PI * 2;
  }

  update() {
    // Apply sway to the Y-axis now since they fly horizontally
    const sway = Math.sin(this.life * 0.1 + this.swaySeed) * 0.8;
    
    this.x += this.vx;
    this.y += this.vy + sway;
    
    // Friction - slows them down smoothly
    this.vx *= 0.95;
    this.vy *= 0.95;
    
    this.life--;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const lifeRatio = Math.max(0, this.life / this.maxLife);
    
    // Aggressive flickering for magical forge sparks
    const flicker = 0.5 + Math.random() * 1.0; 
    const currentSize = this.size * flicker * (lifeRatio * 0.5 + 0.5) * 2.5;

    let r, g, b;

    // Ancient Magic Forge Colors: Bright Gold -> Fiery Orange -> Deep Crimson
    if (lifeRatio > 0.6) {
      // Gold to Orange
      r = 255;
      g = Math.floor(150 + (lifeRatio - 0.6) * (255 - 150) / 0.4);
      b = Math.floor((lifeRatio - 0.6) * 100 / 0.4); // slightly white/yellow core
    } else if (lifeRatio > 0.2) {
      // Orange to Crimson
      r = 255;
      g = Math.floor((lifeRatio - 0.2) * 150 / 0.4);
      b = 0;
    } else {
      // Dark Crimson fading to black
      r = Math.floor(lifeRatio * 255 / 0.2);
      g = 0;
      b = 0;
    }

    const outerColor = `rgba(${Math.max(r - 100, 0)}, 0, 0, ${lifeRatio * 0.3})`; 
    const midColor = `rgba(${r}, ${g}, ${b}, ${lifeRatio * 0.8})`;
    const centerColor = `rgba(255, 255, 255, ${lifeRatio})`; // Super-hot white core

    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, currentSize
    );
    
    gradient.addColorStop(0, centerColor);
    gradient.addColorStop(0.2, midColor);
    gradient.addColorStop(1, outerColor); 

    ctx.beginPath();
    // 4-pointed magical spark shape
    ctx.moveTo(this.x, this.y - currentSize * 1.5); // Taller top
    ctx.quadraticCurveTo(this.x, this.y, this.x + currentSize, this.y); 
    ctx.quadraticCurveTo(this.x, this.y, this.x, this.y + currentSize * 1.5); // Taller bottom
    ctx.quadraticCurveTo(this.x, this.y, this.x - currentSize, this.y); 
    ctx.quadraticCurveTo(this.x, this.y, this.x, this.y - currentSize * 1.5); 
    ctx.closePath();

    ctx.fillStyle = gradient;
    
    // Intense glowing aura
    ctx.shadowBlur = 20 * flicker;
    ctx.shadowColor = midColor;
    
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

export default function CursorSparks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", resize);
    resize();

    let lastX = -1;
    let lastY = -1;

    const addSparks = (e: MouseEvent | TouchEvent) => {
      let clientX, clientY;
      if (e instanceof MouseEvent) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }

      const dx = clientX - lastX;
      const dy = clientY - lastY;
      const distance = lastX === -1 ? 0 : Math.sqrt(dx * dx + dy * dy);
      
      lastX = clientX;
      lastY = clientY;

      // Only spawn sparks if the mouse actually moved a bit
      if (distance < 3) return;
      
      // 50% chance to skip spawning to make them significantly sparser
      if (Math.random() > 0.5) return;

      // Spawn exactly 1, or 2 if moving extremely fast
      const sparksCount = Math.min(Math.max(Math.floor(distance * 0.015), 1), 2);

      for (let i = 0; i < sparksCount; i++) {
        particles.push(new Particle(clientX, clientY));
      }
    };

    window.addEventListener("mousemove", addSparks);
    window.addEventListener("touchmove", addSparks);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", addSparks);
      window.removeEventListener("touchmove", addSparks);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    />
  );
}
