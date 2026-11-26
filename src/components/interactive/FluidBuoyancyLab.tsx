// src/components/interactive/FluidBuoyancyLab.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FormattedMathText } from '@/components/math/LatexRenderer';
import { Droplets, Sparkles } from 'lucide-react';

type FluidMode = 'buoyancy' | 'torricelli';
type TorricelliSub = 'jet' | 'hydraulic';

const G = 10;

const OBJ_PRESETS = [
  { label: 'ไม้ (600)', rho: 600 },
  { label: 'น้ำแข็ง (917)', rho: 917 },
  { label: 'อะลูมิเนียม (2700)', rho: 2700 },
  { label: 'ทองคำ (19300)', rho: 19300 },
];

const FLUID_PRESETS = [
  { label: 'น้ำมัน (800)', rho: 800, color: 'rgba(234, 179, 8, 0.25)' },
  { label: 'น้ำจืด (1000)', rho: 1000, color: 'rgba(14, 165, 233, 0.25)' },
  { label: 'น้ำทะเล (1030)', rho: 1030, color: 'rgba(2, 132, 199, 0.30)' },
  { label: 'ปรอท (13600)', rho: 13600, color: 'rgba(100, 116, 139, 0.35)' },
];

export const FluidBuoyancyLab: React.FC = () => {
  const [mode, setMode] = useState<FluidMode>('buoyancy');

  // Mode 1: Buoyancy state
  const [rhoObj, setRhoObj] = useState<number>(600);
  const [rhoFluid, setRhoFluid] = useState<number>(1000);
  const blockVol = 0.01; // 10 L = 0.01 m^3

  const targetSubFrac = Math.min(1, rhoObj / rhoFluid);
  // Target block top-Y relative to surface (block height = 46px in SVG)
  const blockHeightPx = 46;
  const floorY = 192;
  const baseSurfaceY = 92;

  const [yPos, setYPos] = useState<number>(baseSurfaceY - (1 - targetSubFrac) * blockHeightPx);
  const buoyAnimRef = useRef({ y: baseSurfaceY - (1 - targetSubFrac) * blockHeightPx, vy: 0 });
  const targetYRef = useRef(baseSurfaceY - (1 - targetSubFrac) * blockHeightPx);

  useEffect(() => {
    targetYRef.current =
      rhoObj > rhoFluid
        ? floorY - blockHeightPx
        : baseSurfaceY - (1 - Math.min(1, rhoObj / rhoFluid)) * blockHeightPx;
  }, [rhoObj, rhoFluid]);

  // Mode 2: Torricelli / Hydraulic state
  const [torrSub, setTorrSub] = useState<TorricelliSub>('jet');
  const [holeDepth, setHoleDepth] = useState<number>(5.0); // of H=10m
  const [forceF1, setForceF1] = useState<number>(25);
  const [areaRatio, setAreaRatio] = useState<number>(8);
  const [pressDepth, setPressDepth] = useState<number>(25); // [0..40]
  const [jetPhase, setJetPhase] = useState<number>(0);

  useEffect(() => {
    let rafId = 0;
    let prevTs = performance.now();

    const step = (now: number) => {
      const dt = Math.min(0.04, (now - prevTs) / 1000);
      prevTs = now;

      if (mode === 'buoyancy') {
        const cur = buoyAnimRef.current;
        const tgt = targetYRef.current;
        // Damped spring settles smoothly without abrupt jumps
        const acc = (tgt - cur.y) * 28 - cur.vy * 6.5;
        cur.vy += acc * dt;
        cur.y += cur.vy * dt;
        if (Math.abs(tgt - cur.y) < 0.08 && Math.abs(cur.vy) < 0.2) {
          cur.y = tgt;
          cur.vy = 0;
        }
        setYPos(cur.y);
      } else {
        setJetPhase((p) => (p + dt * 2.5) % 1);
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [mode]);

  // Buoyancy telemetry
  const subPct = Math.min(100, (rhoObj / rhoFluid) * 100);
  const weightN = rhoObj * blockVol * G;
  const maxFbN = rhoFluid * blockVol * G;
  const fbN = Math.min(weightN, maxFbN);
  const floorNormalN = Math.max(0, weightN - maxFbN);
  const fluidPresetColor =
    FLUID_PRESETS.find((f) => f.rho === rhoFluid)?.color ?? 'rgba(14, 165, 233, 0.25)';

  // Visual water level rise proportional to submerged fraction
  const subFracVisual = Math.max(0, Math.min(1, (yPos + blockHeightPx - baseSurfaceY) / blockHeightPx));
  const surfaceY = baseSurfaceY - subFracVisual * 8;

  // Torricelli metrics
  const tankH = 10;
  const jetSpeed = Math.sqrt(2 * G * holeDepth);
  const jetRange = 2 * Math.sqrt(holeDepth * (tankH - holeDepth));

  return (
    <div className="space-y-3.5 font-serif">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--ink-primary)]">
          <Droplets className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span>ห้องทดลองของไหล แรงลอยตัว &amp; กฎทอร์ริเชลลี</span>
        </div>
        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-[var(--ink-primary)]">
          {mode === 'buoyancy'
            ? rhoObj > rhoFluid
              ? 'จมถึงก้นถัง (ρ_obj > ρ_fluid)'
              : `ลอยจม ${subPct.toFixed(0)}%`
            : torrSub === 'jet'
              ? `R = ${jetRange.toFixed(2)} m`
              : `F₂ = ${(forceF1 * areaRatio).toFixed(0)} N`}
        </span>
      </div>

      {/* Mode Switch */}
      <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
        <button
          type="button"
          onClick={() => setMode('buoyancy')}
          className={`min-h-[36px] px-2 py-1.5 rounded border ${
            mode === 'buoyancy'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
              : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
          }`}
        >
          1. แรงลอยตัวอาร์คิมีดิส (F_B = ρVg)
        </button>
        <button
          type="button"
          onClick={() => setMode('torricelli')}
          className={`min-h-[36px] px-2 py-1.5 rounded border ${
            mode === 'torricelli'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
              : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
          }`}
        >
          2. รูรั่วถังน้ำทอร์ริเชลลี &amp; ไฮดรอลิก
        </button>
      </div>

      {/* SVG Canvas */}
      <svg viewBox="0 0 460 220" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
        <defs>
          <marker id="fl-arrow-up" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#0284c7" />
          </marker>
          <marker id="fl-arrow-down" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#dc2626" />
          </marker>
          <marker id="fl-arrow-n" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#16a34a" />
          </marker>
        </defs>

        {mode === 'buoyancy' ? (
          <>
            {/* Beaker walls & fluid */}
            <rect x="130" y={surfaceY} width="200" height={floorY - surfaceY} fill={fluidPresetColor} />
            <line x1="130" y1={surfaceY} x2="330" y2={surfaceY} stroke="#0284c7" strokeWidth="1.8" />
            <polyline points={`130,42 130,${floorY} 330,${floorY} 330,42`} fill="none" stroke="var(--ink-primary)" strokeWidth="2.4" />

            {/* Reference level */}
            <line x1="335" y1={baseSurfaceY} x2="365" y2={baseSurfaceY} stroke="var(--ink-tertiary)" strokeWidth="1" strokeDasharray="2 2" />
            <text x="368" y={baseSurfaceY + 3} fontSize="8.5" fill="var(--ink-tertiary)" fontFamily="monospace">ระดับเดิม</text>

            {/* Object block */}
            <rect x="195" y={yPos} width="70" height={blockHeightPx} rx="4" fill="rgba(217, 119, 6, 0.25)" stroke="var(--ink-primary)" strokeWidth="2" />
            <text x="230" y={yPos + 27} fontSize="10" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
              ρ={rhoObj}
            </text>

            {/* Buoyancy arrow F_B up */}
            <line x1="215" y1={yPos + 24} x2="215" y2={Math.max(20, yPos - 28)} stroke="#0284c7" strokeWidth="2.4" markerEnd="url(#fl-arrow-up)" />
            <text x="206" y={Math.max(28, yPos - 14)} fontSize="9.5" textAnchor="end" fill="#0284c7" fontFamily="monospace" fontWeight="bold">
              F_B={fbN.toFixed(0)}N
            </text>

            {/* Gravity mg down */}
            <line x1="245" y1={yPos + 24} x2="245" y2={Math.min(210, yPos + 74)} stroke="#dc2626" strokeWidth="2.4" markerEnd="url(#fl-arrow-down)" />
            <text x="255" y={Math.min(208, yPos + 64)} fontSize="9.5" fill="#dc2626" fontFamily="monospace" fontWeight="bold">
              mg={weightN.toFixed(0)}N
            </text>

            {/* Floor normal if sunk */}
            {floorNormalN > 0.5 && (
              <>
                <line x1="230" y1={floorY} x2="230" y2={floorY - 34} stroke="#16a34a" strokeWidth="2.4" markerEnd="url(#fl-arrow-n)" />
                <text x="118" y={floorY - 8} fontSize="9.5" textAnchor="end" fill="#16a34a" fontFamily="monospace" fontWeight="bold">
                  N_พื้น = {floorNormalN.toFixed(0)} N
                </text>
              </>
            )}
          </>
        ) : torrSub === 'jet' ? (
          <>
            {/* Torricelli Tank (H = 10m -> 150px height from y=34 to y=184) */}
            <rect x="44" y="34" width="84" height="150" fill="rgba(14, 165, 233, 0.2)" />
            <polyline points="44,30 44,184 128,184 128,30" fill="none" stroke="var(--ink-primary)" strokeWidth="2.4" />
            <line x1="44" y1="34" x2="128" y2="34" stroke="#0284c7" strokeWidth="1.8" />

            {/* Ground line */}
            <line x1="128" y1="184" x2="435" y2="184" stroke="var(--ink-tertiary)" strokeWidth="1.8" />

            {(() => {
              const holeY = 34 + (holeDepth / tankH) * 150;
              const landingX = 128 + jetRange * 26;
              const midX = (128 + landingX) / 2;
              const maxRangeX = 128 + 10 * 26; // R_max = 10m -> 388

              const pts = Array.from({ length: 24 }, (_, i) => {
                const frac = i / 23;
                const px = 128 + frac * (landingX - 128);
                const py = holeY + frac * frac * (184 - holeY);
                return `${i === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`;
              }).join(' ');

              const dotX = 128 + jetPhase * (landingX - 128);
              const dotY = holeY + jetPhase * jetPhase * (184 - holeY);

              return (
                <>
                  {/* Depth marker h */}
                  <line x1="30" y1="34" x2="30" y2={holeY} stroke="#d97706" strokeWidth="1.5" />
                  <text x="26" y={(34 + holeY) / 2 + 3} fontSize="9.5" textAnchor="end" fill="#d97706" fontFamily="monospace" fontWeight="bold">
                    h={holeDepth.toFixed(1)}m
                  </text>

                  {/* Hole + Jet parabola */}
                  <circle cx="128" cy={holeY} r="3.5" fill="#dc2626" />
                  <path d={pts} fill="none" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
                  <circle cx={dotX} cy={dotY} r="4.5" fill="#0ea5e9" stroke="white" strokeWidth="1" />

                  {/* Max range guide at h = H/2 */}
                  <line x1={maxRangeX} y1="176" x2={maxRangeX} y2="192" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="2 2" />
                  <text x={maxRangeX} y="205" fontSize="8.5" textAnchor="middle" fill="#16a34a" fontFamily="monospace">
                    R_max=10m
                  </text>

                  <circle cx={landingX} cy="184" r="4.5" fill="#d97706" />
                  <text x={midX} y="205" fontSize="9.5" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
                    ตกไกล R = {jetRange.toFixed(2)} m (v = {jetSpeed.toFixed(1)} m/s)
                  </text>
                </>
              );
            })()}
          </>
        ) : (
          <>
            {/* Pascal Hydraulic Press */}
            <path
              d="M 88,68 L 88,186 L 368,186 L 368,68 M 126,68 L 126,154 L 240,154 L 240,68"
              fill="none"
              stroke="var(--ink-primary)"
              strokeWidth="2.4"
            />
            {(() => {
              const p1Y = 82 + pressDepth;
              const p2Lift = pressDepth / Math.max(1, areaRatio * 0.45);
              const p2Y = 104 - p2Lift;
              return (
                <>
                  {/* Fluid fill */}
                  <path
                    d={`M 89,${p1Y} L 125,${p1Y} L 125,155 L 241,155 L 241,${p2Y} L 367,${p2Y} L 367,185 L 89,185 Z`}
                    fill="rgba(14, 165, 233, 0.25)"
                  />
                  {/* Left Piston A1 */}
                  <rect x="89" y={p1Y - 12} width="36" height="12" fill="var(--surface-muted)" stroke="var(--ink-primary)" strokeWidth="1.8" />
                  <line x1="107" y1={p1Y - 46} x2="107" y2={p1Y - 14} stroke="#16a34a" strokeWidth="2.4" markerEnd="url(#fl-arrow-n)" />
                  <text x="107" y={p1Y - 50} fontSize="9.5" textAnchor="middle" fill="#16a34a" fontFamily="monospace" fontWeight="bold">
                    F₁={forceF1}N
                  </text>

                  {/* Right Piston A2 + Heavy Load */}
                  <rect x="241" y={p2Y - 14} width="126" height="14" fill="var(--surface-muted)" stroke="var(--ink-primary)" strokeWidth="1.8" />
                  <rect x="272" y={p2Y - 48} width="64" height="34" rx="4" fill="rgba(217, 119, 6, 0.25)" stroke="var(--ink-primary)" strokeWidth="2" />
                  <text x="304" y={p2Y - 27} fontSize="10" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
                    F₂={(forceF1 * areaRatio).toFixed(0)}N
                  </text>
                  <text x="230" y="206" fontSize="9.5" textAnchor="middle" fill="var(--ink-secondary)" fontFamily="monospace">
                    ความดันเท่ากัน P = F₁/A₁ = F₂/A₂ (ขยายแรง {areaRatio}× แต่ระยะขยับลดลง {areaRatio}×!)
                  </text>
                </>
              );
            })()}
          </>
        )}
      </svg>

      {/* Controls */}
      {mode === 'buoyancy' ? (
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px] font-mono">
            {OBJ_PRESETS.map((o) => (
              <button
                key={o.label}
                type="button"
                onClick={() => setRhoObj(o.rho)}
                className={`min-h-[32px] px-2 py-1 rounded border ${
                  rhoObj === o.rho
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
                    : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px] font-mono">
            {FLUID_PRESETS.map((f) => (
              <button
                key={f.label}
                type="button"
                onClick={() => setRhoFluid(f.rho)}
                className={`min-h-[32px] px-2 py-1 rounded border ${
                  rhoFluid === f.rho
                    ? 'bg-sky-700 text-white border-sky-800 font-bold'
                    : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <label className="block space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>ความหนาแน่นวัตถุ ρ_obj</span>
              <strong className="text-[var(--ink-primary)]">{rhoObj} kg/m³</strong>
            </div>
            <input type="range" min={200} max={5000} step={50} value={Math.min(5000, rhoObj)} onChange={(e) => setRhoObj(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
          </label>
        </div>
      ) : (
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
            <button
              type="button"
              onClick={() => setTorrSub('jet')}
              className={`min-h-[34px] px-2 py-1 rounded border ${
                torrSub === 'jet'
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
                  : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
              }`}
            >
              รูรั่วถังน้ำ (ทอร์ริเชลลี)
            </button>
            <button
              type="button"
              onClick={() => setTorrSub('hydraulic')}
              className={`min-h-[34px] px-2 py-1 rounded border ${
                torrSub === 'hydraulic'
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
                  : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
              }`}
            >
              เครื่องอัดไฮดรอลิกปาสคาล
            </button>
          </div>

          {torrSub === 'jet' ? (
            <label className="block space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>เจาะรูลึกจากผิวน้ำ h (ถังสูง H = 10 m)</span>
                <strong className="text-[var(--ink-primary)]">{holeDepth.toFixed(1)} m (เจาะกลาง h=5m ไกลสุด!)</strong>
              </div>
              <input type="range" min={1.0} max={9.0} step={0.5} value={holeDepth} onChange={(e) => setHoleDepth(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
            </label>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <label className="space-y-1">
                <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                  <span>กดก้านเล็ก F₁</span>
                  <strong className="text-[var(--ink-primary)]">{forceF1} N</strong>
                </div>
                <input type="range" min={10} max={100} step={5} value={forceF1} onChange={(e) => setForceF1(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
              </label>
              <label className="space-y-1">
                <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                  <span>อัตราส่วน A₂/A₁</span>
                  <strong className="text-[var(--ink-primary)]">{areaRatio}×</strong>
                </div>
                <input type="range" min={2} max={20} step={1} value={areaRatio} onChange={(e) => setAreaRatio(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
              </label>
              <label className="space-y-1">
                <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                  <span>ระยะกดก้านเล็ก</span>
                  <strong className="text-[var(--ink-primary)]">{pressDepth} px</strong>
                </div>
                <input type="range" min={0} max={40} step={2} value={pressDepth} onChange={(e) => setPressDepth(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
              </label>
            </div>
          )}
        </div>
      )}

      {/* Insight Callout */}
      <div className="p-2.5 rounded border border-amber-300/80 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/30 text-[11px] sm:text-xs text-amber-950 dark:text-amber-200 leading-relaxed flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <FormattedMathText
          text={'สูตรลัดออกสอบ: วัตถุลอยสมดุลจะมี **สัดส่วนปริมาตรที่จม** $\\frac{V_{\\text{จม}}}{V} = \\frac{\\rho_{\\text{วัตถุ}}}{\\rho_{\\text{ของเหลว}}}$ เสมอ (ดูน้ำแข็งจม $91.7\\%$) ส่วนถังน้ำรั่วจะพุ่งได้ไกลสุด $R_{\\max} = H$ เมื่อเจาะรูที่ความลึก **กึ่งกลางความสูง** $h = H/2$'}
        />
      </div>
    </div>
  );
};
