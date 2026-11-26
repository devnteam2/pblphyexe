// src/components/interactive/ProjectileShooterLab.tsx
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { FormattedMathText } from '@/components/math/LatexRenderer';
import { Target, RotateCcw, Eye, EyeOff, Calculator, Shuffle, CheckCircle2, XCircle, Play } from 'lucide-react';

type ChallengeLevel = 'flat' | 'cliff' | 'moving' | 'incline';

interface TrailPoint {
  x: number;
  y: number;
}

interface FlightOutcome {
  hit: boolean;
  hitWall?: boolean;
  impactX: number;
  targetXAtImpact: number;
  missDelta: number;
  flightTime: number;
}

const G = 10; // m/s^2 matching standard POSN Entrance exams
const CLIFF_H = 20;
const WALL_X = 28;
const WALL_H = 24;
const MOVING_SPEED = 6;
const INCLINE_DEG = 20;
const INCLINE_RAD = (INCLINE_DEG * Math.PI) / 180;

const LEVEL_META: Record<
  ChallengeLevel,
  { label: string; title: string; defaultParam: number; minParam: number; maxParam: number }
> = {
  flat: {
    label: 'ด่าน 1: พื้นราบ',
    title: 'เป้าหมายบนพื้นราบ (y = 0)',
    defaultParam: 45,
    minParam: 30,
    maxParam: 78,
  },
  cliff: {
    label: 'ด่าน 2: หน้าผา+กำแพง',
    title: 'ยิงจากหน้าผาสูง 20 m ข้ามกำแพง 24 m',
    defaultParam: 64,
    minParam: 48,
    maxParam: 80,
  },
  moving: {
    label: 'ด่าน 3: เป้าเคลื่อนที่',
    title: 'รถเป้าวิ่งหนีด้วยความเร็วคงที่ v = 6 m/s',
    defaultParam: 24,
    minParam: 16,
    maxParam: 34,
  },
  incline: {
    label: 'ด่าน 4: ยิงขึ้นพื้นเอียง',
    title: 'เป้าหมายอยู่บนพื้นเอียงทำมุม β = 20°',
    defaultParam: 42,
    minParam: 28,
    maxParam: 56,
  },
};

function computeIdealParams(
  level: ChallengeLevel,
  targetParam: number
): { u: number; deg: number; formulaTh: string } {
  if (level === 'flat') {
    const deg = 45;
    const u = Math.sqrt(G * targetParam);
    return {
      u: Number(u.toFixed(1)),
      deg,
      formulaTh: `ที่มุม $\\theta = 45^\\circ$: $R = \\frac{u^2\\sin 90^\\circ}{g} = \\frac{u^2}{g} \\implies u = \\sqrt{gR} = \\sqrt{10 \\times ${targetParam}} \\approx ${u.toFixed(1)}\\text{ m/s}$`,
    };
  }
  if (level === 'cliff') {
    // Pick angle steep enough so y(WALL_X) > WALL_H + 3.5 for targetParam >= 48
    const deg = 55;
    const rad = (deg * Math.PI) / 180;
    const tanT = Math.tan(rad);
    const cosT = Math.cos(rad);
    const u = Math.sqrt((5 * targetParam * targetParam) / ((CLIFF_H + targetParam * tanT) * cosT * cosT));
    return {
      u: Number(u.toFixed(1)),
      deg,
      formulaTh: `จากหน้าผา $H=20\\text{ m}$ ตั้งมุม $\\theta=55^\\circ$ ให้พ้นกำแพง แล้วแทน $y(x_T)=0$: $20 + ${targetParam}\\tan 55^\\circ = \\frac{5(${targetParam})^2}{u^2\\cos^2 55^\\circ} \\implies u \\approx ${u.toFixed(1)}\\text{ m/s}$`,
    };
  }
  if (level === 'moving') {
    const deg = 55;
    const rad = (deg * Math.PI) / 180;
    const sinT = Math.sin(rad);
    const cosT = Math.cos(rad);
    const a = (2 * sinT * cosT) / G;
    const b = (-2 * MOVING_SPEED * sinT) / G;
    const c = -targetParam;
    const u = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
    return {
      u: Number(u.toFixed(1)),
      deg,
      formulaTh: `ให้เวลาตก $t_f = \\frac{2u\\sin\\theta}{g}$ แล้วจับระยะราบชนกัน: $(u\\cos 55^\\circ - 6)t_f = ${targetParam} \\implies u \\approx ${u.toFixed(1)}\\text{ m/s}$`,
    };
  }
  // incline: alpha = 55 deg (optimal 45 + beta/2)
  const alphaDeg = 55;
  const alphaRad = (alphaDeg * Math.PI) / 180;
  const cosB = Math.cos(INCLINE_RAD);
  const u = Math.sqrt(
    (targetParam * G * cosB * cosB) / (2 * Math.cos(alphaRad) * Math.sin(alphaRad - INCLINE_RAD))
  );
  return {
    u: Number(u.toFixed(1)),
    deg: alphaDeg,
    formulaTh: `พื้นเอียง $\\beta=20^\\circ$ ใช้สูตร $R = \\frac{2u^2\\cos\\alpha\\sin(\\alpha-\\beta)}{g\\cos^2\\beta}$ ที่มุม $\\alpha=55^\\circ \\implies u \\approx ${u.toFixed(1)}\\text{ m/s}$`,
  };
}

