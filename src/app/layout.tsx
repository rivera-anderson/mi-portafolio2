import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cursor from '@/components/fx/Cursor';
import Preloader from '@/components/fx/Preloader';
import ScrollProgress from '@/components/fx/ScrollProgress';
import { personalInfo } from '@/lib/data';
import { siteJsonLd, toJsonLd } from '@/lib/seo';

const fullTitle = `${personalInfo.name} — ${personalInfo.title}`;

export const viewport: Viewport = {
  themeColor: '#0a0a0b',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL(personalInfo.siteUrl),
  title: {
    default: fullTitle,
    template: `%s | ${personalInfo.name}`,
  },
  description: personalInfo.description,
  applicationName: personalInfo.name,
  keywords: [
    personalInfo.name,
    'desarrollador full stack',
    'desarrollador web Lima',
    'portafolio',
    'next.js',
    'react',
    'typescript',
    'microservicios',
    'swift',
    'inteligencia artificial',
  ],
  authors: [{ name: personalInfo.name, url: personalInfo.siteUrl }],
  creator: personalInfo.name,
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: personalInfo.siteUrl,
    title: fullTitle,
    description: personalInfo.description,
    siteName: personalInfo.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: fullTitle,
    description: personalInfo.description,
  },
  // Google Search Console: en Vercel crea la variable GOOGLE_SITE_VERIFICATION con tu código.
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Fuentes: Inter Tight (títulos y texto), Instrument Serif (itálicas) y JetBrains Mono (etiquetas). */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@100..900&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap"
        />
        {/* Activa las animaciones solo si hay JavaScript (si no, todo se ve normal). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <div id="top" />
        <Preloader name={personalInfo.name} />
        <ScrollProgress />
        <Cursor />
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        <main>{children}</main>
        <Footer />
        <div className="grain" aria-hidden="true" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(siteJsonLd()) }}
        />
      </body>
    </html>
  );
}
