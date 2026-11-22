'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { useInView } from './fx/useInView';

type Props = { first: string; last: string; srText: string; aside?: ReactNode };

/**
 * Nombre gigante: entra letra por letra después del preloader y, con el mouse cerca,
 * las letras se vuelven finas (fuente variable) como un imán.
 */
export default function HeroTitle({ first, last, srText, aside }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { waitForLoad: true });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const chars = Array.from(el.querySelectorAll<HTMLElement>('.hero-char'));
    const weights = chars.map(() => 640);
    let mx = -9999;
    let my = -9999;
    let raf = 0;
    let active = false;

    const loop = () => {
      const radius = Math.max(220, window.innerWidth * 0.2);
      let moving = false;
      chars.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const dx = mx - (r.left + r.width / 2);
        const dy = my - (r.top + r.height / 2);
        const fall = Math.max(0, 1 - Math.hypot(dx, dy) / radius);
        const target = 640 - 480 * fall * fall;
        const w = weights[i] + (target - weights[i]) * 0.14;
        if (Math.abs(w - weights[i]) > 0.5) moving = true;
        weights[i] = w;
        c.style.fontVariationSettings = `'wght' ${w.toFixed(0)}`;
      });
      raf = active || moving ? requestAnimationFrame(loop) : 0;
    };
    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      active = true;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onLeave = () => {
      mx = -9999;
      my = -9999;
      active = false;
    };
    const hero = el.closest('section') ?? el;
    hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  let i = 0;
  const word = (text: string, delay: number) => (
    <span className="split__word">
      {Array.from(text).map((ch, ci) => (
        <span key={ci} className="w">
          <span className="hero-char" style={{ '--i': i++, '--d': `${delay}s` } as CSSProperties}>
            {ch}
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <h1 ref={ref} className={`hero__title display split ${inView ? 'is-in' : ''}`} style={{ '--s': '0.045s' } as CSSProperties}>
      <span className="sr-only">{srText}</span>
      <span className="block" aria-hidden="true">
        {word(first, 0)}
      </span>
      <span className="hero__row2" aria-hidden="true">
        {word(last, 0.15)}
        {aside}
      </span>
    </h1>
  );
}
