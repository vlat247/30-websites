"use client";

import React, { useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// VERTEX SHADER
// ═══════════════════════════════════════════════════════════════════════════
const VERT = `#version 300 es
in vec2 aP;
void main(){ gl_Position = vec4(aP, 0.0, 1.0); }`;

// ═══════════════════════════════════════════════════════════════════════════
// FRAGMENT SHADER — flat 2D liquid distortion lens (no 3D, no highlights)
//
// Draws a noise-deformed white blob with feathered alpha.
// The canvas uses CSS mix-blend-mode: difference, so white → color inversion.
// A faint chromatic fringe at the border simulates liquid refraction.
// ═══════════════════════════════════════════════════════════════════════════
const FRAG = `#version 300 es
precision highp float;
out vec4 O;

uniform float uT;       // elapsed time (s)
uniform vec2  uM;       // cursor pos  (canvas px, Y-down)
uniform vec2  uV;       // velocity    (canvas px/s)
uniform vec2  uR;       // resolution  (canvas px)
uniform float uRad;     // base radius (canvas px)
uniform float uVis;     // visibility  0..1
uniform float uRT;      // ripple start time
uniform float uRA;      // ripple amplitude

/* ── Simplex 2D noise (Ashima Arts / Ian McEwan) ───────────────────── */
vec3 m289(vec3 x){ return x - floor(x/289.0)*289.0; }
vec2 m289(vec2 x){ return x - floor(x/289.0)*289.0; }
vec3 prm(vec3 x){ return m289(((x*34.0)+1.0)*x); }

float sn(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v,C.yy));
  vec2 x0 = v - i + dot(i,C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1,0) : vec2(0,1);
  vec4 x12 = x0.xyxy + C.xxzz;  x12.xy -= i1;  i = m289(i);
  vec3 p = prm(prm(i.y + vec3(0, i1.y, 1)) + i.x + vec3(0, i1.x, 1));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 xr = 2.0*fract(p*C.www) - 1.0;
  vec3 h = abs(xr) - 0.5;
  vec3 ox = floor(xr + 0.5);
  vec3 a0 = xr - ox;
  m *= 1.79284291400159 - 0.85373472095314*(a0*a0 + h*h);
  vec3 g; g.x = a0.x*x0.x + h.x*x0.y; g.yz = a0.yz*x12.xz + h.yz*x12.yw;
  return 130.0*dot(m,g);
}

/* ── Blob SDF (organic, never circular) ────────────────────────────── */
float blob(vec2 p){
  vec2 d = p - uM;
  float r = length(d);
  float th = atan(d.y, d.x);

  // Velocity-based trailing stretch (no rotation of axes)
  float spd = length(uV);
  if(spd > 5.0){
    float va = atan(uV.y, uV.x);
    float trail = -cos(th - va) * min(spd / 3000.0, 0.12);
    r /= (1.0 + trail);
  }

  // Surface-tension wobble (4 harmonics, irrational freq → never repeats)
  float w = sn(vec2(th*1.5 + uT*0.23, uT*0.170      ))*0.030
          + sn(vec2(th*2.7 - uT*0.31, uT*0.190 + 7.0 ))*0.022
          + sn(vec2(th*4.3 + uT*0.43, uT*0.290 + 13.0))*0.014
          + sn(vec2(th*6.1 - uT*0.17, uT*0.370 + 21.0))*0.007;

  // Breathing ±1-2 % (3 incommensurate sines)
  float b = sin(uT*0.73)*0.012 + sin(uT*1.17+2.0)*0.006 + sin(uT*1.73+5.0)*0.003;

  // Ripple from sudden acceleration
  float rip = 0.0;
  float age = uT - uRT;
  if(age > 0.0 && age < 0.7){
    float dc = 1.0 - age/0.7;
    rip = sin(r/uRad*12.0 - age*15.0)*dc*dc*uRA*0.010;
  }

  return r - uRad*(1.0 + w + b + rip);
}

/* ── Main ──────────────────────────────────────────────────────────── */
void main(){
  vec2 sc = vec2(gl_FragCoord.x, uR.y - gl_FragCoord.y);

  // Quick reject
  if(length(sc - uM) > uRad * 2.8){ O = vec4(0); return; }

  float dist = blob(sc);

  // ── Feathered alpha with steep falloff ──
  // Use pow() to make the transition near-binary: fully inverted inside,
  // fully transparent outside, with only a whisper-thin soft fringe.
  // This eliminates the visible white circumference that mix-blend-mode:difference
  // creates when alpha lingers in the 0.3–0.7 range.
  vec2  tc = sc - uM;
  float r  = length(tc) / uRad;
  float th = atan(tc.y, tc.x);

  float feather = uRad * 0.12;
  float edgeNoise = sn(vec2(th*3.0 + uT*0.4, uT*0.25 + 5.0)) * feather * 0.25;
  float rawAlpha = 1.0 - smoothstep(-feather + edgeNoise, feather*0.2 + edgeNoise, dist);
  float alpha = pow(rawAlpha, 2.5);   // steep curve: kills the gray fringe

  if(alpha < 0.001){ O = vec4(0); return; }

  // ── Base: white → full inversion via mix-blend-mode:difference ──
  vec3 col = vec3(1.0);

  // ── Very faint chromatic tint near the rim ──
  float edge = smoothstep(0.70, 0.95, r);
  vec2 nDir = normalize(tc + vec2(0.001));
  col.r -= edge * 0.03 * (0.5 + 0.5*nDir.x);
  col.b -= edge * 0.03 * (0.5 - 0.5*nDir.x);

  O = vec4(col, alpha * uVis);
}
`;

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function CursorBubble() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const cvs = ref.current;
    if (!cvs) return;

    const dpr = window.devicePixelRatio || 1;
    const gl = cvs.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
    });
    if (!gl) return;

    gl.clearColor(0, 0, 0, 0);

    /* ── compile shaders ───────────────────────────────────────────── */
    const mk = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("Shader:", gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = mk(gl.VERTEX_SHADER, VERT);
    const fs = mk(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prg = gl.createProgram()!;
    gl.attachShader(prg, vs);
    gl.attachShader(prg, fs);
    gl.linkProgram(prg);
    if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
      console.error("Link:", gl.getProgramInfoLog(prg));
      return;
    }
    gl.useProgram(prg);

    /* ── fullscreen quad ───────────────────────────────────────────── */
    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    const vbo = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aP = gl.getAttribLocation(prg, "aP");
    gl.enableVertexAttribArray(aP);
    gl.vertexAttribPointer(aP, 2, gl.FLOAT, false, 0, 0);

    /* ── uniform locations ─────────────────────────────────────────── */
    const U = Object.fromEntries(
      ["uT", "uM", "uV", "uR", "uRad", "uVis", "uRT", "uRA"].map((n) => [
        n,
        gl.getUniformLocation(prg, n),
      ]),
    ) as Record<string, WebGLUniformLocation | null>;

    /* ── state ─────────────────────────────────────────────────────── */
    let tx = 0,  ty = 0;               // target mouse pos (CSS px)
    let px = 0,  py = 0;               // smoothed pos
    let vx = 0,  vy = 0;               // velocity
    let pvx = 0, pvy = 0;              // prev velocity (for accel)
    let mouseOn = false;
    let vis = 0;
    let ripT = -100, ripA = 0;
    const t0 = performance.now();
    let lastT = t0;
    let raf = 0;
    let alive = true;

    /* ── mouse events ──────────────────────────────────────────────── */
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!mouseOn) { px = tx; py = ty; mouseOn = true; }
    };
    const onLeave = () => { mouseOn = false; };
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    /* ── render loop ───────────────────────────────────────────────── */
    const SPRING = 450, DAMP = 28;
    const RAD_CSS = 35;

    const loop = (now: number) => {
      if (!alive) return;
      raf = requestAnimationFrame(loop);

      const dt = Math.min((now - lastT) / 1000, 0.033);
      lastT = now;
      const t = (now - t0) / 1000;

      // Spring-damper physics
      vx += (SPRING * (tx - px) - DAMP * vx) * dt;
      vy += (SPRING * (ty - py) - DAMP * vy) * dt;
      px += vx * dt;
      py += vy * dt;

      // Ripple on sudden direction change
      const dvx = vx - pvx, dvy = vy - pvy;
      const accel = Math.sqrt(dvx * dvx + dvy * dvy) / Math.max(dt, 0.001);
      if (accel > 5000) {
        ripT = t;
        ripA = Math.min(accel / 20000, 1.0);
      }
      pvx = vx;
      pvy = vy;

      // Smooth visibility
      vis += ((mouseOn ? 1 : 0) - vis) * Math.min(dt * 10, 1);

      // Resize canvas
      const cw = Math.round(window.innerWidth * dpr);
      const ch = Math.round(window.innerHeight * dpr);
      if (cvs.width !== cw || cvs.height !== ch) {
        cvs.width = cw;
        cvs.height = ch;
        gl.viewport(0, 0, cw, ch);
      }

      // Draw
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(U.uT, t);
      gl.uniform2f(U.uM, px * dpr, py * dpr);
      gl.uniform2f(U.uV, vx * dpr, vy * dpr);
      gl.uniform2f(U.uR, cw, ch);
      gl.uniform1f(U.uRad, RAD_CSS * dpr);
      gl.uniform1f(U.uVis, vis);
      gl.uniform1f(U.uRT, ripT);
      gl.uniform1f(U.uRA, ripA);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    raf = requestAnimationFrame(loop);

    /* ── cleanup ───────────────────────────────────────────────────── */
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      gl.deleteProgram(prg);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(vbo);
      gl.deleteVertexArray(vao);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "difference",
      }}
    />
  );
}
