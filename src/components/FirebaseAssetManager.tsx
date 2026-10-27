import React, { useState, useEffect } from 'react';
import {
  Flame,
  Music,
  Volume2,
  Film,
  Type,
  Plus,
  Copy,
  Check,
  Download,
  Play,
  Pause,
  ExternalLink,
  Sparkles,
  Layers,
  Database,
  CloudCheck
} from 'lucide-react';
import { triggerDownload } from '../utils/zipExporter';
import { db, projectId, storageBucket } from '../lib/firebase';
import { collection, onSnapshot, doc, setDoc, getDocs } from 'firebase/firestore';

export interface AssetRecord {
  id: string;
  name: string;
  category: 'sfx' | 'music' | 'overlay' | 'font' | 'graphic';
  type: string;
  url: string;
  localPath?: string;
  durationFrames?: number;
  bpm?: number;
  description?: string;
  createdAt?: string;
}

const INITIAL_ASSETS: AssetRecord[] = [
  {
    id: 'sfx-woosh-fast',
    name: 'Cinematic Whoosh Transition',
    category: 'sfx',
    type: 'audio/mp3',
    url: 'https://firebasestorage.googleapis.com/v0/b/iconic-flare-2f4nj.firebasestorage.app/o/sfx%2Fwhoosh-fast.mp3?alt=media',
    localPath: 'assets/sfx/whoosh-fast.mp3',
    durationFrames: 24,
    description: 'High-speed air whoosh for card flips, camera whip pans, and kinetic text reveals.',
  },
  {
    id: 'sfx-cinematic-impact',
    name: 'Heavy Sub Bass Impact',
    category: 'sfx',
    type: 'audio/mp3',
    url: 'https://firebasestorage.googleapis.com/v0/b/iconic-flare-2f4nj.firebasestorage.app/o/sfx%2Fsub-impact.mp3?alt=media',
    localPath: 'assets/sfx/sub-impact.mp3',
    durationFrames: 45,
    description: 'Low-frequency dramatic slam for logo stingers and headline drops.',
  },
  {
    id: 'sfx-digital-click',
    name: 'Tactile UI Mechanical Click',
    category: 'sfx',
    type: 'audio/mp3',
    url: 'https://firebasestorage.googleapis.com/v0/b/iconic-flare-2f4nj.firebasestorage.app/o/sfx%2Fdigital-click.mp3?alt=media',
    localPath: 'assets/sfx/digital-click.mp3',
    durationFrames: 12,
    description: 'Sharp tactile pop for numeric counters, button highlights, and staggered badges.',
  },
  {
    id: 'bgm-tech-minimal',
    name: 'Modern Silicon Tech Beat (124 BPM)',
    category: 'music',
    type: 'audio/mp3',
    url: 'https://firebasestorage.googleapis.com/v0/b/iconic-flare-2f4nj.firebasestorage.app/o/music%2Ftech-minimal.mp3?alt=media',
    localPath: 'assets/music/tech-minimal.mp3',
    durationFrames: 900,
    bpm: 124,
    description: 'Punchy minimalist electronic beat ideal for SaaS product launches and developer tools.',
  },
  {
    id: 'bgm-cyberpunk-drive',
    name: 'Neo-Tokyo Synthwave Pulse (128 BPM)',
    category: 'music',
    type: 'audio/mp3',
    url: 'https://firebasestorage.googleapis.com/v0/b/iconic-flare-2f4nj.firebasestorage.app/o/music%2Fcyberpunk-drive.mp3?alt=media',
    localPath: 'assets/music/cyberpunk-drive.mp3',
    durationFrames: 1080,
    bpm: 128,
    description: 'Aggressive analog synth bassline for high-energy tech trailers and glitch reels.',
  },
  {
    id: 'overlay-dust-particles',
    name: 'Cinematic Floating Dust Particles',
    category: 'overlay',
    type: 'video/mp4',
    url: 'https://firebasestorage.googleapis.com/v0/b/iconic-flare-2f4nj.firebasestorage.app/o/overlays%2Fdust-particles.mp4?alt=media',
    localPath: 'assets/overlays/dust-particles.mp4',
    durationFrames: 300,
    description: 'Slow organic bokeh dust float for cinematic luxury and depth layering.',
  },
  {
    id: 'font-plus-jakarta',
    name: 'Plus Jakarta Sans Bold Font',
    category: 'font',
    type: 'font/woff2',
    url: 'https://firebasestorage.googleapis.com/v0/b/iconic-flare-2f4nj.firebasestorage.app/o/fonts%2FPlusJakartaSans-Bold.woff2?alt=media',
    localPath: 'assets/fonts/PlusJakartaSans-Bold.woff2',
    description: 'Ultra-crisp geometric modern sans display typeface for title tokens.',
  },
];

interface FirebaseAssetManagerProps {
  lang: 'en' | 'bn';
}

