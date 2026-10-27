# FontAwesome Vector Icon Pack Integration for Remotion Turbo

This guide instructs Claude on integrating, choreographing, and animating **FontAwesome Icon Pack** vectors inside Remotion video compositions.

--------------------------------------------------------------------------------

## 1. Why FontAwesome for Programmatic Video?
- **Zero Resolution Degradation**: Vectors render with infinite sharpness at 1080p, 4K, and 8K.
- **Micro-Payload**: No heavy PNG/JPG downloads. Raw SVG paths render instantly without network latency.
- **Dynamic CSS & SVG Physics**: Direct control over `fill`, `stroke`, `filter drop-shadow`, `transform: scale()`, and `rotate()`.

--------------------------------------------------------------------------------

## 2. Installation & Imports

```bash
npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons
```

In your Remotion components:

```tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Brand Icons
import { faYoutube, faTiktok, faInstagram, faGithub, faDiscord } from "@fortawesome/free-brands-svg-icons";
// Solid Action Icons
import { faRocket, faFire, faBolt, faStar, faTrophy, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
```

--------------------------------------------------------------------------------

## 3. The 3 Primary Icon Animation Recipes

### Recipe 1: Spring Elastic Icon Pop (for Badges & Features)

```tsx
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

export const AnimatedRocketBadge = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame,
    fps,
    config: { damping: 10, mass: 0.6, stiffness: 220, overshootClamping: false },
  });

  const scale = interpolate(pop, [0, 1], [0, 1]);
  const rotate = interpolate(pop, [0, 1], [-45, 0]);

  return (
    <div
      style={{
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        opacity: Math.min(1, pop),
      }}
      className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg drop-shadow-[0_0_20px_rgba(99,102,241,0.6)]"
    >
      <FontAwesomeIcon icon={faRocket} className="text-2xl" />
    </div>
  );
};
```

### Recipe 2: Staggered Social Icon Outro Bar

```tsx
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faTiktok, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";

const SOCIALS = [
  { icon: faYoutube, color: "text-red-500", delay: 0 },
  { icon: faTiktok, color: "text-cyan-400", delay: 6 },
  { icon: faInstagram, color: "text-pink-500", delay: 12 },
  { icon: faXTwitter, color: "text-white", delay: 18 },
];

export const SocialOutroBar = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div className="flex items-center justify-center gap-6">
      {SOCIALS.map((item, i) => {
        const s = spring({
          frame: frame - item.delay,
          fps,
          config: { damping: 12, mass: 0.5, stiffness: 180 },
        });

        return (
          <div
            key={i}
            style={{
              transform: `scale(${s}) translateY(${(1 - s) * 20}px)`,
              opacity: Math.min(1, s),
            }}
            className={`p-4 rounded-xl bg-slate-900 border border-slate-800 ${item.color} text-3xl shadow-xl`}
          >
            <FontAwesomeIcon icon={item.icon} />
          </div>
        );
      })}
    </div>
  );
};
```

### Recipe 3: Glowing Pulsing Accent Icon (Beat Synced)

```tsx
import { useCurrentFrame } from "remotion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";

export const PulsingBoltIcon = () => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame * 0.2) * 0.15 + 1.0;

  return (
    <div
      style={{
        transform: `scale(${pulse})`,
        filter: "drop-shadow(0 0 15px rgba(250, 204, 21, 0.8))",
      }}
      className="text-amber-400 text-5xl"
    >
      <FontAwesomeIcon icon={faBolt} />
    </div>
  );
};
```
