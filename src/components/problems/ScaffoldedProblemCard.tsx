// src/components/problems/ScaffoldedProblemCard.tsx
'use client';

import React, { useState } from 'react';
import { POSNProblem } from '@/types/problem';
import { FormattedMathText, LatexRenderer } from '@/components/math/LatexRenderer';
import { HintAccordion } from './HintAccordion';
import { SelfCheckWidget } from './SelfCheckWidget';
import { useStudentStore } from '@/store/useStudentStore';
import {
  Award,
  CheckCircle,
  Eye,
  AlertOctagon,
  ChevronDown,
  ChevronUp,
  FileText,
  Compass,
  Zap,
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

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Camp1_Foundation':
        return { label: 'สอวน. ค่าย 1 (พื้นฐาน)', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
      case 'Camp1_Advanced':
        return { label: 'สอวน. ค่าย 1 (ประยุกต์ลึก)', color: 'bg-sky-500/10 text-sky-400 border-sky-500/30' };
      case 'Camp2_Core':
        return { label: 'สอวน. ค่าย 2 (เข้มข้น)', color: 'bg-purple-500/10 text-purple-400 border-purple-500/30' };
      default:
        return { label: 'สอวน. ฟิสิกส์', color: 'bg-slate-500/10 text-slate-400 border-slate-500/30' };
    }
  };

  const diffBadge = getDifficultyBadge(problem.difficulty);

  const handleUnlockSolution = () => {
    revealSolution(problem.id);
    setSolutionExpanded(true);
    setConfirmUnlock(false);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-[#090D16] p-4 md:p-6 my-6 shadow-xl relative">
      {/* Header Chips */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-zinc-900 text-sky-400 border border-slate-800">
            {problem.code}
          </span>
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${diffBadge.color}`}>
            {diffBadge.label}
          </span>
          <span className="text-[11px] text-slate-400">
            {problem.sourceExam}
          </span>
        </div>

        {/* Mastered Badge */}
        <button
          onClick={() => toggleProblemMastery(problem.id)}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
            progress.isMarkedMastered
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
              : 'bg-zinc-900 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <CheckCircle className={`w-3.5 h-3.5 ${progress.isMarkedMastered ? 'fill-emerald-400 text-black' : ''}`} />
          <span>{progress.isMarkedMastered ? 'เชี่ยวชาญแล้ว (Mastered)' : 'ทำสำเร็จแล้ว'}</span>
        </button>
      </div>

      {/* Problem Title & Statement */}
      <div className="mb-5">
        <h3 className="text-base md:text-lg font-bold text-white mb-2">
          <FormattedMathText text={problem.titleTh} />
        </h3>
        <div className="text-xs md:text-sm text-slate-300 leading-relaxed bg-zinc-950/60 p-4 rounded-lg border border-slate-800/80">
          <FormattedMathText text={problem.statementTh} />
          {problem.statementLatex && (
            <div className="mt-3">
              <LatexRenderer math={problem.statementLatex} displayMode={true} />
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
      <div className="my-5 pt-3 border-t border-slate-800/80">
        {!progress.isSolutionRevealed ? (
          <div>
            {!confirmUnlock ? (
              <button
                onClick={() => setConfirmUnlock(true)}
                className="w-full py-3 px-4 rounded-xl border border-purple-500/30 bg-purple-950/20 hover:bg-purple-950/30 text-purple-300 text-xs md:text-sm font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Eye className="w-4 h-4 text-purple-400" />
                <span>เปิดดูเฉลยละเอียดแบบแคลคูลัส (Full Calculus Walkthrough)</span>
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs md:text-sm animate-in fade-in">
                <div className="flex items-start gap-2.5 mb-3 text-amber-300">
                  <AlertOctagon className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">คำแนะนำจากอาจารย์ค่าย สอวน.:</p>
                    <p className="text-amber-200/90 text-xs mt-0.5">
                      การดูเฉลยทันทีจะลดโอกาสในการพัฒนาสมองส่วนคิดวิเคราะห์ คุณได้ลองใช้คำใบ้ Tier 1-3 และทดลองตั้งสมการด้วยตัวเองแล้วหรือยัง?
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setConfirmUnlock(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-zinc-900 border border-slate-800 hover:bg-zinc-800"
                  >
                    กลับไปคิดต่อ
                  </button>
                  <button
                    onClick={handleUnlockSolution}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300"
                  >
                    ยืนยันเปิดดูเฉลย
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-xl border border-purple-500/30 bg-purple-950/10 overflow-hidden">
            <button
              onClick={() => setSolutionExpanded(!solutionExpanded)}
              className="w-full p-4 flex items-center justify-between text-left border-b border-purple-900/30 bg-purple-950/20 hover:bg-purple-950/30 transition-colors"
            >
              <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                <FileText className="w-4 h-4 text-purple-400" />
                <span>เฉลยละเอียดแบบอนุพันธ์และอินทิกรัล (Full Solution Walkthrough)</span>
              </div>
              {solutionExpanded ? (
                <ChevronUp className="w-4 h-4 text-purple-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-purple-400" />
              )}
            </button>

            {solutionExpanded && (
              <div className="p-4 md:p-6 space-y-4 animate-in fade-in duration-200">
                {/* Overview & Coordinates */}
                <div className="p-3.5 rounded-lg bg-black/60 border border-slate-800 text-xs space-y-1.5 text-slate-300">
                  <div className="flex items-center gap-1.5 font-semibold text-sky-400">
                    <Compass className="w-3.5 h-3.5" />
                    ภาพรวมแนวคิด & การตั้งพิกัด:
                  </div>
                  <p>{problem.fullSolution.approachOverviewTh}</p>
                  <p className="text-slate-400">↳ พิกัด: {problem.fullSolution.coordinateSystemSetupTh}</p>
                </div>

                {/* Line by line solution steps */}
                <div className="space-y-4 pt-2">
                  {problem.fullSolution.steps.map((st) => (
                    <div key={st.stepNumber} className="border-l-2 border-purple-500/40 pl-4 py-1 space-y-1.5">
                      <div className="text-xs font-semibold text-purple-300">
                        ขั้นตอนที่ {st.stepNumber}: {st.stepTitleTh}
                      </div>
                      <LatexRenderer math={st.latexMath} displayMode={true} />
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <FormattedMathText text={st.explanationTh} />
                      </p>
                    </div>
                  ))}
                </div>

                {/* Final Answer */}
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-center">
                  <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1 flex items-center justify-center gap-1.5">
                    <Award className="w-4 h-4" />
                    คำตอบสุดท้ายที่ถูกต้อง
                  </div>
                  <LatexRenderer math={problem.fullSolution.finalAnswerLatex} displayMode={true} className="border-emerald-500/30 text-emerald-300 bg-black/80 font-bold" />
                </div>

                {/* Exam Trap Warning */}
                {problem.fullSolution.examTrapWarningTh && (
                  <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2">
                    <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-300">กับดักและเทคนิคห้องสอบ: </span>
                      <FormattedMathText text={problem.fullSolution.examTrapWarningTh} />
                    </div>
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
