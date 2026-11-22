// src/data/chapters/nonInertialCentralForce.ts
import { Topic } from '@/types/curriculum';

export const NON_INERTIAL_CENTRAL_FORCE_TOPIC: Topic = {
  id: 'non-inertial-central-force',
  track: 'camp-1-2',
  titleTh: '7. กรอบอ้างอิงไม่เฉื่อยและแรงสู่ศูนย์กลาง (Non-Inertial Frames & Central Forces)',
  subtitleTh: 'Fictitious, Centrifugal & Coriolis Forces, Effective Potential & Kepler Orbits (K&K Ch. 9–10)',
  iconName: 'Orbit',
  colorAccent: '#8B5CF6',
  descriptionTh:
    'ฟิสิกส์ในกรอบอ้างอิงที่เร่งและกรอบหมุน แรงหนีศูนย์กลางกับแรงคอริโอลิส ลูกตุ้มฟูโกต์ การลดรูปปัญหาสองวัตถุ ศักย์ยังผล และวงโคจรเคปเลอร์ (K&K บทที่ 9–10)',
  lessons: [
    {
      id: 'lesson-noninertial-1',
      slug: 'accelerating-rotating-frames',
      topicId: 'non-inertial-central-force',
      order: 1,
      titleTh: '7.1 กรอบอ้างอิงที่มีความเร่ง กรอบหมุน แรงหนีศูนย์กลาง และแรงคอริโอลิส',
      summaryTh:
        'การแปลงตัวดำเนินการอนุพันธ์เทียบเวลาระหว่างกรอบเฉื่อยและกรอบหมุน แรงคอริโอลิสและแรงหนีศูนย์กลาง ถังน้ำหมุน และลูกตุ้มฟูโกต์',
      readTimeMinutes: 22,
      theoryMarkdownTh: `
ในบทที่ 9 ของ *Kleppner & Kolenkow* เราศึกษาวิธีการใช้กฎของนิวตันภายใน **กรอบอ้างอิงไม่เฉื่อย (Non-Inertial Reference Frames)** ซึ่งแบ่งเป็น 2 ประเภทหลัก:

### 1. กรอบเลื่อนที่ด้วยความเร่ง $\\vec{A}$ (Translating Frame) และหลักสมมูล
สำหรับผู้สังเกตที่ติดอยู่กับกรอบที่มีความเร่ง $\\vec{A}$ ความเร่งสัมพัทธ์คือ $\\vec{a}' = \\vec{a}_{\\text{in}} - \\vec{A}$ เมื่อเขียนเป็นสมการแรงจะได้ **แรงเฉื่อยเทียม (Fictitious Force)**:
$$m\\vec{a}' = \\vec{F}_{\\text{real}} - m\\vec{A}$$
> **หลักสมมูลของไอน์สไตน์ (Principle of Equivalence):** แรงเทียม $-m\\vec{A}$ แปรผันตรงกับมวล $m$ ทุกประการเหมือนแรงโน้มถ่วง ทำให้เกิด "ค่าแรงโน้มถ่วงยังผล" $\\vec{g}_{\\text{eff}} = \\vec{g} - \\vec{A}$ ในลิฟต์หรือรถไฟที่กำลังเร่ง!

### 2. กรอบที่หมุนด้วยอัตราเร็วเชิงมุม $\\vec{\\Omega}$ (Rotating Frame):
สำหรับเวกเตอร์ $\\vec{Q}$ ใดๆ อัตราการเปลี่ยนแปลงที่เห็นในกรอบเฉื่อยและกรอบหมุนสัมพันธ์กันผ่าน **ตัวดำเนินการกรอบหมุน (Operator Identity)**:
$$\\left(\\frac{d\\vec{Q}}{dt}\\right)_{\\text{in}} = \\left(\\frac{d\\vec{Q}}{dt}\\right)_{\\text{rot}} + \\vec{\\Omega} \\times \\vec{Q}$$

เมื่อนำไปใช้ซ้ำ 2 ครั้งกับเวกเตอร์ตำแหน่ง $\\vec{r}$ (กรณี $\\vec{\\Omega}$ คงที่) จะได้ **3 เทอมแรงเทียมเต็มรูป (K&K Eq. 9.15)**:
$$m\\vec{a}_{\\text{rot}} = \\vec{F}_{\\text{real}} \\underbrace{- 2m(\\vec{\\Omega} \\times \\vec{v}_{\\text{rot}})}_{\\text{Coriolis Force}} \\underbrace{- m\\vec{\\Omega} \\times (\\vec{\\Omega} \\times \\vec{r})}_{\\text{Centrifugal Force}}$$

#### ผลกระทบสำคัญบนโลก:
- **แรงหนีศูนย์กลาง:** ชี้ตั้งฉากออกจากแกนหมุนโลก ทำให้น้ำในถังหมุนโค้งเป็นพาราโบลา $z = \\frac{\\Omega^2 r^2}{2g}$
- **แรงคอริโอลิส:** เบี่ยงเบนวัตถุที่กำลังเคลื่อนที่บนโลก ($\\vec{v}_{\\text{rot}} \\neq 0$) ไปทางขวาในซีกโลกเหนือ ก่อให้เกิดพายุหมุน และการควงระนาบของ **ลูกตุ้มฟูโกต์ (Foucault Pendulum)** ด้วยอัตราเร็วเชิงมุม $\\Omega_{\\text{prec}} = -\\Omega_{\\text{earth}}\\sin\\lambda$ (คาบ $T = \\frac{24\\text{ hr}}{\\sin\\lambda}$)
      `,
      derivations: [
        {
          id: 'deriv-rotating-frame-forces',
          topicId: 'non-inertial-central-force',
          titleTh: 'การพิสูจน์สมการแรงคอริโอลิส แรงหนีศูนย์กลาง และผิวหน้าน้ำพาราโบลอยด์ในถังหมุน (K&K Sec. 9.4 & Ex. 9.6)',
          objectiveTh: 'สร้างความสัมพันธ์ $\\vec{a}_{\\text{in}}$ ในกรอบหมุนจากอนุพันธ์ของเวกเตอร์ฐานที่หมุนอยู่ แล้วประยุกต์หาความสูงผิวน้ำในถังหมุน',
          startingAssumptions: [
            {
              id: 'asm-rotf-1',
              descriptionTh: 'กรอบหมุน $(x\', y\', z\')$ มีจุดกำเนิดร่วมกับกรอบเฉื่อยและหมุนด้วยเวกเตอร์ $\\vec{\\Omega}$ คงที่ ($\\dot{\\vec{\\Omega}} = 0$)',
              significanceTh: 'ไม่มีเทอม Euler force ($-m\\dot{\\vec{\\Omega}}\\times\\vec{r}$) จึงโฟกัสที่ Coriolis และ Centrifugal ได้ชัดเจน',
            },
            {
              id: 'asm-rotf-2',
              descriptionTh: 'เวกเตอร์ฐาน $(\\hat{i}\', \\hat{j}\', \\hat{k}\')$ ของกรอบหมุนเปลี่ยนแปลงเทียบกับกรอบเฉื่อยตาม $\\frac{d\\hat{e}\'}{dt} = \\vec{\\Omega}\\times\\hat{e}\'$',
              significanceTh: 'ทุกเวกเตอร์ที่ตรึงในกรอบหมุนมีความเร็วเชิงเส้น $\\vec{\\Omega}\\times\\vec{Q}$',
            },
          ],
          steps: [
            {
              stepNumber: 1,
              titleTh: 'พิสูจน์สูตรตัวดำเนินการแปลงอนุพันธ์ระหว่างสองกรอบ',
              latexMath: '\\left(\\frac{d\\vec{Q}}{dt}\\right)_{\\text{in}} = \\dot{Q}_x\\hat{i}\' + \\dot{Q}_y\\hat{j}\' + \\dot{Q}_z\\hat{k}\' + Q_x\\dot{\\hat{i}}\' + Q_y\\dot{\\hat{j}}\' + Q_z\\dot{\\hat{k}}\' = \\left(\\frac{d\\vec{Q}}{dt}\\right)_{\\text{rot}} + \\vec{\\Omega}\\times\\vec{Q}',
              physicalIntuitionTh: 'สามเทอมแรกคือการเปลี่ยนขนาดพิกัดที่ผู้สังเกตในกรอบหมุนมองเห็น ส่วนสามเทอมหลังเกิดจากการหมุนของตัวแกนพิกัดเอง',
              mathOperationTh: 'กระจายอนุพันธ์ผลคูณของ $\\vec{Q} = \\sum Q_i\\hat{e}\'_i$ และแทน $\\dot{\\hat{e}}\'_i = \\vec{\\Omega}\\times\\hat{e}\'_i$',
            },
            {
              stepNumber: 2,
              titleTh: 'ใช้ตัวดำเนินการครั้งที่ 1 กับ $\\vec{Q} = \\vec{r}$ เพื่อหาความเร็วในกรอบเฉื่อย $\\vec{v}_{\\text{in}}$',
              latexMath: '\\vec{v}_{\\text{in}} = \\left(\\frac{d\\vec{r}}{dt}\\right)_{\\text{rot}} + \\vec{\\Omega}\\times\\vec{r} = \\vec{v}_{\\text{rot}} + \\vec{\\Omega}\\times\\vec{r}',
              physicalIntuitionTh: 'จุดที่อยู่นิ่งในกรอบหมุน ($\\vec{v}_{\\text{rot}} = 0$) ยังคงกวาดวงกลมในกรอบเฉื่อยด้วยความเร็ว $\\vec{\\Omega}\\times\\vec{r}$',
              mathOperationTh: 'แทน $\\vec{Q} = \\vec{r}$',
            },
            {
              stepNumber: 3,
              titleTh: 'ใช้ตัวดำเนินการซ้ำครั้งที่ 2 กับ $\\vec{Q} = \\vec{v}_{\\text{in}}$ เพื่อหาความเร่ง $\\vec{a}_{\\text{in}}$',
              latexMath: '\\vec{a}_{\\text{in}} = \\left(\\frac{d}{dt}\\right)_{\\text{rot}}(\\vec{v}_{\\text{rot}} + \\vec{\\Omega}\\times\\vec{r}) + \\vec{\\Omega}\\times(\\vec{v}_{\\text{rot}} + \\vec{\\Omega}\\times\\vec{r}) = \\vec{a}_{\\text{rot}} + 2\\vec{\\Omega}\\times\\vec{v}_{\\text{rot}} + \\vec{\\Omega}\\times(\\vec{\\Omega}\\times\\vec{r})',
              physicalIntuitionTh: 'พจน์ $\\vec{\\Omega}\\times\\vec{v}_{\\text{rot}}$ ปรากฏขึ้น 2 ครั้ง (หนึ่งจากอนุพันธ์กรอบหมุนของ $\\vec{\\Omega}\\times\\vec{r}$ และอีกหนึ่งจาก $\\vec{\\Omega}\\times\\vec{v}_{\\text{rot}}$) จึงรวมเป็น $2\\vec{\\Omega}\\times\\vec{v}_{\\text{rot}}$',
              mathOperationTh: 'กระจายอนุพันธ์และใช้ $\\dot{\\vec{\\Omega}} = 0$',
              isCrucialLeap: true,
            },
            {
              stepNumber: 4,
              titleTh: 'ประยุกต์ K&K Ex. 9.6: หยดน้ำที่อยู่นิ่งบนผิวถังหมุน ($\\vec{v}_{\\text{rot}} = 0, \\vec{a}_{\\text{rot}} = 0$)',
              latexMath: 'U_{\\text{eff}}(r, z) = mgz - \\frac{1}{2}m\\Omega^2 r^2 = \\text{constant} \\implies z(r) = z_0 + \\frac{\\Omega^2 r^2}{2g}',
              physicalIntuitionTh: 'สำหรับหยดน้ำที่อยู่นิ่งในกรอบถังหมุน แรงตั้งฉากจากน้ำด้านล่างต้องตั้งฉากกับผิวหน้าอิสระ ทำให้ผิวน้ำเป็นผิวศักย์เท่าของ $g z - \\frac{1}{2}\\Omega^2 r^2$ คือรูปพาราโบลอยด์!',
              mathOperationTh: 'สมดุลผิวหน้าน้ำ $\\frac{dz}{dr} = \\frac{F_{\\text{cent}}}{mg} = \\frac{\\Omega^2 r}{g}$ แล้วอินทิเกรตเทียบ $r$',
            },
          ],
          finalResultLatex: 'm\\vec{a}_{\\text{rot}} = \\vec{F}_{\\text{real}} - 2m(\\vec{\\Omega}\\times\\vec{v}_{\\text{rot}}) - m\\vec{\\Omega}\\times(\\vec{\\Omega}\\times\\vec{r}), \\qquad z(r) = z_0 + \\frac{\\Omega^2 r^2}{2g}',
          takeawayTh: 'แรงคอริโอลิสตั้งฉากกับ $\\vec{v}_{\\text{rot}}$ เสมอ จึง **ไม่เคยทำงาน** ในกรอบหมุน! ในขณะที่แรงหนีศูนย์กลางอนุรักษ์พลังงานและมีศักย์ $U_{\\text{cent}} = -\\frac{1}{2}m\\Omega^2 r^2$',
        },
      ],
      relatedProblemIds: ['prob-noninertial-car-1'],
    },
    {
      id: 'lesson-central-1',
      slug: 'central-force-effective-potential-kepler',
      topicId: 'non-inertial-central-force',
      order: 2,
      titleTh: '7.2 แรงสู่ศูนย์กลาง ศักย์ยังผล (Effective Potential) และกลศาสตร์วงโคจรเคปเลอร์',
      summaryTh:
        'การลดรูปปัญหาวงโคจรสองวัตถุสู่กรอบ CM ด้วยมวลลดทอน กฎข้อที่ 2 ของเคปเลอร์ สมการศักย์ยังผล 1 มิติ และสมการวิส-วีวา (Vis-Viva)',
      readTimeMinutes: 23,
      theoryMarkdownTh: `
ในบทที่ 10 ของ *Kleppner & Kolenkow* แรงคู่กิริยา-ปฏิกิริยาที่ชี้ตามแนวเชื่อมระหว่าง 2 วัตถุ $\\vec{F}_{12} = f(r)\\hat{r}$ เรียกว่า **แรงสู่ศูนย์กลาง (Central Force)**

### 1. การลดรูป 2 วัตถุเหลือ 1 วัตถุ (Two-Body Reduction):
เมื่อแยกพิกัด CM ออกไป การเคลื่อนที่สัมพัทธ์ $\\vec{r} = \\vec{r}_1 - \\vec{r}_2$ เหมือนอนุภาคเดี่ยวมวลลดทอน $\\mu = \\frac{m_1 m_2}{m_1 + m_2}$ เคลื่อนที่รอบจุดศูนย์กลางแรงที่ตรึงอยู่กับที่:
$$\\mu\\ddot{\\vec{r}} = f(r)\\hat{r}$$

### 2. การอนุรักษ์โมเมนตัมเชิงมุมและกฎพื้นที่ของเคปเลอร์:
เนื่องจากทอร์ก $\\vec{\\tau} = \\vec{r} \\times f(r)\\hat{r} = \\vec{0}$ เสมอ:
- วงโคจรทั้งหมดอยู่ใน **ระนาบคงที่** (ตั้งฉากกับ $\\vec{L}$ คงที่)
- ขนาดโมเมนตัมเชิงมุมคงที่: $L = \\mu r^2 \\dot{\\theta} = \\text{constant}$
- **กฎข้อที่ 2 ของเคปเลอร์:** อัตราการกวาดพื้นที่ของรัศมีมีค่าคงที่ $\\frac{dA}{dt} = \\frac{1}{2}r^2\\dot{\\theta} = \\frac{L}{2\\mu}$

### 3. ศักย์ยังผล (Effective Potential) และการลดรูปเหลือ 1 มิติ:
เมื่อกำจัด $\\dot{\\theta} = \\frac{L}{\\mu r^2}$ ออกจากพลังงานรวม $E = \\frac{1}{2}\\mu(\\dot{r}^2 + r^2\\dot{\\theta}^2) + U(r)$ จะได้:
$$E = \\frac{1}{2}\\mu\\dot{r}^2 + U_{\\text{eff}}(r), \\qquad U_{\\text{eff}}(r) = \\frac{L^2}{2\\mu r^2} + U(r)$$
เราจึงสามารถอ่านลักษณะวงโคจร (วงกลม, วงรี, พาราโบลา, ไฮเพอร์โบลา) จากกราฟ 1 มิติของ $U_{\\text{eff}}(r)$ ได้ทันที!

### 4. สูตรสำคัญสำหรับวงโคจรความโน้มถ่วง $U(r) = -\\frac{C}{r}$ (โดยที่ $C = GMm$):
- **สมการภาคตัดกรวย:** $r(\\theta) = \\frac{r_0}{1 - \\epsilon\\cos\\theta}$, $r_0 = \\frac{L^2}{\\mu C}$, ค่าความเยื้องศูนย์กลาง $\\epsilon = \\sqrt{1 + \\frac{2EL^2}{\\mu C^2}}$
- **สมการพลังงานและแกนกึ่งเอก $a$ (และ Vis-Viva Equation):** เมื่อ $A = 2a$ คือแกนเอกของวงรี:
$$E = -\\frac{C}{2a}, \\qquad v_{\\text{rel}}^2 = \\frac{C}{\\mu}\\left(\\frac{2}{r} - \\frac{1}{a}\\right) \\xrightarrow{m \\ll M} G M\\left(\\frac{2}{r} - \\frac{1}{a}\\right)$$
- **กฎข้อที่ 3 ของเคปเลอร์:** $T^2 = \\frac{4\\pi^2 \\mu}{C}a^3 \\xrightarrow{m \\ll M} \\frac{4\\pi^2}{GM}a^3$
      `,
      derivations: [
        {
          id: 'deriv-kepler-effective-potential',
          topicId: 'non-inertial-central-force',
          titleTh: 'การพิสูจน์ศักย์ยังผล $U_{\\text{eff}}(r)$ วงโคจรเสถียร และสมการ Vis-Viva (K&K Sec. 10.3–10.5)',
          objectiveTh: 'ลดรูปสมการพลังงาน 2 มิติของแรงสู่ศูนย์กลางเป็น 1 มิติ วิเคราะห์เสถียรภาพวงโคจร และพิสูจน์ $E = -\\frac{GMm}{2a}$',
          startingAssumptions: [
            {
              id: 'asm-cen-1',
              descriptionTh: 'แรงโน้มถ่วงอนุรักษ์ระหว่าง $M$ และ $m$ ($m \\ll M$ หรือใช้ $\\mu$) คือ $U(r) = -\\frac{C}{r}$ โดย $C = GMm$',
              significanceTh: 'พลังงานรวม $E$ และโมเมนตัมเชิงมุม $L = \\mu r^2 \\dot{\\theta}$ มีค่าคงที่ตลอดเวลา',
            },
            {
              id: 'asm-cen-2',
              descriptionTh: 'วงโคจรมีโมเมนตัมเชิงมุม $L \\neq 0$',
              significanceTh: 'กำแพงแรงหนีศูนย์กลาง (Centrifugal Barrier) $\\frac{L^2}{2\\mu r^2} > 0$ ป้องกันไม่ให้อนุภาคตกลงสู่จุด $r=0$',
            },
          ],
          steps: [
            {
              stepNumber: 1,
              titleTh: 'แทนค่า $\\dot{\\theta} = \\frac{L}{\\mu r^2}$ ลงในสมการพลังงานกลรวม $E$',
              latexMath: 'E = \\frac{1}{2}\\mu\\dot{r}^2 + \\frac{1}{2}\\mu r^2\\left(\\frac{L}{\\mu r^2}\\right)^2 + U(r) = \\frac{1}{2}\\mu\\dot{r}^2 + \\left[\\frac{L^2}{2\\mu r^2} - \\frac{C}{r}\\right]',
              physicalIntuitionTh: 'แม้พจน์ $\\frac{L^2}{2\\mu r^2}$ จะมีต้นกำเนิดมาจากพลังงานจลน์เชิงมุม แต่ในสมการของตัวแปร $r$ มันทำหน้าที่เหมือน "พลังงานศักย์ผลัก" ที่กันไม่ให้วัตถุชนใจกลาง',
              mathOperationTh: 'จัดรูปพลังงานจลน์เชิงมุมให้อยู่ในรูปฟังก์ชันของ $r$ เพียงอย่างเดียว',
            },
            {
              stepNumber: 2,
              titleTh: 'หารัศมีวงโคจรกลม $r_c$ และความถี่สั่นตามแนวรัศมีเมื่อรบกวนเล็กน้อย (K&K Ex. 10.3)',
              latexMath: '\\left.\\frac{d U_{\\text{eff}}}{dr}\\right|_{r_c} = -\\frac{L^2}{\\mu r_c^3} + \\frac{C}{r_c^2} = 0 \\implies r_c = \\frac{L^2}{\\mu C}',
              physicalIntuitionTh: 'ที่ก้นหลุมของ $U_{\\text{eff}}(r)$ จะเกิดวงโคจรวงกลมที่ $\\dot{r} = 0$ หากดิฟครั้งที่สองจะได้ $U_{\\text{eff}}\'\'(r_c) = \\frac{L^2}{\\mu r_c^4} = \\mu\\omega_\\theta^2 > 0$ ดังนั้น $\\omega_r = \\omega_\\theta$ จึงเป็นวงโคจรปิดซ้ำรอยเดิม (Bertrand Theorem)!',
              mathOperationTh: 'หาค่าต่ำสุดของ $U_{\\text{eff}}(r)$ และตรวจสอบอนุพันธ์อันดับ 2',
              isCrucialLeap: true,
            },
            {
              stepNumber: 3,
              titleTh: 'หาความสัมพันธ์ระหว่างพลังงาน $E$ กับระยะใกล้สุด $r_p$ และไกลสุด $r_a$ (Apsides)',
              latexMath: '\\dot{r} = 0 \\implies E = \\frac{L^2}{2\\mu r^2} - \\frac{C}{r} \\implies r^2 + \\frac{C}{E}r - \\frac{L^2}{2\\mu E} = 0',
              physicalIntuitionTh: 'จุดเลี้ยวกลับ $r_p$ และ $r_a$ คือรากของสมการกำลังสองนี้ สำหรับวงโคจรปิด ($E < 0$) ผลบวกของรากเท่ากับความยาวแกนเอก $r_p + r_a = 2a$',
              mathOperationTh: 'ใช้ทฤษฎีของเวียต (Vieta\'s Formulas) สำหรับผลบวกของรากสมการกำลังสอง',
            },
            {
              stepNumber: 4,
              titleTh: 'สรุปสมการพลังงานวงรี $E = -\\frac{C}{2a}$ และสมการ Vis-Viva',
              latexMath: '2a = r_p + r_a = -\\frac{C}{E} \\implies E = -\\frac{C}{2a} \\implies \\frac{1}{2}\\mu v^2 - \\frac{C}{r} = -\\frac{C}{2a}',
              physicalIntuitionTh: 'น่าอัศจรรย์มาก! พลังงานของวงโคจรวงรีขึ้นอยู่กับ **แกนกึ่งเอก $a$ เพียงตัวเดียว** ไม่ขึ้นกับความรี ($\\epsilon$) เลย สมการ Vis-Viva ช่วยคำนวณอัตราเร็วที่จุดใดๆ ของวงโคจรได้ทันที',
              mathOperationTh: 'แทน $E = -C/(2a)$ ลงใน $E = \\frac{1}{2}\\mu v^2 - C/r$ แล้วแก้หา $v^2$',
            },
          ],
          finalResultLatex: 'U_{\\text{eff}}(r) = \\frac{L^2}{2\\mu r^2} - \\frac{C}{r}, \\qquad E = -\\frac{GMm}{2a}, \\qquad v^2 = GM\\left(\\frac{2}{r} - \\frac{1}{a}\\right)',
          takeawayTh: 'ใช้กฎอนุรักษ์ $L$ ที่จุดใกล้สุด/ไกลสุด ($r_p v_p = r_a v_a$) คู่กับสมการ Vis-Viva เพื่อแก้โจทย์เปลี่ยนวงโคจร Hohmann Transfer ใน สอวน. ได้อย่างเฉียบขาด',
        },
      ],
      relatedProblemIds: ['prob-central-hohmann-1'],
    },
  ],
};
