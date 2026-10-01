// src/components/layout/Navbar.tsx
'use client';

import React, { useSyncExternalStore } from 'react';
import { useStudentStore } from '@/store/useStudentStore';
import {
  Atom,
  BookMarked,
  Wifi,
  WifiOff,
  CheckCircle2,
} from 'lucide-react';

interface NavbarProps {
  onOpenFormulaSheet: () => void;
  onOpenBookmarks: () => void;
  activeTab: 'roadmap' | 'problems' | 'saved';
  setActiveTab: (tab: 'roadmap' | 'problems' | 'saved') => void;
}

function subscribeOnline(callback: () => void) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function getOnlineSnapshot() {
  return navigator.onLine;
}

function getServerOnlineSnapshot() {
  return true;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenFormulaSheet,
  activeTab,
  setActiveTab,
}) => {
  const { problemProgress, bookmarkedDerivationIds } = useStudentStore();
  const isOnline = useSyncExternalStore(
    subscribeOnline,
    getOnlineSnapshot,
    getServerOnlineSnapshot
  );

  const totalMasteredProblems = Object.values(problemProgress).filter(
    (p) => p.isMarkedMastered
  ).length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/90 bg-[#000000]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div
          onClick={() => setActiveTab('roadmap')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-purple-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(56,189,248,0.4)] group-hover:scale-105 transition-transform">
            <Atom className="w-6 h-6 animate-[spin_10s_linear_infinite]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base md:text-lg text-white tracking-tight">
                Open<span className="text-sky-400">POSN</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase">
                Free PWA
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
              สอวน. ฟิสิกส์ เพื่อทุกคน • First-Principles Physics
            </p>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-950/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'roadmap'
                ? 'bg-sky-500 text-black shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            แผนผังหลักสูตร (Roadmap)
          </button>
          <button
            onClick={() => setActiveTab('problems')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'problems'
                ? 'bg-sky-500 text-black shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            คลังโจทย์ สอวน. (Past Exams)
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'saved'
                ? 'bg-sky-500 text-black shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>สูตรที่บันทึก</span>
            {bookmarkedDerivationIds.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-purple-500 text-white text-[10px] flex items-center justify-center font-bold">
                {bookmarkedDerivationIds.length}
              </span>
            )}
          </button>
        </nav>

        {/* Right Status Group */}
        <div className="flex items-center gap-2">
          {/* Formula Sheet Trigger */}
          <button
            onClick={onOpenFormulaSheet}
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg border border-slate-800 bg-zinc-950 hover:bg-zinc-900 text-sky-400 text-xs font-medium flex items-center gap-1.5 transition-colors"
            title="เปิดคลังสูตรและทฤษฎีบท"
          >
            <BookMarked className="w-4 h-4" />
            <span className="hidden sm:inline">คลังสูตร</span>
          </button>

          {/* Mastered Problem Counter */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-950 border border-slate-800 text-xs text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>ผ่านแล้ว {totalMasteredProblems} ข้อ</span>
          </div>

          {/* Offline / Online Status */}
          <div
            className={`px-2 py-1 rounded-md text-[11px] font-medium border flex items-center gap-1 ${
              isOnline
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                : 'bg-amber-950/40 text-amber-300 border-amber-500/40 animate-pulse'
            }`}
            title={isOnline ? 'เชื่อมต่อออนไลน์' : 'ออฟไลน์ (ใช้งานได้ 100% จากแคช)'}
          >
            {isOnline ? <Wifi className="w-3 h-3 text-emerald-400" /> : <WifiOff className="w-3 h-3 text-amber-400" />}
            <span className="hidden lg:inline">{isOnline ? 'Online' : 'Offline Ready'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
