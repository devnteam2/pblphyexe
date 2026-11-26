// src/components/interactive/Track2AdvancedLabs.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { FormattedMathText } from '@/components/math/LatexRenderer';
import { Sliders, Play, Pause, Sparkles } from 'lucide-react';

export type Track2LabKind = 'pulley-capstan' | 'coriolis-disk' | 'coupled-oscillators';

interface Track2AdvancedLabsProps {
  labId: Track2LabKind;
}

export const Track2AdvancedLabs: React.FC<Track2AdvancedLabsProps> = ({ labId }) => {
  // 1. Capstan Friction
  const [muCapstan, setMuCapstan] = useState<number>(0.3);
  const [turns, setTurns] = useState<number>(2.0);

  // 2. Coriolis Disk
  const [omegaDisk, setOmegaDisk] = useState<number>(1.8);
  const [radialV0, setRadialV0] = useState<number>(1.2);
  const [diskTime, setDiskTime] = useState<number>(0);
  const [diskPlaying, setDiskPlaying] = useState<boolean>(true);

  // 3. Coupled Oscillators
  const [modeKind, setModeKind] = useState<'beats' | 'symmetric' | 'antisymmetric'>('beats');
  const [oscTime, setOscTime] = useState<number>(0);
  const [oscPlaying, setOscPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (labId !== 'coriolis-disk' || !diskPlaying) return;
    let rafId = 0;
    let prevTs = performance.now();

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - prevTs) / 1000);
      prevTs = now;
      setDiskTime((t) => (t + dt) % 2.4);
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [labId, diskPlaying]);

  useEffect(() => {
    if (labId !== 'coupled-oscillators' || !oscPlaying) return;
    let rafId = 0;
    let prevTs = performance.now();

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - prevTs) / 1000);
      prevTs = now;
      setOscTime((t) => t + dt * 1.4);
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [labId, oscPlaying]);

  // =========================================================================
  // 1. CAPSTAN EXPONENTIAL FRICTION LAB (T_B = T_A e^(μθ))
  // =========================================================================
  if (labId === 'pulley-capstan') {
    const thetaRad = turns * 2 * Math.PI;
    const ratio = Math.exp(muCapstan * thetaRad);
    const tHoldKg = 10; // pulling force 10 kgf * 10 = 100 N
    const maxLoadKg = tHoldKg * ratio;

    const plotPts = Array.from({ length: 40 }, (_, i) => {
      const th = (i / 39) * 3.5 * 2 * Math.PI;
      const rVal = Math.exp(muCapstan * th);
      const maxLog = Math.log10(Math.max(10, Math.exp(muCapstan * 3.5 * 2 * Math.PI)));
      const px = 38 + (i / 39) * 204;
      const py = 158 - (Math.log10(rVal) / Math.max(0.5, maxLog)) * 124;
      return `${i === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`;
    }).join(' ');

    return (
      <div className="space-y-3 font-serif">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--ink-primary)]">
          <Sliders className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>แรงเสียดทานเชือกพันเสา Capstan Equation (T_B = T_A e^(μθ))</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Left: Bollard wrapping schematic */}
          <svg viewBox="0 0 240 175" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
            <circle cx="120" cy="82" r="32" fill="var(--surface-muted)" stroke="var(--ink-primary)" strokeWidth="2.5" />
            {Array.from({ length: Math.max(1, Math.round(turns * 2)) }, (_, k) => (
              <ellipse
                key={k}
                cx="120"
                cy={70 + k * 4.5}
                rx="35"
                ry="12"
                fill="none"
                stroke="#d97706"
                strokeWidth="2.2"
              />
            ))}
            {/* Load left (heavy) & Pull right (light) */}
            <line x1="86" y1="82" x2="86" y2="152" stroke="#dc2626" strokeWidth="2.8" />
            <rect x="68" y="130" width="36" height="24" rx="3" fill="rgba(220, 38, 38, 0.2)" stroke="#dc2626" strokeWidth="1.5" />
            <text x="86" y="145" fontSize="9" textAnchor="middle" fill="#dc2626" fontFamily="monospace" fontWeight="bold">
              {maxLoadKg >= 1000 ? `${(maxLoadKg / 1000).toFixed(1)}t` : `${maxLoadKg.toFixed(0)}kg`}
            </text>

            <line x1="154" y1="82" x2="154" y2="146" stroke="#16a34a" strokeWidth="2.2" />
            <text x="172" y="138" fontSize="9.5" fill="#16a34a" fontFamily="monospace" fontWeight="bold">
              ดึง {tHoldKg}kg
            </text>
            <text x="120" y="24" fontSize="9.5" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
              พัน {turns.toFixed(1)} รอบ (ตัวคูณ {ratio >= 1000 ? ratio.toExponential(1) : `${ratio.toFixed(1)}×`})
            </text>
          </svg>

          {/* Right: Log amplification curve */}
          <svg viewBox="0 0 260 175" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
            <line x1="38" y1="158" x2="244" y2="158" stroke="var(--ink-tertiary)" strokeWidth="1.2" />
            <line x1="38" y1="158" x2="38" y2="20" stroke="var(--ink-tertiary)" strokeWidth="1.2" />
            <text x="140" y="170" fontSize="8.5" textAnchor="middle" fill="var(--ink-secondary)" fontFamily="monospace">จำนวนรอบที่พัน θ/(2π)</text>
            <text x="44" y="22" fontSize="8.5" fill="var(--ink-secondary)" fontFamily="monospace">log₁₀(T_max / T_hold)</text>
            <path d={plotPts} fill="none" stroke="#d97706" strokeWidth="2.4" />
            <circle
              cx={38 + (turns / 3.5) * 204}
              cy={
                158 -
                (Math.log10(ratio) /
                  Math.max(0.5, Math.log10(Math.max(10, Math.exp(muCapstan * 3.5 * 2 * Math.PI))))) *
                  124
              }
              r="5"
              fill="#dc2626"
            />
          </svg>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <label className="space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>จำนวนรอบพันเสา</span>
              <strong className="text-[var(--ink-primary)]">{turns.toFixed(1)} รอบ ({thetaRad.toFixed(1)} rad)</strong>
            </div>
            <input type="range" min={0.5} max={3.5} step={0.25} value={turns} onChange={(e) => setTurns(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
          </label>
          <label className="space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>สัมประสิทธิ์เสียดทาน μ</span>
              <strong className="text-[var(--ink-primary)]">{muCapstan.toFixed(2)}</strong>
            </div>
            <input type="range" min={0.1} max={0.6} step={0.05} value={muCapstan} onChange={(e) => setMuCapstan(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
          </label>
        </div>

        <div className="p-2.5 rounded border border-amber-300/80 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/30 text-[11px] sm:text-xs text-amber-950 dark:text-amber-200 leading-relaxed flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <FormattedMathText
            text={'สมการแคปสแตน $T_{\\max} = T_{\\text{hold}} e^{\\mu\\theta}$ เติบโตแบบ **เอกซ์โพเนนเชียล!** พันเชือกรอบเสาแค่ 2–3 รอบ ก็ใช้แรงคน $10\\text{ kg}$ ยื้อเรือหนักหลายตันอยู่นิ่งได้สบาย!'}
          />
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. CORIOLIS ROTATING TURNTABLE (Inertial vs Rotating Frame)
  // =========================================================================
  if (labId === 'coriolis-disk') {
    const rMax = 72;
    const tEnd = 2.4;
    const curR = Math.min(rMax, (diskTime / tEnd) * radialV0 * 52);

    // Path of puck in inertial frame: straight along x-axis (angle 0)
    const inertTrail = Array.from({ length: 24 }, (_, i) => {
      const f = (i / 23) * (diskTime / tEnd);
      const r = Math.min(rMax, f * radialV0 * 52);
      return `${i === 0 ? 'M' : 'L'} ${(115 + r).toFixed(1)} 95`;
    }).join(' ');

    // Path in rotating frame (clockwise deflection theta_rel = -omega * t)
    const rotTrail = Array.from({ length: 28 }, (_, i) => {
      const ti = (i / 27) * diskTime;
      const r = Math.min(rMax, (ti / tEnd) * radialV0 * 52);
      const th = -omegaDisk * ti;
      return `${i === 0 ? 'M' : 'L'} ${(345 + r * Math.cos(th)).toFixed(1)} ${(95 - r * Math.sin(th)).toFixed(1)}`;
    }).join(' ');

    const rotAngleNow = -omegaDisk * diskTime;
    const puckRotX = 345 + curR * Math.cos(rotAngleNow);
    const puckRotY = 95 - curR * Math.sin(rotAngleNow);

    return (
      <div className="space-y-3 font-serif">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--ink-primary)]">
            <Sliders className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>กรอบอ้างอิงเฉื่อย vs จานหมุน (Coriolis Deflection)</span>
          </div>

          <button
            type="button"
            onClick={() => setDiskPlaying((p) => !p)}
            className="px-2.5 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-xs font-mono inline-flex items-center gap-1"
          >
            {diskPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{diskPlaying ? 'พัก' : 'เล่น'}</span>
          </button>
        </div>

        <svg viewBox="0 0 460 192" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          {/* Left Disk: Inertial Frame */}
          <circle cx="115" cy="95" r="74" fill="var(--surface-muted)" stroke="var(--ink-primary)" strokeWidth="1.6" />
          <g transform={`rotate(${(-(omegaDisk * diskTime * 180) / Math.PI).toFixed(1)} 115 95)`}>
            <line x1="115" y1="21" x2="115" y2="169" stroke="var(--hairline-border)" strokeWidth="1.4" />
            <line x1="41" y1="95" x2="189" y2="95" stroke="var(--hairline-border)" strokeWidth="1.4" />
          </g>
          <path d={inertTrail} fill="none" stroke="#16a34a" strokeWidth="2.4" />
          <circle cx={115 + curR} cy="95" r="5.5" fill="#dc2626" />
          <text x="115" y="184" fontSize="9.5" textAnchor="middle" fill="#16a34a" fontFamily="monospace" fontWeight="bold">
            กรอบเฉื่อย (เส้นตรง!)
          </text>

          {/* Right Disk: Rotating Frame */}
          <circle cx="345" cy="95" r="74" fill="var(--surface-muted)" stroke="var(--ink-primary)" strokeWidth="1.6" />
          <line x1="345" y1="21" x2="345" y2="169" stroke="var(--hairline-border)" strokeWidth="1.4" />
          <line x1="271" y1="95" x2="419" y2="95" stroke="var(--hairline-border)" strokeWidth="1.4" />
          <path d={rotTrail} fill="none" stroke="#d97706" strokeWidth="2.4" />
          <circle cx={puckRotX} cy={puckRotY} r="5.5" fill="#dc2626" />
          <text x="345" y="184" fontSize="9.5" textAnchor="middle" fill="#d97706" fontFamily="monospace" fontWeight="bold">
            บนจานหมุน (โค้งเพราะแรงคอริโอลิส!)
          </text>
        </svg>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <label className="space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>ความเร็วเชิงมุมจาน ω</span>
              <strong className="text-[var(--ink-primary)]">{omegaDisk.toFixed(1)} rad/s</strong>
            </div>
            <input type="range" min={0.6} max={3.0} step={0.2} value={omegaDisk} onChange={(e) => setOmegaDisk(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
          </label>
          <label className="space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>ความเร็วปล่อยลูกบอล v₀</span>
              <strong className="text-[var(--ink-primary)]">{radialV0.toFixed(1)}×</strong>
            </div>
            <input type="range" min={0.6} max={1.5} step={0.1} value={radialV0} onChange={(e) => setRadialV0(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
          </label>
        </div>

        <div className="p-2.5 rounded border border-amber-300/80 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/30 text-[11px] sm:text-xs text-amber-950 dark:text-amber-200 leading-relaxed flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <FormattedMathText
            text={'คนยืนอยู่นิ่งนอกจานเห็นลูกบอลวิ่ง **เส้นตรง** แต่คนที่ยืนหมุนบนจานเห็นลูกบอลเลี้ยวโค้งเหมือนมี **แรงคอริโอลิส** $\\vec{F}_{\\text{Cor}} = -2m(\\vec{\\omega}\\times\\vec{v}_{\\text{rot}})$ พัดเฉออกไปด้านข้าง!'}
          />
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. COUPLED OSCILLATORS & NORMAL MODES
  // =========================================================================
  const wSym = 3.0;
  const wAnti = 3.8;
  let xA = 0;
  let xB = 0;
  if (modeKind === 'symmetric') {
    xA = 34 * Math.cos(wSym * oscTime);
    xB = 34 * Math.cos(wSym * oscTime);
  } else if (modeKind === 'antisymmetric') {
    xA = 34 * Math.cos(wAnti * oscTime);
    xB = -34 * Math.cos(wAnti * oscTime);
  } else {
    xA = 18 * Math.cos(wSym * oscTime) + 18 * Math.cos(wAnti * oscTime);
    xB = 18 * Math.cos(wSym * oscTime) - 18 * Math.cos(wAnti * oscTime);
  }
  const eA = (xA * xA) / (36 * 36);
  const eB = (xB * xB) / (36 * 36);

  return (
    <div className="space-y-3 font-serif">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--ink-primary)]">
          <Sliders className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>ลูกตุ้มคู่ควบด้วยสปริง (Coupled Oscillators &amp; Normal Modes)</span>
        </div>
        <button
          type="button"
          onClick={() => setOscPlaying((p) => !p)}
          className="px-2.5 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-xs font-mono inline-flex items-center gap-1"
        >
          {oscPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span>{oscPlaying ? 'พัก' : 'เล่น'}</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-1.5 text-[11px] font-mono">
        {[
          { id: 'beats' as const, label: 'ถ่ายเทพลังงาน (Beats)' },
          { id: 'symmetric' as const, label: 'โหมดสมมาตร (ω₁)' },
          { id: 'antisymmetric' as const, label: 'โหมดต้านสมมาตร (ω₂)' },
        ].map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setModeKind(m.id)}
            className={`min-h-[36px] px-2 py-1 rounded border ${
              modeKind === m.id
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
                : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 460 175" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
        {/* Ceiling */}
        <line x1="60" y1="22" x2="400" y2="22" stroke="var(--ink-primary)" strokeWidth="3" />

        {/* Pendulum strings & bobs */}
        <line x1="150" y1="22" x2={150 + xA} y2="128" stroke="var(--ink-primary)" strokeWidth="2" />
        <line x1="310" y1="22" x2={310 + xB} y2="128" stroke="var(--ink-primary)" strokeWidth="2" />

        {/* Coupling spring */}
        <line
          x1={150 + xA * 0.65}
          y1="92"
          x2={310 + xB * 0.65}
          y2="92"
          stroke="#d97706"
          strokeWidth="2.4"
          strokeDasharray="6 3"
        />

        <circle cx={150 + xA} cy="128" r="12" fill="#0284c7" stroke="var(--ink-primary)" strokeWidth="1.6" />
        <circle cx={310 + xB} cy="128" r="12" fill="#d97706" stroke="var(--ink-primary)" strokeWidth="1.6" />
        <text x={150 + xA} y="132" fontSize="10" textAnchor="middle" fill="#ffffff" fontFamily="monospace" fontWeight="bold">A</text>
        <text x={310 + xB} y="132" fontSize="10" textAnchor="middle" fill="#ffffff" fontFamily="monospace" fontWeight="bold">B</text>

        <text x="150" y="160" fontSize="9.5" textAnchor="middle" fill="#0284c7" fontFamily="monospace" fontWeight="bold">
          แอมพลิจูด A: {(Math.abs(eA) * 100).toFixed(0)}%
        </text>
        <text x="310" y="160" fontSize="9.5" textAnchor="middle" fill="#d97706" fontFamily="monospace" fontWeight="bold">
          แอมพลิจูด B: {(Math.abs(eB) * 100).toFixed(0)}%
        </text>
      </svg>

      <div className="p-2.5 rounded border border-amber-300/80 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/30 text-[11px] sm:text-xs text-amber-950 dark:text-amber-200 leading-relaxed flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <FormattedMathText
          text={'ในโหมด **Beats** (ผลักแค่ลูก A) พลังงานจะไหลจาก A ไป B จน A หยุดนิ่งแล้วไหลกลับสลับไปมา! แต่ใน **Normal Modes** ($q_1 = x_A + x_B$, $q_2 = x_A - x_B$) ทั้งสองก้อนแกว่งด้วยความถี่เดียวคงที่ตลอดกาล!'}
        />
      </div>
    </div>
  );
};
