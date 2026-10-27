import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Layers,
  Sliders,
  Volume2,
  Gauge,
  Film,
  Zap,
  Maximize2
} from 'lucide-react';

export type AspectRatio = '16:9' | '9:16' | '1:1';
export type ColorGrade = 'obsidian' | 'cyberpunk' | 'teal_orange' | 'minimal';
export type VideoScene = 'saas' | 'kinetic' | 'cyberpunk' | 'luxury';

export interface VideoPreviewProps {
  lang: 'en' | 'bn';
}

export const LiveVideoPreview: React.FC<VideoPreviewProps> = ({ lang }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [colorGrade, setColorGrade] = useState<ColorGrade>('obsidian');
  const [scene, setScene] = useState<VideoScene>('saas');
  const [hasGrain, setHasGrain] = useState<boolean>(true);
  const [hasAberration, setHasAberration] = useState<boolean>(true);
  const [hasAudioWaves, setHasAudioWaves] = useState<boolean>(true);
  const [simulatedRendering, setSimulatedRendering] = useState<boolean>(false);
  const [renderProgress, setRenderProgress] = useState<number>(0);

  const totalFrames = 180; // 3 seconds at 60 FPS
  const fps = 60;
  const animRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const [fpsCounter, setFpsCounter] = useState<number>(60);

  // Animation frame loop
  useEffect(() => {
    let frameCount = 0;
    let lastFpsUpdate = performance.now();

    const loop = (now: number) => {
      frameCount++;
      if (now - lastFpsUpdate >= 500) {
        setFpsCounter(Math.round((frameCount * 1000) / (now - lastFpsUpdate)));
        frameCount = 0;
        lastFpsUpdate = now;
      }

      if (isPlaying) {
        setCurrentFrame((prev) => (prev >= totalFrames ? 0 : prev + 1));
      }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying]);

  // Spring physics calculation helper
  const calculateSpring = (frame: number, delay: number, stiffness = 160, damping = 12) => {
    const elapsed = Math.max(0, frame - delay);
    if (elapsed === 0) return 0;
    // Approximated damped harmonic oscillation: 1 - e^(-damping * t) * cos(omega * t)
    const t = elapsed / 20;
    const progress = 1 - Math.exp(-damping * 0.18 * t) * Math.cos(stiffness * 0.05 * t);
    return Math.min(Math.max(progress, 0), 1.15);
  };

  // Color grade classes
  const getGradeStyles = () => {
    switch (colorGrade) {
      case 'cyberpunk':
        return 'from-indigo-950 via-purple-950 to-slate-950 text-cyan-300';
      case 'teal_orange':
        return 'from-slate-950 via-teal-950 to-slate-950 text-amber-200';
      case 'minimal':
        return 'from-slate-900 via-slate-950 to-slate-900 text-blue-300';
      case 'obsidian':
      default:
        return 'from-neutral-950 via-stone-950 to-black text-amber-100';
    }
  };

  // Trigger simulated Turbo Render
  const handleSimulateTurboRender = () => {
    setSimulatedRendering(true);
    setRenderProgress(0);
    const start = performance.now();
    const interval = setInterval(() => {
      setRenderProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setSimulatedRendering(false), 800);
          return 100;
        }
        return prev + 12; // Extremely fast progress representing Turbo speed
      });
    }, 120);
  };

  // Dimensions based on aspect ratio
  const getContainerDimensions = () => {
    switch (aspectRatio) {
      case '9:16':
        return 'w-[290px] h-[515px]';
      case '1:1':
        return 'w-[420px] h-[420px]';
      case '16:9':
      default:
        return 'w-full max-w-[680px] aspect-[16/9]';
    }
  };

  // Progress percentage
  const progressPercent = ((currentFrame / totalFrames) * 100).toFixed(1);
  const timecode = (currentFrame / fps).toFixed(2);

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
      {/* Studio Header Bar */}
      <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-sm tracking-tight text-slate-100">
              {lang === 'bn' ? 'রিমোশন টার্বো লাইভ প্রিভিউয়ার' : 'Remotion Turbo Live Canvas'}
            </span>
          </div>
          <span className="text-xs font-mono tabular-nums text-slate-400">
            {currentFrame}f / {totalFrames}f · {timecode}s
          </span>
          <span className="text-xs font-mono tabular-nums text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
            {fpsCounter} FPS
          </span>
        </div>

        {/* Aspect Ratio Buttons */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
          {(['16:9', '9:16', '1:1'] as AspectRatio[]).map((ratio) => (
            <button
              key={ratio}
              onClick={() => setAspectRatio(ratio)}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                aspectRatio === ratio
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {ratio}
            </button>
          ))}
        </div>
      </div>

      {/* Main Preview Screen */}
      <div className="p-6 bg-slate-950/90 flex flex-col items-center justify-center min-h-[460px] relative overflow-hidden">
        {/* Aspect ratio frame box */}
        <div
          className={`${getContainerDimensions()} relative rounded-xl overflow-hidden border border-slate-700/60 shadow-2xl transition-all duration-300 flex flex-col items-center justify-center select-none bg-gradient-to-br ${getGradeStyles()}`}
          style={{
            perspective: '1200px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Subtle noise grain filter */}
          {hasGrain && (
            <div className="absolute inset-0 pointer-events-none noise-overlay opacity-30 z-20" />
          )}

          {/* Scanlines / CRT Aberration */}
          {hasAberration && (
            <div className="absolute inset-0 pointer-events-none scanlines opacity-20 z-20" />
          )}

          {/* Dynamic Vignette */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(0,0,0,0.7)_100%)] z-10" />

          {/* Audio Visualizer Wave (Top / Bottom) */}
          {hasAudioWaves && (
            <div className="absolute bottom-3 inset-x-4 flex items-end justify-center gap-1.5 h-10 z-15 opacity-70 pointer-events-none">
              {Array.from({ length: aspectRatio === '9:16' ? 14 : 26 }).map((_, i) => {
                const waveVal =
                  Math.sin((currentFrame * 0.15 + i * 0.45)) * 16 +
                  Math.cos((currentFrame * 0.2 + i * 0.3)) * 12 +
                  14;
                return (
                  <div
                    key={i}
                    className="w-1 rounded-t bg-gradient-to-t from-indigo-500 to-cyan-300 transition-all duration-75"
                    style={{
                      height: `${Math.max(4, Math.min(36, waveVal))}px`,
                    }}
                  />
                );
              })}
            </div>
          )}

          {/* SCENE CONTENT RENDERING BASED ON SELECTED SCENE */}
          {scene === 'saas' && (
            <div className="relative z-10 w-full px-6 flex flex-col items-center text-center">
              {/* Staggered badge */}
              {(() => {
                const s1 = calculateSpring(currentFrame, 0);
                return (
                  <div
                    style={{
                      transform: `scale(${s1}) translateY(${(1 - s1) * 20}px)`,
                      opacity: Math.min(s1, 1),
                    }}
                    className="mb-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-medium tracking-wide uppercase"
                  >
                    <Zap className="w-3.5 h-3.5 text-indigo-400" />
                    {lang === 'bn' ? 'টার্বো ইঞ্জিন চালিত' : 'Turbo Engine Active'}
                  </div>
                );
              })()}

              {/* Kinetic Headline */}
              {(() => {
                const s2 = calculateSpring(currentFrame, 10);
                return (
                  <h2
                    style={{
                      transform: `scale(${s2}) translateY(${(1 - s2) * 25}px)`,
                      opacity: Math.min(s2, 1),
                    }}
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2"
                  >
                    {lang === 'bn' ? (
                      <>প্রোগ্রাম্যাটিক ভিডিও <span className="text-indigo-400">৪.৮ গুণ দ্রুত</span></>
                    ) : (
                      <>Programmatic Video <span className="text-indigo-400">4.8x Faster</span></>
                    )}
                  </h2>
                );
              })()}

              {/* Animated Tabular Counter Metric */}
              {(() => {
                const s3 = calculateSpring(currentFrame, 20);
                const counterValue = Math.min(
                  2450000,
                  Math.floor((currentFrame / totalFrames) * 2450000)
                );
                return (
                  <div
                    style={{
                      transform: `scale(${s3})`,
                      opacity: Math.min(s3, 1),
                    }}
                    className="my-3 p-3 rounded-lg bg-slate-900/80 border border-slate-700/60 backdrop-blur-sm"
                  >
                    <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-0.5">
                      {lang === 'bn' ? 'টার্বো ফ্রেম রেন্ডার কাউন্টার' : 'Total Rendered Frames'}
                    </div>
                    <div className="font-mono tabular-nums text-2xl font-bold text-amber-300">
                      {counterValue.toLocaleString()} FPS-STITCHED
                    </div>
                  </div>
                );
              })()}

              {/* Staggered tags */}
              <div className="flex items-center justify-center gap-3 mt-1 text-xs text-slate-300">
                <span>ANGLE WebGL</span>
                <span>·</span>
                <span>Zero-Copy IPC</span>
                <span>·</span>
                <span>60 FPS Springs</span>
              </div>
            </div>
          )}

          {scene === 'kinetic' && (
            <div className="relative z-10 w-full px-6 flex flex-col items-center text-center">
              <div className="text-xs uppercase tracking-widest text-slate-400 mb-3">
                {lang === 'bn' ? 'কাইনেটিক ক্যাপশন ইঞ্জিন' : 'Dynamic Kinetic Captions'}
              </div>

              {/* Karaoke Word Cascade */}
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-md">
                {[
                  { text: 'BUILD', start: 0, highlight: false },
                  { text: 'CINEMATIC', start: 15, highlight: true },
                  { text: 'REMOTION', start: 30, highlight: false },
                  { text: 'VIDEOS', start: 45, highlight: false },
                  { text: 'WITH', start: 60, highlight: false },
                  { text: 'CLAUDE', start: 75, highlight: true },
                  { text: 'TURBO', start: 90, highlight: true },
                ].map((word, i) => {
                  const s = calculateSpring(currentFrame, word.start, 220, 10);
                  const isCurrent =
                    currentFrame >= word.start && currentFrame < word.start + 24;
                  return (
                    <span
                      key={i}
                      style={{
                        transform: `scale(${isCurrent ? 1.12 : s}) translateY(${
                          (1 - s) * 14
                        }px)`,
                        opacity: Math.min(s, 1),
                      }}
                      className={`text-xl sm:text-2xl font-black tracking-tight transition-colors duration-100 ${
                        isCurrent
                          ? 'text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.7)]'
                          : word.highlight
                          ? 'text-indigo-400'
                          : 'text-slate-100'
                      }`}
                    >
                      {word.text}
                    </span>
                  );
                })}
              </div>

              <div className="mt-6 text-xs text-slate-400 flex items-center gap-2">
                <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>BPM 128 Sync · Beat-Dropped Springs</span>
              </div>
            </div>
          )}

          {scene === 'cyberpunk' && (
            <div className="relative z-10 w-full px-6 flex flex-col items-center text-center">
              <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-1">
                NEO-TOKYO 2077 MATRIX
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                GPU RASTERIZED
              </h1>
              <div className="mt-4 px-4 py-2 rounded bg-cyan-950/40 border border-cyan-500/30 font-mono text-xs text-cyan-200">
                THREAD WORKERS: 12 CONCURRENT CHUNKS
              </div>
            </div>
          )}

          {scene === 'luxury' && (
            <div className="relative z-10 w-full px-6 flex flex-col items-center text-center">
              <span className="text-xs uppercase tracking-[0.3em] text-amber-200/80 mb-2 font-medium">
                CHRONO ARCHITECTURE
              </span>
              <h2 className="text-3xl font-serif text-white tracking-wide">
                Obsidian &amp; Gold
              </h2>
              <div className="w-16 h-px bg-amber-300/40 my-3" />
              <p className="text-xs text-stone-300 max-w-xs font-light">
                Continuous Ken Burns camera drift with 28-damping inertia physics.
              </p>
            </div>
          )}
        </div>

        {/* Turbo Render Simulator Modal Overlay */}
        {simulatedRendering && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center p-6 z-30">
            <div className="bg-slate-900 border border-indigo-500/40 rounded-xl p-6 max-w-sm w-full text-center shadow-2xl">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-3">
                <Zap className="w-5 h-5 animate-pulse" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">
                {lang === 'bn' ? 'টার্বো জিপিইউ রেন্ডারিং চলছে...' : 'Turbo GPU Rendering...'}
              </h4>
              <p className="text-xs text-slate-400 mb-4">
                {lang === 'bn'
                  ? '৮টি সমান্তরাল ক্রোমিয়াম ওয়ার্কার ফ্রেম স্টিচ করছে'
                  : '8 parallel Chromium workers stitching 60fps frames'}
              </p>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden mb-2">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full transition-all duration-150"
                  style={{ width: `${renderProgress}%` }}
                />
              </div>

              <div className="flex justify-between text-xs font-mono tabular-nums text-slate-400">
                <span>{renderProgress}%</span>
                <span>0.8s Elapsed</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Playback & Effects Control Dock */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col gap-3">
        {/* Scrubber slider */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shrink-0"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setCurrentFrame(0)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors shrink-0"
            title="Restart Frame 0"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="flex-1 flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={totalFrames}
              value={currentFrame}
              onChange={(e) => {
                setIsPlaying(false);
                setCurrentFrame(Number(e.target.value));
              }}
              className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
            />
          </div>

          <span className="text-xs font-mono tabular-nums text-slate-400 whitespace-nowrap">
            {progressPercent}%
          </span>
        </div>

        {/* Secondary Scene and Shader Toggles */}
        <div className="flex items-center justify-between gap-3 flex-wrap text-xs pt-1 border-t border-slate-800/80">
          {/* Scene selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">
              {lang === 'bn' ? 'দৃশ্য:' : 'Scene:'}
            </span>
            {(['saas', 'kinetic', 'cyberpunk', 'luxury'] as VideoScene[]).map((s) => (
              <button
                key={s}
                onClick={() => setScene(s)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors uppercase ${
                  scene === s
                    ? 'bg-slate-800 text-white border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Color Grade LUT */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">LUT:</span>
            {(['obsidian', 'cyberpunk', 'teal_orange', 'minimal'] as ColorGrade[]).map((grade) => (
              <button
                key={grade}
                onClick={() => setColorGrade(grade)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  colorGrade === grade
                    ? 'bg-indigo-950 text-indigo-300 border border-indigo-700/50'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {grade.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Shader toggles */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-400 hover:text-slate-200">
              <input
                type="checkbox"
                checked={hasGrain}
                onChange={(e) => setHasGrain(e.target.checked)}
                className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0"
              />
              <span>Film Grain</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-slate-400 hover:text-slate-200">
              <input
                type="checkbox"
                checked={hasAudioWaves}
                onChange={(e) => setHasAudioWaves(e.target.checked)}
                className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0"
              />
              <span>Audio Wave</span>
            </label>

            <button
              onClick={handleSimulateTurboRender}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-sm transition-colors"
            >
              <Zap className="w-3.5 h-3.5" />
              {lang === 'bn' ? 'টার্বো রেন্ডার টেস্ট' : 'Simulate Turbo Render'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
