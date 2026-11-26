// src/components/simulation/PhysicsLabHub.tsx
'use client';

import React, { useState } from 'react';
import {
  LAB_DOMAINS,
  LabCatalogItem,
  LabDomain,
  PHYSICS_LAB_CATALOG,
  HubLabId,
} from '@/data/labCatalog';
import { CurriculumTrack, TopicId } from '@/types/curriculum';
import { ConceptBridgeLab } from '@/components/interactive/ConceptBridgeLab';
import { RigidBodySimulationView } from './RigidBodySimulationView';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Flame,
  FlaskConical,
  GraduationCap,
  Scale,
  Search,
  Sparkles,
  Sun,
  Waves,
  X,
  Zap,
} from 'lucide-react';

interface PhysicsLabHubProps {
  selectedLabId: HubLabId | null;
  onSelectLab: (labId: HubLabId) => void;
  onBackToDirectory: () => void;
  onJumpToLesson: (track: CurriculumTrack, topicId: TopicId, slug: string) => void;
}

const DOMAIN_ICONS: Record<LabDomain, React.ReactNode> = {
  mechanics: <Scale className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
  'fluids-thermal': <Flame className="w-4 h-4 text-orange-600 dark:text-orange-400" />,
  'electricity-magnetism': <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
  optics: <Sun className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
  'waves-sound': <Waves className="w-4 h-4 text-sky-600 dark:text-sky-400" />,
  'olympiad-calculus': <GraduationCap className="w-4 h-4 text-stone-700 dark:text-stone-300" />,
};

