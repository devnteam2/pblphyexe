// src/components/simulation/RigidBodySimulationView.tsx
'use client';

import React, { useState, useRef, useCallback } from 'react';
import {
  SimulationMode,
  InclineSimulationParams,
  FlywheelSimulationParams,
  CompoundPendulumParams,
  DzhanibekovParams,
  RIGID_BODY_PROFILES,
} from '@/types/simulation';
import { InclineRollingSimulation } from './InclineRollingSimulation';
import { FlywheelPulleySimulation } from './FlywheelPulleySimulation';
import { CompoundPendulumSimulation } from './CompoundPendulumSimulation';
import { DzhanibekovSimulation } from './DzhanibekovSimulation';
import { SimulationControls } from './SimulationControls';
import { PhysicsEquationInspector } from './PhysicsEquationInspector';
import { LiveGraphPlotter, DataSeries } from './LiveGraphPlotter';
import { RotationTheorySummary } from './RotationTheorySummary';
import {
  Activity,
  Compass,
  Orbit,
  Disc,
} from 'lucide-react';

export const RigidBodySimulationView: React.FC = () => {
  const [mode, setMode] = useState<SimulationMode>('incline');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [timeScale, setTimeScale] = useState<number>(1.0);

  // Overlay Visibility
  const [showVectors, setShowVectors] = useState<boolean>(true);
  const [showCycloid, setShowCycloid] = useState<boolean>(true);
  const [showFBD, setShowFBD] = useState<boolean>(true);
  const [showVelocityBreakdown, setShowVelocityBreakdown] = useState<boolean>(true);

  // Incline Simulation Parameters
  const [inclineParams, setInclineParams] = useState<InclineSimulationParams>({
    shape: 'solid_sphere',
    customBeta: 0.35,
    mass: 2.0,
    radius: 0.3,
    angleDeg: 30,
    staticFriction: 0.45,
    kineticFriction: 0.25,
    gravity: 9.8,
    inclineLength: 6.0,
    initialVelocity: 0,
    initialAngularVelocity: 0,
    isRaceMode: false,
  });

  // Flywheel Simulation Parameters
  const [flywheelParams, setFlywheelParams] = useState<FlywheelSimulationParams>({
    flywheelMass: 10,
    flywheelRadius: 0.4,
    drumRadius: 0.12,
    hangingMass: 2.0,
    externalTorque: 0,
    dampingCoeff: 0.15,
    gravity: 9.8,
    shape: 'solid_cylinder',
  });

  // Compound Pendulum Parameters
  const [pendulumParams, setPendulumParams] = useState<CompoundPendulumParams>({
    shape: 'rod',
    mass: 2.0,
    length: 1.0,
    pivotOffset: 0.25,
    dampingCoeff: 0.08,
    gravity: 9.8,
    initialAngleDeg: 45,
  });

  // Dzhanibekov Parameters
  const [dzhanibekovParams, setDzhanibekovParams] = useState<DzhanibekovParams>({
    I1: 1.0,
    I2: 2.0,
    I3: 3.5,
    omega1: 0.05,
    omega2: 6.0,
    omega3: 0.05,
  });

  // Real-Time Telemetry Storage
  const [inclineTelemetry, setInclineTelemetry] = useState<{
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
  }>({
    time: 0,
    v: 0,
    omega: 0,
    x: 0,
    height: 3.0,
    a: 0,
    alpha: 0,
    isSlipping: false,
    reqFriction: 0,
    maxStaticFriction: 0,
    normalForce: 0,
    kTrans: 0,
    kRot: 0,
    potentialE: 0,
    workFriction: 0,
  });

  const [flywheelTelemetry, setFlywheelTelemetry] = useState<{
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
  }>({
    time: 0,
    omega: 0,
    alpha: 0,
    theta: 0,
    massY: 0.5,
    massV: 0,
    tension: 0,
    kineticRot: 0,
    kineticTrans: 0,
    angularMomentum: 0,
  });

  const [pendulumTelemetry, setPendulumTelemetry] = useState<{
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
  }>({
    time: 0,
    angle: (45 * Math.PI) / 180,
    omega: 0,
    alpha: 0,
    period: 1.6,
    centerOfPercussion: 0.65,
    kineticRot: 0,
    potentialE: 0,
    totalE: 0,
    I_pivot: 0.29,
  });

  const [dzhanibekovTelemetry, setDzhanibekovTelemetry] = useState<{
    time: number;
    w1: number;
    w2: number;
    w3: number;
    energy: number;
    angularMomentumSq: number;
  }>({
    time: 0,
    w1: 0.05,
    w2: 6.0,
    w3: 0.05,
    energy: 36,
    angularMomentumSq: 144,
  });

  // Time-Series Graph History Ref
  const graphHistoryRef = useRef<{
    time: number[];
    v: number[];
    wR: number[];
    vSlip: number[];
    kTrans: number[];
    kRot: number[];
    uPot: number[];
    eTot: number[];
  }>({
    time: [],
    v: [],
    wR: [],
    vSlip: [],
    kTrans: [],
    kRot: [],
    uPot: [],
    eTot: [],
  });

  const [graphSeries, setGraphSeries] = useState<DataSeries[]>([]);

  // Telemetry Callbacks
  const handleInclineTelemetry = useCallback(
    (data: typeof inclineTelemetry) => {
      setInclineTelemetry(data);

      // Append to graph history
      const hist = graphHistoryRef.current;
      const t = data.time;
      hist.time.push(t);
      hist.v.push(data.v);
      hist.wR.push(data.omega * inclineParams.radius);
      hist.vSlip.push(data.v - data.omega * inclineParams.radius);
      hist.kTrans.push(data.kTrans);
      hist.kRot.push(data.kRot);
      hist.uPot.push(data.potentialE);
      hist.eTot.push(data.kTrans + data.kRot + data.potentialE);

      // Keep last 400 points
      if (hist.time.length > 400) {
        hist.time.shift();
        hist.v.shift();
        hist.wR.shift();
        hist.vSlip.shift();
        hist.kTrans.shift();
        hist.kRot.shift();
        hist.uPot.shift();
        hist.eTot.shift();
      }

      const ptsV = hist.time.map((time, i) => ({ time, value: hist.v[i] }));
      const ptsWR = hist.time.map((time, i) => ({ time, value: hist.wR[i] }));
      const ptsSlip = hist.time.map((time, i) => ({ time, value: hist.vSlip[i] }));

      setGraphSeries([
        { id: 'v', label: 'v_cm (ความเร็วเชิงเส้น)', color: '#0284C7', unit: 'm/s', values: ptsV },
        { id: 'wR', label: 'ωR (ความเร็วที่ขอบ)', color: '#10B981', unit: 'm/s', values: ptsWR },
        { id: 'slip', label: 'v_slip (อัตราเร็วไถล)', color: '#EF4444', unit: 'm/s', values: ptsSlip },
      ]);
    },
    [inclineParams.radius]
  );

  const handleFlywheelTelemetry = useCallback((data: typeof flywheelTelemetry) => {
    setFlywheelTelemetry(data);
  }, []);

  const handlePendulumTelemetry = useCallback((data: typeof pendulumTelemetry) => {
    setPendulumTelemetry(data);
  }, []);

  const handleDzhanibekovTelemetry = useCallback((data: typeof dzhanibekovTelemetry) => {
    setDzhanibekovTelemetry(data);
  }, []);

  // Preset Applicator
  const handleApplyPreset = (presetId: string) => {
    if (presetId === 'galileo_race') {
      setMode('incline');
      setInclineParams((prev) => ({
        ...prev,
        isRaceMode: true,
        angleDeg: 30,
        staticFriction: 0.5,
        kineticFriction: 0.3,
        initialVelocity: 0,
        initialAngularVelocity: 0,
      }));
      setIsPlaying(true);
    } else if (presetId === 'bowling_ball') {
      setMode('incline');
      setInclineParams((prev) => ({
        ...prev,
        shape: 'solid_sphere',
        isRaceMode: false,
        angleDeg: 5,
        staticFriction: 0.35,
        kineticFriction: 0.2,
        initialVelocity: 4.5,
        initialAngularVelocity: 0, // backspin/no-spin -> skids then transitions to pure rolling!
      }));
      setIsPlaying(true);
    } else if (presetId === 'ice_slope') {
      setMode('incline');
      setInclineParams((prev) => ({
        ...prev,
        isRaceMode: false,
        angleDeg: 35,
        staticFriction: 0.0,
        kineticFriction: 0.0,
        initialVelocity: 0,
        initialAngularVelocity: 0,
      }));
      setIsPlaying(true);
    } else if (presetId === 'flywheel_storage') {
      setMode('flywheel');
      setFlywheelParams((prev) => ({
        ...prev,
        flywheelMass: 15,
        hangingMass: 3.0,
        externalTorque: 5.0,
      }));
      setIsPlaying(true);
    } else if (presetId === 'sweet_spot') {
      setMode('pendulum');
      setPendulumParams((prev) => ({
        ...prev,
        shape: 'rod',
        length: 1.0,
        pivotOffset: 0.288,
        initialAngleDeg: 50,
      }));
      setIsPlaying(true);
    } else if (presetId === 'dzhanibekov_flip') {
      setMode('dzhanibekov');
      setDzhanibekovParams({
        I1: 1.0,
        I2: 2.0,
        I3: 3.5,
        omega1: 0.05,
        omega2: 6.0,
        omega3: 0.05,
      });
      setIsPlaying(true);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    graphHistoryRef.current = {
      time: [],
      v: [],
      wR: [],
      vSlip: [],
      kTrans: [],
      kRot: [],
      uPot: [],
      eTot: [],
    };
    setGraphSeries([]);
    // Toggle play after short delay to trigger reset in sim components
    setTimeout(() => {
      setIsPlaying(true);
    }, 50);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150 font-serif">
      {/* Frontispiece Header */}
      <header className="border-b border-[var(--hairline-border)] pb-6 pt-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[var(--ink-tertiary)] uppercase">
            <span>OPENPOSN PHYSICS SIMULATION LAB</span>
            <span>•</span>
            <span>RIGID BODY ROTATIONAL DYNAMICS</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--ink-primary)] tracking-tight">
            แบบจำลองฟิสิกส์การหมุนของวัตถุแข็งเกร็ง (Rigid Body Rotation Studio)
          </h1>

          <p className="text-sm md:text-base text-[var(--ink-secondary)] leading-relaxed max-w-4xl">
            ห้องทดลองเสมือนจริงสำหรับศึกษากลศาสตร์การหมุน การกลิ้งโดยไม่ไถล (Rolling Without Slipping)
            การซ้อนทับตามทฤษฎีบทชาส์ล (Chasles&apos; Superposition) ทฤษฎีบทแกนขนาน และสมการออยเลอร์ 3 มิติ
            พร้อมระบบแสดงสมการคำนวณสดและการปรับแต่งพารามิเตอร์แบบ Auto-Customizable 100%
          </p>
        </div>
      </header>

      {/* Lab Mode Selector Tabs */}
      <nav className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg border border-[var(--hairline-border)] bg-[var(--surface-card)]">
        <button
          onClick={() => setMode('incline')}
          className={`flex-1 min-w-[140px] px-3 py-2 rounded-md text-xs font-medium font-serif flex items-center justify-center gap-2 transition-all ${
            mode === 'incline'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-2xs font-bold'
              : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
          }`}
        >
          <Disc className="w-4 h-4 text-sky-500" />
          <span>1. พื้นเอียง & กลิ้งแข่ง (Incline & Race)</span>
        </button>

        <button
          onClick={() => setMode('flywheel')}
          className={`flex-1 min-w-[140px] px-3 py-2 rounded-md text-xs font-medium font-serif flex items-center justify-center gap-2 transition-all ${
            mode === 'flywheel'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-2xs font-bold'
              : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
          }`}
        >
          <Orbit className="w-4 h-4 text-emerald-500" />
          <span>2. ล้อตุนกำลัง & รอก (Flywheel)</span>
        </button>

        <button
          onClick={() => setMode('pendulum')}
          className={`flex-1 min-w-[140px] px-3 py-2 rounded-md text-xs font-medium font-serif flex items-center justify-center gap-2 transition-all ${
            mode === 'pendulum'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-2xs font-bold'
              : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
          }`}
        >
          <Compass className="w-4 h-4 text-amber-500" />
          <span>3. ลูกตุ้มกายภาพ (Compound Pendulum)</span>
        </button>

        <button
          onClick={() => setMode('dzhanibekov')}
          className={`flex-1 min-w-[140px] px-3 py-2 rounded-md text-xs font-medium font-serif flex items-center justify-center gap-2 transition-all ${
            mode === 'dzhanibekov'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-2xs font-bold'
              : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
          }`}
        >
          <Activity className="w-4 h-4 text-purple-500" />
          <span>4. การหมุนอิสระ 3D (Dzhanibekov)</span>
        </button>
      </nav>

      {/* Main Simulation Arena: Canvas & Live Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Canvas Simulation & Live Graphs) - 7 cols on large screens */}
        <div className="lg:col-span-7 space-y-4">
          {/* Active Canvas Mode */}
          {mode === 'incline' && (
            <InclineRollingSimulation
              params={inclineParams}
              onUpdateParams={(p) => setInclineParams((prev) => ({ ...prev, ...p }))}
              isPlaying={isPlaying}
              timeScale={timeScale}
              showVectors={showVectors}
              showCycloid={showCycloid}
              showFBD={showFBD}
              showVelocityBreakdown={showVelocityBreakdown}
              onTelemetryUpdate={handleInclineTelemetry}
            />
          )}

          {mode === 'flywheel' && (
            <FlywheelPulleySimulation
              params={flywheelParams}
              onUpdateParams={(p) => setFlywheelParams((prev) => ({ ...prev, ...p }))}
              isPlaying={isPlaying}
              timeScale={timeScale}
              onTelemetryUpdate={handleFlywheelTelemetry}
            />
          )}

          {mode === 'pendulum' && (
            <CompoundPendulumSimulation
              params={pendulumParams}
              onUpdateParams={(p) => setPendulumParams((prev) => ({ ...prev, ...p }))}
              isPlaying={isPlaying}
              timeScale={timeScale}
              onTelemetryUpdate={handlePendulumTelemetry}
            />
          )}

          {mode === 'dzhanibekov' && (
            <DzhanibekovSimulation
              params={dzhanibekovParams}
              onUpdateParams={(p) => setDzhanibekovParams((prev) => ({ ...prev, ...p }))}
              isPlaying={isPlaying}
              timeScale={timeScale}
              onTelemetryUpdate={handleDzhanibekovTelemetry}
            />
          )}

          {/* Real-time Graph Monitor (in Incline mode) */}
          {mode === 'incline' && graphSeries.length > 0 && (
            <LiveGraphPlotter
              title="กราฟจลนศาสตร์สด: ความเร็ว v_cm, ωR, และการไถล v_slip เทียบเวลา"
              series={graphSeries}
              height={150}
              syncTime={inclineTelemetry.time}
            />
          )}
        </div>

        {/* Right Column (Equation Inspector & Live Parameter Controls) - 5 cols */}
        <div className="lg:col-span-5 space-y-4">
          {/* Live Equation Inspector with Real-time Substitution */}
          <PhysicsEquationInspector
            mode={mode}
            shape={inclineParams.shape}
            beta={
              inclineParams.shape === 'custom'
                ? inclineParams.customBeta
                : RIGID_BODY_PROFILES[inclineParams.shape].beta
            }
            mass={inclineParams.mass}
            radius={inclineParams.radius}
            angleDeg={inclineParams.angleDeg}
            staticMu={inclineParams.staticFriction}
            kineticMu={inclineParams.kineticFriction}
            gravity={inclineParams.gravity}
            v={inclineTelemetry.v}
            omega={inclineTelemetry.omega}
            x={inclineTelemetry.x}
            height={inclineTelemetry.height}
            a={inclineTelemetry.a}
            alpha={inclineTelemetry.alpha}
            isSlipping={inclineTelemetry.isSlipping}
            reqFriction={inclineTelemetry.reqFriction}
            maxStaticFriction={inclineTelemetry.maxStaticFriction}
            normalForce={inclineTelemetry.normalForce}
            kTrans={inclineTelemetry.kTrans}
            kRot={inclineTelemetry.kRot}
            potentialE={inclineTelemetry.potentialE}
            workFriction={inclineTelemetry.workFriction}
            // Flywheel props
            flywheelMass={flywheelParams.flywheelMass}
            flywheelRadius={flywheelParams.flywheelRadius}
            drumRadius={flywheelParams.drumRadius}
            hangingMass={flywheelParams.hangingMass}
            externalTorque={flywheelParams.externalTorque}
            dampingCoeff={flywheelParams.dampingCoeff}
            stringTension={flywheelTelemetry.tension}
            flywheelOmega={flywheelTelemetry.omega}
            flywheelAlpha={flywheelTelemetry.alpha}
            // Pendulum props
            pendulumShape={pendulumParams.shape}
            pendulumLength={pendulumParams.length}
            pivotOffset={pendulumParams.pivotOffset}
            pendulumAngle={pendulumTelemetry.angle}
            pendulumOmega={pendulumTelemetry.omega}
            centerOfPercussion={pendulumTelemetry.centerOfPercussion}
            pendulumPeriod={pendulumTelemetry.period}
            // Dzhanibekov props
            I1={dzhanibekovParams.I1}
            I2={dzhanibekovParams.I2}
            I3={dzhanibekovParams.I3}
            w1={dzhanibekovTelemetry.w1}
            w2={dzhanibekovTelemetry.w2}
            w3={dzhanibekovTelemetry.w3}
            energy3D={dzhanibekovTelemetry.energy}
            angularMomentumSq={dzhanibekovTelemetry.angularMomentumSq}
          />

          {/* Interactive Parameters & Preset Controls */}
          <SimulationControls
            mode={mode}
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
            onReset={handleReset}
            onStep={() => {
              setIsPlaying(false);
              // manual single step trigger
            }}
            timeScale={timeScale}
            onChangeTimeScale={setTimeScale}
            showVectors={showVectors}
            onToggleVectors={setShowVectors}
            showCycloid={showCycloid}
            onToggleCycloid={setShowCycloid}
            showFBD={showFBD}
            onToggleFBD={setShowFBD}
            showVelocityBreakdown={showVelocityBreakdown}
            onToggleVelocityBreakdown={setShowVelocityBreakdown}
            inclineParams={inclineParams}
            onUpdateInclineParams={(p) => setInclineParams((prev) => ({ ...prev, ...p }))}
            flywheelParams={flywheelParams}
            onUpdateFlywheelParams={(p) => setFlywheelParams((prev) => ({ ...prev, ...p }))}
            pendulumParams={pendulumParams}
            onUpdatePendulumParams={(p) => setPendulumParams((prev) => ({ ...prev, ...p }))}
            dzhanibekovParams={dzhanibekovParams}
            onUpdateDzhanibekovParams={(p) => setDzhanibekovParams((prev) => ({ ...prev, ...p }))}
            onApplyPreset={handleApplyPreset}
          />
        </div>
      </div>

      {/* Academic Theory & Formula Sheet Drawer at Bottom */}
      <section className="pt-4 border-t border-[var(--hairline-border)]">
        <RotationTheorySummary />
      </section>
    </div>
  );
};
