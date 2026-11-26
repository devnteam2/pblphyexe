// src/data/preCamp1ProblemsData.ts
import { POSNProblem } from '@/types/problem';

export const PRE_CAMP1_PROBLEMS: POSNProblem[] = [
  {
    id: 'prob-pre-mech-1',
    code: 'PRE-C1-M01',
    sourceExam: 'แนวข้อสอบคัดเลือก สอวน. ค่าย 1 (หัวข้อ 1, 2, 5)',
    topicId: 'pre-mechanics',
    difficulty: 'PreCamp1_Entrance',
    titleTh: 'แปลงหน่วยและเช็กแรงเสียดทานสถิตบนพื้นเอียง (ห้ามโดนหลอกใช้ μs N!)',
    statementTh:
      'กล่องมวล $4.0\\text{ kg}$ ถูกวางบนพื้นเอียงหยาบทำมุม $37^\\circ$ กับแนวราบ ($\\sin 37^\\circ = 0.6, \\cos 37^\\circ = 0.8, g = 10\\text{ m/s}^2$) โดยมี $\\mu_s = 0.80$ และ $\\mu_k = 0.50$ หากรถบรรทุกที่พื้นเอียงกำลังแล่นสม่ำเสมอด้วยความเร็ว $108\\text{ km/h}$ ในแนวราบ (กรอบเฉื่อย!) จงหาว่ากล่องไถลหรือไม่ และแรงเสียดทานที่พื้นเอียงกระทำต่อกล่องมีขนาดเท่าใด',
    statementLatex: 'm = 4.0\\text{ kg}, \\quad \\theta = 37^\\circ, \\quad \\mu_s = 0.80, \\quad v_{\\text{truck}} = 108\\text{ km/h}',
    hints: [
      {
        tier: 1,
        type: 'physical_model',
        titleTh: 'Hint 1: รถแล่นความเร็วคงที่เป็นกรอบอ้างอิงเฉื่อย (กฎข้อที่ 1)',
        contentTh:
          'รถแล่นด้วยความเร็วคงที่ $108\\text{ km/h} = 30\\text{ m/s}$ จึงไม่มีความเร่ง (กรอบเฉื่อย) กฎของนิวตันจึงใช้ได้เหมือนวางบนพื้นโลกอยู่นิ่ง!',
        latexSnippets: ['v = \\frac{108}{3.6} = 30\\text{ m s}^{-1}, \\quad \\vec{a}_{\\text{frame}} = 0'],
      },
      {
        tier: 2,
        type: 'governing_equations',
        titleTh: 'Hint 2: เปรียบเทียบแรงฉุดลงพื้นเอียงกับแรงเสียดทานสถิตสูงสุด',
        contentTh:
          'คำนวณ $mg\\sin\\theta$ และเทียบกับ $f_{s,\\max} = \\mu_s N = \\mu_s mg\\cos\\theta$',
        latexSnippets: ['mg\\sin 37^\\circ = 40(0.6) = 24\\text{ N}, \\quad f_{s,\\max} = 0.80(40 \\times 0.8) = 25.6\\text{ N}'],
      },
      {
        tier: 3,
        type: 'mathematical_trick',
        titleTh: 'Hint 3: เมื่อยังไม่ไถล แรงเสียดทานสถิตเท่ากับแรงที่ต้านพอดี',
        contentTh:
          'เนื่องจาก $24\\text{ N} < 25.6\\text{ N}$ กล่องจึง **ยังไม่ไถล!** แรงเสียดทานจึงปรับค่าขึ้นมาต้านเท่ากับ $mg\\sin 37^\\circ$ พอดี',
        latexSnippets: ['f_s = mg\\sin 37^\\circ \\neq \\mu_s N'],
      },
    ],
    fullSolution: {
      approachOverviewTh:
        'ตรวจสอบความเฉื่อยของกรอบ (แปลงหน่วย 108 km/h = 30 m/s คงที่) แล้วเทียบแรงดึงลงกับ f_s,max ก่อนสรุปขนาดแรงเสียดทานจริง',
      coordinateSystemSetupTh: 'แกน x ขนานพื้นเอียง, แกน y ตั้งฉากพื้นเอียงในกรอบรถบรรทุก',
      steps: [
        {
          stepNumber: 1,
          stepTitleTh: 'ตรวจสอบกรอบอ้างอิงและแปลงหน่วยความเร็วรถ',
          latexMath: 'v = 108\\text{ km/h} = \\frac{108}{3.6}\\text{ m/s} = 30\\text{ m/s} \\; (\\text{คงที่} \\implies a_{\\text{frame}} = 0)',
          explanationTh: 'ตามกฎข้อที่ 1 รถเคลื่อนที่ด้วยความเร็วสม่ำเสมอจึงเป็นกรอบอ้างอิงเฉื่อย ไม่มีแรงเทียมเกิดขึ้น',
        },
        {
          stepNumber: 2,
          stepTitleTh: 'หาแรงตั้งฉาก $N$ และแรงเสียดทานสถิตสูงสุด $f_{s,\\max}$',
          latexMath: 'N = mg\\cos 37^\\circ = 4(10)(0.8) = 32\\text{ N}, \\qquad f_{s,\\max} = \\mu_s N = 0.80(32) = 25.6\\text{ N}',
          explanationTh: 'นี่คือขีดจำกัดสูงสุดที่พื้นเอียงจะรั้งกล่องไว้ได้ก่อนเริ่มไถล',
        },
        {
          stepNumber: 3,
          stepTitleTh: 'เทียบแรงดึงลงพื้นเอียงกับ $f_{s,\\max}$',
          latexMath: 'F_{\\text{down}} = mg\\sin 37^\\circ = 4(10)(0.6) = 24.0\\text{ N} < 25.6\\text{ N} \\implies \\text{อยู่นิ่ง } f_s = 24.0\\text{ N}',
          explanationTh: 'กล่องยังคงหยุดนิ่งบนพื้นเอียง แรงเสียดทานสถิตจึงเป็น $24.0\\text{ N}$ ชี้ขึ้นตามพื้นเอียง',
        },
      ],
      finalAnswerLatex: 'v = 30\\text{ m/s}, \\qquad \\text{กล่องไม่ไถล}, \\qquad f_s = 24.0\\text{ N}',
      examTrapWarningTh:
        'กับดักอันดับ 1 ในข้อสอบเข้าค่าย 1: เห็น $\\mu_s = 0.80$ แล้วรีบเอาไปคูณ $N$ ตอบ $25.6\\text{ N}$ ทันที! อย่าลืมเช็กก่อนเสมอว่าถึงขีดเริ่มไถลหรือยัง!',
    },
    selfCheck: {
      id: 'check-pre-mech-1',
      promptTh: 'หากเปลี่ยนมุมพื้นเอียงเป็น $53^\\circ$ ($\\sin 53^\\circ = 0.8, \\cos 53^\\circ = 0.6$) แรงเสียดทานที่เกิดขึ้นจะเปลี่ยนเป็นเท่าใด?',
      optionsTh: [
        '$f_k = 12.0\\text{ N}$ (กล่องไถลลงด้วยความเร่ง)',
        '$f_s = 19.2\\text{ N}$ (กล่องยังไม่ไถล)',
        '$f_s = 32.0\\text{ N}$',
        '$f_k = 16.0\\text{ N}$',
      ],
      correctOptionIndex: 0,
      explanationTh:
        'ถูกต้อง! ที่ $53^\\circ$ แรงลง $mg\\sin 53^\\circ = 32\\text{ N} > f_{s,\\max} = 0.8(40\\times 0.6) = 19.2\\text{ N}$ กล่องจึงเริ่มไถล ต้องเปลี่ยนมาใช้ $\\mu_k = 0.50 \\implies f_k = 0.50(24) = 12.0\\text{ N}$!',
    },
  },
  {
    id: 'prob-pre-mech-2',
    code: 'PRE-C1-M02',
    sourceExam: 'แนวข้อสอบคัดเลือก สอวน. ค่าย 1 (หัวข้อ 3, 4, 6)',
    topicId: 'pre-mechanics',
    difficulty: 'PreCamp1_Entrance',
    titleTh: 'ลูกตุ้มขีปนาวุธผสมโพรเจกไทล์: ชนฝังตัวแล้วหลุดจากขอบโต๊ะ',
    statementTh:
      'กระสุนมวล $20\\text{ g}$ วิ่งในแนวระดับด้วยความเร็ว $v_0$ เข้าฝังในกล่องไม้มวล $980\\text{ g}$ ที่วางนิ่งอยู่บนขอบโต๊ะลื่นสูง $H = 1.25\\text{ m}$ ($g = 10\\text{ m/s}^2$) หากหลังชนกล่องไม้พร้อมกระสุนพุ่งตกลงพื้นราบห่างจากขอบโต๊ะในแนวราบ $x = 2.0\\text{ m}$ จงหาอัตราเร็วเริ่มต้น $v_0$ ของกระสุน',
    statementLatex: 'm = 0.02\\text{ kg}, \\quad M = 0.98\\text{ kg}, \\quad H = 1.25\\text{ m}, \\quad x = 2.0\\text{ m}',
    hints: [
      {
        tier: 1,
        type: 'physical_model',
        titleTh: 'Hint 1: แยกเหตุการณ์ออกเป็น "ช่วงชน" กับ "ช่วงตกแบบโพรเจกไทล์"',
        contentTh:
          'ช่วงแรก (ชนฝังตัว) ใช้อนุรักษ์โมเมนตัมเพื่อเชื่อม $v_0$ กับความเร็วร่วม $V$ หลังชน; ช่วงหลังใช้สมการโพรเจกไทล์แนวดิ่ง-แนวราบหา $V$',
        latexSnippets: ['m v_0 = (m + M)V'],
      },
      {
        tier: 2,
        type: 'governing_equations',
        titleTh: 'Hint 2: หาเวลาตกจากความสูง H ตามสมการโพรเจกไทล์',
        contentTh:
          'แนวดิ่งเริ่มต้น $v_{0y} = 0$: ความสูงลดลง $H = \\frac{1}{2}gt^2$ ทำให้รู้เวลา $t$ ที่ลอยอยู่ในอากาศ',
        latexSnippets: ['t = \\sqrt{\\frac{2H}{g}}, \\qquad x = V t'],
      },
      {
        tier: 3,
        type: 'mathematical_trick',
        titleTh: 'Hint 3: แทนค่าตัวเลขให้ถูกหน่วย SI (g -> kg)',
        contentTh:
          'มวลรวม $m + M = 0.02 + 0.98 = 1.00\\text{ kg}$ เวลาตก $t = \\sqrt{\\frac{2.5}{10}} = 0.5\\text{ s}$',
        latexSnippets: ['V = \\frac{x}{t} = 4.0\\text{ m/s}'],
      },
    ],
    fullSolution: {
      approachOverviewTh:
        'คิดย้อนกลับจากระยะตกโพรเจกไทล์เพื่อหาความเร็วหลังชน V ก่อน แล้วค่อยใช้อนุรักษ์โมเมนตัมเพื่อย้อนหาความเร็วกระสุน v_0',
      coordinateSystemSetupTh: 'แกน x แนวราบพุ่งออกจากโต๊ะ, แกน y วัดความสูงจากพื้น (y(t) = H - 0.5 g t^2)',
      steps: [
        {
          stepNumber: 1,
          stepTitleTh: 'หาเวลาที่กล่องลอยอยู่ในอากาศจากสมการโพรเจกไทล์แนวดิ่ง',
          latexMath: '0 = -\\frac{1}{2}(10)t^2 + 1.25 \\implies t^2 = 0.25 \\implies t = 0.5\\text{ s}',
          explanationTh: 'เพราะความเร็วเริ่มต้นแนวดิ่งเป็นศูนย์ ($C_1 = 0, C_2 = H$)',
        },
        {
          stepNumber: 2,
          stepTitleTh: 'หาความเร็วหลังชน $V$ จากระยะตกในแนวราบ',
          latexMath: 'x = V t \\implies V = \\frac{2.0\\text{ m}}{0.5\\text{ s}} = 4.0\\text{ m/s}',
          explanationTh: 'แนวราบไม่มีความเร่ง ความเร็วหลังชนจึงคงที่ตลอดช่วงที่ลอยอยู่',
        },
        {
          stepNumber: 3,
          stepTitleTh: 'ใช้อนุรักษ์โมเมนตัมหาความเร็วกระสุนก่อนชน $v_0$',
          latexMath: '(0.02) v_0 = (0.02 + 0.98)(4.0) \\implies v_0 = \\frac{4.0}{0.02} = 200\\text{ m/s}',
          explanationTh: 'สังเกตว่าสัดส่วนพลังงานจลน์เกือบ 98% หายไปเป็นความร้อนขณะกระสุนเจาะเข้าเนื้อไม้!',
        },
      ],
      finalAnswerLatex: 'V = 4.0\\text{ m/s}, \\qquad v_0 = 200\\text{ m/s}',
      examTrapWarningTh:
        'ห้ามจับ $\\frac{1}{2}m v_0^2 = \\frac{1}{2}(m+M)V^2$ เด็ดขาด! เพราะการชนฝังตัวเป็น Inelastic Collision สูญเสียพลังงานจลน์มหาศาล',
    },
    selfCheck: {
      id: 'check-pre-mech-2',
      promptTh: 'ในโจทย์ข้อนี้ พลังงานจลน์สูญเสียไปเป็นความร้อนและเสียงขณะกระสุนฝังตัวในเนื้อไม้เป็นกี่เปอร์เซ็นต์ของพลังงานเริ่มต้น?',
      optionsTh: [
        '$98\\%$ (เหลือเป็นพลังงานจลน์หลังชนเพียง $2\\%$)',
        '$50\\%$',
        '$2\\%$',
        '$0\\%$ (พลังงานกลอนุรักษ์ตลอดเวลา)',
      ],
      correctOptionIndex: 0,
      explanationTh:
        'ถูกต้อง! $K_{\\text{initial}} = \\frac{1}{2}(0.02)(200)^2 = 400\\text{ J}$, แต่ $K_{\\text{after}} = \\frac{1}{2}(1.0)(4)^2 = 8\\text{ J}$ หายไปถึง $392/400 = 98\\%$!',
    },
  },
  {
    id: 'prob-pre-fluid-1',
    code: 'PRE-C1-F01',
    sourceExam: 'แนวข้อสอบคัดเลือก สอวน. ค่าย 1 (หัวข้อ 10, 11)',
    topicId: 'pre-fluids-thermo',
    difficulty: 'PreCamp1_Entrance',
    titleTh: 'สมการ Bernoulli: ถังน้ำเจาะรูกับท่อน้ำแคบลงในแนวนอน',
    statementTh:
      'ท่อน้ำแนวนอนมีพื้นที่หน้าตัดใหญ่ $A_1 = 40\\text{ cm}^2$ น้ำความหนาแน่น $\\rho = 1000\\text{ kg/m}^3$ ไหลเข้าด้วยอัตราเร็ว $v_1 = 2.0\\text{ m/s}$ ที่ความดัน $P_1 = 1.5 \\times 10^5\\text{ Pa}$ จากนั้นท่อบีบแคบลงเหลือพื้นที่หน้าตัด $A_2 = 10\\text{ cm}^2$ จงหาอัตราเร็ว $v_2$ และความดัน $P_2$ ในท่อแคบ',
    statementLatex: 'A_1 v_1 = A_2 v_2, \\qquad P_1 + \\frac{1}{2}\\rho v_1^2 = P_2 + \\frac{1}{2}\\rho v_2^2',
    hints: [
      {
        tier: 1,
        type: 'physical_model',
        titleTh: 'Hint 1: ใช้สมการความต่อเนื่องหาความเร็วก่อน',
        contentTh:
          'ปริมาณน้ำไหลผ่านต่อวินาทีเท่ากันทุกหน้าตัด: $A_1 v_1 = A_2 v_2$ (ไม่ต้องแปลง cm² เป็น m² ก็ตัดอัตราส่วนกันได้!)',
        latexSnippets: ['40(2.0) = 10 v_2'],
      },
      {
        tier: 2,
        type: 'governing_equations',
        titleTh: 'Hint 2: ตั้งสมการ Bernoulli สำหรับท่อระดับเดียวกัน (h₁ = h₂)',
        contentTh:
          'เพราะท่อวางในแนวนอน พจน์ $\\rho gh$ จึงเท่ากันทั้งสองข้าง เหลือเพียง $P_1 + \\frac{1}{2}\\rho v_1^2 = P_2 + \\frac{1}{2}\\rho v_2^2$',
        latexSnippets: ['P_2 = P_1 - \\frac{1}{2}\\rho(v_2^2 - v_1^2)'],
      },
      {
        tier: 3,
        type: 'mathematical_trick',
        titleTh: 'Hint 3: แทนค่าในหน่วย SI (kg/m³ และ Pa)',
        contentTh:
          'คำนวณ $\\frac{1}{2}(1000)(8^2 - 2^2) = 500(60) = 3.0 \\times 10^4\\text{ Pa}$ แล้วนำไปลบจาก $P_1$',
        latexSnippets: ['P_2 = 1.5 \\times 10^5 - 0.3 \\times 10^5'],
      },
    ],
    fullSolution: {
      approachOverviewTh:
        'หาอัตราเร็วในท่อแคบด้วยสมการความต่อเนื่องก่อน แล้วนำไปแทนในสมการ Bernoulli ที่ความสูงเท่ากันเพื่อแก้หาความดัน P_2',
      coordinateSystemSetupTh: 'แกนเส้นกระแสในแนวระดับ h_1 = h_2',
      steps: [
        {
          stepNumber: 1,
          stepTitleTh: 'คำนวณอัตราเร็วในส่วนแคบด้วยสมการความต่อเนื่อง',
          latexMath: 'A_1 v_1 = A_2 v_2 \\implies v_2 = \\left(\\frac{40}{10}\\right)(2.0) = 8.0\\text{ m/s}',
          explanationTh: 'พื้นที่ลดลง 4 เท่า อัตราเร็วของน้ำจึงพุ่งขึ้น 4 เท่า',
        },
        {
          stepNumber: 2,
          stepTitleTh: 'ประยุกต์สมการของ Bernoulli เพื่อหาความดัน $P_2$',
          latexMath: 'P_2 = P_1 + \\frac{1}{2}\\rho(v_1^2 - v_2^2) = 1.5\\times 10^5 + 500(4 - 64) = 1.2 \\times 10^5\\text{ Pa}',
          explanationTh: 'ความดันลดลงจาก $150\\text{ kPa}$ เหลือ $120\\text{ kPa}$ เพราะพลังงานส่วนหนึ่งเปลี่ยนเป็นพลังงานจลน์!',
        },
      ],
      finalAnswerLatex: 'v_2 = 8.0\\text{ m/s}, \\qquad P_2 = 1.20 \\times 10^5\\text{ Pa}',
      examTrapWarningTh:
        'จำไว้เสมอ: ท่อแคบลง $\\implies$ น้ำไหล **เร็วขึ้น** $\\implies$ ความดัน **ลดลง**! (ไม่ใช่เพิ่ม! นักเรียนมักสับสนคิดว่าบีบท่อแล้วความดันต้องสูงขึ้น)',
    },
    selfCheck: {
      id: 'check-pre-fluid-1',
      promptTh: 'หากความดันในท่อใหญ่ $P_1 = 1.5 \\times 10^5\\text{ Pa}$ คงเดิม แต่บีบหน้าตัด $A_2$ ให้แคบลงจน $v_2$ เร็วขึ้นเรื่อยๆ จะเกิดอะไรขึ้นเมื่อคำนวณได้ $P_2 \\to 0$?',
      optionsTh: [
        'ความดันของไหลไม่สามารถติดลบได้ ในทางกายภาพจะเกิดโพรงไอเดือด (Cavitation) ขึ้นในน้ำ!',
        'ความดันสามารถติดลบเป็น $-10^5\\text{ Pa}$ ได้ตามปกติ',
        'น้ำจะไหลย้อนกลับเข้าสู่ท่อใหญ่ทันที',
        'ความหนาแน่นของน้ำจะเพิ่มขึ้นเป็น 2 เท่า',
      ],
      correctOptionIndex: 0,
      explanationTh:
        'ถูกต้อง! ของไหลไม่สามารถรับแรงดึงจนความดันสัมบูรณ์ต่ำกว่าศูนย์ (หรือต่ำกว่าความดันไอของน้ำ) ได้ จึงเดือดเป็นฟองไอเรียกว่า Cavitation!',
    },
  },
  {
    id: 'prob-pre-thermo-1',
    code: 'PRE-C1-T01',
    sourceExam: 'แนวข้อสอบคัดเลือก สอวน. ค่าย 1 (หัวข้อ 12, 14, 15, 17)',
    topicId: 'pre-fluids-thermo',
    difficulty: 'PreCamp1_Entrance',
    titleTh: 'กฎข้อที่ 1 ของเทอร์โมไดนามิกส์ + Equipartition ของแก๊สอะตอมคู่ในกระบอกสูบ',
    statementTh:
      'แก๊สอุดมคติชนิด 2 อะตอม ($f = 5$, อุณหภูมิห้อง) จำนวน $n = 2.0\\text{ mol}$ บรรจุอยู่ในกระบอกสูบที่มีลูกสูบเคลื่อนที่ได้อย่างอิสระภายใต้ความดันภายนอกคงที่ $P_0 = 1.0 \\times 10^5\\text{ Pa}$ เมื่อให้ความร้อน $\\Delta Q$ เข้าไปจนอุณหภูมิของแก๊สเพิ่มขึ้น $\\Delta T = 50\\text{ K}$ ($R = 8.3\\text{ J/(mol}\\cdot\\text{K)}$) จงหางาน $\\Delta W$ ที่แก๊สทำ การเปลี่ยนพลังงานภายใน $\\Delta U$ และความร้อนทั้งหมดที่ต้องให้ $\\Delta Q$',
    statementLatex: 'f = 5, \\quad n = 2.0\\text{ mol}, \\quad \\Delta T = 50\\text{ K}, \\quad P = \\text{constant}',
    hints: [
      {
        tier: 1,
        type: 'physical_model',
        titleTh: 'Hint 1: ใช้ Equipartition หาการเปลี่ยนแปลงพลังงานภายใน ΔU',
        contentTh:
          'สำหรับแก๊ส 2 อะตอม ($f = 5$) พลังงานภายในคือ $U = \\frac{5}{2}nRT$ ดังนั้น $\\Delta U = \\frac{5}{2}nR\\Delta T$',
        latexSnippets: ['\\Delta U = \\frac{5}{2} n R \\Delta T'],
      },
      {
        tier: 2,
        type: 'governing_equations',
        titleTh: 'Hint 2: ความดันคงที่ทำให้คำนวณงาน ΔW = P ΔV = n R ΔT ได้ทันที',
        contentTh:
          'จาก $PV = nRT$ เมื่อ $P$ คงที่ จะได้ $P\\Delta V = nR\\Delta T$ โดยไม่ต้องรู้ปริมาตรเดิม $V_1$ ด้วยซ้ำ!',
        latexSnippets: ['\\Delta W = P\\Delta V = n R \\Delta T'],
      },
      {
        tier: 3,
        type: 'mathematical_trick',
        titleTh: 'Hint 3: ใช้กฎข้อที่ 1 ΔU = ΔQ - ΔW หาความร้อนที่ต้องใส่เข้าไป',
        contentTh:
          'ย้ายข้างเป็น $\\Delta Q = \\Delta U + \\Delta W = \\frac{5}{2}nR\\Delta T + nR\\Delta T = \\frac{7}{2}nR\\Delta T$',
        latexSnippets: ['nR\\Delta T = (2.0)(8.3)(50) = 830\\text{ J}'],
      },
    ],
    fullSolution: {
      approachOverviewTh:
        'คำนวณหน่วยพลังงานฐาน nRΔT ก่อน แล้วแตกสัดส่วนเป็น ΔU (5/2 ส่วน) และงานขยายตัว ΔW (1 ส่วน) ตามกฎข้อที่ 1',
      coordinateSystemSetupTh: 'ระบบปิดแก๊สอุดมคติที่ความดันคงที่ (Isobaric Process)',
      steps: [
        {
          stepNumber: 1,
          stepTitleTh: 'คำนวณพจน์พื้นฐาน $n R \\Delta T$ เพื่อหางานขยายตัว $\\Delta W$',
          latexMath: '\\Delta W = P\\Delta V = nR\\Delta T = (2.0)(8.3)(50) = 830\\text{ J}',
          explanationTh: 'เพราะอุณหภูมิเพิ่มและแก๊สขยายตัวดันลูกสูบออก ระบบจึงทำงานเป็นบวก $+830\\text{ J}$',
        },
        {
          stepNumber: 2,
          stepTitleTh: 'คำนวณ $\\Delta U$ ด้วยหลัก Equipartition ($f = 5$)',
          latexMath: '\\Delta U = \\frac{5}{2}nR\\Delta T = \\frac{5}{2}(830) = 2075\\text{ J}',
          explanationTh: 'พลังงานจลน์การเลื่อนที่ 3 แกน + การหมุน 2 แกน ทำให้ได้ $\\frac{5}{2}nR\\Delta T$',
        },
        {
          stepNumber: 3,
          stepTitleTh: 'คำนวณความร้อน $\\Delta Q$ จากกฎข้อที่ 1 ($\\Delta U = \\Delta Q - \\Delta W$)',
          latexMath: '\\Delta Q = \\Delta U + \\Delta W = 2075 + 830 = 2905\\text{ J} = \\frac{7}{2}nR\\Delta T',
          explanationTh: 'สัดส่วนงานต่อความร้อนทั้งหมดคือ $\\frac{1}{7/2} = \\frac{2}{7} \\approx 28.6\\%$ เสมอสำหรับแก๊ส 2 อะตอมที่ความดันคงที่!',
        },
      ],
      finalAnswerLatex: '\\Delta W = 830\\text{ J}, \\qquad \\Delta U = 2075\\text{ J}, \\qquad \\Delta Q = 2905\\text{ J}',
      examTrapWarningTh:
        'จำสัดส่วน $f$ ให้แม่น: แก๊สอะตอมเดี่ยวใช้ $\\frac{3}{2}nRT$, แก๊ส 2 อะตอมใช้ $\\frac{5}{2}nRT$! ข้อสอบเข้าค่าย 1 ชอบให้ชื่อแก๊ส (เช่น ฮีเลียม vs ไนโตรเจน) เพื่อทดสอบว่าเราเลือก $f$ ถูกไหม',
    },
    selfCheck: {
      id: 'check-pre-thermo-1',
      promptTh: 'ถ้าเปลี่ยนเป็นแก๊สฮีเลียม (He, อะตอมเดี่ยว $f = 3$) ในเงื่อนไขเดียวกัน อัตราส่วน $\\Delta W / \\Delta Q$ เมื่อความดันคงที่จะมีค่าเท่าใด?',
      optionsTh: [
        '$\\frac{2}{5} = 0.40$ ($40\\%$)',
        '$\\frac{2}{7} \\approx 0.286$ ($28.6\\%$)',
        '$\\frac{3}{5} = 0.60$ ($60\\%$)',
        '$\\frac{1}{2} = 0.50$ ($50\\%$)',
      ],
      correctOptionIndex: 0,
      explanationTh:
        'ถูกต้อง! แก๊สอะตอมเดี่ยว $\\Delta U = \\frac{3}{2}nR\\Delta T$ และ $\\Delta W = nR\\Delta T$ จึงได้ $\\Delta Q = \\frac{5}{2}nR\\Delta T \\implies \\frac{\\Delta W}{\\Delta Q} = \\frac{1}{5/2} = \\frac{2}{5}$!',
    },
  },
  {
    id: 'prob-pre-em-1',
    code: 'PRE-C1-E01',
    sourceExam: 'แนวข้อสอบคัดเลือก สอวน. ค่าย 1 (หัวข้อ 19–22)',
    topicId: 'pre-em',
    difficulty: 'PreCamp1_Entrance',
    titleTh: 'บทบาทของ R และ C ในวงจรกระแสตรงที่ t = 0 และ t → ∞',
    statementTh:
      'วงจรกระแสตรงประกอบด้วยแบตเตอรี่ $\\mathcal{E} = 12\\text{ V}$ (ไร้ความต้านทานภายใน) ต่อกับตัวต้านทาน $R_1 = 2\\text{ }\\Omega$ ที่อนุกรมอยู่กับกิ่งขนาน 2 กิ่งคือ: กิ่งที่ 1 มีตัวต้านทาน $R_2 = 4\\text{ }\\Omega$ และกิ่งที่ 2 มีตัวต้านทาน $R_3 = 4\\text{ }\\Omega$ ต่ออนุกรมกับตัวเก็บประจุ $C = 5\\text{ }\\mu\\text{F}$ (เดิมไม่มีประจุ) จงหากระแสจากแบตเตอรี่ทันทีที่สับสวิตช์ ($t = 0^+$) และประจุไฟฟ้าบนตัวเก็บประจุเมื่อทิ้งไว้นานจนเข้าสภาวะคงตัว ($t \\to \\infty$)',
    statementLatex: '\\mathcal{E} = 12\\text{ V}, \\quad R_1 = 2\\,\\Omega, \\quad R_2 = R_3 = 4\\,\\Omega, \\quad C = 5\\,\\mu\\text{F}',
    hints: [
      {
        tier: 1,
        type: 'physical_model',
        titleTh: 'Hint 1: ที่ t = 0+ ตัวเก็บประจุ C ทำตัวเหมือนสายไฟลัดวงจร',
        contentTh:
          'เพราะ $C$ ยังไม่มีประจุ ($V_C = 0$) กิ่ง $R_3$ จึงต่อขนานเต็มตัวกับ $R_2$! คิดความต้านทานรวมได้ทันทีโดยไม่ต้องสนใจ $C$',
        latexSnippets: ['R_{23} = 4 \\parallel 4 = 2\\,\\Omega'],
      },
      {
        tier: 2,
        type: 'governing_equations',
        titleTh: 'Hint 2: ที่ t -> ∞ ตัวเก็บประจุ C ทำตัวเหมือนสวิตช์เปิด (กระแสกิ่ง 2 = 0)',
        contentTh:
          'เมื่อชาร์จเต็มแล้ว กระแสผ่านกิ่งที่มี $C$ หยุดไหล! กิ่งที่ $R_3$ จึง **ไม่มีกระแสและไม่มีศักย์ตกคร่อม** ทั้งหมดไหลผ่านแค่ $R_1$ กับ $R_2$',
        latexSnippets: ['i_3(\\infty) = 0 \\implies V_C = V_{R_2}'],
      },
      {
        tier: 3,
        type: 'mathematical_trick',
        titleTh: 'Hint 3: แบ่งแรงดันบน R_1 และ R_2 เพื่อหา V_C แล้วคูณ C',
        contentTh:
          'เมื่อ $t \\to \\infty$ กระแสวงจรคือ $\\mathcal{E}/(R_1+R_2) = 12/6 = 2\\text{ A}$ ดังนั้น $V_{R_2} = 2 \\times 4 = 8\\text{ V}$',
        latexSnippets: ['Q_{\\infty} = C V_C'],
      },
    ],
    fullSolution: {
      approachOverviewTh:
        'แทนตัวเก็บประจุด้วย "สายไฟเชื่อมตรง" ที่ t=0+ และแทนด้วย "วงจรขาด" ที่ t->∞ เพื่อแปลงวงจร RC เป็นวงจร R ล้วนธรรมดาทั้ง 2 ช่วง',
      coordinateSystemSetupTh: 'วงจรกระแสตรงที่มี R และ C ต่อผสม (K&K / POSN Topic 22)',
      steps: [
        {
          stepNumber: 1,
          stepTitleTh: 'คำนวณกระแสจากแบตเตอรี่ทันทีที่สับสวิตช์ ($t = 0^+$, แทน $C$ ด้วยลวดเชื่อม)',
          latexMath: 'R_{\\text{eq}}(0^+) = R_1 + (R_2 \\parallel R_3) = 2 + \\frac{4 \\times 4}{4 + 4} = 4\\,\\Omega \\implies i(0^+) = \\frac{12}{4} = 3.0\\text{ A}',
          explanationTh: 'ช่วงเสี้ยววินาทีแรก ตัวเก็บประจุยอมให้กระแสไหลผ่าน $R_3$ เสมือนสายไฟเปล่า',
        },
        {
          stepNumber: 2,
          stepTitleTh: 'คำนวณกระแสและแรงดันคร่อม $R_2$ ที่สภาวะคงตัว ($t \\to \\infty$, แทน $C$ ด้วยวงจรขาด)',
          latexMath: 'i(\\infty) = \\frac{\\mathcal{E}}{R_1 + R_2} = \\frac{12}{2 + 4} = 2.0\\text{ A}, \\qquad V_{R_2} = i(\\infty)R_2 = (2.0)(4) = 8.0\\text{ V}',
          explanationTh: 'เมื่อ $C$ เต็ม ไม่มีกระแสไหลผ่านกิ่ง $R_3$ ความต่างศักย์ตกคร่อม $R_3$ จึงเป็น $0\\text{ V}$!',
        },
        {
          stepNumber: 3,
          stepTitleTh: 'คำนวณประจุบนตัวเก็บประจุและกำลังความร้อน $i^2 R$ ในสภาวะคงตัว',
          latexMath: 'V_C = V_{R_2} = 8.0\\text{ V} \\implies Q_{\\infty} = (5\\,\\mu\\text{F})(8.0\\text{ V}) = 40\\,\\mu\\text{C}',
          explanationTh: 'กำลังสูญเสียเป็นความร้อนในตัวต้านทานทั้งวงจรตอนนี้คือ $P = i(\\infty)^2(R_1 + R_2) = 4(6) = 24\\text{ W}$',
        },
      ],
      finalAnswerLatex: 'i(0^+) = 3.0\\text{ A}, \\qquad Q_{\\infty} = 40\\,\\mu\\text{C}',
      examTrapWarningTh:
        'จำให้แม่นว่าตัวต้านทาน $R_3$ ที่ต่อ **อนุกรมกับ $C$** จะมีแรงดันตกคร่อมเป็น $0\\text{ V}$ เมื่อเข้าสู่ Steady State! จึงห้ามนำ $R_3$ ไปคำนวณแบ่งศักย์ร่วมกับ $R_2$ ตอน $t \\to \\infty$!',
    },
    selfCheck: {
      id: 'check-pre-em-1',
      promptTh: 'หากเปลี่ยนตัวเก็บประจุ $C$ ในกิ่งที่ 2 เป็น **ตัวเหนี่ยวนำ (Inductor $L$)** (ข้อ 24) กระแสจากแบตเตอรี่ทันทีที่สับสวิตช์ ($t = 0^+$) และเมื่อทิ้งไว้นาน ($t \\to \\infty$) จะกลับกันเป็นเท่าใด?',
      optionsTh: [
        '$i(0^+) = 2.0\\text{ A}$ ($L$ ต้านเหมือนวงจรขาด) และ $i(\\infty) = 3.0\\text{ A}$ ($L$ เหมือนลวดลัดวงจร)',
        '$i(0^+) = 3.0\\text{ A}$ และ $i(\\infty) = 2.0\\text{ A}$ เหมือนตัวเก็บประจุ',
        '$i(0^+) = 0$ และ $i(\\infty) = 0$',
        '$i(0^+) = 6.0\\text{ A}$ และ $i(\\infty) = 3.0\\text{ A}$',
      ],
      correctOptionIndex: 0,
      explanationTh:
        'ถูกต้อง! บทบาทของ $L$ ตรงข้ามกับ $C$ เป๊ะ: เริ่มต้น $L$ ขวางไม่ให้กระแสเปลี่ยน ($i_L(0^+)=0 \\implies R_{\\text{eq}} = 6\\,\\Omega, i=2\\text{ A}$) และเมื่อนานไปกระแสคงที่ $L$ ไม่ต้านแล้ว ($V_L=0 \\implies R_{\\text{eq}} = 4\\,\\Omega, i=3\\text{ A}$)!',
    },
  },
  {
    id: 'prob-pre-em-2',
    code: 'PRE-C1-E02',
    sourceExam: 'แนวข้อสอบคัดเลือก สอวน. ค่าย 1 (หัวข้อ 23, 24, 25)',
    topicId: 'pre-em',
    difficulty: 'PreCamp1_Entrance',
    titleTh: 'กฎฟาราเดย์-เลนซ์: ขดลวดรับฟลักซ์และพลังงานสนามแม่เหล็ก',
    statementTh:
      'ขดลวดรูปสี่เหลี่ยมจัตุรัสขนาด $10\\text{ cm} \\times 10\\text{ cm}$ จำนวน $N = 20$ รอบ ความต้านทานรวม $R = 4.0\\text{ }\\Omega$ วางตั้งฉากกับสนามแม่เหล็กสม่ำเสมอซึ่งลดขนาดลงอย่างสม่ำเสมอจาก $B_1 = 0.80\\text{ T}$ เหลือ $B_2 = 0.20\\text{ T}$ ภายในเวลา $\\Delta t = 0.30\\text{ s}$ จงหาแรงเคลื่อนไฟฟ้าเหนี่ยวนำเฉลี่ย $\\mathcal{E}$, กระแสเหนี่ยวนำ $i$, และพลังงานความร้อนที่เกิดขึ้นในขดลวดในช่วงเวลาดังกล่าว',
    statementLatex: 'A = 0.01\\text{ m}^2, \\quad N = 20, \\quad \\Delta B = -0.60\\text{ T}, \\quad \\Delta t = 0.30\\text{ s}',
    hints: [
      {
        tier: 1,
        type: 'physical_model',
        titleTh: 'Hint 1: ใช้กฎฟาราเดย์ N รอบ: E = N |ΔΦ_B / Δt|',
        contentTh:
          'พื้นที่ $A = (0.10\\text{ m})^2 = 0.01\\text{ m}^2$ ไม่เปลี่ยน มีเพียง $B$ ที่เปลี่ยนแปลงสม่ำเสมอ จึงใช้ $\\mathcal{E} = N A \\left|\\frac{\\Delta B}{\\Delta t}\\right|$ ได้โดยตรง!',
        latexSnippets: ['|\\mathcal{E}| = N A \\frac{|B_2 - B_1|}{\\Delta t}'],
      },
      {
        tier: 2,
        type: 'governing_equations',
        titleTh: 'Hint 2: กฎของโอห์มหา i และ Joule Heating หาความร้อน',
        contentTh:
          'เมื่อแรงดัน $\\mathcal{E}$ คงที่ตลอด $0.30\\text{ s}$ กระแส $i = \\mathcal{E}/R$ ก็คงที่ พลังงานความร้อนทั้งหมดคือ $E_{\\text{heat}} = i^2 R \\Delta t$',
        latexSnippets: ['i = \\frac{\\mathcal{E}}{R}, \\qquad E_{\\text{heat}} = i^2 R\\,\\Delta t'],
      },
      {
        tier: 3,
        type: 'mathematical_trick',
        titleTh: 'Hint 3: ระวังทิศของกระแสตามกฎของเลนซ์',
        contentTh:
          'เนื่องจาก $B$ กำลัง **ลดลง** ขดลวดต้องสร้างสนามแม่เหล็ก **เสริมทิศเดิม** เพื่อต้านการลดลงของฟลักซ์!',
        latexSnippets: ['\\Delta B < 0 \\implies B_{\\text{induced}} \\parallel B_{\\text{orig}}'],
      },
    ],
    fullSolution: {
      approachOverviewTh:
        'คำนวณอัตราการเปลี่ยนแปลงของฟลักซ์แม่เหล็กผ่านขดลวด N รอบ จากนั้นใช้กฎโอห์มและความร้อนจูลโดยไม่ต้องใช้แคลคูลัส',
      coordinateSystemSetupTh: 'พื้นที่วงปิด A = 0.01 m^2 ตั้งฉากกับเวกเตอร์สนามแม่เหล็ก B',
      steps: [
        {
          stepNumber: 1,
          stepTitleTh: 'คำนวณขนาดแรงเคลื่อนไฟฟ้าเหนี่ยวนำ $\\mathcal{E}$',
          latexMath: '|\\mathcal{E}| = N A \\frac{|\\Delta B|}{\\Delta t} = (20)(0.01)\\left(\\frac{0.80 - 0.20}{0.30}\\right) = 0.20 \\times 2.0 = 0.40\\text{ V}',
          explanationTh: 'เพราะสนามลดลงด้วยอัตราคงที่ $2.0\\text{ T/s}$ จึงเกิดแรงดันคงที่ $0.40\\text{ V}$ ตลอดช่วง $0.30\\text{ s}$',
        },
        {
          stepNumber: 2,
          stepTitleTh: 'คำนวณกระแสเหนี่ยวนำและพลังงานความร้อน (Joule Heating)',
          latexMath: 'i = \\frac{\\mathcal{E}}{R} = \\frac{0.40}{4.0} = 0.10\\text{ A}, \\qquad E_{\\text{heat}} = i^2 R\\Delta t = (0.10)^2(4.0)(0.30) = 0.012\\text{ J}',
          explanationTh: 'พลังงานความร้อน $12\\text{ mJ}$ นี้ถูกดึงมาจากแหล่งกำเนิดที่ทำให้สนามแม่เหล็กเปลี่ยนแปลง!',
        },
      ],
      finalAnswerLatex: '|\\mathcal{E}| = 0.40\\text{ V}, \\qquad i = 0.10\\text{ A}, \\qquad E_{\\text{heat}} = 0.012\\text{ J}',
      examTrapWarningTh:
        'อย่าลืมคูณจำนวนรอบ $N = 20$ และแปลงหน่วยพื้นที่เป็น $\\text{m}^2$ ($10\\text{ cm}^2$ ไม่ใช่ $0.1\\text{ m}^2$ แต่ $10\\text{ cm} \\times 10\\text{ cm} = 0.01\\text{ m}^2$)!',
    },
    selfCheck: {
      id: 'check-pre-em-2',
      promptTh: 'จากข้อ 25 ของเอกสาร สอวน. ถ้าคลื่นแม่เหล็กไฟฟ้าในสุญญากาศมีขนาดสนามไฟฟ้า RMS เท่ากับ $E_{\\text{rms}}$ ความหนาแน่นพลังงานสนามแม่เหล็ก $\\frac{1}{2}\\frac{B_{\\text{rms}}^2}{\\mu_0}$ เทียบกับความหนาแน่นพลังงานไฟฟ้า $\\frac{1}{2}\\varepsilon_0 E_{\\text{rms}}^2$ เป็นอย่างไร?',
      optionsTh: [
        'เท่ากันเป๊ะ! ($\\frac{1}{2}\\varepsilon_0 E^2 = \\frac{1}{2}\\frac{B^2}{\\mu_0}$ จึงรวมกันได้ $u_{\\text{total}} = \\varepsilon_0 E_{\\text{rms}}^2$)',
        'พลังงานไฟฟ้ามากกว่าพลังงานแม่เหล็ก $c$ เท่า',
        'พลังงานแม่เหล็กมากกว่าพลังงานไฟฟ้า $\\mu_0$ เท่า',
        'พลังงานแม่เหล็กเป็นศูนย์ในสุญญากาศ',
      ],
      correctOptionIndex: 0,
      explanationTh:
        'ถูกต้อง! ในคลื่นแม่เหล็กไฟฟ้า $E = cB$ และ $\\varepsilon_0 = \\frac{1}{\\mu_0 c^2}$ แทนค่าแล้วได้ $\\frac{1}{2}\\varepsilon_0 E^2 = \\frac{1}{2\\mu_0 c^2}(cB)^2 = \\frac{1}{2}\\frac{B^2}{\\mu_0}$ แบ่งพลังงานกันคนละครึ่งพอดี!',
    },
  },
  {
    id: 'prob-pre-opt-1',
    code: 'PRE-C1-O01',
    sourceExam: 'แนวข้อสอบคัดเลือก สอวน. ค่าย 1 (หัวข้อ 27)',
    topicId: 'pre-optics',
    difficulty: 'PreCamp1_Entrance',
    titleTh: 'กฎของสเนลล์คู่กับมุมบริวสเตอร์ (Brewster Angle & Snell Law)',
    statementTh:
      'ลำแสงไม่โพลาไรซ์ตกกระทบผิวแผ่นแก้วหนาจากอากาศ ($n_1 = 1.0$) ที่มุมตกกระทบ $\\theta_B = 56.3^\\circ$ ซึ่งทำให้แสงที่สะท้อนจากผิวแก้วเป็นแสงโพลาไรซ์เชิงเส้นอย่างสมบูรณ์ ($\\tan 56.3^\\circ \\approx 1.50$) จงหาดัชนีหักเห $n_2$ ของแก้วและมุมหักเห $\\theta_2$ ภายในเนื้อแก้ว',
    statementLatex: 'n_1 = 1.0, \\quad \\theta_B = 56.3^\\circ \\; (\\text{สะท้อน } \\perp \\text{ หักเห})',
    hints: [
      {
        tier: 1,
        type: 'physical_model',
        titleTh: 'Hint 1: มุมบริวสเตอร์เกิดเมื่อรังสีสะท้อนตั้งฉากกับรังสีหักเห',
        contentTh:
          'วาดเส้นปกติที่จุดตกกระทบ: มุมระหว่างเส้นปกติกับรังสีสะท้อนคือ $\\theta_B$ และมุมระหว่างรังสีสะท้อนกับรังสีหักเหคือ $90^\\circ$',
        latexSnippets: ['\\theta_B + 90^\\circ + \\theta_2 = 180^\\circ'],
      },
      {
        tier: 2,
        type: 'governing_equations',
        titleTh: 'Hint 2: แทนค่าลงในกฎของบริวสเตอร์ tan θ_B = n_2 / n_1',
        contentTh:
          'จาก $n_1\\sin\\theta_B = n_2\\sin(90^\\circ - \\theta_B)$ จะได้ $\\frac{n_2}{n_1} = \\tan\\theta_B$',
        latexSnippets: ['n_2 = n_1\\tan\\theta_B'],
      },
      {
        tier: 3,
        type: 'mathematical_trick',
        titleTh: 'Hint 3: หามุมหักเหด้วยผลบวก 90 องศาโดยไม่ต้องกดเครื่องคิดเลข!',
        contentTh:
          'เนื่องจาก $\\theta_B + \\theta_2 = 90^\\circ$ จึงหามุมหักเห $\\theta_2$ ได้ทันทีในบรรทัดเดียว',
        latexSnippets: ['\\theta_2 = 90^\\circ - 56.3^\\circ'],
      },
    ],
    fullSolution: {
      approachOverviewTh:
        'ใช้สมบัติเรขาคณิตของมุมบริวสเตอร์ร่วมกับกฎของสเนลล์เพื่อหาทั้งดัชนีหักเหและมุมหักเหอย่างรวดเร็ว',
      coordinateSystemSetupTh: 'มุมทั้งหมดวัดเทียบกับเส้นตั้งฉากผิวรอยต่ออากาศ–แก้ว',
      steps: [
        {
          stepNumber: 1,
          stepTitleTh: 'คำนวณมุมหักเห $\\theta_2$ จากเงื่อนไขตั้งฉากของบริวสเตอร์',
          latexMath: '\\theta_B + \\theta_2 = 90^\\circ \\implies \\theta_2 = 90^\\circ - 56.3^\\circ = 33.7^\\circ',
          explanationTh: 'รังสีสะท้อนทำมุม $\\theta_B$ เหนือผิวและรังสีหักเหทำมุม $\\theta_2$ ใต้ผิวตั้งฉากกันพอดี',
        },
        {
          stepNumber: 2,
          stepTitleTh: 'คำนวณดัชนีหักเห $n_2$ ด้วยกฎของสเนลล์ / บริวสเตอร์',
          latexMath: '\\tan\\theta_B = \\frac{n_2}{n_1} \\implies n_2 = (1.0)(1.50) = 1.50',
          explanationTh: 'ค่า $n = 1.50$ เป็นดัชนีหักเหมาตรฐานของแก้วคราวน์ (Crown Glass)',
        },
      ],
      finalAnswerLatex: 'n_2 = 1.50, \\qquad \\theta_2 = 33.7^\\circ',
      examTrapWarningTh:
        'ระวังทิศมุม! ในกฎของบริวสเตอร์ **มุมทั้งหมดวัดจากเส้นปกติ (Normal)** ไม่ใช่วัดจากผิวระนาบ และต้องดูให้ดีว่าแสงวิ่งจากตัวกลางไหนเข้าสู่ตัวกลางไหน ($\\tan\\theta_B = n_{\\text{to}} / n_{\\text{from}}$)',
    },
    selfCheck: {
      id: 'check-pre-opt-1',
      promptTh: 'จากมุมวิกฤตการสะท้อนกลับหมด $\\sin\\theta_c = 1/n_2$ กับมุมบริวสเตอร์ $\\tan\\theta_B = n_2$ (เมื่อแสงในแก้วกำลังออกสู่อากาศ vs จากอากาศเข้าแก้ว) ข้อใดกล่าวถูกต้อง?',
      optionsTh: [
        'มุมบริวสเตอร์ตอนเข้าแก้วใหญ่กว่า $45^\\circ$ เสมอสำหรับ $n_2 > 1$ แต่ตอนออกจากแก้ว $\\theta_{B,\\text{out}} = \\theta_2 < 45^\\circ$ ซึ่งเป็นมุมเดียวกับมุมหักเหของตอนเข้าพอดี!',
        'มุมบริวสเตอร์กับมุมวิกฤตมีค่าเท่ากันเสมอ',
        'ไม่สามารถเกิดมุมบริวสเตอร์ได้เมื่อแสงวิ่งจากแก้วออกสู่อากาศ',
        '$\\sin\\theta_B = n_2 / n_1$',
      ],
      correctOptionIndex: 0,
      explanationTh:
        'ถูกต้อง! ที่มุมบริวสเตอร์ขาเข้า $\\tan\\theta_B = n_2$ จึงได้มุมหักเห $\\theta_2$ ที่ $\\tan\\theta_2 = 1/n_2$ ซึ่งก็คือมุมบริวสเตอร์สำหรับแสงที่ย้อนกลับออกจากแก้วสู่อากาศพอดี! แปลว่าถ้าวางแผ่นขนาน แสงหักเหที่ตกกระทบผิวล่างจะเกิดบริวสเตอร์ซ้ำทั้งบนและล่าง!',
    },
  },
  {
    id: 'prob-pre-opt-2',
    code: 'PRE-C1-O02',
    sourceExam: 'แนวข้อสอบคัดเลือก สอวน. ค่าย 1 (หัวข้อ 26, 27, 28)',
    topicId: 'pre-optics',
    difficulty: 'PreCamp1_Entrance',
    titleTh: 'ระบบผสมเลนส์นูน + กระจกเว้า: ไล่ภาพ 3 ขั้นตอนจนแสงย้อนกลับ',
    statementTh:
      'วางวัตถุสูง $h = 2.0\\text{ cm}$ หน้าเลนส์นูน ($f_L = +15\\text{ cm}$) เป็นระยะ $u_1 = 30\\text{ cm}$ และด้านหลังเลนส์นูนห่างออกไป $d = 40\\text{ cm}$ มีกระจกเว้า ($f_M = +15\\text{ cm}$) วางหันหน้าเข้าหาเลนส์ แสงจากวัตถุผ่านเลนส์นูนแล้วไปสะท้อนกระจกเว้า แล้วย้อนกลับมาผ่านเลนส์นูนอีก 1 ครั้ง จงหาตำแหน่งของภาพสุดท้ายเทียบกับเลนส์นูน',
    statementLatex: 'f_L = +15\\text{ cm}, \\; u_1 = 30\\text{ cm}, \\; d = 40\\text{ cm}, \\; f_M = +15\\text{ cm}',
    hints: [
      {
        tier: 1,
        type: 'physical_model',
        titleTh: 'Hint 1: แยกทางเดินแสงเป็น 3 ช่วงตามลำดับการเจออุปกรณ์',
        contentTh:
          'ช่วง 1: วัตถุ $\\to$ เลนส์นูน ($I_1$), ช่วง 2: $I_1$ เป็นวัตถุของกระจกเว้า ($I_2$), ช่วง 3: $I_2$ สะท้อนกลับมาเป็นวัตถุให้เลนส์นูน ($I_3$)',
        latexSnippets: ['u_{\\text{next}} = d - v_{\\text{prev}}'],
      },
      {
        tier: 2,
        type: 'governing_equations',
        titleTh: 'Hint 2: คำนวณภาพที่ 1 จากวัตถุวางที่ 2f ของเลนส์นูน',
        contentTh:
          'เมื่อ $u_1 = 30 = 2f_L$ ภาพ $I_1$ จะเกิดที่ $v_1 = 30\\text{ cm}$ หลังเลนส์นูน (อยู่ระหว่างเลนส์กับกระจก!)',
        latexSnippets: ['u_2 = 40 - 30 = +10\\text{ cm}'],
      },
      {
        tier: 3,
        type: 'mathematical_trick',
        titleTh: 'Hint 3: ภาพที่ 2 เป็นภาพเสมือนหลังกระจก อย่าลืมบวก d ตอนแสงย้อนกลับ!',
        contentTh:
          'จาก $\\frac{1}{v_2} + \\frac{1}{10} = \\frac{1}{15}$ จะได้ $v_2 = -30\\text{ cm}$ (หลังกระจก $30\\text{ cm}$ จึงห่างจากเลนส์ $40 + 30 = 70\\text{ cm}$!)',
        latexSnippets: ['u_3 = d - v_2 = 40 - (-30) = +70\\text{ cm}'],
      },
    ],
    fullSolution: {
      approachOverviewTh:
        'คำนวณทีละอุปกรณ์ด้วยสมการ 1/v + 1/u = 1/f โดยใช้ระยะห่าง d = 40 cm เชื่อมตำแหน่งภาพไปเป็นวัตถุถัดไปตามกฎ u_next = d - v_prev',
      coordinateSystemSetupTh: 'แกนมุขสำคัญร่วมระหว่างเลนส์นูน (ตำแหน่ง 0) และกระจกเว้า (ตำแหน่ง +40 cm)',
      steps: [
        {
          stepNumber: 1,
          stepTitleTh: 'ขั้นที่ 1 (ผ่านเลนส์นูนขาไป): หาภาพ $I_1$',
          latexMath: '\\frac{1}{v_1} + \\frac{1}{30} = \\frac{1}{15} \\implies v_1 = +30\\text{ cm} \\; (\\text{หลังเลนส์นูน})',
          explanationTh: 'เพราะอยู่หลังเลนส์ $30\\text{ cm}$ จึงอยู่ **หน้ากระจกเว้า** เป็นระยะ $u_2 = 40 - 30 = +10\\text{ cm}$ (วัตถุจริง!)',
        },
        {
          stepNumber: 2,
          stepTitleTh: 'ขั้นที่ 2 (สะท้อนกระจกเว้า): หาภาพ $I_2$',
          latexMath: '\\frac{1}{v_2} + \\frac{1}{10} = \\frac{1}{15} \\implies \\frac{1}{v_2} = -\\frac{1}{30} \\implies v_2 = -30\\text{ cm}',
          explanationTh: 'เครื่องหมายลบแปลว่า $I_2$ เป็นภาพเสมือนอยู่ **หลังกระจกเว้า $30\\text{ cm}$** เมื่อมองจากเลนส์นูนจึงอยู่ห่างออกไปถึง $40 + 30 = +70\\text{ cm}$!',
        },
        {
          stepNumber: 3,
          stepTitleTh: 'ขั้นที่ 3 (ผ่านเลนส์นูนขากลับ): หาภาพสุดท้าย $I_3$',
          latexMath: '\\frac{1}{v_3} + \\frac{1}{70} = \\frac{1}{15} \\implies \\frac{1}{v_3} = \\frac{14 - 3}{210} = \\frac{11}{210} \\implies v_3 = +\\frac{210}{11} \\approx +19.1\\text{ cm}',
          explanationTh: 'เมื่อแสงย้อนซ้ายผ่านเลนส์ ฝั่งตรงข้าม (หน้าเลนส์เดิม) เป็นฝั่งแสงทะลุออกจริง ภาพสุดท้ายจึงเป็นภาพจริงหน้าเลนส์นูน $19.1\\text{ cm}$ (และกำลังขยายรวม $m = (-1)(+3)(-3/11) = +\\frac{9}{11}$ คือหัวตั้งเท่าวัตถุ $0.82$ เท่า!)',
        },
      ],
      finalAnswerLatex: 'v_3 = +\\frac{210}{11} \\approx 19.1\\text{ cm} \\; (\\text{หน้าเลนส์นูน}, \\; \\text{ภาพจริง})',
      examTrapWarningTh:
        'จำไว้ว่ารังสี **ไม่ได้หยุดที่กระจก**! หากโจทย์บอกว่า "ผู้สังเกตมองผ่านเลนส์นูนจากด้านซ้าย" แสงต้องวิ่งสะท้อนกลับผ่านเลนส์ซ้ำเป็นขั้นที่ 3 เสมอ และภาพเสมือนหลังกระจกมีระยะไกลกว่า $d$ ($u_3 = d + |v_2|$)!',
    },
    selfCheck: {
      id: 'check-pre-opt-2',
      promptTh: 'หากขยับกระจกเว้าเข้าไปวางไว้ที่ระยะ $d = 20\\text{ cm}$ จากเลนส์นูนแทน ภาพ $I_1$ ($v_1 = 30\\text{ cm}$) จะเลยหลังกระจกไป $10\\text{ cm}$ ค่า $u_2$ ที่ต้องแทนในสมการกระจกเว้าคือเท่าใด?',
      optionsTh: [
        '$u_2 = -10\\text{ cm}$ (วัตถุเสมือน เพราะ $u_2 = d - v_1 = 20 - 30$)',
        '$u_2 = +10\\text{ cm}$ (วัตถุจริง)',
        '$u_2 = +50\\text{ cm}$',
        '$u_2 = -30\\text{ cm}$',
      ],
      correctOptionIndex: 0,
      explanationTh:
        'ถูกต้อง! แสงที่กำลังพุ่งลู่เข้าจะไปตัดกันที่ระยะ $10\\text{ cm}$ **หลังกระจก** แต่ถูกกระจกสะท้อนเสียก่อน จึงกลายเป็นวัตถุเสมือน $u_2 = d - v_1 = 20 - 30 = -10\\text{ cm}$!',
    },
  },
  {
    id: 'prob-pre-mech-proj-1',
    code: 'PRE-C1-M03',
    sourceExam: 'แนวข้อสอบคัดเลือก สอวน. ค่าย 1 (หัวข้อ 6: โพรเจกไทล์จากที่สูง)',
    topicId: 'pre-mechanics',
    difficulty: 'PreCamp1_Entrance',
    titleTh: 'โพรเจกไทล์ยิงจากหน้าผาสูง: เวลาลอย ระยะตก และความเร็วกระทบพื้น',
    statementTh:
      'ยิงลูกบอลจากขอบหน้าผาสูง $H = 20\\text{ m}$ ด้วยความเร็วต้น $u = 25\\text{ m/s}$ ทำมุมเงย $\\theta = 37^\\circ$ เหนือแนวระดับ ($\\sin 37^\\circ = 0.6$, $\\cos 37^\\circ = 0.8$, $g = 10\\text{ m/s}^2$) จงหา (ก) เวลาที่ลูกบอลลอยอยู่ในอากาศจนตกถึงพื้นล่าง $t_f$ (ข) ระยะตกตามแนวราบจากตีนหน้าผา $R$ และ (ค) อัตราเร็วของลูกบอลทันทีก่อนกระทบพื้น',
    statementLatex: 'H = 20\\text{ m}, \\quad u = 25\\text{ m/s}, \\quad \\theta = 37^\\circ, \\quad g = 10\\text{ m/s}^2',
    hints: [
      {
        tier: 1,
        type: 'physical_model',
        titleTh: 'Hint 1: ตั้งจุดกำเนิด (0, 0) ที่จุดยิงบนหน้าผา แล้วแยกแกน x และ y อิสระ',
        contentTh:
          'แตกความเร็วต้นได้ $u_x = 25(0.8) = 20\\text{ m/s}$ และ $u_y = +25(0.6) = +15\\text{ m/s}$ จุดตกที่พื้นล่างมีพิกัด $y = -20\\text{ m}$ (ห้ามใส่ $+20$ และห้ามใช้สูตรลัด $R = u^2\\sin 2\\theta/g$!)',
        latexSnippets: ['u_x = 20\\text{ m/s}, \\quad u_y = +15\\text{ m/s}'],
      },
      {
        tier: 2,
        type: 'governing_equations',
        titleTh: 'Hint 2: แก้สมการเวลาแกนดิ่ง y(t) = u_y t - ½gt² = -20',
        contentTh:
          'แทน $y = -20$: $15t - 5t^2 = -20 \\implies t^2 - 3t - 4 = 0$ แยกตัวประกอบได้คำตอบเวลาที่เป็นบวกทันที',
        latexSnippets: ['(t - 4)(t + 1) = 0'],
      },
      {
        tier: 3,
        type: 'mathematical_trick',
        titleTh: 'Hint 3: เช็กอัตราเร็วกระทบพื้นได้ 2 ทาง (รวมเวกเตอร์ vs อนุรักษ์พลังงาน)',
        contentTh:
          'หา $v_y = u_y - gt_f$ แล้วรวมกับ $v_x$ ด้วยพีทาโกรัส $v = \\sqrt{v_x^2 + v_y^2}$ หรือเทียบกับอนุรักษ์พลังงาน $v^2 = u^2 + 2gH$',
        latexSnippets: ['R = u_x t_f, \\qquad v = \\sqrt{v_x^2 + v_y^2}'],
      },
    ],
    fullSolution: {
      approachOverviewTh:
        'แยกแกนอิสระตามประกาศ สอวน. ข้อ 6 (x(t) = D_1 t + D_2, y(t) = -½gt² + C_1 t + C_2) เพื่อหาเวลาลอยทั้งหมดในขั้นเดียวโดยไม่ต้องแบ่งขาขึ้นกับขาลง',
      coordinateSystemSetupTh: 'จุดกำเนิด (0, 0) ที่จุดยิงบนหน้าผา แกน +y ชี้ขึ้น พื้นล่างอยู่ที่ y = -20 m',
      steps: [
        {
          stepNumber: 1,
          stepTitleTh: 'ตั้งสมการตำแหน่งแกนดิ่งเพื่อหาเวลาตกถึงพื้นล่าง',
          latexMath: 'y(t) = u_y t - \\frac{1}{2}gt^2 \\implies -20 = 15t - 5t^2 \\implies t^2 - 3t - 4 = 0 \\implies t_f = 4.0\\text{ s}',
          explanationTh: 'เลือกค่าบวก $t_f = 4.0\\text{ s}$ (การแบ่งแยกสมการเส้นตรงโดยใช้การกระจัดติดลบ $-20$ ให้คำตอบครบทั้งขาขึ้นและขาลงในสมการเดียว!)',
        },
        {
          stepNumber: 2,
          stepTitleTh: 'คำนวณระยะตกตามแนวราบ $R$ จากสมการแกน $x$ ที่ความเร็วคงที่',
          latexMath: 'R = u_x t_f = (20)(4.0) = 80\\text{ m}',
          explanationTh: 'เพราะไม่มีความเร่งในแนวราบ $v_x = 20\\text{ m/s}$ จึงคงที่ตลอด $4\\text{ s}$',
        },
        {
          stepNumber: 3,
          stepTitleTh: 'หาอัตราเร็วทันทีก่อนกระทบพื้น (และตรวจคำตอบด้วยพลังงาน)',
          latexMath: 'v_y = 15 - (10)(4) = -25\\text{ m/s} \\implies v = \\sqrt{20^2 + (-25)^2} = \\sqrt{1025} = 5\\sqrt{41} \\approx 32.0\\text{ m/s}',
          explanationTh: 'ตรวจด้วยอนุรักษ์พลังงาน: $\\sqrt{u^2 + 2gH} = \\sqrt{25^2 + 2(10)(20)} = \\sqrt{625 + 400} = \\sqrt{1025}\\text{ m/s}$ ตรงกันเป๊ะ!',
        },
      ],
      finalAnswerLatex: 't_f = 4.0\\text{ s}, \\qquad R = 80\\text{ m}, \\qquad v = 5\\sqrt{41} \\approx 32.0\\text{ m/s}',
      examTrapWarningTh:
        'กับดักอันดับ 1: สูตร $R = \\frac{u^2\\sin 2\\theta}{g}$ ใช้ไม่ได้เมื่อจุดยิงกับจุดตกอยู่คนละระดับความสูง! ถ้าเผลอใช้จะได้แค่ $60\\text{ m}$ ผิดไป $20\\text{ m}$ ทันที',
    },
    selfCheck: {
      id: 'check-pre-mech-proj-1',
      promptTh: 'หากยิงลูกบอลด้วยอัตราเร็วเดิม $u = 25\\text{ m/s}$ จากหน้าผาสูง $20\\text{ m}$ เท่าเดิม แต่เปลี่ยนเป็น **ยิงกดลง** ทำมุม $37^\\circ$ ใต้แนวระดับ อัตราเร็วขณะกระทบพื้นจะเป็นอย่างไร?',
      optionsTh: [
        'เท่าเดิมเป๊ะคือ $5\\sqrt{41} \\approx 32.0\\text{ m/s}$ (เพราะอนุรักษ์พลังงาน $u^2 + 2gH$ เท่าเดิม แต่ตกถึงพื้นเร็วขึ้นเหลือ $1.0\\text{ s}$)',
        'น้อยกว่าเดิมเพราะยิงลงไม่ได้ขึ้นไปเก็บพลังงานศักย์',
        'มากกว่าเดิมเพราะความเร็วแกนดิ่งบวกเพิ่มกับแรงโน้มถ่วงตั้งแต่ต้น',
        'เท่ากับ $25\\text{ m/s}$ พอดี',
      ],
      correctOptionIndex: 0,
      explanationTh:
        'ถูกต้อง! เมื่อไม่มีแรงต้านอากาศ อัตราเร็วกระทบพื้นขึ้นอยู่กับแค่ $v = \\sqrt{u^2 + 2gH}$ เท่านั้น (ไม่ขึ้นกับมุมยิง!) แต่เวลายิงลง $u_y = -15\\text{ m/s} \\implies t^2 + 3t - 4 = 0 \\implies t_f = 1.0\\text{ s}$ ตกเร็วกว่าเดิมมาก!',
    },
  },
  {
    id: 'prob-pre-mech-eq-1',
    code: 'PRE-C1-M04',
    sourceExam: 'แนวข้อสอบคัดเลือก สอวน. ค่าย 1 (หัวข้อ 5, 7, 9: สมดุลสถิตและทอร์ก)',
    topicId: 'pre-mechanics',
    difficulty: 'PreCamp1_Entrance',
    titleTh: 'สมดุลสถิตของบันไดสม่ำเสมอพิงกำแพงลื่นบนพื้นหยาบ',
    statementTh:
      'บันไดสม่ำเสมอมวล $M$ ยาว $L$ วางเอียงทำมุม $\\theta = 53^\\circ$ กับพื้นราบหยาบ โดยปลายบนพิงอยู่กับกำแพงแนวดิ่งที่ **ลื่นไม่มีแรงเสียดทาน** ($\\tan 53^\\circ = \\frac{4}{3}$) จงหาขนาดของแรงปฏิกิริยาที่กำแพง $N_w$ ในรูปของน้ำหนัก $Mg$ และค่าสัมประสิทธิ์แรงเสียดทานสถิต $\\mu_{s,\\min}$ น้อยที่สุดของพื้นที่ทำให้บันไดไม่ลื่นไถล',
    statementLatex: '\\theta = 53^\\circ \\; (\\tan 53^\\circ = \\tfrac{4}{3}), \\quad \\text{Wall smooth } (f_w = 0)',
    hints: [
      {
        tier: 1,
        type: 'physical_model',
        titleTh: 'Hint 1: เขียนแรงครบ 4 แรงบนบันได',
        contentTh:
          'มีน้ำหนัก $Mg$ ชี้ลงที่กึ่งกลางบันได ($L/2$), แรงตั้งฉากกำแพง $N_w$ ชี้ขวา (กำแพงลื่นจึงไม่มีแรงเสียดทาน), แรงตั้งฉากพื้น $N_f$ ชี้ขึ้น และแรงเสียดทานสถิตพื้น $f_s$ ชี้ซ้ายต้านการไถล',
        latexSnippets: ['\\sum F_x = 0 \\implies f_s = N_w', '\\sum F_y = 0 \\implies N_f = Mg'],
      },
      {
        tier: 2,
        type: 'governing_equations',
        titleTh: 'Hint 2: เลือกจุดหมุนที่ฐานบันได O เพื่อตัด N_f และ f_s ออกจากสมการทอร์ก!',
        contentTh:
          'ทอร์กจาก $Mg$ หมุนทวนเข็มรอบจุด $O$ ด้วยแขนโมเมนต์ $\\frac{L}{2}\\cos\\theta$ ส่วน $N_w$ หมุนตามเข็มด้วยแขนโมเมนต์ $L\\sin\\theta$',
        latexSnippets: ['Mg\\left(\\frac{L}{2}\\cos\\theta\\right) = N_w (L\\sin\\theta)'],
      },
      {
        tier: 3,
        type: 'mathematical_trick',
        titleTh: 'Hint 3: ใช้เงื่อนไขก่อนเริ่มไถล f_s ≤ μ_s N_f',
        contentTh:
          'จาก $f_s = N_w = \\frac{Mg}{2\\tan\\theta}$ เทียบกับ $f_{s,\\max} = \\mu_s Mg$ จะตัด $Mg$ และ $L$ ออกหมด!',
        latexSnippets: ['\\mu_{s,\\min} = \\frac{1}{2\\tan\\theta}'],
      },
    ],
    fullSolution: {
      approachOverviewTh:
        'ใช้สมการสมดุล 3 สมการ (∑F_x = 0, ∑F_y = 0, ∑τ_O = 0) โดยเลือกจุดหมุน O ที่ฐานบันไดซึ่งมีแรงไม่ทราบค่า 2 ตัว (N_f, f_s) ตัดทิ้งพร้อมกัน',
      coordinateSystemSetupTh: 'จุดหมุน O ที่จุดสัมผัสถาวรระหว่างขาบันไดกับพื้นราบ',
      steps: [
        {
          stepNumber: 1,
          stepTitleTh: 'ตั้งสมการสมดุลแรงในแนวราบและแนวดิ่ง',
          latexMath: '\\sum F_y = 0 \\implies N_f = Mg; \\qquad \\sum F_x = 0 \\implies f_s = N_w',
          explanationTh: 'เพราะกำแพงลื่น แรงในแนวราบทั้งหมดมีแค่ $N_w$ กับ $f_s$ ที่ต้องเท่ากันเป๊ะ',
        },
        {
          stepNumber: 2,
          stepTitleTh: 'ตั้งสมดุลทอร์กรอบฐานบันได $O$ เพื่อหา $N_w$',
          latexMath: '\\sum \\tau_O = 0 \\implies Mg\\left(\\frac{L}{2}\\cos 53^\\circ\\right) = N_w (L\\sin 53^\\circ) \\implies N_w = \\frac{Mg}{2\\tan 53^\\circ} = \\frac{Mg}{2(4/3)} = \\frac{3}{8}Mg = 0.375Mg',
          explanationTh: 'ความยาวบันได $L$ ตัดกันไปหมด แปลว่าบันไดยาวเท่าไรถ้าวางมุม $53^\\circ$ ก็ดันกำแพงเท่ากัน',
        },
        {
          stepNumber: 3,
          stepTitleTh: 'หา $\\mu_{s,\\min}$ จากเงื่อนไขขีดจำกัดการลื่นไถล',
          latexMath: 'f_s \\le \\mu_s N_f \\implies \\frac{3}{8}Mg \\le \\mu_s Mg \\implies \\mu_{s,\\min} = \\frac{3}{8} = 0.375',
          explanationTh: 'ถ้าพื้นมี $\\mu_s \\ge 0.375$ บันไดจะไม่ไถล และแรงเสียดทานจริงจะมีค่าเท่ากับ $0.375 Mg$',
        },
      ],
      finalAnswerLatex: 'N_w = \\frac{3}{8}Mg, \\qquad \\mu_{s,\\min} = \\frac{3}{8} = 0.375',
      examTrapWarningTh:
        'จำไว้ว่า **ทอร์ก = แรง × แขนตั้งฉาก** เสมอ! ระวังสับสนระหว่าง $\\sin\\theta$ กับ $\\cos\\theta$ ของแขนโมเมนต์ (ให้ลากแนวแรงแล้วดูว่ามุมไหนแนบแกนไหน)',
    },
    selfCheck: {
      id: 'check-pre-mech-eq-1',
      promptTh: 'หากมีคนมวล $M$ (เท่ากับมวลบันได) ปีนขึ้นไปยืนที่ **ปลายบนสุดของบันได** โดยมุม $\\theta$ คงเดิม ค่า $\\mu_{s,\\min}$ ที่ต้องใช้เทียบกับตอนยังไม่มีคนปีนจะเป็นอย่างไร?',
      optionsTh: [
        'ต้องใช้พื้นฝืดมากขึ้น $1.5$ เท่า (เพิ่มจาก $\\frac{1}{2\\tan\\theta}$ เป็น $\\frac{3}{4\\tan\\theta}$)',
        'เท่าเดิมทุกประการเพราะมวล $M$ ตัดกันทิ้ง',
        'ลดลงครึ่งหนึ่งเพราะน้ำหนักรวม $2Mg$ กดพื้นให้มีแรงเสียดทานมากขึ้น',
        'บันไดจะลอยหลุดจากพื้นราบ',
      ],
      correctOptionIndex: 0,
      explanationTh:
        'ถูกต้อง! เมื่อคนมวล $M$ อยู่ปลายบนระยะห่างราบ $L\\cos\\theta$ ทอร์กจะเพิ่มจาก $Mg(0.5L\\cos\\theta)$ เป็น $Mg(1.5L\\cos\\theta)$ จึงได้ $N_w = \\frac{3Mg}{2\\tan\\theta}$ ในขณะที่แรงกดพื้น $N_f$ เพิ่มเป็น $2Mg$ ดังนั้น $\\mu_{s,\\min} = \\frac{N_w}{N_f} = \\frac{3}{4\\tan\\theta} = 1.5 \\times \\frac{1}{2\\tan\\theta}$! ยิ่งปีนสูง ยิ่งเสี่ยงขาบันไดไถล!',
    },
  },
  {
    id: 'prob-pre-thermo-cond-1',
    code: 'PRE-C1-T02',
    sourceExam: 'แนวข้อสอบคัดเลือก สอวน. ค่าย 1 (หัวข้อ 12–13: การนำความร้อนและขยายตัว)',
    topicId: 'pre-fluids-thermo',
    difficulty: 'PreCamp1_Entrance',
    titleTh: 'การนำความร้อนแบบอนุกรมในสภาวะคงตัว (J = −K ΔT/Δx)',
    statementTh:
      'นำแท่งโลหะทรงกระบอกหน้าตัด $A$ เท่ากัน 2 แท่งมาต่อชนกันแบบอนุกรม แท่งที่ 1 ยาว $L_1 = 20\\text{ cm}$ มีค่าสภาพนำความร้อน $K_1 = 400\\text{ W/(m}\\cdot\\text{K)}$ ปลายซ้ายแตะอ่างร้อนอุณหภูมิคงที่ $T_H = 100^\\circ\\text{C}$ ส่วนแท่งที่ 2 ยาว $L_2 = 30\\text{ cm}$ มี $K_2 = 200\\text{ W/(m}\\cdot\\text{K)}$ ปลายขวาแตะอ่างเย็น $T_C = 0^\\circ\\text{C}$ เมื่อระบบเข้าสู่สภาวะสมดุลคงตัว (Steady State) โดยไม่สูญเสียความร้อนด้านข้าง จงหาอุณหภูมิที่รอยต่อระหว่างแท่งโลหะทั้งสอง ($T_m$)',
    statementLatex: 'T_H = 100^\\circ\\text{C}, \\; T_C = 0^\\circ\\text{C}, \\; \\frac{K_1}{L_1} = 3\\frac{K_2}{L_2}',
    hints: [
      {
        tier: 1,
        type: 'physical_model',
        titleTh: 'Hint 1: สภาวะคงตัว (Steady State) หมายถึงฟลักซ์ความร้อนผ่านทั้งสองแท่งเท่ากัน',
        contentTh:
          'ไม่มีความร้อนสะสมค้างอยู่ที่รอยต่อ อัตราความร้อนที่ไหลออกจากแท่งที่ 1 ต่อวินาทีต่อพื้นที่ ($J_1$) ต้องเท่ากับที่ไหลเข้าแท่งที่ 2 ($J_2$) เสมอ เหมือนกระแสไฟฟ้าอนุกรม!',
        latexSnippets: ['J_1 = J_2'],
      },
      {
        tier: 2,
        type: 'governing_equations',
        titleTh: 'Hint 2: เขียนกฎการนำความร้อน J = -K ΔT/Δx สำหรับแต่ละแท่ง',
        contentTh:
          'จะได้สมการขนาดฟลักซ์: $K_1\\frac{T_H - T_m}{L_1} = K_2\\frac{T_m - T_C}{L_2}$',
        latexSnippets: ['\\frac{K_1}{L_1}(100 - T_m) = \\frac{K_2}{L_2}(T_m - 0)'],
      },
      {
        tier: 3,
        type: 'mathematical_trick',
        titleTh: 'Hint 3: เทียบอัตราส่วนตัวนำความร้อน K/L',
        contentTh:
          'คำนวณ $\\frac{K_1/L_1}{K_2/L_2} = \\frac{400/0.20}{200/0.30} = \\frac{2000}{2000/3} = 3$ แล้วแก้สมการเชิงเส้นได้ทันที!',
        latexSnippets: ['3(100 - T_m) = T_m'],
      },
    ],
    fullSolution: {
      approachOverviewTh:
        'ใช้ความต่อเนื่องของฟลักซ์ความร้อนในสภาวะคงตัว J_1 = J_2 (เปรียบเสมือน I_1 = I_2 ในตัวต้านทานอนุกรม)',
      coordinateSystemSetupTh: 'การไหลของความร้อน 1 มิติจากด้านร้อน T_H = 100°C ไปยังด้านเย็น T_C = 0°C',
      steps: [
        {
          stepNumber: 1,
          stepTitleTh: 'ตั้งสมการฟลักซ์ความร้อนที่รอยต่อในสภาวะคงตัว',
          latexMath: 'J_1 = J_2 \\implies K_1 \\frac{T_H - T_m}{L_1} = K_2 \\frac{T_m - T_C}{L_2}',
          explanationTh: 'พื้นที่หน้าตัด $A$ เท่ากันทั้งคู่จึงตัดออกจากนิยาม $dQ/dt = A \\cdot J$',
        },
        {
          stepNumber: 2,
          stepTitleTh: 'แทนค่าคงที่ทางความร้อนและแก้หา $T_m$',
          latexMath: '\\frac{400}{0.20}(100 - T_m) = \\frac{200}{0.30}(T_m - 0) \\implies 3(100 - T_m) = T_m \\implies 4T_m = 300 \\implies T_m = 75^\\circ\\text{C}',
          explanationTh: 'อุณหภูมิตกผ่านแท่งที่ 1 แค่ $25^\\circ\\text{C}$ เพราะแท่งที่ 1 สั้นและนำความร้อนได้ดีกว่า ส่วนแท่งที่ 2 ต้องแบกความต่างอุณหภูมิถึง $75^\\circ\\text{C}$!',
        },
      ],
      finalAnswerLatex: 'T_m = 75^\\circ\\text{C}',
      examTrapWarningTh:
        'อย่าสับสนหน่วยความยาว $L_1, L_2$ หากต่างกันห้ามจับ $\\Delta T$ เท่ากันเด็ดขาด ต้องใช้ $K/L$ เต็มรูปแบบ (หรือเขียนเป็นความต้านทานความร้อน $R_{\\text{th}} = L/(KA)$)',
    },
    selfCheck: {
      id: 'check-pre-thermo-cond-1',
      promptTh: 'จากผลลัพธ์ $T_m = 75^\\circ\\text{C}$ หากแท่งโลหะทั้งสองนำไฟฟ้า/ความร้อนได้ดีมากและดีน้อยต่างกัน ข้อใดสรุปได้ถูกต้องสำหรับผนังฉนวนกันความร้อนต่ออนุกรมกัน?',
      optionsTh: [
        'ฝั่งที่เป็นฉนวน ($K$ น้อย / $R_{\\text{th}}$ มาก) จะเกิดการตกคร่อมของอุณหภูมิ $\\Delta T$ มากที่สุด (เหมือนตัวต้านทานค่าสูงได้ $\\Delta V$ สูง)',
        'แท่งที่นำความร้อนดีกว่าจะเกิดผลต่างอุณหภูมิ $\\Delta T$ มากกว่าเสมอ',
        'ฟลักซ์ความร้อนในแท่งที่มี $K$ น้อยจะมีค่าน้อยกว่าแท่งที่มี $K$ มากในสภาวะคงตัว',
        'รอยต่อต้องอยู่ที่ค่าเฉลี่ย $50^\\circ\\text{C}$ เสมอไม่ว่า $K, L$ จะเป็นเท่าใด',
      ],
      correctOptionIndex: 0,
      explanationTh:
        'ถูกต้อง! ในสมดุลคงตัว ฟลักซ์ $J = \\Delta T / R_{\\text{th}}$ ต้องเท่ากันทั้งสองแท่ง ดังนั้นแท่งที่มีความต้านทานความร้อน $R_{\\text{th}} = L/K$ สูงกว่า (เป็นฉนวนมากกว่า) จึงเกิดผลต่างอุณหภูมิ $\\Delta T = J \\cdot R_{\\text{th}}$ ใหญ่กว่า!',
    },
  },
  {
    id: 'prob-pre-em-cap-1',
    code: 'PRE-C1-E03',
    sourceExam: 'แนวข้อสอบคัดเลือก สอวน. ค่าย 1 (หัวข้อ 18: ตัวเก็บประจุและความหนาแน่นพลังงานไฟฟ้า)',
    topicId: 'pre-em',
    difficulty: 'PreCamp1_Entrance',
    titleTh: 'ถอดแบตเตอรี่แล้วดึงแผ่นตัวเก็บประจุออกห่าง: สนามไฟฟ้า พลังงานสะสม และงานที่ทำ',
    statementTh:
      'ตัวเก็บประจุแผ่นขนานในอากาศมีความจุเริ่มต้น $C_0 = 6.0\\text{ }\\mu\\text{F}$ ระยะห่างระหว่างแผ่น $d$ ถูกอัดประจุจนมีความต่างศักย์ $V_0 = 100\\text{ V}$ จากนั้น **ปลดแบตเตอรี่ออก** แล้วค่อยๆ ดึงแผ่นตัวนำแยกห่างออกจากกันจนระยะห่างกลายเป็น $3d$ จงหา (ก) ความต่างศักย์ใหม่ $V\'$ ระหว่างแผ่น (ข) อัตราส่วนความหนาแน่นพลังงานไฟฟ้า $u_E\' / u_E$ และ (ค) งานจากแรงภายนอกที่ต้องใช้ในการดึงแผ่นตัวนำแยกออก',
    statementLatex: 'C_0 = 6.0\\,\\mu\\text{F}, \\quad V_0 = 100\\text{ V}, \\quad Q = \\text{const}, \\quad d \\to 3d',
    hints: [
      {
        tier: 1,
        type: 'physical_model',
        titleTh: 'Hint 1: คีย์เวิร์ด "ปลดแบตเตอรี่ออก" = ประจุ Q คงที่!',
        contentTh:
          'เมื่อถอดสายไฟออก ประจุไม่มีทางไหลหนี ดังนั้น $Q\' = Q_0 = C_0 V_0$ คงที่เสมอ ส่วนความจุแปรผกผันกับระยะห่าง: $C = \\frac{\\varepsilon_0 A}{d} \\implies C\' = \\frac{C_0}{3}$',
        latexSnippets: ['Q = \\text{const}, \\qquad C\' = \\frac{C_0}{3}'],
      },
      {
        tier: 2,
        type: 'governing_equations',
        titleTh: 'Hint 2: วิเคราะห์สนามไฟฟ้า E และความหนาแน่นพลังงาน u_E = ½ ε₀ E²',
        contentTh:
          'ระหว่างแผ่นตัวนำขนาดใหญ่ สนามไฟฟ้า $E = \\frac{\\sigma}{\\varepsilon_0} = \\frac{Q}{\\varepsilon_0 A}$ **ไม่ขึ้นกับระยะ $d$ เลย**! ดังนั้นเมื่อ $Q$ คงที่ $E$ จึงเท่าเดิม และ $u_E = \\frac{1}{2}\\varepsilon_0 E^2$ ก็เท่าเดิม!',
        latexSnippets: ['u_E = \\frac{1}{2}\\varepsilon_0 E^2 = \\text{const}'],
      },
      {
        tier: 3,
        type: 'mathematical_trick',
        titleTh: 'Hint 3: หาพลังงานทั้งหมดจาก U = Q²/(2C) (หรือ u_E × ปริมาตร Ad)',
        contentTh:
          'เมื่อปริมาตรช่องว่างเพิ่ม 3 เท่า โดยที่ $u_E$ เท่าเดิม พลังงานสะสมทั้งหมดจึงเพิ่ม 3 เท่า! งานจากมือเราที่ดึงต้านแรงดูดจึงเท่ากับ $\\Delta U = U\' - U_0 = 2U_0$',
        latexSnippets: ['U\' = 3 U_0, \\qquad W_{\\text{ext}} = U\' - U_0'],
      },
    ],
    fullSolution: {
      approachOverviewTh:
        'ระบุตัวแปรคงที่ (Q คงที่) แล้วเทียบการเปลี่ยนแปลงของ C, V, E และพลังงานรวม U = ½CV² = Q²/(2C)',
      coordinateSystemSetupTh: 'ตัวเก็บประจุแผ่นขนานที่แยกโดดเดี่ยวทางไฟฟ้า (Q = 600 μC)',
      steps: [
        {
          stepNumber: 1,
          stepTitleTh: 'หาความจุใหม่และความต่างศักย์ใหม่',
          latexMath: 'C\' = \\frac{C_0}{3} = 2.0\\text{ }\\mu\\text{F} \\implies V\' = \\frac{Q}{C\'} = \\frac{C_0 V_0}{C_0 / 3} = 3V_0 = 300\\text{ V}',
          explanationTh: 'เพราะ $E = V/d$ คงที่ เมื่อ $d$ เพิ่ม 3 เท่า ความต่างศักย์ $V = Ed$ จึงเพิ่มขึ้น 3 เท่า!',
        },
        {
          stepNumber: 2,
          stepTitleTh: 'เทียบความหนาแน่นพลังงานไฟฟ้า $u_E$',
          latexMath: 'E\' = \\frac{\\sigma}{\\varepsilon_0} = E_0 \\implies \\frac{u_E\'}{u_E} = \\left(\\frac{E\'}{E_0}\\right)^2 = 1',
          explanationTh: 'ความหนาแน่นพลังงานต่อ 1 ลูกบาศก์เมตรในช่องว่างระหว่างแผ่น **คงเดิม 100%**!',
        },
        {
          stepNumber: 3,
          stepTitleTh: 'คำนวณพลังงานเริ่มต้น พลังงานสุดท้าย และงานจากแรงภายนอก',
          latexMath: 'U_0 = \\frac{1}{2}C_0 V_0^2 = \\frac{1}{2}(6.0\\times 10^{-6})(100)^2 = 30\\text{ mJ}, \\quad U\' = 3U_0 = 90\\text{ mJ} \\implies W_{\\text{ext}} = 90 - 30 = 60\\text{ mJ}',
          explanationTh: 'แผ่น $+Q$ กับ $-Q$ ดึงดูดกันอยู่ มือเราต้องออกแรงดึงเป็นบวก $+60\\text{ mJ}$ เพื่อสร้างปริมาตรสนามไฟฟ้าเพิ่มขึ้นอีก 2 เท่า',
        },
      ],
      finalAnswerLatex: 'V\' = 300\\text{ V}, \\qquad \\frac{u_E\'}{u_E} = 1, \\qquad W_{\\text{ext}} = 60\\text{ mJ}',
      examTrapWarningTh:
        'จำแยก 2 กรณีให้ขาด: **ถอดแบต ($Q$ คงที่)** ดึงห่าง $\\implies U \\uparrow$! แต่ถ้า **เสียบแบตค้าง ($V$ คงที่)** ดึงห่าง $\\implies C \\downarrow \\implies U = \\frac{1}{2}CV^2 \\downarrow$!',
    },
    selfCheck: {
      id: 'check-pre-em-cap-1',
      promptTh: 'หากทดลองซ้ำโดย **เสียบแบตเตอรี่ $V_0 = 100\\text{ V}$ ค้างไว้ตลอด** ขณะดึงแผ่นจาก $d$ เป็น $3d$ พลังงานสะสมในตัวเก็บประจุจะเปลี่ยนเป็นเท่าใด?',
      optionsTh: [
        'ลดลงเหลือ $1/3$ เท่า คือ $10\\text{ mJ}$ (เพราะ $U = \\frac{1}{2}CV^2$ และประจุไหลย้อนกลับเข้าแบตเตอรี่)',
        'เพิ่มขึ้นเป็น $3$ เท่า คือ $90\\text{ mJ}$ เหมือนเดิม',
        'คงเดิม $30\\text{ mJ}$ เพราะแบตเตอรี่จ่ายประจุเพิ่มให้เสมอ',
        'ลดลงเหลือ $0\\text{ mJ}$',
      ],
      correctOptionIndex: 0,
      explanationTh:
        'ถูกต้อง! เมื่อ $V$ คงที่และ $d \\to 3d$ สนามไฟฟ้า $E = V/d$ ลดลงเหลือ $1/3$ ความหนาแน่นพลังงาน $u_E \\propto E^2$ ลดลงเหลือ $1/9$ พอคูณปริมาตร $3$ เท่า พลังงานรวมจึงลดลงเหลือ $\\frac{1}{9} \\times 3 = \\frac{1}{3}$ ของเดิม ($10\\text{ mJ}$)!',
    },
  },
  {
    id: 'prob-pre-em-wire-1',
    code: 'PRE-C1-E04',
    sourceExam: 'แนวข้อสอบคัดเลือก สอวน. ค่าย 1 (หัวข้อ 23: สนามแม่เหล็กจากกระแสและกฎมือขวา)',
    topicId: 'pre-em',
    difficulty: 'PreCamp1_Entrance',
    titleTh: 'สนามแม่เหล็ก ณ จุดศูนย์กลางลวดโค้งครึ่งวงกลมต่อสายตรง',
    statementTh:
      'ลวดตัวนำเส้นหนึ่งถูกดัดเป็นส่วนโค้งครึ่งวงกลมรัศมี $R = 4.0\\text{ cm}$ โดยมีจุดศูนย์กลางความโค้งอยู่ที่ $O$ และปลายทั้งสองด้านต่อเป็นลวดตรงยาวออกไปในแนวเส้นตรงที่ลากผ่านจุด $O$ พอดี (ซ้ายและขวา) หากมีกระแสไฟฟ้าคงตัว $I = 8.0\\text{ A}$ ไหลผ่านลวดนี้ในทิศทวนเข็มนาฬิกา จงหาขนาดและทิศทางของสนามแม่เหล็ก $B$ ณ จุด $O$ (กำหนด $\\mu_0 = 4\\pi \\times 10^{-7}\\text{ T}\\cdot\\text{m/A}$)',
    statementLatex: 'R = 4.0\\text{ cm}, \\quad I = 8.0\\text{ A}, \\quad B_{\\text{loop}} = \\frac{\\mu_0 I}{2R}',
    hints: [
      {
        tier: 1,
        type: 'physical_model',
        titleTh: 'Hint 1: แยกลวดออกเป็น 3 ส่วน (เส้นตรงซ้าย + ครึ่งวงกลม + เส้นตรงขวา)',
        contentTh:
          'ใช้กฎ Biot–Savart / หลักการทับซ้อน (Superposition): พิจารณาสนามแม่เหล็กจากลวดแต่ละส่วนทีละชิ้นแล้วนำมาบวกกันเชิงเวกเตอร์ที่จุด $O$',
        latexSnippets: ['\\vec{B}_O = \\vec{B}_{\\text{straight,1}} + \\vec{B}_{\\text{arc}} + \\vec{B}_{\\text{straight,2}}'],
      },
      {
        tier: 2,
        type: 'governing_equations',
        titleTh: 'Hint 2: เส้นตรงที่แนวผ่านจุด O สร้างสนามแม่เหล็กที่ O เป็นศูนย์!',
        contentTh:
          'ตามแนวแกนของลวดตรง เวกเตอร์กระแส $d\\vec{\\ell}$ ขนานกับเวกเตอร์ชี้ไปยังจุด $O$ ($\\sin 0^\\circ = \\sin 180^\\circ = 0$) ดังนั้นส่วนตรงทั้งสองข้าง **ไม่สร้างสนาม $B$ ที่ $O$ เลย**!',
        latexSnippets: ['B_{\\text{straight,1}} = B_{\\text{straight,2}} = 0'],
      },
      {
        tier: 3,
        type: 'mathematical_trick',
        titleTh: 'Hint 3: ครึ่งวงกลม = ครึ่งหนึ่งของวงลวดกลมเต็มวง!',
        contentTh:
          'วงกลมเต็มวงให้ $B_{\\text{full}} = \\frac{\\mu_0 I}{2R}$ ดังนั้นครึ่งวงกลมย่อมให้ $\\frac{1}{2} B_{\\text{full}} = \\frac{\\mu_0 I}{4R}$ และใช้กฎมือขวาหากำมือตามทิศกระแสทวนเข็ม!',
        latexSnippets: ['B_{\\text{arc}} = \\frac{1}{2}\\left(\\frac{\\mu_0 I}{2R}\\right) = \\frac{\\mu_0 I}{4R}'],
      },
    ],
    fullSolution: {
      approachOverviewTh:
        'ตัดส่วนลวดตรงที่ชี้เข้าหาจุด O ทิ้งเป็นศูนย์ แล้วใช้สัดส่วนมุมของสูตรสนามแม่เหล็กใจกลางวงกลม B = μ₀I/(2R) พร้อมกฎมือขวา',
      coordinateSystemSetupTh: 'ระนาบกระดาษ (x-y) โดยมีจุดศูนย์กลางความโค้ง O อยู่บนระนาบเดียวกัน',
      steps: [
        {
          stepNumber: 1,
          stepTitleTh: 'ตรวจสอบสนามแม่เหล็กจากลวดตรงสองข้างที่ชี้เข้า/ออกจากจุด $O$',
          latexMath: 'd\\vec{B} \\propto d\\vec{\\ell} \\times \\hat{r} = 0 \\implies B_{\\text{straight}} = 0',
          explanationTh: 'กฎสำคัญสอบเข้า สอวน.: ลวดเส้นตรงใดๆ ที่ต่อความยาวแล้ว **พุ่งผ่านจุดที่เราสนใจ** ให้สนามแม่เหล็กที่จุดนั้นเป็น $0$ ทันที!',
        },
        {
          stepNumber: 2,
          stepTitleTh: 'คำนวณขนาดสนามแม่เหล็กจากส่วนโค้งครึ่งวงกลมรัศมี $R$',
          latexMath: 'B_O = \\frac{\\theta}{2\\pi}\\left(\\frac{\\mu_0 I}{2R}\\right) = \\frac{1}{2} \\cdot \\frac{(4\\pi\\times 10^{-7})(8.0)}{2(0.04)} = 2\\pi \\times 10^{-5}\\text{ T} \\approx 6.28 \\times 10^{-5}\\text{ T}',
          explanationTh: 'แทนหน่วย $R = 4.0\\text{ cm} = 0.04\\text{ m}$ ให้ถูกต้องก่อนคำนวณ',
        },
        {
          stepNumber: 3,
          stepTitleTh: 'หาทิศทางของ $\\vec{B}_O$ ด้วยกฎมือขวา',
          latexMath: '\\text{กระแสทวนเข็มนาฬิกา} \\implies \\text{หัวแม่มือชี้พุ่งออกจากหน้ากระดาษ } (+\\hat{z})',
          explanationTh: 'กำนิ้วมือขวาทั้ง 4 วนตามกระแสทวนเข็ม หัวแม่มือจะชี้พุ่งเข้าหาตาผู้อ่านตั้งฉากระนาบวงลวด',
        },
      ],
      finalAnswerLatex: 'B_O = 2\\pi \\times 10^{-5}\\text{ T} \\approx 62.8\\text{ }\\mu\\text{T} \\; (\\text{พุ่งออกจากหน้ากระดาษ})',
      examTrapWarningTh:
        'จำความต่าง 2 สูตรให้แม่น: **วงลวดกลมที่ศูนย์กลาง** ใช้ $B = \\frac{\\mu_0 I}{2r}$ (ไม่มี $\\pi$ ข้างล่าง!) ส่วน **ลวดตรงยาวอนันต์ห่าง $r$** ใช้ $B = \\frac{\\mu_0 I}{2\\pi r}$ (มี $\\pi$ ข้างล่าง!)',
    },
    selfCheck: {
      id: 'check-pre-em-wire-1',
      promptTh: 'หากนำลวดเดิมไปดัดเป็นส่วนโค้งเพียงหนึ่งในสี่ของวงกลม (มุมที่จุดศูนย์กลาง $90^\\circ$) รัศมี $R$ เท่าเดิม กระแส $I$ เท่าเดิม และปลายทั้งสองเป็นเส้นตรงพุ่งชี้หาจุด $O$ สนามแม่เหล็กที่ $O$ จะเป็นเท่าใด?',
      optionsTh: [
        '$\\frac{\\mu_0 I}{8R}$ (ครึ่งหนึ่งของครึ่งวงกลม คือ $\\pi \\times 10^{-5}\\text{ T}$)',
        '$\\frac{\\mu_0 I}{2R}$ เท่ากับวงกลมเต็มวง',
        '$\\frac{\\mu_0 I}{4\\pi R}$',
        'ศูนย์ เพราะวงลวดไม่ปิดครบรอบ',
      ],
      correctOptionIndex: 0,
      explanationTh:
        'ถูกต้อง! ส่วนโค้งมุม $\\theta = \\pi/2$ คิดเป็น $\\frac{\\pi/2}{2\\pi} = \\frac{1}{4}$ ของวงกลมเต็มวง จึงได้ $B = \\frac{1}{4}\\left(\\frac{\\mu_0 I}{2R}\\right) = \\frac{\\mu_0 I}{8R}$!',
    },
  },
  {
    id: 'prob-pre-opt-mirror-1',
    code: 'PRE-C1-O03',
    sourceExam: 'แนวข้อสอบคัดเลือก สอวน. ค่าย 1 (หัวข้อ 26: กระจกโค้งและเครื่องหมายกำลังขยาย)',
    topicId: 'pre-optics',
    difficulty: 'PreCamp1_Entrance',
    titleTh: 'กระจกเว้า: ความต่างระหว่างภาพจริงหัวกลับ vs ภาพเสมือนหัวตั้งที่มีขนาดขยาย 2 เท่า',
    statementTh:
      'กระจกเงาเว้าทรงกลมมีรัศมีความโค้ง $R = 40\\text{ cm}$ เมื่อวางวัตถุจริงหน้ากระจกที่ตำแหน่ง A พบว่าเกิด **ภาพจริงขนาดใหญ่เป็น 2 เท่าของวัตถุ** ($|M| = 2$) ต่อมาขยับวัตถุไปยังตำแหน่ง B พบว่าเกิด **ภาพเสมือนขนาดใหญ่เป็น 2 เท่าของวัตถุ** ($|M| = 2$) เช่นเดียวกัน จงหาระยะวัตถุ $u_A$, $u_B$ และระยะทางที่ต้องขยับวัตถุจาก A ไป B',
    statementLatex: 'f = +\\frac{R}{2} = +20\\text{ cm}, \\qquad M_A = -2, \\qquad M_B = +2',
    hints: [
      {
        tier: 1,
        type: 'physical_model',
        titleTh: 'Hint 1: แยกเครื่องหมายของกำลังขยาย M = -v/u จากคำว่า "ภาพจริง" vs "ภาพเสมือน"',
        contentTh:
          'สำหรับวัตถุเดี่ยวกับกระจก/เลนส์อันเดียว: **ภาพจริง = หัวกลับ** ดังนั้น $M_A = -2 \\implies v_A = +2u_A$ (หน้ากระจก); **ภาพเสมือน = หัวตั้ง** ดังนั้น $M_B = +2 \\implies v_B = -2u_B$ (หลังกระจก)',
        latexSnippets: ['M_A = -2 \\implies v_A = +2u_A', 'M_B = +2 \\implies v_B = -2u_B'],
      },
      {
        tier: 2,
        type: 'governing_equations',
        titleTh: 'Hint 2: กระจกเว้ารวมแสง ใช้ความยาวโฟกัส f = +R/2 = +20 cm',
        contentTh:
          'แทน $v_A$ และ $v_B$ ลงในสมการกระจก $\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f}$ ทีละกรณี (ห้ามแทน $R = 40$ โดยลืมหาร 2!)',
        latexSnippets: ['\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{+20}'],
      },
      {
        tier: 3,
        type: 'mathematical_trick',
        titleTh: 'Hint 3: หาการกระจัด Δu = |u_B - u_A| พร้อมทิศการเลื่อน',
        contentTh:
          'จะได้ตำแหน่ง A อยู่นอกจุดโฟกัส ($f < u_A < 2f$) และตำแหน่ง B อยู่ใกล้กระจกกว่าจุดโฟกัส ($u_B < f$)',
        latexSnippets: ['\\Delta u = u_A - u_B'],
      },
    ],
    fullSolution: {
      approachOverviewTh:
        'ถอดความหมายเครื่องหมายของกำลังขยาย M = -v/u ทั้งสองกรณี แล้วแก้สมการ 1/v + 1/u = 1/f ของกระจกเว้า (f = +20 cm)',
      coordinateSystemSetupTh: 'แกนมุขสำคัญของกระจกเว้า ด้านหน้ากระจกเป็นฝั่งจริง (+), หลังกระจกเป็นฝั่งเสมือน (−)',
      steps: [
        {
          stepNumber: 1,
          stepTitleTh: 'หาตำแหน่ง A (ภาพจริงขนาด 2 เท่า: $M_A = -2 \\implies v_A = +2u_A$)',
          latexMath: '\\frac{1}{2u_A} + \\frac{1}{u_A} = \\frac{1}{20} \\implies \\frac{3}{2u_A} = \\frac{1}{20} \\implies u_A = 30\\text{ cm}, \\; (v_A = +60\\text{ cm})',
          explanationTh: 'วัตถุอยู่ระหว่างจุดโฟกัส ($20\\text{ cm}$) กับจุดศูนย์กลางความโค้ง ($40\\text{ cm}$) จึงเกิดภาพจริงขยายหัวกลับ',
        },
        {
          stepNumber: 2,
          stepTitleTh: 'หาตำแหน่ง B (ภาพเสมือนขนาด 2 เท่า: $M_B = +2 \\implies v_B = -2u_B$)',
          latexMath: '\\frac{1}{-2u_B} + \\frac{1}{u_B} = \\frac{1}{20} \\implies \\frac{1}{2u_B} = \\frac{1}{20} \\implies u_B = 10\\text{ cm}, \\; (v_B = -20\\text{ cm})',
          explanationTh: 'วัตถุอยู่ใกล้กว่าจุดโฟกัส ($10\\text{ cm} < 20\\text{ cm}$) จึงเกิดภาพเสมือนหัวตั้งหลังกระจก $20\\text{ cm}$',
        },
        {
          stepNumber: 3,
          stepTitleTh: 'สรุประยะที่ต้องเลื่อนวัตถุจาก A ไปยัง B',
          latexMath: '\\Delta u = 30 - 10 = 20\\text{ cm} \\; (\\text{เลื่อนเข้าหากระจก})',
          explanationTh: 'สังเกตว่า $|u_A - f| = 10\\text{ cm}$ และ $|f - u_B| = 10\\text{ cm}$ สมมาตรรอบจุดโฟกัส $f = 20\\text{ cm}$ พอดี!',
        },
      ],
      finalAnswerLatex: 'u_A = 30\\text{ cm}, \\qquad u_B = 10\\text{ cm}, \\qquad \\text{เลื่อนเข้าหากระจก } 20\\text{ cm}',
      examTrapWarningTh:
        'กับดักสุดคลาสสิก: โจทย์บอกแค่ "ได้ภาพขนาดเป็น $N$ เท่า" โดยไม่บอกจริงหรือเสมือน ต้องนึกเสมอว่ากระจกเว้า/เลนส์นูนมี **2 ตำแหน่ง** เสมอ (ฝั่งหน้าโฟกัส $f(1 - 1/N)$ และหลังโฟกัส $f(1 + 1/N)$)!',
    },
    selfCheck: {
      id: 'check-pre-opt-mirror-1',
      promptTh: 'จากสมบัติความสมมาตรรอบจุดโฟกัสของกระจกเว้า กระจกเงา **นูน** ($f < 0$) สามารถสร้างภาพที่มีขนาด **ใหญ่กว่าวัตถุจริง** ได้หรือไม่?',
      optionsTh: [
        'ไม่ได้เด็ดขาด! กระจกนูนสร้างภาพจากวัตถุจริงเป็น "ภาพเสมือนขนาดเล็กกว่าวัตถุเสมอ" ($0 < M < 1$)',
        'ได้ เมื่อวางวัตถุไว้ใกล้กว่าจุดโฟกัสเหมือนกระจกเว้า',
        'ได้ เมื่อวางวัตถุไว้ไกลกว่า $2f$',
        'ได้ภาพจริงหัวกลับขนาดใหญ่ขึ้นที่จุด $u = R$',
      ],
      correctOptionIndex: 0,
      explanationTh:
        'ถูกต้อง! จาก $\\frac{1}{v} = \\frac{1}{-|f|} - \\frac{1}{u}$ จะได้ $|v| = \\frac{u|f|}{u + |f|} < u$ เสมอสำหรับวัตถุจริง ($u > 0$) ดังนั้น $|M| = |v|/u < 1$ เสมอ — นั่นคือเหตุผลที่กระจกมองข้างรถยนต์ (กระจกนูน) เห็นภาพมุมกว้างและมีคำเตือนว่า "Objects in mirror are closer than they appear"!',
    },
  },
  {
    id: 'prob-pre-wave-1',
    code: 'PRE-C1-W01',
    sourceExam: 'แนวข้อสอบคัดเลือก สอวน. ค่าย 1 (คลื่น การแทรกสอด Buff/Debuff & เส้นเชือก)',
    topicId: 'pre-waves',
    difficulty: 'PreCamp1_Entrance',
    titleTh: 'การแทรกสอดจากลำโพงอาพันธ์ 2 ตัว: หาจุด Buff (เสียงดัง) vs Debuff (เงียบสนิท) และความเข้มคลื่น',
    statementTh:
      'ลำโพงอาพันธ์ 2 ตัว $S_1$ และ $S_2$ ส่งเสียงเฟสตรงกันความถี่ $f = 680\\text{ Hz}$ ในอากาศที่อัตราเร็วเสียง $v = 340\\text{ m/s}$ โดยผู้ฟังยืนอยู่ห่างจาก $S_1$ เป็นระยะ $r_1 = 4.00\\text{ m}$ และห่างจาก $S_2$ เป็นระยะ $r_2 = 5.25\\text{ m}$ (ก) จงหาความต่างเฟส $\\Delta\\phi$ และตรวจสอบว่าจุดนี้เป็นเสริม (Buff) หรือหักล้าง (Debuff) (ข) หากลำโพงแต่ละตัวให้แอมพลิจูด $A_0$ และความเข้ม $I_0$ เท่ากัน ณ จุดที่เลื่อนไปจนผลต่างระยะทาง $\\Delta r = 0.625\\text{ m}$ ความเข้มเสียงรวมจะกี่เท่าของ $I_0$?',
    statementLatex: 'f = 680\\text{ Hz}, \\; v = 340\\text{ m/s}, \\; \\Delta r_A = 1.25\\text{ m}, \\; \\Delta r_B = 0.625\\text{ m}',
    hints: [
      {
        tier: 1,
        type: 'physical_model',
        titleTh: 'Hint 1: หาความยาวคลื่น λ = v/f ก่อน แล้วเทียบผลต่างระยะทาง Δr = |r₂ - r₁| กับ λ',
        contentTh:
          'คำนวณ $\\lambda = \\frac{340}{680} = 0.50\\text{ m}$ จากนั้นนับจำนวนคลื่นที่ต่างกัน $\\frac{\\Delta r}{\\lambda}$!',
        latexSnippets: ['\\lambda = \\frac{v}{f} = 0.50\\text{ m}'],
      },
      {
        tier: 2,
        type: 'governing_equations',
        titleTh: 'Hint 2: แปลง Δr เป็นความต่างเฟส Δφ = 2π (Δr / λ)',
        contentTh:
          'ทุกๆ $1\\lambda$ เฟสต่างไป $2\\pi$ เรเดียน: $\\Delta r_A = 1.25\\text{ m} = 2.5\\lambda \\implies \\Delta\\phi = 5\\pi$ (ตรงข้ามเฟสพอดี = หักล้างหมด!)',
        latexSnippets: ['\\Delta\\phi = \\frac{2\\pi\\,\\Delta r}{\\lambda}'],
      },
      {
        tier: 3,
        type: 'mathematical_trick',
        titleTh: 'Hint 3: ใช้สูตรความเข้ม I = 4 I₀ cos²(Δφ / 2) สำหรับจุดที่เฟสต่างครึ่งๆ กลางๆ',
        contentTh:
          'ที่จุด $\\Delta r_B = 0.625\\text{ m} = 1.25\\lambda$ จะได้ $\\Delta\\phi = 2.5\\pi$ ($\\cos(\\Delta\\phi/2) = \\cos(1.25\\pi) = -\\frac{1}{\\sqrt{2}}$) ยกกำลังสองได้ $1/2$!',
        latexSnippets: ['I = 4I_0\\cos^2\\left(\\frac{\\Delta\\phi}{2}\\right)'],
      },
    ],
    fullSolution: {
      approachOverviewTh:
        'เปลี่ยนผลต่างระยะทาง Δr ให้เป็นจำนวนความยาวคลื่น λ แล้วแปลงเป็นความต่างเฟส Δφ เพื่อเข้าสูตร A_res = 2A₀|cos(Δφ/2)| และ I = 4I₀ cos²(Δφ/2)',
      coordinateSystemSetupTh: 'แหล่งกำเนิดคลื่นอาพันธ์เฟสตรงกันในระนาบ 2 มิติ',
      steps: [
        {
          stepNumber: 1,
          stepTitleTh: 'หาความยาวคลื่นและความต่างเฟส ณ จุดแรก ($\\Delta r_A = 1.25\\text{ m}$)',
          latexMath: '\\lambda = \\frac{340}{680} = 0.50\\text{ m}, \\qquad \\Delta\\phi_A = 2\\pi\\left(\\frac{1.25}{0.50}\\right) = 5\\pi\\text{ rad} \\; (\\equiv 180^\\circ)',
          explanationTh: 'เพราะ $\\Delta r_A = (2 + \\frac{1}{2})\\lambda$ และ $\\Delta\\phi = 5\\pi$ คลื่นจึง **หักล้างกันหมด (Destructive / Debuff)** เสียงเงียบสนิท ($I = 0$)!',
        },
        {
          stepNumber: 2,
          stepTitleTh: 'คำนวณความเข้มเสียงรวม ณ จุดที่สอง ($\\Delta r_B = 0.625\\text{ m}$)',
          latexMath: '\\Delta\\phi_B = 2\\pi\\left(\\frac{0.625}{0.50}\\right) = 2.5\\pi \\implies I = 4I_0\\cos^2\\left(\\frac{2.5\\pi}{2}\\right) = 4I_0\\left(\\frac{1}{2}\\right) = 2I_0',
          explanationTh: 'จุดนี้ไม่ได้เสริมสุดขีด ($4I_0$) และไม่ได้ดับหมด ($0$) แต่ได้ความเข้มเท่ากับ $2I_0$ พอดี (ลองปรับ $\\Delta\\phi = 90^\\circ$ ในแล็บคลื่นได้เลย!)',
        },
      ],
      finalAnswerLatex: '\\text{(ก) } \\Delta\\phi_A = 5\\pi\\text{ rad (Debuff เสียงดับ)}, \\qquad \\text{(ข) } I = 2I_0',
      examTrapWarningTh:
        'ระวัง! **จุดเสริมกัน (Buff) ความเข้มเป็น $4I_0$** ไม่ใช่ $2I_0$ เพราะแอมพลิจูดรวม $2A_0$ และความเข้ม $I \\propto A^2$ ($2^2 = 4$ เท่า!)',
    },
    selfCheck: {
      id: 'check-pre-wave-1',
      promptTh: 'หากกลับขั้วสายไฟของลำโพง $S_2$ 1 ข้าง ทำให้แหล่งกำเนิดทั้งสอง **ส่งเสียงเฟสตรงข้ามกันตั้งแต่ต้น** ($180^\\circ$) จุดกึ่งกลางพอดี ($r_1 = r_2$) จะเกิดอะไรขึ้น?',
      optionsTh: [
        'เกิดหักล้างกันหมด (Debuff / Node เสียงดับ) ที่แนวกลางพอดี และเงื่อนไข Buff/Debuff จะสลับกันทั้งสนาม!',
        'ยังเสริมกันเสียงดัง $4I_0$ ที่แนวกลางเหมือนเดิม',
        'ความเร็วเสียงจะลดลงครึ่งหนึ่ง',
        'เกิดคลื่นกระแทก (Sonic Boom)',
      ],
      correctOptionIndex: 0,
      explanationTh:
        'ถูกต้อง! เมื่อแหล่งกำเนิดเริ่มเฟสตรงข้าม ($\\pi$) อยู่แล้ว ระยะทางเท่ากัน ($\\Delta r = 0$) ยังคงเหลือความต่างเฟส $\\pi$ จึงกลายเป็นแนวบัพ (Debuff) ทันที!',
    },
  },
  {
    id: 'prob-pre-wave-2',
    code: 'PRE-C1-W02',
    sourceExam: 'แนวข้อสอบคัดเลือก สอวน. ค่าย 1 (คลื่นนิ่งในเส้นเชือก บีตส์ และดอปเพลอร์)',
    topicId: 'pre-waves',
    difficulty: 'PreCamp1_Entrance',
    titleTh: 'คลื่นนิ่งบนสายกีตาร์ + ความถี่บีตส์เมื่อปรับความตึงเชือก',
    statementTh:
      'ลวดโลหะยาว $L = 0.80\\text{ m}$ มวลรวม $m = 4.0\\text{ g}$ ถูกขึงตึงระหว่างจุดตรึง 2 ฝั่ง เมื่อดีดให้สั่นใน **ฮาร์มอนิกที่ 2** ($n = 2$) พบว่าเกิดเสียงสั่นพ้องที่ความถี่ $f_2 = 250\\text{ Hz}$ และเมื่อนำมาเทียบกับส้อมเสียงมาตรฐานจะได้ยิน **บีตส์ $4\\text{ Hz}$** พอเร่งความตึงเชือกเพิ่มขึ้นอีกเล็กน้อยพบว่าเสียงบีตส์ช้าลงเหลือ $1\\text{ Hz}$ จงหา (ก) แรงตึงเชือก $T$ เริ่มต้น และ (ข) ความถี่ของส้อมเสียงมาตรฐาน',
    statementLatex: 'L = 0.80\\text{ m}, \\; m = 4.0\\times 10^{-3}\\text{ kg}, \\; f_2 = 250\\text{ Hz}, \\; f_{\\text{beat}}: 4\\text{ Hz} \\to 1\\text{ Hz}',
    hints: [
      {
        tier: 1,
        type: 'physical_model',
        titleTh: 'Hint 1: ฮาร์มอนิกที่ 2 (n = 2) ปลายตรึง 2 ด้านมี 2 ลูปพอดี -> λ = L!',
        contentTh:
          'ใช้ $\\lambda_n = \\frac{2L}{n} = \\frac{2(0.80)}{2} = 0.80\\text{ m}$ แล้วหาความเร็วคลื่นบนเชือก $v = f_2\\lambda_2$',
        latexSnippets: ['v = f_2 \\lambda_2 = 250(0.80) = 200\\text{ m/s}'],
      },
      {
        tier: 2,
        type: 'governing_equations',
        titleTh: 'Hint 2: หาความหนาแน่นเชิงเส้น μ = m/L แล้วแทนใน v = √(T/μ)',
        contentTh:
          '$\\mu = \\frac{4.0\\times 10^{-3}}{0.80} = 5.0\\times 10^{-3}\\text{ kg/m}$ จาก $T = \\mu v^2$ จะได้แรงตึงเชือก $T$ ทันที',
        latexSnippets: ['T = \\mu v^2'],
      },
      {
        tier: 3,
        type: 'mathematical_trick',
        titleTh: 'Hint 3: ตีความบีตส์เมื่อ "เร่งความตึงเชือกเพิ่ม -> f_wire เพิ่มขึ้น -> บีตส์ลดลง"',
        contentTh:
          'ส้อมเสียงอาจเป็น $250 \\pm 4 = 254$ หรือ $246\\text{ Hz}$ แต่เมื่อเพิ่ม $T$ ความถี่ลวดพุ่งสูงขึ้น (>250) แล้วเข้าใกล้ส้อมเสียงมากขึ้น (บีตส์ลดจาก 4 เหลือ 1) ดังนั้นส้อมเสียงต้อง **สูงกว่า 250**!',
        latexSnippets: ['f_{\\text{fork}} > 250\\text{ Hz}'],
      },
    ],
    fullSolution: {
      approachOverviewTh:
        'คำนวณความเร็วคลื่นบนเชือกจากฮาร์มอนิกที่ 2 (v = fλ) เชื่อมกับสูตร v = √(T/μ) แล้ววิเคราะห์ทิศทางการเปลี่ยนความถี่บีตส์เพื่อเลือกคำตอบส้อมเสียง',
      coordinateSystemSetupTh: 'คลื่นนิ่งบนเส้นเชือกปลายตรึงสองด้าน (Node ที่ x=0 และ x=L)',
      steps: [
        {
          stepNumber: 1,
          stepTitleTh: 'คำนวณความเร็วคลื่นและแรงตึงเชือกเริ่มต้น $T$',
          latexMath: '\\lambda_2 = \\frac{2L}{2} = 0.80\\text{ m} \\implies v = (250)(0.80) = 200\\text{ m/s}, \\quad \\mu = \\frac{0.004}{0.80} = 0.005\\text{ kg/m}',
          explanationTh: 'แทนใน $T = \\mu v^2 = (0.005)(200)^2 = 200\\text{ N}$',
        },
        {
          stepNumber: 2,
          stepTitleTh: 'ระบุความถี่ส้อมเสียงจากการลดลงของบีตส์เมื่อขึงเชือกตึงขึ้น',
          latexMath: 'f_{\\text{fork}} = 250 + 4 = 254\\text{ Hz} \\; (\\text{เพราะเมื่อ } T \\uparrow \\implies v \\uparrow \\implies f_{\\text{wire}} \\uparrow \\text{ เข้าใกล้ } 254\\text{ Hz})',
          explanationTh: 'หากส้อมเสียงเป็น $246\\text{ Hz}$ การเพิ่ม $T$ จะยิ่งทำใหเชือกถ่างห่างจาก $246\\text{ Hz}$ จนบีตส์ถี่ขึ้น (>4 Hz) ซึ่งขัดแย้งกับโจทย์!',
        },
      ],
      finalAnswerLatex: 'T = 200\\text{ N}, \\qquad f_{\\text{fork}} = 254\\text{ Hz}',
      examTrapWarningTh:
        'จำไว้ว่า $\\mu = m/L$ ต้องแปลงมวลเป็น **กิโลกรัม (kg)** เสมอ! ถ้าลืมแปลง 4 g เป็น $4 \\times 10^{-3}\\text{ kg}$ คำตอบแรงตึงเชือก $T$ จะผิดไป $1000$ เท่า!',
    },
    selfCheck: {
      id: 'check-pre-wave-2',
      promptTh: 'หากไม่เปลี่ยนแรงตึงเชือก ($v = 200\\text{ m/s}$) แต่ดีดสายลวดเดิมให้สั่นใน **ฮาร์มอนิกที่ 3** ($n = 3$) บนลวดเดียวกัน จะมีจุดปฏิบัพ (Antinode) กี่จุด และมีความถี่กี่ Hz?',
      optionsTh: [
        '$3$ จุดปฏิบัพ และความถี่ $375\\text{ Hz}$ (คือ $3 \\times f_1$ โดย $f_1 = 125\\text{ Hz}$)',
        '$2$ จุดปฏิบัพ และความถี่ $300\\text{ Hz}$',
        '$4$ จุดปฏิบัพ และความถี่ $500\\text{ Hz}$',
        '$3$ จุดปฏิบัพ และความถี่ $750\\text{ Hz}$',
      ],
      correctOptionIndex: 0,
      explanationTh:
        'ถูกต้อง! ฮาร์มอนิกที่ 2 = $2f_1 = 250\\text{ Hz} \\implies$ ความถี่มูลฐาน $f_1 = 125\\text{ Hz}$ ดังนั้นฮาร์มอนิกที่ 3 มี 3 ลูป (3 Antinodes, 4 Nodes) และความถี่ $f_3 = 3(125) = 375\\text{ Hz}$!',
    },
  },
];
