"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";

/**
 * Rotating "AM" dot-mesh signature mark that periodically morphs between
 * shapes and bursts into an RGB-split / scanline glitch. Ported from the
 * Portfolio design's `startGlitch` routine and driven by requestAnimationFrame.
 */
export default function GlitchMark({ size = 300 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let started = false;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const S = size;
    c.width = S * dpr;
    c.height = S * dpr;
    c.style.width = S + "px";
    c.style.height = S + "px";
    ctx.scale(dpr, dpr);

    // glyph tile ("AM") rendered once to an offscreen canvas
    const TS = 180;
    const makeTile = () => {
      const cv = document.createElement("canvas");
      cv.width = TS;
      cv.height = TS;
      const o = cv.getContext("2d") as any;
      o.textAlign = "center";
      o.textBaseline = "middle";
      o.font = '800 90px "JetBrains Mono", monospace';
      if (o.letterSpacing !== undefined) o.letterSpacing = "-6px";
      o.fillStyle = "#15130E";
      o.fillText("AM", TS / 2, TS / 2 + 4);
      return cv;
    };

    let tile: HTMLCanvasElement | null = null;
    let ready = false;
    const build = () => {
      tile = makeTile();
      ready = true;
      setTimeout(kick, 0);
    };
    if (document.fonts && document.fonts.load) {
      document.fonts.load('800 90px "JetBrains Mono"').then(build).catch(build);
    } else {
      build();
    }

    // point cloud distributed on a Fibonacci sphere
    const R = 78;
    const cx = S / 2;
    const cy = S / 2;
    const tilt = -0.36;
    const STOPS = 3;
    let targetShape = 0;
    let rot = 0;
    const N = 660;
    const dirs: number[][] = [];
    const GA = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const rr = Math.sqrt(Math.max(0, 1 - y * y));
      const ph = i * GA;
      dirs.push([Math.cos(ph) * rr, y, Math.sin(ph) * rr]);
    }
    const shapeR = (d: number[], shape: number) => {
      const ax = Math.abs(d[0]);
      const ay = Math.abs(d[1]);
      const az = Math.abs(d[2]);
      if (shape === 0) return 1 / Math.max(ax, ay, az);
      if (shape === 1) {
        const rho = Math.hypot(d[0], d[2]);
        if (rho < 1e-6) return 1 / (ay / 0.92);
        const seg = Math.PI / 3;
        const a = (((Math.atan2(d[2], d[0]) % seg) + seg) % seg) - seg / 2;
        const hexR = Math.cos(Math.PI / 6) / Math.cos(a);
        return 1 / Math.max(rho / hexR, ay / 0.92);
      }
      return 1;
    };
    const rad = dirs.map((d) => shapeR(d, 0));

    const scene = document.createElement("canvas");
    scene.width = S;
    scene.height = S;
    const sctx = scene.getContext("2d")!;
    const tmp = document.createElement("canvas");
    tmp.width = S;
    tmp.height = S;
    const tctx = tmp.getContext("2d")!;

    const rotX = (p: number[], a: number) => {
      const co = Math.cos(a);
      const s = Math.sin(a);
      return [p[0], p[1] * co - p[2] * s, p[1] * s + p[2] * co];
    };
    const rotY = (p: number[], a: number) => {
      const co = Math.cos(a);
      const s = Math.sin(a);
      return [p[0] * co + p[2] * s, p[1], -p[0] * s + p[2] * co];
    };

    type Pt = { x: number; y: number; z: number; i: number };
    const drawMesh = (now: number, intensity: number) => {
      sctx.setTransform(1, 0, 0, 1, 0, 0);
      sctx.clearRect(0, 0, S, S);
      const pts: Pt[] = [];
      for (let i = 0; i < N; i++) {
        const tgt = shapeR(dirs[i], targetShape);
        rad[i] += (tgt - rad[i]) * 0.06;
        const wob = 1 + intensity * 0.045 * Math.sin(i * 0.7 + now * 0.02);
        const r = rad[i] * R * wob;
        let p = [dirs[i][0] * r, dirs[i][1] * r, dirs[i][2] * r];
        p = rotX(p, tilt);
        p = rotY(p, rot);
        pts.push({ x: cx + p[0], y: cy - p[1], z: p[2], i });
      }
      pts.sort((a, b) => a.z - b.z);
      const drawDot = (pt: Pt) => {
        const t = (pt.z / (R * 1.3) + 1) / 2;
        const size = 1.1 + t * 2.1;
        sctx.fillStyle =
          pt.i % 13 === 0
            ? `rgba(255,90,31,${0.45 + t * 0.55})`
            : `rgba(21,19,14,${0.24 + t * 0.7})`;
        sctx.fillRect(pt.x - size / 2, pt.y - size / 2, size, size);
      };
      let k = 0;
      for (; k < pts.length && pts[k].z < 0; k++) drawDot(pts[k]);
      if (tile) {
        const dw = R * 1.5;
        sctx.globalAlpha = 0.96;
        sctx.drawImage(tile, cx - dw / 2, cy - dw / 2, dw, dw);
        sctx.globalAlpha = 1;
      }
      for (; k < pts.length; k++) drawDot(pts[k]);
    };

    let slices: { y: number; h: number; dx: number }[] = [];
    let lastSlice = 0;
    let glitchUntil = 0;
    let nextGlitch = performance.now() + 900;
    const genSlices = () => {
      slices = [];
      const n = 2 + Math.floor(Math.random() * 4);
      for (let k = 0; k < n; k++)
        slices.push({
          y: Math.random() * S,
          h: 4 + Math.random() * 20,
          dx: (Math.random() - 0.5) * S * 0.22,
        });
    };
    const tintScene = (col: string) => {
      tctx.clearRect(0, 0, S, S);
      tctx.drawImage(scene, 0, 0);
      tctx.globalCompositeOperation = "source-in";
      tctx.fillStyle = col;
      tctx.fillRect(0, 0, S, S);
      tctx.globalCompositeOperation = "source-over";
      return tmp;
    };

    const render = (now: number) => {
      rafId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, S, S);
      if (!ready) return;
      rot += 0.006;
      const glitching = now < glitchUntil;
      drawMesh(now, glitching ? 1 : 0);
      if (glitching) {
        const shift = 2 + Math.random() * 3;
        ctx.globalAlpha = 0.5;
        ctx.drawImage(tintScene("#FF5A1F"), -shift, 0);
        ctx.drawImage(tintScene("#00B8A0"), shift, 0);
        ctx.globalAlpha = 1;
      }
      ctx.drawImage(scene, 0, 0);
      if (glitching) {
        if (now - lastSlice > 55) {
          genSlices();
          lastSlice = now;
        }
        for (const s of slices) {
          ctx.clearRect(0, s.y, S, s.h);
          ctx.drawImage(scene, 0, s.y, S, s.h, s.dx, s.y, S, s.h);
        }
      }
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      for (let y = 1; y < S; y += 3) ctx.fillRect(0, y, S, 1);
      ctx.globalCompositeOperation = "source-over";
      if (now > nextGlitch) {
        glitchUntil = now + 160 + Math.random() * 300;
        nextGlitch = now + 1700 + Math.random() * 2600;
        lastSlice = 0;
        targetShape = (targetShape + 1) % STOPS;
      }
    };

    function kick() {
      if (started) return;
      started = true;
      render(performance.now());
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [size]);

  return <canvas ref={canvasRef} style={{ position: "relative", zIndex: 1 }} />;
}
