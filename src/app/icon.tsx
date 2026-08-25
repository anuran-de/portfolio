import { ImageResponse } from "next/og";

/**
 * Favicon (32×32) — a black chip with a white lowercase "a" (Geist, the site's
 * body face). The monogram of the meta-bar mark, tuned to read at 16px.
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
          background: "#0a0a0a",
          borderRadius: 7,
          color: "#f2f0ea",
          fontSize: 24,
          fontWeight: 600,
          lineHeight: 1,
          paddingBottom: 2,
        }}
      >
        a
      </div>
    ),
    { ...size },
  );
}
