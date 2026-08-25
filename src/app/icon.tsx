import { ImageResponse } from "next/og";

/**
 * Favicon (32×32) — a vivid amber chip with a bold geometric "A" drawn as an
 * SVG path (the bundled Geist has no bold weight, so the letterform is drawn,
 * not typeset). The monogram of the meta-bar mark, tuned to read at 16px.
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
          background: "linear-gradient(140deg, #ffd37a 0%, #f0a929 55%, #d9891f 100%)",
          borderRadius: 7,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2 L21.5 22 L16.6 22 L15.15 18.2 L8.85 18.2 L7.4 22 L2.5 22 Z M12 7.4 L9.9 13.9 L14.1 13.9 Z"
            fill="#0a0a0a"
            fillRule="evenodd"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
