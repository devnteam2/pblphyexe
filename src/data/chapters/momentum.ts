// src/data/chapters/momentum.ts
import { Topic } from '@/types/curriculum';

export const MOMENTUM_TOPIC: Topic = {
  id: 'momentum-variable-mass',
  titleTh: '4. โมเมนตัม จุดศูนย์กลางมวล และระบบมวลแปรผัน (Momentum & Variable Mass)',
  subtitleTh: 'Center of Mass Integration, Open Systems, Rockets & Momentum Flux (K&K Ch. 4)',
  iconName: 'ArrowRightLeft',
  colorAccent: '#F97316',
  descriptionTh:
    'พลศาสตร์ของระบบอนุภาค จุดศูนย์กลางมวลแบบต่อเนื่อง วิธีกำหนดขอบเขตระบบสำหรับโจทย์มวลแปรผัน สมการจรวด และแรงจากกระแสโมเมนตัม (K&K บทที่ 4)',
  lessons: [
    {
      id: 'lesson-mom-1',
      slug: 'center-of-mass-systems',
      topicId: 'momentum-variable-mass',
      order: 1,
      titleTh: '4.1 พลศาสตร์ระบบหลายอนุภาค และการอินทิเกรตหาจุดศูนย์กลางมวล',
      summaryTh:
        'กฎของนิวตันสำหรับระบบอนุภาค F_ext = M a_cm การหักล้างของแรงภายใน วิธีแบ่งชิ้นส่วนมวลย่อย dm เพื่อหา CM ของทรงตันและแผ่นบาง',
      readTimeMinutes: 17,
      theoryMarkdownTh: `
สำหรับระบบที่ประกอบด้วยอนุภาคจำนวนมากที่มีแรงกระทำต่อกันภายใน ($\\vec{f}_{ij}$):

$$\\vec{P}_{\\text{total}} = \\sum_{i} m_i \\vec{v}_i = M\\vec{V}_{\\text{cm}}, \\qquad \\vec{F}_{\\text{ext}} = \\frac{d\\vec{P}_{\\text{total}}}{dt} = M\\vec{A}_{\\text{cm}}$$

แรงภายในทุกคู่จะหักล้างกันด้วยกฎข้อที่ 3 ของนิวตัน ($\\vec{f}_{ij} + \\vec{f}_{ji} = 0$) ทำให้จุดศูนย์กลางมวล (Center of Mass, CM) เคลื่อนที่เสมือนจุดมวลเดี่ยว $M$ ที่รับแรงภายนอกสุทธิเพียงอย่างเดียว

### การคำนวณจุดศูนย์กลางมวลของวัตถุต่อเนื่อง:
$$\\vec{R}_{\\text{cm}} = \\frac{1}{M}\\int \\vec{r}\\,dm$$

#### เคล็ดลับการอินทิเกรตของ K&K (Note 4.1 — Clever Slicing):
- **อาศัยสมมาตรก่อนเสมอ:** หากวัตถุมีแกนสมมาตร จุด CM จะต้องอยู่บนแกนนั้นทันที
- **เลือกชิ้นส่วนย่อย $dm$ ที่ทราบจุด CM ย่อยของมันเอง:** เช่น แบ่งสามเหลี่ยมเป็นแถบยาว แบ่งครึ่งทรงกลมเป็นแผ่นจานบาง หรือใช้สมการสมดุลของโมเมนต์มวล (1st Moment) เพื่อให้ได้คำตอบในอินทิกรัลชั้นเดียวแทน 3 ชั้น!
      `,
      derivations: [
        {
          id: 'deriv-cm-hemisphere',
          topicId: 'momentum-variable-mass',
          titleTh: 'ตัวอย่าง K&K Note 4.1: จุดศูนย์กลางมวลของครึ่งทรงกลมตันสม่ำเสมอ ($Z_{cm} = \\frac{3}{8}R$)',
          objectiveTh: 'สาธิตเทคนิคการแบ่งทรงตัน 3 มิติเป็นแผ่นจานบางตามแนวแกนสมมาตรเพื่อหาจุด CM ด้วยอินทิกรัลตัวแปรเดียว',
          startingAssumptions: [
            {
              id: 'asm-cm-1',
              descriptionTh: 'ครึ่งทรงกลมตันรัศมี $R$ มีความหนาแน่นเชิงปริมาตรสม่ำเสมอ $\\rho = \\frac{M}{\\frac{2}{3}\\pi R^3}$',
              significanceTh: 'สามารถเขียนมวลย่อยเป็น $dm = \\rho\\,dV$ ได้',
            },
            {
              id: 'asm-cm-2',
              descriptionTh: 'วางฐานราบของครึ่งทรงกลมบนระนาบ $z = 0$ โดยยอดชี้ขึ้นแกน $+z$',
              significanceTh: 'โดยสมมาตรเชิงหมุนรอบแกน $z$ จะได้ $X_{cm} = 0$ และ $Y_{cm} = 0$',
            },
          ],
          steps: [
            {
              stepNumber: 1,
              titleTh: 'แบ่งครึ่งทรงกลมที่ความสูง $z$ ออกเป็นแผ่นจานบางหนา $dz$',
              latexMath: 'r_{\\text{disk}}(z) = \\sqrt{R^2 - z^2} \\implies dV = \\pi r_{\\text{disk}}^2\\,dz = \\pi(R^2 - z^2)\\,dz',
              physicalIntuitionTh: 'แผ่นจานบางมีความสูงเหมือนกันทั้งแผ่นที่ค่า $z$ เดียวกัน จุด CM ของแผ่นจานจึงอยู่ที่ $(0, 0, z)$ พอดี',
              mathOperationTh: 'ใช้ทฤษฎีบทพีทาโกรัส $r^2 + z^2 = R^2$ หารัศมีหน้าตัดที่ความสูง $z$',
              isCrucialLeap: true,
            },
            {
              stepNumber: 2,
              titleTh: 'เขียนอินทิกรัลหาพิกัด $Z_{cm} = \\frac{1}{M}\\int z\\,dm$',
              latexMath: 'Z_{cm} = \\frac{\\rho}{M}\\int_{0}^{R} z\\cdot \\pi(R^2 - z^2)\\,dz',
              physicalIntuitionTh: 'น้ำหนักถ่วงโมเมนต์ของแต่ละแผ่นคือระยะ $z$ คูณกับมวล $dm = \\rho\\pi(R^2 - z^2)dz$',
              mathOperationTh: 'ตั้งขอบเขตการอินทิเกรตตั้งแต่ฐาน $z=0$ ถึงยอด $z=R$',
            },
            {
              stepNumber: 3,
              titleTh: 'คำนวณค่าอินทิกรัลพหุนาม',
              latexMath: '\\int_{0}^{R} (R^2 z - z^3)\\,dz = \\left[ \\frac{R^2 z^2}{2} - \\frac{z^4}{4} \\right]_{0}^{R} = \\frac{R^4}{2} - \\frac{R^4}{4} = \\frac{R^4}{4}',
              physicalIntuitionTh: 'ตัวเลข $R^4/4$ มีมิติเป็น $(\\text{ความยาว})^4$ เมื่อคูณกับ $\\pi\\rho/M$ จะเหลือมิติเป็น $(\\text{ความยาว})^1$ อย่างถูกต้อง',
              mathOperationTh: 'อินทิเกรตพจน์ $z$ และ $z^3$',
            },
            {
              stepNumber: 4,
              titleTh: 'แทนความหนาแน่น $\\rho = \\frac{3M}{2\\pi R^3}$ เพื่อตัดมวลและ $\\pi$',
              latexMath: 'Z_{cm} = \\frac{\\pi}{M}\\left(\\frac{3M}{2\\pi R^3}\\right)\\left(\\frac{R^4}{4}\\right) = \\frac{3}{8}R',
              physicalIntuitionTh: 'จุด CM อยู่ต่ำกว่าจุดกึ่งกลางความสูง ($0.5R$) เล็กน้อยที่ $0.375R$ เพราะมวลส่วนใหญ่กองอยู่ที่ฐานด้านล่าง',
              mathOperationTh: 'ลดทอนเศษส่วนและการตรวจสอบมิติ',
            },
          ],
          finalResultLatex: 'Z_{cm} = \\frac{3}{8}R \\quad (\\text{ทรงกลมกลวงครึ่งใบ: } Z_{cm} = \\frac{1}{2}R)',
          takeawayTh: 'หลักการ "หั่นตามแนวแกนสมมาตรเพื่อให้ทุกชิ้นส่วนย่อยมีพิกัดตามแกนนั้นเท่ากัน" ใช้แก้โจทย์ CM และ Moment of Inertia ได้อย่างรวดเร็ว',
        },
      ],
      relatedProblemIds: ['prob-mom-chain-1'],
    },
    {
      id: 'lesson-mom-2',
      slug: 'variable-mass-rocket-momentum-flux',
      topicId: 'momentum-variable-mass',
      order: 2,
      titleTh: '4.2 ระบบมวลแปรผัน สมการจรวดซิโอลคอฟสกี และโมเมนตัมฟลักซ์',
      summaryTh:
        'เหตุใด F = d(mv)/dt = m(dv/dt) + v(dm/dt) จึงผิดในระบบเปิด วิธีขอบเขตระบบปิดของ K&K รถพ่วงรั่วเทียบกับกรวยทราย และสมการจรวดในสนามโน้มถ่วง',
      readTimeMinutes: 22,
      theoryMarkdownTh: `
นี่คือหนึ่งในบทเรียนที่สำคัญและออกสอบบ่อยที่สุดของ *Kleppner & Kolenkow* (บทที่ 4.7–4.9):

### คำเตือนอันตรายสูงสุด: อย่าเขียน $F = m\\dot{v} + v\\dot{m}$!
กฎข้อที่ 2 ของนิวตัน $\\vec{F}_{\\text{ext}} = \\frac{d\\vec{P}}{dt}$ ใช้ได้เฉพาะกับ **ระบบปิด (Closed System)** ที่มีชุดอนุภาคเดิมตลอดเวลา!
หากเราไปดิฟ $m(t)v(t)$ ตรงๆ จะได้สูตรผิดเพี้ยนและไม่สมมาตรกาลิเลโอ (ขึ้นกับความเร็วของผู้สังเกต!)

### วิธีที่ถูกต้องของ K&K (Closed-System Boundary Approach):
1. เลือกระบบปิดซึ่งประกอบด้วย **มวลทั้งหมด ณ เวลา $t$** (รวมทั้งตัววัตถุและชิ้นส่วนมวล $\\Delta m$ ที่กำลังจะหลุดออกหรือจะเข้ามาเกาะ)
2. คำนวณโมเมนตัมรวมก่อนและหลังช่วงเวลาสั้นๆ $\\Delta t$:
   $$\\vec{P}(t + \\Delta t) - \\vec{P}(t) = \\vec{F}_{\\text{ext}}\\,\\Delta t$$
3. หารด้วย $\\Delta t$ แล้วให้ $\\Delta t \\to 0$ (ตัดเทอมอันดับสอง $\\Delta m\\,\\Delta v$)

### การประยุกต์กับกระแสโมเมนตัม (Momentum Flux — K&K Sec. 4.8):
เมื่อสายน้ำหรืออนุภาคพุ่งชนกำแพง ด้วยฟลักซ์มวล (Mass Rate) $\\frac{dm}{dt} = \\rho A v$ แรงที่ต้องใช้ต้านการเปลี่ยนโมเมนตัมคือ:
$$\\vec{F} = \\frac{d\\vec{P}}{dt} = \\frac{dm}{dt}\\,\\Delta \\vec{v}$$
      `,
      derivations: [
        {
          id: 'deriv-rocket-equation',
          topicId: 'momentum-variable-mass',
          titleTh: 'ตัวอย่าง K&K 4.16–4.17: สมการจรวดของซิโอลคอฟสกีในสนามโน้มถ่วงสม่ำเสมอ',
          objectiveTh: 'สร้างสมการจรวด $M\\frac{dv}{dt} = -u\\frac{dM}{dt} - Mg$ ด้วยวิธีระบบปิดจาก First Principles และอินทิเกรตหาความเร็วสุดท้าย',
          startingAssumptions: [
            {
              id: 'asm-rkt-1',
              descriptionTh: 'ณ เวลา $t$ จรวดมีมวลรวม (ตัวถัง + เชื้อเพลิงคงเหลือ) เท่ากับ $M(t)$ เคลื่อนที่ขึ้นด้วยความเร็ว $v$',
              significanceTh: 'ทิศขึ้นตามแนวดิ่งเป็น $+$, แรงโน้มถ่วงภายนอกคือ $F_{\\text{ext}} = -Mg$',
            },
            {
              id: 'asm-rkt-2',
              descriptionTh: 'เชื้อเพลิงถูกพ่นออกด้านหลังด้วยอัตราเร็วสัมพัทธ์คงที่ $u > 0$ เทียบกับตัวจรวด',
              significanceTh: 'ดังนั้นความเร็วของแก๊สไอเสียเทียบกับโลกคือ $v_{\\text{gas}} = v - u$',
            },
          ],
          steps: [
            {
              stepNumber: 1,
              titleTh: 'กำหนดระบบปิดที่ครอบคลุมทั้งจรวดและมวลแก๊ส $\\Delta m > 0$ ที่จะพ่นออกใน $\\Delta t$',
              latexMath: 'P(t) = M v',
              physicalIntuitionTh: 'ที่เวลา $t$ แก๊สก้อนนี้ยังอยู่ภายในจรวด จึงเคลื่อนที่ด้วยความเร็ว $v$ ไปกับมวลรวม $M$',
              mathOperationTh: 'เขียนโมเมนตัมเริ่มต้นของระบบปิด',
            },
            {
              stepNumber: 2,
              titleTh: 'เขียนโมเมนตัมรวมที่เวลา $t + \\Delta t$ หลังพ่นมวล $\\Delta m = -\\Delta M$ ออกไป',
              latexMath: 'P(t + \\Delta t) = (M - \\Delta m)(v + \\Delta v) + \\Delta m\\,(v - u)',
              physicalIntuitionTh: 'มวลส่วนที่เหลือ $(M - \\Delta m)$ เร็วขึ้นเป็น $v + \\Delta v$ ส่วนมวลไอเสีย $\\Delta m$ มีความเร็วเทียบพื้นเป็น $v - u$ (ลืมความเร็ว $v$ เดิมของไอเสียไม่ได้!)',
              mathOperationTh: 'กระจายผลคูณและรักษาเทอม $\\Delta m \\cdot u$ ไว้',
              isCrucialLeap: true,
            },
            {
              stepNumber: 3,
              titleTh: 'หา $\\Delta P = P(t+\\Delta t) - P(t) = F_{\\text{ext}}\\Delta t$ แล้วให้ $\\Delta t \\to 0$',
              latexMath: '\\Delta P \\approx M\\Delta v - u\\Delta m = -Mg\\Delta t \\implies M\\frac{dv}{dt} = u\\frac{dm}{dt} - Mg = -u\\frac{dM}{dt} - Mg',
              physicalIntuitionTh: 'เนื่องจาก $M$ กำลังลดลง ($\\frac{dM}{dt} = -\\frac{dm}{dt} < 0$) เทอมแรงขับ Thrust คือ $-u\\frac{dM}{dt} > 0$ สังเกตว่าตัวแปร $v$ ตัดทิ้งไปจากเทอมแรงขับอย่างสมบูรณ์ จึงเป็นสมการที่สอดคล้องกับสัมพัทธภาพของกาลิเลโอ!',
              mathOperationTh: 'ตัดเทอม $Mv$, $v\\Delta m$ หักล้างกัน และทิ้งเทอมอันดับสอง $-\\Delta m\\Delta v$',
            },
            {
              stepNumber: 4,
              titleTh: 'หารตลอดด้วย $M$ แล้วอินทิเกรตแยกตัวแปรตั้งแต่มวล $M_0$ ถึง $M_f$ (ใช้เวลาเผาไหม้ $t_f$)',
              latexMath: '\\int_{v_0}^{v_f} dv = -u\\int_{M_0}^{M_f} \\frac{dM}{M} - g\\int_{0}^{t_f} dt \\implies v_f - v_0 = u\\ln\\left(\\frac{M_0}{M_f}\\right) - g t_f',
              physicalIntuitionTh: 'แรงโน้มถ่วงทำให้เสียความเร็วไป $g t_f$ ดังนั้นจรวดต้องเผาไหม้เชื้อเพลิงให้เร็ว ($t_f$ สั้น) เพื่อให้เกิดการสูญเสียจากแรงโน้มถ่วงน้อยที่สุด',
              mathOperationTh: 'อินทิเกรต $\\int \\frac{dM}{M} = \\ln M$ และสลับเครื่องหมายลบเข้าในลอการิทึม',
            },
          ],
          finalResultLatex: 'M\\frac{dv}{dt} = -u\\frac{dM}{dt} - Mg, \\qquad \\Delta v = u\\ln\\left(\\frac{M_0}{M_f}\\right) - g t_f',
          takeawayTh: 'ใช้หลักการ "ติดตามชิ้นส่วนมวลเดียวกันก่อนและหลัง $\\Delta t$" เสมอสำหรับระบบมวลแปรผัน เช่น จรวด โซ่ตกลงตาชั่ง หรือรถเททราย',
        },
      ],
      relatedProblemIds: ['prob-mom-rocket-1', 'prob-mom-chain-1'],
    },
  ],
};
