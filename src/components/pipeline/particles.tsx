"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type EdgeWorld = {
  p0: THREE.Vector3;
  c1: THREE.Vector3;
  c2: THREE.Vector3;
  p1: THREE.Vector3;
};

const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uReveal;      // 0..1 — how far down the pipes records have filled
  uniform vec3 uP0[4];
  uniform vec3 uC1[4];
  uniform vec3 uC2[4];
  uniform vec3 uP1[4];

  attribute float aEdge;      // which pipe (0..3)
  attribute float aOffset;    // start position along the pipe (0..1)
  attribute float aSpeed;
  attribute float aSize;
  attribute float aSeed;

  varying float vT;           // progress along pipe
  varying float vFade;
  varying float vSeed;

  vec3 cubic(vec3 p0, vec3 c1, vec3 c2, vec3 p1, float t) {
    float u = 1.0 - t;
    return u*u*u*p0 + 3.0*u*u*t*c1 + 3.0*u*t*t*c2 + t*t*t*p1;
  }

  void main() {
    int e = int(aEdge + 0.5);
    vec3 p0, c1, c2, p1;
    for (int i = 0; i < 4; i++) {
      if (i == e) { p0 = uP0[i]; c1 = uC1[i]; c2 = uC2[i]; p1 = uP1[i]; }
    }

    // Advect: loop each record along its pipe over time.
    float t = fract(aOffset + uTime * aSpeed);
    vT = t;

    vec3 pos = cubic(p0, c1, c2, p1, t);
    // Gentle out-of-plane drift so the ribbon feels volumetric, not flat.
    pos.z += sin(uTime * 0.6 + aSeed * 6.2831) * 0.12;

    // Fade at the pipe seams (near t=0 / t=1) so records don't pop at nodes,
    // and gate by uReveal for the scroll-scrubbed "fill" in section 02.
    float seam = smoothstep(0.0, 0.08, t) * smoothstep(1.0, 0.92, t);
    float revealed = step(t, uReveal);
    vFade = seam * revealed;
    vSeed = aSeed;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aSize * uPixelRatio * (28.0 / -mv.z);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform vec3 uColorA;   // amber (source end)
  uniform vec3 uColorB;   // pale gold (serving end)
  uniform float uTime;

  varying float vT;
  varying float vFade;
  varying float vSeed;

  void main() {
    // Soft round sprite with a bright core and additive glow falloff.
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float core = smoothstep(0.5, 0.0, d);
    float glow = pow(core, 2.4);

    // Records brighten as they travel toward serving; subtle per-record pulse.
    vec3 col = mix(uColorA, uColorB, smoothstep(0.0, 1.0, vT));
    float pulse = 0.75 + 0.25 * sin(uTime * 3.0 + vSeed * 6.2831);

    float alpha = glow * vFade * pulse;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(col * (0.6 + glow), alpha);
  }
`;

export function Particles({
  edges,
  perEdge = 240,
  reveal = 1,
  size = 1,
}: {
  edges: EdgeWorld[];
  perEdge?: number;
  /** 0..1 fill for scroll-scrub; 1 = fully ambient */
  reveal?: number;
  size?: number;
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const revealRef = useRef(reveal);
  revealRef.current = reveal;

  const geometry = useMemo(() => {
    const count = edges.length * perEdge;
    const positions = new Float32Array(count * 3); // placeholder, moved in shader
    const aEdge = new Float32Array(count);
    const aOffset = new Float32Array(count);
    const aSpeed = new Float32Array(count);
    const aSize = new Float32Array(count);
    const aSeed = new Float32Array(count);

    // Deterministic PRNG so the field is stable across reloads (no hydration
    // flicker, no Math.random in render paths).
    let s = 1337;
    const rand = () => {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      return s / 0x7fffffff;
    };

    let i = 0;
    for (let e = 0; e < edges.length; e++) {
      for (let n = 0; n < perEdge; n++) {
        aEdge[i] = e;
        aOffset[i] = rand();
        aSpeed[i] = 0.03 + rand() * 0.05; // records/loop rate
        aSize[i] = 0.5 + rand() * 1.4;
        aSeed[i] = rand();
        i++;
      }
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aEdge", new THREE.BufferAttribute(aEdge, 1));
    g.setAttribute("aOffset", new THREE.BufferAttribute(aOffset, 1));
    g.setAttribute("aSpeed", new THREE.BufferAttribute(aSpeed, 1));
    g.setAttribute("aSize", new THREE.BufferAttribute(aSize, 1));
    g.setAttribute("aSeed", new THREE.BufferAttribute(aSeed, 1));
    return g;
  }, [edges, perEdge]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: size },
      uPixelRatio: { value: 1 },
      uReveal: { value: reveal },
      uP0: { value: edges.map((e) => e.p0) },
      uC1: { value: edges.map((e) => e.c1) },
      uC2: { value: edges.map((e) => e.c2) },
      uP1: { value: edges.map((e) => e.p1) },
      uColorA: { value: new THREE.Color("#e9b44c") },
      uColorB: { value: new THREE.Color("#f6d79a") },
    }),
    // edges/size are stable per-mount; reveal is driven imperatively below
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [edges],
  );

  useFrame((state) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value = state.clock.elapsedTime;
    m.uniforms.uPixelRatio.value = Math.min(state.gl.getPixelRatio(), 2);
    // Ease reveal toward its target for a smooth scrub.
    const u = m.uniforms.uReveal;
    u.value += (revealRef.current - u.value) * 0.1;
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
