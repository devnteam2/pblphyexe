// src/components/roadmap/RoadmapTracker.tsx
'use client';

import React from 'react';
import { Topic, TopicId } from '@/types/curriculum';
import { useStudentStore } from '@/store/useStudentStore';
import { POSN_PROBLEMS } from '@/data/problemsData';
import {
  Binary,
  Activity,
  Compass,
  Zap,
  RotateCw,
  Repeat,
  CheckCircle,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

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

  const getTopicIcon = (iconName: string, active: boolean) => {
    const iconClass = `w-5 h-5 ${active ? 'text-white' : 'text-slate-400'}`;
    switch (iconName) {
      case 'Binary':
        return <Binary className={iconClass} />;
      case 'Activity':
        return <Activity className={iconClass} />;
      case 'Compass':
        return <Compass className={iconClass} />;
      case 'Zap':
        return <Zap className={iconClass} />;
      case 'RotateCw':
        return <RotateCw className={iconClass} />;
      case 'Repeat':
        return <Repeat className={iconClass} />;
      default:
        return <BookOpen className={iconClass} />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-sm md:text-base font-bold text-white uppercase tracking-wider">
            แผนผังหลักสูตร สอวน. ฟิสิกส์ (Linear Roadmap)
          </h2>
          <p className="text-xs text-slate-400">
            เรียนรู้ตามลำดับตรรกะจากเครื่องมือแคลคูลัสสู่ฟิสิกส์ขั้นสูง
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
              className={`group relative p-4 rounded-xl border text-left cursor-pointer transition-all duration-200 overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-br from-[#0c1220] to-[#080b12] border-sky-500/80 shadow-[0_0_20px_rgba(56,189,248,0.15)] ring-1 ring-sky-500/30'
                  : 'bg-zinc-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-zinc-900/60'
              }`}
            >
              {/* Top Accent Line */}
              <div
                className="absolute top-0 left-0 right-0 h-1 transition-opacity"
                style={{
                  backgroundColor: top.colorAccent,
                  opacity: isActive ? 1 : 0.4,
                }}
              />

              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center border"
                    style={{
                      borderColor: `${top.colorAccent}40`,
                      backgroundColor: `${top.colorAccent}15`,
                    }}
                  >
                    {getTopicIcon(top.iconName, isActive)}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      โมดูลที่ {idx + 1}
                    </span>
                    <h3 className="text-xs md:text-sm font-bold text-white line-clamp-1 group-hover:text-sky-300 transition-colors">
                      {top.titleTh.replace(/^\d+\.\s*/, '')}
                    </h3>
                  </div>
                </div>

                <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${isActive ? 'translate-x-0.5 text-sky-400' : 'group-hover:translate-x-0.5'}`} />
              </div>

              <p className="text-[11px] text-slate-400 line-clamp-2 mb-3">
                {top.descriptionTh}
              </p>

              {/* Progress and Stats */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800/60 text-[11px]">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-sky-400" />
                    บทเรียน: {completedInTopic}/{totalLessons}
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    โจทย์ผ่าน: {masteredInTopic}/{topicProblems.length}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 rounded-full bg-zinc-900 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: top.colorAccent,
                    }}
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
