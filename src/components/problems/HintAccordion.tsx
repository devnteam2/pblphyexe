// src/components/problems/HintAccordion.tsx
'use client';

import React from 'react';
import { ProblemHint } from '@/types/problem';
import { FormattedMathText, LatexRenderer } from '@/components/math/LatexRenderer';
import { Lock, Unlock, HelpCircle, Compass, Cpu, Wand2 } from 'lucide-react';

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
  const getTierIcon = (tier: 1 | 2 | 3) => {
    switch (tier) {
      case 1:
        return <Compass className="w-4 h-4 text-sky-400" />;
      case 2:
        return <Cpu className="w-4 h-4 text-amber-400" />;
      case 3:
        return <Wand2 className="w-4 h-4 text-purple-400" />;
    }
  };

  const getTierBadge = (tier: 1 | 2 | 3) => {
    switch (tier) {
      case 1:
        return { label: 'Tier 1: โมเดลทางกายภาพ (Physical Model & FBD)', color: 'border-sky-500/30 bg-sky-950/20 text-sky-300' };
      case 2:
        return { label: 'Tier 2: กฎและสมการหลัก (Governing Equations)', color: 'border-amber-500/30 bg-amber-950/20 text-amber-300' };
      case 3:
        return { label: 'Tier 3: เทคนิคคณิตศาสตร์ (Mathematical Trick)', color: 'border-purple-500/30 bg-purple-950/20 text-purple-300' };
    }
  };

  return (
    <div className="space-y-3 my-4">
      <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
        <span className="flex items-center gap-1.5 font-semibold text-slate-300">
          <HelpCircle className="w-4 h-4 text-sky-400" />
          ระบบคำใบ้ 3 ระดับ (Scaffolded Hints)
        </span>
        <span>
          ปลดล็อกแล้ว: <span className="font-bold text-sky-400">{unlockedTiers.length}/3</span>
        </span>
      </div>

      {hints.map((hint) => {
        const isUnlocked = unlockedTiers.includes(hint.tier);
        const canUnlock = hint.tier === 1 || unlockedTiers.includes((hint.tier - 1) as 1 | 2);
        const badge = getTierBadge(hint.tier);

        return (
          <div
            key={hint.tier}
            className={`rounded-xl border transition-all ${
              isUnlocked
                ? 'bg-zinc-950/90 border-slate-700/80 shadow-md'
                : 'bg-zinc-950/40 border-slate-800/60'
            }`}
          >
            {/* Header */}
            <div className="p-3.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className={`p-1.5 rounded-lg border ${badge.color}`}>
                  {getTierIcon(hint.tier)}
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-semibold text-slate-200">
                    {badge.label}
                  </h4>
                  <p className="text-xs text-slate-400">{hint.titleTh}</p>
                </div>
              </div>

              {isUnlocked ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-950/30 border border-emerald-500/30 px-2 py-0.5 rounded">
                  <Unlock className="w-3 h-3" />
                  ปลดล็อกแล้ว
                </span>
              ) : (
                <button
                  onClick={() => onUnlockTier(hint.tier)}
                  disabled={!canUnlock}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    canUnlock
                      ? 'bg-sky-500/10 text-sky-300 border border-sky-500/40 hover:bg-sky-500/20 active:scale-95'
                      : 'bg-zinc-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                  }`}
                >
                  <Lock className="w-3 h-3" />
                  <span>{canUnlock ? 'ดูคำใบ้นี้' : `ต้องปลดล็อก Tier ${hint.tier - 1} ก่อน`}</span>
                </button>
              )}
            </div>

            {/* Hint Content (If Unlocked) */}
            {isUnlocked && (
              <div className="px-4 pb-4 pt-1 border-t border-slate-800/80 text-xs md:text-sm text-slate-300 animate-in fade-in duration-200">
                <p className="leading-relaxed">
                  <FormattedMathText text={hint.contentTh} />
                </p>

                {hint.latexSnippets && hint.latexSnippets.length > 0 && (
                  <div className="mt-2.5 space-y-1.5">
                    {hint.latexSnippets.map((snippet, idx) => (
                      <LatexRenderer key={idx} math={snippet} displayMode={true} className="text-sky-300 bg-black/60" />
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
