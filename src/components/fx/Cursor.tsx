'use client';

import { useEffect, useRef, useState } from 'react';

/** Cursor personalizado: punto + anillo con inercia. Muestra texto en elementos con data-cursor="...". */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState('');
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (fine && !reduce) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add('has-cursor');
    let mx = -200;
    let my = -200;
    let rx = -200;
    let ry = -200;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    };
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      const labeled = t.closest<HTMLElement>('[data-cursor]');
      setLabel(labeled?.dataset.cursor ?? '');
      setHover(Boolean(t.closest('a, button, [role="button"], label, select')));
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => {
      mx = -200;
      my = -200;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    root.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      root.removeEventListener('mouseleave', onLeave);
      root.classList.remove('has-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className={`cursor-ring ${hover ? 'is-hover' : ''} ${label ? 'has-label' : ''} ${down ? 'is-down' : ''}`}
        aria-hidden="true"
      >
        <div className="cursor-ring__inner">
          <span>{label}</span>
        </div>
      </div>
      <div ref={dotRef} className={`cursor-dot ${label ? 'is-hidden' : ''}`} aria-hidden="true" />
    </>
  );
}
