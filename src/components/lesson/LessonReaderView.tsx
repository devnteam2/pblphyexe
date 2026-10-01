// src/components/lesson/LessonReaderView.tsx
'use client';

import React from 'react';
import { Lesson, Topic } from '@/types/curriculum';
import { FormattedMathText } from '@/components/math/LatexRenderer';
import { DerivationAccordionEngine } from '@/components/derivation/DerivationAccordionEngine';
import { ScaffoldedProblemCard } from '@/components/problems/ScaffoldedProblemCard';
import { POSN_PROBLEMS } from '@/data/problemsData';
import { useStudentStore } from '@/store/useStudentStore';
import { CheckCircle2, ArrowLeft } from 'lucide-react';

interface LessonReaderViewProps {
  lesson: Lesson;
  topic: Topic;
  onBackToRoadmap: () => void;
  onSelectLesson: (lessonId: string) => void;
}

export const LessonReaderView: React.FC<LessonReaderViewProps> = ({
  lesson,
  topic,
  onBackToRoadmap,
}) => {
  const { completedLessonSlugs, toggleLessonCompletion } = useStudentStore();
  const isCompleted = completedLessonSlugs.includes(lesson.slug);

  const relatedProblems = POSN_PROBLEMS.filter((p) =>
    lesson.relatedProblemIds.includes(p.id)
  );

  return (
    <article className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-150 font-serif">
      {/* Top Academic Breadcrumb */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--hairline-border)]">
        <button
          onClick={onBackToRoadmap}
          className="inline-flex items-center gap-1.5 text-xs text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>§ ย้อนกลับไปสารบัญ</span>
        </button>

        <button
          onClick={() => toggleLessonCompletion(lesson.slug)}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-serif border transition-all ${
            isCompleted
              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border-emerald-400 dark:border-emerald-700 font-semibold'
              : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)] hover:text-[var(--ink-primary)]'
          }`}
        >
          <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-600' : 'text-stone-400'}`} />
          <span>{isCompleted ? 'ศึกษาจบบทนี้แล้ว' : 'ทำเครื่องหมายว่าศึกษาจบ'}</span>
        </button>
      </div>

      {/* Formal Section Header */}
      <header className="space-y-3 pt-2">
        <div className="flex items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-wider">
          <span>{topic.titleTh.split('.')[0]}</span>
          <span>•</span>
          <span>EST. READ {lesson.readTimeMinutes} MIN</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--ink-primary)] tracking-tight leading-snug">
          <FormattedMathText text={lesson.titleTh} />
        </h1>

        <p className="text-sm md:text-base text-[var(--ink-secondary)] leading-relaxed italic border-l-2 border-stone-400 dark:border-stone-700 pl-3">
          <FormattedMathText text={lesson.summaryTh} />
        </p>
      </header>

      {/* Theory Narrative Section (Typeset like a printed paper) */}
      <section className="rounded-lg border border-[var(--hairline-border)] bg-[var(--surface-card)] p-6 md:p-8 leading-relaxed text-sm md:text-base text-[var(--ink-primary)] space-y-4 shadow-2xs">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500 pb-2 border-b border-[var(--hairline-border)]">
          § 1. Theoretical Foundations (หลักการทฤษฎีและสมการตั้งต้น)
        </div>
        <div className="whitespace-pre-line leading-relaxed text-[var(--ink-primary)]">
          <FormattedMathText text={lesson.theoryMarkdownTh.trim()} />
        </div>
      </section>

      {/* Interactive Derivations */}
      {lesson.derivations && lesson.derivations.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-[var(--hairline-border)]">
          <div>
            <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-wider">
              § 2. Step-by-Step Derivations
            </span>
            <h2 className="text-lg md:text-xl font-bold text-[var(--ink-primary)] mt-1">
              การพิสูจน์แคลคูลัสแบบ First Principles
            </h2>
          </div>

          <div className="space-y-6">
            {lesson.derivations.map((deriv) => (
              <DerivationAccordionEngine key={deriv.id} derivation={deriv} />
            ))}
          </div>
        </section>
      )}

      {/* Scaffolded POSN Problems Practice */}
      {relatedProblems.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-[var(--hairline-border)]">
          <div>
            <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-wider">
              § 3. Olympiad Problem Scaffolding
            </span>
            <h2 className="text-lg md:text-xl font-bold text-[var(--ink-primary)] mt-1">
              โจทย์ฝึกซ้อม สอวน. ฟิสิกส์ ประจำบท
            </h2>
            <p className="text-xs text-[var(--ink-secondary)] mt-0.5">
              ฝึกวิเคราะห์โมเดลทางกายภาพทีละขั้น โดยใช้บันไดความคิด 3 ระดับ
            </p>
          </div>

          <div className="space-y-6">
            {relatedProblems.map((problem) => (
              <ScaffoldedProblemCard key={problem.id} problem={problem} />
            ))}
          </div>
        </section>
      )}

      {/* Chapter Completion Rule */}
      <footer className="pt-6 border-t border-[var(--hairline-border)] text-center pb-8">
        <p className="text-xs text-[var(--ink-tertiary)] font-serif italic mb-3">
          จบเนื้อหาประจำบทนี้ • ปฏิบัติตามหลักการ First Principles ในการแก้โจทย์เสมอ
        </p>
        <button
          onClick={onBackToRoadmap}
          className="px-4 py-2 rounded text-xs font-serif font-medium bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 shadow-2xs transition-all"
        >
          กลับสู่สารบัญเพื่อศึกษาบทถัดไป
        </button>
      </footer>
    </article>
  );
};
