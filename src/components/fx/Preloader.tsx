'use client';

import { useEffect, useState } from 'react';

/** Pantalla de carga 0→100 que se desliza hacia arriba y dispara las animaciones del hero. */
export default function Preloader({ name }: { name: string }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const total = reduce ? 150 : 1700;
    const start = performance.now();
    const timers: number[] = [];
    let raf = 0;

    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / total);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }
      timers.push(window.setTimeout(() => setDone(true), 200));
      timers.push(
        window.setTimeout(() => {
          document.documentElement.classList.add('is-loaded');
          window.dispatchEvent(new Event('app:loaded'));
        }, 550),
      );
      timers.push(window.setTimeout(() => setGone(true), 1500));
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`preloader ${done ? 'is-done' : ''}`} aria-hidden="true">
      <div className="preloader__inner container-x">
        <div className="flex flex-col gap-2">
          <span className="label">{name}</span>
          <span className="label">Portafolio — Lima, Perú</span>
        </div>
        <span className="preloader__count display">
          {count}
          <sup>%</sup>
        </span>
      </div>
      <div className="preloader__bar" style={{ transform: `scaleX(${count / 100})` }} />
    </div>
  );
}
