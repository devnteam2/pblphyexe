// src/components/interactive/ConceptBridgeLab.tsx
'use client';

import React, { useState } from 'react';
import { InteractiveLabId } from '@/data/lessonBridges';
import { PreCampVisualLabs, PreCampLabId } from './PreCampVisualLabs';
import { ProjectileShooterLab } from './ProjectileShooterLab';
import { WaveInterferenceLab } from './WaveInterferenceLab';
import { SnellFermatLab } from './SnellFermatLab';
import { MomentumCollisionLab } from './MomentumCollisionLab';
import { CircuitBuilderLab } from './CircuitBuilderLab';
import { MagnetFieldLab } from './MagnetFieldLab';
import { HeatFlowLab } from './HeatFlowLab';
import { NewtonLawsLab } from './NewtonLawsLab';
import { WorkEnergyLab } from './WorkEnergyLab';
import { CircularMotionLab } from './CircularMotionLab';
import { FluidBuoyancyLab } from './FluidBuoyancyLab';
import { IdealGasLab } from './IdealGasLab';
import { ElectrostaticsLab } from './ElectrostaticsLab';
import { FaradayEmWaveLab } from './FaradayEmWaveLab';
import { LightOpticsBenchLab } from './LightOpticsBenchLab';
import { CombinedOpticsLab } from './CombinedOpticsLab';
import { SoundDopplerLab } from './SoundDopplerLab';
import { Camp2PhysicsLabs, Camp2LabKind } from './Camp2PhysicsLabs';
import { Track2AdvancedLabs, Track2LabKind } from './Track2AdvancedLabs';
import { Sliders } from 'lucide-react';

interface ConceptBridgeLabProps {
  labId: InteractiveLabId;
}

