// src/components/interactive/Camp2PhysicsLabs.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FormattedMathText } from '@/components/math/LatexRenderer';
import { Play, Pause, RotateCcw, Sparkles, Sliders } from 'lucide-react';

export type Camp2LabKind =
  | 'vector-calculus-lab'
  | 'drag-terminal-lab'
  | 'rocket-com-lab'
  | 'rolling-race-lab'
  | 'kepler-orbit-lab'
  | 'shm-phase-lab';

interface Camp2PhysicsLabsProps {
  labId: Camp2LabKind;
}

const G = 10;

export const Camp2PhysicsLabs: React.FC<Camp2PhysicsLabsProps> = ({ labId }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [simTime, setSimTime] = useState<number>(0);

  // 1. Vector calculus & polar basis state
  const [vecAngleDeg, setVecAngleDeg] = useState<number>(38);
  const [vecMagA, setVecMagA] = useState<number>(4.5);
  const [vecMagB, setVecMagB] = useState<number>(3.5);
  const [angleBDeg, setAngleBDeg] = useState<number>(115);

  // 2. Stokes drag state: dv/dt = g - (b/m)v => v_T = mg/b
  const [dragB, setDragB] = useState<number>(1.8);
  const [dragMass, setDragMass] = useState<number>(3.0);

  // 3. Tsiolkovsky rocket state
  const [exhaustU, setExhaustU] = useState<number>(2500);
  const [fuelFrac, setFuelFrac] = useState<number>(0.75); // fuel/total

  // 4. Rolling race state (mu vs shape)
  const [raceSlopeDeg, setRaceSlopeDeg] = useState<number>(28);

  // 5. Kepler orbit state (v0 / v_circ ratio)
  const [velRatio, setVelRatio] = useState<number>(1.18);
  const keplerThetaRef = useRef<number>(0);
  const [keplerTheta, setKeplerTheta] = useState<number>(0);

  // 6. SHM phase space state
  const [shmAmp, setShmAmp] = useState<number>(1.0);
  const [shmOmega, setShmOmega] = useState<number>(2.5);

  const keplerRatioRef = useRef(velRatio);
  useEffect(() => {
    keplerRatioRef.current = velRatio;
  }, [velRatio]);

  useEffect(() => {
    if (!isPlaying) return;
    let rafId = 0;
    let prevTs = performance.now();

    const step = (now: number) => {
      const dt = Math.min(0.04, (now - prevTs) / 1000);
      prevTs = now;
      setSimTime((t) => t + dt);

      if (labId === 'kepler-orbit-lab') {
        const ratio = keplerRatioRef.current;
        const p = ratio * ratio; // semi-latus rectum normalized r0 = 1
        const ecc = Math.abs(ratio * ratio - 1);
        const curTh = keplerThetaRef.current;
        const denom = ratio >= 1 ? 1 + ecc * Math.cos(curTh) : 1 - ecc * Math.cos(curTh);
        const rNorm = Math.max(0.35, Math.min(5, p / Math.max(0.15, denom)));
        // Kepler 2nd law: r^2 dtheta/dt = const
        const dTheta = (1.35 * ratio * dt) / (rNorm * rNorm);
        let nextTh = curTh + dTheta;
        if (ratio >= Math.SQRT2 - 0.01 && nextTh > 2.3) {
          nextTh = -2.3;
        }
        keplerThetaRef.current = nextTh;
        setKeplerTheta(nextTh);
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, labId]);

  const handleReset = () => {
    setSimTime(0);
    keplerThetaRef.current = 0;
    setKeplerTheta(0);
    setIsPlaying(true);
  };

  // =========================================================================
  // 1. VECTOR CALCULUS & POLAR UNIT VECTORS (r_hat, theta_hat)
  // =========================================================================
  if (labId === 'vector-calculus-lab') {
    const thA = (vecAngleDeg * Math.PI) / 180;
    const thB = (angleBDeg * Math.PI) / 180;
    const ax = vecMagA * Math.cos(thA);
    const ay = vecMagA * Math.sin(thA);
    const bx = vecMagB * Math.cos(thB);
    const by = vecMagB * Math.sin(thB);
    const dot = ax * bx + ay * by;
    const crossZ = ax * by - ay * bx;
    const ox = 230;
    const oy = 128;
    const sc = 16;

    // Polar unit vectors rotated at theta = vecAngleDeg
    const rPx = 70;
    const px = ox + rPx * Math.cos(thA);
    const py = oy - rPx * Math.sin(thA);

    return (
      <div className="space-y-3 font-serif">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--ink-primary)]">
            <Sliders className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>ห้องทดลองเวกเตอร์ Dot/Cross &amp; พิกัดเชิงขั้ว (r̂, θ̂)</span>
          </div>
        </div>

        <svg viewBox="0 0 460 220" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <defs>
            <marker id="vc-a" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#0284c7" />
            </marker>
            <marker id="vc-b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#d97706" />
            </marker>
            <marker id="vc-sum" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#16a34a" />
            </marker>
          </defs>

          <line x1="35" y1={oy} x2="425" y2={oy} stroke="var(--ink-tertiary)" strokeWidth="1" />
          <line x1={ox} y1="20" x2={ox} y2="205" stroke="var(--ink-tertiary)" strokeWidth="1" />
          <circle cx={ox} cy={oy} r={rPx} fill="none" stroke="var(--ink-tertiary)" strokeWidth="1" strokeDasharray="3 3" />

          {/* Vector A, B, and A+B */}
          <line x1={ox} y1={oy} x2={ox + ax * sc} y2={oy - ay * sc} stroke="#0284c7" strokeWidth="2.6" markerEnd="url(#vc-a)" />
          <line x1={ox} y1={oy} x2={ox + bx * sc} y2={oy - by * sc} stroke="#d97706" strokeWidth="2.6" markerEnd="url(#vc-b)" />
          <line x1={ox} y1={oy} x2={ox + (ax + bx) * sc} y2={oy - (ay + by) * sc} stroke="#16a34a" strokeWidth="2.2" strokeDasharray="4 2" markerEnd="url(#vc-sum)" />

          {/* Polar basis vectors r_hat and theta_hat at (r, theta) */}
          <line x1={px} y1={py} x2={px + 26 * Math.cos(thA)} y2={py - 26 * Math.sin(thA)} stroke="#dc2626" strokeWidth="2" markerEnd="url(#vc-sum)" />
          <line x1={px} y1={py} x2={px - 26 * Math.sin(thA)} y2={py - 26 * Math.cos(thA)} stroke="#9333ea" strokeWidth="2" markerEnd="url(#vc-b)" />

          <text x="16" y="22" fontSize="9.5" fill="#0284c7" fontFamily="monospace" fontWeight="bold">A = {vecMagA.toFixed(1)} (θ={vecAngleDeg}°)</text>
          <text x="16" y="36" fontSize="9.5" fill="#d97706" fontFamily="monospace" fontWeight="bold">B = {vecMagB.toFixed(1)} (θ={angleBDeg}°)</text>
          <text x="444" y="22" fontSize="9.5" textAnchor="end" fill="#16a34a" fontFamily="monospace" fontWeight="bold">A·B = {dot.toFixed(1)} • (A×B)_z = {crossZ.toFixed(1)}</text>
        </svg>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <label className="space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>มุม θ ของ A &amp; r̂</span>
              <strong className="text-[var(--ink-primary)]">{vecAngleDeg}°</strong>
            </div>
            <input type="range" min={0} max={360} step={5} value={vecAngleDeg} onChange={(e) => setVecAngleDeg(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
          </label>
          <label className="space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>มุมของ B</span>
              <strong className="text-[var(--ink-primary)]">{angleBDeg}°</strong>
            </div>
            <input type="range" min={0} max={360} step={5} value={angleBDeg} onChange={(e) => setAngleBDeg(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
          </label>
          <label className="space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>ขนาด |A| / |B|</span>
              <strong className="text-[var(--ink-primary)]">{vecMagA} / {vecMagB}</strong>
            </div>
            <input type="range" min={2} max={6} step={0.5} value={vecMagA} onChange={(e) => { setVecMagA(parseFloat(e.target.value)); setVecMagB(3.5); }} className="bridge-slider w-full cursor-pointer" />
          </label>
        </div>

        <div className="p-2.5 rounded border border-amber-300/80 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/30 text-[11px] sm:text-xs text-amber-950 dark:text-amber-200 leading-relaxed flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <FormattedMathText
            text={'หมุนมุม $\\theta$ จะเห็นว่า $\\hat{r}(\\theta)$ และ $\\hat{\\theta}(\\theta)$ ไม่คงที่ในอวกาศ! จึงเกิดอนุพันธ์ $\\frac{d\\hat{r}}{dt} = \\dot{\\theta}\\hat{\\theta}$ ส่วน $(A\\times B)_z$ คือพื้นที่สี่เหลี่ยมด้านขนานระหว่างสองเวกเตอร์'}
          />
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. STOKES DRAG & TERMINAL VELOCITY LAB
  // =========================================================================
  if (labId === 'drag-terminal-lab') {
    const vTerm = (dragMass * G) / dragB;
    const tau = dragMass / dragB;
    const tMod = simTime % 7.5;
    const vCur = vTerm * (1 - Math.exp(-tMod / tau));
    const dropY = 38 + Math.min(148, (vTerm * (tMod - tau * (1 - Math.exp(-tMod / tau)))) * 2.1);

    const curvePts = Array.from({ length: 45 }, (_, i) => {
      const t = (i / 44) * 7.5;
      const v = vTerm * (1 - Math.exp(-t / tau));
      const gx = 165 + (t / 7.5) * 265;
      const gy = 182 - (Math.min(45, v) / 45) * 145;
      return `${i === 0 ? 'M' : 'L'} ${gx.toFixed(1)} ${gy.toFixed(1)}`;
    }).join(' ');

    return (
      <div className="space-y-3 font-serif">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs sm:text-sm font-bold text-[var(--ink-primary)]">
            ห้องทดลองแรงต้าน Stokes (F = -bv) &amp; ความเร็วปลาย v_T
          </span>
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <button type="button" onClick={() => setIsPlaying((p) => !p)} className="px-2 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
              {isPlaying ? 'พัก' : 'เล่น'}
            </button>
            <button type="button" onClick={handleReset} className="px-2 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
              ปล่อยใหม่
            </button>
          </div>
        </div>

        <svg viewBox="0 0 460 220" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          {/* Left fluid tube */}
          <rect x="34" y="24" width="84" height="170" rx="6" fill="rgba(14,165,233,0.16)" stroke="var(--ink-primary)" strokeWidth="2" />
          <circle cx="76" cy={dropY} r="9" fill="#d97706" stroke="white" strokeWidth="1.5" />
          <text x="76" y="210" fontSize="9.5" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
            v={vCur.toFixed(1)} m/s
          </text>

          {/* Right v(t) graph */}
          <line x1="165" y1="182" x2="438" y2="182" stroke="var(--ink-tertiary)" strokeWidth="1" />
          <line x1="165" y1="182" x2="165" y2="26" stroke="var(--ink-tertiary)" strokeWidth="1" />
          <line x1="165" y1={182 - (Math.min(45, vTerm) / 45) * 145} x2="435" y2={182 - (Math.min(45, vTerm) / 45) * 145} stroke="#16a34a" strokeWidth="1.2" strokeDasharray="4 3" />
          <path d={curvePts} fill="none" stroke="#0284c7" strokeWidth="2.4" />
          <circle cx={165 + (tMod / 7.5) * 265} cy={182 - (Math.min(45, vCur) / 45) * 145} r="5" fill="#dc2626" />
          <text x="435" y="24" fontSize="9.5" textAnchor="end" fill="#16a34a" fontFamily="monospace" fontWeight="bold">
            v_T = mg/b = {vTerm.toFixed(1)} m/s (τ = {tau.toFixed(2)}s)
          </text>
        </svg>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <label className="space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>มวล m</span>
              <strong className="text-[var(--ink-primary)]">{dragMass.toFixed(1)} kg</strong>
            </div>
            <input type="range" min={1} max={8} step={0.5} value={dragMass} onChange={(e) => setDragMass(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
          </label>
          <label className="space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>สัมประสิทธิ์แรงต้าน b</span>
              <strong className="text-[var(--ink-primary)]">{dragB.toFixed(1)} N·s/m</strong>
            </div>
            <input type="range" min={0.6} max={4.0} step={0.2} value={dragB} onChange={(e) => setDragB(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
          </label>
        </div>

        <div className="p-2.5 rounded border border-amber-300/80 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/30 text-[11px] sm:text-xs text-amber-950 dark:text-amber-200 leading-relaxed flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <FormattedMathText
            text={'ผลเฉลยเชิงวิเคราะห์: $v(t) = v_T(1 - e^{-t/\\tau})$ โดย $v_T = \\frac{mg}{b}$ และค่าคงตัวเวลา $\\tau = \\frac{m}{b}$ — เมื่อเวลาผ่านไปนานๆ แรงต้าน $bv$ จะขึ้นไปเท่ากับ $mg$ พอดีจนความเร่งกลายเป็นศูนย์'}
          />
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. TSIOLKOVSKY VARIABLE-MASS ROCKET LAB
  // =========================================================================
  if (labId === 'rocket-com-lab') {
    const burnProg = Math.min(1, (simTime % 6) / 4.2);
    const m0 = 100;
    const mFinal = m0 * (1 - fuelFrac);
    const mNow = m0 - (m0 - mFinal) * burnProg;
    const deltaV = exhaustU * Math.log(m0 / mNow);
    const maxDeltaV = exhaustU * Math.log(1 / (1 - fuelFrac));
    const rocketX = 52 + Math.pow(burnProg, 1.4) * 320;

    return (
      <div className="space-y-3 font-serif">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs sm:text-sm font-bold text-[var(--ink-primary)]">
            ห้องทดลองสมการจรวดมวลแปรผัน (Tsiolkovsky Rocket Equation)
          </span>
          <button type="button" onClick={handleReset} className="px-2.5 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-xs font-mono">
            จุดระเบิดใหม่
          </button>
        </div>

        <svg viewBox="0 0 460 220" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <rect x="0" y="0" width="460" height="220" fill="rgba(15,23,42,0.9)" rx="4" />
          <line x1="28" y1="168" x2="432" y2="168" stroke="#475569" strokeWidth="1" />

          {/* Fuel gauge bar */}
          <rect x="24" y="22" width="120" height="12" rx="3" fill="#1e293b" stroke="#64748b" />
          <rect x="24" y="22" width={120 * (1 - burnProg)} height="12" rx="3" fill="#f97316" />
          <text x="24" y="50" fontSize="9.5" fill="#e2e8f0" fontFamily="monospace">
            เชื้อเพลิงเหลือ: {((1 - burnProg) * fuelFrac * 100).toFixed(0)}% (m={mNow.toFixed(0)} kg)
          </text>

          {/* Rocket body & exhaust */}
          {burnProg < 0.98 && (
            <polygon
              points={`${rocketX - 18},105 ${rocketX - 46 - (burnProg * 15)},97 ${rocketX - 46 - (burnProg * 15)},113`}
              fill="#f97316"
            />
          )}
          <rect x={rocketX - 18} y="94" width="42" height="22" rx="4" fill="#e2e8f0" />
          <polygon points={`${rocketX + 24},94 ${rocketX + 42},105 ${rocketX + 24},116`} fill="#38bdf8" />

          <text x="230" y="196" fontSize="10.5" textAnchor="middle" fill="#38bdf8" fontFamily="monospace" fontWeight="bold">
            Δv = u_ex ln(m₀/m) = {deltaV.toFixed(0)} m/s (สูงสุด {maxDeltaV.toFixed(0)} m/s)
          </text>
        </svg>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <label className="space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>อัตราเร็วไอพ่น u_ex</span>
              <strong className="text-[var(--ink-primary)]">{exhaustU} m/s</strong>
            </div>
            <input type="range" min={1000} max={4500} step={250} value={exhaustU} onChange={(e) => setExhaustU(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
          </label>
          <label className="space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>สัดส่วนมวลเชื้อเพลิง</span>
              <strong className="text-[var(--ink-primary)]">{(fuelFrac * 100).toFixed(0)}%</strong>
            </div>
            <input type="range" min={0.3} max={0.88} step={0.05} value={fuelFrac} onChange={(e) => setFuelFrac(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
          </label>
        </div>

        <div className="p-2.5 rounded border border-amber-300/80 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/30 text-[11px] sm:text-xs text-amber-950 dark:text-amber-200 leading-relaxed flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <FormattedMathText
            text={'เมื่อพ่นไอเสียด้วยความเร็วสัมพัทธ์ $u_{\\text{ex}}$ จะเกิดแรงขับ $F_{\\text{thrust}} = u_{\\text{ex}}\\left|\\frac{dm}{dt}\\right|$ อินทิเกรตแล้วได้ $\\Delta v = u_{\\text{ex}}\\ln\\!\\left(\\frac{m_0}{m}\\right)$ แม้จรวดเคลื่อนที่เร็วกว่าแก๊สไอพ่นก็ยังเร่งต่อได้เสมอ!'}
          />
        </div>
      </div>
    );
  }

  // =========================================================================
  // 4. DOWNHILL ROLLING RACE LAB (Moment of Inertia I = beta mR^2)
  // =========================================================================
  if (labId === 'rolling-race-lab') {
    const rad = (raceSlopeDeg * Math.PI) / 180;
    const racers = [
      { label: 'กล่องลื่น (β=0)', beta: 0, color: '#16a34a' },
      { label: 'ทรงกลมตัน (2/5)', beta: 0.4, color: '#0284c7' },
      { label: 'ทรงกระบอกตัน (1/2)', beta: 0.5, color: '#d97706' },
      { label: 'วงแหวนกลวง (1)', beta: 1.0, color: '#dc2626' },
    ];
    const tCyc = simTime % 4.5;
    const x1 = 44;
    const y1 = 44;
    const x2 = 415;
    const y2 = 186;
    const trackLenM = 12;

    return (
      <div className="space-y-3 font-serif">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs sm:text-sm font-bold text-[var(--ink-primary)]">
            ศึกชิงชัยกลิ้งลงพื้นเอียง (ใครถึงเส้นชัยก่อน? — ไม่ขึ้นกับมวล m และรัศมี R!)
          </span>
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <button type="button" onClick={() => setIsPlaying((p) => !p)} className="px-2 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] inline-flex items-center gap-1">
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
              <span>{isPlaying ? 'พัก' : 'เล่น'}</span>
            </button>
            <button type="button" onClick={handleReset} className="px-2 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] inline-flex items-center gap-1">
              <RotateCcw className="w-3 h-3" /> ปล่อยแข่งใหม่
            </button>
          </div>
        </div>

        <svg viewBox="0 0 460 220" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ink-primary)" strokeWidth="2.5" />
          {racers.map((rc, idx) => {
            const a = (G * Math.sin(rad)) / (1 + rc.beta);
            const distM = Math.min(trackLenM, 0.5 * a * tCyc * tCyc);
            const frac = distM / trackLenM;
            const px = x1 + frac * (x2 - x1);
            const py = y1 + frac * (y2 - y1) - 11 - idx * 14;
            const rotDeg = rc.beta === 0 ? 0 : distM * 85;
            return (
              <g key={rc.label} transform={`translate(${px}, ${py})`}>
                {rc.beta === 0 ? (
                  <rect x="-10" y="-8" width="20" height="16" rx="2" fill={rc.color} stroke="white" strokeWidth="1" />
                ) : (
                  <g transform={`rotate(${rotDeg})`}>
                    <circle cx="0" cy="0" r="10" fill={rc.color} stroke="white" strokeWidth="1.5" />
                    <line x1="-8" y1="0" x2="8" y2="0" stroke="white" strokeWidth="1.3" />
                  </g>
                )}
                <text x="14" y="3" fontSize="8.5" fill={rc.color} fontFamily="monospace" fontWeight="bold">
                  {rc.label}
                </text>
              </g>
            );
          })}
        </svg>

        <label className="block space-y-1 text-xs">
          <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
            <span>มุมพื้นเอียง θ</span>
            <strong className="text-[var(--ink-primary)]">{raceSlopeDeg}°</strong>
          </div>
          <input type="range" min={12} max={42} step={2} value={raceSlopeDeg} onChange={(e) => setRaceSlopeDeg(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
        </label>

        <div className="p-2.5 rounded border border-amber-300/80 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/30 text-[11px] sm:text-xs text-amber-950 dark:text-amber-200 leading-relaxed flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <FormattedMathText
            text={'ความเร่งลงพื้นเอียงคือ $a = \\frac{g\\sin\\theta}{1 + \\beta}$ โดย $\\beta = \\frac{I}{mR^2}$: ยิ่งมวลกระจายอยู่ใกล้แกนหมุน ($\\beta$ น้อย) พลังงานศักย์จะถูกแบ่งไปเป็นพลังงานจลน์การหมุนน้อยกว่า จุดจึงเข้าเส้นชัยไวกว่าเสมอ!'}
          />
        </div>
      </div>
    );
  }

  // =========================================================================
  // 5. KEPLER ORBITAL MECHANICS LAB
  // =========================================================================
  if (labId === 'kepler-orbit-lab') {
    const ecc = Math.abs(velRatio * velRatio - 1);
    const orbitType =
      Math.abs(velRatio - 1) < 0.03
        ? 'วงกลมสมบูรณ์ (e = 0)'
        : velRatio < Math.SQRT2
          ? velRatio < 1
            ? `วงรีแคบใน (e = ${ecc.toFixed(2)})`
            : `วงรีขยายออก (e = ${ecc.toFixed(2)})`
          : `ไฮเพอร์โบลาหลุดพ้น (v ≥ √2 v_circ!)`;

    const sunX = 210;
    const sunY = 110;
    const pScale = 44 * velRatio * velRatio;
    const orbitPts = Array.from({ length: 72 }, (_, i) => {
      const th =
        velRatio >= Math.SQRT2 - 0.01 ? -1.9 + (i / 71) * 3.8 : (i / 71) * 2 * Math.PI;
      const denom = velRatio >= 1 ? 1 + ecc * Math.cos(th) : 1 - ecc * Math.cos(th);
      if (denom <= 0.12) return null;
      const r = Math.min(200, pScale / denom);
      return { x: sunX + r * Math.cos(th), y: sunY - r * Math.sin(th) };
    }).filter((p): p is { x: number; y: number } => p !== null);

    const denomCur = velRatio >= 1 ? 1 + ecc * Math.cos(keplerTheta) : 1 - ecc * Math.cos(keplerTheta);
    const rCur = Math.min(180, pScale / Math.max(0.15, denomCur));
    const px = sunX + rCur * Math.cos(keplerTheta);
    const py = sunY - rCur * Math.sin(keplerTheta);

    return (
      <div className="space-y-3 font-serif">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs sm:text-sm font-bold text-[var(--ink-primary)]">
            ห้องทดลองวงโคจรเคปเลอร์ &amp; ศักย์ยังผล (Kepler Orbits)
          </span>
          <span className="font-mono text-[11px] font-bold text-sky-700 dark:text-sky-400">
            {orbitType}
          </span>
        </div>

        <svg viewBox="0 0 460 220" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <rect x="0" y="0" width="460" height="220" fill="rgba(15,23,42,0.9)" rx="4" />
          <path
            d={orbitPts.map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`).join(' ')}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.6"
            strokeDasharray={velRatio >= Math.SQRT2 - 0.01 ? '4 3' : undefined}
          />
          <circle cx={sunX} cy={sunY} r="11" fill="#f59e0b" />
          <line x1={sunX} y1={sunY} x2={px} y2={py} stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx={px} cy={py} r="6.5" fill="#0ea5e9" stroke="white" strokeWidth="1.5" />
          <text x="16" y="24" fontSize="10" fill="#e2e8f0" fontFamily="monospace" fontWeight="bold">
            v₀ / v_circ = {velRatio.toFixed(2)} (ความเร็วหลุดพ้น √2 ≈ 1.41)
          </text>
        </svg>

        <label className="block space-y-1 text-xs">
          <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
            <span>ปรับอัตราเร็วปล่อย v₀ / v_circ</span>
            <strong className="text-[var(--ink-primary)]">{velRatio.toFixed(2)}×</strong>
          </div>
          <input type="range" min={0.7} max={1.45} step={0.03} value={velRatio} onChange={(e) => setVelRatio(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
        </label>

        <div className="p-2.5 rounded border border-amber-300/80 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/30 text-[11px] sm:text-xs text-amber-950 dark:text-amber-200 leading-relaxed flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <FormattedMathText
            text={'กฎข้อ 2 เคปเลอร์ ($L = mr^2\\dot{\\theta} = \\text{const}$): ยิ่งดาววิ่งเข้าใกล้จุดโฟกัสดวงอาทิตย์ ($r$ สั้นลง) ยิ่งพุ่งเร็วสุดขีด! และเมื่อ $v_0 \\ge \\sqrt{2}v_{\\text{circ}}$ พลังงานรวม $E \\ge 0$ จนหลุดพ้นเป็นไฮเพอร์โบลา'}
          />
        </div>
      </div>
    );
  }

  // =========================================================================
  // 6. SHM PHASE SPACE (x, v) + SPRING OSCILLATOR
  // =========================================================================
  const xPos = shmAmp * Math.cos(shmOmega * simTime);
  const vPos = -shmAmp * shmOmega * Math.sin(shmOmega * simTime);
  const vMax = shmAmp * shmOmega;
  const blockX = 115 + xPos * 58;
  const phaseCx = 345;
  const phaseCy = 112;
  const phaseDotX = phaseCx + xPos * 62;
  const phaseDotY = phaseCy - (vPos / Math.max(0.5, vMax)) * 62;

  return (
    <div className="space-y-3 font-serif">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs sm:text-sm font-bold text-[var(--ink-primary)]">
          ห้องทดลองการสั่น SHM &amp; วงรีเฟสสเปซ (x vs v)
        </span>
        <button type="button" onClick={() => setIsPlaying((p) => !p)} className="px-2.5 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-xs font-mono">
          {isPlaying ? 'พัก' : 'เล่น'}
        </button>
      </div>

      <svg viewBox="0 0 460 220" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
        {/* Left Spring-Mass */}
        <line x1="28" y1="68" x2="28" y2="152" stroke="var(--ink-primary)" strokeWidth="3" />
        <line x1="28" y1="152" x2="215" y2="152" stroke="var(--ink-tertiary)" strokeWidth="1.5" />
        <line x1="28" y1="126" x2={blockX - 18} y2="126" stroke="#d97706" strokeWidth="2.4" strokeDasharray="5 3" />
        <rect x={blockX - 18} y="106" width="36" height="40" rx="4" fill="rgba(2,132,199,0.2)" stroke="var(--ink-primary)" strokeWidth="2" />
        <text x="115" y="176" fontSize="9.5" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace">
          x = {xPos.toFixed(2)} m • v = {vPos.toFixed(2)} m/s
        </text>

        {/* Right Phase Space Ellipse */}
        <line x1="260" y1={phaseCy} x2="430" y2={phaseCy} stroke="var(--ink-tertiary)" strokeWidth="1" />
        <line x1={phaseCx} y1="32" x2={phaseCx} y2="192" stroke="var(--ink-tertiary)" strokeWidth="1" />
        <ellipse cx={phaseCx} cy={phaseCy} rx={shmAmp * 62} ry="62" fill="rgba(2,132,199,0.08)" stroke="#0284c7" strokeWidth="2" />
        <circle cx={phaseDotX} cy={phaseDotY} r="6" fill="#dc2626" stroke="white" strokeWidth="1.5" />
        <text x="430" y={phaseCy - 4} fontSize="8.5" textAnchor="end" fill="var(--ink-secondary)" fontFamily="monospace">x</text>
        <text x={phaseCx + 6} y="36" fontSize="8.5" fill="var(--ink-secondary)" fontFamily="monospace">v</text>
      </svg>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
        <label className="space-y-1">
          <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
            <span>แอมพลิจูด A</span>
            <strong className="text-[var(--ink-primary)]">{shmAmp.toFixed(2)} m</strong>
          </div>
          <input type="range" min={0.4} max={1.2} step={0.1} value={shmAmp} onChange={(e) => setShmAmp(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
        </label>
        <label className="space-y-1">
          <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
            <span>ความถี่เชิงมุม ω</span>
            <strong className="text-[var(--ink-primary)]">{shmOmega.toFixed(1)} rad/s</strong>
          </div>
          <input type="range" min={1.0} max={5.0} step={0.5} value={shmOmega} onChange={(e) => setShmOmega(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
        </label>
      </div>

      <div className="p-2.5 rounded border border-amber-300/80 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/30 text-[11px] sm:text-xs text-amber-950 dark:text-amber-200 leading-relaxed flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <FormattedMathText
          text={'จากอนุรักษ์พลังงาน $\\frac{1}{2}kx^2 + \\frac{1}{2}mv^2 = E$ แผนภาพเฟส $(x, v)$ จึงเป็น **วงรีปิด** ที่วนตามเข็มนาฬิกาเสมอ เมื่อผ่านจุดสมดุล $x=0$ ความเร็วจะสูงสุดเป็น $v_{\\max} = \\omega A$'}
        />
      </div>
    </div>
  );
};
