// src/components/simulation/RotationTheorySummary.tsx
'use client';

import React, { useState } from 'react';
import { LatexRenderer, FormattedMathText } from '@/components/math/LatexRenderer';
import { ChevronDown, ChevronUp, GraduationCap } from 'lucide-react';

interface SummarySection {
  id: string;
  titleTh: string;
  subtitleEn: string;
  content: React.ReactNode;
}

export const RotationTheorySummary: React.FC = () => {
  const [openSectionId, setOpenSectionId] = useState<string>('moment-of-inertia');

  const toggleSection = (id: string) => {
    setOpenSectionId(openSectionId === id ? '' : id);
  };

  const sections: SummarySection[] = [
    {
      id: 'moment-of-inertia',
      titleTh: '1. ตารางโมเมนต์ความเฉื่อยมาตรฐานและการอินทิเกรต',
      subtitleEn: 'Standard Moments of Inertia & Integration Slices',
      content: (
        <div className="space-y-3 text-xs leading-relaxed">
          <p className="text-[var(--ink-secondary)]">
            <FormattedMathText text="โมเมนต์ความเฉื่อย $I = \int r^2 dm$ คือตัววัดความต้านทานต่อการเปลี่ยนแปลงสถานะการหมุนของวัตถุแข็งเกร็ง ซึ่งขึ้นอยู่กับการกระจายตัวของมวลรอบแกนหมุน:" />
          </p>

          <div className="overflow-x-auto rounded border border-[var(--hairline-border)]">
            <table className="w-full text-left font-serif text-xs border-collapse">
              <thead>
                <tr className="bg-[var(--surface-muted)] border-b border-[var(--hairline-border)] text-[var(--ink-primary)] font-mono text-[11px]">
                  <th className="p-2.5">รูปทรงเรขาคณิต</th>
                  <th className="p-2.5">ตำแหน่งแกนหมุน</th>
                  <th className="p-2.5">สูตรโมเมนต์ความเฉื่อย (<LatexRenderer math="I" />)</th>
                  <th className="p-2.5">สัดส่วน <LatexRenderer math="\beta = \frac{I}{MR^2}" /></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--hairline-subtle)]">
                <tr>
                  <td className="p-2.5 font-bold">ทรงกลมตัน (Solid Sphere)</td>
                  <td className="p-2.5 text-stone-500">ผ่านจุดศูนย์กลางมวล (CM)</td>
                  <td className="p-2.5"><LatexRenderer math="I = \frac{2}{5}MR^2" /></td>
                  <td className="p-2.5 font-mono text-sky-600 font-bold">0.400</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">ทรงกระบอกตัน / จานกลม (Solid Cylinder / Disk)</td>
                  <td className="p-2.5 text-stone-500">แกนสมมาตรตั้งฉากระนาบจาน</td>
                  <td className="p-2.5"><LatexRenderer math="I = \frac{1}{2}MR^2" /></td>
                  <td className="p-2.5 font-mono text-emerald-600 font-bold">0.500</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">ทรงกลมกลวงบาง (Thin Spherical Shell)</td>
                  <td className="p-2.5 text-stone-500">ผ่านจุดศูนย์กลางมวล (CM)</td>
                  <td className="p-2.5"><LatexRenderer math="I = \frac{2}{3}MR^2" /></td>
                  <td className="p-2.5 font-mono text-amber-600 font-bold">0.667</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">วงแหวนบาง / ทรงกระบอกกลวงบาง (Thin Hoop)</td>
                  <td className="p-2.5 text-stone-500">แกนกลางผ่านจุดศูนย์กลาง</td>
                  <td className="p-2.5"><LatexRenderer math="I = MR^2" /></td>
                  <td className="p-2.5 font-mono text-rose-600 font-bold">1.000</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">แท่งวัตถุสม่ำเสมอ (Uniform Thin Rod)</td>
                  <td className="p-2.5 text-stone-500">ผ่าน CM ตั้งฉากกับแท่ง</td>
                  <td className="p-2.5"><LatexRenderer math="I = \frac{1}{12}ML^2" /></td>
                  <td className="p-2.5 font-mono text-purple-600 font-bold"><LatexRenderer math="\frac{1}{12} \approx 0.083" /></td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">แท่งวัตถุสม่ำเสมอ (Uniform Thin Rod)</td>
                  <td className="p-2.5 text-stone-500">หมุนรอบปลายข้างหนึ่ง</td>
                  <td className="p-2.5"><LatexRenderer math="I = \frac{1}{3}ML^2" /></td>
                  <td className="p-2.5 font-mono text-purple-600 font-bold"><LatexRenderer math="\frac{1}{3} \approx 0.333" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      id: 'parallel-axis',
      titleTh: '2. ทฤษฎีบทแกนขนานและแกนตั้งฉาก (Parallel & Perpendicular Axes)',
      subtitleEn: 'Steiner Theorem & Planar Lamina',
      content: (
        <div className="space-y-3 text-xs leading-relaxed">
          <div className="p-3 rounded border border-[var(--hairline-border)] bg-[var(--surface-muted)] space-y-1.5">
            <strong className="block text-[var(--ink-primary)]">ทฤษฎีบทแกนขนาน (Steiner&apos;s Parallel-Axis Theorem):</strong>
            <LatexRenderer displayMode math="I = I_{cm} + M d^2" />
            <div className="text-[var(--ink-secondary)]">
              <FormattedMathText text="เมื่อ $d$ คือระยะห่างตั้งฉากระหว่างแกนใหม่กับแกนขนานเดิมที่ลากผ่านจุด CM โดยแกนใหม่ต้องขนานกับแกนเดิมเสมอ" />
            </div>
          </div>

          <div className="p-3 rounded border border-[var(--hairline-border)] bg-[var(--surface-muted)] space-y-1.5">
            <strong className="block text-[var(--ink-primary)]">ทฤษฎีบทแกนตั้งฉาก (Perpendicular-Axis Theorem for 2D Lamina):</strong>
            <LatexRenderer displayMode math="I_z = I_x + I_y" />
            <div className="text-[var(--ink-secondary)]">
              <FormattedMathText text="ใช้ได้เฉพาะวัตถุแผ่นบาง 2 มิติ (Planar Lamina) ในระนาบ $xy$ โดยแกน $z$ ตั้งฉากกับแผ่นวัตถุ" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'rolling-incline',
      titleTh: '3. กฎการกลิ้งบนพื้นเอียงและเงื่อนไขการไม่ไถล (Rolling Mechanics)',
      subtitleEn: 'Newton-Euler Equations & Friction Bounds',
      content: (
        <div className="space-y-3 text-xs leading-relaxed">
          <div className="text-[var(--ink-secondary)]">
            <FormattedMathText text="เมื่อวัตถุกลิ้งลงพื้นเอียงทำมุม $\theta$ แรงที่กระทำได้แก่ แรงโน้มถ่วง $Mg$, แรงตั้งฉาก $N = Mg\cos\theta$ และแรงเสียดทานสถิต $f_s$ ที่กระทำที่จุดสัมผัส:" />
          </div>
          <LatexRenderer displayMode math="a_{cm} = \frac{g\sin\theta}{1 + \frac{I_{cm}}{MR^2}} = \frac{g\sin\theta}{1 + \beta}" />
          <LatexRenderer displayMode math="f_s = \left(\frac{\beta}{1 + \beta}\right) Mg\sin\theta \le \mu_s Mg\cos\theta" />
          <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300">
            <strong className="block">เงื่อนไขแรงเสียดทานขั้นต่ำเพื่อไม่ให้เกิดการไถล:</strong>
            <LatexRenderer displayMode math="\mu_{s,\min} = \left(\frac{\beta}{1 + \beta}\right) \tan\theta" />
          </div>
        </div>
      ),
    },
    {
      id: 'chasles-theorem',
      titleTh: '4. ทฤษฎีบทชาส์ลและจุดหมุนชั่วขณะ (Chasles & ICZV)',
      subtitleEn: 'Velocity Superposition & Instantaneous Center',
      content: (
        <div className="space-y-3 text-xs leading-relaxed">
          <p className="text-[var(--ink-secondary)]">
            <FormattedMathText text="การเคลื่อนที่แบบกลิ้งคือการซ้อนทับ (Superposition) ของการเลื่อนตำแหน่งบริสุทธิ์ $\vec{v}_{cm}$ และการหมุนรอบจุด CM ด้วยความเร็วเชิงมุม $\vec{\omega}$:" />
          </p>
          <LatexRenderer displayMode math="\vec{v}_P = \vec{v}_{cm} + \vec{\omega} \times \vec{r}'" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center font-mono pt-1">
            <div className="p-2 rounded bg-[var(--surface-muted)] border border-[var(--hairline-border)]">
              <span className="block text-[10px] text-stone-500">จุดสัมผัสพื้น (Contact)</span>
              <span className="font-bold text-emerald-600">v = 0</span>
              <span className="block text-[9px] text-stone-400">จุดหมุนชั่วขณะ</span>
            </div>
            <div className="p-2 rounded bg-[var(--surface-muted)] border border-[var(--hairline-border)]">
              <span className="block text-[10px] text-stone-500">จุด CM</span>
              <span className="font-bold text-sky-600">v = v_cm = ωR</span>
              <span className="block text-[9px] text-stone-400">ความเร็วเลื่อนตำแหน่ง</span>
            </div>
            <div className="p-2 rounded bg-[var(--surface-muted)] border border-[var(--hairline-border)]">
              <span className="block text-[10px] text-stone-500">จุดบนสุด (Top Rim)</span>
              <span className="font-bold text-purple-600">v = 2 v_cm</span>
              <span className="block text-[9px] text-stone-400">เร็วเป็นสองเท่า</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'angular-momentum',
      titleTh: '5. กฎการอนุรักษ์โมเมนตัมเชิงมุม (Angular Momentum Conservation)',
      subtitleEn: 'Torque & Angular Momentum Derivative',
      content: (
        <div className="space-y-3 text-xs leading-relaxed">
          <LatexRenderer displayMode math="\vec{\tau}_{ext} = \frac{d\vec{L}}{dt} = I\vec{\alpha} \quad \implies \quad \sum \vec{\tau}_{ext} = 0 \iff \vec{L} = \text{const}" />
          <p className="text-[var(--ink-secondary)]">
            <FormattedMathText text="ในการชนของวัตถุอิสระ เช่น กระสุนยิงปักแท่งไม้ที่วางบนโต๊ะลื่น หากคิดระบบรวม (กระสุน + แท่งไม้) ไม่มีทอร์กภายนอกกระทำ $\implies$ โมเมนตัมเชิงเส้นอนุรักษ์ และโมเมนตัมเชิงมุมอนุรักษ์รอบทุกจุดอ้างอิง" />
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="rounded-lg border border-[var(--hairline-border)] bg-[var(--surface-card)] p-4 md:p-5 shadow-xs font-serif">
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[var(--hairline-border)]">
        <div className="p-1.5 rounded border border-purple-300 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300">
          <GraduationCap className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm md:text-base font-bold text-[var(--ink-primary)]">
            คลังสรุปสูตรและทฤษฎีบทการหมุนวัตถุเกร็ง (Rigid Body Rotation Reference & Proofs)
          </h3>
          <p className="text-[11px] text-[var(--ink-secondary)] font-mono">
            ฉบับสมบูรณ์สำหรับฟิสิกส์ สอวน. / ฟิสิกส์โอลิมปิก
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {sections.map((sec) => {
          const isOpen = openSectionId === sec.id;
          return (
            <div
              key={sec.id}
              className="rounded-md border border-[var(--hairline-border)] bg-[var(--surface-card)] overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleSection(sec.id)}
                className="w-full p-3 flex items-center justify-between text-left hover:bg-[var(--surface-muted)] transition-colors"
              >
                <div>
                  <h4 className="text-xs md:text-sm font-bold text-[var(--ink-primary)]">
                    {sec.titleTh}
                  </h4>
                  <span className="text-[10px] font-mono text-[var(--ink-tertiary)] block">
                    {sec.subtitleEn}
                  </span>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-stone-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone-400" />
                )}
              </button>

              {isOpen && (
                <div className="p-3 pt-0 border-t border-[var(--hairline-subtle)] bg-[var(--surface-card)]">
                  {sec.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
