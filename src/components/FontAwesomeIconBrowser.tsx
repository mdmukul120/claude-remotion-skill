import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRocket,
  faFire,
  faBolt,
  faStar,
  faHeart,
  faTrophy,
  faCrown,
  faWandMagicSparkles,
  faBomb,
  faBurst,
  faPlay,
  faPause,
  faFilm,
  faVideo,
  faMicrophone,
  faVolumeHigh,
  faHeadphones,
  faCompactDisc,
  faChartLine,
  faChartPie,
  faGaugeHigh,
  faMicrochip,
  faCode,
  faTerminal,
  faServer,
  faShieldHalved,
  faCartShopping,
  faBagShopping,
  faTag,
  faBell,
  faCircleCheck,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {
  faYoutube,
  faTiktok,
  faInstagram,
  faXTwitter,
  faGithub,
  faDiscord,
  faLinkedin,
  faTwitch,
  faSpotify,
  faApple,
  faGoogle,
  faFacebook,
  faStripe,
  faReddit,
  faTelegram,
} from '@fortawesome/free-brands-svg-icons';
import { Search, Copy, Check, Sparkles, Code2, Play } from 'lucide-react';
import { FONTAWESOME_ICONS, FontAwesomeIconItem } from '../data/fontawesomeIcons';

const ICON_MAP: Record<string, IconDefinition> = {
  faRocket,
  faFire,
  faBolt,
  faStar,
  faHeart,
  faTrophy,
  faCrown,
  faWandMagicSparkles,
  faBomb,
  faBurst,
  faPlay,
  faPause,
  faFilm,
  faVideo,
  faMicrophone,
  faVolumeHigh,
  faHeadphones,
  faCompactDisc,
  faChartLine,
  faChartPie,
  faGaugeHigh,
  faMicrochip,
  faCode,
  faTerminal,
  faServer,
  faShieldHalved,
  faCartShopping,
  faBagShopping,
  faTag,
  faBell,
  faCircleCheck,
  faYoutube,
  faTiktok,
  faInstagram,
  faXTwitter,
  faGithub,
  faDiscord,
  faLinkedin,
  faTwitch,
  faSpotify,
  faApple,
  faGoogle,
  faFacebook,
  faStripe,
  faReddit,
  faTelegram,
};

interface FontAwesomeIconBrowserProps {
  lang: 'en' | 'bn';
}

