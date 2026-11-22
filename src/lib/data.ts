import { Project, Service, SkillGroup } from '@/types';

/**
 * URL pública del sitio (la usan el SEO, el sitemap y el robots.txt).
 * 1) NEXT_PUBLIC_SITE_URL si la defines tú en Vercel.
 * 2) Si no, Vercel la pone sola: tu dominio propio (o el .vercel.app si aún no tienes).
 * 3) En tu PC: http://localhost:3000
 */
function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return 'http://localhost:3000';
}

export const personalInfo = {
  name: 'Anderson Rivera',
  firstName: 'Anderson',
  lastName: 'Rivera',
  title: 'Desarrollador Full Stack',
  description:
    'Desarrollador full stack y estudiante de Tecsup. Construyo productos web, móviles y con IA: desde microservicios resilientes hasta interfaces que se sienten vivas.',
  location: 'Lima, Perú',
  email: 'riveraanderson946@gmail.com',
  github: 'https://github.com/rivera-anderson',
  // Pega aquí tu perfil cuando lo tengas (si queda vacío, el link no aparece en la web).
  linkedin: '',
  siteUrl: getSiteUrl(),
};

export const projects: Project[] = [
  {
    slug: 'intifix',
    images: {
      desktop: '/projects/intifix-desktop.svg',
      mobile: '/projects/intifix-mobile.svg',
    },
    title: 'IntiFix',
    description:
      'Plataforma que conecta a clientes con técnicos de confianza para reparaciones del hogar.',
    longDescription:
      'IntiFix resuelve un problema de todos los días: encontrar a un técnico confiable cuando algo se malogra en casa. La plataforma une a clientes y técnicos en un solo flujo —buscar, solicitar, coordinar y calificar— y está respaldada por una investigación de mercado que validó el modelo antes de escribir la primera línea de código.',
    category: 'Plataforma de servicios',
    year: '2026',
    role: 'Full Stack · Producto',
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    highlights: [
      'Búsqueda de técnicos por especialidad y zona',
      'Flujo completo de solicitud, coordinación y seguimiento del servicio',
      'Perfiles con calificaciones y reseñas para generar confianza',
      'Modelo de negocio validado con investigación de mercado',
    ],
    color: '#ff5b1f',
    art: 'sun',
    featured: true,
  },
  {
    slug: 'autoclipper',
    images: {
      desktop: '/projects/autoclipper-desktop.svg',
      mobile: '/projects/autoclipper-mobile.svg',
    },
    title: 'AutoClipper',
    description:
      'IA que convierte videos de horas en clips verticales listos para redes sociales.',
    longDescription:
      'AutoClipper toma un video largo —un stream, un podcast, una clase de hasta 10 horas y decenas de GB— y encuentra sus mejores momentos con IA. Los recorta en formato vertical, quita las muletillas, agrega subtítulos dinámicos y puede sumar un fondo de gameplay para retener la atención. La meta: estar a la altura de herramientas como OpusClip.',
    category: 'Producto con IA',
    year: '2026',
    role: 'Full Stack · IA',
    technologies: ['Python', 'OpenAI API', 'FFmpeg', 'React', 'Node.js'],
    highlights: [
      'Procesa videos de hasta 10 horas y muchos GB',
      'Detección automática de los mejores momentos con IA',
      'Eliminación de muletillas y subtítulos dinámicos',
      'Fondo de gameplay generado para retener la atención',
    ],
    color: '#a855f7',
    art: 'clip',
    featured: true,
  },
  {
    slug: 'museo-infinito',
    images: {
      desktop: '/projects/museo-infinito-desktop.svg',
      mobile: '/projects/museo-infinito-mobile.svg',
    },
    title: 'Museo Infinito',
    description:
      'Experiencia web inmersiva: un museo virtual que se genera sin fin mientras lo recorres.',
    longDescription:
      'Museo Infinito replantea cómo se recorre una galería en la web. En lugar de una lista de imágenes, el visitante avanza por salas que se generan de forma continua, con obras, luz y transiciones que nunca se repiten igual. Un proyecto para explorar el límite entre desarrollo web, diseño y arte.',
    category: 'Experiencia inmersiva',
    year: '2026',
    role: 'Creative Developer',
    technologies: ['React', 'Three.js', 'WebGL', 'TypeScript'],
    highlights: [
      'Salas generadas de forma continua e infinita',
      'Navegación inmersiva con transiciones fluidas',
      'Iluminación y composición pensadas para cada obra',
      'Optimizado para correr fluido en el navegador',
    ],
    color: '#3b82f6',
    art: 'museum',
    featured: true,
  },
];

export const skillGroups: SkillGroup[] = [
  { title: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML & CSS'] },
  { title: 'Backend', items: ['Node.js', 'Express', 'Java', 'Spring Boot', 'Python'] },
  {
    title: 'Arquitectura',
    items: ['Microservicios', 'Sistemas distribuidos', 'Spring Cloud', 'Resilience4j', 'APIs REST'],
  },
  { title: 'Móvil', items: ['Swift', 'SwiftUI', 'Xcode', 'iOS'] },
  { title: 'Datos & IA', items: ['PostgreSQL', 'MongoDB', 'OpenAI API', 'FFmpeg'] },
  { title: 'DevOps & Tools', items: ['Git & GitHub', 'Docker', 'Vercel', 'Postman'] },
];

export const services: Service[] = [
  {
    title: 'Desarrollo web',
    description:
      'Sitios y aplicaciones con Next.js y React: rápidos, accesibles y con SEO desde el primer día.',
  },
  {
    title: 'Arquitectura backend',
    description:
      'APIs y microservicios resilientes, con patrones como Circuit Breaker, Retry y Bulkhead.',
  },
  {
    title: 'Apps móviles',
    description: 'Aplicaciones iOS nativas con Swift y SwiftUI, cuidando cada interacción.',
  },
  {
    title: 'Productos con IA',
    description:
      'Integro modelos de IA para automatizar tareas reales, como convertir horas de video en clips.',
  },
];

export const marqueeWords = [
  'Next.js',
  'React',
  'TypeScript',
  'Node.js',
  'Spring Boot',
  'Microservicios',
  'Swift',
  'Python',
  'PostgreSQL',
  'Docker',
  'OpenAI',
  'Tailwind CSS',
];
