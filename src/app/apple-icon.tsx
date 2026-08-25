import { ImageResponse } from "next/og";

/**
 * Apple touch icon (180×180) — the favicon's amber chip framed on the void
 * background, so iOS home-screen bookmarks read as the site. Same bold SVG "A"
 * and amber gradient as icon.tsx, scaled up.
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
            background: "linear-gradient(140deg, #ffd37a 0%, #f0a929 55%, #d9891f 100%)",
            borderRadius: 30,
          }}
        >
          <svg width="88" height="88" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2 L21.5 22 L16.6 22 L15.15 18.2 L8.85 18.2 L7.4 22 L2.5 22 Z M12 7.4 L9.9 13.9 L14.1 13.9 Z"
              fill="#0a0a0a"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>
    ),
    { ...size },
  );
}