export const FontAwesomeIconBrowser: React.FC<FontAwesomeIconBrowserProps> = ({ lang }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewAnimation, setPreviewAnimation] = useState<'pop' | 'pulse' | 'spin'>('pop');
  const [activeIcon, setActiveIcon] = useState<FontAwesomeIconItem>(FONTAWESOME_ICONS[0]);

  const categories = [
    { id: 'all', label: lang === 'bn' ? 'সকল আইকন' : 'All Icons', count: FONTAWESOME_ICONS.length },
    { id: 'brands', label: lang === 'bn' ? 'ব্র্যান্ড ও সোশ্যাল' : 'Brands & Social', count: FONTAWESOME_ICONS.filter(i => i.category === 'brands').length },
    { id: 'motion', label: lang === 'bn' ? 'মোশন ও এনার্জি' : 'Motion & Energy', count: FONTAWESOME_ICONS.filter(i => i.category === 'motion').length },
    { id: 'media', label: lang === 'bn' ? 'মিডিয়া ও সাউন্ড' : 'Media & Sound', count: FONTAWESOME_ICONS.filter(i => i.category === 'media').length },
    { id: 'analytics', label: lang === 'bn' ? 'অ্যানালিটিক্স ও টেক' : 'Analytics & Tech', count: FONTAWESOME_ICONS.filter(i => i.category === 'analytics').length },
    { id: 'commerce', label: lang === 'bn' ? 'মার্কেটিং ও শপ' : 'Commerce & CTA', count: FONTAWESOME_ICONS.filter(i => i.category === 'commerce').length },
  ];

  const filteredIcons = FONTAWESOME_ICONS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const query = search.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.exportName.toLowerCase().includes(query) ||
      item.keywords.some((k) => k.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  const getRemotionSnippet = (item: FontAwesomeIconItem) => {
    const pkg = item.library === 'brands' ? '@fortawesome/free-brands-svg-icons' : '@fortawesome/free-solid-svg-icons';
    return `// Remotion Spring Animated Icon Component
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ${item.exportName} } from "${pkg}";

export const Animated${item.exportName.replace(/^fa/, '')}Icon = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 180, overshootClamping: false },
  });

  return (
    <div
      style={{
        transform: \`scale(\${pop})\`,
        opacity: Math.min(1, pop),
        filter: "drop-shadow(0 0 16px rgba(99, 102, 241, 0.5))",
      }}
      className="text-indigo-400 text-5xl"
    >
      <FontAwesomeIcon icon={${item.exportName}} />
    </div>
  );
};`;
  };

  const handleCopyCode = (item: FontAwesomeIconItem) => {
    const code = getRemotionSnippet(item);
    navigator.clipboard.writeText(code);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const activeIconDef = ICON_MAP[activeIcon.exportName] || faRocket;

  return (
    <div className="flex flex-col gap-6">
      {/* Header Info */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              {lang === 'bn' ? 'ভেক্টর অ্যাসেট প্যাক' : 'Vector Asset Suite'}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              FontAwesome v6
            </span>
          </div>
          <h2 className="text-xl font-bold text-white">
            {lang === 'bn' ? 'ফন্টঅসাম ভেক্টর আইকন কালেকশন' : 'FontAwesome Vector Icon Pack'}
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            {lang === 'bn'
              ? 'ক্লড এর মাধ্যমে রিমোশনে সরাসরি স্কেল-ফ্রি ভেক্টর আইকন ব্যবহার করুন। কোন পিএনজি কোয়ালিটি লস নেই, ১০০% শার্প ৪কে রেন্ডার এবং রিয়েল-টাইম স্প্রিং অ্যানিমেশন।'
              : 'Scale-free SVG vector icons curated for Remotion programmatic motion graphics. Infinite sharpness at 4K, zero latency, and native CSS/spring physics.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              const installCommand = 'npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons';
              navigator.clipboard.writeText(installCommand);
              setCopiedId('install-cmd');
              setTimeout(() => setCopiedId(null), 2000);
            }}
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            {copiedId === 'install-cmd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>npm install fontawesome</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Explorer & Live Code Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Search & Icon Grid (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Search bar & Category filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={lang === 'bn' ? 'আইকন খুঁজুন (e.g. rocket, youtube, chart, fire)...' : 'Search icons (e.g. rocket, youtube, chart)...'}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>

          {/* Icon Cards Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-[500px] overflow-y-auto pr-1">
            {filteredIcons.map((item) => {
              const iconDef = ICON_MAP[item.exportName];
              const isSelected = activeIcon.id === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIcon(item)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 text-center transition-all ${
                    isSelected
                      ? 'bg-indigo-950/60 border-indigo-500 text-indigo-300 ring-2 ring-indigo-500/20'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-950/60 flex items-center justify-center text-xl">
                    {iconDef && <FontAwesomeIcon icon={iconDef} />}
                  </div>
                  <span className="text-[11px] font-medium leading-tight truncate w-full">
                    {item.name}
                  </span>
                  <span className="text-[9px] text-slate-500 truncate w-full">
                    {item.exportName}
                  </span>
                </button>
              );
            })}
          </div>

          {filteredIcons.length === 0 && (
            <div className="p-8 text-center bg-slate-900/30 border border-slate-800 rounded-xl text-slate-400 text-sm">
              {lang === 'bn' ? 'কোন আইকন খুঁজে পাওয়া যায়নি।' : 'No icons found matching your query.'}
            </div>
          )}
        </div>

        {/* Right: Selected Icon Inspector & Remotion Code (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Animated Playground Card */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {lang === 'bn' ? 'লাইভ প্রিভিউ' : 'Live Motion Preview'}
              </span>
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px]">
                <button
                  onClick={() => setPreviewAnimation('pop')}
                  className={`px-2 py-0.5 rounded ${previewAnimation === 'pop' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                >
                  Pop
                </button>
                <button
                  onClick={() => setPreviewAnimation('pulse')}
                  className={`px-2 py-0.5 rounded ${previewAnimation === 'pulse' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                >
                  Pulse
                </button>
                <button
                  onClick={() => setPreviewAnimation('spin')}
                  className={`px-2 py-0.5 rounded ${previewAnimation === 'spin' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                >
                  Spin
                </button>
              </div>
            </div>

            {/* Stage */}
            <div className="h-44 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-center relative overflow-hidden">
              {/* Subtle background radial grid */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12),transparent_70%)]" />

              <div
                className={`text-6xl text-indigo-400 transition-all duration-300 drop-shadow-[0_0_24px_rgba(99,102,241,0.6)] ${
                  previewAnimation === 'pop'
                    ? 'animate-bounce'
                    : previewAnimation === 'pulse'
                    ? 'animate-pulse'
                    : 'animate-spin'
                }`}
              >
                <FontAwesomeIcon icon={activeIconDef} />
              </div>
            </div>

            {/* Metadata Bar */}
            <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-3">
              <div>
                <span className="text-white font-semibold">{activeIcon.name}</span>
                <span className="text-slate-500 ml-2">({activeIcon.library} pack)</span>
              </div>
              <button
                onClick={() => handleCopyCode(activeIcon)}
                className="flex items-center gap-1.5 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-medium transition-colors"
              >
                {copiedId === activeIcon.id ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === activeIcon.id ? (lang === 'bn' ? 'কপি হয়েছে!' : 'Copied!') : (lang === 'bn' ? 'কোড কপি' : 'Copy JSX')}</span>
              </button>
            </div>
          </div>

          {/* Ready-to-paste Remotion JSX Snippet */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Remotion Component Template</span>
              </span>
              <span className="text-[10px] text-slate-500">React + Spring</span>
            </div>
            <pre className="p-3 bg-slate-950 rounded-lg text-[11px] font-mono text-indigo-200/90 overflow-x-auto leading-relaxed border border-slate-800">
              {getRemotionSnippet(activeIcon)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
