'use client';

/** Se vuelve a montar en cada navegación: cortina naranja + entrada suave de la página. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="curtain" aria-hidden="true" />
      <div className="page-enter">{children}</div>
    </>
  );
}
