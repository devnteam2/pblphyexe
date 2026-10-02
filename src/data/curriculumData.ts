// src/data/curriculumData.ts
import { Topic } from '@/types/curriculum';

export const CURRICULUM_TOPICS: Topic[] = [
  {
    id: 'math-tools',
    titleTh: '1. เครื่องมือคณิตศาสตร์สำหรับฟิสิกส์โอลิมปิก',
    subtitleTh: 'Single & Multivariable Calculus, Vectors, Coordinate Systems & Error Analysis',
    iconName: 'Binary',
    colorAccent: '#38BDF8',
    descriptionTh: 'ปูพื้นฐานแคลคูลัสตัวแปรเดี่ยวและหลายตัวแปร ตัวดำเนินการ พีชคณิตเวกเตอร์ ระบบพิกัดเชิงขั้ว การวิเคราะห์มิติ และทฤษฎีความคลาดเคลื่อน ตามโครงการตำรา สอวน. ฟิสิกส์',
    lessons: [
      {
        id: 'lesson-math-1',
        slug: 'single-variable-calculus-physics',
        topicId: 'math-tools',
        order: 1,
        titleTh: '1.1 แคลคูลัสของตัวแปรอิสระตัวเดียว (Single-Variable Calculus)',
        summaryTh: 'นิยามอนุพันธ์จากลิมิต กฎลูกโซ่ ตารางอนุพันธ์มาตรฐานและฟังก์ชันไฮเพอร์โบลิก ปริพันธ์ในฐานะอนุพันธ์ย้อนกลับ และอนุกรมเทย์เลอร์',
        readTimeMinutes: 18,
        theoryMarkdownTh: `
ในฟิสิกส์ระดับมัธยมปลายทั่วไป กฎการเคลื่อนที่มักถูกนำเสนอด้วยสูตรสำเร็จรูป เช่น $s = vt$ หรือ $v = u + at$ แต่ในฟิสิกส์โอลิมปิก สอวน. **แคลคูลัสคือภาษาธรรมชาติ** ที่ใช้อธิบายการเปลี่ยนแปลงอย่างต่อเนื่อง

### 1. อนุพันธ์ (Derivatives) และอัตราการเปลี่ยนแปลงขณะใดขณะหนึ่ง
ให้อนุภาคเคลื่อนที่โดยมีตำแหน่ง $x$ เป็นฟังก์ชันของเวลา $t$ ค่าความเร็วขณะใดขณะหนึ่งนิยามจากลิมิต:
$$\\frac{df}{dx} = \\lim_{\\Delta x \\to 0} \\frac{f(x + \\Delta x) - f(x)}{\\Delta x}$$

#### กฎพื้นฐานของอนุพันธ์ที่ต้องใช้คล่องแคล่ว:
1. **กฎผลบวก/ผลต่าง:** $\\frac{d}{dx}(u \\pm v) = \\frac{du}{dx} \\pm \\frac{dv}{dx}$
2. **กฎผลคูณ:** $\\frac{d}{dx}(uv) = u\\frac{dv}{dx} + v\\frac{du}{dx}$
3. **กฎผลหาร:** $\\frac{d}{dx}\\left(\\frac{u}{v}\\right) = \\frac{v\\frac{du}{dx} - u\\frac{dv}{dx}}{v^2}$
4. **กฎลูกโซ่ (Chain Rule):** เมื่อ $y = f(u)$ และ $u = g(x)$ จะได้:
$$\\frac{dy}{dx} = \\frac{dy}{du}\\frac{du}{dx}$$
ตัวอย่างในฟิสิกส์: การแปลงความเร่ง $a = \\frac{dv}{dt} = \\frac{dv}{dx}\\frac{dx}{dt} = v\\frac{dv}{dx}$

#### ตารางอนุพันธ์มาตรฐาน (Standard Derivatives & Hyperbolic Functions):
- $\\frac{d}{dx}(x^n) = n x^{n-1}$
- $\\frac{d}{dx}(\\sin x) = \\cos x, \\quad \\frac{d}{dx}(\\cos x) = -\\sin x, \\quad \\frac{d}{dx}(\\tan x) = \\sec^2 x$
- $\\frac{d}{dx}(e^x) = e^x, \\quad \\frac{d}{dx}(\\ln x) = \\frac{1}{x}, \\quad \\frac{d}{dx}(a^x) = a^x \\ln a$
- **ฟังก์ชันไฮเพอร์โบลิก (Hyperbolic):**
  - $\\sinh x = \\frac{e^x - e^{-x}}{2} \\implies \\frac{d}{dx}(\\sinh x) = \\cosh x$
  - $\\cosh x = \\frac{e^x + e^{-x}}{2} \\implies \\frac{d}{dx}(\\cosh x) = \\sinh x$
  - เอกลักษณ์พื้นฐาน: $\\cosh^2 x - \\sinh^2 x = 1$

---

### 2. ปริพันธ์ (Integrals) และทฤษฎีบทหลักมูล
ปริพันธ์ไม่จำกัดเขต (Indefinite Integral) ทำหน้าที่เป็น **อนุพันธ์ย้อนกลับ (Anti-derivative)**:
$$F(x) = \\int f(x) dx \\iff \\frac{dF}{dx} = f(x)$$

**ทฤษฎีบทหลักมูลของแคลคูลัส (Fundamental Theorem of Calculus):**
$$\\frac{d}{dx} \\left[ \\int_a^x f(\\xi) d\\xi \\right] = f(x)$$
เมื่อ $\\xi$ เป็นตัวแปรหุ่น (Dummy Variable)

#### เทคนิคการอินทิเกรตทีละส่วน (Integration by Parts):
ได้มาจากกฎผลคูณของการหาอนุพันธ์:
$$\\int u \\, dv = uv - \\int v \\, du$$
ใช้บ่อยเมื่อฟังก์ชันในอินทิกรัลเป็นผลคูณระหว่างพหุนามและตรีโกณมิติหรือเอกซ์โพเนนเชียล เช่น $\\int t e^{-\\gamma t} dt$ ในโจทย์การเคลื่อนที่แบบหน่วง

---

### 3. อนุกรมอนันต์และการกระจายเทย์เลอร์ (Taylor & Maclaurin Series)
เมื่อฟังก์ชัน $f(x)$ หาอนุพันธ์ได้ทุกอันดับที่จุด $x = 0$ เราสามารถกระจายฟังก์ชันเป็นอนุกรมกำลัง (Maclaurin Series):
$$f(x) = f(0) + f'(0)x + \\frac{f''(0)}{2!}x^2 + \\frac{f'''(0)}{3!}x^3 + \\dots + \\frac{f^{(n)}(0)}{n!}x^n + \\dots$$

#### อนุกรมสำคัญที่นักเรียนฟิสิกส์ สอวน. ต้องจำขึ้นใจ:
1. $e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\dots$
2. $\\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\dots$
3. $\\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\dots$
4. $\\ln(1 + x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\dots \\quad (|x| < 1)$
5. **การกระจายทวินาม (Binomial Series):**
$$(1 + x)^n = 1 + nx + \\frac{n(n-1)}{2!}x^2 + \\dots \\quad (|x| < 1)$$
เมื่อ $x \\ll 1$ เราประมาณ $(1 + x)^n \\approx 1 + nx$ ซึ่งใช้คำนวณการเปลี่ยนแปลงความเร่งโน้มถ่วงตามระดับความสูง หรือแรงดึงดูดระหว่างมวลได้อย่างรวดเร็ว
        `,
        derivations: [
          {
            id: 'deriv-math-exponential-derivative',
            topicId: 'math-tools',
            titleTh: 'การพิสูจน์อนุพันธ์ของฟังก์ชันเลขชี้กำลัง $\\frac{d}{dx}(a^x) = a^x \\ln a$ จาก First Principles',
            objectiveTh: 'พิสูจน์ที่มาของอนุพันธ์ของเลขยกกำลังฐานใดๆ $a > 0$ โดยแปลงผ่านฟังก์ชันลอการิทึมธรรมชาติและกฎลูกโซ่ ตามเนื้อหาโครงการตำรา สอวน.',
            startingAssumptions: [
              {
                id: 'asm-exp-1',
                descriptionTh: 'กำหนดให้ $y = a^x$ โดยที่ฐาน $a > 0$ และ $a \\neq 1$',
                significanceTh: 'เพื่อให้ฟังก์ชันเลขชี้กำลังนิยามได้บนเซตของจำนวนจริงทั้งหมด',
              },
              {
                id: 'asm-exp-2',
                descriptionTh: 'ใช้สมบัติของลอการิทึมธรรมชาติ $y = e^{\\ln(a^x)} = e^{x \\ln a}$',
                significanceTh: 'แปลงฐาน $a$ ให้เป็นฐานธรรมชาติ $e$ เพื่อใช้อนุพันธ์มาตรฐาน $\\frac{d}{du}(e^u) = e^u$',
              },
            ],
            steps: [
              {
                stepNumber: 1,
                titleTh: 'ใส่ลอการิทึมธรรมชาติ $\\ln$ ทั้งสองข้างของสมการ',
                latexMath: '\\ln y = \\ln(a^x) = x \\ln a',
                physicalIntuitionTh: 'การใส่ลอการิทึมแปลงเลขชี้กำลังบนตัวแปร $x$ ให้ตกลงมาเป็นตัวคูณ ทำให้เราสามารถใช้อนุพันธ์แบบแฝง (Implicit Differentiation) ได้โดยตรง',
                mathOperationTh: 'สมบัติของลอการิทึม $\\ln(u^r) = r\\ln u$',
              },
              {
                stepNumber: 2,
                titleTh: 'หาอนุพันธ์เทียบกับ $x$ ทั้งสองข้างโดยใช้กฎลูกโซ่',
                latexMath: '\\frac{d}{dx}(\\ln y) = \\frac{d}{dx}(x \\ln a)',
                physicalIntuitionTh: 'เนื่องจาก $\\ln a$ เป็นค่าคงตัว อนุพันธ์ทางขวาจึงเท่ากับ $\\ln a$ โดยตรง ส่วนทางซ้าย $y$ เป็นฟังก์ชันของ $x$ จึงต้องใช้กฎลูกโซ่',
                mathOperationTh: 'กฎลูกโซ่ $\\frac{d}{dx}(\\ln y) = \\frac{1}{y}\\frac{dy}{dx}$',
                isCrucialLeap: true,
              },
              {
                stepNumber: 3,
                titleTh: 'จัดรูปหา $\\frac{dy}{dx}$',
                latexMath: '\\frac{1}{y} \\frac{dy}{dx} = \\ln a \\implies \\frac{dy}{dx} = y \\ln a',
                physicalIntuitionTh: 'อัตราการเปลี่ยนแปลงของฟังก์ชันเลขชี้กำลังจะแปรผันตรงกับค่าของตัวมันเองเสมอ ($y$) คูณด้วยตัวถ่วงน้ำหนักตามธรรมชาติ $\\ln a$',
                mathOperationTh: 'คูณ $y$ ตลอดทั้งสองข้าง',
              },
              {
                stepNumber: 4,
                titleTh: 'แทนค่า $y = a^x$ กลับคืนลงในสมการ',
                latexMath: '\\frac{d}{dx}(a^x) = a^x \\ln a',
                physicalIntuitionTh: 'ในกรณีพิเศษเมื่อ $a = e$ จะได้ $\\ln e = 1$ ส่งผลให้ $\\frac{d}{dx}(e^x) = e^x$ ซึ่งเป็นฟังก์ชันเดียวที่มีค่าเท่ากับอนุพันธ์ของตัวเอง',
                mathOperationTh: 'แทนตัวแปรเดิมเพื่อได้สูตรสำเร็จ',
              },
            ],
            finalResultLatex: '\\frac{d}{dx}(a^x) = a^x \\ln a',
            takeawayTh: 'ฟังก์ชันเลขชี้กำลัง $a^x$ มีอนุพันธ์ที่คงรูปเดิมแต่คูณด้วย $\\ln a$ ซึ่งจำเป็นมากในการวิเคราะห์การสลายตัวของกัมมันตรังสีและวงจรไฟฟ้า RC',
          },
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
      {
        id: 'lesson-math-2',
        slug: 'multivariable-calculus-operators',
        topicId: 'math-tools',
        order: 2,
        titleTh: '1.2 แคลคูลัสหลายตัวแปร ตัวดำเนินการ และผลต่างรวม (Multivariable Calculus & Operators)',
        summaryTh: 'อนุพันธ์ย่อย ลำดับการดำเนินการ ความไม่สลับที่ของตัวดำเนินการอนุพันธ์ (Commutator) และผลต่างรวมสำหรับการประมาณค่าฟิสิกส์หลายมิติ',
        readTimeMinutes: 16,
        theoryMarkdownTh: `
ในโลกความเป็นจริง ปริมาณทางฟิสิกส์ส่วนใหญ่มักขึ้นอยู่กับตัวแปรมากกว่าหนึ่งตัว เช่น ศักย์ไฟฟ้า $V(x, y, z)$ หรือสนามอุณหภูมิ $T(x, y, z, t)$

### 1. อนุพันธ์ย่อย (Partial Derivatives)
เมื่อฟังก์ชัน $f(x, y)$ ขึ้นกับสองตัวแปรอิสระ การหาอัตราการเปลี่ยนแปลงเมื่อ $x$ เปลี่ยนไปโดยตรึงให้ $y$ คงที่ นิยามด้วย:
$$\\frac{\\partial f}{\\partial x} = \\lim_{\\Delta x \\to 0} \\frac{f(x + \\Delta x, y) - f(x, y)}{\\Delta x}$$
ในทำนองเดียวกัน สำหรับการเปลี่ยนแปลงตามแกน $y$:
$$\\frac{\\partial f}{\\partial y} = \\lim_{\\Delta y \\to 0} \\frac{f(x, y + \\Delta y) - f(x, y)}{\\Delta y}$$

#### ทฤษฎีความสมมาตรของอนุพันธ์อันดับสอง (Clairaut's Theorem):
ถ้าอนุพันธ์ย่อยอันดับสองมีความต่อเนื่อง ลำดับการหาอนุพันธ์ย่อยจะไม่มีผลต่อค่าลัพธ์:
$$\\frac{\\partial^2 f}{\\partial x \\partial y} = \\frac{\\partial}{\\partial x}\\left(\\frac{\\partial f}{\\partial y}\\right) = \\frac{\\partial}{\\partial y}\\left(\\frac{\\partial f}{\\partial x}\\right) = \\frac{\\partial^2 f}{\\partial y \\partial x}$$
สมบัตินี้เป็นหัวใจของการตรวจสอบสนามอนุรักษ์ (Conservative Field) $\\vec{\\nabla} \\times \\vec{F} = 0$

---

### 2. ตัวดำเนินการอนุพันธ์ (Differential Operators) และการไม่สลับที่
ในคณิตศาสตร์ฟิสิกส์ สัญลักษณ์ $\\frac{\\partial}{\\partial x}$ ถือเป็น **ตัวดำเนินการ (Operator)** ซึ่งทำหน้าที่เปลี่ยนฟังก์ชันหนึ่งให้เป็นอีกฟังก์ชันหนึ่ง

เมื่อกระทำร่วมกับการคูณด้วยพิกัด $x$ ตัวดำเนินการอนุพันธ์ **ไม่สลับที่กัน (Non-commutative)**:
$$\\left[ \\frac{\\partial}{\\partial x}, x \\right] f \\equiv \\frac{\\partial}{\\partial x}(x f) - x \\frac{\\partial f}{\\partial x} = f$$
ดังนั้น ตัวดำเนินการคอมมิวเตเตอร์:
$$\\left[ \\frac{\\partial}{\\partial x}, x \\right] = 1$$
เอกลักษณ์นี้เป็นรากฐานของความสัมพันธ์ความไม่แน่นอนไฮเซนแบร์ก (Heisenberg Uncertainty Principle) $[\\hat{p}_x, \\hat{x}] = -i\\hbar$ ในกลศาสตร์ควอนตัม

---

### 3. ผลต่างรวม (Total Differential) และการประมาณค่า
เมื่อตัวแปรอิสระ $x$ และ $y$ มีการเปลี่ยนแปลงไปพร้อมกันเป็น $\\Delta x$ และ $\\Delta y$ การเปลี่ยนแปลงของฟังก์ชัน $f$ คือ:
$$df = \\left( \\frac{\\partial f}{\\partial x} \\right) dx + \\left( \\frac{\\partial f}{\\partial y} \\right) dy$$

สำหรับการประมาณค่าเมื่อการเปลี่ยนแปลงมีขนาดเล็ก:
$$\\Delta f \\approx \\frac{\\partial f}{\\partial x} \\Delta x + \\frac{\\partial f}{\\partial y} \\Delta y$$
ซึ่งเป็นสมการแกนหลักในการวิเคราะห์การถ่ายทอดความคลาดเคลื่อนของการทดลอง (Error Propagation)
        `,
        derivations: [
          {
            id: 'deriv-math-operator-commutator',
            topicId: 'math-tools',
            titleTh: 'การพิสูจน์ความไม่สลับที่ของตัวดำเนินการอนุพันธ์ $\\left[\\frac{\\partial}{\\partial x}, x\\right]f = f$',
            objectiveTh: 'พิสูจน์สมบัติพีชคณิตของตัวดำเนินการอนุพันธ์ตามตำรา สอวน. เพื่อสร้างความเข้าใจเชิงโครงสร้างของคณิตศาสตร์ฟิสิกส์',
            startingAssumptions: [
              {
                id: 'asm-op-1',
                descriptionTh: 'กำหนดให้ $f(x)$ เป็นฟังก์ชันใดๆ ที่สามารถหาอนุพันธ์เทียบกับ $x$ ได้',
                significanceTh: 'ฟังก์ชันทดสอบ (Test Function) ใช้ในการหาผลลัพธ์ของการกระทำของตัวดำเนินการ',
              },
              {
                id: 'asm-op-2',
                descriptionTh: 'นิยามของคอมมิวเตเตอร์ $[\\hat{A}, \\hat{B}]f = \\hat{A}(\\hat{B}f) - \\hat{B}(\\hat{A}f)$',
                significanceTh: 'วัดว่าลำดับการกระทำของตัวดำเนินการส่งผลต่อคำตอบหรือไม่',
              },
            ],
            steps: [
              {
                stepNumber: 1,
                titleTh: 'กระจายผลการกระทำของตัวดำเนินการก้อนแรก $\\frac{\\partial}{\\partial x}(xf)$',
                latexMath: '\\frac{\\partial}{\\partial x}(x f) = \\left(\\frac{\\partial x}{\\partial x}\\right) f + x \\left(\\frac{\\partial f}{\\partial x}\\right) = 1 \\cdot f + x \\frac{\\partial f}{\\partial x}',
                physicalIntuitionTh: 'เนื่องจาก $x$ และ $f$ ต่างก็ขึ้นกับ $x$ จึงต้องใช้กฎผลคูณของการหาอนุพันธ์ในการกระจาย',
                mathOperationTh: 'กฎผลคูณ $\\frac{d}{dx}(uv) = u\'v + uv\'$',
              },
              {
                stepNumber: 2,
                titleTh: 'เขียนก้อนที่สองของการดำเนินการ $x \\frac{\\partial f}{\\partial x}$',
                latexMath: 'x \\frac{\\partial}{\\partial x}(f) = x \\frac{\\partial f}{\\partial x}',
                physicalIntuitionTh: 'ก้อนนี้คือการหาอนุพันธ์ของฟังก์ชัน $f$ ก่อน แล้วค่อยนำพิกัด $x$ มาคูณด้านหน้า',
                mathOperationTh: 'การคูณธรรมดา',
              },
              {
                stepNumber: 3,
                titleTh: 'นำทั้งสองเทอมมาลบกันตามนิยามของคอมมิวเตเตอร์',
                latexMath: '\\left( \\frac{\\partial}{\\partial x}x - x\\frac{\\partial}{\\partial x} \\right) f = \\left( f + x \\frac{\\partial f}{\\partial x} \\right) - x \\frac{\\partial f}{\\partial x} = f',
                physicalIntuitionTh: 'เทอม $x \\frac{\\partial f}{\\partial x}$ หักล้างกันไปหมด เหลือเพียงฟังก์ชัน $f$ ตัวเดิม ซึ่งเทียบเท่ากับการคูณด้วยเอกลักษณ์ 1',
                mathOperationTh: 'ลบพีชคณิต',
                isCrucialLeap: true,
              },
            ],
            finalResultLatex: '\\left[ \\frac{\\partial}{\\partial x}, x \\right] = 1',
            takeawayTh: 'ตัวดำเนินการอนุพันธ์และการคูณด้วยพิกัดไม่สลับที่กัน ผลต่างของลำดับการกระทำคือการคูณด้วย 1 ซึ่งสะท้อนธรรมชาติของการวัดในฟิสิกส์ชั้นสูง',
          },
          {
            id: 'deriv-math-total-differential',
            topicId: 'math-tools',
            titleTh: 'การหาผลต่างรวม $df$ และการประมาณค่าการเปลี่ยนแปลง $\\Delta f$',
            objectiveTh: 'พิสูจน์ที่มาของผลต่างรวมของฟังก์ชันหลายตัวแปร เพื่อนำไปใช้คำนวณการเปลี่ยนแปลงความดัน ปริมาตร หรือพลังงาน',
            startingAssumptions: [
              {
                id: 'asm-td-1',
                descriptionTh: 'ฟังก์ชัน $f(x, y)$ มีอนุพันธ์ย่อยที่ต่อเนื่องในบริเวณรอบจุด $(x, y)$',
                significanceTh: 'เพื่อให้ทฤษฎีบทการประมาณเชิงเส้น (Linear Approximation) เป็นจริง',
              },
            ],
            steps: [
              {
                stepNumber: 1,
                titleTh: 'เขียนการเปลี่ยนแปลงรวม $\\Delta f = f(x + \\Delta x, y + \\Delta y) - f(x, y)$',
                latexMath: '\\Delta f = [f(x + \\Delta x, y + \\Delta y) - f(x, y + \\Delta y)] + [f(x, y + \\Delta y) - f(x, y)]',
                physicalIntuitionTh: 'แยกการเปลี่ยนแปลงพร้อมกันออกเป็นสองทอด ทอดแรกให้ $x$ เปลี่ยนโดยตรึง $y$, ทอดที่สองให้ $y$ เปลี่ยนโดยตรึง $x$',
                mathOperationTh: 'บวกเข้าและลบออกด้วยเทอม $f(x, y + \\Delta y)$',
              },
              {
                stepNumber: 2,
                titleTh: 'ประยุกต์ใช้นิยามของอนุพันธ์ย่อยเมื่อ $\\Delta x, \\Delta y \\to 0$',
                latexMath: 'f(x + \\Delta x, y + \\Delta y) - f(x, y + \\Delta y) \\approx \\frac{\\partial f}{\\partial x} \\Delta x, \\quad f(x, y + \\Delta y) - f(x, y) \\approx \\frac{\\partial f}{\\partial y} \\Delta y',
                physicalIntuitionTh: 'เมื่อการก้าวสั้นมากๆ อัตราการเปลี่ยนแปลงบนแต่ละแกนจะเท่ากับความชันย่อยคูณด้วยระยะก้าวบนแกนนั้น',
                mathOperationTh: 'การประมาณเชิงเส้นอันดับหนึ่ง',
                isCrucialLeap: true,
              },
              {
                stepNumber: 3,
                titleTh: 'รวมผลต่างและเขียนในรูปลิมิตเชิงอนุพันธ์ (Total Differential)',
                latexMath: 'df = \\left( \\frac{\\partial f}{\\partial x} \\right) dx + \\left( \\frac{\\partial f}{\\partial y} \\right) dy',
                physicalIntuitionTh: 'การเปลี่ยนแปลงรวมของระบบเกิดจากผลรวมเชิงเส้นของการเปลี่ยนแปลงตามแต่ละองศาอิสระ',
                mathOperationTh: 'แทนค่าผลรวมในสัญลักษณ์เชิงอนุพันธ์ $dx, dy$',
              },
            ],
            finalResultLatex: 'df = \\frac{\\partial f}{\\partial x} dx + \\frac{\\partial f}{\\partial y} dy',
            takeawayTh: 'ผลต่างรวมเป็นเครื่องมือหลักในการหางานในอุณหพลศาสตร์ ($dW = P dV$) และการคำนวณการกระจายความคลาดเคลื่อน',
          },
        ],
        relatedProblemIds: ['prob-math-error-rect'],
      },
      {
        id: 'lesson-math-3',
        slug: 'vector-algebra-coordinate-systems',
        topicId: 'math-tools',
        order: 3,
        titleTh: '1.3 พีชคณิตเวกเตอร์และระบบพิกัดในฟิสิกส์ (Vector Algebra & Coordinate Systems)',
        summaryTh: 'เวกเตอร์ 3 มิติ โคไซน์ระบุทิศทาง ดอทโปรดักต์ ครอสโปรดักต์ผ่านดีเทอร์มิแนนต์ และอนุพันธ์ของเวกเตอร์หนึ่งหน่วยในพิกัดเชิงขั้ว',
        readTimeMinutes: 20,
        theoryMarkdownTh: `
ในฟิสิกส์ ปริมาณหลายอย่างมีทั้งขนาดและทิศทาง การเลือกพิกัดที่เหมาะสมกับความสมมาตรของโจทย์จะช่วยลดความซับซ้อนของการคำนวณลงอย่างมหาศาล

### 1. เวกเตอร์บอกตำแหน่งและโคไซน์ระบุทิศทาง (Direction Cosines)
เวกเตอร์ตำแหน่งในพิกัดคาร์ทีเซียน 3 มิติ:
$$\\vec{r} = x\\hat{i} + y\\hat{j} + z\\hat{k}$$
ขนาดของเวกเตอร์คือ $r = |\\vec{r}| = \\sqrt{x^2 + y^2 + z^2}$

ถ้าเวกเตอร์ $\\vec{r}$ ทำมุม $\\alpha, \\beta, \\gamma$ กับแกน $+x, +y, +z$ ตามลำดับ ค่า **Direction Cosines** คือ:
$$\\cos\\alpha = \\frac{x}{r}, \\quad \\cos\\beta = \\frac{y}{r}, \\quad \\cos\\gamma = \\frac{z}{r}$$
**เอกลักษณ์สำคัญ:**
$$\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = \\frac{x^2 + y^2 + z^2}{r^2} = 1$$
เวกเตอร์หนึ่งหน่วยในทิศทางของ $\\vec{r}$ จึงเขียนได้เป็น $\\hat{u} = \\cos\\alpha \\hat{i} + \\cos\\beta \\hat{j} + \\cos\\gamma \\hat{k}$

---

### 2. ผลคูณสเกลาร์และเวกเตอร์ (Dot & Cross Product)
- **Scalar (Dot) Product:** ให้ผลลัพธ์เป็นสเกลาร์ สะท้อนการฉายเงาขนาน:
$$\\vec{A} \\cdot \\vec{B} = AB\\cos\\theta = A_x B_x + A_y B_y + A_z B_z$$
ถ้า $\\vec{A} \\cdot \\vec{B} = 0$ แสดงว่าเวกเตอร์ทั้งสองตั้งฉากกัน

- **Vector (Cross) Product:** ให้ผลลัพธ์เป็นเวกเตอร์ที่ตั้งฉากกับระนาบของทั้งสองเวกเตอร์:
$$\\vec{A} \\times \\vec{B} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ A_x & A_y & A_z \\\\ B_x & B_y & B_z \\end{vmatrix} = (A_y B_z - A_z B_y)\\hat{i} - (A_x B_z - A_z B_x)\\hat{j} + (A_x B_y - A_y B_x)\\hat{k}$$
ขนาด $|\vec{A} \\times \\vec{B}| = AB\\sin\\theta$ เท่ากับพื้นที่ของรูปสี่เหลี่ยมด้านขนานที่เกิดจากเวกเตอร์ทั้งสอง

---

### 3. ระบบพิกัดเชิงขั้วระนาบ (Plane Polar Coordinates)
ในการเคลื่อนที่แบบหมุน วงกลม หรือโคจร พิกัดเชิงขั้ว $(r, \\theta)$ สะดวกกว่าพิกัดคาร์ทีเซียนมาก:
$$x = r\\cos\\theta, \\quad y = r\\sin\\theta$$

เวกเตอร์หนึ่งหน่วยในแนวรัศมี $\\hat{u}_r$ และแนวสัมผัส $\\hat{u}_\\theta$:
$$\\hat{u}_r = \\cos\\theta \\hat{i} + \\sin\\theta \\hat{j}$$
$$\\hat{u}_\\theta = -\\sin\\theta \\hat{i} + \\cos\\theta \\hat{j}$$

**จุดสำคัญที่สุดในฟิสิกส์ สอวน.:** เวกเตอร์หนึ่งหน่วย $\\hat{u}_r$ และ $\\hat{u}_\\theta$ **ไม่ใช่เวกเตอร์คงตัว** แต่ทิศทางของมันหมุนไปตามเวลา!
$$\\frac{d\\hat{u}_r}{dt} = \\dot{\\theta}\\hat{u}_\\theta, \\quad \\frac{d\\hat{u}_\\theta}{dt} = -\\dot{\\theta}\\hat{u}_r$$
การหาอนุพันธ์ของเวกเตอร์บอกตำแหน่ง $\\vec{r} = r\\hat{u}_r$ เทียบกับเวลา จึงให้:
- **ความเร็ว:** $\\vec{v} = \\dot{r}\\hat{u}_r + r\\dot{\\theta}\\hat{u}_\\theta$
- **ความเร่ง:** $\\vec{a} = (\\ddot{r} - r\\dot{\\theta}^2)\\hat{u}_r + (r\\ddot{\\theta} + 2\\dot{r}\\dot{\\theta})\\hat{u}_\\theta$
โดยที่ $-r\\dot{\\theta}^2$ คือความเร่งสู่ศูนย์กลาง และ $2\\dot{r}\\dot{\\theta}$ คือความเร่งโคริโอลิส (Coriolis Acceleration)
        `,
        derivations: [
          {
            id: 'deriv-math-cross-product-normal',
            topicId: 'math-tools',
            titleTh: 'การหาเวกเตอร์ตั้งฉากร่วมของสองเวกเตอร์ $\\vec{A}$ และ $\\vec{B}$ ด้วย Cross Product',
            objectiveTh: 'พิสูจน์วิธีการหาเวกเตอร์หนึ่งหน่วยที่ตั้งฉากกับระนาบที่บรรจุเวกเตอร์ $\\vec{A}$ และ $\\vec{B}$ ตามตัวอย่าง 1.2 ในตำรา สอวน. ฟิสิกส์',
            startingAssumptions: [
              {
                id: 'asm-cp-1',
                descriptionTh: 'กำหนดเวกเตอร์ $\\vec{A} = 2\\hat{i} - \\hat{j} + 3\\hat{k}$ และ $\\vec{B} = \\hat{i} + 2\\hat{j} - \\hat{k}$',
                significanceTh: 'เวกเตอร์สองตัวที่ไม่ขนานกันจะกำหนดระนาบขึ้นหนึ่งระนาบเสมอ',
              },
              {
                id: 'asm-cp-2',
                descriptionTh: 'เวกเตอร์ที่ตั้งฉากกับทั้ง $\\vec{A}$ และ $\\vec{B}$ คือเวกเตอร์ในแนว $\\vec{A} \\times \\vec{B}$',
                significanceTh: 'นิยามของ Cross Product รับประกันการตั้งฉากทางเรขาคณิตกับเวกเตอร์ตั้งต้นทั้งสอง',
              },
            ],
            steps: [
              {
                stepNumber: 1,
                titleTh: 'ตั้งเมทริกซ์ดีเทอร์มิแนนต์ $3 \\times 3$ ของ $\\vec{A} \\times \\vec{B}$',
                latexMath: '\\vec{C} = \\vec{A} \\times \\vec{B} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 2 & -1 & 3 \\\\ 1 & 2 & -1 \\end{vmatrix}',
                physicalIntuitionTh: 'การตั้งดีเทอร์มิแนนต์เป็นระเบียบวิธีที่ป้องกันการสับสนเรื่องเครื่องหมายของผลคูณไขว้',
                mathOperationTh: 'กระจายโคแฟกเตอร์ตามแถวแรก',
              },
              {
                stepNumber: 2,
                titleTh: 'คำนวณแต่ละองค์ประกอบย่อยตามแนว $\\hat{i}, \\hat{j}, \\hat{k}$',
                latexMath: '\\vec{C} = [(-1)(-1) - (3)(2)]\\hat{i} - [(2)(-1) - (3)(1)]\\hat{j} + [(2)(2) - (-1)(1)]\\hat{k}',
                physicalIntuitionTh: 'คำนวณพื้นที่ภาพฉายบนแต่ละระนาบพิกัด $yz, xz, xy$',
                mathOperationTh: 'คูณไขว้เมทริกซ์ย่อย $2 \\times 2$',
              },
              {
                stepNumber: 3,
                titleTh: 'รวมผลลัพธ์เวกเตอร์ผลคูณไขว้',
                latexMath: '\\vec{C} = (1 - 6)\\hat{i} - (-2 - 3)\\hat{j} + (4 + 1)\\hat{k} = -5\\hat{i} + 5\\hat{j} + 5\\hat{k}',
                physicalIntuitionTh: 'ตรวจสอบด้วย Dot Product: $\\vec{C} \\cdot \\vec{A} = (-5)(2) + (5)(-1) + (5)(3) = -10 - 5 + 15 = 0$ ซึ่งตั้งฉากอย่างสมบูรณ์',
                mathOperationTh: 'บวกลบเลขพีชคณิต',
                isCrucialLeap: true,
              },
              {
                stepNumber: 4,
                titleTh: 'หาเวกเตอร์หนึ่งหน่วยตั้งฉาก $\\hat{n}$',
                latexMath: '|\\vec{C}| = \\sqrt{(-5)^2 + 5^2 + 5^2} = \\sqrt{75} = 5\\sqrt{3} \\implies \\hat{n} = \\frac{\\vec{C}}{|\\vec{C}|} = \\frac{-\\hat{i} + \\hat{j} + \\hat{k}}{\\sqrt{3}}',
                physicalIntuitionTh: 'ถ้าต้องการเวกเตอร์ขนาด $K$ หน่วยที่ตั้งฉากกับระนาบ เพียงแค่นำ $K$ มาคูณกับ $\\hat{n}$',
                mathOperationTh: 'หารด้วยขนาดของเวกเตอร์',
              },
            ],
            finalResultLatex: '\\hat{n} = \\pm \\frac{-\\hat{i} + \\hat{j} + \\hat{k}}{\\sqrt{3}}',
            takeawayTh: 'Cross Product ให้เวกเตอร์แนวฉากของระนาบ ซึ่งมีบทบาทสำคัญในการหาทอร์ก โมเมนตัมเชิงมุม และแรงแม่เหล็ก Lorentz $\\vec{F} = q(\\vec{v} \\times \\vec{B})$',
          },
          {
            id: 'deriv-math-polar-unit-vector-derivatives',
            topicId: 'math-tools',
            titleTh: 'การพิสูจน์อนุพันธ์ของเวกเตอร์หนึ่งหน่วยในพิกัดเชิงขั้ว $\\dot{\\hat{u}}_r = \\dot{\\theta}\\hat{u}_\\theta$ และ $\\dot{\\hat{u}}_\\theta = -\\dot{\\theta}\\hat{u}_r$',
            objectiveTh: 'พิสูจน์การหมุนของแกนอ้างอิงเชิงขั้ว ซึ่งเป็นรากฐานของความเร่งสู่ศูนย์กลาง $r\\dot{\\theta}^2$ และความเร่งโคริโอลิส $2\\dot{r}\\dot{\\theta}$',
            startingAssumptions: [
              {
                id: 'asm-pol-1',
                descriptionTh: 'เวกเตอร์หนึ่งหน่วยคาร์ทีเซียน $\\hat{i}, \\hat{j}$ มีขนาดและทิศทางคงที่ตลอดเวลา ($\\frac{d\\hat{i}}{dt} = 0, \\frac{d\\hat{j}}{dt} = 0$)',
                significanceTh: 'ทำให้เราสามารถกระจายอนุพันธ์ผ่านกฎลูกโซ่บนมุม $\\theta(t)$ ได้โดยตรง',
              },
              {
                id: 'asm-pol-2',
                descriptionTh: '$\\hat{u}_r = \\cos\\theta\\hat{i} + \\sin\\theta\\hat{j}$ และ $\\hat{u}_\\theta = -\\sin\\theta\\hat{i} + \\cos\\theta\\hat{j}$',
                significanceTh: 'นิยามการแปลงพิกัดเชิงเรขาคณิตระหว่างคาร์ทีเซียนและเชิงขั้ว',
              },
            ],
            steps: [
              {
                stepNumber: 1,
                titleTh: 'หาอนุพันธ์เทียบกับเวลา $t$ ของ $\\hat{u}_r$ โดยใช้กฎลูกโซ่',
                latexMath: '\\frac{d\\hat{u}_r}{dt} = \\frac{d}{dt}(\\cos\\theta\\hat{i} + \\sin\\theta\\hat{j}) = \\left( \\frac{d\\cos\\theta}{d\\theta} \\frac{d\\theta}{dt} \\right)\\hat{i} + \\left( \\frac{d\\sin\\theta}{d\\theta} \\frac{d\\theta}{dt} \\right)\\hat{j}',
                physicalIntuitionTh: 'เนื่องจาก $\\theta$ เปลี่ยนแปลงตามเวลา $t$ ทุกฟังก์ชันตรีโกณมิติจึงต้องดิฟเทียบ $\\theta$ แล้วคูณด้วยอัตราเร็วเชิงมุม $\\dot{\\theta}$',
                mathOperationTh: 'กฎลูกโซ่',
              },
              {
                stepNumber: 2,
                titleTh: 'คำนวณอนุพันธ์ตรีโกณมิติและดึงตัวร่วม $\\dot{\\theta}$',
                latexMath: '\\frac{d\\hat{u}_r}{dt} = (-\\sin\\theta \\dot{\\theta})\\hat{i} + (\\cos\\theta \\dot{\\theta})\\hat{j} = \\dot{\\theta}(-\\sin\\theta\\hat{i} + \\cos\\theta\\hat{j})',
                physicalIntuitionTh: 'สังเกตว่าเวกเตอร์ในวงเล็บ $(-\\sin\\theta\\hat{i} + \\cos\\theta\\hat{j})$ มีทิศตั้งฉากกับแนวรัศมีพอดี ซึ่งตรงกับนิยามของ $\\hat{u}_\\theta$',
                mathOperationTh: 'ดึงตัวร่วม $\\dot{\\theta}$',
                isCrucialLeap: true,
              },
              {
                stepNumber: 3,
                titleTh: 'สรุปผลอนุพันธ์ของ $\\hat{u}_r$',
                latexMath: '\\frac{d\\hat{u}_r}{dt} = \\dot{\\theta} \\hat{u}_\\theta',
                physicalIntuitionTh: 'เวกเตอร์หนึ่งหน่วยแนวรัศมีจะเปลี่ยนทิศทางไปในแนวสัมผัสด้วยอัตราที่แปรผันตรงกับความเร็วเชิงมุม $\\dot{\\theta}$',
                mathOperationTh: 'แทนค่าเวกเตอร์หนึ่งหน่วย $\\hat{u}_\\theta$',
              },
              {
                stepNumber: 4,
                titleTh: 'หาอนุพันธ์ของเวกเตอร์แนวสัมผัส $\\hat{u}_\\theta$ ในทำนองเดียวกัน',
                latexMath: '\\frac{d\\hat{u}_\\theta}{dt} = \\frac{d}{dt}(-\\sin\\theta\\hat{i} + \\cos\\theta\\hat{j}) = -\\dot{\\theta}(\\cos\\theta\\hat{i} + \\sin\\theta\\hat{j}) = -\\dot{\\theta}\\hat{u}_r',
                physicalIntuitionTh: 'เครื่องหมายลบแสดงว่าการเปลี่ยนแปลงของเวกเตอร์แนวสัมผัสจะชี้เข้าหาจุดศูนย์กลาง ($-\\hat{u}_r$) ซึ่งเป็นจุดกำเนิดของแรงสู่ศูนย์กลางในฟิสิกส์!',
                mathOperationTh: 'ดึงตัวร่วม $-\\dot{\\theta}$ และแทนค่า $\\hat{u}_r$',
              },
            ],
            finalResultLatex: '\\dot{\\hat{u}}_r = \\dot{\\theta}\\hat{u}_\\theta, \\quad \\dot{\\hat{u}}_\\theta = -\\dot{\\theta}\\hat{u}_r',
            takeawayTh: 'อนุพันธ์ของเวกเตอร์หนึ่งหน่วยในพิกัดเชิงขั้วให้ความเข้าใจลึกซึ้งว่าทำไมการเคลื่อนที่ในแนววงกลมจึงมีความเร่งสู่ศูนย์กลาง $a_r = -r\\dot{\\theta}^2$ แม้ว่าอัตราเร็วเชิงมุมจะคงที่',
          },
        ],
        relatedProblemIds: ['prob-math-vector-crossprod'],
      },
      {
        id: 'lesson-math-4',
        slug: 'dimensional-analysis-error-propagation',
        topicId: 'math-tools',
        order: 4,
        titleTh: '1.4 การวิเคราะห์เชิงมิติและความคลาดเคลื่อนในการทดลอง (Dimensional Analysis & Error Propagation)',
        summaryTh: 'มิติมูลฐาน $[M], [L], [T]$ การสร้างสูตรฟิสิกส์ด้วยมิติ กฎของสโตกส์ การพิสูจน์ค่าเฉลี่ยเลขคณิตด้วยแคลคูลัส และการถ่ายทอดความคลาดเคลื่อน',
        readTimeMinutes: 18,
        theoryMarkdownTh: `
ในฟิสิกส์เชิงทฤษฎีและการทดลอง สองทักษะสำคัญที่แยกนักเรียนที่เข้าใจฟิสิกส์ออกจากคนท่องสูตร คือ **การวิเคราะห์มิติ (Dimensional Analysis)** และ **การประเมินความคลาดเคลื่อน (Error Analysis)**

### 1. การวิเคราะห์มิติ (Dimensional Analysis)
ปริมาณทางกลศาสตร์ทั้งหมดสร้างขึ้นจากมิติมูลฐาน 3 ตัว:
- มวล (Mass): $[M]$
- ความยาว (Length): $[L]$
- เวลา (Time): $[T]$

**หลักความสม่ำเสมอของมิติ (Dimensional Homogeneity):**
สมการฟิสิกส์ที่ถูกต้อง ทั้งสองข้างของเครื่องหมายเท่ากับและทุกพจน์ที่นำมาบวกลบกัน **ต้องมีมิติเดียวกันเสมอ**

#### ตัวอย่างการหาสูตรแรงต้านทานของไหล:
- เมื่อวัตถุเคลื่อนที่เร็วในของไหล แรงต้านเกิดจากความเฉื่อย $F \\propto \\rho^a R^b v^c$ การเทียบมิติจะได้ $a=1, b=2, c=2 \\implies F \\propto \\rho R^2 v^2$
- เมื่อวัตถุเคลื่อนที่ช้ามาก แรงต้านเกิดจากความหนืด (Viscosity $\\eta$ มีมิติ $[M L^{-1} T^{-1}]$) จะได้กฎของสโตกส์ $F \\propto \\eta R v$

---

### 2. ชนิดของความคลาดเคลื่อน (Errors in Measurement)
1. **ความคลาดเคลื่อนแบบสม่ำเสมอ (Systematic Error):** เกิดจากเครื่องมือวัดที่ไม่ได้คาลิเบรต หรือจุดศูนย์คลาดเคลื่อน เช่น ไม้บรรทัดยืดออก ทำให้ค่าที่วัดได้เบี่ยงเบนไปในทิศทางเดิมเสมอ (ส่งผลต่อ Accuracy)
2. **ความคลาดเคลื่อนแบบสุ่ม (Random Error):** เกิดจากสภาพแวดล้อมที่ควบคุมไม่ได้ เช่น ลมพัด อุณหภูมิแกว่ง หรือสายตาคนอ่าน ทำให้ค่ากระจายตัวรอบค่าจริง (ส่งผลต่อ Precision) การวัดซ้ำหลายๆ ครั้งแล้วหา **ค่าเฉลี่ยเลขคณิต (Arithmetic Mean)** สามารถลดผลของความคลาดเคลื่อนนี้ได้

---

### 3. การพิสูจน์ค่าเฉลี่ยเลขคณิตด้วยระเบียบวิธีกำลังสองน้อยที่สุด (Least Squares)
ทำไมเราจึงต้องใช้ค่าเฉลี่ย $\\bar{x} = \\frac{1}{N}\\sum x_i$ เป็นตัวแทนที่ดีที่สุด?
ในทางสถิติและแคลคูลัส ค่าที่ดีที่สุด $\\xi$ คือค่าที่ทำให้ผลรวมของกำลังสองของส่วนเบี่ยงเบน $S(\\xi) = \\sum_{i=1}^N (x_i - \\xi)^2$ มีค่าน้อยที่สุด!
เมื่อหาอนุพันธ์ $\\frac{dS}{d\\xi} = 0$ จะได้ $\\xi = \\frac{1}{N}\\sum_{i=1}^N x_i$ เสมอ

---

### 4. การถ่ายทอดความคลาดเคลื่อน (Propagation of Uncertainties)
ถ้าฟังก์ชัน $f(x_1, x_2, \\dots)$ ขึ้นกับตัวแปรที่วัดได้อิสระจากกัน โดยแต่ละตัวมีความคลาดเคลื่อน $\\sigma_{x_1}, \\sigma_{x_2}$ ความคลาดเคลื่อนของผลลัพธ์ $\\sigma_f$ หาได้จาก:
$$\\sigma_f = \\sqrt{ \\left(\\frac{\\partial f}{\\partial x_1} \\sigma_{x_1}\\right)^2 + \\left(\\frac{\\partial f}{\\partial x_2} \\sigma_{x_2}\\right)^2 + \\dots }$$

#### กฎลัดที่ใช้บ่อย:
- การบวกลบ $f = x \\pm y \\implies \\sigma_f = \\sqrt{\\sigma_x^2 + \\sigma_y^2}$
- การคูณหาร $f = x y$ หรือ $f = \\frac{x}{y} \\implies \\frac{\\sigma_f}{f} = \\sqrt{ \\left(\\frac{\\sigma_x}{x}\\right)^2 + \\left(\\frac{\\sigma_y}{y}\\right)^2 }$
- เลขยกกำลัง $f = x^n \\implies \\frac{\\sigma_f}{f} = |n| \\frac{\\sigma_x}{x}$
        `,
        derivations: [
          {
            id: 'deriv-math-mean-minimization',
            topicId: 'math-tools',
            titleTh: 'การพิสูจน์ทางแคลคูลัสว่าค่าเฉลี่ยเลขคณิต $\\bar{x}$ เป็นค่าประมาณที่ดีที่สุดจากการทดลอง',
            objectiveTh: 'พิสูจน์ที่มาของค่าเฉลี่ย $\\bar{x} = \\frac{1}{N}\\sum_{i=1}^N x_i$ โดยใช้เงื่อนไขอนุพันธ์อันดับหนึ่ง $\\frac{dS}{d\\xi} = 0$ ตามตำรา สอวน.',
            startingAssumptions: [
              {
                id: 'asm-ls-1',
                descriptionTh: 'การวัดค่าปริมาณเดิมซ้ำ $N$ ครั้ง ได้ข้อมูล $x_1, x_2, \\dots, x_N$',
                significanceTh: 'การวัดซ้ำช่วยลดความคลาดเคลื่อนแบบสุ่ม (Random Error)',
              },
              {
                id: 'asm-ls-2',
                descriptionTh: 'กำหนดเกณฑ์ผลรวมกำลังสองของส่วนเบี่ยงเบน $S(\\xi) = \\sum_{i=1}^N (x_i - \\xi)^2$',
                significanceTh: 'การยกกำลังสองช่วยกำจัดปัญหาเรื่องเครื่องหมายบวกลบ และลงโทษค่าที่เบี่ยงเบนมาก',
              },
            ],
            steps: [
              {
                stepNumber: 1,
                titleTh: 'เขียนฟังก์ชันผลรวมกำลังสอง $S$ เทียบกับค่าประมาณ $\\xi$',
                latexMath: 'S(\\xi) = \\sum_{i=1}^N (x_i - \\xi)^2 = (x_1 - \\xi)^2 + (x_2 - \\xi)^2 + \\dots + (x_N - \\xi)^2',
                physicalIntuitionTh: 'เราต้องการหาค่าคงที่ $\\xi$ ค่าเดียว ที่อยู่ใกล้กับทุกๆ จุดข้อมูลมากที่สุดในแง่ของระยะกำลังสอง',
                mathOperationTh: 'กระจายผลรวมของฟังก์ชัน',
              },
              {
                stepNumber: 2,
                titleTh: 'หาอนุพันธ์ของ $S$ เทียบกับ $\\xi$ แล้วกำหนดให้เท่ากับศูนย์',
                latexMath: '\\frac{dS}{d\\xi} = \\sum_{i=1}^N 2(x_i - \\xi)(-1) = -2 \\sum_{i=1}^N (x_i - \\xi) = 0',
                physicalIntuitionTh: 'จุดต่ำสุดสัมพัทธ์ของฟังก์ชันคอนเวกซ์ (Convex) จะเกิดขึ้นเมื่อความชันเป็นศูนย์',
                mathOperationTh: 'กฎลูกโซ่ในการดิฟ $(x_i - \\xi)^2$',
                isCrucialLeap: true,
              },
              {
                stepNumber: 3,
                titleTh: 'แก้สมการหาค่า $\\xi$',
                latexMath: '\\sum_{i=1}^N x_i - \\sum_{i=1}^N \\xi = 0 \\implies \\sum_{i=1}^N x_i - N\\xi = 0 \\implies \\xi = \\frac{1}{N}\\sum_{i=1}^N x_i',
                physicalIntuitionTh: 'ผลรวมของส่วนเบี่ยงเบนเป็นศูนย์พอดี แสดงว่าค่าเฉลี่ยเลขคณิต $\\bar{x}$ คือจุดศูนย์ถ่วงของข้อมูล',
                mathOperationTh: 'ย้ายข้างและหารด้วยจำนวนครั้ง $N$',
              },
            ],
            finalResultLatex: '\\bar{x} = \\frac{1}{N}\\sum_{i=1}^N x_i',
            takeawayTh: 'ค่าเฉลี่ยเลขคณิตไม่ใช่แค่สูตรจำ แต่เป็นผลลัพธ์ทางคณิตศาสตร์ที่ลดผลรวมความคลาดเคลื่อนกำลังสองให้น้อยที่สุด (Least Squares Principle)',
          },
          {
            id: 'deriv-math-stokes-dimensional-analysis',
            topicId: 'math-tools',
            titleTh: 'การหาสูตรแรงต้านความหนืดสโตกส์ (Stokes\' Law) $F \\propto \\eta R v$ ด้วยมิติมูลฐาน',
            objectiveTh: 'แสดงวิธีการตั้งสมการมิติ $[M], [L], [T]$ เพื่อหาเลขยกกำลังของความหนืด รัศมี และความเร็ว ตามเนื้อหาหน้า 27 ในตำรา สอวน.',
            startingAssumptions: [
              {
                id: 'asm-stk-1',
                descriptionTh: 'แรงต้านของไหล $F$ ขึ้นกับสัมประสิทธิ์ความหนืด $\\eta$, รัศมีทรงกลม $R$, และความเร็ว $v$',
                significanceTh: 'สมมติว่าแรงอยู่ในรูปผลคูณเลขยกกำลัง $F = C \\eta^a R^b v^c$',
              },
              {
                id: 'asm-stk-2',
                descriptionTh: 'มิติของแรงคือ $[F] = [M L T^{-2}]$, มิติของความหนืดคือ $[\\eta] = [M L^{-1} T^{-1}]$',
                significanceTh: 'ได้มาจากนิยามแรงเฉือนของนิวตัน $\\tau = \\eta \\frac{dv}{dy}$',
              },
            ],
            steps: [
              {
                stepNumber: 1,
                titleTh: 'เขียนสมการในรูปมิติของแต่ละตัวแปร',
                latexMath: '[F] = [\\eta]^a [R]^b [v]^c \\implies [M L T^{-2}] = [M L^{-1} T^{-1}]^a [L]^b [L T^{-1}]^c',
                physicalIntuitionTh: 'แทนมิติมูลฐานของแต่ละปริมาณทางฟิสิกส์ลงในสมการสมมติฐาน',
                mathOperationTh: 'แทนมิติ $[M], [L], [T]$',
              },
              {
                stepNumber: 2,
                titleTh: 'รวมเลขยกกำลังของมวล $[M]$, ความยาว $[L]$, และเวลา $[T]$ ทางขวามือ',
                latexMath: '[M^1 L^1 T^{-2}] = [M^a L^{-a + b + c} T^{-a - c}]',
                physicalIntuitionTh: 'จัดกลุ่มมิติแต่ละแกนเข้าด้วยกัน เพื่อเตรียมเทียบสัมประสิทธิ์',
                mathOperationTh: 'สมบัติเลขยกกำลัง $L^{-a} L^b L^c = L^{-a+b+c}$',
              },
              {
                stepNumber: 3,
                titleTh: 'เทียบเลขชี้กำลังของแต่ละมิติทั้งสองข้าง',
                latexMath: '\\text{มวล } [M]: a = 1, \\quad \\text{เวลา } [T]: -a - c = -2 \\implies c = 2 - a = 1',
                physicalIntuitionTh: 'เนื่องจากมีเพียง $\\eta$ ตัวเดียวที่มีมิติมวล $[M]$ ดังนั้นเลขชี้กำลัง $a$ ต้องเท่ากับ 1 เสมอ',
                mathOperationTh: 'แก้สมการเชิงเส้น',
                isCrucialLeap: true,
              },
              {
                stepNumber: 4,
                titleTh: 'หามิติความยาว $[L]$ และสรุปสูตร',
                latexMath: '-a + b + c = 1 \\implies -1 + b + 1 = 1 \\implies b = 1 \\implies F = C \\eta R v',
                physicalIntuitionTh: 'การวิเคราะห์มิติบอกเราได้ว่าแรงต้านแปรผันตรงกับ $\\eta, R, v$ ยกกำลังหนึ่ง ส่วนค่าคงตัว $C = 6\\pi$ ต้องหาจากการทดลองหรือแก้สมการ Navier-Stokes',
                mathOperationTh: 'แทนค่า $a=1, c=1$ เพื่อหา $b$',
              },
            ],
            finalResultLatex: 'F = 6\\pi \\eta R v \\quad (C = 6\\pi)',
            takeawayTh: 'การวิเคราะห์มิติช่วยให้เราค้นพบรูปแบบความสัมพันธ์ทางฟิสิกส์ได้ แม้ยังไม่รู้วิธีแก้สมการไฮโดรไดนามิกส์ที่ซับซ้อน',
          },
        ],
        relatedProblemIds: ['prob-math-stokes-dim', 'prob-math-error-rect'],
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
