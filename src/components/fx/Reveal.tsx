'use client';

import { useRef, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { useInView } from './useInView';

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  waitForLoad?: boolean;
};

export default function Reveal({ children, as = 'div', className = '', delay = 0, waitForLoad = false }: RevealProps) {
  const Tag = as;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { waitForLoad });

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`}
      style={{ '--d': `${delay}s` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
