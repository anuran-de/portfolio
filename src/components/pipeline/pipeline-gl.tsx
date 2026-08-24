"use client";

import { Canvas } from "@react-three/fiber";
import { PipelineScene } from "./pipeline-scene";

/**
 * WebGL layer only. Imported dynamically with `ssr: false` so Three never runs
 * on the server. dpr is capped and the scene pauses off-screen via the caller.
 */
export default function PipelineGL({
  reveal = 1,
  parallax = true,
}: {
  reveal?: number;
  parallax?: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 11], fov: 42 }}
      style={{ width: "100%", height: "100%" }}
    >
      <PipelineScene reveal={reveal} parallax={parallax} />
    </Canvas>
  );
}
