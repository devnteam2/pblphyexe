// src/components/problems/ProblemBankView.tsx
'use client';

import React, { useState } from 'react';
import { POSN_PROBLEMS } from '@/data/problemsData';
import { ScaffoldedProblemCard } from './ScaffoldedProblemCard';
import { CURRICULUM_TOPICS } from '@/data/curriculumData';
import { Search, Filter, CheckCircle2 } from 'lucide-react';
import { useStudentStore } from '@/store/useStudentStore';

export const ProblemBankView: React.FC = () => {
  const { problemProgress } = useStudentStore();
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProblems = POSN_PROBLEMS.filter((p) => {
    const matchTopic = selectedTopic === 'all' || p.topicId === selectedTopic;
    const matchSearch =
      p.titleTh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.statementTh.toLowerCase().includes(searchQuery.toLowerCase());

    return matchTopic && matchSearch;
  });

  const totalMastered = POSN_PROBLEMS.filter(
    (p) => problemProgress[p.id]?.isMarkedMastered
  ).length;

  return (
    <div className="space-y-6">
      {/* Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
            <span>คลังข้อสอบเก่า สอวน. ฟิสิกส์ (POSN Exam Bank)</span>
          </h2>
          <p className="text-xs text-slate-400">
            โจทย์คัดสรรพร้อมคำใบ้ 3 ระดับ (Scaffolded Hints) และเฉลยแคลคูลัสฉบับสมบูรณ์
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs px-3 py-1 rounded-lg bg-zinc-950 border border-slate-800 text-emerald-400 font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            ผ่านแล้ว {totalMastered}/{POSN_PROBLEMS.length} ข้อ
          </span>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="p-4 rounded-xl bg-zinc-950/80 border border-slate-800 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="ค้นหาข้อสอบตามรหัส หรือชื่อโจทย์ เช่น POSN-C1, รอก, ลิ่ม, กลิ้ง, SHM..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs md:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> หัวข้อ:
          </span>
          <button
            onClick={() => setSelectedTopic('all')}
            className={`px-2.5 py-1 rounded-md border transition-all ${
              selectedTopic === 'all'
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                : 'bg-zinc-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            ทั้งหมด
          </button>
          {CURRICULUM_TOPICS.map((top) => (
            <button
              key={top.id}
              onClick={() => setSelectedTopic(top.id)}
              className={`px-2.5 py-1 rounded-md border transition-all ${
                selectedTopic === top.id
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                  : 'bg-zinc-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {top.titleTh.split('.')[0]}
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
          <div className="text-center py-12 text-slate-500 text-sm">
            ไม่พบข้อสอบที่ตรงกับเงื่อนไขการค้นหา
          </div>
        )}
      </div>
    </div>
  );
};