const ConceptBridgeLabInner: React.FC<ConceptBridgeLabProps> = ({ labId }) => {
  // Derivative lab state
  const [deltaT, setDeltaT] = useState<number>(1.2);
  // Integral lab state
  const [numRects, setNumRects] = useState<number>(4);
  // Potential well lab state
  const [marbleX, setMarbleX] = useState<number>(0.85);
  // Resonance lab state
  const [gamma, setGamma] = useState<number>(0.36);
  const [freqRatio, setFreqRatio] = useState<number>(0.85);

  if (labId === 'newton-laws-lab') {
    return <NewtonLawsLab />;
  }
  if (labId === 'projectile-shooter') {
    return <ProjectileShooterLab />;
  }
  if (labId === 'work-energy-coaster') {
    return <WorkEnergyLab />;
  }
  if (labId === 'circular-motion-lab') {
    return <CircularMotionLab />;
  }
  if (labId === 'fluid-buoyancy-lab') {
    return <FluidBuoyancyLab />;
  }
  if (labId === 'ideal-gas-lab') {
    return <IdealGasLab />;
  }
  if (labId === 'electrostatics-field-lab') {
    return <ElectrostaticsLab />;
  }
  if (labId === 'faraday-em-wave-lab') {
    return <FaradayEmWaveLab />;
  }
  if (labId === 'light-optics-bench') {
    return <LightOpticsBenchLab />;
  }
  if (labId === 'combined-optics-lab') {
    return <CombinedOpticsLab />;
  }
  if (labId === 'sound-doppler-lab') {
    return <SoundDopplerLab />;
  }
  if (labId === 'wave-interference') {
    return <WaveInterferenceLab />;
  }
  if (labId === 'snell-fermat') {
    return <SnellFermatLab />;
  }
  if (labId === 'momentum-collision') {
    return <MomentumCollisionLab />;
  }
  if (labId === 'circuit-builder') {
    return <CircuitBuilderLab />;
  }
  if (labId === 'magnet-field') {
    return <MagnetFieldLab />;
  }
  if (labId === 'heat-flow') {
    return <HeatFlowLab />;
  }
  if (
    labId === 'vector-calculus-lab' ||
    labId === 'drag-terminal-lab' ||
    labId === 'rocket-com-lab' ||
    labId === 'rolling-race-lab' ||
    labId === 'kepler-orbit-lab' ||
    labId === 'shm-phase-lab'
  ) {
    return <Camp2PhysicsLabs labId={labId as Camp2LabKind} />;
  }
  if (labId === 'pulley-capstan' || labId === 'coriolis-disk' || labId === 'coupled-oscillators') {
    return <Track2AdvancedLabs labId={labId as Track2LabKind} />;
  }

  const preCampLabs: PreCampLabId[] = [
    'incline-wedge',
    'projectile-collision',
    'circular-equilibrium',
    'bernoulli-pipe',
    'temperature-box',
    'electric-capacitor',
    'rc-circuit-box',
    'magnetic-wire',
    'optics-ray-tracer',
  ];

  if (preCampLabs.includes(labId as PreCampLabId)) {
    return <PreCampVisualLabs labId={labId as PreCampLabId} />;
  }

  if (labId === 'derivative-slope') {
    const t0 = 2.0;
    const x0 = 0.5 * t0 * t0; // 2.0
    const t1 = t0 + deltaT;
    const x1 = 0.5 * t1 * t1;
    const vAvg = (x1 - x0) / deltaT;
    const vExact = t0; // dx/dt of 0.5*t^2 is t => 2.0 m/s
    const errPct = ((vAvg - vExact) / vExact) * 100;

    // SVG coordinates: t in [0, 4.3] -> px [38, 342], x in [0, 9.2] -> py [165, 18]
    const toPx = (t: number) => 38 + (t / 4.3) * 304;
    const toPy = (x: number) => 165 - (x / 9.2) * 147;

    const curvePoints = Array.from({ length: 44 }, (_, i) => {
      const t = i * 0.1;
      const x = 0.5 * t * t;
      return `${i === 0 ? 'M' : 'L'} ${toPx(t).toFixed(1)} ${toPy(x).toFixed(1)}`;
    }).join(' ');

    // Tangent line at t0=2: x_tan(t) = 2.0 + 2.0*(t - 2.0)
    const tanT1 = 0.8;
    const tanT2 = 3.6;
    const tanX1 = x0 + vExact * (tanT1 - t0);
    const tanX2 = x0 + vExact * (tanT2 - t0);

    return (
      <div className="space-y-3 font-serif">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--ink-primary)]">
            <Sliders className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>ทดลองบีบช่วงเวลา Δt → 0 บนกราฟ x(t) = ½t²</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono">
            {[1.6, 0.6, 0.05].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setDeltaT(preset)}
                className={`px-2 py-0.5 rounded border transition-colors ${
                  Math.abs(deltaT - preset) < 0.03
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100 font-bold'
                    : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
                }`}
              >
                Δt={preset}s
              </button>
            ))}
          </div>
        </div>

        <svg viewBox="0 0 360 185" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          {/* Axes */}
          <line x1="38" y1="165" x2="345" y2="165" stroke="var(--ink-tertiary)" strokeWidth="1" />
          <line x1="38" y1="165" x2="38" y2="14" stroke="var(--ink-tertiary)" strokeWidth="1" />
          <text x="344" y="178" fontSize="9" fill="var(--ink-secondary)" textAnchor="end" fontFamily="monospace">t (s)</text>
          <text x="32" y="20" fontSize="9" fill="var(--ink-secondary)" textAnchor="end" fontFamily="monospace">x (m)</text>

          {/* Tangent line (exact dx/dt) */}
          <line
            x1={toPx(tanT1)}
            y1={toPy(tanX1)}
            x2={toPx(tanT2)}
            y2={toPy(tanX2)}
            stroke="#0284c7"
            strokeWidth="1.8"
            strokeDasharray="4 3"
          />

          {/* Curve x = 0.5 t^2 */}
          <path d={curvePoints} fill="none" stroke="var(--ink-primary)" strokeWidth="2.2" />

          {/* Delta t & Delta x legs */}
          <line x1={toPx(t0)} y1={toPy(x0)} x2={toPx(t1)} y2={toPy(x0)} stroke="var(--ink-tertiary)" strokeWidth="1" strokeDasharray="2 2" />
          <line x1={toPx(t1)} y1={toPy(x0)} x2={toPx(t1)} y2={toPy(x1)} stroke="var(--ink-tertiary)" strokeWidth="1" strokeDasharray="2 2" />

          {/* Secant line */}
          <line
            x1={toPx(t0)}
            y1={toPy(x0)}
            x2={toPx(t1)}
            y2={toPy(x1)}
            stroke="#d97706"
            strokeWidth="2.4"
          />

          {/* Anchor & moving point */}
          <circle cx={toPx(t0)} cy={toPy(x0)} r="4" fill="#0284c7" />
          <circle cx={toPx(t1)} cy={toPy(x1)} r="4" fill="#d97706" />

          {/* Legend */}
          <rect x="48" y="16" width="150" height="36" rx="4" fill="var(--surface-muted)" stroke="var(--hairline-border)" strokeWidth="0.8" />
          <line x1="56" y1="28" x2="72" y2="28" stroke="#d97706" strokeWidth="2.4" />
          <text x="78" y="31" fontSize="9" fill="var(--ink-primary)" fontFamily="monospace">Secant Δx/Δt</text>
          <line x1="56" y1="42" x2="72" y2="42" stroke="#0284c7" strokeWidth="1.8" strokeDasharray="4 3" />
          <text x="78" y="45" fontSize="9" fill="var(--ink-primary)" fontFamily="monospace">Tangent dx/dt</text>
        </svg>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--ink-secondary)]">
            <span>ปรับช่วงเวลา Δt = <strong className="text-[var(--ink-primary)]">{deltaT.toFixed(2)} s</strong></span>
            <span className="text-[11px]">{deltaT <= 0.1 ? 'แทบซ้อนเส้นสัมผัสแล้ว!' : 'ลากซ้ายเพื่อบีบ Δt → 0'}</span>
          </div>
          <input
            type="range"
            min={0.05}
            max={2.0}
            step={0.05}
            value={deltaT}
            onChange={(e) => setDeltaT(parseFloat(e.target.value))}
            aria-label="Adjust delta t"
            className="bridge-slider w-full cursor-pointer"
          />
          <div className="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
            <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
              <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">Δx / Δt (เฉลี่ย)</span>
              <span className="font-mono font-bold text-amber-700 dark:text-amber-400">{vAvg.toFixed(2)} m/s</span>
            </div>
            <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
              <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">dx / dt (ขณะ t=2s)</span>
              <span className="font-mono font-bold text-sky-700 dark:text-sky-400">{vExact.toFixed(2)} m/s</span>
            </div>
            <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
              <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">ความคลาดเคลื่อน</span>
              <span className="font-mono font-bold text-[var(--ink-primary)]">+{errPct.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (labId === 'integral-work') {
    // Variable force F(x) = 2x over x in [0, 4], exact area W = 16 J
    const exactW = 16.0;
    const dx = 4.0 / numRects;
    const approxW = 4.0 * (4.0 * (1 - 1 / numRects)); // Left sum of 2x over [0,4]: 2 * dx^2 * sum_{i=0}^{N-1} i = 16*(1 - 1/N)
    const toPx = (x: number) => 38 + (x / 4.2) * 304;
    const toPy = (f: number) => 162 - (f / 8.5) * 140;

    return (
      <div className="space-y-3 font-serif">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--ink-primary)]">
            <Sliders className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>ซอยขั้นบันได N ช่วงเพื่อรวมงาน ∫ F(x) dx (เมื่อ F(x) = 2x)</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono">
            {[2, 8, 32].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setNumRects(preset)}
                className={`px-2 py-0.5 rounded border transition-colors ${
                  numRects === preset
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100 font-bold'
                    : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
                }`}
              >
                N={preset}
              </button>
            ))}
          </div>
        </div>

        <svg viewBox="0 0 360 185" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          {/* Exact triangle shaded lightly */}
          <polygon
            points={`${toPx(0)},${toPy(0)} ${toPx(4)},${toPy(0)} ${toPx(4)},${toPy(8)}`}
            fill="rgba(2, 132, 199, 0.12)"
          />

          {/* Riemann Rectangles (midpoint heights show stair-steps cleanly using left sum) */}
          {Array.from({ length: numRects }, (_, i) => {
            const xStart = i * dx;
            const fLeft = 2 * xStart;
            const xPx = toPx(xStart);
            const wPx = toPx(xStart + dx) - xPx;
            const topY = toPy(fLeft);
            const hPx = Math.max(0, toPy(0) - topY);
            return (
              <rect
                key={i}
                x={xPx}
                y={topY}
                width={wPx}
                height={hPx}
                fill="rgba(217, 119, 6, 0.25)"
                stroke="#d97706"
                strokeWidth="1"
              />
            );
          })}

          {/* Exact F(x) = 2x line */}
          <line x1={toPx(0)} y1={toPy(0)} x2={toPx(4)} y2={toPy(8)} stroke="#0284c7" strokeWidth="2.4" />

          {/* Axes */}
          <line x1="38" y1="162" x2="345" y2="162" stroke="var(--ink-tertiary)" strokeWidth="1" />
          <line x1="38" y1="162" x2="38" y2="14" stroke="var(--ink-tertiary)" strokeWidth="1" />
          <text x="344" y="176" fontSize="9" fill="var(--ink-secondary)" textAnchor="end" fontFamily="monospace">x (m)</text>
          <text x="32" y="20" fontSize="9" fill="var(--ink-secondary)" textAnchor="end" fontFamily="monospace">F (N)</text>
        </svg>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--ink-secondary)]">
            <span>จำนวนแท่งซอย N = <strong className="text-[var(--ink-primary)]">{numRects}</strong> (Δx = {dx.toFixed(2)} m)</span>
            <span className="text-[11px]">{numRects >= 24 ? 'พื้นที่สี่เหลี่ยมชิดกราฟจริงแล้ว!' : 'เพิ่ม N เพื่อลดช่องว่าง'}</span>
          </div>
          <input
            type="range"
            min={2}
            max={32}
            step={1}
            value={numRects}
            onChange={(e) => setNumRects(parseInt(e.target.value, 10))}
            aria-label="Adjust number of Riemann rectangles"
            className="bridge-slider w-full cursor-pointer"
          />
          <div className="grid grid-cols-2 gap-2 pt-1 text-center text-xs">
            <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
              <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">ผลรวมขั้นบันได ∑ F·Δx</span>
              <span className="font-mono font-bold text-amber-700 dark:text-amber-400">{approxW.toFixed(2)} J</span>
            </div>
            <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
              <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">ค่าอินทิกรัลแท้ ∫ F dx</span>
              <span className="font-mono font-bold text-sky-700 dark:text-sky-400">{exactW.toFixed(2)} J</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (labId === 'potential-well') {
    // U(x) = 0.5*(x-2)^2 + 0.12*(x-2)^3 + 0.15 over x in [0.2, 3.8]
    const evalU = (x: number) => 0.5 * (x - 2) ** 2 + 0.12 * (x - 2) ** 3 + 0.25;
    const evalSlope = (x: number) => (x - 2) + 0.36 * (x - 2) ** 2;
    const evalParabola = (x: number) => 0.5 * (x - 2) ** 2 + 0.25;

    const uVal = evalU(marbleX);
    const slope = evalSlope(marbleX);
    const force = -slope;

    const toPx = (x: number) => 34 + ((x - 0.2) / 3.6) * 308;
    const toPy = (u: number) => 162 - (u / 2.2) * 138;

    const curvePath = Array.from({ length: 55 }, (_, i) => {
      const x = 0.2 + i * (3.6 / 54);
      return `${i === 0 ? 'M' : 'L'} ${toPx(x).toFixed(1)} ${toPy(evalU(x)).toFixed(1)}`;
    }).join(' ');

    const parabolaPath = Array.from({ length: 55 }, (_, i) => {
      const x = 0.4 + i * (3.2 / 54);
      return `${i === 0 ? 'M' : 'L'} ${toPx(x).toFixed(1)} ${toPy(evalParabola(x)).toFixed(1)}`;
    }).join(' ');

    const mx = toPx(marbleX);
    const my = toPy(uVal);
    const arrowLen = Math.max(-55, Math.min(55, force * 38));

    return (
      <div className="space-y-3 font-serif">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--ink-primary)]">
            <Sliders className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>เลื่อนลูกแก้วบนหลุมศักย์ U(x) ดูแรงดึงกลับ F = -dU/dx</span>
          </div>
          <button
            type="button"
            onClick={() => setMarbleX(2.0)}
            className="px-2 py-0.5 rounded border text-[11px] font-mono bg-[var(--surface-card)] text-[var(--ink-primary)] border-[var(--hairline-border)] hover:border-stone-500"
          >
            วางที่ก้นหลุม x₀=2.0
          </button>
        </div>

        <svg viewBox="0 0 360 185" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          {/* Axis */}
          <line x1="34" y1="162" x2="345" y2="162" stroke="var(--ink-tertiary)" strokeWidth="1" />
          <line x1="34" y1="162" x2="34" y2="16" stroke="var(--ink-tertiary)" strokeWidth="1" />
          <text x="344" y="175" fontSize="9" fill="var(--ink-secondary)" textAnchor="end" fontFamily="monospace">x</text>
          <text x="28" y="22" fontSize="9" fill="var(--ink-secondary)" textAnchor="end" fontFamily="monospace">U(x)</text>

          {/* Equilibrium vertical guide */}
          <line x1={toPx(2.0)} y1={toPy(evalU(2.0))} x2={toPx(2.0)} y2="162" stroke="var(--ink-tertiary)" strokeWidth="1" strokeDasharray="3 3" />
          <text x={toPx(2.0)} y="174" fontSize="9" fill="var(--ink-secondary)" textAnchor="middle" fontFamily="monospace">x₀</text>

          {/* Parabolic Taylor fit */}
          <path d={parabolaPath} fill="none" stroke="#16a34a" strokeWidth="1.6" strokeDasharray="4 3" />
          {/* Exact potential U(x) */}
          <path d={curvePath} fill="none" stroke="var(--ink-primary)" strokeWidth="2.3" />

          {/* Force Arrow F = -dU/dx */}
          {Math.abs(arrowLen) > 3 && (
            <line
              x1={mx}
              y1={my}
              x2={mx + arrowLen}
              y2={my}
              stroke="#dc2626"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
          )}

          {/* Marble */}
          <circle cx={mx} cy={my} r="6" fill="#0284c7" stroke="white" strokeWidth="1.5" />

          {/* Legend */}
          <rect x="44" y="16" width="166" height="36" rx="4" fill="var(--surface-muted)" stroke="var(--hairline-border)" strokeWidth="0.8" />
          <line x1="52" y1="28" x2="68" y2="28" stroke="#16a34a" strokeWidth="1.6" strokeDasharray="4 3" />
          <text x="74" y="31" fontSize="9" fill="var(--ink-primary)" fontFamily="monospace">พาราโบลา SHM รอบ x₀</text>
          <line x1="52" y1="42" x2="68" y2="42" stroke="#dc2626" strokeWidth="2.4" />
          <text x="74" y="45" fontSize="9" fill="var(--ink-primary)" fontFamily="monospace">แรง F = -dU/dx</text>
        </svg>

        <div className="space-y-2">
          <input
            type="range"
            min={0.45}
            max={3.55}
            step={0.05}
            value={marbleX}
            onChange={(e) => setMarbleX(parseFloat(e.target.value))}
            aria-label="Move marble along potential well"
            className="bridge-slider w-full cursor-pointer"
          />
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
              <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">ความชัน dU/dx</span>
              <span className="font-mono font-bold text-[var(--ink-primary)]">{slope.toFixed(2)}</span>
            </div>
            <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
              <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">แรง F = -dU/dx</span>
              <span className="font-mono font-bold text-rose-700 dark:text-rose-400">
                {Math.abs(force) < 0.03 ? '0.00 (สมดุล!)' : `${force > 0 ? '+' : ''}${force.toFixed(2)} (${force > 0 ? '→ ขวา' : '← ซ้าย'})`}
              </span>
            </div>
            <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
              <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">การสั่นใกล้ x₀</span>
              <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                {Math.abs(marbleX - 2.0) <= 0.45 ? 'ใกล้ SHM มาก' : 'แอมพลิจูดกว้าง'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 'shm-resonance'
  const evalAmp = (r: number, g: number) => 1 / Math.sqrt((1 - r * r) ** 2 + (g * r) ** 2);
  const currentAmp = evalAmp(freqRatio, gamma);
  const phaseRad = Math.atan2(gamma * freqRatio, 1 - freqRatio * freqRatio);
  const phaseDeg = (phaseRad * 180) / Math.PI;
  const qFactor = 1 / gamma;

  const toPx = (r: number) => 36 + ((r - 0.1) / 2.2) * 308;
  const toPy = (a: number) => 162 - (Math.min(a, 4.8) / 4.8) * 142;

  const curvePath = Array.from({ length: 65 }, (_, i) => {
    const r = 0.1 + i * (2.2 / 64);
    return `${i === 0 ? 'M' : 'L'} ${toPx(r).toFixed(1)} ${toPy(evalAmp(r, gamma)).toFixed(1)}`;
  }).join(' ');

  return (
    <div className="space-y-3 font-serif">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--ink-primary)]">
          <Sliders className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>สำรวจยอดสั่นพ้อง Resonance A(ω) และเฟสตามหลัง φ</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-mono">
          {[
            { label: 'ω<ω₀', val: 0.5 },
            { label: 'ω=ω₀!', val: 1.0 },
            { label: 'ω>ω₀', val: 1.6 },
          ].map((p) => (
            <button
              key={p.val}
              type="button"
              onClick={() => setFreqRatio(p.val)}
              className={`px-2 py-0.5 rounded border transition-colors ${
                Math.abs(freqRatio - p.val) < 0.04
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100 font-bold'
                  : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 360 185" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
        <line x1="36" y1="162" x2="345" y2="162" stroke="var(--ink-tertiary)" strokeWidth="1" />
        <line x1="36" y1="162" x2="36" y2="16" stroke="var(--ink-tertiary)" strokeWidth="1" />
        <text x="344" y="176" fontSize="9" fill="var(--ink-secondary)" textAnchor="end" fontFamily="monospace">ω / ω₀</text>
        <text x="30" y="22" fontSize="9" fill="var(--ink-secondary)" textAnchor="end" fontFamily="monospace">A(ω)</text>

        {/* Resonance marker line ω = ω₀ */}
        <line x1={toPx(1.0)} y1="18" x2={toPx(1.0)} y2="162" stroke="var(--ink-tertiary)" strokeWidth="1" strokeDasharray="3 3" />
        <text x={toPx(1.0)} y="174" fontSize="9" fill="var(--ink-secondary)" textAnchor="middle" fontFamily="monospace">1.0</text>

        <path d={curvePath} fill="none" stroke="#0284c7" strokeWidth="2.4" />
        <circle cx={toPx(freqRatio)} cy={toPy(currentAmp)} r="5.5" fill="#d97706" stroke="white" strokeWidth="1.5" />
      </svg>

      <div className="space-y-2.5 text-xs">
        <div>
          <div className="flex justify-between font-mono text-[var(--ink-secondary)] mb-1">
            <span>ความถี่แรงขับ ω/ω₀ = <strong className="text-[var(--ink-primary)]">{freqRatio.toFixed(2)}</strong></span>
            <span>หน่วง γ/ω₀ = <strong className="text-[var(--ink-primary)]">{gamma.toFixed(2)}</strong> (Q ≈ {qFactor.toFixed(1)})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="space-y-1">
              <span className="text-[11px] font-mono text-[var(--ink-tertiary)] block">ความถี่ ω/ω₀</span>
              <input
                type="range"
                min={0.2}
                max={2.2}
                step={0.05}
                value={freqRatio}
                onChange={(e) => setFreqRatio(parseFloat(e.target.value))}
                className="bridge-slider w-full cursor-pointer"
              />
            </label>
            <label className="space-y-1">
              <span className="text-[11px] font-mono text-[var(--ink-tertiary)] block">แรงหน่วง γ/ω₀</span>
              <input
                type="range"
                min={0.22}
                max={1.2}
                step={0.02}
                value={gamma}
                onChange={(e) => setGamma(parseFloat(e.target.value))}
                className="bridge-slider w-full cursor-pointer"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
            <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">แอมพลิจูดสัมพัทธ์</span>
            <span className="font-mono font-bold text-sky-700 dark:text-sky-400">{currentAmp.toFixed(2)}×</span>
          </div>
          <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
            <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">เฟสตามหลัง φ</span>
            <span className="font-mono font-bold text-amber-700 dark:text-amber-400">{phaseDeg.toFixed(0)}°</span>
          </div>
          <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
            <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">สถานะการแกว่ง</span>
            <span className="font-mono font-bold text-[var(--ink-primary)]">
              {Math.abs(freqRatio - 1) <= 0.1 ? 'เรโซแนนซ์!' : freqRatio < 1 ? 'ตามแรงขับ' : 'สวนแรงขับ'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ConceptBridgeLab: React.FC<ConceptBridgeLabProps> = ({ labId }) => (
  <div className="sim-stage">
    <ConceptBridgeLabInner labId={labId} />
  </div>
);
