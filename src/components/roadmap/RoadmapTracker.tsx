// src/components/roadmap/RoadmapTracker.tsx
'use client';

import React from 'react';
import { Topic, TopicId } from '@/types/curriculum';
import { useStudentStore } from '@/store/useStudentStore';
import { POSN_PROBLEMS } from '@/data/problemsData';
import { FormattedMathText } from '@/components/math/LatexRenderer';
import { ChevronRight } from 'lucide-react';

interface RoadmapTrackerProps {
  topics: Topic[];
  activeTopicId: TopicId;
  onSelectTopic: (topicId: TopicId) => void;
}

export const RoadmapTracker: React.FC<RoadmapTrackerProps> = ({
  topics,
  activeTopicId,
  onSelectTopic,
}) => {
  const { completedLessonSlugs, problemProgress } = useStudentStore();

  return (
    <div className="space-y-4 font-serif">
      <div className="flex items-center justify-between pb-2 border-b border-[var(--hairline-border)]">
        <div>
          <h2 className="text-sm md:text-base font-bold text-[var(--ink-primary)] uppercase tracking-wider">
            § สารบัญเนื้อหาหลักสูตร (Table of Contents)
          </h2>
          <p className="text-xs text-[var(--ink-secondary)]">
            โครงสร้างการเรียนรู้แบบปูพื้นฐานแคลคูลัสสู่ฟิสิกส์โอลิมปิกระดับสูง
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {topics.map((top, idx) => {
          const isActive = top.id === activeTopicId;
          const totalLessons = top.lessons.length;
          const completedInTopic = top.lessons.filter((l) =>
            completedLessonSlugs.includes(l.slug)
          ).length;

          const topicProblems = POSN_PROBLEMS.filter((p) => p.topicId === top.id);
          const masteredInTopic = topicProblems.filter(
            (p) => problemProgress[p.id]?.isMarkedMastered
          ).length;

          const percent = totalLessons > 0 ? Math.round((completedInTopic / totalLessons) * 100) : 0;

          return (
            <div
              key={top.id}
              onClick={() => onSelectTopic(top.id)}
              className={`group p-4 rounded-lg border text-left cursor-pointer transition-all ${
                isActive
                  ? 'bg-[var(--surface-card)] border-stone-600 dark:border-stone-400 shadow-2xs'
                  : 'bg-[var(--surface-card)] border-[var(--hairline-border)] hover:border-stone-400 dark:hover:border-stone-600'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="font-mono text-[11px] font-bold text-stone-500 uppercase tracking-widest block">
                    CHAPTER {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-sm font-bold text-[var(--ink-primary)] group-hover:underline decoration-stone-400 underline-offset-2">
                    <FormattedMathText text={top.titleTh} />
                  </h3>
                </div>

                <ChevronRight className={`w-4 h-4 text-stone-400 transition-transform ${isActive ? 'translate-x-0.5 text-stone-900 dark:text-stone-100' : 'group-hover:translate-x-0.5'}`} />
              </div>

              <p className="text-xs text-[var(--ink-secondary)] line-clamp-2 mb-3">
                <FormattedMathText text={top.descriptionTh} />
              </p>

              {/* Progress Footer */}
              <div className="space-y-1.5 pt-2 border-t border-[var(--hairline-border)] text-[11px] font-serif">
                <div className="flex items-center justify-between text-[var(--ink-tertiary)]">
                  <span>บทเรียน: {completedInTopic}/{totalLessons}</span>
                  <span>โจทย์ผ่าน: {masteredInTopic}/{topicProblems.length}</span>
                </div>

                <div className="w-full h-1 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-stone-700 dark:bg-stone-300 transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
