// src/components/derivation/DerivationAccordionEngine.tsx
'use client';

import React, { useState } from 'react';
import { DerivationBlock } from '@/types/curriculum';
import { DerivationStepItem } from './DerivationStepItem';
import { LatexRenderer, FormattedMathText } from '@/components/math/LatexRenderer';
import { useStudentStore } from '@/store/useStudentStore';
import { Bookmark, Check, Copy, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

interface DerivationAccordionEngineProps {
  derivation: DerivationBlock;
}

export const DerivationAccordionEngine: React.FC<DerivationAccordionEngineProps> = ({ derivation }) => {
  const { bookmarkedDerivationIds, toggleDerivationBookmark } = useStudentStore();
  const [copied, setCopied] = useState(false);

  const isBookmarked = bookmarkedDerivationIds.includes(derivation.id);

  const handleCopyLatex = async () => {
    try {
      await navigator.clipboard.writeText(derivation.finalResultLatex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-[#090D16] p-4 md:p-6 my-6 shadow-xl relative overflow-hidden">
      {/* Top Banner Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-purple-500 to-emerald-500" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-1.5">
            <BookOpen className="w-3 h-3" />
            First-Principles Derivation
          </div>
          <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
            <FormattedMathText text={derivation.titleTh} />
          </h3>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            <FormattedMathText text={derivation.objectiveTh} />
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => toggleDerivationBookmark(derivation.id)}
            className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all ${
              isBookmarked
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-zinc-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-zinc-800'
            }`}
            title="บุ๊กมาร์กการพิสูจน์นี้"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span className="hidden sm:inline">{isBookmarked ? 'บุ๊กมาร์กแล้ว' : 'บันทึกสูตร'}</span>
          </button>

          <button
            onClick={handleCopyLatex}
            className="p-2 rounded-lg border border-slate-800 bg-zinc-900 text-slate-400 hover:text-slate-200 hover:bg-zinc-800 transition-all text-xs font-medium flex items-center gap-1.5"
            title="คัดลอกโค้ด LaTeX"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? 'คัดลอกแล้ว!' : 'Copy LaTeX'}</span>
          </button>
        </div>
      </div>

      {/* Starting Physical Assumptions */}
      {derivation.startingAssumptions && derivation.startingAssumptions.length > 0 && (
        <div className="mb-6 p-3.5 rounded-lg bg-zinc-950/80 border border-slate-800/80">
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            สมมติฐานเริ่มต้นทางกายภาพ (Physical Assumptions)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {derivation.startingAssumptions.map((asm) => (
              <div key={asm.id} className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded border border-slate-800/60">
                <span className="font-semibold text-sky-400">{asm.descriptionTh}</span>
                <span className="text-slate-400 block mt-0.5">↳ {asm.significanceTh}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step by Step Progression */}
      <div className="space-y-1 mb-6">
        {derivation.steps.map((step) => (
          <DerivationStepItem
            key={step.stepNumber}
            step={step}
            totalSteps={derivation.steps.length}
          />
        ))}
      </div>

      {/* Final Result Card */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-sky-950/30 border border-emerald-500/30">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          สมการผลลัพธ์สำเร็จรูป (Final Result)
        </div>
        <div className="py-2">
          <LatexRenderer math={derivation.finalResultLatex} displayMode={true} className="border-emerald-500/20 bg-black/60 text-emerald-300" />
        </div>
        <p className="text-xs md:text-sm text-slate-300 mt-2 font-medium">
          💡 <span className="text-emerald-400 font-semibold">ข้อคิดสำหรับห้องสอบ:</span> {derivation.takeawayTh}
        </p>
      </div>
    </div>
  );
};
