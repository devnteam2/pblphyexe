// src/components/layout/MobileNav.tsx
'use client';

import React from 'react';
import { Map, HelpCircle, Bookmark, BookMarked, Disc } from 'lucide-react';
import { useStudentStore } from '@/store/useStudentStore';

interface MobileNavProps {
  activeTab: 'roadmap' | 'problems' | 'saved' | 'simulation';
  setActiveTab: (tab: 'roadmap' | 'problems' | 'saved' | 'simulation') => void;
  onOpenFormulaSheet: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenFormulaSheet,
}) => {
  const { bookmarkedDerivationIds } = useStudentStore();

  const itemClass = (isActive: boolean) =>
    `flex flex-col items-center justify-center py-1.5 rounded text-[10px] font-serif font-medium transition-colors ${
      isActive
        ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-2xs font-semibold'
        : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
    }`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-monograph)]/95 backdrop-blur-md border-t border-[var(--hairline-border)] pt-1.5 pb-[max(0.45rem,env(safe-area-inset-bottom))] px-2 transition-colors">
      <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('roadmap')}
          className={itemClass(activeTab === 'roadmap')}
        >
          <Map className="w-4 h-4 mb-0.5" />
          <span>สารบัญ</span>
        </button>

        <button
          onClick={() => setActiveTab('simulation')}
          className={itemClass(activeTab === 'simulation')}
        >
          <Disc
            className={`w-4 h-4 mb-0.5 ${activeTab === 'simulation' ? '' : 'text-sky-700 dark:text-sky-400'}`}
          />
          <span>จำลองหมุน</span>
        </button>

        <button
          onClick={() => setActiveTab('problems')}
          className={itemClass(activeTab === 'problems')}
        >
          <HelpCircle className="w-4 h-4 mb-0.5" />
          <span>คลังโจทย์</span>
        </button>

        <button
          onClick={onOpenFormulaSheet}
          className={itemClass(false)}
        >
          <BookMarked className="w-4 h-4 mb-0.5" />
          <span>ดัชนีสูตร</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`relative ${itemClass(activeTab === 'saved')}`}
        >
          <Bookmark className="w-4 h-4 mb-0.5" />
          <span>ที่บันทึกไว้</span>
          {bookmarkedDerivationIds.length > 0 && (
            <span className="absolute top-1 right-2 w-3.5 h-3.5 rounded-full bg-amber-700 text-white text-[9px] flex items-center justify-center font-mono font-bold">
              {bookmarkedDerivationIds.length}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
