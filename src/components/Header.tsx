'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type CSSProperties } from 'react';
import { personalInfo } from '@/lib/data';

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/projects', label: 'Proyectos' },
  { href: '/about', label: 'Sobre mí' },
  { href: '/contact', label: 'Contacto' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY && y > 160);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const close = () => setOpen(false);

  return (
    <>
      <header className={`site-header ${hidden && !open ? 'is-hidden' : ''}`}>
        <div className="site-header__bar container-x">
          <Link href="/" className="logo" onClick={close} aria-label={`${personalInfo.name} — Inicio`}>
            <span className="logo__mark">ar</span>
            <span className="roll hidden sm:inline-block" data-text={personalInfo.name}>
              <span>{personalInfo.name}</span>
            </span>
          </Link>

          <nav className="nav-desktop" aria-label="Principal">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive(link.href) ? 'is-active' : ''}`}
                aria-current={isActive(link.href) ? 'page' : undefined}
              >
                <span className="roll" data-text={link.label}>
                  <span>{link.label}</span>
                </span>
              </Link>
            ))}
          </nav>

          <Link href="/contact" className="btn-pill header-cta">
            <span className="roll" data-text="Hablemos ↗">
              <span>Hablemos ↗</span>
            </span>
          </Link>

          <button
            type="button"
            className="menu-btn"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? 'Cerrar' : 'Menú'}
          </button>
        </div>
      </header>

      <div id="mobile-menu" className={`menu-overlay ${open ? 'is-open' : ''}`}>
        <nav className="container-x" aria-label="Menú móvil">
          <ul>
            {links.map((link, i) => (
              <li key={link.href} style={{ '--i': i } as CSSProperties}>
                <Link href={link.href} className="menu-link" onClick={close}>
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex justify-between font-mono text-xs uppercase tracking-[0.14em]">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
            <a href={`mailto:${personalInfo.email}`}>Email</a>
          </div>
        </nav>
      </div>
    </>
  );
}
