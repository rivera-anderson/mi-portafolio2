import Link from 'next/link';
import { personalInfo } from '@/lib/data';
import LocalTime from './fx/LocalTime';

async function getCurrentYear() {
  'use cache';
  return new Date().getFullYear();
}

export default async function Footer() {
  const year = await getCurrentYear();

  return (
    <footer className="site-footer">
      <div className="container-x">
        <span className="label">¿Tienes un proyecto en mente?</span>
        <Link href="/contact" className="footer-cta display" data-cursor="Escríbeme">
          <span className="footer-cta__text">Hablemos</span>
          <span className="footer-cta__arrow" aria-hidden="true">
            ↗
          </span>
        </Link>

        <div className="footer-grid">
          <div>
            <span className="label">Navegación</span>
            <ul>
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/projects">Proyectos</Link></li>
              <li><Link href="/about">Sobre mí</Link></li>
              <li><Link href="/contact">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <span className="label">Redes</span>
            <ul>
              <li><a href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a></li>
              {personalInfo.linkedin && (
                <li><a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
              )}
              <li><a href={`mailto:${personalInfo.email}`}>Email ↗</a></li>
            </ul>
          </div>
          <div>
            <span className="label">Ubicación</span>
            <ul>
              <li>{personalInfo.location}</li>
              <li className="text-muted"><LocalTime /> (GMT-5)</li>
            </ul>
          </div>
          <div>
            <span className="label">Estado</span>
            <ul>
              <li className="flex items-center gap-2"><span className="status-dot" /> Disponible</li>
              <li><a href="#top">Volver arriba ↑</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="label">© {year} {personalInfo.name}</span>
          <span className="label">Hecho con Next.js en Lima</span>
        </div>
      </div>
      <div className="footer-giant" aria-hidden="true">
        {personalInfo.firstName}
      </div>
    </footer>
  );
}
