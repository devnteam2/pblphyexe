// src/components/problems/ProblemBankView.tsx
'use client';

import React, { useState } from 'react';
import { POSN_PROBLEMS } from '@/data/problemsData';
import { ScaffoldedProblemCard } from './ScaffoldedProblemCard';
import { CURRICULUM_TOPICS } from '@/data/curriculumData';
import { CurriculumTrack, DifficultyLevel } from '@/types/curriculum';
import { Search, Filter, CheckCircle2, Layers, Compass } from 'lucide-react';
import { useStudentStore } from '@/store/useStudentStore';

const TRACK_FILTERS: { id: 'all' | CurriculumTrack; label: string }[] = [
  { id: 'all', label: 'ทุกหลักสูตร (All Tracks)' },
  { id: 'pre-camp-1', label: 'สอบเข้าค่าย 1 (Pre-Camp 1)' },
  { id: 'camp-1-2', label: 'เตรียมค่าย 1 → 2 (Calculus / K&K)' },
];

const DIFFICULTY_FILTERS: { id: 'all' | DifficultyLevel; label: string }[] = [
  { id: 'all', label: 'ทุกระดับ (All Levels)' },
  { id: 'PreCamp1_Entrance', label: 'สอบเข้าค่าย 1' },
  { id: 'Camp1_Foundation', label: 'Camp 1 Foundation' },
  { id: 'Camp1_Advanced', label: 'Camp 1 Advanced' },
  { id: 'Camp2_Core', label: 'Camp 2 Core' },
];

