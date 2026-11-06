import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const outputDir = path.resolve("dist");
const htmlPath = path.join(outputDir, "index.html");

function fail(message) {
  console.error(`Standalone artifact validation failed: ${message}`);
  process.exitCode = 1;
}

let html;
try {
  const fileStat = await stat(htmlPath);
  if (!fileStat.isFile() || fileStat.size === 0) {
    fail("dist/index.html is missing or empty.");
    process.exit();
  }
  html = await readFile(htmlPath, "utf8");
} catch {
  fail("dist/index.html does not exist.");
  process.exit();
}

const outputFiles = await readdir(outputDir, { withFileTypes: true });
if (outputFiles.length !== 1 || outputFiles[0].name !== "index.html" || !outputFiles[0].isFile()) {
  fail("dist must contain exactly one file: index.html.");
}

if (!/<script\b[^>]*>[\s\S]*?\S[\s\S]*?<\/script>/i.test(html)) {
  fail("No embedded JavaScript was found.");
}
if (!/<style\b[^>]*>[\s\S]*?\S[\s\S]*?<\/style>/i.test(html)) {
  fail("No embedded CSS was found.");
}

const runtimeTags = html.match(/<(?:script|link|img|source|video|audio|iframe|object|embed)\b[^>]*>/gi) ?? [];
const runtimeAttributes = /\b(src|href|data)\s*=\s*(["'])(.*?)\2/gi;
for (const tag of runtimeTags) {
  const isLinkStylesheet = /^<link\b/i.test(tag) && /\brel\s*=\s*(["'])?stylesheet\1?/i.test(tag);
  const isScript = /^<script\b/i.test(tag);
  const isAssetTag = /^<(?:img|source|video|audio|iframe|object|embed)\b/i.test(tag);
  if (!isLinkStylesheet && !isScript && !isAssetTag) continue;

  for (const match of tag.matchAll(runtimeAttributes)) {
    const attribute = match[1].toLowerCase();
    const value = match[3].trim();
    const resourceAttribute = isScript ? attribute === "src" : isLinkStylesheet ? attribute === "href" : ["src", "data"].includes(attribute);
    if (!resourceAttribute || !value) continue;
    if (/^(?:https?:)?\/\//i.test(value)) fail(`External runtime resource remains: ${value}`);
    else if (!/^(?:data:|#|blob:)/i.test(value)) fail(`Local runtime resource remains: ${value}`);
  }
}

for (const match of html.matchAll(/url\(\s*(["']?)(.*?)\1\s*\)/gi)) {
  const value = match[2].trim();
  if (value && !/^(?:data:|#|blob:)/i.test(value)) {
    fail(`Unresolved CSS asset reference remains: ${value}`);
  }
}

if (/(?:^|[;\s])@import\b/i.test(html)) fail("An unresolved CSS @import remains.");
if (/\b(?:fetch\s*\(|XMLHttpRequest|WebSocket|EventSource|importScripts\s*\(|new\s+Worker\s*\()/i.test(html)) {
  fail("A browser network or external script loading API remains in the artifact.");
}

if (!process.exitCode) console.log(`Standalone artifact validated (${(Buffer.byteLength(html) / 1024).toFixed(1)} KiB).`);
