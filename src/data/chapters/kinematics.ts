// src/data/chapters/kinematics.ts
import { Topic } from '@/types/curriculum';

export const KINEMATICS_TOPIC: Topic = {
  id: 'kinematics-calculus',
  titleTh: '2. จลนศาสตร์แคลคูลัสและพิกัดเชิงขั้ว (Calculus & Polar Kinematics)',
  subtitleTh: 'Formal Integration, Drag Dynamics & Polar Coordinate Kinematics (K&K Ch. 1)',
  iconName: 'Activity',
  colorAccent: '#A855F7',
  descriptionTh:
    'ก้าวข้ามสมการความเร่งคงตัว สู่การอินทิเกรตเวกเตอร์ความเร่ง ความเร็วภายใต้แรงต้าน และอนุพันธ์ของเวกเตอร์หนึ่งหน่วยในพิกัดเชิงขั้วตามแนวทาง Kleppner & Kolenkow',
  lessons: [
    {
      id: 'lesson-kin-1',
      slug: 'calculus-kinematics-drag-force',
      topicId: 'kinematics-calculus',
      order: 1,
      titleTh: '2.1 ความเร่งไม่คงตัว การอินทิเกรตเชิงรูปแบบ และแรงต้าน Stokes (F = -bv)',
      summaryTh:
        'นิยามจลนศาสตร์ผ่านแคลคูลัส การใช้กฎลูกโซ่ a = v(dv/dx) การพิสูจน์ความเร็ว v(t) แบบเอกซ์โพเนนเชียล และอัตราเร็วปลายสุด',
      readTimeMinutes: 18,
      theoryMarkdownTh: `
ตามแนวทางของ Kleppner & Kolenkow (บทที่ 1) สูตรจลนศาสตร์ระดับมัธยมปลาย $s = ut + \\frac{1}{2}at^2$ เป็นเพียงกรณีพิเศษเมื่อ $a = \\text{constant}$ เท่านั้น ในกลศาสตร์โอลิมปิก นิยามที่แท้จริงเป็นความสัมพันธ์เชิงอนุพันธ์และปริพันธ์:

$$\\vec{v}(t) = \\frac{d\\vec{r}}{dt}, \\qquad \\vec{a}(t) = \\frac{d\\vec{v}}{dt} = \\frac{d^2\\vec{r}}{dt^2}$$

### 1. การอินทิเกรตเชิงรูปแบบ (Formal Integration of Kinematics)
หากทราบความเร่ง $\\vec{a}(t)$ เป็นฟังก์ชันของเวลา และทราบความเร็วเริ่มต้น $\\vec{v}(t_0) = \\vec{v}_0$ เราสามารถอินทิเกรตทีละขั้นเพื่อหลีกเลี่ยงความสับสนเรื่องค่าคงที่ของการอินทิเกรตโดยใช้ตัวแปรหุ่น (Dummy Variables $t'$):

$$\\vec{v}(t) = \\vec{v}_0 + \\int_{t_0}^{t} \\vec{a}(t')\\,dt'$$
$$\\vec{r}(t) = \\vec{r}_0 + \\int_{t_0}^{t} \\vec{v}(t')\\,dt'$$

### 2. เทคนิคเปลี่ยนตัวแปรเมื่อความเร่งขึ้นกับตำแหน่งหรือความเร็ว
- **เมื่อทราบ $a(x)$:** ใช้กฎลูกโซ่ (Chain Rule) กำจัดตัวแปรเวลา $t$:
$$a = \\frac{dv}{dt} = \\frac{dv}{dx}\\frac{dx}{dt} = v\\frac{dv}{dx} \\implies \\int_{v_0}^{v} v'\\,dv' = \\int_{x_0}^{x} a(x')\\,dx'$$
- **เมื่อทราบ $a(v)$ (เช่น แรงต้านของไหล $F = -bv$ หรือ $-cv^2$):** แยกตัวแปรเพื่อหา $v(t)$ ก่อน:
$$\\int_{v_0}^{v} \\frac{dv'}{a(v')} = \\int_{0}^{t} dt'$$
และหากต้องการระยะทาง $x(v)$ โดยไม่ผ่านตัวแปร $t$ ให้ใช้ $\\frac{v\\,dv}{a(v)} = dx$ โดยตรง

> **ข้อควรระวัง (K&K Physical Sanity Check):** ตรวจสอบผลลัพธ์ที่ได้ในลิมิตเวลาสั้น ($t \\to 0$ โดยกระจาย Taylor $e^{-\\alpha t} \\approx 1 - \\alpha t$) เพื่อยืนยันว่าลดรูปกลับสู่กรณีไร้แรงต้าน และตรวจสอบลิมิตเวลานาน ($t \\to \\infty$) เพื่อหาค่าเข้าสู่สมดุล (Terminal Behavior)
      `,
      derivations: [
        {
          id: 'deriv-terminal-velocity-drag',
          topicId: 'kinematics-calculus',
          titleTh: 'การพิสูจน์ $v(t)$ ของอนุภาคตกอิสระภายใต้แรงต้านอากาศเชิงเส้น $F_{drag} = -bv$',
          objectiveTh: 'แก้สมการเชิงอนุพันธ์อันดับหนึ่งเพื่อหาฟังก์ชันความเร็วตามเวลา $v(t)$ ความเร็วปลายสุด $v_t$ และตรวจสอบลิมิต $t \\ll \\tau$',
          startingAssumptions: [
            {
              id: 'asm-drag-1',
              descriptionTh: 'แรงต้านอากาศแปรผันตรงกับความเร็ว $F_d = -bv$ (Stokes Drag)',
              significanceTh: 'ใช้ได้สำหรับของไหลหนืดหรือการเคลื่อนที่ที่ Reynolds number ต่ำ',
            },
            {
              id: 'asm-drag-2',
              descriptionTh: 'ปล่อยอนุภาคมวล $m$ ตกจากหยุดนิ่งที่ $t=0$ ($v(0) = 0$)',
              significanceTh: 'เป็นเงื่อนไขเริ่มต้น (Initial Condition) ในการกำหนดขอบเขตล่างของอินทิกรัล',
            },
          ],
          steps: [
            {
              stepNumber: 1,
              titleTh: 'เขียนสมการกฎการเคลื่อนที่ข้อที่ 2 ของนิวตันตามแนวดิ่ง (กำหนดทิศลงเป็น $+$)',
              latexMath: 'm\\frac{dv}{dt} = mg - bv',
              physicalIntuitionTh: 'ขณะวัตถุตกลงมา แรงโน้มถ่วงฉุดลง ($+mg$) ขณะที่แรงต้านอากาศมีทิศต้านการเคลื่อนที่ ($-bv$)',
              mathOperationTh: 'แทน $\\Sigma F = ma$ ด้วย $a = \\frac{dv}{dt}$',
            },
            {
              stepNumber: 2,
              titleTh: 'จัดรูปแยกตัวแปร (Separation of Variables)',
              latexMath: '\\frac{dv}{g - \\frac{b}{m}v} = dt \\iff \\frac{dv}{v - \\frac{mg}{b}} = -\\frac{b}{m}dt',
              physicalIntuitionTh: 'เรารวบรวมตัวแปร $v$ ให้อยู่ข้างเดียวกับ $dv$ เพื่อเตรียมอินทิเกรต',
              mathOperationTh: 'ดึงตัวร่วม $-\\frac{b}{m}$ ออกมาเพื่อให้สัมประสิทธิ์หน้า $v$ เป็น $1$',
              isCrucialLeap: true,
            },
            {
              stepNumber: 3,
              titleTh: 'อินทิเกรตทั้งสองข้างจากเงื่อนไขเริ่มต้น $t=0, v=0$ ถึงเวลา $t$ ใดๆ',
              latexMath: '\\int_{0}^{v(t)} \\frac{dv\'}{v\' - \\frac{mg}{b}} = -\\int_{0}^{t} \\frac{b}{m} dt\'',
              physicalIntuitionTh: 'การใช้อินทิกรัลจำกัดเขตช่วยกำจัดปัญหาค่าคงที่ของการอินทิเกรตที่มักทำให้สับสน',
              mathOperationTh: 'ใช้สูตร $\\int \\frac{1}{u}\\,du = \\ln|u|$',
            },
            {
              stepNumber: 4,
              titleTh: 'หาผลลัพธ์ลอการิทึมและจัดรูปหา $v(t)$',
              latexMath: '\\ln\\left| \\frac{v - \\frac{mg}{b}}{-\\frac{mg}{b}} \\right| = -\\frac{b}{m}t \\implies 1 - \\frac{bv}{mg} = e^{-\\frac{b}{m}t}',
              physicalIntuitionTh: 'ฟังก์ชัน $e^{-(b/m)t}$ บ่งบอกว่าความเร่งจะค่อยๆ ลดลงแบบ Exponential เมื่อเวลาผ่านไป',
              mathOperationTh: 'ยกกำลังด้วยฐาน $e$ ทั้งสองข้าง ($e^{\\ln x} = x$)',
            },
            {
              stepNumber: 5,
              titleTh: 'จัดสมการให้อยู่ในรูปสำเร็จรูปและตรวจสอบลิมิต K&K',
              latexMath: 'v(t) = \\frac{mg}{b}\\left( 1 - e^{-t/\\tau} \\right), \\quad \\tau = \\frac{m}{b}; \\qquad t \\ll \\tau \\implies v(t) \\approx \\frac{mg}{b}\\left(\\frac{t}{m/b}\\right) = gt',
              physicalIntuitionTh: 'เมื่อ $t \\to \\infty$, ความเร็วลู่เข้าหา Terminal Velocity $v_t = \\frac{mg}{b}$ และเมื่อ $t \\ll \\tau$ การกระจาย Taylor ให้ $v(t) \\approx gt$ เสมือนตกอิสระไร้แรงต้าน',
              mathOperationTh: 'ใช้การกระจายอนุกรมเทย์เลอร์ $e^{-x} \\approx 1 - x$ สำหรับ $|x| \\ll 1$',
            },
          ],
          finalResultLatex: 'v(t) = v_t \\left( 1 - e^{-t/\\tau} \\right), \\quad v_t = \\frac{mg}{b}, \\quad \\tau = \\frac{m}{b}',
          takeawayTh: 'พารามิเตอร์ $\\tau = m/b$ คือ Characteristic Time Constant ที่บอกสเกลเวลาในการเข้าใกล้ความเร็วปลายสุด และหมั่นเช็กลิมิต $t \\ll \\tau$ เสมอเพื่อตรวจสอบความถูกต้อง',
        },
      ],
      relatedProblemIds: ['prob-kin-drag-1'],
    },
    {
      id: 'lesson-kin-2',
      slug: 'polar-coordinates-rotating-vectors',
      topicId: 'kinematics-calculus',
      order: 2,
      titleTh: '2.2 เวกเตอร์ที่หมุนได้และจลนศาสตร์ในพิกัดเชิงขั้ว (Plane Polar Kinematics)',
      summaryTh:
        'อนุพันธ์ของเวกเตอร์ฐาน r-hat และ theta-hat สูตรความเร็วและความเร่งเต็มรูปในพิกัดเชิงขั้ว พร้อมเหตุผลว่าทำไม v_r ไม่เท่ากับอินทิกรัลของ a_r',
      readTimeMinutes: 22,
      theoryMarkdownTh: `
ในพิกัดคาร์ทีเซียน เวกเตอร์ฐาน $(\\hat{i}, \\hat{j})$ มีทิศทางคงที่ตลอดกาล แต่ในปัญหาการหมุน โคจร หรือวัตถุบนรางโค้ง เวกเตอร์ฐานของ **ระบบพิกัดเชิงขั้วระนาบ (Plane Polar Coordinates)** $(\\hat{r}, \\hat{\\theta})$ จะเปลี่ยนทิศทางตามมุม $\\theta(t)$ ของอนุภาคอยู่ตลอดเวลา:

$$\\hat{r} = \\cos\\theta\\,\\hat{i} + \\sin\\theta\\,\\hat{j}$$
$$\\hat{\\theta} = -\\sin\\theta\\,\\hat{i} + \\cos\\theta\\,\\hat{j}$$

### 1. กฎทองของการหาอนุพันธ์เวกเตอร์ที่ขนาดคงที่ (Rotating Unit Vectors)
เวกเตอร์ที่มีขนาดคงที่ $A$ แต่หมุนไปด้วยอัตราเร็วเชิงมุม $\\dot{\\theta}$ จะมีอนุพันธ์เทียบเวลาตั้งฉากกับตัวมันเองในทิศที่มุม $\\theta$ เพิ่มขึ้น:

$$\\frac{d\\hat{r}}{dt} = \\dot{\\theta}\\,\\hat{\\theta}, \\qquad \\frac{d\\hat{\\theta}}{dt} = -\\dot{\\theta}\\,\\hat{r}$$

### 2. ความเร็วและความเร่งในพิกัดเชิงขั้ว (K&K Eq. 1.24 & 1.26)
จากการดิฟเวกเตอร์ตำแหน่ง $\\vec{r} = r\\hat{r}$ ด้วยกฎผลคูณ (Product Rule):
$$\\vec{v} = \\dot{r}\\,\\hat{r} + r\\dot{\\theta}\\,\\hat{\\theta}$$
$$\\vec{a} = (\\ddot{r} - r\\dot{\\theta}^2)\\,\\hat{r} + (r\\ddot{\\theta} + 2\\dot{r}\\dot{\\theta})\\,\\hat{\\theta}$$

#### ความหมายทางกายภาพของแต่ละเทอม (Physical Interpretation):
- **$-r\\dot{\\theta}^2\\hat{r}$ (Centripetal Acceleration):** เกิดจากการที่เวกเตอร์ความเร็วเชิงเส้น $r\\dot{\\theta}\\hat{\\theta}$ หมุนเบนเข้าหาจุดศูนย์กลาง
- **$r\\ddot{\\theta}\\hat{\\theta}$ (Angular Acceleration Term):** เกิดจากการเปลี่ยนแปลงขนาดของอัตราเร็วเชิงมุม $\\dot{\\theta}$
- **$2\\dot{r}\\dot{\\theta}\\hat{\\theta}$ (Coriolis Acceleration):** เกิดจาก **2 เหตุผลพร้อมกัน** อย่างละครึ่ง: (1) การที่อนุภาคขยับออกไปที่รัศมีไกลขึ้นทำให้ความเร็วตามแนว $\\hat{\\theta}$ เพิ่มขึ้น ($\\dot{r}\\dot{\\theta}$), และ (2) การที่เวกเตอร์ความเร็วแนวรัศมี $\\dot{r}\\hat{r}$ หมุนเปลี่ยนทิศเข้าไปตามแนว $\\hat{\\theta}$ ($\\dot{r}\\dot{\\theta}$)

> **คำเตือนสำคัญของ K&K (Why $v_r \\neq \\int a_r\\,dt$):** ในพิกัดเชิงขั้ว $v_r = \\dot{r}$ **ไม่ใช่** $\\int a_r\\,dt$! เพราะ $a_r = \\ddot{r} - r\\dot{\\theta}^2$ มีเทอมสู่ศูนย์กลางรวมอยู่ด้วย การอินทิเกรต $a_r$ โดยตรงเป็นความผิดพลาดคลาสสิกในการสอบ สอวน.
      `,
      derivations: [
        {
          id: 'deriv-polar-kinematics',
          topicId: 'kinematics-calculus',
          titleTh: 'การพิสูจน์เวกเตอร์ความเร็วและความเร่งในพิกัดเชิงขั้ว $\\vec{a} = (\\ddot{r} - r\\dot{\\theta}^2)\\hat{r} + (r\\ddot{\\theta} + 2\\dot{r}\\dot{\\theta})\\hat{\\theta}$',
          objectiveTh: 'สร้างสมการจลนศาสตร์ 2 มิติในพิกัดเชิงขั้วจากการหาอนุพันธ์ของเวกเตอร์ฐาน $\\hat{r}$ และ $\\hat{\\theta}$ ตั้งแต่ต้น',
          startingAssumptions: [
            {
              id: 'asm-polkin-1',
              descriptionTh: 'อนุภาคเคลื่อนที่ในระนาบ 2 มิติ โดยมีพิกัด $(r(t), \\theta(t))$ เป็นฟังก์ชันที่หาอนุพันธ์ได้',
              significanceTh: 'สามารถนิยามเวกเตอร์ตำแหน่ง $\\vec{r}(t) = r(t)\\hat{r}(t)$ ได้อย่างชัดเจน',
            },
            {
              id: 'asm-polkin-2',
              descriptionTh: 'เวกเตอร์ฐานตั้งฉากซึ่งกันและกัน $\\hat{r} \\cdot \\hat{\\theta} = 0$ และมีขนาดเท่ากับ $1$',
              significanceTh: 'ทิศทางของ $\\hat{r}$ ชี้จากจุดกำเนิดออกนอก และ $\\hat{\\theta}$ ชี้ในทิศมุม $\\theta$ เพิ่มขึ้น (ทวนเข็มนาฬิกา)',
            },
          ],
          steps: [
            {
              stepNumber: 1,
              titleTh: 'เขียน $\\hat{r}$ และ $\\hat{\\theta}$ ในรูปของเวกเตอร์ฐานคาร์ทีเซียนคงที่ $(\\hat{i}, \\hat{j})$',
              latexMath: '\\hat{r} = \\cos\\theta\\,\\hat{i} + \\sin\\theta\\,\\hat{j}, \\qquad \\hat{\\theta} = -\\sin\\theta\\,\\hat{i} + \\cos\\theta\\,\\hat{j}',
              physicalIntuitionTh: 'เราต้องอ้างอิงกับ $(\\hat{i}, \\hat{j})$ ที่ไม่หมุนก่อน จึงจะสามารถใช้กฎอนุพันธ์ปกติได้โดยไม่ตกหล่นการหมุนของกรอบ',
              mathOperationTh: 'แตกเวกเตอร์หนึ่งหน่วยที่มุม $\\theta$ เข้าสู่แกน $x$ และ $y$',
            },
            {
              stepNumber: 2,
              titleTh: 'หาอนุพันธ์เทียบเวลาของ $\\hat{r}$ และ $\\hat{\\theta}$ ด้วยกฎลูกโซ่',
              latexMath: '\\frac{d\\hat{r}}{dt} = (-\\sin\\theta\\,\\hat{i} + \\cos\\theta\\,\\hat{j})\\dot{\\theta} = \\dot{\\theta}\\,\\hat{\\theta}, \\qquad \\frac{d\\hat{\\theta}}{dt} = (-\\cos\\theta\\,\\hat{i} - \\sin\\theta\\,\\hat{j})\\dot{\\theta} = -\\dot{\\theta}\\,\\hat{r}',
              physicalIntuitionTh: 'แม้ความยาวของ $\\hat{r}$ และ $\\hat{\\theta}$ จะเป็น 1 เสมอ แต่ทิศทางที่หมุนไปทำให้เกิดอัตราการเปลี่ยนแปลงตั้งฉากกับตัวมันเอง',
              mathOperationTh: 'ใช้ $\\frac{d}{dt}f(\\theta(t)) = \\frac{df}{d\\theta}\\dot{\\theta}$ และสังเกตว่า $\\hat{i}, \\hat{j}$ เป็นค่าคงที่',
              isCrucialLeap: true,
            },
            {
              stepNumber: 3,
              titleTh: 'หาเวกเตอร์ความเร็ว $\\vec{v} = \\frac{d}{dt}(r\\hat{r})$',
              latexMath: '\\vec{v} = \\frac{dr}{dt}\\hat{r} + r\\frac{d\\hat{r}}{dt} = \\dot{r}\\,\\hat{r} + r\\dot{\\theta}\\,\\hat{\\theta}',
              physicalIntuitionTh: 'ความเร็วทั้งหมดแยกเป็น 2 ส่วนตั้งฉากกัน: การยืดหดตามแนวรัศมี ($\\dot{r}$) และการกวาดโค้งตามแนวสัมผัส ($r\\dot{\\theta}$)',
              mathOperationTh: 'ใช้กฎผลคูณ (Product Rule) กับฟังก์ชันสเกลาร์ $r(t)$ และเวกเตอร์ $\\hat{r}(t)$',
            },
            {
              stepNumber: 4,
              titleTh: 'หาเวกเตอร์ความเร่ง $\\vec{a} = \\frac{d\\vec{v}}{dt}$ โดยดิฟทุกเทอมที่ขึ้นกับเวลา',
              latexMath: '\\vec{a} = \\ddot{r}\\hat{r} + \\dot{r}\\dot{\\hat{r}} + \\dot{r}\\dot{\\theta}\\hat{\\theta} + r\\ddot{\\theta}\\hat{\\theta} + r\\dot{\\theta}\\dot{\\hat{\\theta}}',
              physicalIntuitionTh: 'อย่าลืมว่าพจน์ $r\\dot{\\theta}\\hat{\\theta}$ มีฟังก์ชันของเวลาคูณกันถึง 3 ตัว ($r$, $\\dot{\\theta}$, และ $\\hat{\\theta}$) จึงแตกเป็น 3 พจน์',
              mathOperationTh: 'กระจายอนุพันธ์ผลคูณของทั้ง 5 เทอมอย่างระมัดระวัง',
            },
            {
              stepNumber: 5,
              titleTh: 'แทนค่า $\\dot{\\hat{r}} = \\dot{\\theta}\\hat{\\theta}$ และ $\\dot{\\hat{\\theta}} = -\\dot{\\theta}\\hat{r}$ แล้วจัดกลุ่มตามฐาน $\\hat{r}, \\hat{\\theta}$',
              latexMath: '\\vec{a} = (\\ddot{r} - r\\dot{\\theta}^2)\\hat{r} + (r\\ddot{\\theta} + 2\\dot{r}\\dot{\\theta})\\hat{\\theta}',
              physicalIntuitionTh: 'พจน์ $\\dot{r}\\dot{\\theta}\\hat{\\theta}$ โผล่มาจากทั้งการหมุนของ $\\dot{r}\\hat{r}$ และการเปลี่ยนรัศมีของ $r\\dot{\\theta}\\hat{\\theta}$ จึงรวมกันได้สัมประสิทธิ์ $2$ ของความเร่งคอริโอลิส',
              mathOperationTh: 'รวบสัมประสิทธิ์หน้า $\\hat{r}$ และ $\\hat{\\theta}$ เข้าด้วยกัน',
            },
          ],
          finalResultLatex: '\\vec{v} = \\dot{r}\\hat{r} + r\\dot{\\theta}\\hat{\\theta}, \\qquad \\vec{a} = (\\ddot{r} - r\\dot{\\theta}^2)\\hat{r} + (r\\ddot{\\theta} + 2\\dot{r}\\dot{\\theta})\\hat{\\theta}',
          takeawayTh: 'สมการนี้คืออาวุธสำคัญที่สุดสำหรับโจทย์การเคลื่อนที่แบบเส้นโค้ง แรงสู่ศูนย์กลาง และกรอบอ้างอิงที่หมุนได้ใน สอวน.',
        },
        {
          id: 'deriv-bead-on-spoke',
          topicId: 'kinematics-calculus',
          titleTh: 'ตัวอย่าง K&K 1.18: ลูกปัดไถลบนซี่ล้อหมุนด้วยอัตราเร็วเชิงมุมคงที่ (Bead on a Spoke)',
          objectiveTh: 'ประยุกต์สมการความเร่งเชิงขั้วเพื่อหาฟังก์ชันตำแหน่ง $r(t)$ และแรงปฏิกิริยาแนวขวาง $N(t)$ ที่ซี่ล้อผลักลูกปัด',
          startingAssumptions: [
            {
              id: 'asm-spoke-1',
              descriptionTh: 'ซี่ล้อลื่นไม่มีแรงเสียดทานและหมุนในระนาบระดับด้วยความเร็วเชิงมุมคงที่ $\\dot{\\theta} = \\omega$ ($\\ddot{\\theta} = 0$)',
              significanceTh: 'ไม่มีแรงกระทำต่อลูกปัดในแนวรัศมี $\\hat{r}$ ดังนั้น $F_r = 0 \\implies a_r = 0$',
            },
            {
              id: 'asm-spoke-2',
              descriptionTh: 'ลูกปัดมวล $m$ เริ่มต้นที่ระยะ $r(0) = r_0 > 0$ ด้วยความเร็วแนวรัศมีเริ่มต้น $\\dot{r}(0) = 0$',
              significanceTh: 'เป็นปัญหาค่าเริ่มต้น (IVP) สำหรับสมการเชิงอนุพันธ์อันดับสอง',
            },
          ],
          steps: [
            {
              stepNumber: 1,
              titleTh: 'ตั้งสมการการเคลื่อนที่ในแนวรัศมี ($F_r = m a_r$)',
              latexMath: 'F_r = m(\\ddot{r} - r\\dot{\\theta}^2) = 0 \\implies \\ddot{r} - \\omega^2 r = 0',
              physicalIntuitionTh: 'แม้ซี่ล้อจะออกแรงดันแนวตั้งฉาก $\\hat{\\theta}$ แต่ไม่สามารถออกแรงดึงหรือผลักตามแนวรัศมี $\\hat{r}$ ได้เลย ดังนั้นความเร่งลัพธ์แนวรัศมี $a_r$ ต้องเป็นศูนย์ (ไม่ใช่ $\\ddot{r} = 0$!)',
              mathOperationTh: 'แทน $\\dot{\\theta} = \\omega$ และ $a_r = 0$',
              isCrucialLeap: true,
            },
            {
              stepNumber: 2,
              titleTh: 'แก้สมการอนุพันธ์เชิงเส้น $\\ddot{r} = \\omega^2 r$ ในรูปฟังก์ชันไฮเพอร์โบลิก',
              latexMath: 'r(t) = A e^{\\omega t} + B e^{-\\omega t} = C\\cosh(\\omega t) + D\\sinh(\\omega t)',
              physicalIntuitionTh: 'ยิ่งลูกปัดไถลออกห่างจุดศูนย์กลาง ความเร่ง $\\ddot{r} = \\omega^2 r$ ยิ่งทวีคูณ ทำให้ระยะทางพุ่งออกเป็นเอกซ์โพเนนเชียล',
              mathOperationTh: 'สมการลักษณะเฉพาะ $\\lambda^2 - \\omega^2 = 0 \\implies \\lambda = \\pm\\omega$',
            },
            {
              stepNumber: 3,
              titleTh: 'แทนเงื่อนไขเริ่มต้น $r(0) = r_0$ และ $\\dot{r}(0) = 0$',
              latexMath: 'r(0) = C = r_0, \\qquad \\dot{r}(0) = \\omega D = 0 \\implies r(t) = r_0 \\cosh(\\omega t)',
              physicalIntuitionTh: 'หากปล่อยที่ศูนย์กลางพอดี ($r_0 = 0$) ลูกปัดจะอยู่นิ่งตลอดไป แต่ถ้าเบี่ยงออกแม้แต่นิดเดียวก็จะไถลหลุดทันที',
              mathOperationTh: 'ใช้ $\\cosh(0) = 1$, $\\sinh(0) = 0$ และ $\\frac{d}{dt}\\cosh(\\omega t) = \\omega\\sinh(\\omega t)$',
            },
            {
              stepNumber: 4,
              titleTh: 'หาแรงปฏิกิริยา $N$ จากซี่ล้อในทิศ $\\hat{\\theta}$ โดยใช้ $a_\\theta = r\\ddot{\\theta} + 2\\dot{r}\\dot{\\theta}$',
              latexMath: 'N = m a_\\theta = m(0 + 2\\dot{r}\\omega) = 2m\\omega^2 r_0 \\sinh(\\omega t)',
              physicalIntuitionTh: 'แรงที่ซี่ล้อใช้กวาดลูกปัดไม่ได้ทำหน้าที่แค่ประคองตามแนวรัศมี แต่ต้องให้พลังงานจลน์จากการเร่งความเร็วเชิงเส้น $r\\omega$ เมื่อ $r$ เพิ่มขึ้น ซึ่งก็คือเทอมคอริโอลิส $2m\\omega\\dot{r}$',
              mathOperationTh: 'ดิฟ $r(t)$ เทียบเวลาจะได้ $\\dot{r}(t) = r_0\\omega\\sinh(\\omega t)$ แล้วแทนใน $F_\\theta = m a_\\theta$',
            },
          ],
          finalResultLatex: 'r(t) = r_0\\cosh(\\omega t), \\qquad N(t) = 2m\\omega^2 r_0\\sinh(\\omega t)',
          takeawayTh: 'ตัวอย่าง K&K 1.18 แสดงให้เห็นอย่างชัดเจนว่า $a_r = 0$ ไม่ได้แปลว่า $\\dot{r}$ คงที่! เทอม $-r\\omega^2$ ทำให้เกิดความเร่งเชิงพิกัด $\\ddot{r} = \\omega^2 r$ ผลักให้ลูกปัดพุ่งออกไปด้านนอก',
        },
      ],
      relatedProblemIds: ['prob-kin-polar-1'],
    },
  ],
};
