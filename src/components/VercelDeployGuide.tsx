import React, { useState } from 'react';
import {
  Globe,
  Terminal,
  Copy,
  Check,
  ExternalLink,
  Zap,
  CheckCircle2,
  Server,
  FileCode
} from 'lucide-react';

interface VercelDeployGuideProps {
  lang: 'en' | 'bn';
}

export const VercelDeployGuide: React.FC<VercelDeployGuideProps> = ({ lang }) => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const vercelCliCommands = `# ১. Vercel CLI গ্লোবালি ইনস্টল করুন (যদি না থাকে)
npm install -g vercel

# ২. প্রজেক্ট রুট ফোল্ডারে টার্মিনাল খুলে ডিপ্লয় করুন
vercel

# ৩. সরাসরি প্রোডাকশনে ডিপ্লয় করতে রান করুন:
vercel --prod`;

  const vercelJsonContent = `{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}`;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const githubRepoUrl = 'https://github.com/mdmukul120/claude-remotion-skill';
  const vercelDeployUrl = `https://vercel.com/new/clone?repository-url=${encodeURIComponent(
    githubRepoUrl
  )}`;

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            {lang === 'bn'
              ? 'Vercel এ সরাসরি লাইভ ডিপ্লয়মেন্ট গাইড'
              : 'Deploy Remotion Studio Live to Vercel'}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {lang === 'bn'
              ? 'সম্পূর্ণ প্রজেক্টটি Vercel-এ ১-ক্লিকে হোস্ট করুন এবং বিশ্বব্যাপী লাইভ লিঙ্ক হিসেবে ব্যবহার করুন'
              : 'Host this entire studio dashboard and Remotion player on Vercel with zero config'}
          </p>
        </div>

        <a
          href={vercelDeployUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold shadow-lg transition-colors cursor-pointer"
        >
          <svg className="w-3.5 h-3.5 fill-black" viewBox="0 0 1155 1000">
            <path d="m577.3 0 577.4 1000H0z" />
          </svg>
          <span>{lang === 'bn' ? '১-ক্লিকে Vercel-এ ডিপ্লয়' : 'Deploy to Vercel'}</span>
        </a>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 1-Click & GitHub Flow */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col gap-3">
            <span className="text-xs uppercase font-bold text-cyan-400 tracking-wider">
              {lang === 'bn' ? 'পদ্ধতি ১: গিটহাব থেকে সরাসরি Vercel Import' : 'Method 1: Import via GitHub'}
            </span>

            <ol className="space-y-3 text-xs text-slate-300 list-decimal list-inside leading-relaxed">
              <li>
                আপনার GitHub রিপোজিটরি{' '}
                <code className="text-indigo-400 font-mono">
                  mdmukul120/claude-remotion-skill
                </code>{' '}
                -এ কোড পুশ করুন।
              </li>
              <li>
                <a
                  href="https://vercel.com/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline font-semibold inline-flex items-center gap-1"
                >
                  vercel.com/new <ExternalLink className="w-3 h-3" />
                </a>{' '}
                -এ যান এবং আপনার গিটহাব একাউন্ট দিয়ে লগইন করুন।
              </li>
              <li>
                <strong className="text-white">claude-remotion-skill</strong> রিপোজিটরিটি সিলেক্ট করে <strong className="text-white">Import</strong> বাটনে ক্লিক করুন।
              </li>
              <li>
                Framework Preset হিসেবে <code className="text-emerald-300 font-mono">Vite</code> স্বয়ংক্রিয়ভাবে ডিটেক্ট হবে। <strong className="text-white">Deploy</strong> চাপুন!
              </li>
            </ol>

            <div className="mt-2 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>vercel.json Pre-Configured</span>
              </span>
              <span>Instant Global CDN</span>
            </div>
          </div>

          {/* Vercel CLI Section */}
          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                {lang === 'bn' ? 'পদ্ধতি ২: Vercel CLI দিয়ে ডিপ্লয়' : 'Method 2: Fast Vercel CLI'}
              </span>

              <button
                onClick={() => handleCopy(vercelCliCommands, 'cli-cmd')}
                className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer"
              >
                {copiedCmd === 'cli-cmd' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Commands</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
              <pre>{vercelCliCommands}</pre>
            </div>
          </div>
        </div>

        {/* Right: vercel.json & Build Specs */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                {lang === 'bn' ? 'প্রস্তুতকৃত vercel.json কনফিগারেশন' : 'Production vercel.json'}
              </span>

              <button
                onClick={() => handleCopy(vercelJsonContent, 'vjson')}
                className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer"
              >
                {copiedCmd === 'vjson' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-slate-400">
              {lang === 'bn'
                ? 'এই কনফিগারেশনটি রুট ডিরেক্টরিতে ইতোমধ্যে তৈরি করা আছে, যাতে Vercel-এ কোনো 404 এরর ছাড়া SPA রাউটিং কাজ করে:'
                : 'Already placed at your project root. Guarantees SPA routing and fast caching on Vercel Edge:'}
            </p>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
              <pre>{vercelJsonContent}</pre>
            </div>
          </div>

          {/* Vercel + Claude Benefit Strip */}
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <h5 className="font-semibold text-emerald-200 mb-0.5">
                {lang === 'bn'
                  ? 'Vercel লাইভ লিংক Claude এ দেওয়ার সুবিধা'
                  : 'Benefit of Sharing Vercel Live Link in Claude'}
              </h5>
              <p className="text-slate-300 leading-relaxed">
                {lang === 'bn'
                  ? 'প্রজেক্টটি Vercel-এ ডিপ্লয় করার পর আপনি আপনার প্রজেক্টের লাইভ লিঙ্ক (যেমন: claude-remotion.vercel.app) ক্লায়েন্টকে দেখাতে পারবেন এবং Claude-এ লিঙ্কটি সরাসরি দিয়ে ভিডিও জেনারেশনের নতুন রিকোয়েস্ট দিতে পারবেন।'
                  : 'Once deployed to Vercel, you get an instant HTTPS URL (e.g. claude-remotion.vercel.app) accessible to Claude, collaborators, and clients with zero server maintenance.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