export const ProblemBankView: React.FC = () => {
  const { problemProgress } = useStudentStore();
  const [selectedTrack, setSelectedTrack] = useState<'all' | CurriculumTrack>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | DifficultyLevel>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const topicMap = new Map(CURRICULUM_TOPICS.map((t) => [t.id, t]));
  const visibleTopics = CURRICULUM_TOPICS.filter(
    (t) => selectedTrack === 'all' || t.track === selectedTrack
  );

  const filteredProblems = POSN_PROBLEMS.filter((p) => {
    const problemTrack = topicMap.get(p.topicId)?.track;
    const matchTrack = selectedTrack === 'all' || problemTrack === selectedTrack;
    const matchTopic = selectedTopic === 'all' || p.topicId === selectedTopic;
    const matchDifficulty = selectedDifficulty === 'all' || p.difficulty === selectedDifficulty;
    const q = searchQuery.trim().toLowerCase();
    const matchSearch =
      q === '' ||
      p.titleTh.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.sourceExam.toLowerCase().includes(q) ||
      p.statementTh.toLowerCase().includes(q);

    return matchTrack && matchTopic && matchDifficulty && matchSearch;
  });

  const totalMastered = POSN_PROBLEMS.filter(
    (p) => problemProgress[p.id]?.isMarkedMastered
  ).length;

  return (
    <div className="space-y-6 font-serif">
      {/* Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--hairline-border)]">
        <div>
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[var(--ink-tertiary)] block">
            § PROBLEM REPOSITORY
          </span>
          <h2 className="text-lg md:text-xl font-bold text-[var(--ink-primary)]">
            คลังข้อสอบ สอวน. ฟิสิกส์ (สอบเข้าค่าย 1 &amp; ค่าย 1–2)
          </h2>
          <p className="text-xs md:text-sm text-[var(--ink-secondary)]">
            โจทย์คัดสรรพร้อมคำใบ้ 3 ระดับ (Scaffolded Hints) ตั้งแต่ข้อสอบคัดเลือกเข้าค่าย 1 จนถึงกลศาสตร์แคลคูลัส
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <span className="text-xs px-2.5 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-[var(--ink-secondary)] font-mono">
            แสดง {filteredProblems.length}/{POSN_PROBLEMS.length} ข้อ
          </span>
          <span className="text-xs px-3 py-1 rounded border border-emerald-400/70 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            ผ่านแล้ว {totalMastered}/{POSN_PROBLEMS.length} ข้อ
          </span>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="p-4 rounded-lg bg-[var(--surface-card)] border border-[var(--hairline-border)] space-y-3 shadow-2xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-[var(--ink-tertiary)]" />
          <input
            type="text"
            placeholder="ค้นหาข้อสอบตามรหัส, ชื่อเรื่อง หรือคีย์เวิร์ด เช่น PRE-C1, Bernoulli, บริวสเตอร์, จรวด, ลิ่ม..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--surface-muted)] border border-[var(--hairline-border)] rounded pl-9 pr-4 py-1.5 text-xs md:text-sm text-[var(--ink-primary)] placeholder-[var(--ink-tertiary)] focus:outline-none focus:border-stone-500 font-serif"
          />
        </div>

        {/* Track Filter */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[var(--ink-secondary)] font-medium flex items-center gap-1 mr-1">
            <Compass className="w-3.5 h-3.5" /> เส้นทาง:
          </span>
          {TRACK_FILTERS.map((tf) => (
            <button
              key={tf.id}
              onClick={() => {
                setSelectedTrack(tf.id);
                setSelectedTopic('all');
              }}
              className={`px-2.5 py-1 rounded border transition-all ${
                selectedTrack === tf.id
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100 font-semibold shadow-2xs'
                  : 'bg-[var(--surface-muted)] text-[var(--ink-secondary)] border-[var(--hairline-border)] hover:text-[var(--ink-primary)]'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>

        {/* Chapter Filter */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs pt-2 border-t border-[var(--hairline-subtle)]">
          <span className="text-[var(--ink-secondary)] font-medium flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> บทเรียน:
          </span>
          <button
            onClick={() => setSelectedTopic('all')}
            className={`px-2.5 py-1 rounded border transition-all ${
              selectedTopic === 'all'
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100 font-semibold shadow-2xs'
                : 'bg-[var(--surface-muted)] text-[var(--ink-secondary)] border-[var(--hairline-border)] hover:text-[var(--ink-primary)]'
            }`}
          >
            ทั้งหมด
          </button>
          {visibleTopics.map((top) => {
            const chapterShort = top.titleTh.split('(')[0].trim();
            return (
              <button
                key={top.id}
                onClick={() => setSelectedTopic(top.id)}
                title={top.titleTh}
                className={`px-2.5 py-1 rounded border transition-all ${
                  selectedTopic === top.id
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100 font-semibold shadow-2xs'
                    : 'bg-[var(--surface-muted)] text-[var(--ink-secondary)] border-[var(--hairline-border)] hover:text-[var(--ink-primary)]'
                }`}
              >
                {top.track === 'pre-camp-1' ? `เข้าค่าย ${chapterShort}` : `ค่าย 1–2 ${chapterShort}`}
              </button>
            );
          })}
        </div>

        {/* Difficulty Filter */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs pt-2 border-t border-[var(--hairline-subtle)]">
          <span className="text-[var(--ink-secondary)] font-medium flex items-center gap-1 mr-1">
            <Layers className="w-3.5 h-3.5" /> ระดับ:
          </span>
          {DIFFICULTY_FILTERS.map((df) => (
            <button
              key={df.id}
              onClick={() => setSelectedDifficulty(df.id)}
              className={`px-2.5 py-0.5 rounded border font-mono text-[11px] transition-all ${
                selectedDifficulty === df.id
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100 font-semibold shadow-2xs'
                  : 'bg-[var(--surface-muted)] text-[var(--ink-secondary)] border-[var(--hairline-border)] hover:text-[var(--ink-primary)]'
              }`}
            >
              {df.label}
            </button>
          ))}
        </div>
      </div>

      {/* Problems List */}
      <div className="space-y-4">
        {filteredProblems.map((problem) => (
          <ScaffoldedProblemCard key={problem.id} problem={problem} />
        ))}

        {filteredProblems.length === 0 && (
          <div className="text-center py-12 rounded-lg border border-dashed border-[var(--hairline-border)] bg-[var(--surface-card)] text-[var(--ink-secondary)] text-sm">
            ไม่พบข้อสอบที่ตรงกับเงื่อนไขการค้นหา ลองล้างตัวกรองหรือเปลี่ยนคำค้นหา
          </div>
        )}
      </div>
    </div>
  );
};
