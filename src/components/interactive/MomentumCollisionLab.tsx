// src/components/interactive/MomentumCollisionLab.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FormattedMathText } from '@/components/math/LatexRenderer';
import { Play, Pause, RotateCcw, Plus, Trash2, Sparkles } from 'lucide-react';

interface BlockConfig {
  id: number;
  label: string;
  color: string;
  mass: number;
  x0: number;
  v0: number;
}

interface SimBlock extends BlockConfig {
  x: number;
  v: number;
  width: number;
}

const DEFAULT_PALETTE = ['#0284c7', '#d97706', '#16a34a', '#9333ea'];
const LABELS = ['A', 'B', 'C', 'D'];

const INITIAL_CONFIGS: BlockConfig[] = [
  { id: 1, label: 'A', color: '#0284c7', mass: 4, x0: 22, v0: 6 },
  { id: 2, label: 'B', color: '#d97706', mass: 2, x0: 64, v0: -2 },
];

function blockWidthForMass(m: number): number {
  return 5.5 + Math.cbrt(m) * 2.2; // visual world-unit width
}

function toSimBlocks(cfgs: BlockConfig[]): SimBlock[] {
  return cfgs.map((c) => ({
    ...c,
    x: c.x0,
    v: c.v0,
    width: blockWidthForMass(c.mass),
  }));
}

