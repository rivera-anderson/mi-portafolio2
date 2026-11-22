import type { CSSProperties } from 'react';
import type { Project } from '@/types';

const WAVE = [0.4, 0.7, 0.55, 0.9, 0.35, 0.8, 1, 0.6, 0.45, 0.85, 0.5, 0.95, 0.3, 0.75, 0.6, 0.9, 0.4, 0.65, 0.85, 0.5, 0.7, 0.35, 0.8, 0.55];

/** Ilustración animada en CSS puro para cada proyecto (no necesita imágenes). */
export default function ProjectArt({ project }: { project: Project }) {
  const style = { '--c': project.color } as CSSProperties;
  const tag = `${project.title} — ${project.category}`;

  if (project.art === 'sun') {
    return (
      <div className="art art--sun" style={style} aria-hidden="true">
        <div className="art__grid" />
        <div className="art-sun__rays" />
        <div className="art-sun__core" />
        <div className="art-sun__horizon" />
        <div className="art-ui art-ui--a">
          <span className="art-ui__dot" />
          Técnico en camino · 12 min
        </div>
        <div className="art-ui art-ui--b">★ 4.9 · Gasfitería</div>
        <span className="art__tag">{tag}</span>
      </div>
    );
  }

  if (project.art === 'clip') {
    return (
      <div className="art art--clip" style={style} aria-hidden="true">
        <div className="art__grid" />
        <div className="art-clip__rec">
          <i />
          REC · 10:00:00
        </div>
        <div className="art-clip__stage">
          {[0, 1, 2].map((i) => (
            <div key={i} className="art-clip__phone" style={{ '--i': i } as CSSProperties}>
              <div className="art-clip__cap">
                <i />
                <i />
              </div>
            </div>
          ))}
        </div>
        <div className="art-clip__wave">
          {WAVE.map((h, i) => (
            <i key={i} style={{ '--i': i, '--h': h } as CSSProperties} />
          ))}
        </div>
        <div className="art-clip__playhead" />
        <span className="art__tag">{tag}</span>
      </div>
    );
  }

  return (
    <div className="art art--museum" style={style} aria-hidden="true">
      <div className="art-museum__glow" />
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="art-museum__frame" style={{ '--i': i } as CSSProperties}>
          <span />
          <span />
        </div>
      ))}
      <span className="art__tag">{tag}</span>
    </div>
  );
}
