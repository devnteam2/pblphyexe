// src/data/chapters/newton.ts
import { Topic } from '@/types/curriculum';

export const NEWTON_TOPIC: Topic = {
  id: 'newton-constraints',
  titleTh: '3. กฎของนิวตัน สมการข้อจำกัด และระบบต่อเนื่อง (Newtonian Dynamics & Constraints)',
  subtitleTh: '6-Step Protocol, Wedge/Pulley Constraints, Bifurcations & Continuous Media (K&K Ch. 2–3)',
  iconName: 'Compass',
  colorAccent: '#22C55E',
  descriptionTh:
    'ระเบียบวิธีแก้ปัญหาพลศาสตร์ 6 ขั้นของ Kleppner & Kolenkow ระบบรอกและลิ่มเคลื่อนที่ การแยกสาขาของเพนดูลัมกรวย เชือกหมุน และสมการแคปสแตน',
  lessons: [
    {
      id: 'lesson-newton-1',
      slug: 'pulley-wedge-kinematic-constraints',
      topicId: 'newton-constraints',
      order: 1,
      titleTh: '3.1 ระเบียบวิธี 6 ขั้นของ K&K และสมการข้อจำกัดของรอกกับลิ่ม',
      summaryTh:
        'ระบบรอกเคลื่อนที่ ลิ่มไถลอิสระ หลักการความยาวเชือกคงที่ แผนภาพวัตถุอิสระเชิงสัญลักษณ์ และการตรวจสอบลิมิตของคำตอบ',
      readTimeMinutes: 20,
      theoryMarkdownTh: `
ในบทที่ 2 ของ *Kleppner & Kolenkow* แนะนำระเบียบวิธีที่เป็นระบบ 6 ขั้นตอน (K&K 6-Step Problem Solving Method) เพื่อป้องกันความผิดพลาดในระบบที่มีหลายวัตถุ:

1. **Isolate (แยกวัตถุ):** วาดขอบเขตของแต่ละมวลที่สนใจให้ชัดเจน
2. **Symbolic FBD:** วาด Free-Body Diagram แยกทีละก้อน โดยใช้ **สัญลักษณ์ตัวแปรเท่านั้น** (อย่าเพิ่งแทนตัวเลข!) และคำนึงถึงคู่กิริยา-ปฏิกิริยาตามกฎข้อที่ 3 ($\\vec{F}_{AB} = -\\vec{F}_{BA}$)
3. **Inertial Coordinates:** เลือกแกนพิกัดที่อ้างอิงกับ **กรอบเฉื่อย** (วัดจากพื้นหรือเพดานที่อยู่นิ่ง ไม่ใช่วัดจากรอกหรือลิ่มที่กำลังมีความเร่ง)
4. **Write Equations of Motion:** ตั้งสมการ $F_i = m_i a_i$ ครบทุกแกนที่เป็นอิสระ
5. **Apply Constraints (สมการข้อจำกัด):** ใช้เรขาคณิตของเชือกที่ไม่ยืด หรือผิวสัมผัสที่ไม่จม/ไม่ลอย เชื่อมโยงความเร่งระหว่างวัตถุ
6. **Solve Symbolically & Check Limits:** แก้ระบบสมการติดตัวแปร แล้วทดสอบกรณีสุดขั้ว (เช่น $M \\to \\infty$, $\\theta \\to 0$, $\\theta \\to \\pi/2$) และตรวจสอบมิติ

### สองเครื่องมือหลักสำหรับสมการข้อจำกัด:
- **ความยาวเชือกคงที่ (String Length Invariance):** เขียน $L = \\sum y_i + \\text{const}$ ในพิกัดกรอบเฉื่อยแล้วดิฟเทียบเวลา 2 ครั้ง
- **งานเสมือนของแรงภายใน (Tension Power Method):** สำหรับเชือกเบาไม่ยืดหยุ่น $\\sum \\vec{T}_i \\cdot \\vec{a}_i = 0$
      `,
      derivations: [
        {
          id: 'deriv-movable-pulley-constraint',
          topicId: 'newton-constraints',
          titleTh: 'การพิสูจน์ความสัมพันธ์ความเร่งรอกเคลื่อนที่ผ่านการดิฟความยาวเชือก',
          objectiveTh: 'แสดงให้เห็นว่าเหตุใดความเร่งของวัตถุหนึ่งจึงเป็นสองเท่าของอีกวัตถุหนึ่งจาก First Principles',
          startingAssumptions: [
            {
              id: 'asm-pulley-1',
              descriptionTh: 'เชือกเบา ไม่ยืดหยุ่น ($L = \\text{constant}$)',
              significanceTh: 'อนุพันธ์ของความยาวเทียบกับเวลาเป็นศูนย์ทุกอันดับ',
            },
            {
              id: 'asm-pulley-2',
              descriptionTh: 'รอกเบาและไม่มีแรงเสียดทานที่แกนหมุน',
              significanceTh: 'แรงตึงเชือกมีขนาดเท่ากันตลอดเส้น',
            },
          ],
          steps: [
            {
              stepNumber: 1,
              titleTh: 'กำหนดแกนอ้างอิงเฉื่อยและตำแหน่งพิกัดของแต่ละมวลและรอก',
              latexMath: 'L = y_A + 2y_P + C',
              physicalIntuitionTh: 'วัดพิกัดดิ่ง $y$ จากเพดานคงที่ลงมา มวล $A$ แขวนด้วยเชือกเส้นเดียว ส่วนรอกเคลื่อนที่ $P$ มีเชือก 2 ข้างพาดผ่าน',
              mathOperationTh: 'เขียนสมการความยาวเชือก $L$ จากเรขาคณิต',
            },
            {
              stepNumber: 2,
              titleTh: 'หาอนุพันธ์อันดับที่หนึ่งเทียบกับเวลา $t$ (ความเร็ว)',
              latexMath: '\\frac{dL}{dt} = \\frac{dy_A}{dt} + 2\\frac{dy_P}{dt} + 0 = 0 \\implies v_A + 2v_P = 0',
              physicalIntuitionTh: 'เนื่องจากความยาวเชือกไม่เปลี่ยนแปลง อัตราการเปลี่ยนแปลงความยาว $\\frac{dL}{dt}$ จึงต้องเป็นศูนย์',
              mathOperationTh: 'ดิฟเทียบ $t$ โดยที่ $\\frac{d(\\text{constant})}{dt} = 0$',
            },
            {
              stepNumber: 3,
              titleTh: 'หาอนุพันธ์อันดับที่สองเทียบกับเวลา $t$ (ความเร่ง)',
              latexMath: '\\frac{dv_A}{dt} + 2\\frac{dv_P}{dt} = 0 \\implies a_A + 2a_P = 0 \\iff a_A = -2a_P',
              physicalIntuitionTh: 'ถ้ารอกเคลื่อนที่เลื่อนลง 1 หน่วย มวล $A$ จะต้องเลื่อนขึ้น 2 หน่วยเพื่อรักษาความยาวเชือก',
              mathOperationTh: 'ดิฟซ้ำอีกหนึ่งครั้งเพื่อเปลี่ยน $v \\to a$',
              isCrucialLeap: true,
            },
            {
              stepNumber: 4,
              titleTh: 'ตรวจสอบด้วยหลักการงานเสมือน (Tension Power Method)',
              latexMath: '\\sum \\vec{T}_i \\cdot \\vec{a}_i = T a_A + (2T) a_P = 0 \\implies a_A + 2a_P = 0',
              physicalIntuitionTh: 'แรงตึงเชือกเป็นแรงภายใน (Internal Force) งานสุทธิของแรงตึงเชือกในระบบที่เชือกไม่ยืดต้องเป็นศูนย์เสมอ วิธีนี้คิดได้ใน 5 วินาทีในห้องสอบ สอวน.!',
              mathOperationTh: 'ตั้งผลบวกของกำลังงานของแรงตึงเชือกเท่ากับ $0$',
            },
          ],
          finalResultLatex: 'a_A = -2a_P \\quad \\text{หรือ} \\quad \\sum_{i} T_i a_i = 0',
          takeawayTh: 'วิธีผลรวม $\\sum \\vec{T}_i \\cdot \\vec{a}_i = 0$ สามารถแก้ปัญหารอกซ้อนกี่ชั้นก็ได้โดยไม่ต้องวาดพิกัดเรขาคณิตให้เสียเวลา',
        },
        {
          id: 'deriv-wedge-constraint',
          topicId: 'newton-constraints',
          titleTh: 'ตัวอย่าง K&K 2.5: มวลไถลบนลิ่มเคลื่อนที่ในกรอบเฉื่อย (Block & Movable Wedge)',
          objectiveTh: 'แก้ปัญหาลิ่มมวล $M$ และบล็อกมวล $m$ โดยใช้พิกัดกรอบเฉื่อยแท้ๆ พร้อมสมการข้อจำกัดเรขาคณิตและตรวจสอบกรณีลิมิต',
          startingAssumptions: [
            {
              id: 'asm-wedge-1',
              descriptionTh: 'พื้นราบและหน้าเอียงทำมุม $\\theta$ กับแนวระดับปราศจากความเสียดทานทุกผิวสัมผัส',
              significanceTh: 'แรงปฏิกิริยา $N$ ระหว่างบล็อกและลิ่มตั้งฉากกับหน้าเอียงพอดี',
            },
            {
              id: 'asm-wedge-2',
              descriptionTh: 'บล็อกมวล $m$ ยังคงสัมผัสกับผิวหน้าเอียงตลอดการเคลื่อนที่ ($N > 0$)',
              significanceTh: 'บังคับให้พิกัด $(x, y)$ ของบล็อกและ $X$ ของลิ่มต้องสอดคล้องกับความชัน $\\tan\\theta$',
            },
          ],
          steps: [
            {
              stepNumber: 1,
              titleTh: 'เขียนกฎข้อที่ 2 ของนิวตันในกรอบเฉื่อยของพื้น (ให้ $+x$ ไปทางขวา, $+y$ ลงล่าง)',
              latexMath: 'M\\ddot{X} = -N\\sin\\theta, \\qquad m\\ddot{x} = N\\sin\\theta, \\qquad m\\ddot{y} = mg - N\\cos\\theta',
              physicalIntuitionTh: 'ถ้ามวล $m$ ไถลลงไปทางขวา แรงดันตั้งฉาก $N$ จะผลักลิ่ม $M$ ถอยหลังไปทางซ้าย ($-\\sin\\theta$) สังเกตว่า $M\\ddot{X} + m\\ddot{x} = 0$ (CM แนวราบอยู่นิ่ง)',
              mathOperationTh: 'แตกแรง $N$ เข้าสู่แกน $x$ และ $y$ บน FBD ของทั้ง $M$ และ $m$',
            },
            {
              stepNumber: 2,
              titleTh: 'หาสมการข้อจำกัดทางเรขาคณิตระหว่างบล็อกและลิ่ม',
              latexMath: '\\frac{y}{x - X} = \\tan\\theta \\implies \\ddot{y} = (\\ddot{x} - \\ddot{X})\\tan\\theta',
              physicalIntuitionTh: 'ตำแหน่งสัมพัทธ์ในแนวราบ $(x - X)$ และแนวดิ่ง $y$ ของบล็อกต้องอยู่บนเส้นตรงความชัน $\\tan\\theta$ เสมอ จึงดิฟเทียบเวลา 2 ครั้งได้โดยตรง',
              mathOperationTh: 'ดิฟ $y = (x - X)\\tan\\theta$ เทียบเวลา 2 ครั้ง',
              isCrucialLeap: true,
            },
            {
              stepNumber: 3,
              titleTh: 'แทนความเร่งจากสมการข้อ 1 ลงในสมการข้อจำกัดเพื่อแก้หา $N$',
              latexMath: 'g - \\frac{N\\cos\\theta}{m} = \\left(\\frac{N\\sin\\theta}{m} + \\frac{N\\sin\\theta}{M}\\right)\\tan\\theta',
              physicalIntuitionTh: 'เราเปลี่ยนตัวแปรที่ไม่รู้ค่า 3 ตัว ($\\ddot{X}, \\ddot{x}, \\ddot{y}$) ให้เหลือเพียงตัวแปรเดียวคือแรงปฏิกิริยา $N$',
              mathOperationTh: 'จัดรูปพจน์ด้านขวาด้วย $\\sin\\theta\\tan\\theta = \\frac{\\sin^2\\theta}{\\cos\\theta}$',
            },
            {
              stepNumber: 4,
              titleTh: 'แก้สมการหาความเร่งของลิ่ม $A_X = -\\ddot{X}$ และตรวจสอบกรณีลิมิต K&K',
              latexMath: 'N = \\frac{mg\\cos\\theta}{1 + \\frac{m}{M}\\sin^2\\theta} \\implies A_X = \\frac{mg\\sin\\theta\\cos\\theta}{M + m\\sin^2\\theta}',
              physicalIntuitionTh: 'ตรวจสอบ 3 ลิมิต: (1) $M \\gg m \\implies A_X \\to 0$ และ $N \\to mg\\cos\\theta$, (2) $\\theta \\to 0 \\implies A_X \\to 0$, (3) $\\theta \\to \\pi/2 \\implies N \\to 0$ บล็อกตกอิสระ ลิ่มไม่ขยับ ทุกกรณีสมเหตุสมผล 100%',
              mathOperationTh: 'แทน $N$ กลับใน $A_X = \\frac{N\\sin\\theta}{M}$ แล้วคูณบน-ล่างด้วย $M$',
            },
          ],
          finalResultLatex: 'A_X = \\frac{mg\\sin\\theta\\cos\\theta}{M + m\\sin^2\\theta}, \\qquad N = \\frac{Mmg\\cos\\theta}{M + m\\sin^2\\theta}',
          takeawayTh: 'การใช้พิกัดกรอบเฉื่อยแท้และดิฟสมการความชันเป็นวิธีมาตรฐานที่ปลอดภัยกว่าการใช้กรอบไม่เฉื่อยเมื่อมีหลายวัตถุซ้อนกัน',
        },
      ],
      relatedProblemIds: ['prob-newton-wedge-1'],
    },
    {
      id: 'lesson-newton-2',
      slug: 'polar-dynamics-bifurcation',
      topicId: 'newton-constraints',
      order: 2,
      titleTh: '3.2 พลศาสตร์ในพิกัดเชิงขั้วและปรากฏการณ์ Bifurcation ของเพนดูลัมกรวย',
      summaryTh:
        'การตั้งสมการ F = ma ในพิกัดเชิงขั้ว ปัญหาลูกปัดบนห่วงหมุนและเพนดูลัมกรวย พร้อมข้อควรระวังเรื่องการหารด้วย sin(alpha) ที่อาจเป็นศูนย์',
      readTimeMinutes: 17,
      theoryMarkdownTh: `
เมื่อนำกฎข้อที่ 2 ของนิวตัน $\\vec{F} = m\\vec{a}$ มาประกอบเข้ากับความเร่งในพิกัดเชิงขั้วจากบทที่แล้ว เราจะได้ **สมการการเคลื่อนที่ในพิกัดเชิงขั้ว** (K&K Section 2.6):

$$F_r = m(\\ddot{r} - r\\dot{\\theta}^2)$$
$$F_\\theta = m(r\\ddot{\\theta} + 2\\dot{r}\\dot{\\theta})$$

### ข้อคิดสำคัญแบบ Kleppner & Kolenkow:
1. **การย้ายข้างเทอม $-mr\\dot{\\theta}^2$ เป็นกับดักเชิงมโนทัศน์:** ไม่ควรเรียก $mr\\omega^2$ ว่า "แรงหนีศูนย์กลาง" ในกรอบเฉื่อย เพราะมันเป็นส่วนหนึ่งของมวลคูณความเร่ง ($m\\vec{a}$) ด้านขวาของสมการ ไม่ใช่แรงที่กระทำต่อวัตถุ!
2. **จุดวิกฤตและการแยกสาขา (Bifurcation & Critical Omega):** ในระบบเพนดูลัมกรวย หรือลูกปัดบนห่วงหมุนที่รอบหมุน $\\omega$ เพิ่มขึ้นเรื่อยๆ สมการ $\\sin\\alpha(\\dots) = 0$ จะมีคำตอบเสมอว่า $\\alpha = 0$ หากเราเผลอหารด้วย $\\sin\\alpha$ โดยไม่เช็กเงื่อนไข $\\sin\\alpha \\neq 0$ เราจะมองข้ามขีดจำกัดวิกฤต $\\omega_c = \\sqrt{g/l}$ ไปทันที!
      `,
      derivations: [
        {
          id: 'deriv-conical-pendulum',
          topicId: 'newton-constraints',
          titleTh: 'ตัวอย่าง K&K 2.10: เพนดูลัมกรวยและขีดจำกัดวิกฤต $\\omega_c = \\sqrt{g/l}$ (Bifurcation)',
          objectiveTh: 'วิเคราะห์มุมเอียงสมดุล $\\alpha$ ของลูกตุ้มมวล $m$ ที่หมุนด้วยอัตราเร็วเชิงมุมคงที่ $\\omega$ และค้นหาความเร็วเชิงมุมขั้นต่ำในการยกตัว',
          startingAssumptions: [
            {
              id: 'asm-con-1',
              descriptionTh: 'ลูกปัด/ลูกตุ้มผูกเชือกเบาหรืออยู่บนห่วงวงกลมรัศมี $l$ หมุนรอบแกนดิ่งด้วย $\\omega$ คงที่',
              significanceTh: 'เคลื่อนที่เป็นวงกลมในระนาบระดับรัศมี $r = l\\sin\\alpha$ โดยที่ $\\dot{r} = 0, \\ddot{r} = 0$',
            },
            {
              id: 'asm-con-2',
              descriptionTh: 'ปราศจากความเสียดทานทุกชนิด พิจารณาสภาวะคงตัว ($\\alpha = \\text{constant}$)',
              significanceTh: 'สมดุลในแนวดิ่ง $\\Sigma F_z = 0$ และวงกลมในแนวระดับ $F_r = -m\\omega^2 r$',
            },
          ],
          steps: [
            {
              stepNumber: 1,
              titleTh: 'ตั้งสมการการเคลื่อนที่ในแนวดิ่ง ($z$) และแนวรัศมีเข้าหาศูนย์กลาง ($r$)',
              latexMath: 'T\\cos\\alpha - mg = 0, \\qquad -T\\sin\\alpha = -m\\omega^2 (l\\sin\\alpha)',
              physicalIntuitionTh: 'ในแนวระดับ องค์ประกอบของแรงตึงเชือก (หรือแรงตั้งฉาก $N$ จากห่วง) ชี้เข้าสู่แกนหมุน ทำให้เกิดความเร่งสู่ศูนย์กลาง $\\omega^2 r$',
              mathOperationTh: 'แทน $r = l\\sin\\alpha$ ในสมการ $F_r = -m\\omega^2 r$',
            },
            {
              stepNumber: 2,
              titleTh: 'พิจารณาเงื่อนไขการหารด้วย $\\sin\\alpha$ อย่างรัดกุม!',
              latexMath: '\\sin\\alpha\\,(T - m\\omega^2 l) = 0',
              physicalIntuitionTh: 'ห้ามหารด้วย $\\sin\\alpha$ ทิ้งโดยไม่แยกกรณี! สมการนี้บอกเราว่ามี 2 สาขาคำตอบที่เป็นไปได้คือ $\\alpha = 0$ (ห้อยดิ่งอยู่ล่างสุด) หรือ $T = m\\omega^2 l$',
              mathOperationTh: 'แยกตัวประกอบแทนการหารตัดตรงๆ',
              isCrucialLeap: true,
            },
            {
              stepNumber: 3,
              titleTh: 'แทน $T = \\frac{mg}{\\cos\\alpha}$ เมื่อ $\\alpha > 0$ และตรวจเงื่อนไข $\\cos\\alpha \\le 1$',
              latexMath: '\\frac{mg}{\\cos\\alpha} = m\\omega^2 l \\implies \\cos\\alpha = \\frac{g}{l\\omega^2} \\le 1',
              physicalIntuitionTh: 'เนื่องจากค่าโคไซน์ไม่มีทางเกิน $1$ คำตอบที่มุมกางออก $\\alpha > 0$ จะเกิดขึ้นได้ก็ต่อเมื่อ $\\omega^2 > \\frac{g}{l}$ เท่านั้น',
              mathOperationTh: 'แก้อสมการ $\\frac{g}{l\\omega^2} \\le 1$',
            },
            {
              stepNumber: 4,
              titleTh: 'สรุปปรากฏการณ์ Bifurcation ที่ $\\omega_c = \\sqrt{g/l}$',
              latexMath: '\\omega \\le \\sqrt{\\frac{g}{l}} \\implies \\alpha = 0; \\qquad \\omega > \\sqrt{\\frac{g}{l}} \\implies \\alpha = \\arccos\\left(\\frac{g}{l\\omega^2}\\right)',
              physicalIntuitionTh: 'ถ้าหมุนช้ากว่าความถี่ธรรมชาติของลูกตุ้ม $\\sqrt{g/l}$ เชือกจะห้อยดิ่งตลอด ($\\alpha=0$) แต่เมื่อข้าม $\\omega_c$ จุดล่างสุดจะสูญเสียเสถียรภาพและกางออกทันที',
              mathOperationTh: 'ตรวจสอบลิมิต $\\omega \\to \\infty \\implies \\cos\\alpha \\to 0 \\implies \\alpha \\to \\pi/2$',
            },
          ],
          finalResultLatex: '\\omega_c = \\sqrt{\\frac{g}{l}}, \\qquad \\cos\\alpha = \\frac{g}{l\\omega^2} \\; (\\omega > \\omega_c)',
          takeawayTh: 'อย่าตัด $\\sin\\alpha$ ทิ้งในการสอบ สอวน.! การแยกตัวประกอบมักซ่อนเงื่อนไข Bifurcation หรือความถี่วิกฤตของระบบเอาไว้เสมอ',
        },
      ],
      relatedProblemIds: ['prob-newton-conical-1'],
    },
    {
      id: 'lesson-newton-3',
      slug: 'continuous-mass-tension-capstan',
      topicId: 'newton-constraints',
      order: 3,
      titleTh: '3.3 ระบบมวลต่อเนื่อง แรงตึงในเชือกหมุน และสมการแคปสแตน (Capstan Equation)',
      summaryTh:
        'การตัดชิ้นส่วนมวลย่อย dm = lambda dl เพื่อหาความตึงเชือก T(r) ในเชือกหมุนรอบแกน และการพิสูจน์การขยายแรงเสียดทานแบบเอกซ์โพเนนเชียล',
      readTimeMinutes: 20,
      theoryMarkdownTh: `
ในบทที่ 3 ของ *Kleppner & Kolenkow* เราขยายการใช้กฎของนิวตันจากจุดมวลเดี่ยวไปสู่ **ระบบมวลต่อเนื่อง (Continuous Systems)** เช่น เชือกหนัก เส้นลวดหมุน หรือเชือกพันรอบเสาหลัก:

### วิธีวิเคราะห์ชิ้นส่วนมวลย่อย (Differential Mass Element $dm$):
แทนที่จะมองทั้งเส้นพร้อมกัน ให้ตัดชิ้นส่วนเล็กๆ ความยาว $dr$ (หรือมุม $d\\theta$) ที่มีมวล:
- เชือกตรงสม่ำเสมอ: $dm = \\lambda\\,dr = \\left(\\frac{M}{L}\\right)dr$
- เชือกโค้งพาดบนเสากลมรัศมี $R$: ความยาวส่วนโค้ง $ds = R\\,d\\theta$

โดยอาศัยการประมาณค่ามุมเล็ก $\\sin\\left(\\frac{d\\theta}{2}\\right) \\approx \\frac{d\\theta}{2}$ และ $\\cos\\left(\\frac{d\\theta}{2}\\right) \\approx 1$ เราสามารถเปลี่ยนปัญหาที่ซับซ้อนให้กลายเป็น **สมการเชิงอนุพันธ์อันดับหนึ่ง** แล้วอินทิเกรตตลอดความยาวเชือกได้ทันที
      `,
      derivations: [
        {
          id: 'deriv-whirling-rope',
          topicId: 'newton-constraints',
          titleTh: 'ตัวอย่าง K&K 3.6: การกระจายแรงตึงในเชือกสม่ำเสมอที่หมุนควง (Whirling Rope)',
          objectiveTh: 'คำนวณฟังก์ชันแรงตึงเชือก $T(r)$ ที่ระยะห่าง $r$ จากแกนหมุนในระนาบไร้น้ำหนัก',
          startingAssumptions: [
            {
              id: 'asm-rope-1',
              descriptionTh: 'เชือกมวล $M$ ยาว $L$ ความหนาแน่นเชิงเส้นคงที่ $\\lambda = M/L$',
              significanceTh: 'ชิ้นส่วนมวลที่ระยะ $r$ ถึง $r + dr$ มีค่าเท่ากับ $dm = \\frac{M}{L}\\,dr$',
            },
            {
              id: 'asm-rope-2',
              descriptionTh: 'หมุนด้วยอัตราเร็วเชิงมุมคงที่ $\\omega$ ในระนาบระดับและปลายนอกอิสระ ($T(L) = 0$)',
              significanceTh: 'ให้เงื่อนไขขอบเขต (Boundary Condition) ที่ปลายอิสระ $r = L$ คือไม่มีแรงตึง',
            },
          ],
          steps: [
            {
              stepNumber: 1,
              titleTh: 'วาด FBD บนชิ้นส่วนย่อย $[r, r + dr]$ ที่มีมวล $dm = \\lambda\\,dr$',
              latexMath: 'T(r) - T(r + dr) = dm\\,\\omega^2 r',
              physicalIntuitionTh: 'ชิ้นส่วนเชือกเคลื่อนที่เป็นวงกลมเข้าหาศูนย์กลางด้วยความเร่ง $\\omega^2 r$ แรงตึงด้านใน $T(r)$ ดึงเข้าส่วนด้านนอก $T(r+dr)$ ดึงออก ผลต่างจึงต้องชี้เข้าศูนย์กลาง',
              mathOperationTh: 'เขียนกฎข้อที่ 2 ในทิศเข้าหาศูนย์กลาง',
            },
            {
              stepNumber: 2,
              titleTh: 'แปลงผลต่างแรงตึงเป็นอนุพันธ์ $-dT = \\lambda\\omega^2 r\\,dr$',
              latexMath: '\\frac{T(r+dr) - T(r)}{dr} = \\frac{dT}{dr} = -\\frac{M}{L}\\omega^2 r',
              physicalIntuitionTh: 'ยิ่งเข้าใกล้แกนหมุน ($r$ น้อย) เชือกต้องรับน้ำหนักแรงสู่ศูนย์กลางของส่วนที่อยู่ด้านนอกทั้งหมด แรงตึงจึงสูงสุดที่แกนหมุนและลดลงตาม $r$',
              mathOperationTh: 'ใช้นิยามอนุพันธ์ $\\lim_{dr\\to 0}\\frac{T(r+dr)-T(r)}{dr} = \\frac{dT}{dr}$',
              isCrucialLeap: true,
            },
            {
              stepNumber: 3,
              titleTh: 'อินทิเกรตจำกัดเขตจากระยะ $r$ ใดๆ ไปจนถึงปลายอิสระ $r = L$',
              latexMath: '\\int_{T(r)}^{T(L)=0} dT\' = -\\frac{M\\omega^2}{L}\\int_{r}^{L} r\'\\,dr\'',
              physicalIntuitionTh: 'แทนเงื่อนไขขอบที่ปลายนอก $T(L) = 0$ เพื่อหาแรงตึงที่จุด $r$ โดยตรง (หรือคิดทั้งก้อนตั้งแต่ $r$ ถึง $L$ มีจุดศูนย์กลางมวลอยู่ที่ $(L+r)/2$ ก็จะได้คำตอบเท่ากัน!)',
              mathOperationTh: 'อินทิเกรตพหุนาม $\\int r\'\\,dr\' = \\frac{1}{2}r\'^2$',
            },
            {
              stepNumber: 4,
              titleTh: 'จัดรูปสมการแรงตึงเชือก $T(r)$ และตรวจสอบค่าที่ $r = 0$',
              latexMath: '-T(r) = -\\frac{M\\omega^2}{2L}(L^2 - r^2) \\implies T(r) = \\frac{M\\omega^2}{2L}(L^2 - r^2)',
              physicalIntuitionTh: 'ที่จุดยึดหมุน ($r = 0$) ได้ $T(0) = \\frac{1}{2}M\\omega^2 L$ ซึ่งตรงกับมวลทั้งหมด $M$ ที่จุด CM ระยะ $L/2$ พอดี!',
              mathOperationTh: 'คูณเครื่องหมาย $-1$ ทั้งสองข้าง',
            },
          ],
          finalResultLatex: 'T(r) = \\frac{M\\omega^2}{2L}(L^2 - r^2)',
          takeawayTh: 'แรงตึงในเชือกหรือโซ่ที่หมุนมีลักษณะเป็นพาราโบลาคว่ำ สูงสุดที่จุดหมุนเท่ากับ $M\\omega^2 (L/2)$ และเป็นศูนย์ที่ปลายอิสระ',
        },
        {
          id: 'deriv-capstan-equation',
          topicId: 'newton-constraints',
          titleTh: 'โจทย์ K&K 3.12: สมการแคปสแตน (The Capstan Friction Equation $T_B = T_A e^{\\mu\\theta}$)',
          objectiveTh: 'พิสูจน์ว่าเหตุใดการพันเชือกรอบเสาเพียงไม่กี่รอบจึงสามารถยึดเรือลำมหึมาไว้ได้ด้วยแรงดึงปลายเล็กน้อย',
          startingAssumptions: [
            {
              id: 'asm-cap-1',
              descriptionTh: 'เชือกเบาพาดผ่านเสาหรือกว้านทรงกระบอกครอบคลุมมุม $\\theta$ (เรเดียน)',
              significanceTh: 'ตัดผลของแรงโน้มถ่วงและมวลเชือกออกไป เหลือเพียงแรงตึง $T$, แรงตั้งฉาก $dN$ และแรงเสียดทาน $df$',
            },
            {
              id: 'asm-cap-2',
              descriptionTh: 'เชือกจวนจะไถลไปทางฝั่งแรงดึงมาก $T_B$ โดยสัมประสิทธิ์ความเสียดทานคือ $\\mu$',
              significanceTh: 'แรงเสียดทานสถิตสูงสุด $df = \\mu\\,dN$ มีทิศช่วยพยุงฝั่งแรงดึงน้อย $T_A$',
            },
          ],
          steps: [
            {
              stepNumber: 1,
              titleTh: 'พิจารณามุมย่อย $d\\theta$ ที่มีแรงตึงสองด้านเป็น $T$ และ $T + dT$',
              latexMath: '\\Sigma F_r = dN - T\\sin\\left(\\frac{d\\theta}{2}\\right) - (T + dT)\\sin\\left(\\frac{d\\theta}{2}\\right) = 0',
              physicalIntuitionTh: 'ตั้งฉากกับผิวเสา แรงตั้งฉาก $dN$ ดันเชือกออกเพื่อต้านองค์ประกอบของแรงตึงสองข้างที่กดบีบเข้าหาศูนย์กลางเสา',
              mathOperationTh: 'แตกแรง $T$ และ $T+dT$ เข้าสู่แนวรัศมีของเสา',
            },
            {
              stepNumber: 2,
              titleTh: 'ใช้การประมาณมุมเล็ก $\\sin(d\\theta/2) \\approx d\\theta/2$ และตัดเทอมอันดับสอง $dT\\,d\\theta$',
              latexMath: 'dN = (2T + dT)\\frac{d\\theta}{2} \\approx T\\,d\\theta',
              physicalIntuitionTh: 'ผลคูณของปริมาณเล็กจิ๋วสองตัว ($dT\\,d\\theta$) เป็นอันดับสอง ซึ่งหายไปเมื่อ $d\\theta \\to 0$',
              mathOperationTh: 'ประมาณ $\\sin(\\epsilon) \\approx \\epsilon$ และ $\\cos(\\epsilon) \\approx 1$',
              isCrucialLeap: true,
            },
            {
              stepNumber: 3,
              titleTh: 'ตั้งสมการสมดุลตามแนวเส้นสัมผัสและแทน $df = \\mu\\,dN$',
              latexMath: '(T + dT)\\cos\\left(\\frac{d\\theta}{2}\\right) - T\\cos\\left(\\frac{d\\theta}{2}\\right) - df = 0 \\implies dT = \\mu\\,dN = \\mu T\\,d\\theta',
              physicalIntuitionTh: 'แรงเสียดทานย่อยในแต่ละช่วงมุม $d\\theta$ เป็นสัดส่วนโดยตรงกับความตึง $T$ ณ ตำแหน่งนั้น',
              mathOperationTh: 'แทน $dN = T\\,d\\theta$ เพื่อตั้งสมการเชิงอนุพันธ์',
            },
            {
              stepNumber: 4,
              titleTh: 'แยกตัวแปรแล้วอินทิเกรตตลอดมุมโอบรอบเสาตั้งแต่ $0$ ถึง $\\theta$',
              latexMath: '\\int_{T_A}^{T_B} \\frac{dT}{T} = \\mu \\int_{0}^{\\theta} d\\theta\' \\implies \\ln\\left(\\frac{T_B}{T_A}\\right) = \\mu\\theta \\implies T_B = T_A e^{\\mu\\theta}',
              physicalIntuitionTh: 'แรงต้านเพิ่มขึ้นแบบทวีคูณเอกซ์โพเนนเชียล! หาก $\\mu = 0.3$ และพันเพียง 2 รอบ ($\\theta = 4\\pi$) อัตราส่วน $e^{1.2\\pi} \\approx 43$ เท่า',
              mathOperationTh: 'อินทิเกรต $\\int \\frac{dT}{T} = \\ln T$ แล้วยกกำลังฐาน $e$',
            },
          ],
          finalResultLatex: 'T_B = T_A e^{\\mu\\theta}',
          takeawayTh: 'เทคนิค "ตัดทอนดิฟเฟอเรนเชียลอันดับสอง $dT\\,d\\theta \\to 0$ พร้อมใช้ Small Angle Approximation" เป็นหัวใจของโจทย์เส้นลวด เชือก และสายพานใน สอวน.',
        },
      ],
      relatedProblemIds: ['prob-newton-capstan-1'],
    },
  ],
};
