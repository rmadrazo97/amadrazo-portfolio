// Playwright screenshot harness for responsiveness review.
// Usage: node scripts/shoot.mjs <phase> [baseUrl]
//   phase   label for the output subfolder (e.g. "baseline", "after")
//   baseUrl defaults to http://localhost:3000
// Output: /tmp/pf-shots/<phase>/<route>__<viewport>.png
import { chromium } from "playwright";
import { mkdirSync } from "fs";

const phase = process.argv[2] || "shots";
const base = (process.argv[3] || "http://localhost:3000").replace(/\/$/, "");

const routes = [
  { name: "home", path: "/" },
  { name: "blog", path: "/blog" },
  { name: "post", path: "/blog/building-an-ai-engineering-practice" },
];

const viewports = [
  { name: "m320", width: 320, height: 640, dsf: 2 },
  { name: "m390", width: 390, height: 844, dsf: 2 },
  { name: "t768", width: 768, height: 1024, dsf: 2 },
  { name: "d1280", width: 1280, height: 900, dsf: 1 },
];

const outDir = `/tmp/pf-shots/${phase}`;
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const results = [];
for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.dsf,
    isMobile: vp.width < 700,
    hasTouch: vp.width < 700,
  });
  const page = await ctx.newPage();
  for (const r of routes) {
    const url = base + r.path;
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    } catch {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    }
    await page.waitForTimeout(1400); // let fonts + scramble settle
    // measure horizontal overflow (a key mobile bug signal)
    const overflow = await page.evaluate(() => {
      const de = document.documentElement;
      return {
        scrollW: de.scrollWidth,
        clientW: de.clientWidth,
        overflowPx: de.scrollWidth - de.clientWidth,
      };
    });
    const file = `${outDir}/${r.name}__${vp.name}.png`;
    await page.screenshot({ path: file, fullPage: true });
    const flag = overflow.overflowPx > 1 ? `  <-- OVERFLOW +${overflow.overflowPx}px` : "";
    results.push(`${r.name.padEnd(5)} ${vp.name.padEnd(6)} ${vp.width}px  scrollW=${overflow.scrollW}${flag}`);
  }
  await ctx.close();
}
await browser.close();
console.log(`\nScreenshots -> ${outDir}\n`);
console.log(results.join("\n"));
