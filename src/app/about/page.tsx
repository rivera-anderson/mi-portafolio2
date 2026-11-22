import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { personalInfo, projects, skillGroups } from '@/lib/data';
import SkillsGrid from '@/components/SkillsGrid';
import Reveal from '@/components/fx/Reveal';
import SplitText from '@/components/fx/SplitText';

const description = `Conoce a ${personalInfo.name}, ${personalInfo.title} en ${personalInfo.location}: su historia, cómo trabaja y su stack.`;

export const metadata: Metadata = buildMetadata({
  title: 'Sobre mí',
  description,
  path: '/about',
});

const principles = [
  {
    title: 'Detalle obsesivo',
    description: 'Cada transición, cada estado vacío y cada milisegundo de carga importa.',
  },
  {
    title: 'Arquitectura que escala',
    description: 'Diseño pensando en el día en que el producto crezca: servicios desacoplados y resilientes.',
  },
  {
    title: 'Aprender sin parar',
    description: 'Web, móvil, backend o IA: si el producto lo necesita, lo aprendo y lo construyo.',
  },
];

export default function AboutPage() {
  const techCount = skillGroups.reduce((total, group) => total + group.items.length, 0);

  return (
    <>
      <section className="page-hero container-x">
        <Reveal className="label">(Sobre mí)</Reveal>
        <h1 className="page-hero__title display">
          <SplitText text="Sobre mí" mode="chars" />
        </h1>
        <Reveal delay={0.3}>
          <p className="page-hero__sub">
            <span className="serif-i text-sun">Código con alma.</span> Ingeniería sólida y experiencias que dan
            gusto usar.
          </p>
        </Reveal>
      </section>

      <section className="container-x grid gap-12 pb-24 md:grid-cols-[5fr_7fr] md:gap-20">
        <Reveal>
          <div className="monogram">
            <span className="monogram__letters">ar</span>
            <span className="label">
              <span>{personalInfo.name}</span>
              <span>{personalInfo.location}</span>
            </span>
          </div>
        </Reveal>
        <div className="flex flex-col justify-center">
          <Reveal>
            <p className="case-lead mb-10">
              Soy {personalInfo.firstName}, desarrollador full stack y estudiante de Tecsup en Lima. Me obsesiona el
              punto donde la ingeniería sólida se encuentra con una experiencia que da gusto usar.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="prose-lg">
            <p>
              En la carrera trabajo con sistemas distribuidos y arquitectura de microservicios —patrones como Circuit
              Breaker, Retry y Bulkhead con Spring Cloud y Resilience4j— y desarrollo apps iOS nativas con Swift.
            </p>
            <p>
              Fuera del aula construyo productos propios: IntiFix, una plataforma que conecta clientes con técnicos
              del hogar; AutoClipper, una herramienta con IA que convierte horas de video en clips para redes; y
              Museo Infinito, una experiencia web inmersiva.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-x">
        <div className="stats">
          <Reveal className="stat">
            <p className="stat__value">{String(projects.length).padStart(2, '0')}</p>
            <p className="label mt-3">Proyectos destacados</p>
          </Reveal>
          <Reveal className="stat" delay={0.1}>
            <p className="stat__value">{techCount}+</p>
            <p className="label mt-3">Tecnologías en mi stack</p>
          </Reveal>
          <Reveal className="stat" delay={0.2}>
            <p className="stat__value">
              <span className="serif-i text-sun">Lima</span>
            </p>
            <p className="label mt-3">Base de operaciones</p>
          </Reveal>
        </div>
      </section>

      <section className="section container-x">
        <div className="section-head">
          <h2 className="section-title display">
            <SplitText text="Cómo trabajo" />
          </h2>
        </div>
        <div className="svc">
          {principles.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="svc-row">
                <span className="label">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="svc-row__title">{item.title}</h3>
                <p className="svc-row__desc">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section container-x pt-0">
        <div className="section-head">
          <h2 className="section-title display">
            <SplitText text="Habilidades" mode="chars" />
          </h2>
        </div>
        <SkillsGrid />
      </section>
    </>
  );
}
