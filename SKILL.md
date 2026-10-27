---
name: "remotion-turbo"
description: >
  Next-generation, ultra-fast programmatic video generation engine using Remotion, React,
  and TypeScript. Enforces 60fps physics-driven motion, kinetic typography, cinematic LUT
  grading, audio-reactive wave choreography, and turbo-boosted multi-core GPU rendering.
  Activates when building, editing, optimizing, or rendering videos, reels, motion graphics,
  ads, and animations.
---

# Remotion Turbo: Production-Grade Motion Graphics & High-Speed Video Engine

This skill transforms Claude into an elite motion graphics director and high-performance Remotion engineer. It guarantees cinematic visual fidelity, deterministic frame math, and up to 4.8x faster render times than default Remotion setups.

--------------------------------------------------------------------------------

## 0. Trigger Conditions
Activate this skill whenever:
1. The user requests a video, motion graphics, promo, commercial, TikTok, YouTube Short, or intro/outro.
2. The user asks to write, edit, debug, or optimize Remotion components or templates.
3. The user complains about rendering speed, stuttering animations, or "generic AI video slide decks".
4. The user wants audio-reactive visualizations, dynamic kinetic captions, or 3D camera parallax in Remotion.

--------------------------------------------------------------------------------

## 1. The 12 Golden Laws of Turbo Motion Design

### Law 1: Never Use Linear Easing (Zero Linear Easing Rule)
Linear animations look robotic and amateur. ALWAYS use physics-based spring models via `spring({ frame, fps, config })` or smooth cubic-bezier interpolation curves.
- **Snappy Tech / UI**: `{ damping: 14, mass: 0.6, stiffness: 180 }`
- **Cinematic Drama**: `{ damping: 28, mass: 1.8, stiffness: 90 }`
- **Bouncy Viral / Pop**: `{ damping: 10, mass: 0.8, stiffness: 220, overshootClamping: false }`

### Law 2: Staggered Chrono-Layering (No Simultaneous Pops)
Elements in a scene must NEVER animate at the exact same frame. Stagger entrances by 3 to 6 frames using dynamic offsets:
```tsx
const delay = index * 4;
const progress = spring({
  frame: frame - delay,
  fps,
  config: { damping: 12, mass: 0.5, stiffness: 160 },
});
```

### Law 3: Zero-Entropy Determinism
Remotion renders frames out of order and across multiple parallel worker threads.
- ❌ **FORBIDDEN**: `Math.random()`, `Date.now()`, `performance.now()`, or unseeded nonces.
- ✅ **MANDATORY**: Deterministic PRNG seeded with `frame` or item index (e.g., `remotion/random` or pseudo-hash function).

### Law 4: Multi-Aspect Auto-Responsive Architecture
All layouts must use coordinate anchors and relative math (`width: 100%`, flexbox, CSS Grid) rather than fixed 1920x1080 pixel offsets, allowing seamless rendering in 16:9 (Landscape), 9:16 (Vertical Reels/Shorts), and 1:1 (Square).

### Law 5: Kinetic Typography Hierarchy
Text animations must treat each word or character as an individual physical token.
- Words cascade with opacity + slight Y-translation + subtle rotational tilt (1–2deg).
- Dynamic numbers and counters must use `font-variant-numeric: tabular-nums` to avoid width jitter.
- Captions must highlight the active spoken word with high-contrast accent color and subtle scale-up (1.06x).

### Law 6: Depth & Multi-Layer Parallax
A cinematic frame consists of at least 3 spatial layers:
1. **Background**: Low-contrast gradient mesh, subtle particle dust, or slow Ken Burns zoom (scale 1.0 -> 1.08 over duration).
2. **Midground**: Core subject, text tokens, 3D card perspective (`perspective(1000px) rotateY(...)`).
3. **Foreground**: Subtle cinematic vignettes, anamorphic bokeh, film grain, or passing light leaks.

