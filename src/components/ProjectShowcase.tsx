import Image from 'next/image';
import type { Project } from '@/types';
import ProjectArt from './ProjectArt';

/** Arte animado de fondo + mockup de escritorio y de celular flotando encima. */
export default function ProjectShowcase({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <div className="showcase">
      <ProjectArt project={project} />
      <Image
        className="showcase__desktop"
        src={project.images.desktop}
        alt={`${project.title} en escritorio`}
        width={1600}
        height={1000}
        priority={priority}
        unoptimized
      />
      <Image
        className="showcase__phone"
        src={project.images.mobile}
        alt={`${project.title} en celular`}
        width={720}
        height={1440}
        priority={priority}
        unoptimized
      />
    </div>
  );
}
