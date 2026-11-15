"use client";

import { useEffect } from "react";

/**
 * Drop-in for the old `next/script` with strategy "afterInteractive": the
 * script tag is added to the page once, after the component has hydrated.
 */
export default function Script({
  src,
  id,
  strategy: _strategy,
}: {
  src: string;
  id?: string;
  strategy?: "afterInteractive";
}) {
  useEffect(() => {
    if (document.querySelector(`script[src="${src}"]`)) return;
    const el = document.createElement("script");
    el.src = src;
    el.async = true;
    if (id) el.id = id;
    document.body.appendChild(el);
  }, [src, id]);

  return null;
}
