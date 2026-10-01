// src/components/layout/MobileNav.tsx
'use client';

import React from 'react';
import { Map, HelpCircle, Bookmark, BookMarked } from 'lucide-react';
import { useStudentStore } from '@/store/useStudentStore';

interface MobileNavProps {
  activeTab: 'roadmap' | 'problems' | 'saved';
  setActiveTab: (tab: 'roadmap' | 'problems' | 'saved') => void;
  onOpenFormulaSheet: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenFormulaSheet,
}) => {
  const { bookmarkedDerivationIds } = useStudentStore();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#000000]/95 backdrop-blur-md border-t border-slate-800/90 py-1.5 px-3">
      <div className="grid grid-cols-4 gap-1 max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-lg text-[10px] font-medium transition-colors ${
            activeTab === 'roadmap' ? 'text-sky-400 bg-sky-950/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Map className="w-4 h-4 mb-0.5" />
          <span>Roadmap</span>
        </button>

        <button
          onClick={() => setActiveTab('problems')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-lg text-[10px] font-medium transition-colors ${
            activeTab === 'problems' ? 'text-sky-400 bg-sky-950/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <HelpCircle className="w-4 h-4 mb-0.5" />
          <span>คลังโจทย์</span>
        </button>

        <button
          onClick={onOpenFormulaSheet}
          className="flex flex-col items-center justify-center py-1.5 rounded-lg text-[10px] font-medium text-slate-400 hover:text-white transition-colors"
        >
          <BookMarked className="w-4 h-4 mb-0.5 text-purple-400" />
          <span>คลังสูตร</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`relative flex flex-col items-center justify-center py-1.5 rounded-lg text-[10px] font-medium transition-colors ${
            activeTab === 'saved' ? 'text-sky-400 bg-sky-950/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Bookmark className="w-4 h-4 mb-0.5" />
          <span>ที่บันทึกไว้</span>
          {bookmarkedDerivationIds.length > 0 && (
            <span className="absolute top-1 right-3 w-3.5 h-3.5 rounded-full bg-purple-500 text-white text-[9px] flex items-center justify-center font-bold">
              {bookmarkedDerivationIds.length}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
