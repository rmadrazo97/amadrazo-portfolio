"use client";

import { useEffect, useRef } from "react";

/**
 * A 2D particle sphere with a warm core. The motion is a slow spin of points
 * on a sphere, drawn on canvas. No WebGL.
 */
export default function FeltOrb() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = 720;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const pts = Array.from({ length: count }, (_, i) => {
      const y = 1 - (i / (count - 1)) * 2;
      const ring = Math.sqrt(1 - y * y);
      const theta = golden * i;
      return { x: Math.cos(theta) * ring, y, z: Math.sin(theta) * ring };
    });

    let rot = 0.6;
    let raf = 0;
    let running = true;

    const draw = () => {
      const size = Math.max(1, Math.round(wrap.clientWidth));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(size * dpr)) {
        canvas.width = Math.round(size * dpr);
        canvas.height = Math.round(size * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;
      const radius = size * 0.34;
      const glow = ctx.createRadialGradient(cx, cy, radius * 0.04, cx, cy, radius * 0.85);
      glow.addColorStop(0, "rgba(255,90,31,0.62)");
      glow.addColorStop(0.42, "rgba(255,90,31,0.16)");
      glow.addColorStop(1, "rgba(255,90,31,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.85, 0, Math.PI * 2);
      ctx.fill();

      const cos = Math.cos(rot);
      const sin = Math.sin(rot);
      const view = pts
        .map((p) => {
          const x = p.x * cos + p.z * sin;
          const z = -p.x * sin + p.z * cos;
          return { x: cx + x * radius, y: cy + p.y * radius, z };
        })
        .sort((a, b) => a.z - b.z);

      for (const p of view) {
        const depth = (p.z + 1) / 2;
        const nx = (p.x - cx) / radius;
        const ny = (p.y - cy) / radius;
        const lit = depth > 0.72 && nx > -0.15 && nx < 0.55 && ny > -0.5 && ny < 0.2;
        ctx.globalAlpha = depth < 0.42 ? 0.05 + depth * 0.12 : 0.28 + depth * 0.7;
        ctx.fillStyle = lit ? "#FF5A1F" : "#17150F";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 0.45 + depth * 1.85, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (!reduce && running) {
        rot += 0.0035;
        raf = requestAnimationFrame(draw);
      }
    };

    draw();
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="felt-orb" ref={wrapRef}>
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
