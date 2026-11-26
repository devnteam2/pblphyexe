// src/components/interactive/CircuitBuilderLab.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { FormattedMathText } from '@/components/math/LatexRenderer';
import { Plus, Trash2, Power, Lightbulb, Cpu, Zap } from 'lucide-react';

type LoadKind = 'bulb' | 'resistor';

interface BranchNode {
  id: number;
  kind: LoadKind;
  ohms: number;
  closed: boolean;
}

export const CircuitBuilderLab: React.FC = () => {
  const [emf, setEmf] = useState<number>(12);
  const [mainSwitchOn, setMainSwitchOn] = useState<boolean>(true);
  const [seriesEnabled, setSeriesEnabled] = useState<boolean>(true);
  const [seriesKind, setSeriesKind] = useState<LoadKind>('resistor');
  const [seriesOhms, setSeriesOhms] = useState<number>(2);
  const [branches, setBranches] = useState<BranchNode[]>([
    { id: 1, kind: 'bulb', ohms: 6, closed: true },
    { id: 2, kind: 'bulb', ohms: 6, closed: true },
  ]);
  const [flowPhase, setFlowPhase] = useState<number>(0);

  // Electrical solver
  const activeSeriesR = seriesEnabled ? seriesOhms : 0;
  const closedBranches = branches.filter((b) => b.closed);
  const invRp = closedBranches.reduce((sum, b) => sum + 1 / Math.max(0.5, b.ohms), 0);
  const rParallel = invRp > 0 ? 1 / invRp : Infinity;
  const rTotal = !mainSwitchOn || closedBranches.length === 0 ? Infinity : activeSeriesR + rParallel;

  const iTotal = rTotal === Infinity ? 0 : emf / rTotal;
  const vSeries = iTotal * activeSeriesR;
  const vParallel = mainSwitchOn && closedBranches.length > 0 ? emf - vSeries : 0;
  const totalPower = emf * iTotal;

  useEffect(() => {
    if (!mainSwitchOn || iTotal <= 0.01) return;
    let rafId = 0;
    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      setFlowPhase((p) => (p + dt * Math.min(3.5, 0.3 + iTotal * 0.28)) % 1);
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [mainSwitchOn, iTotal]);

  const handleAddBranch = () => {
    if (branches.length >= 3) return;
    setBranches((prev) => [
      ...prev,
      { id: prev.reduce((mx, b) => Math.max(mx, b.id), 0) + 1, kind: 'bulb', ohms: 6, closed: true },
    ]);
  };

  const handleRemoveBranch = (id: number) => {
    if (branches.length <= 1) return;
    setBranches((prev) => prev.filter((b) => b.id !== id));
  };

  const handleUpdateBranch = (id: number, patch: Partial<BranchNode>) => {
    setBranches((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  };

  // Layout coordinates for up to 3 parallel branches between X=190 and X=385
  const branchYs =
    branches.length === 1 ? [112] : branches.length === 2 ? [76, 148] : [56, 112, 168];

  const bulbGlowAlpha = (powerW: number) => Math.min(0.95, powerW / 28);

  return (
    <div className="space-y-3.5 font-serif">
      {/* Header & Main Switch */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--ink-primary)]">
          <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>ต่อวงจรไฟฟ้า DC ด้วยตัวเอง (เพิ่ม/ลดกิ่งขนาน หลอดไฟ &amp; สวิตช์สด)</span>
        </div>

        <button
          type="button"
          onClick={() => setMainSwitchOn((s) => !s)}
          className={`px-3 py-1 rounded border text-xs font-mono font-bold inline-flex items-center gap-1.5 transition-colors ${
            mainSwitchOn
              ? 'bg-emerald-600 text-white border-emerald-700'
              : 'bg-rose-600 text-white border-rose-700'
          }`}
        >
          <Power className="w-3.5 h-3.5" />
          <span>สวิตช์หลัก: {mainSwitchOn ? 'ON (เปิดไฟ)' : 'OFF (ตัดวงจร)'}</span>
        </button>
      </div>

      {/* Live Interactive Circuit Schematic SVG */}
      <svg viewBox="0 0 460 212" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
        {/* Main Loop Rails: Left Battery X=44, Top Y=36, Junction X=180..396, Bottom Return Y=186 */}
        <path
          d={`M 44 92 L 44 36 L 180 36 L 180 ${branchYs[0]} M 44 134 L 44 186 L 396 186 L 396 ${branchYs[branchYs.length - 1]}`}
          fill="none"
          stroke={iTotal > 0 ? '#0284c7' : 'var(--ink-tertiary)'}
          strokeWidth={iTotal > 0 ? '2.5' : '1.8'}
        />
        {/* Vertical distribution rails at 180 and 396 */}
        {branches.length > 1 && (
          <>
            <line x1="180" y1={branchYs[0]} x2="180" y2={branchYs[branchYs.length - 1]} stroke="var(--ink-primary)" strokeWidth="2" />
            <line x1="396" y1={branchYs[0]} x2="396" y2={branchYs[branchYs.length - 1]} stroke="var(--ink-primary)" strokeWidth="2" />
          </>
        )}

        {/* Battery Symbol on Left */}
        <rect x="26" y="88" width="36" height="48" fill="var(--surface-card)" />
        <line x1="30" y1="102" x2="58" y2="102" stroke="var(--ink-primary)" strokeWidth="3" />
        <line x1="36" y1="112" x2="52" y2="112" stroke="var(--ink-primary)" strokeWidth="2" />
        <line x1="30" y1="122" x2="58" y2="122" stroke="var(--ink-primary)" strokeWidth="3" />
        <text x="14" y="114" fontSize="9.5" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
          {emf}V
        </text>

        {/* Main Switch Symbol at Top-Left */}
        <rect x="64" y="24" width="34" height="22" fill="var(--surface-card)" />
        <circle cx="66" cy="36" r="2.5" fill="var(--ink-primary)" />
        <circle cx="96" cy="36" r="2.5" fill="var(--ink-primary)" />
        <line
          x1="66"
          y1="36"
          x2={mainSwitchOn ? '96' : '92'}
          y2={mainSwitchOn ? '36' : '22'}
          stroke={mainSwitchOn ? '#16a34a' : '#dc2626'}
          strokeWidth="2.4"
        />

        {/* Optional Series Load at Top (X=112..166, Y=36) */}
        {seriesEnabled ? (
          seriesKind === 'bulb' ? (
            <g>
              {vSeries * iTotal > 0.2 && (
                <circle cx="138" cy="36" r={12 + Math.min(8, vSeries * iTotal * 0.4)} fill={`rgba(245, 158, 11, ${bulbGlowAlpha(vSeries * iTotal)})`} />
              )}
              <circle cx="138" cy="36" r="11" fill="var(--surface-card)" stroke="#d97706" strokeWidth="2" />
              <text x="138" y="39" fontSize="8.5" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
                {seriesOhms}Ω
              </text>
            </g>
          ) : (
            <g>
              <rect x="114" y="26" width="48" height="20" rx="3" fill="var(--surface-muted)" stroke="var(--ink-primary)" strokeWidth="1.8" />
              <text x="138" y="39" fontSize="9" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
                Rs={seriesOhms}Ω
              </text>
            </g>
          )
        ) : (
          <text x="138" y="29" fontSize="8" textAnchor="middle" fill="var(--ink-tertiary)" fontFamily="monospace">
            สายตรง (0Ω)
          </text>
        )}

        {/* Parallel Branches */}
        {branches.map((br, idx) => {
          const y = branchYs[idx];
          const bI = br.closed && mainSwitchOn ? vParallel / Math.max(0.5, br.ohms) : 0;
          const bPower = bI * bI * br.ohms;
          const dotX = 200 + ((flowPhase * (1 + bI * 0.35)) % 1) * 180;

          return (
            <g key={br.id}>
              {/* Branch wire */}
              <line
                x1="180"
                y1={y}
                x2="396"
                y2={y}
                stroke={bI > 0 ? '#0284c7' : 'var(--ink-tertiary)'}
                strokeWidth={bI > 0 ? '2.2' : '1.4'}
                strokeDasharray={br.closed ? undefined : '4 3'}
              />

              {/* Branch Switch dot near left rail */}
              <circle cx="204" cy={y} r="3" fill={br.closed ? '#16a34a' : '#dc2626'} />

              {/* Bulb or Resistor Component */}
              {br.kind === 'bulb' ? (
                <g>
                  {bPower > 0.15 && (
                    <circle
                      cx="288"
                      cy={y}
                      r={14 + Math.min(14, bPower * 0.38)}
                      fill={`rgba(245, 158, 11, ${bulbGlowAlpha(bPower)})`}
                    />
                  )}
                  <circle cx="288" cy={y} r="13" fill="var(--surface-card)" stroke={bPower > 0.15 ? '#d97706' : 'var(--ink-primary)'} strokeWidth="2" />
                  <text x="288" y={y + 3.5} fontSize="9" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
                    {br.ohms}Ω
                  </text>
                </g>
              ) : (
                <g>
                  <rect x="254" y={y - 11} width="68" height="22" rx="3" fill="var(--surface-muted)" stroke="var(--ink-primary)" strokeWidth="1.8" />
                  <text x="288" y={y + 3.5} fontSize="9.5" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
                    R{idx + 1}={br.ohms}Ω
                  </text>
                </g>
              )}

              {/* Branch Current Label & Moving Charge Dot */}
              <text x="360" y={y - 6} fontSize="8.5" textAnchor="middle" fill="#0284c7" fontFamily="monospace" fontWeight="bold">
                {bI.toFixed(2)}A
              </text>
              {bI > 0.02 && (
                <circle cx={dotX} cy={y} r="3.5" fill="#0284c7" />
              )}
            </g>
          );
        })}

        {/* Main loop current dots */}
        {iTotal > 0.02 && (
          <>
            <circle cx={44} cy={186 - ((flowPhase * 150) % 52)} r="3.5" fill="#0284c7" />
            <circle cx={396 - flowPhase * 340} cy={186} r="3.8" fill="#0284c7" />
          </>
        )}
      </svg>

      {/* Main Battery & Series Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <label className="p-2.5 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] space-y-1">
          <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
            <span>แรงดันแบตเตอรี่ ℰ</span>
            <strong className="text-[var(--ink-primary)]">{emf} V</strong>
          </div>
          <input
            type="range"
            min={3}
            max={24}
            step={1}
            value={emf}
            onChange={(e) => setEmf(parseInt(e.target.value, 10))}
            className="bridge-slider w-full cursor-pointer"
          />
        </label>

        <div className="p-2.5 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] space-y-1.5">
          <div className="flex items-center justify-between gap-2 font-mono text-[11px]">
            <button
              type="button"
              onClick={() => setSeriesEnabled((s) => !s)}
              className={`px-2 py-0.5 rounded border ${seriesEnabled ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold' : 'bg-[var(--surface-muted)] text-[var(--ink-secondary)]'}`}
            >
              โหลดอนุกรมหลัก: {seriesEnabled ? `${seriesOhms}Ω` : 'ปิด (ต่อตรง)'}
            </button>
            {seriesEnabled && (
              <button
                type="button"
                onClick={() => setSeriesKind((k) => (k === 'bulb' ? 'resistor' : 'bulb'))}
                className="px-2 py-0.5 rounded border border-[var(--hairline-border)] bg-[var(--surface-muted)]"
              >
                {seriesKind === 'bulb' ? '💡 หลอดไฟ' : '🎛️ ตัวต้านทาน'}
              </button>
            )}
          </div>
          {seriesEnabled && (
            <input
              type="range"
              min={1}
              max={12}
              step={1}
              value={seriesOhms}
              onChange={(e) => setSeriesOhms(parseInt(e.target.value, 10))}
              className="bridge-slider w-full cursor-pointer"
            />
          )}
        </div>
      </div>

      {/* Parallel Branches Builder */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono font-bold text-[var(--ink-secondary)]">
            กิ่งขนานในวงจร ({branches.length}/3 กิ่ง)
          </span>
          <button
            type="button"
            onClick={handleAddBranch}
            disabled={branches.length >= 3}
            className="min-h-[34px] px-3 py-1 rounded border border-sky-400/70 bg-sky-50/70 dark:bg-sky-950/40 text-xs font-serif font-semibold text-sky-900 dark:text-sky-200 disabled:opacity-40 inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>ต่อเพิ่มกิ่งขนาน</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {branches.map((br, idx) => {
            const bI = br.closed && mainSwitchOn ? vParallel / Math.max(0.5, br.ohms) : 0;
            const bP = bI * bI * br.ohms;
            return (
              <div key={br.id} className="p-2.5 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] space-y-2 text-xs">
                <div className="flex items-center justify-between gap-1 font-mono text-[11px]">
                  <span className="font-bold text-[var(--ink-primary)]">กิ่งที่ {idx + 1}</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleUpdateBranch(br.id, { kind: br.kind === 'bulb' ? 'resistor' : 'bulb' })}
                      className="px-1.5 py-0.5 rounded border border-[var(--hairline-border)] bg-[var(--surface-muted)] inline-flex items-center gap-1"
                      title="สลับหลอดไฟ / ตัวต้านทาน"
                    >
                      {br.kind === 'bulb' ? <Lightbulb className="w-3 h-3 text-amber-500" /> : <Cpu className="w-3 h-3" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdateBranch(br.id, { closed: !br.closed })}
                      className={`px-1.5 py-0.5 rounded border text-[10px] ${br.closed ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-[var(--surface-muted)] text-[var(--ink-tertiary)]'}`}
                    >
                      {br.closed ? 'ON' : 'OFF'}
                    </button>
                    {branches.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveBranch(br.id)}
                        className="p-1 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded"
                        aria-label="ลบกิ่งนี้"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                <label className="space-y-1 block">
                  <div className="flex justify-between font-mono text-[11px] text-[var(--ink-secondary)]">
                    <span>ความต้านทาน</span>
                    <strong className="text-[var(--ink-primary)]">{br.ohms} Ω</strong>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={16}
                    step={1}
                    value={br.ohms}
                    onChange={(e) => handleUpdateBranch(br.id, { ohms: parseInt(e.target.value, 10) })}
                    className="bridge-slider w-full cursor-pointer"
                  />
                </label>

                <div className="flex justify-between font-mono text-[10px] text-[var(--ink-tertiary)] pt-1 border-t border-[var(--hairline-border)]">
                  <span>I = {bI.toFixed(2)} A</span>
                  <span className="text-amber-700 dark:text-amber-400 font-bold">P = {bP.toFixed(1)} W</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Totals */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">ความต้านทานรวม R_eq</span>
          <span className="font-mono font-bold text-[var(--ink-primary)]">
            {rTotal === Infinity ? '∞ (เปิด)' : `${rTotal.toFixed(2)} Ω`}
          </span>
        </div>
        <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">กระแสรวมจากแบต I</span>
          <span className="font-mono font-bold text-sky-700 dark:text-sky-400">{iTotal.toFixed(2)} A</span>
        </div>
        <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">กำลังไฟรวม P = ℰI</span>
          <span className="font-mono font-bold text-amber-700 dark:text-amber-400">{totalPower.toFixed(1)} W</span>
        </div>
      </div>

      <div className="p-2.5 rounded border border-amber-300/80 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/30 text-[11px] sm:text-xs text-amber-950 dark:text-amber-200 leading-relaxed">
        <FormattedMathText
          text={'💡 **ลองทดสอบเอง:** กด **ต่อเพิ่มกิ่งขนาน** ขณะเปิดไฟ จะเห็น $R_{\\text{eq}}$ **ลดลง** และกระแสหลัก $I$ **พุ่งสูงขึ้น!** หากเปิดโหลดอนุกรม $R_s$ ไว้ด้วย กระแสที่เพิ่มขึ้นจะทำให้ความต่างศักย์ตกคร่อม $R_s$ ($I R_s$) กินแรงดันไปมากขึ้น จนหลอดไฟในกิ่งขนานหรี่ลงเล็กน้อย!'}
        />
      </div>
    </div>
  );
};
