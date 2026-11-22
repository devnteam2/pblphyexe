// src/components/simulation/CompoundPendulumSimulation.tsx
'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { CompoundPendulumParams } from '@/types/simulation';

interface CompoundPendulumSimulationProps {
  params: CompoundPendulumParams;
  onUpdateParams: (newParams: Partial<CompoundPendulumParams>) => void;
  isPlaying: boolean;
  timeScale: number;
  onTelemetryUpdate: (data: {
    time: number;
    angle: number;
    omega: number;
    alpha: number;
    period: number;
    centerOfPercussion: number;
    kineticRot: number;
    potentialE: number;
    totalE: number;
    I_pivot: number;
  }) => void;
}

export const CompoundPendulumSimulation: React.FC<CompoundPendulumSimulationProps> = ({
  params,
  onUpdateParams,
  isPlaying,
  timeScale,
  onTelemetryUpdate,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const stateRef = useRef({
    time: 0,
    angle: (params.initialAngleDeg * Math.PI) / 180, // radians
    omega: 0, // rad/s
    alpha: 0, // rad/s^2
    isDraggingBody: false,
    isDraggingPivot: false,
  });

  const resetSim = useCallback(() => {
    stateRef.current.time = 0;
    stateRef.current.angle = (params.initialAngleDeg * Math.PI) / 180;
    stateRef.current.omega = 0;
    stateRef.current.alpha = 0;
  }, [params.initialAngleDeg]);

  useEffect(() => {
    resetSim();
  }, [params.shape, params.length, params.pivotOffset, resetSim]);

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
      const textColor = isDark ? '#F1F5F9' : '#1C1917';
      const borderCol = isDark ? '#272B35' : '#E5E2DA';

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      // System Physics Variables
      const M = params.mass;
      const L = params.length;
      const d = Math.max(0.01, params.pivotOffset); // offset from CM to pivot
      const g = params.gravity;
      const b = params.dampingCoeff;

      // CM moment of inertia depending on shape
      let I_cm = (1 / 12) * M * L * L;
      if (params.shape === 'disk') {
        I_cm = 0.5 * M * (L / 2) * (L / 2);
      } else if (params.shape === 'ring') {
        I_cm = M * (L / 2) * (L / 2);
      }

      // Parallel-Axis Theorem
      const I_pivot = I_cm + M * d * d;

      // Center of Percussion / Oscillation Leq = I_pivot / (M * d)
      const Leq = I_pivot / (M * d);
      const smallAnglePeriod = 2 * Math.PI * Math.sqrt(Leq / g);

      // Physics Integration (Runge-Kutta 4 or Euler-Cromer)
      if (isPlaying && !stateRef.current.isDraggingBody && !stateRef.current.isDraggingPivot) {
        const dtSim = dtReal * timeScale;
        const subSteps = 10;
        const dtSub = dtSim / subSteps;
        const state = stateRef.current;

        for (let s = 0; s < subSteps; s++) {
          // Torque = - M * g * d * sin(theta) - b * omega
          const torque = -M * g * d * Math.sin(state.angle) - b * state.omega;
          state.alpha = torque / I_pivot;
          state.omega += state.alpha * dtSub;
          state.angle += state.omega * dtSub;
          state.time += dtSub;
        }

        const stateSnapshot = stateRef.current;
        const kRot = 0.5 * I_pivot * stateSnapshot.omega * stateSnapshot.omega;
        // Potential relative to lowest point
        const uPot = M * g * d * (1 - Math.cos(stateSnapshot.angle));

        onTelemetryUpdate({
          time: stateSnapshot.time,
          angle: stateSnapshot.angle,
          omega: stateSnapshot.omega,
          alpha: stateSnapshot.alpha,
          period: smallAnglePeriod,
          centerOfPercussion: Leq,
          kineticRot: kRot,
          potentialE: uPot,
          totalE: kRot + uPot,
          I_pivot,
        });
      }

      // =====================================================================
      // RENDERING COMPOUND PENDULUM
      // =====================================================================
      const pivotScreenX = width * 0.5;
      const pivotScreenY = 70;
      const lengthPixels = Math.min(220, Math.max(100, L * 180));
      const pixelsPerMeter = lengthPixels / L;
      const dPixels = d * pixelsPerMeter;
      const LeqPixels = Math.min(lengthPixels * 1.5, Leq * pixelsPerMeter);

      // 1. Pivot Ceiling Mount
      ctx.fillStyle = isDark ? '#1E293B' : '#CBD5E1';
      ctx.fillRect(pivotScreenX - 50, pivotScreenY - 20, 100, 16);
      ctx.strokeStyle = borderCol;
      ctx.strokeRect(pivotScreenX - 50, pivotScreenY - 20, 100, 16);

      // Ceiling Hatching
      ctx.strokeStyle = isDark ? '#334155' : '#94A3B8';
      ctx.lineWidth = 1;
      for (let x = pivotScreenX - 45; x <= pivotScreenX + 45; x += 10) {
        ctx.beginPath();
        ctx.moveTo(x, pivotScreenY - 20);
        ctx.lineTo(x + 6, pivotScreenY - 26);
        ctx.stroke();
      }

      // Vertical Reference Dash Line
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(pivotScreenX, pivotScreenY);
      ctx.lineTo(pivotScreenX, pivotScreenY + lengthPixels + 40);
      ctx.stroke();
      ctx.setLineDash([]);

      // 2. Pendulum Body in Rotated Frame
      ctx.save();
      ctx.translate(pivotScreenX, pivotScreenY);
      ctx.rotate(stateRef.current.angle);

      // The body extends from pivot:
      // CM is at distance +d down along the centerline!
      // If uniform rod of length L, rod top is at (d - L/2) and bottom is at (d + L/2).
      const rodTop = -(L / 2 - d) * pixelsPerMeter;
      const rodWidth = 24;

      if (params.shape === 'rod') {
        // Uniform Rod
        ctx.fillStyle = isDark ? '#334155' : '#E2E8F0';
        ctx.strokeStyle = '#0284C7';
        ctx.lineWidth = 2.5;

        ctx.beginPath();
        ctx.roundRect(-rodWidth / 2, rodTop, rodWidth, lengthPixels, 10);
        ctx.fill();
        ctx.stroke();
      } else if (params.shape === 'disk') {
        // Disk mounted at distance d from CM
        const diskRadius = (lengthPixels / 2) * 0.8;
        ctx.fillStyle = isDark ? '#1E293B' : '#E2E8F0';
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 3;

        // Arm from pivot to disk
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, dPixels);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, dPixels, diskRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      // Draw Center of Mass (CM) Dot (Red)
      ctx.fillStyle = '#EF4444';
      ctx.beginPath();
      ctx.arc(0, dPixels, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = textColor;
      ctx.font = 'bold 10px Computer Modern, serif';
      ctx.textAlign = 'left';
      ctx.fillText('CM (G)', 8, dPixels + 3);

      // Draw Center of Percussion (Sweet Spot, Leq) Star / Golden Dot
      ctx.fillStyle = '#F59E0B'; // Amber
      ctx.beginPath();
      ctx.arc(0, LeqPixels, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#B45309';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#F59E0B';
      ctx.font = 'bold 10px Computer Modern, serif';
      ctx.fillText('Sweet Spot (Leq)', 10, LeqPixels + 4);

      // Draw Pivot Pin (Blue)
      ctx.fillStyle = '#0284C7';
      ctx.beginPath();
      ctx.arc(0, 0, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();

      // 3. Angle Arc Indicator
      const arcR = 40;
      ctx.strokeStyle = '#D97706';
      ctx.lineWidth = 2;
      ctx.beginPath();
      const currentAngle = stateRef.current.angle;
      if (currentAngle >= 0) {
        ctx.arc(pivotScreenX, pivotScreenY, arcR, Math.PI / 2, Math.PI / 2 + currentAngle, false);
      } else {
        ctx.arc(pivotScreenX, pivotScreenY, arcR, Math.PI / 2 + currentAngle, Math.PI / 2, false);
      }
      ctx.stroke();

      ctx.fillStyle = '#D97706';
      ctx.font = 'bold 11px Computer Modern, serif';
      ctx.textAlign = 'center';
      const degText = `${((currentAngle * 180) / Math.PI).toFixed(1)}°`;
      ctx.fillText(degText, pivotScreenX + Math.sin(currentAngle / 2) * (arcR + 14), pivotScreenY + Math.cos(currentAngle / 2) * (arcR + 14));

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [params, isPlaying, timeScale, onTelemetryUpdate]);

  // Pointer Drag: Move pivot offset d or set angle theta
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const pivotX = rect.width * 0.5;
    const pivotY = 70;

    const distFromPivot = Math.hypot(px - pivotX, py - pivotY);
    if (distFromPivot < 20) {
      // User can drag pivot point to adjust offset d
      stateRef.current.isDraggingPivot = true;
      return;
    }

    // Otherwise dragging pendulum angle
    stateRef.current.isDraggingBody = true;
    const angle = Math.atan2(px - pivotX, py - pivotY);
    stateRef.current.angle = angle;
    stateRef.current.omega = 0;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const pivotX = rect.width * 0.5;
    const pivotY = 70;

    if (stateRef.current.isDraggingPivot) {
      // Adjust pivot offset d
      const newD = Math.max(0.02, Math.min(params.length * 0.45, (py - pivotY) / 180));
      onUpdateParams({ pivotOffset: newD });
    } else if (stateRef.current.isDraggingBody) {
      const angle = Math.atan2(px - pivotX, py - pivotY);
      stateRef.current.angle = angle;
      stateRef.current.omega = 0;
    }
  };

  const handlePointerUp = () => {
    stateRef.current.isDraggingBody = false;
    stateRef.current.isDraggingPivot = false;
  };

  return (
    <div className="relative w-full rounded-lg border border-[var(--hairline-border)] bg-[var(--surface-card)] overflow-hidden shadow-xs">
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="w-full h-[360px] sm:h-[400px] block cursor-grab active:cursor-grabbing touch-none"
      />

      <div className="absolute top-2.5 left-3 pointer-events-none">
        <span className="px-2 py-0.5 rounded text-[10px] font-mono border border-[var(--hairline-border)] bg-[var(--surface-card)]/90 backdrop-blur-xs text-[var(--ink-secondary)] shadow-2xs">
          💡 ลากปลายวัตถุเพื่อตั้งมุมแกว่ง • ลากจุดหมุนสีน้ำเงินเพื่อเปลี่ยนระยะ d
        </span>
      </div>
    </div>
  );
};
