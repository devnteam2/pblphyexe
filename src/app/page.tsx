// src/app/page.tsx
'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { CURRICULUM_TOPICS } from '@/data/curriculumData';
import { LESSON_BRIDGES } from '@/data/lessonBridges';
import { HubLabId, PHYSICS_LAB_CATALOG } from '@/data/labCatalog';
import { POSN_PROBLEMS } from '@/data/problemsData';
import { CurriculumTrack, TopicId } from '@/types/curriculum';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { FormattedMathText } from '@/components/math/LatexRenderer';
import { RoadmapTracker } from '@/components/roadmap/RoadmapTracker';
import { LessonReaderView } from '@/components/lesson/LessonReaderView';
import { ProblemBankView } from '@/components/problems/ProblemBankView';
import { SavedDerivationsView } from '@/components/saved/SavedDerivationsView';
import { FormulaSheetModal } from '@/components/formula/FormulaSheetModal';
import { PhysicsLabHub } from '@/components/simulation/PhysicsLabHub';
import { GlobalSearchModal } from '@/components/search/GlobalSearchModal';
import { QuickReviewDeck } from '@/components/review/QuickReviewDeck';
import { useStudentStore } from '@/store/useStudentStore';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Clock,
  FileText,
  Flame,
  FlaskConical,
  GraduationCap,
  PlayCircle,
  Sparkles,
} from 'lucide-react';

