// src/components/interactive/SnellFermatLab.tsx
'use client';

import React, { useState } from 'react';
import { FormattedMathText } from '@/components/math/LatexRenderer';
import { Sparkles, Zap } from 'lucide-react';

type OpticsProofMode = 'fermat' | 'tir-brewster';

export const SnellFermatLab: React.FC = () => {
  const [mode, setMode] = useState<OpticsProofMode>('fermat');

  // Mode 1: Fermat least time
  const [n1, setN1] = useState<number>(1.0);
  const [n2, setN2] = useState<number>(1.5);
  const [crossX, setCrossX] = useState<number>(4.5);

  // Mode 2: TIR & Brewster
  const [incDeg, setIncDeg] = useState<number>(42);
  const [matFromN, setMatFromN] = useState<number>(1.5);
  const [matToN, setMatToN] = useState<number>(1.0);

  // Fermat geometry: A = (0, a=4), B = (d=10, -b=-4)
  const totalD = 10;
  const hA = 4;
  const hB = 4;
  const travelTime = (x: number) =>
    n1 * Math.hypot(x, hA) + n2 * Math.hypot(totalD - x, hB); // units of L/c

  // Find exact Fermat optimum via binary search on monotone derivative dT/dx
  let lo = 0.01;
  let hi = totalD - 0.01;
  for (let i = 0; i < 40; i++) {
    const mid = 0.5 * (lo + hi);
    const dTdx =
      (n1 * mid) / Math.hypot(mid, hA) -
      (n2 * (totalD - mid)) / Math.hypot(totalD - mid, hB);
    if (dTdx < 0) lo = mid;
    else hi = mid;
  }
  const optX = 0.5 * (lo + hi);
  const minTime = travelTime(optX);
  const curTime = travelTime(crossX);

  const sinTheta1 = crossX / Math.hypot(crossX, hA);
  const sinTheta2 = (totalD - crossX) / Math.hypot(totalD - crossX, hB);
  const theta1Deg = (Math.asin(sinTheta1) * 180) / Math.PI;
  const theta2Deg = (Math.asin(sinTheta2) * 180) / Math.PI;
  const lhs = n1 * sinTheta1;
  const rhs = n2 * sinTheta2;
  const isAtSnellOpt = Math.abs(crossX - optX) < 0.22;

  // Fermat curve SVG plotting
  const maxCurveT = Math.max(travelTime(0.3), travelTime(totalD - 0.3));
  const minCurveT = minTime * 0.94;
  const curveToSvgX = (x: number) => 34 + (x / totalD) * 204;
  const curveToSvgY = (t: number) =>
    172 - ((t - minCurveT) / Math.max(0.1, maxCurveT - minCurveT)) * 136;

  const tCurvePath = Array.from({ length: 49 }, (_, i) => {
    const x = 0.2 + (i / 48) * (totalD - 0.4);
    return `${i === 0 ? 'M' : 'L'} ${curveToSvgX(x).toFixed(1)} ${curveToSvgY(travelTime(x)).toFixed(1)}`;
  }).join(' ');

  // TIR / Brewster calculations
  const incRad = (incDeg * Math.PI) / 180;
  const sinT2 = (matFromN * Math.sin(incRad)) / matToN;
  const isTir = sinT2 >= 1;
  const refrRad = isTir ? Math.PI / 2 : Math.asin(sinT2);
  const refrDeg = (refrRad * 180) / Math.PI;
  const critDeg = matFromN > matToN ? (Math.asin(matToN / matFromN) * 180) / Math.PI : null;
  const brewsterDeg = (Math.atan(matToN / matFromN) * 180) / Math.PI;
  const isNearBrewster = !isTir && Math.abs(incDeg - brewsterDeg) < 1.8;

  return (
    <div className="space-y-3.5 font-serif">
      {/* Header & Mode Switch */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--ink-primary)]">
          <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>พิสูจน์กฎของสเนลล์ (Fermat&apos;s Least Time) &amp; TIR / Brewster</span>
        </div>

        <div className="inline-flex rounded border border-[var(--hairline-border)] overflow-hidden text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setMode('fermat')}
            className={`px-2.5 py-1 ${mode === 'fermat' ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold' : 'bg-[var(--surface-card)] text-[var(--ink-secondary)]'}`}
          >
            พิสูจน์ Snell (เวลาสั้นสุด)
          </button>
          <button
            type="button"
            onClick={() => setMode('tir-brewster')}
            className={`px-2.5 py-1 border-l border-[var(--hairline-border)] ${mode === 'tir-brewster' ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold' : 'bg-[var(--surface-card)] text-[var(--ink-secondary)]'}`}
          >
            มุมวิกฤต (TIR) &amp; บริวสเตอร์
          </button>
        </div>
      </div>

      {mode === 'fermat' ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
              {[
                { label: 'อากาศ → น้ำ (1.0 → 1.33)', a: 1.0, b: 1.33 },
                { label: 'อากาศ → แก้ว (1.0 → 1.50)', a: 1.0, b: 1.5 },
                { label: 'อากาศ → เพชร (1.0 → 2.42)', a: 1.0, b: 2.42 },
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setN1(preset.a);
                    setN2(preset.b);
                  }}
                  className={`px-2 py-0.5 rounded border ${
                    Math.abs(n1 - preset.a) < 0.05 && Math.abs(n2 - preset.b) < 0.05
                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
                      : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setCrossX(Number(optX.toFixed(2)))}
              className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-mono font-bold inline-flex items-center gap-1"
            >
              <Zap className="w-3 h-3" />
              <span>กดล็อกจุดเวลาสั้นสุด (x* = {optX.toFixed(2)})</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Left: Medium Interface Ray Diagram */}
            <svg viewBox="0 0 260 195" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
              {/* Medium 2 shaded bottom */}
              <rect x="0" y="97" width="260" height="98" fill="rgba(2, 132, 199, 0.14)" />
              <line x1="0" y1="97" x2="260" y2="97" stroke="var(--ink-primary)" strokeWidth="1.5" />

              {/* Medium labels */}
              <text x="10" y="18" fontSize="9" fill="var(--ink-secondary)" fontFamily="monospace">
                ตัวกลาง 1: n₁ = {n1.toFixed(2)} (เร็วกว่า)
              </text>
              <text x="10" y="186" fontSize="9" fill="#0284c7" fontFamily="monospace" fontWeight="bold">
                ตัวกลาง 2: n₂ = {n2.toFixed(2)} (ช้าลง!)
              </text>

              {/* Normal line at x */}
              {(() => {
                const cx = 24 + (crossX / totalD) * 212;
                const ax = 24;
                const ay = 24;
                const bx = 236;
                const by = 170;
                const ox = 24 + (optX / totalD) * 212;
                return (
                  <>
                    {/* Faint true optimum ray for comparison */}
                    <path d={`M ${ax} ${ay} L ${ox} 97 L ${bx} ${by}`} fill="none" stroke="#16a34a" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.65" />

                    {/* Normal */}
                    <line x1={cx} y1="24" x2={cx} y2="170" stroke="var(--ink-tertiary)" strokeWidth="1.2" strokeDasharray="3 3" />

                    {/* Current chosen light path */}
                    <line x1={ax} y1={ay} x2={cx} y2="97" stroke="#d97706" strokeWidth="2.5" />
                    <line x1={cx} y1="97" x2={bx} y2={by} stroke="#0284c7" strokeWidth="2.5" />

                    <circle cx={ax} cy={ay} r="4.5" fill="#d97706" />
                    <text x={ax + 8} y={ay + 4} fontSize="9" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">A</text>

                    <circle cx={bx} cy={by} r="4.5" fill="#0284c7" />
                    <text x={bx - 12} y={by - 6} fontSize="9" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">B</text>

                    <circle cx={cx} cy="97" r="5" fill={isAtSnellOpt ? '#16a34a' : '#d97706'} stroke="var(--ink-primary)" strokeWidth="1.2" />
                    <text x={cx + 5} y="92" fontSize="8.5" fill="var(--ink-primary)" fontFamily="monospace">θ₁={theta1Deg.toFixed(1)}°</text>
                    <text x={cx - 46} y="114" fontSize="8.5" fill="#0284c7" fontFamily="monospace">θ₂={theta2Deg.toFixed(1)}°</text>
                  </>
                );
              })()}
            </svg>

            {/* Right: Travel Time T(x) Curve */}
            <svg viewBox="0 0 260 195" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
              <line x1="34" y1="172" x2="244" y2="172" stroke="var(--ink-tertiary)" strokeWidth="1.2" />
              <line x1="34" y1="172" x2="34" y2="20" stroke="var(--ink-tertiary)" strokeWidth="1.2" />
              <text x="140" y="188" fontSize="8.5" textAnchor="middle" fill="var(--ink-secondary)" fontFamily="monospace">ตำแหน่งรอยต่อ x</text>
              <text x="38" y="22" fontSize="8.5" fill="var(--ink-secondary)" fontFamily="monospace">เวลาเดินทางรวม T(x)</text>

              <path d={tCurvePath} fill="none" stroke="var(--ink-primary)" strokeWidth="2.2" />

              {/* Optimum minimum marker */}
              <circle cx={curveToSvgX(optX)} cy={curveToSvgY(minTime)} r="4" fill="#16a34a" />
              <text x={curveToSvgX(optX)} y={curveToSvgY(minTime) + 14} fontSize="8" textAnchor="middle" fill="#16a34a" fontFamily="monospace" fontWeight="bold">
                ต่ำสุด dT/dx=0
              </text>

              {/* Current point */}
              <circle cx={curveToSvgX(crossX)} cy={curveToSvgY(curTime)} r="5.5" fill={isAtSnellOpt ? '#16a34a' : '#d97706'} stroke="var(--ink-primary)" strokeWidth="1.2" />
            </svg>
          </div>

          {/* Crossing Slider */}
          <label className="space-y-1 block text-xs">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>เลื่อนตำแหน่งจุดหักเหบนรอยต่อ x</span>
              <strong className="text-[var(--ink-primary)]">
                x = {crossX.toFixed(2)} (จุดต่ำสุด x* = {optX.toFixed(2)})
              </strong>
            </div>
            <input
              type="range"
              min={0.5}
              max={totalD - 0.5}
              step={0.05}
              value={crossX}
              onChange={(e) => setCrossX(parseFloat(e.target.value))}
              className="bridge-slider w-full cursor-pointer"
            />
          </label>

          {/* Snell Check Cards */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
              <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">n₁ sin θ₁</span>
              <span className="font-mono font-bold text-amber-700 dark:text-amber-400">{lhs.toFixed(3)}</span>
            </div>
            <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
              <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">n₂ sin θ₂</span>
              <span className="font-mono font-bold text-sky-700 dark:text-sky-400">{rhs.toFixed(3)}</span>
            </div>
            <div className={`p-2 rounded border ${isAtSnellOpt ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40' : 'border-[var(--hairline-border)] bg-[var(--surface-card)]'}`}>
              <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">เวลาเดินทาง T(x)</span>
              <span className="font-mono font-bold text-[var(--ink-primary)]">{curTime.toFixed(2)} (ต่ำสุด {minTime.toFixed(2)})</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
            {[
              { label: 'แก้ว → อากาศ (1.50 → 1.00 : เกิด TIR)', a: 1.5, b: 1.0 },
              { label: 'น้ำ → อากาศ (1.33 → 1.00 : เกิด TIR)', a: 1.33, b: 1.0 },
              { label: 'อากาศ → แก้ว (1.00 → 1.50 : หาบริวสเตอร์)', a: 1.0, b: 1.5 },
            ].map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  setMatFromN(p.a);
                  setMatToN(p.b);
                }}
                className={`px-2 py-0.5 rounded border ${
                  Math.abs(matFromN - p.a) < 0.05 && Math.abs(matToN - p.b) < 0.05
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
                    : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <svg viewBox="0 0 460 205" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
            <rect x="0" y="102" width="460" height="103" fill="rgba(2, 132, 199, 0.12)" />
            <line x1="0" y1="102" x2="460" y2="102" stroke="var(--ink-primary)" strokeWidth="1.6" />
            <line x1="230" y1="16" x2="230" y2="190" stroke="var(--ink-tertiary)" strokeWidth="1.2" strokeDasharray="4 3" />

            <text x="14" y="20" fontSize="9.5" fill="var(--ink-secondary)" fontFamily="monospace">ตัวกลางบน: n₁ = {matFromN.toFixed(2)}</text>
            <text x="14" y="192" fontSize="9.5" fill="#0284c7" fontFamily="monospace">ตัวกลางล่าง: n₂ = {matToN.toFixed(2)}</text>

            {/* Incident ray (from upper-left to (230, 102)) */}
            <line
              x1={230 - 82 * Math.sin(incRad)}
              y1={102 - 82 * Math.cos(incRad)}
              x2="230"
              y2="102"
              stroke="#d97706"
              strokeWidth="2.6"
            />
            {/* Reflected ray (upper-right) */}
            <line
              x1="230"
              y1="102"
              x2={230 + 82 * Math.sin(incRad)}
              y2={102 - 82 * Math.cos(incRad)}
              stroke={isTir ? '#dc2626' : '#16a34a'}
              strokeWidth={isTir ? '3' : '2'}
              strokeDasharray={isTir ? undefined : '4 2'}
            />
            {/* Refracted ray (lower-right, unless TIR) */}
            {!isTir && (
              <line
                x1="230"
                y1="102"
                x2={230 + 82 * Math.sin(refrRad)}
                y2={102 + 82 * Math.cos(refrRad)}
                stroke="#0284c7"
                strokeWidth="2.6"
              />
            )}

            {/* Status label inside SVG */}
            <text x="345" y="34" fontSize="10" textAnchor="middle" fill={isTir ? '#dc2626' : isNearBrewster ? '#16a34a' : 'var(--ink-primary)'} fontFamily="monospace" fontWeight="bold">
              {isTir
                ? 'สะท้อนกลับหมด (TIR)!'
                : isNearBrewster
                ? 'มุมบริวสเตอร์ (ตั้งฉาก 90°!)'
                : `หักเห θ₂ = ${refrDeg.toFixed(1)}°`}
            </text>
          </svg>

          <label className="space-y-1 block text-xs">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>มุมตกกระทบ θ₁</span>
              <strong className="text-[var(--ink-primary)]">
                {incDeg}° {critDeg ? `(θ_c = ${critDeg.toFixed(1)}°)` : ''} • (θ_B = {brewsterDeg.toFixed(1)}°)
              </strong>
            </div>
            <input
              type="range"
              min={0}
              max={86}
              step={1}
              value={incDeg}
              onChange={(e) => setIncDeg(parseInt(e.target.value, 10))}
              className="bridge-slider w-full cursor-pointer"
            />
          </label>
        </>
      )}

      <div className="p-3 rounded border border-amber-300/80 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/30 text-xs text-amber-950 dark:text-amber-200 leading-relaxed">
        <FormattedMathText text="💡 **การพิสูจน์ของแฟร์มาต์:** แสงเดินทางตามเส้นทางที่ใช้เวลาน้อยที่สุด $T(x) = \\frac{n_1\\sqrt{x^2+a^2} + n_2\\sqrt{(d-x)^2+b^2}}{c}$ เมื่อหาอนุพันธ์ $\\frac{dT}{dx} = 0$ จะได้ $\\frac{n_1 x}{\\sqrt{x^2+a^2}} = \\frac{n_2 (d-x)}{\\sqrt{(d-x)^2+b^2}} \\implies n_1\\sin\\theta_1 = n_2\\sin\\theta_2$ ทันที!" />
      </div>
    </div>
  );
};
