import { ImageResponse } from "next/og";

import { BASE_URL, SITE_NAME } from "@/lib/seo";

/** Social share card for blog posts and news items, in the LoanHero palette. */
export function articleOgImage({
  title,
  eyebrow,
  path,
  size,
}: {
  title: string;
  eyebrow: string;
  path: string;
  size: { width: number; height: number };
}) {
  const footer = `${new URL(BASE_URL).host}${path}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0D1117",
          padding: "72px 80px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* top accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 12,
            background: "linear-gradient(90deg, #6366F1 0%, #8B5CF6 50%, #F97316 100%)",
          }}
        />

        {/* brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
            }}
          />
          <span style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1 }}>{SITE_NAME}</span>
        </div>

        {/* title block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: 5, color: "#818CF8" }}>
            {eyebrow.toUpperCase()}
          </span>
          <span
            style={{
              fontSize: 62,
              fontWeight: 800,
              lineHeight: 1.08,
              maxWidth: 1000,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </span>
        </div>

        <span style={{ fontSize: 24, color: "rgba(255,255,255,0.55)" }}>{footer}</span>
      </div>
    ),
    { ...size },
  );
}
