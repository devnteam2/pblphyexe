// src/components/interactive/ElectrostaticsLab.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FormattedMathText } from '@/components/math/LatexRenderer';
import { Zap, Plus, Minus, Play, Pause, RotateCcw, Sparkles } from 'lucide-react';

interface SourceCharge {
  id: number;
  x: number;
  y: number;
  q: number; // micro-Coulombs
}

const PRESETS: Record<string, SourceCharge[]> = {
  dipole: [
    { id: 1, x: 155, y: 110, q: 3 },
    { id: 2, x: 305, y: 110, q: -3 },
  ],
  like: [
    { id: 1, x: 155, y: 110, q: 3 },
    { id: 2, x: 305, y: 110, q: 3 },
  ],
  plates: [
    { id: 1, x: 130, y: 58, q: 2 },
    { id: 2, x: 130, y: 110, q: 2 },
    { id: 3, x: 130, y: 162, q: 2 },
    { id: 4, x: 330, y: 58, q: -2 },
    { id: 5, x: 330, y: 110, q: -2 },
    { id: 6, x: 330, y: 162, q: -2 },
  ],
  triangle: [
    { id: 1, x: 230, y: 54, q: 3 },
    { id: 2, x: 155, y: 162, q: -2 },
    { id: 3, x: 305, y: 162, q: -2 },
  ],
};

function computeFieldAndPotential(x: number, y: number, charges: SourceCharge[]) {
  let ex = 0;
  let ey = 0;
  let pot = 0;
  const kScale = 9000; // visual scaled k_e * 10^-6

  for (const c of charges) {
    const dx = x - c.x;
    const dy = y - c.y;
    const r2 = dx * dx + dy * dy + 225; // soften singularity inside charge core (15px)
    const r = Math.sqrt(r2);
    const mag = (kScale * c.q) / r2;
    ex += (mag * dx) / r;
    ey += (mag * dy) / r;
    pot += (kScale * c.q) / r;
  }

  return { ex, ey, pot, mag: Math.hypot(ex, ey) };
}

