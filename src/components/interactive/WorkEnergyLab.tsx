// src/components/interactive/WorkEnergyLab.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FormattedMathText } from '@/components/math/LatexRenderer';
import { Gauge, Play, Pause, RotateCcw, Sparkles } from 'lucide-react';

type EnergyMode = 'coaster' | 'spring';
type TrackShape = 'u-ramp' | 'double-hill' | 'loop';

const G = 10;

// Height function h(u) in meters [0..10] for u in [0, 1] on non-loop tracks
function trackHeight(shape: TrackShape, u: number): { xM: number; yM: number } {
  const clamped = Math.max(0, Math.min(1, u));
  const xM = clamped * 12;
  if (shape === 'u-ramp') {
    const t = (clamped - 0.5) / 0.5;
    return { xM, yM: 8.5 * t * t };
  }
  if (shape === 'double-hill') {
    // High left side (9m), valley 1, middle hill (5.2m), valley 2, right hill (8.8m)
    const yM =
      4.5 +
      4.3 * Math.cos(Math.PI * 2 * clamped) * 0.5 +
      4.2 * Math.pow(2 * clamped - 1, 2) -
      2.6 * Math.cos(Math.PI * 2 * clamped);
    // Clean exact profile: min near u=0.25 & 0.75 (~0.2m), middle peak u=0.5 (~5.2m), ends (~9m)
    const base =
      0.5 +
      4.7 * Math.pow(Math.cos(Math.PI * 2 * (clamped - 0.25)), 2) * (clamped > 0.25 && clamped < 0.75 ? 1 : 0) +
      8.5 * (clamped < 0.25 ? Math.pow((0.25 - clamped) / 0.25, 2) : clamped > 0.75 ? Math.pow((clamped - 0.75) / 0.25, 2) : 0);
    void yM;
    return { xM, yM: base };
  }
  // Loop-the-loop parameterized: [0,0.28] ramp down from 9.5m to 0m, [0.28,0.72] circle R=2.8m centered at (6, 2.8), [0.72,1] flat
  if (clamped < 0.28) {
    const t = clamped / 0.28;
    const yM = 9.5 * Math.pow(1 - t, 1.5);
    return { xM: clamped * 21.4, yM };
  }
  if (clamped <= 0.72) {
    const theta = ((clamped - 0.28) / 0.44) * Math.PI * 2; // 0 at bottom, pi at top
    const R = 2.8;
    return {
      xM: 6.0 + R * Math.sin(theta),
      yM: R * (1 - Math.cos(theta)),
    };
  }
  return { xM: 6.0 + ((clamped - 0.72) / 0.28) * 6.0, yM: 0 };
}

