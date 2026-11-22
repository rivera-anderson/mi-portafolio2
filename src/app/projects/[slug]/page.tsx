import type { Metadata } from 'next';
import { Suspense, type CSSProperties } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects } from '@/lib/data';
import { buildMetadata, projectJsonLd, toJsonLd } from '@/lib/seo';
import Image from 'next/image';
import ProjectShowcase from '@/components/ProjectShowcase';
import Magnetic from '@/components/fx/Magnetic';
import Reveal from '@/components/fx/Reveal';
import SplitText from '@/components/fx/SplitText';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Proyecto no encontrado',
    };
  }

  return buildMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
    type: 'article',
  });
}

// Con cacheComponents, los params se leen dentro de <Suspense> para que la navegación sea instantánea.
export default function ProjectDetailPage({ params }: Props) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ProjectDetail params={params} />
    </Suspense>
  );
}

async function ProjectDetail({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);

  if (index === -1) {
    notFound();
  }

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <article style={{ '--c': project.color } as CSSProperties}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(projectJsonLd(project.slug)) }} />
      <section className="page-hero container-x">
        <Reveal>
          <Link href="/projects" className="back-link label">
            ← Todos los proyectos
          </Link>
        </Reveal>
        <Reveal delay={0.1} className="label mt-10">
          {project.category}
        </Reveal>
        <h1 className="case-hero__title display">
          <SplitText text={project.title} mode="chars" />
        </h1>
        <Reveal delay={0.3}>
          <p className="page-hero__sub">{project.description}</p>
        </Reveal>
        <Reveal delay={0.4} className="case-meta">
          <div>
            <span className="label">Año</span>
            <p>{project.year}</p>
          </div>
          <div>
            <span className="label">Rol</span>
            <p>{project.role}</p>
          </div>
          <div>
            <span className="label">Categoría</span>
            <p>{project.category}</p>
          </div>
          <div>
            <span className="label">Stack</span>
            <p>{project.technologies.slice(0, 3).join(', ')}</p>
          </div>
        </Reveal>
      </section>

      <Reveal className="container-x">
        <div className="case-art">
          <ProjectShowcase project={project} priority />
        </div>
      </Reveal>

      <section className="section container-x case-body">
        <Reveal className="label">(Resumen)</Reveal>
        <div>
          <Reveal>
            <p className="case-lead">{project.longDescription}</p>
          </Reveal>

          <h2 className="label mb-6 mt-20">Lo más destacado</h2>
          <ol className="highlights">
            {project.highlights.map((highlight, i) => (
              <Reveal as="li" key={highlight} delay={i * 0.06}>
                <span className="label" style={{ color: project.color }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{highlight}</span>
              </Reveal>
            ))}
          </ol>

          <h2 className="label mb-6 mt-20">Tecnologías</h2>
          <Reveal as="ul" className="chips">
            {project.technologies.map((tech) => (
              <li key={tech} className="chip chip--lg">
                {tech}
              </li>
            ))}
          </Reveal>

          {(project.demoUrl || project.githubUrl) && (
            <div className="mt-16 flex flex-wrap gap-4">
              {project.demoUrl && (
                <Magnetic>
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-pill btn-fill btn-pill--lg">
                    Ver demo ↗
                  </a>
                </Magnetic>
              )}
              {project.githubUrl && (
                <Magnetic>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-pill btn-fill btn-pill--lg">
                    Ver código ↗
                  </a>
                </Magnetic>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="container-x pb-24">
        <h2 className="label mb-6">(Pantallas)</h2>
        <div className="gallery">
          <Reveal className="gallery__panel gallery__panel--wide">
            <Image
              src={project.images.desktop}
              alt={`Pantalla principal de ${project.title}`}
              width={1600}
              height={1000}
              unoptimized
            />
          </Reveal>
          <Reveal className="gallery__panel gallery__panel--tall" delay={0.1}>
            <Image
              src={project.images.mobile}
              alt={`${project.title} en celular`}
              width={720}
              height={1440}
              unoptimized
            />
          </Reveal>
        </div>
      </section>

      <Link
        href={`/projects/${next.slug}`}
        className="next-project container-x"
        style={{ '--c': next.color } as CSSProperties}
        data-cursor="Siguiente"
      >
        <span className="label">Siguiente proyecto</span>
        <span className="next-project__title display">{next.title}</span>
      </Link>
    </article>
  );
}
