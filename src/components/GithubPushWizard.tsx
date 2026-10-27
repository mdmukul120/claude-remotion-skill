import React, { useState } from 'react';
import {
  GitBranch,
  Github,
  Download,
  Terminal,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { generateSkillRepoZip, triggerDownload } from '../utils/zipExporter';

interface GithubPushWizardProps {
  lang: 'en' | 'bn';
}

export const GithubPushWizard: React.FC<GithubPushWizardProps> = ({ lang }) => {
  const [repoUser, setRepoUser] = useState<string>('mdmukul120');
  const [repoName, setRepoName] = useState<string>('claude-remotion-skill');
  const [copiedStep, setCopiedStep] = useState<string | null>(null);
  const [isZipping, setIsZipping] = useState<boolean>(false);

  const fullRepoUrl = `https://github.com/${repoUser}/${repoName}`;
  const claudeInstallCmd = `claude skill add ${fullRepoUrl}`;

  const pushGitCommands = `# আপনার লোকাল প্রজেক্ট বা ডাউনলোড করা ফোল্ডারে টার্মিনাল ওপেন করে রান করুন:
git add SKILL.md README.md references scripts remotion.config.ts
git commit -m "feat: Add Claude SKILL.md and Turbo Remotion references"
git push origin main

# অথবা একদম নতুন করে রিপোজিটরিতে পুশ করতে:
git init
git add .
git commit -m "feat: Initial release of Claude Remotion Turbo Skill"
git branch -M main
git remote add origin https://github.com/${repoUser}/${repoName}.git
git push -u origin main --force`;

  const handleCopy = (text: string, stepId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepId);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      const blob = await generateSkillRepoZip(repoName);
      triggerDownload(blob, `${repoName}.zip`);
    } catch (err) {
      console.error('Failed to generate zip', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Github className="w-4 h-4 text-white" />
            {lang === 'bn'
              ? 'গিটহাব পুশ ও ক্লড ইন্টিগ্রেশন উইজার্ড'
              : 'GitHub Push & Claude Direct-Link Integration'}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {lang === 'bn'
              ? 'গিটহাবে রিপোজিটরি পুশ করুন এবং সরাসরি লিঙ্ক দিয়ে Claude Code / Desktop-এ ইন্টিগ্রেট করুন'
              : 'Push skill repository to GitHub and install instantly via direct link in Claude'}
          </p>
        </div>

        <button
          onClick={handleDownloadZip}
          disabled={isZipping}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>
            {isZipping
              ? lang === 'bn'
                ? 'জিপ প্রস্তুত হচ্ছে...'
                : 'Packaging ZIP...'
              : lang === 'bn'
              ? 'সম্পূর্ণ স্কিল প্যাকেজ ডাউনলোড (.ZIP)'
              : 'Download Skill Repo (.ZIP)'}
          </span>
        </button>
      </div>

      <div className="p-6 flex flex-col gap-6">
        {/* Screenshot Diagnosis & Instant Fix Box */}
        <div className="p-5 rounded-xl bg-amber-950/30 border border-amber-600/40 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>
                {lang === 'bn'
                  ? 'ছবিতে দেখানো সমস্যার কারণ ও সরাসরি সমাধান'
                  : 'Screenshot Error Analysis & Instant Solution'}
              </span>
            </div>
            <span className="text-[11px] font-mono text-amber-200/80">
              mdmukul120/claude-remotion-skill
            </span>
          </div>

          <div className="text-xs text-slate-300 leading-relaxed">
            {lang === 'bn' ? (
              <>
                <p className="mb-2">
                  <strong className="text-amber-200">সমস্যার কারণ:</strong> Claude আপনার লিঙ্কে গিয়ে বলেছে:{' '}
                  <code className="bg-slate-900/90 text-amber-300 px-1.5 py-0.5 rounded font-mono text-[11px]">
                    "This repo isn't a Claude skill, so there's nothing to install. It has no SKILL.md and no README..."
                  </code>{' '}
                  কারণ আপনার গিটহাবে কেবল সাধারণ ওয়েব অ্যাপ কোড ছিল, কোনো <code className="text-white font-mono">SKILL.md</code> ছিল না।
                </p>
                <p>
                  <strong className="text-emerald-400">সমাধান:</strong> আমরা এখন সরাসরি রুট লেভেলে <code className="text-emerald-300 font-mono">SKILL.md</code>, <code className="text-emerald-300 font-mono">README.md</code> এবং সব টার্বো রেন্ডার রেফারেন্স যোগ করেছি। আপনি নিচের যেকোনো একটি উপায়ে ব্যবহার করতে পারেন:
                </p>
              </>
            ) : (
              <>
                <p className="mb-2">
                  <strong className="text-amber-200">Root Cause:</strong> Claude responded with:{' '}
                  <code className="bg-slate-900/90 text-amber-300 px-1.5 py-0.5 rounded font-mono text-[11px]">
                    "This repo isn't a Claude skill, so there's nothing to install. It has no SKILL.md and no README..."
                  </code>{' '}
                  because your GitHub repository only had web templates and lacked a root <code className="text-white font-mono">SKILL.md</code>.
                </p>
                <p>
                  <strong className="text-emerald-400">Fix Applied:</strong> We have now placed <code className="text-emerald-300 font-mono">SKILL.md</code>, <code className="text-emerald-300 font-mono">README.md</code>, and all reference guides at the root.
                </p>
              </>
            )}
          </div>

          <div className="mt-2 pt-3 border-t border-amber-900/40 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-white block mb-0.5">
                  {lang === 'bn' ? 'পদ্ধতি ১: Claude অ্যাপে সরাসরি জিপ আপলোড' : 'Method 1: Direct Upload in Claude App'}
                </span>
                <span className="text-[11px] text-slate-400">
                  {lang === 'bn'
                    ? 'Claude এর নির্দেশনা: Settings → Capabilities → Skills এ গিয়ে জিপটি আপলোড করুন।'
                    : 'As Claude suggested: Go to Settings → Capabilities → Skills and upload ZIP.'}
                </span>
              </div>
              <button
                onClick={handleDownloadZip}
                disabled={isZipping}
                className="self-start flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'ক্লড স্কিল জিপ ডাউনলোড করুন' : 'Download Skill ZIP'}</span>
              </button>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-white block mb-0.5">
                  {lang === 'bn' ? 'পদ্ধতি ২: আপনার গিটহাবে পুশ করুন' : 'Method 2: Update your GitHub Repo'}
                </span>
                <span className="text-[11px] text-slate-400">
                  {lang === 'bn'
                    ? 'নিচের গিট কমান্ড চালিয়ে mdmukul120/claude-remotion-skill এ SKILL.md পুশ করুন।'
                    : 'Push the updated root SKILL.md to mdmukul120/claude-remotion-skill.'}
                </span>
              </div>
              <button
                onClick={() => handleCopy(pushGitCommands, 'git-push-top')}
                className="self-start flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-colors cursor-pointer"
              >
                {copiedStep === 'git-push-top' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>{lang === 'bn' ? 'গিট পুশ কমান্ড কপি করুন' : 'Copy Git Push Commands'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Step 0: Customization Form */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                GitHub Username / Org
              </label>
              <input
                type="text"
                value={repoUser}
                onChange={(e) => setRepoUser(e.target.value.trim() || 'my-username')}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Repository Name
              </label>
              <input
                type="text"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value.trim() || 'claude-remotion-turbo-skill')}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="text-right w-full md:w-auto shrink-0">
            <span className="text-[11px] text-slate-500 block">Target Git URL</span>
            <span className="font-mono text-xs text-indigo-400 font-semibold block truncate max-w-xs">
              {fullRepoUrl}
            </span>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Step 1: Push to GitHub */}
          <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-200 flex items-center justify-center text-[10px]">
                    1
                  </span>
                  {lang === 'bn' ? 'গিটহাবে পুশ করুন' : 'Push to Your GitHub'}
                </span>

                <button
                  onClick={() => handleCopy(pushGitCommands, 'git-push')}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 font-medium"
                >
                  {copiedStep === 'git-push' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Script</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-400 mb-3">
                {lang === 'bn'
                  ? 'ডাউনলোড করা ফাইলগুলো আনজিপ করে আপনার টার্মিনালে এই কমান্ডগুলো চালান:'
                  : 'Unzip the downloaded package and run these commands in your shell:'}
              </p>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed max-h-52">
                <pre>{pushGitCommands}</pre>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
              <span>Automatic public repo setup</span>
              <span>GitHub CLI ready</span>
            </div>
          </div>

          {/* Step 2: 1-Click Install in Claude */}
          <div className="p-5 rounded-xl bg-indigo-950/30 border border-indigo-500/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-bold text-indigo-300 tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                    2
                  </span>
                  {lang === 'bn' ? 'ক্লড এ সরাসরি লিঙ্ক ইনস্টল' : 'Direct Link Install in Claude'}
                </span>

                <button
                  onClick={() => handleCopy(claudeInstallCmd, 'claude-cli')}
                  className="flex items-center gap-1 text-xs text-indigo-300 hover:text-white font-medium"
                >
                  {copiedStep === 'claude-cli' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Install Link</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-300 mb-3">
                {lang === 'bn'
                  ? 'Claude Code CLI-তে সরাসরি স্কিল লিঙ্ক আকারে ইনস্টল করতে রান করুন:'
                  : 'Run this command directly in Claude Code CLI to install via URL:'}
              </p>

              <div className="bg-slate-950 p-3 rounded-lg border border-indigo-500/30 font-mono text-xs text-emerald-300 mb-4 overflow-x-auto">
                <code>{claudeInstallCmd}</code>
              </div>

              {/* Alternative installations */}
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="font-semibold text-slate-200 block mb-0.5">
                    Cursor / Windsurf / VS Code
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    Clone directly to <code className="text-indigo-300 font-mono">.claude/skills/remotion-turbo/</code> or add to <code className="text-indigo-300 font-mono">.cursorrules</code>.
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="font-semibold text-slate-200 block mb-0.5">
                    Claude Desktop / Projects
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    Paste the contents of <code className="text-indigo-300 font-mono">SKILL.md</code> directly into your Claude Project Custom Instructions.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-indigo-900/50 flex items-center justify-between text-xs text-indigo-300">
              <span>Automatic trigger on video keywords</span>
              <span>60fps physics ready</span>
            </div>
          </div>
        </div>

        {/* Step 3: Example Prompts to test with Claude */}
        <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800">
          <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-3">
            {lang === 'bn'
              ? 'ক্লড এ টেস্ট করার জন্য রেডিমেড প্রম্পটসমূহ'
              : 'Test Prompts to Run with Your New Claude Skill'}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: lang === 'bn' ? 'ভাইরাল টিকটক/রিল হুক' : 'Viral TikTok/Reel Hook (9:16)',
                prompt:
                  'Use remotion-turbo to create a 15-second high-energy vertical 9:16 video for an AI developer tool with kinetic captions, beat drops, and an animated counter.',
              },
              {
                title: lang === 'bn' ? 'সিনেম্যাটিক প্রোডাক্ট ট্রেলার' : 'Cinematic Product Stinger (16:9)',
                prompt:
                  'Generate a 1080p 60fps Remotion composition for our new fintech API with Obsidian gold lighting, 3D card tilt, and render it using the turbo GPU pipeline.',
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 flex flex-col justify-between gap-2"
              >
                <div>
                  <span className="text-xs font-semibold text-slate-200 block mb-1">
                    {p.title}
                  </span>
                  <p className="text-xs text-slate-400 italic">"{p.prompt}"</p>
                </div>
                <button
                  onClick={() => handleCopy(p.prompt, `prompt-${idx}`)}
                  className="self-end flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  {copiedStep === `prompt-${idx}` ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
