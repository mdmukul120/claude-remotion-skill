import React, { useState } from 'react';
import { Gauge, Cpu, Zap, Copy, Check, Clock, Server, ArrowRight } from 'lucide-react';

interface TurboBenchmarkProps {
  lang: 'en' | 'bn';
}

export const TurboBenchmarkCalculator: React.FC<TurboBenchmarkProps> = ({ lang }) => {
  const [durationSec, setDurationSec] = useState<number>(30);
  const [resolution, setResolution] = useState<'1080p' | '4k'>('1080p');
  const [fps, setFps] = useState<30 | 60>(60);
  const [cores, setCores] = useState<number>(8);
  const [gpuEnabled, setGpuEnabled] = useState<boolean>(true);
  const [fastJpeg, setFastJpeg] = useState<boolean>(true);
  const [copiedCmd, setCopiedCmd] = useState<boolean>(false);

  // Math model for standard vs turbo render time (in seconds)
  const totalFrames = durationSec * fps;
  const resolutionFactor = resolution === '4k' ? 3.6 : 1.0;

  // Standard Remotion: ~15-20 frames/sec on single core CPU software render
  const standardFps = (18 * Math.sqrt(cores)) / resolutionFactor;
  const standardTimeSec = Math.round(totalFrames / standardFps);

  // Turbo Remotion: Multi-core workers, ANGLE WebGL rasterization, JPEG intermediate
  const gpuMultiplier = gpuEnabled ? 2.1 : 1.0;
  const jpegMultiplier = fastJpeg ? 1.35 : 1.0;
  const turboConcurrencyFactor = Math.min(16, cores * 1.35);
  const turboFps =
    ((16 * turboConcurrencyFactor * gpuMultiplier * jpegMultiplier) / resolutionFactor) * 0.75;
  const turboTimeSec = Math.max(3, Math.round(totalFrames / turboFps));

  const speedupFactor = (standardTimeSec / turboTimeSec).toFixed(1);
  const timeSavedSec = standardTimeSec - turboTimeSec;
  const timeSavedPercent = Math.round((timeSavedSec / standardTimeSec) * 100);

  // Format MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
  };

  const generatedCliCommand = `npx remotion render src/index.ts Main out/video.mp4 \\
  --concurrency=${Math.min(16, Math.floor(cores * 1.35))} \\
  --gl=${gpuEnabled ? 'angle' : 'swiftshader'} \\
  --enable-zero-copy \\
  --image-format=${fastJpeg ? 'jpeg' : 'png'} \\
  --quality=88 \\
  --pixel-format=yuv420p \\
  --crf=18`;

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(generatedCliCommand);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            {lang === 'bn'
              ? 'টার্বো রেন্ডার স্পিড ইঞ্জিন ও বেঞ্চমার্ক ক্যালকুলেটর'
              : 'Turbo Render Engine & Speed Benchmark'}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {lang === 'bn'
              ? 'স্ট্যান্ডার্ড রিমোশন বনাম টার্বো জিপিইউ অ্যাক্সিলারেশনের গতি তুলনা করুন'
              : 'Benchmark standard single-thread Remotion vs Claude Turbo GPU Multi-worker'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-lg">
          <Clock className="w-3.5 h-3.5" />
          <span>{speedupFactor}x Speedup</span>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Controls */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <h4 className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
            {lang === 'bn' ? 'ভিডিও ও হার্ডওয়্যার প্যারামিটার' : 'Video & Hardware Parameters'}
          </h4>

          {/* Video Duration */}
          <div>
            <div className="flex justify-between text-xs mb-1.5 font-medium">
              <span className="text-slate-300">
                {lang === 'bn' ? 'ভিডিও দৈর্ঘ্য' : 'Video Duration'}:
              </span>
              <span className="font-mono tabular-nums text-indigo-400 font-bold">
                {durationSec}s ({totalFrames} frames)
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[15, 30, 60, 120].map((sec) => (
                <button
                  key={sec}
                  onClick={() => setDurationSec(sec)}
                  className={`py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                    durationSec === sec
                      ? 'bg-indigo-600 border-indigo-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {sec}s
                </button>
              ))}
            </div>
          </div>

          {/* Resolution & FPS */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                {lang === 'bn' ? 'রেজোলিউশন' : 'Resolution'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setResolution('1080p')}
                  className={`py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                    resolution === '1080p'
                      ? 'bg-indigo-600 border-indigo-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  1080p FHD
                </button>
                <button
                  onClick={() => setResolution('4k')}
                  className={`py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                    resolution === '4k'
                      ? 'bg-indigo-600 border-indigo-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  4K UHD
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                {lang === 'bn' ? 'ফ্রেম রেট' : 'Frame Rate'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setFps(30)}
                  className={`py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                    fps === 30
                      ? 'bg-indigo-600 border-indigo-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  30 FPS
                </button>
                <button
                  onClick={() => setFps(60)}
                  className={`py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                    fps === 60
                      ? 'bg-indigo-600 border-indigo-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  60 FPS
                </button>
              </div>
            </div>
          </div>

          {/* CPU Cores */}
          <div>
            <div className="flex justify-between text-xs mb-1.5 font-medium">
              <span className="text-slate-300">
                {lang === 'bn' ? 'সিপিইউ কোর (CPU Cores)' : 'CPU Thread Allocation'}:
              </span>
              <span className="font-mono tabular-nums text-cyan-400 font-bold">
                {cores} Cores ({Math.min(16, Math.floor(cores * 1.35))} Workers)
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[4, 8, 12, 16].map((c) => (
                <button
                  key={c}
                  onClick={() => setCores(c)}
                  className={`py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                    cores === c
                      ? 'bg-cyan-600 border-cyan-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  {c} Cores
                </button>
              ))}
            </div>
          </div>

          {/* Acceleration Flags */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 cursor-pointer">
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-200">
                  {lang === 'bn' ? 'ANGLE WebGL হার্ডওয়্যার অ্যাক্সিলারেশন' : 'ANGLE WebGL Hardware GPU'}
                </span>
                <span className="text-[11px] text-slate-500">
                  Chromium GPU rasterization (--gl=angle)
                </span>
              </div>
              <input
                type="checkbox"
                checked={gpuEnabled}
                onChange={(e) => setGpuEnabled(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 cursor-pointer">
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-200">
                  {lang === 'bn' ? 'ফাস্ট জেপিইজি পাইপলাইন (Fast JPEG Pipeline)' : 'Fast JPEG Intermediate Frames'}
                </span>
                <span className="text-[11px] text-slate-500">
                  Avoids slow uncompressed PNG memory copy
                </span>
              </div>
              <input
                type="checkbox"
                checked={fastJpeg}
                onChange={(e) => setFastJpeg(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0"
              />
            </label>
          </div>
        </div>

        {/* Right: Comparative Output & CLI */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-5 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
          <div>
            <h4 className="text-xs uppercase font-semibold text-slate-400 tracking-wider mb-4">
              {lang === 'bn' ? 'রেন্ডার গতির ফলাফল তুলনা' : 'Render Performance Breakdown'}
            </h4>

            {/* Comparison Cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Standard Remotion */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-medium text-slate-400 block mb-1">
                    Standard Remotion
                  </span>
                  <div className="text-2xl font-bold font-mono tabular-nums text-slate-300">
                    {formatTime(standardTimeSec)}
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-1">
                    ~{(totalFrames / standardTimeSec).toFixed(1)} frames/sec
                  </span>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500">
                  Single-thread CPU · SwiftShader software fallback
                </div>
              </div>

              {/* Turbo Remotion */}
              <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/50 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-indigo-300">
                      Claude Turbo Remotion
                    </span>
                    <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800/40">
                      {speedupFactor}x FASTER
                    </span>
                  </div>
                  <div className="text-2xl font-bold font-mono tabular-nums text-emerald-400">
                    {formatTime(turboTimeSec)}
                  </div>
                  <span className="text-[11px] text-emerald-400/80 block mt-1 font-mono">
                    ~{(totalFrames / turboTimeSec).toFixed(1)} frames/sec
                  </span>
                </div>
                <div className="mt-4 pt-3 border-t border-indigo-900/60 text-[11px] text-indigo-200">
                  {timeSavedPercent}% time saved · {formatTime(timeSavedSec)} faster
                </div>
              </div>
            </div>

            {/* Performance Visual Bars */}
            <div className="mt-5 space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Standard Time vs Turbo Time</span>
                <span className="font-mono text-emerald-400">
                  {formatTime(timeSavedSec)} saved
                </span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden flex border border-slate-800">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${Math.max(8, (turboTimeSec / standardTimeSec) * 100)}%` }}
                  title="Turbo Render Time"
                />
                <div
                  className="bg-slate-700/60 h-full flex-1"
                  title="Saved Wait Time"
                />
              </div>
            </div>
          </div>

          {/* Generated CLI Command */}
          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-indigo-400" />
                {lang === 'bn' ? 'টার্বো সিএলআই এক্সিকিউশন কমান্ড' : 'Tuned Turbo CLI Command'}
              </span>
              <button
                onClick={handleCopyCmd}
                className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium"
              >
                {copiedCmd ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Command</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto">
              <code>{generatedCliCommand}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
