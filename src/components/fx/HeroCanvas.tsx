'use client';

import { useEffect, useRef, useState } from 'react';

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

// Fondo líquido: ruido simplex con "domain warping" (lava naranja/morada) que reacciona al mouse.
const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}
float noise(vec2 p) {
  const float K1 = 0.366025404;
  const float K2 = 0.211324865;
  vec2 i = floor(p + (p.x + p.y) * K1);
  vec2 a = p - i + (i.x + i.y) * K2;
  float m = step(a.y, a.x);
  vec2 o = vec2(m, 1.0 - m);
  vec2 b = a - o + K2;
  vec2 c = a - 1.0 + 2.0 * K2;
  vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
  vec3 n = h * h * h * h * vec3(dot(a, hash(i)), dot(b, hash(i + o)), dot(c, hash(i + 1.0)));
  return dot(n, vec3(70.0));
}
float fbm(vec2 p) {
  float f = 0.0;
  float a = 0.5;
  float t = 0.0;
  for (int i = 0; i < 3; i++) {
    f += a * (0.5 + 0.5 * noise(p));
    t += a;
    p = vec2(1.7 * p.x + 1.1 * p.y + 3.1, -1.1 * p.x + 1.7 * p.y + 1.7);
    a *= 0.5;
  }
  return f / t;
}
void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec2 m = (uMouse - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  float t = uTime * 0.04;
  float d = length(p - m);
  vec2 s = p * 0.55;
  vec2 q = vec2(fbm(s + vec2(t * 0.4, -t * 0.1)), fbm(s + vec2(5.2 - t * 0.2, 1.3 + t * 0.3)));
  float mm = exp(-d * d * 5.0);
  vec2 r = vec2(
    fbm(s + 2.6 * q + vec2(1.7 + 0.2 * t + 0.3 * mm, 9.2)),
    fbm(s + 2.6 * q + vec2(8.3, 2.8 - 0.15 * t - 0.3 * mm))
  );
  float f = fbm(s + 2.6 * r);

  vec3 ink = vec3(0.039, 0.039, 0.043);
  vec3 deep = vec3(0.07, 0.03, 0.09);
  vec3 plum = vec3(0.24, 0.06, 0.22);
  vec3 sun = vec3(1.0, 0.38, 0.12);
  vec3 gold = vec3(1.0, 0.82, 0.6);

  vec3 col = mix(deep, plum, smoothstep(0.25, 0.6, f));
  col = mix(col, sun, smoothstep(0.5, 0.8, f) * smoothstep(0.35, 0.75, r.x));
  col = mix(col, gold, smoothstep(0.72, 0.95, f) * 0.6);
  col += sun * mm * 0.22;

  float vig = 1.0 - smoothstep(0.1, 1.3, length(p * vec2(0.7, 1.0)));
  col = mix(ink, col, vig);
  col = mix(col, ink, smoothstep(0.4, 1.0, 1.0 - uv.y) * 0.5);
  col = mix(col, ink, (1.0 - smoothstep(-0.9, 0.2, p.x)) * 0.25);

  float g = fract(sin(dot(gl_FragCoord.xy + fract(uTime) * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
  col += (g - 0.5) * 0.03;
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

/** Canvas WebGL a pantalla completa detrás del hero. Si no hay WebGL, queda el degradado CSS. */
export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    const hero = canvas?.parentElement;
    if (!canvas || !hero) return;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uMouse = gl.getUniformLocation(prog, 'uMouse');

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const QUALITY = 0.5; // se renderiza a menor resolución: el líquido es suave y se ve igual
    let target = { x: 0.72, y: 0.62 };
    const mouse = { x: 0.72, y: 0.62 };
    let raf = 0;
    let visible = true;
    const start = performance.now() - 20000;

    const resize = () => {
      const w = Math.max(1, Math.floor(hero.clientWidth * QUALITY));
      const h = Math.max(1, Math.floor(hero.clientHeight * QUALITY));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    const draw = (now: number) => {
      mouse.x += (target.x - mouse.x) * 0.05;
      mouse.y += (target.y - mouse.y) * 0.05;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now: number) => {
      draw(now);
      raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const play = () => {
      if (!raf && !reduce) raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      target = { x: (e.clientX - r.left) / r.width, y: 1 - (e.clientY - r.top) / r.height };
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
    });
    const onVis = () => {
      if (!document.hidden) play();
    };
    let sraf = 0;
    const onScroll = () => {
      if (sraf) return;
      sraf = requestAnimationFrame(() => {
        sraf = 0;
        const p = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight));
        hero.style.setProperty('--hp', p.toFixed(3));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    resize();
    draw(performance.now());
    setReady(true);
    play();
    io.observe(hero);
    window.addEventListener('resize', resize);
    hero.addEventListener('pointermove', onMove);
    document.addEventListener('visibilitychange', onVis);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      hero.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(sraf);
    };
  }, []);

  return <canvas ref={ref} className={`hero-canvas ${ready ? 'is-ready' : ''}`} aria-hidden="true" />;
}
