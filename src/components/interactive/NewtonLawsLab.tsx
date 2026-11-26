// src/components/interactive/NewtonLawsLab.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FormattedMathText } from '@/components/math/LatexRenderer';
import { Box, Play, Pause, RotateCcw, Sparkles } from 'lucide-react';

type NewtonMode = 'box' | 'pulley';
type PulleyKind = 'table' | 'atwood';

const G = 10; // m/s^2 standard Pre-Camp 1 convention

export const NewtonLawsLab: React.FC = () => {
  const [mode, setMode] = useState<NewtonMode>('box');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Mode 1: Box on surface / incline
  const [massKg, setMassKg] = useState<number>(5);
  const [appliedF, setAppliedF] = useState<number>(35);
  const [slopeDeg, setSlopeDeg] = useState<number>(0);
  const [muS, setMuS] = useState<number>(0.4);
  const [boxReadout, setBoxReadout] = useState<{ x: number; v: number }>({ x: 0, v: 0 });
  const boxSimRef = useRef<{ x: number; v: number }>({ x: 0, v: 0 });

  // Mode 2: Pulley systems
  const [pulleyKind, setPulleyKind] = useState<PulleyKind>('table');
  const [m1, setM1] = useState<number>(4);
  const [m2, setM2] = useState<number>(3);
  const [tableMu, setTableMu] = useState<number>(0.25);
  const [pulleyReadout, setPulleyReadout] = useState<{ s: number; v: number; stopped: boolean }>({
    s: 0,
    v: 0,
    stopped: false,
  });
  const pulleySimRef = useRef<{ s: number; v: number; stopped: boolean }>({
    s: 0,
    v: 0,
    stopped: false,
  });

  // Derived physics for Mode 1 (Box)
  const rad = (slopeDeg * Math.PI) / 180;
  const sinT = Math.sin(rad);
  const cosT = Math.cos(rad);
  const mg = massKg * G;
  const normal = mg * cosT;
  const gravSlope = mg * sinT; // pulls down-left (-x direction)
  const fNetNoFriction = appliedF - gravSlope;
  const fsMax = muS * normal;
  const muK = 0.75 * muS;

  const isEssentiallyStopped = Math.abs(boxReadout.v) < 0.05;
  const isStaticHold = isEssentiallyStopped && Math.abs(fNetNoFriction) <= fsMax + 1e-6;

  let fFriction = 0;
  if (isStaticHold) {
    fFriction = -fNetNoFriction;
  } else if (Math.abs(boxReadout.v) >= 0.05) {
    fFriction = -Math.sign(boxReadout.v) * muK * normal;
  } else {
    fFriction = -Math.sign(fNetNoFriction) * muK * normal;
  }
  const accelBox = isStaticHold ? 0 : (fNetNoFriction + fFriction) / massKg;

  // Derived physics for Mode 2 (Pulley)
  const maxTravel = 6.0; // meters mapped to SVG travel
  let accelPulley = 0;
  let tension = 0;
  let tableFriction = 0;
  let pulleyStuck = false;

  if (pulleyKind === 'table') {
    const drive = m2 * G;
    const fsTableMax = tableMu * m1 * G;
    const isStoppedNearZero = Math.abs(pulleyReadout.v) < 0.03;
    if (isStoppedNearZero && drive <= fsTableMax + 1e-6) {
      pulleyStuck = true;
      accelPulley = 0;
      tension = drive;
      tableFriction = drive;
    } else {
      tableFriction = 0.75 * tableMu * m1 * G;
      accelPulley = (drive - tableFriction) / (m1 + m2);
      tension = m2 * (G - accelPulley);
    }
  } else {
    accelPulley = ((m2 - m1) * G) / (m1 + m2);
    tension = (2 * m1 * m2 * G) / (m1 + m2);
  }

  // Keep latest physics scalars in refs so RAF loop stays smooth without restarting on every render
  const boxParamsRef = useRef({ massKg, appliedF, gravSlope, fsMax, fkMag: muK * normal });
  useEffect(() => {
    boxParamsRef.current = { massKg, appliedF, gravSlope, fsMax, fkMag: muK * normal };
  }, [massKg, appliedF, gravSlope, fsMax, muK, normal]);

  const pulleyAccelRef = useRef(accelPulley);
  useEffect(() => {
    pulleyAccelRef.current = accelPulley;
  }, [accelPulley]);

  useEffect(() => {
    if (!isPlaying) return;
    let rafId = 0;
    let prevTs = performance.now();

    const step = (now: number) => {
      const dt = Math.min(0.04, (now - prevTs) / 1000);
      prevTs = now;

      if (mode === 'box') {
        const p = boxParamsRef.current;
        const cur = boxSimRef.current;
        const fDrive = p.appliedF - p.gravSlope;
        let nextV = cur.v;
        let nextX = cur.x;

        if (Math.abs(cur.v) < 0.05 && Math.abs(fDrive) <= p.fsMax + 1e-6) {
          nextV = 0;
        } else {
          const dir = Math.abs(cur.v) >= 0.05 ? Math.sign(cur.v) : Math.sign(fDrive);
          const a = (fDrive - dir * p.fkMag) / p.massKg;
          const candidateV = cur.v + a * dt;
          // Prevent kinetic friction from reversing velocity through zero when fDrive can't overcome static friction
          if (cur.v !== 0 && Math.sign(candidateV) !== Math.sign(cur.v) && Math.abs(fDrive) <= p.fsMax + 1e-6) {
            nextV = 0;
          } else {
            nextV = Math.max(-18, Math.min(18, candidateV));
          }
          nextX = cur.x + nextV * dt;
        }

        boxSimRef.current = { x: nextX, v: nextV };
        setBoxReadout({ x: nextX, v: nextV });
      } else {
        const cur = pulleySimRef.current;
        if (!cur.stopped) {
          const a = pulleyAccelRef.current;
          let nextV = cur.v + a * dt;
          let nextS = cur.s + nextV * dt;
          let stopped = false;

          if (Math.abs(nextS) >= maxTravel) {
            nextS = Math.sign(nextS) * maxTravel;
            nextV = 0;
            stopped = true;
          }
          pulleySimRef.current = { s: nextS, v: nextV, stopped };
          setPulleyReadout({ s: nextS, v: nextV, stopped });
        }
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, mode]);

  const resetMotion = () => {
    boxSimRef.current = { x: 0, v: 0 };
    setBoxReadout({ x: 0, v: 0 });
    pulleySimRef.current = { s: 0, v: 0, stopped: false };
    setPulleyReadout({ s: 0, v: 0, stopped: false });
  };

  const applyBoxPreset = (f: number, deg: number, mu: number) => {
    setAppliedF(f);
    setSlopeDeg(deg);
    setMuS(mu);
    boxSimRef.current = { x: 0, v: 0 };
    setBoxReadout({ x: 0, v: 0 });
    setIsPlaying(true);
  };

  // Visual coordinates for Mode 1: camera tracks box with scrolling surface ruler ticks
  const tickScroll = (((boxReadout.x * 24) % 28) + 28) % 28;
  const forceScale = 0.55;
  const fAppLen = Math.max(-75, Math.min(75, appliedF * forceScale));
  const fFricLen = Math.max(-65, Math.min(65, fFriction * forceScale));
  const normLen = Math.min(68, normal * forceScale);
  const mgLen = Math.min(72, mg * forceScale);

  // Visual coordinates for Mode 2
  const sRatio = pulleyReadout.s / maxTravel; // [-1..1]
  const wheelAngleDeg = pulleyReadout.s * 65;

  return (
    <div className="space-y-3.5 font-serif">
      {/* Header & Play/Pause/Reset */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--ink-primary)]">
          <Box className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>ห้องทดลองกฎของนิวตัน F = ma &amp; ระบบรอก</span>
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
            onClick={resetMotion}
            className="min-h-[34px] px-2.5 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-[var(--ink-primary)] inline-flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>รีเซ็ต</span>
          </button>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
        <button
          type="button"
          onClick={() => setMode('box')}
          className={`min-h-[36px] px-2.5 py-1.5 rounded border transition-colors ${
            mode === 'box'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100 font-bold'
              : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
          }`}
        >
          1. ดัน/ดึงกล่อง &amp; พื้นเอียง (FBD สด)
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('pulley');
            resetMotion();
          }}
          className={`min-h-[36px] px-2.5 py-1.5 rounded border transition-colors ${
            mode === 'pulley'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100 font-bold'
              : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
          }`}
        >
          2. ระบบรอก 2 มวล (Table / Atwood)
        </button>
      </div>

      {/* Live Canvas */}
      <svg viewBox="0 0 460 220" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
        <defs>
          <marker id="nl-arrow-green" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#16a34a" />
          </marker>
          <marker id="nl-arrow-red" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#dc2626" />
          </marker>
          <marker id="nl-arrow-blue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#0284c7" />
          </marker>
          <marker id="nl-arrow-amber" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#d97706" />
          </marker>
        </defs>

        {mode === 'box' ? (
          <>
            {/* Status Pill inside SVG */}
            <rect
              x="12"
              y="10"
              width="210"
              height="24"
              rx="4"
              fill={isStaticHold ? 'rgba(22,163,74,0.12)' : 'rgba(217,119,6,0.12)'}
              stroke={isStaticHold ? '#16a34a' : '#d97706'}
              strokeWidth="1"
            />
            <text
              x="117"
              y="26"
              fontSize="10"
              textAnchor="middle"
              fill={isStaticHold ? '#15803d' : '#b45309'}
              fontFamily="monospace"
              fontWeight="bold"
            >
              {isStaticHold ? 'หยุดนิ่งสมดุล (f_s ต้านพอดี)' : 'กำลังเคลื่อนที่ (ใช้ f_k = μ_k N)'}
            </text>

            {/* Velocity / Acceleration HUD */}
            <text x="446" y="24" fontSize="10.5" textAnchor="end" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
              a = {accelBox.toFixed(2)} m/s² • v = {boxReadout.v.toFixed(2)} m/s
            </text>

            {/* Tilted track group centered around (230, 145) */}
            <g transform={`translate(230, 145) rotate(${-slopeDeg})`}>
              {/* Surface line & scrolling track ticks (gives clear sensation of speed v!) */}
              <line x1="-185" y1="0" x2="185" y2="0" stroke="var(--ink-primary)" strokeWidth="2.5" />
              {Array.from({ length: 13 }, (_, idx) => {
                const tx = -168 + idx * 28 - tickScroll;
                return (
                  <line
                    key={idx}
                    x1={tx}
                    y1="0"
                    x2={tx - 6}
                    y2="8"
                    stroke="var(--ink-tertiary)"
                    strokeWidth="1.2"
                  />
                );
              })}

              {/* Mass Block */}
              <rect
                x="-28"
                y="-36"
                width="56"
                height="36"
                rx="4"
                fill="rgba(2, 132, 199, 0.14)"
                stroke="var(--ink-primary)"
                strokeWidth="2"
              />
              <text x="0" y="-14" fontSize="11" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
                {massKg} kg
              </text>

              {/* Normal force N perpendicular out */}
              <line
                x1="0"
                y1="-18"
                x2="0"
                y2={-18 - normLen}
                stroke="#0284c7"
                strokeWidth="2.4"
                markerEnd="url(#nl-arrow-blue)"
              />
              <text x="7" y={-22 - normLen * 0.75} fontSize="9.5" fill="#0284c7" fontFamily="monospace" fontWeight="bold">
                N={normal.toFixed(1)}N
              </text>

              {/* Applied force F along slope */}
              {Math.abs(appliedF) >= 2 && (
                <>
                  <line
                    x1={fAppLen > 0 ? 28 : -28}
                    y1="-18"
                    x2={(fAppLen > 0 ? 28 : -28) + fAppLen}
                    y2="-18"
                    stroke="#16a34a"
                    strokeWidth="2.6"
                    markerEnd="url(#nl-arrow-green)"
                  />
                  <text
                    x={(fAppLen > 0 ? 34 : -34) + fAppLen}
                    y="-22"
                    fontSize="9.5"
                    textAnchor={fAppLen > 0 ? 'start' : 'end'}
                    fill="#16a34a"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    F={appliedF}N
                  </text>
                </>
              )}

              {/* Friction f at surface contact */}
              {Math.abs(fFriction) >= 0.8 && (
                <>
                  <line
                    x1="0"
                    y1="-3"
                    x2={fFricLen}
                    y2="-3"
                    stroke="#d97706"
                    strokeWidth="2.4"
                    markerEnd="url(#nl-arrow-amber)"
                  />
                  <text
                    x={fFricLen * 0.8}
                    y="15"
                    fontSize="9.5"
                    textAnchor="middle"
                    fill="#d97706"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {isStaticHold ? 'f_s' : 'f_k'}={Math.abs(fFriction).toFixed(1)}N
                  </text>
                </>
              )}

              {/* Dashed mg sin θ component when tilted */}
              {slopeDeg > 0 && (
                <line
                  x1="0"
                  y1="-18"
                  x2={-Math.min(60, gravSlope * forceScale)}
                  y2="-18"
                  stroke="#dc2626"
                  strokeWidth="1.5"
                  strokeDasharray="3 2"
                />
              )}
            </g>

            {/* Gravity mg straight down from block center in world frame */}
            {(() => {
              const bx = 230 - 18 * sinT;
              const by = 145 - 18 * cosT;
              return (
                <>
                  <line
                    x1={bx}
                    y1={by}
                    x2={bx}
                    y2={Math.min(212, by + mgLen)}
                    stroke="#dc2626"
                    strokeWidth="2.4"
                    markerEnd="url(#nl-arrow-red)"
                  />
                  <text
                    x={bx + 7}
                    y={Math.min(210, by + mgLen * 0.72)}
                    fontSize="9.5"
                    fill="#dc2626"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    mg={mg.toFixed(0)}N
                  </text>
                </>
              );
            })()}
          </>
        ) : pulleyKind === 'table' ? (
          <>
            {/* Table-Pulley System */}
            {/* Table body */}
            <rect x="34" y="96" width="286" height="14" rx="2" fill="var(--surface-muted)" stroke="var(--ink-primary)" strokeWidth="1.8" />
            <rect x="52" y="110" width="14" height="96" fill="var(--surface-muted)" stroke="var(--ink-tertiary)" strokeWidth="1.2" />
            <rect x="288" y="110" width="14" height="96" fill="var(--surface-muted)" stroke="var(--ink-tertiary)" strokeWidth="1.2" />

            {/* Pulley at table edge */}
            <g transform="translate(332, 86)">
              <line x1="-12" y1="10" x2="0" y2="0" stroke="var(--ink-primary)" strokeWidth="3" />
              <circle cx="0" cy="0" r="14" fill="var(--surface-card)" stroke="var(--ink-primary)" strokeWidth="2.2" />
              <g transform={`rotate(${wheelAngleDeg})`}>
                <line x1="-11" y1="0" x2="11" y2="0" stroke="var(--ink-tertiary)" strokeWidth="1.4" />
                <line x1="0" y1="-11" x2="0" y2="11" stroke="var(--ink-tertiary)" strokeWidth="1.4" />
              </g>
              <circle cx="0" cy="0" r="3" fill="var(--ink-primary)" />
            </g>

            {/* m1 on table */}
            {(() => {
              const m1X = 135 + sRatio * 95;
              const m2Y = 128 + sRatio * 48;
              return (
                <>
                  {/* Rope */}
                  <line x1={m1X + 24} y1="72" x2="332" y2="72" stroke="var(--ink-primary)" strokeWidth="1.8" />
                  <line x1="346" y1="86" x2="346" y2={m2Y} stroke="var(--ink-primary)" strokeWidth="1.8" />

                  {/* Tension labels */}
                  <text x={(m1X + 24 + 332) / 2} y="65" fontSize="9.5" textAnchor="middle" fill="#16a34a" fontFamily="monospace" fontWeight="bold">
                    T = {tension.toFixed(1)} N
                  </text>

                  {/* Block m1 */}
                  <rect x={m1X - 24} y="56" width="48" height="40" rx="4" fill="rgba(2,132,199,0.16)" stroke="var(--ink-primary)" strokeWidth="2" />
                  <text x={m1X} y="75" fontSize="10.5" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
                    m₁={m1}kg
                  </text>
                  <text x={m1X} y="89" fontSize="8.5" textAnchor="middle" fill="#d97706" fontFamily="monospace">
                    f={tableFriction.toFixed(1)}N
                  </text>

                  {/* Block m2 */}
                  <rect x="326" y={m2Y} width="40" height="36" rx="4" fill="rgba(217,119,6,0.18)" stroke="var(--ink-primary)" strokeWidth="2" />
                  <text x="346" y={m2Y + 21} fontSize="10" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
                    m₂={m2}kg
                  </text>
                  <text x="372" y={m2Y + 21} fontSize="9" fill="#dc2626" fontFamily="monospace" fontWeight="bold">
                    {m2 * G}N
                  </text>
                </>
              );
            })()}

            <text x="28" y="28" fontSize="10.5" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
              {pulleyStuck ? 'แรงเสียดทานสถิตยึดอยู่! a = 0' : `a = ${accelPulley.toFixed(2)} m/s²`} • T = {tension.toFixed(1)} N
            </text>
            {pulleyReadout.stopped && (
              <text x="28" y="44" fontSize="9.5" fill="#dc2626" fontFamily="monospace" fontWeight="bold">
                ถึงสุดรางแล้ว — กด &quot;รีเซ็ต&quot; เพื่อปล่อยใหม่
              </text>
            )}
          </>
        ) : (
          <>
            {/* Atwood Machine */}
            <line x1="80" y1="22" x2="380" y2="22" stroke="var(--ink-primary)" strokeWidth="3" />
            <line x1="230" y1="22" x2="230" y2="48" stroke="var(--ink-primary)" strokeWidth="2.5" />

            <g transform="translate(230, 48)">
              <circle cx="0" cy="0" r="20" fill="var(--surface-muted)" stroke="var(--ink-primary)" strokeWidth="2.2" />
              <g transform={`rotate(${wheelAngleDeg})`}>
                <line x1="-17" y1="0" x2="17" y2="0" stroke="var(--ink-tertiary)" strokeWidth="1.5" />
                <line x1="0" y1="-17" x2="0" y2="17" stroke="var(--ink-tertiary)" strokeWidth="1.5" />
              </g>
              <circle cx="0" cy="0" r="3.5" fill="var(--ink-primary)" />
            </g>

            {(() => {
              const yLeft = 112 - sRatio * 48;
              const yRight = 112 + sRatio * 48;
              return (
                <>
                  <line x1="210" y1="48" x2="210" y2={yLeft} stroke="var(--ink-primary)" strokeWidth="1.8" />
                  <line x1="250" y1="48" x2="250" y2={yRight} stroke="var(--ink-primary)" strokeWidth="1.8" />

                  <rect x="188" y={yLeft} width="44" height="38" rx="4" fill="rgba(2,132,199,0.16)" stroke="var(--ink-primary)" strokeWidth="2" />
                  <text x="210" y={yLeft + 22} fontSize="10" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
                    m₁={m1}kg
                  </text>
                  <text x="180" y={yLeft + 22} fontSize="9.5" textAnchor="end" fill="#dc2626" fontFamily="monospace" fontWeight="bold">
                    {m1 * G}N ↓
                  </text>

                  <rect x="228" y={yRight} width="44" height="38" rx="4" fill="rgba(217,119,6,0.18)" stroke="var(--ink-primary)" strokeWidth="2" />
                  <text x="250" y={yRight + 22} fontSize="10" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
                    m₂={m2}kg
                  </text>
                  <text x="280" y={yRight + 22} fontSize="9.5" textAnchor="start" fill="#dc2626" fontFamily="monospace" fontWeight="bold">
                    ↓ {m2 * G}N
                  </text>
                </>
              );
            })()}

            <text x="16" y="42" fontSize="10" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
              a = {accelPulley.toFixed(2)} m/s²
            </text>
            <text x="16" y="57" fontSize="10" fill="#16a34a" fontFamily="monospace" fontWeight="bold">
              T = {tension.toFixed(1)} N
            </text>
            {pulleyReadout.stopped && (
              <text x="444" y="44" fontSize="9.5" textAnchor="end" fill="#dc2626" fontFamily="monospace" fontWeight="bold">
                ชนขอบแล้ว — กดรีเซ็ต
              </text>
            )}
          </>
        )}
      </svg>

      {/* Controls */}
      {mode === 'box' ? (
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-[11px] font-mono">
            <button
              type="button"
              onClick={() => applyBoxPreset(30, 0, 0)}
              className="min-h-[34px] px-2 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] hover:border-stone-500 text-[var(--ink-primary)]"
            >
              พื้นราบไร้แรงเสียดทาน
            </button>
            <button
              type="button"
              onClick={() => applyBoxPreset(15, 0, 0.5)}
              className="min-h-[34px] px-2 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] hover:border-stone-500 text-[var(--ink-primary)]"
            >
              ดันยังไม่ขยับ (f_s)
            </button>
            <button
              type="button"
              onClick={() => applyBoxPreset(0, 30, 0.35)}
              className="min-h-[34px] px-2 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] hover:border-stone-500 text-[var(--ink-primary)]"
            >
              พื้นเอียง 30° ไถลลง
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>มวล m</span>
                <strong className="text-[var(--ink-primary)]">{massKg} kg (mg = {mg} N)</strong>
              </div>
              <input type="range" min={1} max={20} step={1} value={massKg} onChange={(e) => setMassKg(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
            </label>
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>แรงดัน/ดึง F</span>
                <strong className="text-[var(--ink-primary)]">{appliedF} N</strong>
              </div>
              <input type="range" min={-80} max={120} step={5} value={appliedF} onChange={(e) => setAppliedF(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
            </label>
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>มุมพื้นเอียง θ</span>
                <strong className="text-[var(--ink-primary)]">{slopeDeg}°</strong>
              </div>
              <input type="range" min={0} max={35} step={1} value={slopeDeg} onChange={(e) => setSlopeDeg(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
            </label>
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>ส.ป.ส. เสียดทานสถิต μ_s</span>
                <strong className="text-[var(--ink-primary)]">{muS.toFixed(2)} (f_s,max={fsMax.toFixed(1)}N)</strong>
              </div>
              <input type="range" min={0} max={0.8} step={0.05} value={muS} onChange={(e) => setMuS(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
            </label>
          </div>
        </div>
      ) : (
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
            <button
              type="button"
              onClick={() => {
                setPulleyKind('table');
                resetMotion();
              }}
              className={`min-h-[34px] px-2 py-1 rounded border ${
                pulleyKind === 'table'
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
                  : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
              }`}
            >
              m₁ บนโต๊ะ + รอกห้อย m₂
            </button>
            <button
              type="button"
              onClick={() => {
                setPulleyKind('atwood');
                resetMotion();
              }}
              className={`min-h-[34px] px-2 py-1 rounded border ${
                pulleyKind === 'atwood'
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
                  : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
              }`}
            >
              เครื่องแอดวูด (Atwood)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>มวล m₁</span>
                <strong className="text-[var(--ink-primary)]">{m1} kg</strong>
              </div>
              <input type="range" min={1} max={15} step={1} value={m1} onChange={(e) => { setM1(parseInt(e.target.value, 10)); resetMotion(); }} className="bridge-slider w-full cursor-pointer" />
            </label>
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>มวล m₂</span>
                <strong className="text-[var(--ink-primary)]">{m2} kg</strong>
              </div>
              <input type="range" min={1} max={15} step={1} value={m2} onChange={(e) => { setM2(parseInt(e.target.value, 10)); resetMotion(); }} className="bridge-slider w-full cursor-pointer" />
            </label>
            {pulleyKind === 'table' && (
              <label className="space-y-1">
                <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                  <span>เสียดทานโต๊ะ μ</span>
                  <strong className="text-[var(--ink-primary)]">{tableMu.toFixed(2)}</strong>
                </div>
                <input type="range" min={0} max={0.6} step={0.05} value={tableMu} onChange={(e) => { setTableMu(parseFloat(e.target.value)); resetMotion(); }} className="bridge-slider w-full cursor-pointer" />
              </label>
            )}
          </div>
        </div>
      )}

      {/* Telemetry */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
        <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <span className="block text-[10px] text-[var(--ink-tertiary)]">ความเร่ง a</span>
          <strong className="text-sky-700 dark:text-sky-400">
            {(mode === 'box' ? accelBox : accelPulley).toFixed(2)} m/s²
          </strong>
        </div>
        <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <span className="block text-[10px] text-[var(--ink-tertiary)]">
            {mode === 'box' ? 'แรงตั้งฉาก N' : 'แรงตึงเชือก T'}
          </span>
          <strong className="text-emerald-700 dark:text-emerald-400">
            {(mode === 'box' ? normal : tension).toFixed(1)} N
          </strong>
        </div>
        <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <span className="block text-[10px] text-[var(--ink-tertiary)]">แรงเสียดทาน f</span>
          <strong className="text-amber-700 dark:text-amber-400">
            {mode === 'box'
              ? `${Math.abs(fFriction).toFixed(1)} N`
              : pulleyKind === 'table'
                ? `${tableFriction.toFixed(1)} N`
                : '0.0 N (ลื่น)'}
          </strong>
        </div>
      </div>

      {/* Exam Insight Callout */}
      <div className="p-2.5 rounded border border-amber-300/80 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/30 text-[11px] sm:text-xs text-amber-950 dark:text-amber-200 leading-relaxed flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <FormattedMathText
          text={'ทริคกฎนิวตัน สอวน.: ถ้าระบบยังหยุดนิ่ง ($v = 0$) ต้องใช้ **แรงเสียดทานสถิตจริง** $f_s = \\text{แรงฉุด} \\le \\mu_s N$ อย่าเผลอแทน $\\mu_s N$ ทันที และในระบบรอกให้มอง **ทั้งระบบเป็นก้อนเดียว** หา $a = \\frac{\\sum F_{\\text{ฉุด}} - \\sum F_{\\text{ต้าน}}}{m_1 + m_2}$ แล้วค่อยตัด FBD ก้อนเดียวหาแรงตึงเชือก $T$!'}
        />
      </div>
    </div>
  );
};
