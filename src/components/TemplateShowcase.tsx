import React, { useState } from 'react';
import { Layers, Copy, Check, Sparkles, Video, Play, Monitor, Smartphone, Square } from 'lucide-react';

interface TemplateShowcaseProps {
  lang: 'en' | 'bn';
}

interface TemplateItem {
  id: string;
  title: string;
  aspectRatio: string;
  fps: number;
  durationSec: number;
  category: string;
  description: string;
  codeSnippet: string;
}

export const TemplateShowcase: React.FC<TemplateShowcaseProps> = ({ lang }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('saas-stinger');
  const [copied, setCopied] = useState<boolean>(false);

  const templates: TemplateItem[] = [
    {
      id: 'saas-stinger',
      title: lang === 'bn' ? 'স্যাস প্রোডাক্ট ৩ডি স্টিঙ্গার' : 'SaaS Product 3D Stinger',
      aspectRatio: '16:9 (1920x1080)',
      fps: 60,
      durationSec: 5,
      category: 'Commercial',
      description:
        lang === 'bn'
          ? 'উন্নত ৩ডি কার্ড পার্সপেক্টিভ, স্ট্যাগার্ড ব্যাজ এবং ট্যাবুলার কাউন্টার সমন্বিত প্রিমিয়াম ট্রেলার।'
          : 'High-end 3D perspective card tilt with staggered badges and smooth tabular metric counter.',
      codeSnippet: `import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const SaasStinger = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Snappy card entrance with 3D tilt
  const cardSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 150 },
  });

  const rotateX = interpolate(cardSpring, [0, 1], [22, 0]);
  const rotateY = interpolate(cardSpring, [0, 1], [-15, 0]);
  const scale = interpolate(cardSpring, [0, 1], [0.88, 1.0]);

  // 2. Animated revenue counter
  const counterSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 18, mass: 1, stiffness: 90 },
  });
  const revenue = Math.floor(interpolate(counterSpring, [0, 1], [0, 2450000]));

  return (
    <div style={{ perspective: 1200 }} className="w-full h-full flex items-center justify-center bg-slate-950 text-white">
      <div
        style={{
          transform: \`scale(\${scale}) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`,
          opacity: Math.min(1, cardSpring),
        }}
        className="p-8 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl flex flex-col items-center"
      >
        <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-2">
          Turbo Platform Analytics
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          Accelerated Velocity
        </h1>
        <div className="font-mono tabular-nums text-5xl font-black text-amber-300">
          $\${revenue.toLocaleString()} ARR
        </div>
      </div>
    </div>
  );
};`,
    },
    {
      id: 'kinetic-captions',
      title: lang === 'bn' ? 'ভাইরাল টিকটক কাইনেটিক ক্যাপশন' : 'Viral TikTok Kinetic Captions',
      aspectRatio: '9:16 (1080x1920)',
      fps: 60,
      durationSec: 8,
      category: 'Social Video',
      description:
        lang === 'bn'
          ? 'শব্দভিত্তিক কারাওকে ট্র্যাকিং, অ্যাকসেন্ট হাইলাইট এবং বাউন্সি স্প্রিং পপ ইফেক্ট।'
          : 'Word-by-word karaoke typography with elastic bounce springs and yellow neon active word glow.',
      codeSnippet: `import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

const WORDS = [
  { text: "STOP", start: 0, glow: true },
  { text: "MAKING", start: 12, glow: false },
  { text: "BORING", start: 24, glow: true },
  { text: "SLIDE", start: 36, glow: false },
  { text: "VIDEOS", start: 48, glow: false },
  { text: "USE", start: 60, glow: false },
  { text: "TURBO", start: 72, glow: true },
  { text: "REMOTION", start: 84, glow: true },
];

