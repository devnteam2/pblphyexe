// src/components/simulation/PhysicsEquationInspector.tsx
'use client';

import React, { useState } from 'react';
import { LatexRenderer, FormattedMathText } from '@/components/math/LatexRenderer';
import {
  SimulationMode,
  RigidBodyShape,
  RIGID_BODY_PROFILES,
} from '@/types/simulation';
import {
  BookOpen,
  CheckCircle,
  AlertTriangle,
  Zap,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface PhysicsEquationInspectorProps {
  mode: SimulationMode;
  // Incline rolling states
  shape?: RigidBodyShape;
  beta?: number;
  mass?: number;
  radius?: number;
  angleDeg?: number;
  staticMu?: number;
  kineticMu?: number;
  gravity?: number;
  v?: number;
  omega?: number;
  x?: number;
  height?: number;
  a?: number;
  alpha?: number;
  isSlipping?: boolean;
  reqFriction?: number;
  maxStaticFriction?: number;
  normalForce?: number;
  kTrans?: number;
  kRot?: number;
  potentialE?: number;
  workFriction?: number;

  // Flywheel states
  flywheelMass?: number;
  flywheelRadius?: number;
  drumRadius?: number;
  hangingMass?: number;
  externalTorque?: number;
  dampingCoeff?: number;
  stringTension?: number;
  flywheelOmega?: number;
  flywheelAlpha?: number;

  // Compound pendulum states
  pendulumShape?: string;
  pendulumLength?: number;
  pivotOffset?: number;
  pendulumAngle?: number;
  pendulumOmega?: number;
  centerOfPercussion?: number;
  pendulumPeriod?: number;

  // Dzhanibekov states
  I1?: number;
  I2?: number;
  I3?: number;
  w1?: number;
  w2?: number;
  w3?: number;
  energy3D?: number;
  angularMomentumSq?: number;
}

export const PhysicsEquationInspector: React.FC<PhysicsEquationInspectorProps> = (props) => {
  const [activeTab, setActiveTab] = useState<'live' | 'fbd' | 'derivations'>('live');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const {
    mode,
    shape = 'solid_sphere',
    beta = 0.4,
    mass = 2.0,
    radius = 0.3,
    angleDeg = 30,
    staticMu = 0.4,
    kineticMu = 0.25,
    gravity = 9.8,
    v = 0,
    omega = 0,
    height = 1.5,
    a = 0,
    alpha = 0,
    isSlipping = false,
    reqFriction = 0,
    maxStaticFriction = 0,
    normalForce = 0,
    kTrans = 0,
    kRot = 0,
    potentialE = 0,
    workFriction = 0,
  } = props;

  const currentProfile = RIGID_BODY_PROFILES[shape] || RIGID_BODY_PROFILES.solid_sphere;
  const inertiaVal = beta * mass * radius * radius;
  const vSlip = v - omega * radius;
  const totalMechanicalE = kTrans + kRot + potentialE + workFriction;

  return (
    <div className="rounded-lg border border-[var(--hairline-border)] bg-[var(--surface-card)] p-4 md:p-5 shadow-xs font-serif transition-all">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--hairline-border)]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm md:text-base font-bold text-[var(--ink-primary)]">
              คำอธิบายสมการฟิสิกส์สด (Live Physics Equation Inspector)
            </h3>
            <p className="text-[11px] text-[var(--ink-secondary)] font-mono">
              แทนค่าตัวแปรตามจริงแบบ Real-time • First-Principles Formulation
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] transition-colors"
          title={isExpanded ? 'ย่อหน้าต่างสมการ' : 'ขยายหน้าต่างสมการ'}
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-3 space-y-4">
          {/* Sub Navigation */}
          <div className="flex items-center gap-1 p-0.5 rounded border border-[var(--hairline-border)] bg-[var(--surface-muted)] text-xs">
            <button
              onClick={() => setActiveTab('live')}
              className={`flex-1 py-1 rounded transition-colors text-center font-medium ${
                activeTab === 'live'
                  ? 'bg-[var(--surface-card)] text-[var(--ink-primary)] shadow-2xs font-bold'
                  : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
              }`}
            >
              สมการสด (Live Substitution)
            </button>
            <button
              onClick={() => setActiveTab('fbd')}
              className={`flex-1 py-1 rounded transition-colors text-center font-medium ${
                activeTab === 'fbd'
                  ? 'bg-[var(--surface-card)] text-[var(--ink-primary)] shadow-2xs font-bold'
                  : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
              }`}
            >
              แผนภาพแรง FBD
            </button>
            <button
              onClick={() => setActiveTab('derivations')}
              className={`flex-1 py-1 rounded transition-colors text-center font-medium ${
                activeTab === 'derivations'
                  ? 'bg-[var(--surface-card)] text-[var(--ink-primary)] shadow-2xs font-bold'
                  : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
              }`}
            >
              ที่มาและการพิสูจน์ (Proofs)
            </button>
          </div>

          {/* ========================================================================= */}
          {/* MODE 1: INCLINE ROLLING INSPECTOR */}
          {/* ========================================================================= */}
          {mode === 'incline' && (
            <div>
              {activeTab === 'live' && (
                <div className="space-y-3.5">
                  {/* Status Banner */}
                  <div
                    className={`p-3 rounded-lg border flex items-center justify-between text-xs ${
                      !isSlipping
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300'
                        : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {!isSlipping ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                      )}
                      <div>
                        <span className="font-bold block text-sm">
                          {!isSlipping
                            ? 'กลิ้งโดยไม่ไถลบริสุทธิ์ (Pure Rolling Without Slipping)'
                            : 'เกิดการไถล/ลื่น (Slipping & Skidding Regime)'}
                        </span>
                        <span className="text-[11px] opacity-90">
                          {!isSlipping
                            ? `แรงเสียดทานที่ต้องการ f_req (${reqFriction.toFixed(2)} N) ≤ f_s,max (${maxStaticFriction.toFixed(2)} N, μ_s=${staticMu.toFixed(2)})`
                            : `แรงเสียดทานไม่พอ f_req (${reqFriction.toFixed(2)} N) > f_s,max (${maxStaticFriction.toFixed(2)} N, μ_s=${staticMu.toFixed(2)}) เกิดแรงเสียดทานจลน์ f_k`}
                        </span>
                      </div>
                    </div>
                    <div className="text-right font-mono text-xs">
                      <div className="font-bold">v_slip = {vSlip.toFixed(3)} m/s</div>
                      <div className="text-[10px] opacity-80">v - ωR</div>
                    </div>
                  </div>

                  {/* 1. Moment of Inertia Equation */}
                  <div className="rounded border border-[var(--hairline-border)] bg-[var(--surface-muted)] p-2.5 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--ink-secondary)]">
                      <span>1. โมเมนต์ความเฉื่อยรอบจุดศูนย์กลางมวล (Moment of Inertia)</span>
                      <span className="font-bold text-sky-600 dark:text-sky-400">
                        {currentProfile.nameTh}
                      </span>
                    </div>
                    <LatexRenderer
                      displayMode
                      math={`I_{cm} = \\beta M R^2 = (${beta.toFixed(3)}) \\times (${mass.toFixed(2)}\\,\\text{kg}) \\times (${radius.toFixed(2)}\\,\\text{m})^2 = \\mathbf{${inertiaVal.toFixed(4)}\\,\\text{kg}\\cdot\\text{m}^2}`}
                      className="text-xs"
                    />
                  </div>

                  {/* 2. Acceleration Equation */}
                  <div className="rounded border border-[var(--hairline-border)] bg-[var(--surface-muted)] p-2.5 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--ink-secondary)]">
                      <span>2. สมการความเร่งเชิงเส้นและเชิงมุม (Accelerations)</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        θ = {angleDeg}°
                      </span>
                    </div>
                    {!isSlipping ? (
                      <LatexRenderer
                        displayMode
                        math={`a_{cm} = \\frac{g \\sin\\theta}{1 + \\beta} = \\frac{${gravity.toFixed(2)} \\times \\sin(${angleDeg}^\\circ)}{1 + ${beta.toFixed(3)}} = \\mathbf{${a.toFixed(3)}\\,\\text{m/s}^2}, \\quad \\alpha = \\frac{a_{cm}}{R} = \\mathbf{${alpha.toFixed(3)}\\,\\text{rad/s}^2}`}
                        className="text-xs"
                      />
                    ) : (
                      <LatexRenderer
                        displayMode
                        math={`a_{cm} = g(\\sin\\theta - \\mu_k\\cos\\theta) = \\mathbf{${a.toFixed(3)}\\,\\text{m/s}^2}, \\quad \\alpha = \\frac{\\mu_k g \\cos\\theta}{\\beta R} = \\mathbf{${alpha.toFixed(3)}\\,\\text{rad/s}^2}`}
                        className="text-xs"
                      />
                    )}
                  </div>

                  {/* 3. Chasles' Theorem & Contact Point */}
                  <div className="rounded border border-[var(--hairline-border)] bg-[var(--surface-muted)] p-2.5 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--ink-secondary)]">
                      <span>3. ทฤษฎีบทชาส์ล: การแยกความเร็วทุกจุด (Chasles&apos; Superposition)</span>
                      <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400">
                        ICZV: จุดสัมผัสพื้น
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono py-1">
                      <div className="p-1.5 rounded bg-[var(--surface-card)] border border-[var(--hairline-border)]">
                        <span className="text-[10px] text-[var(--ink-secondary)] block">จุดสัมผัสพื้น (Contact)</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          v = {(v - omega * radius).toFixed(2)} m/s
                        </span>
                        <span className="text-[9px] text-stone-400 block">{!isSlipping ? 'v = 0 (จุดหมุนชั่วขณะ)' : 'ไถลสัมพัทธ์'}</span>
                      </div>
                      <div className="p-1.5 rounded bg-[var(--surface-card)] border border-[var(--hairline-border)]">
                        <span className="text-[10px] text-[var(--ink-secondary)] block">จุดศูนย์กลางมวล (CM)</span>
                        <span className="font-bold text-sky-600 dark:text-sky-400">
                          v = {v.toFixed(2)} m/s
                        </span>
                        <span className="text-[9px] text-stone-400 block">v_cm = ωR</span>
                      </div>
                      <div className="p-1.5 rounded bg-[var(--surface-card)] border border-[var(--hairline-border)]">
                        <span className="text-[10px] text-[var(--ink-secondary)] block">จุดยอดบนสุด (Top Rim)</span>
                        <span className="font-bold text-purple-600 dark:text-purple-400">
                          v = {(v + omega * radius).toFixed(2)} m/s
                        </span>
                        <span className="text-[9px] text-stone-400 block">{!isSlipping ? 'v = 2 v_cm' : 'v_cm + ωR'}</span>
                      </div>
                    </div>
                  </div>

                  {/* 4. Energy Conservation and Partition */}
                  <div className="rounded border border-[var(--hairline-border)] bg-[var(--surface-muted)] p-2.5 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--ink-secondary)]">
                      <span>4. การแจกแจงพลังงานกลรวม (Mechanical Energy Partition)</span>
                      <span className="font-bold text-purple-600 dark:text-purple-400">
                        E_total = {totalMechanicalE.toFixed(2)} J
                      </span>
                    </div>
                    <LatexRenderer
                      displayMode
                      math={`E = \\underbrace{\\frac{1}{2}M v^2}_{K_{trans}=${kTrans.toFixed(2)}\\text{J}} + \\underbrace{\\frac{1}{2}I \\omega^2}_{K_{rot}=${kRot.toFixed(2)}\\text{J}} + \\underbrace{Mgh}_{U=${potentialE.toFixed(2)}\\text{J}\\,(h=${height.toFixed(2)}\\text{m})} ${workFriction > 0.05 ? `+ \\underbrace{W_{f,diss}}_{${workFriction.toFixed(2)}\\text{J}}` : ''}`}
                      className="text-xs"
                    />

                    {/* Progress Bar of Energy breakdown */}
                    <div className="w-full h-3 rounded-full overflow-hidden bg-stone-200 dark:bg-stone-800 flex text-[9px] font-mono text-white">
                      <div
                        style={{ width: `${Math.min(100, (kTrans / Math.max(1, totalMechanicalE)) * 100)}%` }}
                        className="bg-sky-500 transition-all flex items-center justify-center"
                        title={`K_trans: ${kTrans.toFixed(1)} J`}
                      />
                      <div
                        style={{ width: `${Math.min(100, (kRot / Math.max(1, totalMechanicalE)) * 100)}%` }}
                        className="bg-purple-500 transition-all flex items-center justify-center"
                        title={`K_rot: ${kRot.toFixed(1)} J`}
                      />
                      <div
                        style={{ width: `${Math.min(100, (potentialE / Math.max(1, totalMechanicalE)) * 100)}%` }}
                        className="bg-amber-500 transition-all flex items-center justify-center"
                        title={`U: ${potentialE.toFixed(1)} J`}
                      />
                      <div
                        style={{ width: `${Math.min(100, (workFriction / Math.max(1, totalMechanicalE)) * 100)}%` }}
                        className="bg-rose-500 transition-all flex items-center justify-center"
                        title={`W_friction loss: ${workFriction.toFixed(1)} J`}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-[var(--ink-tertiary)] pt-0.5">
                      <span className="text-sky-600 dark:text-sky-400">■ K_trans: {kTrans.toFixed(1)}J</span>
                      <span className="text-purple-600 dark:text-purple-400">■ K_rot: {kRot.toFixed(1)}J</span>
                      <span className="text-amber-600 dark:text-amber-400">■ U_pot: {potentialE.toFixed(1)}J</span>
                      {workFriction > 0.05 && (
                        <span className="text-rose-600 dark:text-rose-400">■ สูญเสีย: {workFriction.toFixed(1)}J</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* FBD TAB */}
              {activeTab === 'fbd' && (
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded border border-[var(--hairline-border)] bg-[var(--surface-muted)] space-y-2">
                    <h4 className="font-bold text-[var(--ink-primary)]">
                      การแยกแรงและทอร์กรอบจุดศูนย์กลางมวล (Free Body Analysis):
                    </h4>
                    <ul className="space-y-2.5 text-[var(--ink-secondary)]">
                      <li className="space-y-1">
                        <strong className="text-emerald-600 dark:text-emerald-400">1. แรงปฏิกิริยาตั้งฉาก (Normal Force):</strong>
                        <LatexRenderer
                          displayMode
                          math={`N = Mg\\cos\\theta = (${mass.toFixed(1)})(${gravity.toFixed(1)})\\cos(${angleDeg}^\\circ) = \\mathbf{${normalForce.toFixed(2)}\\,\\text{N}}`}
                          className="text-xs"
                        />
                        <span className="text-[11px] text-[var(--ink-tertiary)] block">
                          แนวแรงลากผ่านแกนหมุน CM จึงไม่ก่อให้เกิดทอร์ก ($\tau_N = 0$)
                        </span>
                      </li>
                      <li className="space-y-1">
                        <strong className="text-amber-600 dark:text-amber-400">2. แรงโน้มถ่วงขนานพื้น (Parallel Gravity Component):</strong>
                        <LatexRenderer
                          displayMode
                          math={`F_\\parallel = Mg\\sin\\theta = (${mass.toFixed(1)})(${gravity.toFixed(1)})\\sin(${angleDeg}^\\circ) = \\mathbf{${(mass * gravity * Math.sin((angleDeg * Math.PI) / 180)).toFixed(2)}\\,\\text{N}}`}
                          className="text-xs"
                        />
                        <span className="text-[11px] text-[var(--ink-tertiary)] block">
                          ทำหน้าที่ดึงจุดศูนย์กลางมวลให้มีความเร่งเลื่อนตำแหน่งลงตามพื้นเอียง
                        </span>
                      </li>
                      <li className="space-y-1">
                        <strong className="text-rose-600 dark:text-rose-400">3. แรงเสียดทานและทอร์ก (Friction & Torque):</strong>
                        <LatexRenderer
                          displayMode
                          math={`f = \\mathbf{${(!isSlipping ? reqFriction : kineticMu * normalForce).toFixed(2)}\\,\\text{N}}, \\quad \\tau_{cm} = f \\cdot R = (${(!isSlipping ? reqFriction : kineticMu * normalForce).toFixed(2)})(${radius.toFixed(2)}) = \\mathbf{${((!isSlipping ? reqFriction : kineticMu * normalForce) * radius).toFixed(3)}\\,\\text{N}\\cdot\\text{m}}`}
                          className="text-xs"
                        />
                        <span className="text-[11px] text-[var(--ink-tertiary)] block">
                          กระทำที่จุดสัมผัสขอบนอก จึงสร้างทอร์กตามเข็มนาฬิกาหมุนรอบจุด CM
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-3 rounded border border-sky-300 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-300 space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-sky-600" />
                      <span>ทำไมแรงเสียดทานสถิตจึงไม่กินงานกลในกรณี Pure Rolling?</span>
                    </div>
                    <div className="text-[11px] leading-relaxed">
                      <FormattedMathText text="เพราะจุดสัมผัสระหว่างผิววัตถุกับพื้นมีความเร็วสัมพัทธ์ขณะสัมผัส $v_{contact} = 0$ เสมอ! การเคลื่อนที่ของจุดสัมผัสเป็นเพียงการแตะแล้วยกตัวขึ้นแบบเส้นโค้งไซคลอยด์ (Cycloid) ไม่มีระยะกระจัดสัมพัทธ์ในแนวขนานพื้น $\implies W = \int \vec{f}_s \cdot d\vec{s}_{rel} = 0$ พลังงานกลรวม $E = K + U$ จึงอนุรักษ์ 100%!" />
                    </div>
                  </div>
                </div>
              )}

              {/* DERIVATIONS TAB */}
              {activeTab === 'derivations' && (
                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="p-3 rounded border border-[var(--hairline-border)] bg-[var(--surface-muted)] space-y-2">
                    <h4 className="font-bold text-[var(--ink-primary)]">
                      การพิสูจน์ความเร่งของการกลิ้งจากกฎข้อที่สองของนิวตัน:
                    </h4>
                    <p className="text-[var(--ink-secondary)]">
                      1. สมการการเลื่อนตำแหน่งตามแนวพื้นเอียง:
                    </p>
                    <LatexRenderer displayMode math="Mg\sin\theta - f = M a_{cm} \quad \text{--- (1)}" />
                    <p className="text-[var(--ink-secondary)]">
                      2. สมการการหมุนรอบจุด CM:
                    </p>
                    <LatexRenderer displayMode math="\tau_{cm} = f R = I_{cm} \alpha = (\beta M R^2) \alpha \implies f = \beta M R \alpha \quad \text{--- (2)}" />
                    <p className="text-[var(--ink-secondary)]">
                      <FormattedMathText text="3. เงื่อนไขการกลิ้งไม่ไถล $a_{cm} = \alpha R \implies f = \beta M a_{cm}$ แทนลงใน (1):" />
                    </p>
                    <LatexRenderer displayMode math="Mg\sin\theta - \beta M a_{cm} = M a_{cm} \implies a_{cm} = \frac{g\sin\theta}{1 + \beta}" />
                    <p className="text-[var(--ink-secondary)]">
                      <FormattedMathText text="4. แทน $a_{cm}$ กลับไปหาแรงเสียดทานสถิตที่ต้องการ:" />
                    </p>
                    <LatexRenderer displayMode math="f_s = \frac{\beta}{1 + \beta} M g \sin\theta \le \mu_s M g \cos\theta \iff \tan\theta \le \mu_s \frac{1 + \beta}{\beta}" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODE 2: FLYWHEEL INSPECTOR */}
          {/* ========================================================================= */}
          {mode === 'flywheel' && (
            <div className="space-y-3">
              <div className="rounded border border-[var(--hairline-border)] bg-[var(--surface-muted)] p-3 space-y-2">
                <span className="text-xs font-mono font-bold text-[var(--ink-primary)] block">
                  สมการระบบล้อตุนกำลังและมวลแขวน (Flywheel-Hanging Mass Equations)
                </span>
                <LatexRenderer
                  displayMode
                  math="\tau_{net} = T r + \tau_{ext} - b\omega = I \alpha, \quad mg - T = ma"
                  className="text-xs"
                />
                <LatexRenderer
                  displayMode
                  math={`\\alpha = \\frac{mgr + \\tau_{ext} - b\\omega}{I + mr^2} = \\mathbf{${(props.flywheelAlpha || 0).toFixed(3)}\\,\\text{rad/s}^2}`}
                  className="text-xs"
                />
                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                  <div className="p-2 rounded bg-[var(--surface-card)] border border-[var(--hairline-border)]">
                    <span className="text-stone-500 block text-[10px]">แรงตึงเชือก T:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {(props.stringTension || 0).toFixed(2)} N
                    </span>
                  </div>
                  <div className="p-2 rounded bg-[var(--surface-card)] border border-[var(--hairline-border)]">
                    <span className="text-stone-500 block text-[10px]">โมเมนตัมเชิงมุม L = Iω:</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">
                      {((props.flywheelMass || 10) * 0.5 * Math.pow(props.flywheelRadius || 0.4, 2) * (props.flywheelOmega || 0)).toFixed(3)} J·s
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODE 3: COMPOUND PENDULUM INSPECTOR */}
          {/* ========================================================================= */}
          {mode === 'pendulum' && (
            <div className="space-y-3">
              <div className="rounded border border-[var(--hairline-border)] bg-[var(--surface-muted)] p-3 space-y-2">
                <span className="text-xs font-mono font-bold text-[var(--ink-primary)] block">
                  ทฤษฎีบทแกนขนาน (Steiner&apos;s Parallel-Axis Theorem) & คาบการแกว่ง
                </span>
                <LatexRenderer
                  displayMode
                  math={`I_{pivot} = I_{cm} + M d^2`}
                  className="text-xs"
                />
                <LatexRenderer
                  displayMode
                  math={`T = 2\\pi \\sqrt{\\frac{I_{pivot}}{M g d}} = 2\\pi \\sqrt{\\frac{L_{eq}}{g}} \\approx \\mathbf{${(props.pendulumPeriod || 0).toFixed(3)}\\,\\text{s}}`}
                  className="text-xs"
                />
                <div className="p-2.5 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs space-y-1">
                  <span className="font-bold block">
                    จุดศูนย์กลางการแกว่ง / Sweet Spot (Center of Percussion):
                  </span>
                  <div className="text-[11px] space-y-1">
                    <span>ระยะจากจุดหมุน: </span>
                    <LatexRenderer math={`L_{eq} = \\frac{I_{pivot}}{Md} = \\mathbf{${(props.centerOfPercussion || 0).toFixed(3)}\\,\\text{m}}`} />
                    <span className="block text-stone-500">
                      (ตำแหน่งที่หากตีลูกเบสบอล จะไม่เกิดแรงกระแทกย้อนกลับสะท้านมาที่มือที่จุดหมุน!)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODE 4: DZHANIBEKOV INSPECTOR */}
          {/* ========================================================================= */}
          {mode === 'dzhanibekov' && (
            <div className="space-y-3">
              <div className="rounded border border-[var(--hairline-border)] bg-[var(--surface-muted)] p-3 space-y-2">
                <span className="text-xs font-mono font-bold text-[var(--ink-primary)] block">
                  สมการออยเลอร์สำหรับการหมุนอิสระ 3 มิติ (Euler&apos;s Rotational Equations)
                </span>
                <LatexRenderer
                  displayMode
                  math="I_1 \dot{\omega}_1 = (I_2 - I_3)\omega_2\omega_3, \quad I_2 \dot{\omega}_2 = (I_3 - I_1)\omega_3\omega_1, \quad I_3 \dot{\omega}_3 = (I_1 - I_2)\omega_1\omega_2"
                  className="text-xs"
                />
                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                  <div className="p-2 rounded bg-[var(--surface-card)] border border-[var(--hairline-border)]">
                    <span className="text-stone-500 block text-[10px]">พลังงานจลน์คงตัว 2E:</span>
                    <span className="font-bold text-sky-600 dark:text-sky-400">
                      {(props.energy3D || 0).toFixed(3)} J
                    </span>
                  </div>
                  <div className="p-2 rounded bg-[var(--surface-card)] border border-[var(--hairline-border)]">
                    <span className="text-stone-500 block text-[10px]">ขนาดโมเมนตัมเชิงมุม L²:</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">
                      {(props.angularMomentumSq || 0).toFixed(3)} (J·s)²
                    </span>
                  </div>
                </div>
                <div className="p-2.5 rounded bg-purple-50 dark:bg-purple-950/40 border border-purple-300 dark:border-purple-800 text-purple-900 dark:text-purple-300 text-xs">
                  <strong className="block">Intermediate Axis Theorem (Tennis Racket Theorem):</strong>
                  <div className="text-[11px] leading-relaxed">
                    <FormattedMathText text="การหมุนรอบแกนที่มี $I_1$ (น้อยสุด) หรือ $I_3$ (มากสุด) มีเสถียรภาพสูง แต่การหมุนรอบแกนที่มีค่ากลาง $I_2$ เป็นจุดอานม้า (Hyperbolic Saddle) ซึ่งทำให้ความปั่นป่วนเพียงเล็กน้อยขยายตัวจนเกิดการพลิกกลับ 180° ซ้ำไปซ้ำมา" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
