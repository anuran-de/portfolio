import { ImageResponse } from "next/og";

/**
 * Apple touch icon (180×180) — amber "A" monogram on the void background, so
 * iOS home-screen bookmarks read as the site, not a generic screenshot.
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
          background: "#08090a",
        }}
      >
        <div
          style={{
            width: 132,
            height: 132,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#e9b44c",
            color: "#08090a",
            fontSize: 92,
            fontWeight: 600,
            borderRadius: 30,
          }}
        >
          A
        </div>
      </div>
    ),
    { ...size },
  );
}
