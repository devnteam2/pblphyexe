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
    <div className="rounded-lg border border-[var(--hairline-border)] bg-[var(--surface-muted)] p-5 md:p-6 my-4 font-serif">
      <div className="flex items-center gap-2 mb-3 text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink-secondary)]">
        <HelpCircle className="w-4 h-4 text-stone-500" />
        <span>คำถามวัดความเข้าใจเชิงมโนทัศน์ (Conceptual Verification)</span>
      </div>

      <div className="text-xs md:text-sm text-[var(--ink-primary)] mb-4 font-serif leading-relaxed">
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
          let stateStyle = 'border-stone-300 dark:border-stone-700 bg-[var(--surface-card)] text-[var(--ink-primary)] hover:border-stone-400 dark:hover:border-stone-600';

          if (submitted) {
            if (idx === selfCheck.correctOptionIndex) {
              stateStyle = 'border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold';
            } else if (idx === selectedIdx) {
              stateStyle = 'border-rose-600 dark:border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
            } else {
              stateStyle = 'border-stone-200 dark:border-stone-800 bg-[var(--surface-card)] text-stone-400 dark:text-stone-600 opacity-60';
            }
          } else if (selectedIdx === idx) {
            stateStyle = 'border-stone-800 dark:border-stone-300 bg-stone-100 dark:bg-stone-800 text-[var(--ink-primary)] font-semibold shadow-xs';
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={submitted}
              className={`w-full text-left p-3 rounded border text-xs md:text-sm transition-all flex items-start gap-3 ${stateStyle}`}
            >
              <span className="w-5 h-5 rounded-full border border-stone-400 dark:border-stone-600 flex items-center justify-center font-mono text-xs shrink-0 mt-0.5 font-bold">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1 font-serif">
                <FormattedMathText text={opt} />
              </span>
              {submitted && idx === selfCheck.correctOptionIndex && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              )}
              {submitted && idx === selectedIdx && idx !== selfCheck.correctOptionIndex && (
                <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
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
          className={`px-4 py-1.5 rounded text-xs font-serif font-medium transition-all ${
            selectedIdx !== null
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 shadow-xs'
              : 'bg-stone-200 dark:bg-stone-800 text-stone-400 cursor-not-allowed'
          }`}
        >
          ตรวจคำตอบ
        </button>
      ) : (
        <div className="space-y-3 pt-2">
          <div
            className={`p-3.5 rounded border text-xs md:text-sm leading-relaxed ${
              isCorrect
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 dark:border-rose-700 text-rose-900 dark:text-rose-200'
            }`}
          >
            <div className="flex items-center gap-2 font-bold mb-1">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>ถูกต้อง: คุณเข้าใจหลักการทางกายภาพอย่างแท้จริง</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  <span>ยังไม่ถูกต้อง: ลองพิจารณาคำอธิบายเพิ่มเติม</span>
                </>
              )}
            </div>
            <p className="font-serif">
              <FormattedMathText text={selfCheck.explanationTh} />
            </p>
          </div>

          {!isCorrect && (
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-serif text-[var(--ink-secondary)] bg-[var(--surface-card)] border border-[var(--hairline-border)] hover:text-[var(--ink-primary)]"
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
