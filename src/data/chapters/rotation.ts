// src/data/chapters/rotation.ts
import { Topic } from '@/types/curriculum';

export const ROTATION_TOPIC: Topic = {
  id: 'rotation-dynamics',
  titleTh: '6. พลศาสตร์การหมุน วัตถุแข็งเกร็ง และไจโรสโคป (Rotational Dynamics & Rigid Bodies)',
  subtitleTh: 'Moments of Inertia, Chasles Theorem, Rolling & Gyroscopes (K&K Ch. 7–8)',
  iconName: 'RotateCw',
  colorAccent: '#EC4899',
  descriptionTh:
    'การอินทิเกรตโมเมนต์ความเฉื่อย ทฤษฎีบทแกนขนาน ลูกตุ้มกายภาพและศูนย์กระทบ ทฤษฎีบทของชาส์ลสำหรับการกลิ้ง และพลศาสตร์ 3 มิติของไจโรสโคป (K&K บทที่ 7–8)',
  lessons: [
    {
      id: 'lesson-rot-1',
      slug: 'moment-of-inertia-calculus-rolling',
      topicId: 'rotation-dynamics',
      order: 1,
      titleTh: '6.1 โมเมนต์ความเฉื่อย ลูกตุ้มกายภาพ และศูนย์การกระทบ (Center of Percussion)',
      summaryTh:
        'การอินทิเกรตหาโมเมนต์ความเฉื่อย I = integral(r^2 dm) ทฤษฎีบทแกนขนาน คาบการแกว่งของลูกตุ้มกายภาพ และตำแหน่งตีไม้เบสบอลไม่สะท้านมือ',
      readTimeMinutes: 20,
      theoryMarkdownTh: `
ในกลศาสตร์การหมุน โมเมนต์ความเฉื่อย $I$ เป็นตัวแทนของ "ความเฉื่อยเชิงมุม" ซึ่งขึ้นอยู่กับรูปทรงและการกระจายมวลรอบแกนหมุน:
$$I = \\int r_{\\perp}^2\\,dm$$

### 1. ทฤษฎีบทสำคัญสำหรับการคำนวณโมเมนต์ความเฉื่อย:
- **ทฤษฎีบทแกนขนาน (Parallel-Axis Theorem):** เมื่อ $I_0$ คือโมเมนต์ความเฉื่อยรอบแกนที่ผ่าน CM และ $d$ คือระยะห่างระหว่างแกนขนาน:
$$I = I_0 + M d^2$$
- **ทฤษฎีบทแกนตั้งฉาก (Perpendicular-Axis Theorem):** สำหรับ **แผ่นบาง 2 มิติ (Planar Lamina)** บนระนาบ $xy$ เท่านั้น:
$$I_z = I_x + I_y$$

### 2. ลูกตุ้มกายภาพและลูกตุ้มเคเตอร์ (Physical & Kater's Pendulum — K&K Sec. 7.3):
วัตถุแข็งเกร็งมวล $M$ ที่แกว่งรอบจุดแขวน $P$ ซึ่งอยู่ห่างจากจุด CM เป็นระยะ $L$ จะมีคาบมุมเล็ก:
$$T = 2\\pi\\sqrt{\\frac{I_P}{M g L}} = 2\\pi\\sqrt{\\frac{k^2 + L^2}{g L}}$$
โดยที่ $k = \\sqrt{I_0/M}$ คือรัศมีไจเรชัน (Radius of Gyration) สังเกตว่ามีความสมมาตร: หากย้ายจุดแขวนไปที่ระยะ $L' = k^2/L$ ฝั่งตรงข้าม CM จะได้คาบการแกว่ง **เท่าเดิมทุกประการ!** จุดคู่สังยุคนี้เรียกว่า **ศูนย์การกระทบ (Center of Percussion)**
      `,
      derivations: [
        {
          id: 'deriv-rod-inertia',
          topicId: 'rotation-dynamics',
          titleTh: 'การพิสูจน์โมเมนต์ความเฉื่อยของแท่งวัตถุสม่ำเสมอหมุนรอบปลาย $I = \\frac{1}{3}ML^2$',
          objectiveTh: 'แสดงวิธีการตั้งส่วนย่อย $dm$ และการอินทิเกรตตลอดความยาวแท่ง',
          startingAssumptions: [
            {
              id: 'asm-rot-1',
              descriptionTh: 'แท่งวัตถุมีความหนาแน่นเชิงเส้นสม่ำเสมอ $\\lambda = M/L$',
              significanceTh: 'ดึงค่าคงที่ $\\lambda$ ออกนอกเครื่องหมายอินทิกรัลได้',
            },
            {
              id: 'asm-rot-2',
              descriptionTh: 'แกนหมุนตั้งฉากกับแท่งวัตถุและอยู่ที่ปลายข้างหนึ่ง ($x=0$)',
              significanceTh: 'กำหนดขอบเขตของการอินทิเกรตจาก $x=0$ ถึง $x=L$',
            },
          ],
          steps: [
            {
              stepNumber: 1,
              titleTh: 'เลือกชิ้นส่วนมวลย่อย $dm$ ที่ระยะห่าง $x$ จากแกนหมุน',
              latexMath: 'dm = \\lambda dx = \\left( \\frac{M}{L} \\right) dx',
              physicalIntuitionTh: 'เราแบ่งแท่งวัตถุออกเป็นชิ้นเล็กๆ กว้าง $dx$ แต่ละชิ้นอยู่ห่างจากแกนหมุนเป็นระยะ $x$',
              mathOperationTh: 'แทนมวลย่อยด้วยความหนาแน่นคูณความยาวชิ้นส่วน',
            },
            {
              stepNumber: 2,
              titleTh: 'ตั้งอินทิกรัลนิยามโมเมนต์ความเฉื่อย $I = \\int r^2 dm$',
              latexMath: 'I = \\int_{0}^{L} x^2 dm = \\int_{0}^{L} x^2 \\left( \\frac{M}{L} \\right) dx',
              physicalIntuitionTh: 'ระยะห่างจากแกนหมุน $r$ ในที่นี้คือพิกัด $x$ ตามแนวแท่ง',
              mathOperationTh: 'แทน $r = x$ และ $dm = (M/L)dx$',
            },
            {
              stepNumber: 3,
              titleTh: 'ดึงค่าคงที่และคำนวณผลลัพธ์การอินทิเกรต',
              latexMath: 'I = \\frac{M}{L} \\left[ \\frac{x^3}{3} \\right]_{0}^{L} = \\frac{M}{L} \\left( \\frac{L^3}{3} - 0 \\right)',
              physicalIntuitionTh: 'กำลังสามของ $L$ หารด้วย $L$ เหลือ $L^2$ ทำให้มิติของหน่วยเป็น $\\text{kg}\\cdot\\text{m}^2$ อย่างถูกต้อง',
              mathOperationTh: 'ใช้สูตร $\\int x^2\\,dx = \\frac{x^3}{3}$',
              isCrucialLeap: true,
            },
            {
              stepNumber: 4,
              titleTh: 'สรุปผลลัพธ์และเทียบกับทฤษฎีบทแกนขนาน',
              latexMath: 'I_{end} = \\frac{1}{3}ML^2 = I_{cm} + M\\left( \\frac{L}{2} \\right)^2 = \\frac{1}{12}ML^2 + \\frac{1}{4}ML^2',
              physicalIntuitionTh: 'สอดคล้องกับทฤษฎีบทแกนขนาน $I = I_{cm} + Md^2$ อย่างสมบูรณ์แบบ',
              mathOperationTh: 'การตรวจสอบคำตอบแบบ Cross-check',
            },
          ],
          finalResultLatex: 'I_{end} = \\frac{1}{3}ML^2, \\quad I_{cm} = \\frac{1}{12}ML^2',
          takeawayTh: 'การหมุนรอบปลายมีความเฉื่อยมากกว่าการหมุนรอบจุดศูนย์กลางมวลถึง 4 เท่า เพราะมวลกระจายอยู่ไกลจากแกนหมุนมากกว่า',
        },
        {
          id: 'deriv-physical-pendulum-percussion',
          topicId: 'rotation-dynamics',
          titleTh: 'ตัวอย่าง K&K 7.11–7.12: ลูกตุ้มกายภาพและตำแหน่งศูนย์การกระทบ (Center of Percussion)',
          objectiveTh: 'คำนวณจุดบนไม้ตีหรือแท่งแข็งเกร็งที่เมื่อถูกชนแล้วไม่เกิดแรงดลปฏิกิริยาที่จุดหมุน ($F_{\\text{pivot}} = 0$)',
          startingAssumptions: [
            {
              id: 'asm-perc-1',
              descriptionTh: 'วัตถุแข็งเกร็งมวล $M$ ยึดกับแกนหมุนไร้แรงเสียดทานที่จุด $P$ ห่างจาก CM เป็นระยะ $L$',
              significanceTh: 'โมเมนต์ความเฉื่อยรอบจุดหมุนคือ $I_P = I_0 + ML^2$',
            },
            {
              id: 'asm-perc-2',
              descriptionTh: 'แรงดล $\\vec{J} = \\int \\vec{F}\\,dt$ กระทำตั้งฉากกับแนว $P$–CM ที่ระยะ $l$ จากจุดหมุน $P$',
              significanceTh: 'ต้องวิเคราะห์ทั้งสมการดลเชิงเส้นของ CM และสมการดลเชิงมุมรอบจุดหมุนหรือ CM',
            },
          ],
          steps: [
            {
              stepNumber: 1,
              titleTh: 'พิสูจน์คาบลูกตุ้มกายภาพจากสมการทอร์กรอบจุดตรึง $P$',
              latexMath: '\\tau_P = I_P\\ddot{\\theta} = -MgL\\sin\\theta \\approx -MgL\\theta \\implies T = 2\\pi\\sqrt{\\frac{I_P}{MgL}}',
              physicalIntuitionTh: 'น้ำหนัก $Mg$ กระทำที่จุด CM ห่างจากจุดหมุนเป็นระยะ $L$ จึงให้ทอร์กดึงกลับ $-MgL\\sin\\theta$',
              mathOperationTh: 'ประมาณ $\\sin\\theta \\approx \\theta$ สำหรับการแกว่งมุมเล็ก',
            },
            {
              stepNumber: 2,
              titleTh: 'เขียนสมการโมเมนตัมเชิงเส้นและโมเมนตัมเชิงมุมรอบจุด $P$ เมื่อมีแรงดล $J$ ที่ระยะ $l$',
              latexMath: 'J + J_{\\text{pivot}} = M V_{cm} = M(L\\omega), \\qquad J l = I_P \\omega',
              physicalIntuitionTh: 'แรงปฏิกิริยาที่จุดหมุน $J_{\\text{pivot}}$ ไม่มีทอร์กรอบจุด $P$ เพราะแขนโมเมนต์เป็นศูนย์! ดังนั้นแรงดล $J$ เพียงอย่างเดียวเป็นผู้กำหนดความเร็วเชิงมุม $\\omega$',
              mathOperationTh: 'ใช้ทฤษฎีบทการดลเชิงเส้นและเชิงมุม $\\Delta L_P = \\int \\tau_P\\,dt$',
              isCrucialLeap: true,
            },
            {
              stepNumber: 3,
              titleTh: 'ตั้งเงื่อนไขไม่สะท้านมือ ($J_{\\text{pivot}} = 0$) เพื่อหาระยะ $l_{\\text{perc}}$',
              latexMath: 'J = M L\\omega \\quad \\text{และ} \\quad J l_{\\text{perc}} = I_P \\omega \\implies l_{\\text{perc}} = \\frac{I_P}{M L}',
              physicalIntuitionTh: 'ณ ระยะนี้ การพุ่งไปข้างหน้าของ CM จากแรง $J$ จะสอดคล้องกับการหมุนรอบ $P$ พอดีโดยที่จุด $P$ ไม่ต้องถูกดึงหรือผลักเลย! (สำหรับไม้สม่ำเสมอหมุนปลาย $l_{\\text{perc}} = \\frac{2}{3}L_{\\text{rod}}$)',
              mathOperationTh: 'หารสมการทอร์กดลด้วยสมการแรงดลแล้วตัด $J$ กับ $\\omega$',
            },
          ],
          finalResultLatex: 'T = 2\\pi\\sqrt{\\frac{I_P}{MgL}}, \\qquad l_{\\text{perc}} = \\frac{I_P}{ML} = L + \\frac{I_0}{ML}',
          takeawayTh: 'สังเกตว่าความยาวสมมูลของลูกตุ้มกายภาพ $l_{\\text{eq}} = \\frac{I_P}{ML}$ กับตำแหน่งศูนย์การกระทบ "เป็นระยะเดียวกัน" พอดี!',
        },
      ],
      relatedProblemIds: ['prob-rot-cylinder-1'],
    },
    {
      id: 'lesson-rot-2',
      slug: 'chasles-theorem-rolling-motion',
      topicId: 'rotation-dynamics',
      order: 2,
      titleTh: '6.2 ทฤษฎีบทของชาส์ล การกลิ้งและการล้มของแท่ง (Rolling & Falling Bodies)',
      summaryTh:
        'การแยกการเคลื่อนที่เป็นการเลื่อนที่ของ CM บวกการหมุนรอบ CM (Chasles Theorem) โมเมนตัมเชิงมุมแบบ Spin + Orbital และการกลิ้งบนพื้นเอียง',
      readTimeMinutes: 21,
      theoryMarkdownTh: `
ใน *Kleppner & Kolenkow* (บทที่ 7.6–7.7) หัวใจของการเคลื่อนที่ในระนาบ 2 มิติที่มีทั้งการเลื่อนที่และการหมุนคือ **ทฤษฎีบทของชาส์ล (Chasles' Theorem)**: การเคลื่อนที่ทั่วไปของวัตถุแข็งเกร็งสามารถแยกออกเป็นผลรวมของ:
1. การเลื่อนตำแหน่งของจุดศูนย์กลางมวล ($\\vec{R}, \\vec{V}$)
2. การหมุนรอบจุดศูนย์กลางมวล ($\\omega$)

### 3 สมการทองคำสำหรับระนาบ 2 มิติ (K&K Sec. 7.6):
- **กฎข้อที่ 2 สำหรับ CM:** $\\vec{F}_{\\text{ext}} = M\\vec{A}_{\\text{cm}}$
- **สมการทอร์กรอบ CM (ใช้ได้แม้ CM มีความเร่ง!!):** $\\tau_{\\text{cm}} = I_0 \\alpha$
- **พลังงานจลน์รวมและโมเมนตัมเชิงมุม:**
$$K = \\frac{1}{2}M V^2 + \\frac{1}{2}I_0 \\omega^2, \\qquad \\vec{L}_Q = \\vec{R}_{\\text{cm}/Q}\\times M\\vec{V} + I_0\\vec{\\omega}$$

> **คำเตือนเรื่องจุดอ้างอิงทอร์ก:** การใช้ $\\tau_Q = \\frac{d L_Q}{dt} = I_Q\\alpha$ รอบจุดอ้างอิง $Q$ ที่ไม่ใช่ CM ใช้ได้เมื่อจุด $Q$ อยู่นิ่ง, เคลื่อนที่ด้วยความเร็วคงที่, **หรือมีความเร่งชี้ตรงผ่าน CM เท่านั้น**! หากใช้จุดสัมผัสพื้นในกรณีที่พื้นเอียงเคลื่อนที่ หรือจุดที่ไม่ใช่ CM ในกรณีทั่วไป **ห้ามใช้** เพราะจะมีทอร์กจากแรงเฉื่อยเทียม! ดังนั้นวิธีเขียนสมการรอบ CM ปลอดภัยที่สุดเสมอ
      `,
      derivations: [
        {
          id: 'deriv-rolling-drum',
          topicId: 'rotation-dynamics',
          titleTh: 'ตัวอย่าง K&K 7.15–7.16: ถังกลิ้งลงพื้นเอียง (วิธี CM และจุดสัมผัส) พร้อมเงื่อนไขการไถล',
          objectiveTh: 'คำนวณความเร่ง $a$ แรงเสียดทานสถิต $f_s$ และขีดจำกัดความชันสูงสุดก่อนเริ่มไถลด้วยความสม่ำเสมอเชิงสัญลักษณ์',
          startingAssumptions: [
            {
              id: 'asm-drum-1',
              descriptionTh: 'วัตถุกลมสมมาตรมวล $M$ รัศมี $R$ โมเมนต์ความเฉื่อยรอบแกนกลาง $I_0$ กลิ้งลงพื้นเอียงมุม $\\phi$',
              significanceTh: 'สามารถครอบคลุมทั้งวงแหวน ($I_0=MR^2$), ทรงกระบอกตัน ($\\frac{1}{2}MR^2$), และทรงกลมตัน ($\\frac{2}{5}MR^2$)',
            },
            {
              id: 'asm-drum-2',
              descriptionTh: 'กลิ้งโดยไม่ไถล (Pure Rolling): ความเร่งและแอลฟาสัมพันธ์กันด้วย $a = \\alpha R$',
              significanceTh: 'แรงเสียดทานสถิต $f_s$ เป็นตัวแปรที่ต้องแก้หา (ห้ามแทน $f_s = \\mu_s N$ ตั้งแต่ต้น!)',
            },
          ],
          steps: [
            {
              stepNumber: 1,
              titleTh: 'เขียนสมการเลื่อนที่ของ CM และสมการทอร์กรอบ CM',
              latexMath: 'M g\\sin\\phi - f_s = M a, \\qquad f_s R = I_0 \\alpha',
              physicalIntuitionTh: 'แรงโน้มถ่วง $Mg\\sin\\phi$ ดึง CM ลงมา และแรงเสียดทานสถิต $f_s$ ชี้ขึ้นพื้นเอียงคอยสร้างทอร์กปั่นให้วัตถุหมุน',
              mathOperationTh: 'ใช้แกนขนานพื้นเอียงชี้ลง และทอร์กรอบจุด CM ที่ผ่านจุดศูนย์กลางจึงไร้ทอร์กจาก $Mg$ และ $N$',
            },
            {
              stepNumber: 2,
              titleTh: 'แทนเงื่อนไขการกลิ้งไม่ไถล $\\alpha = a/R$ เพื่อแก้หา $f_s$ และ $a$',
              latexMath: 'f_s = \\frac{I_0}{R^2}a \\implies Mg\\sin\\phi - \\frac{I_0}{R^2}a = Ma \\implies a = \\frac{g\\sin\\phi}{1 + \\frac{I_0}{MR^2}}',
              physicalIntuitionTh: 'สังเกตว่าวัตถุที่กระจายมวลออกขอบมากกว่า (ค่า $\\frac{I_0}{MR^2}$ สูง เช่น วงแหวน $=1$) จะลงช้ากว่าทรงกลมตัน ($=2/5$) เสมอ ไม่ขึ้นกับ $M$ หรือ $R$!',
              mathOperationTh: 'แยกตัวประกอบพจน์ $a$ ออกจากสมการ',
              isCrucialLeap: true,
            },
            {
              stepNumber: 3,
              titleTh: 'ตรวจสอบคำตอบด้วย Instantaneous Center of Rotation (จุดสัมผัสพื้น)',
              latexMath: '\\tau_{\\text{contact}} = (Mg\\sin\\phi)R = I_{\\text{contact}}\\alpha = (I_0 + MR^2)\\frac{a}{R} \\implies a = \\frac{g\\sin\\phi}{1 + I_0/(MR^2)}',
              physicalIntuitionTh: 'รอบจุดสัมผัสที่พื้น แรง $f_s$ และ $N$ ผ่านจุดหมุนพอดี จึงคิดทอร์กได้ในบรรทัดเดียว (ใช้ได้เพราะจุดสัมผัสไม่มีความเร่งขนานกับพื้นใน Pure Rolling)',
              mathOperationTh: 'ใช้ทฤษฎีบทแกนขนาน $I_{\\text{contact}} = I_0 + MR^2$',
            },
            {
              stepNumber: 4,
              titleTh: 'หาขีดจำกัดสัมประสิทธิ์ความเสียดทาน $\\mu_s$ ที่ป้องกันการไถล',
              latexMath: 'f_s = \\frac{Mg\\sin\\phi}{1 + \\frac{MR^2}{I_0}} \\le \\mu_s N = \\mu_s Mg\\cos\\phi \\implies \\mu_s \\ge \\frac{\\tan\\phi}{1 + \\frac{MR^2}{I_0}}',
              physicalIntuitionTh: 'หากพื้นลื่นกว่าค่านี้ วัตถุจะเริ่มกลิ้งไปไถลไป (Rolling with Slipping) ซึ่งใช้ $a = \\alpha R$ ไม่ได้อีกต่อไป',
              mathOperationTh: 'แก้สมการหา $f_s = \\frac{I_0}{R^2}a$ แล้วเข้าอสมการ $f_s \\le \\mu_s Mg\\cos\\phi$',
            },
          ],
          finalResultLatex: 'a = \\frac{g\\sin\\phi}{1 + I_0/(MR^2)}, \\qquad \\mu_{s,\\min} = \\frac{\\tan\\phi}{1 + MR^2/I_0}',
          takeawayTh: 'อย่าสมมติว่า $f_s = \\mu_s N$ ในการกลิ้งโดยไม่ไถล! ต้องแก้หา $f_s$ จากสมการการเคลื่อนที่ก่อนเสมอแล้วค่อยเช็กกับค่าขีดจำกัด',
        },
      ],
      relatedProblemIds: ['prob-rot-cylinder-1', 'prob-rot-falling-stick-1'],
    },
    {
      id: 'lesson-rot-3',
      slug: '3d-rigid-body-gyroscope',
      topicId: 'rotation-dynamics',
      order: 3,
      titleTh: '6.3 พลศาสตร์วัตถุแข็งเกร็ง 3 มิติ และการหมุนควงของไจโรสโคป (Gyroscope)',
      summaryTh:
        'เหตุใดเวกเตอร์ L จึงไม่จำเป็นต้องขนานกับ omega เทนเซอร์ความเฉื่อย ทอร์ก 3 มิติกับการหมุนควง (Precession) ของลูกข่าง และเสถียรภาพแกนหมุน (Tennis Racket Theorem)',
      readTimeMinutes: 20,
      theoryMarkdownTh: `
ในบทที่ 8 ของ *Kleppner & Kolenkow* เราเปิดเผยความจริงที่น่าทึ่งของการหมุนใน 3 มิติ: **เวกเตอร์โมเมนตัมเชิงมุม $\\vec{L}$ ไม่จำเป็นต้องชี้ทิศเดียวกับเวกเตอร์ความเร็วเชิงมุม $\\vec{\\omega}$!**

ตัวอย่างเช่น ดัมเบลที่ยึดเอียงทำมุม $\\alpha$ กับแกนหมุน: ขณะหมุนด้วย $\\vec{\\omega} = \\omega\\hat{k}$ เวกเตอร์ $\\vec{L}$ จะมีองค์ประกอบในแนวราบติดไปด้วยและหมุนกวาดเป็นกรวยรอบแกนหมุน ทำให้เกิดแรงบิดพลวัตบนแบริ่งตลอดเวลา ยกเว้นเมื่อหมุนรอบ **แกนหลัก (Principal Axes)**

### พลศาสตร์ไจโรสโคปและสมการออยเลอร์ (Gyroscopic Precession & Tennis Racket Theorem):
- **กฎพื้นฐานคงความเป็นจริงเสมอ:** $\\vec{\\tau} = \\frac{d\\vec{L}}{dt}$
- เมื่อล้อไจโรสโคปหมุนรอบแกนตัวเองอย่างรวดเร็วมาก ($\\omega_s \\gg \\Omega$) ทอร์กจากน้ำหนัก $\\vec{\\tau} = \\vec{r}\\times M\\vec{g}$ ตั้งฉากกับ $\\vec{L}_s$ จึงไม่ได้ทำให้ลูกข่างล้มลง แต่ทำให้ทิศทางของ $\\vec{L}_s$ **หมุนควง (Precess)** ในแนวระดับแทน!
- **ทฤษฎีบทไม้เทนนิส (Tennis Racket / Dzhanibekov Effect — K&K Ex. 8.16):** จากสมการออยเลอร์สำหรับวัตถุไร้ทอร์กที่มี $I_1 < I_2 < I_3$ การหมุนรอบแกนน้อยสุด ($I_1$) และมากสุด ($I_3$) **เสถียร** แต่การหมุนรอบแกนกลาง ($I_2$) **ไม่เสถียร** วัตถุจะพลิกกลับด้านเองกลางอากาศ!
      `,
      derivations: [
        {
          id: 'deriv-gyroscope-precession',
          topicId: 'rotation-dynamics',
          titleTh: 'การพิสูจน์อัตราเร็วเชิงมุมของการหมุนควงไจโรสโคป $\\Omega = \\frac{Mgl}{I_0\\omega_s}$ (K&K Sec. 8.3)',
          objectiveTh: 'ใช้ความสัมพันธ์เวกเตอร์ $d\\vec{L} = \\vec{\\tau}\\,dt$ อธิบายว่าทำไมไจโรสโคปจึงไม่ล้มภายใต้แรงโน้มถ่วง พร้อมเงื่อนไขการประมาณที่สมการนี้ใช้ได้จริง',
          startingAssumptions: [
            {
              id: 'asm-gyro-1',
              descriptionTh: 'มู่เล่สมมาตร (Flywheel) มีโมเมนต์ความเฉื่อยรอบแกนสมมาตร $I_0$ ปั่นด้วยอัตราเร็วเชิงมุม $\\omega_s$ สูงมาก',
              significanceTh: 'โมเมนตัมเชิงมุมหลักจากสปิน $\\vec{L}_s = I_0\\vec{\\omega}_s$ มีขนาดใหญ่กว่าโมเมนตัมเชิงมุมจากการหมุนควงมาก ($\\omega_s \\gg \\Omega$)',
            },
            {
              id: 'asm-gyro-2',
              descriptionTh: 'แกนหมุนวางตัวในแนวระดับโดยห่างจากจุดค้ำยัน (Pivot) เป็นระยะ $l$',
              significanceTh: 'น้ำหนัก $Mg$ ก่อให้เกิดทอร์กในแนวระดับขนาด $\\tau = Mgl$ ที่ตั้งฉากกับ $\\vec{L}_s$',
            },
          ],
          steps: [
            {
              stepNumber: 1,
              titleTh: 'ระบุเวกเตอร์โมเมนตัมเชิงมุมรวมและเวกเตอร์ทอร์กจากแรงโน้มถ่วง',
              latexMath: '\\vec{L} \\approx \\vec{L}_s = I_0\\omega_s\\,\\hat{r}, \\qquad \\vec{\\tau} = \\vec{r}_{\\text{cm}} \\times (M\\vec{g}) = Mgl\\,\\hat{\\phi}',
              physicalIntuitionTh: 'ในกรอบพิกัดทรงกระบอก แกนไจโรชี้แนว $\\hat{r}$ น้ำหนักชี้ลง $-\\hat{k}$ ผลคูณไขว้ $\\hat{r} \\times (-\\hat{k}) = \\hat{\\phi}$ ทำให้เวกเตอร์ทอร์กชี้ในแนวขวางระดับเสมอ!',
              mathOperationTh: 'ใช้กฎมือขวาหาทิศทางของ $\\vec{\\tau} = \\vec{r}\\times\\vec{F}$',
            },
            {
              stepNumber: 2,
              titleTh: 'ประยุกต์สมการพลศาสตร์การหมุน $d\\vec{L} = \\vec{\\tau}\\,dt$ ในช่วงเวลาสั้นๆ $dt$',
              latexMath: 'd\\vec{L} = \\vec{\\tau}\\,dt \\implies |d\\vec{L}| = \\tau\\,dt',
              physicalIntuitionTh: 'เนื่องจาก $\\vec{\\tau}$ ตั้งฉากกับ $\\vec{L}$ เสมอ การบวกเวกเตอร์ $d\\vec{L}$ จึงเปลี่ยนเฉพาะ **ทิศทาง** ของ $\\vec{L}$ ในระนาบระดับ แต่ไม่เปลี่ยนขนาด (ไจโรจึงไม่ตกลงพื้น)',
              mathOperationTh: 'มองการเปลี่ยนแปลงเชิงเวกเตอร์ในเวลา $dt$',
              isCrucialLeap: true,
            },
            {
              stepNumber: 3,
              titleTh: 'เชื่อมโยงขนาดการเปลี่ยนเวกเตอร์ $|d\\vec{L}|$ กับมุมหมุนควง $d\\phi$',
              latexMath: '|d\\vec{L}| = L_s\\,d\\phi \\implies L_s\\,\\frac{d\\phi}{dt} = \\tau \\implies (I_0\\omega_s)\\Omega = Mgl',
              physicalIntuitionTh: 'ปลายเวกเตอร์ $\\vec{L}_s$ กวาดไปตามเส้นรอบวงรัศมี $L_s$ เป็นมุม $d\\phi$ ในเวลา $dt$ โดยมีอัตราเร็วเชิงมุมการหมุนควง $\\Omega = d\\phi/dt$',
              mathOperationTh: 'ใช้เรขาคณิตส่วนโค้งวงกลม $ds = R\\,d\\theta$ ในปริภูมิโมเมนตัมเชิงมุม',
            },
            {
              stepNumber: 4,
              titleTh: 'แก้สมการหา $\\Omega$ และตรวจสอบขอบเขตการประมาณ $L_{\\text{spin}} \\gg L_{\\text{orb}}$',
              latexMath: '\\Omega = \\frac{Mgl}{I_0\\omega_s}, \\qquad \\text{เงื่อนไขใช้ได้: } \\frac{\\Omega}{\\omega_s} \\ll 1',
              physicalIntuitionTh: 'ยิ่งปั่นไจโรเร็วมากเท่าไร ($\\omega_s$ สูง) มันยิ่งหมุนควง **ช้าลง** และตั้งฉากมั่นคงมากขึ้น เท่านั้น! (หากปล่อยโดยยังไม่หมุนควง จะมีการสั่น Nutation ควบคู่ด้วย)',
              mathOperationTh: 'จัดรูปสมการ $\\Omega$ และเทียบสเกลความถี่',
            },
          ],
          finalResultLatex: '\\Omega = \\frac{Mgl}{I_0\\omega_s} \\quad (\\text{ทวนเข็มเมื่อมองจากด้านบนหาก } \\vec{L}_s \\text{ ชี้ออก})',
          takeawayTh: 'ทอร์กที่ตั้งฉากกับ $\\vec{L}$ ไม่ได้ทำให้หมุนเข้าหาทิศของแรงที่กดลง แต่ทำให้ปลายแกนหมุน "หนีไปในทิศตั้งฉาก" (ทิศของ $\\vec{\\tau}$ เอง)',
        },
      ],
      relatedProblemIds: ['prob-rot-falling-stick-1'],
    },
  ],
};
