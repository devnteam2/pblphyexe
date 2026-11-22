// src/components/lesson/LessonReaderView.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Lesson, Topic } from '@/types/curriculum';
import { AcademicMarkdown, FormattedMathText } from '@/components/math/LatexRenderer';
import { ConceptBridgeCard } from './ConceptBridgeCard';
import { getBridgeForLesson } from '@/data/lessonBridges';
import { DerivationAccordionEngine } from '@/components/derivation/DerivationAccordionEngine';
import { ScaffoldedProblemCard } from '@/components/problems/ScaffoldedProblemCard';
import { POSN_PROBLEMS } from '@/data/problemsData';
import { useStudentStore } from '@/store/useStudentStore';
import { CheckCircle2, ArrowLeft, ArrowRight, Disc } from 'lucide-react';

interface LessonReaderViewProps {
  lesson: Lesson;
  topic: Topic;
  onBackToRoadmap: () => void;
  onSelectLesson: (slug: string) => void;
  onOpenSimulation?: () => void;
}

export const LessonReaderView: React.FC<LessonReaderViewProps> = ({
  lesson,
  topic,
  onBackToRoadmap,
  onSelectLesson,
  onOpenSimulation,
}) => {
  const { completedLessonSlugs, toggleLessonCompletion } = useStudentStore();
  const isCompleted = completedLessonSlugs.includes(lesson.slug);
  const [scrollProgress, setScrollProgress] = useState(0);
  const bridge = getBridgeForLesson(lesson.slug, lesson.topicId);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setScrollProgress(pct);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, [lesson.slug]);

  const relatedProblems = POSN_PROBLEMS.filter((p) =>
    lesson.relatedProblemIds.includes(p.id)
  );

  const currentLessonIdx = topic.lessons.findIndex((l) => l.slug === lesson.slug);
  const prevLesson = currentLessonIdx > 0 ? topic.lessons[currentLessonIdx - 1] : null;
  const nextLesson =
    currentLessonIdx >= 0 && currentLessonIdx < topic.lessons.length - 1
      ? topic.lessons[currentLessonIdx + 1]
      : null;

  const handleNavigateLesson = (slug: string) => {
    onSelectLesson(slug);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <article className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-150 font-serif">
      {/* Sticky Reading Progress Bar */}
      <div className="sticky top-[60px] z-30 -mx-4 sm:-mx-6 h-1 bg-[var(--hairline-subtle)] overflow-hidden">
        <div
          className="h-full bg-stone-800 dark:bg-stone-200 transition-[width] duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Academic Breadcrumb */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--hairline-border)]">
        <button
          onClick={onBackToRoadmap}
          className="min-h-[42px] inline-flex items-center gap-1.5 text-xs text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>§ ย้อนกลับไปสารบัญ</span>
        </button>

        <button
          onClick={() => toggleLessonCompletion(lesson.slug)}
          className={`min-h-[42px] inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-serif border transition-all ${
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
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-wider">
            <span>{topic.titleTh.split('.')[0]}</span>
            <span>•</span>
            <span>EST. READ {lesson.readTimeMinutes} MIN</span>
          </div>

          {topic.lessons.length > 1 && (
            <div className="flex flex-wrap items-center gap-1">
              {topic.lessons.map((sub) => {
                const active = sub.slug === lesson.slug;
                return (
                  <button
                    key={sub.id}
                    onClick={() => handleNavigateLesson(sub.slug)}
                    title={sub.titleTh}
                    className={`px-2 py-0.5 rounded font-mono text-[11px] border transition-colors ${
                      active
                        ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100 font-bold'
                        : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)] hover:text-[var(--ink-primary)]'
                    }`}
                  >
                    § {sub.order}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--ink-primary)] tracking-tight leading-snug">
          <FormattedMathText text={lesson.titleTh} />
        </h1>

        <p className="text-sm md:text-base text-[var(--ink-secondary)] leading-relaxed italic border-l-2 border-stone-400 dark:border-stone-700 pl-3">
          <FormattedMathText text={lesson.summaryTh} />
        </p>

        {/* Quick Launch Banner for Rigid Body Simulation */}
        {lesson.topicId === 'rotation-dynamics' && onOpenSimulation && (
          <div className="p-3.5 rounded-lg border border-sky-300 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/40 flex items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-full bg-sky-600 text-white shadow-2xs">
                <Disc className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
              <div>
                <span className="font-bold text-sm text-sky-950 dark:text-sky-200 block">
                  ห้องทดลองแบบจำลองการหมุน (Interactive Rigid Body Simulation Lab)
                </span>
                <span className="text-xs text-sky-800 dark:text-sky-300">
                  ทดลองกลิ้งวัตถุรูปทรงต่างๆ บนพื้นเอียง สังเกตแรงเสียดทาน ทฤษฎีบทชาส์ล และการแข่งขันแบบ Real-Time
                </span>
              </div>
            </div>
            <button
              onClick={onOpenSimulation}
              className="px-3 py-1.5 rounded-md bg-sky-600 hover:bg-sky-700 text-white font-mono text-xs font-bold shrink-0 transition-all shadow-2xs"
            >
              เปิดแบบจำลอง →
            </button>
          </div>
        )}
      </header>

      {/* Concept Bridge Section: Basic -> POSN First Principles + Interactive Micro-Lab */}
      <ConceptBridgeCard key={lesson.slug} bridge={bridge} />

      {/* Theory Narrative Section (Typeset like a printed paper) */}
      <section className="rounded-lg border border-[var(--hairline-border)] bg-[var(--surface-card)] p-5 sm:p-6 md:p-8 shadow-2xs">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500 pb-2 mb-4 border-b border-[var(--hairline-border)]">
          § 1. Theoretical Foundations (หลักการทฤษฎีและสมการตั้งต้น)
        </div>
        <AcademicMarkdown content={lesson.theoryMarkdownTh} />
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
            <p className="text-xs text-[var(--ink-secondary)] mt-0.5">
              กดปุ่ม &quot;Physical Intuition&quot; หรือ &quot;Calculus Technique&quot; ในแต่ละขั้นตอนเพื่อดูเหตุผลเบื้องหลังสมการ
            </p>
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

      {/* Chapter Completion & Navigation Footer */}
      <footer className="pt-6 border-t border-[var(--hairline-border)] pb-8 space-y-4">
        <p className="text-xs text-[var(--ink-tertiary)] font-serif italic text-center">
          จบเนื้อหาย่อยนี้ • ปฏิบัติตามหลักการ First Principles ในการแก้โจทย์เสมอ
        </p>
        <div className="flex flex-wrap items-center justify-between gap-2">
          {prevLesson ? (
            <button
              onClick={() => handleNavigateLesson(prevLesson.slug)}
              className="min-h-[42px] px-3.5 py-2 rounded text-xs font-serif font-medium border border-[var(--hairline-border)] bg-[var(--surface-card)] text-[var(--ink-primary)] hover:border-stone-400 dark:hover:border-stone-600 inline-flex items-center gap-1.5 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>บทก่อนหน้า (§ {prevLesson.order})</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={onBackToRoadmap}
            className="min-h-[42px] px-4 py-2 rounded text-xs font-serif font-medium border border-[var(--hairline-border)] bg-[var(--surface-muted)] text-[var(--ink-primary)] hover:border-stone-400 dark:hover:border-stone-600 transition-all"
          >
            กลับสู่สารบัญ
          </button>

          {nextLesson ? (
            <button
              onClick={() => handleNavigateLesson(nextLesson.slug)}
              className="min-h-[42px] px-3.5 py-2 rounded text-xs font-serif font-medium bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 shadow-2xs inline-flex items-center gap-1.5 transition-all"
            >
              <span>บทถัดไป (§ {nextLesson.order})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div />
          )}
        </div>
      </footer>
    </article>
  );
};
