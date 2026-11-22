'use client';

import { useEffect, useRef } from 'react';

/** Luz naranja que sigue al mouse con inercia dentro del hero. */
export default function HeroOrb() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    let tx = parent.clientWidth * 0.72;
    let ty = parent.clientHeight * 0.35;
    let x = tx;
    let y = ty;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
    };
    const loop = (t: number) => {
      const drift = Math.sin(t / 2200) * 40;
      x += (tx - x) * 0.035;
      y += (ty + drift - y) * 0.035;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    parent.addEventListener('pointermove', onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      parent.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="hero-orb" aria-hidden="true" />;
}