export default function Home() {
  const { completedLessonSlugs, problemProgress, themePreference, fontSizeScale } = useStudentStore();
  const [activeTab, setActiveTab] = useState<'roadmap' | 'problems' | 'saved' | 'simulation'>('roadmap');
  const [activeTrack, setActiveTrack] = useState<CurriculumTrack>('pre-camp-1');
  const [selectedTopicId, setSelectedTopicId] = useState<TopicId | null>(null);
  const [selectedLessonSlug, setSelectedLessonSlug] = useState<string | null>(null);
  const [selectedLabId, setSelectedLabId] = useState<HubLabId>('projectile-shooter');
  const [isFormulaSheetOpen, setIsFormulaSheetOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [showQuickReview, setShowQuickReview] = useState<boolean>(false);

  const trackTopics = CURRICULUM_TOPICS.filter((t) => t.track === activeTrack);
  const activeTopicIndex = selectedTopicId
    ? trackTopics.findIndex((t) => t.id === selectedTopicId)
    : -1;
  const activeTopic = activeTopicIndex >= 0 ? trackTopics[activeTopicIndex] : null;
  const prevTopic = activeTopicIndex > 0 ? trackTopics[activeTopicIndex - 1] : null;
  const nextTopic =
    activeTopicIndex >= 0 && activeTopicIndex < trackTopics.length - 1
      ? trackTopics[activeTopicIndex + 1]
      : null;

  const activeLesson =
    activeTopic && selectedLessonSlug
      ? activeTopic.lessons.find((l) => l.slug === selectedLessonSlug) || null
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

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const pushRouteHash = (hash: string) => {
    if (typeof window !== 'undefined' && window.location.hash !== hash) {
      window.history.pushState(null, '', hash);
    }
  };

  const applyHashState = useCallback((rawHash: string) => {
    const hash = rawHash.replace(/^#/, '');
    if (!hash) {
      setActiveTab('roadmap');
      setSelectedTopicId(null);
      setSelectedLessonSlug(null);
      return;
    }
    const parts = hash.split('/').filter(Boolean);
    const root = parts[0];

    if (root === 'problems' || root === 'saved') {
      setActiveTab(root);
      return;
    }
    if (root === 'labs') {
      const candidate = parts[1] as HubLabId | undefined;
      if (candidate && PHYSICS_LAB_CATALOG.some((l) => l.id === candidate)) {
        setSelectedLabId(candidate);
      }
      setActiveTab('simulation');
      return;
    }
    if (root === 'lesson' && parts[1] && parts[2] && parts[3]) {
      const track = parts[1] as CurriculumTrack;
      const topicId = parts[2] as TopicId;
      const slug = parts[3];
      if (track === 'pre-camp-1' || track === 'camp-1-2') {
        setActiveTab('roadmap');
        setActiveTrack(track);
        setSelectedTopicId(topicId);
        setSelectedLessonSlug(slug);
      }
      return;
    }
    if (root === 'roadmap') {
      const track = (parts[1] as CurriculumTrack | undefined) || 'pre-camp-1';
      const topicId = (parts[2] as TopicId | undefined) || null;
      setActiveTab('roadmap');
      if (track === 'pre-camp-1' || track === 'camp-1-2') {
        setActiveTrack(track);
      }
      setSelectedTopicId(topicId);
      setSelectedLessonSlug(null);
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    const onHashOrPop = () => {
      applyHashState(window.location.hash);
    };
    const initRaf = requestAnimationFrame(() => {
      if (window.location.hash) {
        applyHashState(window.location.hash);
      }
    });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('hashchange', onHashOrPop);
    window.addEventListener('popstate', onHashOrPop);
    return () => {
      cancelAnimationFrame(initRaf);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('hashchange', onHashOrPop);
      window.removeEventListener('popstate', onHashOrPop);
    };
  }, [applyHashState]);

  const handleSelectTrack = (track: CurriculumTrack) => {
    setActiveTrack(track);
    setSelectedTopicId(null);
    setSelectedLessonSlug(null);
    pushRouteHash(`#roadmap/${track}`);
  };

  const handleContinueLearning = () => {
    if (!nextStudyTarget) return;
    setSelectedTopicId(nextStudyTarget.topic.id);
    setSelectedLessonSlug(nextStudyTarget.lesson.slug);
    pushRouteHash(`#lesson/${activeTrack}/${nextStudyTarget.topic.id}/${nextStudyTarget.lesson.slug}`);
    scrollToTop();
  };

  const handleSelectTopic = (topicId: TopicId) => {
    setSelectedTopicId(topicId);
    setSelectedLessonSlug(null);
    pushRouteHash(`#roadmap/${activeTrack}/${topicId}`);
    scrollToTop();
  };

  const handleOpenLesson = (slug: string, explicitTrack?: CurriculumTrack, explicitTopicId?: TopicId) => {
    const track = explicitTrack || activeTrack;
    const topicId = explicitTopicId || selectedTopicId;
    setActiveTab('roadmap');
    if (explicitTrack) setActiveTrack(explicitTrack);
    if (explicitTopicId) setSelectedTopicId(explicitTopicId);
    setSelectedLessonSlug(slug);
    if (topicId) {
      pushRouteHash(`#lesson/${track}/${topicId}/${slug}`);
    }
    scrollToTop();
  };

  const handleResetToAllChapters = () => {
    setSelectedLessonSlug(null);
    setSelectedTopicId(null);
    pushRouteHash(`#roadmap/${activeTrack}`);
    scrollToTop();
  };

  const handleOpenLab = (labId: HubLabId) => {
    setSelectedLabId(labId);
    setActiveTab('simulation');
    pushRouteHash(`#labs/${labId}`);
    scrollToTop();
  };

  const handleTabSwitch = (tab: 'roadmap' | 'problems' | 'saved' | 'simulation') => {
    setActiveTab(tab);
    if (tab === 'roadmap') {
      handleResetToAllChapters();
    } else if (tab === 'simulation') {
      pushRouteHash(`#labs/${selectedLabId}`);
      scrollToTop();
    } else {
      pushRouteHash(`#${tab}`);
      scrollToTop();
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
        onOpenSearch={() => setIsSearchOpen(true)}
        activeTab={activeTab}
        setActiveTab={handleTabSwitch}
      />

      {/* Main Content Pane */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8">
        {/* TAB 1: ROADMAP / ACADEMIC READING VIEW (3-LEVEL DRILL-DOWN) */}
        {activeTab === 'roadmap' && (
          <div>
            {activeTopic && activeLesson ? (
              /* LEVEL 3: LESSON READER VIEW */
              <LessonReaderView
                lesson={activeLesson}
                topic={activeTopic}
                onBackToRoadmap={() => {
                  setSelectedLessonSlug(null);
                  pushRouteHash(`#roadmap/${activeTrack}/${activeTopic.id}`);
                  scrollToTop();
                }}
                onSelectLesson={(slug) => handleOpenLesson(slug, activeTrack, activeTopic.id)}
                onOpenSimulation={() => handleOpenLab('rigid-body')}
              />
            ) : activeTopic ? (
              /* LEVEL 2: DEDICATED CHAPTER SUBSECTIONS PAGE */
              (() => {
                const chapterProblems = POSN_PROBLEMS.filter((p) => p.topicId === activeTopic.id);
                const masteredInChapter = chapterProblems.filter(
                  (p) => problemProgress[p.id]?.isMarkedMastered
                ).length;
                const completedInChapter = activeTopic.lessons.filter((l) =>
                  completedLessonSlugs.includes(l.slug)
                ).length;
                const totalDerivationsInChapter = activeTopic.lessons.reduce(
                  (acc, l) => acc + l.derivations.length,
                  0
                );
                const chapterPercent =
                  activeTopic.lessons.length > 0
                    ? Math.round((completedInChapter / activeTopic.lessons.length) * 100)
                    : 0;
                const nextChapterLesson =
                  activeTopic.lessons.find((l) => !completedLessonSlugs.includes(l.slug)) ||
                  activeTopic.lessons[0];

                return (
                  <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-150">
                    {/* Top Breadcrumb Navigation */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--hairline-border)]">
                      <button
                        type="button"
                        onClick={handleResetToAllChapters}
                        className="min-h-[42px] px-3 py-1.5 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] hover:border-stone-500 inline-flex items-center gap-1.5 text-xs font-serif font-medium text-[var(--ink-primary)] transition-colors"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>กลับไปหน้าเลือกหมวดวิชาทั้งหมด (All Chapters)</span>
                      </button>

                      <span className="px-2.5 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-muted)] font-mono text-[11px] font-semibold text-[var(--ink-secondary)]">
                        {activeTrack === 'pre-camp-1'
                          ? 'TRACK 01 • เตรียมสอบเข้าค่าย 1'
                          : 'TRACK 02 • ค่าย 1 → ค่าย 2 (CALCULUS)'}
                      </span>
                    </div>

                    {/* Chapter Hero Banner */}
                    <header className="rounded-lg border border-[var(--hairline-border)] bg-[var(--surface-card)] p-5 sm:p-7 space-y-5 shadow-2xs">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="space-y-2 max-w-2xl">
                          <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--ink-tertiary)]">
                            <span className="font-bold text-[var(--ink-primary)]">
                              CHAPTER {String(activeTopicIndex + 1).padStart(2, '0')}
                            </span>
                            <span>•</span>
                            <span>{activeTopic.subtitleTh}</span>
                          </div>

                          <h1 className="text-xl sm:text-3xl font-bold text-[var(--ink-primary)] tracking-tight leading-snug">
                            <FormattedMathText text={activeTopic.titleTh} />
                          </h1>

                          <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
                            <FormattedMathText text={activeTopic.descriptionTh} />
                          </p>
                        </div>

                        {nextChapterLesson && (
                          <button
                            type="button"
                            onClick={() => handleOpenLesson(nextChapterLesson.slug)}
                            className="min-h-[44px] px-4 py-2.5 rounded bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs sm:text-sm font-serif font-semibold hover:opacity-90 inline-flex items-center justify-center gap-2 shrink-0 shadow-2xs transition-opacity"
                          >
                            <PlayCircle className="w-4 h-4" />
                            <span>
                              {completedInChapter === 0
                                ? 'เริ่มเรียนบทแรกของหมวดนี้'
                                : 'เรียนต่อบทถัดไปในหมวดนี้'}
                            </span>
                          </button>
                        )}
                      </div>

                      {/* Chapter Stats & Progress */}
                      <div className="pt-4 border-t border-[var(--hairline-border)] space-y-2.5">
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[var(--ink-secondary)]">
                          <span>
                            ความคืบหน้าหมวดนี้:{' '}
                            <strong className="text-[var(--ink-primary)]">
                              {completedInChapter}/{activeTopic.lessons.length} บทเรียน ({chapterPercent}%)
                            </strong>
                          </span>
                          <div className="flex flex-wrap items-center gap-3">
                            <span>การพิสูจน์: {totalDerivationsInChapter} ชุด</span>
                            <span>•</span>
                            <span>
                              โจทย์ฝึกหัด: {masteredInChapter}/{chapterProblems.length} ข้อ
                            </span>
                          </div>
                        </div>

                        <div className="w-full h-1.5 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-stone-800 dark:bg-stone-200 transition-all"
                            style={{ width: `${chapterPercent}%` }}
                          />
                        </div>
                      </div>
                    </header>

                    {/* Numbered Chapter Subsections List */}
                    <section className="space-y-3.5">
                      <div className="flex items-center justify-between pb-2 border-b border-[var(--hairline-border)]">
                        <div>
                          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[var(--ink-tertiary)] block">
                            CHAPTER SUBSECTIONS ({activeTopic.lessons.length} บทเรียนย่อย)
                          </span>
                          <h2 className="text-base sm:text-lg font-bold text-[var(--ink-primary)]">
                            เลือกหัวข้อย่อยที่ต้องการศึกษาและทดลองแล็บ
                          </h2>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3.5">
                        {activeTopic.lessons.map((lesson) => {
                          const isDone = completedLessonSlugs.includes(lesson.slug);
                          const hasLab = Boolean(LESSON_BRIDGES[lesson.slug]?.interactiveLabId);

                          return (
                            <button
                              key={lesson.id}
                              type="button"
                              onClick={() => handleOpenLesson(lesson.slug)}
                              className="group w-full text-left p-4 sm:p-5 rounded-lg border border-[var(--hairline-border)] bg-[var(--surface-card)] hover:border-stone-500 dark:hover:border-stone-400 hover:shadow-xs cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                            >
                              <div className="space-y-2 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="px-2 py-0.5 rounded bg-[var(--surface-muted)] border border-[var(--hairline-border)] font-mono text-xs font-bold text-[var(--ink-primary)]">
                                    § {activeTopicIndex + 1}.{lesson.order}
                                  </span>

                                  {hasLab && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-semibold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800">
                                      <Sparkles className="w-3 h-3" />
                                      มีแล็บจำลองโต้ตอบ
                                    </span>
                                  )}

                                  {isDone && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800">
                                      <CheckCircle2 className="w-3 h-3" />
                                      เรียนจบแล้ว
                                    </span>
                                  )}
                                </div>

                                <h3 className="text-base sm:text-lg font-bold text-[var(--ink-primary)] group-hover:underline underline-offset-2 leading-snug">
                                  <FormattedMathText text={lesson.titleTh} />
                                </h3>

                                <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed line-clamp-2">
                                  <FormattedMathText text={lesson.summaryTh} />
                                </p>

                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-[11px] font-mono text-[var(--ink-tertiary)]">
                                  <span className="inline-flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    เวลาอ่าน ~{lesson.readTimeMinutes} นาที
                                  </span>
                                  <span className="inline-flex items-center gap-1">
                                    <BookOpen className="w-3 h-3" />
                                    {lesson.derivations.length} การพิสูจน์สมการ
                                  </span>
                                  <span className="inline-flex items-center gap-1">
                                    <FileText className="w-3 h-3" />
                                    {lesson.relatedProblemIds.length} โจทย์แนวข้อสอบ
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center justify-end sm:justify-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[var(--hairline-border)]">
                                <span className="px-3.5 py-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-muted)] group-hover:bg-stone-900 group-hover:text-white dark:group-hover:bg-stone-100 dark:group-hover:text-stone-900 text-xs font-serif font-semibold text-[var(--ink-primary)] transition-colors inline-flex items-center gap-1.5">
                                  <span>เข้าสู่บทเรียน</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </section>

                    {/* Prev / Next Chapter Pagination Footer */}
                    <footer className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-[var(--hairline-border)]">
                      {prevTopic ? (
                        <button
                          type="button"
                          onClick={() => handleSelectTopic(prevTopic.id)}
                          className="min-h-[42px] px-3.5 py-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] hover:border-stone-500 text-xs font-serif text-[var(--ink-primary)] inline-flex items-center gap-1.5 transition-colors"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>หมวดก่อนหน้า: {prevTopic.titleTh.split('(')[0].trim()}</span>
                        </button>
                      ) : (
                        <div />
                      )}

                      {nextTopic ? (
                        <button
                          type="button"
                          onClick={() => handleSelectTopic(nextTopic.id)}
                          className="min-h-[42px] px-3.5 py-2 rounded bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 text-xs font-serif font-semibold inline-flex items-center gap-1.5 transition-opacity"
                        >
                          <span>หมวดถัดไป: {nextTopic.titleTh.split('(')[0].trim()}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <div />
                      )}
                    </footer>
                  </div>
                );
              })()
            ) : (
              /* LEVEL 1: ALL CHAPTERS OVERVIEW & TRACK SELECTOR */
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

                  {/* Study Companion Quick Actions (Mobile-first Resume + Flashcard Review + Lab Hub) */}
                  <div className="mt-4 p-3.5 sm:p-4 rounded-lg border border-[var(--hairline-border)] bg-[var(--surface-card)] flex flex-col lg:flex-row lg:items-center justify-between gap-3 shadow-2xs">
                    <div className="space-y-0.5 min-w-0">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--ink-tertiary)] block">
                        STUDY COMPANION ({activeTrack === 'pre-camp-1' ? 'สอบเข้าค่าย 1' : 'ค่าย 1 → 2'}) • {completedInTrackCount}/{trackLessonsFlat.length} บทเรียน
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-[var(--ink-primary)] line-clamp-1">
                        ถัดไป: <FormattedMathText text={nextStudyTarget?.lesson.titleTh || ''} />
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={handleContinueLearning}
                        className="flex-1 sm:flex-none min-h-[42px] px-3.5 py-2 rounded bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-serif font-semibold hover:opacity-90 inline-flex items-center justify-center gap-1.5 whitespace-nowrap shadow-2xs"
                      >
                        <PlayCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{completedInTrackCount === 0 ? 'เริ่มปูพื้นฐานบทแรก' : 'เรียนต่อทันที'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowQuickReview((prev) => !prev)}
                        className={`flex-1 sm:flex-none min-h-[42px] px-3.5 py-2 rounded border text-xs font-serif font-medium inline-flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors ${
                          showQuickReview
                            ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-500 text-amber-950 dark:text-amber-200 font-semibold'
                            : 'bg-[var(--surface-muted)] border-[var(--hairline-border)] text-[var(--ink-primary)] hover:border-stone-400'
                        }`}
                      >
                        <Brain className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                        <span>Flashcards</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenLab('projectile-shooter')}
                        className="flex-1 sm:flex-none min-h-[42px] px-3.5 py-2 rounded border border-sky-400/70 bg-sky-50/70 dark:bg-sky-950/40 text-xs font-serif font-semibold text-sky-900 dark:text-sky-200 hover:border-sky-600 inline-flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors"
                      >
                        <FlaskConical className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
                        <span>Physics Lab Hub</span>
                      </button>
                    </div>
                  </div>
                </header>

                {showQuickReview && (
                  <QuickReviewDeck onClose={() => setShowQuickReview(false)} />
                )}

                {/* Table of Contents / Chapter Grid */}
                <RoadmapTracker
                  topics={trackTopics}
                  activeTopicId={selectedTopicId}
                  onSelectTopic={handleSelectTopic}
                />
              </div>
            )}
          </div>
        )}

        {/* TAB 2: UNIFIED PHYSICS LAB HUB */}
        {activeTab === 'simulation' && (
          <PhysicsLabHub
            selectedLabId={selectedLabId}
            onSelectLab={(labId) => {
              setSelectedLabId(labId);
              pushRouteHash(`#labs/${labId}`);
            }}
            onJumpToLesson={(track, topicId, slug) => handleOpenLesson(slug, track, topicId)}
          />
        )}

        {/* TAB 3: PROBLEM BANK */}
        {activeTab === 'problems' && <ProblemBankView />}

        {/* TAB 4: SAVED FORMULAS / DERIVATIONS */}
        {activeTab === 'saved' && (
          <SavedDerivationsView
            onGoToRoadmap={() => {
              handleTabSwitch('roadmap');
            }}
          />
        )}
      </main>

      {/* Global Search Modal (Cmd+K / Ctrl+K) */}
      {isSearchOpen && (
        <GlobalSearchModal
          onClose={() => setIsSearchOpen(false)}
          onSelectLesson={(track, topicId, slug) => handleOpenLesson(slug, track, topicId)}
          onSelectLab={(labId) => handleOpenLab(labId)}
          onSelectProblems={() => handleTabSwitch('problems')}
        />
      )}

      {/* Formula Sheet Reference Modal */}
      <FormulaSheetModal
        isOpen={isFormulaSheetOpen}
        onClose={() => setIsFormulaSheetOpen(false)}
      />

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={handleTabSwitch}
        onOpenFormulaSheet={() => setIsFormulaSheetOpen(true)}
      />
    </div>
  );
}
