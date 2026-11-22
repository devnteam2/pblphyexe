// src/components/formula/FormulaSheetModal.tsx
'use client';

import React, { useState } from 'react';
import { FormattedMathText, LatexRenderer } from '@/components/math/LatexRenderer';
import { BookMarked, X, Search } from 'lucide-react';

interface FormulaSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormulaItem {
  nameTh: string;
  category: string;
  latex: string;
  noteTh: string;
}

const FORMULA_DATABASE: FormulaItem[] = [
  {
    nameTh: 'การประมาณมุมเล็ก (Small-Angle Taylor)',
    category: 'Math Tools',
    latex: '\\sin\\theta \\approx \\theta, \\quad \\cos\\theta \\approx 1 - \\frac{\\theta^2}{2}, \\quad \\tan\\theta \\approx \\theta',
    noteTh: 'ใช้ได้เมื่อ $\\theta$ วัดในหน่วยเรเดียนและ $|\\theta| \\ll 1$',
  },
  {
    nameTh: 'การกระจายทวินาม (Binomial Approx)',
    category: 'Math Tools',
    latex: '(1 + x)^n \\approx 1 + nx + \\frac{n(n-1)}{2}x^2',
    noteTh: 'ใช้ได้เมื่อ $|x| \\ll 1$ และ $n$ เป็นจำนวนจริงใดๆ',
  },
  {
    nameTh: 'กฎลูกโซ่ความเร่ง (Chain Rule Acceleration)',
    category: 'Kinematics',
    latex: 'a = \\frac{dv}{dt} = v\\frac{dv}{dx}',
    noteTh: 'ใช้อินทิเกรตทันทีเมื่อความเร่งขึ้นกับตำแหน่ง $a(x)$ หรือความเร็ว $a(v)$',
  },
  {
    nameTh: 'แรงต้านอากาศ Stokes (Linear Drag)',
    category: 'Kinematics',
    latex: 'v(t) = \\frac{mg}{b}\\left( 1 - e^{-\\frac{b}{m}t} \\right), \\quad v_{term} = \\frac{mg}{b}',
    noteTh: 'อัตราเร็วสุดท้ายและการลู่เข้าเชิงเอกซ์โพเนนเชียล',
  },
  {
    nameTh: 'เงื่อนไขความยาวเชือกรอก (Virtual Tension Work)',
    category: 'Newton & Constraints',
    latex: '\\sum_{i} \\vec{T}_i \\cdot \\vec{a}_i = 0',
    noteTh: 'งานเสมือนของแรงตึงเชือกในระบบรอกเบาเชือกเบาไม่ยืดหยุ่น',
  },
  {
    nameTh: 'แรงเฉื่อยเทียมในกรอบไม่เฉื่อย (Fictitious Force)',
    category: 'Newton & Constraints',
    latex: '\\vec{F}_{fict} = -m\\vec{A}_{frame}',
    noteTh: 'ทิศทางตรงกันข้ามกับความเร่งของกรอบอ้างอิงเสมอ',
  },
  {
    nameTh: 'ความสัมพันธ์แรงกับความชันศักย์ (Force-Potential Gradient)',
    category: 'Work & Energy',
    latex: 'F(x) = -\\frac{dU}{dx}, \\quad \\vec{F} = -\\vec{\\nabla} U',
    noteTh: 'แรงกระทำชี้ไปในทิศที่พลังงานศักย์ลดลงเร็วที่สุดเสมอ',
  },
  {
    nameTh: 'ความถี่รอบจุดสมดุลเสถียร (Equilibrium Oscillation)',
    category: 'Work & Energy',
    latex: '\\omega = \\sqrt{\\frac{k_{eff}}{m}} = \\sqrt{\\frac{1}{m}\\left. \\frac{d^2U}{dx^2} \\right|_{x_0}}',
    noteTh: 'เมื่อ $x_0$ เป็นจุดต่ำสุดของหลุมศักย์ ($U\'(x_0)=0, U\'\'(x_0)>0$)',
  },
  {
    nameTh: 'โมเมนต์ความเฉื่อยแท่งหมุนรอบปลาย (Rod about end)',
    category: 'Rotation',
    latex: 'I_{end} = \\int_0^L x^2 \\left(\\frac{M}{L}\\right) dx = \\frac{1}{3}ML^2',
    noteTh: 'ถ้าหมุนรอบ CM ตรงกลางจะเป็น $\\frac{1}{12}ML^2$',
  },
  {
    nameTh: 'ทฤษฎีบทแกนขนาน (Parallel-Axis Theorem)',
    category: 'Rotation',
    latex: 'I = I_{cm} + Md^2',
    noteTh: 'แกนใหม่ต้องขนานกับแกนที่ผ่านจุด CM เสมอ',
  },
  {
    nameTh: 'การกลิ้งโดยไม่ไถล (Pure Rolling Condition)',
    category: 'Rotation',
    latex: 'v_{cm} = \\omega R, \\quad a_{cm} = \\alpha R',
    noteTh: 'จุดสัมผัสกับพื้นมีอัตราเร็วสัมพัทธ์กับพื้นเป็นศูนย์ชั่วขณะ',
  },
  {
    nameTh: 'วิธีอนุรักษ์พลังงานหาคาบ SHM (Energy Method)',
    category: 'Oscillations & Resonance',
    latex: '\\frac{dE}{dt} = 0 \\iff \\frac{d}{dt}(E_k + E_p) = 0',
    noteTh: 'ดิฟสมการพลังงานกลรวมเทียบเวลาเพื่อดึงสมการเชิงอนุพันธ์อันดับสอง',
  },
  // --- K&K Ch. 1: Polar Kinematics ---
  {
    nameTh: 'อนุพันธ์เวกเตอร์ฐานเชิงขั้ว (Rotating Unit Vectors)',
    category: 'Kinematics',
    latex: '\\frac{d\\hat{r}}{dt} = \\dot{\\theta}\\hat{\\theta}, \\qquad \\frac{d\\hat{\\theta}}{dt} = -\\dot{\\theta}\\hat{r}',
    noteTh: 'อนุพันธ์ของเวกเตอร์ที่ขนาดคงที่ตั้งฉากกับตัวมันเองในทิศมุม $\\theta$ เพิ่มขึ้น',
  },
  {
    nameTh: 'ความเร็วและความเร่งในพิกัดเชิงขั้ว (Polar Velocity & Accel.)',
    category: 'Kinematics',
    latex: '\\vec{v} = \\dot{r}\\hat{r} + r\\dot{\\theta}\\hat{\\theta}, \\qquad \\vec{a} = (\\ddot{r} - r\\dot{\\theta}^2)\\hat{r} + (r\\ddot{\\theta} + 2\\dot{r}\\dot{\\theta})\\hat{\\theta}',
    noteTh: 'ระวังว่า $v_r \\neq \\int a_r\\,dt$ และเทอม $2\\dot{r}\\dot{\\theta}$ คือความเร่งคอริโอลิส',
  },
  // --- K&K Ch. 2–3: Constraints & Continuous Media ---
  {
    nameTh: 'สมการข้อจำกัดลิ่มเคลื่อนที่ (Wedge Constraint & Acceleration)',
    category: 'Newton & Constraints',
    latex: '\\ddot{y} = (\\ddot{x} - \\ddot{X})\\tan\\theta, \\qquad A_X = \\frac{mg\\sin\\theta\\cos\\theta}{M + m\\sin^2\\theta}',
    noteTh: 'ใช้พิกัด $(x,y,X)$ เทียบกรอบเฉื่อยแล้วตรวจสอบลิมิต $M \\to \\infty$ และ $\\theta \\to \\pi/2$',
  },
  {
    nameTh: 'ขีดจำกัดวิกฤตเพนดูลัมกรวย (Conical Pendulum Bifurcation)',
    category: 'Newton & Constraints',
    latex: '\\cos\\alpha = \\frac{g}{l\\omega^2}, \\qquad \\omega_c = \\sqrt{\\frac{g}{l}}',
    noteTh: 'กางออก ($\\alpha > 0$) ได้เมื่อ $\\omega > \\omega_c$ เท่านั้น ห้ามหารตัด $\\sin\\alpha$ โดยไม่แยกกรณี',
  },
  {
    nameTh: 'แรงตึงเชือกที่หมุนควง (Whirling Rope Tension)',
    category: 'Newton & Constraints',
    latex: 'T(r) = \\frac{M\\omega^2}{2L}(L^2 - r^2)',
    noteTh: 'พาราโบลาคว่ำ สูงสุดที่จุดหมุน $r = 0$ และเป็นศูนย์ที่ปลายอิสระ $r = L$',
  },
  {
    nameTh: 'สมการแคปสแตน (Capstan Friction Equation)',
    category: 'Newton & Constraints',
    latex: 'T_B = T_A e^{\\mu\\theta}',
    noteTh: 'แรงตึงขยายตัวแบบเอกซ์โพเนนเชียลตามมุม $\\theta$ (เรเดียน) ที่เชือกพันรอบเสา',
  },
  // --- K&K Ch. 4: Momentum & Variable Mass ---
  {
    nameTh: 'จุดศูนย์กลางมวลแบบต่อเนื่อง (Continuous Center of Mass)',
    category: 'Momentum & Variable Mass',
    latex: '\\vec{R}_{\\text{cm}} = \\frac{1}{M}\\int \\vec{r}\\,dm, \\qquad \\vec{F}_{\\text{ext}} = M\\vec{A}_{\\text{cm}}',
    noteTh: 'ครึ่งทรงกลมตันมี $Z_{\\text{cm}} = \\frac{3}{8}R$ และครึ่งทรงกลมกลวงมี $Z_{\\text{cm}} = \\frac{1}{2}R$',
  },
  {
    nameTh: 'สมการจรวดของซิโอลคอฟสกี (Rocket Equation)',
    category: 'Momentum & Variable Mass',
    latex: 'M\\frac{dv}{dt} = -u\\frac{dM}{dt} - Mg \\implies v_f - v_0 = u\\ln\\left(\\frac{M_0}{M_f}\\right) - gt_f',
    noteTh: 'ต้องใช้วิธีระบบปิด (Closed-System Boundary) ห้ามใช้สูตรผิดๆ อย่าง $F = m\\dot{v} + v\\dot{m}$',
  },
  {
    nameTh: 'แรงจากกระแสโมเมนตัม (Momentum Flux Force)',
    category: 'Momentum & Variable Mass',
    latex: '\\vec{F} = \\frac{d\\vec{P}}{dt} = \\frac{dm}{dt}\\Delta\\vec{v} = (\\rho A v)\\Delta\\vec{v}',
    noteTh: 'ใช้กับสายน้ำพุ่งชนกำแพง กังหัน และโจทย์โซ่ตกลงบนตาชั่ง ($N = 3\\lambda g x$)',
  },
  // --- K&K Ch. 5–6: Work, Energy, Collisions ---
  {
    nameTh: 'ทฤษฎีบทงาน-พลังงาน 3 มิติ (3D Work-Energy Theorem)',
    category: 'Work & Energy',
    latex: 'W_{ba} = \\int_{\\vec{r}_a}^{\\vec{r}_b} \\vec{F}\\cdot d\\vec{r} = \\frac{1}{2}mv_b^2 - \\frac{1}{2}mv_a^2',
    noteTh: 'จริงสำหรับแรงทุกชนิด แรงตั้งฉากจากรางอยู่นิ่งไม่ทำงาน ($\\vec{N}\\cdot d\\vec{r}=0$)',
  },
  {
    nameTh: 'เกณฑ์สนามแรงอนุรักษ์ (Conservative Field Curl Test)',
    category: 'Work & Energy',
    latex: '\\vec{F} = -\\vec{\\nabla} U \\iff \\vec{\\nabla} \\times \\vec{F} = \\vec{0}',
    noteTh: 'ตรวจสอบในระนาบ 2 มิติด้วยเงื่อนไข $\\frac{\\partial F_y}{\\partial x} = \\frac{\\partial F_x}{\\partial y}$',
  },
  {
    nameTh: 'ทางลัดพลังงานกำลังสอง (Quadratic Energy Form)',
    category: 'Work & Energy',
    latex: 'E = \\frac{1}{2}B\\dot{q}^2 + \\frac{1}{2}A q^2 \\implies \\omega = \\sqrt{\\frac{A}{B}}',
    noteTh: 'เขียนพลังงานของตัวแปรอิสระ $q$ ใกล้สมดุลแล้วอ่าน $\\omega$ ได้ทันทีโดยไม่ต้องดิฟ',
  },
  {
    nameTh: 'มวลลดทอนของระบบสองอนุภาค (Reduced Mass)',
    category: 'Work & Energy',
    latex: '\\mu = \\frac{m_1 m_2}{m_1 + m_2}, \\qquad K_{\\text{rel}} = \\frac{1}{2}\\mu v_{\\text{rel}}^2',
    noteTh: 'ลดรูปปัญหาระบบสองวัตถุอิสระให้อยู่ในรูปอนุภาคเดี่ยวที่มีมวล $\\mu$',
  },
  {
    nameTh: 'การชนยืดหยุ่น C-Frame สู่ L-Frame (Scattering Angle)',
    category: 'Work & Energy',
    latex: '\\tan\\theta_1 = \\frac{\\sin\\Theta}{(m_1/m_2) + \\cos\\Theta}, \\qquad \\sin\\theta_{1,\\max} = \\frac{m_2}{m_1} \\; (m_1 > m_2)',
    noteTh: 'ใน C-Frame อัตราเร็วไม่เปลี่ยนหลังชนยืดหยุ่น เหลือแค่หมุนมุมกระเจิง $\\Theta$',
  },
  // --- K&K Ch. 7–8: Rigid Bodies & Gyroscope ---
  {
    nameTh: 'ทฤษฎีบทของชาส์ล 2 มิติ (Chasles Decomposition)',
    category: 'Rotation',
    latex: '\\vec{F}_{\\text{ext}} = M\\vec{A}_{\\text{cm}}, \\quad \\tau_{\\text{cm}} = I_0\\alpha, \\quad K = \\frac{1}{2}MV^2 + \\frac{1}{2}I_0\\omega^2',
    noteTh: 'สมการ $\\tau_{\\text{cm}} = I_0\\alpha$ ใช้ได้เสมอแม้จุด CM กำลังมีความเร่ง!',
  },
  {
    nameTh: 'ลูกตุ้มกายภาพและศูนย์การกระทบ (Physical Pendulum & Percussion)',
    category: 'Rotation',
    latex: 'T = 2\\pi\\sqrt{\\frac{I_P}{MgL}}, \\qquad l_{\\text{perc}} = \\frac{I_P}{ML} = L + \\frac{I_0}{ML}',
    noteTh: 'เมื่อตีวัตถุที่ระยะ $l_{\\text{perc}}$ จากจุดหมุน แรงดลปฏิกิริยาที่จุดหมุนจะเป็นศูนย์',
  },
  {
    nameTh: 'การหมุนควงของไจโรสโคป (Gyroscopic Precession)',
    category: 'Rotation',
    latex: '\\vec{\\tau} = \\frac{d\\vec{L}}{dt} \\implies \\Omega = \\frac{Mgl}{I_0\\omega_s}',
    noteTh: 'ใช้ได้ในขีดจำกัดปั่นเร็วมาก $\\omega_s \\gg \\Omega$ ทอร์กที่ตั้งฉากทำให้ $\\vec{L}$ เบนทิศในแนวระดับ',
  },
  // --- K&K Ch. 9–10: Non-Inertial & Central Forces ---
  {
    nameTh: 'แรงเทียมในกรอบหมุน: คอริโอลิสและหนีศูนย์กลาง (Rotating Frame Forces)',
    category: 'Non-Inertial & Orbits',
    latex: 'm\\vec{a}_{\\text{rot}} = \\vec{F}_{\\text{real}} - 2m(\\vec{\\Omega}\\times\\vec{v}_{\\text{rot}}) - m\\vec{\\Omega}\\times(\\vec{\\Omega}\\times\\vec{r})',
    noteTh: 'แรงคอริโอลิสตั้งฉากกับ $\\vec{v}_{\\text{rot}}$ จึงไม่ทำงาน; น้ำในถังหมุนโค้งเป็น $z = \\frac{\\Omega^2 r^2}{2g}$',
  },
  {
    nameTh: 'ศักย์ยังผลและกฎพื้นที่ของเคปเลอร์ (Effective Potential)',
    category: 'Non-Inertial & Orbits',
    latex: 'U_{\\text{eff}}(r) = \\frac{L^2}{2\\mu r^2} + U(r), \\qquad \\frac{dA}{dt} = \\frac{L}{2\\mu} = \\text{const}',
    noteTh: 'ลดรูปวงโคจร 2 มิติลงสู่กราฟศักย์ 1 มิติด้วยกำแพงหนีศูนย์กลาง $L^2/(2\\mu r^2)$',
  },
  {
    nameTh: 'สมการ Vis-Viva และกฎข้อที่ 3 ของเคปเลอร์ (Elliptic Orbits)',
    category: 'Non-Inertial & Orbits',
    latex: 'E = -\\frac{GMm}{2a}, \\quad v^2 = GM\\left(\\frac{2}{r} - \\frac{1}{a}\\right), \\quad T^2 = \\frac{4\\pi^2}{GM}a^3',
    noteTh: 'พลังงานวงโคจรวงรีขึ้นกับแกนกึ่งเอก $a = (r_p + r_a)/2$ เพียงอย่างเดียว',
  },
  // --- K&K Ch. 6.4 & 11: Oscillations & Resonance ---
  {
    nameTh: 'โหมดปกติของลูกตุ้มคู่ควบ (Coupled Pendulum Normal Modes)',
    category: 'Oscillations & Resonance',
    latex: '\\omega_1 = \\sqrt{\\frac{g}{l}}, \\qquad \\omega_2 = \\sqrt{\\frac{g}{l} + \\frac{2k}{m}}, \\qquad t_{\\text{swap}} = \\frac{\\pi}{\\omega_2 - \\omega_1}',
    noteTh: 'ตั้งพิกัดปกติ $q_1 = x_a+x_b$ (แกว่งพร้อม) และ $q_2 = x_a-x_b$ (แกว่งสวนทาง)',
  },
  {
    nameTh: 'ตัวสั่นแบบหน่วงและค่า Q-Factor (Damped Oscillator & Q)',
    category: 'Oscillations & Resonance',
    latex: '\\ddot{x} + \\gamma\\dot{x} + \\omega_0^2 x = 0, \\quad \\omega_1 = \\sqrt{\\omega_0^2 - \\frac{\\gamma^2}{4}}, \\quad Q = \\frac{\\omega_0}{\\gamma}',
    noteTh: 'หาก $\\gamma/2 < \\omega_0$ แอมพลิจูดลดลงตาม $e^{-\\gamma t/2}$ และพลังงานสลายตาม $e^{-\\gamma t}$',
  },
  {
    nameTh: 'การสั่นพ้องแบบซ้อนเชิงซ้อน (Driven Resonance & FWHM)',
    category: 'Oscillations & Resonance',
    latex: 'A(\\omega) = \\frac{F_0/m}{\\sqrt{(\\omega_0^2 - \\omega^2)^2 + (\\gamma\\omega)^2}}, \\quad \\tan\\phi = \\frac{\\gamma\\omega}{\\omega_0^2 - \\omega^2}, \\quad \\Delta\\omega_{\\text{FWHM}} = \\gamma',
    noteTh: 'ที่จุดพ้อง $\\omega = \\omega_0$ มุมเฟสตามหลังคือ $\\phi = \\pi/2$ และดูดซับกำลังงานเฉลี่ยสูงสุด',
  },
];

