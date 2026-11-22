'use client';

import { useEffect, useRef } from 'react';

/** Cinta infinita que acelera y se inclina según la velocidad del scroll. */
export default function Marquee({
  items,
  speed = 0.6,
  reverse = false,
  className = '',
}: {
  items: string[];
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const dir = reverse ? 1 : -1;
    let x = 0;
    let v = 0;
    let lastY = window.scrollY;
    let raf = 0;

    const loop = () => {
      const y = window.scrollY;
      v += ((y - lastY) * 0.2 - v) * 0.1;
      lastY = y;
      const half = el.scrollWidth / 2;
      x += dir * (speed + Math.abs(v));
      if (half > 0) {
        if (x <= -half) x += half;
        if (x > 0) x -= half;
      }
      const skew = Math.max(-10, Math.min(10, -v * 0.5));
      el.style.transform = `translate3d(${x}px, 0, 0) skewX(${skew}deg)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [speed, reverse]);

  const list = [...items, ...items];

  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div ref={track} className="marquee__track">
        {list.map((item, i) => (
          <span key={i} className="marquee__item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
