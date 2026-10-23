const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const sharp = require("sharp");

const PUBLIC  = path.resolve("public");
const GALLERY = path.join(PUBLIC, "gallery");
const SRC     = path.resolve("src");
const IMG_EXTS     = [".jpg",".jpeg",".png",".gif",".webp"];
const CONVERT_EXTS = [".jpg",".jpeg",".png"];
const WIDTHS = [480, 768, 1200, 1920];

function walk(dir) {
  let out = [];
  for (const e of fs.readdirSync(dir)) {
    const f = path.join(dir, e);
    fs.statSync(f).isDirectory() ? out = out.concat(walk(f)) : out.push(f);
  }
  return out;
}
function hashFile(f) {
  return crypto.createHash("sha256").update(fs.readFileSync(f)).digest("hex");
}
function kb(f) { return Math.round(fs.statSync(f).size / 1024); }
function rel(f) { return path.relative(process.cwd(), f); }

async function main() {
  console.log("\n=== VoyageMara Image Optimizer ===\n");

  // 1. Inventory
  const allImgs = walk(PUBLIC).filter(f => IMG_EXTS.includes(path.extname(f).toLowerCase()));
  console.log("Images found:", allImgs.length);

  // 2. Hash-based dedup
  console.log("\nHashing images for duplicate detection...");
  const hMap = new Map();
  for (const f of allImgs) {
    const h = hashFile(f);
    if (!hMap.has(h)) hMap.set(h, []);
    hMap.get(h).push(f);
  }
  const dupGroups = [...hMap.values()].filter(g => g.length > 1);
  console.log("Duplicate content groups:", dupGroups.length);

  // 3. Move raw phone photos to gallery/
  const imagesDir = path.join(PUBLIC, "images");
  const rawPhotos = fs.existsSync(imagesDir)
    ? fs.readdirSync(imagesDir).filter(n => /^IMG[-_]/i.test(n)).map(n => path.join(imagesDir, n))
    : [];
  console.log("\nRaw phone photos:", rawPhotos.length);
  if (rawPhotos.length > 0) {
    if (!fs.existsSync(GALLERY)) fs.mkdirSync(GALLERY, { recursive: true });
    let moved = 0;
    for (const src of rawPhotos) {
      const dest = path.join(GALLERY, path.basename(src));
      if (!fs.existsSync(dest)) { fs.renameSync(src, dest); moved++; }
    }
    console.log("  Moved", moved, "raw photos -> public/gallery/");
  }

  // 4. Remove hash-identical duplicates
  console.log("\nRemoving hash-identical duplicates...");
  let remDupes = 0;
  for (const group of dupGroups) {
    group.sort((a, b) => {
      const ai = a.includes(path.join(PUBLIC, "images")) ? 0 : 1;
      const bi = b.includes(path.join(PUBLIC, "images")) ? 0 : 1;
      return ai !== bi ? ai - bi : a.length - b.length;
    });
    const [, ...dupes] = group;
    for (const d of dupes) {
      if (d.startsWith(GALLERY) || !fs.existsSync(d)) continue;
      try { fs.unlinkSync(d); remDupes++; console.log("  DEL:", rel(d)); }
      catch(e) { console.warn("  WARN:", e.message); }
    }
  }
  console.log("Removed", remDupes, "exact-copy duplicates");

  // 5. Convert .jpg/.png -> .webp + responsive sizes
  const toConvert = walk(PUBLIC).filter(f =>
    CONVERT_EXTS.includes(path.extname(f).toLowerCase()) && !f.startsWith(GALLERY)
  );
  console.log("\nConverting", toConvert.length, "images to WebP...");
  let converted = 0;
  const convMap = new Map();
  for (const srcFile of toConvert) {
    const dir   = path.dirname(srcFile);
    const base  = path.basename(srcFile, path.extname(srcFile));
    const dest  = path.join(dir, base + ".webp");
    const origKB = kb(srcFile);
    const isLogo = /^(logo|favicon|apple)/i.test(base);
    const isOg   = /og-image/i.test(base);
    const q      = isOg ? 85 : isLogo ? 90 : 82;
    try {
      let skip = false;
      if (fs.existsSync(dest) && fs.statSync(dest).mtimeMs >= fs.statSync(srcFile).mtimeMs) skip = true;
      if (!skip) {
        await sharp(srcFile).webp({ quality: q, effort: 6 }).toFile(dest);
        console.log("  OK:", path.basename(srcFile), "->", path.basename(dest), "(" + origKB + "KB -> " + kb(dest) + "KB)");
        converted++;
      }
      convMap.set(srcFile, dest);
      if (!isLogo && !isOg && origKB > 25) {
        for (const w of WIDTHS) {
          const rp = path.join(dir, base + "-" + w + ".webp");
          if (!fs.existsSync(rp)) {
            await sharp(srcFile).resize(w, null, { withoutEnlargement: true }).webp({ quality: q, effort: 6 }).toFile(rp);
          }
        }
      }
    } catch(e) { console.warn("  FAILED:", rel(srcFile), e.message); }
  }
  console.log("Converted", converted, "new images");

  // 6. Delete .jpg/.png originals where .webp exists
  console.log("\nRemoving original .jpg/.png (webp exists)...");
  let remOrig = 0;
  for (const [srcFile, webpFile] of convMap) {
    if (/^(logo|favicon|apple)/i.test(path.basename(srcFile))) continue;
    if (fs.existsSync(webpFile) && fs.existsSync(srcFile)) {
      try { fs.unlinkSync(srcFile); remOrig++; }
      catch(e) { console.warn("  WARN:", e.message); }
    }
  }
  console.log("Removed", remOrig, "originals");

  // 7. Update src/ references .jpg/.png -> .webp
  console.log("\nUpdating image refs in src/...");
  const srcExts = [".jsx",".js",".css",".html",".ts",".tsx"];
  const srcFiles = walk(SRC).filter(f => srcExts.includes(path.extname(f).toLowerCase()));
  let updFiles = 0, updRefs = 0;
  for (const f of srcFiles) {
    const orig = fs.readFileSync(f, "utf8");
    let updated = orig;
    // Replace .jpg, .jpeg, .png -> .webp when followed by a quote, comma, space, or closing paren
    updated = updated.replace(/\.(jpg|jpeg|png)(?="|'|`|,|\s|\)|\\)/g, function(m) {
      updRefs++;
      return ".webp";
    });
    if (updated !== orig) {
      fs.writeFileSync(f, updated, "utf8");
      updFiles++;
      console.log("  UPDATED:", rel(f));
    }
  }
  console.log("Updated", updRefs, "refs in", updFiles, "files");

  // Final stats
  const finalImgs = walk(PUBLIC).filter(f => IMG_EXTS.includes(path.extname(f).toLowerCase()));
  const totalBytes = finalImgs.reduce((s, f) => s + fs.statSync(f).size, 0);
  console.log("\n=== OPTIMIZATION COMPLETE ===");
  console.log("  Duplicates removed    :", remDupes);
  console.log("  Converted to WebP     :", converted);
  console.log("  Originals removed     :", remOrig);
  console.log("  Src refs updated      :", updRefs, "in", updFiles, "files");
  console.log("  Raw photos to gallery :", rawPhotos.length);
  console.log("  Remaining images      :", finalImgs.length);
  console.log("  Total image size      :", (totalBytes/1024/1024).toFixed(2), "MB");
  console.log("=================================\n");
}

main().catch(console.error);
