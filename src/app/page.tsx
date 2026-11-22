import type { Metadata } from 'next';
import Link from 'next/link';
import { marqueeWords, personalInfo, projects, services } from '@/lib/data';
import { buildMetadata } from '@/lib/seo';
import ProjectCard from '@/components/ProjectCard';
import SkillsGrid from '@/components/SkillsGrid';
import HeroCanvas from '@/components/fx/HeroCanvas';
import RotatingBadge from '@/components/fx/RotatingBadge';
import HeroTitle from '@/components/HeroTitle';
import LocalTime from '@/components/fx/LocalTime';
import Magnetic from '@/components/fx/Magnetic';
import Marquee from '@/components/fx/Marquee';
import Reveal from '@/components/fx/Reveal';
import ScrubText from '@/components/fx/ScrubText';
import SplitText from '@/components/fx/SplitText';

export const metadata: Metadata = buildMetadata({
  description: personalInfo.description,
  path: '/',
});

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero container-x">
        <HeroCanvas />
        <div className="hero__top">
          <Reveal waitForLoad className="label">
            Portafolio — Ed. 2026
          </Reveal>
          <Reveal waitForLoad delay={0.1} className="label hidden md:block">
            {personalInfo.location} · <LocalTime />
          </Reveal>
          <Reveal waitForLoad delay={0.2} className="label flex items-center gap-2">
            <span className="status-dot" /> Disponible para proyectos
          </Reveal>
        </div>

        <HeroTitle
          first={personalInfo.firstName}
          last={personalInfo.lastName}
          srText={`${personalInfo.name} — ${personalInfo.title}`}
          aside={
            <Reveal as="span" waitForLoad delay={0.65} className="hero__role serif-i">
              <span className="block">full stack</span>
              <span className="roller">
                <span className="roller__track">
                  <span>developer</span>
                  <span>creative coder</span>
                  <span>AI builder</span>
                  <span>problem solver</span>
                  <span>developer</span>
                </span>
              </span>
            </Reveal>
          }
        />

        <div className="hero__bottom">
          <Reveal waitForLoad delay={0.85}>
            <p className="hero__lead">{personalInfo.description}</p>
          </Reveal>
          <Reveal waitForLoad delay={0.9} as="ul" className="hero__meta">
            <li><span>01</span>Web · Next.js</li>
            <li><span>02</span>Microservicios</li>
            <li><span>03</span>iOS · Swift</li>
            <li><span>04</span>IA aplicada</li>
          </Reveal>
          <Reveal waitForLoad delay={1} className="shrink-0">
            <Magnetic strength={0.25}>
              <a href="#work" className="hero-cta" data-cursor="Explorar" aria-label="Ver proyectos">
                <RotatingBadge text="Disponible · Freelance · Lima · 2026 · " />
                <span className="hero-cta__arrow" aria-hidden="true">↓</span>
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      {/* ── Marquee ── */}
      <section className="marquee-band" aria-label="Tecnologías">
        <Marquee items={marqueeWords} className="marquee--bone" reverse speed={0.5} />
        <Marquee
          items={['Disponible para proyectos', 'Hecho en Lima', 'Web · Móvil · IA', 'Código limpio', 'Detalles obsesivos']}
          className="marquee--sun"
          speed={0.8}
        />
      </section>

      {/* ── Intro ── */}
      <section className="section container-x">
        <div className="grid gap-10 md:grid-cols-[1fr_3fr]">
          <Reveal className="label">(Sobre mí)</Reveal>
          <div>
            <ScrubText
              text="Diseño y construyo productos digitales completos: desde microservicios resilientes hasta interfaces que se sienten vivas. Código limpio, detalles obsesivos y cero plantillas."
              accent={['vivas', 'obsesivos']}
            />
            <Reveal className="mt-12">
              <Magnetic>
                <Link href="/about" className="btn-pill btn-fill btn-pill--lg">
                  Conóceme más →
                </Link>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Proyectos ── */}
      <section id="work" className="section container-x pt-0">
        <div className="section-head">
          <h2 className="section-title display">
            <SplitText text="Proyectos" mode="chars" />{' '}
            <sup className="count-sup">({String(featured.length).padStart(2, '0')})</sup>
          </h2>
          <Reveal className="label hidden max-w-[24ch] text-right md:block">
            Una selección de productos que diseñé y construí de punta a punta.
          </Reveal>
        </div>
        <div className="stack">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
        <div className="mt-20 flex justify-center">
          <Magnetic>
            <Link href="/projects" className="btn-pill btn-fill btn-pill--lg" data-cursor="Archivo">
              Ver todos los proyectos →
            </Link>
          </Magnetic>
        </div>
      </section>

      {/* ── Servicios ── */}
      <section className="section container-x pt-0">
        <div className="section-head">
          <h2 className="section-title display">
            <SplitText text="Lo que hago" />
          </h2>
        </div>
        <div className="svc">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.06}>
              <div className="svc-row">
                <span className="label">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="svc-row__title">{service.title}</h3>
                <p className="svc-row__desc">{service.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="section container-x pt-0">
        <div className="section-head">
          <h2 className="section-title display">
            <SplitText text="Stack" mode="chars" /> <span className="serif-i text-sun">&amp; skills</span>
          </h2>
        </div>
        <SkillsGrid />
      </section>
    </>
  );
}
