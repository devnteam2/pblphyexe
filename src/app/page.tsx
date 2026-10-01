// src/app/page.tsx
'use client';

import React, { useState } from 'react';
import { CURRICULUM_TOPICS } from '@/data/curriculumData';
import { TopicId } from '@/types/curriculum';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { RoadmapTracker } from '@/components/roadmap/RoadmapTracker';
import { LessonReaderView } from '@/components/lesson/LessonReaderView';
import { ProblemBankView } from '@/components/problems/ProblemBankView';
import { SavedDerivationsView } from '@/components/saved/SavedDerivationsView';
import { FormulaSheetModal } from '@/components/formula/FormulaSheetModal';
import { TheTrapDiagram } from '@/components/academic/TheTrapDiagram';
import { useStudentStore } from '@/store/useStudentStore';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const { completedLessonSlugs, themePreference } = useStudentStore();
  const [activeTab, setActiveTab] = useState<'roadmap' | 'problems' | 'saved'>('roadmap');
  const [selectedTopicId, setSelectedTopicId] = useState<TopicId>('math-tools');
  const [selectedLessonSlug, setSelectedLessonSlug] = useState<string | null>(null);
  const [isFormulaSheetOpen, setIsFormulaSheetOpen] = useState<boolean>(false);

  const activeTopic = CURRICULUM_TOPICS.find((t) => t.id === selectedTopicId) || CURRICULUM_TOPICS[0];
  const activeLesson = selectedLessonSlug
    ? activeTopic.lessons.find((l) => l.slug === selectedLessonSlug) || activeTopic.lessons[0]
    : null;

  return (
    <div className={`min-h-screen transition-colors duration-200 ${themePreference === 'slate_blackboard' ? 'theme-blackboard' : ''} bg-[var(--bg-monograph)] text-[var(--ink-primary)] flex flex-col font-serif pb-20 md:pb-8`}>
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
                      ตำราและระบบวิเคราะห์โจทย์ฟิสิกส์โอลิมปิก (ค่าย 1 และ ค่าย 2) ฉบับแคลคูลัส 
                      ออกแบบขึ้นเพื่อฝึกให้นักเรียนสร้างโมเดลทางกายภาพจากหลักการพื้นฐาน ไม่ใช่การจับคู่ตัวเลขกับสูตรสำเร็จ
                    </p>
                  </div>
                </header>

                {/* The Trap (กับดักทางความคิด) Diagnostic Section */}
                <TheTrapDiagram />

                {/* Table of Contents / Roadmap Tracker */}
                <RoadmapTracker
                  topics={CURRICULUM_TOPICS}
                  activeTopicId={selectedTopicId}
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
                      {activeTopic.lessons.length} Subsection
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
                              {lesson.titleTh}
                            </h4>
                            <p className="text-xs text-[var(--ink-secondary)] line-clamp-1 font-serif">
                              {lesson.summaryTh}
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
              />
            )}
          </div>
        )}

        {/* TAB 2: PROBLEM BANK */}
        {activeTab === 'problems' && <ProblemBankView />}

        {/* TAB 3: SAVED FORMULAS / DERIVATIONS */}
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
