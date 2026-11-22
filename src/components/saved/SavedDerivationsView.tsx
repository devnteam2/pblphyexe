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
    <div className="space-y-6 font-serif">
      <div className="flex items-center justify-between pb-4 border-b border-[var(--hairline-border)]">
        <div>
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[var(--ink-tertiary)] block">
            § BOOKMARKED PROOFS
          </span>
          <h2 className="text-lg md:text-xl font-bold text-[var(--ink-primary)] flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-600 dark:text-amber-400 fill-amber-600 dark:fill-amber-400" />
            <span>สูตรและการพิสูจน์ที่บันทึกไว้ (Saved Derivations)</span>
          </h2>
          <p className="text-xs md:text-sm text-[var(--ink-secondary)]">
            ทบทวนขั้นตอน First-Principles ที่คุณบันทึกไว้สำหรับเตรียมสอบ สอวน.
          </p>
        </div>
        <span className="text-xs px-3 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-[var(--ink-primary)] font-mono font-semibold">
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
        <div className="text-center py-16 px-4 rounded-lg border border-dashed border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <div className="w-12 h-12 rounded-full bg-[var(--surface-muted)] border border-[var(--hairline-border)] flex items-center justify-center text-[var(--ink-tertiary)] mx-auto mb-3">
            <Bookmark className="w-5 h-5" />
          </div>
          <h3 className="text-sm md:text-base font-bold text-[var(--ink-primary)] mb-1">
            ยังไม่มีสูตรที่บันทึกไว้
          </h3>
          <p className="text-xs md:text-sm text-[var(--ink-secondary)] max-w-sm mx-auto mb-5 leading-relaxed">
            กดปุ่ม &quot;บันทึกสูตร&quot; ที่มุมขวาบนของแต่ละขั้นตอนการพิสูจน์ เพื่อเก็บไว้ทบทวนก่อนเข้าห้องสอบ สอวน.
          </p>
          <button
            onClick={onGoToRoadmap}
            className="px-4 py-2 rounded text-xs font-serif font-semibold bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 transition-opacity inline-flex items-center gap-1.5 shadow-2xs"
          >
            <BookOpen className="w-4 h-4" />
            ไปที่สารบัญบทเรียน
          </button>
        </div>
      )}
    </div>
  );
};
