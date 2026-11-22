/** Texto circular que gira alrededor de un botón. */
export default function RotatingBadge({ text }: { text: string }) {
  return (
    <svg className="rotating-badge" viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
      </defs>
      <text>
        <textPath href="#badge-circle" textLength="488" lengthAdjust="spacing">
          {text}
        </textPath>
      </text>
    </svg>
  );
}
