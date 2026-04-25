/**
 * Tolani Ecosystem — Token Linter
 * Usage: node validate-tokens.js Tolani_UI_Tokens_LightDark.json
 *
 * Fails if:
 *  - Any hex is not in the approved allowlist (brand + semantic)
 *  - Any required keys are missing
 */
const fs = require("fs");

const file = process.argv[2];
if (!file) {
  console.error("Usage: node validate-tokens.js <tokens.json>");
  process.exit(2);
}

const tokens = JSON.parse(fs.readFileSync(file, "utf8"));

// Build allowlist (brand + semantic)
const allow = new Set();
function addHex(h) {
  if (typeof h === "string" && /^#[0-9a-fA-F]{6}$/.test(h)) allow.add(h.toLowerCase());
}
Object.values(tokens.brand || {}).forEach(group => Object.values(group || {}).forEach(addHex));
Object.values(tokens.semantic || {}).forEach(div =>
  Object.values(div || {}).forEach(mode => Object.values(mode || {}).forEach(addHex))
);

const REQUIRED = {
  brand: ["corp","labs","foundation"],
  semantic: ["corp","labs","foundation"]
};

let ok = true;

// Validate required top-level keys
for (const [k, v] of Object.entries(REQUIRED)) {
  if (!(k in tokens)) { console.error(`Missing key: ${k}`); ok = false; continue; }
  for (const sub of v) {
    if (!(sub in tokens[k])) { console.error(`Missing key: ${k}.${sub}`); ok = false; }
  }
}

// Walk and validate hex values
function walk(obj, path=[]) {
  if (Array.isArray(obj)) return obj.forEach((x,i)=>walk(x, path.concat(String(i))));
  if (obj && typeof obj === "object") return Object.entries(obj).forEach(([k,v])=>walk(v, path.concat(k)));
  if (typeof obj === "string" && /^#[0-9a-fA-F]{6}$/.test(obj)) {
    if (!allow.has(obj.toLowerCase())) {
      console.error(`Disallowed color ${obj} at ${path.join(".")}`);
      ok = false;
    }
  }
}
walk(tokens);

if (!ok) process.exit(1);
console.log("OK: tokens validated.");
