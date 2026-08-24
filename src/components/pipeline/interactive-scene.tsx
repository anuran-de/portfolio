"use client";

import { useMemo, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { PIPELINE_NODES, buildEdges, type PipelineNode } from "@/lib/pipeline";
import { Particles, type EdgeWorld } from "./particles";
import { Pipes } from "./scene-graph";

const WIDTH = 15;
const HEIGHT = 5.2;

function toWorld([x, y]: [number, number]) {
  return new THREE.Vector3((x - 0.5) * WIDTH, y * HEIGHT * 0.5, 0);
}

/**
 * A single interactive stage: crisp marker + a mono label that carries the
 * real role and throughput. Dim until the scroll-driven flow reaches it, then
 * amber; hovering springs the full detail card in.
 */
function Node({
  node,
  position,
  reached,
}: {
  node: PipelineNode;
  position: THREE.Vector3;
  reached: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const ring = useMemo(() => new THREE.RingGeometry(0.16, 0.185, 48), []);
  const glow = useMemo(() => new THREE.CircleGeometry(0.34, 32), []);

  const active = reached || hovered;
  // Label sits on the side the node leans toward so it clears the pipes.
  const above = node.y >= 0;

  return (
    <group position={position}>
      {/* soft glow — brightens once reached */}
      <mesh geometry={glow}>
        <meshBasicMaterial
          color="#e9b44c"
          transparent
          opacity={active ? 0.22 : 0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* crisp ring */}
      <mesh geometry={ring}>
        <meshBasicMaterial
          color={active ? "#e9b44c" : "#565b61"}
          transparent
          opacity={active ? 0.95 : 0.6}
          depthWrite={false}
        />
      </mesh>
      {/* core dot */}
      <mesh>
        <circleGeometry args={[0.05, 16]} />
        <meshBasicMaterial color={active ? "#f6d79a" : "#9ba1a6"} />
      </mesh>

      {/* invisible hit target (larger than the marker) */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "";
        }}
      >
        <circleGeometry args={[0.5, 24]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Mono label card, drei Html so it tracks the node in screen space */}
      <Html
        position={[0, above ? 0.5 : -0.5, 0]}
        center
        distanceFactor={undefined}
        style={{ pointerEvents: "none" }}
        zIndexRange={[20, 0]}
      >
        <div
          className={`pf-node ${active ? "is-active" : ""} ${
            hovered ? "is-hovered" : ""
          } ${above ? "is-above" : "is-below"}`}
        >
          <span className="pf-node-name">{node.name}</span>
          <span className="pf-node-detail">
            <span className="pf-node-role">{node.role}</span>
            <span className="pf-node-metric">{node.metric}</span>
          </span>
        </div>
      </Html>
    </group>
  );
}

/**
 * The interactive pipeline scene (DESIGN.md §6.03 / §8, section-02 mode): the
 * same bezier topology and GLSL record-stream as the hero, but scroll-scrubbed
 * and with hoverable, labeled nodes. Scales to fit any viewport width.
 */
export function InteractiveScene({
  revealRef,
  activeIndex,
}: {
  revealRef: { current: number };
  activeIndex: number;
}) {
  const { viewport } = useThree();
  // Keep the whole graph (plus label margins) on screen at any aspect ratio.
  const scale = Math.min(1, viewport.width / 17);

  const { edges, nodes } = useMemo(() => {
    const normEdges = buildEdges(PIPELINE_NODES);
    const edges: EdgeWorld[] = normEdges.map((e) => ({
      p0: toWorld([e.from.x, e.from.y]),
      c1: toWorld(e.c1),
      c2: toWorld(e.c2),
      p1: toWorld([e.to.x, e.to.y]),
    }));
    const nodes = PIPELINE_NODES.map((n) => ({
      node: n,
      position: toWorld([n.x, n.y]),
    }));
    return { edges, nodes };
  }, []);

  return (
    <group scale={scale}>
      <Pipes edges={edges} />
      <Particles edges={edges} revealTarget={revealRef} />
      {nodes.map(({ node, position }, i) => (
        <Node
          key={node.id}
          node={node}
          position={position}
          reached={i <= activeIndex}
        />
      ))}
    </group>
  );
}
