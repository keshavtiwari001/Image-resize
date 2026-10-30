/**
 * End-to-end smoke tests for the image utility site.
 * Run: node tests/e2e.mjs  (dev server must be running on :3000)
 */
import { chromium } from "playwright";

const BASE = "http://localhost:3000";
let passed = 0;
let failed = 0;

function check(name, ok, detail = "") {
  if (ok) {
    passed++;
    console.log(`  PASS  ${name}`);
  } else {
    failed++;
    console.log(`  FAIL  ${name} ${detail}`);
  }
}

// Create a real JPEG test image as { name, mimeType, buffer } for setInputFiles.
// The canvas is rendered inside the browser; the JPEG bytes come back as base64.
async function makeTestFile(page, name = "test-photo.jpg") {
  const dataUrl = await page.evaluate(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(0, 0, 500, 300);
    ctx.fillStyle = "#2c3e50";
    ctx.font = "40px sans-serif";
    ctx.fillText("TEST", 180, 160);
    return canvas.toDataURL("image/jpeg", 0.9);
  });
  return {
    name,
    mimeType: "image/jpeg",
    buffer: Buffer.from(dataUrl.split(",")[1], "base64"),
  };
}

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await context.newPage();
const errors = [];
page.on("pageerror", (err) => errors.push(err.message));

// ---------- 1. Homepage + theme ----------
console.log("\n[1] Homepage + theme");
await page.goto(BASE, { waitUntil: "networkidle" });
const h1 = await page.textContent("h1");
check("h1 renders", h1.includes("Browser-Based Image Utility"), h1);

const themeGroup = await page.locator('[role="radiogroup"][aria-label="Theme"]').count();
check("theme toggle renders", themeGroup === 1);

await page.click('[aria-label="Dark theme"]');
let htmlClass = await page.getAttribute("html", "class");
check("dark mode applies .dark class", htmlClass.includes("dark"), htmlClass);

await page.reload({ waitUntil: "networkidle" });
htmlClass = await page.getAttribute("html", "class");
check("dark mode persists after reload", htmlClass.includes("dark"), htmlClass);

await page.click('[aria-label="Light theme"]');
htmlClass = await page.getAttribute("html", "class");
check("light mode switches back", !htmlClass.includes("dark"), htmlClass);

// ---------- 2. Compress: quality compression ----------
console.log("\n[2] Compress Image page");
await page.goto(`${BASE}/compress-image`, { waitUntil: "networkidle" });

let file = await makeTestFile(page);
await page.setInputFiles('input[type="file"]', file);
await page.waitForSelector("img[alt='test-photo.jpg']", { timeout: 15000 });
check("upload creates thumbnail", true);

await page.click("button:has-text(\"Compress Images\")");
await page.waitForFunction(() => document.body.innerText.includes("Ready to Download"), null, { timeout: 20000 });
check("quality compression completes with download panel", true);

// ---------- 3. Target-size compression ----------
console.log("\n[3] Target size compression (3000x2000 noisy image -> 200 KB)");
await page.goto(`${BASE}/compress-image`, { waitUntil: "networkidle" });

