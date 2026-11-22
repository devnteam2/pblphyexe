// src/app/page.tsx
'use client';

import React, { useState } from 'react';
import { CURRICULUM_TOPICS } from '@/data/curriculumData';
import { CurriculumTrack, TopicId } from '@/types/curriculum';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { FormattedMathText } from '@/components/math/LatexRenderer';
import { RoadmapTracker } from '@/components/roadmap/RoadmapTracker';
import { LessonReaderView } from '@/components/lesson/LessonReaderView';
import { ProblemBankView } from '@/components/problems/ProblemBankView';
import { SavedDerivationsView } from '@/components/saved/SavedDerivationsView';
import { FormulaSheetModal } from '@/components/formula/FormulaSheetModal';
import { RigidBodySimulationView } from '@/components/simulation/RigidBodySimulationView';
import { QuickReviewDeck } from '@/components/review/QuickReviewDeck';
import { useStudentStore } from '@/store/useStudentStore';
import { ArrowRight, Brain, Flame, GraduationCap, PlayCircle } from 'lucide-react';

export default function Home() {
  const { completedLessonSlugs, themePreference, fontSizeScale } = useStudentStore();
  const [activeTab, setActiveTab] = useState<'roadmap' | 'problems' | 'saved' | 'simulation'>('roadmap');
  const [activeTrack, setActiveTrack] = useState<CurriculumTrack>('pre-camp-1');
  const [selectedTopicId, setSelectedTopicId] = useState<TopicId>('pre-mechanics');
  const [selectedLessonSlug, setSelectedLessonSlug] = useState<string | null>(null);
  const [isFormulaSheetOpen, setIsFormulaSheetOpen] = useState<boolean>(false);
  const [showQuickReview, setShowQuickReview] = useState<boolean>(false);

  const trackTopics = CURRICULUM_TOPICS.filter((t) => t.track === activeTrack);
  const activeTopic = trackTopics.find((t) => t.id === selectedTopicId) || trackTopics[0];
  const activeLesson = selectedLessonSlug
    ? activeTopic.lessons.find((l) => l.slug === selectedLessonSlug) || activeTopic.lessons[0]
    : null;

  const trackLessonsFlat = trackTopics.flatMap((topic) =>
    topic.lessons.map((lesson) => ({ topic, lesson }))
  );
  const completedInTrackCount = trackLessonsFlat.filter((entry) =>
    completedLessonSlugs.includes(entry.lesson.slug)
  ).length;
  const nextStudyTarget =
    trackLessonsFlat.find((entry) => !completedLessonSlugs.includes(entry.lesson.slug)) ||
    trackLessonsFlat[0];

  const handleSelectTrack = (track: CurriculumTrack) => {
    setActiveTrack(track);
    const firstTopic = CURRICULUM_TOPICS.find((t) => t.track === track);
    if (firstTopic) {
      setSelectedTopicId(firstTopic.id);
    }
    setSelectedLessonSlug(null);
  };

  const handleContinueLearning = () => {
    if (!nextStudyTarget) return;
    setSelectedTopicId(nextStudyTarget.topic.id);
    setSelectedLessonSlug(nextStudyTarget.lesson.slug);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-colors duration-200 ${
        themePreference === 'slate_blackboard' ? 'theme-blackboard' : ''
      } ${fontSizeScale === 'large' ? 'font-scale-large' : ''} bg-[var(--bg-monograph)] text-[var(--ink-primary)] flex flex-col font-serif pb-[calc(5.25rem+env(safe-area-inset-bottom))] md:pb-10`}
    >
      {/* Top Academic Header */}
      <Navbar
        onOpenFormulaSheet={() => setIsFormulaSheetOpen(true)}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'roadmap') {
            setSelectedLessonSlug(null);
          }
        }}
      />

      {/* Main Content Pane */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8">
        {/* TAB 1: ROADMAP / ACADEMIC READING VIEW */}
        {activeTab === 'roadmap' && (
          <div>
            {!activeLesson ? (
              <div className="space-y-8 animate-in fade-in duration-150">
                {/* Academic Monograph Frontispiece Header */}
                <header className="border-b border-[var(--hairline-border)] pb-8 pt-2">
                  <div className="max-w-3xl space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[var(--ink-tertiary)] uppercase">
                      <span>OPENPOSN PHYSICS MONOGRAPH SERIES</span>
                      <span>•</span>
                      <span>100% OPEN-ACCESS</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-bold font-serif text-[var(--ink-primary)] tracking-tight leading-snug">
                      สอวน. ฟิสิกส์ เพื่อทุกคน: บทเรียนและการพิสูจน์จาก First Principles
                    </h1>

                    <p className="text-sm md:text-base text-[var(--ink-secondary)] font-serif leading-relaxed">
                      เลือกเส้นทางตามเป้าหมายของคุณ: เริ่มปูพื้นฐานเตรียม{' '}
                      <strong className="text-[var(--ink-primary)]">สอบเข้าค่าย 1 (28 หัวข้อทางการ สอวน.)</strong>{' '}
                      แบบเข้าใจง่ายไม่ต้องพึ่งแคลคูลัสหนัก หรือก้าวต่อสู่ระดับ{' '}
                      <strong className="text-[var(--ink-primary)]">ค่าย 1 → ค่าย 2</strong>{' '}
                      ด้วยกลศาสตร์แคลคูลัสเต็มรูปแบบ
                    </p>
                  </div>

                  {/* Dual-Track Selector Cards */}
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleSelectTrack('pre-camp-1')}
                      className={`p-4 rounded-lg border text-left transition-all ${
                        activeTrack === 'pre-camp-1'
                          ? 'bg-[var(--surface-card)] border-stone-800 dark:border-stone-200 ring-1 ring-stone-800 dark:ring-stone-200 shadow-xs'
                          : 'bg-[var(--surface-muted)] border-[var(--hairline-border)] opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                          <Flame className="w-3.5 h-3.5" />
                          TRACK 01 • RECOMMENDED FOR BEGINNERS
                        </span>
                        {activeTrack === 'pre-camp-1' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <h2 className="text-sm md:text-base font-bold text-[var(--ink-primary)]">
                        เตรียมสอบเข้าค่าย 1 (Pre-Camp 1 Entrance)
                      </h2>
                      <p className="text-xs text-[var(--ink-secondary)] mt-1 leading-relaxed">
                        เนื้อหา 28 หัวข้อตามประกาศ สอวน. (กลศาสตร์ ของไหล ความร้อน ไฟฟ้า แม่เหล็ก แสง) เน้นภาพจริงและพีชคณิต ไม่ต้องใช้แคลคูลัสหนัก!
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelectTrack('camp-1-2')}
                      className={`p-4 rounded-lg border text-left transition-all ${
                        activeTrack === 'camp-1-2'
                          ? 'bg-[var(--surface-card)] border-stone-800 dark:border-stone-200 ring-1 ring-stone-800 dark:ring-stone-200 shadow-xs'
                          : 'bg-[var(--surface-muted)] border-[var(--hairline-border)] opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                          <GraduationCap className="w-3.5 h-3.5" />
                          TRACK 02 • ADVANCED CALCULUS MECHANICS
                        </span>
                        {activeTrack === 'camp-1-2' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <h2 className="text-sm md:text-base font-bold text-[var(--ink-primary)]">
                        เตรียมค่าย 1 → ค่าย 2 (Camp 1 &amp; 2 Intensive)
                      </h2>
                      <p className="text-xs text-[var(--ink-secondary)] mt-1 leading-relaxed">
                        คณิตศาสตร์โอลิมปิกและกลศาสตร์แคลคูลัสเชิงลึก 8 บท ตามตำรา สอวน. &amp; Kleppner–Kolenkow (พิกัดเชิงขั้ว จรวด ไจโรสโคป วงโคจร เรโซแนนซ์)
                      </p>
                    </button>
                  </div>

                  {/* Study Companion Quick Actions (Mobile-first Resume + Flashcard Review) */}
                  <div className="mt-4 p-3.5 sm:p-4 rounded-lg border border-[var(--hairline-border)] bg-[var(--surface-card)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                    <div className="space-y-0.5">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--ink-tertiary)] block">
                        STUDY COMPANION ({activeTrack === 'pre-camp-1' ? 'สอบเข้าค่าย 1' : 'ค่าย 1 → 2'}) • {completedInTrackCount}/{trackLessonsFlat.length} บทเรียน
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-[var(--ink-primary)] line-clamp-1">
                        ถัดไป: <FormattedMathText text={nextStudyTarget?.lesson.titleTh || ''} />
                      </p>
                    </div>

                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                      <button
                        type="button"
                        onClick={handleContinueLearning}
                        className="flex-1 sm:flex-none min-h-[42px] px-3.5 py-2 rounded bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-serif font-semibold hover:opacity-90 inline-flex items-center justify-center gap-1.5 shadow-2xs"
                      >
                        <PlayCircle className="w-3.5 h-3.5" />
                        <span>{completedInTrackCount === 0 ? 'เริ่มปูพื้นฐานบทแรก' : 'เรียนต่อทันที'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowQuickReview((prev) => !prev)}
                        className={`flex-1 sm:flex-none min-h-[42px] px-3.5 py-2 rounded border text-xs font-serif font-medium inline-flex items-center justify-center gap-1.5 transition-colors ${
                          showQuickReview
                            ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-500 text-amber-950 dark:text-amber-200 font-semibold'
                            : 'bg-[var(--surface-muted)] border-[var(--hairline-border)] text-[var(--ink-primary)] hover:border-stone-400'
                        }`}
                      >
                        <Brain className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        <span>ทบทวน Flashcards</span>
                      </button>
                    </div>
                  </div>
                </header>

                {showQuickReview && (
                  <QuickReviewDeck onClose={() => setShowQuickReview(false)} />
                )}

                {/* Table of Contents / Roadmap Tracker */}
                <RoadmapTracker
                  topics={trackTopics}
                  activeTopicId={activeTopic.id}
                  onSelectTopic={(topicId) => {
                    setSelectedTopicId(topicId);
                  }}
                />

                {/* Selected Chapter Lessons */}
                <div className="rounded-lg border border-[var(--hairline-border)] bg-[var(--surface-card)] p-5 md:p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--hairline-border)]">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-stone-500 uppercase tracking-widest block">
                        CHAPTER SUBSECTIONS
                      </span>
                      <h3 className="text-base font-bold text-[var(--ink-primary)]">
                        {activeTopic.titleTh}
                      </h3>
                    </div>
                    <span className="text-xs text-[var(--ink-secondary)] font-mono">
                      {activeTopic.lessons.length} {activeTopic.lessons.length === 1 ? 'Subsection' : 'Subsections'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {activeTopic.lessons.map((lesson) => {
                      const isDone = completedLessonSlugs.includes(lesson.slug);
                      return (
                        <div
                          key={lesson.id}
                          onClick={() => setSelectedLessonSlug(lesson.slug)}
                          className="group p-4 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/40 hover:border-stone-400 dark:hover:border-stone-600 cursor-pointer transition-all flex items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-stone-500">
                                § {lesson.order}.0
                              </span>
                              {isDone && (
                                <span className="text-[11px] font-mono font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 px-1.5 rounded">
                                  Studied
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm md:text-base font-bold text-[var(--ink-primary)] group-hover:underline underline-offset-2">
                              <FormattedMathText text={lesson.titleTh} />
                            </h4>
                            <p className="text-xs text-[var(--ink-secondary)] line-clamp-1 font-serif">
                              <FormattedMathText text={lesson.summaryTh} />
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs font-serif text-[var(--ink-secondary)] group-hover:text-[var(--ink-primary)] transition-colors flex items-center gap-1 font-medium">
                              <span>อ่านบทนี้</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <LessonReaderView
                lesson={activeLesson}
                topic={activeTopic}
                onBackToRoadmap={() => setSelectedLessonSlug(null)}
                onSelectLesson={(slug) => setSelectedLessonSlug(slug)}
                onOpenSimulation={() => setActiveTab('simulation')}
              />
            )}
          </div>
        )}

        {/* TAB 2: RIGID BODY ROTATION SIMULATION */}
        {activeTab === 'simulation' && <RigidBodySimulationView />}

        {/* TAB 3: PROBLEM BANK */}
        {activeTab === 'problems' && <ProblemBankView />}

        {/* TAB 4: SAVED FORMULAS / DERIVATIONS */}
        {activeTab === 'saved' && (
          <SavedDerivationsView
            onGoToRoadmap={() => {
              setActiveTab('roadmap');
              setSelectedLessonSlug(null);
            }}
          />
        )}
      </main>

      {/* Formula Sheet Reference Modal */}
      <FormulaSheetModal
        isOpen={isFormulaSheetOpen}
        onClose={() => setIsFormulaSheetOpen(false)}
      />

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'roadmap') {
            setSelectedLessonSlug(null);
          }
        }}
        onOpenFormulaSheet={() => setIsFormulaSheetOpen(true)}
      />
    </div>
  );
}