export const KineticCaptions = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div className="w-full h-full bg-slate-950 flex flex-col justify-center items-center px-8">
      <div className="flex flex-wrap justify-center items-center gap-4 max-w-sm">
        {WORDS.map((w, i) => {
          const isCurrent = frame >= w.start && frame < w.start + 18;
          const s = spring({
            frame: frame - w.start,
            fps,
            config: { damping: 10, mass: 0.5, stiffness: 220 },
          });

          return (
            <span
              key={i}
              style={{
                transform: \`scale(\${isCurrent ? 1.15 : s}) translateY(\${(1 - s) * 16}px)\`,
                opacity: Math.min(s, 1),
              }}
              className={\`text-4xl font-black tracking-tight uppercase \${
                isCurrent
                  ? "text-yellow-300 drop-shadow-[0_0_25px_rgba(253,224,71,0.8)]"
                  : w.glow
                  ? "text-indigo-400"
                  : "text-white"
              }\`}
            >
              {w.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};`,
    },
    {
      id: 'cyberpunk-trailer',
      title: lang === 'bn' ? 'নিও-টোকিও ক্রোম্যাটিক ট্রেলার' : 'Neo-Tokyo Chromatic Trailer',
      aspectRatio: '16:9 (1920x1080)',
      fps: 60,
      durationSec: 6,
      category: 'Trailer / Gaming',
      description:
        lang === 'bn'
          ? 'সায়ান ও ম্যাজেন্টা ক্রোম্যাটিক অ্যাবারেশন, স্ক্যানলাইন এবং গ্লিচ ট্রানজিশন।'
          : 'High-energy cyan/magenta chromatic shifts, horizontal scanlines, and GPU-accelerated glow.',
      codeSnippet: `import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const CyberpunkTrailer = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const punch = spring({
    frame,
    fps,
    config: { damping: 11, mass: 0.7, stiffness: 200 },
  });

  const glitchShift = (frame % 8 === 0) ? 6 : 0;

  return (
    <div className="relative w-full h-full bg-indigo-950 flex items-center justify-center overflow-hidden">
      {/* Scanline overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none" />

      {/* Aberration layer: Red/Cyan */}
      <h1
        style={{
          transform: \`scale(\${punch}) translate(\${glitchShift}px, \${-glitchShift}px)\`,
          opacity: Math.min(punch, 1),
        }}
        className="text-7xl font-black tracking-tighter text-cyan-400 drop-shadow-[-3px_0_12px_rgba(255,0,128,0.8)]"
      >
        GPU ACCELERATED
      </h1>
    </div>
  );
};`,
    },
    {
      id: 'audio-wave',
      title: lang === 'bn' ? 'অডিও রিয়্যাক্টিভ স্পেকট্রাম' : 'Audio-Reactive Waveform Stinger',
      aspectRatio: '1:1 (1080x1080)',
      fps: 60,
      durationSec: 4,
      category: 'Music / Podcast',
      description:
        lang === 'bn'
          ? 'মিউজিক বিটের সাথে সিংক্রোনাইজড ডায়নামিক ওয়েভফর্ম বার এবং সার্কুলার রিডায়াল পালস।'
          : 'Audio-reactive dynamic frequency bars with beat drops and synchronized radial glow shockwaves.',
      codeSnippet: `import { useCurrentFrame } from "remotion";

export const AudioWaveStinger = () => {
  const frame = useCurrentFrame();
  const bars = 32;

  return (
    <div className="w-full h-full bg-neutral-950 flex flex-col items-center justify-center">
      <div className="flex items-end gap-1.5 h-32">
        {Array.from({ length: bars }).map((_, i) => {
          const height = Math.abs(
            Math.sin(frame * 0.15 + i * 0.35) * 60 +
            Math.cos(frame * 0.08 + i * 0.2) * 40
          ) + 12;

          return (
            <div
              key={i}
              style={{ height: \`\${height}px\` }}
              className="w-2.5 rounded-t bg-gradient-to-t from-indigo-500 via-cyan-400 to-amber-300"
            />
          );
        })}
      </div>
      <div className="mt-8 font-mono text-sm tracking-widest text-slate-400">
        BEAT SYNCHRONIZED 128 BPM
      </div>
    </div>
  );
};`,
    },
  ];

  const currentTpl =
    templates.find((t) => t.id === selectedTemplate) || templates[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentTpl.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            {lang === 'bn'
              ? 'প্রিমিয়াম রিমোশন টেমপ্লেট লাইব্রেরি'
              : 'Production Remotion Template Suite'}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {lang === 'bn'
              ? 'ক্লড এ সরাসরি ব্যবহার করার জন্য রেডিমেড প্রো-গ্রেড কোড স্নিপেটসমূহ'
              : 'Battle-tested Remotion components with 60fps springs and cinematic grading'}
          </p>
        </div>

        <button
          onClick={handleCopyCode}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-300" />
              <span>{lang === 'bn' ? 'কোড কপি হয়েছে' : 'Copied to Clipboard'}</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'টেমপ্লেট কোড কপি করুন' : 'Copy Component Code'}</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        {/* Template Selector Cards */}
        <div className="lg:col-span-5 border-r border-slate-800 bg-slate-950/40 p-4 flex flex-col gap-2.5">
          {templates.map((tpl) => {
            const isSelected = tpl.id === selectedTemplate;
            return (
              <button
                key={tpl.id}
                onClick={() => setSelectedTemplate(tpl.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col gap-1.5 ${
                  isSelected
                    ? 'bg-indigo-950/50 border-indigo-500/50 text-white shadow-md'
                    : 'bg-slate-900/40 border-slate-800/70 text-slate-400 hover:bg-slate-900/80 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-xs text-slate-200">
                    {tpl.title}
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-slate-800/80 text-slate-400 px-2 py-0.5 rounded">
                    {tpl.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  {tpl.description}
                </p>
                <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 mt-1">
                  <span>{tpl.aspectRatio}</span>
                  <span>·</span>
                  <span>{tpl.fps} FPS</span>
                  <span>·</span>
                  <span>{tpl.durationSec}s</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Code Previewer */}
        <div className="lg:col-span-7 flex flex-col bg-slate-950">
          <div className="px-5 py-3 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
            <span className="text-xs font-mono text-indigo-400 font-semibold">
              src/components/{currentTpl.id}.tsx
            </span>
            <span className="text-xs text-slate-500 font-mono">
              React + Remotion TypeScript
            </span>
          </div>

          <div className="p-4 overflow-x-auto overflow-y-auto max-h-[460px] font-mono text-xs leading-relaxed text-slate-300">
            <pre>
              <code className="text-slate-200 whitespace-pre">
                {currentTpl.codeSnippet}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
