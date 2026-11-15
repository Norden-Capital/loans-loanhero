import fs from "node:fs";
import path from "node:path";

import { initWasm, Resvg } from "@resvg/resvg-wasm";
import satori from "satori";

import { BASE_URL, SITE_NAME } from "@/lib/seo";

/**
 * Social share card for blog posts and news items, in the LoanHero palette.
 *
 * Built at build time with satori + resvg — the same engines (same versions)
 * and the same default font (Geist) that Next's `next/og` used, so the images
 * look the same as before.
 */
const root = process.cwd();
let ready: Promise<void> | null = null;
let font: Buffer | null = null;

function init() {
  if (!ready) {
    ready = initWasm(fs.readFileSync(path.join(root, "node_modules/@resvg/resvg-wasm/index_bg.wasm")));
    font = fs.readFileSync(path.join(root, "lib/og-fonts/Geist-Regular.ttf"));
  }
  return ready;
}

export async function articleOgImage({
  title,
  eyebrow,
  path: pagePath,
  size,
}: {
  title: string;
  eyebrow: string;
  path: string;
  size: { width: number; height: number };
}): Promise<Response> {
  await init();
  const footer = `${new URL(BASE_URL).host}${pagePath}`;

  const svg = await satori(
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
    </div>,
    {
      width: size.width,
      height: size.height,
      fonts: [{ name: "sans serif", data: font!, weight: 700, style: "normal" }],
    },
  );

  const png = new Resvg(svg, { fitTo: { mode: "width", value: size.width } }).render().asPng();

  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
}
