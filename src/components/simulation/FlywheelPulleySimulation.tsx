// src/components/simulation/FlywheelPulleySimulation.tsx
'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { FlywheelSimulationParams, RIGID_BODY_PROFILES } from '@/types/simulation';

interface FlywheelPulleySimulationProps {
  params: FlywheelSimulationParams;
  onUpdateParams: (newParams: Partial<FlywheelSimulationParams>) => void;
  isPlaying: boolean;
  timeScale: number;
  onTelemetryUpdate: (data: {
    time: number;
    omega: number;
    alpha: number;
    theta: number;
    massY: number;
    massV: number;
    tension: number;
    kineticRot: number;
    kineticTrans: number;
    angularMomentum: number;
  }) => void;
}

export const FlywheelPulleySimulation: React.FC<FlywheelPulleySimulationProps> = ({
  params,
  onUpdateParams,
  isPlaying,
  timeScale,
  onTelemetryUpdate,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const stateRef = useRef({
    time: 0,
    theta: 0, // flywheel angle (rad)
    omega: 0, // angular velocity (rad/s)
    alpha: 0, // angular acceleration (rad/s^2)
    massY: 0.5, // hanging mass position (m from drum)
    massV: 0, // linear speed of hanging mass (m/s)
    tension: 0, // string tension (N)
    lastMouseAngle: 0,
    isDraggingFlywheel: false,
  });

  const resetSim = useCallback(() => {
    stateRef.current.time = 0;
    stateRef.current.theta = 0;
    stateRef.current.omega = 0;
    stateRef.current.alpha = 0;
    stateRef.current.massY = 0.5;
    stateRef.current.massV = 0;
    stateRef.current.tension = 0;
  }, []);

  useEffect(() => {
    resetSim();
  }, [params.flywheelMass, params.flywheelRadius, params.hangingMass, resetSim]);

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
      const borderCol = isDark ? '#272B35' : '#E5E2DA';

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      // System Constants
      const M = params.flywheelMass;
      const R = params.flywheelRadius;
      const r = params.drumRadius;
      const m = params.hangingMass;
      const g = params.gravity;
      const b = params.dampingCoeff;
      const tauExt = params.externalTorque;

      const prof = RIGID_BODY_PROFILES[params.shape] || RIGID_BODY_PROFILES.solid_cylinder;
      const I = prof.beta * M * R * R;

      // PHYSICS UPDATE
      if (isPlaying && !stateRef.current.isDraggingFlywheel) {
        const dtSim = dtReal * timeScale;
        const subSteps = 8;
        const dtSub = dtSim / subSteps;
        const state = stateRef.current;

        for (let s = 0; s < subSteps; s++) {
          // If hanging mass is attached and string is taut
          const netNumerator = m * g * r + tauExt - b * state.omega;
          const netDenominator = I + m * r * r;

          const calculatedAlpha = netNumerator / netDenominator;
          const calculatedA = calculatedAlpha * r;
          const calculatedTension = Math.max(0, m * (g - calculatedA));

          state.alpha = calculatedAlpha;
          state.tension = calculatedTension;
          state.omega += state.alpha * dtSub;
          state.theta += state.omega * dtSub;

          state.massV = state.omega * r;
          state.massY += state.massV * dtSub;
          state.time += dtSub;

          // Prevent mass from falling indefinitely (wrap around or bottom floor)
          if (state.massY > 4.5) {
            state.massY = 4.5;
            state.massV = 0;
            state.omega *= 0.5; // inelastic contact at floor
          } else if (state.massY < 0.1) {
            state.massY = 0.1;
            state.massV = 0;
            state.omega *= 0.5;
          }
        }

        const stateSnapshot = stateRef.current;
        const kRot = 0.5 * I * stateSnapshot.omega * stateSnapshot.omega;
        const kTrans = 0.5 * m * stateSnapshot.massV * stateSnapshot.massV;
        const L = I * stateSnapshot.omega;

        onTelemetryUpdate({
          time: stateSnapshot.time,
          omega: stateSnapshot.omega,
          alpha: stateSnapshot.alpha,
          theta: stateSnapshot.theta,
          massY: stateSnapshot.massY,
          massV: stateSnapshot.massV,
          tension: stateSnapshot.tension,
          kineticRot: kRot,
          kineticTrans: kTrans,
          angularMomentum: L,
        });
      }

      // =====================================================================
      // RENDERING FLYWHEEL SYSTEM
      // =====================================================================
      const flywheelCenterX = width * 0.42;
      const flywheelCenterY = height * 0.38;
      const radiusPixels = Math.min(130, Math.max(50, R * 220));
      const drumPixels = Math.max(20, (r / R) * radiusPixels);

      // 1. Structural Stand / Mounting Bracket
      ctx.strokeStyle = isDark ? '#334155' : '#CBD5E1';
      ctx.lineWidth = 6;
      ctx.beginPath();
      // Stand leg 1
      ctx.moveTo(flywheelCenterX, flywheelCenterY);
      ctx.lineTo(flywheelCenterX - 55, height - 35);
      // Stand leg 2
      ctx.moveTo(flywheelCenterX, flywheelCenterY);
      ctx.lineTo(flywheelCenterX + 55, height - 35);
      ctx.stroke();

      // Stand Base plate
      ctx.fillStyle = isDark ? '#1E293B' : '#94A3B8';
      ctx.fillRect(flywheelCenterX - 75, height - 35, 150, 10);

      // Floor line
      ctx.strokeStyle = borderCol;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(20, height - 25);
      ctx.lineTo(width - 20, height - 25);
      ctx.stroke();

      // 2. String spooling from Drum to Hanging Mass
      const drumTangentX = flywheelCenterX + drumPixels;
      const drumTangentY = flywheelCenterY;
      const massScreenY = Math.min(
        height - 65,
        flywheelCenterY + stateRef.current.massY * 65
      );

      ctx.strokeStyle = isDark ? '#E2E8F0' : '#475569';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(drumTangentX, drumTangentY);
      ctx.lineTo(drumTangentX, massScreenY);
      ctx.stroke();

      // Hanging Mass Block
      const blockWidth = 36;
      const blockHeight = 44;
      ctx.fillStyle = '#6366F1'; // Indigo
      ctx.fillRect(
        drumTangentX - blockWidth / 2,
        massScreenY,
        blockWidth,
        blockHeight
      );
      ctx.strokeStyle = isDark ? '#FFFFFF' : '#1E1B4B';
      ctx.lineWidth = 2;
      ctx.strokeRect(
        drumTangentX - blockWidth / 2,
        massScreenY,
        blockWidth,
        blockHeight
      );

      // Text on mass block
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 10px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${m.toFixed(1)}kg`, drumTangentX, massScreenY + 25);

      // String Tension Arrow
      if (stateRef.current.tension > 0.1) {
        ctx.strokeStyle = '#10B981';
        ctx.fillStyle = '#10B981';
        ctx.lineWidth = 2;
        const arrowLen = Math.min(30, stateRef.current.tension * 1.5);
        ctx.beginPath();
        ctx.moveTo(drumTangentX + 16, massScreenY + 10);
        ctx.lineTo(drumTangentX + 16, massScreenY + 10 - arrowLen);
        ctx.stroke();
        ctx.fillText(
          `T = ${stateRef.current.tension.toFixed(1)}N`,
          drumTangentX + 42,
          massScreenY + 10 - arrowLen / 2
        );
      }

      // 3. Flywheel Rotating Disk
      ctx.save();
      ctx.translate(flywheelCenterX, flywheelCenterY);
      ctx.rotate(stateRef.current.theta);

      // Outer Flywheel rim
      ctx.beginPath();
      ctx.arc(0, 0, radiusPixels, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? '#1E293B' : '#E2E8F0';
      ctx.fill();
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#0284C7'; // Cyan/Blue
      ctx.stroke();

      // Weighted rim mass
      ctx.beginPath();
      ctx.arc(0, 0, radiusPixels - 8, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? '#334155' : '#CBD5E1';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Flywheel Spokes
      const numSpokes = 6;
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.3)';
      ctx.lineWidth = 2.5;
      for (let i = 0; i < numSpokes; i++) {
        const spokeAng = (i * Math.PI * 2) / numSpokes;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(spokeAng) * radiusPixels, Math.sin(spokeAng) * radiusPixels);
        ctx.stroke();
      }

      // Inner Rope Drum
      ctx.beginPath();
      ctx.arc(0, 0, drumPixels, 0, Math.PI * 2);
      ctx.fillStyle = '#F59E0B'; // Amber drum
      ctx.fill();
      ctx.strokeStyle = '#B45309';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Center Hub Pin
      ctx.beginPath();
      ctx.arc(0, 0, 7, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? '#FFFFFF' : '#0F172A';
      ctx.fill();

      ctx.restore();

      // 4. External Torque Indicator Arc
      if (Math.abs(tauExt) > 0.05) {
        ctx.save();
        ctx.translate(flywheelCenterX, flywheelCenterY);
        ctx.beginPath();
        const arcR = radiusPixels + 18;
        const isClockwise = tauExt > 0;
        ctx.arc(0, 0, arcR, -Math.PI / 3, Math.PI / 3, !isClockwise);
        ctx.strokeStyle = '#EC4899';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fillStyle = '#EC4899';
        ctx.font = 'bold 11px Computer Modern, serif';
        ctx.fillText(`τ_ext = ${tauExt.toFixed(1)} N·m`, arcR + 10, 0);
        ctx.restore();
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [params, isPlaying, timeScale, onTelemetryUpdate]);

  // Mouse drag interaction to spin flywheel manually
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const cx = rect.width * 0.42;
    const cy = rect.height * 0.38;
    const dist = Math.hypot(px - cx, py - cy);

    if (dist < 140) {
      stateRef.current.isDraggingFlywheel = true;
      stateRef.current.lastMouseAngle = Math.atan2(py - cy, px - cx);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!stateRef.current.isDraggingFlywheel) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const cx = rect.width * 0.42;
    const cy = rect.height * 0.38;
    const currentAngle = Math.atan2(py - cy, px - cx);
    let deltaAngle = currentAngle - stateRef.current.lastMouseAngle;

    if (deltaAngle > Math.PI) deltaAngle -= Math.PI * 2;
    if (deltaAngle < -Math.PI) deltaAngle += Math.PI * 2;

    stateRef.current.theta += deltaAngle;
    stateRef.current.omega = deltaAngle * 30; // give impulse
    stateRef.current.lastMouseAngle = currentAngle;
  };

  const handlePointerUp = () => {
    stateRef.current.isDraggingFlywheel = false;
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
          💡 คลิกแล้วหมุนล้อด้วยเมาส์เพื่อปั่นล้อ • หรือกดปุ่มใส่ทอร์กภายนอก
        </span>
      </div>

      {/* Quick External Torque Injector buttons */}
      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 z-10">
        <button
          onClick={() => onUpdateParams({ externalTorque: params.externalTorque - 5 })}
          className="px-2 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-xs font-mono font-bold hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors shadow-2xs"
          title="ใส่ทอร์กทวนเข็มนาฬิกา"
        >
          -5 N·m
        </button>
        <button
          onClick={() => onUpdateParams({ externalTorque: 0 })}
          className="px-2 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-xs font-mono hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors shadow-2xs"
          title="หยุดทอร์กภายนอก"
        >
          τ = 0
        </button>
        <button
          onClick={() => onUpdateParams({ externalTorque: params.externalTorque + 5 })}
          className="px-2 py-1 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] text-xs font-mono font-bold hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors shadow-2xs"
          title="ใส่ทอร์กตามเข็มนาฬิกา"
        >
          +5 N·m
        </button>
      </div>
    </div>
  );
};
