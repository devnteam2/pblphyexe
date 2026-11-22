// src/components/review/QuickReviewDeck.tsx
'use client';

import React, { useMemo, useState } from 'react';
import { CURRICULUM_TOPICS } from '@/data/curriculumData';
import { getBridgeForLesson } from '@/data/lessonBridges';
import { useStudentStore } from '@/store/useStudentStore';
import { FormattedMathText, LatexRenderer } from '@/components/math/LatexRenderer';
import { RotateCw, CheckCircle2, ArrowRight, X, Brain } from 'lucide-react';

interface QuickReviewDeckProps {
  onClose: () => void;
}

export const QuickReviewDeck: React.FC<QuickReviewDeckProps> = ({ onClose }) => {
  const { completedLessonSlugs } = useStudentStore();
  const [scope, setScope] = useState<'all' | 'studied'>(
    completedLessonSlugs.length > 0 ? 'studied' : 'all'
  );
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredInSession, setMasteredInSession] = useState<string[]>([]);

  const cards = useMemo(() => {
    const allCards = CURRICULUM_TOPICS.flatMap((topic, idx) =>
      topic.lessons.map((lesson) => ({
        slug: lesson.slug,
        chapterLabel: `บทที่ ${idx + 1}`,
        lessonTitle: lesson.titleTh,
        bridge: getBridgeForLesson(lesson.slug, topic.id),
      }))
    );

    if (scope === 'studied') {
      const studied = allCards.filter((c) => completedLessonSlugs.includes(c.slug));
      return studied.length > 0 ? studied : allCards;
    }
    return allCards;
  }, [scope, completedLessonSlugs]);

  const safeIndex = cardIndex % cards.length;
  const activeCard = cards[safeIndex];

  const handleNext = (markKnown: boolean) => {
    if (markKnown && activeCard && !masteredInSession.includes(activeCard.slug)) {
      setMasteredInSession((prev) => [...prev, activeCard.slug]);
    }
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % cards.length);
  };

  if (!activeCard) return null;

  return (
    <section className="rounded-lg border border-stone-400 dark:border-stone-600 bg-[var(--surface-card)] p-4 sm:p-6 shadow-sm space-y-4 font-serif animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--hairline-border)]">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-muted)]">
            <Brain className="w-4 h-4 text-amber-700 dark:text-amber-400" />
          </div>
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--ink-tertiary)] block">
              ACTIVE RECALL FLASHCARDS ({safeIndex + 1}/{cards.length})
            </span>
            <h3 className="text-sm md:text-base font-bold text-[var(--ink-primary)]">
              โหมดทบทวนมโนทัศน์ด่วน (Quick Review Deck)
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded border border-[var(--hairline-border)] overflow-hidden text-xs">
            <button
              type="button"
              onClick={() => {
                setScope('all');
                setCardIndex(0);
                setIsFlipped(false);
              }}
              className={`px-2.5 py-1 transition-colors ${
                scope === 'all'
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold'
                  : 'bg-[var(--surface-muted)] text-[var(--ink-secondary)]'
              }`}
            >
              ทุกบท ({CURRICULUM_TOPICS.reduce((a, t) => a + t.lessons.length, 0)})
            </button>
            <button
              type="button"
              onClick={() => {
                setScope('studied');
                setCardIndex(0);
                setIsFlipped(false);
              }}
              disabled={completedLessonSlugs.length === 0}
              className={`px-2.5 py-1 transition-colors border-l border-[var(--hairline-border)] ${
                scope === 'studied'
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold'
                  : 'bg-[var(--surface-muted)] text-[var(--ink-secondary)] disabled:opacity-40'
              }`}
            >
              บทที่เรียนแล้ว ({completedLessonSlugs.length})
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close quick review deck"
            className="p-1.5 rounded border border-[var(--hairline-border)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Flashcard Surface */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="cursor-pointer rounded-lg border border-[var(--hairline-border)] bg-[var(--surface-muted)] p-5 sm:p-6 min-h-[210px] flex flex-col justify-between gap-4 hover:border-stone-400 dark:hover:border-stone-600 transition-colors"
      >
        <div className="flex items-center justify-between text-[11px] font-mono text-[var(--ink-tertiary)]">
          <span>{activeCard.chapterLabel} • {activeCard.bridge.levelTag}</span>
          <span className="inline-flex items-center gap-1">
            <RotateCw className="w-3 h-3" />
            แตะเพื่อ{isFlipped ? 'ดูคำถาม' : 'เปิดเฉลย'}
          </span>
        </div>

        {!isFlipped ? (
          <div className="space-y-3 text-center my-auto">
            <p className="text-sm sm:text-base font-bold text-[var(--ink-primary)] leading-relaxed">
              <FormattedMathText text={activeCard.bridge.quickRecall.questionTh} />
            </p>
            <div className="max-w-md mx-auto opacity-85">
              <LatexRenderer math={activeCard.bridge.basicFormulaLatex} displayMode={true} />
            </div>
          </div>
        ) : (
          <div className="space-y-3 my-auto">
            <div className="p-3 rounded border border-emerald-400/70 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 text-xs sm:text-sm text-emerald-950 dark:text-emerald-200 leading-relaxed">
              <strong className="block mb-1">คำตอบ:</strong>
              <FormattedMathText text={activeCard.bridge.quickRecall.answerTh} />
            </div>
            <div className="text-xs text-[var(--ink-secondary)] leading-relaxed">
              <strong className="text-[var(--ink-primary)]">ที่มา: </strong>
              <FormattedMathText text={activeCard.bridge.howItEvolvesTh} />
            </div>
            <LatexRenderer math={activeCard.bridge.advancedFormulaLatex} displayMode={true} />
          </div>
        )}
      </div>

      {/* Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-mono text-[var(--ink-secondary)]">
          จำได้ในรอบนี้แล้ว: <strong className="text-emerald-700 dark:text-emerald-400">{masteredInSession.length}</strong> การ์ด
        </span>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => handleNext(false)}
            className="flex-1 sm:flex-none min-h-[42px] px-3.5 py-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-xs font-medium text-[var(--ink-primary)] hover:border-stone-400 inline-flex items-center justify-center gap-1.5"
          >
            <span>ข้าม / ทวนอีกที</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleNext(true)}
            className="flex-1 sm:flex-none min-h-[42px] px-4 py-2 rounded bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-semibold hover:opacity-90 inline-flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>เข้าใจแล้ว ถัดไป</span>
          </button>
        </div>
      </div>
    </section>
  );
};
