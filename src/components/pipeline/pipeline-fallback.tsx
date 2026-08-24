import { PIPELINE_NODES, buildEdges } from "@/lib/pipeline";

/**
 * Static SVG of the same architecture (DESIGN.md §8 fallback). Rendered for
 * reduced-motion or when WebGL is unavailable — crisp and legible, never a
 * blank box. Pure geometry from the shared topology, no client JS.
 */
const VW = 1000;
const VH = 360;
const PAD_X = 90;

const mapX = (x: number) => PAD_X + x * (VW - PAD_X * 2);
const mapY = (y: number) => VH / 2 - y * (VH / 2 - 70);

export function PipelineFallback({ labels = true }: { labels?: boolean }) {
  const edges = buildEdges();

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      className="h-full w-full"
      role="img"
      aria-label="Data pipeline: Postgres to CDC to PySpark and Databricks to Delta Lake to API"
    >
      {/* Pipes */}
      {edges.map((e, i) => {
        const d = `M ${mapX(e.from.x)} ${mapY(e.from.y)} C ${mapX(e.c1[0])} ${mapY(
          e.c1[1],
        )} ${mapX(e.c2[0])} ${mapY(e.c2[1])} ${mapX(e.to.x)} ${mapY(e.to.y)}`;
        return (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="#e9b44c"
            strokeOpacity={0.28}
            strokeWidth={1.25}
          />
        );
      })}

      {/* Nodes */}
      {PIPELINE_NODES.map((n, i) => {
        const cx = mapX(n.x);
        const cy = mapY(n.y);
        const anchor = i === 0 ? "start" : i === PIPELINE_NODES.length - 1 ? "end" : "middle";
        const lx = i === 0 ? cx - 14 : i === PIPELINE_NODES.length - 1 ? cx + 14 : cx;
        const below = n.y >= 0;
        return (
          <g key={n.id}>
            <circle cx={cx} cy={cy} r={13} fill="none" stroke="#f6d79a" strokeOpacity={0.75} />
            <circle cx={cx} cy={cy} r={3} fill="#f6d79a" />
            {labels && (
              <text
                x={anchor === "middle" ? cx : lx}
                y={below ? cy + 34 : cy - 24}
                textAnchor={anchor}
                fill="#f2f0ea"
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
                fill="#9ba1a6"
                fontSize={10.5}
                fontFamily="var(--font-mono), monospace"
                letterSpacing="0.12em"
              >
                {n.metric.toUpperCase()}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
