// src/components/interactive/CombinedOpticsLab.tsx
'use client';

import React, { useState } from 'react';
import { FormattedMathText } from '@/components/math/LatexRenderer';
import { Layers, Sparkles } from 'lucide-react';

type Elem2Kind = 'convex-lens' | 'concave-lens' | 'concave-mirror';

export const CombinedOpticsLab: React.FC = () => {
  const [elem2Kind, setElem2Kind] = useState<Elem2Kind>('convex-lens');
  const [u1, setU1] = useState<number>(20);
  const [f1, setF1] = useState<number>(12);
  const [f2Abs, setF2Abs] = useState<number>(10);
  const [sepD, setSepD] = useState<number>(18); // Starts on Virtual Object preset u2 < 0!

  const scale = 3.5; // px per cm across 460px SVG
  const axisY = 115;

  const lens1X = 165;
  const elem2X = lens1X + sepD * scale;
  const objX = Math.max(16, lens1X - u1 * scale);

  // Step 1: Convex Lens 1
  const atF1 = Math.abs(u1 - f1) < 0.05;
  const v1 = atF1 ? 999 : (u1 * f1) / (u1 - f1);
  const m1 = atF1 ? 999 : -v1 / u1;
  const img1X = Math.max(12, Math.min(448, lens1X + v1 * scale));

  // Step 2: Intermediate Image I1 serves as object for Element 2
  const u2 = atF1 ? 999 : sepD - v1;
  const isVirtualObj = !atF1 && u2 < 0;
  const signedF2 = elem2Kind === 'concave-lens' ? -f2Abs : f2Abs;
  const atF2 = atF1 || Math.abs(u2 - signedF2) < 0.05;
  const v2 = atF2 ? 999 : (u2 * signedF2) / (u2 - signedF2);
  const m2 = atF2 ? 999 : -v2 / u2;
  const isElem2Mirror = elem2Kind === 'concave-mirror';
  const img2X = isElem2Mirror ? elem2X - v2 * scale : elem2X + v2 * scale;
  const clampedImg2X = Math.max(12, Math.min(448, img2X));

  // Step 3: If Element 2 is a Mirror, reflected light returns back through Lens 1!
  const u3 = isElem2Mirror && !atF2 ? sepD - v2 : 0;
  const atF3 = !isElem2Mirror || atF2 || Math.abs(u3 - f1) < 0.05;
  const v3 = atF3 ? 999 : (u3 * f1) / (u3 - f1);
  const m3 = atF3 ? 999 : -v3 / u3;
  const img3X = Math.max(12, Math.min(448, lens1X - v3 * scale));

  const mTotal = isElem2Mirror
    ? atF3
      ? 999
      : m1 * m2 * m3
    : atF2
      ? 999
      : m1 * m2;

  const applyPreset = (kind: Elem2Kind, nextU1: number, nextF1: number, nextF2: number, nextD: number) => {
    setElem2Kind(kind);
    setU1(nextU1);
    setF1(nextF1);
    setF2Abs(nextF2);
    setSepD(nextD);
  };

  return (
    <div className="space-y-3.5 font-serif">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--ink-primary)]">
          <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <span>ห้องทดลองระบบผสมเลนส์–กระจก &amp; วัตถุเสมือน (u₂ = d - v₁)</span>
        </div>

        {isVirtualObj && (
          <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded border border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300">
            เกิดวัตถุเสมือน u₂ = {u2.toFixed(1)} cm &lt; 0!
          </span>
        )}
      </div>

      {/* Presets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-[11px] font-mono">
        <button
          type="button"
          onClick={() => applyPreset('convex-lens', 20, 12, 10, 18)}
          className="min-h-[34px] px-2 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] hover:border-stone-500 text-[var(--ink-primary)]"
        >
          วัตถุเสมือน u₂ &lt; 0 (v₁ &gt; d)
        </button>
        <button
          type="button"
          onClick={() => applyPreset('concave-mirror', 20, 12, 10, 42)}
          className="min-h-[34px] px-2 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] hover:border-stone-500 text-[var(--ink-primary)]"
        >
          เลนส์+กระจกสะท้อน 3 ขั้น (ข้อ 28)
        </button>
        <button
          type="button"
          onClick={() => applyPreset('convex-lens', 16, 10, 12, 34)}
          className="min-h-[34px] px-2 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] hover:border-stone-500 text-[var(--ink-primary)]"
        >
          กล้องจุลทรรศน์ 2 เลนส์
        </button>
      </div>

      {/* Optical Bench SVG */}
      <svg viewBox="0 0 460 220" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
        <defs>
          <marker id="co-obj" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#0284c7" />
          </marker>
          <marker id="co-i1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#d97706" />
          </marker>
          <marker id="co-i2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#16a34a" />
          </marker>
          <marker id="co-i3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#9333ea" />
          </marker>
        </defs>

        {/* Principal axis */}
        <line x1="12" y1={axisY} x2="448" y2={axisY} stroke="var(--ink-tertiary)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Lens 1 */}
        <path
          d={`M ${lens1X},28 Q ${lens1X + 12},${axisY} ${lens1X},202 Q ${lens1X - 12},${axisY} ${lens1X},28 Z`}
          fill="rgba(2, 132, 199, 0.14)"
          stroke="#0284c7"
          strokeWidth="2"
        />
        <text x={lens1X} y="20" fontSize="9" textAnchor="middle" fill="#0284c7" fontFamily="monospace" fontWeight="bold">
          เลนส์ 1 (f₁={f1})
        </text>

        {/* Element 2 */}
        {elem2Kind === 'convex-lens' && (
          <path
            d={`M ${elem2X},28 Q ${elem2X + 12},${axisY} ${elem2X},202 Q ${elem2X - 12},${axisY} ${elem2X},28 Z`}
            fill="rgba(22, 163, 74, 0.14)"
            stroke="#16a34a"
            strokeWidth="2"
          />
        )}
        {elem2Kind === 'concave-lens' && (
          <path
            d={`M ${elem2X - 10},28 Q ${elem2X - 2},${axisY} ${elem2X - 10},202 L ${elem2X + 10},202 Q ${elem2X + 2},${axisY} ${elem2X + 10},28 Z`}
            fill="rgba(22, 163, 74, 0.14)"
            stroke="#16a34a"
            strokeWidth="2"
          />
        )}
        {elem2Kind === 'concave-mirror' && (
          <path
            d={`M ${elem2X - 5},28 Q ${elem2X + 12},${axisY} ${elem2X - 5},202`}
            fill="none"
            stroke="var(--ink-primary)"
            strokeWidth="3.2"
          />
        )}
        <text x={elem2X} y="20" fontSize="9" textAnchor="middle" fill="#16a34a" fontFamily="monospace" fontWeight="bold">
          ชิ้น 2 (f₂={signedF2})
        </text>

        {/* Separation bracket */}
        <line x1={lens1X} y1="208" x2={elem2X} y2="208" stroke="var(--ink-secondary)" strokeWidth="1.2" />
        <text x={(lens1X + elem2X) / 2} y="218" fontSize="8.5" textAnchor="middle" fill="var(--ink-secondary)" fontFamily="monospace">
          d = {sepD} cm
        </text>

        {/* Object O */}
        <line x1={objX} y1={axisY} x2={objX} y2={axisY - 26} stroke="#0284c7" strokeWidth="2.8" markerEnd="url(#co-obj)" />
        <text x={objX} y={axisY - 31} fontSize="9" textAnchor="middle" fill="#0284c7" fontFamily="monospace" fontWeight="bold">
          O
        </text>

        {/* Guiding rays O -> Lens 1 -> I1 */}
        {!atF1 && (
          <>
            <line x1={objX} y1={axisY - 26} x2={lens1X} y2={axisY - 26} stroke="#d97706" strokeWidth="1.2" opacity="0.7" />
            <line
              x1={lens1X}
              y1={axisY - 26}
              x2={img1X}
              y2={Math.max(24, Math.min(196, axisY - m1 * 26))}
              stroke="#d97706"
              strokeWidth="1.3"
              strokeDasharray={isVirtualObj ? '3 2' : undefined}
            />
            <line
              x1={img1X}
              y1={axisY}
              x2={img1X}
              y2={Math.max(24, Math.min(196, axisY - m1 * 26))}
              stroke="#d97706"
              strokeWidth="2.6"
              strokeDasharray="3 2"
              markerEnd="url(#co-i1)"
            />
            <text
              x={img1X}
              y={m1 < 0 ? Math.min(206, axisY - m1 * 26 + 11) : Math.max(20, axisY - m1 * 26 - 6)}
              fontSize="9"
              textAnchor="middle"
              fill="#d97706"
              fontFamily="monospace"
              fontWeight="bold"
            >
              I₁
            </text>
          </>
        )}

        {/* Intermediate/Final Image I2 */}
        {!atF2 && (
          <>
            <line
              x1={clampedImg2X}
              y1={axisY}
              x2={clampedImg2X}
              y2={Math.max(24, Math.min(196, axisY - m1 * m2 * 26))}
              stroke="#16a34a"
              strokeWidth="2.8"
              markerEnd="url(#co-i2)"
            />
            <text
              x={clampedImg2X}
              y={m1 * m2 < 0 ? Math.min(206, axisY - m1 * m2 * 26 + 11) : Math.max(20, axisY - m1 * m2 * 26 - 6)}
              fontSize="9.5"
              textAnchor="middle"
              fill="#16a34a"
              fontFamily="monospace"
              fontWeight="bold"
            >
              I₂
            </text>
          </>
        )}

        {/* Return Step-3 Image I3 when Mirror is selected */}
        {isElem2Mirror && !atF3 && (
          <>
            <line
              x1={img3X}
              y1={axisY}
              x2={img3X}
              y2={Math.max(24, Math.min(196, axisY - mTotal * 26))}
              stroke="#9333ea"
              strokeWidth="2.8"
              markerEnd="url(#co-i3)"
            />
            <text
              x={img3X}
              y={mTotal < 0 ? Math.min(206, axisY - mTotal * 26 + 11) : Math.max(20, axisY - mTotal * 26 - 6)}
              fontSize="9.5"
              textAnchor="middle"
              fill="#9333ea"
              fontFamily="monospace"
              fontWeight="bold"
            >
              I₃ (ขากลับ)
            </text>
          </>
        )}
      </svg>

      {/* Element 2 Type & Sliders */}
      <div className="space-y-2.5 text-xs">
        <div className="grid grid-cols-3 gap-1.5 text-[11px] font-mono">
          {[
            { id: 'convex-lens' as const, label: 'ชิ้น 2: เลนส์นูน' },
            { id: 'concave-lens' as const, label: 'ชิ้น 2: เลนส์เว้า' },
            { id: 'concave-mirror' as const, label: 'ชิ้น 2: กระจกเว้า (3 ขั้น)' },
          ].map((k) => (
            <button
              key={k.id}
              type="button"
              onClick={() => setElem2Kind(k.id)}
              className={`min-h-[34px] px-2 py-1 rounded border ${
                elem2Kind === k.id
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
                  : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
              }`}
            >
              {k.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <label className="space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>ระยะห่าง d</span>
              <strong className="text-[var(--ink-primary)]">{sepD} cm</strong>
            </div>
            <input type="range" min={10} max={60} step={2} value={sepD} onChange={(e) => setSepD(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
          </label>
          <label className="space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>ระยะวัตถุ u₁</span>
              <strong className="text-[var(--ink-primary)]">{u1} cm</strong>
            </div>
            <input type="range" min={8} max={36} step={1} value={u1} onChange={(e) => setU1(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
          </label>
          <label className="space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>โฟกัส f₁ / |f₂|</span>
              <strong className="text-[var(--ink-primary)]">{f1} / {f2Abs} cm</strong>
            </div>
            <input type="range" min={6} max={18} step={1} value={f2Abs} onChange={(e) => setF2Abs(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
          </label>
        </div>
      </div>

      {/* Multi-Step Telemetry */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
        <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <span className="block text-[10px] text-[var(--ink-tertiary)]">ขั้นที่ 1 (I₁)</span>
          <strong className="text-amber-700 dark:text-amber-400">
            {atF1 ? '∞' : `v₁=${v1.toFixed(1)} • u₂=${u2.toFixed(1)}`}
          </strong>
        </div>
        <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <span className="block text-[10px] text-[var(--ink-tertiary)]">ขั้นที่ 2 (I₂)</span>
          <strong className="text-emerald-700 dark:text-emerald-400">
            {atF2 ? '∞' : `v₂=${v2.toFixed(1)} cm`}
          </strong>
        </div>
        <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <span className="block text-[10px] text-[var(--ink-tertiary)]">
            {isElem2Mirror ? '3 ขั้นรวม m_total' : 'กำลังขยายรวม m_total'}
          </span>
          <strong className="text-purple-700 dark:text-purple-400">
            {mTotal === 999 ? '∞' : `${mTotal.toFixed(2)}×`}
          </strong>
        </div>
      </div>

      {/* Insight Callout */}
      <div className="p-2.5 rounded border border-amber-300/80 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/30 text-[11px] sm:text-xs text-amber-950 dark:text-amber-200 leading-relaxed flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <FormattedMathText
          text={'สูตรทองคำข้อ 28 สอวน.: $u_2 = d - v_1$ ถ้า $v_1 > d$ (ภาพแรก $I_1$ ไปตกหลังเลนส์ที่ 2) จะได้ $u_2 < 0$ ทันที (**วัตถุเสมือน**) — แทนค่าลบลงใน $\\frac{1}{v_2}+\\frac{1}{u_2}=\\frac{1}{f_2}$ ได้เลย และถ้าชิ้นที่ 2 เป็น **กระจก** อย่าลืมคิดขาสะท้อนกลับผ่านเลนส์อีก 1 รอบ ($I_3$)!'}
        />
      </div>
    </div>
  );
};
