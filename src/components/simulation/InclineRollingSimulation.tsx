// src/components/simulation/InclineRollingSimulation.tsx
'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  RigidBodyShape,
  RIGID_BODY_PROFILES,
  InclineSimulationParams,
} from '@/types/simulation';

interface InclineRollingSimulationProps {
  params: InclineSimulationParams;
  onUpdateParams: (newParams: Partial<InclineSimulationParams>) => void;
  isPlaying: boolean;
  timeScale: number;
  showVectors: boolean;
  showCycloid: boolean;
  showFBD: boolean;
  showVelocityBreakdown: boolean;
  onTelemetryUpdate: (data: {
    time: number;
    v: number;
    omega: number;
    x: number;
    height: number;
    a: number;
    alpha: number;
    isSlipping: boolean;
    reqFriction: number;
    maxStaticFriction: number;
    normalForce: number;
    kTrans: number;
    kRot: number;
    potentialE: number;
    workFriction: number;
  }) => void;
}

interface RacerState {
  shape: RigidBodyShape;
  beta: number;
  nameTh: string;
  color: string;
  x: number; // distance down the slope (m)
  v: number; // linear speed down the slope (m/s)
  omega: number; // angular speed (rad/s)
  angle: number; // rotation angle (rad)
  a: number;
  alpha: number;
  isSlipping: boolean;
  finished: boolean;
  finishTime: number | null;
}

