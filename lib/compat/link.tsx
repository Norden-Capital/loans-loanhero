import { forwardRef, type AnchorHTMLAttributes } from "react";

/**
 * Drop-in for the old `next/link`: a plain <a>. Astro serves real pages, so no
 * client-side router is needed. Next-only props are accepted and ignored.
 */
type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  prefetch?: boolean | null;
  replace?: boolean;
  scroll?: boolean;
};

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { prefetch: _prefetch, replace: _replace, scroll: _scroll, ...props },
  ref,
) {
  return <a ref={ref} {...props} />;
});

export default Link;
