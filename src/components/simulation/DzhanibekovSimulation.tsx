// src/components/simulation/DzhanibekovSimulation.tsx
'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { DzhanibekovParams } from '@/types/simulation';

interface DzhanibekovSimulationProps {
  params: DzhanibekovParams;
  onUpdateParams: (newParams: Partial<DzhanibekovParams>) => void;
  isPlaying: boolean;
  timeScale: number;
  onTelemetryUpdate: (data: {
    time: number;
    w1: number;
    w2: number;
    w3: number;
    energy: number;
    angularMomentumSq: number;
  }) => void;
}

// 4D Quaternion for 3D rotation without gimbal lock
type Quaternion = [number, number, number, number]; // [w, x, y, z]

function quatMultiply(q1: Quaternion, q2: Quaternion): Quaternion {
  const [w1, x1, y1, z1] = q1;
  const [w2, x2, y2, z2] = q2;
  return [
    w1 * w2 - x1 * x2 - y1 * y2 - z1 * z2,
    w1 * x2 + x1 * w2 + y1 * z2 - z1 * y2,
    w1 * y2 - x1 * z2 + y1 * w2 + z1 * x2,
    w1 * z2 + x1 * y2 - y1 * x2 + z1 * w2,
  ];
}

function quatNormalize(q: Quaternion): Quaternion {
  const len = Math.hypot(q[0], q[1], q[2], q[3]);
  if (len === 0) return [1, 0, 0, 0];
  return [q[0] / len, q[1] / len, q[2] / len, q[3] / len];
}

function rotateVectorByQuat(v: [number, number, number], q: Quaternion): [number, number, number] {
  const [vx, vy, vz] = v;
  const [qw, qx, qy, qz] = q;

  const ix = qw * vx + qy * vz - qz * vy;
  const iy = qw * vy + qz * vx - qx * vz;
  const iz = qw * vz + qx * vy - qy * vx;
  const iw = -qx * vx - qy * vy - qz * vz;

  return [
    ix * qw + iw * -qx + iy * -qz - iz * -qy,
    iy * qw + iw * -qy + iz * -qx - ix * -qz,
    iz * qw + iw * -qz + ix * -qy - iy * -qx,
  ];
}

