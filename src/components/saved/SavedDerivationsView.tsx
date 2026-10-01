// src/components/saved/SavedDerivationsView.tsx
'use client';

import React from 'react';
import { useStudentStore } from '@/store/useStudentStore';
import { CURRICULUM_TOPICS } from '@/data/curriculumData';
import { DerivationAccordionEngine } from '@/components/derivation/DerivationAccordionEngine';
import { Bookmark, BookOpen } from 'lucide-react';

interface SavedDerivationsViewProps {
  onGoToRoadmap: () => void;
}

export const SavedDerivationsView: React.FC<SavedDerivationsViewProps> = ({ onGoToRoadmap }) => {
  const { bookmarkedDerivationIds } = useStudentStore();

  // Find all bookmarked derivation blocks across all lessons
  const bookmarkedBlocks = CURRICULUM_TOPICS.flatMap((t) =>
    t.lessons.flatMap((l) => l.derivations)
  ).filter((d) => bookmarkedDerivationIds.includes(d.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span>สูตรและการพิสูจน์ที่บันทึกไว้ (Saved Derivations)</span>
          </h2>
          <p className="text-xs text-slate-400">
            ทบทวนขั้นตอน First-Principles ที่คุณบันทึกไว้สำหรับเตรียมสอบ
          </p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-zinc-900 border border-slate-800 text-slate-300 font-semibold">
          {bookmarkedBlocks.length} รายการ
        </span>
      </div>

      {bookmarkedBlocks.length > 0 ? (
        <div className="space-y-4">
          {bookmarkedBlocks.map((block) => (
            <DerivationAccordionEngine key={block.id} derivation={block} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-slate-800 bg-zinc-950/40">
          <div className="w-12 h-12 rounded-full bg-zinc-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto mb-3">
            <Bookmark className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-300 mb-1">
            ยังไม่มีสูตรที่บันทึกไว้
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            กดปุ่ม &quot;บันทึกสูตร&quot; ที่มุมขวาบนของแต่ละขั้นตอนการพิสูจน์ เพื่อเก็บไว้ทบทวนก่อนเข้าห้องสอบ สอวน.
          </p>
          <button
            onClick={onGoToRoadmap}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-sky-500 text-black hover:bg-sky-400 transition-colors inline-flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" />
            ไปที่แผนผังบทเรียน
          </button>
        </div>
      )}
    </div>
  );
};
