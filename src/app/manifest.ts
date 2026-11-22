import type { MetadataRoute } from 'next';
import { personalInfo } from '@/lib/data';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${personalInfo.name} — ${personalInfo.title}`,
    short_name: personalInfo.firstName,
    description: personalInfo.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0b',
    theme_color: '#0a0a0b',
    lang: 'es-PE',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
