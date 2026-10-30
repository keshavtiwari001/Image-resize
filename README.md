# ImageUtility — Browser-Based Image Converter, Compressor & Editor

A fast, privacy-focused image utility website. Users can convert between JPG, PNG, and WEBP, compress images to a target file size, resize by pixel dimensions, edit with crop/rotate/filters/watermarks, and download results — including multi-image ZIP downloads.

**All image processing happens locally in the browser.** No backend, no uploads, no accounts.

## Tech Stack

| Technology | Why |
|---|---|
| **Next.js 16 (App Router)** | Static generation for fast, SEO-friendly tool pages. |
| **React 19** | Component-based UI for the interactive editor. |
| **JavaScript only** | No TypeScript anywhere (`.js` / `.jsx` only), per project requirements. |
| **Tailwind CSS v4** | Responsive, mobile-first styling with light/dark/system theming. |
| **JSZip** | Bundles multiple processed images into a ZIP entirely client-side. |
| **Canvas / OffscreenCanvas / Blob / Object URLs** | Native browser image decoding, transformation, and re-encoding — zero server involvement. |
| **Playwright** (dev only) | End-to-end browser tests (`tests/e2e.mjs`). |

## Project Structure

```
src/
├── app/                        # Next.js App Router pages (one folder per route)
│   ├── page.js                 # Homepage — links to all tools
│   ├── layout.js               # Root layout: Header, Footer, theme init script
│   ├── globals.css             # Tailwind v4 + dark-mode variant + theme variables
│   ├── sitemap.js              # Generates /sitemap.xml from lib/seo.js
│   ├── robots.js               # Generates /robots.txt
│   ├── about/                  # About page
│   ├── contact/                # Contact page (frontend-only mailto form)
│   ├── faq/                    # FAQ page (with FAQPage JSON-LD)
│   ├── privacy-policy/         # Privacy policy (accurate to implementation)
│   ├── jpg-to-png/             # Conversion tool pages (each with unique
│   ├── png-to-jpg/             #   metadata, OG/Twitter cards, breadcrumbs,
│   ├── webp-to-jpg/            #   how-to, and related links)
│   ├── jpg-to-webp/
│   ├── png-to-webp/
│   ├── webp-to-png/
│   ├── image-to-zip/           # Batch convert + ZIP download
│   ├── compress-image/         # Compression tool (layout.js holds SEO metadata)
│   ├── resize-image/           # Dimension resizing tool
│   └── image-editor/           # All-in-one multi-step editor
├── components/
│   ├── layout/
│   │   ├── Header.jsx          # Site nav + theme toggle (sticky)
│   │   ├── Footer.jsx          # Footer with tool/legal links
│   │   ├── ThemeToggle.jsx      # Light/Dark/System radio group (useSyncExternalStore)
│   │   ├── Breadcrumbs.jsx      # Visible breadcrumbs + BreadcrumbList JSON-LD
│   │   └── AdSlot.jsx          # Responsive AdSense placements
│   ├── image/
│   │   ├── ImageUploader.jsx   # Drag & drop + file picker, validation
│   │   ├── ImageList.jsx       # Thumbnail grid with remove buttons
│   │   ├── ConvertTool.jsx     # Reusable single-conversion workflow
│   │   ├── CompressionControls.jsx  # Format picker, quality slider, target sizes
│   │   ├── ResizeControls.jsx  # W/H inputs, aspect lock, ratio presets
│   │   ├── EditingToolbar.jsx  # Tabs: Transform / Filters / Overlays / Style
│   │   ├── CropModal.jsx       # Visual drag-to-crop dialog
│   │   ├── ComparePreview.jsx  # Side-by-side + slider comparison
│   │   └── DownloadPanel.jsx   # Per-file + ZIP downloads (suffix-aware)
│   ├── ContactForm.jsx         # Validated contact form (mailto: fallback)
│   └── ui/                      # (reserved for small shared UI pieces)
├── lib/
│   ├── theme.js                # Theme constants + applyTheme()
│   ├── seo.js                  # SITE_URL, tool list (drives sitemap)
│   └── image/
│       ├── loadImage.js        # File → validated working-image state object
│       ├── compressImage.js    # processImage(): full pipeline + target-size search
│       ├── editImage.js        # Canvas edits: crop/rotate/flip/filters/overlays
│       ├── resizeImage.js      # Canvas scaling + aspect-ratio math
│       ├── encodeImage.js      # Worker-first encoding with main-thread fallback
│       ├── zipImages.js        # JSZip wrapper for bulk download
│       └── cleanup.js          # Object URL revocation + downloadBlob helper
├── workers/
│   └── imageWorker.js          # OffscreenCanvas encoding worker
└── tests/
    └── e2e.mjs                 # Playwright end-to-end tests
```

