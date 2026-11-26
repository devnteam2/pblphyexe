// src/components/interactive/FaradayEmWaveLab.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { FormattedMathText } from '@/components/math/LatexRenderer';
import { Zap, Play, Pause, Sparkles } from 'lucide-react';

type FaradayMode = 'rail' | 'emwave';

const SPECTRUM_BANDS = [
  { id: 'radio', label: 'วิทยุ', lambdaLabel: '100 m', freqLabel: '3 MHz', color: '#ef4444', cycles: 1.5 },
  { id: 'micro', label: 'ไมโครเวฟ', lambdaLabel: '3 cm', freqLabel: '10 GHz', color: '#f97316', cycles: 2.5 },
  { id: 'ir', label: 'อินฟราเรด', lambdaLabel: '1 μm', freqLabel: '300 THz', color: '#dc2626', cycles: 3.5 },
  { id: 'vis', label: 'แสงตามองเห็น', lambdaLabel: '550 nm', freqLabel: '545 THz', color: '#16a34a', cycles: 4.5 },
  { id: 'uv', label: 'UV', lambdaLabel: '250 nm', freqLabel: '1.2 PHz', color: '#8b5cf6', cycles: 6.0 },
  { id: 'xray', label: 'รังสีเอกซ์', lambdaLabel: '0.1 nm', freqLabel: '3 EHz', color: '#6366f1', cycles: 8.5 },
];

