// src/components/lesson/ConceptBridgeCard.tsx
'use client';

import React, { useState } from 'react';
import { ConceptBridge, InteractiveLabId } from '@/data/lessonBridges';
import { PHYSICS_LAB_CATALOG } from '@/data/labCatalog';
import { FormattedMathText, LatexRenderer } from '@/components/math/LatexRenderer';
import { ConceptBridgeLab } from '@/components/interactive/ConceptBridgeLab';
import { Compass, ArrowRight, Eye, EyeOff, Sparkles } from 'lucide-react';

interface ConceptBridgeCardProps {
  bridge: ConceptBridge;
}

type BridgeTab = 'why' | 'how' | 'analogy';

export const ConceptBridgeCard: React.FC<ConceptBridgeCardProps> = ({ bridge }) => {
  const [activeTab, setActiveTab] = useState<BridgeTab>('why');
  const [showLab, setShowLab] = useState<boolean>(true);
  const [showRecallAnswer, setShowRecallAnswer] = useState<boolean>(false);

  const labIds: InteractiveLabId[] = bridge.interactiveLabId
    ? Array.from(new Set([bridge.interactiveLabId, ...(bridge.extraLabIds ?? [])]))
    : [];
  const [selectedLabId, setSelectedLabId] = useState<InteractiveLabId | undefined>(labIds[0]);
  const activeLabId =
    selectedLabId && labIds.includes(selectedLabId) ? selectedLabId : labIds[0];

  return (
    <section className="rounded-lg border border-[var(--hairline-border)] bg-[var(--surface-card)] p-4 sm:p-6 shadow-2xs space-y-4 font-serif">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--hairline-border)]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded border border-[var(--hairline-border)] bg-[var(--surface-muted)] text-[var(--ink-primary)]">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--ink-tertiary)] block">
              § 0. CONCEPT BRIDGE (ปูพื้นฐานก่อนลุย)
            </span>
            <h2 className="text-sm md:text-base font-bold text-[var(--ink-primary)]">
              <FormattedMathText text={bridge.levelTag} />
            </h2>
          </div>
        </div>

        {bridge.interactiveLabId && (
          <button
            type="button"
            onClick={() => setShowLab(!showLab)}
            className="px-2.5 py-1.5 rounded border border-[var(--hairline-border)] bg-[var(--surface-muted)] text-xs text-[var(--ink-primary)] hover:border-stone-400 dark:hover:border-stone-600 inline-flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>{showLab ? 'ซ่อนแล็บโต้ตอบ' : 'เปิดแล็บทดลอง'}</span>
          </button>
        )}
      </div>

      {/* Side-by-side Basic -> Calculus Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-stretch gap-3">
        <div className="p-3.5 rounded border border-[var(--hairline-border)] bg-[var(--surface-muted)] flex flex-col justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--ink-tertiary)] block mb-1">
            สิ่งที่รู้ตอน ม.ปลาย (Basic)
          </span>
          <p className="text-xs font-semibold text-[var(--ink-secondary)] mb-1">
            <FormattedMathText text={bridge.basicLabelTh} />
          </p>
          <LatexRenderer math={bridge.basicFormulaLatex} displayMode={true} />
        </div>

        <div className="flex items-center justify-center text-[var(--ink-tertiary)] py-1 md:py-0">
          <ArrowRight className="w-5 h-5 rotate-90 md:rotate-0" />
        </div>

        <div className="p-3.5 rounded border border-stone-400 dark:border-stone-600 bg-[var(--surface-muted)] flex flex-col justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 font-bold block mb-1">
            ระดับ First-Principles สอวน. (Advanced)
          </span>
          <p className="text-xs font-semibold text-[var(--ink-primary)] mb-1">
            <FormattedMathText text={bridge.advancedLabelTh} />
          </p>
          <LatexRenderer math={bridge.advancedFormulaLatex} displayMode={true} />
        </div>
      </div>

      {/* Bite-sized Tabbed Explanation (Why / How / Analogy) */}
      <div className="rounded border border-[var(--hairline-border)] overflow-hidden">
        <div className="grid grid-cols-3 border-b border-[var(--hairline-border)] bg-[var(--surface-muted)] text-xs">
          {[
            { id: 'why' as const, label: 'ทำไมสูตรเดิมไม่พอ?' },
            { id: 'how' as const, label: 'ที่มาของสูตรใหม่' },
            { id: 'analogy' as const, label: 'ภาพจำเข้าใจง่าย' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`min-h-[42px] px-2 py-2 font-medium transition-colors border-r last:border-r-0 border-[var(--hairline-border)] ${
                activeTab === tab.id
                  ? 'bg-[var(--surface-card)] text-[var(--ink-primary)] font-bold shadow-2xs'
                  : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4 text-xs md:text-sm text-[var(--ink-primary)] leading-relaxed bg-[var(--surface-card)]">
          {activeTab === 'why' && <FormattedMathText text={bridge.whyItBreaksTh} />}
          {activeTab === 'how' && <FormattedMathText text={bridge.howItEvolvesTh} />}
          {activeTab === 'analogy' && <FormattedMathText text={bridge.everydayAnalogyTh} />}
        </div>
      </div>

      {/* Interactive Touch-Friendly Visual Micro-Lab */}
      {activeLabId && showLab && (
        <div className="p-4 rounded border border-[var(--hairline-border)] bg-[var(--surface-muted)] space-y-3">
          {labIds.length > 1 && (
            <div className="flex flex-wrap items-center gap-1.5 pb-2.5 border-b border-[var(--hairline-border)]">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink-tertiary)] mr-1">
                เลือกแล็บในบท ({labIds.length}):
              </span>
              {labIds.map((id) => {
                const catalogEntry = PHYSICS_LAB_CATALOG.find((item) => item.id === id);
                const shortLabel = catalogEntry
                  ? catalogEntry.titleTh.replace(/^แล็บ/, '').split('(')[0].trim()
                  : id;
                const isSelected = id === activeLabId;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelectedLabId(id)}
                    className={`min-h-[32px] px-2.5 py-1 rounded text-[11px] font-mono border transition-colors ${
                      isSelected
                        ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100 font-bold'
                        : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)] hover:text-[var(--ink-primary)]'
                    }`}
                  >
                    {shortLabel}
                  </button>
                );
              })}
            </div>
          )}
          <ConceptBridgeLab key={activeLabId} labId={activeLabId} />
        </div>
      )}

      {/* 1-Tap Quick Active Recall Check */}
      <div className="p-3.5 rounded border border-stone-300 dark:border-stone-700 bg-[var(--surface-muted)] space-y-2.5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink-tertiary)] block">
              Active Recall Check (เช็กความเข้าใจก่อนเข้าเนื้อหา)
            </span>
            <p className="text-xs md:text-sm font-semibold text-[var(--ink-primary)] leading-relaxed">
              <FormattedMathText text={bridge.quickRecall.questionTh} />
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowRecallAnswer(!showRecallAnswer)}
            className="min-h-[40px] shrink-0 px-3 py-1.5 rounded border border-stone-400 dark:border-stone-600 bg-[var(--surface-card)] text-xs font-medium text-[var(--ink-primary)] hover:opacity-90 inline-flex items-center gap-1.5"
          >
            {showRecallAnswer ? (
              <>
                <EyeOff className="w-3.5 h-3.5" />
                <span>ซ่อนเฉลย</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>ตรวจคำตอบ</span>
              </>
            )}
          </button>
        </div>

        {showRecallAnswer && (
          <div className="p-3 rounded border border-emerald-400/70 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 text-xs md:text-sm text-emerald-950 dark:text-emerald-200 leading-relaxed animate-in fade-in duration-150">
            <FormattedMathText text={bridge.quickRecall.answerTh} />
          </div>
        )}
      </div>
    </section>
  );
};
