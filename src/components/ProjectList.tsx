'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { Project } from '@/types';
import ProjectShowcase from './ProjectShowcase';

/** Lista de proyectos con una vista previa flotante que sigue al cursor. */
export default function ProjectList({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let x = mx;
    let y = my;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const loop = () => {
      const dx = mx - x;
      x += dx * 0.12;
      y += (my - y) * 0.12;
      const rot = Math.max(-8, Math.min(8, dx * 0.05));
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${rot}deg)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="plist" onPointerLeave={() => setActive(null)}>
      {projects.map((project, i) => (
        <Link
          key={project.slug}
          href={`/projects/${project.slug}`}
          className="plist-row"
          style={{ '--c': project.color } as CSSProperties}
          onPointerEnter={() => setActive(i)}
          data-cursor="Ver caso"
        >
          <span className="label">{String(i + 1).padStart(2, '0')}</span>
          <span className="plist-row__title">{project.title}</span>
          <span className="plist-row__meta label">{project.category}</span>
          <span className="plist-row__meta label">{project.year}</span>
          <span className="plist-row__arrow" aria-hidden="true">
            ↗
          </span>
          <span className="plist-row__thumb">
            <ProjectShowcase project={project} />
          </span>
        </Link>
      ))}

      <div ref={previewRef} className={`plist-preview ${active !== null ? 'is-on' : ''}`} aria-hidden="true">
        {projects.map((project, i) => (
          <div key={project.slug} className={`plist-preview__item ${active === i ? 'is-active' : ''}`}>
            <ProjectShowcase project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}
