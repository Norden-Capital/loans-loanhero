// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import vercelOutputTweaks from "./integrations/vercel-output-tweaks.mjs";

// Same image widths and quality as the old Next.js site (see lib/compat/image.tsx).
const IMAGE_SIZES = [32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];

export default defineConfig({
  site: "https://loanhero.ca",
  // Same URLs as before: no trailing slash; "/page/" redirects (308) to "/page".
  trailingSlash: "never",
  build: { format: "file" },
  output: "static",
  integrations: [react(), vercelOutputTweaks()],
  vite: { plugins: [tailwindcss()] },
  adapter: vercel({
    imageService: false,
    imagesConfig: {
      sizes: IMAGE_SIZES,
      formats: ["image/webp"],
      minimumCacheTTL: 14400,
      domains: [],
      remotePatterns: [
        { protocol: "https", hostname: "images.pexels.com" },
        { protocol: "https", hostname: "images.unsplash.com" },
      ],
    },
  }),
  // Plain links, like the old site (no prefetch script).
  prefetch: false,
  devToolbar: { enabled: false },
});
