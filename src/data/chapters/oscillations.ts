// src/data/chapters/oscillations.ts
import { Topic } from '@/types/curriculum';

export const OSCILLATIONS_TOPIC: Topic = {
  id: 'shm-differential-eq',
  titleTh: '8. การสั่นฮาร์มอนิก โหมดปกติ การหน่วง และเรโซแนนซ์ (Oscillations, Modes & Resonance)',
  subtitleTh: 'SHM ODEs, Coupled Normal Modes, Damped & Driven Resonance (K&K Sec. 6.4 & Ch. 11)',
  iconName: 'Repeat',
  colorAccent: '#06B6D4',
  descriptionTh:
    'สมการอนุพันธ์ SHM และเทคนิค dE/dt = 0 โหมดการสั่นปกติและการถ่ายเทพลังงานของระบบคู่ควบ การสั่นแบบหน่วงและค่า Q-factor จนถึงการสั่นพ้องแบบซ้อนเชิงซ้อน (K&K บทที่ 6.4 และ 11)',
  lessons: [
    {
      id: 'lesson-shm-1',
      slug: 'shm-odes-and-energy-method',
      topicId: 'shm-differential-eq',
      order: 1,
      titleTh: '8.1 สมการอนุพันธ์อันดับสองของ SHM และวิธีพลังงาน (dE/dt = 0)',
      summaryTh:
        'ผลเฉลยทั่วไป x(t) = A cos(omega t + phi) การหาความถี่ด้วยการดิฟพลังงานรวมเทียบเวลา และการลดรูประบบกลิ้ง/ผสม',
      readTimeMinutes: 17,
      theoryMarkdownTh: `
หัวใจของ สอวน. ฟิสิกส์ ทุกปีคือ **Simple Harmonic Motion (SHM)** ไม่ว่าจะอยู่ในรูปวงจรไฟฟ้า $LC$, ของเหลวในหลอดแก้วรูปตัวยู, หรือการกลิ้งของทรงกลมในรางโค้ง

### นิยามเชิงคณิตศาสตร์ของ SHM:
ทุกระบบที่สมการการเคลื่อนที่อยู่ในรูป:
$$\\frac{d^2x}{dt^2} + \\omega^2 x = 0$$
จะมีคำตอบเป็นฟังก์ชันคาบ $x(t) = A\\cos(\\omega t + \\phi)$ โดยมีคาบการสั่น $T = \\frac{2\\pi}{\\omega}$

### วิธีพลังงานรวม (The Energy Method):
ในระบบอนุรักษ์ พลังงานกลรวม $E = T + U = \\text{constant}$
ดังนั้น อนุพันธ์เทียบกับเวลาต้องเป็นศูนย์:
$$\\frac{dE}{dt} = 0$$
เทคนิคนี้ทรงพลังอย่างยิ่งในระบบที่มีทั้งการเลื่อนตำแหน่งและการหมุน เพราะช่วยตัดแรงปฏิกิริยาภายในและแรงเสียดทานสถิตที่ไม่ทำงานออกไปทั้งหมด!
      `,
      derivations: [
        {
          id: 'deriv-shm-energy-method',
          topicId: 'shm-differential-eq',
          titleTh: 'การพิสูจน์สมการ SHM ของลูกตุ้มนาฬิกาอย่างง่ายด้วยวิธีพลังงาน $\\frac{dE}{dt} = 0$',
          objectiveTh: 'แสดงให้เห็นว่าการดิฟสมการพลังงานเทียบกับเวลาช่วยตัดค่าคงที่และดึงสมการเชิงอนุพันธ์ออกมาได้ทันที',
          startingAssumptions: [
            {
              id: 'asm-shm-1',
              descriptionTh: 'เชือกเบายาว $L$ มวลลูกตุ้ม $m$ แกว่งในระนาบเดียว',
              significanceTh: 'คิดโมเมนต์ความเฉื่อยรอบจุดตรึงเป็น $I = mL^2$',
            },
            {
              id: 'asm-shm-2',
              descriptionTh: 'ไม่มีแรงเสียดทานและแรงต้านอากาศ (ระบบอนุรักษ์พลังงานกล)',
              significanceTh: 'ทำให้พลังงานกลรวม $E = E_k + E_p$ คงที่ตลอดเวลา',
            },
            {
              id: 'asm-shm-3',
              descriptionTh: 'มุมแกว่ง $\\theta$ มีค่าน้อยมาก ($|\\theta| \\ll 1$ rad)',
              significanceTh: 'ใช้การประมาณ $\\cos\\theta \\approx 1 - \\frac{\\theta^2}{2}$ ได้',
            },
          ],
          steps: [
            {
              stepNumber: 1,
              titleTh: 'เขียนพลังงานกลรวม $E = E_k + E_p$ ของลูกตุ้มที่มุม $\\theta$ ใดๆ',
              latexMath: 'E = \\frac{1}{2}m v^2 + mg h = \\frac{1}{2}m (L\\dot{\\theta})^2 + mg L(1 - \\cos\\theta)',
              physicalIntuitionTh: 'ความเร็วเชิงเส้นคือ $v = L\\omega = L\\dot{\\theta}$ และความสูงเทียบกับจุดต่ำสุดคือ $h = L(1 - \\cos\\theta)$',
              mathOperationTh: 'เขียนพลังงานจลน์และการจัดรูปเรขาคณิต',
            },
            {
              stepNumber: 2,
              titleTh: 'แทนการประมาณค่ามุมเล็ก $\\cos\\theta \\approx 1 - \\frac{\\theta^2}{2}$',
              latexMath: 'E \\approx \\frac{1}{2}mL^2\\dot{\\theta}^2 + mgL\\left( 1 - \\left(1 - \\frac{\\theta^2}{2}\\right) \\right) = \\frac{1}{2}mL^2\\dot{\\theta}^2 + \\frac{1}{2}mgL\\theta^2',
              physicalIntuitionTh: 'ทั้งพลังงานจลน์และพลังงานศักย์กลายเป็นฟังก์ชันกำลังสองของ $\\dot{\\theta}$ และ $\\theta$',
              mathOperationTh: 'ตัดเทอม $1$ ทิ้ง',
              isCrucialLeap: true,
            },
            {
              stepNumber: 3,
              titleTh: 'หาอนุพันธ์เทียบกับเวลา $t$ โดยใช้กฎลูกโซ่ (Chain Rule)',
              latexMath: '\\frac{dE}{dt} = \\frac{1}{2}mL^2 (2\\dot{\\theta}\\ddot{\\theta}) + \\frac{1}{2}mgL (2\\theta\\dot{\\theta}) = 0',
              physicalIntuitionTh: 'เพราะพลังงานรวมอนุรักษ์ $\\frac{dE}{dt} = 0$',
              mathOperationTh: 'ใช้ $\\frac{d}{dt}(\\dot{\\theta}^2) = 2\\dot{\\theta}\\ddot{\\theta}$',
            },
            {
              stepNumber: 4,
              titleTh: 'หารตลอดด้วย $mL^2\\dot{\\theta}$ (สำหรับกรณีที่ลูกตุ้มกำลังเคลื่อนที่ $\\dot{\\theta} \\neq 0$)',
              latexMath: '\\ddot{\\theta} + \\frac{g}{L}\\theta = 0',
              physicalIntuitionTh: 'เราได้สมการเชิงอนุพันธ์อันดับสองของ SHM โดยไม่ต้องเขียนแรงตึงเชือก $T$ หรือแตกแรงเลยแม้แต่น้อย!',
              mathOperationTh: 'ตัดตัวแปรความเร็วเชิงมุม $\\dot{\\theta}$ ออกจากทั้งสองข้าง',
            },
            {
              stepNumber: 5,
              titleTh: 'เทียบกับรูปมาตรฐาน $\\ddot{\\theta} + \\omega^2 \\theta = 0$',
              latexMath: '\\omega^2 = \\frac{g}{L} \\implies \\omega = \\sqrt{\\frac{g}{L}}, \\quad T = 2\\pi\\sqrt{\\frac{L}{g}}',
              physicalIntuitionTh: 'คาบการแกว่งไม่ขึ้นกับมวล $m$ และไม่ขึ้นกับแอมพลิจูด (เมื่อมุมเล็ก)',
              mathOperationTh: 'แทนค่า $T = 2\\pi / \\omega$',
            },
          ],
          finalResultLatex: '\\frac{d^2\\theta}{dt^2} + \\frac{g}{L}\\theta = 0 \\implies T = 2\\pi\\sqrt{\\frac{L}{g}}',
          takeawayTh: 'วิธี $\\frac{dE}{dt} = 0$ เป็นอาวุธลับที่เร็วที่สุดในการหาคาบการสั่นของโจทย์ สอวน. ฟิสิกส์ ที่มีวัตถุหลายชิ้นหรือมีการกลิ้ง',
        },
      ],
      relatedProblemIds: ['prob-shm-spring-cylinder-1'],
    },
    {
      id: 'lesson-shm-2',
      slug: 'coupled-oscillators-normal-modes',
      topicId: 'shm-differential-eq',
      order: 2,
      titleTh: '8.2 ตัวสั่นคู่ควบ (Coupled Oscillators) และโหมดการสั่นปกติ (Normal Modes)',
      summaryTh:
        'การแยกสมการคู่ควบด้วยพิกัดปกติ (Normal Coordinates) โหมดสมมาตรและต้านสมมาตร และการถ่ายเทพลังงานแบบบีตส์ (Beats) ใน K&K Sec. 6.4',
      readTimeMinutes: 20,
      theoryMarkdownTh: `
เมื่อมีวัตถุ 2 ชิ้นขึ้นไปเชื่อมโยงถึงกันด้วยสปริง สมการการเคลื่อนที่ของตัวหนึ่งจะมีตำแหน่งของอีกตัวมาพัวพัน (Coupled ODEs) แต่ *Kleppner & Kolenkow* (บทที่ 6.4) แสดงให้เห็นว่าเราสามารถแปลงพิกัด $(x_a, x_b)$ ไปเป็น **พิกัดปกติ (Normal Coordinates)** $(q_1, q_2)$ เพื่อแยกสมการให้เป็นอิสระจากกันได้!

### คุณสมบัติของโหมดการสั่นปกติ (Normal Modes):
1. ในแต่ละโหมดปกติ วัตถุทุกชิ้นในระบบจะสั่นด้วย **ความถี่เดียวกันเป๊ะ** ($\\omega_1$ หรือ $\\omega_2$) และมีเฟสตรงกันหรือตรงข้ามกันพอดี
2. การเคลื่อนที่ทั่วไปใดๆ เกิดจากการซ้อนทับเชิงเส้น (Linear Superposition) ของโหมดปกติทั้งสอง:
   $$x_a(t) = C_1\\cos(\\omega_1 t + \\phi_1) + C_2\\cos(\\omega_2 t + \\phi_2)$$
3. เมื่อความถี่สองโหมดใกล้เคียงกัน ($\\omega_2 - \\omega_1 \\ll \\omega_1$) หากเริ่มแกว่งมวลก้อนหนึ่ง พลังงานทั้งหมดจะถ่ายเทสลับไปมาระหว่างมวลทั้งสองก้อนอย่างสมบูรณ์ (ปรากฏการณ์บีตส์)!
      `,
      derivations: [
        {
          id: 'deriv-coupled-pendulums',
          topicId: 'shm-differential-eq',
          titleTh: 'ตัวอย่าง K&K 6.5: ลูกตุ้มคู่ควบด้วยสปริง พิกัดปกติ และการถ่ายเทพลังงาน',
          objectiveTh: 'เปลี่ยนระบบสมการคู่ควบของลูกตุ้มสองอันให้เป็นสมการ SHM อิสระ 2 สมการ พร้อมคำนวณความถี่ปกติทั้งสองและพฤติกรรมบีตส์',
          startingAssumptions: [
            {
              id: 'asm-coup-1',
              descriptionTh: 'ลูกตุ้มเหมือนกัน 2 อัน มวล $m$ ยาว $l$ มุมแกว่งเล็ก เชื่อมด้วยสปริงค่าคงที่ $k$ ซึ่งไม่ยืดหดเมื่อลูกตุ้มห้อยดิ่งทั้งคู่',
              significanceTh: 'การกระจัดในแนวระดับคือ $x_a = l\\theta_a$ และ $x_b = l\\theta_b$',
            },
            {
              id: 'asm-coup-2',
              descriptionTh: 'ปราศจากการหน่วง พิจารณาเฉพาะมุมเล็ก $\\sin\\theta \\approx \\theta$',
              significanceTh: 'แรงดึงกลับจากโน้มถ่วงเทียบเท่าสปริงค่า $m g / l$',
            },
          ],
          steps: [
            {
              stepNumber: 1,
              titleTh: 'เขียนสมการกฎข้อที่ 2 ของลูกตุ้มทั้งสองเมื่อเชื่อมด้วยสปริง $k$',
              latexMath: 'm\\ddot{x}_a = -\\frac{mg}{l}x_a - k(x_a - x_b), \\qquad m\\ddot{x}_b = -\\frac{mg}{l}x_b + k(x_a - x_b)',
              physicalIntuitionTh: 'ถ้า $x_a > x_b$ สปริงจะถูกอัด ทำให้ผลักมวล $a$ ไปทางซ้าย ($-k(x_a-x_b)$) และผลักมวล $b$ ไปทางขวา ($+k(x_a-x_b)$)',
              mathOperationTh: 'ตั้งสมการแรงรวมสำหรับแต่ละมวลในระนาบระดับ',
            },
            {
              stepNumber: 2,
              titleTh: 'บวกและลบสมการทั้งสองเพื่อสร้างพิกัดปกติ $q_1 = x_a + x_b$ และ $q_2 = x_a - x_b$',
              latexMath: '\\ddot{q}_1 + \\left(\\frac{g}{l}\\right)q_1 = 0, \\qquad \\ddot{q}_2 + \\left(\\frac{g}{l} + \\frac{2k}{m}\\right)q_2 = 0',
              physicalIntuitionTh: 'การใช้ผลบวกและผลต่างตัดการพัวพัน (Decouple) ของ $x_a, x_b$ ออกหมดสิ้น! เราจึงได้สมการ SHM อิสระ 2 สมการทันที',
              mathOperationTh: 'นำสมการ $a+b$ และสมการ $a-b$ มาจัดรูป',
              isCrucialLeap: true,
            },
            {
              stepNumber: 3,
              titleTh: 'อ่านความถี่ปกติ (Normal Mode Frequencies) ทั้งสองค่า',
              latexMath: '\\omega_1 = \\sqrt{\\frac{g}{l}}, \\qquad \\omega_2 = \\sqrt{\\frac{g}{l} + \\frac{2k}{m}}',
              physicalIntuitionTh: 'โหมด 1 ($x_a = x_b$): ทั้งคู่แกว่งไปพร้อมกัน สปริงไม่ยืดไม่หดเลย ความถี่จึงเป็น $\\sqrt{g/l}$ พอดี โหมด 2 ($x_a = -x_b$): แกว่งสวนทางกัน จุดกึ่งกลางสปริงนิ่งเหมือนผนัง ทำให้ความแข็งประสิทธิผลเป็น $2k$ ต่อมวลแต่ละก้อน!',
              mathOperationTh: 'เทียบสัมประสิทธิ์หน้า $q_1$ และ $q_2$ กับรูป $\\ddot{q} + \\omega^2 q = 0$',
            },
            {
              stepNumber: 4,
              titleTh: 'แทนเงื่อนไขเริ่มต้น $x_a(0) = A, x_b(0) = 0$ เพื่อดูการถ่ายเทพลังงาน',
              latexMath: 'x_a(t) = A\\cos\\left(\\frac{\\omega_2 - \\omega_1}{2}t\\right)\\cos\\left(\\frac{\\omega_1 + \\omega_2}{2}t\\right), \\qquad x_b(t) = A\\sin\\left(\\frac{\\omega_2 - \\omega_1}{2}t\\right)\\sin\\left(\\frac{\\omega_1 + \\omega_2}{2}t\\right)',
              physicalIntuitionTh: 'เมื่อ $\\left(\\frac{\\omega_2 - \\omega_1}{2}\\right)t = \\frac{\\pi}{2}$ ลูกตุ้ม $a$ จะหยุดนิ่งสนิทและถ่ายเทพลังงานทั้งหมดให้ลูกตุ้ม $b$!',
              mathOperationTh: 'ใช้เอกลักษณ์ตรีโกณมิติ $\\cos\\alpha \\pm \\cos\\beta$ บนผลเฉลย $x_a = \\frac{q_1 + q_2}{2}$ และ $x_b = \\frac{q_1 - q_2}{2}$',
            },
          ],
          finalResultLatex: '\\omega_1 = \\sqrt{\\frac{g}{l}}, \\qquad \\omega_2 = \\sqrt{\\frac{g}{l} + \\frac{2k}{m}}',
          takeawayTh: 'เมื่อเห็นระบบสมมาตร 2 มวลในข้อสอบ สอวน. ให้ทดสอบตั้ง $q_1 = x_1 + x_2$ (โหมดแกว่งพร้อม) และ $q_2 = x_1 - x_2$ (โหมดแกว่งสวน) ก่อนเป็นอันดับแรก!',
        },
      ],
      relatedProblemIds: ['prob-shm-coupled-1'],
    },
    {
      id: 'lesson-shm-3',
      slug: 'damped-driven-resonance',
      topicId: 'shm-differential-eq',
      order: 3,
      titleTh: '8.3 การสั่นแบบหน่วง (Damped SHM) ตัวประกอบคุณภาพ Q และการสั่นพ้อง (Resonance)',
      summaryTh:
        'สมการ Damped Oscillator 3 รูปแบบ ค่า Q-factor และการแก้สมการ Driven Oscillator ด้วยวิธีจำนวนเชิงซ้อนของ K&K (Lorentzian Resonance & FWHM)',
      readTimeMinutes: 23,
      theoryMarkdownTh: `
ในบทที่ 11 ของ *Kleppner & Kolenkow* โลกจริงมีแรงหน่วงและแรงขับภายนอกเสมอ ซึ่งนำไปสู่สมการเชิงอนุพันธ์หัวใจของฟิสิกส์และวิศวกรรม:

### 1. ตัวสั่นฮาร์มอนิกแบบหน่วง (Damped Harmonic Oscillator):
$$\\ddot{x} + \\gamma\\dot{x} + \\omega_0^2 x = 0 \\qquad \\left(\\gamma = \\frac{b}{m}, \\; \\omega_0 = \\sqrt{\\frac{k}{m}}\\right)$$
แบ่งเป็น 3 ระบอบตาม $\\gamma/2$ เทียบกับ $\\omega_0$:
- **Underdamped ($\\gamma/2 < \\omega_0$):** $x(t) = A e^{-\\gamma t/2}\\cos(\\omega_1 t + \\phi)$ โดย $\\omega_1 = \\sqrt{\\omega_0^2 - (\\gamma/2)^2}$
- **Critically Damped ($\\gamma/2 = \\omega_0$):** $x(t) = (A + Bt)e^{-\\gamma t/2}$ (กลับสู่สมดุลเร็วที่สุดโดยไม่แกว่งเกิน!)
- **Overdamped ($\\gamma/2 > \\omega_0$):** ลดลงแบบผลรวมของ 2 เอกซ์โพเนนเชียลโดยไม่แกว่ง

**ตัวประกอบคุณภาพ (Quality Factor $Q$):**
$$Q = \\frac{\\omega_0}{\\gamma} = 2\\pi\\frac{\\text{พลังงานสะสม}}{\\text{พลังงานที่สูญเสียใน 1 คาบ}}$$ (เมื่อ $Q \\gg 1$)

### 2. การสั่นพ้องภายใต้แรงขับคาบ (Driven Oscillator & Resonance):
$$\\ddot{x} + \\gamma\\dot{x} + \\omega_0^2 x = \\frac{F_0}{m}\\cos(\\omega t)$$
การแก้ด้วย **จำนวนเชิงซ้อน (Complex Exponential Method — K&K Note 11.3)** เปลี่ยนอนุพันธ์ $\\frac{d}{dt} \\to i\\omega$ ทำให้แก้สมการพหุนามพีชคณิตได้ทันที! และเมื่อ $Q \\gg 1$ เส้นโค้งกำลังงานเฉลี่ย $\\bar{P}(\\omega)$ จะเป็นรูปโค้ง **Lorentzian** ที่มีความกว้างครึ่งความสูง **FWHM $= \\Delta\\omega = \\gamma = \\frac{\\omega_0}{Q}$**
      `,
      derivations: [
        {
          id: 'deriv-driven-resonance',
          topicId: 'shm-differential-eq',
          titleTh: 'K&K Sec. 11.4 & Note 11.3: การแก้สมการ Driven Oscillator ด้วยเชิงซ้อน แอมพลิจูด และเรโซแนนซ์',
          objectiveTh: 'ใช้ผลเฉลยเชิงซ้อน $z(t) = A e^{i(\\omega t - \\phi)}$ หาแอมพลิจูด $A(\\omega)$ เฟสตามหลัง $\\phi(\\omega)$ และจุดสูงสุดของการดูดซับกำลังงาน',
          startingAssumptions: [
            {
              id: 'asm-res-1',
              descriptionTh: 'พิจารณาสถานะคงตัว (Steady State) หลังพจน์ Transient สลายตัวหมดไปแล้ว ($t \\gg 1/\\gamma$)',
              significanceTh: 'ระบบจะสั่นด้วยความถี่เดียวกับแรงขับ $\\omega$ โดยมีมุมเฟสตามหลัง $\\phi$',
            },
            {
              id: 'asm-res-2',
              descriptionTh: 'ขยายสมการจริงเป็นสมการเชิงซ้อน $\\ddot{z} + \\gamma\\dot{z} + \\omega_0^2 z = \\frac{F_0}{m}e^{i\\omega t}$ โดยที่ $x(t) = \\text{Re}(z)$',
              significanceTh: 'เนื่องจากสัมประสิทธิ์ $1, \\gamma, \\omega_0^2$ เป็นจำนวนจริง ส่วนจริงของ $z$ จึงเป็นคำตอบของสมการจริงโดยอัตโนมัติ',
            },
          ],
          steps: [
            {
              stepNumber: 1,
              titleTh: 'ลองแทนคำตอบเชิงซ้อนในรูป $z(t) = Z_0 e^{i\\omega t} = A e^{-i\\phi} e^{i\\omega t}$',
              latexMath: '\\dot{z} = i\\omega z, \\qquad \\ddot{z} = -\\omega^2 z',
              physicalIntuitionTh: 'ความมหัศจรรย์ของ $e^{i\\omega t}$ คือการดิฟกลายเป็นการคูณด้วย $i\\omega$ สมการอนุพันธ์จึงยุบตัวเป็นพีชคณิตธรรมดา!',
              mathOperationTh: 'หาอนุพันธ์อันดับ 1 และ 2 ของ $e^{i\\omega t}$',
            },
            {
              stepNumber: 2,
              titleTh: 'แทนลงในสมการอนุพันธ์เชิงซ้อนและตัด $e^{i\\omega t}$ ทั้งสองข้าง',
              latexMath: '(-\\omega^2 + i\\gamma\\omega + \\omega_0^2) A e^{-i\\phi} = \\frac{F_0}{m} \\implies A e^{i\\phi} = \\frac{F_0/m}{(\\omega_0^2 - \\omega^2) + i\\gamma\\omega}',
              physicalIntuitionTh: 'ส่วนจริง $(\\omega_0^2 - \\omega^2)$ แทนผลของสปริงและความเฉื่อย ส่วนจินตภาพ $i\\gamma\\omega$ แทนแรงหน่วงที่มีเฟสต่างกัน $90^\\circ$',
              mathOperationTh: 'กลับข้าง $e^{-i\\phi}$ เป็น $e^{i\\phi}$ แล้วย้ายวงเล็บไปหาร',
              isCrucialLeap: true,
            },
            {
              stepNumber: 3,
              titleTh: 'แยกขนาด (Modulus) และอาร์กิวเมนต์ (Phase) เพื่อหา $A(\\omega)$ และ $\\phi(\\omega)$',
              latexMath: 'A(\\omega) = \\frac{F_0/m}{\\sqrt{(\\omega_0^2 - \\omega^2)^2 + (\\gamma\\omega)^2}}, \\qquad \\tan\\phi = \\frac{\\gamma\\omega}{\\omega_0^2 - \\omega^2}',
              physicalIntuitionTh: 'ที่ $\\omega \\ll \\omega_0$: เคลื่อนที่ตามแรง ($\\phi \\to 0$), ที่ $\\omega = \\omega_0$: ความถี่ธรรมชาติหักล้างความเฉื่อยพอดี ($\\phi = \\pi/2$, แรงสอดคล้องกับความเร็ว $\\dot{x}$ ส่งกำลังงานสูงสุด!), ที่ $\\omega \\gg \\omega_0$: สั่นตรงข้ามแรง ($\\phi \\to \\pi$)',
              mathOperationTh: 'ใช้ $|\\frac{1}{u + iv}| = \\frac{1}{\\sqrt{u^2 + v^2}}$ และมุมเฟส $\\arg(u + iv) = \\arctan(v/u)$',
            },
            {
              stepNumber: 4,
              titleTh: 'วิเคราะห์กำลังงานเฉลี่ยและแถบความถี่ FWHM เมื่อหน่วงน้อย ($\\gamma \\ll \\omega_0$)',
              latexMath: '\\bar{P}(\\omega) = \\frac{1}{2}m\\gamma\\omega^2 A^2 \\approx \\bar{P}_{\\max}\\frac{(\\gamma/2)^2}{(\\omega - \\omega_0)^2 + (\\gamma/2)^2} \\implies \\Delta\\omega_{\\text{FWHM}} = \\gamma = \\frac{\\omega_0}{Q}',
              physicalIntuitionTh: 'ความกว้างแถบความถี่ที่พลังงานลดลงเหลือครึ่งหนึ่ง ($\\Delta\\omega = \\gamma$) ผกผันกับค่า $Q$ ยิ่งแรงต้านน้อย ยอดเรโซแนนซ์ยิ่งสูงและแหลมคม (ความไม่แน่นอน $\\tau\\Delta\\omega \\approx 1$)',
              mathOperationTh: 'ประมาณ $\\omega_0^2 - \\omega^2 = (\\omega_0+\\omega)(\\omega_0-\\omega) \\approx 2\\omega_0(\\omega_0-\\omega)$ ใกล้จุดพ้อง',
            },
          ],
          finalResultLatex: 'A(\\omega) = \\frac{F_0/m}{\\sqrt{(\\omega_0^2 - \\omega^2)^2 + (\\gamma\\omega)^2}}, \\qquad \\tan\\phi = \\frac{\\gamma\\omega}{\\omega_0^2 - \\omega^2}, \\qquad Q = \\frac{\\omega_0}{\\gamma}',
          takeawayTh: 'ใช้หลัก "แปลงเป็นเชิงซ้อน $\\frac{d}{dt}\\to i\\omega$ แล้วค่อยดึง Re/Modulus ทีหลัง" ช่วยแก้ปัญหาวงจร AC และระบบสั่นพ้องทุกชนิดใน สอวน. ได้เร็วกว่าการแตก $\\sin/\\cos$ หลายเท่า',
        },
      ],
      relatedProblemIds: ['prob-shm-spring-cylinder-1', 'prob-shm-coupled-1'],
    },
  ],
};
