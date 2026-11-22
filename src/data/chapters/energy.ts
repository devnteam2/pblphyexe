// src/data/chapters/energy.ts
import { Topic } from '@/types/curriculum';

export const ENERGY_TOPIC: Topic = {
  id: 'work-energy-potentials',
  titleTh: '5. งาน พลังงาน หลุมศักย์ และการชน (Work, Energy & Collisions)',
  subtitleTh: '3D Work Integrals, Stability, Reduced Mass & C-Frame Collisions (K&K Ch. 5–6)',
  iconName: 'Zap',
  colorAccent: '#F59E0B',
  descriptionTh:
    'ทฤษฎีบทงาน-พลังงาน 3 มิติ สนามอนุรักษ์และการทดสอบด้วย Curl การสั่นเล็กๆ รอบก้นหลุมศักย์ (รวมถึงมวลลดทอน) และการวิเคราะห์การชนในกรอบ C-frame (K&K บทที่ 5–6)',
  lessons: [
    {
      id: 'lesson-energy-0',
      slug: 'work-energy-conservative-fields',
      topicId: 'work-energy-potentials',
      order: 1,
      titleTh: '5.1 ทฤษฎีบทงาน-พลังงาน 3 มิติ สนามแรงอนุรักษ์ และแผนภาพพลังงาน',
      summaryTh:
        'การพิสูจน์ปริพันธ์ตามเส้น W = K_b - K_a งานของแรงข้อจำกัดที่เป็นศูนย์ เกรเดียนต์ F = -∇U และการทดสอบสนามอนุรักษ์ด้วย Stokes / Curl',
      readTimeMinutes: 17,
      theoryMarkdownTh: `
ในบทที่ 5 ของ *Kleppner & Kolenkow* ทฤษฎีบทงาน-พลังงานถูกพิสูจน์ในรูปทั่วไปสำหรับเวกเตอร์ 3 มิติ โดยอาศัยผลคูณสเกลาร์ของแรงและเวกเตอร์การกระจัดย่อย $d\\vec{r}$:

$$W_{ba} = \\int_{\\vec{r}_a}^{\\vec{r}_b} \\vec{F} \\cdot d\\vec{r} = \\frac{1}{2}m v_b^2 - \\frac{1}{2}m v_a^2 = K_b - K_a$$

### หลักสำคัญของการประยุกต์ใช้งาน-พลังงาน (K&K Ch. 5):
1. **แรงข้อจำกัดอุดมคติไม่ทำงาน:** แรงตั้งฉากจากรางโค้งที่อยู่นิ่ง ($\\vec{N} \\perp d\\vec{r}$) หรืองานรวมของแรงตึงเชือกไม่ยืดหยุ่นมีผลรวมเป็นศูนย์ แต่ถ้าลิ่มหรือรางกำลัง **เคลื่อนที่** แรงตั้งฉาก $\\vec{N}$ สามารถทำงานได้!
2. **สนามแรงอนุรักษ์ (Conservative Field):** งานไม่ขึ้นกับเส้นทาง $\\iff$ มีฟังก์ชันศักย์ $U(\\vec{r})$ ที่:
$$\\vec{F} = -\\vec{\\nabla} U = -\\left(\\frac{\\partial U}{\\partial x}\\hat{i} + \\frac{\\partial U}{\\partial y}\\hat{j} + \\frac{\\partial U}{\\partial z}\\hat{k}\\right)$$
3. **วิธีตรวจสอบว่าเป็นแรงอนุรักษ์หรือไม่ใน 3 มิติ:**
$$\\vec{\\nabla} \\times \\vec{F} = \\vec{0} \\iff \\frac{\\partial F_y}{\\partial x} = \\frac{\\partial F_x}{\\partial y}, \\; \\frac{\\partial F_z}{\\partial y} = \\frac{\\partial F_y}{\\partial z}, \\; \\frac{\\partial F_x}{\\partial z} = \\frac{\\partial F_z}{\\partial x}$$
4. **จุดเลี้ยวกลับ (Turning Points):** บนกราฟพลังงาน $E = K + U(x)$ บริเวณที่อนุญาตให้เคลื่อนที่คือ $U(x) \\le E$ จุดที่ $U(x) = E$ คือจุดที่ $v = 0$
      `,
      derivations: [
        {
          id: 'deriv-work-energy-3d',
          topicId: 'work-energy-potentials',
          titleTh: 'การพิสูจน์ทฤษฎีบทงาน-พลังงานใน 3 มิติ และเงื่อนไข $\\vec{\\nabla} \\times \\vec{F} = 0$',
          objectiveTh: 'เปลี่ยนปริพันธ์ตามเส้นของ $\\vec{F} \\cdot d\\vec{r}$ ให้กลายเป็นผลต่างพลังงานจลน์ และพิสูจน์เกณฑ์อนุรักษ์แบบ K&K',
          startingAssumptions: [
            {
              id: 'asm-we3d-1',
              descriptionTh: 'อนุภาคมวลคงที่ $m$ เคลื่อนที่บนเส้นโค้ง 3 มิติ $\\vec{r}(t)$ จากจุด $a$ ถึง $b$',
              significanceTh: 'สามารถเขียน $d\\vec{r} = \\vec{v}\\,dt$ ได้เสมอตามนิยามความเร็ว',
            },
            {
              id: 'asm-we3d-2',
              descriptionTh: 'แรงลัพธ์ $\\vec{F}$ ต่อเนื่องตามเส้นทางการเคลื่อนที่',
              significanceTh: 'สามารถสลับลำดับอนุพันธ์สเกลาร์ของ $\\vec{v}\\cdot\\vec{v}$ ได้อย่างสมบูรณ์',
            },
          ],
          steps: [
            {
              stepNumber: 1,
              titleTh: 'ตั้งปริพันธ์ตามเส้นของงานและแทนกฎข้อที่ 2 ของนิวตัน',
              latexMath: 'W_{ba} = \\int_{a}^{b} \\vec{F}\\cdot d\\vec{r} = \\int_{t_a}^{t_b} m\\frac{d\\vec{v}}{dt} \\cdot \\vec{v}\\,dt',
              physicalIntuitionTh: 'เราแปลงปริพันธ์ตามตำแหน่ง $d\\vec{r}$ ให้เป็นปริพันธ์เทียบเวลาโดยใช้ $d\\vec{r} = \\vec{v}\\,dt$',
              mathOperationTh: 'แทน $\\vec{F} = m\\frac{d\\vec{v}}{dt}$ และ $d\\vec{r} = \\vec{v}\\,dt$',
            },
            {
              stepNumber: 2,
              titleTh: 'ใช้เอกลักษณ์อนุพันธ์ของผลคูณสเกลาร์ $\\frac{d}{dt}(\\vec{v}\\cdot\\vec{v})$',
              latexMath: '\\frac{d}{dt}(\\vec{v}\\cdot\\vec{v}) = 2\\vec{v}\\cdot\\frac{d\\vec{v}}{dt} \\implies \\vec{v}\\cdot\\frac{d\\vec{v}}{dt} = \\frac{1}{2}\\frac{d(v^2)}{dt}',
              physicalIntuitionTh: 'แรงองค์ประกอบที่ตั้งฉากกับ $\\vec{v}$ ให้ผลคูณสเกลาร์เป็นศูนย์ ดังนั้นงานจึงเปลี่ยนเฉพาะ **อัตราเร็ว** $v = |\\vec{v}|$ ไม่ใช่ทิศทาง',
              mathOperationTh: 'ประยุกต์กฎผลคูณกับ Dot Product ของเวกเตอร์ตัวเอง',
              isCrucialLeap: true,
            },
            {
              stepNumber: 3,
              titleTh: 'อินทิเกรตเทียบเวลาเพื่อรับผลต่างพลังงานจลน์',
              latexMath: 'W_{ba} = \\int_{t_a}^{t_b} \\frac{d}{dt}\\left(\\frac{1}{2}mv^2\\right)dt = \\frac{1}{2}mv_b^2 - \\frac{1}{2}mv_a^2 = K_b - K_a',
              physicalIntuitionTh: 'ทฤษฎีบทงาน-พลังงานเป็นจริงสำหรับแรง **ทุกชนิด** ไม่ว่าจะเป็นแรงอนุรักษ์หรือไม่ก็ตาม!',
              mathOperationTh: 'ทฤษฎีบทหลักมูลของแคลคูลัสสำหรับอนุพันธ์สมบูรณ์',
            },
            {
              stepNumber: 4,
              titleTh: 'ทดสอบความเป็นสนามอนุรักษ์เมื่อ $\\vec{F} = -\\vec{\\nabla} U$',
              latexMath: '\\left(\\vec{\\nabla}\\times (-\\vec{\\nabla}U)\\right)_z = -\\frac{\\partial^2 U}{\\partial x\\partial y} + \\frac{\\partial^2 U}{\\partial y\\partial x} = 0',
              physicalIntuitionTh: 'ความสมมาตรของการหาอนุพันธ์ย่อยสลับลำดับบังคับให้งานในเส้นทางปิด $\\oint \\vec{F}\\cdot d\\vec{r} = 0$ หากแรงผ่านเกณฑ์นี้จึงจะนิยาม $U(\\vec{r})$ ได้',
              mathOperationTh: 'ใช้ Clairaut Theorem ว่า $\\partial_{xy} U = \\partial_{yx} U$',
            },
          ],
          finalResultLatex: 'W_{ba} = \\int_a^b \\vec{F}\\cdot d\\vec{r} = K_b - K_a, \\qquad \\vec{F} = -\\vec{\\nabla}U \\iff \\vec{\\nabla}\\times\\vec{F} = \\vec{0}',
          takeawayTh: 'ก่อนตั้งกฎอนุรักษ์พลังงานในโจทย์ 2D/3D ที่ให้สมการแรง $\\vec{F}(x,y)$ มา ให้ตรวจสอบ $\\frac{\\partial F_y}{\\partial x} = \\frac{\\partial F_x}{\\partial y}$ ทุกครั้ง!',
        },
      ],
      relatedProblemIds: ['prob-energy-sphere-1'],
    },
    {
      id: 'lesson-energy-1',
      slug: 'conservative-forces-potential-wells',
      topicId: 'work-energy-potentials',
      order: 2,
      titleTh: '5.2 การสั่นเล็กๆ รอบหลุมศักย์ มวลลดทอน และศักย์เลนนาร์ด-โจนส์',
      summaryTh:
        'อนุกรมเทย์เลอร์รอบจุดสมดุลเสถียร เทคนิค Quadratic Energy Form (K&K Sec. 6.2.1) มวลลดทอนของระบบสองอนุภาค และการสั่นของโมเลกุล',
      readTimeMinutes: 19,
      theoryMarkdownTh: `
ในระดับ สอวน. เมื่อวัตถุอยู่ใกล้ตำแหน่งสมดุลเสถียร $x_0$ เราสามารถวิเคราะห์การสั่นได้ด้วยสองวิธีสำคัญใน *Kleppner & Kolenkow* (บทที่ 6):

### 1. การวิเคราะห์จุดสมดุล (Equilibrium Analysis):
$$F(x) = -\\frac{dU}{dx}$$
- **จุดสมดุล ($F = 0$):** $\\left.\\frac{dU}{dx}\\right|_{x_0} = 0$
- **สมดุลเสถียร (Stable):** $\\left.\\frac{d^2U}{dx^2}\\right|_{x_0} = k_{\\text{eff}} > 0$
- **สมดุลไม่เสถียร (Unstable):** $\\left.\\frac{d^2U}{dx^2}\\right|_{x_0} < 0$

### 2. ทางลัด Quadratic Energy Form (K&K Sec. 6.2.1):
หากเราเขียนพลังงานรวมของการสั่นเล็กๆ รอบสมดุล $q = x - x_0$ ให้อยู่ในรูปกำลังสอง:
$$E = K + U \\approx \\frac{1}{2}B\\dot{q}^2 + \\frac{1}{2}A q^2$$
จะได้ความถี่เชิงมุมทันทีโดยไม่ต้องดิฟสมการใหม่:
$$\\omega = \\sqrt{\\frac{A}{B}}$$

### 3. มวลลดทอน (Reduced Mass) สำหรับระบบสองก้อนอิสระ:
สำหรับสองอนุภาค $m_1, m_2$ ที่มีศักย์อันตรกิริยา $U(|\\vec{r}_1 - \\vec{r}_2|)$ ในกรอบจุดศูนย์กลางมวล พลังงานจลน์สัมพัทธ์คือ $\\frac{1}{2}\\mu v_{\\text{rel}}^2$ โดยที่:
$$\\mu = \\frac{m_1 m_2}{m_1 + m_2}$$
      `,
      derivations: [
        {
          id: 'deriv-potential-well-shm',
          topicId: 'work-energy-potentials',
          titleTh: 'การพิสูจน์ว่าจุดสมดุลเสถียรใดๆ จะประพฤติตัวเป็น SHM เมื่อถูกรบกวนเล็กน้อย',
          objectiveTh: 'แสดงให้เห็นว่าทำไมระบบฟิสิกส์เกือบทุกชนิดในจักรวาลจึงสั่นแบบฮาร์มอนิกอย่างง่ายรอบจุดก้นหลุมศักย์',
          startingAssumptions: [
            {
              id: 'asm-pot-1',
              descriptionTh: 'ฟังก์ชันพลังงานศักย์ $U(x)$ หาอนุพันธ์ได้อย่างน้อย 2 ครั้งรอบจุดสมดุล $x_0$',
              significanceTh: 'สามารถกระจาย Taylor Series ได้สมบูรณ์',
            },
            {
              id: 'asm-pot-2',
              descriptionTh: 'จุด $x_0$ เป็นจุดสมดุลเสถียร ($U\'(x_0) = 0$ และ $U\'\'(x_0) = k_{eff} > 0$)',
              significanceTh: 'แรงสุทธิเป็นศูนย์และกราฟศักย์โค้งหงาย',
            },
          ],
          steps: [
            {
              stepNumber: 1,
              titleTh: 'กระจายอนุกรมเทย์เลอร์ของ $U(x)$ รอบจุดสมดุล $x_0$',
              latexMath: 'U(x) = U(x_0) + U\'(x_0)(x - x_0) + \\frac{1}{2}U\'\'(x_0)(x - x_0)^2 + \\mathcal{O}((x - x_0)^3)',
              physicalIntuitionTh: 'เรามองพลังงานศักย์ในช่วงแคบๆ รอบจุดต่ำสุดของหลุมศักย์',
              mathOperationTh: 'สูตรกระจายเทย์เลอร์รอบจุด $x_0$',
            },
            {
              stepNumber: 2,
              titleTh: 'ประยุกต์เงื่อนไขสมดุลเสถียร',
              latexMath: 'U\'(x_0) = 0 \\implies U(x) \\approx U(x_0) + \\frac{1}{2}k_{eff}(x - x_0)^2',
              physicalIntuitionTh: 'กำหนดให้ $k_{eff} = \\left. \\frac{d^2U}{dx^2} \\right|_{x_0}$ พลังงานศักย์มีรูปทรงพาราโบลาเหมือนสปริงอุดมคติ!',
              mathOperationTh: 'เทอมเชิงเส้นหายไปเพราะ $F(x_0) = 0$',
              isCrucialLeap: true,
            },
            {
              stepNumber: 3,
              titleTh: 'หาฟังก์ชันแรงดึงกลับจาก $F(x) = -\\frac{dU}{dx}$',
              latexMath: 'F(x) = -\\frac{d}{dx}\\left[ \\frac{1}{2}k_{eff}(x - x_0)^2 \\right] = -k_{eff}(x - x_0)',
              physicalIntuitionTh: 'แรงที่กระทำต่ออนุภาคเป็นสัดส่วนตรงข้ามกับการกระจัด $x - x_0$ ซึ่งตรงกับกฎของฮุก (Hooke\'s Law)',
              mathOperationTh: 'ดิฟเทอมควอดราติกเทียบกับ $x$',
            },
            {
              stepNumber: 4,
              titleTh: 'คำนวณความถี่เชิงมุมของการสั่นรอบจุดสมดุล',
              latexMath: 'm\\frac{d^2(x - x_0)}{dt^2} + k_{eff}(x - x_0) = 0 \\implies \\omega = \\sqrt{\\frac{k_{eff}}{m}} = \\sqrt{\\frac{U\'\'(x_0)}{m}}',
              physicalIntuitionTh: 'ความถี่ของการสั่นขึ้นอยู่กับความชันอนุพันธ์อันดับ 2 ของหลุมศักย์ ยิ่งหลุมชันมาก $\\omega$ ยิ่งสูง',
              mathOperationTh: 'เทียบกับสมการมาตรฐาน $\\ddot{\\eta} + \\omega^2 \\eta = 0$',
            },
          ],
          finalResultLatex: '\\omega = \\sqrt{\\frac{1}{m}\\left. \\frac{d^2U}{dx^2} \\right|_{x_0}}',
          takeawayTh: 'โจทย์ สอวน. ที่ให้หาความถี่การสั่นรอบจุดสมดุล สามารถหาได้ทันทีเพียงดิฟ $U(x)$ สองครั้งแล้วแทนค่า $x_0$',
        },
        {
          id: 'deriv-lennard-jones',
          topicId: 'work-energy-potentials',
          titleTh: 'ตัวอย่าง K&K 6.2: ความถี่สั่นของโมเลกุลคู่ในศักย์ Lennard-Jones 6–12',
          objectiveTh: 'คำนวณจุดสมดุลและความถี่การสั่นเชิงมุม $\\omega$ ของโมเลกุลอะตอมคู่ภายใต้ศักย์ $U(r) = U_0[(r_0/r)^{12} - 2(r_0/r)^6]$ โดยใช้มวลลดทอน $\\mu$',
          startingAssumptions: [
            {
              id: 'asm-lj-1',
              descriptionTh: 'อะตอมมวล $m_1$ และ $m_2$ อันตรกิริยากันตามแนวแกนเชื่อมโดยใช้พิกัดสัมพัทธ์ $r$',
              significanceTh: 'เคลื่อนที่เสมือนอนุภาคเดี่ยวมวลลดทอน $\\mu = \\frac{m_1 m_2}{m_1 + m_2}$ ในหลุมศักย์ $U(r)$',
            },
            {
              id: 'asm-lj-2',
              descriptionTh: 'พิจารณาการสั่นแอมพลิจูดเล็กมากรอบจุดต่ำสุดของศักย์ ($|r - r_0| \\ll r_0$)',
              significanceTh: 'สามารถใช้การกระจาย Taylor อันดับ 2 หรืออนุพันธ์อันดับ 2 ได้แม่นยำ',
            },
          ],
          steps: [
            {
              stepNumber: 1,
              titleTh: 'หาอนุพันธ์อันดับที่หนึ่งของ $U(r)$ เพื่อยืนยันจุดสมดุล $r = r_0$',
              latexMath: '\\frac{dU}{dr} = U_0\\left[ -\\frac{12}{r_0}\\left(\\frac{r_0}{r}\\right)^{13} + \\frac{12}{r_0}\\left(\\frac{r_0}{r}\\right)^{7} \\right] = 0 \\implies r = r_0',
              physicalIntuitionTh: 'ที่ $r = r_0$ แรงผลักระยะใกล้ (เทอม $r^{-12}$) และแรงดึงดูดแวนเดอร์วาลส์ (เทอม $r^{-6}$) สมดุลกันพอดี โดยมีพลังงานลึกสุด $-U_0$',
              mathOperationTh: 'ใช้กฎลูกโซ่ดิฟ $(r_0/r)^n = r_0^n r^{-n}$',
            },
            {
              stepNumber: 2,
              titleTh: 'หาอนุพันธ์อันดับที่สอง $U\'\'(r)$ และแทนค่า $r = r_0$',
              latexMath: '\\frac{d^2 U}{dr^2} = \\frac{U_0}{r_0^2}\\left[ 156\\left(\\frac{r_0}{r}\\right)^{14} - 84\\left(\\frac{r_0}{r}\\right)^{8} \\right] \\implies k_{\\text{eff}} = \\frac{(156 - 84)U_0}{r_0^2} = \\frac{72 U_0}{r_0^2}',
              physicalIntuitionTh: 'เลขชี้กำลังสูง ($12$ และ $6$) ทำให้ก้นหลุมศักย์ของโมเลกุลแคบและชันมาก ($72U_0/r_0^2$) เทียบกับการสั่นในระดับอินฟราเรด',
              mathOperationTh: 'ดิฟซ้ำอีกครั้งและแทน $r_0/r = 1$',
              isCrucialLeap: true,
            },
            {
              stepNumber: 3,
              titleTh: 'คำนวณความถี่เชิงมุมของการสั่นด้วยมวลลดทอน $\\mu$',
              latexMath: '\\omega = \\sqrt{\\frac{k_{\\text{eff}}}{\\mu}} = \\sqrt{\\frac{72 U_0}{\\mu r_0^2}} = \\frac{6}{r_0}\\sqrt{\\frac{2U_0}{\\mu}}',
              physicalIntuitionTh: 'ทั้งสองอะตอมสั่นพร้อมกันรอบ CM การแทน $m$ ด้วย $\\mu$ ทำให้ได้ความถี่จริงสำหรับ 2 วัตถุที่ไร้แรงภายนอก',
              mathOperationTh: 'แทน $k_{\\text{eff}}$ ในสูตร $\\omega = \\sqrt{k_{\\text{eff}}/\\mu}$',
            },
          ],
          finalResultLatex: 'k_{\\text{eff}} = \\frac{72 U_0}{r_0^2}, \\qquad \\omega = \\frac{6}{r_0}\\sqrt{\\frac{2U_0}{\\mu}}',
          takeawayTh: 'อย่าลืมใช้มวลลดทอน $\\mu = \\frac{m_1 m_2}{m_1+m_2}$ เมื่อทั้งสองวัตถุในหลุมศักย์เคลื่อนที่อย่างอิสระต่อกัน',
        },
      ],
      relatedProblemIds: ['prob-energy-potential-1', 'prob-energy-sphere-1'],
    },
    {
      id: 'lesson-energy-2',
      slug: 'collisions-cframe-lframe',
      topicId: 'work-energy-potentials',
      order: 3,
      titleTh: '5.3 การชน 2 มิติในกรอบศูนย์กลางมวล (C-Frame vs. L-Frame Scattering)',
      summaryTh:
        'การแปลงความเร็วระหว่างกรอบห้องทดลองและกรอบศูนย์กลางมวล เงื่อนไขการสะท้อนแบบง่ายใน C-frame และมุมกระเจิงสูงสุด sin(theta_max) = m_2 / m_1',
      readTimeMinutes: 18,
      theoryMarkdownTh: `
การคำนวณการชนแบบยืดหยุ่นใน 2 มิติใน **กรอบห้องปฏิบัติการ (Lab / L-Frame)** มักเต็มไปด้วยสมการตรีโกณมิติที่ยุ่งเหยิง แต่ *Kleppner & Kolenkow* (บทที่ 6.5) แสดงให้เห็นว่าการย้ายเข้าสู่ **กรอบศูนย์กลางมวล (C-Frame)** ทำให้ปัญหาง่ายลงอย่างมหัศจรรย์:

### คุณสมบัติทองคำของ C-Frame ในการชนยืดหยุ่น:
1. **โมเมนตัมรวมใน C-Frame เป็นศูนย์เสมอ:** $\\vec{p}_1\\,' + \\vec{p}_2\\,' = \\vec{0}$ (ทั้งก่อนและหลังชนวิ่งสวนทางกัน $180^\\circ$ เสมอ!)
2. **อัตราเร็วไม่เปลี่ยนหลังชนยืดหยุ่น:** $v'_{1,f} = v'_{1,i}$ และ $v'_{2,f} = v'_{2,i}$ สิ่งเดียวที่เปลี่ยนคือ **มุมกระเจิง $\\Theta$** ซึ่งหมุนทั้งแกนโมเมนตัมไปพร้อมกัน!

จากนั้นจึงบวกเวกเตอร์ความเร็วของจุดศูนย์กลางมวล $\\vec{V}_{\\text{cm}}$ กลับคืนเพื่อกลับมาสู่ L-Frame:
$$\\vec{v}_{1,f} = \\vec{v}'_{1,f} + \\vec{V}_{\\text{cm}}$$
      `,
      derivations: [
        {
          id: 'deriv-cframe-scattering',
          topicId: 'work-energy-potentials',
          titleTh: 'ตัวอย่าง K&K 6.9: สูตรมุมกระเจิง $\\tan\\theta_1$ และมุมเบี่ยงเบนสูงสุดเมื่อ $m_1 > m_2$',
          objectiveTh: 'เชื่อมโยงมุมกระเจิง $\\theta_1$ ใน L-Frame กับ $\\Theta$ ใน C-Frame และพิสูจน์ว่ามวลหนักชนมวลเบาที่หยุดนิ่งจะเบี่ยงเบนได้ไม่เกิน $\\arcsin(m_2/m_1)$',
          startingAssumptions: [
            {
              id: 'asm-col-1',
              descriptionTh: 'อนุภาค $m_1$ วิ่งด้วยความเร็ว $\\vec{v}_0$ เข้าชนเป้าหมายมวล $m_2$ ที่หยุดนิ่งใน L-Frame แบบยืดหยุ่น',
              significanceTh: 'ความเร็ว CM คือ $\\vec{V} = \\frac{m_1}{m_1 + m_2}\\vec{v}_0$ ในทิศเริ่มต้นของ $m_1$',
            },
            {
              id: 'asm-col-2',
              descriptionTh: 'ใน C-Frame หลังชน อนุภาค $m_1$ กระเจิงเบี่ยงจากทิศเดิมเป็นมุม $\\Theta$',
              significanceTh: 'ขนาดความเร็วของ $m_1$ ใน C-Frame คงเดิมเท่ากับ $v\'_1 = |\\vec{v}_0 - \\vec{V}| = \\frac{m_2}{m_1 + m_2}v_0$',
            },
          ],
          steps: [
            {
              stepNumber: 1,
              titleTh: 'คำนวณอัตราส่วนของอัตราเร็ว $v\'_1$ ต่อ $V$ ในกรอบ C-Frame',
              latexMath: 'V = \\frac{m_1}{m_1 + m_2}v_0, \\qquad v\'_1 = v_0 - V = \\frac{m_2}{m_1 + m_2}v_0 \\implies \\frac{V}{v\'_1} = \\frac{m_1}{m_2}',
              physicalIntuitionTh: 'ความเร็วของ CM และการดีดตัวใน C-Frame ขึ้นอยู่กับอัตราส่วนมวล $m_1/m_2$ เพียงอย่างเดียว!',
              mathOperationTh: 'คำนวณขนาดเวกเตอร์ก่อนชนบนแนวแกน $x$',
            },
            {
              stepNumber: 2,
              titleTh: 'แปลงเวกเตอร์หลังชนของ $m_1$ กลับสู่ L-Frame: $\\vec{v}_{1,f} = \\vec{v}\'_1 + \\vec{V}$',
              latexMath: 'v_{1x} = v\'_1\\cos\\Theta + V, \\qquad v_{1y} = v\'_1\\sin\\Theta',
              physicalIntuitionTh: 'เขียนรูปสามเหลี่ยมเวกเตอร์: ฐานยาว $V$ ต่อด้วยด้านยาว $v\'_1$ ที่ทำมุม $\\Theta$',
              mathOperationTh: 'แตกองค์ประกอบหลังชนในแกนตั้งฉากและแกนขนาน $\\vec{v}_0$',
            },
            {
              stepNumber: 3,
              titleTh: 'หามุมกระเจิง $\\theta_1$ ในกรอบ L-Frame',
              latexMath: '\\tan\\theta_1 = \\frac{v_{1y}}{v_{1x}} = \\frac{v\'_1\\sin\\Theta}{v\'_1\\cos\\Theta + V} = \\frac{\\sin\\Theta}{(m_1/m_2) + \\cos\\Theta}',
              physicalIntuitionTh: 'กรณีพิเศษที่คุ้นเคย: เมื่อ $m_1 = m_2$, $\\tan\\theta_1 = \\frac{\\sin\\Theta}{1+\\cos\\Theta} = \\tan(\\Theta/2)$ และหลังชนจะตั้งฉากกันเสมอ ($90^\\circ$)',
              mathOperationTh: 'หารทั้งเศษและส่วนด้วย $v\'_1$ และแทน $V/v\'_1 = m_1/m_2$',
              isCrucialLeap: true,
            },
            {
              stepNumber: 4,
              titleTh: 'หามุมกระเจิงสูงสุด $\\theta_{1,\\max}$ เมื่ออนุภาควิ่งชนหนักกว่าเป้าหมาย ($m_1 > m_2$)',
              latexMath: '\\sin\\theta_{1,\\max} = \\frac{v\'_1}{V} = \\frac{m_2}{m_1}',
              physicalIntuitionTh: 'เมื่อ $V > v\'_1$ ปลายของเวกเตอร์ $\\vec{v}_{1,f}$ กวาดเป็นวงกลมที่ไม่ครอบคลุมจุดกำเนิด เส้นสัมผัสจากจุดกำเนิดไปยังวงกลมรัศมี $v\'_1$ ตั้งฉากกับรัศมี ให้ค่าสูงสุด $\\sin\\theta_{1,\\max} = v\'_1/V$',
              mathOperationTh: 'เรขาคณิตวงกลมสัมผัส หรือหาค่าสุดขีดของ $\\frac{d(\\tan\\theta_1)}{d\\Theta} = 0$',
            },
          ],
          finalResultLatex: '\\tan\\theta_1 = \\frac{\\sin\\Theta}{\\frac{m_1}{m_2} + \\cos\\Theta}, \\qquad \\sin\\theta_{1,\\max} = \\frac{m_2}{m_1} \\; (m_1 > m_2)',
          takeawayTh: 'เช่น ลูกโบว์ลิ่งหรือนิวเคลียสแอลฟาชนโปรตอนหรืออิเล็กตรอนที่เบากว่ามาก จะไม่มีทางกระดอนกลับหลัง ($\\theta_1 > \\pi/2$) ได้เลยในการชนครั้งเดียว',
        },
      ],
      relatedProblemIds: ['prob-energy-potential-1'],
    },
  ],
};
