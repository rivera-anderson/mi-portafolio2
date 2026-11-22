import type { Metadata } from 'next';
import { personalInfo, projects, skillGroups } from './data';

export const ogImage = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: `${personalInfo.name} — ${personalInfo.title}`,
};

type PageSeo = {
  /** Título corto de la página (el layout agrega " | Anderson Rivera"). Vacío = home. */
  title?: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
};

/** Metadata completa por página: canonical, Open Graph y Twitter con imagen. */
export function buildMetadata({ title, description, path, type = 'website' }: PageSeo): Metadata {
  const fullTitle = title ? `${title} | ${personalInfo.name}` : `${personalInfo.name} — ${personalInfo.title}`;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: 'es_PE',
      siteName: personalInfo.name,
      url: path,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
  };
}

const isPlaceholderEmail = (email: string) => email.endsWith('@email.com');

/** Datos estructurados del sitio y de la persona (Google los usa para entender quién eres). */
export function siteJsonLd() {
  const url = personalInfo.siteUrl;
  const sameAs = [personalInfo.github, personalInfo.linkedin].filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${url}/#website`,
        url,
        name: personalInfo.name,
        description: personalInfo.description,
        inLanguage: 'es-PE',
        author: { '@id': `${url}/#person` },
      },
      {
        '@type': 'Person',
        '@id': `${url}/#person`,
        name: personalInfo.name,
        jobTitle: personalInfo.title,
        description: personalInfo.description,
        url,
        image: `${url}/opengraph-image`,
        ...(isPlaceholderEmail(personalInfo.email) ? {} : { email: `mailto:${personalInfo.email}` }),
        address: { '@type': 'PostalAddress', addressLocality: 'Lima', addressCountry: 'PE' },
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'Tecsup' },
        knowsAbout: skillGroups.flatMap((g) => g.items),
        sameAs,
      },
    ],
  };
}

/** Datos estructurados de un caso de estudio + migas de pan. */
export function projectJsonLd(slug: string) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return null;
  const url = personalInfo.siteUrl;
  const pageUrl = `${url}/projects/${project.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${pageUrl}#project`,
        name: project.title,
        headline: `${project.title} — ${project.category}`,
        description: project.longDescription,
        url: pageUrl,
        image: `${url}${project.images.desktop}`,
        dateCreated: project.year,
        genre: project.category,
        keywords: project.technologies.join(', '),
        inLanguage: 'es-PE',
        author: { '@id': `${url}/#person` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: url },
          { '@type': 'ListItem', position: 2, name: 'Proyectos', item: `${url}/projects` },
          { '@type': 'ListItem', position: 3, name: project.title, item: pageUrl },
        ],
      },
    ],
  };
}

/** Serializa JSON-LD de forma segura para meterlo en <script>. */
export const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');