export const FormulaSheetModal: React.FC<FormulaSheetModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('All');

  if (!isOpen) return null;

  const categories = [
    'All',
    'Math Tools',
    'Kinematics',
    'Newton & Constraints',
    'Momentum & Variable Mass',
    'Work & Energy',
    'Rotation',
    'Non-Inertial & Orbits',
    'Oscillations & Resonance',
  ];

  const filtered = FORMULA_DATABASE.filter((item) => {
    const matchCat = selectedCat === 'All' || item.category === selectedCat;
    const matchSearch =
      item.nameTh.toLowerCase().includes(search.toLowerCase()) ||
      item.noteTh.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 font-serif">
      <div className="relative w-full max-w-4xl max-h-[88vh] flex flex-col rounded-lg border border-[var(--hairline-border)] bg-[var(--surface-card)] shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-[var(--hairline-border)]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded border border-[var(--hairline-border)] bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300">
              <BookMarked className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base md:text-lg font-bold text-[var(--ink-primary)]">
                ดัชนีสูตรและทฤษฎีบทสำคัญ (Index of Formulae & Theorems)
              </h2>
              <p className="text-xs text-[var(--ink-secondary)]">
                สูตรหลักทางกลศาสตร์แคลคูลัสสำหรับ สอวน. ฟิสิกส์ ค่าย 1 และ 2
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="p-4 border-b border-[var(--hairline-border)] space-y-3 bg-stone-50/50 dark:bg-stone-900/30">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              placeholder="ค้นหา เช่น Taylor, กฎลูกโซ่, โมเมนต์ความเฉื่อย, Stokes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[var(--surface-card)] border border-[var(--hairline-border)] rounded pl-9 pr-4 py-1.5 text-xs md:text-sm text-[var(--ink-primary)] placeholder-stone-400 focus:outline-none focus:border-stone-500 font-serif"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-2 py-0.5 rounded border transition-all ${
                  selectedCat === cat
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-2xs'
                    : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--hairline-border)] hover:text-[var(--ink-primary)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Formula Cards Grid */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded border border-[var(--hairline-border)] bg-[var(--surface-card)] hover:border-stone-400 dark:hover:border-stone-600 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-[var(--ink-primary)]">{item.nameTh}</span>
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400">
                      {item.category}
                    </span>
                  </div>
                  <div className="my-2">
                    <LatexRenderer
                      math={item.latex}
                      displayMode={true}
                      className="bg-stone-50/80 dark:bg-stone-950/80 border-stone-200 dark:border-stone-800 text-[var(--ink-primary)]"
                    />
                  </div>
                </div>
                <div className="text-[11px] text-[var(--ink-secondary)] pt-2 border-t border-[var(--hairline-border)]">
                  ↳ <FormattedMathText text={item.noteTh} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