export const WorkEnergyLab: React.FC = () => {
  const [mode, setMode] = useState<EnergyMode>('coaster');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Coaster state
  const [trackShape, setTrackShape] = useState<TrackShape>('u-ramp');
  const [massKg, setMassKg] = useState<number>(4);
  const [startH, setStartH] = useState<number>(8.0);
  const [mu, setMu] = useState<number>(0.0);

  // Find initial u matching startH on left side of track
  const getInitialU = (shape: TrackShape, hTarget: number): number => {
    if (shape === 'u-ramp') {
      const frac = Math.sqrt(Math.min(1, hTarget / 8.5));
      return 0.5 - 0.5 * frac;
    }
    if (shape === 'double-hill') {
      const frac = Math.sqrt(Math.max(0, Math.min(1, (hTarget - 0.5) / 8.5)));
      return 0.25 * (1 - frac);
    }
    // Loop ramp
    const frac = Math.min(1, Math.pow(hTarget / 9.5, 1 / 1.5));
    return 0.28 * (1 - frac);
  };

  const initialU = getInitialU(trackShape, startH);
  const [coasterState, setCoasterState] = useState<{
    u: number;
    v: number;
    eth: number;
    loopFell: boolean;
  }>({ u: initialU, v: 0, eth: 0, loopFell: false });

  const coasterRef = useRef({
    u: initialU,
    dir: 1,
    v: 0,
    eth: 0,
    loopFell: false,
  });

  // Spring launcher state
  const [springK, setSpringK] = useState<number>(200);
  const [compressX, setCompressX] = useState<number>(0.4);
  const [springMass, setSpringMass] = useState<number>(2.0);
  const [springSim, setSpringSim] = useState<{
    phase: 'compressed' | 'releasing' | 'flat' | 'ramp';
    progress: number; // [0..1] along flat + ramp
    xSpring: number;
    speed: number;
    height: number;
  }>({ phase: 'compressed', progress: 0, xSpring: 0.4, speed: 0, height: 0 });
  const springRef = useRef({ time: 0, launched: false });

  const paramsRef = useRef({ trackShape, massKg, startH, mu });
  useEffect(() => {
    paramsRef.current = { trackShape, massKg, startH, mu };
  }, [trackShape, massKg, startH, mu]);

  const springParamsRef = useRef({ springK, compressX, springMass });
  useEffect(() => {
    springParamsRef.current = { springK, compressX, springMass };
  }, [springK, compressX, springMass]);

  const resetCoaster = (nextShape = trackShape, nextH = startH) => {
    const u0 = getInitialU(nextShape, nextH);
    coasterRef.current = { u: u0, dir: 1, v: 0, eth: 0, loopFell: false };
    setCoasterState({ u: u0, v: 0, eth: 0, loopFell: false });
  };

  const resetSpring = () => {
    springRef.current = { time: 0, launched: false };
    setSpringSim({
      phase: 'compressed',
      progress: 0,
      xSpring: springParamsRef.current.compressX,
      speed: 0,
      height: 0,
    });
  };

  useEffect(() => {
    if (!isPlaying) return;
    let rafId = 0;
    let prevTs = performance.now();

    const step = (now: number) => {
      const dt = Math.min(0.035, (now - prevTs) / 1000);
      prevTs = now;

      if (mode === 'coaster') {
        const p = paramsRef.current;
        const c = coasterRef.current;
        const eTotal0 = p.massKg * G * p.startH;

        if (!c.loopFell) {
          const eps = 0.002;
          const pA = trackHeight(p.trackShape, c.u);
          const pB = trackHeight(p.trackShape, Math.min(1, c.u + eps));
          const dsPerU = Math.max(0.05, Math.hypot(pB.xM - pA.xM, pB.yM - pA.yM) / eps);

          const eAvail = Math.max(0, eTotal0 - c.eth - p.massKg * G * pA.yM);
          let speed = Math.sqrt((2 * eAvail) / p.massKg);

          // Step u along curve using current direction & speed
          const du = (c.dir * Math.max(0.4, speed) * dt) / dsPerU;
          let nextU = c.u + du;

          if (p.trackShape === 'loop') {
            if (nextU >= 1.0) {
              nextU = 0.99;
              c.dir = -1;
            } else if (nextU <= initialU && c.dir < 0) {
              nextU = initialU;
              c.dir = 1;
            }
            // Check critical condition near top of loop u in [0.42, 0.58]
            const hNext = trackHeight('loop', nextU).yM;
            const eKin = Math.max(0, eTotal0 - c.eth - p.massKg * G * hNext);
            const vTopSq = (2 * eKin) / p.massKg;
            if (nextU > 0.44 && nextU < 0.56 && hNext > 4.6 && vTopSq < G * 2.8) {
              c.loopFell = true;
            }
          } else {
            if (nextU >= 1) {
              nextU = 1;
              c.dir = -1;
            } else if (nextU <= 0) {
              nextU = 0;
              c.dir = 1;
            }
            const nextPos = trackHeight(p.trackShape, nextU);
            const nextEkin = eTotal0 - c.eth - p.massKg * G * nextPos.yM;
            if (nextEkin <= 0) {
              // Turning point: bounce back toward lower potential
              c.dir = -c.dir;
              nextU = c.u;
            }
          }

          const finalPos = trackHeight(p.trackShape, nextU);
          const dDist = Math.hypot(finalPos.xM - pA.xM, finalPos.yM - pA.yM);
          const nextEth = Math.min(eTotal0, c.eth + p.mu * p.massKg * G * 0.8 * dDist);
          const finalKin = Math.max(0, eTotal0 - nextEth - p.massKg * G * finalPos.yM);
          speed = Math.sqrt((2 * finalKin) / p.massKg);

          c.u = nextU;
          c.v = speed;
          c.eth = nextEth;

          setCoasterState({ u: nextU, v: speed, eth: nextEth, loopFell: c.loopFell });
        }
      } else {
        // Spring mode animation
        const sp = springParamsRef.current;
        const sr = springRef.current;
        if (sr.launched) {
          sr.time += dt;
          const eSpring = 0.5 * sp.springK * sp.compressX * sp.compressX;
          const vMax = Math.sqrt((2 * eSpring) / sp.springMass);
          const hMax = Math.min(4.2, eSpring / (sp.springMass * G));

          if (sr.time < 0.28) {
            const frac = sr.time / 0.28;
            setSpringSim({
              phase: 'releasing',
              progress: 0,
              xSpring: sp.compressX * (1 - frac),
              speed: vMax * Math.sin((frac * Math.PI) / 2),
              height: 0,
            });
          } else {
            const tRun = sr.time - 0.28;
            const flatDur = 2.6 / Math.max(1.2, vMax * 0.45);
            if (tRun < flatDur) {
              const p = tRun / flatDur;
              setSpringSim({
                phase: 'flat',
                progress: p * 0.48,
                xSpring: 0,
                speed: vMax,
                height: 0,
              });
            } else {
              const tRamp = tRun - flatDur;
              const rampDur = Math.max(0.7, (2 * vMax) / (G * 0.5 * 3));
              // Triangle wave oscillation up & down the smooth ramp
              const cyc = (tRamp / rampDur) % 2;
              const uUp = cyc <= 1 ? cyc : 2 - cyc;
              const hNow = hMax * Math.sin((uUp * Math.PI) / 2);
              const speedNow = Math.sqrt(Math.max(0, (2 * Math.max(0, eSpring - sp.springMass * G * hNow)) / sp.springMass));
              setSpringSim({
                phase: 'ramp',
                progress: 0.48 + (hNow / 4.2) * 0.52,
                xSpring: 0,
                speed: speedNow,
                height: hNow,
              });
            }
          }
        }
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, mode, initialU]);

  // Energy bar calculations (Coaster)
  const posNow = trackHeight(trackShape, coasterState.u);
  const eTotalCoaster = massKg * G * startH;
  const uGravNow = massKg * G * posNow.yM;
  const eThermalNow = coasterState.eth;
  const kNow = Math.max(0, eTotalCoaster - uGravNow - eThermalNow);

  // Coaster SVG coordinate helpers (plot track on left 335px, Energy bars on right 110px)
  const mapX = (xM: number) => 22 + (xM / 12) * 295;
  const mapY = (yM: number) => 195 - (yM / 10) * 168;

  const trackPathD = Array.from({ length: 101 }, (_, i) => {
    const pt = trackHeight(trackShape, i / 100);
    return `${i === 0 ? 'M' : 'L'} ${mapX(pt.xM).toFixed(1)} ${mapY(pt.yM).toFixed(1)}`;
  }).join(' ');

  // Spring energy values
  const eSpringTotal = 0.5 * springK * compressX * compressX;
  const uSpringNow = 0.5 * springK * springSim.xSpring * springSim.xSpring;
  const uGravSpringNow = springMass * G * springSim.height;
  const kSpringNow = Math.max(0, eSpringTotal - uSpringNow - uGravSpringNow);
  const hMaxSpring = eSpringTotal / (springMass * G);

  return (
    <div className="space-y-3.5 font-serif">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--ink-primary)]">
          <Gauge className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span>ห้องทดลองงาน พลังงานกล &amp; สปริงยิงวัตถุ</span>
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
            onClick={() => (mode === 'coaster' ? resetCoaster() : resetSpring())}
            className="min-h-[34px] px-2.5 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-[var(--ink-primary)] inline-flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>รีเซ็ต</span>
          </button>
        </div>
      </div>

      {/* Mode Switch */}
      <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
        <button
          type="button"
          onClick={() => setMode('coaster')}
          className={`min-h-[36px] px-2 py-1.5 rounded border transition-colors ${
            mode === 'coaster'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
              : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
          }`}
        >
          1. รางรถไฟเหาะ (K + U_g + E_ความร้อน)
        </button>
        <button
          type="button"
          onClick={() => setMode('spring')}
          className={`min-h-[36px] px-2 py-1.5 rounded border transition-colors ${
            mode === 'spring'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
              : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
          }`}
        >
          2. เครื่องยิงสปริงขึ้นเนิน (½kx² → mgh)
        </button>
      </div>

      {/* SVG Simulation Stage */}
      <svg viewBox="0 0 460 220" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
        {mode === 'coaster' ? (
          <>
            {/* Ground & start height dashed reference */}
            <line x1="16" y1="195" x2="332" y2="195" stroke="var(--ink-tertiary)" strokeWidth="1" />
            <line x1="16" y1={mapY(startH)} x2="326" y2={mapY(startH)} stroke="#d97706" strokeWidth="1" strokeDasharray="3 3" opacity="0.65" />
            <text x="20" y={mapY(startH) - 4} fontSize="8.5" fill="#d97706" fontFamily="monospace">
              ระดับปล่อย h₀={startH.toFixed(1)}m
            </text>

            {/* Track curve */}
            <path d={trackPathD} fill="none" stroke="var(--ink-primary)" strokeWidth="3" strokeLinecap="round" />

            {/* Cart */}
            <circle
              cx={mapX(posNow.xM)}
              cy={mapY(posNow.yM) - 5}
              r="7.5"
              fill={coasterState.loopFell ? '#dc2626' : '#0284c7'}
              stroke="white"
              strokeWidth="1.8"
            />

            {coasterState.loopFell && (
              <text x="170" y="34" fontSize="10" textAnchor="middle" fill="#dc2626" fontFamily="monospace" fontWeight="bold">
                ความเร็วบนยอดไม่ถึง √(gR)! ต้องปล่อย h₀ ≥ 7.0 m
              </text>
            )}

            {/* Energy Bars Panel on Right */}
            <rect x="336" y="12" width="114" height="196" rx="5" fill="var(--surface-muted)" stroke="var(--hairline-border)" strokeWidth="1" />
            <text x="393" y="27" fontSize="9.5" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
              พลังงาน ({eTotalCoaster.toFixed(0)} J)
            </text>

            {[
              { label: 'K', val: kNow, color: '#0284c7', x: 350 },
              { label: 'U_g', val: uGravNow, color: '#d97706', x: 383 },
              { label: 'ความร้อน', val: eThermalNow, color: '#dc2626', x: 416 },
            ].map((bar) => {
              const barH = eTotalCoaster > 0 ? Math.min(130, (bar.val / eTotalCoaster) * 130) : 0;
              return (
                <g key={bar.label}>
                  <rect x={bar.x} y="48" width="22" height="130" rx="2" fill="var(--surface-card)" stroke="var(--hairline-border)" strokeWidth="0.8" />
                  <rect x={bar.x} y={178 - barH} width="22" height={barH} rx="2" fill={bar.color} opacity="0.85" />
                  <text x={bar.x + 11} y="191" fontSize="8.5" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
                    {bar.label}
                  </text>
                  <text x={bar.x + 11} y="43" fontSize="8" textAnchor="middle" fill="var(--ink-secondary)" fontFamily="monospace">
                    {bar.val.toFixed(0)}
                  </text>
                </g>
              );
            })}
          </>
        ) : (
          <>
            {/* Spring Launcher Track */}
            <line x1="30" y1="184" x2="220" y2="184" stroke="var(--ink-primary)" strokeWidth="2.5" />
            <line x1="220" y1="184" x2="335" y2="48" stroke="var(--ink-primary)" strokeWidth="2.5" />
            <line x1="30" y1="80" x2="30" y2="184" stroke="var(--ink-primary)" strokeWidth="3.5" />

            {/* Coiled Spring */}
            {(() => {
              const baseLen = 84;
              const springEnd = 30 + baseLen - springSim.xSpring * 85;
              const coils = 8;
              const pts = Array.from({ length: coils + 1 }, (_, i) => {
                const px = 30 + (i / coils) * (springEnd - 30);
                const py = i === 0 || i === coils ? 168 : 168 + (i % 2 === 0 ? -9 : 9);
                return `${i === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py}`;
              }).join(' ');

              // Cart position from phase & progress
              let cx = springEnd + 14;
              let cy = 168;
              let rot = 0;
              if (springSim.phase === 'flat') {
                const f = springSim.progress / 0.48;
                cx = 114 + f * (212 - 114);
                cy = 168;
              } else if (springSim.phase === 'ramp') {
                const f = Math.min(1, (springSim.progress - 0.48) / 0.52);
                cx = 220 + f * (335 - 220);
                cy = 184 - f * (184 - 48) - 14;
                rot = -49;
              }

              return (
                <>
                  <path d={pts} fill="none" stroke="#d97706" strokeWidth="2.2" strokeLinejoin="round" />
                  <g transform={`translate(${cx}, ${cy}) rotate(${rot})`}>
                    <rect x="-14" y="-14" width="28" height="28" rx="3" fill="rgba(2,132,199,0.2)" stroke="var(--ink-primary)" strokeWidth="2" />
                    <text x="0" y="4" fontSize="9" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
                      {springMass}kg
                    </text>
                  </g>
                </>
              );
            })()}

            {/* Energy Bars Panel on Right */}
            <rect x="342" y="12" width="108" height="196" rx="5" fill="var(--surface-muted)" stroke="var(--hairline-border)" strokeWidth="1" />
            <text x="396" y="27" fontSize="9" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
              รวม E = {eSpringTotal.toFixed(1)} J
            </text>
            {[
              { label: 'U_s', val: uSpringNow, color: '#d97706', x: 350 },
              { label: 'K', val: kSpringNow, color: '#0284c7', x: 382 },
              { label: 'U_g', val: uGravSpringNow, color: '#16a34a', x: 414 },
            ].map((bar) => {
              const barH = eSpringTotal > 0 ? Math.min(130, (bar.val / eSpringTotal) * 130) : 0;
              return (
                <g key={bar.label}>
                  <rect x={bar.x} y="48" width="22" height="130" rx="2" fill="var(--surface-card)" stroke="var(--hairline-border)" strokeWidth="0.8" />
                  <rect x={bar.x} y={178 - barH} width="22" height={barH} rx="2" fill={bar.color} opacity="0.85" />
                  <text x={bar.x + 11} y="191" fontSize="8.5" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
                    {bar.label}
                  </text>
                  <text x={bar.x + 11} y="43" fontSize="8" textAnchor="middle" fill="var(--ink-secondary)" fontFamily="monospace">
                    {bar.val.toFixed(1)}
                  </text>
                </g>
              );
            })}
          </>
        )}
      </svg>

      {/* Controls */}
      {mode === 'coaster' ? (
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-3 gap-1.5 text-[11px] font-mono">
            {[
              { id: 'u-ramp' as const, label: 'รางตัวยู (U-Ramp)' },
              { id: 'double-hill' as const, label: 'เนินคู่ (5.2 m)' },
              { id: 'loop' as const, label: 'ตีลังกา (R=2.8 m)' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTrackShape(t.id);
                  resetCoaster(t.id, startH);
                }}
                className={`min-h-[34px] px-2 py-1 rounded border ${
                  trackShape === t.id
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
                    : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>ความสูงปล่อย h₀</span>
                <strong className="text-[var(--ink-primary)]">{startH.toFixed(1)} m</strong>
              </div>
              <input
                type="range"
                min={2.5}
                max={8.5}
                step={0.5}
                value={startH}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setStartH(val);
                  resetCoaster(trackShape, val);
                }}
                className="bridge-slider w-full cursor-pointer"
              />
            </label>
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>มวลรถ m</span>
                <strong className="text-[var(--ink-primary)]">{massKg} kg</strong>
              </div>
              <input type="range" min={1} max={10} step={1} value={massKg} onChange={(e) => setMassKg(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
            </label>
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>เสียดทานราง μ</span>
                <strong className="text-[var(--ink-primary)]">{mu.toFixed(2)}</strong>
              </div>
              <input type="range" min={0} max={0.25} step={0.02} value={mu} onChange={(e) => setMu(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
            </label>
          </div>
        </div>
      ) : (
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                springRef.current = { time: 0, launched: true };
                setIsPlaying(true);
              }}
              className="min-h-[38px] px-4 py-1.5 rounded bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-mono text-xs font-bold hover:opacity-90"
            >
              ปล่อยสปริงยิงมวล!
            </button>
            <span className="font-mono text-[11px] text-[var(--ink-secondary)]">
              ไต่ขึ้นสูงสุด h_max = <strong className="text-emerald-700 dark:text-emerald-400">{hMaxSpring.toFixed(2)} m</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>ค่านิจสปริง k</span>
                <strong className="text-[var(--ink-primary)]">{springK} N/m</strong>
              </div>
              <input type="range" min={50} max={400} step={25} value={springK} onChange={(e) => { setSpringK(parseInt(e.target.value, 10)); }} className="bridge-slider w-full cursor-pointer" />
            </label>
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>ระยะกด x</span>
                <strong className="text-[var(--ink-primary)]">{compressX.toFixed(2)} m</strong>
              </div>
              <input type="range" min={0.1} max={0.6} step={0.05} value={compressX} onChange={(e) => { setCompressX(parseFloat(e.target.value)); }} className="bridge-slider w-full cursor-pointer" />
            </label>
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>มวล m</span>
                <strong className="text-[var(--ink-primary)]">{springMass.toFixed(1)} kg</strong>
              </div>
              <input type="range" min={0.5} max={5.0} step={0.5} value={springMass} onChange={(e) => { setSpringMass(parseFloat(e.target.value)); }} className="bridge-slider w-full cursor-pointer" />
            </label>
          </div>
        </div>
      )}

      {/* Live Readout Grid */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
        <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <span className="block text-[10px] text-[var(--ink-tertiary)]">อัตราเร็วขณะนี้ v</span>
          <strong className="text-sky-700 dark:text-sky-400">
            {(mode === 'coaster' ? coasterState.v : springSim.speed).toFixed(2)} m/s
          </strong>
        </div>
        <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <span className="block text-[10px] text-[var(--ink-tertiary)]">ความสูง y</span>
          <strong className="text-amber-700 dark:text-amber-400">
            {(mode === 'coaster' ? posNow.yM : springSim.height).toFixed(2)} m
          </strong>
        </div>
        <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <span className="block text-[10px] text-[var(--ink-tertiary)]">พลังงานรวมเริ่มต้น</span>
          <strong className="text-emerald-700 dark:text-emerald-400">
            {(mode === 'coaster' ? eTotalCoaster : eSpringTotal).toFixed(1)} J
          </strong>
        </div>
      </div>

      {/* Insight Callout */}
      <div className="p-2.5 rounded border border-amber-300/80 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/30 text-[11px] sm:text-xs text-amber-950 dark:text-amber-200 leading-relaxed flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <FormattedMathText
          text={'สังเกตกราฟแท่ง: ผลรวม $K + U_g + E_{\\text{ความร้อน}}$ คงที่เสมอ! เมื่อรางมีแรงเสียดทาน $\\mu > 0$ รถขึ้นไม่ถึงความสูงเดิม และในรางตีลังกาต้องปล่อยสูงอย่างน้อย $h_0 = \\frac{5}{2}R$ เพื่อให้บนยอดมีความเร็ววิกฤต $\\sqrt{gR}$'}
        />
      </div>
    </div>
  );
};
