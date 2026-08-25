import { PIPELINE_NODES, buildEdges } from "@/lib/pipeline";

/**
 * SVG of the same architecture (DESIGN.md §8 fallback). Serves two jobs:
 *
 *  - `progress` omitted → a crisp static diagram (reduced-motion / first paint).
 *  - `progress` 0→1 → a scroll-scrubbed reveal: pipes fill amber and nodes
 *    light as the flow reaches them. This is the mobile/tablet stand-in for the
 *    WebGL scrub — same "scroll to move the data" payoff, no WebGL, and the
 *    labels live inside the viewBox so they scale instead of clipping.
 *
 * Pure geometry from the shared topology.
 */
const VW = 1000;
const VH = 360;
const PAD_X = 90;
/** A node lights just before the flow front reaches it. */
const LEAD = 0.03;

const mapX = (x: number) => PAD_X + x * (VW - PAD_X * 2);
const mapY = (y: number) => VH / 2 - y * (VH / 2 - 70);

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export function PipelineFallback({
  labels = true,
  progress,
  onNodeClick,
}: {
  labels?: boolean;
  /** 0→1 scroll position; omit for the static diagram. */
  progress?: number;
  /** When set, each node becomes a button opening its journey artifact. */
  onNodeClick?: (id: string) => void;
}) {
  const edges = buildEdges();
  const scrubbed = progress != null;
  const p = clamp01(progress ?? 0);
  const interactive = onNodeClick != null;

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      className="h-full w-full"
      role="img"
      aria-label="Career journey: School to High School to WEBEL to Maersk Intern to Associate Software Engineer"
    >
      {/* Pipes — dim base, plus a bright fill that draws in with the scroll. */}
      {edges.map((e, i) => {
        const d = `M ${mapX(e.from.x)} ${mapY(e.from.y)} C ${mapX(e.c1[0])} ${mapY(
          e.c1[1],
        )} ${mapX(e.c2[0])} ${mapY(e.c2[1])} ${mapX(e.to.x)} ${mapY(e.to.y)}`;
        // How far the flow front has crossed this segment, in its own 0→1.
        const span = e.to.x - e.from.x || 1;
        const localT = scrubbed ? clamp01((p - e.from.x) / span) : 0;
        return (
          <g key={i}>
            <path d={d} fill="none" stroke="#e9b44c" strokeOpacity={0.28} strokeWidth={1.25} />
            {scrubbed && localT > 0 && (
              <path
                d={d}
                fill="none"
                stroke="#f6d79a"
                strokeOpacity={0.9}
                strokeWidth={1.75}
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - localT}
              />
            )}
          </g>
        );
      })}

      {/* Nodes */}
      {PIPELINE_NODES.map((n, i) => {
        const cx = mapX(n.x);
        const cy = mapY(n.y);
        const anchor = i === 0 ? "start" : i === PIPELINE_NODES.length - 1 ? "end" : "middle";
        const lx = i === 0 ? cx - 14 : i === PIPELINE_NODES.length - 1 ? cx + 14 : cx;
        const below = n.y >= 0;
        const active = scrubbed ? p >= n.x - LEAD : true;
        return (
          <g key={n.id}>
            {active && scrubbed && (
              <circle cx={cx} cy={cy} r={18} fill="#f6d79a" fillOpacity={0.1} />
            )}
            {/* Faint reachable-ring so the node reads as tappable */}
            {interactive && (
              <circle
                cx={cx}
                cy={cy}
                r={22}
                fill="none"
                stroke="#e9b44c"
                strokeOpacity={active ? 0.22 : 0.12}
                strokeDasharray="2 4"
              />
            )}
            <circle
              cx={cx}
              cy={cy}
              r={13}
              fill="none"
              stroke="#f6d79a"
              strokeOpacity={active ? 0.95 : 0.32}
            />
            <circle cx={cx} cy={cy} r={active ? 3.6 : 3} fill="#f6d79a" fillOpacity={active ? 1 : 0.6} />
            {labels && (
              <text
                x={anchor === "middle" ? cx : lx}
                y={below ? cy + 34 : cy - 24}
                textAnchor={anchor}
                fill={active ? "#f2f0ea" : "#8b9095"}
                fontSize={13}
                fontFamily="var(--font-mono), monospace"
                letterSpacing="0.06em"
              >
                {n.name}
              </text>
            )}
            {labels && (
              <text
                x={anchor === "middle" ? cx : lx}
                y={below ? cy + 50 : cy - 40}
                textAnchor={anchor}
                fill={active ? "#c8a24a" : "#6b7075"}
                fontSize={10.5}
                fontFamily="var(--font-mono), monospace"
                letterSpacing="0.12em"
              >
                {n.metric.toUpperCase()}
              </text>
            )}
            {/* Invisible button — generous tap target, keyboard-focusable */}
            {interactive && (
              <circle
                cx={cx}
                cy={cy}
                r={30}
                fill="#000"
                fillOpacity={0}
                role="button"
                tabIndex={0}
                aria-label={`Open ${n.name}${n.period ? `, ${n.period}` : ""}`}
                style={{ cursor: "pointer", outline: "none" }}
                onClick={() => onNodeClick?.(n.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onNodeClick?.(n.id);
                  }
                }}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
