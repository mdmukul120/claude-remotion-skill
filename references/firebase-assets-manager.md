# Firebase Cloud Assets Integration for Remotion Turbo

This guide details how Claude loads, streams, and caches production assets (Audio SFX, Background Music, Video Overlays, Fonts, and LUTs) stored in Firebase Storage directly inside Remotion compositions.

--------------------------------------------------------------------------------

## 1. Firebase Asset Storage Architecture

Assets are stored in **Firebase Cloud Storage** and indexed in `assets/asset-catalog.json`:
- **Audio / SFX**: Fast whooshes, sub-bass impacts, UI tactile clicks, tension risers.
- **Background Music**: Beat-matched tracks with known BPM (124, 128, 140 BPM).
- **Video Overlays**: Film grain, floating dust particles, light leaks, glitch overlays.
- **Fonts & Textures**: Custom WOFF2 fonts and 3D LUT cube files.

### Catalog Schema (`assets/asset-catalog.json`)
```json
{
  "id": "sfx-cinematic-impact",
  "name": "Heavy Sub Bass Impact",
  "category": "sfx",
  "type": "audio/mp3",
  "url": "https://firebasestorage.googleapis.com/v0/b/YOUR_BUCKET/o/sfx%2Fsub-impact.mp3?alt=media",
  "localPath": "assets/sfx/sub-impact.mp3",
  "durationFrames": 45
}
```

--------------------------------------------------------------------------------

## 2. Using Firebase Assets in Remotion Components

### Method A: Direct Firebase Cloud URL (Zero Local Download Required)
Remotion natively streams audio and video directly from Firebase Storage:

```tsx
import { Audio, Video, staticFile, useCurrentFrame } from "remotion";
import catalog from "../assets/asset-catalog.json";

export const VideoSceneWithAudio = () => {
  const frame = useCurrentFrame();

  // 1. Retrieve asset from catalog
  const whooshSfx = catalog.assets.find((a) => a.id === "sfx-woosh-fast");
  const techBgm = catalog.assets.find((a) => a.id === "bgm-tech-minimal");

  return (
    <div>
      {/* Background Music Loop */}
      {techBgm && (
        <Audio
          src={techBgm.url}
          volume={0.35}
          startFrom={0}
        />
      )}

      {/* Synchronized Sound Effect triggered at frame 20 */}
      {frame >= 20 && whooshSfx && (
        <Audio
          src={whooshSfx.url}
          volume={0.8}
        />
      )}
    </div>
  );
};
```

### Method B: Prefetching Firebase Assets for Turbo Render Speed
To eliminate network latency during multi-threaded headless GPU renders:

```tsx
import { prefetch } from "remotion";
import catalog from "../assets/asset-catalog.json";

// Prefetch critical assets before renderMedia executes
export const prefetchCloudAssets = () => {
  return Promise.all(
    catalog.assets.map((asset) => {
      const { free, waitUntilDone } = prefetch(asset.url, {
        method: "blob-url",
      });
      return waitUntilDone();
    })
  );
};
```

--------------------------------------------------------------------------------

## 3. Adding New Assets via Firebase

### Option 1: Via Web UI
Use the built-in **Firebase Asset Manager** in the Claude Remotion Turbo Studio web dashboard. Enter the asset title, select category (SFX, Music, Overlay, Font), and paste your Firebase Storage URL or upload.

### Option 2: CLI Sync Script
Run the automated sync tool to pull cloud assets locally:
```bash
npx tsx scripts/sync-firebase-assets.ts --bucket=claude-remotion-turbo.appspot.com
```

### Option 3: Firebase Admin SDK upload
```typescript
import { getStorage } from "firebase-admin/storage";
const bucket = getStorage().bucket();
await bucket.upload("local/sound.mp3", { destination: "sfx/sound.mp3" });
```
