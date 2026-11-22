import Link from 'next/link';
import Magnetic from '@/components/fx/Magnetic';

export default function NotFound() {
  return (
    <section className="page-hero container-x flex min-h-[80vh] flex-col justify-center">
      <span className="label">Error 404</span>
      <h1 className="page-hero__title display">
        Perdido<span className="serif-i text-sun">.</span>
      </h1>
      <p className="page-hero__sub mb-12">Esta página no existe, pero mis proyectos sí.</p>
      <div>
        <Magnetic>
          <Link href="/" className="btn-pill btn-fill btn-pill--lg">
            ← Volver al inicio
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
