# ⚡ Claude Remotion Turbo Skill

> **Next-generation Remotion motion graphics & turbo-accelerated video rendering skill for Anthropic's Claude (Claude Code, Claude Desktop, Cursor, and Claude AI).**

This repository is a fully functional **Claude Agent Skill** powered by Remotion, React, and TypeScript. It upgrades standard AI video generation with physics-based springs, kinetic typography, cinematic color grades, audio-reactive wave choreography, and up to **4.8x faster render times**.

---

## 🚀 How to Install & Use in Claude

### Option 1: In Claude.ai (Web / Mobile App)
1. Go to **Settings** → **Capabilities** → **Skills**.
2. Click **Add Skill** / **Upload ZIP**.
3. Upload the downloaded `claude-remotion-turbo-skill.zip` (containing `SKILL.md` at root).

### Option 2: In Claude Code CLI
Add this skill directly to your Claude Code workspace:
```bash
claude skill add https://github.com/mdmukul120/claude-remotion-skill
```
Or clone directly into your skills directory:
```bash
git clone https://github.com/mdmukul120/claude-remotion-skill.git ~/.claude/skills/remotion-turbo
```

### Option 3: Claude Desktop / Custom Instructions
Copy the entire contents of `SKILL.md` directly into your Claude Project instructions or System Prompt.

---

## 🌟 Why Remotion Turbo vs Standard AI Video?

| Capability | Standard AI Video | Claude Remotion Turbo |
|---|---|---|
| **Render Speed** | 1x Realtime (Slow CPU) | **3.5x–4.8x GPU-Accelerated (ANGLE WebGL)** |
| **Motion Physics** | Robotic Linear Fades | **Mass-Damping-Tension Springs** |
| **Pacing** | All elements appear at once | **Choreographed Staggered Delays** |
| **Typography** | Static text blocks | **Word-Cascade Kinetic Captions & Tabular Counters** |
| **Visual Texture** | Flat digital blocks | **5 Cinematic LUTs + SVG Film Grain + 3D Parallax** |
| **Determinism** | Random glitches | **Zero-Entropy Strict Frame Math** |

---

## 🛠️ Repository Architecture

- `SKILL.md`: Core agent constitution & 12 Golden Laws of Turbo Motion.
- `remotion.config.ts`: Optimal Chromium flags & zero-copy memory buffers.
- `scripts/render-turbo.ts`: GPU-accelerated multi-thread render CLI.
- `references/`:
  - `turbo-rendering-engine.md`: Chromium tuning, memory allocation, and GPU pipelines.
  - `motion-physics-v2.md`: Precision spring formulas and timing charts.
  - `cinematic-color-and-lighting.md`: Color grading matrices, grain, and lighting shaders.
  - `kinetic-typography-and-sfx.md`: Dynamic word captions and audio-visual synching.
  - `multi-aspect-composition.md`: Aspect ratio adaptation for Reels, TikTok, and YouTube.

---

## 📜 License
MIT License.
