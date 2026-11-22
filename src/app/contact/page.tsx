import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { personalInfo } from '@/lib/data';
import ContactForm from '@/components/ContactForm';
import CopyEmail from '@/components/fx/CopyEmail';
import LocalTime from '@/components/fx/LocalTime';
import Reveal from '@/components/fx/Reveal';
import SplitText from '@/components/fx/SplitText';

const description = `¿Tienes un proyecto en mente? Escríbele a ${personalInfo.name}, ${personalInfo.title} en ${personalInfo.location}.`;

export const metadata: Metadata = buildMetadata({
  title: 'Contacto',
  description,
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <section className="page-hero container-x">
        <Reveal className="label">(Contacto)</Reveal>
        <h1 className="page-hero__title display">
          <SplitText text="Hablemos" mode="chars" />
        </h1>
        <Reveal delay={0.3}>
          <p className="page-hero__sub">
            <span className="serif-i text-sun">de tu próxima idea.</span> Cuéntame qué quieres construir y te
            respondo lo antes posible.
          </p>
        </Reveal>
      </section>

      <section className="contact-grid container-x pb-32">
        <Reveal>
          <ContactForm email={personalInfo.email} toName={personalInfo.firstName} />
        </Reveal>

        <aside>
          <Reveal className="contact-block">
            <span className="label">Email</span>
            <a href={`mailto:${personalInfo.email}`} className="contact-email">
              {personalInfo.email}
            </a>
            <CopyEmail email={personalInfo.email} />
          </Reveal>
          <Reveal className="contact-block" delay={0.1}>
            <span className="label">Redes</span>
            <div className="mt-3">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="roll" data-text="GitHub">
                  <span>GitHub</span>
                </span>
                <span aria-hidden="true">↗</span>
              </a>
              {personalInfo.linkedin && (
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                  <span className="roll" data-text="LinkedIn">
                    <span>LinkedIn</span>
                  </span>
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </Reveal>
          <Reveal className="contact-block" delay={0.2}>
            <span className="label">Ubicación</span>
            <p className="mt-3 text-xl">{personalInfo.location}</p>
            <p className="label mt-2">
              Hora local · <LocalTime />
            </p>
          </Reveal>
          <Reveal className="contact-block" delay={0.3}>
            <span className="label">Estado</span>
            <p className="mt-3 flex items-center gap-3 text-lg">
              <span className="status-dot" /> Disponible para proyectos freelance y prácticas
            </p>
          </Reveal>
        </aside>
      </section>
    </>
  );
}
