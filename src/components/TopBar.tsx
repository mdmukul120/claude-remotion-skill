import React from 'react';
import { Download, Globe } from 'lucide-react';
import { generateSkillRepoZip, triggerDownload } from '../utils/zipExporter';

interface TopBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: 'en' | 'bn';
  setLang: (lang: 'en' | 'bn') => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
}) => {
  const [downloading, setDownloading] = React.useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const blob = await generateSkillRepoZip('claude-remotion-turbo-skill');
      triggerDownload(blob, 'claude-remotion-turbo-skill.zip');
    } catch (err) {
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  const navLinks = [
    { id: 'preview', label: lang === 'bn' ? 'লাইভ স্টুডিও' : 'Live Studio' },
    { id: 'assets', label: lang === 'bn' ? 'ফায়ারবেস অ্যাসেট' : 'Firebase Assets' },
    { id: 'vercel', label: lang === 'bn' ? 'Vercel ডিপ্লয়' : 'Vercel Deploy' },
    { id: 'files', label: lang === 'bn' ? 'স্কিল ফাইলসমূহ' : 'Skill Files' },
    { id: 'benchmark', label: lang === 'bn' ? 'টার্বো স্পিড' : 'Turbo Speed' },
    { id: 'github', label: lang === 'bn' ? 'গিটহাব ইনস্টল' : 'GitHub Install' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('preview');
          }}
          className="text-lg font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500 rotate-45 inline-block" />
          <span>Claude Remotion Turbo</span>
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === link.id
                  ? 'text-white font-semibold underline underline-offset-8 decoration-indigo-500 decoration-2'
                  : ''
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + language toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Switch Language (English / বাংলা)"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            <span>{lang === 'en' ? 'বাংলা' : 'English'}</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 shadow-sm transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>
              {downloading
                ? lang === 'bn'
                  ? 'ডাউনলোড হচ্ছে...'
                  : 'Downloading...'
                : lang === 'bn'
                ? 'স্কিল রিপো (.ZIP)'
                : 'Download Skill ZIP'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