## Pages

| Route | Purpose |
|---|---|
| `/` | Homepage with links to all tools |
| `/compress-image` | Compress by quality slider or target size (20 KB–1 MB + custom) |
| `/resize-image` | Resize by pixel dimensions, aspect lock, ratio presets |
| `/image-editor` | Multi-step editor: crop, transform, filters, text/watermark, resize, convert, compress |
| `/jpg-to-png` … `/webp-to-png` | Six format-conversion tools |
| `/image-to-zip` | Batch convert multiple images into one ZIP |
| `/about` | Who built it, how browser processing works, privacy answers |
| `/contact` | Contact form (opens the user's email client — no fake backend) |
| `/privacy-policy` | Privacy policy with advertising and cookie disclosures |
| `/faq` | 15 Q&As + FAQPage structured data |

## Image Processing Functions

**`loadImage.js`** — validates the file is an image, creates an object URL, decodes dimensions, returns a "working image" state object (original info + transformation defaults).

**`compressImage.js`**
- `processImage()` — the main pipeline: load → edits → resize → encode.
- `compressToTargetSize()` — binary-searches quality (8 iterations) to hit a target file size; falls back to 20% dimension reduction if quality alone can't reach it.
- `canvasToBlob()` — promise wrapper around `canvas.toBlob()`.

**`editImage.js`** — `applyEditsToCanvas()` applies crop, rotate, flip, CSS filters (grayscale/brightness/contrast/saturation/blur), pixelation, convolution sharpening, watermark (text/position/opacity/size/color), text overlay (position/size/color/alignment), borders (width/style/color), and rounded corners in a single canvas pass.

**`resizeImage.js`** — `resizeCanvas()` (high-quality smooth rescaling) and `calculateDimensions()` (aspect-ratio math).

**`encodeImage.js`** — `encodeCanvas()` prefers the Web Worker; falls back to the main thread when `OffscreenCanvas` is unavailable (older Safari).

**`cleanup.js`** — `releaseImageUrls()` frees both object URLs when an image is removed/replaced; `downloadBlob()` triggers a download and revokes the URL after it starts.

**`zipImages.js`** — adds every processed blob to a JSZip archive and returns the ZIP blob.

## Web Worker

`src/workers/imageWorker.js` runs the CPU-heavy **iterative target-size encoding** off the main thread so the UI stays responsive during multi-iteration quality search on large images.

- **Why:** the binary search calls `toBlob()` up to 8+ times; on a 3000×2000 image that's noticeable jank.
- **What runs inside:** `compressToTargetSize()` operating on a transferred `OffscreenCanvas` via `convertToBlob()`.
- **Communication:** `encodeImage.js` posts `{ id, canvas, format, quality, targetSizeKB }`, transfers the canvas, and resolves a promise keyed by `id` when the worker replies `{ id, type: "done", blob, size }`. On any worker error it silently falls back to main-thread encoding.

## How Chained Operations Work

All operations accumulate on a single **working image state object** — nothing is encoded until the user clicks "Apply" / "Convert" / "Compress". The pipeline then runs once:

```
Original File
→ applyEditsToCanvas()   (crop → rotate → flip → filters → overlays → borders)
→ resizeCanvas()         (pixel resize)
→ encodeCanvas()         (format conversion; worker if available)
→ compressToTargetSize() (if target size set — iterative quality search)
→ Blob → preview + download
```

Intermediate steps stay as canvases in memory; the image is encoded exactly once per "Apply". Object URLs from previous previews are revoked before replacements are created (`lib/image/cleanup.js`).

## Memory Management

- Re-processing revokes the previous `processedUrl` before creating the new one.
- "Remove" and "Clear all" revoke both `objectUrl` and `processedUrl`.
- ZIP downloads use `downloadBlob()`, which revokes the archive URL one minute after the download starts.
- This matters most on mobile, where large images can otherwise pin tens of MB.

## Theme System

- Inline script in `layout.js` applies the stored theme **before first paint** (no flash).
- `ThemeToggle` reads localStorage via `useSyncExternalStore`, which renders `"system"` on the server and syncs to the stored value after hydration — no hydration mismatch.
- `<html suppressHydrationWarning>` covers the class added by the init script.
- Tailwind v4 `@custom-variant dark` makes `dark:` utilities follow the `.dark` class.

## Testing

```bash
npm run dev          # in one terminal
node tests/e2e.mjs   # in another — 20 Playwright assertions
```

The suite covers: theme toggle + persistence, upload, quality compression, target-size compression on a 3000×2000 image, aspect-ratio recalculation, editor apply + compare view, JPG→PNG conversion, static pages, contact validation, and zero console errors.

## Privacy

All processing is client-side. Image files never leave the user's device — no upload endpoint, no server, no storage. The privacy policy page documents this accurately.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production

```bash
npm run build
npm start
```

## Before Deploying

1. Replace `SITE_URL` in `src/lib/seo.js` with your real domain (affects canonical URLs, sitemap, OG tags).
2. Replace the default favicon in `src/app/favicon.ico`.
3. Set `NEXT_PUBLIC_CONTACT_EMAIL` in `.env.local` to your public support address, then rebuild.
   Until configured, the Contact Us page shows that the contact address is being set up.

## Google AdSense setup

Responsive ad placements are integrated on the homepage and image tool pages. Missing or
disabled configuration renders no ad placeholders and loads no advertising script.

1. Copy `.env.example` to `.env.local`. Set `NEXT_PUBLIC_ADSENSE_CLIENT` to your real
   `ca-pub-` ID (16 digits). Keep `NEXT_PUBLIC_ADSENSE_ENABLED=false` during setup.
2. Add your production domain in AdSense and request approval. The publisher ID adds
   the verification meta tag and publishes `/ads.txt`, even while ad serving is disabled.
3. Create three responsive Display ad units in AdSense. Put their numeric IDs into
   `NEXT_PUBLIC_ADSENSE_SLOT_TOP`, `NEXT_PUBLIC_ADSENSE_SLOT_CONTENT`, and
   `NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM`. Content units are reused across tool pages.
4. Configure and publish consent messages in AdSense **Privacy & messaging** before
   enabling ads. Use Google's certified CMP for relevant regions, including the EEA,
   UK, and Switzerland. This integration relies on AdSense/CMP consent handling;
   it does not implement its own consent banner. Configure applicable US state messages
   and verify privacy choices in your account as appropriate for your audience.
5. After approval and consent setup, set `NEXT_PUBLIC_ADSENSE_ENABLED=true`, rebuild,
   and deploy. `NEXT_PUBLIC_*` values are fixed at build time. Check `/ads.txt` on your
   production domain and use AdSense diagnostics to verify serving.

Keep Auto ads disabled in AdSense if you want only these manually placed units.
Ad blockers, approval status, and available inventory can prevent ads from appearing.
Never click your own live ads to test them.

References: [AdSense consent requirements](https://support.google.com/adsense/answer/13554116)
and [ads.txt](https://support.google.com/adsense/answer/7532444).

## SEO

- Unique title, meta description, canonical URL, OG + Twitter cards on every page
- `/sitemap.xml` generated from `src/lib/seo.js` — add new pages there
- BreadcrumbList + FAQPage JSON-LD structured data
- Breadcrumbs on all tool pages