function evaluateTrajectory(
  level: ChallengeLevel,
  targetParam: number,
  u: number,
  deg: number
): { maxT: number; outcome: FlightOutcome } {
  const rad = (deg * Math.PI) / 180;
  const ux = u * Math.cos(rad);
  const uy = u * Math.sin(rad);

  // Check wall collision first on level 2 (cliff)
  if (level === 'cliff') {
    const tWall = WALL_X / Math.max(0.001, ux);
    const yAtWall = CLIFF_H + uy * tWall - 0.5 * G * tWall * tWall;
    if (yAtWall <= WALL_H + 0.4) {
      return {
        maxT: tWall,
        outcome: {
          hit: false,
          hitWall: true,
          impactX: WALL_X,
          targetXAtImpact: targetParam,
          missDelta: WALL_X - targetParam,
          flightTime: tWall,
        },
      };
    }
    const disc = uy * uy + 2 * G * CLIFF_H;
    const tLand = (uy + Math.sqrt(disc)) / G;
    const impactX = ux * tLand;
    const missDelta = impactX - targetParam;
    return {
      maxT: tLand,
      outcome: {
        hit: Math.abs(missDelta) <= 2.6,
        impactX,
        targetXAtImpact: targetParam,
        missDelta,
        flightTime: tLand,
      },
    };
  }

  if (level === 'incline') {
    const tanB = Math.tan(INCLINE_RAD);
    // Solve u*sin*t - 0.5*g*t^2 = u*cos*t*tanB => t = 2*(uy - ux*tanB)/g
    const tLand = Math.max(0.15, (2 * (uy - ux * tanB)) / G);
    const impactX = ux * tLand;
    const slopeDist = impactX / Math.cos(INCLINE_RAD);
    const targetSlopeX = targetParam * Math.cos(INCLINE_RAD);
    const missDelta = slopeDist - targetParam;
    return {
      maxT: tLand,
      outcome: {
        hit: Math.abs(missDelta) <= 2.6,
        impactX,
        targetXAtImpact: targetSlopeX,
        missDelta,
        flightTime: tLand,
      },
    };
  }

  // Flat & Moving levels launch from y=0
  const tLand = (2 * uy) / G;
  const impactX = ux * tLand;
  const targetX = level === 'moving' ? targetParam + MOVING_SPEED * tLand : targetParam;
  const missDelta = impactX - targetX;
  return {
    maxT: tLand,
    outcome: {
      hit: Math.abs(missDelta) <= 2.6,
      impactX,
      targetXAtImpact: targetX,
      missDelta,
      flightTime: tLand,
    },
  };
}

