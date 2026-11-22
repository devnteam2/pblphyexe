// src/data/kkProblemsData.ts
import { POSNProblem } from '@/types/problem';

export const KK_PROBLEMS: POSNProblem[] = [
  {
    id: 'prob-kin-polar-1',
    code: 'POSN-KK-01',
    sourceExam: 'สอวน. ฟิสิกส์ ค่าย 1 / Kleppner & Kolenkow Ex. 1.18',
    topicId: 'kinematics-calculus',
    difficulty: 'Camp1_Advanced',
    titleTh: 'ลูกปัดบนซี่ล้อหมุนและอัตราเร็วขณะหลุดพ้นปลายซี่ล้อ (Bead on a Rotating Spoke)',
    statementTh:
      'ซี่ล้อยาว $L$ หมุนในระนาบระดับด้วยอัตราเร็วเชิงมุมคงที่ $\\omega$ โดยมีลูกปัดมวล $m$ สวมอยู่บนซี่ล้ออย่างไม่มีแรงเสียดทาน เริ่มต้นปล่อยลูกปัดจากหยุดนิ่งเทียบกับซี่ล้อที่ระยะ $r_0$ ($0 < r_0 < L$) จงหาอัตราเร็วเชิงรัศมี $\\dot{r}$ ขณะลูกปัดเคลื่อนที่มาถึงระยะ $r$ และอัตราเร็วรวมเทียบกับพื้นโลกเมื่อหลุดออกจากปลายซี่ล้อ ($r = L$)',
    statementLatex: '\\ddot{r} - r\\omega^2 = 0, \\quad r(0) = r_0, \\quad \\dot{r}(0) = 0',
    hints: [
      {
        tier: 1,
        type: 'physical_model',
        titleTh: 'Hint 1: เลือกใช้ความเร่งในพิกัดเชิงขั้ว',
        contentTh:
          'ซี่ล้อลื่นไม่สามารถออกแรงตามแนวซี่ล้อ ($\\hat{r}$) ได้ ดังนั้นแรงลัพธ์ตามแนวรัศมีเป็นศูนย์ $F_r = m a_r = 0$ จึงได้ $\\ddot{r} - r\\dot{\\theta}^2 = 0$',
        latexSnippets: ['a_r = \\ddot{r} - r\\omega^2 = 0'],
      },
      {
        tier: 2,
        type: 'governing_equations',
        titleTh: 'Hint 2: แปลงสมการอนุพันธ์เทียบเวลาเป็นเทียบตำแหน่ง r',
        contentTh:
          'ใช้กฎลูกโซ่ $\\ddot{r} = \\frac{d\\dot{r}}{dt} = \\dot{r}\\frac{d\\dot{r}}{dr}$ เพื่อแก้หา $\\dot{r}(r)$ โดยตรงโดยไม่ต้องหา $r(t)$ ก่อน!',
        latexSnippets: ['\\dot{r}\\frac{d\\dot{r}}{dr} = \\omega^2 r'],
      },
      {
        tier: 3,
        type: 'mathematical_trick',
        titleTh: 'Hint 3: ระวังการรวมเวกเตอร์ความเร็วเมื่อหลุดจากปลายซี่ล้อ',
        contentTh:
          'ความเร็วเทียบกับพื้นโลกมี 2 องค์ประกอบตั้งฉากกันคือ $\\dot{r}\\hat{r}$ และ $L\\omega\\hat{\\theta}$ ดังนั้นอัตราเร็วรวมคือ $v = \\sqrt{\\dot{r}^2 + (L\\omega)^2}$',
        latexSnippets: ['v_{\\text{exit}} = \\sqrt{\\dot{r}(L)^2 + L^2\\omega^2}'],
      },
    ],
    fullSolution: {
      approachOverviewTh:
        'ตั้งสมการความเร่งแนวรัศมีในพิกัดเชิงขั้วเป็นศูนย์ แล้วใช้กฎลูกโซ่ v dv = a dr อินทิเกรตหาความเร็วแนวรัศมีที่ปลายซี่ล้อ',
      coordinateSystemSetupTh: 'พิกัดเชิงขั้วระนาบ (r, theta) จุดกำเนิดอยู่ที่จุดหมุนของซี่ล้อ',
      steps: [
        {
          stepNumber: 1,
          stepTitleTh: 'ตั้งสมการการเคลื่อนที่ในทิศ $\\hat{r}$',
          latexMath: 'F_r = m(\\ddot{r} - r\\dot{\\theta}^2) = 0 \\implies \\ddot{r} = \\omega^2 r',
          explanationTh:
            'แรงตั้งฉาก $N$ จากซี่ล้อชี้ตามแนว $\\hat{\\theta}$ เท่านั้น จึงไม่มีแรงองค์ประกอบในทิศ $\\hat{r}$',
        },
        {
          stepNumber: 2,
          stepTitleTh: 'เปลี่ยนตัวแปรจาก $t$ เป็น $r$ ด้วยกฎลูกโซ่ $\\ddot{r} = \\dot{r}\\frac{d\\dot{r}}{dr}$',
          latexMath: '\\int_{0}^{\\dot{r}} \\dot{r}\'\\,d\\dot{r}\' = \\omega^2\\int_{r_0}^{r} r\'\\,dr\' \\implies \\frac{1}{2}\\dot{r}^2 = \\frac{1}{2}\\omega^2(r^2 - r_0^2)',
          explanationTh:
            'เมื่อเงื่อนไขเริ่มต้นคือปล่อยนิ่งเทียบซี่ล้อ ($\\dot{r}(0) = 0$) ที่ $r = r_0$ จะได้ $\\dot{r}(r) = \\omega\\sqrt{r^2 - r_0^2}$',
        },
        {
          stepNumber: 3,
          stepTitleTh: 'คำนวณอัตราเร็วรวมเทียบพื้นเมื่อลูกปัดหลุดที่ $r = L$',
          latexMath: '\\dot{r}(L) = \\omega\\sqrt{L^2 - r_0^2}, \\qquad v_{\\text{total}} = \\sqrt{\\dot{r}(L)^2 + (L\\omega)^2} = \\omega\\sqrt{2L^2 - r_0^2}',
          explanationTh:
            'รวมองค์ประกอบ $\\hat{r}$ และ $\\hat{\\theta}$ ด้วยทฤษฎีบทพีทาโกรัส',
        },
      ],
      finalAnswerLatex: '\\dot{r}(r) = \\omega\\sqrt{r^2 - r_0^2}, \\qquad v_{\\text{exit}} = \\omega\\sqrt{2L^2 - r_0^2}',
      examTrapWarningTh:
        'ห้ามตอบ $v_r = \\int a_r\\,dt = 0$ เด็ดขาด! เพราะในพิกัดเชิงขั้ว $a_r = \\ddot{r} - r\\omega^2$ ไม่เท่ากับ $\\frac{dv_r}{dt}$ และการลืมองค์ประกอบ $L\\omega\\hat{\\theta}$ จะทำให้อัตราเร็วหลุดหายไปครึ่งหนึ่ง',
    },
    selfCheck: {
      id: 'check-kin-polar-1',
      promptTh: 'หากเปลี่ยนเงื่อนไขให้เริ่มปล่อยที่ตำแหน่งใกล้จุดศูนย์กลางมาก ($r_0 \\to 0$) แต่อัตราเร็วสุทธิขณะหลุดออกจะเป็นเท่าใด และทำไมจึงไม่เท่ากับศูนย์?',
      optionsTh: [
        '$v_{\\text{exit}} = \\sqrt{2}\\omega L$ แต่ในความเป็นจริงถ้า $r_0 = 0$ เป๊ะ ลูกปัดจะไม่เริ่มเคลื่อนที่เลย',
        '$v_{\\text{exit}} = \\omega L$ เพราะมีความเร็วเพียงแนวเส้นสัมผัสเท่านั้น',
        '$v_{\\text{exit}} = 0$ เพราะแรงสู่ศูนย์กลางเป็นศูนย์ที่ศูนย์กลาง',
        '$v_{\\text{exit}} = 2\\omega L$ เพราะความเร่งคอริโอลิสผลักออกไปด้านหน้า',
      ],
      correctOptionIndex: 0,
      explanationTh:
        'ถูกต้อง! เมื่อ $r_0 \\to 0$ ค่า $\\dot{r}(L) \\to \\omega L$ ซึ่งเท่ากับ $v_\\theta = \\omega L$ จึงได้ $v_{\\text{exit}} = \\sqrt{2}\\omega L$ แต่หาก $r_0 = 0$ อย่างสมบูรณ์ สมการ $r(t) = r_0\\cosh(\\omega t)$ จะให้ $r(t) \\equiv 0$ คืออยู่จุดสมดุลไม่เสถียร!',
    },
  },
  {
    id: 'prob-newton-conical-1',
    code: 'POSN-KK-02',
    sourceExam: 'สอวน. ฟิสิกส์ ค่าย 1 / Kleppner & Kolenkow Ex. 2.10',
    topicId: 'newton-constraints',
    difficulty: 'Camp1_Advanced',
    titleTh: 'ลูกปัดบนห่วงวงกลมหมุนรอบแกนดิ่ง (Rotating Hoop Bifurcation)',
    statementTh:
      'ลูกปัดมวล $m$ สวมอยู่บนห่วงลวดวงกลมลื่นรัศมี $R$ ซึ่งถูกบังคับให้หมุนรอบแกนดิ่งที่ผ่านจุดศูนย์กลางด้วยอัตราเร็วเชิงมุมคงที่ $\\omega$ จงหามุมสมดุล $\\theta$ (วัดจากจุดต่ำสุดของห่วง) ที่เป็นไปได้ทั้งหมด และเงื่อนไขความเร็วเชิงมุมวิกฤต $\\omega_c$ ที่ทำให้ลูกปัดไต่ขึ้นไปอยู่ด้านข้างของห่วงได้',
    statementLatex: 'm\\omega^2 R\\sin\\theta = N\\sin\\theta, \\quad N\\cos\\theta = mg',
    hints: [
      {
        tier: 1,
        type: 'physical_model',
        titleTh: 'Hint 1: พิจารณาความเร่งสู่ศูนย์กลางในระนาบระดับ',
        contentTh:
          'ที่มุมสมดุล $\\theta$ คงที่ ลูกปัดเคลื่อนที่เป็นวงกลมแนวระดับรัศมี $r = R\\sin\\theta$ และไม่มีความเร่งในแนวดิ่ง',
        latexSnippets: ['N\\cos\\theta = mg, \\quad N\\sin\\theta = m\\omega^2(R\\sin\\theta)'],
      },
      {
        tier: 2,
        type: 'governing_equations',
        titleTh: 'Hint 2: แยกตัวประกอบแทนการหารตัด sin(theta)',
        contentTh:
          'จัดรูปสมการแนวระดับเป็น $\\sin\\theta\\,(N - m\\omega^2 R) = 0$ แล้วพิจารณาทั้ง 2 กรณีแยกกันอย่างเป็นระบบ',
        latexSnippets: ['\\sin\\theta\\,(N - m\\omega^2 R) = 0'],
      },
      {
        tier: 3,
        type: 'mathematical_trick',
        titleTh: 'Hint 3: ตรวจสอบขอบเขตค่าฟังก์ชันโคไซน์และเสถียรภาพ',
        contentTh:
          'สำหรับสาขา $\\theta > 0$ จะได้ $\\cos\\theta = \\frac{g}{\\omega^2 R}$ ซึ่งจะมีคำตอบจริงก็ต่อเมื่อ $\\frac{g}{\\omega^2 R} \\le 1$',
        latexSnippets: ['\\omega > \\omega_c = \\sqrt{\\frac{g}{R}}'],
      },
    ],
    fullSolution: {
      approachOverviewTh:
        'เขียนกฎข้อที่ 2 ของนิวตันในแนวดิ่งและแนวรัศมีระนาบระดับ แล้วแยกตัวประกอบเพื่อหาการแยกสาขาของสมดุล (Pitchfork Bifurcation)',
      coordinateSystemSetupTh: 'มุม theta วัดจากแนวดิ่งด้านล่าง (จุดต่ำสุดคือ theta = 0)',
      steps: [
        {
          stepNumber: 1,
          stepTitleTh: 'เขียนสมการสมดุลแนวดิ่งและสมการวงกลมแนวระดับ',
          latexMath: 'N\\cos\\theta = mg, \\qquad N\\sin\\theta = m\\omega^2 (R\\sin\\theta)',
          explanationTh:
            'แรงตั้งฉาก $N$ จากห่วงลวดชี้เข้าสู่จุดศูนย์กลางห่วง จึงทำมุม $\\theta$ กับแนวดิ่ง',
        },
        {
          stepNumber: 2,
          stepTitleTh: 'แยกตัวประกอบหาสองสาขาของตำแหน่งสมดุล',
          latexMath: '\\sin\\theta\\,(N - m\\omega^2 R) = 0 \\implies \\theta = 0 \\; \\text{หรือ} \\; N = m\\omega^2 R',
          explanationTh:
            'ถ้า $\\theta = 0$ จะได้ $N = mg$ เป็นจุดสมดุลตลอดเวลา ส่วนสาขาที่สองจะได้ก็ต่อเมื่อ $N = m\\omega^2 R$',
        },
        {
          stepNumber: 3,
          stepTitleTh: 'แก้สมการสาขาที่สองและหา $\\omega_c$',
          latexMath: '\\cos\\theta = \\frac{mg}{N} = \\frac{g}{\\omega^2 R} < 1 \\iff \\omega > \\omega_c = \\sqrt{\\frac{g}{R}}',
          explanationTh:
            'เมื่อ $\\omega \\le \\sqrt{g/R}$ จะมีคำตอบเดียวคือ $\\theta = 0$ (สมดุลเสถียร) แต่เมื่อ $\\omega > \\sqrt{g/R}$ จุด $\\theta = 0$ จะไม่เสถียรและลูกปัดจะไต่ขึ้นไปที่ $\\theta = \\arccos\\left(\\frac{g}{\\omega^2 R}\\right)$',
        },
      ],
      finalAnswerLatex: '\\omega_c = \\sqrt{\\frac{g}{R}}, \\qquad \\theta = \\begin{cases} 0 & \\omega \\le \\omega_c \\\\ \\arccos\\left(\\frac{g}{\\omega^2 R}\\right) & \\omega > \\omega_c \\end{cases}',
      examTrapWarningTh:
        'การตัด $\\sin\\theta$ ทิ้งจากทั้งสองข้างทันทีทำให้สูญเสียคำตอบ $\\theta = 0$ และอาจลืมตรวจสอบเงื่อนไข $\\cos\\theta \\le 1$ จนตอบสูตรมุมผิดแม้เมื่อ $\\omega$ ต่ำกว่า $\\omega_c$',
    },
    selfCheck: {
      id: 'check-newton-conical-1',
      promptTh: 'หากหมุนห่วงเร็วขึ้นเรื่อยๆ จน $\\omega \\to \\infty$ มุมสมดุล $\\theta$ ของลูกปัดจะเป็นอย่างไร?',
      optionsTh: [
        '$\\theta \\to \\frac{\\pi}{2}$ (90 องศา — อยู่ที่เส้นศูนย์สูตรของห่วง)',
        '$\\theta \\to \\pi$ (180 องศา — ขึ้นไปอยู่ยอดสุดของห่วง)',
        '$\\theta \\to 0$ (ตกลงมาจุดต่ำสุด)',
        'ลูกปัดหลุดออกจากห่วงไม่ได้เลย ไม่ขึ้นกับ $\\omega$',
      ],
      correctOptionIndex: 0,
      explanationTh:
        'ถูกต้อง! เมื่อ $\\omega \\to \\infty$, $\\cos\\theta = \\frac{g}{\\omega^2 R} \\to 0 \\implies \\theta \\to \\frac{\\pi}{2}$ ลูกปัดไม่สามารถปีนเกินแนวระนาบเส้นศูนย์สูตรได้เพราะ $N\\cos\\theta = mg$ ต้องคอยพยุงน้ำหนักในแนวดิ่งเสมอ!',
    },
  },
  {
    id: 'prob-newton-capstan-1',
    code: 'POSN-KK-03',
    sourceExam: 'สอวน. ฟิสิกส์ ค่าย 1 / Kleppner & Kolenkow Prob. 3.12',
    topicId: 'newton-constraints',
    difficulty: 'Camp1_Advanced',
    titleTh: 'สมการแคปสแตน: เชือกพันรอบท่อนไม้ทรงกระบอกหยาบ (Capstan Equation)',
    statementTh:
      'เชือกมวลน้อยมากพาดพันรอบเสาทรงกระบอกแนวนอนที่ยึดตรึงแน่นเป็นมุมรวม $\\theta_0$ เรเดียน สัมประสิทธิ์ความเสียดทานสถิตระหว่างเชือกกับเสาคือ $\\mu$ ปลายด้านหนึ่งแขวนมวลหนัก $M$ ส่วนปลายอีกด้านออกแรงดึง $F$ จงหาค่าแรง $F_{\\min}$ ที่น้อยที่สุดที่ใช้รั้งมวล $M$ ไม่ให้ตกลงมา',
    statementLatex: 'dT = \\mu T\\,d\\theta, \\quad T(0) = F_{\\min}, \\quad T(\\theta_0) = Mg',
    hints: [
      {
        tier: 1,
        type: 'physical_model',
        titleTh: 'Hint 1: ตัดชิ้นส่วนเชือกช่วงมุม d_theta ที่จวนจะไถล',
        contentTh:
          'เมื่อออกแรง $F_{\\min}$ (น้อยสุดที่จะรั้งไว้) มวล $M$ จวนจะตกลงมา แรงเสียดทานสถิต $df = \\mu\\,dN$ จึงมีทิศชี้ช่วยด้านแรง $F_{\\min}$',
        latexSnippets: ['dN \\approx T\\,d\\theta, \\quad df = \\mu\\,dN'],
      },
      {
        tier: 2,
        type: 'governing_equations',
        titleTh: 'Hint 2: ประมาณมุมเล็กเพื่อตั้งสมการเชิงอนุพันธ์',
        contentTh:
          'สมดุลแนวรัศมีให้ $dN = (2T + dT)\\sin(d\\theta/2) \\approx T\\,d\\theta$ และสมดุลแนวสัมผัสให้ $dT = \\mu\\,dN = \\mu T\\,d\\theta$',
        latexSnippets: ['\\frac{dT}{T} = \\mu\\,d\\theta'],
      },
      {
        tier: 3,
        type: 'mathematical_trick',
        titleTh: 'Hint 3: อินทิเกรตตลอดมุมสัมผัสทั้งหมด',
        contentTh:
          'อินทิเกรตตั้งแต่ $\\theta = 0$ (แรงตึง $F_{\\min}$) ถึง $\\theta = \\theta_0$ (แรงตึง $Mg$)',
        latexSnippets: ['\\int_{F_{\\min}}^{Mg} \\frac{dT}{T} = \\int_0^{\\theta_0} \\mu\\,d\\theta'],
      },
    ],
    fullSolution: {
      approachOverviewTh:
        'วิเคราะห์สมดุลของชิ้นส่วนเชือกเล็กๆ ในมุม d_theta แล้วตัดเทอมอันดับสองเพื่อแก้สมการเชิงอนุพันธ์อันดับหนึ่ง',
      coordinateSystemSetupTh: 'มุม theta วัดจากจุดสัมผัสฝั่งแรง F_min (theta = 0) ไปยังฝั่งมวล M (theta = theta_0)',
      steps: [
        {
          stepNumber: 1,
          stepTitleTh: 'สมดุลในแนวตั้งฉากผิวเสาและแนวสัมผัสของชิ้นส่วนมุม $d\\theta$',
          latexMath: 'dN = T\\sin\\frac{d\\theta}{2} + (T+dT)\\sin\\frac{d\\theta}{2} \\approx T\\,d\\theta, \\qquad (T+dT)\\cos\\frac{d\\theta}{2} - T\\cos\\frac{d\\theta}{2} = \\mu\\,dN',
          explanationTh:
            'ใช้ $\\sin(d\\theta/2) \\approx d\\theta/2$, $\\cos(d\\theta/2) \\approx 1$ และตัดพจน์ $dT\\,d\\theta \\to 0$',
        },
        {
          stepNumber: 2,
          stepTitleTh: 'ตั้งสมการเชิงอนุพันธ์ $dT/T = \\mu\\,d\\theta$ แล้วอินทิเกรต',
          latexMath: '\\int_{F_{\\min}}^{Mg} \\frac{dT}{T} = \\mu\\int_{0}^{\\theta_0} d\\theta \\implies \\ln\\left(\\frac{Mg}{F_{\\min}}\\right) = \\mu\\theta_0',
          explanationTh:
            'แรงตึงเพิ่มขึ้นแบบเอกซ์โพเนนเชียลตามมุมที่พันรอบเสา',
        },
        {
          stepNumber: 3,
          stepTitleTh: 'แก้หาค่าแรงดึงต่ำสุด $F_{\\min}$',
          latexMath: 'F_{\\min} = Mg\\,e^{-\\mu\\theta_0}',
          explanationTh:
            'สังเกตว่าถ้าต้องการออกแรง **ยกขึ้น** ($F_{\\max}$ เอาชนะทั้งน้ำหนักและเสียดทาน) เครื่องหมายเลขชี้กำลังจะกลับเป็นบวก $F = Mg\\,e^{+\\mu\\theta_0}$',
        },
      ],
      finalAnswerLatex: 'F_{\\min} = Mg\\,e^{-\\mu\\theta_0}',
      examTrapWarningTh:
        'ระวังทิศของแรงเสียดทาน! "รั้งไม่ให้ตก" ($F_{\\min} = Mg e^{-\\mu\\theta_0}$) กับ "ดึงเพื่อยกขึ้น" ($F_{\\text{lift}} = Mg e^{+\\mu\\theta_0}$) ต่างกันที่เครื่องหมายของ $\\mu\\theta_0$',
    },
    selfCheck: {
      id: 'check-newton-capstan-1',
      promptTh: 'หากเชือกพาดผ่านเสาเพียงครึ่งรอบ ($\\theta_0 = \\pi$) โดยมี $\\mu = 0.25$ และแขวนมวล $100\\text{ kg}$ แรง $F$ ที่ต้องใช้เพื่อเริ่ม "ยกมวลขึ้น" มีค่าเป็นกี่เท่าของ $Mg$?',
      optionsTh: [
        '$e^{0.25\\pi} \\approx 2.19$ เท่า',
        '$e^{-0.25\\pi} \\approx 0.46$ เท่า',
        '$1 + 0.25\\pi \\approx 1.79$ เท่า',
        '$e^{0.5\\pi} \\approx 4.81$ เท่า',
      ],
      correctOptionIndex: 0,
      explanationTh:
        'ถูกต้อง! การดึงขึ้นแรง $F$ ต้องมากกว่า $Mg$ เพื่อชนะแรงเสียดทาน จึงเป็น $F = Mg e^{+\\mu\\theta_0} = Mg e^{0.25\\pi}$',
    },
  },
  {
    id: 'prob-mom-rocket-1',
    code: 'POSN-KK-04',
    sourceExam: 'สอวน. ฟิสิกส์ ค่าย 2 / Kleppner & Kolenkow Ex. 4.13–4.14',
    topicId: 'momentum-variable-mass',
    difficulty: 'Camp2_Core',
    titleTh: 'ปริศนารถบรรทุกทรายรั่ว เทียบกับ รถบรรทุกที่รับทรายจากกรวย (Leaky vs. Hopper Car)',
    statementTh:
      'รางรถไฟแนวนอนไร้แรงเสียดทานมีรถบรรทุกมวลเริ่มต้น $M_0$ แล่นด้วยความเร็ว $v_0$ จงเปรียบเทียบความเร็ว $v(t)$ ใน 2 กรณีเมื่อมีแรงขับคงที่ในแนวระดับ $F_0$ กระทำ: (ก) รถบรรทุกทรายเปิดรูรั่วที่พื้นให้ทรายร่วงลงมาในอัตราคงที่ $dm/dt = b$ และ (ข) รถบรรทุกเปล่าแล่นผ่านใต้กรวยที่ปล่อยทรายตกลงมาในแนวดิ่งด้วยอัตรา $b$ ลงสู่ตัวรถ',
    statementLatex: 'M(t) = M_0 \\mp b t, \\quad F_0 \\text{ คงที่ในแนวระดับ}',
    hints: [
      {
        tier: 1,
        type: 'physical_model',
        titleTh: 'Hint 1: ใช้ระบบปิดช่วงเวลาสั้นๆ dt แทนการดิฟ mv ตรงๆ',
        contentTh:
          'ในกรณี (ก) ทรายที่ร่วงผ่านรูพื้นยังมีความเร็วแนวราบเท่ากับรถ $v$ ณ ขณะที่หลุดออก จึงไม่เกิดแรงผลักแนวราบใดๆ ส่วนกรณี (ข) ทรายที่ตกจากกรวยมีความเร็วแนวราบเริ่มต้นเป็น $0$ จึงต้องถูกเร่งจาก $0 \\to v$',
        latexSnippets: ['P_{\\text{horiz}}(t+\\Delta t) - P_{\\text{horiz}}(t) = F_0\\Delta t'],
      },
      {
        tier: 2,
        type: 'governing_equations',
        titleTh: 'Hint 2: ตั้งสมการอนุพันธ์แยกทั้ง 2 กรณี',
        contentTh:
          'กรณี (ก): $(M - \\Delta m)(v + \\Delta v) + \\Delta m\\,v - Mv = F_0\\Delta t \\implies M\\dot{v} = F_0$\nกรณี (ข): $(M + \\Delta m)(v + \\Delta v) - (Mv + \\Delta m\\cdot 0) = F_0\\Delta t \\implies \\frac{d(Mv)}{dt} = F_0$',
        latexSnippets: ['(M_0 - bt)\\dot{v}_a = F_0, \\qquad \\frac{d}{dt}[(M_0 + bt)v_b] = F_0'],
      },
      {
        tier: 3,
        type: 'mathematical_trick',
        titleTh: 'Hint 3: อินทิเกรตแยกตัวแปรกรณี (ก) และอินทิเกรตตรงกรณี (ข)',
        contentTh:
          'กรณี (ก) ต้องอินทิเกรต $\\int \\frac{dt}{M_0 - bt}$ ส่วนกรณี (ข) อินทิเกรต $F_0$ เทียบ $t$ ได้ทันที!',
        latexSnippets: ['v_a(t) = v_0 + \\frac{F_0}{b}\\ln\\left(\\frac{M_0}{M_0 - bt}\\right)'],
      },
    ],
    fullSolution: {
      approachOverviewTh:
        'ประยุกต์วิธีการขอบเขตระบบปิดของ Kleppner & Kolenkow เพื่อแสดงให้เห็นว่าแรง $F = d(mv)/dt$ ใช้ได้ในกรณี (ข) เท่านั้น แต่ผิดพลาดร้ายแรงในกรณี (ก)',
      coordinateSystemSetupTh: 'แกน +x ในแนวระดับทิศทางเดียวกับความเร็วรถไฟ',
      steps: [
        {
          stepNumber: 1,
          stepTitleTh: 'วิเคราะห์กรณี (ก) รถบรรทุกทรายรั่วที่พื้น ($M(t) = M_0 - bt$)',
          latexMath: 'P_a(t) = Mv, \\qquad P_a(t+\\Delta t) = (M - \\Delta m)(v + \\Delta v) + \\Delta m\\,(v) \\implies \\Delta P_a = M\\Delta v = F_0\\Delta t',
          explanationTh:
            'ทรายที่รั่วลงไปยังคงเคลื่อนที่ไปข้างหน้าด้วยความเร็ว $v$ (relative exhaust velocity $u = 0$) จึงไม่ได้ส่งแรงถีบให้ตัวรถ! ดังนั้น $M(t)\\frac{dv_a}{dt} = F_0$',
        },
        {
          stepNumber: 2,
          stepTitleTh: 'อินทิเกรตหาความเร็ว $v_a(t)$ สำหรับรถรั่ว',
          latexMath: 'v_a(t) = v_0 + \\int_{0}^{t} \\frac{F_0}{M_0 - bt\'}\\,dt\' = v_0 + \\frac{F_0}{b}\\ln\\left(\\frac{M_0}{M_0 - bt}\\right)',
          explanationTh:
            'เมื่อ $F_0 = 0$ ความเร็วของรถรั่วจะ **คงที่ตลอดกาล** ($v_a = v_0$) ถึงแม้ว่ามวลจะลดลงก็ตาม!',
        },
        {
          stepNumber: 3,
          stepTitleTh: 'วิเคราะห์กรณี (ข) รถรับทรายจากกรวยอยู่นิ่ง ($M(t) = M_0 + bt$)',
          latexMath: 'P_b(t) = Mv + \\Delta m(0), \\qquad P_b(t+\\Delta t) = (M + \\Delta m)(v + \\Delta v) \\implies \\Delta P_b \\approx d(Mv) = F_0\\Delta t',
          explanationTh:
            'เพราะทรายที่เข้ามาเริ่มต้นด้วยความเร็วแนวราบ $0$ ในกรอบโลก จึงต้องแบ่งโมเมนตัมไปเร่งทรายที่ตกลงมา ดังนั้น $M\\dot{v}_b + v_b\\dot{M} = F_0$',
        },
        {
          stepNumber: 4,
          stepTitleTh: 'อินทิเกรตหาความเร็ว $v_b(t)$ ของกรณี (ข)',
          latexMath: '(M_0 + bt)v_b(t) - M_0 v_0 = F_0 t \\implies v_b(t) = \\frac{M_0 v_0 + F_0 t}{M_0 + bt}',
          explanationTh:
            'หาก $F_0 = 0$ รถที่รับทรายจะค่อยๆ ช้าลงเรื่อยๆ เพื่อรักษาโมเมนตัมรวมในแนวราบให้คงที่',
        },
      ],
      finalAnswerLatex: 'v_a(t) = v_0 + \\frac{F_0}{b}\\ln\\left(\\frac{M_0}{M_0 - bt}\\right), \\qquad v_b(t) = \\frac{M_0 v_0 + F_0 t}{M_0 + bt}',
      examTrapWarningTh:
        'นักเรียนเกือบ 90% เผลอใช้สูตร $\\frac{d(Mv)}{dt} = F_0$ กับกรณี (ก) รถรั่ว ทำให้ได้คำตอบผิดเป็น $v_a(t) = \\frac{M_0 v_0}{M_0 - bt}$ (รถเร่งเองได้โดยไม่มีแรง $F_0$ ซึ่งละเมิดหลักสัมพัทธภาพกาลิเลโอ!)',
    },
    selfCheck: {
      id: 'check-mom-rocket-1',
      promptTh: 'หากไม่มีแรงภายนอกเลย ($F_0 = 0$) และรถแล่นด้วยความเร็ว $v_0$ ขณะมีฝนตกแนวดิ่งลงมาสะสมบนหลังคารถ กับขณะน้ำรั่วออกจากใต้ท้องรถ ความเร็วของรถทั้งสองจะเป็นอย่างไร?',
      optionsTh: [
        'รถที่รับน้ำฝนจะช้าลง ส่วนรถที่น้ำรั่วออกจะมีความเร็วคงที่ $v_0$ เท่าเดิม',
        'รถที่รับน้ำฝนจะช้าลง ส่วนรถที่น้ำรั่วออกจะเร็วขึ้น',
        'ทั้งสองคันมีความเร็วคงที่ $v_0$ เท่าเดิม เพราะ $F_0 = 0$',
        'รถที่รับน้ำฝนจะเร็วขึ้นเพราะมวลมากขึ้น',
      ],
      correctOptionIndex: 0,
      explanationTh:
        'ถูกต้อง! น้ำฝนแนวดิ่งมีความเร็วแนวราบเริ่มต้นเป็น 0 เมื่อเกาะรถจึงลดความเร็วรถ ส่วนน้ำที่หยดร่วงลงจากรถพกพาโมเมนตัมต่อหน่วยมวลของตัวเองติดตัวออกไปด้วย ความเร็วรถจึงไม่เปลี่ยน!',
    },
  },
  {
    id: 'prob-mom-chain-1',
    code: 'POSN-KK-05',
    sourceExam: 'สอวน. ฟิสิกส์ ค่าย 1–2 / Kleppner & Kolenkow Ex. 4.21',
    topicId: 'momentum-variable-mass',
    difficulty: 'Camp1_Advanced',
    titleTh: 'โซ่หนักตกลงบนตาชั่ง: แรงอ่านได้ 3 เท่าของน้ำหนักที่กองอยู่ (Falling Chain on Scale)',
    statementTh:
      'โซ่สม่ำเสมอมวล $M$ ยาว $L$ (ความหนาแน่นเชิงเส้น $\\lambda = M/L$) ถูกจับห้อยในแนวดิ่งโดยปลายล่างแตะจานตาชั่งพอดี จากนั้นปล่อยให้โซ่ตกลงมาอย่างอิสระบนตาชั่ง (โดยข้อต่อที่ตกกระทบตาชั่งหยุดนิ่งทันทีไม่กระดอน) จงหาแรง $N(x)$ ที่ตาชั่งอ่านได้ขณะที่โซ่ตกลงมาเป็นระยะทาง $x$ ($x < L$)',
    statementLatex: '\\lambda = \\frac{M}{L}, \\quad N(x) = \\text{แรงปฏิกิริยาบนตาชั่งที่ระยะตก } x',
    hints: [
      {
        tier: 1,
        type: 'physical_model',
        titleTh: 'Hint 1: แยกแรงที่ตาชั่งรับออกเป็น 2 ส่วน',
        contentTh:
          'แรงปฏิกิริยา $N$ ต้องรับทั้ง (1) น้ำหนักของกองโซ่ที่หยุดนิ่งบนจานแล้วความยาว $x$ และ (2) แรงดลจากการหยุดโมเมนตัมของโซ่ที่กำลังตกกระทบตาชั่ง',
        latexSnippets: ['N(x) = W_{\\text{pile}} + F_{\\text{impact}}'],
      },
      {
        tier: 2,
        type: 'governing_equations',
        titleTh: 'Hint 2: หาอัตราเร็วและโมเมนตัมฟลักซ์ของส่วนที่กำลังตก',
        contentTh:
          'ส่วนที่ยังไม่กระทบตาชั่งกำลังตกอิสระ! เมื่อตกลงมาได้ระยะ $x$ ความเร็วขณะกระทบตาชั่งคือ $v = \\sqrt{2gx}$ และมวลที่กระทบในเวลา $dt$ คือ $dm = \\lambda v\\,dt$',
        latexSnippets: ['v = \\sqrt{2gx}, \\qquad \\frac{dm}{dt} = \\lambda v'],
      },
      {
        tier: 3,
        type: 'mathematical_trick',
        titleTh: 'Hint 3: รวมน้ำหนักกองโซ่กับอัตราเปลี่ยนโมเมนตัม',
        contentTh:
          'แรงกระแทก $F_{\\text{impact}} = v\\frac{dm}{dt} = \\lambda v^2 = 2\\lambda g x$ เมื่อรวมกับน้ำหนักส่วนที่กองอยู่ $\\lambda g x$ จะได้ผลลัพธ์สวยงามอย่างน่าทึ่ง!',
        latexSnippets: ['N(x) = \\lambda g x + \\lambda v^2'],
      },
    ],
    fullSolution: {
      approachOverviewTh:
        'คำนวณโมเมนตัมของโซ่ส่วนที่กำลังตกอิสระแล้วประยุกต์สมการโมเมนตัมฟลักซ์เพื่อรวมกับน้ำหนักสถิตบนตาชั่ง',
      coordinateSystemSetupTh: 'แกน +y วัดลงล่างหรือพิจารณาขนาดแรงขึ้นลงเทียบพื้นตาชั่งที่ y = 0',
      steps: [
        {
          stepNumber: 1,
          stepTitleTh: 'หาน้ำหนักสถิตของส่วนโซ่ที่ตกมากองบนตาชั่งแล้ว ($W_{\\text{pile}}$)',
          latexMath: 'm_{\\text{pile}} = \\lambda x \\implies W_{\\text{pile}} = \\lambda g x',
          explanationTh:
            'ส่วนของโซ่ความยาว $x$ วางนิ่งอยู่บนตาชั่งจึงกดตาชั่งด้วยน้ำหนัก $\\lambda g x$',
        },
        {
          stepNumber: 2,
          stepTitleTh: 'หาอัตราการเปลี่ยนแปลงโมเมนตัมของมวลย่อย $dm$ ที่เพิ่งกระทบหยุดนิ่ง',
          latexMath: 'v^2 = 2gx, \\qquad dm = \\lambda\\,dx = \\lambda v\\,dt \\implies F_{\\text{impact}} = \\frac{dp}{dt} = v\\frac{dm}{dt} = \\lambda v^2 = 2\\lambda g x',
          explanationTh:
            'โซ่ส่วนที่ยังลอยอยู่ไม่มีแรงดึงระหว่างข้อต่อ จึงตกอิสระด้วยความเร่ง $g$ เมื่อตกถึงตาชั่งความเร็วลดจาก $v$ เหลือ $0$',
        },
        {
          stepNumber: 3,
          stepTitleTh: 'รวมแรงทั้งหมดที่ตาชั่งต้องออกเพื่อรองรับระบบ',
          latexMath: 'N(x) = W_{\\text{pile}} + F_{\\text{impact}} = \\lambda g x + 2\\lambda g x = 3\\lambda g x',
          explanationTh:
            'ก่อนที่ปลายบนสุดจะตกถึง ($x \\to L^-$) ตาชั่งอ่านค่าได้สูงถึง $3Mg$ แล้วจึงตกลงเหลือ $Mg$ ทันทีที่โซ่หยุดทั้งเส้น!',
        },
      ],
      finalAnswerLatex: 'N(x) = 3\\lambda g x = 3\\left(\\frac{x}{L}\\right)Mg \\quad (0 \\le x < L)',
      examTrapWarningTh:
        'อย่าลืมตรวจเช็กกรณีลิมิต! ทันทีที่ปลายบนของโซ่แตะตาชั่ง ($t > \\sqrt{2L/g}$) ไม่มีมวลตกกระทบอีกต่อไป แรงที่อ่านได้จะกระโดดจาก $3Mg$ ลงมาเหลือ $Mg$ ในทันที',
    },
    selfCheck: {
      id: 'check-mom-chain-1',
      promptTh: 'หากเป็นโจทย์ตรงกันข้าม: ดึงโซ่มวล/ความยาว $\\lambda$ จากกองบนพื้นให้ลอยขึ้นด้วยอัตราเร็วคงที่ $v$ แรงที่ใช้ดึงปลายบนขณะที่ยกขึ้นมาได้สูง $x$ จะมีค่าเท่าใด?',
      optionsTh: [
        '$F = \\lambda g x + \\lambda v^2$',
        '$F = 3\\lambda g x$',
        '$F = \\lambda g x + \\frac{1}{2}\\lambda v^2$',
        '$F = 2\\lambda g x$',
      ],
      correctOptionIndex: 0,
      explanationTh:
        'ถูกต้อง! ต้องออกแรงพยุงน้ำหนักส่วนที่ลอยอยู่ $\\lambda g x$ บวกกับแรงกระชากเพื่อเร่งข้อต่อที่พื้นจาก $0 \\to v$ คือ $v\\frac{dm}{dt} = \\lambda v^2$ (และข้อต่อที่กระชากจะสูญเสียพลังงานความร้อนครึ่งหนึ่งเหมือนการชนไม่ยืดหยุ่น!)',
    },
  },
  {
    id: 'prob-energy-sphere-1',
    code: 'POSN-KK-06',
    sourceExam: 'สอวน. ฟิสิกส์ ค่าย 1 / Kleppner & Kolenkow Ex. 5.5',
    topicId: 'work-energy-potentials',
    difficulty: 'Camp1_Foundation',
    titleTh: 'บล็อกไถลหลุดออกจากผิวครึ่งทรงกลมลื่น (Block Sliding Off Sphere)',
    statementTh:
      'อนุภาคมวล $m$ วางอยู่นิ่งบนยอดของครึ่งทรงกลมลื่นที่ยึดตรึงแน่นรัศมี $R$ เมื่อสะกิดเบาๆ ให้เริ่มไถลลงมา จงหามุม $\\theta$ วัดจากแนวดิ่งซึ่งเป็นตำแหน่งที่อนุภาคหลุดออกจากผิวทรงกลมพอดี และมุมวิกฤตนี้จะเปลี่ยนไปอย่างไรหากอนุภาคเริ่มต้นที่ยอดด้วยความเร็ว $v_0$?',
    statementLatex: 'E = \\frac{1}{2}mv^2 + mgR\\cos\\theta = \\text{const}, \\qquad N(\\theta_c) = 0',
    hints: [
      {
        tier: 1,
        type: 'physical_model',
        titleTh: 'Hint 1: เงื่อนไขการหลุดจากผิวโค้งคือ N = 0',
        contentTh:
          'แรงปฏิกิริยา $N$ จากผิวโค้งสามารถผลักออกได้อย่างเดียว ($N \\ge 0$) ขณะยังสัมผัสผิวอนุภาคเคลื่อนที่เป็นวงกลมรัศมี $R$',
        latexSnippets: ['mg\\cos\\theta - N = \\frac{mv^2}{R}'],
      },
      {
        tier: 2,
        type: 'governing_equations',
        titleTh: 'Hint 2: ใช้อนุรักษ์พลังงานหา v^2 ในรูปของ theta',
        contentTh:
          'แรงตั้งฉาก $\\vec{N}$ ตั้งฉากกับ $d\\vec{r}$ ตลอดทางจึงไม่ทำงาน พลังงานกลจึงอนุรักษ์: $mgR = mgR\\cos\\theta + \\frac{1}{2}mv^2$',
        latexSnippets: ['v^2 = v_0^2 + 2gR(1 - \\cos\\theta)'],
      },
      {
        tier: 3,
        type: 'mathematical_trick',
        titleTh: 'Hint 3: แทน v^2 และ N = 0 ลงในสมการแนวรัศมี',
        contentTh:
          'แทน $N = 0 \\implies g\\cos\\theta = v^2/R$ เพื่อแก้หา $\\cos\\theta$ ทันที',
        latexSnippets: ['\\cos\\theta = \\frac{v_0^2}{gR} + 2 - 2\\cos\\theta'],
      },
    ],
    fullSolution: {
      approachOverviewTh:
        'ผสมผสานสมการอนุรักษ์พลังงานกลกับกฎข้อที่ 2 ของนิวตันในแนวรัศมี แล้วใช้เกณฑ์ความต่อเนื่องของผิวสัมผัส N = 0',
      coordinateSystemSetupTh: 'มุม theta วัดจากยอดครึ่งทรงกลม (theta = 0 ที่จุดสูงสุด)',
      steps: [
        {
          stepNumber: 1,
          stepTitleTh: 'ตั้งสมการอนุรักษ์พลังงานกลจากจุดยอด $\\theta = 0$ ถึงมุม $\\theta$',
          latexMath: '\\frac{1}{2}mv_0^2 + mgR = \\frac{1}{2}mv^2 + mgR\\cos\\theta \\implies \\frac{mv^2}{R} = \\frac{mv_0^2}{R} + 2mg(1 - \\cos\\theta)',
          explanationTh:
            'ความสูงลดลงไป $R(1 - \\cos\\theta)$ และ $N$ ไม่ทำงานเพราะตั้งฉากกับการเคลื่อนที่ตลอดเวลา',
        },
        {
          stepNumber: 2,
          stepTitleTh: 'ตั้งสมการสู่ศูนย์กลางและแทนเงื่อนไขหลุด $N = 0$',
          latexMath: 'mg\\cos\\theta - N = \\frac{mv^2}{R} \\xrightarrow{N=0} mg\\cos\\theta_c = \\frac{mv_0^2}{R} + 2mg(1 - \\cos\\theta_c)',
          explanationTh:
            'เมื่ออนุภาคต้องการแรงสู่ศูนย์กลางมากกว่าองค์ประกอบน้ำหนัก $mg\\cos\\theta$ มันจะเหินลอยออกจากผิว',
        },
        {
          stepNumber: 3,
          stepTitleTh: 'แก้หา $\\cos\\theta_c$ ทั้งกรณี $v_0 = 0$ และกรณีทั่วไป',
          latexMath: '3\\cos\\theta_c = 2 + \\frac{v_0^2}{gR} \\implies \\cos\\theta_c = \\frac{2}{3} + \\frac{v_0^2}{3gR} \\quad (v_0 = 0 \\implies \\cos\\theta_c = \\frac{2}{3})',
          explanationTh:
            'สังเกตว่าถ้า $v_0 \\ge \\sqrt{gR}$ จะได้ $\\cos\\theta_c \\ge 1$ แปลว่าอนุภาคจะหลุดออกจากยอดทันทีตั้งแต่วินาทีแรกที่ปล่อย ($\\theta_c = 0$)',
        },
      ],
      finalAnswerLatex: '\\cos\\theta_c = \\frac{2}{3} \\; (\\text{สำหรับ } v_0 = 0), \\qquad \\cos\\theta_c = \\frac{2}{3} + \\frac{v_0^2}{3gR} \\; (v_0 < \\sqrt{gR})',
      examTrapWarningTh:
        'สังเกตลิมิต $v_0^2 \\ge gR$: มุมหลุดไม่สามารถติดลบได้ ดังนั้นหาก $\\frac{2}{3} + \\frac{v_0^2}{3gR} \\ge 1$ อนุภาคจะหลุดที่จุดเริ่มต้น $\\theta_c = 0$ ทันที!',
    },
    selfCheck: {
      id: 'check-energy-sphere-1',
      promptTh: 'หากอนุภาคไม่ได้วางอยู่บนทรงกลมแต่ **ไถลอยู่ด้านใน** ของถ้วยครึ่งทรงกลมลื่นเริ่มจากขอบบน ($\\theta = 90^\\circ$) แรงตั้งฉาก $N$ ที่ก้นถ้วยจะเป็นเท่าใด และถ้าเป็นการกลิ้งของทรงกลมตันรัศมี $r$ ลงจากครึ่งทรงกลมใหญ่อันเดียวกัน มุมหลุดจะเปลี่ยนเป็นค่าใด?',
      optionsTh: [
        'ก้นถ้วย $N = 3mg$; ส่วนทรงกลมตันที่กลิ้งไม่ไถลจะหลุดช้ากว่าเล็กน้อยที่ $\\cos\\theta_c = \\frac{10}{17}$',
        'ก้นถ้วย $N = 2mg$; ส่วนทรงกลมตันจะหลุดที่มุมเดิม $\\cos\\theta_c = \\frac{2}{3}$',
        'ก้นถ้วย $N = 3mg$; ส่วนทรงกลมตันจะหลุดเร็วกว่าที่ $\\cos\\theta_c = \\frac{5}{6}$',
        'ก้นถ้วย $N = mg$; ทรงกลมตันไม่หลุดเลยจนถึง $\\theta = 90^\\circ$',
      ],
      correctOptionIndex: 0,
      explanationTh:
        'ถูกต้อง! สำหรับทรงกลมตันกลิ้งไม่ไถล พลังงานส่วนหนึ่งแบ่งไปให้การหมุน ($\\frac{7}{10}mv^2 = mgR(1-\\cos\\theta)$) ทำให้ $v^2$ ที่มุมเดียวกันน้อยลง จึงเกาะผิวได้นานขึ้นเป็น $\\cos\\theta_c = \\frac{10}{17} \\approx 0.588$ (เทียบกับ $0.667$)',
    },
  },
  {
    id: 'prob-rot-falling-stick-1',
    code: 'POSN-KK-07',
    sourceExam: 'สอวน. ฟิสิกส์ ค่าย 2 / Kleppner & Kolenkow Ex. 7.17',
    topicId: 'rotation-dynamics',
    difficulty: 'Camp2_Core',
    titleTh: 'แท่งวัตถุตั้งตรงล้มลงบนพื้นราบไร้แรงเสียดทาน (Falling Stick on Frictionless Floor)',
    statementTh:
      'แท่งไม้สม่ำเสมอมวล $M$ ยาว $L$ ตั้งตรงในแนวดิ่งบนพื้นราบที่ลื่นปราศจากความเสียดทาน เมื่อถูกสะกิดเบาๆ ให้ล้มลง (เริ่มต้นจากหยุดนิ่ง) จงหาความเร็วของจุดศูนย์กลางมวลและอัตราเร็วเชิงมุมของแท่งไม้ขณะทำมุม $\\theta$ กับแนวดิ่ง รวมถึงอัตราเร็วของจุด CM ขณะกำลังฟาดพื้นพอดี ($\\theta = \\pi/2$)',
    statementLatex: 'X_{cm} = \\text{constant}, \\qquad E = \\frac{1}{2}M\\dot{Y}_{cm}^2 + \\frac{1}{2}I_0\\dot{\\theta}^2 + Mg\\frac{L}{2}\\cos\\theta',
    hints: [
      {
        tier: 1,
        type: 'physical_model',
        titleTh: 'Hint 1: สังเกตทิศการเคลื่อนที่ของ CM เมื่อพื้นลื่น',
        contentTh:
          'พื้นราบไม่มีแรงเสียดทาน แรงภายนอกทั้งหมด ($Mg$ และ $N$) อยู่ในแนวดิ่ง! ดังนั้น CM ไม่มีการเคลื่อนที่ในแนวราบเลย ($X_{cm} = \\text{constant}$ จึงตกลงมาเป็นเส้นตรงแนวดิ่ง)',
        latexSnippets: ['V_{cm, x} = 0, \\quad Y_{cm} = \\frac{L}{2}\\cos\\theta'],
      },
      {
        tier: 2,
        type: 'governing_equations',
        titleTh: 'Hint 2: เชื่อมโยงความเร็วในแนวดิ่งกับ d_theta/dt',
        contentTh:
          'ขณะยังสัมผัสพื้น (ตรวจสอบได้ภายหลังว่า $N > 0$ ตลอดทางจนถึงพื้น!) ความสูงของจุดกลางแท่งคือ $y = \\frac{L}{2}\\cos\\theta$ ดังนั้น $\\dot{y} = -\\frac{L}{2}\\sin\\theta\\,\\dot{\\theta}$',
        latexSnippets: ['V_{cm} = |\\dot{y}| = \\frac{L}{2}\\sin\\theta\\,\\dot{\\theta}'],
      },
      {
        tier: 3,
        type: 'mathematical_trick',
        titleTh: 'Hint 3: ตั้งสมการอนุรักษ์พลังงานกลด้วย Chasles Theorem',
        contentTh:
          'พลังงานจลน์รวมคือ $\\frac{1}{2}M\\dot{y}^2 + \\frac{1}{2}\\left(\\frac{1}{12}ML^2\\right)\\dot{\\theta}^2$ เท่ากับพลังงานศักย์ที่หายไป $Mg\\frac{L}{2}(1 - \\cos\\theta)$',
        latexSnippets: ['K = \\frac{1}{2}ML^2\\left(\\frac{\\sin^2\\theta}{4} + \\frac{1}{12}\\right)\\dot{\\theta}^2'],
      },
    ],
    fullSolution: {
      approachOverviewTh:
        'ใช้ข้อเท็จจริงที่ว่าไม่มีแรงภายนอกในแนวราบเพื่อบังคับให้ CM ตกตรงลงมาในแนวดิ่ง จากนั้นใช้อนุรักษ์พลังงานผ่านทฤษฎีบทของชาส์ล',
      coordinateSystemSetupTh: 'มุม theta วัดจากแนวดิ่ง (theta = 0 เริ่มต้น, theta = pi/2 เมื่อฟาดพื้น)',
      steps: [
        {
          stepNumber: 1,
          stepTitleTh: 'ระบุวิถีของ CM และความเร็ว $V_{cm}$ ในรูปของ $\\theta$ และ $\\dot{\\theta}$',
          latexMath: '\\Sigma F_x = 0 \\implies X_{cm} = \\text{const}; \\qquad y = \\frac{L}{2}\\cos\\theta \\implies \\dot{y} = -\\frac{L}{2}\\sin\\theta\\,\\dot{\\theta}',
          explanationTh:
            'ในขณะที่ปลายล่างไถลหนีออกไป จุดศูนย์กลางมวลจะตกลงในแนวดิ่งเป็นเส้นตรงเสมอ',
        },
        {
          stepNumber: 2,
          stepTitleTh: 'เขียนสมการอนุรักษ์พลังงานกล ($I_0 = \\frac{1}{12}ML^2$)',
          latexMath: '\\frac{1}{2}M\\left(\\frac{L}{2}\\sin\\theta\\,\\dot{\\theta}\\right)^2 + \\frac{1}{2}\\left(\\frac{1}{12}ML^2\\right)\\dot{\\theta}^2 = Mg\\frac{L}{2}(1 - \\cos\\theta)',
          explanationTh:
            'แรงตั้งฉาก $N$ ไม่ทำงานเพราะจุดปลายล่างเลื่อนในแนวราบ ($\\perp N$)',
        },
        {
          stepNumber: 3,
          stepTitleTh: 'แก้สมการหาความเร็วเชิงมุม $\\dot{\\theta}$ และ $V_{cm}$ ที่มุม $\\theta$ ใดๆ',
          latexMath: '\\dot{\\theta}^2 = \\frac{12g(1 - \\cos\\theta)}{L(1 + 3\\sin^2\\theta)}, \\qquad V_{cm} = \\frac{L}{2}\\sin\\theta\\sqrt{\\frac{12g(1 - \\cos\\theta)}{L(1 + 3\\sin^2\\theta)}}',
          explanationTh:
            'ดึงตัวร่วม $ML^2\\dot{\\theta}^2 / 2$ ที่มีสัมประสิทธิ์ $\\frac{3\\sin^2\\theta + 1}{12}$ ออกมา',
        },
        {
          stepNumber: 4,
          stepTitleTh: 'แทนค่า $\\theta = \\pi/2$ เพื่อหาอัตราเร็วฟาดพื้น',
          latexMath: '\\dot{\\theta}_{\\text{hit}} = \\sqrt{\\frac{3g}{L}}, \\qquad V_{cm, \\text{hit}} = \\frac{L}{2}\\sqrt{\\frac{3g}{L}} = \\frac{1}{2}\\sqrt{3gL}',
          explanationTh:
            'ที่พื้น $\\dot{y} = -\\frac{L}{2}\\dot{\\theta}$ ทำให้ปลายล่างมีความเร็ว $V_{cm} - \\frac{L}{2}\\dot{\\theta} \\neq 0$? สังเกต: ขณะฟาดพื้นจริงความเร็วแนวราบของ CM เป็นศูนย์ จึงมี $\\dot{x}_{\\text{base}} = -\\frac{L}{2}\\dot{\\theta}\\cos(\\pi/2) = 0$! ปลายล่างหยุดไถลในแนวราบพอดีในเสี้ยววินาทีที่ฟาดพื้น!',
        },
      ],
      finalAnswerLatex: '\\dot{\\theta}(\\theta) = \\sqrt{\\frac{12g(1 - \\cos\\theta)}{L(1 + 3\\sin^2\\theta)}}, \\qquad V_{cm}(\\pi/2) = \\frac{1}{2}\\sqrt{3gL}',
      examTrapWarningTh:
        'ห้ามใช้โมเมนต์ความเฉื่อย $I = \\frac{1}{3}ML^2$ รอบจุดปลายล่างเด็ดขาด! เพราะจุดปลายล่างไม่ได้ถูกตรึงไว้และมีความเร็วกับความเร่งในแนวระดับ การหมุนรอบจุด CM จึงถูกต้องเสมอ',
    },
    selfCheck: {
      id: 'check-rot-falling-stick-1',
      promptTh: 'เมื่อแท่งไม้ตั้งเอียงตกถึงพื้น ($\\theta = \\pi/2$) พลังงานจลน์ที่พื้นแบ่งเป็นพลังงานจลน์เลื่อนที่ต่อพลังงานจลน์หมุนในอัตราส่วนเท่าใด เทียบกับกรณีที่ปลายล่างถูกบานพับยึดตรึงแน่นไว้กับพื้น?',
      optionsTh: [
        'พื้นลื่น: เลื่อนที่ $\\frac{3}{4}$ หมุน $\\frac{1}{4}$ แต่ความเร็วฟาดพื้นของปลายบนคือ $\\sqrt{3gL}$ เท่ากับกรณีมีบานพับพอดี!',
        'พื้นลื่น: พลังงานหมุนมากกว่าเลื่อนที่เสมอ',
        'ปลายบนฟาดพื้นเร็วกว่ากรณีมีบานพับเสมอ เพราะไม่มีแรงเสียดทาน',
        'ปลายล่างจะกระดอนลอยขึ้นจากพื้นกลางทางที่ $\\cos\\theta = 1/3$',
      ],
      correctOptionIndex: 0,
      explanationTh:
        'ถูกต้อง! ช่วงวินาทีฟาดพื้น ปลายล่างมี $\\dot{x} = 0$ ชั่วขณะ ความเร็วปลายบนจึงเป็น $V_{cm} + \\frac{L}{2}\\dot{\\theta} = \\sqrt{3gL}$ ซึ่งเท่ากับกรณีหมุนรอบบานพับ $\\dot{\\theta}L = \\sqrt{3gL}$ อย่างน่าอัศจรรย์! และ $N > 0$ ตลอดทางไม่กระดอนพ้นพื้น',
    },
  },
  {
    id: 'prob-noninertial-car-1',
    code: 'POSN-KK-08',
    sourceExam: 'สอวน. ฟิสิกส์ ค่าย 1–2 / Kleppner & Kolenkow Ex. 9.3',
    topicId: 'non-inertial-central-force',
    difficulty: 'Camp1_Advanced',
    titleTh: 'ลูกตุ้มในรถที่กำลังเร่ง: มุมแกว่งสูงสุดและคาบในกรอบไม่เฉื่อย (Pendulum in Accelerating Car)',
    statementTh:
      'ลูกตุ้มมวล $m$ ยาว $l$ แขวนห้อยนิ่งอยู่ใต้เพดานรถไฟที่หยุดนิ่ง จากนั้นรถไฟเริ่มออกตัวด้วยความเร่งคงที่ $A$ ไปข้างหน้าในแนวระดับ (เทียบเท่าการสร้างสนามโน้มถ่วงยังผลในรถ) จงหามุมเอียงสูงสุด $\\phi_{\\max}$ ที่ลูกตุ้มแกว่งไปด้านหลัง และมุมเอียงสมดุล $\\phi_{\\text{eq}}$ พร้อมคาบการแกว่งมุมเล็กรอบสมดุลนั้น',
    statementLatex: '\\vec{g}_{\\text{eff}} = \\vec{g} - \\vec{A}, \\qquad g_{\\text{eff}} = \\sqrt{g^2 + A^2}',
    hints: [
      {
        tier: 1,
        type: 'physical_model',
        titleTh: 'Hint 1: เปลี่ยนไปมองในกรอบอ้างอิงของรถไฟที่เร่งด้วย A',
        contentTh:
          'ในกรอบรถไฟ มีแรงเทียมคงที่ $\\vec{F}_{\\text{fict}} = -m\\vec{A}$ ชี้ไปด้านหลัง เมื่อรวมกับ $m\\vec{g}$ จะเกิดสนามโน้มถ่วงยังผลที่ชี้เอียงทำมุม $\\phi_{\\text{eq}}$ กับแนวดิ่ง',
        latexSnippets: ['\\tan\\phi_{\\text{eq}} = \\frac{A}{g}'],
      },
      {
        tier: 2,
        type: 'governing_equations',
        titleTh: 'Hint 2: ใช้อนุรักษ์พลังงานในกรอบรถไฟ (หรือสมมาตรรอบ g_eff)',
        contentTh:
          'เนื่องจาก $A$ คงที่ แรงเทียม $-m\\vec{A}$ เป็นแรงอนุรักษ์! ลูกตุ้มเริ่มจากมุม $\\phi = 0$ ที่หยุดนิ่งเทียบรถไฟ จึงแกว่งสมมาตรข้ามตำแหน่งสมดุล $\\phi_{\\text{eq}}$',
        latexSnippets: ['U_{\\text{eff}}(\\phi) = -m l(g\\cos\\phi + A\\sin\\phi)'],
      },
      {
        tier: 3,
        type: 'mathematical_trick',
        titleTh: 'Hint 3: หา phi_max จากสมมาตรการแกว่ง 2 เท่าของมุมสมดุล',
        contentTh:
          'การปล่อยจาก $\\phi = 0$ ในสนาม $\\vec{g}_{\\text{eff}}$ ที่ชี้ทำมุม $\\phi_{\\text{eq}}$ ก็เหมือนปล่อยลูกตุ้มเอียงไว้ที่มุม $\\phi_{\\text{eq}}$ แล้วให้มันแกว่งไปอีกฝั่งเป็นมุม $2\\phi_{\\text{eq}}$!',
        latexSnippets: ['\\phi_{\\max} = 2\\phi_{\\text{eq}}'],
      },
    ],
    fullSolution: {
      approachOverviewTh:
        'ใช้หลักสมมูลในกรอบอ้างอิงที่มีความเร่งคงที่ เพื่อนิยามเวกเตอร์ความโน้มถ่วงยังผล g_eff แล้วประยุกต์ความสมมาตรของการแกว่งหรือสมการอนุรักษ์พลังงานในกรอบเร่ง',
      coordinateSystemSetupTh: 'มุม phi วัดจากแนวดิ่งไปด้านหลังของตัวรถไฟ',
      steps: [
        {
          stepNumber: 1,
          stepTitleTh: 'คำนวณขนาดและทิศทางของความเร่งโน้มถ่วงยังผล $\\vec{g}_{\\text{eff}}$',
          latexMath: '\\vec{g}_{\\text{eff}} = \\vec{g} - \\vec{A} \\implies g_{\\text{eff}} = \\sqrt{g^2 + A^2}, \\qquad \\tan\\phi_{\\text{eq}} = \\frac{A}{g}',
          explanationTh:
            'แกนสมดุลใหม่ของลูกตุ้มเอียงไปด้านหลังทำมุม $\\phi_{\\text{eq}} = \\arctan(A/g)$ กับแนวดิ่ง',
        },
        {
          stepNumber: 2,
          stepTitleTh: 'หาคาบการสั่นมุมเล็กรอบตำแหน่งสมดุลใหม่ $\\phi_{\\text{eq}}$',
          latexMath: 'T = 2\\pi\\sqrt{\\frac{l}{g_{\\text{eff}}}} = 2\\pi\\sqrt{\\frac{l}{\\sqrt{g^2 + A^2}}}',
          explanationTh:
            'ในกรอบรถไฟ ฟิสิกส์เหมือนโลกที่มีความโน้มถ่วงแรงขึ้นเป็น $g_{\\text{eff}}$ คาบจึงสั้นลง',
        },
        {
          stepNumber: 3,
          stepTitleTh: 'หามุมแกว่งสูงสุด $\\phi_{\\max}$ ด้วยพลังงานยังผลในกรอบรถไฟ ($K_i = K_f = 0$)',
          latexMath: 'm g l(1 - \\cos\\phi_{\\max}) = m A l\\sin\\phi_{\\max} \\implies 2\\sin^2\\frac{\\phi_{\\max}}{2} = 2\\frac{A}{g}\\sin\\frac{\\phi_{\\max}}{2}\\cos\\frac{\\phi_{\\max}}{2}',
          explanationTh:
            'งานของแรงเทียม $mAl\\sin\\phi_{\\max}$ ต้องหักล้างกับพลังงานศักย์โน้มถ่วงที่เพิ่มขึ้น $mgl(1-\\cos\\phi_{\\max})$ หรือมองจากสมมาตรของการแกว่งข้าม $\\phi_{\\text{eq}}$',
        },
        {
          stepNumber: 4,
          stepTitleTh: 'สรุปคำตอบของมุมสูงสุด',
          latexMath: '\\tan\\left(\\frac{\\phi_{\\max}}{2}\\right) = \\frac{A}{g} \\implies \\phi_{\\max} = 2\\arctan\\left(\\frac{A}{g}\\right) = 2\\phi_{\\text{eq}}',
          explanationTh:
            'ลูกตุ้มจะสวิงเลยมุมสมดุลไปเป็นสองเท่าก่อนแกว่งกลับมา อย่าตอบแค่ $\\arctan(A/g)$!',
        },
      ],
      finalAnswerLatex: '\\phi_{\\text{eq}} = \\arctan\\left(\\frac{A}{g}\\right), \\quad \\phi_{\\max} = 2\\arctan\\left(\\frac{A}{g}\\right), \\quad T = 2\\pi\\sqrt{\\frac{l}{(g^2 + A^2)^{1/2}}}',
      examTrapWarningTh:
        'โจทย์ข้อนี้หลอกเรื่อง **หยุดนิ่ง vs. กวาดสูงสุด** ได้ดีมาก: มุมสมดุลคือ $\\arctan(A/g)$ แต่มุมสูงสุดเมื่อรถไฟเร่งกระทันหันคือ $2\\arctan(A/g)$ และสังเกตว่าถ้า $A \\gg g$ มุม $\\phi_{\\max} \\to \\pi$ (ตีลังกาขึ้นด้านบนสุดได้เกือบครบรอบ)!',
    },
    selfCheck: {
      id: 'check-noninertial-car-1',
      promptTh: 'ขณะลูกตุ้มแกว่งผ่านมุมต่ำสุดในกรอบยังผล ($\\phi = \\phi_{\\text{eq}}$) ความตึงเชือก $T$ มีค่าเป็นเท่าใดเมื่อปล่อยจากมุม $\\phi = 0$?',
      optionsTh: [
        '$T = mg_{\\text{eff}}(3 - 2\\cos\\phi_{\\text{eq}})$ โดยที่ $g_{\\text{eff}} = \\sqrt{g^2 + A^2}$',
        '$T = mg_{\\text{eff}}$ พอดี',
        '$T = mg + mA$',
        '$T = m\\sqrt{g^2 + A^2}\\cos\\phi_{\\text{eq}}$',
      ],
      correctOptionIndex: 0,
      explanationTh:
        'ถูกต้อง! เหมือนลูกตุ้มธรรมดาในสนาม $g_{\\text{eff}}$ ที่ปล่อยจากมุม $\\phi_{\\text{eq}}$: $T - mg_{\\text{eff}} = \\frac{mv^2}{l} = 2mg_{\\text{eff}}(1 - \\cos\\phi_{\\text{eq}}) \\implies T = mg_{\\text{eff}}(3 - 2\\cos\\phi_{\\text{eq}})$',
    },
  },
  {
    id: 'prob-central-hohmann-1',
    code: 'POSN-KK-09',
    sourceExam: 'สอวน. ฟิสิกส์ ค่าย 2 / Kleppner & Kolenkow Ex. 10.6',
    topicId: 'non-inertial-central-force',
    difficulty: 'Camp2_Core',
    titleTh: 'การโอนย้ายวงโคจรแบบโฮห์มันน์ (Hohmann Transfer Orbit & Vis-Viva)',
    statementTh:
      'ดาวเทียมมวล $m$ กำลังโคจรเป็นวงกลมรัศมี $r_1$ รอบดาวเคราะห์มวล $M$ ด้วยอัตราเร็ว $v_1 = \\sqrt{GM/r_1}$ ต้องการส่งดาวเทียมขึ้นไปยังวงโคจรวงกลมที่สูงกว่าคือรัศมี $r_2$ โดยจุดจรวดสั้นๆ 2 ครั้งเพื่อใช้วงโคจรวงรีโอนย้าย (Transfer Ellipse) ที่มีจุดใกล้สุด $r_p = r_1$ และจุดไกลสุด $r_a = r_2$ จงหาการเปลี่ยนความเร็ว $\\Delta v_1$ ในการจุดเครื่องยนต์ครั้งแรก และอัตราส่วนเวลารอในการเดินทาง $t_{\\text{transfer}}$ เทียบกับคาบวงโคจรเริ่มต้น $T_1$',
    statementLatex: '2a = r_1 + r_2, \\qquad v^2 = GM\\left(\\frac{2}{r} - \\frac{1}{a}\\right)',
    hints: [
      {
        tier: 1,
        type: 'physical_model',
        titleTh: 'Hint 1: เชื่อมโยงเรขาคณิตวงรีโอนย้ายกับ Vis-Viva',
        contentTh:
          'วงรีโอนย้ายสัมผัสวงกลมเล็กที่ $r_1$ (Perigee) และสัมผัสวงกลมใหญ่ที่ $r_2$ (Apogee) ดังนั้นแกนกึ่งเอกคือ $a = \\frac{r_1 + r_2}{2}$',
        latexSnippets: ['a_{\\text{trans}} = \\frac{r_1 + r_2}{2}'],
      },
      {
        tier: 2,
        type: 'governing_equations',
        titleTh: 'Hint 2: คำนวณอัตราเร็วบนวงรีที่ r_1 จากสมการ Vis-Viva',
        contentTh:
          'จาก $E = -\\frac{GMm}{2a} = \\frac{1}{2}mv_p^2 - \\frac{GMm}{r_1}$ จะได้ $v_p^2 = GM\\left(\\frac{2}{r_1} - \\frac{2}{r_1+r_2}\\right) = \\frac{GM}{r_1}\\left(\\frac{2r_2}{r_1+r_2}\\right)$',
        latexSnippets: ['v_p = v_1\\sqrt{\\frac{2r_2}{r_1 + r_2}}'],
      },
      {
        tier: 3,
        type: 'mathematical_trick',
        titleTh: 'Hint 3: เวลาเดินทางคือครึ่งคาบของวงรีตามกฎข้อที่ 3 ของเคปเลอร์',
        contentTh:
          'ดาวเทียมเดินทางจาก Perigee ไป Apogee ใช้เวลาเท่ากับ $\\frac{1}{2}T_{\\text{ellipse}}$ โดยที่ $T^2 \\propto a^3$',
        latexSnippets: ['\\frac{t_{\\text{transfer}}}{T_1} = \\frac{1}{2}\\left(\\frac{a_{\\text{trans}}}{r_1}\\right)^{3/2}'],
      },
    ],
    fullSolution: {
      approachOverviewTh:
        'ใช้สมการพลังงานของวงโคจร (Vis-Viva) หาความเร็วที่จุด Perigee ของวงรีโอนย้าย แล้วใช้กฎข้อที่ 3 ของเคปเลอร์คำนวณระยะเวลาการเดินทางครึ่งรอบ',
      coordinateSystemSetupTh: 'จุดศูนย์กลางดาวเคราะห์เป็นจุดโฟกัสของวงรีและจุดศูนย์กลางวงกลมทั้งสอง',
      steps: [
        {
          stepNumber: 1,
          stepTitleTh: 'หาแกนกึ่งเอก $a$ และความเร็วที่จุดเริ่มต้นของวงรี $v_p$',
          latexMath: 'a = \\frac{r_1 + r_2}{2}, \\qquad v_p^2 = GM\\left(\\frac{2}{r_1} - \\frac{2}{r_1+r_2}\\right) = \\frac{GM}{r_1}\\left(\\frac{2r_2}{r_1+r_2}\\right)',
          explanationTh:
            'สังเกตว่าเพราะ $r_2 > r_1$ จึงได้ $\\frac{2r_2}{r_1+r_2} > 1$ ทำให้ $v_p > v_1$',
        },
        {
          stepNumber: 2,
          stepTitleTh: 'คำนวณ $\\Delta v_1 = v_p - v_1$',
          latexMath: '\\Delta v_1 = \\sqrt{\\frac{GM}{r_1}}\\left(\\sqrt{\\frac{2r_2}{r_1 + r_2}} - 1\\right)',
          explanationTh:
            'เครื่องยนต์จุดสั้นๆ ในทิศเดียวกับการเคลื่อนที่เพื่อเพิ่มพลังงานกลให้วงกลมยืดออกเป็นวงรี (และต้องจุดอีกครั้ง $\\Delta v_2 = v_2 - v_a$ เมื่อถึง $r_2$ เพื่อปั้นเป็นวงกลมใหม่)',
        },
        {
          stepNumber: 3,
          stepTitleTh: 'คำนวณระยะเวลาเดินทาง $t_{\\text{transfer}} = T_{\\text{trans}} / 2$',
          latexMath: 't_{\\text{transfer}} = \\frac{1}{2}T_1\\left(\\frac{a}{r_1}\\right)^{3/2} = \\frac{T_1}{2}\\left(\\frac{r_1 + r_2}{2r_1}\\right)^{3/2}',
          explanationTh:
            'ใช้กฎข้อที่ 3 ของเคปเลอร์เทียบวงรีโอนย้าย (แกนกึ่งเอก $a$) กับวงกลมเดิม (รัศมี $r_1$)',
        },
      ],
      finalAnswerLatex: '\\Delta v_1 = \\sqrt{\\frac{GM}{r_1}}\\left(\\sqrt{\\frac{2r_2}{r_1 + r_2}} - 1\\right), \\qquad \\frac{t_{\\text{transfer}}}{T_1} = \\frac{1}{2}\\left(\\frac{r_1 + r_2}{2r_1}\\right)^{3/2}',
      examTrapWarningTh:
        'ในการเปลี่ยนวงโคจร Hohmann Transfer ต้องจุดเครื่องยนต์ **2 ครั้ง**! ครั้งแรกที่ $r_1$ เพื่อเข้าวงรี และครั้งที่สองที่ $r_2$ มิฉะนั้นดาวเทียมจะตกลงกลับมาที่ $r_1$ ในครึ่งคาบถัดไป!',
    },
    selfCheck: {
      id: 'check-central-hohmann-1',
      promptTh: 'สมมติยานอวกาศที่โคจรรอบโลกต้องการส่งยานไปดาวอังคาร โดยประมาณวงโคจรโลกและดาวอังคารเป็นวงกลมรัศมี $1.0\\text{ AU}$ และ $1.5\\text{ AU}$ ตามลำดับ เวลาเดินทางขาเดียวตามเส้นทางโฮห์มันน์จะใช้ประมาณกี่ปี (โดย $T_{\\text{Earth}} = 1$ ปี)?',
      optionsTh: [
        '$\\frac{1}{2}(1.25)^{3/2} \\approx 0.70$ ปี (ประมาณ 8.4 เดือน)',
        '$(1.25)^{3/2} \\approx 1.40$ ปี',
        '$\\frac{1}{2}(1.5)^{3/2} \\approx 0.92$ ปี',
        '$\\frac{1}{2}(2.5)^{3/2} \\approx 1.98$ ปี',
      ],
      correctOptionIndex: 0,
      explanationTh:
        'ถูกต้อง! $a = \\frac{1.0 + 1.5}{2} = 1.25\\text{ AU}$ ดังนั้นคาบเต็มคือ $1.25^{3/2} \\approx 1.398$ ปี เวลาเดินทางครึ่งรอบจากโลกไปดาวอังคารจึงเป็น $0.70$ ปี (~255 วัน)',
    },
  },
  {
    id: 'prob-shm-coupled-1',
    code: 'POSN-KK-10',
    sourceExam: 'สอวน. ฟิสิกส์ ค่าย 2 / Kleppner & Kolenkow Ex. 6.5',
    topicId: 'shm-differential-eq',
    difficulty: 'Camp2_Core',
    titleTh: 'ลูกตุ้มคู่ควบด้วยสปริง: โหมดปกติและเวลาถ่ายเทพลังงานทั้งหมด (Coupled Pendulums & Beats)',
    statementTh:
      'ลูกตุ้มเหมือนกัน 2 อัน แต่ละอันมีมวล $m$ และเชือกยาว $l$ แขวนห้อยเคียงข้างกัน โดยมีสปริงเบาค่าคงที่ $k$ ($k \\ll mg/l$ คือเป็น Weak Coupling) เชื่อมระหว่างมวลทั้งสองซึ่งไม่ยืดหดขณะห้อยดิ่ง เริ่มต้นที่ $t = 0$ ดึงมวลก้อนแรกออกมาเล็กน้อยเป็นระยะ $x_0$ ส่วนมวลก้อนที่สองอยู่นิ่งที่สมดุล ($x_b(0) = 0$) แล้วปล่อยพร้อมกัน จงหาความถี่ปกติทั้งสองโหมด และเวลาที่สั้นที่สุด $t_{\\text{swap}}$ ที่มวลก้อนแรกจะหยุดนิ่งสนิทและถ่ายเทพลังงานทั้งหมดให้มวลก้อนที่สอง',
    statementLatex: '\\omega_1 = \\sqrt{\\frac{g}{l}}, \\qquad \\omega_2 = \\sqrt{\\frac{g}{l} + \\frac{2k}{m}}',
    hints: [
      {
        tier: 1,
        type: 'physical_model',
        titleTh: 'Hint 1: ใช้พิกัดปกติ q1 = x_a + x_b และ q2 = x_a - x_b',
        contentTh:
          'ความถี่ปกติของโหมดสมมาตร ($x_a = x_b$) คือ $\\omega_1 = \\sqrt{g/l}$ และโหมดต้านสมมาตร ($x_a = -x_b$) คือ $\\omega_2 = \\sqrt{\\frac{g}{l} + \\frac{2k}{m}}$',
        latexSnippets: ['q_1(t) = x_0\\cos(\\omega_1 t), \\quad q_2(t) = x_0\\cos(\\omega_2 t)'],
      },
      {
        tier: 2,
        type: 'governing_equations',
        titleTh: 'Hint 2: ซ้อนทับผลเฉลยเพื่อหา x_a(t) และ x_b(t)',
        contentTh:
          'แทนเงื่อนไขเริ่มต้น $x_a(0)=x_0, x_b(0)=0, \\dot{x}_a(0)=\\dot{x}_b(0)=0$ จะได้ $x_a(t) = \\frac{x_0}{2}(\\cos\\omega_1 t + \\cos\\omega_2 t)$',
        latexSnippets: ['x_a(t) = x_0\\cos\\left(\\frac{\\omega_2 - \\omega_1}{2}t\\right)\\cos\\left(\\frac{\\omega_1 + \\omega_2}{2}t\\right)'],
      },
      {
        tier: 3,
        type: 'mathematical_trick',
        titleTh: 'Hint 3: ประมาณความถี่บีตส์เมื่อ k << mg/l',
        contentTh:
          'มวลก้อนแรกหยุดนิ่งเมื่อซองคลื่น (Envelope) เป็นศูนย์ครั้งแรก: $\\frac{\\omega_2 - \\omega_1}{2} t_{\\text{swap}} = \\frac{\\pi}{2}$ และใช้ $(1 + \\epsilon)^{1/2} \\approx 1 + \\frac{1}{2}\\epsilon$ หา $\\omega_2 - \\omega_1$',
        latexSnippets: ['\\omega_2 - \\omega_1 \\approx \\omega_1\\left(\\frac{kl}{mg}\\right)'],
      },
    ],
    fullSolution: {
      approachOverviewTh:
        'สร้างฟังก์ชันการเคลื่อนที่จากการซ้อนทับของสองโหมดปกติ หาจังหวะที่ซองคลื่นของมวลก้อนแรกเป็นศูนย์ และใช้ Binomial Approximation สำหรับข้อต่ออ่อน',
      coordinateSystemSetupTh: 'x_a, x_b คือการกระจัดมุมเล็กในแนวราบของลูกตุ้มแต่ละตัวจากจุดสมดุล',
      steps: [
        {
          stepNumber: 1,
          stepTitleTh: 'หาผลเฉลยของพิกัดปกติ $q_1 = x_a + x_b$ และ $q_2 = x_a - x_b$',
          latexMath: 'q_1(0) = x_0, \\; q_2(0) = x_0, \\; \\dot{q}_1(0) = \\dot{q}_2(0) = 0 \\implies q_1(t) = x_0\\cos\\omega_1 t, \\; q_2(t) = x_0\\cos\\omega_2 t',
          explanationTh:
            'เริ่มต้นเราปลุกทั้งสองโหมดปกติด้วยแอมพลิจูดเท่ากันพอดี!',
        },
        {
          stepNumber: 2,
          stepTitleTh: 'แปลงกลับเป็นตำแหน่ง $x_a(t)$ และ $x_b(t)$ ด้วยเอกลักษณ์ตรีโกณมิติ',
          latexMath: 'x_a(t) = \\frac{q_1 + q_2}{2} = x_0\\cos\\left(\\frac{\\omega_2 - \\omega_1}{2}t\\right)\\cos\\left(\\frac{\\omega_1 + \\omega_2}{2}t\\right)',
          explanationTh:
            'คลื่นความถี่เร็ว $\\frac{\\omega_1+\\omega_2}{2}$ ถูกห่อหุ้มด้วยซองแอมพลิจูดความถี่ช้า $\\frac{\\omega_2-\\omega_1}{2}$',
        },
        {
          stepNumber: 3,
          stepTitleTh: 'หาเวลาถ่ายเทพลังงานสมบูรณ์ $t_{\\text{swap}}$ ในลิมิต Weak Coupling ($kl \\ll mg$)',
          latexMath: '\\frac{\\omega_2 - \\omega_1}{2} t_{\\text{swap}} = \\frac{\\pi}{2} \\implies t_{\\text{swap}} = \\frac{\\pi}{\\omega_2 - \\omega_1}',
          explanationTh:
            'กระจาย Binomial: $\\omega_2 = \\omega_1\\sqrt{1 + \\frac{2kl}{mg}} \\approx \\omega_1\\left(1 + \\frac{kl}{mg}\\right) \\implies \\omega_2 - \\omega_1 \\approx \\frac{k}{m}\\sqrt{\\frac{l}{g}}$',
        },
        {
          stepNumber: 4,
          stepTitleTh: 'สรุปค่า $t_{\\text{swap}}$',
          latexMath: 't_{\\text{swap}} \\approx \\frac{\\pi m}{k}\\sqrt{\\frac{g}{l}} = \\frac{T_1}{2}\\left(\\frac{mg}{kl}\\right)',
          explanationTh:
            'ยิ่งสปริงอ่อน ($k$ น้อย) ยิ่งต้องใช้เวลาสั่นหลายรอบกว่าพลังงานทั้งหมดจะไหลข้ามไปยังลูกตุ้มอีกอันได้สมบูรณ์',
        },
      ],
      finalAnswerLatex: '\\omega_1 = \\sqrt{\\frac{g}{l}}, \\quad \\omega_2 = \\sqrt{\\frac{g}{l} + \\frac{2k}{m}}, \\quad t_{\\text{swap}} = \\frac{\\pi}{\\omega_2 - \\omega_1} \\approx \\frac{\\pi m}{k}\\sqrt{\\frac{g}{l}}',
      examTrapWarningTh:
        'ระวังตัวเลข $2$ ใน $\\frac{\\omega_2 - \\omega_1}{2}$! จุดตัดศูนย์แรกของซองคลื่น $\\cos(\\Delta\\omega\\,t / 2)$ เกิดขึ้นที่ $t = \\frac{\\pi}{\\omega_2 - \\omega_1}$ (ไม่ใช่ $t = \\frac{2\\pi}{\\omega_2 - \\omega_1}$ เพราะนั้นคือเวลาที่พลังงานกลับมาที่ลูกตุ้มตัวแรกอีกรอบ!)',
    },
    selfCheck: {
      id: 'check-shm-coupled-1',
      promptTh: 'หากเริ่มต้นดึงลูกตุ้มทั้งสองออก **ไปทางขวาเท่ากัน** ($x_a(0) = x_0, x_b(0) = x_0$) แล้วปล่อยพร้อมกัน จะเกิดการถ่ายเทพลังงานแบบบีตส์หรือไม่?',
      optionsTh: [
        'ไม่เกิด! เพราะระบบแกว่งอยู่ในโหมดปกติที่ 1 ($\\omega_1 = \\sqrt{g/l}$) ล้วนๆ สปริงไม่ถูกยืดหรือหดเลยตลอดเวลา',
        'เกิดบีตส์ด้วยความถี่ $\\omega_2 - \\omega_1$ เท่าเดิม',
        'เกิดบีตส์ด้วยความถี่เร็วขึ้น 2 เท่า',
        'ลูกตุ้มทั้งสองจะหยุดนิ่งในคาบที่ 1 ทันที',
      ],
      correctOptionIndex: 0,
      explanationTh:
        'ถูกต้อง! เมื่อ $x_a(0) = x_b(0)$ แอมพลิจูดของโหมดต้านสมมาตร $q_2 = 0$ ระบบจึงเคลื่อนที่ด้วยโหมดเดียวอย่างสมบูรณ์และตลอดไป!',
    },
  },
];
