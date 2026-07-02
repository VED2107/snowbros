import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0f0d",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#181d19",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                background: "#58d6c3",
              }}
            />
          </div>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              color: "#f4f6f4",
              fontWeight: 600,
            }}
          >
            SNOWBROS
          </div>
        </div>

        <div
          style={{
            fontSize: 84,
            lineHeight: 1.05,
            letterSpacing: -2,
            color: "#111111",
            fontWeight: 600,
            maxWidth: 900,
          }}
        >
          We engineer digital products.
        </div>

        <div style={{ fontSize: 30, color: "#9ca6a1" }}>
          A premium software engineering studio.
        </div>
      </div>
    ),
    { ...size },
  );
}
