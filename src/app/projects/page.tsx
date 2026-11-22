import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { personalInfo, projects } from '@/lib/data';
import ProjectList from '@/components/ProjectList';
import Reveal from '@/components/fx/Reveal';
import SplitText from '@/components/fx/SplitText';

const description = `Proyectos de ${personalInfo.name}: IntiFix, AutoClipper y Museo Infinito. Plataformas, productos con IA y experiencias web inmersivas.`;

export const metadata: Metadata = buildMetadata({
  title: 'Proyectos',
  description,
  path: '/projects',
});

export default function ProjectsPage() {
  return (
    <>
      <section className="page-hero container-x">
        <Reveal className="label">(Archivo — {String(projects.length).padStart(2, '0')})</Reveal>
        <h1 className="page-hero__title display">
          <SplitText text="Proyectos" mode="chars" />
        </h1>
        <Reveal delay={0.3}>
          <p className="page-hero__sub">
            Productos que diseñé y construí de punta a punta:{' '}
            <span className="serif-i text-sun">plataformas, IA y experiencias inmersivas.</span>
          </p>
        </Reveal>
      </section>

      <section className="container-x pb-32">
        <ProjectList projects={projects} />
      </section>
    </>
  );
}
