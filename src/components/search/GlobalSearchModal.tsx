// src/components/search/GlobalSearchModal.tsx
'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CURRICULUM_TOPICS } from '@/data/curriculumData';
import { POSN_PROBLEMS } from '@/data/problemsData';
import { HubLabId, PHYSICS_LAB_CATALOG } from '@/data/labCatalog';
import { CurriculumTrack, TopicId } from '@/types/curriculum';
import { Search, X, BookOpen, FlaskConical, HelpCircle, Sigma, ArrowRight } from 'lucide-react';

interface GlobalSearchModalProps {
  onClose: () => void;
  onSelectLesson: (track: CurriculumTrack, topicId: TopicId, slug: string) => void;
  onSelectLab: (labId: HubLabId) => void;
  onSelectProblems: () => void;
}

type SearchEntry =
  | {
      kind: 'lab';
      id: string;
      title: string;
      subtitle: string;
      badge: string;
      searchText: string;
      labId: HubLabId;
    }
  | {
      kind: 'lesson';
      id: string;
      title: string;
      subtitle: string;
      badge: string;
      searchText: string;
      track: CurriculumTrack;
      topicId: TopicId;
      slug: string;
    }
  | {
      kind: 'derivation';
      id: string;
      title: string;
      subtitle: string;
      badge: string;
      searchText: string;
      track: CurriculumTrack;
      topicId: TopicId;
      slug: string;
    }
  | {
      kind: 'problem';
      id: string;
      title: string;
      subtitle: string;
      badge: string;
      searchText: string;
    };

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  onClose,
  onSelectLesson,
  onSelectLab,
  onSelectProblems,
}) => {
  const [query, setQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const allEntries = useMemo<SearchEntry[]>(() => {
    const entries: SearchEntry[] = [];

    for (const lab of PHYSICS_LAB_CATALOG) {
      entries.push({
        kind: 'lab',
        id: `lab-${lab.id}`,
        title: lab.titleTh,
        subtitle: lab.subtitleTh,
        badge: 'Interactive Lab',
        searchText: `${lab.titleTh} ${lab.subtitleTh} ${lab.keywords}`.toLowerCase(),
        labId: lab.id,
      });
    }

    for (const topic of CURRICULUM_TOPICS) {
      for (const lesson of topic.lessons) {
        entries.push({
          kind: 'lesson',
          id: `lesson-${lesson.id}`,
          title: lesson.titleTh,
          subtitle: `${topic.titleTh} • ${lesson.summaryTh}`,
          badge: topic.track === 'pre-camp-1' ? 'Pre-Camp 1' : 'Camp 1–2',
          searchText: `${topic.titleTh} ${topic.subtitleTh} ${lesson.titleTh} ${lesson.summaryTh}`.toLowerCase(),
          track: topic.track,
          topicId: topic.id,
          slug: lesson.slug,
        });

        for (const deriv of lesson.derivations) {
          entries.push({
            kind: 'derivation',
            id: `deriv-${deriv.id}`,
            title: deriv.titleTh,
            subtitle: `ในบท ${lesson.titleTh} • ${deriv.objectiveTh}`,
            badge: 'บทพิสูจน์',
            searchText: `${deriv.titleTh} ${deriv.objectiveTh} ${lesson.titleTh}`.toLowerCase(),
            track: topic.track,
            topicId: topic.id,
            slug: lesson.slug,
          });
        }
      }
    }

    for (const prob of POSN_PROBLEMS) {
      entries.push({
        kind: 'problem',
        id: `prob-${prob.id}`,
        title: `${prob.code}: ${prob.titleTh}`,
        subtitle: prob.sourceExam,
        badge: 'คลังโจทย์',
        searchText: `${prob.code} ${prob.titleTh} ${prob.sourceExam} ${prob.statementTh}`.toLowerCase(),
      });
    }

    return entries;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return allEntries.slice(0, 10);
    }
    const terms = q.split(/\s+/).filter(Boolean);
    return allEntries.filter((entry) => terms.every((term) => entry.searchText.includes(term))).slice(0, 20);
  }, [allEntries, query]);

  const handleSelect = (item: SearchEntry) => {
    onClose();
    if (item.kind === 'lab') {
      onSelectLab(item.labId);
    } else if (item.kind === 'problem') {
      onSelectProblems();
    } else {
      onSelectLesson(item.track, item.topicId, item.slug);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-black/55 backdrop-blur-xs animate-in fade-in duration-150 font-serif"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-lg border border-[var(--hairline-border)] bg-[var(--bg-monograph)] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <Search className="w-4 h-4 text-[var(--ink-tertiary)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาบทเรียน บทพิสูจน์ แล็บจำลอง หรือโจทย์ (เช่น โพรเจกไทล์, คลื่น, สเนลล์, คอริโอลิส)..."
            className="w-full bg-transparent text-sm text-[var(--ink-primary)] placeholder:text-[var(--ink-tertiary)] focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-[var(--ink-tertiary)] hover:text-[var(--ink-primary)]"
            aria-label="ปิดหน้าต่างค้นหา"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto p-2 space-y-1">
          {!query.trim() && (
            <div className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--ink-tertiary)]">
              แนะนำ — แล็บจำลองและเกมฝึกหัดยอดนิยม
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-[var(--ink-secondary)]">
              ไม่พบเนื้อหาที่ตรงกับ &quot;{query}&quot; — ลองค้นด้วยคำสั้นลง เช่น แรงเสียดทาน, สเนลล์, คลื่น, จรวด
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item)}
                className="w-full text-left p-2.5 rounded border border-transparent hover:border-[var(--hairline-border)] hover:bg-[var(--surface-card)] flex items-center justify-between gap-3 transition-colors group"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="p-1.5 rounded border border-[var(--hairline-border)] bg-[var(--surface-muted)] text-[var(--ink-primary)] shrink-0 mt-0.5">
                    {item.kind === 'lab' ? (
                      <FlaskConical className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                    ) : item.kind === 'derivation' ? (
                      <Sigma className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    ) : item.kind === 'problem' ? (
                      <HelpCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <BookOpen className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-[var(--surface-muted)] border border-[var(--hairline-border)] text-[var(--ink-secondary)] shrink-0">
                        {item.badge}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[var(--ink-primary)] truncate">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--ink-secondary)] truncate mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[var(--ink-tertiary)] group-hover:text-[var(--ink-primary)] shrink-0" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
