"use client";

import { useMemo } from "react";
import * as THREE from "three";
import type { EdgeWorld } from "./particles";

/**
 * Faint hairline pipes — the bezier paths the records flow along, drawn dim so
 * the amber particles read as the signal and the pipes as the substrate.
 */
export function Pipes({ edges }: { edges: EdgeWorld[] }) {
  const geometries = useMemo(
    () =>
      edges.map((e) => {
        const curve = new THREE.CubicBezierCurve3(e.p0, e.c1, e.c2, e.p1);
        const pts = curve.getPoints(64);
        return new THREE.BufferGeometry().setFromPoints(pts);
      }),
    [edges],
  );

  return (
    <group>
      {geometries.map((g, i) => (
        <primitive
          key={i}
          object={
            new THREE.Line(
              g,
              new THREE.LineBasicMaterial({
                color: "#e9b44c",
                transparent: true,
                opacity: 0.14,
              }),
            )
          }
        />
      ))}
    </group>
  );
}

/**
 * Node markers — a crisp amber ring plus a soft additive glow at each stage.
 * Backdrop mode: no labels (they'd fight the hero headline); the interactive
 * labeled version lives in the section-02 pipeline (next build step).
 */
export function NodeMarkers({
  positions,
}: {
  positions: THREE.Vector3[];
}) {
  const ring = useMemo(() => new THREE.RingGeometry(0.16, 0.185, 48), []);
  const glow = useMemo(() => new THREE.CircleGeometry(0.34, 32), []);

  return (
    <group>
      {positions.map((p, i) => (
        <group key={i} position={p}>
          {/* soft glow */}
          <mesh geometry={glow}>
            <meshBasicMaterial
              color="#e9b44c"
              transparent
              opacity={0.08}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          {/* crisp ring */}
          <mesh geometry={ring}>
            <meshBasicMaterial
              color="#f6d79a"
              transparent
              opacity={0.7}
              depthWrite={false}
            />
          </mesh>
          {/* core dot */}
          <mesh>
            <circleGeometry args={[0.05, 16]} />
            <meshBasicMaterial color="#f6d79a" transparent opacity={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
