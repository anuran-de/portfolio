/**
 * Pipeline topology (DESIGN.md §8) — the single source of truth shared by the
 * WebGL scene and the static SVG fallback so both draw the *same* architecture:
 *
 *   Postgres → CDC → PySpark/Databricks → Delta Lake → API
 *
 * Numbers are real (PROFILE.md §5). Positions are authored in a normalized
 * space and mapped into 3D world units and 2D SVG coordinates by the consumers.
 */

export type PipelineNode = {
  id: string;
  /** Short display name */
  name: string;
  /** Role / stage descriptor */
  role: string;
  /** The real metric this stage carries */
  metric: string;
  /** Normalized x across the flow, 0 (source) → 1 (serving) */
  x: number;
  /** Normalized y offset, -1 (down) → 1 (up), 0 = centerline */
  y: number;
};

export const PIPELINE_NODES: PipelineNode[] = [
  { id: "postgres", name: "Postgres", role: "Source · OLTP", metric: "40+ API credentials", x: 0.0, y: 0.35 },
  { id: "cdc", name: "CDC", role: "Change Data Capture", metric: "real-time sync", x: 0.26, y: -0.4 },
  { id: "spark", name: "PySpark · Databricks", role: "Transform", metric: "30+ pipelines", x: 0.52, y: 0.45 },
  { id: "delta", name: "Delta Lake", role: "Lakehouse", metric: "12M+ records / day", x: 0.76, y: -0.3 },
  { id: "api", name: "API", role: "Serving · StarGate", metric: "50K req/day · <100ms P95", x: 1.0, y: 0.25 },
];

/** One flow segment between two consecutive nodes, as a cubic bezier. */
export type PipelineEdge = {
  from: PipelineNode;
  to: PipelineNode;
  /** Cubic control points in normalized space [x, y] */
  c1: [number, number];
  c2: [number, number];
};

/**
 * Build cubic-bezier edges between consecutive nodes. Control points pull the
 * path horizontally toward each other and lift toward the midline so the flow
 * reads as smooth "pipes" rather than straight wires.
 */
export function buildEdges(nodes = PIPELINE_NODES): PipelineEdge[] {
  const edges: PipelineEdge[] = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    const from = nodes[i];
    const to = nodes[i + 1];
    const dx = to.x - from.x;
    edges.push({
      from,
      to,
      // Ease horizontally, damp the vertical swing at the control points
      c1: [from.x + dx * 0.45, from.y * 0.35],
      c2: [to.x - dx * 0.45, to.y * 0.35],
    });
  }
  return edges;
}

/** Evaluate a cubic bezier at t∈[0,1] in normalized space. */
export function cubicAt(
  p0: [number, number],
  c1: [number, number],
  c2: [number, number],
  p1: [number, number],
  t: number,
): [number, number] {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return [
    a * p0[0] + b * c1[0] + c * c2[0] + d * p1[0],
    a * p0[1] + b * c1[1] + c * c2[1] + d * p1[1],
  ];
}
