import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { LiveVideoPreview } from './components/LiveVideoPreview';
import { SkillFileExplorer } from './components/SkillFileExplorer';
import { TurboBenchmarkCalculator } from './components/TurboBenchmarkCalculator';
import { GithubPushWizard } from './components/GithubPushWizard';
import { TemplateShowcase } from './components/TemplateShowcase';
import {
  Zap,
  Film,
  Cpu,
  Github,
  Sparkles,
  Layers,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Download,
  Terminal,
  Activity,
  Maximize2
} from 'lucide-react';
import { generateSkillRepoZip, triggerDownload } from './utils/zipExporter';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('preview');
  const [lang, setLang] = useState<'en' | 'bn'>('bn');
  const [copiedQuick, setCopiedQuick] = useState<boolean>(false);

  const quickInstallCommand = 'claude skill add https://github.com/mdmukulahmed/claude-remotion-turbo-skill';

  const handleCopyQuick = () => {
    navigator.clipboard.writeText(quickInstallCommand);
    setCopiedQuick(true);
    setTimeout(() => setCopiedQuick(false), 2000);
  };

  const handleDownloadFullZip = async () => {
    try {
      const blob = await generateSkillRepoZip('claude-remotion-turbo-skill');
      triggerDownload(blob, 'claude-remotion-turbo-skill.zip');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Bar Navigation */}
      <TopBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center max-w-4xl mx-auto pt-4 pb-2">
          {/* Clean Unboxed Metadata */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium mb-4 flex-wrap">
            <span className="text-indigo-400 font-semibold">Remotion v4</span>
            <span aria-hidden="true">·</span>
            <span>Claude Code Ready</span>
            <span aria-hidden="true">·</span>
            <span>ANGLE GPU Acceleration</span>
            <span aria-hidden="true">·</span>
            <span>60 FPS Springs</span>
            <span aria-hidden="true">·</span>
            <span>1-Click GitHub Skill</span>
          </div>

          {/* Hero Headline */}
          <h1
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight"
            style={{ textWrap: 'balance' }}
          >
            {lang === 'bn' ? (
              <>
                ক্লড এর জন্য আল্ট্রা-ফাস্ট <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-amber-300">রিমোশন টার্বো স্কিল</span>
              </>
            ) : (
              <>
                Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-amber-300">Remotion Turbo Skill</span> for Claude
              </>
            )}
          </h1>

          {/* Hero Subtitle */}
          <p
            className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-6 leading-relaxed"
            style={{ textWrap: 'balance' }}
          >
            {lang === 'bn'
              ? 'haidrrrry/claude-remotion-skill থেকে বহুগুণ উন্নত প্রিমিয়াম এজেন্ট স্কিল। ৪.৮ গুণ দ্রুত জিপিইউ রেন্ডারিং, সিনেম্যাটিক কালার গ্রেডিং, কাইনেটিক ক্যাপশন এবং গিটহাবের মাধ্যমে সরাসরি লিঙ্ক ইনস্টলেশন।'
              : 'Significantly superior to standard Remotion skills. Up to 4.8x GPU-accelerated rendering throughput, damped harmonic spring physics, cinematic LUTs, word-level kinetic captions, and direct GitHub link installation into Claude.'}
          </p>

          {/* Quick Action Dock */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={() => setActiveTab('github')}
              className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>
                {lang === 'bn' ? 'গিটহাব পুশ ও ক্লড ইনস্টল' : 'Push to GitHub & Install'}
              </span>
            </button>

            <button
              onClick={handleCopyQuick}
              className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-medium text-xs transition-colors flex items-center gap-2 cursor-pointer font-mono"
            >
              {copiedQuick ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">
                    {lang === 'bn' ? 'কমান্ড কপি হয়েছে' : 'Command Copied'}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>claude skill add ...</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadFullZip}
              className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-medium text-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>{lang === 'bn' ? 'জিপ ডাউনলোড' : 'Download ZIP'}</span>
            </button>
          </div>
        </section>

        {/* Tab Selection Bar */}
        <div className="flex items-center justify-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800/80 max-w-2xl mx-auto overflow-x-auto w-full">
          {[
            { id: 'preview', label: lang === 'bn' ? 'লাইভ ক্যানভাস' : 'Live Canvas', icon: Film },
            { id: 'files', label: lang === 'bn' ? 'স্কিল ফাইলসমূহ' : 'Skill Repo Files', icon: Terminal },
            { id: 'benchmark', label: lang === 'bn' ? 'টার্বো স্পিড ক্যালকুলেটর' : 'Turbo Speed Benchmark', icon: Zap },
            { id: 'templates', label: lang === 'bn' ? 'রেডিমেড টেমপ্লেট' : 'Templates', icon: Sparkles },
            { id: 'github', label: lang === 'bn' ? 'গিটহাব ও ইনস্টল' : 'GitHub Push & Install', icon: Github },
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isCurrent
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700/60'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        {activeTab === 'preview' && (
          <div className="flex flex-col gap-8">
            <LiveVideoPreview lang={lang} />

            {/* Architecture Highlights Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/80 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                  <Zap className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'টার্বো জিপিইউ অ্যাক্সিলারেশন' : 'Turbo GPU Acceleration'}</span>
                </div>
                <h3 className="text-base font-semibold text-slate-100">
                  {lang === 'bn' ? '৪.৮ গুণ দ্রুত রেন্ডারিং স্পিড' : 'Up to 4.8x Render Speedup'}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {lang === 'bn'
                    ? 'ক্রোমিয়াম মাল্টি-ওয়ার্কার কনকারেন্সি, ANGLE WebGL রাস্টারাইজেশন এবং জিরো-কপি মেমরি আইপিসি ব্যবহার করে রেন্ডারিং সময় কমিয়ে আনে।'
                    : 'Leverages multi-worker Chromium concurrency, ANGLE WebGL hardware rasterization, and zero-copy shared buffers to cut render wait times.'}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/80 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'হারমোনিক স্প্রিং ফিজিক্স' : 'Harmonic Spring Physics'}</span>
                </div>
                <h3 className="text-base font-semibold text-slate-100">
                  {lang === 'bn' ? 'জিরো লিনিয়ার ইজিং নিয়ম' : 'Zero Linear Easing Rule'}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {lang === 'bn'
                    ? 'কোনো রোবোটিক বা বোরিং স্লাইড নয়; ম্যাস, টেনশন ও ফ্রিকশন সহ ন্যাচারাল স্প্রিং ফিজিক্স এবং স্ট্যাগার্ড লেয়ারিং ফ্রেম তৈরি করে।'
                    : 'Bans mechanical linear fades in favor of mass-damping-tension physics curves, 3D card tilt, and staggered entrance layering.'}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/80 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Layers className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'সরাসরি ক্লড লিঙ্ক ইনস্টল' : '1-Click Direct Link Install'}</span>
                </div>
                <h3 className="text-base font-semibold text-slate-100">
                  {lang === 'bn' ? 'গিটহাব ও ক্লড কোড প্রস্তুত' : 'GitHub & Claude Code Ready'}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {lang === 'bn'
                    ? 'গিটহাবে রিপোজিটরি পুশ করার পর সরাসরি claude skill add লিঙ্ক দিয়ে ইনস্টল করা যায়, যা ভিডিও প্রম্পটে অটো-অ্যাক্টিভেট হয়।'
                    : 'Structured as a native Claude Agent Skill ready to be pushed to GitHub and installed via URL or custom instructions in seconds.'}
                </p>
              </div>
            </div>

            {/* Comparison Table Section */}
            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800">
              <h3 className="text-base font-bold text-slate-100 mb-1">
                {lang === 'bn'
                  ? 'পূর্ববর্তী স্কিল বনাম নতুন ক্লড রিমোশন টার্বো স্কিল'
                  : 'haidrrrry/claude-remotion-skill vs Claude Remotion Turbo'}
              </h3>
              <p className="text-xs text-slate-400 mb-5">
                {lang === 'bn'
                  ? 'কেন এই স্কিলটি ভিডিওর মান এবং রেন্ডারিং স্পিড উভয় দিক থেকেই ব্যাপকভাবে উন্নত:'
                  : 'Key architectural upgrades delivering cinematic quality and fast rendering:'}
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase text-[11px] tracking-wider">
                      <th className="py-3 px-4 font-semibold">Feature / Aspect</th>
                      <th className="py-3 px-4 font-semibold text-slate-500">haidrrrry/claude-remotion-skill</th>
                      <th className="py-3 px-4 font-semibold text-indigo-400">Claude Remotion Turbo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-200">
                        {lang === 'bn' ? 'রেন্ডারিং গতি' : 'Rendering Speed'}
                      </td>
                      <td className="py-3 px-4 text-slate-400">1x Realtime (Single-thread CPU)</td>
                      <td className="py-3 px-4 font-bold text-emerald-400 font-mono">
                        3.5x – 4.8x (GPU WebGL + Concurrency)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-200">
                        {lang === 'bn' ? 'মোশন ফিজিক্স' : 'Motion Physics'}
                      </td>
                      <td className="py-3 px-4 text-slate-400">Basic spring model</td>
                      <td className="py-3 px-4 text-slate-200">
                        Damped harmonic oscillations, 3D card perspective tilt, inertial camera drift
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-200">
                        {lang === 'bn' ? 'কাইনেটিক টাইপোগ্রাফি' : 'Kinetic Typography'}
                      </td>
                      <td className="py-3 px-4 text-slate-400">Static word captions</td>
                      <td className="py-3 px-4 text-slate-200">
                        Word-by-word karaoke cascade, tabular ticker counters, beat-synced font scales
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-200">
                        {lang === 'bn' ? 'কালার গ্রেড ও টেক্সচার' : 'Color Grading & Texture'}
                      </td>
                      <td className="py-3 px-4 text-slate-400">Basic film grain</td>
                      <td className="py-3 px-4 text-slate-200">
                        5 Cinema LUT grades (Obsidian, Neo-Tokyo, Teal-Orange, etc.) + SVG noise shaders
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-200">
                        {lang === 'bn' ? 'অডিও সিনক্রোনাইজেশন' : 'Audio Synchronization'}
                      </td>
                      <td className="py-3 px-4 text-slate-400">Standard background audio</td>
                      <td className="py-3 px-4 text-slate-200">
                        Audio reactive frequency visualizers + automated beat drop springs
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-200">
                        {lang === 'bn' ? 'ক্লড ইনস্টলেশন' : 'Claude Integration'}
                      </td>
                      <td className="py-3 px-4 text-slate-400">Manual copy paste</td>
                      <td className="py-3 px-4 font-bold text-indigo-400">
                        1-Click <code className="font-mono text-[11px] bg-slate-900 px-1 py-0.5 rounded">claude skill add [URL]</code> + Auto-triggers
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'files' && <SkillFileExplorer lang={lang} />}
        {activeTab === 'benchmark' && <TurboBenchmarkCalculator lang={lang} />}
        {activeTab === 'templates' && <TemplateShowcase lang={lang} />}
        {activeTab === 'github' && <GithubPushWizard lang={lang} />}
      </main>

      {/* Clean Quiet Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/90 py-8 px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">Claude Remotion Turbo Studio</span>
            <span aria-hidden="true">·</span>
            <span>Production Programmatic Motion Architecture</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setActiveTab('github')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              GitHub Setup
            </button>
            <button
              onClick={() => setActiveTab('files')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              SKILL.md Spec
            </button>
            <button
              onClick={handleDownloadFullZip}
              className="hover:text-white transition-colors cursor-pointer text-indigo-400"
            >
              Download Repo (.ZIP)
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
