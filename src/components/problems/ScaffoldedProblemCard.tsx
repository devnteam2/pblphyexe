// src/components/problems/ScaffoldedProblemCard.tsx
'use client';

import React, { useState } from 'react';
import { POSNProblem } from '@/types/problem';
import { FormattedMathText, LatexRenderer } from '@/components/math/LatexRenderer';
import { HintAccordion } from './HintAccordion';
import { SelfCheckWidget } from './SelfCheckWidget';
import { useStudentStore } from '@/store/useStudentStore';
import {
  CheckCircle,
  Eye,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ScaffoldedProblemCardProps {
  problem: POSNProblem;
}

export const ScaffoldedProblemCard: React.FC<ScaffoldedProblemCardProps> = ({ problem }) => {
  const {
    problemProgress,
    unlockHintTier,
    revealSolution,
    recordSelfCheck,
    toggleProblemMastery,
  } = useStudentStore();

  const progress = problemProgress[problem.id] || {
    unlockedHintTiers: [],
    isSolutionRevealed: false,
    isSelfCheckCompleted: false,
    isMarkedMastered: false,
  };

  const [confirmUnlock, setConfirmUnlock] = useState(false);
  const [solutionExpanded, setSolutionExpanded] = useState(progress.isSolutionRevealed);

  const handleUnlockSolution = () => {
    revealSolution(problem.id);
    setSolutionExpanded(true);
    setConfirmUnlock(false);
  };

  return (
    <div className="rounded-lg border border-[var(--hairline-border)] bg-[var(--surface-card)] p-5 md:p-7 my-6 shadow-2xs font-serif">
      {/* Header Chips */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[var(--hairline-border)]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300">
            {problem.code}
          </span>
          <span className="text-xs text-[var(--ink-secondary)] italic">
            {problem.sourceExam}
          </span>
        </div>

        {/* Mastered Status */}
        <button
          onClick={() => toggleProblemMastery(problem.id)}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-serif transition-all border ${
            progress.isMarkedMastered
              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border-emerald-400 dark:border-emerald-700 font-semibold'
              : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border-stone-300 dark:border-stone-800 hover:text-stone-900 dark:hover:text-stone-200'
          }`}
        >
          <CheckCircle className={`w-3.5 h-3.5 ${progress.isMarkedMastered ? 'fill-emerald-600 text-white' : ''}`} />
          <span>{progress.isMarkedMastered ? 'ทำสำเร็จแล้ว (Mastered)' : 'ทำเครื่องหมายว่าสำเร็จ'}</span>
        </button>
      </div>

      {/* Problem Title & Statement */}
      <div className="mb-5">
        <h3 className="text-base md:text-lg font-bold text-[var(--ink-primary)] mb-2 font-serif">
          <FormattedMathText text={problem.titleTh} />
        </h3>
        <div className="text-xs md:text-sm text-[var(--ink-primary)] leading-relaxed bg-stone-50/70 dark:bg-stone-950/60 p-4 rounded border border-stone-200 dark:border-stone-800/80">
          <FormattedMathText text={problem.statementTh} />
          {problem.statementLatex && (
            <div className="mt-3">
              <LatexRenderer
                math={problem.statementLatex}
                displayMode={true}
                className="bg-white dark:bg-stone-950 border-stone-300 dark:border-stone-800"
              />
            </div>
          )}
        </div>
      </div>

      {/* 3-Tier Scaffolded Hint System */}
      <HintAccordion
        hints={problem.hints}
        unlockedTiers={progress.unlockedHintTiers}
        onUnlockTier={(tier) => unlockHintTier(problem.id, tier)}
      />

      {/* Full Calculus Solution Reveal Section */}
      <div className="my-5 pt-3 border-t border-[var(--hairline-border)]">
        {!progress.isSolutionRevealed ? (
          <div>
            {!confirmUnlock ? (
              <button
                onClick={() => setConfirmUnlock(true)}
                className="w-full py-2.5 px-4 rounded border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/60 hover:bg-stone-100 dark:hover:bg-stone-800/60 text-[var(--ink-primary)] text-xs md:text-sm font-serif font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Eye className="w-4 h-4 text-stone-500" />
                <span>เปิดดูเฉลยละเอียดแบบแคลคูลัส (Full Calculus Walkthrough)</span>
              </button>
            ) : (
              <div className="p-4 rounded border border-amber-300 dark:border-amber-800/80 bg-amber-50/60 dark:bg-amber-950/30 text-xs md:text-sm animate-in fade-in">
                <div className="flex items-start gap-2.5 mb-3 text-amber-900 dark:text-amber-200">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">คำแนะนำก่อนดูเฉลย:</p>
                    <p className="text-amber-800/90 dark:text-amber-300 text-xs mt-0.5">
                      คุณได้ลองวาดแผนภาพวัตถุอิสระ (FBD) และตั้งสมการความสัมพันธ์จลนศาสตร์ด้วยตนเองแล้วหรือยัง?
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setConfirmUnlock(false)}
                    className="px-3 py-1 rounded text-xs text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800"
                  >
                    กลับไปคิดต่อ
                  </button>
                  <button
                    onClick={handleUnlockSolution}
                    className="px-3 py-1 rounded text-xs font-semibold text-white bg-amber-800 dark:bg-amber-600 hover:opacity-90"
                  >
                    ยืนยันเปิดดูเฉลย
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded border border-stone-300 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-900/30 overflow-hidden">
            <button
              onClick={() => setSolutionExpanded(!solutionExpanded)}
              className="w-full p-3.5 flex items-center justify-between text-left border-b border-stone-200 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-900/60 transition-colors"
            >
              <div className="flex items-center gap-2 text-[var(--ink-primary)] font-bold text-xs md:text-sm">
                <span>เฉลยละเอียดแบบอนุพันธ์และอินทิกรัล (Full Rigorous Solution)</span>
              </div>
              {solutionExpanded ? (
                <ChevronUp className="w-4 h-4 text-stone-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-stone-500" />
              )}
            </button>

            {solutionExpanded && (
              <div className="p-4 md:p-6 space-y-4 animate-in fade-in duration-150">
                {/* Overview & Coordinates */}
                <div className="p-3.5 rounded bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs space-y-1.5 text-[var(--ink-secondary)]">
                  <div className="font-bold text-[var(--ink-primary)]">
                    ภาพรวมแนวคิด & การตั้งพิกัด:
                  </div>
                  <p className="font-serif">
                    <FormattedMathText text={problem.fullSolution.approachOverviewTh} />
                  </p>
                  <p className="text-[11px] font-serif">
                    <span className="font-mono">↳ พิกัด: </span>
                    <FormattedMathText text={problem.fullSolution.coordinateSystemSetupTh} />
                  </p>
                </div>

                {/* Line by line solution steps */}
                <div className="space-y-4 pt-2">
                  {problem.fullSolution.steps.map((st) => (
                    <div key={st.stepNumber} className="border-l-2 border-stone-300 dark:border-stone-700 pl-4 py-1 space-y-1">
                      <div className="text-xs font-bold text-[var(--ink-primary)] font-serif">
                        ขั้นตอนที่ {st.stepNumber}: <FormattedMathText text={st.stepTitleTh} />
                      </div>
                      <LatexRenderer
                        math={st.latexMath}
                        displayMode={true}
                      />
                      <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                        <FormattedMathText text={st.explanationTh} />
                      </p>
                    </div>
                  ))}
                </div>

                {/* Final Answer */}
                <div className="p-4 rounded border border-[var(--hairline-border)] bg-[var(--surface-muted)] text-center">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1">
                    คำตอบสุดท้ายที่ถูกต้อง (Terminal Result)
                  </div>
                  <LatexRenderer
                    math={problem.fullSolution.finalAnswerLatex}
                    displayMode={true}
                  />
                </div>

                {/* Examination Remarks Caution Box */}
                {problem.fullSolution.examTrapWarningTh && (
                  <div className="p-3.5 rounded border border-amber-300 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/20 text-xs text-amber-900 dark:text-amber-200">
                    <span className="font-bold uppercase tracking-wider font-mono block mb-1">
                      ข้อสังเกตและจุดที่ควรระวังในห้องสอบ (Examination Remarks):
                    </span>
                    <FormattedMathText text={problem.fullSolution.examTrapWarningTh} />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Conceptual Self-Check Quiz */}
      <SelfCheckWidget
        selfCheck={problem.selfCheck}
        problemId={problem.id}
        isCompleted={progress.isSelfCheckCompleted}
        savedOptionIndex={progress.selectedOptionIndex}
        onRecordAnswer={(selectedIdx, isCorrect) =>
          recordSelfCheck(problem.id, selectedIdx, isCorrect)
        }
      />
    </div>
  );
};
