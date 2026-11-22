'use client';

import type { PointerEvent, ReactNode } from 'react';

/** Hace que la luz de cada .skill-card siga al mouse. */
export default function Spotlight({ children, className = '' }: { children: ReactNode; className?: string }) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>('.skill-card');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <div className={className} onPointerMove={onMove}>
      {children}
    </div>
  );
}
