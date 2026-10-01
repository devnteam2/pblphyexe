// src/data/curriculumData.ts
import { Topic } from '@/types/curriculum';

export const CURRICULUM_TOPICS: Topic[] = [
  {
    id: 'math-tools',
    titleTh: '1. เครื่องมือคณิตศาสตร์สำหรับฟิสิกส์โอลิมปิก',
    subtitleTh: 'Vectors, Differential Operators & Taylor Series',
    iconName: 'Binary',
    colorAccent: '#38BDF8',
    descriptionTh: 'ปูพื้นฐานแคลคูลัส เวกเตอร์ และการประมาณค่าอนุกรมเทย์เลอร์ที่จำเป็นต่อการวิเคราะห์โจทย์ สอวน. ค่าย 1 และ 2',
    lessons: [
      {
        id: 'lesson-math-1',
        slug: 'vectors-and-calculus-physics',
        topicId: 'math-tools',
        order: 1,
        titleTh: 'เวกเตอร์ อนุพันธ์ และการประมาณมุมเล็ก (Small-Angle Approximation)',
        summaryTh: 'เข้าใจความหมายเชิงเรขาคณิตของเวกเตอร์ ผลคูณแบบดอทและครอส พร้อมการประมาณค่าด้วย Taylor Series',
        readTimeMinutes: 12,
        theoryMarkdownTh: `
ในฟิสิกส์ระดับมัธยมปลายทั่วไป เรามักใช้สูตรพีชคณิตสำเร็จรูป แต่ในค่าย สอวน. ฟิสิกส์ **เวกเตอร์และแคลคูลัสคือภาษาธรรมชาติ** ที่ใช้อธิบายการเปลี่ยนแปลงในปริภูมิ 3 มิติ

### 1. ผลคูณสเกลาร์ (Dot Product) และ ผลคูณเวกเตอร์ (Cross Product)
- **Dot Product:** วัดการฉายภาพของเวกเตอร์หนึ่งไปบนอีกเวกเตอร์หนึ่ง และเป็นสเกลาร์:
$$\\vec{A} \\cdot \\vec{B} = |\\vec{A}||\\vec{B}| \\cos\\theta = A_x B_x + A_y B_y + A_z B_z$$
- **Cross Product:** ให้ผลลัพธ์เป็นเวกเตอร์ที่ตั้งฉากกับระนาบของทั้งสองเวกเตอร์ตามกฎมือขวา:
$$\\vec{A} \\times \\vec{B} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ A_x & A_y & A_z \\\\ B_x & B_y & B_z \\end{vmatrix}$$

### 2. การประมาณค่าด้วยอนุกรมเทย์เลอร์ (Taylor Expansion)
โจทย์ สอวน. มักให้เราพิจารณาการสั่นหรือการกระจัดขนาดเล็ก ($x \\ll 1$) โดยใช้:
$$f(x) = f(0) + f'(0)x + \\frac{f''(0)}{2!}x^2 + \\dots$$
สำหรับการประมาณมุมเล็ก (เมื่อ $\\theta$ มีหน่วยเป็นเรเดียนและมีค่าน้อยมาก):
- $\\sin\\theta \\approx \\theta$
- $\\cos\\theta \\approx 1 - \\frac{\\theta^2}{2}$
- $(1 + x)^n \\approx 1 + nx$ (การกระจายทวินามเมื่อ $|x| \\ll 1$)
        `,
        derivations: [
          {
            id: 'deriv-small-angle-cosine',
            topicId: 'math-tools',
            titleTh: 'การพิสูจน์การประมาณค่า $\\cos\\theta \\approx 1 - \\frac{\\theta^2}{2}$ จาก First Principles',
            objectiveTh: 'หาที่มาของการประมาณค่าเทอมอันดับสองของฟังก์ชันโคไซน์ ซึ่งใช้บ่อยมากในการวิเคราะห์หลุมศักย์และพลังงานศักย์โน้มถ่วง',
            startingAssumptions: [
              {
                id: 'asm-1',
                descriptionTh: 'มุม $\\theta$ วัดในหน่วยเรเดียน (Radian)',
                significanceTh: 'สูตรอนุพันธ์ของฟังก์ชันตรีโกณมิติเป็นจริงเมื่อมุมเป็นเรเดียนเท่านั้น',
              },
              {
                id: 'asm-2',
                descriptionTh: 'มุมมีขนาดเล็กมาก ($|\\theta| \\ll 1$ rad)',
                significanceTh: 'ทำให้เทอมกำลังสามขึ้นไป ($\\mathcal{O}(\\theta^3)$) มีค่าน้อยจนตัดทิ้งได้',
              },
            ],
            steps: [
              {
                stepNumber: 1,
                titleTh: 'เขียนกระจายฟังก์ชัน $f(\\theta) = \\cos\\theta$ รอบจุด $\\theta = 0$',
                latexMath: 'f(\\theta) = f(0) + f\'(0)\\theta + \\frac{f\'\'(0)}{2!}\\theta^2 + \\frac{f\'\'\'(0)}{3!}\\theta^3 + \\dots',
                physicalIntuitionTh: 'อนุกรมเทย์เลอร์แปลงฟังก์ชันไม่เชิงเส้น (Non-linear) ให้กลายเป็นพหุนามที่คำนวณและประเมินพฤติกรรมได้ง่าย',
                mathOperationTh: 'สูตรทั่วไปของ Taylor Series รอบ $x_0 = 0$ (Maclaurin Series)',
              },
              {
                stepNumber: 2,
                titleTh: 'คำนวณอนุพันธ์แต่ละอันดับของ $\\cos\\theta$ ที่จุด $\\theta = 0$',
                latexMath: 'f(0) = \\cos(0) = 1, \\quad f\'(0) = -\\sin(0) = 0, \\quad f\'\'(0) = -\\cos(0) = -1',
                physicalIntuitionTh: 'เนื่องจากอนุพันธ์อันดับ 1 เป็น 0 แสดงว่ากราฟโคไซน์มีจุดยอดราบเรียบที่ $\\theta = 0$ การเปลี่ยนแปลงจึงเริ่มปรากฏในเทอมกำลังสอง',
                mathOperationTh: 'แทนค่าตรีโกณมิติพื้นฐาน',
                isCrucialLeap: true,
              },
              {
                stepNumber: 3,
                titleTh: 'แทนค่าสัมประสิทธิ์ลงในอนุกรม',
                latexMath: '\\cos\\theta = 1 + (0)\\theta + \\frac{-1}{2}\\theta^2 + \\mathcal{O}(\\theta^4) \\approx 1 - \\frac{\\theta^2}{2}',
                physicalIntuitionTh: 'เมื่อวัตถุเบี่ยงไปมุม $\\theta$ ความสูงที่เปลี่ยนไปของลูกตุ้มคือ $\\Delta h = L(1 - \\cos\\theta) \\approx \\frac{1}{2} L \\theta^2$ นำไปสู่พลังงานศักย์แบบควอดราติกอันเป็นหัวใจของ SHM',
                mathOperationTh: 'ตัดเทอม $\\mathcal{O}(\\theta^4)$ เนื่องจากมีค่าน้อยยิ่งยวดเมื่อ $\\theta \\to 0$',
              },
            ],
            finalResultLatex: '\\cos\\theta \\approx 1 - \\frac{\\theta^2}{2} \\quad (|\\theta| \\ll 1)',
            takeawayTh: 'เทอม $-\\frac{\\theta^2}{2}$ แสดงถึงส่วนโค้งคว่ำรอบจุดสมดุล และเป็นสะพานเชื่อมสู่การวิเคราะห์การแกว่งแบบฮาร์มอนิกอย่างง่าย',
          },
        ],
        relatedProblemIds: ['prob-math-taylor-1'],
      },
    ],
  },
  {
    id: 'kinematics-calculus',
    titleTh: '2. จลนศาสตร์ 1D & 2D ด้วยแคลคูลัส',
    subtitleTh: 'Kinematics with Calculus & Drag Forces',
    iconName: 'Activity',
    colorAccent: '#A855F7',
    descriptionTh: 'ก้าวข้าม 5 สูตรหลักมัธยมปลาย สู่การแก้สมการการเคลื่อนที่เมื่อความเร่งไม่คงตัว และแรงต้านของไหลแปรผันตามความเร็ว',
    lessons: [
      {
        id: 'lesson-kin-1',
        slug: 'calculus-kinematics-drag-force',
        topicId: 'kinematics-calculus',
        order: 1,
        titleTh: 'ความเร่งไม่คงตัว และการเคลื่อนที่ภายใต้แรงต้านอากาศ $F_{drag} = -bv$',
        summaryTh: 'พิสูจน์สมการความเร็วแบบฟังก์ชันเอกซ์โพเนนเชียล และอัตราเร็วสุดท้าย (Terminal Velocity) ด้วยการแยกตัวแปรอินทิกรัล',
        readTimeMinutes: 15,
        theoryMarkdownTh: `
ในโรงเรียน เราคุ้นเคยกับ $s = ut + \\frac{1}{2}at^2$ ซึ่งใช้ได้**เฉพาะเมื่อ $a = \\text{constant}$ เท่านั้น**

แต่ในความเป็นจริงของข้อสอบ สอวน. ฟิสิกส์ แรงและความเร่งมักขึ้นกับเวลา $a(t)$, ตำแหน่ง $a(x)$, หรือความเร็ว $a(v)$ โดยนิยามแท้จริงคือ:
$$v = \\frac{dx}{dt}, \\quad a = \\frac{dv}{dt} = v\\frac{dv}{dx}$$

### กฎลูกโซ่ที่ต้องจำให้ขึ้นใจ:
$$a = \\frac{dv}{dt} = \\frac{dv}{dx}\\frac{dx}{dt} = v\\frac{dv}{dx}$$
เมื่อความเร่งเป็นฟังก์ชันของตำแหน่ง $a(x)$ ให้เปลี่ยนเป็น $v\\frac{dv}{dx} = a(x) \\implies \\int v dv = \\int a(x) dx$ ทันที
        `,
        derivations: [
          {
            id: 'deriv-terminal-velocity-drag',
            topicId: 'kinematics-calculus',
            titleTh: 'การพิสูจน์ $v(t)$ ของอนุภาคตกอิสระภายใต้แรงต้านอากาศเชิงเส้น $F_{drag} = -bv$',
            objectiveTh: 'แก้สมการเชิงอนุพันธ์อันดับหนึ่งเพื่อหาฟังก์ชันความเร็วตามเวลา $v(t)$ และความเร็วปลายสุด $v_t$',
            startingAssumptions: [
              {
                id: 'asm-drag-1',
                descriptionTh: 'แรงต้านอากาศแปรผันตรงกับความเร็ว $F_d = -bv$ (Stokes Drag)',
                significanceTh: 'ใช้ได้สำหรับของไหลหนืดหรือความเร็วต่ำที่ Reynolds number ต่ำ',
              },
              {
                id: 'asm-drag-2',
                descriptionTh: 'ปล่อยอนุภาคมวล $m$ ตกจากหยุดนิ่งที่ $t=0$ ($v(0) = 0$)',
                significanceTh: 'เป็นเงื่อนไขเริ่มต้น (Initial Condition) ในการหาค่าคงที่ของการอินทิเกรต',
              },
            ],
            steps: [
              {
                stepNumber: 1,
                titleTh: 'เขียนสมการกฎการเคลื่อนที่ข้อที่ 2 ของนิวตันตามแนวดิ่ง (กำหนดทิศลงเป็น +)',
                latexMath: 'm\\frac{dv}{dt} = mg - bv',
                physicalIntuitionTh: 'ขณะวัตถุตกลงมา แรงโน้มถ่วงฉุดลง ($+mg$) ขณะที่แรงต้านอากาศมีทิศต้านการเคลื่อนที่ ($-bv$)',
                mathOperationTh: 'แทน $\\Sigma F = ma$ ด้วย $a = \\frac{dv}{dt}$',
              },
              {
                stepNumber: 2,
                titleTh: 'จัดรูปแยกตัวแปร (Separation of Variables)',
                latexMath: '\\frac{dv}{g - \\frac{b}{m}v} = dt \\iff \\frac{dv}{v - \\frac{mg}{b}} = -\\frac{b}{m}dt',
                physicalIntuitionTh: 'เรารวบรวมตัวแปร $v$ ให้อยู่ข้างเดียวกับ $dv$ เพื่อเตรียมอินทิเกรต',
                mathOperationTh: 'ดึงตัวร่วม $-\\frac{b}{m}$ ออกมาเพื่อให้สัมประสิทธิ์หน้า $v$ เป็น 1',
                isCrucialLeap: true,
              },
              {
                stepNumber: 3,
                titleTh: 'อินทิเกรตทั้งสองข้างจากเงื่อนไขเริ่มต้น $t=0, v=0$ ถึงเวลา $t$ ใดๆ',
                latexMath: '\\int_{0}^{v(t)} \\frac{dv\'}{v\' - \\frac{mg}{b}} = -\\int_{0}^{t} \\frac{b}{m} dt\'',
                physicalIntuitionTh: 'การใส่อนุพันธ์จำกัดเขตกำจัดการต้องบวกค่าคงที่ $C$ ที่ไม่รู้ค่า',
                mathOperationTh: '\\int \\frac{1}{u} du = \\ln|u|',
              },
              {
                stepNumber: 4,
                titleTh: 'หาผลลัพธ์ลอการิทึมและจัดรูปหา $v(t)$',
                latexMath: '\\ln\\left| \\frac{v - \\frac{mg}{b}}{-\\frac{mg}{b}} \\right| = -\\frac{b}{m}t \\implies 1 - \\frac{bv}{mg} = e^{-\\frac{b}{m}t}',
                physicalIntuitionTh: 'ฟังก์ชัน $e^{-(b/m)t}$ บ่งบอกว่าความเร่งจะค่อยๆ ลดลงแบบ Exponential เมื่อเวลาผ่านไป',
                mathOperationTh: 'Take exponential ทั้งสองข้าง ($e^{\\ln x} = x$)',
              },
              {
                stepNumber: 5,
                titleTh: 'จัดสมการให้อยู่ในรูปสำเร็จรูป',
                latexMath: 'v(t) = \\frac{mg}{b}\\left( 1 - e^{-\\frac{b}{m}t} \\right)',
                physicalIntuitionTh: 'เมื่อ $t \\to \\infty$, เทอม $e^{-\\infty} \\to 0$ ทำให้ความเร็วลู่เข้าหาค่าคงที่ที่เรียกว่า Terminal Velocity $v_t = \\frac{mg}{b}$',
                mathOperationTh: 'คูณกระจายและย้ายข้าง',
              },
            ],
            finalResultLatex: 'v(t) = v_t \\left( 1 - e^{-t/\\tau} \\right), \\quad v_t = \\frac{mg}{b}, \\quad \\tau = \\frac{m}{b}',
            takeawayTh: 'พารามิเตอร์ $\\tau = m/b$ คือ Characteristic Time Constant ที่บอกว่าอนุภาคจะเข้าใกล้ความเร็วปลายสุดเร็วเพียงใด',
          },
        ],
        relatedProblemIds: ['prob-kin-drag-1'],
      },
    ],
  },
  {
    id: 'newton-constraints',
    titleTh: '3. กฎของนิวตันและเงื่อนไขความสัมพันธ์ (Constraint Dynamics)',
    subtitleTh: 'Pulley & Wedge Kinematic Constraints',
    iconName: 'Compass',
    colorAccent: '#22C55E',
    descriptionTh: 'ปลดล็อกวิธีแก้โจทย์รอกซับซ้อน ลิ่มเคลื่อนที่ และกรอบอ้างอิงไม่เฉื่อยด้วยหลักการความยาวเชือกคงที่และการฉายความเร่ง',
    lessons: [
      {
        id: 'lesson-newton-1',
        slug: 'pulley-wedge-kinematic-constraints',
        topicId: 'newton-constraints',
        order: 1,
        titleTh: 'สมการเงื่อนไขความสัมพันธ์ของระบบรอก (String Length Invariance)',
        summaryTh: 'วิธีการตั้งพิกัดตำแหน่ง อนุพันธ์ 2 ชั้นเพื่อหาความสัมพันธ์ระหว่างความเร่ง และหลักการงานเสมือน $\\sum T_i a_i = 0$',
        readTimeMinutes: 14,
        theoryMarkdownTh: `
ในระบบกลศาสตร์ที่มีวัตถุหลายชิ้นผูกโยงกัน (เช่น มวล 3 ก้อนบนรอกเคลื่อนที่) จำนวนสมการ $\\Sigma F = ma$ มักจะไม่เพียงพอกับจำนวนตัวแปรความเร่งที่ไม่ทราบค่า

เราจำเป็นต้องหา **สมการความสัมพันธ์จลนศาสตร์ (Kinematic Constraint Equation)** จากข้อเท็จจริงทางเรขาคณิต:
1. **ความยาวเชือกคงที่:** เขียนความยาวเชือกทั้งหมดในรูปพิกัด $x_1, x_2, y_p$ แล้วดิฟเทียบเวลา 2 ครั้ง
2. **หลักการงานเสมือน (Virtual Work / Power Method):** สำหรับเชือกเบา รอกเบา งานสุทธิของแรงตึงเชือกเป็นศูนย์เสมอ:
$$\\sum \\vec{T}_i \\cdot \\vec{a}_i = 0$$
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
                titleTh: 'กำหนดแกนอ้างอิงและตำแหน่งพิกัดของแต่ละมวลและรอก',
                latexMath: 'L = y_A + 2y_P + C',
                physicalIntuitionTh: 'วัดพิกัดดิ่ง $y$ จากเพดานคงที่ลงมา มวล $A$ แขวนด้วยเชือกเส้นเดียว ส่วนรอกเคลื่อนที่ $P$ มีเชือก 2 ข้างพาดผ่าน',
                mathOperationTh: 'เขียนสมการความยาวเชือก $L$ จากเรขาคณิต',
              },
              {
                stepNumber: 2,
                titleTh: 'หาอนุพันธ์อันดับที่หนึ่งเทียบกับเวลา $t$ (ความเร็ว)',
                latexMath: '\\frac{dL}{dt} = \\frac{dy_A}{dt} + 2\\frac{dy_P}{dt} + 0 = 0 \\implies v_A + 2v_P = 0',
                physicalIntuitionTh: 'เนื่องจากความยาวเชือกไม่เปลี่ยนแปลง อัตราการเปลี่ยนแปลงความยาว $\\frac{dL}{dt}$ จึงต้องเป็นศูนย์',
                mathOperationTh: 'ดิฟเทียบ $t$ โดยที่ $\\frac{d(constant)}{dt} = 0$',
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
                mathOperationTh: 'ตั้งผลบวกของกำลังงานของแรงตึงเชือกเท่ากับ 0',
              },
            ],
            finalResultLatex: 'a_A = -2a_P \\quad \\text{หรือ} \\quad \\sum_{i} T_i a_i = 0',
            takeawayTh: 'วิธีผลรวม $T_i a_i = 0$ สามารถแก้ปัญหารอกซ้อนกี่ชั้นก็ได้โดยไม่ต้องวาดพิกัดเรขาคณิตให้เสียเวลา',
          },
        ],
        relatedProblemIds: ['prob-newton-wedge-1'],
      },
    ],
  },
  {
    id: 'work-energy-potentials',
    titleTh: '4. งาน พลังงาน และสนามอนุรักษ์ (Potential Wells)',
    subtitleTh: 'Work Integrals, Potential Functions & Equilibrium',
    iconName: 'Zap',
    colorAccent: '#F59E0B',
    descriptionTh: 'ทำความเข้าใจความสัมพันธ์ของแรงกับความชันของพลังงานศักย์ $F = -dU/dx$ และการทดสอบเสถียรภาพของจุดสมดุล',
    lessons: [
      {
        id: 'lesson-energy-1',
        slug: 'conservative-forces-potential-wells',
        topicId: 'work-energy-potentials',
        order: 1,
        titleTh: 'สนามแรงอนุรักษ์ ความชันของกราฟ $U(x)$ และการสั่นขนาดเล็ก',
        summaryTh: 'เรียนรู้การหาฟังก์ชันแรงจากเกรเดียนต์ของศักย์ และวิเคราะห์สมดุลเสถียร (Stable) เทียบกับไม่เสถียร (Unstable)',
        readTimeMinutes: 16,
        theoryMarkdownTh: `
ในระดับ สอวน. เรานิยามสนามแรงอนุรักษ์ (Conservative Force) ผ่านงานที่ไม่ขึ้นกับเส้นทาง และมีฟังก์ชันพลังงานศักย์ $U(\\vec{r})$ รองรับ:
$$W = \\int_{\\vec{r}_1}^{\\vec{r}_2} \\vec{F} \\cdot d\\vec{r} = -\\Delta U = - (U_2 - U_1)$$

ใน 1 มิติ ความสัมพันธ์ระหว่างแรงและพลังงานศักย์คือ:
$$F(x) = -\\frac{dU}{dx}$$

### การวิเคราะห์จุดสมดุล (Equilibrium Analysis):
1. **จุดสมดุล ($F = 0$):** จุดที่ความชันเป็นศูนย์ $\\frac{dU}{dx} = 0$
2. **สมดุลเสถียร (Stable Equilibrium):** $\\frac{d^2U}{dx^2} > 0$ (ก้นหลุมศักย์ กราฟหงาย) วัตถุจะแกว่งกลับมาที่เดิมเมื่อถูกรบกวน
3. **สมดุลไม่เสถียร (Unstable Equilibrium):** $\\frac{d^2U}{dx^2} < 0$ (ยอดเนิน กราฟคว่ำ)
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
                mathOperationTh: 'สูตรกระจายเทย์เลอร์',
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
        ],
        relatedProblemIds: ['prob-energy-potential-1'],
      },
    ],
  },
  {
    id: 'rotation-dynamics',
    titleTh: '5. พลศาสตร์การหมุนและวัตถุกลิ้ง (Rotational Dynamics)',
    subtitleTh: 'Inertia Integrals, Rolling & Angular Momentum',
    iconName: 'RotateCw',
    colorAccent: '#EC4899',
    descriptionTh: 'อินทิเกรตหาโมเมนต์ความเฉื่อยของรูปทรงต่อเนื่อง ทฤษฎีบทแกนขนาน และการเคลื่อนที่แบบกลิ้งโดยไม่ไถล',
    lessons: [
      {
        id: 'lesson-rot-1',
        slug: 'moment-of-inertia-calculus-rolling',
        topicId: 'rotation-dynamics',
        order: 1,
        titleTh: 'การอินทิเกรตหาโมเมนต์ความเฉื่อย และการกลิ้งบนพื้นเอียง',
        summaryTh: 'คำนวณ $I = \\int r^2 dm$ สำหรับแท่งวัตถุ แผ่นจาน และทรงกลม พร้อมวิเคราะห์แรงเสียดทานสถิตในการกลิ้ง',
        readTimeMinutes: 18,
        theoryMarkdownTh: `
ในกลศาสตร์การหมุน โมเมนต์ความเฉื่อย $I$ เทียบเท่ากับมวล $m$ ในการเลื่อนตำแหน่ง แต่ขึ้นอยู่กับการกระจายตัวของมวลรอบแกนหมุน:
$$I = \\int r^2 dm$$

### เทคนิคการตั้งตัวแปรย่อย $dm$:
- วัตถุ 1 มิติ (เส้นลวด, แท่งยาว): $dm = \\lambda dx$ โดยที่ $\\lambda = \\frac{M}{L}$
- วัตถุ 2 มิติ (แผ่นบาง): $dm = \\sigma dA$ โดยที่ $\\sigma = \\frac{M}{A}$
- วัตถุ 3 มิติ (ทรงกลม, ทรงกระบอก): $dm = \\rho dV$ โดยที่ $\\rho = \\frac{M}{V}$

### เงื่อนไขการกลิ้งโดยไม่ไถล (Rolling Without Slipping):
จุดสัมผัสกับพื้นมีความเร็วสัมพัทธ์เป็นศูนย์:
$$v_{cm} = \\omega R, \\quad a_{cm} = \\alpha R$$
        `,
        derivations: [
          {
            id: 'deriv-rod-inertia',
            topicId: 'rotation-dynamics',
            titleTh: 'การพิสูจน์โมเมนต์ความเฉื่อยของแท่งวัตถุสม่ำเสมอหมุนรอบปลาย $I = \\frac{1}{3}ML^2$',
            objectiveTh: 'แสดงวิธีการตั้งส่วนย่อย $dm$ และการอินทิเกรตตลอดความยาว',
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
                mathOperationTh: '\\int x^2 dx = \\frac{x^3}{3}',
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
        ],
        relatedProblemIds: ['prob-rot-cylinder-1'],
      },
    ],
  },
  {
    id: 'shm-differential-eq',
    titleTh: '6. การสั่นแบบฮาร์มอนิกอย่างง่ายผ่านสมการอนุพันธ์',
    subtitleTh: 'Second-Order ODEs & Energy Methods for SHM',
    iconName: 'Repeat',
    colorAccent: '#06B6D4',
    descriptionTh: 'แก้สมการ $\\ddot{x} + \\omega^2 x = 0$ ด้วยเทคนิคแคลคูลัส และวิธีพลังงานอนุรักษ์ $\\frac{dE}{dt} = 0$',
    lessons: [
      {
        id: 'lesson-shm-1',
        slug: 'shm-odes-and-energy-method',
        topicId: 'shm-differential-eq',
        order: 1,
        titleTh: 'สมการอนุพันธ์อันดับสองของ SHM และวิธีหาคาบด้วย $\\frac{dE}{dt} = 0$',
        summaryTh: 'เข้าใจผลเฉลยทั่วไป $x(t) = A\\cos(\\omega t + \\phi)$ และเทคนิคดิฟพลังงานรวมเพื่อหลีกเลี่ยงการเขียน Free-Body Diagram ซับซ้อน',
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
เทคนิคนี้ทรงพลังอย่างยิ่งในระบบที่มีทั้งการเลื่อนตำแหน่งและการหมุน!
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
                mathOperationTh: 'ตัดเทอม 1 ทิ้ง',
                isCrucialLeap: true,
              },
              {
                stepNumber: 3,
                titleTh: 'หาอนุพันธ์เทียบกับเวลา $t$ โดยใช้กฎลูกโซ่ (Chain Rule)',
                latexMath: '\\frac{dE}{dt} = \\frac{1}{2}mL^2 (2\\dot{\\theta}\\ddot{\\theta}) + \\frac{1}{2}mgL (2\\theta\\dot{\\theta}) = 0',
                physicalIntuitionTh: 'เพราะพลังงานรวมอนุรักษ์ $\\frac{dE}{dt} = 0$',
                mathOperationTh: '\\frac{d}{dt}(\\dot{\\theta}^2) = 2\\dot{\\theta}\\frac{d\\dot{\\theta}}{dt} = 2\\dot{\\theta}\\ddot{\\theta}',
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
    ],
  },
];
