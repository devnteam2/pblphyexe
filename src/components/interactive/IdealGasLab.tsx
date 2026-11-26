// src/components/interactive/IdealGasLab.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FormattedMathText } from '@/components/math/LatexRenderer';
import { Flame, Play, Pause, Sparkles } from 'lucide-react';

type GasProcess = 'free' | 'isobaric' | 'isochoric' | 'isothermal' | 'adiabatic';

interface Particle {
  nx: number;
  ny: number;
  dx: number;
  dy: number;
}

const R_GAS = 8.314;

// Deterministic seeded particle positions & directions (zero Math.random in render!)
function buildSeededParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = ((i * 137.5) % 360) * (Math.PI / 180);
    return {
      nx: ((i * 29 + 17) % 86 + 7) / 100,
      ny: ((i * 53 + 11) % 86 + 7) / 100,
      dx: Math.cos(angle),
      dy: Math.sin(angle),
    };
  });
}

export const IdealGasLab: React.FC = () => {
  const [process, setProcess] = useState<GasProcess>('free');
  const [dof, setDof] = useState<3 | 5>(3); // Monatomic f=3 vs Diatomic f=5
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const [moles, setMoles] = useState<number>(1.0);
  const [tempK, setTempK] = useState<number>(300);
  const [volL, setVolL] = useState<number>(10.0); // [4..20] Liters
  const [anchor, setAnchor] = useState<{ T0: number; V0: number; P0: number }>({
    T0: 300,
    V0: 10.0,
    P0: (1.0 * R_GAS * 300) / 10.0, // kPa (since R*T/L in J/L = kPa)
  });

  const particlesRef = useRef<Particle[]>(buildSeededParticles(32));
  const [renderParticles, setRenderParticles] = useState<Particle[]>(() => buildSeededParticles(32));

  const gamma = (dof + 2) / dof;
  const pressKpa = (moles * R_GAS * tempK) / volL; // 1 J/L = 1 kPa
  const internalU = (dof / 2) * moles * R_GAS * tempK; // Joules
  const vRms = Math.sqrt((3 * R_GAS * tempK) / 0.028); // approx N2 molar mass 28 g/mol

  const speedScaleRef = useRef(Math.sqrt(tempK / 300));
  useEffect(() => {
    speedScaleRef.current = Math.sqrt(tempK / 300);
  }, [tempK]);

  useEffect(() => {
    if (!isPlaying) return;
    let rafId = 0;
    let prevTs = performance.now();

    const step = (now: number) => {
      const dt = Math.min(0.035, (now - prevTs) / 1000);
      prevTs = now;
      const vFactor = speedScaleRef.current * 0.72;

      const updated = particlesRef.current.map((pt) => {
        let nx = pt.nx + pt.dx * vFactor * dt;
        let ny = pt.ny + pt.dy * vFactor * dt;
        let dx = pt.dx;
        let dy = pt.dy;
        if (nx < 0.04) {
          nx = 0.04;
          dx = Math.abs(dx);
        } else if (nx > 0.96) {
          nx = 0.96;
          dx = -Math.abs(dx);
        }
        if (ny < 0.05) {
          ny = 0.05;
          dy = Math.abs(dy);
        } else if (ny > 0.95) {
          ny = 0.95;
          dy = -Math.abs(dy);
        }
        return { nx, ny, dx, dy };
      });
      particlesRef.current = updated;
      setRenderParticles(updated);

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying]);

  const handleSelectProcess = (next: GasProcess) => {
    setProcess(next);
    setAnchor({ T0: tempK, V0: volL, P0: pressKpa });
  };

  const handleVolumeSlider = (nextV: number) => {
    setVolL(nextV);
    if (process === 'isobaric') {
      // P const -> T proportional to V
      const nextT = Math.max(150, Math.min(600, (anchor.T0 * nextV) / anchor.V0));
      setTempK(Math.round(nextT));
    } else if (process === 'adiabatic') {
      // T * V^(gamma-1) = const
      const nextT = Math.max(
        150,
        Math.min(600, anchor.T0 * Math.pow(anchor.V0 / nextV, gamma - 1))
      );
      setTempK(Math.round(nextT));
    }
  };

  const handleTempSlider = (nextT: number) => {
    setTempK(nextT);
    if (process === 'isobaric') {
      const nextV = Math.max(4, Math.min(20, (anchor.V0 * nextT) / anchor.T0));
      setVolL(Number(nextV.toFixed(1)));
    }
  };

  // Work & Delta U summary relative to anchor (when constrained process is active)
  const deltaU = (dof / 2) * moles * R_GAS * (tempK - anchor.T0);
  let deltaW = 0;
  if (process === 'isobaric') {
    deltaW = anchor.P0 * (volL - anchor.V0);
  } else if (process === 'isothermal') {
    deltaW = moles * R_GAS * tempK * Math.log(volL / anchor.V0);
  } else if (process === 'adiabatic') {
    deltaW = -deltaU;
  } else if (process === 'free') {
    deltaW = 0;
  }
  const deltaQ = process === 'adiabatic' ? 0 : deltaU + deltaW;

  // Color ramp by temperature
  const particleColor =
    tempK < 250 ? '#0284c7' : tempK < 420 ? '#d97706' : '#dc2626';

  // Cylinder geometry (left panel x=[26..182], floor y=188, top y=34)
  const cylFloor = 188;
  const maxGasH = 148;
  const gasH = (volL / 20) * maxGasH;
  const pistonY = cylFloor - gasH;

  // PV Diagram geometry (right panel x=[238..438], y=[28..184], V in [3..22], P in [0..800 kPa])
  const mapPvX = (v: number) => 238 + ((v - 3) / 19) * 200;
  const mapPvY = (p: number) => 184 - (Math.min(800, p) / 800) * 150;

  const pvCurvePoints = Array.from({ length: 30 }, (_, i) => {
    const v = 4 + (i / 29) * 16;
    let pCurve = (moles * R_GAS * tempK) / v; // isothermal curve at current T
    if (process === 'adiabatic') {
      pCurve = anchor.P0 * Math.pow(anchor.V0 / v, gamma);
    } else if (process === 'isobaric') {
      pCurve = anchor.P0;
    }
    return { x: mapPvX(v), y: mapPvY(pCurve) };
  });
  const pvCurvePath =
    process === 'isochoric'
      ? `M ${mapPvX(volL)} ${mapPvY(Math.min(750, pressKpa * 1.4))} L ${mapPvX(volL)} ${mapPvY(Math.max(40, pressKpa * 0.4))}`
      : pvCurvePoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

  return (
    <div className="space-y-3.5 font-serif">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--ink-primary)]">
          <Flame className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          <span>ห้องทดลองแก๊สอุดมคติ ลูกสูบโมเลกุล &amp; กราฟ P–V</span>
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

      {/* Process Tabs */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 text-[11px] font-mono">
        {[
          { id: 'free' as const, label: 'อิสระ' },
          { id: 'isobaric' as const, label: 'P คงที่' },
          { id: 'isochoric' as const, label: 'V คงที่' },
          { id: 'isothermal' as const, label: 'T คงที่' },
          { id: 'adiabatic' as const, label: 'ไม่ถ่ายเท Q=0' },
        ].map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => handleSelectProcess(p.id)}
            className={`min-h-[34px] px-1.5 py-1 rounded border ${
              process === p.id
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
                : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Dual SVG Stage: Piston Cylinder + PV Diagram */}
      <svg viewBox="0 0 460 220" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
        {/* Left: Cylinder */}
        <rect x="34" y={pistonY} width="142" height={gasH} fill="rgba(245, 158, 11, 0.08)" />
        <polyline points="34,30 34,188 176,188 176,30" fill="none" stroke="var(--ink-primary)" strokeWidth="2.4" />
        {/* Movable Piston */}
        <rect x="36" y={pistonY - 12} width="138" height="12" fill="var(--surface-muted)" stroke="var(--ink-primary)" strokeWidth="2" />
        <rect x="100" y="20" width="10" height={Math.max(4, pistonY - 32)} fill="var(--ink-tertiary)" />

        {/* Gas Molecules */}
        {renderParticles.slice(0, Math.round(moles * 24)).map((pt, idx) => (
          <circle
            key={idx}
            cx={38 + pt.nx * 134}
            cy={pistonY + 4 + pt.ny * Math.max(10, gasH - 8)}
            r="3.2"
            fill={particleColor}
          />
        ))}
        <text x="105" y="206" fontSize="9.5" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
          V={volL.toFixed(1)}L • v_rms≈{vRms.toFixed(0)}m/s
        </text>

        {/* Right: P-V Diagram */}
        <line x1="238" y1="184" x2="442" y2="184" stroke="var(--ink-tertiary)" strokeWidth="1.2" />
        <line x1="238" y1="184" x2="238" y2="34" stroke="var(--ink-tertiary)" strokeWidth="1.2" />
        <text x="440" y="198" fontSize="9" textAnchor="end" fill="var(--ink-secondary)" fontFamily="monospace">V (L)</text>
        <text x="234" y="34" fontSize="9" textAnchor="end" fill="var(--ink-secondary)" fontFamily="monospace">P</text>

        {/* Shaded work area under path between V0 and V */}
        {process !== 'free' && process !== 'isochoric' && Math.abs(volL - anchor.V0) > 0.2 && (
          <polygon
            points={`${mapPvX(anchor.V0)},184 ${mapPvX(anchor.V0)},${mapPvY(anchor.P0)} ${mapPvX(volL)},${mapPvY(pressKpa)} ${mapPvX(volL)},184`}
            fill="rgba(2, 132, 199, 0.14)"
          />
        )}

        <path d={pvCurvePath} fill="none" stroke="#d97706" strokeWidth="2.2" />
        <circle cx={mapPvX(volL)} cy={mapPvY(pressKpa)} r="5.5" fill="#0284c7" stroke="white" strokeWidth="1.5" />
        <rect x="262" y="6" width="166" height="19" rx="4" fill="var(--surface-card)" fillOpacity="0.92" />
        <text x="345" y="19" fontSize="9.5" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
          P = {pressKpa.toFixed(0)} kPa • γ = {gamma.toFixed(2)}
        </text>
      </svg>

      {/* DOF + Sliders */}
      <div className="space-y-2.5 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex rounded border border-[var(--hairline-border)] overflow-hidden font-mono text-[11px]">
            <button
              type="button"
              onClick={() => setDof(3)}
              className={`px-2.5 py-1 ${dof === 3 ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold' : 'bg-[var(--surface-card)] text-[var(--ink-secondary)]'}`}
            >
              อะตอมเดี่ยว (f=3, γ=5/3)
            </button>
            <button
              type="button"
              onClick={() => setDof(5)}
              className={`px-2.5 py-1 border-l border-[var(--hairline-border)] ${dof === 5 ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold' : 'bg-[var(--surface-card)] text-[var(--ink-secondary)]'}`}
            >
              2 อะตอม (f=5, γ=7/5)
            </button>
          </div>
          <span className="font-mono text-[11px] text-[var(--ink-secondary)]">
            U = <strong className="text-orange-600 dark:text-orange-400">{(internalU / 1000).toFixed(2)} kJ</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <label className="space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>อุณหภูมิ T</span>
              <strong className="text-[var(--ink-primary)]">{tempK} K</strong>
            </div>
            <input
              type="range"
              min={150}
              max={600}
              step={10}
              disabled={process === 'isothermal' || process === 'adiabatic'}
              value={tempK}
              onChange={(e) => handleTempSlider(parseInt(e.target.value, 10))}
              className="bridge-slider w-full cursor-pointer disabled:opacity-45"
            />
          </label>
          <label className="space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>ปริมาตร V</span>
              <strong className="text-[var(--ink-primary)]">{volL.toFixed(1)} L</strong>
            </div>
            <input
              type="range"
              min={4}
              max={20}
              step={0.5}
              disabled={process === 'isochoric'}
              value={volL}
              onChange={(e) => handleVolumeSlider(parseFloat(e.target.value))}
              className="bridge-slider w-full cursor-pointer disabled:opacity-45"
            />
          </label>
          <label className="space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>จำนวนโมล n</span>
              <strong className="text-[var(--ink-primary)]">{moles.toFixed(1)} mol</strong>
            </div>
            <input type="range" min={0.5} max={2.0} step={0.5} value={moles} onChange={(e) => setMoles(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
          </label>
        </div>
      </div>

      {/* First Law Bar */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
        <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <span className="block text-[10px] text-[var(--ink-tertiary)]">ความร้อน ΔQ</span>
          <strong className="text-orange-700 dark:text-orange-400">{(deltaQ / 1000).toFixed(2)} kJ</strong>
        </div>
        <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <span className="block text-[10px] text-[var(--ink-tertiary)]">เปลี่ยนพลังงานภายใน ΔU</span>
          <strong className="text-amber-700 dark:text-amber-400">{(deltaU / 1000).toFixed(2)} kJ</strong>
        </div>
        <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <span className="block text-[10px] text-[var(--ink-tertiary)]">งานที่แก๊สทำ ΔW</span>
          <strong className="text-sky-700 dark:text-sky-400">{(deltaW / 1000).toFixed(2)} kJ</strong>
        </div>
      </div>

      {/* Insight Callout */}
      <div className="p-2.5 rounded border border-amber-300/80 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/30 text-[11px] sm:text-xs text-amber-950 dark:text-amber-200 leading-relaxed flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <FormattedMathText
          text={'สมการแก๊สอุดมคติ $PV = nRT$ กับกฎข้อที่ 1 ($\\Delta Q = \\Delta U + \\Delta W$): ลองเลือกโหมด **ไม่ถ่ายเท Q=0 (Adiabatic)** แล้วบีบอัดลูกสูบให้ปริมาตร $V$ ลดลง แม้ไม่ใส่ความร้อน แต่อุณหภูมิและโมเลกุลจะพุ่งแรงขึ้นทันที!'}
        />
      </div>
    </div>
  );
};
