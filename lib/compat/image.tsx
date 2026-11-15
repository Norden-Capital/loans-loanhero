import type { CSSProperties } from "react";

/**
 * Drop-in for the old `next/image`. It writes the same <img> markup Next did
 * (same attributes, same responsive srcset widths, quality 75). Optimized
 * images come from Vercel's image service (/_vercel/image), configured in
 * astro.config.mjs with the same sizes and remote hosts as the old
 * next.config.ts. SVGs are served as-is, like Next did.
 */
const DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
const IMAGE_SIZES = [32, 48, 64, 96, 128, 256, 384];
const ALL_SIZES = [...IMAGE_SIZES, ...DEVICE_SIZES].sort((a, b) => a - b);
const QUALITY = 75;

export const IMAGE_CONFIG = { sizes: ALL_SIZES, quality: QUALITY };

function optimizedUrl(src: string, width: number) {
  // In `astro dev` there is no Vercel image service; use the original file.
  if (import.meta.env.DEV) return src;
  return `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=${QUALITY}`;
}

function widthsFor(width: number | undefined, sizes: string | undefined) {
  if (sizes) {
    const vw = [...sizes.matchAll(/(^|\s)(1?\d?\d)vw/g)].map((m) => parseInt(m[2], 10));
    if (vw.length) {
      const smallest = Math.min(...vw) * 0.01;
      return { widths: ALL_SIZES.filter((s) => s >= DEVICE_SIZES[0] * smallest), kind: "w" as const };
    }
    return { widths: ALL_SIZES, kind: "w" as const };
  }
  if (typeof width !== "number") return { widths: DEVICE_SIZES, kind: "w" as const };
  const widths = [
    ...new Set(
      [width, width * 2].map((w) => ALL_SIZES.find((s) => s >= w) ?? ALL_SIZES[ALL_SIZES.length - 1]),
    ),
  ];
  return { widths, kind: "x" as const };
}

type ImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  unoptimized?: boolean;
};

export default function Image({
  src,
  alt,
  width,
  height,
  fill,
  sizes,
  priority,
  className,
  style,
  unoptimized,
}: ImageProps) {
  const fillStyle: CSSProperties | undefined = fill
    ? { position: "absolute", height: "100%", width: "100%", left: 0, top: 0, right: 0, bottom: 0 }
    : undefined;
  const imgStyle: CSSProperties = { ...fillStyle, color: "transparent", ...style };

  const skip = unoptimized || src.endsWith(".svg");
  let srcSet: string | undefined;
  let finalSrc = src;
  if (!skip) {
    const { widths, kind } = widthsFor(width, sizes);
    srcSet = widths
      .map((w, i) => `${optimizedUrl(src, w)} ${kind === "w" ? `${w}w` : `${i + 1}x`}`)
      .join(", ");
    finalSrc = optimizedUrl(src, widths[widths.length - 1]);
  }

  return (
    <img
      alt={alt}
      loading={priority ? undefined : "lazy"}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      decoding="async"
      data-nimg={fill ? "fill" : "1"}
      className={className}
      style={imgStyle}
      sizes={skip ? undefined : sizes}
      srcSet={srcSet}
      src={finalSrc}
    />
  );
}