const bigFile = await page.evaluate(() => {
  const canvas = document.createElement("canvas");
  canvas.width = 3000;
  canvas.height = 2000;
  const ctx = canvas.getContext("2d");
  const img = ctx.createImageData(3000, 2000);
  for (let i = 0; i < img.data.length; i += 4) {
    img.data[i] = (i * 7) % 256;
    img.data[i + 1] = (i * 13) % 256;
    img.data[i + 2] = (i * 3) % 256;
    img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL("image/jpeg", 0.95).split(",")[1];
}).then((b64) => ({
  name: "big-photo.jpg",
  mimeType: "image/jpeg",
  buffer: Buffer.from(b64, "base64"),
}));

await page.setInputFiles('input[type="file"]', bigFile);
await page.waitForSelector("img[alt='big-photo.jpg']", { timeout: 15000 });

await page.click('button:has-text("200 KB")');
await page.click("button:has-text(\"Compress Images\")");
await page.waitForFunction(() => document.body.innerText.includes("Ready to Download"), null, { timeout: 60000 });

// Read the processed size shown in the download panel
const sizeText = await page.evaluate(() => document.body.innerText);
const sizeMatch = sizeText.match(/(\d+(?:\.\d+)?) KB processed/);
check("target-size compression completes", true);

// ---------- 4. Resize ----------
console.log("\n[4] Resize Image page");
await page.goto(`${BASE}/resize-image`, { waitUntil: "networkidle" });

file = await makeTestFile(page);
await page.setInputFiles('input[type="file"]', file);
await page.waitForSelector("img[alt='test-photo.jpg']", { timeout: 15000 });

const widthInput = page.locator('input[type="number"]').first();
const w0 = await widthInput.inputValue();
check("resize width pre-filled with original (500)", w0 === "500", w0);

await widthInput.fill("250");
const heightInput = page.locator('input[type="number"]').nth(1);
const h0 = await heightInput.inputValue();
check("aspect ratio recalculates height to 150", h0 === "150", h0);

await page.click("button:has-text(\"Resize Images\")");
await page.waitForFunction(() => document.body.innerText.includes("Ready to Download"), null, { timeout: 20000 });
check("resize completes", true);

// ---------- 5. Image editor: rotate + brightness pipeline ----------
console.log("\n[5] Image Editor");
await page.goto(`${BASE}/image-editor`, { waitUntil: "networkidle" });

file = await makeTestFile(page);
await page.setInputFiles('input[type="file"]', file);
// The editor shows the working image as alt="Preview" (no thumbnail list)
await page.waitForSelector("img[alt='Preview']", { timeout: 15000 });

await page.click('button:has-text("90°")');
// Brightness slider is the 2nd range in the Filters tab; go to Filters tab first
await page.click('button:has-text("Filters & Effects")');
await page.locator('input[type="range"]').nth(1).fill("120");
await page.click("button:has-text(\"Apply \u0026 Preview Changes\")");
await page.waitForSelector("text=Side by side", { timeout: 30000 });
check("editor applies rotate + brightness, shows compare view", true);

const bodyText = await page.textContent("body");
check("compare shows Original vs Current", bodyText.includes("Original") && bodyText.includes("Current"));

// ---------- 6. Conversion ----------
console.log("\n[6] JPG to PNG conversion");
await page.goto(`${BASE}/jpg-to-png`, { waitUntil: "networkidle" });

file = await makeTestFile(page);
await page.setInputFiles('input[type="file"]', file);
await page.waitForSelector("img[alt='test-photo.jpg']", { timeout: 15000 });
await page.click("button:has-text(\"Convert to PNG\")");
await page.waitForFunction(() => document.body.innerText.includes("Ready to Download"), null, { timeout: 20000 });
check("JPG to PNG conversion completes", true);

// ---------- 7. Static pages ----------
console.log("\n[7] Static pages");
for (const route of ["/about", "/contact", "/faq", "/privacy-policy"]) {
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
  const h1Count = await page.locator("h1").count();
  check(`${route} renders with h1`, h1Count > 0);
}

// ---------- 8. Contact form validation ----------
await page.goto(`${BASE}/contact`, { waitUntil: "networkidle" });
await page.click("button:has-text(\"Send Message\")");
const errCount = await page.locator("text=Name is required.").count();
check("contact form shows validation errors", errCount === 1);

// ---------- 9. Console errors ----------
console.log("\n[9] Console errors");
check("no uncaught page errors across all tests", errors.length === 0, errors.slice(0, 3).join(" | "));

await browser.close();

console.log(`\n===== RESULTS: ${passed} passed, ${failed} failed =====`);
process.exit(failed > 0 ? 1 : 0);
