import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { Project } from '@/types';
import ProjectShowcase from './ProjectShowcase';

/** Tarjeta "sticky" que se apila sobre la anterior al hacer scroll. */
export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="stack-card"
      style={{ '--c': project.color, '--i': index } as CSSProperties}
      data-cursor="Ver caso"
    >
      <div className="stack-card__info">
        <div className="stack-card__top">
          <span className="label">({String(index + 1).padStart(2, '0')})</span>
          <span className="label">
            {project.category} — {project.year}
          </span>
        </div>
        <div>
          <h3 className="stack-card__title display">{project.title}</h3>
          <p className="stack-card__desc">{project.description}</p>
          <ul className="chips mb-8">
            {project.technologies.slice(0, 4).map((tech) => (
              <li key={tech} className="chip">
                {tech}
              </li>
            ))}
          </ul>
          <span className="arrow-link">
            Ver caso de estudio <span>→</span>
          </span>
        </div>
      </div>
      <div className="stack-card__art">
        <ProjectShowcase project={project} priority={index === 0} />
      </div>
    </Link>
  );
}
