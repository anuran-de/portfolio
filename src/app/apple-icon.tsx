import { ImageResponse } from "next/og";

/**
 * Apple touch icon (180×180) — the favicon's black chip with a white lowercase
 * "a", so iOS home-screen bookmarks read as the site. Same letterform as
 * icon.tsx, scaled up.
 */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#f2f0ea",
          fontSize: 132,
          fontWeight: 600,
          lineHeight: 1,
          paddingBottom: 10,
        }}
      >
        a
      </div>
    ),
    { ...size },
  );
}
