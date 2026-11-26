import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "Tonight in Grumblewick: freezing rain, 2 centimetres, falling uphill, with gusts of 60 km/h returning every umbrella to the shop it came from.";

const MAX_CHARS = 160;

if (LINE.length === 0 || LINE.length > MAX_CHARS) {
  throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${LINE.length}`);
}

const trimmed = LINE.trim();
if (trimmed !== LINE) {
  throw new Error("entry must not start or end with whitespace");
}
if (Buffer.byteLength(trimmed, "utf8") > MAX_CHARS) {
  throw new Error("entry exceeds the 160-byte budget");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, trimmed, "utf8");
