#!/usr/bin/env tsx
// @ts-nocheck
/**
 * Firebase Assets Downloader & Synchronizer for Remotion Turbo
 * Downloads assets defined in assets/asset-catalog.json for ultra-fast local offline rendering.
 */
import fs from "fs";
import path from "path";
import https from "https";

const CATALOG_PATH = path.resolve(process.cwd(), "assets/asset-catalog.json");

async function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        return downloadFile(response.headers.location!, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve();
      });
    }).on("error", (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function syncAssets() {
  console.log("🔥 Syncing Firebase Assets for Claude Remotion Turbo...");
  if (!fs.existsSync(CATALOG_PATH)) {
    console.error("❌ asset-catalog.json not found at:", CATALOG_PATH);
    process.exit(1);
  }

  const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, "utf-8"));
  const assets = catalog.assets || [];

  console.log(`📦 Found ${assets.length} assets registered in catalog.`);

  for (const asset of assets) {
    const dest = path.resolve(process.cwd(), asset.localPath);
    if (fs.existsSync(dest)) {
      console.log(`⏭️  Skipping existing: ${asset.name} (${asset.localPath})`);
      continue;
    }
    console.log(`⬇️  Downloading [${asset.category}]: ${asset.name}...`);
    try {
      await downloadFile(asset.url, dest);
      console.log(`✅ Saved: ${asset.localPath}`);
    } catch (e) {
      console.warn(`⚠️ Could not download ${asset.url}:`, e.message);
    }
  }

  console.log("🎉 Firebase asset synchronization completed successfully!");
}

syncAssets().catch(console.error);
