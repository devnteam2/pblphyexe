// src/components/layout/Navbar.tsx
'use client';

import React, { useSyncExternalStore } from 'react';
import { useStudentStore } from '@/store/useStudentStore';
import {
  Wifi,
  WifiOff,
  Sun,
  Moon,
  BookMarked,
} from 'lucide-react';

interface NavbarProps {
  onOpenFormulaSheet: () => void;
  activeTab: 'roadmap' | 'problems' | 'saved' | 'simulation';
  setActiveTab: (tab: 'roadmap' | 'problems' | 'saved' | 'simulation') => void;
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
  return typeof navigator !== 'undefined' ? navigator.onLine : true;
}

function getServerOnlineSnapshot() {
  return true;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenFormulaSheet,
  activeTab,
  setActiveTab,
}) => {
  const {
    bookmarkedDerivationIds,
    themePreference,
    setThemePreference,
    fontSizeScale,
    setFontSizeScale,
  } = useStudentStore();
  const isOnline = useSyncExternalStore(
    subscribeOnline,
    getOnlineSnapshot,
    getServerOnlineSnapshot
  );

  const toggleTheme = () => {
    const next = themePreference === 'archival_paper' ? 'slate_blackboard' : 'archival_paper';
    setThemePreference(next);
  };

  const toggleFontSize = () => {
    setFontSizeScale(fontSizeScale === 'normal' ? 'large' : 'normal');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--hairline-border)] bg-[var(--bg-monograph)]/95 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between gap-4">
        {/* Academic Brand */}
        <div
          onClick={() => setActiveTab('roadmap')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] flex items-center justify-center font-serif text-sm font-bold text-[var(--ink-primary)] shadow-2xs">
            §
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-base md:text-lg text-[var(--ink-primary)] tracking-tight">
                OpenPOSN
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400">
                Monograph
              </span>
            </div>
            <p className="text-[10px] text-[var(--ink-tertiary)] font-serif hidden sm:block">
              สอวน. ฟิสิกส์ เพื่อทุกคน • First-Principles Physics Monograph
            </p>
          </div>
        </div>

        {/* Academic Section Tabs */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-md border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-3 py-1 rounded text-xs font-serif font-medium transition-all ${
              activeTab === 'roadmap'
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-2xs'
                : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
            }`}
          >
            § สารบัญเนื้อหา (Syllabus)
          </button>
          <button
            onClick={() => setActiveTab('simulation')}
            className={`px-3 py-1 rounded text-xs font-serif font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'simulation'
                ? 'bg-sky-900 text-white dark:bg-sky-100 dark:text-sky-950 shadow-2xs font-bold'
                : 'text-sky-700 dark:text-sky-400 hover:text-sky-900 dark:hover:text-sky-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            <span>ห้องทดลองการหมุน (Simulation Lab)</span>
          </button>
          <button
            onClick={() => setActiveTab('problems')}
            className={`px-3 py-1 rounded text-xs font-serif font-medium transition-all ${
              activeTab === 'problems'
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-2xs'
                : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
            }`}
          >
            คลังข้อสอบ สอวน. (Exam Bank)
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-3 py-1 rounded text-xs font-serif font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'saved'
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-2xs'
                : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
            }`}
          >
            <span>บทพิสูจน์ที่บันทึก</span>
            {bookmarkedDerivationIds.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-700 text-white text-[9px] flex items-center justify-center font-bold">
                {bookmarkedDerivationIds.length}
              </span>
            )}
          </button>
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Formula Index Modal Trigger */}
          <button
            onClick={onOpenFormulaSheet}
            className="p-1.5 sm:px-2.5 sm:py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-xs font-serif text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] flex items-center gap-1.5 transition-colors"
            title="ดัชนีสูตรและทฤษฎีบท"
          >
            <BookMarked className="w-3.5 h-3.5 text-stone-500" />
            <span className="hidden sm:inline">ดัชนีสูตร (Formulae)</span>
          </button>

          {/* Font Size Comfort Toggle (A / A+) for Phone & Late-night Reading */}
          <button
            onClick={toggleFontSize}
            className={`px-2 py-1 rounded border text-xs font-serif font-bold transition-colors ${
              fontSizeScale === 'large'
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100'
                : 'border-[var(--hairline-border)] bg-[var(--surface-card)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
            }`}
            title={fontSizeScale === 'large' ? 'กลับขนาดตัวอักษรปกติ' : 'ขยายขนาดตัวอักษรให้อ่านสบายตาบนมือถือ'}
            aria-label="Toggle reading font size"
          >
            {fontSizeScale === 'large' ? 'A+' : 'A'}
          </button>

          {/* Theme Switcher: Archival Paper vs Slate Blackboard */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] transition-colors"
            title={themePreference === 'archival_paper' ? 'เปลี่ยนเป็น Slate Blackboard Mode' : 'เปลี่ยนเป็น Archival Paper Mode'}
            aria-label="Toggle Theme"
          >
            {themePreference === 'archival_paper' ? (
              <Moon className="w-4 h-4 text-stone-600" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Offline Indicator */}
          <div
            className={`px-2 py-0.5 rounded text-[11px] font-mono border flex items-center gap-1 ${
              isOnline
                ? 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                : 'border-amber-500 text-amber-700 dark:text-amber-400'
            }`}
            title={isOnline ? 'เชื่อมต่อออนไลน์' : 'ทำงานแบบออฟไลน์ 100%'}
          >
            {isOnline ? <Wifi className="w-3 h-3 text-stone-500" /> : <WifiOff className="w-3 h-3 text-amber-600" />}
            <span className="hidden lg:inline">{isOnline ? 'Online' : 'Offline PWA'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