export const PhysicsLabHub: React.FC<PhysicsLabHubProps> = ({
  selectedLabId,
  onSelectLab,
  onBackToDirectory,
  onJumpToLesson,
}) => {
  const [activeDomain, setActiveDomain] = useState<'all' | LabDomain>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeItem: LabCatalogItem | null = selectedLabId
    ? PHYSICS_LAB_CATALOG.find((item) => item.id === selectedLabId) ?? PHYSICS_LAB_CATALOG[0]
    : null;

  // =========================================================================
  // VIEW 1: DEDICATED FULL-FOCUS LAB PAGE (#labs/<labId>)
  // =========================================================================
  if (activeItem) {
    const domainMeta =
      LAB_DOMAINS.find((d) => d.id === activeItem.domain) ?? LAB_DOMAINS[0];
    const domainLabs = PHYSICS_LAB_CATALOG.filter((l) => l.domain === activeItem.domain);
    const idxInDomain = domainLabs.findIndex((l) => l.id === activeItem.id);
    const prevLab = idxInDomain > 0 ? domainLabs[idxInDomain - 1] : null;
    const nextLab =
      idxInDomain >= 0 && idxInDomain < domainLabs.length - 1
        ? domainLabs[idxInDomain + 1]
        : null;
    const isCamp2 = activeItem.relatedLesson?.track === 'camp-1-2';

    return (
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5 animate-in fade-in duration-150 font-serif">
        {/* Clean Back & Lesson Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--hairline-border)]">
          <button
            type="button"
            onClick={onBackToDirectory}
            className="min-h-[42px] px-3.5 py-2 rounded-xl border border-[var(--hairline-border)] bg-[var(--surface-card)] hover:border-stone-500 text-xs font-semibold text-[var(--ink-primary)] inline-flex items-center gap-1.5 transition-colors active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>กลับหน้ารวมแล็บ</span>
          </button>

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
              className="min-h-[42px] px-3.5 py-2 rounded-xl border border-amber-300/80 dark:border-amber-800 bg-amber-50/75 dark:bg-amber-950/35 hover:border-amber-500 text-xs font-semibold text-amber-950 dark:text-amber-200 inline-flex items-center gap-1.5 transition-colors active:scale-95"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>อ่านบทเรียนและบทพิสูจน์</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          )}
        </div>

        {/* Dedicated Lab Hero Header */}
        <header className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border font-semibold ${domainMeta.badgeClass}`}
            >
              {DOMAIN_ICONS[domainMeta.id]}
              <span>
                {domainMeta.titleTh} ({domainMeta.subtitleEn})
              </span>
            </span>
            <span className="px-2 py-0.5 rounded-full border border-[var(--hairline-border)] bg-[var(--surface-muted)] text-[var(--ink-secondary)] font-semibold">
              {isCamp2 ? 'ค่าย 1 → ค่าย 2' : 'เตรียมสอบเข้าค่าย 1'}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-[var(--ink-primary)] tracking-tight leading-snug">
            {activeItem.titleTh}
          </h1>

          <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
            {activeItem.subtitleTh}
          </p>
        </header>

        {/* Quick-Start Plain-Thai Tip Strip */}
        <div className="rounded-xl border border-sky-200/90 dark:border-sky-800/70 bg-sky-50/75 dark:bg-sky-950/30 px-3.5 py-2.5 flex items-start gap-2.5 text-xs sm:text-sm text-sky-950 dark:text-sky-100 leading-relaxed">
          <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
          <p className="m-0">
            <strong className="font-bold">วิธีลองเล่นง่ายๆ: </strong>
            {activeItem.quickTipTh}
          </p>
        </div>

        {/* Full-Focus Simulation Stage */}
        <section className="rounded-2xl border border-[var(--hairline-border)] bg-[var(--surface-card)] p-3.5 sm:p-6 shadow-xs sim-stage">
          {activeItem.id === 'rigid-body' ? (
            <RigidBodySimulationView />
          ) : (
            <ConceptBridgeLab key={activeItem.id} labId={activeItem.id} />
          )}
        </section>

        {/* Bottom Prev / Directory / Next Domain Lab Bar */}
        <footer className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[var(--hairline-border)]">
          {prevLab ? (
            <button
              type="button"
              onClick={() => onSelectLab(prevLab.id)}
              className="min-h-[42px] px-3 py-2 rounded-xl border border-[var(--hairline-border)] bg-[var(--surface-card)] hover:border-stone-500 text-xs font-medium text-[var(--ink-primary)] inline-flex items-center gap-1.5 max-w-[46%] sm:max-w-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{prevLab.titleTh.split('(')[0].trim()}</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={onBackToDirectory}
            className="hidden sm:inline-flex min-h-[42px] px-3.5 py-2 rounded-xl border border-[var(--hairline-border)] bg-[var(--surface-muted)] text-xs font-medium text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
          >
            หน้ารวมแล็บ ({domainMeta.shortLabelTh})
          </button>

          {nextLab ? (
            <button
              type="button"
              onClick={() => onSelectLab(nextLab.id)}
              className="min-h-[42px] px-3.5 py-2 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 text-xs font-semibold inline-flex items-center gap-1.5 max-w-[48%] sm:max-w-xs ml-auto sm:ml-0"
            >
              <span className="truncate">{nextLab.titleTh.split('(')[0].trim()}</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onBackToDirectory}
              className="min-h-[42px] px-3.5 py-2 rounded-xl border border-[var(--hairline-border)] bg-[var(--surface-muted)] text-xs font-semibold text-[var(--ink-primary)] inline-flex items-center gap-1.5"
            >
              <span>กลับหน้ารวมแล็บทั้งหมด</span>
            </button>
          )}
        </footer>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: CLEAN SUBJECT-SEPARATED LAB DIRECTORY (#labs — ZERO SIMULATIONS!)
  // =========================================================================
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const effectiveDomain = normalizedQuery ? 'all' : activeDomain;

  const domainCounts = LAB_DOMAINS.reduce<Record<LabDomain, number>>(
    (acc, dom) => {
      acc[dom.id] = PHYSICS_LAB_CATALOG.filter((l) => l.domain === dom.id).length;
      return acc;
    },
    {
      mechanics: 0,
      'fluids-thermal': 0,
      'electricity-magnetism': 0,
      optics: 0,
      'waves-sound': 0,
      'olympiad-calculus': 0,
    }
  );

  const visibleDomainGroups = LAB_DOMAINS.filter(
    (dom) => effectiveDomain === 'all' || dom.id === effectiveDomain
  )
    .map((dom) => {
      const labs = PHYSICS_LAB_CATALOG.filter((item) => {
        if (item.domain !== dom.id) return false;
        if (!normalizedQuery) return true;
        const hay = `${item.titleTh} ${item.subtitleTh} ${item.quickTipTh} ${item.keywords} ${dom.titleTh}`.toLowerCase();
        return hay.includes(normalizedQuery);
      });
      return { domain: dom, labs };
    })
    .filter((group) => group.labs.length > 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-150 font-serif">
      {/* Clean Directory Header */}
      <header className="space-y-4 border-b border-[var(--hairline-border)] pb-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[var(--ink-tertiary)]">
              <FlaskConical className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>INTERACTIVE PHYSICS LABS • {PHYSICS_LAB_CATALOG.length} SIMULATIONS</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-bold text-[var(--ink-primary)] tracking-tight leading-snug">
              ห้องทดลองฟิสิกส์จำลอง (เลือกตามหมวดวิชา)
            </h1>
            <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
              แยกหมวดวิชาชัดเจน — แตะแล็บที่สนใจเพื่อเปิดหน้าทดลองเต็มจอ ใช้งานง่ายบนมือถือ
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="w-4 h-4 text-[var(--ink-tertiary)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาแล็บ เช่น นิวตัน, แก๊ส, ดอปเพลอร์, แสง..."
              aria-label="ค้นหาแล็บจำลองฟิสิกส์"
              className="w-full min-h-[42px] pl-9 pr-9 py-2 rounded-xl border border-[var(--hairline-border)] bg-[var(--surface-card)] text-xs sm:text-sm font-sans text-[var(--ink-primary)] placeholder:text-[var(--ink-tertiary)] focus:outline-none focus:border-stone-500 shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="ล้างคำค้นหา"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[var(--ink-tertiary)] hover:text-[var(--ink-primary)]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Horizontal Scrollable Subject Domain Chips on Mobile */}
        <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1 text-xs font-mono">
          <button
            type="button"
            onClick={() => {
              setActiveDomain('all');
              setSearchQuery('');
            }}
            className={`min-h-[36px] shrink-0 px-3 py-1.5 rounded-full border inline-flex items-center gap-1.5 transition-colors ${
              effectiveDomain === 'all'
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100 font-bold'
                : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)] hover:border-stone-500'
            }`}
          >
            <span>ทุกหมวด ({PHYSICS_LAB_CATALOG.length})</span>
          </button>

          {LAB_DOMAINS.map((dom) => (
            <button
              key={dom.id}
              type="button"
              onClick={() => {
                setActiveDomain(dom.id);
                setSearchQuery('');
              }}
              className={`min-h-[36px] shrink-0 px-3 py-1.5 rounded-full border inline-flex items-center gap-1.5 transition-colors ${
                effectiveDomain === dom.id
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100 font-bold'
                  : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)] hover:border-stone-500'
              }`}
            >
              {DOMAIN_ICONS[dom.id]}
              <span>
                {dom.shortLabelTh} ({domainCounts[dom.id]})
              </span>
            </button>
          ))}
        </div>
      </header>

      {/* Subject-Separated Lab Sections */}
      {visibleDomainGroups.length > 0 ? (
        <div className="space-y-8">
          {visibleDomainGroups.map(({ domain, labs }) => (
            <section key={domain.id} className="space-y-3">
              {/* Subject Domain Heading */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-[var(--hairline-border)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg border border-[var(--hairline-border)] bg-[var(--surface-card)] flex items-center justify-center shrink-0">
                    {DOMAIN_ICONS[domain.id]}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base sm:text-lg font-bold text-[var(--ink-primary)]">
                        {domain.titleTh}
                      </h2>
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--ink-tertiary)]">
                        {domain.subtitleEn}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--ink-secondary)]">{domain.descriptionTh}</p>
                  </div>
                </div>

                <span
                  className={`self-start sm:self-center shrink-0 font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${domain.badgeClass}`}
                >
                  {labs.length} แล็บ
                </span>
              </div>

              {/* Clean Lab Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {labs.map((lab) => {
                  const isCamp2 = lab.relatedLesson?.track === 'camp-1-2';
                  return (
                    <button
                      key={lab.id}
                      type="button"
                      onClick={() => onSelectLab(lab.id)}
                      className="group p-4 rounded-xl border border-[var(--hairline-border)] bg-[var(--surface-card)] hover:border-stone-500 dark:hover:border-stone-400 hover:shadow-xs active:scale-[0.99] text-left transition-all flex flex-col justify-between gap-3 cursor-pointer"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-semibold border ${
                              isCamp2
                                ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 border-amber-300/70 dark:border-amber-800'
                                : 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border-emerald-300/70 dark:border-emerald-800'
                            }`}
                          >
                            {isCamp2 ? 'ค่าย 1–2' : 'สอบเข้าค่าย 1'}
                          </span>
                          <span className="text-[11px] font-mono font-semibold text-sky-700 dark:text-sky-400 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                            <span>เปิดแล็บ</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>

                        <h3 className="text-sm sm:text-base font-bold text-[var(--ink-primary)] leading-snug group-hover:underline decoration-stone-400 underline-offset-2">
                          {lab.titleTh}
                        </h3>
                      </div>

                      <p className="text-xs text-[var(--ink-secondary)] leading-relaxed line-clamp-2">
                        {lab.subtitleTh}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center rounded-2xl border border-dashed border-[var(--hairline-border)] bg-[var(--surface-card)] space-y-3">
          <p className="text-sm text-[var(--ink-secondary)]">
            ไม่พบแล็บที่ตรงกับ &quot;{searchQuery}&quot;
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveDomain('all');
            }}
            className="min-h-[38px] px-4 py-1.5 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-semibold"
          >
            แสดงทั้งหมด {PHYSICS_LAB_CATALOG.length} แล็บ
          </button>
        </div>
      )}
    </div>
  );
};
