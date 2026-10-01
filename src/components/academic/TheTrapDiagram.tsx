// src/components/academic/TheTrapDiagram.tsx
'use client';

import React from 'react';
import { ArrowDown, Check, X } from 'lucide-react';
import { FormattedMathText } from '@/components/math/LatexRenderer';

export const TheTrapDiagram: React.FC = () => {
  return (
    <div className="my-8 p-6 md:p-8 rounded-lg border border-[var(--hairline-border)] bg-[var(--surface-card)] shadow-2xs font-serif">
      {/* Overline Academic Label */}
      <div className="flex items-center gap-2 mb-3">
        <span className="w-8 h-[1px] bg-amber-700/60 dark:bg-amber-400/60" />
        <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-amber-800 dark:text-amber-400">
          THE PEDAGOGICAL TRAP (กับดักทางความคิด)
        </span>
      </div>

      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[var(--ink-primary)] mb-2">
        ทำไมฟิสิกส์ สอวน. ถึงรู้สึกยากกว่าที่ควรจะเป็น?
      </h3>

      <p className="text-sm md:text-base text-[var(--ink-secondary)] mb-6 leading-relaxed">
        เพราะนักเรียนส่วนใหญ่ฝึกเฉพาะ <span className="font-semibold text-amber-800 dark:text-amber-300">“ขั้นสุดท้าย”</span> (การแทนค่าลงในสูตรสำเร็จ) ซ้ำ ๆ 
        แต่ไม่เคยได้ฝึก <span className="font-semibold text-[var(--ink-primary)] underline decoration-amber-500/60 underline-offset-4">“ขั้นที่สำคัญที่สุด”</span> คือการสร้างแบบจำลองทางกายภาพและการตั้งสมการแคลคูลัสจาก First Principles
      </p>

      {/* Comparison Grid: The Trap vs First Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Left: The High School Trap */}
        <div className="p-5 rounded border border-stone-200 dark:border-stone-800/80 bg-stone-50/60 dark:bg-stone-900/30">
          <div className="flex items-center gap-2 mb-4 text-xs font-mono font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 border-b border-stone-200 dark:border-stone-800 pb-2">
            <X className="w-4 h-4" />
            <span>กระบวนการที่ล้มเหลว (Formula Guessing)</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-950 flex items-center gap-3 text-xs md:text-sm text-stone-800 dark:text-stone-300 shadow-2xs">
              <span className="font-mono text-xs font-bold text-stone-400 dark:text-stone-500 w-6">01</span>
              <span>เห็นตัวเลข ➔ รีบควานหาตัวแปรมาจับคู่</span>
            </div>

            <div className="flex justify-center text-stone-400 dark:text-stone-600">
              <ArrowDown className="w-4 h-4" />
            </div>

            <div className="p-3 rounded border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-950 flex items-center gap-3 text-xs md:text-sm text-stone-800 dark:text-stone-300 shadow-2xs">
              <span className="font-mono text-xs font-bold text-stone-400 dark:text-stone-500 w-6">02</span>
              <span>นึกสูตรที่คุ้นตา ➔ ลองหยิบมาแทนค่าก่อน</span>
            </div>

            <div className="flex justify-center text-stone-400 dark:text-stone-600">
              <ArrowDown className="w-4 h-4" />
            </div>

            <div className="p-3 rounded border border-rose-200 dark:border-rose-950/60 bg-rose-50/50 dark:bg-rose-950/20 flex items-center gap-3 text-xs md:text-sm text-rose-800 dark:text-rose-300 shadow-2xs">
              <span className="font-mono text-xs font-bold text-rose-500 w-6">03</span>
              <span>คำตอบไม่ตรง / ตัวแปรเกิน ➔ สุ่มเปลี่ยนสูตรไปเรื่อย ๆ</span>
            </div>
          </div>
        </div>

        {/* Right: The OpenPOSN First-Principles Way */}
        <div className="p-5 rounded border border-stone-300 dark:border-stone-700 bg-stone-50/80 dark:bg-stone-900/40">
          <div className="flex items-center gap-2 mb-4 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 border-b border-stone-200 dark:border-stone-800 pb-2">
            <Check className="w-4 h-4" />
            <span>กระบวนการของนักฟิสิกส์โอลิมปิก (First Principles)</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-950 flex items-center gap-3 text-xs md:text-sm text-stone-800 dark:text-stone-200 shadow-2xs">
              <span className="font-mono text-xs font-bold text-stone-600 dark:text-stone-400 w-6">01</span>
              <span>
                <strong className="font-bold text-[var(--ink-primary)]">Physical Model:</strong> วาด FBD และเลือกแกนพิกัดตามเรขาคณิต
              </span>
            </div>

            <div className="flex justify-center text-stone-400 dark:text-stone-600">
              <ArrowDown className="w-4 h-4" />
            </div>

            <div className="p-3 rounded border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-950 flex items-center gap-3 text-xs md:text-sm text-stone-800 dark:text-stone-200 shadow-2xs">
              <span className="font-mono text-xs font-bold text-stone-600 dark:text-stone-400 w-6">02</span>
              <div>
                <strong className="font-bold text-[var(--ink-primary)]">Governing Law: </strong>
                <FormattedMathText text="ตั้งสมการอนุพันธ์หรือกฎอนุรักษ์ ($\Sigma \vec{F} = m\ddot{\vec{r}}$, $dE/dt = 0$)" />
              </div>
            </div>

            <div className="flex justify-center text-stone-400 dark:text-stone-600">
              <ArrowDown className="w-4 h-4" />
            </div>

            <div className="p-3 rounded border border-emerald-200 dark:border-emerald-950/60 bg-emerald-50/50 dark:bg-emerald-950/20 flex items-center gap-3 text-xs md:text-sm text-emerald-800 dark:text-emerald-300 shadow-2xs">
              <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 w-6">03</span>
              <span>
                <strong className="font-bold text-emerald-800 dark:text-emerald-300">Calculus Tool:</strong> แยกตัวแปร อินทิเกรตจำกัดเขต และตรวจสอบมิติคำตอบ
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
