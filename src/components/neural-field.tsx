"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; charge: number };
type Link = { a: number; b: number };
type Spark = { to: number; at: number };

const INK = [69, 224, 196];
const MAGENTA = [226, 69, 139];
const AMBER = [240, 180, 74];

/** Activation spreads rather than flickers. A node lights, and the
 *  light travels its connections — which is what makes the field
 *  read as circuitry instead of noise. */
export default function NeuralField({ density = 1 }: { density?: number }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let links: Link[] = [];
    let sparks: Spark[] = [];
    let raf = 0;
    let running = true;
    let last = 0;

    const COUNT = () => Math.round(Math.min(150, (w * h) / 9000) * density);

    const build = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const rect = el.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      el.width = Math.round(w * dpr);
      el.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const n = COUNT();
      nodes = [];
      // Two overlapping lobes. Uneven density on purpose — the field
      // should have a shape, not a shape's average.
      for (let i = 0; i < n; i++) {
        const lobe = i % 2 === 0 ? -1 : 1;
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.sqrt(Math.random());
        const cx = w * (0.5 + lobe * 0.16);
        const cy = h * 0.5;
        const rx = w * 0.42;
        const ry = h * 0.4;
        const jitter = 0.62 + Math.random() * 0.5;
        nodes.push({
          x: cx + Math.cos(angle) * radius * rx * jitter,
          y: cy + Math.sin(angle) * radius * ry * jitter,
          vx: (Math.random() - 0.5) * 0.06,
          vy: (Math.random() - 0.5) * 0.06,
          r: 0.6 + Math.random() * 1.5,
          charge: 0,
        });
      }

      links = [];
      const reach = Math.max(70, Math.min(w, h) * 0.17);
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < reach * reach && Math.random() < 0.55) links.push({ a: i, b: j });
        }
      }
    };

    const ignite = () => {
      if (!nodes.length) return;
      const seed = Math.floor(Math.random() * nodes.length);
      nodes[seed].charge = 1;
      sparks.push({ to: seed, at: performance.now() });
      for (const l of links) {
        if (l.a === seed) sparks.push({ to: l.b, at: performance.now() + 90 + Math.random() * 190 });
        else if (l.b === seed) sparks.push({ to: l.a, at: performance.now() + 90 + Math.random() * 190 });
      }
    };

    const paint = () => {
      ctx.clearRect(0, 0, w, h);

      for (const l of links) {
        const A = nodes[l.a];
        const B = nodes[l.b];
        const lit = Math.max(A.charge, B.charge);
        if (lit < 0.04) continue;
        const mix = Math.min(1, lit);
        const col = A.charge > B.charge ? INK : MAGENTA;
        ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${0.045 + mix * 0.4})`;
        ctx.lineWidth = 0.5 + mix * 0.9;
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.stroke();
      }

      for (const n of nodes) {
        if (n.charge > 0.03) {
          const warm = n.charge > 0.72;
          const col = warm ? AMBER : n.x > w / 2 ? MAGENTA : INK;
          const r = n.r * (1 + n.charge * 2.1);
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 7);
          glow.addColorStop(0, `rgba(${col[0]},${col[1]},${col[2]},${0.5 * n.charge})`);
          glow.addColorStop(1, `rgba(${col[0]},${col[1]},${col[2]},0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(n.x, n.y, r * 7, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${0.35 + n.charge * 0.65})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = "rgba(139,144,162,0.22)";
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 0.62, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      if (now - last < 24) return;
      last = now;

      const dt = 24;
      for (const s of sparks) {
        if (now >= s.at) {
          nodes[s.to].charge = Math.min(1.4, nodes[s.to].charge + 0.85);
          for (const l of links) {
            if (l.a === s.to) sparks.push({ to: l.b, at: now + 70 + Math.random() * 160 });
            else if (l.b === s.to) sparks.push({ to: l.a, at: now + 70 + Math.random() * 160 });
          }
        }
      }
      sparks = sparks.filter((s) => now - s.at < 400).slice(-260);

      for (const n of nodes) {
        n.charge *= 0.955;
        n.x += n.vx * dt * 0.06;
        n.y += n.vy * dt * 0.06;
        n.vx *= 0.995;
        n.vy *= 0.995;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      if (Math.random() < 0.035) ignite();
      paint();
    };

    build();
    if (reduced) {
      for (let i = 0; i < 26; i++) ignite();
      paint();
      return;
    }
    raf = requestAnimationFrame(step);

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting && !document.hidden;
        if (!running) cancelAnimationFrame(raf);
        else {
          last = 0;
          raf = requestAnimationFrame(step);
        }
      },
      { threshold: 0 },
    );
    io.observe(el);

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (running) raf = requestAnimationFrame(step);
    };
    document.addEventListener("visibilitychange", onVisibility);

    const ro = new ResizeObserver(() => {
      build();
      paint();
    });
    ro.observe(el);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density]);

  return (
    <canvas
      ref={canvas}
      className="size-full"
      role="img"
      aria-label="An animated field of neurons firing signals through their connections"
    />
  );
}