export const InclineRollingSimulation: React.FC<InclineRollingSimulationProps> = ({
  params,
  onUpdateParams,
  isPlaying,
  timeScale,
  showVectors,
  showCycloid,
  showFBD,
  showVelocityBreakdown,
  onTelemetryUpdate,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Simulation State
  const simStateRef = useRef({
    time: 0,
    x: 0, // distance down the slope (m)
    v: params.initialVelocity,
    omega: params.initialAngularVelocity,
    angle: 0, // rotation angle (rad)
    a: 0,
    alpha: 0,
    isSlipping: false,
    workFriction: 0,
    cycloidPoints: [] as { x: number; y: number }[],
    // Multi-body racers
    racers: [] as RacerState[],
  });

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragTargetRef = useRef<'angle' | 'body' | null>(null);

  // Initialize Racers
  const resetRacers = useCallback(() => {
    const list: RigidBodyShape[] = [
      'solid_sphere',
      'solid_cylinder',
      'hollow_sphere',
      'thin_hoop',
      'custom',
    ];
    simStateRef.current.racers = list.map((shape) => {
      const prof = RIGID_BODY_PROFILES[shape];
      const beta = shape === 'custom' ? params.customBeta : prof.beta;
      return {
        shape,
        beta,
        nameTh: prof.nameTh.split(' ')[0],
        color: prof.color,
        x: 0,
        v: 0,
        omega: 0,
        angle: 0,
        a: 0,
        alpha: 0,
        isSlipping: false,
        finished: false,
        finishTime: null,
      };
    });
  }, [params.customBeta]);

  // Reset simulation when params change or reset called
  const resetSim = useCallback(() => {
    simStateRef.current.time = 0;
    simStateRef.current.x = 0;
    simStateRef.current.v = params.initialVelocity;
    simStateRef.current.omega = params.initialAngularVelocity;
    simStateRef.current.angle = 0;
    simStateRef.current.a = 0;
    simStateRef.current.alpha = 0;
    simStateRef.current.isSlipping = false;
    simStateRef.current.workFriction = 0;
    simStateRef.current.cycloidPoints = [];
    resetRacers();
  }, [params.initialVelocity, params.initialAngularVelocity, resetRacers]);

  useEffect(() => {
    resetSim();
  }, [params.shape, params.customBeta, params.angleDeg, params.isRaceMode, resetSim]);

  // Main Physics & Render Loop
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

      // Handle HiDPI
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

      // Theme Colors
      const isDark =
        document.documentElement.classList.contains('theme-blackboard') ||
        document.body.classList.contains('theme-blackboard');

      const bgColor = isDark ? '#0F1115' : '#FBF9F4';
      const slopeColor = isDark ? '#1E232E' : '#EAE6DC';
      const slopeBorder = isDark ? '#3B4252' : '#C7C2B4';
      const textColor = isDark ? '#F1F5F9' : '#1C1917';
      const mutedText = isDark ? '#94A3B8' : '#78716C';

      // Clear Canvas
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      // Geometry of the Incline on Screen
      const thetaRad = (params.angleDeg * Math.PI) / 180;
      const startMarginX = 60;
      const groundY = height - 50;

      // Available width and height for slope
      const maxSlopeWidth = width - startMarginX - 70;
      const slopeLengthPixels = Math.min(maxSlopeWidth / Math.cos(thetaRad), (groundY - 60) / Math.sin(thetaRad));
      const slopePixelX = slopeLengthPixels * Math.cos(thetaRad);
      const slopePixelY = slopeLengthPixels * Math.sin(thetaRad);

      const topX = startMarginX;
      const topY = groundY - slopePixelY;
      const bottomX = topX + slopePixelX;
      const bottomY = groundY;

      // Meters to Pixels scale
      const slopeLengthMeters = Math.max(1, params.inclineLength);
      const pixelsPerMeter = slopeLengthPixels / slopeLengthMeters;
      const radiusPixels = Math.max(16, params.radius * pixelsPerMeter);

      // PHYSICS SUB-STEPPING
      if (isPlaying) {
        const dtSim = dtReal * timeScale;
        const subSteps = 8;
        const dtSub = dtSim / subSteps;

        const effectiveBeta =
          params.shape === 'custom'
            ? params.customBeta
            : RIGID_BODY_PROFILES[params.shape].beta;

        for (let s = 0; s < subSteps; s++) {
          // Single Body Mode Physics
          if (!params.isRaceMode) {
            const state = simStateRef.current;
            if (state.x < slopeLengthMeters) {
              const g = params.gravity;
              const M = params.mass;
              const R = params.radius;
              const theta = thetaRad;

              const normal = M * g * Math.cos(theta);
              const maxStaticF = params.staticFriction * normal;
              const reqStaticF = (effectiveBeta / (1 + effectiveBeta)) * M * g * Math.sin(theta);
              const slipV = state.v - state.omega * R;

              if (Math.abs(slipV) < 0.005 && reqStaticF <= maxStaticF) {
                // Pure Rolling
                state.isSlipping = false;
                state.a = (g * Math.sin(theta)) / (1 + effectiveBeta);
                state.alpha = state.a / R;
                state.v += state.a * dtSub;
                state.omega = state.v / R;
              } else {
                // Slipping
                state.isSlipping = true;
                const sign = slipV > 0 ? 1 : -1;
                const fKinetic = params.kineticFriction * normal * sign;
                state.a = g * Math.sin(theta) - fKinetic / M;
                state.alpha = (fKinetic * R) / (effectiveBeta * M * R * R);

                const prevSlip = state.v - state.omega * R;
                state.v += state.a * dtSub;
                state.omega += state.alpha * dtSub;
                const newSlip = state.v - state.omega * R;

                // Did slip cross zero? Lock into pure rolling if friction is sufficient!
                if (prevSlip * newSlip <= 0 && reqStaticF <= maxStaticF) {
                  state.v = (state.v + state.omega * R) / 2;
                  state.omega = state.v / R;
                  state.isSlipping = false;
                }

                state.workFriction += Math.abs(fKinetic * slipV) * dtSub;
              }

              state.x += state.v * dtSub;
              state.angle += state.omega * dtSub;
              state.time += dtSub;

              // Record cycloid rim position (once every few substeps)
              if (s === 0 && showCycloid) {
                const wheelCX = topX + (state.x / slopeLengthMeters) * slopePixelX + Math.sin(theta) * radiusPixels;
                const wheelCY = topY + (state.x / slopeLengthMeters) * slopePixelY - Math.cos(theta) * radiusPixels;
                const rimX = wheelCX + radiusPixels * Math.sin(state.angle + theta);
                const rimY = wheelCY - radiusPixels * Math.cos(state.angle + theta);

                state.cycloidPoints.push({ x: rimX, y: rimY });
                if (state.cycloidPoints.length > 300) {
                  state.cycloidPoints.shift();
                }
              }
            } else {
              // At the bottom of the slope
              state.x = slopeLengthMeters;
            }
          } else {
            // MULTI-BODY RACE MODE PHYSICS
            const state = simStateRef.current;
            state.time += dtSub;
            state.racers.forEach((r) => {
              if (r.x < slopeLengthMeters) {
                const g = params.gravity;
                const M = params.mass;
                const R = params.radius;
                const theta = thetaRad;

                const normal = M * g * Math.cos(theta);
                const maxStaticF = params.staticFriction * normal;
                const reqStaticF = (r.beta / (1 + r.beta)) * M * g * Math.sin(theta);
                const slipV = r.v - r.omega * R;

                if (Math.abs(slipV) < 0.005 && reqStaticF <= maxStaticF) {
                  r.isSlipping = false;
                  r.a = (g * Math.sin(theta)) / (1 + r.beta);
                  r.alpha = r.a / R;
                  r.v += r.a * dtSub;
                  r.omega = r.v / R;
                } else {
                  r.isSlipping = true;
                  const sign = slipV > 0 ? 1 : -1;
                  const fKinetic = params.kineticFriction * normal * sign;
                  r.a = g * Math.sin(theta) - fKinetic / M;
                  r.alpha = (fKinetic * R) / (r.beta * M * R * R);

                  const prevSlip = r.v - r.omega * R;
                  r.v += r.a * dtSub;
                  r.omega += r.alpha * dtSub;
                  const newSlip = r.v - r.omega * R;

                  if (prevSlip * newSlip <= 0 && reqStaticF <= maxStaticF) {
                    r.v = (r.v + r.omega * R) / 2;
                    r.omega = r.v / R;
                    r.isSlipping = false;
                  }
                }

                r.x += r.v * dtSub;
                r.angle += r.omega * dtSub;
              } else if (!r.finished) {
                r.x = slopeLengthMeters;
                r.finished = true;
                r.finishTime = state.time;
              }
            });
          }
        }

        // Send telemetry update to parent
        const state = simStateRef.current;
        const g = params.gravity;
        const M = params.mass;
        const R = params.radius;
        const theta = thetaRad;
        const normF = M * g * Math.cos(theta);
        const reqF = (effectiveBeta / (1 + effectiveBeta)) * M * g * Math.sin(theta);
        const maxSF = params.staticFriction * normF;
        const currentH = (slopeLengthMeters - state.x) * Math.sin(theta);
        const I_cm = effectiveBeta * M * R * R;
        const kTr = 0.5 * M * state.v * state.v;
        const kRo = 0.5 * I_cm * state.omega * state.omega;
        const uPot = M * g * Math.max(0, currentH);

        onTelemetryUpdate({
          time: state.time,
          v: state.v,
          omega: state.omega,
          x: state.x,
          height: currentH,
          a: state.a,
          alpha: state.alpha,
          isSlipping: state.isSlipping,
          reqFriction: reqF,
          maxStaticFriction: maxSF,
          normalForce: normF,
          kTrans: kTr,
          kRot: kRo,
          potentialE: uPot,
          workFriction: state.workFriction,
        });
      }

      // =====================================================================
      // RENDERING ENVIRONMENT
      // =====================================================================

      // 1. Draw Incline Wedge / Ramp
      ctx.beginPath();
      ctx.moveTo(topX, topY);
      ctx.lineTo(bottomX, bottomY);
      ctx.lineTo(topX, bottomY);
      ctx.closePath();

      // Incline Gradient
      const rampGrad = ctx.createLinearGradient(topX, topY, bottomX, bottomY);
      rampGrad.addColorStop(0, slopeColor);
      rampGrad.addColorStop(1, isDark ? '#161922' : '#DFDBD0');
      ctx.fillStyle = rampGrad;
      ctx.fill();

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = slopeBorder;
      ctx.stroke();

      // Ground Line
      ctx.strokeStyle = slopeBorder;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, bottomY);
      ctx.lineTo(width, bottomY);
      ctx.stroke();

      // Hatching under ground
      ctx.strokeStyle = isDark ? '#272B35' : '#E5E2DA';
      ctx.lineWidth = 1;
      for (let hx = 0; hx < width; hx += 16) {
        ctx.beginPath();
        ctx.moveTo(hx, bottomY);
        ctx.lineTo(hx - 8, bottomY + 12);
        ctx.stroke();
      }

      // Angle Arc & Label (θ)
      const arcRadius = 45;
      ctx.beginPath();
      ctx.arc(topX, bottomY, arcRadius, -thetaRad, 0, false);
      ctx.strokeStyle = '#D97706';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#D97706';
      ctx.font = 'bold 12px Computer Modern, serif';
      ctx.textAlign = 'left';
      ctx.fillText(`θ = ${params.angleDeg}°`, topX + arcRadius + 6, bottomY - 10);

      // Distance Markers on Ramp
      ctx.fillStyle = mutedText;
      ctx.font = '9px ui-monospace, monospace';
      ctx.textAlign = 'center';
      const numTicks = 5;
      for (let i = 0; i <= numTicks; i++) {
        const frac = i / numTicks;
        const tx = topX + frac * slopePixelX;
        const ty = topY + frac * slopePixelY;
        const normDX = Math.sin(thetaRad);
        const normDY = -Math.cos(thetaRad);

        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(tx + normDX * 6, ty + normDY * 6);
        ctx.strokeStyle = slopeBorder;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        const distM = (frac * slopeLengthMeters).toFixed(1);
        ctx.fillText(`${distM}m`, tx + normDX * 16, ty + normDY * 16);
      }

      // Finish Line Marker
      ctx.save();
      ctx.translate(bottomX, bottomY);
      ctx.rotate(thetaRad);
      ctx.strokeStyle = '#EF4444';
      ctx.lineWidth = 3;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, -radiusPixels * 2.5);
      ctx.lineTo(0, 0);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // =====================================================================
      // 2. DRAW CYCLOID TRAIL (IF ENABLED)
      // =====================================================================
      if (showCycloid && !params.isRaceMode && simStateRef.current.cycloidPoints.length > 1) {
        ctx.strokeStyle = 'rgba(236, 72, 153, 0.7)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const pts = simStateRef.current.cycloidPoints;
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i].x, pts[i].y);
        }
        ctx.stroke();
      }

      // =====================================================================
      // 3. DRAW RIGID BODY (SINGLE OR MULTI-BODY)
      // =====================================================================
      if (!params.isRaceMode) {
        // SINGLE RIGID BODY
        const state = simStateRef.current;
        const frac = Math.min(1, state.x / slopeLengthMeters);
        const cx = topX + frac * slopePixelX + Math.sin(thetaRad) * radiusPixels;
        const cy = topY + frac * slopePixelY - Math.cos(thetaRad) * radiusPixels;

        const currentProfile = RIGID_BODY_PROFILES[params.shape];
        const bodyColor = currentProfile.color;

        // Render Wheel
        drawRigidBodyWheel(
          ctx,
          cx,
          cy,
          radiusPixels,
          state.angle + thetaRad,
          params.shape,
          bodyColor,
          isDark
        );

        // Contact Point marker (Instantaneous Center of Zero Velocity - ICZV)
        const contactX = cx - Math.sin(thetaRad) * radiusPixels;
        const contactY = cy + Math.cos(thetaRad) * radiusPixels;

        ctx.fillStyle = !state.isSlipping ? '#10B981' : '#F43F5E';
        ctx.beginPath();
        ctx.arc(contactX, contactY, 4, 0, Math.PI * 2);
        ctx.fill();

        if (showVectors) {
          // Force Vectors (FBD)
          if (showFBD) {
            const normal = params.mass * params.gravity * Math.cos(thetaRad);
            const reqF =
              ((params.shape === 'custom' ? params.customBeta : currentProfile.beta) /
                (1 + (params.shape === 'custom' ? params.customBeta : currentProfile.beta))) *
              params.mass *
              params.gravity *
              Math.sin(thetaRad);
            const fMag = !state.isSlipping ? reqF : params.kineticFriction * normal;

            // 1. Normal Force N (Emerald - perpendicular to slope)
            const nScale = Math.min(70, normal * 2.5);
            drawVector(
              ctx,
              cx,
              cy,
              -Math.sin(thetaRad) * nScale,
              Math.cos(thetaRad) * nScale * -1,
              '#10B981',
              `N = ${normal.toFixed(1)} N`
            );

            // 2. Gravity Force Mg (Amber - straight down)
            const gScale = Math.min(80, params.mass * params.gravity * 2.5);
            drawVector(
              ctx,
              cx,
              cy,
              0,
              gScale,
              '#F59E0B',
              `Mg = ${(params.mass * params.gravity).toFixed(1)} N`
            );

            // 3. Friction Force f (Rose - parallel to slope up)
            const fScale = Math.min(60, fMag * 5);
            drawVector(
              ctx,
              contactX,
              contactY,
              -Math.cos(thetaRad) * fScale,
              -Math.sin(thetaRad) * fScale,
              '#F43F5E',
              `f = ${fMag.toFixed(1)} N`
            );
          }

          // Velocity Breakdown (Chasles' Theorem)
          if (showVelocityBreakdown) {
            const vScale = Math.min(80, state.v * 15);

            // Center of Mass velocity v_cm
            drawVector(
              ctx,
              cx,
              cy,
              Math.cos(thetaRad) * vScale,
              Math.sin(thetaRad) * vScale,
              '#0284C7',
              `v_cm = ${state.v.toFixed(2)} m/s`
            );

            // Top Point velocity v_top = 2 v_cm (if pure rolling)
            const topPointX = cx + Math.sin(thetaRad) * radiusPixels;
            const topPointY = cy - Math.cos(thetaRad) * radiusPixels;
            const vTop = state.v + state.omega * params.radius;
            drawVector(
              ctx,
              topPointX,
              topPointY,
              Math.cos(thetaRad) * Math.min(90, vTop * 15),
              Math.sin(thetaRad) * Math.min(90, vTop * 15),
              '#8B5CF6',
              `v_top = ${vTop.toFixed(2)} m/s`
            );

            // Contact Point velocity (slip velocity)
            const vSlip = state.v - state.omega * params.radius;
            if (Math.abs(vSlip) > 0.05) {
              drawVector(
                ctx,
                contactX,
                contactY,
                Math.cos(thetaRad) * vSlip * 20,
                Math.sin(thetaRad) * vSlip * 20,
                '#DC2626',
                `v_slip = ${vSlip.toFixed(2)} m/s`
              );
            }
          }
        }
      } else {
        // =====================================================================
        // MULTI-BODY RACE RENDERING
        // =====================================================================
        const state = simStateRef.current;
        const numRacers = state.racers.length;

        // Sort racers by x position for rank badges
        const sortedRacers = [...state.racers].sort((a, b) => b.x - a.x);

        state.racers.forEach((racer, idx) => {
          // Distribute racers across 5 parallel lanes
          const laneOffsetRatio = (idx - (numRacers - 1) / 2) * 0.22;
          const laneDistPixels = laneOffsetRatio * radiusPixels * 2.8;

          // Normal direction to slope
          const normX = -Math.sin(thetaRad);
          const normY = Math.cos(thetaRad);

          const frac = Math.min(1, racer.x / slopeLengthMeters);
          const cx =
            topX +
            frac * slopePixelX +
            Math.sin(thetaRad) * (radiusPixels * 0.75) +
            normX * laneDistPixels;
          const cy =
            topY +
            frac * slopePixelY -
            Math.cos(thetaRad) * (radiusPixels * 0.75) +
            normY * laneDistPixels;

          // Scaled down wheel for race
          drawRigidBodyWheel(
            ctx,
            cx,
            cy,
            radiusPixels * 0.7,
            racer.angle + thetaRad,
            racer.shape,
            racer.color,
            isDark
          );

          // Racer Label
          ctx.font = 'bold 10px Computer Modern, serif';
          ctx.fillStyle = textColor;
          ctx.textAlign = 'right';
          ctx.fillText(racer.nameTh, cx - 18, cy + 3);

          // Finish / Rank Badge
          const rank = sortedRacers.findIndex((r) => r.shape === racer.shape) + 1;
          if (racer.finished) {
            ctx.fillStyle = '#10B981';
            ctx.font = 'bold 11px ui-monospace, monospace';
            ctx.textAlign = 'left';
            ctx.fillText(
              `#${rank} (${racer.finishTime?.toFixed(2)}s)`,
              cx + radiusPixels * 0.7 + 6,
              cy + 4
            );
          }
        });
      }

      // Restore Canvas
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [
    params,
    isPlaying,
    timeScale,
    showVectors,
    showCycloid,
    showFBD,
    showVelocityBreakdown,
    onTelemetryUpdate,
  ]);

  // Pointer Interaction: Drag Wheel or Change Slope Angle
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const thetaRad = (params.angleDeg * Math.PI) / 180;
    const groundY = rect.height - 50;
    const maxSlopeWidth = rect.width - 130;
    const slopeLengthPixels = Math.min(
      maxSlopeWidth / Math.cos(thetaRad),
      (groundY - 60) / Math.sin(thetaRad)
    );
    const topX = 60;
    const topY = groundY - slopeLengthPixels * Math.sin(thetaRad);

    // Check if clicked near top vertex to drag incline angle
    const distToTop = Math.hypot(px - topX, py - topY);
    if (distToTop < 30) {
      dragTargetRef.current = 'angle';
      setIsDragging(true);
      return;
    }

    // Check if clicked near wheel
    const frac = simStateRef.current.x / params.inclineLength;
    const cx = topX + frac * slopeLengthPixels * Math.cos(thetaRad);
    const cy = topY + frac * slopeLengthPixels * Math.sin(thetaRad);

    if (Math.hypot(px - cx, py - cy) < 40) {
      dragTargetRef.current = 'body';
      setIsDragging(true);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    if (dragTargetRef.current === 'angle') {
      const groundY = rect.height - 50;
      const topX = 60;
      const dy = groundY - py;
      const dx = Math.max(80, px - topX);
      const angle = Math.round((Math.atan2(dy, dx) * 180) / Math.PI);
      const clampedAngle = Math.max(5, Math.min(70, angle));
      onUpdateParams({ angleDeg: clampedAngle });
    } else if (dragTargetRef.current === 'body') {
      const thetaRad = (params.angleDeg * Math.PI) / 180;
      const groundY = rect.height - 50;
      const topX = 60;
      const slopeLengthPixels = Math.min(
        (rect.width - 130) / Math.cos(thetaRad),
        (groundY - 60) / Math.sin(thetaRad)
      );
      const topY = groundY - slopeLengthPixels * Math.sin(thetaRad);

      const vx = px - topX;
      const vy = py - topY;
      const proj = vx * Math.cos(thetaRad) + vy * Math.sin(thetaRad);
      const frac = Math.max(0, Math.min(1, proj / slopeLengthPixels));

      simStateRef.current.x = frac * params.inclineLength;
      simStateRef.current.v = 0;
      simStateRef.current.omega = 0;
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    dragTargetRef.current = null;
  };

  return (
    <div className="relative w-full rounded-lg border border-[var(--hairline-border)] bg-[var(--surface-card)] overflow-hidden shadow-xs">
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="w-full h-[380px] sm:h-[430px] block cursor-grab active:cursor-grabbing touch-none"
      />

      {/* Floating Interactive Hints */}
      <div className="absolute top-2.5 left-3 flex items-center gap-2 pointer-events-none">
        <span className="px-2 py-0.5 rounded text-[10px] font-mono border border-[var(--hairline-border)] bg-[var(--surface-card)]/90 backdrop-blur-xs text-[var(--ink-secondary)] shadow-2xs">
          💡 ลากยอดพื้นเอียงเพื่อเปลี่ยนมุม θ • ลากวัตถุเพื่อตั้งตำแหน่งปล่อย
        </span>
      </div>

      {/* Mode Indicator Tag */}
      <div className="absolute top-2.5 right-3 flex items-center gap-1.5 pointer-events-none">
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border shadow-2xs ${
            params.isRaceMode
              ? 'bg-purple-100 dark:bg-purple-950/80 border-purple-400 text-purple-800 dark:text-purple-300'
              : 'bg-sky-100 dark:bg-sky-950/80 border-sky-400 text-sky-800 dark:text-sky-300'
          }`}
        >
          {params.isRaceMode ? '🏁 Multi-Body Rolling Race' : '🔬 Single-Body Analysis'}
        </span>
      </div>
    </div>
  );
};

// =============================================================================
// HELPER DRAWING FUNCTIONS
// =============================================================================

function drawRigidBodyWheel(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  angleRad: number,
  shape: RigidBodyShape,
  color: string,
  isDark: boolean
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angleRad);

  // Outer Rim Circle
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);

  if (shape === 'solid_sphere') {
    // 3D Spherical Shading
    const sphereGrad = ctx.createRadialGradient(
      -radius * 0.35,
      -radius * 0.35,
      radius * 0.1,
      0,
      0,
      radius
    );
    sphereGrad.addColorStop(0, '#93C5FD');
    sphereGrad.addColorStop(0.6, color);
    sphereGrad.addColorStop(1, '#1E3A8A');
    ctx.fillStyle = sphereGrad;
    ctx.fill();
  } else if (shape === 'hollow_sphere') {
    ctx.fillStyle = isDark ? '#1E232E' : '#F5F3ED';
    ctx.fill();
    ctx.lineWidth = radius * 0.28;
    ctx.strokeStyle = color;
    ctx.stroke();
  } else if (shape === 'thin_hoop') {
    ctx.lineWidth = radius * 0.15;
    ctx.strokeStyle = color;
    ctx.stroke();
  } else {
    // Solid Cylinder / Custom
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.85;
    ctx.fill();
    ctx.globalAlpha = 1.0;
  }

  ctx.lineWidth = 2;
  ctx.strokeStyle = isDark ? '#F1F5F9' : '#0F172A';
  ctx.stroke();

  // Internal Spokes to visually demonstrate rotation
  const numSpokes = shape === 'thin_hoop' ? 4 : 3;
  ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.35)';
  ctx.lineWidth = 1.8;
  for (let i = 0; i < numSpokes; i++) {
    const spokeAngle = (i * Math.PI * 2) / numSpokes;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(spokeAngle) * radius, Math.sin(spokeAngle) * radius);
    ctx.stroke();
  }

  // Red Rim Marker Dot (generating cycloid)
  ctx.fillStyle = '#EF4444';
  ctx.beginPath();
  ctx.arc(0, -radius, 4, 0, Math.PI * 2);
  ctx.fill();

  // Center Axle Pin
  ctx.fillStyle = isDark ? '#FFFFFF' : '#1C1917';
  ctx.beginPath();
  ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawVector(
  ctx: CanvasRenderingContext2D,
  fromX: number,
  fromY: number,
  dx: number,
  dy: number,
  color: string,
  label: string
) {
  const len = Math.hypot(dx, dy);
  if (len < 5) return;

  const toX = fromX + dx;
  const toY = fromY + dy;
  const angle = Math.atan2(dy, dx);
  const headLen = Math.min(10, len * 0.3);

  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2.2;

  // Vector Line
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();

  // Arrowhead
  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(
    toX - headLen * Math.cos(angle - Math.PI / 6),
    toY - headLen * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(
    toX - headLen * Math.cos(angle + Math.PI / 6),
    toY - headLen * Math.sin(angle + Math.PI / 6)
  );
  ctx.closePath();
  ctx.fill();

  // Vector Text Label
  ctx.font = 'bold 10px ui-monospace, monospace';
  ctx.textAlign = dx >= 0 ? 'left' : 'right';
  ctx.textBaseline = dy >= 0 ? 'top' : 'bottom';
  ctx.fillText(label, toX + (dx >= 0 ? 5 : -5), toY + (dy >= 0 ? 5 : -5));

  ctx.restore();
}
