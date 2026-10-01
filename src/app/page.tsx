// src/app/page.tsx
'use client';

import React, { useState } from 'react';
import { CURRICULUM_TOPICS } from '@/data/curriculumData';
import { POSN_PROBLEMS } from '@/data/problemsData';
import { TopicId } from '@/types/curriculum';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { RoadmapTracker } from '@/components/roadmap/RoadmapTracker';
import { LessonReaderView } from '@/components/lesson/LessonReaderView';
import { ProblemBankView } from '@/components/problems/ProblemBankView';
import { SavedDerivationsView } from '@/components/saved/SavedDerivationsView';
import { FormulaSheetModal } from '@/components/formula/FormulaSheetModal';
import { useStudentStore } from '@/store/useStudentStore';
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  BrainCircuit,
  ArrowRight,
} from 'lucide-react';

export default function Home() {
  const { completedLessonSlugs, problemProgress } = useStudentStore();
  const [activeTab, setActiveTab] = useState<'roadmap' | 'problems' | 'saved'>('roadmap');
  const [selectedTopicId, setSelectedTopicId] = useState<TopicId>('math-tools');
  const [selectedLessonSlug, setSelectedLessonSlug] = useState<string | null>(null);
  const [isFormulaSheetOpen, setIsFormulaSheetOpen] = useState<boolean>(false);

  const activeTopic = CURRICULUM_TOPICS.find((t) => t.id === selectedTopicId) || CURRICULUM_TOPICS[0];
  const activeLesson = selectedLessonSlug
    ? activeTopic.lessons.find((l) => l.slug === selectedLessonSlug) || activeTopic.lessons[0]
    : null;

  const totalLessonsCount = CURRICULUM_TOPICS.reduce(
    (acc, t) => acc + t.lessons.length,
    0
  );
  const totalCompletedLessons = completedLessonSlugs.length;
  const totalMasteredProblems = Object.values(problemProgress).filter(
    (p) => p.isMarkedMastered
  ).length;

  return (
    <div className="min-h-screen bg-black text-slate-100 flex flex-col font-sans pb-20 md:pb-8 selection:bg-sky-500/30 selection:text-sky-300">
      {/* Top App Bar */}
      <Navbar
        onOpenFormulaSheet={() => setIsFormulaSheetOpen(true)}
        onOpenBookmarks={() => setActiveTab('saved')}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'roadmap') {
            setSelectedLessonSlug(null);
          }
        }}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8">
        {/* TAB 1: ROADMAP / LESSON VIEW */}
        {activeTab === 'roadmap' && (
          <div>
            {!activeLesson ? (
              <div className="space-y-8 animate-in fade-in duration-150">
                {/* Hero / Mission Banner */}
                <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-[#070b14] via-[#04060b] to-[#0a0614] p-6 md:p-8 shadow-2xl">
                  {/* Subtle Background Glows */}
                  <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

                  <div className="relative z-10 max-w-3xl space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>หลักสูตร สอวน. ฟิสิกส์ ฉบับแคลคูลัส ฟรี 100% ไม่มีค่าใช้จ่าย</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                      สลายกำแพงกวดวิชา สู่เส้นทางผู้แทนโอลิมปิกวิชาการ
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      เรียนรู้ฟิสิกส์จาก <span className="text-sky-300 font-semibold">First Principles</span> แบบบรรทัดต่อบรรทัด 
                      ด้วยการพิสูจน์แคลคูลัสที่กระจ่างชัด พร้อมระบบคำใบ้ 3 ระดับ (Scaffolded Hints) ที่สอนให้คุณคิดแก้ปัญหา ไม่ใช่แค่ท่องจำสูตร
                    </p>

                    {/* Quick Metric Bar */}
                    <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-sky-400" />
                        <span>เรียนจบ: <strong className="text-white">{totalCompletedLessons}/{totalLessonsCount}</strong> บท</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>พิชิตโจทย์: <strong className="text-white">{totalMasteredProblems}/{POSN_PROBLEMS.length}</strong> ข้อ</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BrainCircuit className="w-4 h-4 text-purple-400" />
                        <span>แคลคูลัส First Principles</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Linear Roadmap Module Graph */}
                <RoadmapTracker
                  topics={CURRICULUM_TOPICS}
                  activeTopicId={selectedTopicId}
                  onSelectTopic={(topicId) => {
                    setSelectedTopicId(topicId);
                  }}
                />

                {/* Selected Topic Lessons Detailed Preview */}
                <div className="rounded-2xl border border-slate-800 bg-[#07090e] p-5 md:p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest block">
                        บทเรียนในโมดูลที่เลือก
                      </span>
                      <h3 className="text-base md:text-lg font-bold text-white">
                        {activeTopic.titleTh}
                      </h3>
                    </div>
                    <span className="text-xs text-slate-400">
                      {activeTopic.lessons.length} บทเรียน
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {activeTopic.lessons.map((lesson) => {
                      const isDone = completedLessonSlugs.includes(lesson.slug);
                      return (
                        <div
                          key={lesson.id}
                          onClick={() => setSelectedLessonSlug(lesson.slug)}
                          className="group p-4 rounded-xl border border-slate-800/80 bg-zinc-950/80 hover:border-sky-500/60 hover:bg-zinc-900/60 cursor-pointer transition-all flex items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-500">
                                บทที่ {lesson.order}
                              </span>
                              {isDone && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-1.5 py-0.2 rounded">
                                  <CheckCircle2 className="w-3 h-3" />
                                  เรียนจบแล้ว
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm md:text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                              {lesson.titleTh}
                            </h4>
                            <p className="text-xs text-slate-400 line-clamp-1">
                              {lesson.summaryTh}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs font-semibold text-sky-400 bg-sky-500/10 px-3 py-1.5 rounded-lg border border-sky-500/20 group-hover:bg-sky-500 group-hover:text-black transition-all flex items-center gap-1">
                              <span>เริ่มเรียน</span>
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
