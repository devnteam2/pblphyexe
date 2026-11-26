// src/components/simulation/PhysicsLabHub.tsx
'use client';

import React, { useRef, useState } from 'react';
import { LabCategory, LabCatalogItem, PHYSICS_LAB_CATALOG, HubLabId } from '@/data/labCatalog';
import { CurriculumTrack, TopicId } from '@/types/curriculum';
import { ConceptBridgeLab } from '@/components/interactive/ConceptBridgeLab';
import { RigidBodySimulationView } from './RigidBodySimulationView';
import { ArrowRight, BookOpen, FlaskConical, Gamepad2, GraduationCap, Search, Sparkles, X } from 'lucide-react';

interface PhysicsLabHubProps {
  selectedLabId: HubLabId;
  onSelectLab: (labId: HubLabId) => void;
  onJumpToLesson: (track: CurriculumTrack, topicId: TopicId, slug: string) => void;
}

const CATEGORY_META: Record<LabCategory, { label: string; icon: React.ReactNode }> = {
  flagship: {
    label: `แล็บไฮไลต์ & เกม (${PHYSICS_LAB_CATALOG.filter((l) => l.category === 'flagship').length})`,
    icon: <Gamepad2 className="w-3.5 h-3.5" />,
  },
  'pre-camp-1': {
    label: `Pre-Camp 1 (${PHYSICS_LAB_CATALOG.filter((l) => l.category === 'pre-camp-1').length})`,
    icon: <Sparkles className="w-3.5 h-3.5" />,
  },
  'camp-1-2': {
    label: `Camp 1–2 Calculus (${PHYSICS_LAB_CATALOG.filter((l) => l.category === 'camp-1-2').length})`,
    icon: <GraduationCap className="w-3.5 h-3.5" />,
  },
};

export const PhysicsLabHub: React.FC<PhysicsLabHubProps> = ({
  selectedLabId,
  onSelectLab,
  onJumpToLesson,
}) => {
  const activeItem: LabCatalogItem =
    PHYSICS_LAB_CATALOG.find((item) => item.id === selectedLabId) ?? PHYSICS_LAB_CATALOG[0];
  const [filterCat, setFilterCat] = useState<'all' | LabCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const stageRef = useRef<HTMLElement | null>(null);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const effectiveCat = normalizedQuery ? 'all' : filterCat;

  const visibleCatalog = PHYSICS_LAB_CATALOG.filter((item) => {
    const matchCat = effectiveCat === 'all' || item.category === effectiveCat;
    if (!matchCat) return false;
    if (!normalizedQuery) return true;
    const haystack = `${item.titleTh} ${item.subtitleTh} ${item.keywords} ${item.id}`.toLowerCase();
    return haystack.includes(normalizedQuery);
  });

  const handlePickLab = (labId: HubLabId) => {
    onSelectLab(labId);
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      stageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150 font-serif">
      {/* Lab Hub Header */}
      <header className="border-b border-[var(--hairline-border)] pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--ink-tertiary)]">
            <FlaskConical className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>OPENPOSN INTERACTIVE PHYSICS LAB HUB • {PHYSICS_LAB_CATALOG.length} SIMULATIONS</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-bold text-[var(--ink-primary)] tracking-tight">
            ศูนย์รวมแล็บจำลองฟิสิกส์ &amp; เกมฝึกคำนวณทุกหมวด
          </h1>
          <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
            ทดลองลากพารามิเตอร์ ยิงโพรเจกไทล์จริง ดูคลื่นแทรกสอด Buff/Debuff พิสูจน์กฎสเนลล์ด้วยกราฟแฟร์มาต์ และหมุนวัตถุแข็งเกร็งได้ทันทีจากหน้านี้
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="space-y-2.5 md:min-w-[360px]">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[var(--ink-tertiary)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาแล็บ เช่น นิวตัน, ดอปเพลอร์, แก๊ส, แสง, วงกลม..."
              aria-label="ค้นหาแล็บจำลองฟิสิกส์"
              className="w-full min-h-[38px] pl-8 pr-8 py-1.5 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-xs font-sans text-[var(--ink-primary)] placeholder:text-[var(--ink-tertiary)] focus:outline-none focus:border-stone-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="ล้างคำค้นหา"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--ink-tertiary)] hover:text-[var(--ink-primary)]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 text-xs font-mono">
            {(['all', 'pre-camp-1', 'flagship', 'camp-1-2'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setFilterCat(cat);
                  setSearchQuery('');
                }}
                className={`min-h-[34px] px-2.5 py-1 rounded border inline-flex items-center gap-1.5 transition-colors ${
                  effectiveCat === cat
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100 font-bold'
                    : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)] hover:border-stone-500'
                }`}
              >
                {cat === 'all' ? (
                  <span>ทั้งหมด ({PHYSICS_LAB_CATALOG.length})</span>
                ) : (
                  <>
                    {CATEGORY_META[cat].icon}
                    <span>{CATEGORY_META[cat].label}</span>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Lab Selector Grid */}
      <section className="max-h-[340px] overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {visibleCatalog.map((lab) => {
          const isSelected = lab.id === activeItem.id;
          return (
            <button
              key={lab.id}
              type="button"
              onClick={() => handlePickLab(lab.id)}
              className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-[var(--surface-card)] border-stone-800 dark:border-stone-200 ring-1 ring-stone-800 dark:ring-stone-200 shadow-xs'
                  : 'bg-[var(--surface-card)] border-[var(--hairline-border)] hover:border-stone-500'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink-tertiary)]">
                    {lab.category === 'flagship' ? 'FLAGSHIP LAB' : lab.category.toUpperCase()}
                  </span>
                  {isSelected && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900">
                      OPEN
                    </span>
                  )}
                </div>
                <h2 className="text-xs sm:text-sm font-bold text-[var(--ink-primary)] leading-snug">
                  {lab.titleTh}
                </h2>
              </div>
              <p className="text-[11px] text-[var(--ink-secondary)] mt-1.5 line-clamp-2">
                {lab.subtitleTh}
              </p>
            </button>
          );
        })}
        {visibleCatalog.length === 0 && (
          <div className="col-span-full p-6 text-center rounded border border-dashed border-[var(--hairline-border)] text-xs text-[var(--ink-secondary)]">
            ไม่พบแล็บที่ตรงกับ &quot;{searchQuery}&quot; — ลองค้นด้วยคำอื่นหรือกดปุ่มทั้งหมด
          </div>
        )}
      </section>

      {/* Active Simulation Stage */}
      <section ref={stageRef} className="rounded-lg border border-[var(--hairline-border)] bg-[var(--surface-muted)] p-4 sm:p-6 space-y-4 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--hairline-border)]">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--ink-tertiary)] block">
              ACTIVE SIMULATION STAGE
            </span>
            <h2 className="text-base sm:text-lg font-bold text-[var(--ink-primary)]">
              {activeItem.titleTh}
            </h2>
          </div>

          {activeItem.relatedLesson && (
            <button
              type="button"
              onClick={() =>
                onJumpToLesson(
                  activeItem.relatedLesson!.track,
                  activeItem.relatedLesson!.topicId,
                  activeItem.relatedLesson!.slug
                )
              }
              className="min-h-[38px] px-3 py-1.5 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] hover:border-stone-500 text-xs font-serif font-semibold text-[var(--ink-primary)] inline-flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>อ่านบทเรียนและบทพิสูจน์</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {activeItem.id === 'rigid-body' ? (
          <RigidBodySimulationView />
        ) : (
          <ConceptBridgeLab key={activeItem.id} labId={activeItem.id} />
        )}
      </section>
    </div>
  );
};
