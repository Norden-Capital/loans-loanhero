// Local preview of the production build, served the way Vercel serves it.
//
//   npm run build      (makes .vercel/output)
//   npm run preview    → http://localhost:4321
//
// It follows .vercel/output/config.json: the trailing-slash redirect, headers,
// static files, the server function (/api/contact) and the 404 page.
// Vercel's image service (/_vercel/image) does not exist locally, so those
// requests are sent to the original image instead.
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const PORT = Number(process.env.PORT ?? 4321);
const OUT = path.resolve(".vercel/output");
const STATIC = path.join(OUT, "static");
const config = JSON.parse(fs.readFileSync(path.join(OUT, "config.json"), "utf8"));
const overrides = config.overrides ?? {};

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};

let render = null;
async function serverFetch(request) {
  if (!render) {
    const entry = path.join(OUT, "functions/_render.func/.vercel/output/server/entry.mjs");
    render = (await import(pathToFileURL(entry).href)).default;
  }
  return render.fetch(request);
}

function findStatic(pathname) {
  const clean = decodeURIComponent(pathname).replace(/^\/+/, "");
  for (const candidate of [clean, `${clean}/index.html`, `${clean}.html`]) {
    const file = path.join(STATIC, candidate);
    if (file.startsWith(STATIC) && fs.existsSync(file) && fs.statSync(file).isFile()) {
      return { file, key: candidate };
    }
  }
  return null;
}

function sendFile(res, status, file, key, headers) {
  const type = overrides[key]?.contentType ?? TYPES[path.extname(file)] ?? "application/octet-stream";
  res.writeHead(status, { "Content-Type": type, ...headers });
  fs.createReadStream(file).pipe(res);
}

async function sendResponse(res, response) {
  res.writeHead(response.status, Object.fromEntries(response.headers));
  res.end(Buffer.from(await response.arrayBuffer()));
}

http
  .createServer(async (req, res) => {
    try {
      const url = new URL(req.url ?? "/", `http://${req.headers.host}`);
      const pathname = url.pathname;
      const headers = {};

      if (pathname === "/_vercel/image") {
        res.writeHead(307, { Location: url.searchParams.get("url") ?? "/" });
        return res.end();
      }

      let filesystemDone = false;
      for (const route of config.routes) {
        if (route.handle === "filesystem") {
          filesystemDone = true;
          const found = findStatic(pathname);
          if (found) return sendFile(res, 200, found.file, found.key, headers);
          continue;
        }
        if (!route.src || !new RegExp(route.src).test(pathname)) continue;

        if (route.status && route.status >= 300 && route.status < 400) {
          const location = pathname.replace(new RegExp(route.src), route.headers.Location);
          res.writeHead(route.status, { Location: location + url.search });
          return res.end();
        }
        if (route.headers) Object.assign(headers, route.headers);
        if (route.continue) continue;

        if (filesystemDone && route.dest === "_render") {
          const body = ["GET", "HEAD"].includes(req.method ?? "GET")
            ? undefined
            : await new Promise((resolve) => {
                const chunks = [];
                req.on("data", (c) => chunks.push(c));
                req.on("end", () => resolve(Buffer.concat(chunks)));
              });
          const request = new Request(url, {
            method: req.method,
            headers: Object.entries(req.headers).flatMap(([k, v]) =>
              v === undefined ? [] : [[k, Array.isArray(v) ? v.join(", ") : v]],
            ),
            body,
          });
          return sendResponse(res, await serverFetch(request));
        }
        if (route.dest && route.status) {
          const found = findStatic(route.dest);
          if (found) return sendFile(res, route.status, found.file, found.key, headers);
        }
      }
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    } catch (error) {
      console.error(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Server error");
    }
  })
  .listen(PORT, () => console.log(`LoanHero (Astro build) → http://localhost:${PORT}`));
