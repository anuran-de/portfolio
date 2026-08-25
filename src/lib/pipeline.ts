/**
 * The journey as a pipeline (DESIGN.md §8) — the conceit of section 02: Anuran
 * *is* the data, flowing through the stages that shaped him. School → High
 * School → WEBEL → Maersk (Intern) → Maersk (ASE). The same topology drives the
 * WebGL scene and the static SVG fallback so both draw the identical path, and
 * every node carries a mini "artifact" with the story behind that stage.
 *
 * Positions are authored in a normalized space and mapped into 3D world units
 * and 2D SVG coordinates by the consumers.
 */

export type JourneyArtifact = {
  /** One-line headline for the artifact card */
  headline: string;
  /** Body — one string per paragraph */
  body: string[];
  /** Short keyword chips */
  tags?: string[];
  /** true → content not written yet; the card shows an "on the way" state */
  placeholder?: boolean;
};

export type PipelineNode = {
  id: string;
  /** Short display name on the node */
  name: string;
  /** Role / stage descriptor */
  role: string;
  /** Chronological period, e.g. "Aug — Oct 2024" */
  period: string;
  /** Location */
  place: string;
  /** Short metric shown under the node label */
  metric: string;
  /** Normalized x across the flow, 0 (start) → 1 (now) */
  x: number;
  /** Normalized y offset, -1 (down) → 1 (up), 0 = centerline */
  y: number;
  /** The story behind this stage */
  artifact: JourneyArtifact;
};

export const PIPELINE_NODES: PipelineNode[] = [
  {
    id: "school",
    name: "School",
    role: "St. Mary's, Dum Dum",
    period: "",
    place: "Dum Dum, Kolkata",
    metric: "ICSE · 91.8%",
    x: 0.0,
    y: 0.35,
    artifact: {
      headline: "Undoubtedly the time of my life.",
      body: [
        "St. Mary's, Dum Dum. If I had to point at the best stretch so far, it would be here — the friendships, the football, the years I'd relive without changing a line.",
        "Finished Class X with 91.8% in the ICSE boards.",
      ],
      tags: ["ICSE", "Class X", "St. Mary's"],
    },
  },
  {
    id: "high-school",
    name: "High School",
    role: "Hariyana Vidyamandir",
    period: "",
    place: "Kolkata, IN",
    metric: "96%",
    x: 0.26,
    y: -0.4,
    artifact: {
      headline: "Where the technical thread started to pull.",
      body: [
        "Two years of higher secondary at Hariyana Vidyamandir — a heavier syllabus, a sharper focus, and the first real pull toward the technical work that followed.",
        "Came out with 96%.",
      ],
      tags: ["Higher Secondary", "96%", "Hariyana Vidyamandir"],
    },
  },
  {
    id: "webel",
    name: "WEBEL",
    role: "Data Science & ML Intern",
    period: "Aug — Oct 2024",
    place: "Kolkata, IN",
    metric: "2024 · Kolkata",
    x: 0.52,
    y: 0.45,
    artifact: {
      headline: "First taste of ML in production — for the Govt. of West Bengal.",
      body: [
        "WEBEL is the West Bengal Electronics Industry Development Corporation, the state's technology arm. The internship put me on a real caseload rather than a toy dataset.",
        "I built NLP and LangChain pipelines that relabelled 1,000+ mislabelled cases and pulled dataset quality up 35%.",
        "Then a crime-classification model that surfaces the 10 factors weighing most on each case — which halved the team's manual processing time.",
      ],
      tags: ["NLP", "LangChain", "Classification", "Govt. of West Bengal"],
    },
  },
  {
    id: "maersk-intern",
    name: "Maersk",
    role: "Software Engineer Intern",
    period: "Jul 2025 — Jul 2026",
    place: "Bengaluru, IN",
    metric: "Intern · 2025",
    x: 0.76,
    y: -0.3,
    artifact: {
      headline: "A year building the API surface behind Maersk's maritime platforms.",
      body: [
        "Three production REST APIs (OpenAPI 3.0.1) that sit behind StarGate and Apigee for the Digital Maritime and PO Invoice teams — serving 50K+ requests a day at sub-100ms P95.",
        "An event-driven PostgreSQL → Delta Lake sync that keeps rate data current in real time, holding 99.7% consistency across the systems it spans.",
        "This is where the data-engineering work started to compound — the intern APIs became the plumbing the analytics later rode on.",
      ],
      tags: ["FastAPI", "OpenAPI", "StarGate / Apigee", "PostgreSQL → Delta"],
    },
  },
  {
    id: "maersk-ase",
    name: "Maersk",
    role: "Associate Software Engineer",
    period: "Jul 2026 — Present",
    place: "Bengaluru, IN",
    metric: "ASE · 2026 →",
    x: 1.0,
    y: 0.25,
    artifact: {
      headline: "Where I am now — moving 12M+ shipping records a day.",
      body: [
        "30+ PySpark pipelines on Databricks Delta Lake move 12M+ shipping records a day out of 30+ terminals and into the tables freight analytics reads from. Reworking the ingestion path took end-to-end latency down 70%.",
        "Moved 40+ API credentials into MSS Vault across the CDT, PP, and Prod environments, and cleared the container-tracking data-quality defects that were feeding bad state downstream.",
        "Same company, bigger blast radius — from building endpoints to owning the pipelines the business runs on.",
      ],
      tags: ["PySpark", "Databricks", "Delta Lake", "MSS Vault"],
    },
  },
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
