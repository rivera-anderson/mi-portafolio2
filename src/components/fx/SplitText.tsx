'use client';

import { Fragment, useRef, type CSSProperties, type ElementType } from 'react';
import { useInView } from './useInView';

type SplitTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  mode?: 'words' | 'chars';
  delay?: number;
  stagger?: number;
  waitForLoad?: boolean;
  /** Si es true no agrega el texto para lectores de pantalla (úsalo cuando el padre ya lo tiene). */
  decorative?: boolean;
};

export default function SplitText({
  text,
  as = 'span',
  className = '',
  mode = 'words',
  delay = 0,
  stagger,
  waitForLoad = false,
  decorative = false,
}: SplitTextProps) {
  const Tag = as;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { waitForLoad });
  const step = stagger ?? (mode === 'chars' ? 0.035 : 0.06);
  const words = text.split(' ');
  let index = 0;

  return (
    <Tag
      ref={ref}
      className={`split ${inView ? 'is-in' : ''} ${className}`}
      style={{ '--d': `${delay}s`, '--s': `${step}s` } as CSSProperties}
    >
      {!decorative && <span className="sr-only">{text}</span>}
      <span aria-hidden="true">
        {words.map((word, wi) => (
          <Fragment key={wi}>
            <span className="split__word">
              {mode === 'chars' ? (
                Array.from(word).map((ch, ci) => (
                  <span key={ci} className="w">
                    <span style={{ '--i': index++ } as CSSProperties}>{ch}</span>
                  </span>
                ))
              ) : (
                <span className="w">
                  <span style={{ '--i': index++ } as CSSProperties}>{word}</span>
                </span>
              )}
            </span>
            {wi < words.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
