import { ImageResponse } from "next/og";

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
          background: "#111111",
          borderRadius: 40,
        }}
      >
        <svg width="112" height="112" viewBox="0 0 32 32" fill="none">
          <g stroke="#f7f7f5" strokeWidth="1.8" strokeLinecap="round">
            <path d="M16 6v20M6.5 10l19 12M25.5 10l-19 12" />
          </g>
          <circle cx="16" cy="16" r="4" fill="#58d6c3" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
