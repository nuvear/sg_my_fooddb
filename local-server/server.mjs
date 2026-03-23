/**
 * FoodDB Local Server
 * ====================
 * Serves the built PWA and proxies HPB SG FoodID API calls
 * to bypass CORS restrictions when running locally.
 *
 * Usage:
 *   node local-server/server.mjs
 *
 * Then open: http://localhost:4000
 */

import { createServer } from "http";
import { readFileSync, existsSync } from "fs";
import { join, extname, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist", "public");
const DATA_DIR = join(ROOT, "..", "sg_my_fooddb", "data");

const PORT = process.env.PORT || 4000;
const HPB_API = "https://pphtpc.hpb.gov.sg/bff/v1/food-portal";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js":   "application/javascript",
  ".mjs":  "application/javascript",
  ".css":  "text/css",
  ".json": "application/json",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".svg":  "image/svg+xml",
  ".ico":  "image/x-icon",
  ".woff2":"font/woff2",
  ".woff": "font/woff",
  ".ttf":  "font/ttf",
  ".webmanifest": "application/manifest+json",
};

/** Proxy a request to the HPB API */
async function proxyHPB(path, res) {
  const url = `${HPB_API}${path}`;
  try {
    const resp = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; FoodDB-Local/1.0)",
        "Accept": "application/json",
        "Referer": "https://pphtpc.hpb.gov.sg/web/sgfoodid/tools/food-search",
      },
    });
    const body = await resp.text();
    res.writeHead(resp.status, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    });
    res.end(body);
  } catch (err) {
    res.writeHead(502, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Proxy error", detail: err.message }));
  }
}

/** Serve a local data file (scraped JSON) */
function serveDataFile(filename, res) {
  const filePath = join(DATA_DIR, filename);
  if (!existsSync(filePath)) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Data file not found", path: filePath }));
    return;
  }
  const data = readFileSync(filePath);
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public, max-age=60",
  });
  res.end(data);
}

/** Serve a static file from the dist directory */
function serveStatic(urlPath, res) {
  // Normalize path
  let filePath = join(DIST, urlPath === "/" ? "index.html" : urlPath);

  // If no extension, serve index.html (SPA routing)
  if (!extname(filePath)) {
    filePath = join(DIST, "index.html");
  }

  if (!existsSync(filePath)) {
    // SPA fallback
    filePath = join(DIST, "index.html");
  }

  if (!existsSync(filePath)) {
    res.writeHead(404);
    res.end("Not found — run `pnpm build` first");
    return;
  }

  const ext = extname(filePath);
  const mime = MIME[ext] || "application/octet-stream";
  const data = readFileSync(filePath);
  res.writeHead(200, {
    "Content-Type": mime,
    "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=86400",
  });
  res.end(data);
}

const server = createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const path = url.pathname;

  // CORS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204, { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET" });
    res.end();
    return;
  }

  // API proxy routes
  if (path.startsWith("/api/hpb/")) {
    const hpbPath = path.replace("/api/hpb", "") + (url.search || "");
    proxyHPB(hpbPath, res);
    return;
  }

  // Local data routes (scraped JSON files)
  if (path === "/api/local/foods-index") {
    serveDataFile("sgfoodid_generic.json", res);
    return;
  }
  if (path === "/api/local/progress") {
    serveDataFile("progress_generic.json", res);
    return;
  }

  // Static files
  serveStatic(path, res);
});

server.listen(PORT, () => {
  console.log(`\n🌿 FoodDB Local Server running at http://localhost:${PORT}`);
  console.log(`   API proxy: http://localhost:${PORT}/api/hpb/foods?pageNumber=1&productType=Generic`);
  console.log(`   Local data: http://localhost:${PORT}/api/local/foods-index`);
  console.log(`\n   Press Ctrl+C to stop\n`);
});
