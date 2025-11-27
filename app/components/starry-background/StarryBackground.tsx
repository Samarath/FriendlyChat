"use client";

import { useEffect, useRef } from "react";

export function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawStars();
    };

    const drawStars = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw small stars
      const starCount = Math.floor((canvas.width * canvas.height) / 8000);
      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.2;
        const opacity = Math.random() * 0.6 + 0.2;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base dark background */}
      <div className="absolute inset-0 bg-[#0a0e1a]" />

      {/* Stars canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Top-left teal/cyan gradient glow */}
      <div
        className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(45, 212, 191, 0.6) 0%, transparent 70%)",
        }}
      />

      {/* Bottom-right purple/pink gradient glow */}
      <div
        className="absolute -right-32 -bottom-32 h-[500px] w-[500px] rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, transparent 70%)",
        }}
      />

      {/* Decorative 4-pointed stars */}
      <svg
        className="absolute bottom-20 right-20 h-8 w-8 text-white/40"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
      </svg>
      <svg
        className="absolute top-40 left-1/4 h-4 w-4 text-white/20"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
      </svg>
    </div>
  );
}
