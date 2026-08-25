import { ImageResponse } from "next/og";

/**
 * Social share card (1200×630) — the first impression on LinkedIn / X / Slack.
 * Rendered in the site's own language: void background, amber signal, the hero
 * line, and three proof-points. Uses next/og's bundled Geist as the default
 * font (the site's body face), so no font assets or network calls at build.
 */

export const alt =
  "Anuran De — Data & ML Engineer. Real-time pipelines moving 12M+ shipping records a day, and the ML systems that make sense of them.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Palette mirrors DESIGN.md tokens
const VOID = "#08090a";
const TEXT = "#f2f0ea";
const DIM = "#9ba1a6";
const FAINT = "#565b61";
const AMBER = "#e9b44c";
const HAIR = "rgba(255,255,255,0.10)";

const STATS: [string, string][] = [
  ["12M+", "records / day"],
  ["30+", "pipelines"],
  ["94%", "RAG accuracy"],
];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: VOID,
          color: TEXT,
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* top amber signal edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            background: AMBER,
          }}
        />

        {/* header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: 4,
            color: FAINT,
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex" }}>Anuran De</div>
          <div style={{ display: "flex", color: AMBER }}>anuran.de</div>
        </div>

        {/* middle — eyebrow + hero line */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 5,
              color: AMBER,
              textTransform: "uppercase",
              marginBottom: 30,
            }}
          >
            Data &amp; ML Engineer · A.P. Moller–Maersk
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              lineHeight: 1.04,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            I build the pipelines behind the boxes that move the world.
          </div>
        </div>

        {/* stat row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 64,
            borderTop: `1px solid ${HAIR}`,
            paddingTop: 30,
          }}
        >
          {STATS.map(([value, label]) => (
            <div key={label} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 52, letterSpacing: -1, color: TEXT }}>
                {value}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 18,
                  letterSpacing: 2,
                  color: DIM,
                  textTransform: "uppercase",
                  marginTop: 8,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
