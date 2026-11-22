'use client';

import { useEffect, useRef } from 'react';

/** Texto que se "enciende" palabra por palabra mientras haces scroll. */
export default function ScrubText({ text, accent = [] }: { text: string; accent?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>('.sw'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      words.forEach((w) => (w.style.opacity = '1'));
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.3 - r.height * 0.5;
      const p = Math.min(1, Math.max(0, (start - r.top) / (start - end)));
      const lit = p * (words.length + 2);
      words.forEach((w, i) => {
        w.style.opacity = String(Math.min(1, Math.max(0.14, lit - i)));
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const words = text.split(' ');
  const clean = (w: string) => w.replace(/[.,:;—]/g, '');

  return (
    <p ref={ref} className="scrub">
      {words.map((w, i) => (
        <span key={i} className={`sw ${accent.includes(clean(w)) ? 'sw--accent' : ''}`}>
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  );
}
