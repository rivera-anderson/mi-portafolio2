import { ImageResponse } from 'next/og';
import { personalInfo } from '@/lib/data';

export const alt = `${personalInfo.name} — ${personalInfo.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Imagen que aparece al compartir el link en WhatsApp, LinkedIn, X, etc. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0a0b',
          color: '#ece7df',
          padding: '64px 72px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -180,
            top: -180,
            width: 640,
            height: 640,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(255,91,31,0.9), rgba(255,91,31,0) 70%)',
            display: 'flex',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, letterSpacing: 4, color: '#8b867e' }}>
          <span>PORTAFOLIO</span>
          <span>{personalInfo.location.toUpperCase()}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 160, fontWeight: 700, letterSpacing: -8, lineHeight: 0.9 }}>
            {personalInfo.firstName}
          </div>
          <div style={{ display: 'flex', fontSize: 160, fontWeight: 700, letterSpacing: -8, lineHeight: 0.9, color: '#ff5b1f' }}>
            {personalInfo.lastName}
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 30 }}>{personalInfo.title} · Web · Móvil · IA</div>
      </div>
    ),
    size,
  );
}
