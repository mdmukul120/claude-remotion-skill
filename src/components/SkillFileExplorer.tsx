import React, { useState } from 'react';
import { SKILL_FILES, SkillFile } from '../data/skillFiles';
import { FileCode, Copy, Check, Download, Search, Terminal, BookOpen, Settings } from 'lucide-react';
import { triggerDownload } from '../utils/zipExporter';

interface SkillFileExplorerProps {
  lang: 'en' | 'bn';
}

export const SkillFileExplorer: React.FC<SkillFileExplorerProps> = ({ lang }) => {
  const [selectedFile, setSelectedFile] = useState<SkillFile>(SKILL_FILES[0]);
  const [copied, setCopied] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredFiles = SKILL_FILES.filter((file) => {
    const matchesSearch =
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || file.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([selectedFile.content], { type: 'text/plain;charset=utf-8' });
    triggerDownload(blob, selectedFile.name);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'core':
        return <BookOpen className="w-3.5 h-3.5 text-indigo-400" />;
      case 'reference':
        return <FileCode className="w-3.5 h-3.5 text-cyan-400" />;
      case 'script':
        return <Terminal className="w-3.5 h-3.5 text-amber-400" />;
      case 'config':
      default:
        return <Settings className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
      {/* Header Bar */}
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <FileCode className="w-4 h-4 text-indigo-400" />
            {lang === 'bn'
              ? 'প্রিমিয়াম স্কিল রিপোজিটরি ফাইল ব্রাউজার'
              : 'Skill Repository & Code Explorer'}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {lang === 'bn'
              ? 'GitHub-এ পুশ করার জন্য সম্পূর্ণ প্রস্তুত ফাইল কাঠামো এবং কনফিগারেশন'
              : 'Production-ready file tree designed for Claude Code, Cursor, and GitHub'}
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
          {[
            { id: 'all', label: lang === 'bn' ? 'সব' : 'All' },
            { id: 'core', label: 'Core' },
            { id: 'reference', label: 'References' },
            { id: 'script', label: 'Scripts' },
            { id: 'config', label: 'Configs' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                categoryFilter === cat.id
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* Left Sidebar: File List & Search */}
        <div className="lg:col-span-4 border-r border-slate-800 bg-slate-950/40 p-4 flex flex-col gap-3">
          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === 'bn' ? 'ফাইল খুঁজুন...' : 'Search files...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Files List */}
          <div className="flex flex-col gap-1 overflow-y-auto max-h-[500px] pr-1">
            {filteredFiles.map((file) => {
              const isSelected = selectedFile.path === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left p-2.5 rounded-lg border transition-all flex flex-col gap-1 ${
                    isSelected
                      ? 'bg-indigo-950/50 border-indigo-500/40 text-slate-100 shadow-sm'
                      : 'bg-slate-900/40 border-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-semibold text-slate-200 flex items-center gap-1.5 truncate">
                      {getCategoryIcon(file.category)}
                      {file.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      {file.language}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 line-clamp-1">
                    {file.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Code Viewer Area */}
        <div className="lg:col-span-8 flex flex-col bg-slate-950">
          {/* File Toolbar */}
          <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between gap-4 flex-wrap bg-slate-950/90">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-indigo-400 font-semibold">
                {selectedFile.path}
              </span>
              <span className="text-slate-600 text-xs">·</span>
              <span className="text-xs text-slate-400 font-mono tabular-nums">
                {selectedFile.content.split('\n').length} lines
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
                title="Copy entire code"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">
                      {lang === 'bn' ? 'কপি হয়েছে' : 'Copied'}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>{lang === 'bn' ? 'কপি করুন' : 'Copy'}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadFile}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors shadow-sm"
                title="Download this file"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'ডাউনলোড' : 'Download'}</span>
              </button>
            </div>
          </div>

          {/* Code block with line numbers */}
          <div className="p-4 overflow-x-auto overflow-y-auto max-h-[520px] font-mono text-xs leading-relaxed text-slate-300">
            <pre className="flex">
              <span className="select-none text-slate-600 pr-4 text-right border-r border-slate-800 mr-4">
                {selectedFile.content.split('\n').map((_, i) => (
                  <span key={i} className="block tabular-nums">
                    {i + 1}
                  </span>
                ))}
              </span>
              <code className="text-slate-200 whitespace-pre">
                {selectedFile.content}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
