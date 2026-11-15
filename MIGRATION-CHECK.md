# LoanHero: Next.js → Astro, check report

Branch: `astro-migration` (local only; not pushed, not deployed).
Date of check: 2026-11-15.

How the check was done:
- Old site: a Next.js production build of `main` (`next build` + `next start`, port 3100), in a separate copy outside the repo.
- New site: `npm run build` + `npm run preview` (port 4321). The preview server follows the Vercel build output (`.vercel/output/config.json`): the same routes, redirects, headers and functions Vercel will use.
- Both sites were crawled with a script: every URL in the sitemap, plus files and test URLs, compared field by field.

## Result in one line

All 261 pages, all files and all tracking match. The only differences are:
1. 47 missing spaces on 28 pages, a bug in the old Next build (the new site fixes them).
2. Line endings in one alt text (local Windows build only).
3. Tiny letter-edge pixel changes in the share images.

The details are below.

## 1. URLs

| Check | Result |
|---|---|
| Pages in the sitemap | 261 old, 261 new, 0 missing, 0 extra |
| Status of every page | 200 on both |
| Trailing slash (`/services/`, `/blog/`, `/blog/<slug>/`, `/services/?x=1`) | 308 to the URL without the slash, query kept. Same as old. |
| Unknown page (`/does-not-exist`, `/blog/does-not-exist`, `/sitemap/nope.xml`, `/services.html`) | 404 with the same 404 page |
| `/index.html` | 404, same as old |
| `/loans/by-amount/999999` | 404 on both. The old site showed an empty body (Next streaming); the new site shows the full 404 page. |
| `/api/contact` | GET → 405, POST → handled by a Vercel function (same code, same env var names). Not sent for real. |

## 2. Head tags (every page)

Compared on all 261 pages: title, every meta tag, canonical, alternate (RSS), icon links, manifest link, JSON-LD in the HTML, JSON-LD added after load (ids), `lang`.

- **259 of 261 pages are identical**, apart from the missing-space pages in section 4. Those pages also have identical head tags.
- Home page and 404 page: `og:image:alt` / `twitter:image:alt` end with `\r\n` in the old local build and `\n` in the new one. The cause is that the alt text file was checked out on Windows. The live Vercel build (Linux) already uses `\n`, so in production they are equal.
- The `?<hash>` on share-image and icon URLs is kept (same URLs as today). The blog/news share images keep their path; only the Next-only `?<16 hex>` suffix is gone.

## 3. Files

