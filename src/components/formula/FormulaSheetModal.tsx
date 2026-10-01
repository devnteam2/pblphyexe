// src/components/formula/FormulaSheetModal.tsx
'use client';

import React, { useState } from 'react';
import { LatexRenderer } from '@/components/math/LatexRenderer';
import { BookMarked, X, Search, Sparkles } from 'lucide-react';

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
    category: 'SHM',
    latex: '\\frac{dE}{dt} = 0 \\iff \\frac{d}{dt}(E_k + E_p) = 0',
    noteTh: 'ดิฟสมการพลังงานกลรวมเทียบเวลาเพื่อดึงสมการเชิงอนุพันธ์อันดับสอง',
  },
];

export const FormulaSheetModal: React.FC<FormulaSheetModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'Math Tools', 'Kinematics', 'Newton & Constraints', 'Work & Energy', 'Rotation', 'SHM'];

  const filtered = FORMULA_DATABASE.filter((item) => {
    const matchCat = selectedCat === 'All' || item.category === selectedCat;
    const matchSearch =
      item.nameTh.toLowerCase().includes(search.toLowerCase()) ||
      item.noteTh.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border border-slate-800 bg-[#07090e] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-slate-800 bg-zinc-950">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400">
              <BookMarked className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                <span>คลังสูตรและทฤษฎีบทสำคัญ สอวน. ฟิสิกส์</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </h2>
              <p className="text-xs text-slate-400">
                Formula Quick Reference & Calculus Theorems (เข้าถึงได้แม้ไม่มีเน็ต)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="p-4 border-b border-slate-800/80 bg-zinc-950/60 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="ค้นหาสูตร เช่น Taylor, กฎลูกโซ่, โมเมนต์ความเฉื่อย, SHM..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs md:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
                  selectedCat === cat
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                    : 'bg-zinc-900 text-slate-400 border-slate-800 hover:text-slate-200'
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
                className="p-4 rounded-xl border border-slate-800/90 bg-zinc-950/80 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-white">{item.nameTh}</span>
                    <span className="text-[10px] uppercase font-bold text-sky-400 bg-sky-950/40 border border-sky-500/20 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>
                  <div className="my-2">
                    <LatexRenderer math={item.latex} displayMode={true} className="bg-black/80 text-sky-200" />
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-900">
                  💡 {item.noteTh}
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-sm">
              ไม่พบสูตรที่ตรงกับคำค้นหา
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
