// src/components/problems/HintAccordion.tsx
'use client';

import React from 'react';
import { ProblemHint } from '@/types/problem';
import { FormattedMathText, LatexRenderer } from '@/components/math/LatexRenderer';
import { Lock, Unlock } from 'lucide-react';

interface HintAccordionProps {
  hints: [ProblemHint, ProblemHint, ProblemHint];
  unlockedTiers: (1 | 2 | 3)[];
  onUnlockTier: (tier: 1 | 2 | 3) => void;
}

export const HintAccordion: React.FC<HintAccordionProps> = ({
  hints,
  unlockedTiers,
  onUnlockTier,
}) => {
  const getStageHeader = (tier: 1 | 2 | 3) => {
    switch (tier) {
      case 1:
        return 'Stage 1: Physical Model & Coordinate Reference (การสร้างแบบจำลองทางกายภาพ)';
      case 2:
        return 'Stage 2: Governing Differential Equations (กฎและสมการอนุพันธ์หลัก)';
      case 3:
        return 'Stage 3: Integration Technique & Calculus Tool (เทคนิคการอินทิเกรต)';
    }
  };

  return (
    <div className="space-y-3 my-5 font-serif">
      <div className="flex items-center justify-between text-xs text-[var(--ink-secondary)] pb-1 border-b border-[var(--hairline-border)]">
        <span className="font-bold uppercase tracking-wider text-[var(--ink-primary)]">
          Scaffolding Stages (บันไดความคิด 3 ระดับ)
        </span>
        <span className="font-mono text-[11px]">
          ปลดล็อก: {unlockedTiers.length}/3
        </span>
      </div>

      {hints.map((hint) => {
        const isUnlocked = unlockedTiers.includes(hint.tier);
        const canUnlock = hint.tier === 1 || unlockedTiers.includes((hint.tier - 1) as 1 | 2);

        return (
          <div
            key={hint.tier}
            className={`rounded border transition-all ${
              isUnlocked
                ? 'bg-[var(--surface-card)] border-stone-400 dark:border-stone-700 shadow-2xs'
                : 'bg-stone-50/50 dark:bg-stone-900/20 border-stone-200 dark:border-stone-800/80'
            }`}
          >
            {/* Header */}
            <div className="p-3.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-stone-500 w-5">
                  [0{hint.tier}]
                </span>
                <div>
                  <h4 className="text-xs md:text-sm font-bold text-[var(--ink-primary)]">
                    {getStageHeader(hint.tier)}
                  </h4>
                  <p className="text-[11px] text-[var(--ink-secondary)]">{hint.titleTh}</p>
                </div>
              </div>

              {isUnlocked ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 px-2 py-0.5 rounded">
                  <Unlock className="w-3 h-3" />
                  Unlocked
                </span>
              ) : (
                <button
                  onClick={() => onUnlockTier(hint.tier)}
                  disabled={!canUnlock}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-serif transition-all ${
                    canUnlock
                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 shadow-2xs'
                      : 'bg-stone-100 dark:bg-stone-900 text-stone-400 dark:text-stone-600 border border-stone-200 dark:border-stone-800 cursor-not-allowed'
                  }`}
                >
                  <Lock className="w-3 h-3" />
                  <span>{canUnlock ? 'เปิดคำใบ้นี้' : `ต้องปลดล็อก Stage ${hint.tier - 1} ก่อน`}</span>
                </button>
              )}
            </div>

            {/* Hint Content (If Unlocked) */}
            {isUnlocked && (
              <div className="px-4 pb-4 pt-2 border-t border-stone-200 dark:border-stone-800 text-xs md:text-sm text-[var(--ink-primary)] leading-relaxed animate-in fade-in duration-150">
                <p>
                  <FormattedMathText text={hint.contentTh} />
                </p>

                {hint.latexSnippets && hint.latexSnippets.length > 0 && (
                  <div className="mt-2.5 space-y-1.5">
                    {hint.latexSnippets.map((snippet, idx) => (
                      <LatexRenderer
                        key={idx}
                        math={snippet}
                        displayMode={true}
                        className="bg-stone-50/80 dark:bg-stone-950/80 border-stone-300 dark:border-stone-800 text-stone-900 dark:text-stone-100"
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
