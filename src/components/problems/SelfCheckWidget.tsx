// src/components/problems/SelfCheckWidget.tsx
'use client';

import React, { useState } from 'react';
import { SelfCheckQuestion } from '@/types/problem';
import { FormattedMathText, LatexRenderer } from '@/components/math/LatexRenderer';
import { CheckCircle2, XCircle, HelpCircle, RefreshCw } from 'lucide-react';

interface SelfCheckWidgetProps {
  selfCheck: SelfCheckQuestion;
  problemId: string;
  isCompleted: boolean;
  savedOptionIndex?: number;
  onRecordAnswer: (selectedIndex: number, isCorrect: boolean) => void;
}

export const SelfCheckWidget: React.FC<SelfCheckWidgetProps> = ({
  selfCheck,
  isCompleted,
  savedOptionIndex,
  onRecordAnswer,
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(
    savedOptionIndex !== undefined ? savedOptionIndex : null
  );
  const [submitted, setSubmitted] = useState<boolean>(isCompleted);

  const handleSelect = (idx: number) => {
    if (submitted) return;
    setSelectedIdx(idx);
  };

  const handleSubmit = () => {
    if (selectedIdx === null) return;
    setSubmitted(true);
    const isCorrect = selectedIdx === selfCheck.correctOptionIndex;
    onRecordAnswer(selectedIdx, isCorrect);
  };

  const handleRetry = () => {
    setSubmitted(false);
    setSelectedIdx(null);
  };

  const isCorrect = selectedIdx === selfCheck.correctOptionIndex;

  return (
    <div className="rounded-xl border border-slate-800 bg-zinc-950/70 p-4 md:p-5 my-4">
      <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-slate-300">
        <HelpCircle className="w-4 h-4 text-emerald-400" />
        <span>คำถามวัดความเข้าใจเชิงมโนทัศน์ (Self-Check Concept Question)</span>
      </div>

      <div className="text-xs md:text-sm text-slate-200 mb-4 font-medium leading-relaxed">
        <FormattedMathText text={selfCheck.promptTh} />
      </div>

      {selfCheck.promptLatex && (
        <div className="mb-3">
          <LatexRenderer math={selfCheck.promptLatex} displayMode={true} />
        </div>
      )}

      {/* Options List */}
      <div className="space-y-2 mb-4">
        {selfCheck.optionsTh.map((opt, idx) => {
          let stateStyle = 'border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-300';

          if (submitted) {
            if (idx === selfCheck.correctOptionIndex) {
              stateStyle = 'border-emerald-500/60 bg-emerald-950/30 text-emerald-300 font-semibold';
            } else if (idx === selectedIdx) {
              stateStyle = 'border-rose-500/60 bg-rose-950/30 text-rose-300';
            } else {
              stateStyle = 'border-slate-800/40 bg-zinc-950/30 text-slate-500 opacity-60';
            }
          } else if (selectedIdx === idx) {
            stateStyle = 'border-sky-500 bg-sky-950/40 text-sky-200 shadow-sm';
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={submitted}
              className={`w-full text-left p-3 rounded-lg border text-xs md:text-sm transition-all flex items-start gap-3 ${stateStyle}`}
            >
              <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1">
                <FormattedMathText text={opt} />
              </span>
              {submitted && idx === selfCheck.correctOptionIndex && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              )}
              {submitted && idx === selectedIdx && idx !== selfCheck.correctOptionIndex && (
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Actions / Explanation */}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={selectedIdx === null}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            selectedIdx !== null
              ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400 font-bold'
              : 'bg-zinc-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          ตรวจคำตอบ
        </button>
      ) : (
        <div className="space-y-3 pt-2">
          <div
            className={`p-3 rounded-lg border text-xs md:text-sm ${
              isCorrect
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="flex items-center gap-2 font-bold mb-1">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>ยอดเยี่ยม! คุณเข้าใจหลักการทางกายภาพอย่างแท้จริง</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span>ยังไม่ถูกต้อง ลองสังเกตคำอธิบายเพิ่มเติมด้านล่าง</span>
                </>
              )}
            </div>
            <p className="leading-relaxed text-slate-300">
              <FormattedMathText text={selfCheck.explanationTh} />
            </p>
          </div>

          {!isCorrect && (
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 bg-zinc-900 border border-slate-800 hover:text-white"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              ลองใหม่อีกครั้ง
            </button>
          )}
        </div>
      )}
    </div>
  );
};