export const FaradayEmWaveLab: React.FC = () => {
  const [mode, setMode] = useState<FaradayMode>('rail');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [phaseTime, setPhaseTime] = useState<number>(0);

  // Mode 1: Faraday Rail state (epsilon = B * l * v)
  const [autoOscillate, setAutoOscillate] = useState<boolean>(true);
  const [manualVel, setManualVel] = useState<number>(4.0);
  const [bField, setBField] = useState<number>(0.8);
  const [bIntoPage, setBIntoPage] = useState<boolean>(true);
  const [resistance, setResistance] = useState<number>(4.0);

  // Mode 2: EM Wave Spectrum
  const [bandId, setBandId] = useState<string>('vis');

  useEffect(() => {
    if (!isPlaying) return;
    let rafId = 0;
    let prevTs = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.04, (now - prevTs) / 1000);
      prevTs = now;
      setPhaseTime((t) => t + dt * 2.4);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying]);

  const railLenM = 0.5;
  const currentVel = autoOscillate ? 5.5 * Math.cos(phaseTime) : manualVel;
  const rodX = autoOscillate
    ? 235 + 85 * Math.sin(phaseTime)
    : 235 + Math.sin(phaseTime * (manualVel * 0.25)) * 85;

  const emf = bField * railLenM * Math.abs(currentVel);
  const currentAmp = emf / resistance;
  const powerWatt = emf * currentAmp;
  const brakeForce = currentAmp * railLenM * bField;

  // Lenz direction in rod: F_mag on +q is q(v x B)
  // If v>0 (right) & B into page -> v x B points UP in rod -> current up in rod -> CCW around loop!
  const bSign = bIntoPage ? 1 : -1;
  const ccwFlow = currentVel * bSign >= 0;

  const activeBand = SPECTRUM_BANDS.find((b) => b.id === bandId) ?? SPECTRUM_BANDS[3];

  // Build 3D isometric EM wave curves
  const samples = 75;
  const eWavePath = Array.from({ length: samples + 1 }, (_, i) => {
    const u = i / samples;
    const x = 44 + u * 355;
    const amp = 44 * Math.sin(2 * Math.PI * activeBand.cycles * u - phaseTime * 1.4);
    const y = 114 - amp;
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');

  const bWavePath = Array.from({ length: samples + 1 }, (_, i) => {
    const u = i / samples;
    const baseX = 44 + u * 355;
    const val = 44 * Math.sin(2 * Math.PI * activeBand.cycles * u - phaseTime * 1.4);
    // Isometric projection perpendicular to both E(y) and c(x)
    const x = baseX - val * 0.5;
    const y = 114 + val * 0.38;
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');

  return (
    <div className="space-y-3.5 font-serif">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--ink-primary)]">
          <Zap className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span>ห้องทดลองกฎฟาราเดย์–เลนซ์ &amp; คลื่นแม่เหล็กไฟฟ้า (E ⊥ B)</span>
        </div>

        <button
          type="button"
          onClick={() => setIsPlaying((p) => !p)}
          className="min-h-[34px] px-2.5 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-xs font-mono text-[var(--ink-primary)] inline-flex items-center gap-1"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span>{isPlaying ? 'พัก' : 'เล่น'}</span>
        </button>
      </div>

      {/* Mode Switch */}
      <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
        <button
          type="button"
          onClick={() => setMode('rail')}
          className={`min-h-[36px] px-2 py-1.5 rounded border ${
            mode === 'rail'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
              : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
          }`}
        >
          1. รางตัวนำฟาราเดย์ &amp; แรงต้านเลนซ์
        </button>
        <button
          type="button"
          onClick={() => setMode('emwave')}
          className={`min-h-[36px] px-2 py-1.5 rounded border ${
            mode === 'emwave'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
              : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
          }`}
        >
          2. คลื่นแม่เหล็กไฟฟ้า E ⊥ B ⊥ c
        </button>
      </div>

      {/* SVG Stage */}
      <svg viewBox="0 0 460 220" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
        <defs>
          <marker id="fe-arrow-v" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#16a34a" />
          </marker>
          <marker id="fe-arrow-fb" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#dc2626" />
          </marker>
        </defs>

        {mode === 'rail' ? (
          <>
            {/* Uniform B-field grid */}
            {Array.from({ length: 7 }, (_, ix) =>
              Array.from({ length: 4 }, (_, iy) => {
                const bx = 115 + ix * 48;
                const by = 44 + iy * 44;
                return (
                  <g key={`${ix}-${iy}`} opacity="0.45">
                    <circle cx={bx} cy={by} r="7" fill="none" stroke="#0284c7" strokeWidth="1.2" />
                    {bIntoPage ? (
                      <>
                        <line x1={bx - 3.5} y1={by - 3.5} x2={bx + 3.5} y2={by + 3.5} stroke="#0284c7" strokeWidth="1.3" />
                        <line x1={bx + 3.5} y1={by - 3.5} x2={bx - 3.5} y2={by + 3.5} stroke="#0284c7" strokeWidth="1.3" />
                      </>
                    ) : (
                      <circle cx={bx} cy={by} r="2.2" fill="#0284c7" />
                    )}
                  </g>
                );
              })
            )}

            {/* U-shaped Rails */}
            <polyline points="410,60 72,60 72,162 410,162" fill="none" stroke="var(--ink-primary)" strokeWidth="3.5" />

            {/* Light bulb on left side */}
            <circle
              cx="72"
              cy="111"
              r={14 + Math.min(10, powerWatt * 1.4)}
              fill={`rgba(250, 204, 21, ${Math.min(0.7, powerWatt * 0.14)})`}
            />
            <circle cx="72" cy="111" r="12" fill="var(--surface-card)" stroke="#d97706" strokeWidth="2" />
            <text x="72" y="114" fontSize="8.5" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
              {resistance}Ω
            </text>

            {/* Sliding Conductor Rod */}
            <rect x={rodX - 5} y="52" width="10" height="118" rx="3" fill="#d97706" stroke="var(--ink-primary)" strokeWidth="1.8" />

            {/* Moving current dots around closed loop */}
            {currentAmp > 0.05 &&
              Array.from({ length: 6 }, (_, idx) => {
                const rawP = (phaseTime * 0.45 * (ccwFlow ? 1 : -1) + idx / 6) % 1;
                const prog = (rawP + 1) % 1;
                // Perimeter of rectangle [72..rodX] x [60..162]
                const w = Math.max(20, rodX - 72);
                const h = 102;
                const perim = 2 * (w + h);
                const s = prog * perim;
                let px = 72;
                let py = 60;
                if (s < h) {
                  // Down left branch (if ccw)
                  px = 72;
                  py = 60 + s;
                } else if (s < h + w) {
                  // Right along bottom rail
                  px = 72 + (s - h);
                  py = 162;
                } else if (s < 2 * h + w) {
                  // Up moving rod
                  px = rodX;
                  py = 162 - (s - h - w);
                } else {
                  // Left along top rail
                  px = rodX - (s - 2 * h - w);
                  py = 60;
                }
                return <circle key={idx} cx={px} cy={py} r="3.4" fill="#16a34a" />;
              })}

            {/* Velocity arrow v & Lenz braking force arrow F_B (always opposes v!) */}
            {Math.abs(currentVel) > 0.25 && (
              <>
                <line
                  x1={rodX}
                  y1="88"
                  x2={rodX + Math.sign(currentVel) * 34}
                  y2="88"
                  stroke="#16a34a"
                  strokeWidth="2.4"
                  markerEnd="url(#fe-arrow-v)"
                />
                <text
                  x={rodX + Math.sign(currentVel) * 20}
                  y="80"
                  fontSize="9.5"
                  textAnchor="middle"
                  fill="#16a34a"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  v
                </text>

                <line
                  x1={rodX}
                  y1="134"
                  x2={rodX - Math.sign(currentVel) * 30}
                  y2="134"
                  stroke="#dc2626"
                  strokeWidth="2.4"
                  markerEnd="url(#fe-arrow-fb)"
                />
                <text
                  x={rodX - Math.sign(currentVel) * 22}
                  y="148"
                  fontSize="9.5"
                  textAnchor="middle"
                  fill="#dc2626"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  F_ต้าน (เลนซ์)
                </text>
              </>
            )}

            <text x="240" y="200" fontSize="10" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
              |ε| = Bℓ|v| = {emf.toFixed(2)} V • กำลังไฟ P = {powerWatt.toFixed(2)} W
            </text>
          </>
        ) : (
          <>
            {/* 3D Isometric Maxwell EM Wave */}
            <line x1="36" y1="114" x2="430" y2="114" stroke="var(--ink-tertiary)" strokeWidth="1.4" markerEnd="url(#fe-arrow-v)" />
            <text x="432" y="130" fontSize="9.5" textAnchor="end" fill="#16a34a" fontFamily="monospace" fontWeight="bold">
              ทิศการแผ่ c = E × B
            </text>

            {/* E vertical field lines */}
            {Array.from({ length: 18 }, (_, i) => {
              const u = i / 17;
              const x = 44 + u * 355;
              const amp = 44 * Math.sin(2 * Math.PI * activeBand.cycles * u - phaseTime * 1.4);
              return <line key={`e-${i}`} x1={x} y1="114" x2={x} y2={114 - amp} stroke={activeBand.color} strokeWidth="1.2" opacity="0.45" />;
            })}

            {/* B transverse isometric field lines */}
            {Array.from({ length: 18 }, (_, i) => {
              const u = i / 17;
              const bx = 44 + u * 355;
              const val = 44 * Math.sin(2 * Math.PI * activeBand.cycles * u - phaseTime * 1.4);
              return <line key={`b-${i}`} x1={bx} y1="114" x2={bx - val * 0.5} y2={114 + val * 0.38} stroke="#0284c7" strokeWidth="1.2" opacity="0.45" />;
            })}

            <path d={bWavePath} fill="none" stroke="#0284c7" strokeWidth="2.2" />
            <path d={eWavePath} fill="none" stroke={activeBand.color} strokeWidth="2.4" />

            <text x="16" y="22" fontSize="10" fill={activeBand.color} fontFamily="monospace" fontWeight="bold">
              คลื่นสนามไฟฟ้า E (แนวตั้ง)
            </text>
            <text x="16" y="38" fontSize="10" fill="#0284c7" fontFamily="monospace" fontWeight="bold">
              คลื่นสนามแม่เหล็ก B (แนวลึก ⊥ E)
            </text>
            <text x="444" y="22" fontSize="10" textAnchor="end" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
              {activeBand.label}: λ ≈ {activeBand.lambdaLabel} • f ≈ {activeBand.freqLabel}
            </text>
          </>
        )}
      </svg>

      {/* Controls */}
      {mode === 'rail' ? (
        <div className="space-y-3 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setAutoOscillate((a) => !a)}
                className={`min-h-[34px] px-2.5 py-1 rounded border ${
                  autoOscillate
                    ? 'bg-emerald-600 text-white border-emerald-700 font-bold'
                    : 'bg-[var(--surface-card)] text-[var(--ink-primary)] border-[var(--hairline-border)]'
                }`}
              >
                {autoOscillate ? 'สลับเลื่อนอัตโนมัติ (เปิด)' : 'สลับเลื่อนอัตโนมัติ (ปิด)'}
              </button>
              <button
                type="button"
                onClick={() => setBIntoPage((b) => !b)}
                className="min-h-[34px] px-2.5 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-[var(--ink-primary)]"
              >
                สนาม B: {bIntoPage ? '⊗ พุ่งเข้ากระดาษ' : '⊙ พุ่งออกกระดาษ'}
              </button>
            </div>
            <span className="text-[var(--ink-secondary)]">
              แรงต้าน F_B = <strong className="text-rose-700 dark:text-rose-400">{brakeForce.toFixed(2)} N</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {!autoOscillate && (
              <label className="space-y-1">
                <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                  <span>ความเร็วลวด v</span>
                  <strong className="text-[var(--ink-primary)]">{manualVel.toFixed(1)} m/s</strong>
                </div>
                <input type="range" min={-8} max={8} step={0.5} value={manualVel} onChange={(e) => setManualVel(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
              </label>
            )}
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>สนามแม่เหล็ก B</span>
                <strong className="text-[var(--ink-primary)]">{bField.toFixed(1)} T</strong>
              </div>
              <input type="range" min={0.2} max={2.0} step={0.1} value={bField} onChange={(e) => setBField(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
            </label>
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>ความต้านทานหลอดไฟ R</span>
                <strong className="text-[var(--ink-primary)]">{resistance.toFixed(0)} Ω</strong>
              </div>
              <input type="range" min={1} max={10} step={1} value={resistance} onChange={(e) => setResistance(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
            </label>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 text-[11px] font-mono">
          {SPECTRUM_BANDS.map((band) => (
            <button
              key={band.id}
              type="button"
              onClick={() => setBandId(band.id)}
              className={`min-h-[34px] px-1.5 py-1 rounded border ${
                bandId === band.id
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
                  : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
              }`}
            >
              {band.label}
            </button>
          ))}
        </div>
      )}

      {/* Insight Callout */}
      <div className="p-2.5 rounded border border-amber-300/80 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/30 text-[11px] sm:text-xs text-amber-950 dark:text-amber-200 leading-relaxed flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <FormattedMathText
          text={'กฎของเลนซ์คือหลักอนุรักษ์พลังงาน: ทิศกระแสเหนี่ยวนำจะสร้างแรงแม่เหล็ก $F_{\\text{ต้าน}} = I\\ell B$ **ต้านทิศการเคลื่อนที่ $v$ เสมอ** (ถ้าดันเสริมความเร็วจะสร้างพลังงานฟรี!) และในคลื่น EM มีความเร็วเท่ากันทุกย่านความถี่คือ $c = \\frac{1}{\\sqrt{\\mu_0\\varepsilon_0}} \\approx 3\\times 10^8\\text{ m/s}$'}
        />
      </div>
    </div>
  );
};
