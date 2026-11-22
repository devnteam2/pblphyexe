// src/components/simulation/SimulationControls.tsx
'use client';

import React from 'react';
import {
  SimulationMode,
  RigidBodyShape,
  RIGID_BODY_PROFILES,
  InclineSimulationParams,
  FlywheelSimulationParams,
  CompoundPendulumParams,
  DzhanibekovParams,
} from '@/types/simulation';
import {
  Play,
  Pause,
  RotateCcw,
  StepForward,
  Gauge,
  Sliders,
  Sparkles,
  Layers,
  Flag,
} from 'lucide-react';

interface SimulationControlsProps {
  mode: SimulationMode;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
  onStep: () => void;
  timeScale: number;
  onChangeTimeScale: (scale: number) => void;

  // Visual Overlays
  showVectors: boolean;
  onToggleVectors: (v: boolean) => void;
  showCycloid: boolean;
  onToggleCycloid: (v: boolean) => void;
  showFBD: boolean;
  onToggleFBD: (v: boolean) => void;
  showVelocityBreakdown: boolean;
  onToggleVelocityBreakdown: (v: boolean) => void;

  // Incline Params
  inclineParams: InclineSimulationParams;
  onUpdateInclineParams: (p: Partial<InclineSimulationParams>) => void;

  // Flywheel Params
  flywheelParams: FlywheelSimulationParams;
  onUpdateFlywheelParams: (p: Partial<FlywheelSimulationParams>) => void;

  // Pendulum Params
  pendulumParams: CompoundPendulumParams;
  onUpdatePendulumParams: (p: Partial<CompoundPendulumParams>) => void;

  // Dzhanibekov Params
  dzhanibekovParams: DzhanibekovParams;
  onUpdateDzhanibekovParams: (p: Partial<DzhanibekovParams>) => void;

  // Preset Applicator
  onApplyPreset: (presetId: string) => void;
}

