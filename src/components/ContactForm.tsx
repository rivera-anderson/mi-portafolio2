'use client';

import { useState, type FormEvent } from 'react';
import Magnetic from './fx/Magnetic';

const TYPES = ['Sitio web', 'App móvil', 'Producto con IA', 'Backend / API', 'Otro'];

/** Formulario que arma el correo y lo abre en la app de email del visitante (no necesita backend). */
export default function ContactForm({ email, toName }: { email: string; toName: string }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const toggle = (type: string) =>
    setSelected((s) => (s.includes(type) ? s.filter((t) => t !== type) : [...s, type]));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const from = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const subject = `Nuevo proyecto — ${name}`;
    const body = [
      `Hola ${toName},`,
      '',
      message,
      '',
      `Tipo de proyecto: ${selected.length ? selected.join(', ') : 'Sin especificar'}`,
      '',
      `— ${name}`,
      from,
    ].join('\n');
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <div className="field">
        <input id="name" name="name" type="text" placeholder=" " required autoComplete="name" />
        <label htmlFor="name">¿Cómo te llamas?</label>
      </div>
      <div className="field">
        <input id="email" name="email" type="email" placeholder=" " required autoComplete="email" />
        <label htmlFor="email">Tu email</label>
      </div>

      <fieldset>
        <legend className="label mb-4">¿Qué quieres construir?</legend>
        <div className="flex flex-wrap gap-3">
          {TYPES.map((type) => (
            <button
              key={type}
              type="button"
              className="choice"
              aria-pressed={selected.includes(type)}
              onClick={() => toggle(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <textarea id="message" name="message" rows={4} placeholder=" " required />
        <label htmlFor="message">Cuéntame tu idea</label>
      </div>

      <div className="flex flex-wrap items-center gap-8 pt-4">
        <Magnetic strength={0.4}>
          <button type="submit" className="send-btn" data-cursor="Enviar">
            Enviar ↗
          </button>
        </Magnetic>
        <p className="label max-w-[30ch]" aria-live="polite">
          {sent ? '¡Listo! Se abrió tu app de correo con el mensaje armado.' : 'Al enviar se abrirá tu app de correo con el mensaje listo.'}
        </p>
      </div>
    </form>
  );
}
