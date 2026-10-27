#!/usr/bin/env tsx
// @ts-nocheck
/**
 * Remotion Turbo Render CLI
 * Multi-threaded GPU accelerated video renderer.
 */
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import os from "os";

async function runTurboRender() {
  const args = process.argv.slice(2);
  const compositionId = args.find((a) => a.startsWith("--composition="))?.split("=")[1] || "Main";
  const outputPath = args.find((a) => a.startsWith("--output="))?.split("=")[1] || "out/video.mp4";
  
  const cpus = os.cpus().length;
  const concurrency = Math.max(2, Math.min(16, Math.floor(cpus * 1.5)));
  
  console.log("⚡ Starting Remotion Turbo Render Pipeline");
  console.log(`💻 Detected ${cpus} CPU cores. Allocating ${concurrency} parallel Chromium workers.`);
  console.log(`🎬 Target Composition: ${compositionId}`);
  console.log(`📁 Output Destination: ${outputPath}`);

  const entryPoint = path.resolve(process.cwd(), "src/index.ts");
  
  const startTime = Date.now();

  const composition = await selectComposition({
    serveUrl: entryPoint,
    id: compositionId,
  });

  await renderMedia({
    composition,
    serveUrl: entryPoint,
    codec: "h264",
    outputLocation: outputPath,
    concurrency,
    chromiumOptions: {
      gl: "angle",
      enableZeroCopy: true,
      ignoreGpuBlocklist: true,
    },
    pixelFormat: "yuv420p",
    crf: 18,
    onProgress: ({ progress }) => {
      const percent = Math.floor(progress * 100);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      process.stdout.write(`\r⚡ Rendering [${percent}%] - Elapsed: ${elapsed}s`);
    },
  });

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n✅ Render complete in ${totalTime}s!`);
  console.log(`🎉 Output file saved to: ${outputPath}`);
}

runTurboRender().catch((err) => {
  console.error("❌ Turbo render error:", err);
  process.exit(1);
});