export const SimulationControls: React.FC<SimulationControlsProps> = ({
  mode,
  isPlaying,
  onTogglePlay,
  onReset,
  onStep,
  timeScale,
  onChangeTimeScale,
  showVectors,
  onToggleVectors,
  showCycloid,
  onToggleCycloid,
  showFBD,
  onToggleFBD,
  showVelocityBreakdown,
  onToggleVelocityBreakdown,
  inclineParams,
  onUpdateInclineParams,
  flywheelParams,
  onUpdateFlywheelParams,
  pendulumParams,
  onUpdatePendulumParams,
  dzhanibekovParams,
  onUpdateDzhanibekovParams,
  onApplyPreset,
}) => {
  return (
    <div className="rounded-lg border border-[var(--hairline-border)] bg-[var(--surface-card)] p-4 md:p-5 shadow-xs space-y-5 font-serif">
      {/* Top Playback Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--hairline-border)]">
        {/* Play / Pause / Step / Reset */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onTogglePlay}
            className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'หยุดชั่วคราว (Pause)' : 'เริ่มจำลอง (Play)'}</span>
          </button>

          <button
            onClick={onStep}
            disabled={isPlaying}
            className="p-1.5 rounded-md border border-[var(--hairline-border)] bg-[var(--surface-muted)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] disabled:opacity-40 transition-colors shadow-2xs"
            title="เดินหน้า 1 ขั้นเวลา (Step Δt)"
          >
            <StepForward className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onReset}
            className="p-1.5 rounded-md border border-[var(--hairline-border)] bg-[var(--surface-muted)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] transition-colors shadow-2xs"
            title="รีเซ็ตสถานะทั้งหมด (Reset)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Speed Multiplier */}
        <div className="flex items-center gap-1.5">
          <Gauge className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-xs font-mono text-[var(--ink-secondary)]">ความเร็ว:</span>
          <div className="flex rounded border border-[var(--hairline-border)] bg-[var(--surface-muted)] p-0.5 text-xs font-mono">
            {[0.25, 0.5, 1.0, 2.0].map((speed) => (
              <button
                key={speed}
                onClick={() => onChangeTimeScale(speed)}
                className={`px-2 py-0.5 rounded transition-colors ${
                  timeScale === speed
                    ? 'bg-[var(--surface-card)] text-[var(--ink-primary)] font-bold shadow-2xs'
                    : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
                }`}
              >
                {speed}×
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="rounded-md border border-amber-300 dark:border-amber-800 bg-amber-50/60 dark:bg-amber-950/30 p-3 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>ชุดการทดลองสำเร็จรูปอัตโนมัติ (Auto-Custom Presets):</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          <button
            onClick={() => onApplyPreset('galileo_race')}
            className="p-2 text-left rounded border border-amber-300/80 dark:border-amber-800 bg-[var(--surface-card)] hover:border-amber-500 transition-colors shadow-2xs"
          >
            <strong className="block text-amber-900 dark:text-amber-300 font-serif">1. กาลิเลโอกลิ้งแข่ง</strong>
            <span className="text-[10px] text-stone-500 block leading-tight">
              ทรงกลม vs จาน vs วงแหวน แข่งกันลงพื้นเอียง
            </span>
          </button>

          <button
            onClick={() => onApplyPreset('bowling_ball')}
            className="p-2 text-left rounded border border-amber-300/80 dark:border-amber-800 bg-[var(--surface-card)] hover:border-amber-500 transition-colors shadow-2xs"
          >
            <strong className="block text-amber-900 dark:text-amber-300 font-serif">2. ลูกโบว์ลิ่งไถลเป็นกลิ้ง</strong>
            <span className="text-[10px] text-stone-500 block leading-tight">
              โยนลูกด้วยความเร็วต้น v0 แต่ไม่ปั่น (ω0 = 0)
            </span>
          </button>

          <button
            onClick={() => onApplyPreset('ice_slope')}
            className="p-2 text-left rounded border border-amber-300/80 dark:border-amber-800 bg-[var(--surface-card)] hover:border-amber-500 transition-colors shadow-2xs"
          >
            <strong className="block text-amber-900 dark:text-amber-300 font-serif">3. พื้นน้ำแข็งไร้แรงเสียดทาน</strong>
            <span className="text-[10px] text-stone-500 block leading-tight">
              μ = 0 ไถลอย่างเดียว ไม่เกิดการหมุน!
            </span>
          </button>

          <button
            onClick={() => onApplyPreset('flywheel_storage')}
            className="p-2 text-left rounded border border-amber-300/80 dark:border-amber-800 bg-[var(--surface-card)] hover:border-amber-500 transition-colors shadow-2xs"
          >
            <strong className="block text-amber-900 dark:text-amber-300 font-serif">4. ล้อตุนกำลัง & รอก</strong>
            <span className="text-[10px] text-stone-500 block leading-tight">
              มวลแขวนดึงให้ล้อหมุนสะสมพลังงานจลน์
            </span>
          </button>

          <button
            onClick={() => onApplyPreset('sweet_spot')}
            className="p-2 text-left rounded border border-amber-300/80 dark:border-amber-800 bg-[var(--surface-card)] hover:border-amber-500 transition-colors shadow-2xs"
          >
            <strong className="block text-amber-900 dark:text-amber-300 font-serif">5. Sweet Spot ของลูกตุ้ม</strong>
            <span className="text-[10px] text-stone-500 block leading-tight">
              ค้นหา Center of Percussion ที่ไม่สะท้านมือ
            </span>
          </button>

          <button
            onClick={() => onApplyPreset('dzhanibekov_flip')}
            className="p-2 text-left rounded border border-amber-300/80 dark:border-amber-800 bg-[var(--surface-card)] hover:border-amber-500 transition-colors shadow-2xs"
          >
            <strong className="block text-amber-900 dark:text-amber-300 font-serif">6. ปรากฏการณ์ Dzhanibekov</strong>
            <span className="text-[10px] text-stone-500 block leading-tight">
              การหมุนรอบแกนกลางที่ไม่เสถียร พลิก 180°
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: INCLINE CONTROLS */}
      {/* ========================================================================= */}
      {mode === 'incline' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--hairline-subtle)]">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--ink-primary)]">
              <Sliders className="w-4 h-4 text-sky-600" />
              <span>ปรับแต่งตัวแปรทางฟิสิกส์ (Customizable Physics Parameters):</span>
            </div>

            {/* Race Mode Switcher */}
            <button
              onClick={() => onUpdateInclineParams({ isRaceMode: !inclineParams.isRaceMode })}
              className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all border shadow-2xs ${
                inclineParams.isRaceMode
                  ? 'bg-purple-600 text-white border-purple-700'
                  : 'bg-[var(--surface-muted)] text-[var(--ink-secondary)] border-[var(--hairline-border)] hover:text-[var(--ink-primary)]'
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              <span>{inclineParams.isRaceMode ? 'โหมดแข่งหลายวัตถุ (ON)' : 'เปิดโหมดแข่ง (Race Mode)'}</span>
            </button>
          </div>

          {/* Rigid Body Profile Selection (Only in single mode) */}
          {!inclineParams.isRaceMode && (
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold text-[var(--ink-primary)] block">
                เลือกรูปทรงวัตถุหมุน (Rigid Body Shape & Geometry):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {(
                  [
                    'solid_sphere',
                    'solid_cylinder',
                    'hollow_sphere',
                    'thin_hoop',
                    'custom',
                  ] as RigidBodyShape[]
                ).map((s) => {
                  const prof = RIGID_BODY_PROFILES[s];
                  const isSelected = inclineParams.shape === s;
                  return (
                    <button
                      key={s}
                      onClick={() => onUpdateInclineParams({ shape: s })}
                      className={`p-2 rounded border text-left transition-all ${
                        isSelected
                          ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 font-bold shadow-2xs'
                          : 'border-[var(--hairline-border)] bg-[var(--surface-card)] hover:border-stone-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[var(--ink-primary)]">{prof.nameTh.split(' ')[0]}</span>
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block"
                          style={{ backgroundColor: prof.color }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-[var(--ink-secondary)] block">
                        β = {s === 'custom' ? inclineParams.customBeta.toFixed(2) : prof.beta.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Custom Beta Slider (if custom shape selected) */}
          {!inclineParams.isRaceMode && inclineParams.shape === 'custom' && (
            <div className="p-3 rounded border border-cyan-400 dark:border-cyan-800 bg-cyan-50/50 dark:bg-cyan-950/30 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="font-bold text-cyan-900 dark:text-cyan-300">
                  สัมประสิทธิ์โมเมนต์ความเฉื่อย β = I / (MR²):
                </span>
                <span className="font-bold">{inclineParams.customBeta.toFixed(3)}</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="2.0"
                step="0.01"
                value={inclineParams.customBeta}
                onChange={(e) => onUpdateInclineParams({ customBeta: parseFloat(e.target.value) })}
                className="w-full accent-cyan-600"
              />
              <div className="flex justify-between text-[10px] font-mono text-stone-500">
                <span>0.05 (มวลใกล้แกน)</span>
                <span>0.4 (ทรงกลม)</span>
                <span>0.5 (จาน)</span>
                <span>1.0 (วงแหวน)</span>
                <span>2.0 (ดัมเบลล์)</span>
              </div>
            </div>
          )}

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            {/* Incline Angle */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>มุมพื้นเอียง (Angle θ):</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">
                  {inclineParams.angleDeg}°
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="75"
                step="1"
                value={inclineParams.angleDeg}
                onChange={(e) => onUpdateInclineParams({ angleDeg: parseInt(e.target.value) })}
                className="w-full accent-amber-600"
              />
            </div>

            {/* Mass */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>มวลวัตถุ (Mass M):</span>
                <span className="font-bold">{inclineParams.mass.toFixed(1)} kg</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="20"
                step="0.2"
                value={inclineParams.mass}
                onChange={(e) => onUpdateInclineParams({ mass: parseFloat(e.target.value) })}
                className="w-full accent-sky-600"
              />
            </div>

            {/* Radius */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>รัศมีวัตถุ (Radius R):</span>
                <span className="font-bold">{inclineParams.radius.toFixed(2)} m</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="1.0"
                step="0.05"
                value={inclineParams.radius}
                onChange={(e) => onUpdateInclineParams({ radius: parseFloat(e.target.value) })}
                className="w-full accent-sky-600"
              />
            </div>

            {/* Static Friction */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>แรงเสียดทานสถิต (μ_s):</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {inclineParams.staticFriction.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.02"
                value={inclineParams.staticFriction}
                onChange={(e) => onUpdateInclineParams({ staticFriction: parseFloat(e.target.value) })}
                className="w-full accent-emerald-600"
              />
            </div>

            {/* Kinetic Friction */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>แรงเสียดทานจลน์ (μ_k):</span>
                <span className="font-bold text-rose-600 dark:text-rose-400">
                  {inclineParams.kineticFriction.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.8"
                step="0.02"
                value={inclineParams.kineticFriction}
                onChange={(e) => onUpdateInclineParams({ kineticFriction: parseFloat(e.target.value) })}
                className="w-full accent-rose-600"
              />
            </div>

            {/* Gravity */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>ความเร่งโน้มถ่วง (g):</span>
                <span className="font-bold">{inclineParams.gravity.toFixed(2)} m/s²</span>
              </div>
              <div className="flex items-center gap-1.5">
                <input
                  type="range"
                  min="0.0"
                  max="25"
                  step="0.1"
                  value={inclineParams.gravity}
                  onChange={(e) => onUpdateInclineParams({ gravity: parseFloat(e.target.value) })}
                  className="w-full accent-stone-600"
                />
              </div>
            </div>
          </div>

          {/* Visual Overlays Checkboxes */}
          <div className="pt-2 border-t border-[var(--hairline-subtle)] space-y-2">
            <span className="text-xs font-mono font-bold text-[var(--ink-secondary)] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>การแสดงผลภาพจำลองเวกเตอร์และแผนภาพ (Visual Overlays):</span>
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showFBD}
                  onChange={(e) => onToggleFBD(e.target.checked)}
                  className="rounded text-sky-600"
                />
                <span>เวกเตอร์แรง (FBD)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showVelocityBreakdown}
                  onChange={(e) => onToggleVelocityBreakdown(e.target.checked)}
                  className="rounded text-purple-600"
                />
                <span>เวกเตอร์ความเร็ว (Chasles)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showCycloid}
                  onChange={(e) => onToggleCycloid(e.target.checked)}
                  className="rounded text-pink-600"
                />
                <span>เส้นทางไซคลอยด์ (Cycloid)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showVectors}
                  onChange={(e) => onToggleVectors(e.target.checked)}
                  className="rounded text-emerald-600"
                />
                <span>เปิดเวกเตอร์ทั้งหมด</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: FLYWHEEL CONTROLS */}
      {/* ========================================================================= */}
      {mode === 'flywheel' && (
        <div className="space-y-4 text-xs font-mono">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>มวลล้อตุนกำลัง (Flywheel M):</span>
                <span className="font-bold">{flywheelParams.flywheelMass} kg</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={flywheelParams.flywheelMass}
                onChange={(e) => onUpdateFlywheelParams({ flywheelMass: parseFloat(e.target.value) })}
                className="w-full accent-sky-600"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span>มวลแขวน (Hanging Mass m):</span>
                <span className="font-bold">{flywheelParams.hangingMass} kg</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="10"
                step="0.1"
                value={flywheelParams.hangingMass}
                onChange={(e) => onUpdateFlywheelParams({ hangingMass: parseFloat(e.target.value) })}
                className="w-full accent-indigo-600"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span>ทอร์กภายนอก (Torque τ_ext):</span>
                <span className="font-bold text-pink-600">{flywheelParams.externalTorque} N·m</span>
              </div>
              <input
                type="range"
                min="-30"
                max="30"
                step="1"
                value={flywheelParams.externalTorque}
                onChange={(e) => onUpdateFlywheelParams({ externalTorque: parseFloat(e.target.value) })}
                className="w-full accent-pink-600"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span>แรงต้านการหมุน (Damping b):</span>
                <span className="font-bold">{flywheelParams.dampingCoeff.toFixed(2)} N·m·s/rad</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.5"
                step="0.05"
                value={flywheelParams.dampingCoeff}
                onChange={(e) => onUpdateFlywheelParams({ dampingCoeff: parseFloat(e.target.value) })}
                className="w-full accent-stone-600"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: COMPOUND PENDULUM CONTROLS */}
      {/* ========================================================================= */}
      {mode === 'pendulum' && (
        <div className="space-y-4 text-xs font-mono">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>ระยะจุดหมุนจาก CM (Pivot Offset d):</span>
                <span className="font-bold text-sky-600">{pendulumParams.pivotOffset.toFixed(3)} m</span>
              </div>
              <input
                type="range"
                min="0.02"
                max={pendulumParams.length * 0.48}
                step="0.01"
                value={pendulumParams.pivotOffset}
                onChange={(e) => onUpdatePendulumParams({ pivotOffset: parseFloat(e.target.value) })}
                className="w-full accent-sky-600"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span>ความยาววัตถุ (Length L):</span>
                <span className="font-bold">{pendulumParams.length.toFixed(2)} m</span>
              </div>
              <input
                type="range"
                min="0.3"
                max="2.0"
                step="0.05"
                value={pendulumParams.length}
                onChange={(e) => onUpdatePendulumParams({ length: parseFloat(e.target.value) })}
                className="w-full accent-emerald-600"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span>มุมเริ่มต้น (Initial Angle):</span>
                <span className="font-bold text-amber-600">{pendulumParams.initialAngleDeg}°</span>
              </div>
              <input
                type="range"
                min="-90"
                max="90"
                step="5"
                value={pendulumParams.initialAngleDeg}
                onChange={(e) => onUpdatePendulumParams({ initialAngleDeg: parseInt(e.target.value) })}
                className="w-full accent-amber-600"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span>แรงหน่วงอากาศ (Damping b):</span>
                <span className="font-bold">{pendulumParams.dampingCoeff.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.5"
                step="0.01"
                value={pendulumParams.dampingCoeff}
                onChange={(e) => onUpdatePendulumParams({ dampingCoeff: parseFloat(e.target.value) })}
                className="w-full accent-stone-600"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 4: DZHANIBEKOV CONTROLS */}
      {/* ========================================================================= */}
      {mode === 'dzhanibekov' && (
        <div className="space-y-4 text-xs font-mono">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-2.5 rounded border border-rose-300 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/20 space-y-1">
              <div className="flex justify-between">
                <span className="text-rose-900 dark:text-rose-300 font-bold">I₁ (น้อยสุด):</span>
                <span>{dzhanibekovParams.I1.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                value={dzhanibekovParams.I1}
                onChange={(e) => onUpdateDzhanibekovParams({ I1: parseFloat(e.target.value) })}
                className="w-full accent-rose-600"
              />
            </div>

            <div className="p-2.5 rounded border border-emerald-300 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-1">
              <div className="flex justify-between">
                <span className="text-emerald-900 dark:text-emerald-300 font-bold">I₂ (กลาง - ไม่เสถียร):</span>
                <span>{dzhanibekovParams.I2.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="1.5"
                max="3.5"
                step="0.1"
                value={dzhanibekovParams.I2}
                onChange={(e) => onUpdateDzhanibekovParams({ I2: parseFloat(e.target.value) })}
                className="w-full accent-emerald-600"
              />
            </div>

            <div className="p-2.5 rounded border border-sky-300 dark:border-sky-900 bg-sky-50/50 dark:bg-sky-950/20 space-y-1">
              <div className="flex justify-between">
                <span className="text-sky-900 dark:text-sky-300 font-bold">I₃ (มากสุด):</span>
                <span>{dzhanibekovParams.I3.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="3.0"
                max="6.0"
                step="0.1"
                value={dzhanibekovParams.I3}
                onChange={(e) => onUpdateDzhanibekovParams({ I3: parseFloat(e.target.value) })}
                className="w-full accent-sky-600"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
