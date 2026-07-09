import { ImageResponse } from "next/og";

export const alt = "LoanHero — Personal Loans in Canada";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #4338CA 0%, #6366F1 55%, #818CF8 100%)",
          padding: "72px 80px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: "white" }} />
          <span style={{ fontSize: 38, fontWeight: 800, letterSpacing: -1 }}>LoanHero</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ fontSize: 26, fontWeight: 700, letterSpacing: 4, color: "rgba(255,255,255,0.85)" }}>
            PERSONAL LOANS IN CANADA
          </span>
          <span style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.05, letterSpacing: -1.5, maxWidth: 980 }}>
            Fast approval, competitive rates, one simple application.
          </span>
        </div>

        <span style={{ fontSize: 24, color: "rgba(255,255,255,0.75)" }}>loanhero.ca</span>
      </div>
    ),
    { ...size },
  );
}
