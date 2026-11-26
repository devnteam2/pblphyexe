// src/components/interactive/MagnetFieldLab.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { FormattedMathText } from '@/components/math/LatexRenderer';
import { Magnet, Play, Pause, Sparkles } from 'lucide-react';

type MagnetMode = 'magnet-coil' | 'lorentz-cyclotron';

export const MagnetFieldLab: React.FC = () => {
  const [mode, setMode] = useState<MagnetMode>('magnet-coil');

  // Mode 1: Bar Magnet + Compasses + Faraday Coil
  const [magnetX, setMagnetX] = useState<number>(130); // SVG X in [65..295], coil sits at X=290
  const [prevMagnetX, setPrevMagnetX] = useState<number>(130);
  const [autoShake, setAutoShake] = useState<boolean>(false);
  const [flipPoles, setFlipPoles] = useState<boolean>(false);

  // Mode 2: Charged particle in uniform B-field
  const [chargeSign, setChargeSign] = useState<1 | -1>(1);
  const [speedV, setSpeedV] = useState<number>(4.0);
  const [bTesla, setBTesla] = useState<number>(1.0);
  const [orbitAngle, setOrbitAngle] = useState<number>(0);

  // Auto-shake loop for Mode 1
  useEffect(() => {
    if (mode !== 'magnet-coil' || !autoShake) return;
    let rafId = 0;
    let t = 0;
    let prevTs = performance.now();

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - prevTs) / 1000);
      prevTs = now;
      t += dt;
      const nextX = 205 + 88 * Math.sin(t * 2.8);
      setMagnetX((cur) => {
        setPrevMagnetX(cur);
        return nextX;
      });
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [mode, autoShake]);

  // Cyclotron loop for Mode 2
  useEffect(() => {
    if (mode !== 'lorentz-cyclotron') return;
    let rafId = 0;
    let prevTs = performance.now();

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - prevTs) / 1000);
      prevTs = now;
      setOrbitAngle((ang) => ang + dt * bTesla * 2.1 * chargeSign);
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [mode, bTesla, chargeSign]);

  // Dipole B-field angle at any point (px, py) given bar magnet center (mx, my=102)
  const magnetY = 104;
  const dipoleAngleDeg = (px: number, py: number) => {
    const poleSign = flipPoles ? -1 : 1; // +1 means North on right side
    const nx = magnetX + 26 * poleSign;
    const sx = magnetX - 26 * poleSign;
    const dxN = px - nx;
    const dyN = py - magnetY;
    const rN3 = Math.pow(Math.hypot(dxN, dyN) + 8, 3);
    const dxS = px - sx;
    const dyS = py - magnetY;
    const rS3 = Math.pow(Math.hypot(dxS, dyS) + 8, 3);
    const bx = dxN / rN3 - dxS / rS3;
    const by = dyN / rN3 - dyS / rS3;
    return (Math.atan2(by, bx) * 180) / Math.PI;
  };

  // Induced EMF in Faraday Coil at X=318 proportional to d/dt of proximity flux
  const coilX = 324;
  const fluxAt = (mx: number) => Math.exp(-Math.pow((mx - coilX) / 68, 2));
  const curFlux = fluxAt(magnetX);
  const dFlux = fluxAt(magnetX) - fluxAt(prevMagnetX);
  const emfMag = Math.min(1.0, Math.abs(dFlux) * 28);

  const compassPoints = [
    { x: 95, y: 46 },
    { x: 185, y: 46 },
    { x: 265, y: 46 },
    { x: 95, y: 162 },
    { x: 185, y: 162 },
    { x: 265, y: 162 },
  ];

  // Mode 2 cyclotron radius in SVG pixels (r = m v / q B)
  const orbitR = Math.min(72, Math.max(16, (speedV / bTesla) * 14));
  const partX = 230 + orbitR * Math.cos(orbitAngle);
  const partY = 102 + orbitR * Math.sin(orbitAngle);
  // Force points inward toward (230, 102); tangent is direction of velocity
  const velDirX = -Math.sin(orbitAngle) * chargeSign;
  const velDirY = Math.cos(orbitAngle) * chargeSign;

  return (
    <div className="space-y-3.5 font-serif">
      {/* Header & Mode Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--ink-primary)]">
          <Magnet className="w-4 h-4 text-rose-600 dark:text-rose-400" />
          <span>ห้องทดลองแม่เหล็ก: แท่งแม่เหล็ก เข็มทิศ ขดลวด &amp; ประจุในสนาม B</span>
        </div>

        <div className="inline-flex rounded border border-[var(--hairline-border)] overflow-hidden text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setMode('magnet-coil')}
            className={`px-2.5 py-1 ${mode === 'magnet-coil' ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold' : 'bg-[var(--surface-card)] text-[var(--ink-secondary)]'}`}
          >
            แท่งแม่เหล็ก + ขดลวด
          </button>
          <button
            type="button"
            onClick={() => setMode('lorentz-cyclotron')}
            className={`px-2.5 py-1 border-l border-[var(--hairline-border)] ${mode === 'lorentz-cyclotron' ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold' : 'bg-[var(--surface-card)] text-[var(--ink-secondary)]'}`}
          >
            ประจุวิ่งวน qv×B
          </button>
        </div>
      </div>

      {mode === 'magnet-coil' ? (
        <>
          <svg viewBox="0 0 460 205" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
            {/* Field Loops around Magnet */}
            <ellipse cx={magnetX} cy={magnetY} rx="64" ry="36" fill="none" stroke="var(--hairline-border)" strokeWidth="1.2" strokeDasharray="3 3" />
            <ellipse cx={magnetX} cy={magnetY} rx="92" ry="54" fill="none" stroke="var(--hairline-border)" strokeWidth="1" strokeDasharray="3 3" />

            {/* 6 Rotating Magnetic Compasses */}
            {compassPoints.map((pt, i) => {
              const ang = dipoleAngleDeg(pt.x, pt.y);
              return (
                <g key={i} transform={`translate(${pt.x}, ${pt.y}) rotate(${ang})`}>
                  <circle cx="0" cy="0" r="11" fill="var(--surface-muted)" stroke="var(--ink-tertiary)" strokeWidth="1" />
                  <polygon points="8,0 0,-2.8 0,2.8" fill="#dc2626" />
                  <polygon points="-8,0 0,-2.8 0,2.8" fill="#0284c7" />
                </g>
              );
            })}

            {/* Copper Faraday Coil & Light Bulb on Right */}
            <g>
              <line x1={coilX} y1="68" x2="404" y2="68" stroke="#b45309" strokeWidth="2" />
              <line x1={coilX} y1="140" x2="404" y2="140" stroke="#b45309" strokeWidth="2" />
              <line x1="404" y1="68" x2="404" y2="140" stroke="#b45309" strokeWidth="2" />
              {[0, 1, 2, 3].map((turn) => (
                <ellipse
                  key={turn}
                  cx={coilX + turn * 10}
                  cy={magnetY}
                  rx="8"
                  ry="36"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="2.8"
                />
              ))}
              {/* Induced Light Bulb */}
              {emfMag > 0.08 && (
                <circle cx="404" cy={magnetY} r={16 + emfMag * 16} fill={`rgba(245, 158, 11, ${emfMag * 0.75})`} />
              )}
              <circle cx="404" cy={magnetY} r="14" fill="var(--surface-card)" stroke="#d97706" strokeWidth="2.2" />
              <text x="404" y="108" fontSize="9.5" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
                💡
              </text>
            </g>

            {/* Movable Bar Magnet */}
            <g transform={`translate(${magnetX}, ${magnetY})`}>
              <rect
                x="-36"
                y="-14"
                width="36"
                height="28"
                rx="2"
                fill={flipPoles ? '#dc2626' : '#0284c7'}
                stroke="var(--ink-primary)"
                strokeWidth="1.5"
              />
              <rect
                x="0"
                y="-14"
                width="36"
                height="28"
                rx="2"
                fill={flipPoles ? '#0284c7' : '#dc2626'}
                stroke="var(--ink-primary)"
                strokeWidth="1.5"
              />
              <text x="-18" y="4" fontSize="11" textAnchor="middle" fill="#ffffff" fontFamily="monospace" fontWeight="bold">
                {flipPoles ? 'N' : 'S'}
              </text>
              <text x="18" y="4" fontSize="11" textAnchor="middle" fill="#ffffff" fontFamily="monospace" fontWeight="bold">
                {flipPoles ? 'S' : 'N'}
              </text>
            </g>
          </svg>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setAutoShake((s) => !s)}
              className="min-h-[38px] px-3.5 py-1.5 rounded bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-serif font-bold inline-flex items-center gap-1.5"
            >
              {autoShake ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{autoShake ? 'หยุดเขย่า' : 'เขย่าแม่เหล็กเข้า-ออกอัตโนมัติ!'}</span>
            </button>

            <button
              type="button"
              onClick={() => setFlipPoles((f) => !f)}
              className="min-h-[38px] px-3 py-1.5 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-xs font-mono text-[var(--ink-primary)] hover:border-stone-500"
            >
              กลับขั้ว N ↔ S ({flipPoles ? 'N ซ้าย' : 'N ขวา'})
            </button>
          </div>

          <label className="space-y-1 block text-xs">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>เลื่อนแท่งแม่เหล็กเข้า–ออกขดลวด (ลากเร็วๆ หลอดไฟยิ่งสว่าง!)</span>
              <strong className="text-[var(--ink-primary)]">ฟลักซ์ Φ_B = {(curFlux * 100).toFixed(0)}%</strong>
            </div>
            <input
              type="range"
              min={70}
              max={295}
              step={2}
              value={Math.round(magnetX)}
              onChange={(e) => {
                setAutoShake(false);
                const next = parseFloat(e.target.value);
                setPrevMagnetX(magnetX);
                setMagnetX(next);
              }}
              className="bridge-slider w-full cursor-pointer"
            />
          </label>
        </>
      ) : (
        <>
          <svg viewBox="0 0 460 205" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
            <defs>
              <marker id="cy-v" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#16a34a" />
              </marker>
              <marker id="cy-f" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#dc2626" />
              </marker>
            </defs>

            {/* Uniform B-field grid */}
            {[60, 120, 180, 240, 300, 360, 410].flatMap((gx) =>
              [34, 78, 124, 168].map((gy) => (
                <text key={`${gx}-${gy}`} x={gx} y={gy} fontSize="11" fill="#0284c7" opacity="0.38" textAnchor="middle" fontFamily="monospace">
                  ×
                </text>
              ))
            )}
            <text x="16" y="20" fontSize="9.5" fill="#0284c7" fontFamily="monospace" fontWeight="bold">
              สนามแม่เหล็ก B = {bTesla.toFixed(1)} T (พุ่งเข้าหน้าจอ ×)
            </text>

            {/* Orbit circle */}
            <circle cx="230" cy="102" r={orbitR} fill="none" stroke="var(--ink-tertiary)" strokeWidth="1.4" strokeDasharray="4 3" />

            {/* Radius line */}
            <line x1="230" y1="102" x2={partX} y2={partY} stroke="#dc2626" strokeWidth="1.8" markerEnd="url(#cy-f)" />
            <text x={230 + (partX - 230) * 0.5} y={102 + (partY - 102) * 0.5 - 6} fontSize="9" fill="#dc2626" fontFamily="monospace" fontWeight="bold">
              F_B
            </text>

            {/* Velocity arrow */}
            <line
              x1={partX}
              y1={partY}
              x2={partX + velDirX * 26}
              y2={partY + velDirY * 26}
              stroke="#16a34a"
              strokeWidth="2.2"
              markerEnd="url(#cy-v)"
            />

            {/* Moving particle */}
            <circle cx={partX} cy={partY} r="7.5" fill={chargeSign > 0 ? '#dc2626' : '#0284c7'} stroke="var(--ink-primary)" strokeWidth="1.5" />
            <text x={partX} y={partY + 3.5} fontSize="10" textAnchor="middle" fill="#ffffff" fontFamily="monospace" fontWeight="bold">
              {chargeSign > 0 ? '+' : '−'}
            </text>
          </svg>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs items-center">
            <div className="flex gap-1.5 font-mono">
              <button
                type="button"
                onClick={() => setChargeSign(1)}
                className={`flex-1 py-1.5 rounded border ${chargeSign > 0 ? 'bg-rose-600 text-white border-rose-700 font-bold' : 'bg-[var(--surface-card)] text-[var(--ink-secondary)]'}`}
              >
                ประจุ +q (ทวนเข็ม)
              </button>
              <button
                type="button"
                onClick={() => setChargeSign(-1)}
                className={`flex-1 py-1.5 rounded border ${chargeSign < 0 ? 'bg-sky-600 text-white border-sky-700 font-bold' : 'bg-[var(--surface-card)] text-[var(--ink-secondary)]'}`}
              >
                ประจุ −q (ตามเข็ม)
              </button>
            </div>

            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>ความเร็ว v</span>
                <strong className="text-[var(--ink-primary)]">{speedV.toFixed(1)}×</strong>
              </div>
              <input type="range" min={1.5} max={6.0} step={0.5} value={speedV} onChange={(e) => setSpeedV(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
            </label>

            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>สนามแม่เหล็ก B</span>
                <strong className="text-[var(--ink-primary)]">{bTesla.toFixed(1)} T</strong>
              </div>
              <input type="range" min={0.5} max={2.5} step={0.1} value={bTesla} onChange={(e) => setBTesla(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
            </label>
          </div>
        </>
      )}

      <div className="p-2.5 rounded border border-amber-300/80 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/30 text-[11px] sm:text-xs text-amber-950 dark:text-amber-200 leading-relaxed flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <FormattedMathText
          text={
            mode === 'magnet-coil'
              ? 'เข็มทิศหันขนานกับเส้นแรงแม่เหล็ก ($N \\to S$) เสมอ และหลอดไฟจะ **สว่างเฉพาะตอนแม่เหล็กกำลังขยับเปลี่ยนฟลักซ์** ($|\\mathcal{E}| = |\\Delta\\Phi_B/\\Delta t|$) — ถ้าวางแม่เหล็กแช่นิ่งในขดลวด ฟลักซ์ไม่เปลี่ยน $\\implies$ ไฟดับ!'
              : 'แรงแม่เหล็ก $\\vec{F}_B = q\\vec{v}\\times\\vec{B}$ ตั้งฉากกับความเร็วตลอดเวลา จึงทำงาน $0\\text{ J}$ (อัตราเร็ว $v$ คงที่) และทำหน้าที่เป็นแรงสู่ศูนย์กลางให้วิ่งเป็นวงกลมรัศมี $r = \\frac{mv}{|q|B}$!'
          }
        />
      </div>
    </div>
  );
};
