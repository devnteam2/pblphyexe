// src/components/interactive/LightOpticsBenchLab.tsx
'use client';

import React, { useState } from 'react';
import { FormattedMathText } from '@/components/math/LatexRenderer';
import { Sun, Sparkles } from 'lucide-react';

type OpticsMode = 'bench' | 'prism';
type OpticKind = 'convex-lens' | 'concave-lens' | 'concave-mirror' | 'convex-mirror';

const RAINBOW_RAYS = [
  { name: 'แดง', color: '#dc2626', n: 1.508 },
  { name: 'ส้ม', color: '#f97316', n: 1.518 },
  { name: 'เหลือง', color: '#eab308', n: 1.528 },
  { name: 'เขียว', color: '#16a34a', n: 1.538 },
  { name: 'น้ำเงิน', color: '#0284c7', n: 1.550 },
  { name: 'ม่วง', color: '#9333ea', n: 1.564 },
];

export const LightOpticsBenchLab: React.FC = () => {
  const [mode, setMode] = useState<OpticsMode>('bench');

  // Mode 1: Mirrors & Thin Lenses
  const [opticKind, setOpticKind] = useState<OpticKind>('convex-lens');
  const [objU, setObjU] = useState<number>(20);
  const [absF, setAbsF] = useState<number>(10);
  const [objH, setObjH] = useState<number>(3.0);

  // Mode 2: Rainbow Prism Dispersion
  const [incDeg, setIncDeg] = useState<number>(48);
  const [apexDeg, setApexDeg] = useState<number>(60);

  const isMirror = opticKind === 'concave-mirror' || opticKind === 'convex-mirror';
  const isConverging = opticKind === 'convex-lens' || opticKind === 'concave-mirror';
  const signedF = isConverging ? absF : -absF;

  const scale = 5.4; // px per cm
  const centerX = 230;
  const axisY = 115;

  const denom = objU - signedF;
  const atFocus = Math.abs(denom) < 0.05;
  const imgV = atFocus ? 999 : (objU * signedF) / denom;
  const mag = atFocus ? 999 : -imgV / objU;
  const isReal = !atFocus && imgV > 0;

  // Position coordinates in SVG:
  // Object is always on left (x < centerX).
  // For lens: real v > 0 is on RIGHT (centerX + v*scale), virtual v < 0 is on LEFT (centerX + v*scale)
  // For mirror: real v > 0 reflects back to LEFT (centerX - v*scale), virtual v < 0 is behind mirror RIGHT (centerX - v*scale)
  const objX = centerX - objU * scale;
  const objTipY = axisY - objH * scale * 2.2;

  const rawImgX = isMirror ? centerX - imgV * scale : centerX + imgV * scale;
  const imgX = Math.max(18, Math.min(442, rawImgX));
  const rawImgTipY = axisY - mag * objH * scale * 2.2;
  const imgTipY = Math.max(18, Math.min(204, rawImgTipY));

  const focalLeftX = centerX - absF * scale;
  const focalRightX = centerX + absF * scale;

  return (
    <div className="space-y-3.5 font-serif">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--ink-primary)]">
          <Sun className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>ห้องทดลองแสง กระจกโค้ง เลนส์บาง &amp; ปริซึมรุ้ง</span>
        </div>

        {mode === 'bench' && (
          <span
            className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded border ${
              atFocus
                ? 'border-amber-500 text-amber-700 dark:text-amber-300 bg-amber-50/60 dark:bg-amber-950/30'
                : isReal
                  ? 'border-emerald-500 text-emerald-700 dark:text-emerald-300 bg-emerald-50/60 dark:bg-emerald-950/30'
                  : 'border-purple-500 text-purple-700 dark:text-purple-300 bg-purple-50/60 dark:bg-purple-950/30'
            }`}
          >
            {atFocus
              ? 'u = f: รังสีขนานไปอนันต์!'
              : `${isReal ? 'ภาพจริง' : 'ภาพเสมือน'} ${mag < 0 ? 'หัวกลับ' : 'หัวตั้ง'} (${Math.abs(mag).toFixed(2)}×)`}
          </span>
        )}
      </div>

      {/* Mode Switch */}
      <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
        <button
          type="button"
          onClick={() => setMode('bench')}
          className={`min-h-[36px] px-2 py-1.5 rounded border ${
            mode === 'bench'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
              : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
          }`}
        >
          1. รางแสงกระจก &amp; เลนส์ 4 ชนิด
        </button>
        <button
          type="button"
          onClick={() => setMode('prism')}
          className={`min-h-[36px] px-2 py-1.5 rounded border ${
            mode === 'prism'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
              : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
          }`}
        >
          2. ปริซึมกระจายแสง 6 สีรุ้ง (Dispersion)
        </button>
      </div>

      {/* SVG Optical Stage */}
      <svg viewBox="0 0 460 220" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
        <defs>
          <marker id="lo-obj" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#0284c7" />
          </marker>
          <marker id="lo-img-real" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#16a34a" />
          </marker>
          <marker id="lo-img-virt" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#9333ea" />
          </marker>
        </defs>

        {mode === 'bench' ? (
          <>
            {/* Optical Axis */}
            <line x1="12" y1={axisY} x2="448" y2={axisY} stroke="var(--ink-tertiary)" strokeWidth="1" strokeDasharray="3 3" />

            {/* Focal points */}
            {[
              { x: focalLeftX, lbl: 'F' },
              { x: centerX - 2 * absF * scale, lbl: '2F' },
              { x: focalRightX, lbl: "F'" },
              { x: centerX + 2 * absF * scale, lbl: "2F'" },
            ].map((pt) => (
              <g key={pt.lbl}>
                <circle cx={pt.x} cy={axisY} r="2.8" fill="#d97706" />
                <text x={pt.x} y={axisY + 13} fontSize="8.5" textAnchor="middle" fill="#d97706" fontFamily="monospace" fontWeight="bold">
                  {pt.lbl}
                </text>
              </g>
            ))}

            {/* Optic Element Shape at centerX */}
            {opticKind === 'convex-lens' && (
              <path
                d={`M ${centerX},26 Q ${centerX + 16},${axisY} ${centerX},204 Q ${centerX - 16},${axisY} ${centerX},26 Z`}
                fill="rgba(14, 165, 233, 0.16)"
                stroke="#0284c7"
                strokeWidth="2"
              />
            )}
            {opticKind === 'concave-lens' && (
              <path
                d={`M ${centerX - 12},26 Q ${centerX - 2},${axisY} ${centerX - 12},204 L ${centerX + 12},204 Q ${centerX + 2},${axisY} ${centerX + 12},26 Z`}
                fill="rgba(14, 165, 233, 0.16)"
                stroke="#0284c7"
                strokeWidth="2"
              />
            )}
            {opticKind === 'concave-mirror' && (
              <path
                d={`M ${centerX - 6},26 Q ${centerX + 14},${axisY} ${centerX - 6},204`}
                fill="none"
                stroke="var(--ink-primary)"
                strokeWidth="3.5"
              />
            )}
            {opticKind === 'convex-mirror' && (
              <path
                d={`M ${centerX + 6},26 Q ${centerX - 14},${axisY} ${centerX + 6},204`}
                fill="none"
                stroke="var(--ink-primary)"
                strokeWidth="3.5"
              />
            )}

            {/* Ray 1: Parallel to axis -> through focal point */}
            <line x1={objX} y1={objTipY} x2={centerX} y2={objTipY} stroke="#d97706" strokeWidth="1.6" />
            {!atFocus && (
              <>
                {isReal ? (
                  <>
                    <line x1={centerX} y1={objTipY} x2={imgX} y2={imgTipY} stroke="#d97706" strokeWidth="1.6" />
                    <line x1={objX} y1={objTipY} x2={imgX} y2={imgTipY} stroke="#dc2626" strokeWidth="1.5" opacity="0.8" />
                  </>
                ) : (
                  <>
                    {/* Forward diverging real ray continuation + dashed virtual back-trace */}
                    <line
                      x1={centerX}
                      y1={objTipY}
                      x2={isMirror ? 24 : 440}
                      y2={
                        objTipY +
                        ((objTipY - imgTipY) / Math.max(8, Math.abs(centerX - imgX))) *
                          (isMirror ? -(centerX - 24) : 440 - centerX) *
                          (isMirror ? (imgX > centerX ? -1 : 1) : 1)
                      }
                      stroke="#d97706"
                      strokeWidth="1.4"
                    />
                    <line x1={centerX} y1={objTipY} x2={imgX} y2={imgTipY} stroke="#9333ea" strokeWidth="1.4" strokeDasharray="3 3" />
                    <line x1={objX} y1={objTipY} x2={imgX} y2={imgTipY} stroke="#9333ea" strokeWidth="1.3" strokeDasharray="3 3" opacity="0.85" />
                  </>
                )}
              </>
            )}

            {/* Object Arrow */}
            <line x1={objX} y1={axisY} x2={objX} y2={objTipY} stroke="#0284c7" strokeWidth="3" markerEnd="url(#lo-obj)" />
            <text x={objX} y={objTipY - 6} fontSize="9.5" textAnchor="middle" fill="#0284c7" fontFamily="monospace" fontWeight="bold">
              วัตถุ
            </text>

            {/* Image Arrow (bounded smoothly) */}
            {!atFocus && rawImgX > 10 && rawImgX < 450 && (
              <>
                <line
                  x1={imgX}
                  y1={axisY}
                  x2={imgX}
                  y2={imgTipY}
                  stroke={isReal ? '#16a34a' : '#9333ea'}
                  strokeWidth="3"
                  strokeDasharray={isReal ? undefined : '4 2'}
                  markerEnd={isReal ? 'url(#lo-img-real)' : 'url(#lo-img-virt)'}
                />
                <text
                  x={imgX}
                  y={imgTipY < axisY ? imgTipY - 6 : imgTipY + 12}
                  fontSize="9.5"
                  textAnchor="middle"
                  fill={isReal ? '#16a34a' : '#9333ea'}
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {isReal ? 'ภาพจริง' : 'ภาพเสมือน'}
                </text>
              </>
            )}
          </>
        ) : (
          <>
            {/* Rainbow Prism Dispersion */}
            {(() => {
              const apexRad = (apexDeg * Math.PI) / 180;
              const halfA = apexRad / 2;
              const topX = 205;
              const topY = 36;
              const hPrism = 152;
              const baseHalfW = hPrism * Math.tan(halfA);
              const leftX = topX - baseHalfW;
              const rightX = topX + baseHalfW;
              const botY = topY + hPrism;

              // Left face normal outward angle: face goes from (topX,topY) down-left to (leftX,botY)
              // Outward normal points up-left at angle PI + halfA (from +x axis? Wait: slope angle = PI/2 + halfA, outward normal = PI + halfA - wait:)
              // Let's trace cleanly in 2D vectors:
              // Entry point P1 halfway down left face:
              const p1x = (topX + leftX) / 2;
              const p1y = (topY + botY) / 2;
              // Left face tangent down-left: (-sin(halfA), cos(halfA))
              // Left face outward normal up-left: (-cos(halfA), -sin(halfA))
              const n1x = -Math.cos(halfA);
              const n1y = -Math.sin(halfA);
              // Incident ray from left hits P1 with angle incDeg relative to normal (above normal toward horizontal)
              const theta1 = (incDeg * Math.PI) / 180;
              // Angle of inward normal (-n1) = (cos(halfA), sin(halfA)), i.e. angle +halfA
              // Incident vector tilted by -theta1 relative to inward normal so ray goes slightly upward-right into prism:
              const inDirAngle = halfA - theta1;
              const srcX = p1x - Math.cos(inDirAngle) * 115;
              const srcY = p1y - Math.sin(inDirAngle) * 115;
              void n1x;
              void n1y;

              return (
                <>
                  {/* Dark backdrop highlight for prism dispersion clarity */}
                  <rect x="0" y="0" width="460" height="220" fill="rgba(15, 23, 42, 0.90)" rx="4" />
                  <polygon
                    points={`${topX},${topY} ${leftX},${botY} ${rightX},${botY}`}
                    fill="rgba(148, 163, 184, 0.16)"
                    stroke="#e2e8f0"
                    strokeWidth="2"
                  />

                  {/* White incoming beam */}
                  <line x1={srcX} y1={srcY} x2={p1x} y2={p1y} stroke="#ffffff" strokeWidth="3.2" />
                  <text x="16" y="24" fontSize="10" fill="#f8fafc" fontFamily="monospace" fontWeight="bold">
                    แสงขาว (θ₁ = {incDeg}°, มุมปริซึม A = {apexDeg}°)
                  </text>

                  {/* Individual wavelength Snell traces */}
                  {RAINBOW_RAYS.map((ray) => {
                    const sinR1 = Math.sin(theta1) / ray.n;
                    const r1 = Math.asin(Math.min(0.99, sinR1));
                    // Inside prism angle relative to base/normal: r2 = A - r1
                    const r2 = apexRad - r1;
                    // Ray inside prism goes along angle halfA - r1
                    const insideAngle = halfA - r1;
                    // Approximate intercept on right face cleanly via line intersection with right face [(topX,topY)->(rightX,botY)]
                    const dxInside = Math.cos(insideAngle);
                    const dyInside = Math.sin(insideAngle);
                    const rxVec = rightX - topX;
                    const ryVec = botY - topY;
                    const det = dxInside * (-ryVec) - dyInside * (-rxVec);
                    const sParam =
                      Math.abs(det) > 1e-4
                        ? ((topX - p1x) * (-ryVec) - (topY - p1y) * (-rxVec)) / det
                        : 75;
                    const p2x = p1x + sParam * dxInside;
                    const p2y = p1y + sParam * dyInside;

                    const sinOut = ray.n * Math.sin(r2);
                    const tir = Math.abs(sinOut) > 1;
                    const thetaOut = tir ? 0 : Math.asin(sinOut);
                    // Exit ray angle tilted downward below right-face outward normal (-halfA)
                    const outAngle = -halfA + thetaOut;
                    const ex2 = p2x + Math.cos(outAngle) * 195;
                    const ey2 = p2y + Math.sin(outAngle) * 195;

                    return (
                      <g key={ray.name}>
                        <line x1={p1x} y1={p1y} x2={p2x} y2={p2y} stroke={ray.color} strokeWidth="1.6" opacity="0.8" />
                        {!tir && <line x1={p2x} y1={p2y} x2={ex2} y2={ey2} stroke={ray.color} strokeWidth="2.4" />}
                      </g>
                    );
                  })}

                  <text x="16" y="205" fontSize="9.5" fill="#cbd5e1" fontFamily="monospace">
                    ม่วง (n=1.56) หักเหเบนลงมากที่สุด • แดง (n=1.51) เบนน้อยที่สุด
                  </text>
                </>
              );
            })()}
          </>
        )}
      </svg>

      {/* Controls */}
      {mode === 'bench' ? (
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px] font-mono">
            {[
              { id: 'convex-lens' as const, label: 'เลนส์นูน (+f)' },
              { id: 'concave-lens' as const, label: 'เลนส์เว้า (-f)' },
              { id: 'concave-mirror' as const, label: 'กระจกเว้า (+f)' },
              { id: 'convex-mirror' as const, label: 'กระจกนูน (-f)' },
            ].map((k) => (
              <button
                key={k.id}
                type="button"
                onClick={() => setOpticKind(k.id)}
                className={`min-h-[34px] px-2 py-1 rounded border ${
                  opticKind === k.id
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
                    : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
                }`}
              >
                {k.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>ระยะวัตถุ u</span>
                <strong className="text-[var(--ink-primary)]">{objU} cm</strong>
              </div>
              <input type="range" min={4} max={36} step={1} value={objU} onChange={(e) => setObjU(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
            </label>
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>ความยาวโฟกัส |f|</span>
                <strong className="text-[var(--ink-primary)]">{absF} cm</strong>
              </div>
              <input type="range" min={6} max={16} step={1} value={absF} onChange={(e) => setAbsF(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
            </label>
            <label className="space-y-1">
              <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
                <span>ความสูงวัตถุ h₀</span>
                <strong className="text-[var(--ink-primary)]">{objH.toFixed(1)} cm</strong>
              </div>
              <input type="range" min={1.5} max={4.0} step={0.5} value={objH} onChange={(e) => setObjH(parseFloat(e.target.value))} className="bridge-slider w-full cursor-pointer" />
            </label>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
            <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
              <span className="block text-[10px] text-[var(--ink-tertiary)]">ระยะภาพ v</span>
              <strong className="text-sky-700 dark:text-sky-400">
                {atFocus ? '∞' : `${imgV.toFixed(1)} cm`}
              </strong>
            </div>
            <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
              <span className="block text-[10px] text-[var(--ink-tertiary)]">กำลังขยาย m</span>
              <strong className="text-amber-700 dark:text-amber-400">
                {atFocus ? '∞' : `${mag.toFixed(2)}×`}
              </strong>
            </div>
            <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
              <span className="block text-[10px] text-[var(--ink-tertiary)]">ตำแหน่งภาพ</span>
              <strong className="text-emerald-700 dark:text-emerald-400">
                {atFocus ? 'แสงขนาน' : isReal ? 'ด้านที่แสงไปจริง' : 'ภาพเสมือน'}
              </strong>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <label className="space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>มุมตกกระทบ θ₁</span>
              <strong className="text-[var(--ink-primary)]">{incDeg}°</strong>
            </div>
            <input type="range" min={25} max={75} step={1} value={incDeg} onChange={(e) => setIncDeg(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
          </label>
          <label className="space-y-1">
            <div className="flex justify-between font-mono text-[var(--ink-secondary)]">
              <span>มุมยอดปริซึม A</span>
              <strong className="text-[var(--ink-primary)]">{apexDeg}°</strong>
            </div>
            <input type="range" min={45} max={70} step={1} value={apexDeg} onChange={(e) => setApexDeg(parseInt(e.target.value, 10))} className="bridge-slider w-full cursor-pointer" />
          </label>
        </div>
      )}

      {/* Insight Callout */}
      <div className="p-2.5 rounded border border-amber-300/80 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/30 text-[11px] sm:text-xs text-amber-950 dark:text-amber-200 leading-relaxed flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <FormattedMathText
          text={'สมการกระจก/เลนส์บาง: $\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f}$ — จำง่ายๆ: ตัวรวมแสง (**เลนส์นูน / กระจกเว้า**) ใช้ $+f$ ตัวกระจายแสง (**เลนส์เว้า / กระจกนูน**) ใช้ $-f$ และฝั่งที่แสงวิ่งจริงให้ $v > 0$!'}
        />
      </div>
    </div>
  );
};
