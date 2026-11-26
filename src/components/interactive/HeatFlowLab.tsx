// src/components/interactive/HeatFlowLab.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { FormattedMathText } from '@/components/math/LatexRenderer';
import { Flame, Play, Pause, Sparkles } from 'lucide-react';

type HeatMode = 'single' | 'series';

interface MaterialPreset {
  nameTh: string;
  k: number; // W/(m*K)
  color: string;
}

const MATERIALS: MaterialPreset[] = [
  { nameTh: 'ทองแดง (K=400)', k: 400, color: '#ea580c' },
  { nameTh: 'เหล็ก (K=80)', k: 80, color: '#64748b' },
  { nameTh: 'แก้ว (K=1.0)', k: 1, color: '#0ea5e9' },
  { nameTh: 'ไม้ (K=0.15)', k: 0.15, color: '#a16207' },
];

export const HeatFlowLab: React.FC = () => {
  const [mode, setMode] = useState<HeatMode>('single');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [animTime, setAnimTime] = useState<number>(0);

  // Single-rod Fourier state: Qdot = k * A * (TH - TC) / L
  const [tempHot, setTempHot] = useState<number>(120);
  const [tempCold] = useState<number>(20);
  const [kVal, setKVal] = useState<number>(400);
  const [areaCm2, setAreaCm2] = useState<number>(10);
  const [lengthCm, setLengthCm] = useState<number>(25);

  // Series 2-rod mode state
  const [kRatio, setKRatio] = useState<number>(3.0); // k1/k2 when L1=L2

  const deltaT = Math.max(0, tempHot - tempCold);
  const areaM2 = areaCm2 * 1e-4;
  const lengthM = lengthCm * 1e-2;
  const qDot = (kVal * areaM2 * deltaT) / lengthM; // Watts (J/s)

  // Logarithmic/visual speed scale so copper vs wood stays clear & smooth
  const visualSpeed = mode === 'single' ? Math.min(2.6, 0.08 + Math.log10(1 + qDot) * 0.55) : 1.0;

  useEffect(() => {
    if (!isPlaying) return;
    let rafId = 0;
    let prevTs = performance.now();

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - prevTs) / 1000);
      prevTs = now;
      setAnimTime((t) => t + dt * visualSpeed);
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, visualSpeed]);

  // SVG rod dimensions respond dynamically to Area A and Length L!
  const rodPxLen = 110 + ((lengthCm - 10) / 40) * 145; // [110..255]
  const rodHalfH = 12 + ((areaCm2 - 2) / 18) * 26; // [12..38]
  const leftReservoirRight = 230 - rodPxLen / 2;
  const rightReservoirLeft = 230 + rodPxLen / 2;

  const tMid = (kRatio * tempHot + tempCold) / (kRatio + 1);
  const numPackets = mode === 'single' ? (qDot > 40 ? 7 : qDot > 3 ? 5 : 2) : 6;

  return (
    <div className="space-y-3.5 font-serif">
      {/* Header & Mode Switch */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--ink-primary)]">
          <Flame className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          <span>ห้องทดลองการไหลของความร้อน (Q̇ = k A ΔT / L)</span>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className="px-2 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-[var(--ink-primary)] inline-flex items-center gap-1"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
            <span>{isPlaying ? 'พัก' : 'เล่น'}</span>
          </button>

          <div className="inline-flex rounded border border-[var(--hairline-border)] overflow-hidden">
            <button
              type="button"
              onClick={() => setMode('single')}
              className={`px-2 py-1 ${mode === 'single' ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold' : 'bg-[var(--surface-card)] text-[var(--ink-secondary)]'}`}
            >
              แท่งเดี่ยว kAΔT/L
            </button>
            <button
              type="button"
              onClick={() => setMode('series')}
              className={`px-2 py-1 border-l border-[var(--hairline-border)] ${mode === 'series' ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold' : 'bg-[var(--surface-card)] text-[var(--ink-secondary)]'}`}
            >
              ต่ออนุกรม 2 แท่ง
            </button>
          </div>
        </div>
      </div>

      {/* Animated Heat Conduction SVG */}
      <svg viewBox="0 0 460 192" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
        <defs>
          <linearGradient id="heatRodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.82" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.52" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.82" />
          </linearGradient>
        </defs>

        {mode === 'single' ? (
          <>
            {/* Hot & Cold Boxes */}
            <rect x={leftReservoirRight - 72} y="34" width="72" height="114" rx="5" fill="rgba(239, 68, 68, 0.18)" stroke="#dc2626" strokeWidth="2" />
            <text x={leftReservoirRight - 36} y="88" fontSize="11" textAnchor="middle" fill="#dc2626" fontFamily="monospace" fontWeight="bold">
              {tempHot}°C
            </text>
            <text x={leftReservoirRight - 36} y="105" fontSize="8.5" textAnchor="middle" fill="var(--ink-secondary)" fontFamily="monospace">
              แหล่งร้อน T_H
            </text>

            <rect x={rightReservoirLeft} y="34" width="72" height="114" rx="5" fill="rgba(2, 132, 199, 0.18)" stroke="#0284c7" strokeWidth="2" />
            <text x={rightReservoirLeft + 36} y="88" fontSize="11" textAnchor="middle" fill="#0284c7" fontFamily="monospace" fontWeight="bold">
              {tempCold}°C
            </text>
            <text x={rightReservoirLeft + 36} y="105" fontSize="8.5" textAnchor="middle" fill="var(--ink-secondary)" fontFamily="monospace">
              แหล่งเย็น T_C
            </text>

            {/* Conducting Rod (Resizes with A & L!) */}
            <rect
              x={leftReservoirRight}
              y={91 - rodHalfH}
              width={rodPxLen}
              height={rodHalfH * 2}
              fill="url(#heatRodGrad)"
              stroke="var(--ink-primary)"
              strokeWidth="1.6"
            />

            {/* Vibrating Atoms along rod (stronger vibration on hot left side!) */}
            {[0.12, 0.28, 0.44, 0.6, 0.76, 0.9].map((frac, idx) => {
              const ax = leftReservoirRight + frac * rodPxLen;
              const vibAmp = (1 - frac * 0.75) * (tempHot / 90) * 3.2;
              const ay = 91 + vibAmp * Math.sin(animTime * 9 + idx * 1.7);
              return <circle key={idx} cx={ax} cy={ay} r="3" fill="var(--ink-primary)" opacity="0.5" />;
            })}

            {/* Moving Glowing Heat Packets */}
            {Array.from({ length: numPackets }, (_, idx) => {
              const prog = (animTime * 0.55 + idx / numPackets) % 1;
              const px = leftReservoirRight + prog * rodPxLen;
              const py = 91 + (idx % 2 === 0 ? -1 : 1) * (rodHalfH * 0.38);
              return (
                <g key={idx}>
                  <circle cx={px} cy={py} r="6.5" fill="rgba(249, 115, 22, 0.35)" />
                  <circle cx={px} cy={py} r="3.4" fill="#f97316" />
                </g>
              );
            })}

            {/* Dimension L and A labels cleanly above reservoirs */}
            <text x="230" y="18" fontSize="9.5" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
              ยาว L = {lengthCm} cm • หน้าตัด A = {areaCm2} cm²
            </text>
            <text x="230" y="176" fontSize="10" textAnchor="middle" fill="#ea580c" fontFamily="monospace" fontWeight="bold">
              อัตราการไหลความร้อน Q̇ = {qDot >= 10 ? qDot.toFixed(1) : qDot.toFixed(2)} J/s (Watt)
            </text>
          </>
        ) : (
          <>
            {/* Series 2-Rod Steady Conduction */}
            <rect x="26" y="34" width="66" height="114" rx="5" fill="rgba(239, 68, 68, 0.18)" stroke="#dc2626" strokeWidth="2" />
            <text x="59" y="88" fontSize="11" textAnchor="middle" fill="#dc2626" fontFamily="monospace" fontWeight="bold">{tempHot}°C</text>
            <text x="59" y="105" fontSize="8.5" textAnchor="middle" fill="var(--ink-secondary)" fontFamily="monospace">ร้อน T_H</text>

            <rect x="368" y="34" width="66" height="114" rx="5" fill="rgba(2, 132, 199, 0.18)" stroke="#0284c7" strokeWidth="2" />
            <text x="401" y="88" fontSize="11" textAnchor="middle" fill="#0284c7" fontFamily="monospace" fontWeight="bold">{tempCold}°C</text>
            <text x="401" y="105" fontSize="8.5" textAnchor="middle" fill="var(--ink-secondary)" fontFamily="monospace">เย็น T_C</text>

            <rect x="92" y="64" width="138" height="54" fill="url(#heatRodGrad)" stroke="var(--ink-primary)" strokeWidth="1.6" />
            <rect x="230" y="64" width="138" height="54" fill="url(#heatRodGrad)" stroke="var(--ink-primary)" strokeWidth="1.6" />
            <line x1="230" y1="52" x2="230" y2="132" stroke="var(--ink-primary)" strokeWidth="2" strokeDasharray="3 2" />

            <text x="161" y="94" fontSize="10" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">แท่ง 1 (K₁)</text>
            <text x="299" y="94" fontSize="10" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">แท่ง 2 (K₂)</text>
            <text x="230" y="150" fontSize="10.5" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
              รอยต่อ T_mid = {tMid.toFixed(1)}°C (ฟลักซ์ J₁ = J₂)
            </text>

            {Array.from({ length: 6 }, (_, idx) => {
              const prog = (animTime * 0.55 + idx / 6) % 1;
              const px = 94 + prog * 272;
              return (
                <g key={idx}>
                  <circle cx={px} cy={78 + (idx % 2) * 24} r="5.5" fill="rgba(249, 115, 22, 0.35)" />
                  <circle cx={px} cy={78 + (idx % 2) * 24} r="3" fill="#f97316" />
                </g>
              );
            })}
          </>
        )}
      </svg>

      {mode === 'single' ? (
        <>
          {/* Material Presets */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px] font-mono">
            {MATERIALS.map((mat) => (
              <button
                key={mat.nameTh}
                type="button"
                onClick={() => setKVal(mat.k)}
                className={`min-h-[34px] px-2 py-1 rounded border transition-colors ${
                  Math.abs(kVal - mat.k) < 0.01
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
                    : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
                }`}
              >
                {mat.nameTh}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>อุณหภูมิร้อน T_H</span>
                <strong className="text-[var(--ink-primary)]">{tempHot}°C (ΔT={deltaT}°C)</strong>
              </div>
              <input type="range" min={40} max={200} step={5} value={tempHot} onChange={(e) => setTempHot(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
            </label>
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>พื้นที่หน้าตัด A</span>
                <strong className="text-[var(--ink-primary)]">{areaCm2} cm²</strong>
              </div>
              <input type="range" min={2} max={20} step={1} value={areaCm2} onChange={(e) => setAreaCm2(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
            </label>
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>ความยาวแท่ง L</span>
                <strong className="text-[var(--ink-primary)]">{lengthCm} cm</strong>
              </div>
              <input type="range" min={10} max={50} step={5} value={lengthCm} onChange={(e) => setLengthCm(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
            </label>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <label className="space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>อุณหภูมิฝั่งร้อน T_H</span>
              <strong className="text-[var(--ink-primary)]">{tempHot}°C</strong>
            </div>
            <input type="range" min={40} max={200} step={5} value={tempHot} onChange={(e) => setTempHot(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
          </label>
          <label className="space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>อัตราส่วนนำความร้อน K₁ / K₂</span>
              <strong className="text-[var(--ink-primary)]">{kRatio.toFixed(1)}×</strong>
            </div>
            <input type="range" min={0.5} max={5.0} step={0.5} value={kRatio} onChange={(e) => setKRatio(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
          </label>
        </div>
      )}

      <div className="p-2.5 rounded border border-amber-300/80 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/30 text-[11px] sm:text-xs text-amber-950 dark:text-amber-200 leading-relaxed flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <FormattedMathText
          text={'สมการนำความร้อนฟูเรียร์: $\\dot{Q} = \\frac{k A \\Delta T}{L}$ — ลองกด **ทองแดง ($k=400$)** เทียบกับ **ไม้ ($k=0.15$)** แล้วสังเกตความเร็วอนุภาคความร้อน: แท่งยิ่ง **หนา ($A \\uparrow$)** ยิ่งนำเร็ว แต่ยิ่ง **ยาว ($L \\uparrow$)** ความร้อนยิ่งไหลช้าลง!'}
        />
      </div>
    </div>
  );
};
