import { skillGroups } from '@/lib/data';
import Reveal from './fx/Reveal';
import Spotlight from './fx/Spotlight';

export default function SkillsGrid() {
  return (
    <Spotlight className="skills-grid">
      {skillGroups.map((group, i) => (
        <Reveal key={group.title} className="skill-card" delay={(i % 3) * 0.08}>
          <div className="skill-card__head">
            <h3 className="skill-card__title">{group.title}</h3>
            <span className="skill-card__num">{String(i + 1).padStart(2, '0')}</span>
          </div>
          <ul className="chips">
            {group.items.map((item) => (
              <li key={item} className="chip">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </Spotlight>
  );
}