export const FirebaseAssetManager: React.FC<FirebaseAssetManagerProps> = ({ lang }) => {
  const [assets, setAssets] = useState<AssetRecord[]>(INITIAL_ASSETS);
  const [filter, setFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [firestoreConnected, setFirestoreConnected] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // New Asset Form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'sfx' | 'music' | 'overlay' | 'font' | 'graphic'>('sfx');
  const [newUrl, setNewUrl] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newBpm, setNewBpm] = useState<number | undefined>();
  const [newDuration, setNewDuration] = useState<number>(30);

  // Real-time Firestore sync
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'remotion_assets'),
      async (snapshot) => {
        setFirestoreConnected(true);
        if (!snapshot.empty) {
          const remoteAssets: AssetRecord[] = [];
          snapshot.forEach((docSnap) => {
            remoteAssets.push(docSnap.data() as AssetRecord);
          });
          setAssets(remoteAssets);
        } else {
          // Seed Firestore with initial curated assets if empty
          try {
            for (const item of INITIAL_ASSETS) {
              await setDoc(doc(db, 'remotion_assets', item.id), item);
            }
          } catch (e) {
            console.warn('Initial seed write:', e);
          }
        }
      },
      (error) => {
        console.warn('Firestore onSnapshot listener error:', error);
      }
    );

    return () => unsub();
  }, []);

  const filteredAssets = assets.filter(
    (a) => filter === 'all' || a.category === filter
  );

  const handleCopyCode = (asset: AssetRecord) => {
    let snippet = '';
    if (asset.category === 'sfx') {
      snippet = `// Remotion Audio SFX Component
<Audio
  src="${asset.url}"
  volume={0.8}
  startFrom={0}
/>`;
    } else if (asset.category === 'music') {
      snippet = `// Remotion Background Music Component (BPM: ${asset.bpm || 120})
<Audio
  src="${asset.url}"
  volume={0.35}
  loop
/>`;
    } else if (asset.category === 'overlay') {
      snippet = `// Remotion Video Overlay Component
<OffthreadVideo
  src="${asset.url}"
  style={{
    position: "absolute",
    inset: 0,
    mixBlendMode: "screen",
    opacity: 0.6,
    pointerEvents: "none",
  }}
/>`;
    } else {
      snippet = `// Remotion Custom Font Loader
const fontUrl = "${asset.url}";
const font = new FontFace("CustomFont", \`url(\${fontUrl})\`);
font.load().then(f => document.fonts.add(f));`;
    }

    navigator.clipboard.writeText(snippet);
    setCopiedId(asset.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePlayAudioSimulation = (asset: AssetRecord) => {
    if (playingId === asset.id) {
      setPlayingId(null);
      return;
    }
    setPlayingId(asset.id);

    // Audio tone simulation via Web Audio API for interactive feedback
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      if (asset.category === 'sfx') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, audioCtx.currentTime + 0.35);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 1.2);
      }
    } catch {
      // AudioContext fallback
    }

    setTimeout(() => {
      setPlayingId(null);
    }, 1200);
  };

  const handleAddNewAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;

    const id = newTitle.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const ext = newCategory === 'overlay' ? 'mp4' : newCategory === 'font' ? 'woff2' : 'mp3';
    const newAsset: AssetRecord = {
      id,
      name: newTitle.trim(),
      category: newCategory,
      type: newCategory === 'overlay' ? 'video/mp4' : newCategory === 'font' ? 'font/woff2' : 'audio/mp3',
      url: newUrl.trim(),
      localPath: `assets/${newCategory}/${id}.${ext}`,
      durationFrames: newDuration,
      bpm: newBpm,
      description: newDesc.trim() || 'Custom asset added via Firebase Storage integration.',
      createdAt: new Date().toISOString(),
    };

    try {
      setIsSaving(true);
      await setDoc(doc(db, 'remotion_assets', newAsset.id), newAsset);
      setShowAddModal(false);
      setNewTitle('');
      setNewUrl('');
      setNewDesc('');
    } catch (err) {
      console.error('Error saving asset to Firestore:', err);
      // Fallback local state if offline
      setAssets([newAsset, ...assets]);
      setShowAddModal(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportCatalog = () => {
    const data = {
      version: '2.0.0',
      firebaseConfig: {
        projectId,
        storageBucket,
        firestoreCollection: 'remotion_assets',
      },
      assets,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    triggerDownload(blob, 'asset-catalog.json');
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'sfx':
        return <Volume2 className="w-4 h-4 text-amber-400" />;
      case 'music':
        return <Music className="w-4 h-4 text-indigo-400" />;
      case 'overlay':
        return <Film className="w-4 h-4 text-cyan-400" />;
      case 'font':
      default:
        return <Type className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500/20" />
              {lang === 'bn'
                ? 'ফায়ারবেস ক্লাউড অ্যাসেট ম্যানেজার'
                : 'Firebase Cloud Asset Catalog'}
            </h3>
            <span className="text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{projectId} · Firestore Live</span>
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {lang === 'bn'
              ? 'ফায়ারবেস স্টোরেজ ও ফায়ারস্টোর থেকে অডিও SFX, মিউজিক ও ভিডিও ওভারলে সিঙ্ক করুন যা Claude সরাসরি রিমোশনে ব্যবহার করবে'
              : 'Synced with live Firebase Firestore & Storage. Claude uses these cloud assets directly in Remotion'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'নতুন অ্যাসেট যোগ করুন' : 'Add Firebase Asset'}</span>
          </button>

          <button
            onClick={handleExportCatalog}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
            title="Download updated asset-catalog.json"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'ক্যাটালগ ডাউনলোড' : 'Export Catalog'}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-6 py-3 border-b border-slate-800/80 bg-slate-950/50 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800">
          {[
            { id: 'all', label: lang === 'bn' ? 'সব অ্যাসেট' : 'All Assets' },
            { id: 'sfx', label: 'Sound FX' },
            { id: 'music', label: 'Music Beats' },
            { id: 'overlay', label: 'Overlays' },
            { id: 'font', label: 'Fonts' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                filter === cat.id
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-400 font-mono">
          <span>{filteredAssets.length} assets registered</span>
          <span className="mx-2">·</span>
          <span className="text-amber-400">Firebase Storage Ready</span>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between gap-3 shadow-md"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    {getCategoryIcon(asset.category)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 line-clamp-1">
                      {asset.name}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      {asset.category} · {asset.type.split('/')[1]}
                    </span>
                  </div>
                </div>

                {asset.bpm && (
                  <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-950/60 border border-indigo-800/40 px-1.5 py-0.5 rounded">
                    {asset.bpm} BPM
                  </span>
                )}
              </div>

              <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                {asset.description}
              </p>
            </div>

            {/* Cloud URL & Action Buttons */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <button
                onClick={() => handlePlayAudioSimulation(asset)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-800 transition-colors cursor-pointer"
              >
                {playingId === asset.id ? (
                  <>
                    <Pause className="w-3 h-3 text-amber-400 animate-pulse" />
                    <span className="text-amber-400">Playing...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 text-slate-400" />
                    <span>{asset.category === 'overlay' ? 'Preview' : 'Play SFX'}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleCopyCode(asset)}
                className="flex items-center gap-1 text-[11px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                title="Copy Remotion component code snippet for Claude"
              >
                {copiedId === asset.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Remotion Code</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Claude Usage Instruction Callout */}
      <div className="mx-6 mb-6 p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-indigo-600/20 text-indigo-400 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <h5 className="font-semibold text-indigo-200 mb-0.5">
              {lang === 'bn'
                ? 'Claude-এ কিভাবে এই ফায়ারবেস অ্যাসেট ব্যবহার করবেন?'
                : 'How Claude automatically uses these Firebase assets in Remotion:'}
            </h5>
            <p className="text-slate-300 leading-relaxed">
              {lang === 'bn'
                ? 'Claude-এ যখন প্রম্পট দিবেন, Claude সরাসরি assets/asset-catalog.json থেকে Firebase Storage লিঙ্ক পেয়ে অডিও এবং ভিডিও এলিমেন্টে ইনজেক্ট করে দিবে। কোনো লোকাল ফাইল মিসিং এরর আসবে না।'
                : 'When prompting Claude to create a video, Claude pulls streaming Firebase Storage URLs from assets/asset-catalog.json directly into <Audio> and <Video> tags with zero missing file errors.'}
            </p>
          </div>
        </div>

        <button
          onClick={handleExportCatalog}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold whitespace-nowrap shrink-0 shadow-sm transition-colors cursor-pointer"
        >
          {lang === 'bn' ? 'asset-catalog.json ডাউনলোড' : 'Download Catalog JSON'}
        </button>
      </div>

      {/* Add New Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500" />
                {lang === 'bn' ? 'ফায়ারবেস অ্যাসেট যোগ করুন' : 'Add New Firebase Asset'}
              </h4>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNewAsset} className="flex flex-col gap-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Asset Name / Title</label>
                <input
                  type="text"
                  placeholder="e.g. Cyberpunk Whoosh Fast"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="sfx">Sound FX (SFX)</option>
                    <option value="music">Background Music (BGM)</option>
                    <option value="overlay">Video Overlay / B-Roll</option>
                    <option value="font">Custom Font (WOFF2)</option>
                    <option value="graphic">Graphic / Logo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">BPM (Optional for Music)</label>
                  <input
                    type="number"
                    placeholder="e.g. 128"
                    value={newBpm || ''}
                    onChange={(e) => setNewBpm(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">
                  Firebase Storage Download URL
                </label>
                <input
                  type="url"
                  placeholder="https://firebasestorage.googleapis.com/v0/b/.../o/sfx.mp3?alt=media"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-mono text-[11px] focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Description</label>
                <textarea
                  placeholder="Describe when Claude should use this asset (e.g. hook intro, transition)..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 mt-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer shadow-sm"
                >
                  Save to Asset Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
