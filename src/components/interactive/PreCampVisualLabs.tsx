// src/components/interactive/PreCampVisualLabs.tsx
'use client';

import React, { useState } from 'react';
import { Sliders } from 'lucide-react';

export type PreCampLabId =
  | 'incline-wedge'
  | 'projectile-collision'
  | 'circular-equilibrium'
  | 'bernoulli-pipe'
  | 'temperature-box'
  | 'electric-capacitor'
  | 'rc-circuit-box'
  | 'magnetic-wire'
  | 'optics-ray-tracer';

interface PreCampVisualLabsProps {
  labId: PreCampLabId;
}

const LabInsightCallout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="p-2.5 rounded border border-amber-300/80 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/30 text-[11px] sm:text-xs text-amber-950 dark:text-amber-200 leading-relaxed">
    <span className="font-bold">💡 จุดสังเกตสำคัญ &amp; ทริคทำข้อสอบ สอวน.: </span>
    {children}
  </div>
);

export const PreCampVisualLabs: React.FC<PreCampVisualLabsProps> = ({ labId }) => {
  // 1. Incline / Wedge state
  const [wedgeDeg, setWedgeDeg] = useState<number>(30);
  const [muStatic, setMuStatic] = useState<number>(0.65);

  // 2. Projectile state
  const [launchV0, setLaunchV0] = useState<number>(20);
  const [launchDeg, setLaunchDeg] = useState<number>(45);

  // 3. Ladder equilibrium state
  const [ladderDeg, setLadderDeg] = useState<number>(53);
  const [floorMu, setFloorMu] = useState<number>(0.45);

  // 4. Bernoulli pipe state
  const [areaRatio, setAreaRatio] = useState<number>(2.5);
  const [inletV1, setInletV1] = useState<number>(2.0);

  // 5. Temperature box (Heat flux vs Gas piston)
  const [tempMode, setTempMode] = useState<'conduction' | 'piston'>('conduction');
  const [hotTemp, setHotTemp] = useState<number>(100);
  const [rodRatio, setRodRatio] = useState<number>(1.0); // k1/k2
  const [heatAdded, setHeatAdded] = useState<number>(50);
  const [gasDof, setGasDof] = useState<3 | 5>(5);

  // 6. Capacitor state
  const [batteryConnected, setBatteryConnected] = useState<boolean>(true);
  const [plateGapMm, setPlateGapMm] = useState<number>(2.0);

  // 7. DC Circuit RC / RL state
  const [elementType, setElementType] = useState<'C' | 'L'>('C');
  const [circuitPhase, setCircuitPhase] = useState<'t0' | 'mid' | 'tinf'>('t0');

  // 8. Magnetic wire (Current Loop vs Faraday Rail)
  const [magMode, setMagMode] = useState<'loop' | 'rail'>('loop');
  const [wireCurrent, setWireCurrent] = useState<number>(4.0);
  const [loopRadiusCm, setLoopRadiusCm] = useState<number>(5.0);
  const [railSpeed, setRailSpeed] = useState<number>(3.0);
  const [bFieldT, setBFieldT] = useState<number>(0.5);

  // 9. Optics ray tracer state
  const [opticKind, setOpticKind] = useState<
    'convex-lens' | 'concave-lens' | 'concave-mirror' | 'convex-mirror'
  >('convex-lens');
  const [objectDist, setObjectDist] = useState<number>(22);

  // =========================================================================
  // 1. INCLINE WEDGE & FRICTION LAB
  // =========================================================================
  if (labId === 'incline-wedge') {
    const rad = (wedgeDeg * Math.PI) / 180;
    const sinT = Math.sin(rad);
    const cosT = Math.cos(rad);
    const mg = 40; // 4 kg * 10 m/s^2
    const normal = mg * cosT;
    const fDown = mg * sinT;
    const fsMax = muStatic * normal;
    const muK = 0.75 * muStatic;
    const isSliding = fDown > fsMax + 0.05;
    const fActual = isSliding ? muK * normal : fDown;
    const accel = isSliding ? 10 * (sinT - muK * cosT) : 0;
    const critDeg = (Math.atan(muStatic) * 180) / Math.PI;

    // Wedge triangle vertices in SVG
    const baseRightX = 305;
    const baseLeftX = 75;
    const baseY = 165;
    const rise = Math.min(125, (baseRightX - baseLeftX) * Math.tan(rad));
    const apexY = baseY - rise;

    // Place block halfway along hypotenuse (from (baseRightX, apexY) down to (baseLeftX, baseY))
    const dx = baseLeftX - baseRightX;
    const dy = baseY - apexY;
    const len = Math.hypot(dx, dy);
    const ux = dx / len; // unit down-slope vector
    const uy = dy / len;
    const nx = uy; // normal pointing out/up-left (-(-uy)? check: if ux<0, uy>0, upward normal has +x? No, slope rises to right: up-left normal is (-uy, ux) = (-+, -))
    // Wait: dx < 0, dy > 0. Vector down-slope is (ux < 0, uy > 0).
    // Up-left outward normal from slope pointing away from wedge interior:
    const outNx = -uy;
    const outNy = ux;
    const midX = (baseLeftX + baseRightX) / 2;
    const midY = (baseY + apexY) / 2;
    const blockCenterX = midX + outNx * 14;
    const blockCenterY = midY + outNy * 14;
    const fArrowLen = Math.max(14, (fActual / mg) * 65);
    const mgDownLen = Math.max(10, (fDown / mg) * 65);

    return (
      <div className="space-y-3 font-serif">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--ink-primary)]">
            <Sliders className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>ห้องทดลองลิ่มและแรงเสียดทาน (Wedge &amp; Friction Lab — มวล m = 4 kg)</span>
          </div>
          <span
            className={`px-2 py-0.5 rounded font-mono text-[11px] font-bold border ${
              isSliding
                ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-400/70'
                : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-400/70'
            }`}
          >
            {isSliding ? `กำลังไถลลง! a = ${accel.toFixed(2)} m/s²` : 'หยุดนิ่งสมดุล (f_s = mg sin θ)'}
          </span>
        </div>

        <svg viewBox="0 0 360 190" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <defs>
            <marker id="arrow-wedge-mg" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#dc2626" />
            </marker>
            <marker id="arrow-wedge-n" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#0284c7" />
            </marker>
            <marker id="arrow-wedge-f" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#d97706" />
            </marker>
          </defs>

          {/* Ground floor */}
          <line x1="25" y1={baseY} x2="335" y2={baseY} stroke="var(--ink-tertiary)" strokeWidth="1.5" />

          {/* Wedge body */}
          <polygon
            points={`${baseLeftX},${baseY} ${baseRightX},${baseY} ${baseRightX},${apexY}`}
            fill="var(--surface-muted)"
            stroke="var(--ink-primary)"
            strokeWidth="2"
          />

          {/* Angle theta arc */}
          <path
            d={`M ${baseLeftX + 34} ${baseY} A 34 34 0 0 0 ${baseLeftX + 34 * cosT} ${baseY - 34 * sinT}`}
            fill="none"
            stroke="var(--ink-secondary)"
            strokeWidth="1.2"
          />
          <text x={baseLeftX + 40} y={baseY - 7} fontSize="10" fill="var(--ink-primary)" fontFamily="monospace">
            θ={wedgeDeg}°
          </text>

          {/* Tilted Block */}
          <g transform={`translate(${blockCenterX}, ${blockCenterY}) rotate(${-wedgeDeg})`}>
            <rect
              x="-20"
              y="-14"
              width="40"
              height="28"
              rx="3"
              fill={isSliding ? 'rgba(225, 29, 72, 0.16)' : 'rgba(22, 163, 74, 0.16)'}
              stroke="var(--ink-primary)"
              strokeWidth="2"
            />
            <text x="0" y="4" fontSize="10" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
              4kg
            </text>
          </g>

          {/* Gravity mg straight down */}
          <line
            x1={blockCenterX}
            y1={blockCenterY}
            x2={blockCenterX}
            y2={blockCenterY + 58}
            stroke="#dc2626"
            strokeWidth="2.2"
            markerEnd="url(#arrow-wedge-mg)"
          />
          <text x={blockCenterX + 6} y={blockCenterY + 56} fontSize="9.5" fill="#dc2626" fontFamily="monospace" fontWeight="bold">
            mg=40N
          </text>

          {/* Dashed mg sin(theta) down slope */}
          <line
            x1={blockCenterX}
            y1={blockCenterY}
            x2={blockCenterX + ux * mgDownLen}
            y2={blockCenterY + uy * mgDownLen}
            stroke="#dc2626"
            strokeWidth="1.6"
            strokeDasharray="3 2"
          />

          {/* Normal force N perpendicular out */}
          <line
            x1={blockCenterX}
            y1={blockCenterY}
            x2={blockCenterX + outNx * (normal / mg) * 58}
            y2={blockCenterY + outNy * (normal / mg) * 58}
            stroke="#0284c7"
            strokeWidth="2.2"
            markerEnd="url(#arrow-wedge-n)"
          />
          <text
            x={blockCenterX + outNx * 52 - 14}
            y={blockCenterY + outNy * 52 - 6}
            fontSize="9.5"
            fill="#0284c7"
            fontFamily="monospace"
            fontWeight="bold"
          >
            N={normal.toFixed(1)}N
          </text>

          {/* Friction arrow up slope */}
          <line
            x1={midX}
            y1={midY}
            x2={midX - ux * fArrowLen}
            y2={midY - uy * fArrowLen}
            stroke="#d97706"
            strokeWidth="2.4"
            markerEnd="url(#arrow-wedge-f)"
          />
          <text
            x={midX - ux * (fArrowLen + 8)}
            y={midY - uy * (fArrowLen + 8) - 4}
            fontSize="9.5"
            fill="#d97706"
            fontFamily="monospace"
            fontWeight="bold"
          >
            {isSliding ? 'f_k' : 'f_s'}={fActual.toFixed(1)}N
          </text>
          <circle cx={midX} cy={midY} r="0" fill="none" />
          <circle cx={nx} cy="0" r="0" fill="none" />
        </svg>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <label className="space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>มุมลิ่ม θ</span>
              <strong className="text-[var(--ink-primary)]">{wedgeDeg}° (วิกฤต ≈ {critDeg.toFixed(1)}°)</strong>
            </div>
            <input
              type="range"
              min={10}
              max={60}
              step={1}
              value={wedgeDeg}
              onChange={(e) => setWedgeDeg(parseInt(e.target.value, 10))}
              className="bridge-slider w-full cursor-pointer"
            />
          </label>
          <label className="space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>ความเสียดทานสถิต μ_s</span>
              <strong className="text-[var(--ink-primary)]">{muStatic.toFixed(2)} (μ_k = {muK.toFixed(2)})</strong>
            </div>
            <input
              type="range"
              min={0.2}
              max={1.0}
              step={0.05}
              value={muStatic}
              onChange={(e) => setMuStatic(parseFloat(e.target.value))}
              className="bridge-slider w-full cursor-pointer"
            />
          </label>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
            <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">แรงดึงลง mg sinθ</span>
            <span className="font-mono font-bold text-rose-700 dark:text-rose-400">{fDown.toFixed(1)} N</span>
          </div>
          <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
            <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">ขีดจำกัด μ_s N</span>
            <span className="font-mono font-bold text-sky-700 dark:text-sky-400">{fsMax.toFixed(1)} N</span>
          </div>
          <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
            <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">แรงเสียดทานจริง</span>
            <span className="font-mono font-bold text-amber-700 dark:text-amber-400">{fActual.toFixed(1)} N</span>
          </div>
        </div>

        <LabInsightCallout>
          ลองปรับ θ ให้น้อยกว่ามุมวิกฤต จะเห็นว่าแรงเสียดทานจริงมีค่าแค่ mg sin θ (เท่ากับแรงดึงลงพอดี) <strong>ไม่ใช่</strong> μ_s N! และทันทีที่มุมเกิน tan⁻¹(μ_s) แรงเสียดทานจะตกจาก f_s,max ลงมาเป็น f_k ทันที
        </LabInsightCallout>
      </div>
    );
  }

  // =========================================================================
  // 2. PROJECTILE TRAJECTORY LAB
  // =========================================================================
  if (labId === 'projectile-collision') {
    const rad = (launchDeg * Math.PI) / 180;
    const vx = launchV0 * Math.cos(rad);
    const vy0 = launchV0 * Math.sin(rad);
    const g = 10;
    const tFlight = (2 * vy0) / g;
    const maxH = (vy0 * vy0) / (2 * g);
    const range = vx * tFlight;

    // Fixed world box X: 0..95 m, Y: 0..48 m -> svg x [32..342], y [162..18]
    const toPx = (x: number) => 32 + (x / 95) * 308;
    const toPy = (y: number) => 162 - (y / 48) * 144;

    const pathD = Array.from({ length: 41 }, (_, i) => {
      const t = (i / 40) * tFlight;
      const x = vx * t;
      const y = vy0 * t - 0.5 * g * t * t;
      return `${i === 0 ? 'M' : 'L'} ${toPx(x).toFixed(1)} ${toPy(y).toFixed(1)}`;
    }).join(' ');

    const apexX = toPx(range / 2);
    const apexY = toPy(maxH);

    return (
      <div className="space-y-3 font-serif">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--ink-primary)]">
          <Sliders className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>วิถีโพรเจกไทล์: แยกแกนราบ (v_x คงที่) กับแกนดิ่ง (a = -g)</span>
        </div>

        <svg viewBox="0 0 360 185" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <defs>
            <marker id="arrow-proj-vx" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#0284c7" />
            </marker>
            <marker id="arrow-proj-vy" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#dc2626" />
            </marker>
          </defs>

          <line x1="32" y1="162" x2="345" y2="162" stroke="var(--ink-tertiary)" strokeWidth="1.2" />
          <line x1="32" y1="162" x2="32" y2="16" stroke="var(--ink-tertiary)" strokeWidth="1.2" />

          {/* Trajectory parabola */}
          <path d={pathD} fill="none" stroke="var(--ink-primary)" strokeWidth="2.3" />

          {/* Vertical line to apex */}
          <line x1={apexX} y1={apexY} x2={apexX} y2="162" stroke="var(--ink-tertiary)" strokeWidth="1" strokeDasharray="3 3" />

          {/* Launch velocity components */}
          <line x1="32" y1="162" x2={32 + vx * 1.9} y2="162" stroke="#0284c7" strokeWidth="2.2" markerEnd="url(#arrow-proj-vx)" />
          <line x1="32" y1="162" x2="32" y2={162 - vy0 * 1.9} stroke="#dc2626" strokeWidth="2.2" markerEnd="url(#arrow-proj-vy)" />

          {/* Apex velocity (pure horizontal!) */}
          <circle cx={apexX} cy={apexY} r="4" fill="#0284c7" />
          <line x1={apexX} y1={apexY} x2={apexX + vx * 1.9} y2={apexY} stroke="#0284c7" strokeWidth="2.2" markerEnd="url(#arrow-proj-vx)" />
          <text x={apexX} y={apexY - 8} fontSize="9" textAnchor="middle" fill="#0284c7" fontFamily="monospace">
            จุดสูงสุด v_y=0, เหลือแค่ v_x
          </text>

          {/* Range marker */}
          <circle cx={toPx(range)} cy="162" r="4" fill="#d97706" />
          <text x={Math.min(338, toPx(range))} y="176" fontSize="9" textAnchor="middle" fill="#d97706" fontFamily="monospace">
            R={range.toFixed(1)}m
          </text>
        </svg>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <label className="space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>ความเร็วต้น u</span>
              <strong className="text-[var(--ink-primary)]">{launchV0} m/s</strong>
            </div>
            <input type="range" min={10} max={30} step={1} value={launchV0} onChange={(e) => setLaunchV0(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
          </label>
          <label className="space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>มุมยิง θ</span>
              <strong className="text-[var(--ink-primary)]">{launchDeg}° (ไกลสุดที่ 45°)</strong>
            </div>
            <input type="range" min={15} max={75} step={1} value={launchDeg} onChange={(e) => setLaunchDeg(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
          </label>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
            <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">เวลาลอยอากาศ T</span>
            <span className="font-mono font-bold text-[var(--ink-primary)]">{tFlight.toFixed(2)} s</span>
          </div>
          <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
            <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">สูงที่สุด H_max</span>
            <span className="font-mono font-bold text-rose-700 dark:text-rose-400">{maxH.toFixed(1)} m</span>
          </div>
          <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
            <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">ระยะไกลราบ Range</span>
            <span className="font-mono font-bold text-amber-700 dark:text-amber-400">{range.toFixed(1)} m</span>
          </div>
        </div>

        <LabInsightCallout>
          ที่จุดสูงสุด v_y = 0 เท่านั้น แต่ความเร็วแนวราบ v_x = u cos θ ยังอยู่ครบ และความเร่งยังคงเป็น g ชี้ลงตลอดทาง! ส่วนระยะตกไกลสุดบนพื้นราบเกิดที่ θ = 45° (ลองเทียบมุม 30° กับ 60° จะเห็น Range เท่ากันเป๊ะ!)
        </LabInsightCallout>
      </div>
    );
  }

  // =========================================================================
  // 3. STATIC LADDER EQUILIBRIUM LAB
  // =========================================================================
  if (labId === 'circular-equilibrium') {
    const rad = (ladderDeg * Math.PI) / 180;
    const tanT = Math.tan(rad);
    const reqMu = 1 / (2 * tanT);
    const willSlip = reqMu > floorMu;
    const mg = 100; // N
    const nw = mg * reqMu;

    const wallX = 95;
    const floorY = 165;
    const ladderLen = 128;
    const footX = wallX + ladderLen * Math.cos(rad);
    const topY = floorY - ladderLen * Math.sin(rad);
    const cmX = (wallX + footX) / 2;
    const cmY = (floorY + topY) / 2;

    return (
      <div className="space-y-3 font-serif">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--ink-primary)]">
            <Sliders className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>สมดุลสถิตบันไดพิงกำแพงลื่น (เลือกจุดหมุนที่ฐาน O ตัด N_f, f_s!)</span>
          </div>
          <span
            className={`px-2 py-0.5 rounded font-mono text-[11px] font-bold border ${
              willSlip
                ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-400/70'
                : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-400/70'
            }`}
          >
            {willSlip ? 'ฐานลื่นไถลล้ม!' : 'สมดุลนิ่ง (∑F=0, ∑τ=0)'}
          </span>
        </div>

        <svg viewBox="0 0 360 190" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <defs>
            <marker id="arrow-lad-blue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#0284c7" />
            </marker>
            <marker id="arrow-lad-red" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#dc2626" />
            </marker>
            <marker id="arrow-lad-amb" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#d97706" />
            </marker>
          </defs>

          {/* Wall & Floor */}
          <rect x="75" y="16" width="20" height={floorY - 16} fill="var(--surface-muted)" stroke="var(--ink-tertiary)" />
          <line x1="75" y1={floorY} x2="325" y2={floorY} stroke="var(--ink-primary)" strokeWidth="2" />

          {/* Ladder */}
          <line x1={wallX} y1={topY} x2={footX} y2={floorY} stroke={willSlip ? '#e11d48' : 'var(--ink-primary)'} strokeWidth="5" strokeLinecap="round" />

          {/* Weight Mg at CM */}
          <circle cx={cmX} cy={cmY} r="3.5" fill="#dc2626" />
          <line x1={cmX} y1={cmY} x2={cmX} y2={cmY + 42} stroke="#dc2626" strokeWidth="2.2" markerEnd="url(#arrow-lad-red)" />
          <text x={cmX + 6} y={cmY + 38} fontSize="9.5" fill="#dc2626" fontFamily="monospace">Mg</text>

          {/* Wall N_w */}
          <line x1={wallX} y1={topY} x2={wallX + 42} y2={topY} stroke="#0284c7" strokeWidth="2.2" markerEnd="url(#arrow-lad-blue)" />
          <text x={wallX + 46} y={topY + 4} fontSize="9.5" fill="#0284c7" fontFamily="monospace">N_w</text>

          {/* Floor N_f & Friction f_s at pivot O */}
          <line x1={footX} y1={floorY} x2={footX} y2={floorY - 42} stroke="#0284c7" strokeWidth="2.2" markerEnd="url(#arrow-lad-blue)" />
          <text x={footX + 6} y={floorY - 36} fontSize="9.5" fill="#0284c7" fontFamily="monospace">N_f</text>
          <line x1={footX} y1={floorY} x2={footX - 42} y2={floorY} stroke="#d97706" strokeWidth="2.4" markerEnd="url(#arrow-lad-amb)" />
          <text x={footX - 48} y={floorY - 6} fontSize="9.5" fill="#d97706" fontFamily="monospace">f_s</text>

          <circle cx={footX} cy={floorY} r="4.5" fill="#d97706" />
          <text x={footX - 24} y={floorY + 14} fontSize="9" fill="var(--ink-secondary)" fontFamily="monospace">θ={ladderDeg}°</text>
        </svg>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <label className="space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>มุมตั้งบันได θ</span>
              <strong className="text-[var(--ink-primary)]">{ladderDeg}°</strong>
            </div>
            <input type="range" min={25} max={75} step={1} value={ladderDeg} onChange={(e) => setLadderDeg(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
          </label>
          <label className="space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>ความเสียดทานพื้น μ_s</span>
              <strong className="text-[var(--ink-primary)]">{floorMu.toFixed(2)}</strong>
            </div>
            <input type="range" min={0.15} max={0.8} step={0.05} value={floorMu} onChange={(e) => setFloorMu(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-2 text-center text-xs">
          <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
            <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">แรงเสียดทานขั้นต่ำ μ_min = 1/(2tanθ)</span>
            <span className="font-mono font-bold text-rose-700 dark:text-rose-400">{reqMu.toFixed(2)}</span>
          </div>
          <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
            <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">แรงดันกำแพง N_w (เมื่อ Mg=100N)</span>
            <span className="font-mono font-bold text-sky-700 dark:text-sky-400">{nw.toFixed(1)} N</span>
          </div>
        </div>

        <LabInsightCallout>
          ยิ่งวางบันไดเอนราบลง (θ เล็กลง) ทอร์กจาก Mg จะงัดแรงดันกำแพง N_w (= f_s) ให้พุ่งสูงขึ้นจนพื้นรับไม่ไหว! ทริคคือ <strong>เลือกจุดหมุนที่ฐาน O</strong> เสมอ เพื่อตัดทั้ง N_f และ f_s ออกในสมการเดียว
        </LabInsightCallout>
      </div>
    );
  }

  // =========================================================================
  // 4. BERNOULLI VENTURI PIPE LAB
  // =========================================================================
  if (labId === 'bernoulli-pipe') {
    const v2 = inletV1 * areaRatio;
    const rho = 1000;
    const deltaP = 0.5 * rho * (v2 * v2 - inletV1 * inletV1); // Pa
    const dropKpa = deltaP / 1000;
    const narrowHalfH = Math.max(10, 34 / Math.sqrt(areaRatio));
    const h1 = 68;
    const h2 = Math.max(8, h1 - dropKpa * 1.4);

    return (
      <div className="space-y-3 font-serif">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--ink-primary)]">
          <Sliders className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>ท่อเวนจูรี (Bernoulli): ท่อแคบลง → น้ำเร็วขึ้น → ความดันลดลง!</span>
        </div>

        <svg viewBox="0 0 360 190" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <defs>
            <marker id="arrow-bern" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#0284c7" />
            </marker>
          </defs>

          {/* Piezometer vertical pressure tubes */}
          <rect x="85" y={110 - 82} width="16" height="82" fill="var(--surface-muted)" stroke="var(--ink-tertiary)" />
          <rect x="85" y={110 - h1} width="16" height={h1} fill="rgba(2, 132, 199, 0.35)" />
          <text x="93" y={106 - h1} fontSize="9" textAnchor="middle" fill="#0284c7" fontFamily="monospace" fontWeight="bold">P₁ สูง</text>

          <rect x="200" y={110 - 82} width="16" height="82" fill="var(--surface-muted)" stroke="var(--ink-tertiary)" />
          <rect x="200" y={110 - h2} width="16" height={h2} fill="rgba(217, 119, 6, 0.4)" />
          <text x="208" y={106 - h2} fontSize="9" textAnchor="middle" fill="#d97706" fontFamily="monospace" fontWeight="bold">P₂ ต่ำ</text>

          {/* Venturi pipe contour */}
          <path
            d={`M 30 ${135 - 34} L 130 ${135 - 34} L 170 ${135 - narrowHalfH} L 245 ${135 - narrowHalfH} L 285 ${135 - 34} L 330 ${135 - 34} L 330 ${135 + 34} L 285 ${135 + 34} L 245 ${135 + narrowHalfH} L 170 ${135 + narrowHalfH} L 130 ${135 + 34} L 30 ${135 + 34} Z`}
            fill="rgba(56, 189, 248, 0.16)"
            stroke="var(--ink-primary)"
            strokeWidth="2"
          />

          {/* Flow velocity arrows */}
          <line x1="48" y1="135" x2={48 + inletV1 * 14} y2="135" stroke="#0284c7" strokeWidth="2.2" markerEnd="url(#arrow-bern)" />
          <line x1="180" y1="135" x2={180 + Math.min(58, v2 * 6.5)} y2="135" stroke="#0284c7" strokeWidth="2.8" markerEnd="url(#arrow-bern)" />
          <text x="90" y="182" fontSize="9" textAnchor="middle" fill="var(--ink-secondary)" fontFamily="monospace">
            A₁, v₁={inletV1.toFixed(1)} m/s
          </text>
          <text x="210" y="182" fontSize="9" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
            A₂, v₂={v2.toFixed(1)} m/s
          </text>
        </svg>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <label className="space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>อัตราส่วนหน้าตัด A₁ / A₂</span>
              <strong className="text-[var(--ink-primary)]">{areaRatio.toFixed(1)}×</strong>
            </div>
            <input type="range" min={1.5} max={4.0} step={0.1} value={areaRatio} onChange={(e) => setAreaRatio(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
          </label>
          <label className="space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>ความเร็วน้ำขาเข้า v₁</span>
              <strong className="text-[var(--ink-primary)]">{inletV1.toFixed(1)} m/s</strong>
            </div>
            <input type="range" min={1.0} max={3.0} step={0.2} value={inletV1} onChange={(e) => setInletV1(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-2 text-center text-xs">
          <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
            <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">อัตราเร็วช่วงแคบ v₂</span>
            <span className="font-mono font-bold text-sky-700 dark:text-sky-400">{v2.toFixed(1)} m/s</span>
          </div>
          <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
            <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">ความดันตกคร่อม P₁ − P₂</span>
            <span className="font-mono font-bold text-amber-700 dark:text-amber-400">{dropKpa.toFixed(1)} kPa</span>
          </div>
        </div>

        <LabInsightCallout>
          ตรงคอคอด A₂ แคบกว่าเดิม A₁/A₂ เท่า น้ำจึงวิ่งเร็วขึ้น A₁/A₂ เท่า แต่ในสมการ Bernoulli ความเร็ว <strong>ยกกำลังสอง (½ρv²)</strong> ความดันสถิต P₂ จึงดิ่งฮวบ! (อย่าเผลอคิดว่าบีบท่อแล้วความดันเพิ่มเด็ดขาด)
        </LabInsightCallout>
      </div>
    );
  }

  // =========================================================================
  // 5. TEMPERATURE BOX: CONDUCTION + GAS PISTON THERMODYNAMICS
  // =========================================================================
  if (labId === 'temperature-box') {
    const tCold = 20;
    const tJunction = (rodRatio * hotTemp + tCold) / (rodRatio + 1);
    const dq = heatAdded;
    const workFrac = 2 / (gasDof + 2);
    const uFrac = gasDof / (gasDof + 2);
    const pistonShift = (dq * workFrac) * 1.4;

    return (
      <div className="space-y-3 font-serif">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--ink-primary)]">
            <Sliders className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>กล่องอุณหภูมิ (Temperature Box &amp; Gas Cylinder)</span>
          </div>
          <div className="inline-flex rounded border border-[var(--hairline-border)] overflow-hidden text-[11px] font-mono">
            <button
              type="button"
              onClick={() => setTempMode('conduction')}
              className={`px-2 py-0.5 ${tempMode === 'conduction' ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold' : 'bg-[var(--surface-card)] text-[var(--ink-secondary)]'}`}
            >
              กล่องนำความร้อน (ข้อ 12)
            </button>
            <button
              type="button"
              onClick={() => setTempMode('piston')}
              className={`px-2 py-0.5 border-l border-[var(--hairline-border)] ${tempMode === 'piston' ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold' : 'bg-[var(--surface-card)] text-[var(--ink-secondary)]'}`}
            >
              กระบอกสูบแก๊ส (ข้อ 14–17)
            </button>
          </div>
        </div>

        {tempMode === 'conduction' ? (
          <>
            <svg viewBox="0 0 360 170" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
              <defs>
                <linearGradient id="tempGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
                </linearGradient>
                <marker id="arrow-heat" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#f97316" />
                </marker>
              </defs>

              {/* Hot & Cold Reservoirs */}
              <rect x="24" y="34" width="68" height="102" rx="6" fill="rgba(239, 68, 68, 0.18)" stroke="#dc2626" strokeWidth="2" />
              <text x="58" y="80" fontSize="11" textAnchor="middle" fill="#dc2626" fontFamily="monospace" fontWeight="bold">T_H = {hotTemp}°C</text>
              <text x="58" y="96" fontSize="8.5" textAnchor="middle" fill="var(--ink-secondary)" fontFamily="monospace">แหล่งร้อน</text>

              <rect x="268" y="34" width="68" height="102" rx="6" fill="rgba(2, 132, 199, 0.18)" stroke="#0284c7" strokeWidth="2" />
              <text x="302" y="80" fontSize="11" textAnchor="middle" fill="#0284c7" fontFamily="monospace" fontWeight="bold">T_C = {tCold}°C</text>
              <text x="302" y="96" fontSize="8.5" textAnchor="middle" fill="var(--ink-secondary)" fontFamily="monospace">แหล่งเย็น</text>

              {/* Two series conducting rods */}
              <rect x="92" y="64" width="88" height="42" fill="url(#tempGrad)" stroke="var(--ink-primary)" strokeWidth="1.5" />
              <rect x="180" y="64" width="88" height="42" fill="url(#tempGrad)" stroke="var(--ink-primary)" strokeWidth="1.5" />
              <line x1="180" y1="54" x2="180" y2="116" stroke="var(--ink-primary)" strokeWidth="1.8" strokeDasharray="3 2" />

              {/* Heat Flux arrows */}
              <line x1="110" y1="48" x2="250" y2="48" stroke="#f97316" strokeWidth="2.4" markerEnd="url(#arrow-heat)" />
              <text x="180" y="39" fontSize="9.5" textAnchor="middle" fill="#f97316" fontFamily="monospace" fontWeight="bold">
                J₁ = J₂ (สมดุลคงตัว)
              </text>
              <text x="180" y="132" fontSize="10" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
                รอยต่อ T_mid = {tJunction.toFixed(1)}°C
              </text>
              <text x="136" y="89" fontSize="9" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace">K₁</text>
              <text x="224" y="89" fontSize="9" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace">K₂</text>
            </svg>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label className="space-y-1">
                <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                  <span>อุณหภูมิด้านร้อน T_H</span>
                  <strong className="text-[var(--ink-primary)]">{hotTemp}°C</strong>
                </div>
                <input type="range" min={40} max={200} step={5} value={hotTemp} onChange={(e) => setHotTemp(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
              </label>
              <label className="space-y-1">
                <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                  <span>อัตราส่วนนำความร้อน K₁/K₂</span>
                  <strong className="text-[var(--ink-primary)]">{rodRatio.toFixed(1)}×</strong>
                </div>
                <input type="range" min={0.5} max={4.0} step={0.5} value={rodRatio} onChange={(e) => setRodRatio(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
              </label>
            </div>
          </>
        ) : (
          <>
            <svg viewBox="0 0 360 170" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
              {/* Cylinder walls */}
              <path d="M 48 36 L 295 36 M 48 36 L 48 136 M 48 136 L 295 136" fill="none" stroke="var(--ink-primary)" strokeWidth="3" />
              {/* Gas cavity */}
              <rect x="50" y="38" width={120 + pistonShift} height="96" fill="rgba(249, 115, 22, 0.14)" />
              {/* Gas particles */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <circle
                  key={i}
                  cx={66 + ((i * 23 + dq) % (95 + pistonShift))}
                  cy={52 + ((i * 19) % 68)}
                  r="3.2"
                  fill="#ea580c"
                />
              ))}
              {/* Movable Piston */}
              <rect x={170 + pistonShift} y="38" width="14" height="96" fill="var(--surface-muted)" stroke="var(--ink-primary)" strokeWidth="2" />
              <line x1={184 + pistonShift} y1="86" x2="295" y2="86" stroke="var(--ink-primary)" strokeWidth="4" />

              <text x="115" y="154" fontSize="9.5" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace">
                ΔU = {(dq * uFrac).toFixed(1)} J ({Math.round(uFrac * 100)}%) | ΔW = {(dq * workFrac).toFixed(1)} J ({Math.round(workFrac * 100)}%)
              </text>
            </svg>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs items-center">
              <label className="space-y-1">
                <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                  <span>ใส่ความร้อน ΔQ (ความดันคงที่)</span>
                  <strong className="text-[var(--ink-primary)]">{dq} J</strong>
                </div>
                <input type="range" min={10} max={100} step={5} value={heatAdded} onChange={(e) => setHeatAdded(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
              </label>
              <div className="flex gap-1.5 font-mono text-[11px]">
                <button type="button" onClick={() => setGasDof(3)} className={`flex-1 py-1.5 rounded border ${gasDof === 3 ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold' : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'}`}>อะตอมเดี่ยว f=3</button>
                <button type="button" onClick={() => setGasDof(5)} className={`flex-1 py-1.5 rounded border ${gasDof === 5 ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold' : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'}`}>สองอะตอม f=5</button>
              </div>
            </div>
          </>
        )}

        <LabInsightCallout>
          {tempMode === 'conduction'
            ? 'สมดุลคงตัว (Steady State) ฟลักซ์ความร้อน J₁ = J₂ เท่ากันทั้งสองแท่ง เปรียบเหมือนกระแสไฟฟ้าไหลอนุกรม! ตัวที่มีค่า K มากกว่าจะอุณหภูมิเปลี่ยนน้อยกว่า (เหมือนตัวต้านทานค่าน้อย ΔV น้อย)'
            : 'เมื่อให้ความร้อนที่ความดันคงที่ (Isobaric): แก๊สอะตอมเดี่ยว (f=3) เอาไปทำงานได้ 2/5 = 40% ส่วนแก๊ส 2 อะตอม (f=5) ต้องแบ่งไปหมุนด้วย จึงทำงานได้แค่ 2/7 ≈ 28.6%!'
          }
        </LabInsightCallout>
      </div>
    );
  }

  // =========================================================================
  // 6. PARALLEL PLATE CAPACITOR & ELECTRIC ENERGY DENSITY LAB
  // =========================================================================
  if (labId === 'electric-capacitor') {
    const gapPx = 28 + (plateGapMm - 1.0) * 28;
    const leftPlateX = 180 - gapPx / 2;
    const rightPlateX = 180 + gapPx / 2;
    // Reference at d=2mm, V0=10V, C0=1 uF => U0 = 50 uJ
    const relC = 2.0 / plateGapMm;
    const relE = batteryConnected ? 2.0 / plateGapMm : 1.0;
    const relQ = batteryConnected ? relC : 1.0;
    const relU = batteryConnected ? relC : plateGapMm / 2.0;

    return (
      <div className="space-y-3 font-serif">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--ink-primary)]">
            <Sliders className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>ดึงแผ่นตัวเก็บประจุ: ทดสอบเสียบแบตค้าง (V คงที่) vs ถอดแบต (Q คงที่)</span>
          </div>
          <div className="inline-flex rounded border border-[var(--hairline-border)] overflow-hidden text-[11px] font-mono">
            <button type="button" onClick={() => setBatteryConnected(true)} className={`px-2 py-0.5 ${batteryConnected ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold' : 'bg-[var(--surface-card)] text-[var(--ink-secondary)]'}`}>เสียบแบต (V คงที่)</button>
            <button type="button" onClick={() => setBatteryConnected(false)} className={`px-2 py-0.5 border-l border-[var(--hairline-border)] ${!batteryConnected ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold' : 'bg-[var(--surface-card)] text-[var(--ink-secondary)]'}`}>ถอดแบต (Q คงที่)</button>
          </div>
        </div>

        <svg viewBox="0 0 360 175" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <defs>
            <marker id="arrow-efield" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#0284c7" />
            </marker>
          </defs>

          {/* Energy density glow between plates */}
          <rect x={leftPlateX + 4} y="34" width={gapPx - 8} height="98" fill={`rgba(2, 132, 199, ${Math.min(0.4, 0.15 * relE)})`} />

          {/* Electric field lines */}
          {[50, 72, 94, 116].map((y) => (
            <line key={y} x1={leftPlateX + 8} y1={y} x2={rightPlateX - 8} y2={y} stroke="#0284c7" strokeWidth="1.6" markerEnd="url(#arrow-efield)" />
          ))}

          {/* +Q and -Q plates */}
          <rect x={leftPlateX - 6} y="30" width="8" height="106" rx="2" fill="#dc2626" />
          <rect x={rightPlateX - 2} y="30" width="8" height="106" rx="2" fill="#0284c7" />
          <text x={leftPlateX - 18} y="86" fontSize="11" fill="#dc2626" fontFamily="monospace" fontWeight="bold">+Q</text>
          <text x={rightPlateX + 12} y="86" fontSize="11" fill="#0284c7" fontFamily="monospace" fontWeight="bold">-Q</text>

          {/* Battery indicator */}
          {batteryConnected ? (
            <text x="180" y="158" fontSize="10" textAnchor="middle" fill="#16a34a" fontFamily="monospace" fontWeight="bold">
              ต่อแบตเตอรี่ V คงที่ (ดึงห่าง → C↓, E↓, พลังงาน U↓)
            </text>
          ) : (
            <text x="180" y="158" fontSize="10" textAnchor="middle" fill="#d97706" fontFamily="monospace" fontWeight="bold">
              ถอดแบตเตอรี่ Q คงที่ (ดึงห่าง → E เท่าเดิม, ปริมาตรเพิ่ม → U↑!)
            </text>
          )}
        </svg>

        <label className="space-y-1 block text-xs">
          <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
            <span>ระยะห่างแผ่นตัวนำ d</span>
            <strong className="text-[var(--ink-primary)]">{plateGapMm.toFixed(1)} mm</strong>
          </div>
          <input type="range" min={1.0} max={4.0} step={0.2} value={plateGapMm} onChange={(e) => setPlateGapMm(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
        </label>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
            <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">ความจุ C / C₀</span>
            <span className="font-mono font-bold text-[var(--ink-primary)]">{relC.toFixed(2)}×</span>
          </div>
          <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
            <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">ประจุ Q / Q₀ | E / E₀</span>
            <span className="font-mono font-bold text-sky-700 dark:text-sky-400">{relQ.toFixed(2)}× | {relE.toFixed(2)}×</span>
          </div>
          <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
            <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">พลังงานสะสม U / U₀</span>
            <span className="font-mono font-bold text-amber-700 dark:text-amber-400">{relU.toFixed(2)}×</span>
          </div>
        </div>

        <LabInsightCallout>
          คำถามยอดฮิต สอวน.! ถอดแบต (Q คงที่) แล้วดึงแผ่นห่าง: สนามไฟฟ้า E = σ/ε₀ <strong>เท่าเดิม</strong> ไม่ขึ้นกับระยะ d เลย แต่ปริมาตรช่องว่าง (Ad) เพิ่มขึ้น พลังงาน u_E × ปริมาตร จึง<strong>เพิ่มขึ้น</strong> (มาจากแรงมือเราดึงต้านแรงดูด!)
        </LabInsightCallout>
      </div>
    );
  }

  // =========================================================================
  // 7. DC CIRCUIT ROLE OF R, C, L (OFFICIAL ITEM 22 & 24)
  // =========================================================================
  if (labId === 'rc-circuit-box') {
    const emf = 12;
    const rOhm = 4;
    let current = 0;
    let vr = 0;
    let vx = 0;
    let statusText = '';

    if (elementType === 'C') {
      if (circuitPhase === 't0') {
        current = emf / rOhm;
        vr = emf;
        vx = 0;
        statusText = 'C ยังว่าง (V_C = 0) → ทำตัวเหมือนสายไฟลัดวงจร!';
      } else if (circuitPhase === 'mid') {
        current = 1.5;
        vr = 6;
        vx = 6;
        statusText = 'ประจุกำลังสะสม กระแสลดลงเรื่อยๆ (V_R + V_C = E)';
      } else {
        current = 0;
        vr = 0;
        vx = emf;
        statusText = 'C เต็มแล้ว (V_C = E) → ทำตัวเหมือนวงจรขาด i = 0!';
      }
    } else {
      if (circuitPhase === 't0') {
        current = 0;
        vr = 0;
        vx = emf;
        statusText = 'L ต้านการเปลี่ยนกระแส → ทำตัวเหมือนวงจรขาด i = 0!';
      } else if (circuitPhase === 'mid') {
        current = 1.5;
        vr = 6;
        vx = 6;
        statusText = 'กระแสกำลังไต่ระดับขึ้น (V_R + V_L = E)';
      } else {
        current = emf / rOhm;
        vr = emf;
        vx = 0;
        statusText = 'กระแสคงที่แล้ว → L ไม่ต้าน (V_L = 0) เหมือนสายไฟลัดวงจร!';
      }
    }

    return (
      <div className="space-y-3 font-serif">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--ink-primary)]">
            <Sliders className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>บทบาท R–C และ R–L ในวงจร DC (E = 12V, R = 4Ω)</span>
          </div>
          <div className="inline-flex rounded border border-[var(--hairline-border)] overflow-hidden text-[11px] font-mono">
            <button type="button" onClick={() => setElementType('C')} className={`px-2 py-0.5 ${elementType === 'C' ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold' : 'bg-[var(--surface-card)] text-[var(--ink-secondary)]'}`}>ตัวเก็บประจุ C</button>
            <button type="button" onClick={() => setElementType('L')} className={`px-2 py-0.5 border-l border-[var(--hairline-border)] ${elementType === 'L' ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold' : 'bg-[var(--surface-card)] text-[var(--ink-secondary)]'}`}>ตัวเหนี่ยวนำ L</button>
          </div>
        </div>

        <svg viewBox="0 0 360 165" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          {/* Circuit loop */}
          <rect
            x="55"
            y="34"
            width="250"
            height="92"
            rx="6"
            fill="none"
            stroke={current > 0 ? '#0284c7' : 'var(--ink-tertiary)'}
            strokeWidth={current > 2 ? '3' : '2'}
          />
          {/* Battery */}
          <rect x="40" y="64" width="30" height="32" fill="var(--surface-card)" />
          <line x1="42" y1="74" x2="68" y2="74" stroke="var(--ink-primary)" strokeWidth="2.5" />
          <line x1="48" y1="86" x2="62" y2="86" stroke="var(--ink-primary)" strokeWidth="2.5" />
          <text x="32" y="83" fontSize="10" textAnchor="end" fill="var(--ink-primary)" fontFamily="monospace">E=12V</text>

          {/* Resistor R top */}
          <rect x="140" y="22" width="80" height="24" rx="3" fill="var(--surface-muted)" stroke="var(--ink-primary)" strokeWidth="1.8" />
          <text x="180" y="38" fontSize="10" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">R = 4Ω</text>

          {/* Element C or L right side */}
          <rect x="292" y="56" width="26" height="48" fill="var(--surface-card)" />
          {elementType === 'C' ? (
            <>
              <line x1="292" y1="73" x2="318" y2="73" stroke="#d97706" strokeWidth="3" />
              <line x1="292" y1="87" x2="318" y2="87" stroke="#d97706" strokeWidth="3" />
              <text x="330" y="83" fontSize="11" fill="#d97706" fontFamily="monospace" fontWeight="bold">C</text>
            </>
          ) : (
            <>
              <path d="M305,58 Q318,65 305,72 Q318,79 305,86 Q318,93 305,100" fill="none" stroke="#d97706" strokeWidth="2.6" />
              <text x="328" y="83" fontSize="11" fill="#d97706" fontFamily="monospace" fontWeight="bold">L</text>
            </>
          )}

          <text x="180" y="92" fontSize="10.5" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
            {statusText}
          </text>
        </svg>

        <div className="grid grid-cols-3 gap-1.5 text-xs font-mono">
          {[
            { id: 't0' as const, label: 't = 0⁺ (สับสวิตช์)' },
            { id: 'mid' as const, label: 'ระหว่างทาง' },
            { id: 'tinf' as const, label: 't → ∞ (คงตัว)' },
          ].map((ph) => (
            <button
              key={ph.id}
              type="button"
              onClick={() => setCircuitPhase(ph.id)}
              className={`min-h-[38px] px-2 py-1 rounded border transition-colors ${
                circuitPhase === ph.id
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100 font-bold'
                  : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
              }`}
            >
              {ph.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
            <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">กระแส i</span>
            <span className="font-mono font-bold text-sky-700 dark:text-sky-400">{current.toFixed(1)} A</span>
          </div>
          <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
            <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">V_R | V_{elementType}</span>
            <span className="font-mono font-bold text-amber-700 dark:text-amber-400">{vr.toFixed(1)}V | {vx.toFixed(1)}V</span>
          </div>
          <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
            <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">Joule Heat i²R</span>
            <span className="font-mono font-bold text-rose-700 dark:text-rose-400">{(current * current * rOhm).toFixed(1)} W</span>
          </div>
        </div>

        <LabInsightCallout>
          จำคู่ตรงข้ามให้ขึ้นใจ: <strong>t = 0⁺</strong> (สับสวิตช์ปุ๊บ) ตัวเก็บประจุ C ว่าง = <strong>ลวดลัดวงจร</strong> แต่ขดลวด L ต้านกระแสฉับพลัน = <strong>วงจรขาด</strong>! พอทิ้งไว้นาน <strong>t → ∞</strong> ทั้งคู่สลับบทบาทกันทันที!
        </LabInsightCallout>
      </div>
    );
  }

  // =========================================================================
  // 8. MAGNETIC WIRE (LOOP B = μ0 i / 2r) & FARADAY RAIL (ข้อ 23–24)
  // =========================================================================
  if (labId === 'magnetic-wire') {
    const mu0 = 4 * Math.PI * 1e-7;
    const rMeters = loopRadiusCm / 100;
    const bCenterMicroT = ((mu0 * wireCurrent) / (2 * rMeters)) * 1e6;
    const rodLen = 0.5;
    const emf = bFieldT * rodLen * railSpeed;
    const railR = 2.0;
    const inducedI = emf / railR;
    const fMag = inducedI * rodLen * bFieldT;

    return (
      <div className="space-y-3 font-serif">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--ink-primary)]">
            <Sliders className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>ลวดนำกระแสและสนามแม่เหล็ก (ข้อ 23–24)</span>
          </div>
          <div className="inline-flex rounded border border-[var(--hairline-border)] overflow-hidden text-[11px] font-mono">
            <button type="button" onClick={() => setMagMode('loop')} className={`px-2 py-0.5 ${magMode === 'loop' ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold' : 'bg-[var(--surface-card)] text-[var(--ink-secondary)]'}`}>วงลวด B = μ₀i/2r</button>
            <button type="button" onClick={() => setMagMode('rail')} className={`px-2 py-0.5 border-l border-[var(--hairline-border)] ${magMode === 'rail' ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold' : 'bg-[var(--surface-card)] text-[var(--ink-secondary)]'}`}>รางฟาราเดย์ E = Blv</button>
          </div>
        </div>

        {magMode === 'loop' ? (
          <>
            <svg viewBox="0 0 360 175" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
              <defs>
                <marker id="arrow-mag-b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#0284c7" />
                </marker>
                <marker id="arrow-mag-i" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#d97706" />
                </marker>
              </defs>

              {/* Perspective circular loop */}
              <ellipse
                cx="180"
                cy="108"
                rx={38 + loopRadiusCm * 8}
                ry={18 + loopRadiusCm * 2.4}
                fill="rgba(2, 132, 199, 0.08)"
                stroke="#d97706"
                strokeWidth="3.5"
              />
              {/* Radius r line */}
              <line x1="180" y1="108" x2={180 + 38 + loopRadiusCm * 8} y2="108" stroke="var(--ink-secondary)" strokeWidth="1.2" strokeDasharray="3 2" />
              <text x={180 + (38 + loopRadiusCm * 8) / 2} y="122" fontSize="9.5" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace">r={loopRadiusCm}cm</text>

              {/* Central B vector upward (Right-hand rule) */}
              <line x1="180" y1="138" x2="180" y2="24" stroke="#0284c7" strokeWidth="3" markerEnd="url(#arrow-mag-b)" />
              <text x="190" y="34" fontSize="11" fill="#0284c7" fontFamily="monospace" fontWeight="bold">B (พุ่งขึ้น!)</text>
              <circle cx="180" cy="108" r="3.5" fill="var(--ink-primary)" />

              {/* Current arrow */}
              <line x1="215" y1={108 + 18 + loopRadiusCm * 2.4} x2="232" y2={108 + 16 + loopRadiusCm * 2.4} stroke="#d97706" strokeWidth="2.5" markerEnd="url(#arrow-mag-i)" />
              <text x="180" y="160" fontSize="10" textAnchor="middle" fill="#d97706" fontFamily="monospace" fontWeight="bold">กระแสวนทวนเข็ม i = {wireCurrent.toFixed(1)} A</text>
            </svg>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label className="space-y-1">
                <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                  <span>กระแสไฟฟ้า i</span>
                  <strong className="text-[var(--ink-primary)]">{wireCurrent.toFixed(1)} A</strong>
                </div>
                <input type="range" min={1} max={10} step={0.5} value={wireCurrent} onChange={(e) => setWireCurrent(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
              </label>
              <label className="space-y-1">
                <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                  <span>รัศมีวงลวด r</span>
                  <strong className="text-[var(--ink-primary)]">{loopRadiusCm.toFixed(1)} cm</strong>
                </div>
                <input type="range" min={2} max={10} step={0.5} value={loopRadiusCm} onChange={(e) => setLoopRadiusCm(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
              </label>
            </div>

            <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-center text-xs font-mono">
              สนามแม่เหล็กตรงกลาง B = μ₀i/(2r) = <strong className="text-sky-700 dark:text-sky-400">{bCenterMicroT.toFixed(1)} μT</strong>
            </div>
          </>
        ) : (
          <>
            <svg viewBox="0 0 360 175" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
              <defs>
                <marker id="arrow-rail-v" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#16a34a" />
                </marker>
                <marker id="arrow-rail-f" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#dc2626" />
                </marker>
              </defs>

              {/* Magnetic B-field crosses */}
              {[90, 140, 190, 240, 290].flatMap((x) =>
                [48, 86, 124].map((y) => (
                  <text key={`${x}-${y}`} x={x} y={y} fontSize="11" fill="#0284c7" opacity="0.45" textAnchor="middle" fontFamily="monospace">×</text>
                ))
              )}

              {/* U-shaped rail */}
              <path d="M 320 38 L 60 38 L 60 134 L 320 134" fill="none" stroke="var(--ink-primary)" strokeWidth="2.5" />
              <rect x="48" y="68" width="24" height="36" rx="3" fill="var(--surface-muted)" stroke="var(--ink-primary)" strokeWidth="1.8" />
              <text x="60" y="90" fontSize="9.5" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace">2Ω</text>

              {/* Sliding conducting rod */}
              <line x1="210" y1="32" x2="210" y2="140" stroke="#d97706" strokeWidth="5" strokeLinecap="round" />
              <line x1="210" y1="86" x2={210 + 18 + railSpeed * 6} y2="86" stroke="#16a34a" strokeWidth="2.4" markerEnd="url(#arrow-rail-v)" />
              <text x={228 + railSpeed * 6} y="80" fontSize="9.5" fill="#16a34a" fontFamily="monospace" fontWeight="bold">v</text>

              <line x1="210" y1="104" x2={210 - 18 - fMag * 90} y2="104" stroke="#dc2626" strokeWidth="2.4" markerEnd="url(#arrow-rail-f)" />
              <text x={200 - fMag * 90} y="118" fontSize="9.5" fill="#dc2626" fontFamily="monospace" fontWeight="bold">F_Lenz (ต้าน!)</text>
            </svg>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label className="space-y-1">
                <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                  <span>ความเร็วลวด v (ℓ = 0.5m)</span>
                  <strong className="text-[var(--ink-primary)]">{railSpeed.toFixed(1)} m/s</strong>
                </div>
                <input type="range" min={1} max={8} step={0.5} value={railSpeed} onChange={(e) => setRailSpeed(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
              </label>
              <label className="space-y-1">
                <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                  <span>สนามแม่เหล็ก B</span>
                  <strong className="text-[var(--ink-primary)]">{bFieldT.toFixed(1)} T</strong>
                </div>
                <input type="range" min={0.2} max={1.5} step={0.1} value={bFieldT} onChange={(e) => setBFieldT(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
              </label>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
                <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">แรงดัน E = Bℓv</span>
                <span className="font-mono font-bold text-[var(--ink-primary)]">{emf.toFixed(2)} V</span>
              </div>
              <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
                <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">กระแส i = E/R</span>
                <span className="font-mono font-bold text-amber-700 dark:text-amber-400">{inducedI.toFixed(2)} A</span>
              </div>
              <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
                <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">แรงต้าน F = iℓB</span>
                <span className="font-mono font-bold text-rose-700 dark:text-rose-400">{fMag.toFixed(3)} N</span>
              </div>
            </div>
          </>
        )}

        <LabInsightCallout>
          {magMode === 'loop'
            ? 'ใช้กฎมือขวา: กำนิ้วทั้ง 4 ตามกระแส i → หัวแม่มือชี้ทิศ B! และถ้าเป็นส่วนโค้งมุม θ เรเดียน ใช้สัดส่วน B_arc = (θ / 2π) × μ₀i / (2r) ส่วนเส้นตรงที่ชี้พุ่งหาจุดศูนย์กลางไม่สร้างสนาม B ที่จุดนั้น (r × dℓ = 0)!'
            : 'กฎของเลนซ์: แรงแม่เหล็ก F = iℓB จะชี้ต้านความเร็ว v เสมอ! เช็กสมดุลพลังงานได้ทันทีว่า กำลังมือดึง (Fv) = กำลังความร้อนบน R (i²R = B²ℓ²v²/R)'}
        </LabInsightCallout>
      </div>
    );
  }

  // =========================================================================
  // 9. OPTICS RAY TRACER (CONCAVE/CONVEX LENS & MIRROR, ข้อ 26–28)
  // =========================================================================
  const isLens = opticKind === 'convex-lens' || opticKind === 'concave-lens';
  const f = opticKind === 'convex-lens' || opticKind === 'concave-mirror' ? 10 : -10;
  const u = objectDist;
  const denom = 1 / f - 1 / u;
  const atFocus = Math.abs(denom) < 0.002;
  const v = atFocus ? 999 : 1 / denom;
  const m = atFocus ? 0 : -v / u;

  // Map optical axis [-35, +35] cm -> svg x [15, 345]; optic sits at center x=180
  const scale = 4.6;
  const cx = 180;
  const ay = 95;
  const objH = 26;
  const objX = cx - u * scale;

  // Compute physical x-coordinate of image in SVG
  const imgX = isLens ? cx + v * scale : cx - v * scale;
  const imgH = objH * m;
  const imgClampH = Math.max(-68, Math.min(68, imgH));
  const fLeftX = cx - Math.abs(f) * scale;
  const fRightX = cx + Math.abs(f) * scale;
  // Active focal point for parallel ray target:
  const parallelFocalX = isLens
    ? f > 0 ? fRightX : fLeftX
    : f > 0 ? fLeftX : fRightX;

  return (
    <div className="space-y-3 font-serif">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--ink-primary)]">
          <Sliders className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>วาดทางเดินแสง 1/v + 1/u = 1/f (|f| = 10 cm)</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px] font-mono">
        {[
          { id: 'convex-lens' as const, label: 'เลนส์นูน (+10)' },
          { id: 'concave-lens' as const, label: 'เลนส์เว้า (-10)' },
          { id: 'concave-mirror' as const, label: 'กระจกเว้า (+10)' },
          { id: 'convex-mirror' as const, label: 'กระจกนูน (-10)' },
        ].map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setOpticKind(opt.id)}
            className={`px-2 py-1 rounded border transition-colors ${
              opticKind === opt.id
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100 font-bold'
                : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 360 185" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
        {/* Principal axis */}
        <line x1="12" y1={ay} x2="348" y2={ay} stroke="var(--ink-tertiary)" strokeWidth="1.2" />

        {/* Focal points */}
        <circle cx={fLeftX} cy={ay} r="2.8" fill="#d97706" />
        <text x={fLeftX} y={ay + 12} fontSize="8.5" textAnchor="middle" fill="#d97706" fontFamily="monospace">F</text>
        <circle cx={fRightX} cy={ay} r="2.8" fill="#d97706" />
        <text x={fRightX} y={ay + 12} fontSize="8.5" textAnchor="middle" fill="#d97706" fontFamily="monospace">F&apos;</text>

        {/* Optical Element */}
        {isLens ? (
          <path
            d={
              f > 0
                ? `M ${cx} ${ay - 65} Q ${cx + 12} ${ay} ${cx} ${ay + 65} Q ${cx - 12} ${ay} ${cx} ${ay - 65}`
                : `M ${cx - 6} ${ay - 65} Q ${cx + 4} ${ay} ${cx - 6} ${ay + 65} L ${cx + 6} ${ay + 65} Q ${cx - 4} ${ay} ${cx + 6} ${ay - 65} Z`
            }
            fill="rgba(56, 189, 248, 0.25)"
            stroke="#0284c7"
            strokeWidth="2"
          />
        ) : (
          <path
            d={
              f > 0
                ? `M ${cx - 6} ${ay - 64} Q ${cx + 10} ${ay} ${cx - 6} ${ay + 64}`
                : `M ${cx + 6} ${ay - 64} Q ${cx - 10} ${ay} ${cx + 6} ${ay + 64}`
            }
            fill="none"
            stroke="#0284c7"
            strokeWidth="3.5"
          />
        )}

        {/* Ray 1: Parallel to axis -> through focal point */}
        <line x1={objX} y1={ay - objH} x2={cx} y2={ay - objH} stroke="#d97706" strokeWidth="1.6" />
        {!atFocus && (
          <line
            x1={cx}
            y1={ay - objH}
            x2={Math.max(12, Math.min(348, imgX))}
            y2={ay - imgClampH}
            stroke={v > 0 ? '#d97706' : '#0284c7'}
            strokeWidth="1.5"
            strokeDasharray={v > 0 ? undefined : '4 3'}
          />
        )}
        {/* Show real outgoing parallel ray passing through parallelFocalX when virtual image forms */}
        {!atFocus && v < 0 && (
          <line
            x1={cx}
            y1={ay - objH}
            x2={isLens ? 345 : 15}
            y2={
              (ay - objH) +
              ((isLens ? 345 - cx : 15 - cx) * (ay - (ay - objH))) / (parallelFocalX - cx)
            }
            stroke="#d97706"
            strokeWidth="1.5"
          />
        )}

        {/* Ray 2: Center ray */}
        {!atFocus && (
          <line
            x1={objX}
            y1={ay - objH}
            x2={Math.max(12, Math.min(348, imgX))}
            y2={ay - imgClampH}
            stroke="#16a34a"
            strokeWidth="1.5"
            strokeDasharray={v > 0 ? undefined : '4 3'}
          />
        )}

        {/* Object Arrow */}
        <line x1={objX} y1={ay} x2={objX} y2={ay - objH} stroke="var(--ink-primary)" strokeWidth="2.8" />
        <polygon points={`${objX},${ay - objH - 5} ${objX - 4},${ay - objH + 2} ${objX + 4},${ay - objH + 2}`} fill="var(--ink-primary)" />
        <text x={objX} y={ay + 14} fontSize="9" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace">วัตถุ</text>

        {/* Image Arrow */}
        {!atFocus && imgX >= 10 && imgX <= 350 && (
          <>
            <line
              x1={imgX}
              y1={ay}
              x2={imgX}
              y2={ay - imgClampH}
              stroke={v > 0 ? '#dc2626' : '#0284c7'}
              strokeWidth="2.6"
              strokeDasharray={v > 0 ? undefined : '3 2'}
            />
            <text x={imgX} y={ay + 14} fontSize="9" textAnchor="middle" fill={v > 0 ? '#dc2626' : '#0284c7'} fontFamily="monospace">
              {v > 0 ? 'ภาพจริง' : 'ภาพเสมือน'}
            </text>
          </>
        )}
      </svg>

      <label className="space-y-1 block text-xs">
        <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
          <span>ระยะวัตถุ u</span>
          <strong className="text-[var(--ink-primary)]">{u} cm (f = {f > 0 ? '+10' : '-10'} cm)</strong>
        </div>
        <input type="range" min={5} max={30} step={1} value={objectDist} onChange={(e) => setObjectDist(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
      </label>

      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">ระยะภาพ v</span>
          <span className="font-mono font-bold text-[var(--ink-primary)]">{atFocus ? '∞ (ขนาน)' : `${v.toFixed(1)} cm`}</span>
        </div>
        <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">กำลังขยาย m = -v/u</span>
          <span className="font-mono font-bold text-amber-700 dark:text-amber-400">{atFocus ? '∞' : `${m.toFixed(2)}×`}</span>
        </div>
        <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">ลักษณะภาพ</span>
          <span className="font-mono font-bold text-sky-700 dark:text-sky-400">
            {atFocus ? 'ภาพที่อนันต์' : `${v > 0 ? 'จริง' : 'เสมือน'} ${m < 0 ? 'หัวกลับ' : 'หัวตั้ง'}`}
          </span>
        </div>
      </div>

      <LabInsightCallout>
        ระบบรวมแสง (เลนส์นูน / กระจกเว้า) ใช้ f เป็นบวก (+), ระบบกระจายแสง (เลนส์เว้า / กระจกนูน) ใช้ f เป็นลบ (−)! ทดลองลากวัตถุ u = 20 cm (ที่ 2f) จะเห็นภาพจริงขนาดเท่าวัตถุพอดี (m = −1.00×) และถ้านำวัตถุเข้าใกล้กว่า f ภาพจะพลิกเป็นภาพเสมือนหัวตั้ง!
      </LabInsightCallout>
    </div>
  );
};
