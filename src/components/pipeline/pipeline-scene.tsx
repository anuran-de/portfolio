"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PIPELINE_NODES, buildEdges } from "@/lib/pipeline";
import { Particles, type EdgeWorld } from "./particles";
import { Pipes, NodeMarkers } from "./scene-graph";

const WIDTH = 15;
const HEIGHT = 5.2;

function toWorld([x, y]: [number, number]) {
  return new THREE.Vector3((x - 0.5) * WIDTH, y * HEIGHT * 0.5, 0);
}

/**
 * The reusable pipeline scene (DESIGN.md §8). Ambient in the hero (pointer
 * parallax, slow drift); the same graph is reused scroll-scrubbed in the
 * section-02 pipeline. `reveal` gates how far records have filled the pipes.
 */
export function PipelineScene({
  reveal = 1,
  parallax = true,
}: {
  reveal?: number;
  parallax?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  // Track the pointer at the window level so parallax works even though the
  // backdrop sits behind the hero content with pointer-events disabled.
  useEffect(() => {
    if (!parallax) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [parallax]);

  const { edges, positions } = useMemo(() => {
    const normEdges = buildEdges(PIPELINE_NODES);
    const edges: EdgeWorld[] = normEdges.map((e) => ({
      p0: toWorld([e.from.x, e.from.y]),
      c1: toWorld(e.c1),
      c2: toWorld(e.c2),
      p1: toWorld([e.to.x, e.to.y]),
    }));
    const positions = PIPELINE_NODES.map((n) => toWorld([n.x, n.y]));
    return { edges, positions };
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    // Ambient breathing + subtle pointer parallax.
    const t = state.clock.elapsedTime;
    const px = parallax ? pointer.current.x : 0;
    const py = parallax ? pointer.current.y : 0;
    const g = group.current;
    g.rotation.y += (px * 0.18 - g.rotation.y) * 0.04;
    g.rotation.x += (py * 0.12 - g.rotation.x) * 0.04;
    g.position.y = Math.sin(t * 0.25) * 0.1;
  });

  return (
    <group ref={group}>
      <Pipes edges={edges} />
      <NodeMarkers positions={positions} />
      <Particles edges={edges} reveal={reveal} />
    </group>
  );
}
