// Funniest Autocorrect Fail — make.fun bounty
// u-zeroxfive-funniest-autocorrect-fail-ddf82154 ($2 USDC)
//
// Writes a single one-line autocorrect fail to entry.txt and validates it
// against the bounty gate: UTF-8 text, 1-199 characters, not only
// whitespace, exactly one line, nothing else in the entry.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The fail: a routine school-run text sent to the whole class group chat,
// where autocorrect swaps one word — "soccer" becomes "Satan" — and the
// fallout (three moms blocking the sender) sells that the slip really went
// out to real people. The wrong word is specific, surprising, and instantly
// visual, and the group-chat setting raises the stakes over a 1-to-1 text.
const ENTRY =
  "I texted the school group chat 'picking the kids up from soccer' — autocorrect sent 'picking the kids up from Satan' and now three moms have blocked me.";

function validate(text: string): void {
  if (text.length < 1 || text.length > 199) {
    throw new Error(`gate: entry must be 1-199 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate: entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("gate: entry must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("gate: entry must not have leading or trailing whitespace");
  }
  // No control characters: the entry must be plain readable text.
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001F\u007F]/.test(text)) {
    throw new Error("gate: entry must not contain control characters");
  }
  // Must survive a UTF-8 round trip unchanged, so the scorer reads exactly
  // what was validated here.
  if (Buffer.from(text, "utf8").toString("utf8") !== text) {
    throw new Error("gate: entry must be valid UTF-8 text");
  }
}

function main(): void {
  validate(ENTRY);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");
  console.log(`Wrote ${ENTRY.length}-char entry to ${outPath}`);
}

main();
