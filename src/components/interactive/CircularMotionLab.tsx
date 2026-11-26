// src/components/interactive/CircularMotionLab.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FormattedMathText } from '@/components/math/LatexRenderer';
import { Orbit, Scissors, RotateCcw, Play, Pause, Sparkles } from 'lucide-react';

type CircularMode = 'orbit' | 'banked';
type BankedSub = 'curve' | 'vertical';

const G = 10;

export const CircularMotionLab: React.FC = () => {
  const [mode, setMode] = useState<CircularMode>('orbit');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Mode 1: Horizontal Orbit + Cut String
  const [speed, setSpeed] = useState<number>(6);
  const [radiusM, setRadiusM] = useState<number>(2.5);
  const [massKg, setMassKg] = useState<number>(2.0);
  const [isCut, setIsCut] = useState<boolean>(false);
  const [orbitPos, setOrbitPos] = useState<{
    theta: number;
    xPx: number;
    yPx: number;
    trail: { x: number; y: number }[];
  }>({ theta: 0, xPx: 230 + 60, yPx: 110, trail: [] });

  const orbitRef = useRef({
    theta: 0,
    cut: false,
    xPx: 230 + 60,
    yPx: 110,
    vxPx: 0,
    vyPx: 0,
    trail: [] as { x: number; y: number }[],
  });

  // Mode 2: Banked curve / Vertical loop
  const [bankedSub, setBankedSub] = useState<BankedSub>('curve');
  const [bankDeg, setBankDeg] = useState<number>(25);
  const [carSpeed, setCarSpeed] = useState<number>(14);
  const [vertSpeedBot, setVertSpeedBot] = useState<number>(12);
  const [vertAngle, setVertAngle] = useState<number>(0);
  const vertRef = useRef<number>(0);

  const rPx = 30 + ((radiusM - 1) / 4) * 52; // [30..82]
  const ac = (speed * speed) / radiusM;
  const tensionN = isCut ? 0 : massKg * ac;

  // Banked curve R = 40 m
  const curveR = 40;
  const bankRad = (bankDeg * Math.PI) / 180;
  const vIdeal = Math.sqrt(curveR * G * Math.tan(bankRad));

  // Vertical loop R = 2.5 m -> v_crit_bot = sqrt(5gR) = sqrt(125) = 11.18 m/s
  const loopR = 2.5;
  const vCritBot = Math.sqrt(5 * G * loopR);
  const vertLoopCanComplete = vertSpeedBot >= vCritBot;
  const vNowVert = Math.sqrt(
    Math.max(0, vertSpeedBot * vertSpeedBot - 2 * G * loopR * (1 - Math.cos(vertAngle)))
  );
  const nVertNow = (massKg * vNowVert * vNowVert) / loopR + massKg * G * Math.cos(vertAngle);

  const orbitParamsRef = useRef({ speed, radiusM, rPx });
  useEffect(() => {
    orbitParamsRef.current = { speed, radiusM, rPx };
  }, [speed, radiusM, rPx]);

  const vertBotRef = useRef(vertSpeedBot);
  useEffect(() => {
    vertBotRef.current = vertSpeedBot;
  }, [vertSpeedBot]);

  useEffect(() => {
    if (!isPlaying) return;
    let rafId = 0;
    let prevTs = performance.now();

    const step = (now: number) => {
      const dt = Math.min(0.035, (now - prevTs) / 1000);
      prevTs = now;

      if (mode === 'orbit') {
        const op = orbitParamsRef.current;
        const orb = orbitRef.current;
        if (!orb.cut) {
          const omega = op.speed / op.radiusM;
          orb.theta += omega * dt * 0.9;
          orb.xPx = 230 + op.rPx * Math.cos(orb.theta);
          orb.yPx = 110 - op.rPx * Math.sin(orb.theta);
          setOrbitPos({ theta: orb.theta, xPx: orb.xPx, yPx: orb.yPx, trail: [] });
        } else {
          orb.xPx += orb.vxPx * dt;
          orb.yPx += orb.vyPx * dt;
          // Stop advancing once clearly out of frame
          if (orb.xPx > -20 && orb.xPx < 480 && orb.yPx > -20 && orb.yPx < 240) {
            const nextTrail = [...orb.trail, { x: orb.xPx, y: orb.yPx }].slice(-28);
            orb.trail = nextTrail;
            setOrbitPos({ theta: orb.theta, xPx: orb.xPx, yPx: orb.yPx, trail: nextTrail });
          }
        }
      } else if (bankedSub === 'vertical') {
        const vb = vertBotRef.current;
        const vCur = Math.sqrt(Math.max(1.5, vb * vb - 2 * G * loopR * (1 - Math.cos(vertRef.current))));
        const omega = (vCur / loopR) * 0.65;
        let nextAng = vertRef.current + omega * dt;
        // If energy is insufficient for top, oscillate like a pendulum in lower arc
        const hMax = (vb * vb) / (2 * G);
        if (hMax < 2 * loopR) {
          const maxAng = Math.acos(1 - hMax / loopR);
          nextAng = maxAng * Math.sin(performance.now() * 0.0028);
        }
        vertRef.current = nextAng;
        setVertAngle(nextAng);
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, mode, bankedSub]);

  const handleCutString = () => {
    const op = orbitParamsRef.current;
    const orb = orbitRef.current;
    if (orb.cut) {
      // Reset string
      orb.cut = false;
      orb.trail = [];
      orb.xPx = 230 + op.rPx * Math.cos(orb.theta);
      orb.yPx = 110 - op.rPx * Math.sin(orb.theta);
      setIsCut(false);
      setOrbitPos({ theta: orb.theta, xPx: orb.xPx, yPx: orb.yPx, trail: [] });
      setIsPlaying(true);
    } else {
      // Cut! Velocity stays strictly tangent: (-sin θ, -cos θ) in SVG y-down coords
      const pxPerSec = op.speed * 18;
      orb.cut = true;
      orb.vxPx = -Math.sin(orb.theta) * pxPerSec;
      orb.vyPx = -Math.cos(orb.theta) * pxPerSec;
      orb.trail = [{ x: orb.xPx, y: orb.yPx }];
      setIsCut(true);
      setIsPlaying(true);
    }
  };

  return (
    <div className="space-y-3.5 font-serif">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--ink-primary)]">
          <Orbit className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span>ห้องทดลองการเคลื่อนที่แบบวงกลม (Fc = mv²/r)</span>
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
          onClick={() => setMode('orbit')}
          className={`min-h-[36px] px-2 py-1.5 rounded border ${
            mode === 'orbit'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
              : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
          }`}
        >
          1. เหวี่ยงเชือก &amp; ตัดเชือกพิสูจน์เส้นสัมผัส
        </button>
        <button
          type="button"
          onClick={() => setMode('banked')}
          className={`min-h-[36px] px-2 py-1.5 rounded border ${
            mode === 'banked'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
              : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
          }`}
        >
          2. ทางโค้งยกเอียง &amp; วงกลมแนวดิ่ง
        </button>
      </div>

      {/* SVG Canvas */}
      <svg viewBox="0 0 460 220" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
        <defs>
          <marker id="cm-arrow-v" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#16a34a" />
          </marker>
          <marker id="cm-arrow-t" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#dc2626" />
          </marker>
          <marker id="cm-arrow-n" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#0284c7" />
          </marker>
        </defs>

        {mode === 'orbit' ? (
          <>
            {/* Orbit reference circle */}
            <circle cx="230" cy="110" r={rPx} fill="none" stroke="var(--ink-tertiary)" strokeWidth="1.2" strokeDasharray="4 4" />
            <circle cx="230" cy="110" r="4.5" fill="var(--ink-primary)" />
            <text x="230" y="126" fontSize="9" textAnchor="middle" fill="var(--ink-tertiary)" fontFamily="monospace">จุดหมุน O</text>

            {/* String (intact) or Tangent fly trail (cut) */}
            {!isCut ? (
              <line x1="230" y1="110" x2={orbitPos.xPx} y2={orbitPos.yPx} stroke="var(--ink-primary)" strokeWidth="2" />
            ) : (
              orbitPos.trail.length > 1 && (
                <path
                  d={orbitPos.trail.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')}
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2.2"
                  strokeDasharray="4 3"
                />
              )
            )}

            {/* Velocity tangent vector */}
            {(() => {
              const vxUnit = -Math.sin(orbitPos.theta);
              const vyUnit = -Math.cos(orbitPos.theta);
              const vArrow = 18 + speed * 2.5;
              const txUnit = (230 - orbitPos.xPx) / Math.max(1, rPx);
              const tyUnit = (110 - orbitPos.yPx) / Math.max(1, rPx);
              const tArrow = Math.min(48, 12 + tensionN * 0.25);

              return (
                <>
                  <line
                    x1={orbitPos.xPx}
                    y1={orbitPos.yPx}
                    x2={orbitPos.xPx + vxUnit * vArrow}
                    y2={orbitPos.yPx + vyUnit * vArrow}
                    stroke="#16a34a"
                    strokeWidth="2.4"
                    markerEnd="url(#cm-arrow-v)"
                  />
                  {!isCut && (
                    <line
                      x1={orbitPos.xPx}
                      y1={orbitPos.yPx}
                      x2={orbitPos.xPx + txUnit * tArrow}
                      y2={orbitPos.yPx + tyUnit * tArrow}
                      stroke="#dc2626"
                      strokeWidth="2.4"
                      markerEnd="url(#cm-arrow-t)"
                    />
                  )}
                  <circle cx={orbitPos.xPx} cy={orbitPos.yPx} r="8" fill="#0284c7" stroke="white" strokeWidth="1.8" />
                </>
              );
            })()}

            {/* Legend & Cut Status with subtle backdrop */}
            <rect x="8" y="8" width="248" height="35" rx="5" fill="var(--surface-card)" fillOpacity="0.9" />
            <text x="14" y="22" fontSize="9.5" fill="#16a34a" fontFamily="monospace" fontWeight="bold">
              → v ความเร็วตามเส้นสัมผัส
            </text>
            <text x="14" y="36" fontSize="9.5" fill="#dc2626" fontFamily="monospace" fontWeight="bold">
              → {isCut ? 'T = 0 N (เชือกขาดแล้ว! พุ่งเส้นตรง)' : `T = mv²/r = ${tensionN.toFixed(1)} N`}
            </text>
          </>
        ) : bankedSub === 'curve' ? (
          <>
            {/* Banked Road Curve */}
            <text x="14" y="22" fontSize="10" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
              โค้งรัศมี R = {curveR}m • ความเร็วเหมาะสม √(Rg tanθ) = {vIdeal.toFixed(1)} m/s
            </text>
            {(() => {
              const diff = carSpeed - vIdeal;
              const statusTxt =
                Math.abs(diff) < 1.0
                  ? 'พอดีเป๊ะ! ไม่ต้องใช้แรงเสียดทาน (f_s = 0)'
                  : diff > 0
                    ? 'เร็วเกิน! มีแนวโน้มไถลออก → f_s ชี้ลงด้านในโค้ง'
                    : 'ช้าไป! มีแนวโน้มลื่นลง → f_s ชี้ขึ้นด้านบนโค้ง';
              const bx1 = 90;
              const by1 = 178;
              const bx2 = 350;
              const by2 = by1 - (bx2 - bx1) * Math.tan(bankRad);
              const mx = 220;
              const my = (by1 + by2) / 2;
              return (
                <>
                  <text
                    x="14"
                    y="38"
                    fontSize="9.5"
                    fill={Math.abs(diff) < 1 ? '#16a34a' : '#d97706'}
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {statusTxt}
                  </text>
                  <line x1={bx1} y1={by1} x2="365" y2={by1} stroke="var(--ink-tertiary)" strokeWidth="1.2" strokeDasharray="3 3" />
                  <polygon points={`${bx1},${by1} ${bx2},${by1} ${bx2},${by2}`} fill="var(--surface-muted)" stroke="var(--ink-primary)" strokeWidth="2" />
                  <text x={bx1 + 42} y={by1 - 6} fontSize="10" fill="var(--ink-primary)" fontFamily="monospace">θ={bankDeg}°</text>

                  <g transform={`translate(${mx}, ${my}) rotate(${-bankDeg})`}>
                    <rect x="-24" y="-22" width="48" height="22" rx="4" fill="rgba(2,132,199,0.22)" stroke="var(--ink-primary)" strokeWidth="2" />
                    <text x="0" y="-8" fontSize="9" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">รถโค้ง</text>
                    {/* Normal force N perpendicular */}
                    <line x1="0" y1="-22" x2="0" y2="-75" stroke="#0284c7" strokeWidth="2.4" markerEnd="url(#cm-arrow-n)" />
                    <text x="6" y="-65" fontSize="9.5" fill="#0284c7" fontFamily="monospace" fontWeight="bold">N</text>
                    {/* Friction f_s along incline if off ideal speed */}
                    {Math.abs(diff) >= 1.0 && (
                      <line
                        x1="0"
                        y1="-2"
                        x2={diff > 0 ? -36 : 36}
                        y2="-2"
                        stroke="#d97706"
                        strokeWidth="2.4"
                        markerEnd="url(#cm-arrow-t)"
                      />
                    )}
                  </g>
                  {/* mg down */}
                  <line x1={mx - 8} y1={my - 8} x2={mx - 8} y2={my + 45} stroke="#dc2626" strokeWidth="2.4" markerEnd="url(#cm-arrow-t)" />
                  <text x={mx - 24} y={my + 42} fontSize="9.5" fill="#dc2626" fontFamily="monospace" fontWeight="bold">mg</text>
                </>
              );
            })()}
          </>
        ) : (
          <>
            {/* Vertical Loop */}
            <circle cx="230" cy="112" r="76" fill="none" stroke="var(--ink-primary)" strokeWidth="2.2" />
            <circle cx="230" cy="112" r="3" fill="var(--ink-tertiary)" />
            <text x="14" y="22" fontSize="10" fill={vertLoopCanComplete ? '#16a34a' : '#dc2626'} fontFamily="monospace" fontWeight="bold">
              {vertLoopCanComplete ? 'ครบรอบสมบูรณ์! v_bot ≥ √(5gR)' : 'พลังงานไม่พอ! ตกลง/แกว่งล่าง (ต้อง ≥ 11.2 m/s)'}
            </text>
            <text x="14" y="38" fontSize="9.5" fill="var(--ink-secondary)" fontFamily="monospace">
              v ขณะนี้ = {vNowVert.toFixed(1)} m/s • N = {Math.max(0, nVertNow).toFixed(1)} N
            </text>
            {(() => {
              const bx = 230 + 76 * Math.sin(vertAngle);
              const by = 112 + 76 * Math.cos(vertAngle);
              return (
                <>
                  <line x1="230" y1="112" x2={bx} y2={by} stroke="var(--ink-tertiary)" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx={bx} cy={by} r="7.5" fill={nVertNow > 0 ? '#0284c7' : '#dc2626'} stroke="white" strokeWidth="1.5" />
                </>
              );
            })()}
          </>
        )}
      </svg>

      {/* Controls */}
      {mode === 'orbit' ? (
        <div className="space-y-3 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleCutString}
              className={`min-h-[38px] px-3.5 py-1.5 rounded font-mono text-xs font-bold inline-flex items-center gap-1.5 border transition-colors ${
                isCut
                  ? 'bg-emerald-600 text-white border-emerald-700'
                  : 'bg-rose-600 text-white border-rose-700'
              }`}
            >
              {isCut ? <RotateCcw className="w-3.5 h-3.5" /> : <Scissors className="w-3.5 h-3.5" />}
              <span>{isCut ? 'ผูกเชือกใหม่ (Reset)' : 'ตัดเชือก! (Cut String)'}</span>
            </button>
            <span className="font-mono text-[11px] text-[var(--ink-secondary)]">
              ความเร่งสู่ศูนย์กลาง a_c = <strong className="text-[var(--ink-primary)]">{isCut ? '0.00' : ac.toFixed(1)} m/s²</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>อัตราเร็ว v</span>
                <strong className="text-[var(--ink-primary)]">{speed} m/s</strong>
              </div>
              <input type="range" min={2} max={14} step={1} value={speed} onChange={(e) => setSpeed(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
            </label>
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>รัศมีเชือก r</span>
                <strong className="text-[var(--ink-primary)]">{radiusM.toFixed(1)} m</strong>
              </div>
              <input type="range" min={1.0} max={5.0} step={0.5} value={radiusM} onChange={(e) => setRadiusM(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
            </label>
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>มวล m</span>
                <strong className="text-[var(--ink-primary)]">{massKg.toFixed(1)} kg</strong>
              </div>
              <input type="range" min={0.5} max={5.0} step={0.5} value={massKg} onChange={(e) => setMassKg(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
            </label>
          </div>
        </div>
      ) : (
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
            <button
              type="button"
              onClick={() => setBankedSub('curve')}
              className={`min-h-[34px] px-2 py-1 rounded border ${
                bankedSub === 'curve'
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
                  : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
              }`}
            >
              ทางโค้งยกเอียง (tan θ = v²/Rg)
            </button>
            <button
              type="button"
              onClick={() => setBankedSub('vertical')}
              className={`min-h-[34px] px-2 py-1 rounded border ${
                bankedSub === 'vertical'
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
                  : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
              }`}
            >
              วงกลมแนวดิ่ง (√5gR)
            </button>
          </div>

          {bankedSub === 'curve' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <label className="space-y-1">
                <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                  <span>มุมเอียงโค้ง θ</span>
                  <strong className="text-[var(--ink-primary)]">{bankDeg}°</strong>
                </div>
                <input type="range" min={10} max={40} step={1} value={bankDeg} onChange={(e) => setBankDeg(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
              </label>
              <label className="space-y-1">
                <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                  <span>อัตราเร็วรถ v</span>
                  <strong className="text-[var(--ink-primary)]">{carSpeed} m/s</strong>
                </div>
                <input type="range" min={5} max={28} step={1} value={carSpeed} onChange={(e) => setCarSpeed(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
              </label>
            </div>
          ) : (
            <label className="block space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>อัตราเร็วตั้งต้นด้านล่าง v_bot (R = 2.5 m)</span>
                <strong className="text-[var(--ink-primary)]">{vertSpeedBot.toFixed(1)} m/s</strong>
              </div>
              <input type="range" min={5} max={15} step={0.5} value={vertSpeedBot} onChange={(e) => setVertSpeedBot(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
            </label>
          )}
        </div>
      )}

      {/* Insight Callout */}
      <div className="p-2.5 rounded border border-amber-300/80 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/30 text-[11px] sm:text-xs text-amber-950 dark:text-amber-200 leading-relaxed flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <FormattedMathText
          text={'ลองกด **ตัดเชือก!** ทันทีที่แรงตึงเชือก $T$ หายไป ลูกบอลจะไม่กระเด็นถอยออกนอกแนวรัศมี แต่จะพุ่งตรงไปตาม **เส้นสัมผัสวงกลม** ตามกฎข้อ 1 ของนิวตัน — แรง $mv^2/r$ คือผลรวมแรงจริงที่ดึงเข้าด้านใน ไม่ใช่แรงใหม่!'}
        />
      </div>
    </div>
  );
};