export const DzhanibekovSimulation: React.FC<DzhanibekovSimulationProps> = ({
  params,
  isPlaying,
  timeScale,
  onTelemetryUpdate,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const stateRef = useRef({
    time: 0,
    w: [params.omega1, params.omega2, params.omega3] as [number, number, number],
    q: [1, 0, 0, 0] as Quaternion,
  });

  const resetSim = useCallback((axis: 1 | 2 | 3 = 2) => {
    stateRef.current.time = 0;
    stateRef.current.q = [1, 0, 0, 0];
    if (axis === 1) {
      stateRef.current.w = [6.0, 0.05, 0.05];
    } else if (axis === 2) {
      // Intermediate axis (Dzhanibekov flip): strong spin on w2 + tiny perturbation
      stateRef.current.w = [0.05, 6.0, 0.05];
    } else {
      stateRef.current.w = [0.05, 0.05, 6.0];
    }
  }, []);

  useEffect(() => {
    stateRef.current.w = [params.omega1, params.omega2, params.omega3];
  }, [params.omega1, params.omega2, params.omega3]);

  // Main Loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const render = (now: number) => {
      const dtReal = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const canvas = canvasRef.current;
      if (!canvas) {
        animId = requestAnimationFrame(render);
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        animId = requestAnimationFrame(render);
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const isDark =
        document.documentElement.classList.contains('theme-blackboard') ||
        document.body.classList.contains('theme-blackboard');

      const bgColor = isDark ? '#0F1115' : '#FBF9F4';
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      // System Moments of Inertia: I1 < I2 < I3
      const { I1, I2, I3 } = params;

      // EULER'S EQUATIONS RK4 INTEGRATION
      if (isPlaying) {
        const dtSim = dtReal * timeScale;
        const subSteps = 12;
        const dtSub = dtSim / subSteps;
        const state = stateRef.current;

        const getDW = (w: [number, number, number]): [number, number, number] => {
          return [
            ((I2 - I3) / I1) * w[1] * w[2],
            ((I3 - I1) / I2) * w[2] * w[0],
            ((I1 - I2) / I3) * w[0] * w[1],
          ];
        };

        for (let s = 0; s < subSteps; s++) {
          const w = state.w;
          // RK4 for w
          const k1 = getDW(w);
          const wK2: [number, number, number] = [
            w[0] + 0.5 * dtSub * k1[0],
            w[1] + 0.5 * dtSub * k1[1],
            w[2] + 0.5 * dtSub * k1[2],
          ];
          const k2 = getDW(wK2);
          const wK3: [number, number, number] = [
            w[0] + 0.5 * dtSub * k2[0],
            w[1] + 0.5 * dtSub * k2[1],
            w[2] + 0.5 * dtSub * k2[2],
          ];
          const k3 = getDW(wK3);
          const wK4: [number, number, number] = [
            w[0] + dtSub * k3[0],
            w[1] + dtSub * k3[1],
            w[2] + dtSub * k3[2],
          ];
          const k4 = getDW(wK4);

          state.w = [
            w[0] + (dtSub / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]),
            w[1] + (dtSub / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]),
            w[2] + (dtSub / 6) * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]),
          ];

          // Quaternion orientation update: dq/dt = 0.5 * q * [0, w]
          const qW: Quaternion = [0, state.w[0], state.w[1], state.w[2]];
          const qDeriv = quatMultiply(state.q, qW);
          state.q = quatNormalize([
            state.q[0] + 0.5 * dtSub * qDeriv[0],
            state.q[1] + 0.5 * dtSub * qDeriv[1],
            state.q[2] + 0.5 * dtSub * qDeriv[2],
            state.q[3] + 0.5 * dtSub * qDeriv[3],
          ]);

          state.time += dtSub;
        }

        const energy =
          I1 * state.w[0] * state.w[0] +
          I2 * state.w[1] * state.w[1] +
          I3 * state.w[2] * state.w[2];
        const Lsq =
          Math.pow(I1 * state.w[0], 2) +
          Math.pow(I2 * state.w[1], 2) +
          Math.pow(I3 * state.w[2], 2);

        onTelemetryUpdate({
          time: state.time,
          w1: state.w[0],
          w2: state.w[1],
          w3: state.w[2],
          energy: 0.5 * energy,
          angularMomentumSq: Lsq,
        });
      }

      // =====================================================================
      // 3D PERSPECTIVE RENDERING ON CANVAS
      // =====================================================================
      const centerX = width * 0.5;
      const centerY = height * 0.48;
      const fov = 350;
      const cameraDist = 450;

      const project3D = (pt: [number, number, number]): [number, number] => {
        const z = pt[2] + cameraDist;
        const scale = fov / Math.max(50, z);
        return [centerX + pt[0] * scale, centerY - pt[1] * scale];
      };

      // Transform rigid body vertices:
      // T-handle geometry:
      // 1. Main shaft along Y axis (length 180, radius 12)
      // 2. Cross bar along X axis (length 140, radius 14)
      // 3. Small wing nut along Z axis (length 40)
      const q = stateRef.current.q;

      // Draw Principal Axes Coordinate Frame
      const axisLen = 120;
      const axes = [
        { dir: [axisLen, 0, 0] as [number, number, number], col: '#EF4444', label: 'Axis 1 (I_min)' },
        { dir: [0, axisLen, 0] as [number, number, number], col: '#10B981', label: 'Axis 2 (I_mid - Unstable)' },
        { dir: [0, 0, axisLen] as [number, number, number], col: '#3B82F6', label: 'Axis 3 (I_max)' },
      ];

      axes.forEach((ax) => {
        const rotDir = rotateVectorByQuat(ax.dir, q);
        const [px, py] = project3D(rotDir);
        ctx.strokeStyle = ax.col;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(px, py);
        ctx.stroke();

        ctx.fillStyle = ax.col;
        ctx.font = 'bold 9px ui-monospace, monospace';
        ctx.fillText(ax.label, px + 5, py + 3);
      });

      // Draw T-Handle 3D Solid Model
      // Define edges of the T-handle in local body coordinates
      const shaftLen = 110;
      const crossLen = 80;

      const pShaftTop: [number, number, number] = [0, shaftLen * 0.4, 0];
      const pShaftBottom: [number, number, number] = [0, -shaftLen * 0.8, 0];
      const pCrossLeft: [number, number, number] = [-crossLen, shaftLen * 0.4, 0];
      const pCrossRight: [number, number, number] = [crossLen, shaftLen * 0.4, 0];
      const pWingFront: [number, number, number] = [0, 0, 35];
      const pWingBack: [number, number, number] = [0, 0, -35];

      const rShaftTop = rotateVectorByQuat(pShaftTop, q);
      const rShaftBottom = rotateVectorByQuat(pShaftBottom, q);
      const rCrossLeft = rotateVectorByQuat(pCrossLeft, q);
      const rCrossRight = rotateVectorByQuat(pCrossRight, q);
      const rWingFront = rotateVectorByQuat(pWingFront, q);
      const rWingBack = rotateVectorByQuat(pWingBack, q);

      const [sTopX, sTopY] = project3D(rShaftTop);
      const [sBotX, sBotY] = project3D(rShaftBottom);
      const [cLeftX, cLeftY] = project3D(rCrossLeft);
      const [cRightX, cRightY] = project3D(rCrossRight);
      const [wFrontX, wFrontY] = project3D(rWingFront);
      const [wBackX, wBackY] = project3D(rWingBack);

      // Main Vertical Stem
      ctx.strokeStyle = '#D97706';
      ctx.lineWidth = 9;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(sTopX, sTopY);
      ctx.lineTo(sBotX, sBotY);
      ctx.stroke();

      // Top Crossbar
      ctx.strokeStyle = '#2563EB';
      ctx.lineWidth = 11;
      ctx.beginPath();
      ctx.moveTo(cLeftX, cLeftY);
      ctx.lineTo(cRightX, cRightY);
      ctx.stroke();

      // Wing Pin
      ctx.strokeStyle = '#EC4899';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(wFrontX, wFrontY);
      ctx.lineTo(wBackX, wBackY);
      ctx.stroke();

      // Center of Mass Hub
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [params, isPlaying, timeScale, onTelemetryUpdate]);

  return (
    <div className="relative w-full rounded-lg border border-[var(--hairline-border)] bg-[var(--surface-card)] overflow-hidden shadow-xs">
      <canvas
        ref={canvasRef}
        className="w-full h-[360px] sm:h-[400px] block"
      />

      <div className="absolute top-2.5 left-3 pointer-events-none">
        <span className="px-2 py-0.5 rounded text-[10px] font-mono border border-[var(--hairline-border)] bg-[var(--surface-card)]/90 backdrop-blur-xs text-[var(--ink-secondary)] shadow-2xs">
          💡 สังเกตการณ์หมุนรอบแกนกลาง (Axis 2) ซึ่งจะพลิกตัวกลับ 180° ซ้ำไปมาตามกฎออยเลอร์
        </span>
      </div>

      {/* Preset Action Buttons to spin around specific principal axes */}
      <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-2 z-10">
        <button
          onClick={() => resetSim(1)}
          className="px-2.5 py-1 rounded border border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 text-xs font-mono font-bold hover:brightness-105 transition-all shadow-2xs"
          title="หมุนรอบแกน I_min (เสถียร)"
        >
          หมุนรอบแกน 1 (เสถียร)
        </button>
        <button
          onClick={() => resetSim(2)}
          className="px-2.5 py-1 rounded border border-emerald-400 dark:border-emerald-700 bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 text-xs font-mono font-bold hover:brightness-105 transition-all shadow-2xs animate-pulse"
          title="หมุนรอบแกน I_mid (เกิดการพลิกตัวแบบ Dzhanibekov!)"
        >
          ⚡ ปั่นแกน 2 (Dzhanibekov Flip!)
        </button>
        <button
          onClick={() => resetSim(3)}
          className="px-2.5 py-1 rounded border border-sky-300 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 text-xs font-mono font-bold hover:brightness-105 transition-all shadow-2xs"
          title="หมุนรอบแกน I_max (เสถียร)"
        >
          หมุนรอบแกน 3 (เสถียร)
        </button>
      </div>
    </div>
  );
};