export const ElectrostaticsLab: React.FC = () => {
  const [charges, setCharges] = useState<SourceCharge[]>(PRESETS.dipole);
  const [testSign, setTestSign] = useState<1 | -1>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [testState, setTestState] = useState<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    trail: { x: number; y: number }[];
  }>({ x: 215, y: 78, vx: 0, vy: 0, trail: [{ x: 215, y: 78 }] });

  const nextIdRef = useRef<number>(20);
  const chargesRef = useRef<SourceCharge[]>(charges);
  const testSignRef = useRef<1 | -1>(testSign);
  const testRef = useRef(testState);

  useEffect(() => {
    chargesRef.current = charges;
  }, [charges]);

  useEffect(() => {
    testSignRef.current = testSign;
  }, [testSign]);

  const resetTestCharge = (x = 215, y = 78) => {
    const fresh = { x, y, vx: 0, vy: 0, trail: [{ x, y }] };
    testRef.current = fresh;
    setTestState(fresh);
  };

  useEffect(() => {
    if (!isPlaying) return;
    let rafId = 0;
    let prevTs: number | null = null;

    const step = (now: number) => {
      const dt = prevTs === null ? 0.016 : Math.min(0.035, (now - prevTs) / 1000);
      prevTs = now;

      const cur = testRef.current;
      const list = chargesRef.current;
      const { ex, ey } = computeFieldAndPotential(cur.x, cur.y, list);

      // Gentle damping + cap speed for smooth, educational field-line tracing
      const sign = testSignRef.current;
      let vx = (cur.vx + sign * ex * 0.45 * dt) * 0.94;
      let vy = (cur.vy + sign * ey * 0.45 * dt) * 0.94;
      const spd = Math.hypot(vx, vy);
      if (spd > 95) {
        vx = (vx / spd) * 95;
        vy = (vy / spd) * 95;
      }

      let nx = cur.x + vx * dt;
      let ny = cur.y + vy * dt;

      // Reset cleanly if test charge reaches sink or out of box
      const hitSink = list.some((c) => Math.hypot(nx - c.x, ny - c.y) < 13 && c.q * sign < 0);
      const outBounds = nx < 14 || nx > 446 || ny < 14 || ny > 206;

      if (hitSink || outBounds) {
        nx = 215;
        ny = 78;
        vx = 0;
        vy = 0;
        const restarted = { x: nx, y: ny, vx, vy, trail: [{ x: nx, y: ny }] };
        testRef.current = restarted;
        setTestState(restarted);
      } else {
        const nextTrail = [...cur.trail, { x: nx, y: ny }].slice(-36);
        const updated = { x: nx, y: ny, vx, vy, trail: nextTrail };
        testRef.current = updated;
        setTestState(updated);
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying]);

  const addCharge = (qSign: 1 | -1) => {
    if (charges.length >= 6) return;
    const idx = charges.length;
    const id = nextIdRef.current++;
    const x = 110 + ((idx * 75) % 260);
    const y = idx % 2 === 0 ? 72 : 148;
    setCharges((prev) => [...prev, { id, x, y, q: qSign * 3 }]);
  };

  const removeLastCharge = () => {
    if (charges.length <= 1) return;
    setCharges((prev) => prev.slice(0, -1));
  };

  const applyPreset = (key: keyof typeof PRESETS) => {
    setCharges(PRESETS[key].map((c) => ({ ...c })));
    resetTestCharge();
  };

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 460;
    const y = ((e.clientY - rect.top) / rect.height) * 220;
    resetTestCharge(Math.max(22, Math.min(438, x)), Math.max(22, Math.min(198, y)));
    setIsPlaying(true);
  };

  const atTest = computeFieldAndPotential(testState.x, testState.y, charges);
  const charge1 = charges[0];

  return (
    <div className="space-y-3.5 font-serif">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--ink-primary)]">
          <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>ห้องทดลองสนามไฟฟ้า 2 มิติ &amp; ศักย์ไฟฟ้า (แตะเพื่อปล่อย +q₀)</span>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className="min-h-[34px] px-2.5 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-[var(--ink-primary)] inline-flex items-center gap-1"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'พัก' : 'เล่น'}</span>
          </button>
          <button
            type="button"
            onClick={() => resetTestCharge()}
            className="min-h-[34px] px-2.5 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-[var(--ink-primary)] inline-flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>ปล่อย q₀ ใหม่</span>
          </button>
        </div>
      </div>

      {/* Presets */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px] font-mono">
        {[
          { key: 'dipole', label: 'ขั้วคู่ (+ / -)' },
          { key: 'like', label: 'ประจุเหมือนกัน (+ / +)' },
          { key: 'plates', label: 'แผ่นขนาน (E สม่ำเสมอ)' },
          { key: 'triangle', label: 'สามเหลี่ยม 3 ประจุ' },
        ].map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => applyPreset(p.key as keyof typeof PRESETS)}
            className="min-h-[34px] px-2 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] hover:border-stone-500 text-[var(--ink-primary)]"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Interactive 2D Field Vector Canvas */}
      <svg
        viewBox="0 0 460 220"
        onClick={handleSvgClick}
        className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] cursor-crosshair"
      >
        <defs>
          <marker id="es-vec" markerWidth="4.5" markerHeight="4.5" refX="3.5" refY="2.25" orient="auto">
            <path d="M0,0 L4.5,2.25 L0,4.5 Z" fill="var(--ink-tertiary)" />
          </marker>
          <marker id="es-force" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#16a34a" />
          </marker>
        </defs>

        {/* 11 x 5 Electric Field Vector Grid */}
        {Array.from({ length: 11 }, (_, ix) =>
          Array.from({ length: 5 }, (_, iy) => {
            const gx = 35 + ix * 39;
            const gy = 30 + iy * 40;
            const { ex, ey, mag } = computeFieldAndPotential(gx, gy, charges);
            if (mag < 0.05) return null;
            const len = 14;
            const ux = (ex / mag) * len;
            const uy = (ey / mag) * len;
            const opacity = Math.max(0.25, Math.min(0.9, mag / 12));
            return (
              <line
                key={`${ix}-${iy}`}
                x1={gx - ux * 0.5}
                y1={gy - uy * 0.5}
                x2={gx + ux * 0.5}
                y2={gy + uy * 0.5}
                stroke={mag > 8 ? '#d97706' : '#0284c7'}
                strokeWidth="1.5"
                opacity={opacity}
                markerEnd="url(#es-vec)"
              />
            );
          })
        )}

        {/* Test charge trail */}
        {testState.trail.length > 1 && (
          <path
            d={testState.trail.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')}
            fill="none"
            stroke="#16a34a"
            strokeWidth="2"
            strokeDasharray="3 2"
          />
        )}

        {/* Source charges */}
        {charges.map((c) => {
          const isPos = c.q >= 0;
          return (
            <g key={c.id}>
              <circle
                cx={c.x}
                cy={c.y}
                r="13"
                fill={isPos ? '#dc2626' : '#0284c7'}
                stroke="white"
                strokeWidth="1.8"
              />
              <text x={c.x} y={c.y + 4} fontSize="10" textAnchor="middle" fill="white" fontFamily="monospace" fontWeight="bold">
                {c.q > 0 ? `+${c.q}` : c.q}
              </text>
            </g>
          );
        })}

        {/* Animated Test Charge + Force Vector */}
        {atTest.mag > 0.05 && (
          <line
            x1={testState.x}
            y1={testState.y}
            x2={testState.x + ((testSign * atTest.ex) / atTest.mag) * 26}
            y2={testState.y + ((testSign * atTest.ey) / atTest.mag) * 26}
            stroke="#16a34a"
            strokeWidth="2.2"
            markerEnd="url(#es-force)"
          />
        )}
        <circle
          cx={testState.x}
          cy={testState.y}
          r="6.5"
          fill={testSign > 0 ? '#16a34a' : '#9333ea'}
          stroke="white"
          strokeWidth="1.5"
        />
        <text x={testState.x} y={testState.y - 10} fontSize="9" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
          {testSign > 0 ? '+q₀' : '-q₀'}
        </text>
      </svg>

      {/* Add/Remove & Test Sign Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => addCharge(1)}
            disabled={charges.length >= 6}
            className="min-h-[34px] px-2.5 py-1 rounded border border-rose-500 text-rose-700 dark:text-rose-300 bg-rose-50/70 dark:bg-rose-950/30 disabled:opacity-40 inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> เพิ่ม +q
          </button>
          <button
            type="button"
            onClick={() => addCharge(-1)}
            disabled={charges.length >= 6}
            className="min-h-[34px] px-2.5 py-1 rounded border border-sky-500 text-sky-700 dark:text-sky-300 bg-sky-50/70 dark:bg-sky-950/30 disabled:opacity-40 inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> เพิ่ม -q
          </button>
          <button
            type="button"
            onClick={removeLastCharge}
            disabled={charges.length <= 1}
            className="min-h-[34px] px-2.5 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-[var(--ink-primary)] disabled:opacity-40 inline-flex items-center gap-1"
          >
            <Minus className="w-3.5 h-3.5" /> ลบ ({charges.length}/6)
          </button>
        </div>

        <button
          type="button"
          onClick={() => setTestSign((s) => (s > 0 ? -1 : 1))}
          className="min-h-[34px] px-2.5 py-1 rounded border border-emerald-500 text-emerald-700 dark:text-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/30 font-bold"
        >
          ประจุทดสอบ: {testSign > 0 ? '+q₀ (ไหลตาม E)' : '-q₀ (วิ่งสวน E)'}
        </button>
      </div>

      {/* Charge 1 slider + Readout */}
      {charge1 && (
        <label className="block space-y-1 text-xs">
          <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
            <span>ปรับขนาดประจุหลักก้อนที่ 1</span>
            <strong className="text-[var(--ink-primary)]">{charge1.q > 0 ? `+${charge1.q}` : charge1.q} μC</strong>
          </div>
          <input
            type="range"
            min={-6}
            max={6}
            step={1}
            value={charge1.q}
            onChange={(e) => {
              const qVal = parseInt(e.target.value, 10) || 1;
              setCharges((prev) => prev.map((c, idx) => (idx === 0 ? { ...c, q: qVal } : c)));
            }}
            className="bridge-slider w-full cursor-pointer"
          />
        </label>
      )}

      <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
        <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <span className="block text-[10px] text-[var(--ink-tertiary)]">สนามที่จุด q₀ |E|</span>
          <strong className="text-sky-700 dark:text-sky-400">{atTest.mag.toFixed(1)} u</strong>
        </div>
        <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <span className="block text-[10px] text-[var(--ink-tertiary)]">ศักย์ไฟฟ้า V</span>
          <strong className="text-amber-700 dark:text-amber-400">{atTest.pot.toFixed(0)} u</strong>
        </div>
        <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <span className="block text-[10px] text-[var(--ink-tertiary)]">ทิศแรง F = q₀E</span>
          <strong className="text-emerald-700 dark:text-emerald-400">
            {testSign > 0 ? 'ตามสนาม E' : 'สวนสนาม E'}
          </strong>
        </div>
      </div>

      {/* Insight Callout */}
      <div className="p-2.5 rounded border border-amber-300/80 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/30 text-[11px] sm:text-xs text-amber-950 dark:text-amber-200 leading-relaxed flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <FormattedMathText
          text={'แตะตรงไหนบนสนามก็ได้เพื่อหย่อน $+q_0$ หรือสลับเป็น $-q_0$: สนามไฟฟ้า $\\vec{E}$ พุ่งจาก **ประจุบวก $(+)$ เข้าประจุลบ $(-)$** ส่วนงานของการเคลื่อนที่หาจาก **สเกลาร์** $W = q(V_A - V_B)$ โดยไม่ขึ้นกับเส้นทาง!'}
        />
      </div>
    </div>
  );
};
