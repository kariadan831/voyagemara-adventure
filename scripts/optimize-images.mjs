import sharp from "sharp";
import fs from "fs";
import path from "path";

const folders = [
  "public/images",
  "public/tours",
];

const sizes = [480, 768, 1200, 1920];

function seoFilename(filename) {
  const ext = path.extname(filename).toLowerCase();

  return (
    path
      .basename(filename, ext)
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/_+/g, "-")
      .replace(/-+/g, "-") + ext
  );
}

function needsOptimization(input, output) {
  if (!fs.existsSync(output)) {
    return true;
  }

  return (
    fs.statSync(input).mtimeMs >
    fs.statSync(output).mtimeMs
  );
}

async function optimizeFolder(folder) {
  const files = fs.readdirSync(folder);

  for (const file of files) {
    const oldPath = path.join(folder, file);
    const stat = fs.statSync(oldPath);

    if (stat.isDirectory()) {
      await optimizeFolder(oldPath);
      continue;
    }

    const ext = path.extname(file).toLowerCase();

    if (![".jpg", ".jpeg", ".png"].includes(ext)) {
      continue;
    }

    const seoName = seoFilename(file);
    const seoPath = path.join(folder, seoName);

    if (oldPath !== seoPath) {
      fs.renameSync(oldPath, seoPath);
    }

    for (const width of sizes) {
      const output = seoPath.replace(ext, `-${width}.webp`);

      if (!needsOptimization(seoPath, output)) {
        console.log(`⏭️ Skipped ${output}`);
        continue;
      }

      await sharp(seoPath)
        .resize({
          width,
          withoutEnlargement: true,
        })
        .webp({
          quality: 82,
          effort: 6,
        })
        .toFile(output);

      console.log(`✅ ${output}`);
    }
  }
}

(async () => {
  try {
    for (const folder of folders) {
      await optimizeFolder(folder);
    }

    console.log("\n🎉 All images optimized successfully!");
  } catch (err) {
    console.error(err);
  }
})();