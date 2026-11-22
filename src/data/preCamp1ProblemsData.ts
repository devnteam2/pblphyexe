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
];
