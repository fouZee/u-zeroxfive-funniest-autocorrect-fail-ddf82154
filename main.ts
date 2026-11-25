// Funniest Autocorrect Fail — make.fun bounty
// u-zeroxfive-funniest-autocorrect-fail-ddf82154 ($2 USDC)
//
// Writes a single one-line autocorrect fail to entry.txt and validates it
// against the bounty gate: UTF-8 text, 1-199 characters, not only
// whitespace, exactly one line, nothing else in the entry.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The fail: a routine school-run text where autocorrect swaps one letter's
// worth of meaning — "soccer" becomes "Satan" — and the fallout (a wife
// gone silent) sells that the slip really went out. The wrong word is
// specific, surprising, and instantly visual.
const ENTRY =
  "I texted my wife 'picking the kids up from soccer practice' — autocorrect sent 'picking the kids up from Satan practice' and now she won't answer my calls.";

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
