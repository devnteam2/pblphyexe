// src/components/lesson/LessonReaderView.tsx
'use client';

import React from 'react';
import { Lesson, Topic } from '@/types/curriculum';
import { FormattedMathText } from '@/components/math/LatexRenderer';
import { DerivationAccordionEngine } from '@/components/derivation/DerivationAccordionEngine';
import { ScaffoldedProblemCard } from '@/components/problems/ScaffoldedProblemCard';
import { POSN_PROBLEMS } from '@/data/problemsData';
import { useStudentStore } from '@/store/useStudentStore';
import {
  Clock,
  CheckCircle2,
  BookOpen,
  ArrowLeft,
  Award,
} from 'lucide-react';

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
    <article className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Action bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <button
          onClick={onBackToRoadmap}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับสู่แผนผังหลักสูตร</span>
        </button>

        <button
          onClick={() => toggleLessonCompletion(lesson.slug)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            isCompleted
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
              : 'bg-zinc-900 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-400' : 'text-slate-500'}`} />
          <span>{isCompleted ? 'เรียนจบบทนี้แล้ว' : 'ทำเครื่องหมายว่าเรียนจบ'}</span>
        </button>
      </div>

      {/* Lesson Header */}
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border"
            style={{
              borderColor: `${topic.colorAccent}40`,
              backgroundColor: `${topic.colorAccent}15`,
              color: topic.colorAccent,
            }}
          >
            {topic.titleTh.split('.')[0]}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            เวลาอ่านประมาณ {lesson.readTimeMinutes} นาที
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
          <FormattedMathText text={lesson.titleTh} />
        </h1>

        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          <FormattedMathText text={lesson.summaryTh} />
        </p>
      </header>

      {/* Theory Narrative Section */}
      <div className="rounded-xl border border-slate-800 bg-[#090D16] p-5 md:p-7 leading-relaxed text-sm md:text-base text-slate-200 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-2">
          <BookOpen className="w-4 h-4" />
          เนื้อหาทฤษฎี & สาระสำคัญ (Core Physics Theory)
        </div>
        <div className="whitespace-pre-line text-slate-300 leading-loose">
          <FormattedMathText text={lesson.theoryMarkdownTh.trim()} />
        </div>
      </div>

      {/* Interactive Derivations */}
      {lesson.derivations && lesson.derivations.length > 0 && (
        <section className="space-y-4 pt-2">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-6 rounded-full bg-gradient-to-b from-sky-400 to-purple-500" />
            <h2 className="text-lg md:text-xl font-bold text-white">
              การพิสูจน์แบบบรรทัดต่อบรรทัด (Line-by-Line Derivations)
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-400">
            แตะที่แต่ละขั้นตอนเพื่อดูคำอธิบายทางกายภาพ (Physical Intuition) และเทคนิคทางแคลคูลัส
          </p>

          <div className="space-y-6">
            {lesson.derivations.map((deriv) => (
              <DerivationAccordionEngine key={deriv.id} derivation={deriv} />
            ))}
          </div>
        </section>
      )}

      {/* Scaffolded POSN Problems Practice */}
      {relatedProblems.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-6 rounded-full bg-gradient-to-b from-amber-400 to-rose-500" />
              <h2 className="text-lg md:text-xl font-bold text-white">
                โจทย์ฝึกซ้อม สอวน. ฟิสิกส์ ที่ตรงกับบทนี้
              </h2>
            </div>
            <span className="text-xs text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              3-Tier Scaffolding
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-400">
            ฝึกคิดเป็นขั้นตอนโดยใช้ระบบคำใบ้ 3 ระดับ ก่อนตัดสินใจเปิดดูเฉลยแคลคูลัสเต็มรูปแบบ
          </p>

          <div className="space-y-6">
            {relatedProblems.map((problem) => (
              <ScaffoldedProblemCard key={problem.id} problem={problem} />
            ))}
          </div>
        </section>
      )}

      {/* Completion Banner */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-sky-950/40 to-purple-950/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>จบเนื้อหาบทเรียนนี้แล้ว</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            ก้าวต่อไป: ทบทวนคำใบ้และแก้โจทย์ซ้ำอีกรอบจนคล่องแคล่ว
          </p>
        </div>
        <button
          onClick={onBackToRoadmap}
          className="px-5 py-2.5 rounded-lg text-xs font-bold bg-sky-500 text-black hover:bg-sky-400 transition-colors shrink-0"
        >
          กลับไปเลือกบทถัดไปบน Roadmap
        </button>
      </div>
    </article>
  );
};