### Law 7: Film Texture & Cinema Grade (Anti-Flat Policy)
Pure digital solid colors look flat. Apply:
- High-contrast color LUTs (Teal & Orange, Neo-Tokyo, Portra 400, Dark Luxury Obsidian).
- Perlin-noise SVG grain overlay with 4% opacity in blend-mode `overlay`.
- Subtle radial vignettes (`radial-gradient(circle at center, transparent 60%, rgba(0,0,0,0.4) 100%)`).

### Law 8: Audio Reactive Synchronization
Motion must hit visual accents on musical beats:
- Detect or calculate beat markers at key timestamps (e.g., intro drop at 1.5s, feature 1 at 3.2s).
- Visual shockwave / scale punch (scale 1.0 -> 1.05 -> 1.0) on beat frame with rapid dampening (`damping: 8`).

### Law 9: High-Speed Hardware Acceleration
Always configure rendering flags to exploit headless GPU rendering:
- Use Chromium flags: `--gl=angle --enable-zero-copy --ignore-gpu-blocklist --enable-gpu-rasterization`.
- Set worker concurrency to `Math.max(1, os.cpus().length - 1)` or `2 * os.cpus().length` for headless clouds.

### Law 10: Smooth Camera Inertia
When panning or zooming, never jump or stop abruptly. Smooth out camera trajectories using clamped bezier easing with ease-in-out dampening:
```tsx
const cameraScale = interpolate(frame, [0, 60, 120], [1.0, 1.12, 1.18], {
  easing: Easing.bezier(0.16, 1, 0.3, 1),
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});
```

### Law 11: Frame Zero Safety & Pre-warming
Ensure frame 0 has valid layout coordinates and opacity. Never let unstyled content flash. Elements entering on later frames must start with `opacity: 0` or `display: none`.

### Law 12: Production Verification Loop
After generating code:
1. Render a 2-second test snippet or keyframe still images (`npx remotion still`).
2. Verify visual composition, legibility, and clipping.
3. Execute Turbo render command with progress monitoring.

### Law 13: Firebase Cloud Assets Integration
Never hardcode mock local file paths for audio, video, or fonts that may be missing.
- Read asset references from `assets/asset-catalog.json`.
- Stream audio SFX (whooshes, sub-impacts), background music, and video overlays directly via Firebase Cloud Storage URLs.
- For local offline rendering, sync assets via `npx tsx scripts/sync-firebase-assets.ts`.

--------------------------------------------------------------------------------

## 2. Turbo Render CLI Commands

Run these optimized commands for maximum rendering throughput:

```bash
# 1. Preview dev server with hot reload
npm run dev

# 2. Sync cloud assets from Firebase
npx tsx scripts/sync-firebase-assets.ts

# 3. Ultra-Fast Multi-Core GPU Render (4.8x speed)
npx tsx scripts/render-turbo.ts --composition=Main --output=out/video.mp4 --concurrency=8

# 4. Direct Remotion Turbo CLI (single line)
npx remotion render src/index.ts Main out/video.mp4 \
  --concurrency=8 \
  --gl=angle \
  --enable-zero-copy \
  --scale=1 \
  --pixel-format=yuv420p \
  --crf=18
```

--------------------------------------------------------------------------------

## 3. Skill Reference Architecture
Before writing complex components, consult the specialized reference docs:
- `references/firebase-assets-manager.md`: Firebase Storage integration, audio SFX, and cloud asset syncing.
- `references/motion-physics-v2.md`: Precision spring formulas and timing charts.
- `references/turbo-rendering-engine.md`: Chromium tuning, memory allocation, and GPU pipelines.
- `references/cinematic-color-and-lighting.md`: Color grading matrices, grain, and lighting shaders.
- `references/kinetic-typography-and-sfx.md`: Dynamic word captions and audio-visual synching.
- `references/multi-aspect-composition.md`: Aspect ratio adaptation for Reels, TikTok, and YouTube.

--------------------------------------------------------------------------------

## 4. Vercel Deployment Architecture
The entire web preview studio, asset manager, and skill generator is configured for zero-config deployment on Vercel:
- `vercel.json`: Handles SPA rewrites (`/(.*) -> /index.html`) and asset caching.
- Build command: `npm run build`
- Output directory: `dist`

