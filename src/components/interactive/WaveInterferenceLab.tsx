// src/components/interactive/WaveInterferenceLab.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { FormattedMathText } from '@/components/math/LatexRenderer';
import { Waves, Play, Pause, Sparkles } from 'lucide-react';

type WaveMode = 'superposition' | 'standing' | 'beats';

export const WaveInterferenceLab: React.FC = () => {
  const [mode, setMode] = useState<WaveMode>('superposition');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [phaseTime, setPhaseTime] = useState<number>(0);

  // Superposition state
  const [phaseDeg, setPhaseDeg] = useState<number>(0);
  const [amp1, setAmp1] = useState<number>(1.0);
  const [amp2, setAmp2] = useState<number>(1.0);

  // Standing waves state
  const [harmonic, setHarmonic] = useState<number>(2);

  // Beats state
  const [freq1, setFreq1] = useState<number>(7);
  const [freq2, setFreq2] = useState<number>(9);

  useEffect(() => {
    if (!isPlaying) return;
    let rafId = 0;
    let prevTs = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - prevTs) / 1000);
      prevTs = now;
      setPhaseTime((t) => t + dt * 3.2);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying]);

  const width = 460;
  const startX = 24;
  const plotW = width - 48;
  const midY = 105;
  const samples = 120;

  // Compute telemetry for Superposition mode
  const dPhiRad = (phaseDeg * Math.PI) / 180;
  const ampRes = Math.sqrt(amp1 * amp1 + amp2 * amp2 + 2 * amp1 * amp2 * Math.cos(dPhiRad));
  const intensityRatio = ampRes * ampRes; // relative to unit wave A0=1
  const pathRatio = phaseDeg / 360;
  const isBuff = ampRes >= amp1 + amp2 - 0.12;
  const isDebuff = ampRes <= Math.abs(amp1 - amp2) + 0.12;

  const buildPath = (fn: (u: number) => number, scaleY: number) =>
    Array.from({ length: samples + 1 }, (_, i) => {
      const u = i / samples; // 0..1
      const px = startX + u * plotW;
      const py = midY - fn(u) * scaleY;
      return `${i === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`;
    }).join(' ');

  return (
    <div className="space-y-3.5 font-serif">
      {/* Header & Play/Pause */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--ink-primary)]">
          <Waves className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span>ห้องทดลองคลื่น การแทรกสอด Buff/Debuff &amp; คลื่นนิ่ง</span>
        </div>

        <button
          type="button"
          onClick={() => setIsPlaying((p) => !p)}
          className="px-2.5 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-xs font-mono text-[var(--ink-primary)] hover:border-stone-500 inline-flex items-center gap-1"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isPlaying ? 'หยุดชั่วคราว' : 'เล่นต่อ'}</span>
        </button>
      </div>

      {/* Mode Tabs */}
      <div className="grid grid-cols-3 gap-1.5 text-[11px] font-mono">
        {[
          { id: 'superposition' as const, label: 'แทรกสอด Buff/Debuff' },
          { id: 'standing' as const, label: 'คลื่นนิ่ง (Standing)' },
          { id: 'beats' as const, label: 'บีตส์ (Beats)' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setMode(tab.id)}
            className={`min-h-[36px] px-2 py-1 rounded border transition-colors ${
              mode === tab.id
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100 font-bold'
                : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)] hover:border-stone-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mode 1: Wave Superposition (Buff/Debuff) */}
      {mode === 'superposition' && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
              <button
                type="button"
                onClick={() => setPhaseDeg(0)}
                className={`px-2.5 py-1 rounded border ${
                  phaseDeg === 0
                    ? 'bg-emerald-600 text-white border-emerald-700 font-bold'
                    : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
                }`}
              >
                Buff เสริมสุดขีด (0°)
              </button>
              <button
                type="button"
                onClick={() => setPhaseDeg(180)}
                className={`px-2.5 py-1 rounded border ${
                  phaseDeg === 180
                    ? 'bg-rose-600 text-white border-rose-700 font-bold'
                    : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
                }`}
              >
                Debuff หักล้าง (180°)
              </button>
              <button
                type="button"
                onClick={() => setPhaseDeg(90)}
                className={`px-2.5 py-1 rounded border ${
                  phaseDeg === 90
                    ? 'bg-amber-600 text-white border-amber-700 font-bold'
                    : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
                }`}
              >
                ครึ่งเฟส (90°)
              </button>
            </div>

            <span
              className={`px-2 py-0.5 rounded font-mono text-[11px] font-bold border ${
                isBuff
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-400'
                  : isDebuff
                  ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-400'
                  : 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-400'
              }`}
            >
              {isBuff ? 'CONSTRUCTIVE (BUFF!)' : isDebuff ? 'DESTRUCTIVE (DEBUFF!)' : 'PARTIAL INTERFERENCE'}
            </span>
          </div>

          <svg viewBox="0 0 460 210" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
            <line x1={startX} y1={midY} x2={startX + plotW} y2={midY} stroke="var(--hairline-border)" strokeWidth="1.2" />

            {/* Wave 1 */}
            <path
              d={buildPath((u) => amp1 * Math.sin(3 * 2 * Math.PI * u - phaseTime), 27)}
              fill="none"
              stroke="#0284c7"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              opacity="0.85"
            />
            {/* Wave 2 */}
            <path
              d={buildPath((u) => amp2 * Math.sin(3 * 2 * Math.PI * u - phaseTime + dPhiRad), 27)}
              fill="none"
              stroke="#d97706"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              opacity="0.85"
            />
            {/* Resultant Wave y1 + y2 */}
            <path
              d={buildPath(
                (u) =>
                  amp1 * Math.sin(3 * 2 * Math.PI * u - phaseTime) +
                  amp2 * Math.sin(3 * 2 * Math.PI * u - phaseTime + dPhiRad),
                27
              )}
              fill="none"
              stroke="var(--ink-primary)"
              strokeWidth="2.8"
            />

            {/* Legend */}
            <text x="28" y="20" fontSize="9.5" fill="#0284c7" fontFamily="monospace">--- y₁ (คลื่นที่ 1)</text>
            <text x="150" y="20" fontSize="9.5" fill="#d97706" fontFamily="monospace">--- y₂ (เลื่อนเฟส Δφ={phaseDeg}°)</text>
            <text x="325" y="20" fontSize="9.5" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">— y_รวม = y₁ + y₂</text>
          </svg>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <label className="space-y-1 sm:col-span-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>มุมเฟสต่าง Δφ</span>
                <strong className="text-[var(--ink-primary)]">{phaseDeg}° ({pathRatio.toFixed(2)}λ)</strong>
              </div>
              <input
                type="range"
                min={0}
                max={360}
                step={5}
                value={phaseDeg}
                onChange={(e) => setPhaseDeg(parseInt(e.target.value, 10))}
                className="bridge-slider w-full cursor-pointer"
              />
            </label>
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>แอมพลิจูด A₁</span>
                <strong className="text-[var(--ink-primary)]">{amp1.toFixed(1)}</strong>
              </div>
              <input
                type="range"
                min={0.5}
                max={1.5}
                step={0.1}
                value={amp1}
                onChange={(e) => setAmp1(parseFloat(e.target.value))}
                className="bridge-slider w-full cursor-pointer"
              />
            </label>
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>แอมพลิจูด A₂</span>
                <strong className="text-[var(--ink-primary)]">{amp2.toFixed(1)}</strong>
              </div>
              <input
                type="range"
                min={0.5}
                max={1.5}
                step={0.1}
                value={amp2}
                onChange={(e) => setAmp2(parseFloat(e.target.value))}
                className="bridge-slider w-full cursor-pointer"
              />
            </label>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
              <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">ผลต่างระยะทาง Δr</span>
              <span className="font-mono font-bold text-[var(--ink-primary)]">{pathRatio.toFixed(2)} λ</span>
            </div>
            <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
              <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">แอมพลิจูดลัพธ์ A_res</span>
              <span className="font-mono font-bold text-amber-700 dark:text-amber-400">{ampRes.toFixed(2)}</span>
            </div>
            <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
              <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">ความเข้ม I / I₀ (∝ A²)</span>
              <span className="font-mono font-bold text-sky-700 dark:text-sky-400">{intensityRatio.toFixed(2)}×</span>
            </div>
          </div>
        </>
      )}

      {/* Mode 2: Standing Waves */}
      {mode === 'standing' && (
        <>
          <svg viewBox="0 0 460 210" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
            <line x1={startX} y1={midY} x2={startX + plotW} y2={midY} stroke="var(--hairline-border)" strokeWidth="1.2" />

            {/* Standing wave envelope */}
            <path
              d={buildPath((u) => Math.sin(harmonic * Math.PI * u), 56)}
              fill="none"
              stroke="var(--ink-tertiary)"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />
            <path
              d={buildPath((u) => -Math.sin(harmonic * Math.PI * u), 56)}
              fill="none"
              stroke="var(--ink-tertiary)"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />

            {/* Instantaneous standing wave */}
            <path
              d={buildPath((u) => Math.sin(harmonic * Math.PI * u) * Math.cos(phaseTime * 1.4), 56)}
              fill="none"
              stroke="#0284c7"
              strokeWidth="3"
            />

            {/* Nodes */}
            {Array.from({ length: harmonic + 1 }, (_, idx) => {
              const nx = startX + (idx / harmonic) * plotW;
              return (
                <g key={`n-${idx}`}>
                  <circle cx={nx} cy={midY} r="4.5" fill="#dc2626" />
                  <text x={nx} y={midY + 15} fontSize="8.5" textAnchor="middle" fill="#dc2626" fontFamily="monospace" fontWeight="bold">
                    N
                  </text>
                </g>
              );
            })}

            {/* Antinodes */}
            {Array.from({ length: harmonic }, (_, idx) => {
              const ax = startX + ((idx + 0.5) / harmonic) * plotW;
              return (
                <g key={`a-${idx}`}>
                  <circle cx={ax} cy={midY - 56} r="3" fill="#16a34a" />
                  <text x={ax} y={midY - 64} fontSize="8.5" textAnchor="middle" fill="#16a34a" fontFamily="monospace" fontWeight="bold">
                    A
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-mono text-[var(--ink-secondary)]">เลือกฮาร์มอนิก n (ปลายเชือกตรึง 2 ด้าน):</span>
            <div className="flex gap-1.5 font-mono">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setHarmonic(n)}
                  className={`px-3 py-1 rounded border ${
                    harmonic === n
                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
                      : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
                  }`}
                >
                  n = {n}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
              <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">จำนวน Nodes (จุดบัพ)</span>
              <span className="font-mono font-bold text-rose-700 dark:text-rose-400">{harmonic + 1} จุด</span>
            </div>
            <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
              <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">จำนวน Antinodes (ปฏิบัพ)</span>
              <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">{harmonic} ลูป</span>
            </div>
            <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
              <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">ความยาวคลื่น λ_n</span>
              <span className="font-mono font-bold text-sky-700 dark:text-sky-400">2L / {harmonic}</span>
            </div>
          </div>
        </>
      )}

      {/* Mode 3: Beats */}
      {mode === 'beats' && (
        <>
          <svg viewBox="0 0 460 210" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
            <line x1={startX} y1={midY} x2={startX + plotW} y2={midY} stroke="var(--hairline-border)" strokeWidth="1.2" />

            {/* Beat envelope */}
            <path
              d={buildPath((u) => 2 * Math.cos(Math.PI * (freq1 - freq2) * (u + phaseTime * 0.08)), 28)}
              fill="none"
              stroke="#d97706"
              strokeWidth="1.4"
              strokeDasharray="4 3"
            />
            <path
              d={buildPath((u) => -2 * Math.cos(Math.PI * (freq1 - freq2) * (u + phaseTime * 0.08)), 28)}
              fill="none"
              stroke="#d97706"
              strokeWidth="1.4"
              strokeDasharray="4 3"
            />

            {/* Combined modulated wave */}
            <path
              d={buildPath(
                (u) =>
                  Math.sin(2 * Math.PI * freq1 * (u + phaseTime * 0.08)) +
                  Math.sin(2 * Math.PI * freq2 * (u + phaseTime * 0.08)),
                28
              )}
              fill="none"
              stroke="var(--ink-primary)"
              strokeWidth="2"
            />
          </svg>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>ความถี่คลื่นที่ 1 (f₁)</span>
                <strong className="text-[var(--ink-primary)]">{freq1} Hz</strong>
              </div>
              <input type="range" min={4} max={14} step={1} value={freq1} onChange={(e) => setFreq1(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
            </label>
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>ความถี่คลื่นที่ 2 (f₂)</span>
                <strong className="text-[var(--ink-primary)]">{freq2} Hz</strong>
              </div>
              <input type="range" min={4} max={14} step={1} value={freq2} onChange={(e) => setFreq2(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
              <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">ความถี่บีตส์ f_beat = |f₁ − f₂|</span>
              <span className="font-mono font-bold text-amber-700 dark:text-amber-400">{Math.abs(freq1 - freq2)} ครั้ง/วินาที</span>
            </div>
            <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
              <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">ความถี่เสียงที่ได้ยิน (เฉลี่ย)</span>
              <span className="font-mono font-bold text-sky-700 dark:text-sky-400">{((freq1 + freq2) / 2).toFixed(1)} Hz</span>
            </div>
          </div>
        </>
      )}

      {/* Key Physics Proof Callout */}
      <div className="p-3 rounded border border-amber-300/80 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/30 text-xs text-amber-950 dark:text-amber-200 leading-relaxed flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <FormattedMathText
            text={'หัวใจสมการแทรกสอด Buff/Debuff: $y_1 + y_2 = \\left[2A\\cos\\left(\\frac{\\Delta\\phi}{2}\\right)\\right]\\sin\\left(kx - \\omega t + \\frac{\\Delta\\phi}{2}\\right)$ — เมื่อ $\\Delta\\phi = 0, 2\\pi$ (Buff) แอมพลิจูดเพิ่มเป็น $2A$ และความเข้มพุ่ง $4$ เท่า ($I = 4I_0$)! ส่วน $\\Delta\\phi = \\pi$ (Debuff) คลื่นหักล้างหายเกลี้ยงเป็นศูนย์!'}
          />
        </div>
      </div>
    </div>
  );
};
