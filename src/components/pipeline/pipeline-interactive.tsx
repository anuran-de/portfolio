"use client";

import { Canvas } from "@react-three/fiber";
import { InteractiveScene } from "./interactive-scene";

/**
 * WebGL layer for the section-02 interactive pipeline. Camera pulled back
 * slightly from the hero so every stage stays in frame. `revealRef` is driven
 * imperatively by scroll; `activeIndex` lights nodes as the flow reaches them.
 */
export default function PipelineInteractive({
  revealRef,
  activeIndex,
  onNodeClick,
}: {
  revealRef: { current: number };
  activeIndex: number;
  onNodeClick: (id: string) => void;
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 12], fov: 42 }}
      style={{ width: "100%", height: "100%" }}
    >
      <InteractiveScene
        revealRef={revealRef}
        activeIndex={activeIndex}
        onNodeClick={onNodeClick}
      />
    </Canvas>
  );
}
