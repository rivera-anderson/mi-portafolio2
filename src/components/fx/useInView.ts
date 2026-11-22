'use client';

import { useEffect, useState, type RefObject } from 'react';

type Options = { waitForLoad?: boolean; rootMargin?: string; once?: boolean };

/** Devuelve true cuando el elemento entra en pantalla (y, si se pide, después del preloader). */
export function useInView(
  ref: RefObject<Element | null>,
  { waitForLoad = false, rootMargin = '0px 0px -10% 0px', once = true }: Options = {},
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let io: IntersectionObserver | undefined;

    const start = () => {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) io?.disconnect();
          } else if (!once) {
            setInView(false);
          }
        },
        { threshold: 0, rootMargin },
      );
      io.observe(el);
    };

    const loaded = document.documentElement.classList.contains('is-loaded');
    if (!waitForLoad || loaded) start();
    else window.addEventListener('app:loaded', start, { once: true });

    return () => {
      io?.disconnect();
      window.removeEventListener('app:loaded', start);
    };
  }, [ref, waitForLoad, rootMargin, once]);

  return inView;
}
