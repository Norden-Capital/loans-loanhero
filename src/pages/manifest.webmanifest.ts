import type { APIRoute } from "astro";

// Same output as the old app/manifest.ts.
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: "LoanHero",
      short_name: "LoanHero",
      description: "Quick & Easy Personal Loans Canada",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#6366F1",
      icons: [
        { src: "/icon.png", sizes: "any", type: "image/png", purpose: "any" },
        { src: "/icon.png", sizes: "any", type: "image/png", purpose: "maskable" },
      ],
    }),
    { headers: { "Content-Type": "application/manifest+json" } },
  );
