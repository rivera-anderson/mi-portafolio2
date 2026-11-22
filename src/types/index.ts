export type ProjectArtVariant = 'sun' | 'clip' | 'museum';

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  year: string;
  role: string;
  technologies: string[];
  highlights: string[];
  color: string;
  art: ProjectArtVariant;
  /** Capturas del proyecto (en /public). Puedes reemplazarlas por screenshots reales. */
  images: {
    desktop: string;
    mobile: string;
  };
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Service {
  title: string;
  description: string;
}

export interface Metadata {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  ogImage?: string;
}
