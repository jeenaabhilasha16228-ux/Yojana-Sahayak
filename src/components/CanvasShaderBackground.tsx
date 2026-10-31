import React, { useEffect, useRef } from 'react';

interface CanvasShaderBackgroundProps {
  className?: string;
}

export const CanvasShaderBackground: React.FC<CanvasShaderBackgroundProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let time = 0;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Color palette inspired by deep obsidian, radiant sapphire, subtle emerald aurora
    const render = () => {
      time += prefersReducedMotion ? 0.001 : 0.005;

      // Clear with deep obsidian
      ctx.fillStyle = '#06080e';
      ctx.fillRect(0, 0, width, height);

      // Create glowing radial orbs that morph harmonically
      const orbs = [
        {
          x: width * 0.5 + Math.sin(time * 0.8) * (width * 0.25),
          y: height * 0.35 + Math.cos(time * 0.6) * (height * 0.15),
          radius: Math.max(width * 0.45, 300),
          color1: 'rgba(37, 99, 235, 0.18)', // Royal Sapphire
          color2: 'rgba(15, 23, 42, 0)'
        },
        {
          x: width * 0.75 + Math.cos(time * 0.5) * (width * 0.2),
          y: height * 0.65 + Math.sin(time * 0.7) * (height * 0.18),
          radius: Math.max(width * 0.4, 250),
          color1: 'rgba(16, 185, 129, 0.12)', // Emerald Aurora
          color2: 'rgba(6, 78, 59, 0)'
        },
        {
          x: width * 0.25 + Math.sin(time * 0.4) * (width * 0.15),
          y: height * 0.6 + Math.cos(time * 0.5) * (height * 0.2),
          radius: Math.max(width * 0.35, 220),
          color1: 'rgba(217, 119, 6, 0.10)', // Subtle Saffron/Amber Glow
          color2: 'rgba(30, 27, 75, 0)'
        }
      ];

      for (const orb of orbs) {
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 10, orb.x, orb.y, orb.radius);
        gradient.addColorStop(0, orb.color1);
        gradient.addColorStop(1, orb.color2);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw subtle harmonic wave lines (cybernetic shader grid ripple)
      ctx.lineWidth = 1;
      const numLines = window.innerWidth < 640 ? 5 : 9;
      for (let i = 0; i < numLines; i++) {
        const lineOffset = (i / numLines) * height * 0.7 + height * 0.15;
        const alpha = 0.04 + (Math.sin(time + i) * 0.02);
        ctx.strokeStyle = `rgba(147, 197, 253, ${alpha})`;
        ctx.beginPath();

        for (let x = 0; x <= width; x += 30) {
          const wave1 = Math.sin((x * 0.003) + (time * 1.2) + (i * 0.5)) * 40;
          const wave2 = Math.cos((x * 0.006) - (time * 0.8) + (i * 0.3)) * 25;
          const y = lineOffset + wave1 + wave2;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
};
