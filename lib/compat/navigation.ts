/**
 * Drop-in for the old `next/navigation` hooks.
 *
 * On the server (build time) the current page path is set once per page by
 * src/layouts/BaseLayout.astro before the page renders; pages build one at a
 * time, so every component of that page reads the right path. In the browser
 * the real location is used, which is the same value (no trailing slash).
 */
let serverPathname = "/";

export function setServerPathname(pathname: string) {
  serverPathname = pathname;
}

export function usePathname(): string {
  return typeof window === "undefined" ? serverPathname : window.location.pathname;
}

export function useSearchParams(): URLSearchParams {
  return typeof window === "undefined"
    ? new URLSearchParams()
    : new URLSearchParams(window.location.search);
}