export const MomentumCollisionLab: React.FC = () => {
  const [configs, setConfigs] = useState<BlockConfig[]>(INITIAL_CONFIGS);
  const [restitution, setRestitution] = useState<number>(1.0);
  const [wallBounce, setWallBounce] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const [simBlocks, setSimBlocks] = useState<SimBlock[]>(() => toSimBlocks(INITIAL_CONFIGS));
  const [simTime, setSimTime] = useState<number>(0);
  const [collisionCount, setCollisionCount] = useState<number>(0);

  const nextIdRef = useRef<number>(10);
  const blocksRef = useRef<SimBlock[]>(toSimBlocks(INITIAL_CONFIGS));
  const eRef = useRef<number>(restitution);
  const wallRef = useRef<boolean>(wallBounce);

  useEffect(() => {
    eRef.current = restitution;
  }, [restitution]);

  useEffect(() => {
    wallRef.current = wallBounce;
  }, [wallBounce]);

  useEffect(() => {
    if (!isRunning) return;
    let rafId = 0;
    let lastTs = performance.now();

    const step = (now: number) => {
      const dt = Math.min(0.03, (now - lastTs) / 1000);
      lastTs = now;
      const e = eRef.current;
      const bounceWalls = wallRef.current;

      // Sub-step integration for crisp collision handling
      const subSteps = 4;
      const subDt = dt / subSteps;
      let newCollisions = 0;
      const cur = blocksRef.current.map((b) => ({ ...b }));

      for (let s = 0; s < subSteps; s++) {
        for (let i = 0; i < cur.length; i++) {
          cur[i].x += cur[i].v * subDt;

          if (bounceWalls) {
            const halfW = cur[i].width / 2;
            if (cur[i].x - halfW < 2 && cur[i].v < 0) {
              cur[i].x = 2 + halfW;
              cur[i].v = -cur[i].v;
            } else if (cur[i].x + halfW > 98 && cur[i].v > 0) {
              cur[i].x = 98 - halfW;
              cur[i].v = -cur[i].v;
            }
          }
        }

        // Pairwise adjacent sorted collisions
        const order = cur.map((_, idx) => idx).sort((a, b) => cur[a].x - cur[b].x);
        for (let k = 0; k < order.length - 1; k++) {
          const i = order[k];
          const j = order[k + 1];
          const b1 = cur[i];
          const b2 = cur[j];
          const minSep = (b1.width + b2.width) / 2;
          const dist = b2.x - b1.x;

          if (dist <= minSep && b1.v > b2.v + 0.0005) {
            // Resolve overlap symmetrically
            const overlap = minSep - dist;
            b1.x -= overlap * 0.5;
            b2.x += overlap * 0.5;

            const m1 = b1.mass;
            const m2 = b2.mass;
            const u1 = b1.v;
            const u2 = b2.v;

            b1.v = (m1 * u1 + m2 * u2 - m2 * e * (u1 - u2)) / (m1 + m2);
            b2.v = (m1 * u1 + m2 * u2 + m1 * e * (u1 - u2)) / (m1 + m2);
            newCollisions++;
          }
        }
      }

      blocksRef.current = cur;
      setSimBlocks(cur);
      setSimTime((t) => t + dt);
      if (newCollisions > 0) {
        setCollisionCount((c) => c + newCollisions);
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isRunning]);

  const applyConfigAndReset = (nextConfigs: BlockConfig[]) => {
    setIsRunning(false);
    setConfigs(nextConfigs);
    const fresh = toSimBlocks(nextConfigs);
    blocksRef.current = fresh;
    setSimBlocks(fresh);
    setSimTime(0);
    setCollisionCount(0);
  };

  const handleResetPositions = () => {
    setIsRunning(false);
    const fresh = toSimBlocks(configs);
    blocksRef.current = fresh;
    setSimBlocks(fresh);
    setSimTime(0);
    setCollisionCount(0);
  };

  const handleAddBlock = () => {
    if (configs.length >= 4) return;
    const idx = configs.length;
    const maxExistingX = configs.reduce((mx, c) => Math.max(mx, c.x0), 15);
    const nextX = Math.min(88, Math.max(20, maxExistingX + 16));
    const nextBlock: BlockConfig = {
      id: nextIdRef.current++,
      label: LABELS[idx],
      color: DEFAULT_PALETTE[idx],
      mass: 3,
      x0: nextX,
      v0: idx % 2 === 0 ? 4 : -4,
    };
    applyConfigAndReset([...configs, nextBlock]);
  };

  const handleDeleteBlock = (id: number) => {
    if (configs.length <= 2) return;
    const remaining = configs
      .filter((c) => c.id !== id)
      .map((c, idx) => ({ ...c, label: LABELS[idx], color: DEFAULT_PALETTE[idx] }));
    applyConfigAndReset(remaining);
  };

  const handleUpdateBlock = (id: number, patch: Partial<BlockConfig>) => {
    const updated = configs.map((c) => (c.id === id ? { ...c, ...patch } : c));
    applyConfigAndReset(updated);
  };

  // Momentum & KE calculations
  const pInitial = configs.reduce((acc, b) => acc + b.mass * b.v0, 0);
  const pNow = simBlocks.reduce((acc, b) => acc + b.mass * b.v, 0);
  const kInitial = configs.reduce((acc, b) => acc + 0.5 * b.mass * b.v0 * b.v0, 0);
  const kNow = simBlocks.reduce((acc, b) => acc + 0.5 * b.mass * b.v * b.v, 0);
  const kLost = Math.max(0, kInitial - kNow);

  const toSvgX = (worldX: number) => 18 + (worldX / 100) * 444;

  return (
    <div className="space-y-3.5 font-serif">
      {/* Header & Track Options */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs sm:text-sm font-bold text-[var(--ink-primary)]">
          ห้องทดลองการชนและโมเมนตัม (เพิ่ม/ลบมวล &amp; ตั้งความเร็วอิสระ 2–4 ก้อน)
        </div>

        <button
          type="button"
          onClick={() => {
            setWallBounce((w) => !w);
          }}
          className={`px-2.5 py-1 rounded border text-[11px] font-mono transition-colors ${
            wallBounce
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
              : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
          }`}
        >
          กำแพงเด้งซ้าย-ขวา: {wallBounce ? 'เปิด (ON)' : 'ปิด (รางเปิดอิสระ)'}
        </button>
      </div>

      {/* Live Track SVG */}
      <svg viewBox="0 0 480 148" className="w-full h-auto rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
        <defs>
          <marker id="mom-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="var(--ink-primary)" />
          </marker>
        </defs>

        {/* Left & Right Wall indicators */}
        {wallBounce && (
          <>
            <rect x="6" y="20" width="12" height="96" fill="var(--surface-muted)" stroke="var(--ink-primary)" strokeWidth="1.5" />
            <rect x="462" y="20" width="12" height="96" fill="var(--surface-muted)" stroke="var(--ink-primary)" strokeWidth="1.5" />
          </>
        )}

        {/* Frictionless Track Rail */}
        <line x1="16" y1="116" x2="464" y2="116" stroke="var(--ink-primary)" strokeWidth="2.5" />

        {/* Status Text Top */}
        <text x="24" y="18" fontSize="9.5" fill="var(--ink-secondary)" fontFamily="monospace">
          t = {simTime.toFixed(2)} s • ชนแล้ว {collisionCount} ครั้ง • e = {restitution.toFixed(2)}
        </text>

        {/* Mass Blocks */}
        {simBlocks.map((b) => {
          const cx = toSvgX(b.x);
          const pw = (b.width / 100) * 444;
          const ph = Math.min(54, 24 + b.mass * 2.6);
          const topY = 116 - ph;
          const velLen = Math.max(-44, Math.min(44, b.v * 4.2));
          const isVisible = b.x >= -15 && b.x <= 115;
          if (!isVisible) return null;

          return (
            <g key={b.id}>
              <rect
                x={cx - pw / 2}
                y={topY}
                width={pw}
                height={ph}
                rx="3"
                fill={b.color}
                fillOpacity="0.22"
                stroke={b.color}
                strokeWidth="2.2"
              />
              <text x={cx} y={topY + ph * 0.45} fontSize="10" textAnchor="middle" fill="var(--ink-primary)" fontFamily="monospace" fontWeight="bold">
                {b.label} ({b.mass}kg)
              </text>
              <text x={cx} y={topY + ph * 0.8} fontSize="8.5" textAnchor="middle" fill={b.color} fontFamily="monospace" fontWeight="bold">
                v={b.v.toFixed(1)}
              </text>

              {Math.abs(b.v) > 0.15 && (
                <line
                  x1={cx}
                  y1={topY - 8}
                  x2={cx + velLen}
                  y2={topY - 8}
                  stroke="var(--ink-primary)"
                  strokeWidth="2"
                  markerEnd="url(#mom-arrow)"
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Play Controls & Restitution */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsRunning((r) => !r)}
            className="min-h-[40px] px-4 py-1.5 rounded bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs sm:text-sm font-serif font-bold inline-flex items-center gap-1.5 shadow-xs hover:opacity-90"
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isRunning ? 'หยุดชั่วคราว' : 'ปล่อยชน! (Run)'}</span>
          </button>

          <button
            type="button"
            onClick={handleResetPositions}
            className="min-h-[40px] px-3 py-1.5 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-xs font-serif text-[var(--ink-primary)] hover:border-stone-500 inline-flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>รีเซ็ต</span>
          </button>

          <button
            type="button"
            onClick={handleAddBlock}
            disabled={configs.length >= 4}
            className="min-h-[40px] px-3 py-1.5 rounded border border-sky-400/70 bg-sky-50/70 dark:bg-sky-950/40 text-xs font-serif font-semibold text-sky-900 dark:text-sky-200 disabled:opacity-40 inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>เพิ่มมวล ({configs.length}/4)</span>
          </button>
        </div>

        {/* Restitution presets */}
        <div className="flex flex-wrap gap-1 text-[11px] font-mono">
          {[
            { label: 'ยืดหยุ่น e=1', val: 1.0 },
            { label: 'กึ่ง e=0.5', val: 0.5 },
            { label: 'ชนติดกัน e=0', val: 0.0 },
          ].map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => setRestitution(preset.val)}
              className={`min-h-[34px] px-2.5 py-1 rounded border ${
                Math.abs(restitution - preset.val) < 0.05
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
                  : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)]'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Per-block Mass & Velocity Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {configs.map((b) => (
          <div
            key={b.id}
            className="p-3 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] space-y-2 text-xs"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 font-bold font-mono text-[var(--ink-primary)]">
                <span className="w-3 h-3 rounded-xs inline-block" style={{ backgroundColor: b.color }} />
                <span>ก้อนมวล {b.label}</span>
              </div>
              {configs.length > 2 && (
                <button
                  type="button"
                  onClick={() => handleDeleteBlock(b.id)}
                  className="px-2 py-0.5 rounded border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-[10px] font-mono inline-flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>ลบ</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <label className="space-y-1">
                <div className="flex justify-between font-mono text-[11px] text-[var(--ink-secondary)]">
                  <span>มวล m</span>
                  <strong className="text-[var(--ink-primary)]">{b.mass} kg</strong>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={b.mass}
                  onChange={(e) => handleUpdateBlock(b.id, { mass: parseInt(e.target.value, 10) })}
                  className="bridge-slider w-full cursor-pointer"
                />
              </label>

              <label className="space-y-1">
                <div className="flex justify-between font-mono text-[11px] text-[var(--ink-secondary)]">
                  <span>ความเร็วต้น v₀</span>
                  <strong className="text-[var(--ink-primary)]">{b.v0 > 0 ? `+${b.v0}` : b.v0} m/s</strong>
                </div>
                <input
                  type="range"
                  min={-10}
                  max={10}
                  step={1}
                  value={b.v0}
                  onChange={(e) => handleUpdateBlock(b.id, { v0: parseInt(e.target.value, 10) })}
                  className="bridge-slider w-full cursor-pointer"
                />
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Live Conservation Telemetry */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">โมเมนตัมรวม P (เริ่มต้น → ตอนนี้)</span>
          <span className="font-mono font-bold text-sky-700 dark:text-sky-400">
            {pInitial.toFixed(1)} → {pNow.toFixed(1)} kg·m/s
          </span>
        </div>
        <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">พลังงานจลน์รวม K (เริ่มต้น → ตอนนี้)</span>
          <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
            {kInitial.toFixed(1)} → {kNow.toFixed(1)} J
          </span>
        </div>
        <div className="p-2 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)]">
          <span className="block text-[10px] text-[var(--ink-tertiary)] font-mono">ความร้อนที่สูญเสีย ΔK</span>
          <span className="font-mono font-bold text-rose-700 dark:text-rose-400">{kLost.toFixed(1)} J</span>
        </div>
      </div>

      <div className="p-2.5 rounded border border-amber-300/80 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/30 text-[11px] sm:text-xs text-amber-950 dark:text-amber-200 leading-relaxed flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <FormattedMathText
          text={'สังเกตค่า **โมเมนตัมรวม** $\\sum m_i v_i$ จะคงที่เป๊ะเสมอเมื่อไม่มีแรงภายนอก (เปิดรางอิสระ) ไม่ว่าคุณจะปรับค่าคืนตัว $e = 1$ (ยืดหยุ่น) หรือ $e = 0$ (ชนติดกัน) — แต่พลังงานจลน์ $K$ จะหายไปกลายเป็นความร้อนเมื่อ $e < 1$!'}
        />
      </div>
    </div>
  );
};
