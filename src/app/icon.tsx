import { ImageResponse } from "next/og";

/**
 * Favicon (32×32) — an amber signal tile with a dark "A". The monogram of the
 * mark in the meta-bar, scaled down to the browser tab.
 */

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#e9b44c",
          color: "#08090a",
          fontSize: 22,
          fontWeight: 600,
          borderRadius: 6,
        }}
      >
        A
      </div>
    ),
    { ...size },
  );
}