export const ProjectileShooterLab: React.FC = () => {
  const [level, setLevel] = useState<ChallengeLevel>('flat');
  const [targetParam, setTargetParam] = useState<number>(LEVEL_META.flat.defaultParam);
  const [launchU, setLaunchU] = useState<number>(20);
  const [launchDeg, setLaunchDeg] = useState<number>(45);
  const [showAimGuide, setShowAimGuide] = useState<boolean>(true);
  const [showVectors, setShowVectors] = useState<boolean>(true);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  const [isFiring, setIsFiring] = useState<boolean>(false);
  const [simT, setSimT] = useState<number>(0);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [outcome, setOutcome] = useState<FlightOutcome | null>(null);
  const [hitsCount, setHitsCount] = useState<number>(0);
  const [shotsCount, setShotsCount] = useState<number>(0);

  const meta = LEVEL_META[level];
  const rad = (launchDeg * Math.PI) / 180;
  const ux = launchU * Math.cos(rad);
  const uy = launchU * Math.sin(rad);
  const startY = level === 'cliff' ? CLIFF_H : 0;

  const { maxT, outcome: predictedOutcome } = useMemo(
    () => evaluateTrajectory(level, targetParam, launchU, launchDeg),
    [level, targetParam, launchU, launchDeg]
  );
  const ideal = computeIdealParams(level, targetParam);

  // World -> SVG projection
  const toPx = (x: number) => 32 + (Math.min(96, Math.max(-2, x)) / 96) * 428;
  const toPy = (y: number) => 228 - (Math.min(54, Math.max(-6, y)) / 54) * 204;

  // Animation loop while projectile is in flight
  useEffect(() => {
    if (!isFiring) return;
    let frameId = 0;
    let lastTs = performance.now();
    let curT = 0;
    const pts: TrailPoint[] = [{ x: 0, y: startY }];

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - lastTs) / 1000);
      lastTs = now;
      curT = Math.min(maxT, curT + dt * 1.15);

      const x = ux * curT;
      const y = startY + uy * curT - 0.5 * G * curT * curT;
      const prev = pts[pts.length - 1];
      if (!prev || Math.hypot(x - prev.x, y - prev.y) >= 1.1 || curT >= maxT) {
        pts.push({ x, y });
      }

      setSimT(curT);
      setTrail([...pts]);

      if (curT >= maxT) {
        setIsFiring(false);
        setOutcome(predictedOutcome);
        setShotsCount((s) => s + 1);
        if (predictedOutcome.hit) {
          setHitsCount((h) => h + 1);
        }
        return;
      }
      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isFiring, maxT, ux, uy, startY, predictedOutcome]);

  const resetFlight = () => {
    setIsFiring(false);
    setSimT(0);
    setTrail([]);
    setOutcome(null);
  };

  const handleSelectLevel = (nextLevel: ChallengeLevel) => {
    setLevel(nextLevel);
    setTargetParam(LEVEL_META[nextLevel].defaultParam);
    setShowSolution(false);
    resetFlight();
  };

  const handleRandomizeTarget = () => {
    const span = meta.maxParam - meta.minParam;
    const nextVal = Math.round(meta.minParam + Math.random() * span);
    setTargetParam(nextVal);
    resetFlight();
  };

  const handleFire = () => {
    setSimT(0);
    setTrail([{ x: 0, y: startY }]);
    setOutcome(null);
    setIsFiring(true);
  };

  // Current projectile position and velocities
  const displayT = isFiring || outcome ? simT : 0;
  const projX = ux * displayT;
  const projY = startY + uy * displayT - 0.5 * G * displayT * displayT;
  const curVy = uy - G * displayT;
  const curSpeed = Math.hypot(ux, curVy);

  // Target position at displayT
  const targetX =
    level === 'moving'
      ? targetParam + MOVING_SPEED * displayT
      : level === 'incline'
      ? targetParam * Math.cos(INCLINE_RAD)
      : targetParam;
  const targetY = level === 'incline' ? targetParam * Math.sin(INCLINE_RAD) : 0;

  // Aim guide dotted path (practice mode)
  const guidePath = showAimGuide
    ? Array.from({ length: 36 }, (_, i) => {
        const t = (i / 35) * maxT;
        const gx = ux * t;
        const gy = startY + uy * t - 0.5 * G * t * t;
        if (gy < -2) return '';
        return `${i === 0 ? 'M' : 'L'} ${toPx(gx).toFixed(1)} ${toPy(gy).toFixed(1)}`;
      })
        .filter(Boolean)
        .join(' ')
    : '';

  const firedTrailPath =
    trail.length > 1
      ? trail.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toPx(p.x).toFixed(1)} ${toPy(p.y).toFixed(1)}`).join(' ')
      : '';

  return (
    <div className="space-y-3.5 font-serif">
      {/* Header + Scoreboard */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--ink-primary)]">
          <Target className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>เกมฝึกคำนวณยิงปืนใหญ่โพรเจกไทล์ (Projectile Shooter Exercise)</span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="px-2 py-0.5 rounded border border-emerald-400/70 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold">
            ยิงเข้าเป้า: {hitsCount}/{shotsCount}
          </span>
          <button
            type="button"
            onClick={() => setShowAimGuide((prev) => !prev)}
            className="px-2 py-0.5 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] inline-flex items-center gap-1"
          >
            {showAimGuide ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            <span>{showAimGuide ? 'โหมดฝึก: เปิดเส้นเล็ง' : 'โหมดสอบ: ปิดเส้นเล็ง'}</span>
          </button>
        </div>
      </div>

      {/* Level Switcher */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px] font-mono">
        {(['flat', 'cliff', 'moving', 'incline'] as ChallengeLevel[]).map((lvl) => (
          <button
            key={lvl}
            type="button"
            onClick={() => handleSelectLevel(lvl)}
            className={`min-h-[36px] px-2 py-1 rounded border text-center transition-colors ${
              level === lvl
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100 font-bold'
                : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)] hover:border-stone-500'
            }`}
          >
            {LEVEL_META[lvl].label}
          </button>
        ))}
      </div>

      {/* Mission Brief Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-xs">
        <div>
          <span className="font-bold text-[var(--ink-primary)]">{meta.title}</span>
          <span className="text-[var(--ink-secondary)] font-mono ml-2">
            ({level === 'moving' ? `x₀ = ${targetParam} m, v_cart = 6 m/s` : level === 'incline' ? `ระยะตามแนวเอียง R = ${targetParam} m` : `เป้าอยู่ที่ x = ${targetParam} m`} • g = 10 m/s²)
          </span>
        </div>
        <button
          type="button"
          onClick={handleRandomizeTarget}
          className="px-2.5 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-muted)] text-[11px] font-mono text-[var(--ink-primary)] hover:border-stone-500 inline-flex items-center gap-1"
        >
          <Shuffle className="w-3 h-3" />
          <span>สุ่มโจทย์ใหม่</span>
        </button>
      </div>

      {/* Live Physics Canvas (SVG) */}
      <svg viewBox="0 0 480 250" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
        <defs>
          <marker id="shooter-vx" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#0284c7" />
          </marker>
          <marker id="shooter-vy" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#dc2626" />
          </marker>
        </defs>

        {/* Subtle meter grid */}
        {[20, 40, 60, 80].map((gx) => (
          <g key={gx}>
            <line x1={toPx(gx)} y1="20" x2={toPx(gx)} y2={toPy(0)} stroke="var(--hairline-subtle)" strokeWidth="1" strokeDasharray="2 3" />
            <text x={toPx(gx)} y="242" fontSize="8.5" textAnchor="middle" fill="var(--ink-tertiary)" fontFamily="monospace">{gx}m</text>
          </g>
        ))}

        {/* Ground line */}
        <line x1="20" y1={toPy(0)} x2="466" y2={toPy(0)} stroke="var(--ink-primary)" strokeWidth="2" />

        {/* Level-specific terrain */}
        {level === 'cliff' && (
          <>
            {/* Cliff block */}
            <rect
              x="16"
              y={toPy(CLIFF_H)}
              width={toPx(0) - 12}
              height={toPy(0) - toPy(CLIFF_H)}
              fill="var(--surface-muted)"
              stroke="var(--ink-primary)"
              strokeWidth="1.5"
            />
            <text x="20" y={toPy(CLIFF_H / 2)} fontSize="8" fill="var(--ink-secondary)" fontFamily="monospace">20m</text>
            {/* Middle Obstacle Wall */}
            <rect
              x={toPx(WALL_X) - 4}
              y={toPy(WALL_H)}
              width="8"
              height={toPy(0) - toPy(WALL_H)}
              fill="rgba(220, 38, 38, 0.25)"
              stroke="#dc2626"
              strokeWidth="1.5"
            />
            <text x={toPx(WALL_X)} y={toPy(WALL_H) - 5} fontSize="8.5" textAnchor="middle" fill="#dc2626" fontFamily="monospace" fontWeight="bold">
              กำแพง {WALL_H}m
            </text>
          </>
        )}

        {level === 'incline' && (
          <polygon
            points={`${toPx(0)},${toPy(0)} ${toPx(78)},${toPy(0)} ${toPx(78)},${toPy(78 * Math.tan(INCLINE_RAD))}`}
            fill="var(--surface-muted)"
            stroke="var(--ink-primary)"
            strokeWidth="1.5"
          />
        )}

        {/* Aim guide */}
        {guidePath && (
          <path d={guidePath} fill="none" stroke="var(--ink-tertiary)" strokeWidth="1.4" strokeDasharray="4 4" />
        )}

        {/* Actual fired trail */}
        {firedTrailPath && (
          <path d={firedTrailPath} fill="none" stroke="#d97706" strokeWidth="2.4" />
        )}

        {/* Target marker */}
        <g transform={`translate(${toPx(targetX)}, ${toPy(targetY)})`}>
          <circle cx="0" cy="-6" r="10" fill="rgba(22, 163, 74, 0.16)" stroke="#16a34a" strokeWidth="2" />
          <circle cx="0" cy="-6" r="4" fill="#16a34a" />
          <text x="0" y="14" fontSize="8.5" textAnchor="middle" fill="#16a34a" fontFamily="monospace" fontWeight="bold">
            เป้า ({targetX.toFixed(0)}m)
          </text>
        </g>

        {/* Cannon barrel */}
        <g transform={`translate(${toPx(0)}, ${toPy(startY)}) rotate(${-launchDeg})`}>
          <rect x="0" y="-4" width="20" height="8" rx="2" fill="var(--ink-primary)" />
        </g>
        <circle cx={toPx(0)} cy={toPy(startY)} r="6" fill="#d97706" stroke="var(--ink-primary)" strokeWidth="1.5" />

        {/* Projectile & live vectors */}
        {(isFiring || outcome || trail.length > 0) && (
          <g>
            {showVectors && (
              <>
                <line
                  x1={toPx(projX)}
                  y1={toPy(projY)}
                  x2={toPx(projX) + ux * 1.1}
                  y2={toPy(projY)}
                  stroke="#0284c7"
                  strokeWidth="2"
                  markerEnd="url(#shooter-vx)"
                />
                <line
                  x1={toPx(projX)}
                  y1={toPy(projY)}
                  x2={toPx(projX)}
                  y2={toPy(projY) - curVy * 1.1}
                  stroke="#dc2626"
                  strokeWidth="2"
                  markerEnd="url(#shooter-vy)"
                />
              </>
            )}
            <circle cx={toPx(projX)} cy={toPy(projY)} r="5.5" fill="#d97706" stroke="var(--ink-primary)" strokeWidth="1.5" />
          </g>
        )}
      </svg>

      {/* Sliders & Fire Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <label className="space-y-1">
          <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
            <span>อัตราเร็วต้น u</span>
            <strong className="text-[var(--ink-primary)]">{launchU.toFixed(1)} m/s</strong>
          </div>
          <input
            type="range"
            min={10}
            max={40}
            step={0.5}
            value={launchU}
            disabled={isFiring}
            onChange={(e) => {
              setLaunchU(parseFloat(e.target.value));
              setOutcome(null);
            }}
            className="bridge-slider w-full cursor-pointer"
          />
        </label>

        <label className="space-y-1">
          <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
            <span>มุมยิง θ</span>
            <strong className="text-[var(--ink-primary)]">{launchDeg}°</strong>
          </div>
          <input
            type="range"
            min={10}
            max={82}
            step={1}
            value={launchDeg}
            disabled={isFiring}
            onChange={(e) => {
              setLaunchDeg(parseInt(e.target.value, 10));
              setOutcome(null);
            }}
            className="bridge-slider w-full cursor-pointer"
          />
        </label>
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleFire}
          disabled={isFiring}
          className="min-h-[42px] px-5 py-2 rounded bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs sm:text-sm font-serif font-bold hover:opacity-90 disabled:opacity-50 inline-flex items-center gap-1.5 shadow-xs"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{isFiring ? 'กำลังพุ่งทะยาน...' : 'ยิง! (FIRE)'}</span>
        </button>

        <button
          type="button"
          onClick={resetFlight}
          className="min-h-[42px] px-3 py-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-xs font-serif text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] inline-flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>รีเซ็ต</span>
        </button>

        <button
          type="button"
          onClick={() => setShowVectors((v) => !v)}
          className="min-h-[42px] px-3 py-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-xs font-mono text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
        >
          เวกเตอร์ v_x, v_y: {showVectors ? 'ON' : 'OFF'}
        </button>

        <button
          type="button"
          onClick={() => setShowSolution((s) => !s)}
          className="min-h-[42px] ml-auto px-3 py-2 rounded border border-amber-400/70 bg-amber-50/70 dark:bg-amber-950/30 text-xs font-serif font-semibold text-amber-950 dark:text-amber-200 inline-flex items-center gap-1.5"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>{showSolution ? 'ซ่อนวิธีคำนวณ' : 'เฉลยวิธีคิดให้โดนเป้า'}</span>
        </button>
      </div>

      {/* Live Telemetry Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
        <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">เวลา t</span>
          <span className="font-mono font-bold text-[var(--ink-primary)]">{displayT.toFixed(2)} s</span>
        </div>
        <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">v_x (คงที่!)</span>
          <span className="font-mono font-bold text-sky-700 dark:text-sky-400">{ux.toFixed(1)} m/s</span>
        </div>
        <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">v_y (ตอนนี้)</span>
          <span className="font-mono font-bold text-rose-700 dark:text-rose-400">{curVy.toFixed(1)} m/s</span>
        </div>
        <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">อัตราเร็ว |v|</span>
          <span className="font-mono font-bold text-amber-700 dark:text-amber-400">{curSpeed.toFixed(1)} m/s</span>
        </div>
      </div>

      {/* Hit / Miss Feedback */}
      {outcome && (
        <div
          className={`p-3 rounded border text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in duration-150 ${
            outcome.hit
              ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200'
              : 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200'
          }`}
        >
          {outcome.hit ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          )}
          <div>
            {outcome.hit ? (
              <p className="font-bold">
                เข้าเป้าแม่นยำ! ตกที่ x = {outcome.impactX.toFixed(1)} m ในเวลา {outcome.flightTime.toFixed(2)} s
              </p>
            ) : outcome.hitWall ? (
              <p className="font-bold">
                ชนกำแพงสูง {WALL_H} m ที่ระยะ x = {WALL_X} m! ลองเพิ่มมุมเงย θ หรือความเร็วต้น u ให้พ้นยอดกำแพง
              </p>
            ) : (
              <p className="font-bold">
                พลาดเป้า {outcome.missDelta > 0 ? `+${outcome.missDelta.toFixed(1)} m (เลยเป้า)` : `${outcome.missDelta.toFixed(1)} m (สั้นเกินไป)`} — ตกที่ x = {outcome.impactX.toFixed(1)} m ส่วนเป้าอยู่ที่ {outcome.targetXAtImpact.toFixed(1)} m
              </p>
            )}
          </div>
        </div>
      )}

      {/* Collapsible Exact Calculation Card */}
      {showSolution && (
        <div className="p-3.5 rounded border border-amber-400/70 bg-[var(--surface-card)] space-y-2.5 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-bold text-[var(--ink-primary)]">วิธีคำนวณสมการให้โดนเป้า</span>
            <button
              type="button"
              onClick={() => {
                setLaunchU(Math.min(40, Math.max(10, ideal.u)));
                setLaunchDeg(ideal.deg);
                resetFlight();
              }}
              className="px-2.5 py-1 rounded bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-[11px] font-mono font-semibold hover:opacity-90"
            >
              ตั้งค่า u = {ideal.u} m/s, θ = {ideal.deg}°
            </button>
          </div>
          <div className="text-[var(--ink-secondary)] leading-relaxed">
            <FormattedMathText text={ideal.formulaTh} />
          </div>
        </div>
      )}
    </div>
  );
};