| File | Result |
|---|---|
| `/robots.txt` | same content |
| `/sitemap.xml` (index) + `/sitemap/pages.xml`, `loans.xml`, `resources.xml`, `blog.xml`, `news.xml` | same content, same structure (not Astro's `sitemap-index.xml`) |
| `/manifest.webmanifest` | same content |
| `/blog/feed.xml`, `/news/feed.xml` | same content; `application/rss+xml; charset=utf-8` and `Cache-Control: public, max-age=3600, s-maxage=3600`, as before |
| `/favicon.ico`, `/icon.png`, `/favicon.svg`, `/opengraph-image.png` | same bytes |
| `/google211528508b1fc7e4.html` (Search Console) | same content, same URL |
| `/indexnow-key.txt` | same content, same URL |
| Images in `public/` (partners, email assets) | same bytes |
| Blog/news share images `/<section>/<slug>/opengraph-image` (86) | all present, `image/png`, 1200×630. See section 6. |

The `Cache-Control` values differ between the two local servers. On Vercel, the platform sets these for static files, so this needs a check on a preview deploy (section 9).

## 4. Page text and layout

- **Text:** exact body text compared on all 261 pages. 233 are identical. The other 28 differ **only by missing spaces in the old site** (47 spaces, no other character differs):
  - 16 × `/loans/by-amount/<amount>`: "Borrow $1000Today", "Why $500Is…"
  - 11 × `/loans/by-type/<type>`: "Fast funding availableSecure & confidential"
  - `/resources/tools`: "first.Look", "need.It's"

  The source code has these spaces. The old Next compiler drops a space before a line of text that contains `&apos;`, `&amp;` or `&quot;`. Astro renders what the source says. **To copy the bug, the source text would have to be changed, so this was not done. Owner to confirm.**
- **Layout:** the position and size of every text, link, image and button were measured after load on 20 key pages, at computer width (1280px) and phone width (390px). These pages were home, all hubs, services, contact, privacy, terms, blog, news, a blog post, loan application and 404. **37 of the 40 are identical to the pixel.** The other 3 differ only where the missing spaces above are, or by a random moving background dot on /loan-application.
- **Fonts:** the same Poppins and Space Grotesk files (self-hosted), and the same fallback metrics as next/font. Measured text widths are identical.

## 5. Behaviour (tested in a browser, both sites side by side)

| Part | Result |
|---|---|
| Header dropdowns (computer), mobile menu + Loans/Resources sub-menus (phone) | same |
| Cookie banner: Accept All | same saved values (`cookieConsent`, `cookieTimestamp`, `analytics_consent`, `marketing_consent`, `functional_consent`); banner closes |
| FAQ accordion | opens the same item, same page height |
| Loan calculator (`/resources/tools`) | same start value ($121.22) and same result after moving the slider ($126.07) |
| `/loan-application` | the LeadScout form loads in the same place, same height; the "Loading application..." placeholder is shown first, as before. No form was filled or sent. |
| Article table of contents (phone + sidebar) | present on every blog/news post (same HTML) |
| Console errors | none from the site |

## 6. Share images (blog/news)

They are made with the same engine as before (satori + resvg, same versions as Next's `@vercel/og`, same Geist font file). They look the same to the eye. Pixel compare: at most 0.75% of pixels differ, only on letter edges (anti-aliasing). The sizes and type are the same.

## 7. Tracking and verification (owner's "exact copy" list)

Checked on every page of the new build, compared with the old.

| Piece | ID | Where | Result |
|---|---|---|---|
| Google Analytics 4 | `G-KHJS6V2GPE` | every page; `gtag/js` script + inline config, after load | ✅ same, every page |
| Microsoft Clarity | `y1rm1ali48` | every page; inline loader, after load | ✅ same, every page |
| Consent banner | — | every page; saves the choice only (does not block GA/Clarity, as before) | ✅ same |
| Google Search Console | `google211528508b1fc7e4.html` | `/google211528508b1fc7e4.html` | ✅ same file, same URL |
| IndexNow | `public/indexnow-key.txt` | `/indexnow-key.txt` | ✅ see section 8 |
| LeadScout | `app.leadscout.ca/library/library.js`, affiliate `4PrKYVa8`, sub1 `loanhero` | `/loan-application` only | ✅ same script, same options (form component unchanged, incl. `?source=fb/tiktok`) |
| JSON-LD | financial-service, organization, faq (site-wide) + page breadcrumbs/article/FAQ | added after load (site-wide + breadcrumbs), in HTML (pages) | ✅ same ids and content on every page |
| Favicon / icons / manifest | `favicon.ico` 256, `icon.png` 48, `favicon.svg`, `manifest.webmanifest` | head of every page | ✅ same links, same files |
| robots / sitemap / 404 | — | — | ✅ same (sections 1 and 3) |
| Redirects | trailing slash → 308 | all URLs | ✅ same |
| Custom headers | none before (only RSS ones from the route) | — | ✅ RSS headers kept; nothing added |
| Meta pixel, GTM, TikTok pixel, other verification tags | none before | — | ✅ none now |

Note: the browser tests also loaded GA and Clarity from `localhost` on both sites, so a few local test visits may show in GA/Clarity.

## 8. IndexNow

- `.github/workflows/indexnow.yml`, `scripts/indexnow.mjs` and `public/indexnow-key.txt` are **unchanged** (`git diff main` is empty).
- `lib/seo.ts` still has `export const BASE_URL = "https://loanhero.ca";` (the script reads it).
- Posts are still `content/blog|news/<slug>.mdx` → `/blog/<slug>`, `/news/<slug>`.
- `node scripts/indexnow.mjs --all --dry-run`: would submit 261 URLs (read from the live sitemap). The new local sitemap has **the same 261 URLs** (0 missing, 0 extra). Nothing was sent.
- `node scripts/indexnow.mjs --from HEAD~5 --to HEAD --dry-run` works the same, using the git diff of `content/`.
- The new site serves `/indexnow-key.txt` with the same key as the file.

## 9. Not checked (needs a Vercel preview deploy, which needs the owner and DevOps)

- Real Vercel behaviour: the `/_vercel/image` image optimizer (images use the same sizes, formats and domains as Next), cache headers on static files, and the exact `Content-Type` charset on `.txt`/`.html` files.
- The contact form sending a real email (needs the SMTP env vars on Vercel; the names are unchanged).
- The Vercel project setting "Framework: Next.js → Astro". **Change it only at launch, after the owner says yes.**

## 10. What changed in the code (summary)

- Next.js removed: `app/`, `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`. The dependencies `next`, `next-intl`, `eslint`, `eslint-config-next` and `@tailwindcss/postcss` were removed.
- Added: `astro` 7.4.12, `@astrojs/react`, `@astrojs/vercel`, `@astrojs/check`, `@tailwindcss/vite`, `@fontsource/poppins`, `@fontsource/space-grotesk`, `satori` + `@resvg/resvg-wasm` (for the share images) and `cookie@2.0.2` (needed by Astro; an older copy came from another package).
- Pages are in `src/pages/` with the same URLs. The old page components moved to `components/pages/` unchanged and run as React islands.
- Blog and news come from `content/` through Astro content collections.
- Small helpers in `lib/compat/` replace `next/link`, `next/image`, `next/navigation` and `next/script`. `lib/metadata.ts` writes the head tags the same way Next did.
- `integrations/vercel-output-tweaks.mjs` sets the share-image type, the RSS headers and the `/index.html` → 404 rule in the Vercel output.
- Lint: the `lint` script was removed with ESLint (it was Next's config). `npm run check` (astro check) is the type check: **0 errors, 0 warnings**.
- `/unsubscribe` was added after the migration (section 11). It is the only new page.

## 11. New page: /unsubscribe (added after the check above)

Built from the approved design `LMS/design/loanhero-unsubscribe/`.

| Check | Result |
|---|---|
| Look, computer (1440px) and phone (390px) | The position and size of every part (hero, card, title, fields, reasons, button, note, footer) are **identical** to the mockup, measured in the same browser. |
| States | Tested by clicking: empty form, wrong email ("Please enter a valid email."), Other + text box, server error ("Something went wrong."), success (with a faked OK answer in the browser only). All match the screenshots. |
| Head | title "Unsubscribe \| LoanHero", description, canonical `https://loanhero.ca/unsubscribe`, normal `index, follow` (same as contact/privacy/terms) |
| Sitemap | Added to `/sitemap/pages.xml`, because contact, privacy and terms are in it. The sitemap now has **262** URLs, so the next `indexnow --all` would include it. |
| `/unsubscribe/` | 308 to `/unsubscribe`, like every page |

Server route `POST /api/unsubscribe` (Vercel function, `src/pages/api/unsubscribe.ts`):

| Check | Result |
|---|---|
| GET | 405 |
| From another site (no matching `Origin`) | 403 |
| Bad JSON / too big | 400 / 413 |
| Wrong email | 400 → page shows "Please enter a valid email" |
| Honeypot field `company` filled | 200 "ok", nothing sent |
| Rate limit | 5 per minute per visitor, then 429 |
| Reason | optional; only the 5 listed answers (sent as codes); "Other" text cleaned and cut to 300 characters |
| **Test mode** (`LMS_URL` or `PROXY_SECRET` missing) | nothing is sent anywhere, the answer is 503, and the page shows "Something went wrong". It never pretends it worked. The log line has no email. |

**LMS call (Backend's contract):** `POST {LMS_URL}/api/public/unsubscribes`
- Headers: `X-Proxy-Secret`, `X-Client-IP`.
- Body: `{ host: "loanhero.ca", email, reason, otherText? }`.
  - `reason` is `TOO_MANY_EMAILS` | `NOT_INTERESTED` | `ALREADY_GOT_LOAN` | `NEVER_SIGNED_UP` | `OTHER` | `null`.
  - `otherText` is sent only with `OTHER`, max 300 characters.

Tested against a **fake LMS on this computer** (fake address and fake password; nothing reached the real LMS):

| LMS answer | Route | Page shows |
|---|---|---|
| 200 | 200 | "You're unsubscribed" (also tested by clicking in the browser) |
| 400 | 400 | "Please enter a valid email." (also tested by clicking) |
| 403, 429, 500, LMS down | 502 | "Something went wrong." |

The fake LMS received exactly Backend's JSON. An unknown reason was sent as `null`, and the "Other" text was cut to 300 characters. The log lines have only the HTTP status, never the email.

**Not tested: the real LMS.** That needs the real endpoint live plus `LMS_URL` and `PROXY_SECRET` on Vercel, and then one test with a clearly fake email (launch steps 2 and 5 of the DevOps link plan).

Vercel env vars needed at launch (same names as the apply form): `LMS_URL`, `PROXY_SECRET`. Only the owner adds them.

## How to open the new site locally

```bash
npm install
npm run build
npm run preview
```

Then open http://localhost:4321. Or use `npm run dev` for live editing.
