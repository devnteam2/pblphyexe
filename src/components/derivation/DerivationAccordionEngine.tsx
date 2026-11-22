// src/components/derivation/DerivationAccordionEngine.tsx
'use client';

import React, { useState } from 'react';
import { DerivationBlock } from '@/types/curriculum';
import { DerivationStepItem } from './DerivationStepItem';
import { LatexRenderer, FormattedMathText } from '@/components/math/LatexRenderer';
import { useStudentStore } from '@/store/useStudentStore';
import { Bookmark, Check, Copy, ArrowRight, Eye } from 'lucide-react';

interface DerivationAccordionEngineProps {
  derivation: DerivationBlock;
}

export const DerivationAccordionEngine: React.FC<DerivationAccordionEngineProps> = ({ derivation }) => {
  const { bookmarkedDerivationIds, toggleDerivationBookmark } = useStudentStore();
  const [copied, setCopied] = useState(false);
  const [guidedMode, setGuidedMode] = useState(true);
  const [revealedCount, setRevealedCount] = useState(1);

  const isBookmarked = bookmarkedDerivationIds.includes(derivation.id);
  const totalSteps = derivation.steps.length;
  const effectiveVisibleCount = guidedMode ? Math.min(revealedCount, totalSteps) : totalSteps;
  const visibleSteps = derivation.steps.slice(0, effectiveVisibleCount);
  const isAllRevealed = effectiveVisibleCount >= totalSteps;

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
    <div className="rounded-lg border border-[var(--hairline-border)] bg-[var(--surface-card)] p-5 md:p-7 my-6 shadow-xs relative">
      {/* Header Block: Theorem Format */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5 pb-4 border-b border-[var(--hairline-border)]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-900 px-2 py-0.5 rounded border border-stone-200 dark:border-stone-800">
              Theorem / Derivation
            </span>
            <span className="text-xs text-[var(--ink-tertiary)] font-serif italic">First-Principles Proof</span>
          </div>

          <h3 className="text-lg md:text-xl font-bold font-serif text-[var(--ink-primary)] tracking-tight">
            <FormattedMathText text={derivation.titleTh} />
          </h3>
          <p className="text-xs md:text-sm text-[var(--ink-secondary)] font-serif mt-1">
            <FormattedMathText text={derivation.objectiveTh} />
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => toggleDerivationBookmark(derivation.id)}
            className={`p-1.5 sm:px-2.5 sm:py-1 rounded border text-xs font-serif flex items-center gap-1.5 transition-all ${
              isBookmarked
                ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border-amber-400 dark:border-amber-600 font-medium'
                : 'bg-stone-50 dark:bg-stone-900 text-stone-700 dark:text-stone-400 border-stone-300 dark:border-stone-800 hover:text-stone-950 dark:hover:text-stone-200'
            }`}
            title="บุ๊กมาร์กการพิสูจน์นี้"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-600 text-amber-600' : ''}`} />
            <span className="hidden sm:inline">{isBookmarked ? 'บันทึกแล้ว' : 'บันทึกสูตร'}</span>
          </button>

          <button
            onClick={handleCopyLatex}
            className="p-1.5 sm:px-2.5 sm:py-1 rounded border border-stone-300 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-stone-700 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-200 transition-all text-xs font-serif flex items-center gap-1.5"
            title="คัดลอกโค้ด LaTeX"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'คัดลอกแล้ว' : 'Copy LaTeX'}</span>
          </button>
        </div>
      </div>

      {/* Starting Physical Assumptions (Academic Prerequisites) */}
      {derivation.startingAssumptions && derivation.startingAssumptions.length > 0 && (
        <div className="mb-6 p-4 rounded border border-[var(--hairline-border)] bg-[var(--surface-muted)]">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-2.5">
            Physical Assumptions (สมมติฐานเริ่มต้นทางกายภาพ)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs font-serif">
            {derivation.startingAssumptions.map((asm) => (
              <div
                key={asm.id}
                className="p-3 rounded bg-[var(--surface-card)] border border-[var(--hairline-border)] shadow-xs"
              >
                <div className="font-semibold text-[var(--ink-primary)] leading-snug">
                  <FormattedMathText text={asm.descriptionTh} />
                </div>
                <div className="text-[var(--ink-secondary)] text-[11px] mt-1 leading-snug">
                  ↳ <FormattedMathText text={asm.significanceTh} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Formal Proof Step-by-Step Heading + Guided Mode Switch */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs font-serif">
        <div className="italic text-stone-600 dark:text-stone-400 flex items-center gap-2">
          <span className="font-bold font-serif not-italic">Proof.</span>
          <span>การขยายความทางคณิตศาสตร์แบบทีละขั้นตอน ({effectiveVisibleCount}/{totalSteps}):</span>
        </div>

        <div className="inline-flex rounded border border-[var(--hairline-border)] overflow-hidden text-[11px] font-mono">
          <button
            type="button"
            onClick={() => {
              setGuidedMode(true);
              setRevealedCount(1);
            }}
            className={`px-2 py-1 transition-colors ${
              guidedMode
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
                : 'bg-[var(--surface-muted)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
            }`}
          >
            ทีละขั้น (Guided)
          </button>
          <button
            type="button"
            onClick={() => {
              setGuidedMode(false);
              setRevealedCount(totalSteps);
            }}
            className={`px-2 py-1 border-l border-[var(--hairline-border)] transition-colors ${
              !guidedMode
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
                : 'bg-[var(--surface-muted)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
            }`}
          >
            ทั้งหมด (All)
          </button>
        </div>
      </div>

      {/* Step by Step Progression */}
      <div className="space-y-1 mb-6">
        {visibleSteps.map((step) => (
          <DerivationStepItem
            key={step.stepNumber}
            step={step}
            totalSteps={effectiveVisibleCount}
          />
        ))}
      </div>

      {/* Guided Step Reveal Controls */}
      {guidedMode && !isAllRevealed && (
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setRevealedCount((c) => Math.min(totalSteps, c + 1))}
            className="flex-1 sm:flex-none min-h-[44px] px-4 py-2 rounded border border-stone-800 dark:border-stone-200 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-serif font-semibold hover:opacity-90 inline-flex items-center justify-center gap-1.5 shadow-2xs transition-all"
          >
            <span>เปิดขั้นตอนถัดไป (ขั้นที่ {effectiveVisibleCount + 1} / {totalSteps})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => {
              setGuidedMode(false);
              setRevealedCount(totalSteps);
            }}
            className="min-h-[44px] px-3 py-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-muted)] text-xs font-serif text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] inline-flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>ดูทั้งหมด</span>
          </button>
        </div>
      )}

      {/* Final Q.E.D. / Result Card */}
      {isAllRevealed && (
        <div className="p-4 md:p-5 rounded border border-[var(--hairline-border)] bg-[var(--surface-muted)] text-center font-serif animate-in fade-in duration-150">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1">
            <span>Terminal Result (ผลลัพธ์สุดท้าย)</span>
            <span className="font-serif italic font-bold">Q.E.D. ■</span>
          </div>
          <div className="py-1">
            <LatexRenderer
              math={derivation.finalResultLatex}
              displayMode={true}
            />
          </div>
          <p className="text-xs md:text-sm text-[var(--ink-secondary)] mt-2 font-serif text-left sm:text-center">
            <strong className="text-[var(--ink-primary)]">ข้อสังเกตเชิงลึก:</strong>{' '}
            <FormattedMathText text={derivation.takeawayTh} />
          </p>
        </div>
      )}
    </div>
  );
};
