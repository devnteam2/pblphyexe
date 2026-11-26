// src/data/lessonBridges.ts
import { TopicId } from '@/types/curriculum';

export type InteractiveLabId =
  | 'newton-laws-lab'
  | 'projectile-shooter'
  | 'momentum-collision'
  | 'work-energy-coaster'
  | 'circular-motion-lab'
  | 'fluid-buoyancy-lab'
  | 'heat-flow'
  | 'ideal-gas-lab'
  | 'electrostatics-field-lab'
  | 'circuit-builder'
  | 'magnet-field'
  | 'faraday-em-wave-lab'
  | 'light-optics-bench'
  | 'snell-fermat'
  | 'combined-optics-lab'
  | 'wave-interference'
  | 'sound-doppler-lab'
  | 'pulley-capstan'
  | 'coriolis-disk'
  | 'coupled-oscillators'
  | 'vector-calculus-lab'
  | 'drag-terminal-lab'
  | 'rocket-com-lab'
  | 'rolling-race-lab'
  | 'kepler-orbit-lab'
  | 'shm-phase-lab'
  | 'derivative-slope'
  | 'integral-work'
  | 'potential-well'
  | 'shm-resonance'
  | 'incline-wedge'
  | 'projectile-collision'
  | 'circular-equilibrium'
  | 'bernoulli-pipe'
  | 'temperature-box'
  | 'electric-capacitor'
  | 'rc-circuit-box'
  | 'magnetic-wire'
  | 'optics-ray-tracer';

export interface ConceptBridge {
  levelTag: string;
  basicLabelTh: string;
  basicFormulaLatex: string;
  advancedLabelTh: string;
  advancedFormulaLatex: string;
  whyItBreaksTh: string;
  howItEvolvesTh: string;
  everydayAnalogyTh: string;
  interactiveLabId?: InteractiveLabId;
  extraLabIds?: InteractiveLabId[];
  quickRecall: {
    questionTh: string;
    answerTh: string;
  };
}

export const LESSON_BRIDGES: Record<string, ConceptBridge> = {
  // =========================================================================
  // PRE-CAMP 1 ENTRANCE EXAM TRACK (OFFICIAL ITEMS 1–28)
  // =========================================================================
  'pre-units-newton-friction': {
    levelTag: 'เตรียมสอบเข้าค่าย 1 • ข้อ 1, 2, 5 (ไม่ต้องใช้แคลคูลัส)',
    basicLabelTh: 'ท่องจำสูตร F = ma และ f = μN แบบตายตัว',
    basicFormulaLatex: '30\\text{ m/s} = 108\\text{ km/h}, \\quad ma = f',
    advancedLabelTh: 'เข้าใจกรอบเฉื่อย FBD & เช็กเงื่อนไขก่อนเริ่มไถล',
    advancedFormulaLatex: 'f_s \\le \\mu_s N \\; (\\text{อยู่นิ่ง}), \\qquad f_k = \\mu_k N \\; (\\text{ไถลแล้ว})',
    whyItBreaksTh:
      'จุดที่คนพลาดมากที่สุดในห้องสอบไม่ใช่คณิตศาสตร์ยากๆ แต่คือการใช้ $\\mu_s N$ ทั้งที่กล่องยังไม่ไถล และการลืมแตกแรงน้ำหนักลงบนแกนพื้นเอียง!',
    howItEvolvesTh:
      'เริ่มจากแปลงหน่วยให้เป็นระบบ SI ให้คล่อง แล้วตั้งแกน $x$-$y$ ตามแนวการเคลื่อนที่ ตรวจว่า $\\Sigma F_y = 0 \\implies N = mg\\cos\\theta$ ก่อนเสมอ จากนั้นค่อยเทียบแรงฉุดกับ $\\mu_s N$',
    everydayAnalogyTh:
      'ลองดันตู้เสื้อผ้าเบาๆ ด้วยแรง $5\\text{ kgf}$ ตู้ยังไม่ขยับ พื้นก็ต้านแค่ $5\\text{ kgf}$ ($f_s$) — มันไม่ได้ออกแรงต้านเต็มแมกซ์ตลอดเวลา!',
    interactiveLabId: 'newton-laws-lab',
    extraLabIds: ['incline-wedge'],
    quickRecall: {
      questionTh: 'วางกล่องบนพื้นเอียงที่มี $mg\\sin\\theta = 15\\text{ N}$ และ $\\mu_s N = 22\\text{ N}$ แรงเสียดทานสถิตที่เกิดขึ้นจริงมีค่าเท่าใด?',
      answerTh: '$15\\text{ N}$ (กล่องยังไม่ไถล! แรงเสียดทานสถิตจะต้านเท่าที่จำเป็นเพื่อหยุดการเคลื่อนที่ ไม่ใช่ $22\\text{ N}$)',
    },
  },
  'pre-projectile-kinematics': {
    levelTag: 'เตรียมสอบเข้าค่าย 1 • ข้อ 6 (วิถีโพรเจกไทล์ & การแยกแกนอิสระ)',
    basicLabelTh: 'จำสูตร H, R, T ลัดแบบไม่เข้าใจที่มา (พอพื้นเอียง/ยิงจากหน้าผาก็ใช้ไม่ได้)',
    basicFormulaLatex: 'H = \\frac{u^2\\sin^2\\theta}{2g}, \\quad R = \\frac{u^2\\sin 2\\theta}{g}',
    advancedLabelTh: 'แยกสมการเวลาแกน x และ y อย่างอิสระ (ใช้ได้ทุกกรณี)',
    advancedFormulaLatex: 'x(t) = D_1 t + D_2, \\qquad y(t) = -\\frac{1}{2}gt^2 + C_1 t + C_2',
    whyItBreaksTh:
      'สูตรสำเร็จ $R = \\frac{u^2\\sin 2\\theta}{g}$ ใช้ได้ **เฉพาะจุดตกสูงเท่าจุดยิงเท่านั้น!** ทันทียิงจากตึกสูง ยิงลงพื้นเอียง หรือยิงให้ข้ามกำแพง สูตรลัดจะพังทันที',
    howItEvolvesTh:
      'แยกการเคลื่อนที่ตั้งฉากกันเป็น 2 เส้นตรง: แกน $x$ ความเร็วคงที่ ($a_x = 0$) และแกน $y$ ตกอิสระ ($a_y = -g$) โดยมีเพียง **เวลา $t$** ที่ใช้ร่วมกัน แก้หา $t$ จากแกนหนึ่งแล้วโยนเข้าอีกแกนได้ทุกโจทย์!',
    everydayAnalogyTh:
      'เงาของลูกบาสเกตบอลบนพื้นสนาม ($x$) วิ่งด้วยความเร็วสม่ำเสมอเป็นเส้นตรง เหมือนไม่มีแรงโน้มถ่วง ส่วนเงาบนผนังตึก ($y$) เด้งขึ้นลงเหมือนโยนลูกบอลในแนวดิ่งเพียวๆ!',
    interactiveLabId: 'projectile-shooter',
    quickRecall: {
      questionTh: 'ณ จุดสูงสุดของวิถีโพรเจกไทล์ ความเร็วและความเร่งของวัตถุมีค่าเป็นศูนย์หรือไม่?',
      answerTh: 'ไม่เป็นศูนย์ทั้งคู่! ที่จุดสูงสุด $v_y = 0$ เท่านั้น แต่ความเร็วแนวราบ $v_x = u\\cos\\theta$ ยังอยู่ครบ และความเร่งยังคงเป็น $g$ ชี้ลงดิ่งตลอดเวลา!',
    },
  },
  'pre-momentum-energy-projectile': {
    levelTag: 'เตรียมสอบเข้าค่าย 1 • ข้อ 3, 4 (โมเมนตัม + พลังงาน)',
    basicLabelTh: 'สับสนว่าจะหยิบสูตรโมเมนตัมหรือพลังงานดี',
    basicFormulaLatex: 'm_1 v_1 + m_2 v_2 = m_1 u_1 + m_2 u_2',
    advancedLabelTh: 'แยกเหตุการณ์ 2 ช่วง + เทียบความเร็วก่อน/หลังชนยืดหยุ่น',
    advancedFormulaLatex: 'K + U = \\text{const}, \\qquad u_1 - u_2 = -(v_1 - v_2) \\; (\\text{ชนยืดหยุ่น})',
    whyItBreaksTh:
      'ข้อสอบเข้าค่าย 1 ชอบเอาการชนกับสปริงหรือลูกตุ้มมาต่อกัน หากเผลอใช้อนุรักษ์พลังงานข้ามช่วง "ชนติดกัน" คำตอบจะผิดทันทีเพราะความร้อนหายไประหว่างชน',
    howItEvolvesTh:
      'แบ่งโจทย์เป็นตอนสั้นๆ: ตอนที่ "ชน/ระเบิด" ใช้ **อนุรักษ์โมเมนตัม** หาความเร็วหลังชน จากนั้นตอนที่ "ไถลลื่น/แกว่งขึ้น/อัดสปริง" ค่อยใช้ **อนุรักษ์พลังงานกล**',
    everydayAnalogyTh:
      'เหมือนรถสองคันชนกันเสียงดังสนั่น (พลังงานกลหายเป็นเสียงและความร้อน แต่โมเมนตัมรวมยังอยู่ครบ!) จากนั้นซากรถที่ติดกันค่อยไถลขึ้นเนินไปหยุดนิ่ง',
    interactiveLabId: 'momentum-collision',
    extraLabIds: ['work-energy-coaster'],
    quickRecall: {
      questionTh: 'เหตุใดการชนแบบติดกันไป (Inelastic) จึงอนุรักษ์โมเมนตัมได้ แต่ไม่อนุรักษ์พลังงานกล?',
      answerTh: 'เพราะระหว่างชนแรงกระแทกระหว่างสองก้อนเป็นแรงภายใน (หักล้างกันด้วยกฎข้อ 3 $\\implies$ โมเมนตัมรวมคงที่) แต่แรงเปลี่ยนรูปพลังงานกลให้เป็นความร้อนและเสียง!',
    },
  },
  'pre-circular-rotation-equilibrium': {
    levelTag: 'เตรียมสอบเข้าค่าย 1 • ข้อ 7, 8, 9 (วงกลม + หมุน + สมดุลสถิต)',
    basicLabelTh: 'เข้าใจผิดว่า mv²/r เป็นแรงใหม่ที่เพิ่มบน FBD',
    basicFormulaLatex: '\\frac{mv^2}{r} = m\\omega^2 r, \\quad I_{\\text{cm}}\\Omega = \\tau',
    advancedLabelTh: 'ใช้แรงจริงสร้างแรงสู่ศูนย์กลาง & เลือกจุดหมุนตัดตัวแปร',
    advancedFormulaLatex: '\\sum F = 0, \\quad \\sum \\tau_O = 0 \\; (\\Omega = 0, \\; \\omega = 0)',
    whyItBreaksTh:
      'นักเรียนจำนวนมากวาดลูกศร "แรงหนีศูนย์กลาง" เพิ่มใน FBD ทำให้สมการซ้ำซ้อนผิดหมด และในโจทย์สมดุลสถิตมักติดตัวแปรแรงที่ไม่รู้ค่าที่บานพับหรือพื้น',
    howItEvolvesTh:
      'ในกรอบเฉื่อยไม่มีแรงหนีศูนย์กลาง! มีแค่แรงจริง ($T, N, f_s, mg$) ที่รวมกันชี้เข้าจุดศูนย์กลางเท่ากับ $mv^2/r$ ส่วนสมดุลสถิตให้เลือกจุดหมุน $O$ ตรงจุดที่มีแรงไม่รู้ค่ามากที่สุดเพื่อตัดออกจาก $\\sum \\tau_O = 0$',
    everydayAnalogyTh:
      'ถ้ายืนเปิดประตูใกล้บานพับจะหนักมาก แต่ผลักที่ลูกบิดปลายบานประตูจะเบาหวิว นั่นคือเหตุผลที่แรงผ่านจุดหมุนให้ทอร์กเป็นศูนย์!',
    interactiveLabId: 'circular-motion-lab',
    extraLabIds: ['circular-equilibrium'],
    quickRecall: {
      questionTh: 'เวลาเขียนสมการสมดุลทอร์ก $\\sum \\tau_O = 0$ ของวัตถุที่อยู่นิ่ง เราจำเป็นต้องเลือกจุด $O$ ที่จุดศูนย์กลางมวลเสมอหรือไม่?',
      answerTh: 'ไม่จำเป็น! เมื่อระบบสมดุล ($\\sum F = 0$) ทอร์กรอบ **จุดใดๆ ในอวกาศ** เป็นศูนย์ทั้งหมด จึงเลือกจุดที่มีแรงที่ไม่ต้องการหาพาดผ่านมากที่สุดได้เลย!',
    },
  },
  'pre-fluids-bernoulli': {
    levelTag: 'เตรียมสอบเข้าค่าย 1 • ข้อ 10–11 (ของไหล & Bernoulli)',
    basicLabelTh: 'ความดันน้ำนิ่งขึ้นกับความลึกอย่างเดียว',
    basicFormulaLatex: 'P = P_0 + \\rho g h',
    advancedLabelTh: 'สมการ Bernoulli สำหรับของไหลที่กำลังเคลื่อนที่',
    advancedFormulaLatex: '\\frac{1}{2}\\rho v^2 + \\rho g h + P = \\text{คงที่}, \\quad A_1 v_1 = A_2 v_2',
    whyItBreaksTh:
      'พอน้ำไหลผ่านท่อบีบแคบหรือรูรั่วข้างถัง สูตร $P_0 + \\rho gh$ ใช้ไม่ได้ตรงๆ เพราะพลังงานส่วนหนึ่งถูกแปลงเป็นพลังงานจลน์ $\\frac{1}{2}\\rho v^2$ ของกระแสน้ำ',
    howItEvolvesTh:
      'มองสมการ Bernoulli ให้เหมือน "อนุรักษ์พลังงานต่อ 1 ลูกบาศก์เมตร" ร่วมกับ $A_1 v_1 = A_2 v_2$: ตรงไหนท่อแคบ น้ำต้องไหลเร็วขึ้น ความดันสถิต $P$ จึงลดต่ำลงเพื่อแลกพลังงาน!',
    everydayAnalogyTh:
      'เอานิ้วอุดปลายสายยางฉีดน้ำ น้ำพุ่งแรงขึ้น ($v$ เพิ่ม) หรือเวลาลมพัดแรงเหนือหลังคาสังกะสี อากาศไหลเร็วทำให้ความดันด้านบนลดลงจนยกหลังคาปลิวได้!',
    interactiveLabId: 'fluid-buoyancy-lab',
    extraLabIds: ['bernoulli-pipe'],
    quickRecall: {
      questionTh: 'เมื่อน้ำในถังสูง $h$ พุ่งออกจากรูเปิดด้านข้างสู่อากาศ ความดันสถิตที่รูเปิดควรแทนด้วย $P_0 + \\rho gh$ หรือ $P_0$?',
      answerTh: 'ต้องแทนด้วย **$P_0$**! เพราะทันทีที่ลำน้ำพุ่งพ้นปากท่อออกมาในอากาศ ผิวลำน้ำสัมผัสความดันบรรยากาศ $P_0$ รอบด้านแล้ว',
    },
  },
  'pre-thermal-conduction-expansion': {
    levelTag: 'เตรียมสอบเข้าค่าย 1 • ข้อ 12–13 (การนำความร้อน & ขยายตัว)',
    basicLabelTh: 'จำสูตร Q = mcΔT (การเก็บความร้อน) แต่ไม่รู้เรื่องอัตราการไหล',
    basicFormulaLatex: 'Q = mc\\Delta T, \\quad \\Delta L = \\alpha L_0\\Delta T',
    advancedLabelTh: 'ฟลักซ์การไหลความร้อนอนุกรม/ขนาน & การขยายตัวไม่เท่ากัน',
    advancedFormulaLatex: 'J = -K\\frac{\\Delta T}{\\Delta x}, \\qquad L = L_0\\{1 + \\alpha(T - T_0)\\}',
    whyItBreaksTh:
      'เมื่อนำแท่งโลหะ 2 ชนิดมาต่อเชื่อมกันระหว่างเตาร้อนและน้ำแข็ง อุณหภูมิตรงรอยต่อไม่เท่ากับค่าเฉลี่ย $(T_H + T_C)/2$ หากค่า $K$ ไม่เท่ากัน!',
    howItEvolvesTh:
      'เปรียบเทียบการนำความร้อนเหมือน **วงจรความต้านทานไฟฟ้า!** อัตราการไหลความร้อน $H = J A$ เหมือนกระแสไฟฟ้า, $\\Delta T$ เหมือนความต่างศักย์, และ $\\frac{\\Delta x}{KA}$ คือ "ความต้านทานความร้อน" ต่ออนุกรมกระแสเท่ากัน!',
    everydayAnalogyTh:
      'จับช้อนโลหะกับทัพพีไม้จุ่มหม้อซุปร้อนพร้อมกัน: ทั้งคู่สัมผัสซุปร้อนเท่ากัน แต่มือลวกที่ช้อนโลหะก่อนเพราะค่าการนำความร้อน $K_{\\text{metal}}$ สูงกว่าไม้เป็นร้อยเท่า!',
    interactiveLabId: 'heat-flow',
    quickRecall: {
      questionTh: 'นำแท่งโลหะ $K_1$ และ $K_2$ ยาวเท่ากัน พื้นที่หน้าตัดเท่ากัน มาต่อ **อนุกรม** ระหว่างอุณหภูมิ $100^\\circ\\text{C}$ และ $0^\\circ\\text{C}$ ถ้า $K_1 = 3K_2$ อุณหภูมิรอยต่อในสมดุลจะเป็นเท่าใด?',
      answerTh: '$75^\\circ\\text{C}$! เพราะ $K_1(100 - T) = K_2(T - 0) \\implies 3(100 - T) = T \\implies T = 75^\\circ\\text{C}$ (ตัวที่นำความร้อนดีกว่ายอมให้ $\\Delta T$ ตกคร่อมน้อยกว่า!)',
    },
  },
  'pre-heat-gas-thermo': {
    levelTag: 'เตรียมสอบเข้าค่าย 1 • ข้อ 14–17 (แก๊ส + Equipartition + เทอร์โมฯ)',
    basicLabelTh: 'สูตร PV = nRT และ Q = mcΔT พื้นฐาน',
    basicFormulaLatex: 'PV = nRT, \\quad L = L_0\\{1 + \\alpha(T - T_0)\\}',
    advancedLabelTh: 'Equipartition (½kT/DOF) & กฎข้อที่ 1 ΔU = ΔQ - ΔW',
    advancedFormulaLatex: 'U = \\frac{f}{2}nRT, \\quad \\Delta U = \\Delta Q - \\Delta W',
    whyItBreaksTh:
      'การจำแค่ $Q = mc\\Delta T$ ตอบไม่ได้ว่าทำไมแก๊สชนิดเดียวกันถึงใช้ความร้อนต่างกันเมื่อปริมาตรคงที่เทียบกับความดันคงที่ หรือโมเลกุล 2 อะตอมเก็บพลังงานอย่างไร',
    howItEvolvesTh:
      'เข้าใจว่าทุกโหมดการเคลื่อนที่อิสระ ($f$) เก็บพลังงานเฉลี่ย $\\frac{1}{2}k_B T$ จึงได้ $U = \\frac{f}{2}nRT$ ทันที และใช้ $\\Delta U = \\Delta Q - \\Delta W$ แยกส่วนที่ไปเพิ่มอุณหภูมิออกจากงานดันลูกสูบ $\\Delta W = P\\Delta V$',
    everydayAnalogyTh:
      'ต้มน้ำในหม้อปิดฝาแน่น (ปริมาตรคงที่ $\\Delta W = 0$) น้ำร้อนเร็วกว่าหม้อที่เปิดฝาดันลูกสูบลอยขึ้น ($\\Delta W = P\\Delta V > 0$) เพราะความร้อนทั้งหมดไม่รั่วไหลไปทำงานขยายตัว!',
    interactiveLabId: 'ideal-gas-lab',
    extraLabIds: ['temperature-box'],
    quickRecall: {
      questionTh: 'ตามเอกสาร สอวน. กฎข้อที่ 1 เขียนว่า $\\Delta U = \\Delta Q - \\Delta W$ หากแก๊สถูก **อัด** ปริมาตรลดลง เครื่องหมายของ $\\Delta W$ จะเป็นบวกหรือลบ?',
      answerTh: 'เป็น **ลบ** ($\\Delta W < 0$) เพราะ $\\Delta W$ ในรูปนี้คืองานที่ **แก๊สทำออกไป** เมื่อถูกอัดภายนอกทำงานใส่แก๊ส จึงทำให้ $-\\Delta W$ กลายเป็นบวกและพลังงานภายใน $\\Delta U$ เพิ่มขึ้น!',
    },
  },
  'pre-electrostatics-capacitors': {
    levelTag: 'เตรียมสอบเข้าค่าย 1 • ข้อ 18 (ไฟฟ้าสถิต & ตัวเก็บประจุ)',
    basicLabelTh: 'แรงระหว่างจุดประจุ & สูตรตัวเก็บประจุ',
    basicFormulaLatex: 'F = \\frac{kq_1 q_2}{r^2}, \\quad Q = CV, \\quad U = \\frac{1}{2}CV^2',
    advancedLabelTh: 'งานจากความต่างศักย์ & พลังงานสะสมในสนามไฟฟ้า',
    advancedFormulaLatex: 'W_{\\text{elec}} = q(V_A - V_B), \\qquad u_E = \\frac{1}{2}\\varepsilon_0 E^2',
    whyItBreaksTh:
      'การแตกแรงคูลอมบ์หลายประจุทำได้ช้าและพลาดทิศง่าย ส่วนการดึงแผ่นตัวเก็บประจุออกจากกันมักสับสนว่าพลังงานเพิ่มหรือลด',
    howItEvolvesTh:
      'ใช้ปริมาณสเกลาร์อย่าง "ศักย์ไฟฟ้า $V$" คำนวณงาน $W = q\\Delta V$ แบบบวกลบตัวเลขธรรมดา และเข้าใจว่าพลังงาน $\\frac{1}{2}CV^2$ แท้จริงกระจายอยู่ในสนามไฟฟ้าด้วยความหนาแน่น $\\frac{1}{2}\\varepsilon_0 E^2\\text{ J/m}^3$',
    everydayAnalogyTh:
      'ศักย์ไฟฟ้าเหมือนความสูงของภูเขา: ไม่ว่าจะเดินอ้อมแค่ไหน งานของแรงโน้มถ่วงหรือแรงไฟฟ้าขึ้นอยู่กับผลต่างความสูง $\\Delta V$ เท่านั้น!',
    interactiveLabId: 'electrostatics-field-lab',
    extraLabIds: ['electric-capacitor'],
    quickRecall: {
      questionTh: 'ตัวเก็บประจุที่ชาร์จเต็มแล้ว **ถอดออกจากแบตเตอรี่** หากดึงแผ่นโลหะให้ห่างกันเป็น 2 เท่า สนามไฟฟ้า $E$ ระหว่างแผ่นและพลังงานสะสม $U$ จะเปลี่ยนแปลงอย่างไร?',
      answerTh: 'ประจุ $Q$ คงที่ $\\implies E = \\sigma/\\varepsilon_0$ **คงที่เท่าเดิม** แต่ปริมาตร $Ad$ เพิ่ม 2 เท่า พลังงานรวม $U = (\\frac{1}{2}\\varepsilon_0 E^2)(Ad)$ จึง **เพิ่มขึ้น 2 เท่า!** (มาจากงานที่เราออกแรงดึงแผ่นแยกจากแรงดูด)',
    },
  },
  'pre-dc-circuits-rc': {
    levelTag: 'เตรียมสอบเข้าค่าย 1 • ข้อ 19–22 (วงจร DC ผสม R & C)',
    basicLabelTh: 'กฎของโอห์ม V = iR & การยุบตัวต้านทาน',
    basicFormulaLatex: 'V = iR, \\quad P = i^2 R',
    advancedLabelTh: 'บทบาทของ C ในวงจร DC ที่ t = 0⁺ และ t → ∞',
    advancedFormulaLatex: 't=0^+: \\; V_C = 0 \\;(\\text{ลัดวงจร}) \\quad\\longrightarrow\\quad t\\to\\infty: \\; i_C = 0 \\;(\\text{วงจรขาด})',
    whyItBreaksTh:
      'เห็นตัวเก็บประจุ $C$ อยู่ในวงจรตัวต้านทานแล้วตกใจ คิดว่าต้องตั้งสมการดิฟแก้ $e^{-t/RC}$ ทั้งที่ข้อสอบเข้าค่าย 1 เกือบทั้งหมดถามเฉพาะ **ทันทีที่สับสวิตช์** และ **เมื่อสมดุลแล้ว**!',
    howItEvolvesTh:
      'ใช้กฎ 2 จังหวะโดยไม่ต้องใช้แคลคูลัสเลย: จังหวะสับสวิตช์ ($t=0^+$, ประจุว่าง) ให้มอง $C$ เป็น **สายไฟเชื่อมตรง**; จังหวะคงตัว ($t\\to\\infty$, เต็มแล้ว) ให้มอง $C$ เป็น **สวิตช์ขาด** แล้วคิดวงจร $R$ ปกติ!',
    everydayAnalogyTh:
      'ตัวเก็บประจุเหมือนถังน้ำเปล่า: วินาทีแรกที่เปิดก๊อก น้ำไหลเทลงถังสะดวกเหมือนท่อโล่ง ($V_C=0$) แต่พอถังเต็มปริ่ม น้ำหยุดไหลเข้าถัง ($i_C=0$) เหมือนกิ่งนั้นถูกปิด!',
    interactiveLabId: 'circuit-builder',
    extraLabIds: ['rc-circuit-box'],
    quickRecall: {
      questionTh: 'ในวงจร $\\mathcal{E}-R-C$ อนุกรม เมื่อชาร์จประจุจาก $0$ จนเต็ม $Q = C\\mathcal{E}$ พลังงานที่แบตเตอรี่จ่ายทั้งหมดเท่ากับ $C\\mathcal{E}^2$ แต่เก็บใน $C$ ได้ $\\frac{1}{2}C\\mathcal{E}^2$ อีกครึ่งหนึ่งหายไปไหน?',
      answerTh: 'สูญเสียกลายเป็น **ความร้อนจูล ($\\int i^2 R\\,dt = \\frac{1}{2}C\\mathcal{E}^2$)** ในตัวต้านทาน $R$ (และสายไฟ) เสมอ ไม่ว่าค่า $R$ จะมากหรือน้อยก็ตาม!',
    },
  },
  'pre-magnetic-field-wires': {
    levelTag: 'เตรียมสอบเข้าค่าย 1 • ข้อ 23 (สนามแม่เหล็กจากลวด & Biot-Savart / Ampère)',
    basicLabelTh: 'ใช้กฎมือขวาชี้ทิศแม่เหล็กรอบเส้นลวดอย่างเดียว',
    basicFormulaLatex: 'B_{\\text{wire}} = \\frac{\\mu_0 i}{2\\pi r}',
    advancedLabelTh: 'วงลวดครึ่งวงกลม/เต็มวง ($B = \\mu_0 i/2r$) & แนวคิด Biot-Savart / Ampère',
    advancedFormulaLatex: 'B_{\\text{loop}} = \\frac{\\mu_0 i}{2r}, \\qquad B_{\\text{arc}} = \\left(\\frac{\\theta}{2\\pi}\\right)\\frac{\\mu_0 i}{2r}',
    whyItBreaksTh:
      'ข้อสอบเข้าค่าย 1 มักหักลวดเป็นรูปผสม เช่น เส้นตรงต่อกับครึ่งวงกลมหรือเสี้ยววงกลม หากท่องแค่ $\\frac{\\mu_0 i}{2r}$ โดยไม่เข้าใจผลรวมเชิงเส้นของ Biot–Savart จะแก้ไม่ออก',
    howItEvolvesTh:
      'แยกเส้นลวดออกเป็นส่วนตรงกับส่วนโค้ง! ส่วนเส้นตรงที่แนวเล็ง **พุ่งผ่านจุดสังเกตพอดี** ให้สนามแม่เหล็กเป็น **ศูนย์** ($\\vec{dl} \\times \\hat{r} = 0$) ส่วนโค้งมุม $\\theta$ ก็คิดสัดส่วน $\\frac{\\theta}{2\\pi}$ ของเต็มวงได้ทันที!',
    everydayAnalogyTh:
      'กระแสที่วิ่งพุ่งตรงเข้าหาหรือพุ่งตรงหนีจุดศูนย์กลางเหมือนคนที่เดินตรงเข้าหาเสา ไม่ได้เดินวนรอบเสา จึงไม่สร้างสนามแม่เหล็กหมุนที่เสาเลย ($B = 0$)!',
    interactiveLabId: 'magnet-field',
    quickRecall: {
      questionTh: 'ขดลวดรูป **ครึ่งวงกลม** รัศมี $R$ ต่อกับสายไฟตรงยาว 2 เส้นที่แนวชี้ตรงผ่านจุดศูนย์กลางวงกลม สนามแม่เหล็กที่จุดศูนย์กลางมีค่าเท่าใด?',
      answerTh: '$B = \\frac{1}{2}\\left(\\frac{\\mu_0 i}{2R}\\right) = \\frac{\\mu_0 i}{4R}$! เพราะสายตรง 2 เส้นที่เล็งผ่านจุดศูนย์กลางไม่สร้างสนามที่จุดนั้นเลย ($B_{\\text{straight}} = 0$)!',
    },
  },
  'pre-magnetism-induction-maxwell': {
    levelTag: 'เตรียมสอบเข้าค่าย 1 • ข้อ 24–25 (ฟาราเดย์-เลนซ์ + L + แมกซ์เวลล์)',
    basicLabelTh: 'จำสูตร B = μ₀i/(2r) & |E| = ΔΦ/Δt',
    basicFormulaLatex: '|\\mathcal{E}| = \\frac{\\Delta\\Phi_B}{\\Delta t}, \\quad u_B = \\frac{B^2}{2\\mu_0}',
    advancedLabelTh: 'เลนซ์ต้านการเปลี่ยนฟลักซ์, บทบาท L & คลื่น EM แมกซ์เวลล์',
    advancedFormulaLatex: '\\mathcal{E} = B\\ell v, \\quad u_{\\text{EM}} = \\frac{1}{2}\\varepsilon_0 E^2 + \\frac{1}{2}\\frac{B^2}{\\mu_0}, \\quad c = \\frac{1}{\\sqrt{\\mu_0\\varepsilon_0}}',
    whyItBreaksTh:
      'ข้อสอบมักถามความสัมพันธ์เชิงหลักการ เช่น กฎของเลนซ์ต้านทางไหน หรือตัวเหนี่ยวนำ $L$ ในวงจร DC ต่างจาก $C$ อย่างไร รวมถึงหน่วยและความหมายของ $\\varepsilon_0 \\mu_0 c^2 = 1$',
    howItEvolvesTh:
      'เข้าใจว่ากฎของเลนซ์คือ "ธรรมชาติไม่ให้พลังงานฟรี" กระแสเหนี่ยวนำจึงต้านการเปลี่ยนแปลงฟลักซ์เสมอ และจำว่าตัวเหนี่ยวนำ $L$ ทำตัวตรงข้าม $C$ ($t=0^+$ ขวางเป็นวงจรขาด, $t\\to\\infty$ ลัดวงจร)',
    everydayAnalogyTh:
      'ตัวเหนี่ยวนำ $L$ เหมือนกังหันน้ำหนักๆ ในท่อ: ตอนเปิดก๊อกแรกๆ ใบพัดหนักต้านไม่ให้น้ำไหล ($i_L=0$) แต่พอหมุนคล่องคงที่แล้วน้ำไหลผ่านฉลุยไร้แรงต้าน ($V_L=0$)!',
    interactiveLabId: 'faraday-em-wave-lab',
    extraLabIds: ['magnetic-wire'],
    quickRecall: {
      questionTh: 'ในวงจรกระแสตรงที่มีทั้ง $R$ และตัวเหนี่ยวนำ $L$ อุดมคติ ทันทีที่สับสวิตช์ ($t=0^+$) กับตอนผ่านไปนาน ($t\\to\\infty$) $L$ ทำตัวเหมือนอะไร?',
      answerTh: 'ที่ $t=0^+$: $L$ ต้านการเปลี่ยนกระแส จึงเหมือน **วงจรขาด** ($i_L=0$) | ที่ $t\\to\\infty$: กระแสคงที่แล้วจึงเหมือน **สายไฟลัดวงจร** ($V_L=0$) — ตรงข้ามกับ $C$!',
    },
  },
  'pre-mirrors-reflection': {
    levelTag: 'เตรียมสอบเข้าค่าย 1 • ข้อ 26 (การสะท้อน & กระจกโค้ง)',
    basicLabelTh: 'วาดรังสีสะท้อนมุมตกเท่ากับมุมสะท้อน',
    basicFormulaLatex: '\\theta_i = \\theta_r',
    advancedLabelTh: 'ทางเดินแสง 3 เส้นคู่สมการกระจกโค้ง',
    advancedFormulaLatex: '\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f}, \\qquad m = -\\frac{v}{u}, \\qquad f = \\pm\\frac{R}{2}',
    whyItBreaksTh:
      'ปัญหาเดียวที่ทำให้นักเรียนเสียคะแนนหมวดแสงคือ **จำเครื่องหมาย $+ / -$ สับสน** ทำให้สลับกระจกเว้ากับนูน หรือภาพจริงกับภาพเสมือนผิดตำแหน่ง',
    howItEvolvesTh:
      'ใช้หลักเดียวที่เป็นจริงตามฟิสิกส์ของแสง: ฝั่งที่แสง **วิ่งอยู่จริง** (หน้ากระจก) ให้ระยะเป็น $+$ ส่วนฝั่งที่แสง **ทะลุไม่ได้** (หลังกระจก) ให้เป็น $-$ แล้วเช็กคำตอบซ้ำด้วยรังสี 3 เส้นทันที!',
    everydayAnalogyTh:
      'กระจกมองข้างรถยนต์เป็นกระจกนูน ($f < 0$) จึงเห็นภาพเสมือนหัวตั้งขนาดเล็กอยู่หลังกระจก ($v < 0, 0 < m < 1$) เพื่อให้เก็บมุมมองถนนได้กว้างขึ้น!',
    interactiveLabId: 'light-optics-bench',
    quickRecall: {
      questionTh: 'หากวางวัตถุจริงไว้หน้ากระจกนูน ($f < 0$) ภาพที่ได้จะเป็นภาพชนิดใด หัวตั้งหรือหัวกลับ และขนาดเล็กหรือใหญ่กว่าวัตถุ?',
      answerTh: 'ได้ **ภาพเสมือน ($v < 0$) หัวตั้ง ($m > 0$) ขนาดเล็กกว่าวัตถุ ($|m| < 1$)** เสมอ!',
    },
  },
  'pre-refraction-lenses-combined': {
    levelTag: 'เตรียมสอบเข้าค่าย 1 • ข้อ 27 (สเนลล์, มุมวิกฤต, บริวสเตอร์ & เลนส์บาง)',
    basicLabelTh: 'คำนวณเลนส์เดี่ยว 1 ชิ้น & กฎของสเนลล์',
    basicFormulaLatex: 'n_1\\sin\\theta_1 = n_2\\sin\\theta_2, \\quad \\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f}',
    advancedLabelTh: 'มุมวิกฤต, มุมบริวสเตอร์ (tan θ_B = n₂/n₁) & สมการเลนส์',
    advancedFormulaLatex: '\\sin\\theta_c = \\frac{n_2}{n_1}, \\qquad \\tan\\theta_B = \\frac{n_2}{n_1}',
    whyItBreaksTh:
      'พอโจทย์รวมเรื่องสเนลล์กับการโพลาไรซ์ (มุมบริวสเตอร์) หรือให้หาความลึกปรากฏ/สะท้อนกลับหมดในแท่งแก้ว นักเรียนมักลืมว่ามุมทั้งหมดต้องวัดเทียบกับ "เส้นปกติ Normal"',
    howItEvolvesTh:
      'จำหัวใจของกฎบริวสเตอร์เพียงข้อเดียว: **รังสีสะท้อนตั้งฉากกับรังสีหักเห** ($\\theta_B + \\theta_2 = 90^\\circ$) จึงแทนค่าในกฎสเนลล์แล้วได้ $\\tan\\theta_B = n_2/n_1$ โดยอัตโนมัติ!',
    everydayAnalogyTh:
      'แว่นกันแดด Polaroid ตัดแสงสะท้อนจ้าจากผิวน้ำหรือถนนลาดยางได้ ก็เพราะแสงที่สะท้อนใกล้มุมบริวสเตอร์จะกลายเป็นแสงโพลาไรซ์แนวนอนหมดเลย!',
    interactiveLabId: 'snell-fermat',
    quickRecall: {
      questionTh: 'แสงจากตัวกลาง $n_1$ ตกกระทบตัวกลาง $n_2$ ที่มุมบริวสเตอร์ $\\theta_B$ ผลบวกของมุมตกกระทบ $\\theta_B$ กับมุมหักเห $\\theta_2$ มีค่าเท่ากับกี่องศาเสมอ?',
      answerTh: '$90^\\circ$ เสมอ! เพราะที่มุมบริวสเตอร์ รังสีสะท้อนและรังสีหักเหทำมุมตั้งฉากกัน ($\\theta_B + 90^\\circ + \\theta_2 = 180^\\circ$)',
    },
  },
  'pre-combined-optical-systems': {
    levelTag: 'เตรียมสอบเข้าค่าย 1 • ข้อ 28 (ระบบผสมกระจกกับเลนส์)',
    basicLabelTh: 'ใช้สูตร 1/v + 1/u = 1/f ได้เมื่อมีชิ้นเดียวโดดๆ',
    basicFormulaLatex: '\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f}',
    advancedLabelTh: 'เทคนิคไล่ระบบหลายชิ้น & วัตถุเสมือน (Virtual Object)',
    advancedFormulaLatex: 'u_{\\text{next}} = d - v_{\\text{prev}}, \\qquad m_{\\text{total}} = m_1 \\cdot m_2 \\cdot m_3',
    whyItBreaksTh:
      'พอวางเลนส์คู่กับกระจกห่างกันระยะ $d$ แล้วภาพของชิ้นแรกไปตกอยู่ **เลยหลัง** ชิ้นที่สอง นักเรียนมักตกใจว่า $d - v_1$ ติดลบแล้วใช้สูตรไม่ถูก!',
    howItEvolvesTh:
      'สูตรทองคำ $u_{\\text{next}} = d - v_{\\text{prev}}$ ใช้ได้ครอบจักรวาล! ถ้าคำนวณแล้ว $u_2 < 0$ แปลว่าแสงพุ่งลู่เข้าใส่ชิ้นที่ 2 เหมือน **วัตถุเสมือน (Virtual Object)** เพียงแทนค่าลบนั้นลงสูตรตามปกติ และถ้าสะท้อนกระจกย้อนกลับอย่าลืมคิดขากลับผ่านเลนส์อีก 1 รอบ!',
    everydayAnalogyTh:
      'เหมือนกล้องโทรทรรศน์หรือกล้องจุลทรรศน์: เลนส์ตัวที่ 1 ปั้นภาพชั่วคราวกลางอากาศให้เลนส์หรือกระจกตัวถัดไปรับช่วงต่อเป็นวัตถุชิ้นใหม่ไปเรื่อยๆ!',
    interactiveLabId: 'combined-optics-lab',
    quickRecall: {
      questionTh: 'ในระบบเลนส์นูนวางหน้ากระจกเว้าห่างกัน $d$ เมื่อแสงผ่านเลนส์ไปสะท้อนกระจกแล้ว **ย้อนกลับมาผ่านเลนส์อีกที** ต้องใช้สมการ $\\frac{1}{v}+\\frac{1}{u}=\\frac{1}{f}$ ทั้งหมดกี่ครั้ง?',
      answerTh: '**3 ครั้ง** ตามลำดับที่แสงเจออุปกรณ์: (1) เลนส์ขาไป $\\to$ (2) กระจกสะท้อน $\\to$ (3) เลนส์ขากลับ!',
    },
  },
  'pre-waves-interference': {
    levelTag: 'เตรียมสอบเข้าค่าย 1 • บทคลื่น 5.1 (การแทรกสอด Buff/Debuff & เส้นเชือก)',
    basicLabelTh: 'จำสูตร v = fλ กับ Δr = mλ แบบไม่เข้าใจที่มาของคลื่นซ้อนทับ',
    basicFormulaLatex: 'v = f\\lambda, \\quad \\Delta r = m\\lambda',
    advancedLabelTh: 'ซ้อนทับ $y_1 + y_2$ เฟสต่าง $\\Delta\\phi$ & อัตราเร็วในเชือก $\\sqrt{T/\\mu}$',
    advancedFormulaLatex: 'A_{\\text{res}} = 2A\\left|\\cos\\frac{\\Delta\\phi}{2}\\right|, \\qquad I = 4I_0\\cos^2\\left(\\frac{\\Delta\\phi}{2}\\right)',
    whyItBreaksTh:
      'นักเรียนมักคิดว่าคลื่น 2 ตัวชนกันแล้วได้ความเข้ม $2I_0$ และมักสับสนทันทีเมื่อโจทย์ถามจุดที่เฟสต่างกัน $\\frac{\\pi}{2}$ หรือให้แหล่งกำเนิดเฟสตรงข้ามกันตั้งแต่แรก',
    howItEvolvesTh:
      'รวมฟังก์ชันคลื่น $y_1 + y_2$ ด้วยตรีโกณมิติจะได้ตัวคูณแอมพลิจูด $2A\\cos(\\Delta\\phi/2)$ ออกมาตรงๆ: พลังงานรวมไม่หายแต่ถูกกวาดไปกองที่จุด Buff ($4I_0$) และปล่อยจุด Debuff ($0$) ว่างไว้!',
    everydayAnalogyTh:
      'หูฟังตัดเสียงรบกวน (ANC) ใช้ไมโครโฟนฟังเสียงเครื่องบินแล้วปล่อยคลื่นกลับเฟส $180^\\circ$ สวนไปหักล้าง (Debuff) จนเงียบสนิท!',
    interactiveLabId: 'wave-interference',
    quickRecall: {
      questionTh: 'ลำโพงเฟสตรงกัน 2 ตัวแต่ละตัวให้ความเข้มเสียง $I_0$ ณ จุดที่ได้ยินเสียงเสริมสุดขีด (Buff) ความเข้มเสียงรวมจะเป็นกี่เท่าของ $I_0$?',
      answerTh: '**$4I_0$** (ไม่ใช่ $2I_0$)! เพราะแอมพลิจูดเพิ่ม $2$ เท่า ($2A_0$) และความเข้ม $I \\propto A^2 \\implies 2^2 = 4$ เท่า!',
    },
  },
  'pre-standing-beats-doppler': {
    levelTag: 'เตรียมสอบเข้าค่าย 1 • บทคลื่น 5.2 (คลื่นนิ่ง บีตส์ & ดอปเพลอร์)',
    basicLabelTh: 'ท่องสัดส่วนท่อปลายเปิด vs ท่อปลายปิด แล้วลืมสูตรบ่อย',
    basicFormulaLatex: 'f_n = \\frac{nv}{2L}, \\quad f_{\\text{beat}} = |f_1 - f_2|',
    advancedLabelTh: 'คลื่นนิ่ง $2A\\sin(kx)\\cos(\\omega t)$ & ทริคเครื่องหมายดอปเพลอร์',
    advancedFormulaLatex: '\\lambda_{\\text{node-to-node}} = \\frac{\\lambda}{2}, \\qquad f\' = f\\left(\\frac{v \\pm v_O}{v \\mp v_S}\\right)',
    whyItBreaksTh:
      'เมื่อต้องเช็กว่าเครื่องหมายในสูตรดอปเพลอร์เป็น $+$ หรือ $-$ หรือต้องตีความบีตส์เวลาปรับสายกีตาร์ให้ตึงขึ้น การจำสูตรแบบไร้ภาพมักสลับซ้าย-ขวาผิดหมด',
    howItEvolvesTh:
      'จำความกว้าง **1 ลูป = $\\lambda/2$** แล้ววาดภาพ Node ที่ปลายปิด / Antinode ที่ปลายเปิด ส่วนดอปเพลอร์ให้เช็กทิศเดียวว่า "วิ่งเข้าหากัน $\\to$ เสียงแหลม ($f\' > f$)" จึงเลือกเครื่องหมายให้เศษโตขึ้นหรือส่วนเล็กลง!',
    everydayAnalogyTh:
      'เสียงไซเรนรถพยาบาลฟังดูแหลมขึ้นตอนพุ่งเข้ามาหาเรา แล้วทุ้มต่ำลงทันควันวินาทีที่รถวิ่งผ่านเลยตัวเราไป!',
    interactiveLabId: 'sound-doppler-lab',
    quickRecall: {
      questionTh: 'ระยะห่างระหว่างจุดบัพ (Node) กับจุดปฏิบัพ (Antinode) ที่อยู่ติดกันในคลื่นนิ่งเป็นกี่เท่าของความยาวคลื่น $\\lambda$?',
      answerTh: '**$\\frac{\\lambda}{4}$** (เพราะ 1 ลูปจาก Node ถึง Node ถัดไปยาว $\\frac{\\lambda}{2}$ และ Antinode อยู่ตรงกึ่งกลางพอดี!)',
    },
  },
  // =========================================================================
  // Chapter 1 (Camp 1 -> 2): Math Tools
  // =========================================================================
  'single-variable-calculus-physics': {
    levelTag: 'พื้นฐาน ม.ปลาย → แคลคูลัสตัวแปรเดียว',
    basicLabelTh: 'ความเร็วเฉลี่ย ม.ปลาย (อัตราเร็วคงที่)',
    basicFormulaLatex: 'v_{\\text{avg}} = \\frac{\\Delta x}{\\Delta t} = \\frac{s}{t}',
    advancedLabelTh: 'ความเร็วขณะใดขณะหนึ่ง (อนุพันธ์เทียบเวลา)',
    advancedFormulaLatex: 'v(t) = \\lim_{\\Delta t \\to 0}\\frac{x(t+\\Delta t) - x(t)}{\\Delta t} = \\frac{dx}{dt}',
    whyItBreaksTh:
      'สูตร $v = s/t$ บอกได้แค่ค่าเฉลี่ยตลอดช่วงเวลา หากรถกำลังเบรกหรือเหยียบคันเร่ง ความเร็วเปลี่ยนทุกเสี้ยววินาที ค่าที่ได้จะไม่ตรงกับเข็มไมล์รถ ณ ขณะนั้น',
    howItEvolvesTh:
      'เริ่มจากการแบ่งช่วงเวลา $\\Delta t$ ให้แคบลงเรื่อยๆ เส้นตัดกราฟ (Secant) ของ $x(t)$ จะหมุนเข้าใกล้เส้นสัมผัส (Tangent) ความชัน ณ จุดเดียวก็คือ $v(t) = \\frac{dx}{dt}$ และการรวมพื้นที่ใต้กราฟย้อนกลับคือ $x(t) = x_0 + \\int v(t)\\,dt$',
    everydayAnalogyTh:
      'ขับรถจากกรุงเทพฯ ไปชลบุรีเฉลี่ยได้ $60\\text{ km/h}$ ($s/t$) ไม่ได้แปลว่าคุณไม่ได้ขับเร็ว $110\\text{ km/h}$ ($dx/dt$) ตอนแซงรถบรรทุก!',
    interactiveLabId: 'derivative-slope',
    quickRecall: {
      questionTh: 'ในกราฟตำแหน่ง-เวลา $x(t)$ ค่า $v = \\frac{\\Delta x}{\\Delta t}$ ต่างจาก $v(t) = \\frac{dx}{dt}$ อย่างไร?',
      answerTh: '$\\frac{\\Delta x}{\\Delta t}$ คือความชันเส้นเชื่อมสองจุด (ความเร็วเฉลี่ย) ส่วน $\\frac{dx}{dt}$ คือความชันเส้นสัมผัสที่ $\\Delta t \\to 0$ (ความเร็วณ วินาทีนั้นพอดี)',
    },
  },
  'multivariable-calculus-operators': {
    levelTag: 'ฟังก์ชัน 1 ตัวแปร → หลายตัวแปรและเกรเดียนต์',
    basicLabelTh: 'ความชันกราฟ 1 มิติ (ขึ้น-ลงทางเดียว)',
    basicFormulaLatex: 'm = \\frac{df}{dx}',
    advancedLabelTh: 'อนุพันธ์ย่อย & เกรเดียนต์บนพื้นผิว 3 มิติ',
    advancedFormulaLatex: '\\vec{\\nabla} f = \\frac{\\partial f}{\\partial x}\\hat{i} + \\frac{\\partial f}{\\partial y}\\hat{j} + \\frac{\\partial f}{\\partial z}\\hat{k}',
    whyItBreaksTh:
      'ในโลกจริง อุณหภูมิ ความดัน หรือพลังงานศักย์ $U(x,y,z)$ ขึ้นกับตำแหน่งทั้ง 3 แกนพร้อมกัน การดิฟแค่เทียบ $x$ ตัวเดียวไม่สามารถบอกทิศทางที่แรงผลักใน 3 มิติได้',
    howItEvolvesTh:
      'ตรึงแกน $y, z$ ให้อยู่นิ่งก่อนแล้วดูความชันตามแกน $x$ ($\\partial f / \\partial x$) จากนั้นทำซ้ำกับแกน $y$ และ $z$ แล้วนำมาประกอบเป็นเวกเตอร์ $\\vec{\\nabla} f$ ซึ่งจะชี้ไปในทิศที่ชันขึ้นเร็วที่สุดเสมอ',
    everydayAnalogyTh:
      'เหมือนยืนอยู่บนไหล่เขา: ก้าวไปทางทิศเหนือชันนิดเดียว ($\\partial h/\\partial y$) แต่ก้าวไปทางทิศตะวันออกชันมาก ($\\partial h/\\partial x$) เวกเตอร์ $\\vec{\\nabla} h$ คือลูกศรชี้ตรงขึ้นยอดเขาที่ชันที่สุด!',
    interactiveLabId: 'derivative-slope',
    quickRecall: {
      questionTh: 'เวกเตอร์แรง $\\vec{F} = -\\vec{\\nabla} U$ ชี้ไปทางไหนเทียบกับพื้นผิวระดับพลังงานศักย์เท่ากัน?',
      answerTh: 'ตั้งฉากกับเส้นระดับพลังงานเท่า และชี้ลงไปในทิศที่พลังงานศักย์ $U$ ลดลงเร็วที่สุดเสมอ (เหมือนลูกบอลกลิ้งลงเนิน)',
    },
  },
  'vector-algebra-coordinate-systems': {
    levelTag: 'แกน x-y คงที่ → พิกัดเชิงขั้วที่หมุนตามวัตถุ',
    basicLabelTh: 'เวกเตอร์ 1 หน่วยแกนฉาก (ทิศไม่เคยเปลี่ยน)',
    basicFormulaLatex: '\\frac{d\\hat{i}}{dt} = 0, \\quad \\frac{d\\hat{j}}{dt} = 0',
    advancedLabelTh: 'เวกเตอร์ฐานเชิงขั้วที่หมุนได้',
    advancedFormulaLatex: '\\frac{d\\hat{r}}{dt} = \\dot{\\theta}\\hat{\\theta}, \\quad \\frac{d\\hat{\\theta}}{dt} = -\\dot{\\theta}\\hat{r}',
    whyItBreaksTh:
      'เมื่อดาวเทียมโคจรหรือลูกตุ้มแกว่งเป็นวงกลม การใช้แกน $x, y$ ทำให้อนุพันธ์ของ $\\sin\\theta, \\cos\\theta$ พันกันยุ่งเหยิง ทั้งที่ฟิสิกส์จริงขึ้นกับแค่ "รัศมี" และ "มุม"',
    howItEvolvesTh:
      'ให้แกน $\\hat{r}$ ชี้ตามตัววัตถุออกนอกและ $\\hat{\\theta}$ ตั้งฉากในทิศทวนเข็มนาฬิกา แม้ขนาดของ $\\hat{r}$ จะเป็น $1$ เสมอ แต่ **ทิศทาง** ของมันหมุนไปพร้อมมุม $\\theta$ จึงมีอนุพันธ์ตั้งฉากกับตัวเองเท่ากับ $\\dot{\\theta}\\hat{\\theta}$',
    everydayAnalogyTh:
      'เข็มวินาทีนาฬิกายาวเท่าเดิมตลอดเวลา (ขนาดคงที่) แต่ปลายเข็มก็ยังมีความเร็วตั้งฉากกับตัวเข็มเพราะมันกำลังหมุน!',
    interactiveLabId: 'vector-calculus-lab',
    quickRecall: {
      questionTh: 'เหตุใดอนุพันธ์ของเวกเตอร์หนึ่งหน่วย $\\hat{r}$ จึงไม่เป็นศูนย์ แม้ขนาด $|\\hat{r}| = 1$ คงที่?',
      answerTh: 'เพราะเวกเตอร์มีทั้งขนาดและทิศทาง: เมื่อมุม $\\theta$ เปลี่ยน ทิศของ $\\hat{r}$ หมุนตาม ทำให้เกิดการเปลี่ยนแปลงเวกเตอร์ $\\Delta\\hat{r} \\approx \\Delta\\theta\\,\\hat{\\theta}$',
    },
  },
  'dimensional-analysis-error-propagation': {
    levelTag: 'บวกลบเลขคลาดเคลื่อน → ทฤษฎีความคลาดเคลื่อนและมิติ',
    basicLabelTh: 'เช็กหน่วยพื้นฐาน & บวกค่าคลาดเคลื่อนตรงๆ',
    basicFormulaLatex: '\\Delta A_{\\text{worst}} = |y\\Delta x| + |x\\Delta y|',
    advancedLabelTh: 'กฎความคลาดเคลื่อนแบบ Quadrature & มิติ $[M^a L^b T^c]$',
    advancedFormulaLatex: '\\left(\\frac{\\sigma_A}{A}\\right)^2 = \\left(\\frac{\\sigma_x}{x}\\right)^2 + \\left(\\frac{\\sigma_y}{y}\\right)^2',
    whyItBreaksTh:
      'ในการทดลองจริง ความคลาดเคลื่อนแบบสุ่มของ $x$ และ $y$ ไม่ได้พลาดไปทางเดียวกันสุดโต่งพร้อมกันตลอด การจับบวกกันตรงๆ จึงประเมินค่าผิดพลาดสูงเกินจริง',
    howItEvolvesTh:
      'ใช้ Total Differential $dA = \\frac{\\partial A}{\\partial x}dx + \\frac{\\partial A}{\\partial y}dy$ ร่วมกับความไม่สัมพันธ์ของความแปรปรวน ($\\overline{dx\\,dy}=0$) จึงได้ผลรวมแบบพีทาโกรัส (Quadrature)',
    everydayAnalogyTh:
      'ถ้าสุ่มทอยลูกเต๋า 2 ลูก โอกาสที่ทั้งคู่จะออกแต้มสูงสุดพร้อมกันมีน้อยกว่ามาก เช่นเดียวกับการวัด 2 แกนที่คลาดเคลื่อนคนละทิศทางจึงหักล้างกันบางส่วน',
    interactiveLabId: 'integral-work',
    quickRecall: {
      questionTh: 'ถ้า $y = a x^n$ ความคลาดเคลื่อนสัมพัทธ์ $\\sigma_y/y$ สัมพันธ์กับ $\\sigma_x/x$ อย่างไร?',
      answerTh: '$\\frac{\\sigma_y}{y} = |n|\\frac{\\sigma_x}{x}$ (เลขชี้กำลัง $n$ กลายเป็นตัวคูณความคลาดเคลื่อนสัมพัทธ์!)',
    },
  },

  // =========================================================================
  // Chapter 2: Kinematics with Calculus
  // =========================================================================
  'calculus-kinematics-drag-force': {
    levelTag: 'ความเร่งคงที่ ม.ปลาย → ความเร่งแปรผัน & แรงต้านอากาศ',
    basicLabelTh: 'สูตรสุวัต (ใช้ได้เฉพาะความเร่งคงที่)',
    basicFormulaLatex: 'v = u + at, \\quad s = ut + \\frac{1}{2}at^2',
    advancedLabelTh: 'การอินทิเกรตเชิงอนุพันธ์เมื่อ $a(t)$ หรือ $a(v)$ เปลี่ยนตลอด',
    advancedFormulaLatex: 'm\\frac{dv}{dt} = mg - bv \\implies v(t) = \\frac{mg}{b}(1 - e^{-bt/m})',
    whyItBreaksTh:
      'ทันทีที่หยดน้ำตกหรือรถแล่นในอากาศ แรงต้านอากาศ $-bv$ ยิ่งแรงขึ้นเมื่อความเร็วสูงขึ้น ความเร่งจึงค่อยๆ ลดลงจาก $g$ จนเหลือ $0$ — สูตร $v=u+at$ จึงใช้ไม่ได้เลย',
    howItEvolvesTh:
      'เขียน $a = \\frac{dv}{dt}$ แล้วแยกตัวแปรที่มี $v$ ไว้ฝั่งเดียวกับ $dv$ เพื่ออินทิเกรตหาความชันที่ค่อยๆ ลดลงเป็น $1 - e^{-t/\\tau}$ และหากโจทย์ถามระยะทาง $x$ ให้ใช้กฎลูกโซ่ $a = v\\frac{dv}{dx}$ เพื่อตัดตัวแปรเวลาทิ้ง!',
    everydayAnalogyTh:
      'เม็ดฝนตกจากเมฆสูง 2 กิโลเมตรแต่ไม่ทะลุหัวคนเดินถนน ก็เพราะแรงต้านอากาศทำให้ความเร่งลดลงจนเข้าสู่ความเร็วปลายคงที่ $v_t = mg/b$',
    interactiveLabId: 'drag-terminal-lab',
    extraLabIds: ['derivative-slope'],
    quickRecall: {
      questionTh: 'เมื่อทราบ $a(x)$ เป็นฟังก์ชันของตำแหน่ง และต้องการหาความเร็ว $v(x)$ ควรใช้สมการแคลคูลัสรูปใด?',
      answerTh: 'ใช้กฎลูกโซ่ $a(x) = v\\frac{dv}{dx}$ แล้วอินทิเกรตทั้งสองข้าง: $\\frac{1}{2}(v^2 - v_0^2) = \\int_{x_0}^x a(x\')\\,dx\'$',
    },
  },
  'polar-coordinates-rotating-vectors': {
    levelTag: 'วงกลมอัตราเร็วคงที่ → ความเร่งเชิงขั้ว 2D เต็มรูป',
    basicLabelTh: 'ความเร่งสู่ศูนย์กลาง ม.ปลาย (รัศมี $R$ คงที่)',
    basicFormulaLatex: 'a_c = \\frac{v^2}{R} = \\omega^2 R',
    advancedLabelTh: 'ความเร่งพิกัดเชิงขั้วเมื่อรัศมี $r(t)$ เปลี่ยนได้',
    advancedFormulaLatex: '\\vec{a} = (\\ddot{r} - r\\dot{\\theta}^2)\\hat{r} + (r\\ddot{\\theta} + 2\\dot{r}\\dot{\\theta})\\hat{\\theta}',
    whyItBreaksTh:
      'ถ้าวัตถุขยับเข้า-ออกตามแนวรัศมีพร้อมกับหมุนไปรอบๆ (เช่น ลูกปัดไถลบนซี่ล้อหมุน หรือดาวเคราะห์โคจรวงรี) รัศมี $r$ ไม่คงที่ ความเร่งจึงมีทั้งการยืดหด $\\ddot{r}$ และเทอมคอริโอลิส $2\\dot{r}\\dot{\\theta}$ โผล่ขึ้นมา',
    howItEvolvesTh:
      'ดิฟเวกเตอร์ $\\vec{r} = r(t)\\hat{r}(t)$ ทีละขั้นด้วย Product Rule: ครั้งแรกได้ $\\vec{v} = \\dot{r}\\hat{r} + r\\dot{\\theta}\\hat{\\theta}$ ครั้งที่สองได้ความเร่ง 4 เทอม สังเกตว่า $a_r$ มี $-r\\dot{\\theta}^2$ แฝงอยู่ ดังนั้น $v_r \\neq \\int a_r\\,dt$',
    everydayAnalogyTh:
      'นักสเก็ตน้ำแข็งหุบแขนเข้าหาตัว ($\\dot{r} < 0$) เพื่อหมุนเร็วขึ้น เช่นเดียวกับเด็กที่เดินออกจากจุดศูนย์กลางม้าหมุนแล้วรู้สึกเหมือนมีแรงผลักเอียงไปด้านข้าง ($2\\dot{r}\\dot{\\theta}$)',
    interactiveLabId: 'coriolis-disk',
    quickRecall: {
      questionTh: 'ในพิกัดเชิงขั้ว เหตุใดความเร่งตามแนวรัศมี $a_r = \\ddot{r} - r\\dot{\\theta}^2$ ถึงมีค่าไม่เท่ากับ $\\frac{dv_r}{dt}$?',
      answerTh: 'เพราะ $\\vec{v} = v_r\\hat{r} + v_\\theta\\hat{\\theta}$: เมื่อ $\\hat{\\theta}$ หมุนไป มันเบนความเร็วตามแนวสัมผัส $r\\dot{\\theta}\\hat{\\theta}$ เข้าสู่แนวรัศมี จึงเกิดเทอม $-r\\dot{\\theta}^2$!',
    },
  },

  // =========================================================================
  // Chapter 3: Newton & Constraints
  // =========================================================================
  'pulley-wedge-kinematic-constraints': {
    levelTag: 'F = ma ก้อนเดียว → ระบบหลายวัตถุ & สมการข้อจำกัด',
    basicLabelTh: 'เชือกเดี่ยวรอกตายตัว ($a_1 = a_2$)',
    basicFormulaLatex: 'F = ma, \\quad a_1 = a_2',
    advancedLabelTh: 'สมการความยาวเชือกคงที่ & ลิ่มเคลื่อนที่ในกรอบเฉื่อย',
    advancedFormulaLatex: '\\sum \\vec{T}_i \\cdot \\vec{a}_i = 0, \\quad \\ddot{y} = (\\ddot{x} - \\ddot{X})\\tan\\theta',
    whyItBreaksTh:
      'เมื่อมีรอกขยับได้หรือบล็อกไถลบนลิ่มที่ขยับหนีได้ ตัวแปรความเร่งมีมากกว่าจำนวนสมการ $F=ma$ จึงแก้ไม่ออกจนกว่าจะหาสมการเชื่อมโยงเรขาคณิต',
    howItEvolvesTh:
      'ตั้งพิกัดจากจุดตรึงใน **กรอบเฉื่อยเท่านั้น** (เช่น เพดานหรือพื้นโลก) เขียนสมการความยาวเชือก $L$ หรือความชันลิ่ม $\\tan\\theta$ แล้วดิฟเทียบเวลา 2 ครั้ง หรือใช้หลักงานเสมือน $\\sum \\vec{T}_i\\cdot\\vec{a}_i = 0$ เช็กคำตอบภายใน 5 วินาที',
    everydayAnalogyTh:
      'ถ้าดึงเชือกผ่านรอกทดแรงลง 2 เมตร ตัวรอกจะขยับขึ้นเพียง 1 เมตร — ความสัมพันธ์ระยะทางนี้บังคับให้ความเร็วและความเร่งต้องมีอัตราส่วน $2:1$ เสมอ',
    interactiveLabId: 'pulley-capstan',
    quickRecall: {
      questionTh: 'เวลาตั้งพิกัดของรอกและมวลเพื่อดิฟหาสมการข้อจำกัด (Constraint) ควรวัดพิกัดจากจุดไหน?',
      answerTh: 'วัดจากจุดอ้างอิงที่อยู่นิ่งในกรอบเฉื่อยเสมอ (เช่น เพดานหรือพื้นโต๊ะ) ห้ามวัดจากรอกที่กำลังมีความเร่ง',
    },
  },
  'polar-dynamics-bifurcation': {
    levelTag: 'ลูกตุ้มแกว่งตรง → เพนดูลัมกรวย & Bifurcation',
    basicLabelTh: 'สมดุลวงกลมระดับ (สมมติว่ากางออกอยู่แล้ว)',
    basicFormulaLatex: 'T\\sin\\alpha = m\\omega^2 (l\\sin\\alpha)',
    advancedLabelTh: 'การแยกสาขาและอัตราเร็วเชิงมุมวิกฤต',
    advancedFormulaLatex: '\\sin\\alpha\\,(T - m\\omega^2 l) = 0 \\implies \\omega_c = \\sqrt{\\frac{g}{l}}',
    whyItBreaksTh:
      'หากนักเรียนตัด $\\sin\\alpha$ ทิ้งทั้งสองข้างทันที จะเผลอคิดว่าเชือกกางออกที่ความเร็วรอบใดๆ ก็ได้ ทั้งที่จริงถ้าหมุนช้าเกินไปลูกตุ้มจะห้อยดิ่งไม่ขยับเลย!',
    howItEvolvesTh:
      'ย้ายข้างแล้วแยกตัวประกอบ $\\sin\\alpha\\,(T - m\\omega^2 l) = 0$ เพื่อเก็บคำตอบ $\\alpha = 0$ ไว้ จากนั้นตรวจเงื่อนไข $\\cos\\alpha = \\frac{g}{l\\omega^2} \\le 1$ จึงค้นพบจุดเปลี่ยนผ่าน $\\omega_c = \\sqrt{g/l}$',
    everydayAnalogyTh:
      'หมุนเชือกผูกยางลบช้าๆ ยางลบก็ยังห้อยอยู่ข้างล่าง ต้องหมุนเร็วเกินขีดจำกัดวิกฤตเมื่อไรจึงจะเหวี่ยงกางออกไปด้านข้างได้!',
    interactiveLabId: 'pulley-capstan',
    quickRecall: {
      questionTh: 'ถ้าหมุนเพนดูลัมกรวยความยาว $l$ ด้วย $\\omega < \\sqrt{g/l}$ เชือกจะทำมุมเท่าใดกับแนวดิ่ง?',
      answerTh: '$\\alpha = 0^\\circ$ (ห้อยดิ่งตรงลงมา) เพราะเงื่อนไขกางออก $\\cos\\alpha = g/(l\\omega^2)$ มีค่ามากกว่า $1$ ซึ่งไม่มีคำตอบจริง',
    },
  },
  'continuous-mass-tension-capstan': {
    levelTag: 'เชือกมวลเบา → เชือกมีมวล, เชือกหมุน & แคปสแตน',
    basicLabelTh: 'แรงตึงเชือกคงที่ตลอดเส้น (เชือกเบา)',
    basicFormulaLatex: 'T = \\text{constant}, \\quad f_s \\le \\mu_s N',
    advancedLabelTh: 'การตัดชิ้นส่วนย่อย $dm$ & สมการอนุพันธ์แรงตึง',
    advancedFormulaLatex: 'dT = -\\lambda\\omega^2 r\\,dr \\;\\text{ หรือ }\\; dT = \\mu T\\,d\\theta \\implies T_B = T_A e^{\\mu\\theta}',
    whyItBreaksTh:
      'เมื่อเชือกหนักหมุนควงหรือพันรอบเสา แรงตึงแต่ละจุดไม่เท่ากัน จุดใกล้แกนต้องแบกรับแรงสู่ศูนย์กลางของเชือกด้านนอกทั้งหมด ส่วนเชือกพันเสาก็ถ่ายแรงเสียดทานสะสมทวีคูณตามมุม',
    howItEvolvesTh:
      'ตัดชิ้นส่วนเล็กๆ กว้าง $dr$ หรือมุม $d\\theta$ ออกมาวาด FBD ใช้ $\\sin(d\\theta/2) \\approx d\\theta/2$ ตัดเทอมเล็กอันดับสองทิ้ง จะได้สมการเชิงอนุพันธ์อันดับหนึ่งที่อินทิเกรตได้ตรงไปตรงมา',
    everydayAnalogyTh:
      'ลูกเรือแค่คนเดียวสามารถพันเชือกรอบเสาท่าเรือแค่ 2–3 รอบ ($e^{\\mu\\theta}$) เพื่อหยุดเรือบรรทุกขนาดใหญ่ได้โดยไม่หลุดมือ',
    interactiveLabId: 'pulley-capstan',
    quickRecall: {
      questionTh: 'ในเชือกมวลสม่ำเสมอหมุนควงในระนาบระดับ จุดใดมีแรงตึงเชือกสูงสุดและต่ำสุด?',
      answerTh: 'สูงสุดที่จุดยึดหมุน ($r=0$, เท่ากับ $\\frac{1}{2}M\\omega^2 L$) และลดลงแบบพาราโบลาจนเป็นศูนย์ที่ปลายอิสระ ($r=L$)',
    },
  },

  // =========================================================================
  // Chapter 4: Momentum & Variable Mass
  // =========================================================================
  'center-of-mass-systems': {
    levelTag: 'ค่าเฉลี่ยจุดมวล → อินทิกรัลจุดศูนย์กลางมวลต่อเนื่อง',
    basicLabelTh: 'จุดศูนย์กลางมวลของก้อนมวลแยกกัน',
    basicFormulaLatex: 'X_{\\text{cm}} = \\frac{\\sum m_i x_i}{\\sum m_i}',
    advancedLabelTh: 'สมการอินทิกรัล CM & แรงภายนอกของระบบ',
    advancedFormulaLatex: '\\vec{R}_{\\text{cm}} = \\frac{1}{M}\\int \\vec{r}\\,dm, \\quad \\vec{F}_{\\text{ext}} = M\\vec{A}_{\\text{cm}}',
    whyItBreaksTh:
      'วัตถุทรงตันต่อเนื่อง เช่น ครึ่งทรงกลม กรวย หรือแท่งที่ความหนาแน่นไม่สม่ำเสมอ มีอนันต์จุดจึงใช้เครื่องหมาย $\\sum$ เฉยๆ ไม่ได้',
    howItEvolvesTh:
      'ใช้เทคนิค Clever Slicing ของ K&K: หั่นวัตถุตั้งฉากกับแกนสมมาตรเป็นแผ่นจานบางหนา $dz$ เพื่อให้ทุกจุดบนแผ่นนั้นมีพิกัด $z$ เท่ากันหมด แล้วเปลี่ยน $\\sum \\to \\int$',
    everydayAnalogyTh:
      'หาจุดสมดุลของรูปสามเหลี่ยมกระดาษแข็งโดยแบ่งเป็นแถบขนานฐานทีละเส้น ยิ่งฐานกว้างน้ำหนักถ่วงก็ยิ่งมาก จุด CM จึงเอนเอียงไปทางฐาน ($1/3$ ของความสูง)',
    interactiveLabId: 'integral-work',
    quickRecall: {
      questionTh: 'เหตุใดแรงภายในระบบ (Internal Forces) จึงไม่ทำให้จุดศูนย์กลางมวลของระบบมีความเร่งเลย?',
      answerTh: 'เพราะกฎข้อที่ 3 ของนิวตันบังคับให้แรงคู่กิริยา-ปฏิกิริยาทุกคู่ในระบบมีขนาดเท่ากันและทิศตรงข้าม ($\\vec{f}_{ij} + \\vec{f}_{ji} = 0$) จึงหักล้างกันหมด',
    },
  },
  'variable-mass-rocket-momentum-flux': {
    levelTag: 'p = mv คงที่ → จรวด, มวลแปรผัน & โมเมนตัมฟลักซ์',
    basicLabelTh: 'กฎนิวตัน & อนุรักษ์โมเมนตัม (มวลคงที่)',
    basicFormulaLatex: 'F = m\\frac{dv}{dt}, \\quad \\sum p_i = \\sum p_f',
    advancedLabelTh: 'ขอบเขตระบบปิดสำหรับมวลแปรผัน & สมการจรวด',
    advancedFormulaLatex: 'M\\frac{dv}{dt} = -u\\frac{dM}{dt} + F_{\\text{ext}} \\implies \\Delta v = u\\ln\\left(\\frac{M_0}{M_f}\\right) - gt_f',
    whyItBreaksTh:
      'นักเรียนมักท่อง $F = \\frac{d(mv)}{dt} = m\\dot{v} + v\\dot{m}$ แต่สมการนี้ **ผิด** กับระบบเปิด (เช่น รถบรรทุกทรายรั่วจะกลายเป็นเร่งเองโดยไม่มีแรง!)',
    howItEvolvesTh:
      'เลือก **ระบบปิด** ที่ติดตามมวลชุดเดียวกันทั้งก่อนและหลัง $\\Delta t$ เสมอ ($P(t+\\Delta t) - P(t) = F_{\\text{ext}}\\Delta t$) เพื่อรวมโมเมนตัมของไอเสีย $\\Delta m(v - u)$ ด้วย ทำให้พจน์ความเร็ว $v$ ของผู้สังเกตตัดหายไปอย่างถูกต้อง',
    everydayAnalogyTh:
      'ถ้าถือกระสอบทรายแล้วโยนถุงทรายตกพื้นตรงๆ ($u=0$) คุณไม่ได้พุ่งไปข้างหน้า! คุณจะพุ่งก็ต่อเมื่อออกแรงถีบถุงทรายให้กระเด็นไปข้างหลัง ($u > 0$) เท่านั้น',
    interactiveLabId: 'rocket-com-lab',
    extraLabIds: ['integral-work'],
    quickRecall: {
      questionTh: 'หากรถไฟแล่นบนรางลื่นโดยไร้แรงขับ แล้วเปิดรูให้น้ำรั่วลงพื้นตามแนวดิ่ง ความเร็วรถไฟจะเพิ่มขึ้นหรือไม่?',
      answerTh: 'ไม่เพิ่มและไม่ลด (คงที่เท่าเดิม!) เพราะน้ำที่หยดออกไปยังมีโมเมนตัมต่อหน่วยมวลเท่าเดิมติดตัวไปด้วย จึงไม่มีแรงขับสัมพัทธ์ ($u = 0$)',
    },
  },

  // =========================================================================
  // Chapter 5: Work, Energy & Collisions
  // =========================================================================
  'work-energy-conservative-fields': {
    levelTag: 'W = Fs คงที่ → อินทิกรัลตามเส้น 3D & สนามอนุรักษ์',
    basicLabelTh: 'งานจากแรงคงที่ในแนวตรง ม.ปลาย',
    basicFormulaLatex: 'W = F s\\cos\\theta = \\Delta E_k',
    advancedLabelTh: 'อินทิกรัลตามเส้น 3 มิติ & เกณฑ์ทดสอบ Curl',
    advancedFormulaLatex: 'W_{ba} = \\int_{\\vec{r}_a}^{\\vec{r}_b} \\vec{F}\\cdot d\\vec{r} = K_b - K_a, \\quad \\vec{\\nabla}\\times\\vec{F} = \\vec{0}',
    whyItBreaksTh:
      'ในโจทย์จริงแรงเปลี่ยนทั้งขนาดและทิศทางตามเส้นทางโค้ง เช่น สปริง ดาวเคราะห์ หรือรางรถไฟเหาะ สูตร $W = Fs$ ใช้ได้เฉพาะเมื่อทั้ง $\\vec{F}$ และเส้นทางเป็นเส้นตรงคงที่',
    howItEvolvesTh:
      'หั่นเส้นทางโค้งออกเป็นช่วงเวกเตอร์สั้นๆ $d\\vec{r}$ ซึ่งแรงแทบคงที่ในแต่ละก้าว แล้วนำผลคูณสเกลาร์ $\\vec{F}\\cdot d\\vec{r}$ มาบวกสะสมกันเป็น $\\int \\vec{F}\\cdot d\\vec{r}$ ซึ่งพิสูจน์ได้จาก $\\vec{F}=m\\frac{d\\vec{v}}{dt}$ ว่าเท่ากับ $\\Delta K$ เสมอ',
    everydayAnalogyTh:
      'เดินขึ้นบันไดวนขึ้นตึก 10 ชั้น แม้ระยะทางเดินเป็นวงกลมยาวมาก แรงโน้มถ่วงก็ทำงานแค่ความสูงดิ่งที่เปลี่ยนไป ($\\Delta h$) เหมือนรวมงานก้าวเล็กๆ ทั้งหมดในแนวดิ่ง',
    interactiveLabId: 'work-energy-coaster',
    extraLabIds: ['integral-work'],
    quickRecall: {
      questionTh: 'แรงปฏิกิริยาตั้งฉาก $\\vec{N}$ จากรางโค้งที่ตรึงนิ่งทำงานเท่าใดต่ออนุภาค และถ้ารางกำลังเคลื่อนที่ล่ะ?',
      answerTh: 'ถ้ารางอยู่นิ่ง $W_N = 0$ เสมอเพราะ $\\vec{N}\\perp d\\vec{r}$ แต่ถ้ารางกำลังเคลื่อนที่ (เช่น ลิ่มขยับหนี) $\\vec{N}$ **ทำงานได้** เพราะทิศการกระจัดจริงไม่ได้ตั้งฉากกับ $\\vec{N}$!',
    },
  },
  'conservative-forces-potential-wells': {
    levelTag: 'E_p = mgh → หลุมศักย์ U(x), Taylor SHM & มวลลดทอน',
    basicLabelTh: 'พลังงานศักย์พื้นราบ & กฎของฮุก',
    basicFormulaLatex: 'U = mgh \\;\\text{ หรือ }\\; \\frac{1}{2}kx^2',
    advancedLabelTh: 'การกระจายเทย์เลอร์รอบจุดต่ำสุดของหลุมศักย์ใดๆ',
    advancedFormulaLatex: 'U(x) \\approx U(x_0) + \\frac{1}{2}U\'\'(x_0)(x - x_0)^2 \\implies \\omega = \\sqrt{\\frac{U\'\'(x_0)}{\\mu}}',
    whyItBreaksTh:
      'แรงยึดเหนี่ยวระหว่างอะตอม แรงดึงดูด หรือสนามไฟฟ้า ไม่ได้มีรูป $\\frac{1}{2}kx^2$ เป๊ะๆ แต่กราฟพลังงานศักย์มักโค้งเป็นหลุมรูปทรงซับซ้อน',
    howItEvolvesTh:
      'เมื่อขยับวัตถุออกจากก้นหลุม ($U\'(x_0) = 0$) เพียงเล็กน้อย กราฟโค้งเรียบทุกชนิดเมื่อขยายดูใกล้ๆ จะดูเหมือน "พาราโบลา" (Taylor อันดับ 2) ซึ่งมีพฤติกรรมเหมือนสปริงอุดมคติที่ค่า $k_{\\text{eff}} = U\'\'(x_0)$!',
    everydayAnalogyTh:
      'ก้นชามก๋วยเตี๋ยวหรืออ่างล้างหน้าไม่ว่าจะเป็นทรงกลมหรือวงรี ตรงบริเวณจุดต่ำสุดจะมีรูปร่างโค้งคล้ายชามพาราโบลาเหมือนกัน ลูกแก้วจึงกลิ้งกลับไปมาแบบ SHM เสมอ',
    interactiveLabId: 'potential-well',
    quickRecall: {
      questionTh: 'เงื่อนไข 2 ข้อที่บอกว่าจุด $x_0$ เป็นจุดสมดุลเสถียร (Stable Equilibrium) บนกราฟ $U(x)$ คืออะไร?',
      answerTh: '(1) ความชันเป็นศูนย์ $U\'(x_0) = 0$ (แรงสุทธิ $= 0$) และ (2) กราฟโค้งหงาย $U\'\'(x_0) > 0$ (ก้นหลุมศักย์)',
    },
  },
  'collisions-cframe-lframe': {
    levelTag: 'ชน 1 มิติ ม.ปลาย → ชน 2 มิติในกรอบ C-Frame',
    basicLabelTh: 'การชน 1 มิติ (สมการโมเมนตัม + พลังงาน)',
    basicFormulaLatex: 'm_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2',
    advancedLabelTh: 'การแปลง C-Frame สู่ L-Frame & มุมกระเจิงสูงสุด',
    advancedFormulaLatex: '\\tan\\theta_1 = \\frac{\\sin\\Theta}{(m_1/m_2) + \\cos\\Theta}, \\quad \\sin\\theta_{1,\\max} = \\frac{m_2}{m_1}',
    whyItBreaksTh:
      'การแก้โจทย์ชน 2 มิติด้วยสูตรในห้องทดลอง (L-Frame) มีสมการตรีโกณมิติซ้อนกัน 3 สมการ (แกน x, y และพลังงาน) จนคำนวณหาขอบเขตมุมไม่ได้ง่ายๆ',
    howItEvolvesTh:
      'กระโดดขึ้นไปนั่งบนจุดศูนย์กลางมวล (C-Frame): ในกรอบนี้โมเมนตัมรวมเป็น $0$ ดังนั้นก่อนชนและหลังชนทั้งคู่แค่วิ่งสวนทางกัน $180^\\circ$ ด้วยอัตราเร็วเดิม! หลังชนจึงแค่หมุนทิศมุม $\\Theta$ แล้วบวก $\\vec{V}_{\\text{cm}}$ กลับคืน',
    everydayAnalogyTh:
      'มองลูกบิลเลียดชนกันจากกล้องโดรนที่บินตามจุดกึ่งกลางมวล จะเห็นลูกบิลเลียดแค่วิ่งเข้าหากันแล้วกระดอนออกตรงข้ามกันง่ายนิดเดียว',
    interactiveLabId: 'momentum-collision',
    quickRecall: {
      questionTh: 'เมื่อลูกมวลหนักมาก $m_1$ ชนเป้าหมายมวลเบา $m_2$ ที่หยุดนิ่ง ($m_1 > m_2$) เหตุใดลูกหนัก $m_1$ จึงไม่มีทางกระดอนถอยหลัง ($>90^\\circ$)?',
      answerTh: 'เพราะความเร็ว CM ($V$) มากกว่าความเร็วกระดอนกลับในกรอบ CM ($v\'_1$) เสมอ ดังนั้น $\\sin\\theta_{1,\\max} = v\'_1/V = m_2/m_1 < 1$',
    },
  },

  // =========================================================================
  // Chapter 6: Rotational Dynamics
  // =========================================================================
  'moment-of-inertia-calculus-rolling': {
    levelTag: 'จุดมวลหมุน mr^2 → อินทิกรัล I, แกนขนาน & ศูนย์กระทบ',
    basicLabelTh: 'โมเมนต์ความเฉื่อยจุดมวล & ทอร์ก ม.ปลาย',
    basicFormulaLatex: 'I = m r^2, \\quad \\tau = I\\alpha',
    advancedLabelTh: 'อินทิกรัลรูปทรงต่อเนื่อง, แกนขนาน & ลูกตุ้มกายภาพ',
    advancedFormulaLatex: 'I = \\int r_{\\perp}^2\\,dm, \\quad I = I_0 + Md^2, \\quad l_{\\text{perc}} = \\frac{I_P}{ML}',
    whyItBreaksTh:
      'แท่งไม้ แผ่นจาน และทรงกลม มีเนื้อวัตถุอยู่ห่างจากแกนหมุนไม่เท่ากัน จึงใช้สูตร $mR^2$ ไม่ได้ และถ้าจับหมุนรอบจุดขอบก็ยิ่งเฉื่อยมากกว่าจุดศูนย์กลาง',
    howItEvolvesTh:
      'แบ่งวัตถุเป็นชิ้นมวลย่อย $dm$ ที่มีระยะ $r$ เดียวกันแล้วอินทิเกรต $\\int r^2\\,dm$ เพื่อหา $I_{\\text{cm}}$ ส่วนการย้ายแกนใช้ทฤษฎีบทแกนขนาน $I_0 + Md^2$ ได้ทันทีโดยไม่ต้องอินทิเกรตใหม่!',
    everydayAnalogyTh:
      'เวลาจับไม้เบสบอลหรือไม้แบดมินตันตีลูกที่ "Sweet Spot" ($l_{\\text{perc}}$) มือที่ด้ามจับจะไม่รู้สึกสะท้านเลย เพราะการเหวี่ยงหมุนหักล้างแรงกระตุกที่จุดจับพอดี',
    interactiveLabId: 'integral-work',
    quickRecall: {
      questionTh: 'เหตุใดทฤษฎีบทแกนตั้งฉาก $I_z = I_x + I_y$ จึงใช้ได้เฉพาะกับแผ่นบาง 2 มิติ (Planar Lamina)?',
      answerTh: 'เพราะใช้ความสัมพันธ์ $r_z^2 = x^2 + y^2$ ซึ่งตัดพิกัด $z = 0$ ทิ้ง: สำหรับทรง 3 มิติ $I_x + I_y = \\int (2z^2 + x^2 + y^2)\\,dm \\neq I_z$',
    },
  },
  'chasles-theorem-rolling-motion': {
    levelTag: 'กลิ้งพื้นเอียง ม.ปลาย → ทฤษฎีบทของชาส์ล & เงื่อนไขไถล',
    basicLabelTh: 'อนุรักษ์พลังงานกลิ้งอย่างง่าย',
    basicFormulaLatex: 'mgh = \\frac{1}{2}mv^2 + \\frac{1}{2}I\\omega^2',
    advancedLabelTh: 'แยกการเลื่อนที่ของ CM + การหมุนรอบ CM & เช็กไถล',
    advancedFormulaLatex: 'M\\vec{A}_{\\text{cm}} = \\vec{F}_{\\text{ext}}, \\quad \\tau_{\\text{cm}} = I_0\\alpha, \\quad f_s \\le \\mu_s N',
    whyItBreaksTh:
      'อนุรักษ์พลังงานบอกแค่ความเร็ว แต่ไม่สามารถบอก "ความตึงเชือก" หรือ "แรงเสียดทานสถิต $f_s$" ที่ป้องกันไม่ให้ไถล และการใช้จุดหมุนที่กำลังเร่งมักทำให้สมการ $\\tau = I\\alpha$ ผิดโดยไม่รู้ตัว!',
    howItEvolvesTh:
      'ใช้กฎของ Chasles ที่เป็นจริงเสมอทุกสถานการณ์: เขียน $\\sum F = M a_{\\text{cm}}$ ควบคู่กับ $\\tau_{\\text{cm}} = I_0\\alpha$ รอบ CM แล้วค่อยแทน $a = \\alpha R$ เพื่อหาค่าแรงเสียดทานสถิตจริงก่อนเทียบกับ $\\mu_s N$',
    everydayAnalogyTh:
      'ทรงกลมตัน แหวน และท่อกลวงมวลเท่ากันกลิ้งแข่งกันลงเนิน ทรงกลมตันชนะเสมอเพราะมวลอยู่ใกล้แกนหมุนมากกว่า จึงประหยัดพลังงานหมุนมาแปลงเป็นความเร็วได้มากกว่า!',
    interactiveLabId: 'rolling-race-lab',
    extraLabIds: ['incline-wedge'],
    quickRecall: {
      questionTh: 'ในโจทย์วัตถุกลิ้งโดยไม่ไถล แรงเสียดทานสถิต $f_s$ มีค่าเท่ากับ $\\mu_s N$ เสมอหรือไม่?',
      answerTh: 'ไม่ใช่! $f_s$ เป็นแรงข้อจำกัดที่ปรับค่าเท่าที่จำเป็น ($f_s \\le \\mu_s N$) ต้องแก้หา $f_s$ จากสมการนิวตันก่อนเสมอ และใช้ $f_s = \\mu_s N$ เฉพาะจุด "จวนจะไถล"',
    },
  },
  '3d-rigid-body-gyroscope': {
    levelTag: 'L = Iω ในระนาบ 2D → ไจโรสโคป & ทอร์ก 3 มิติ',
    basicLabelTh: 'โมเมนตัมเชิงมุม 2 มิติ (ชี้ทิศเดียวกับแกน)',
    basicFormulaLatex: 'L = I\\omega, \\quad \\tau = I\\alpha',
    advancedLabelTh: 'การเปลี่ยนทิศทางของเวกเตอร์ $\\vec{L}$ ใน 3 มิติ',
    advancedFormulaLatex: '\\vec{\\tau} = \\frac{d\\vec{L}}{dt} \\implies \\Omega = \\frac{Mgl}{I_0\\omega_s}',
    whyItBreaksTh:
      'พอเห็นลูกข่างเอียงทำท่าจะล้ม แรงโน้มถ่วงไม่ได้ดึงมันตกลงพื้น แต่ลูกข่างกลับหมุนควงเป็นวงกลมขนานพื้น! สูตรสเกลาร์ $\\tau = I\\alpha$ อธิบายไม่ได้เพราะมันคิดแค่การหมุนเร็วขึ้น/ช้าลง ไม่ได้คิดการ **เบนทิศ** ของ $\\vec{L}$',
    howItEvolvesTh:
      'กฎที่แท้จริงคือสมการเวกเตอร์ $d\\vec{L} = \\vec{\\tau}\\,dt$: เมื่อทอร์ก $\\vec{\\tau}$ จากน้ำหนักตั้งฉากกับโมเมนตัมเชิงมุม $\\vec{L}_s$ เสมอ ขนาดของ $\\vec{L}_s$ จึงไม่เพิ่มหรือลด แต่ปลายเวกเตอร์ $\\vec{L}_s$ ถูกดึงให้เลี้ยวขวางไปเรื่อยๆ ด้วยอัตราเร็ว $\\Omega$',
    everydayAnalogyTh:
      'เหมือนรถที่วิ่งตรงด้วยความเร็วสูงแล้วมีแรงสู่ศูนย์กลางดึง **ตั้งฉาก** กับความเร็ว — รถไม่ได้วิ่งเร็วขึ้น แต่จะ **เลี้ยวโค้ง** แทน!',
    interactiveLabId: 'coriolis-disk',
    quickRecall: {
      questionTh: 'ถ้าปั่นมู่เล่ของไจโรสโคปให้เร็วขึ้น 2 เท่า ($\\omega_s \\to 2\\omega_s$) อัตราเร็วในการหมุนควง $\\Omega$ จะเป็นอย่างไร?',
      answerTh: 'ลดลงครึ่งหนึ่ง ($\\Omega = \\frac{Mgl}{I_0\\omega_s} \\propto \\frac{1}{\\omega_s}$): ยิ่งปั่นไจโรเร็ว มันยิ่งหมุนควงช้าและนิ่งมั่นคงขึ้น!',
    },
  },

  // =========================================================================
  // Chapter 7: Non-Inertial & Central Force
  // =========================================================================
  'accelerating-rotating-frames': {
    levelTag: 'กรอบเฉื่อย ม.ปลาย → กรอบเร่ง, คอริโอลิส & ฟูโกต์',
    basicLabelTh: 'กฎนิวตันเฉพาะในกรอบอยู่นิ่ง',
    basicFormulaLatex: '\\vec{F}_{\\text{real}} = m\\vec{a}_{\\text{inertial}}',
    advancedLabelTh: 'แรงเทียมในกรอบเร่งและกรอบหมุน',
    advancedFormulaLatex: 'm\\vec{a}_{\\text{rot}} = \\vec{F}_{\\text{real}} - 2m(\\vec{\\Omega}\\times\\vec{v}_{\\text{rot}}) - m\\vec{\\Omega}\\times(\\vec{\\Omega}\\times\\vec{r})',
    whyItBreaksTh:
      'เมื่อคุณอยู่ในรถที่เร่งเครื่องหรือบนโลกที่หมุนรอบตัวเอง กฎ $F=ma$ ดูเหมือนใช้งานไม่ได้ (น้ำในถังโค้งขึ้นขอบ, ลูกตุ้มแกว่งเอียงหลัง, พายุหมุนวน) จนกว่าจะคิดแรงเทียมจากความเร่งของกรอบ',
    howItEvolvesTh:
      'ใช้กฎการแปลงอนุพันธ์ในกรอบหมุน $\\left(\\frac{d}{dt}\\right)_{\\text{in}} = \\left(\\frac{d}{dt}\\right)_{\\text{rot}} + \\vec{\\Omega}\\times$ ซ้ำ 2 ครั้ง จะเกิดทั้งแรงหนีศูนย์กลาง (ผลักออกนอกแกน) และแรงคอริโอลิส (เบี่ยงทิศวัตถุที่กำลังวิ่ง)',
    everydayAnalogyTh:
      'เวลานั่งรถเมล์แล้วคนขับเหยียบเบรกกระทันหัน คุณรู้สึกเหมือนมีใครผลักไปข้างหน้า แรงนั้นคือ "แรงเฉื่อยเทียม" $-m\\vec{A}$ ที่มีขนาดและธรรมชาติเหมือนสนามโน้มถ่วงเอียง!',
    interactiveLabId: 'coriolis-disk',
    quickRecall: {
      questionTh: 'เหตุใดแรงคอริโอลิส $-2m(\\vec{\\Omega}\\times\\vec{v}_{\\text{rot}})$ จึง **ไม่ทำงาน** ในกรอบหมุนเลยแม้แต่นิดเดียว?',
      answerTh: 'เพราะทิศของ $\\vec{\\Omega}\\times\\vec{v}_{\\text{rot}}$ ตั้งฉากกับความเร็ว $\\vec{v}_{\\text{rot}}$ ตลอดเวลา ผลคูณสเกลาร์ $\\vec{F}_{\\text{cor}} \\cdot \\vec{v}_{\\text{rot}} = 0$!',
    },
  },
  'central-force-effective-potential-kepler': {
    levelTag: 'วงโคจรวงกลม ม.ปลาย → ศักย์ยังผล & วงรี Vis-Viva',
    basicLabelTh: 'วงโคจรวงกลมพื้นฐาน (GMm/r^2 = mv^2/r)',
    basicFormulaLatex: 'v = \\sqrt{\\frac{GM}{r}}, \\quad T^2 \\propto r^3',
    advancedLabelTh: 'ศักย์ยังผล 1 มิติ & สมการพลังงานวงโคจรวงรี',
    advancedFormulaLatex: 'U_{\\text{eff}}(r) = \\frac{L^2}{2\\mu r^2} - \\frac{GMm}{r}, \\quad v^2 = GM\\left(\\frac{2}{r} - \\frac{1}{a}\\right)',
    whyItBreaksTh:
      'วงโคจรดาวหางและดาวเทียมที่ยิงเปลี่ยนวงโคจรเป็น **วงรี** ไม่ใช่วงกลม จึงใช้ $mv^2/r$ ตลอดทางไม่ได้ เพราะอัตราเร็วและรัศมีเปลี่ยนแปลงตลอดเวลา',
    howItEvolvesTh:
      'เนื่องจาก $\\vec{\\tau} = 0$ โมเมนตัมเชิงมุม $L = \\mu r^2 \\dot{\\theta}$ คงที่ จึงกำจัด $\\dot{\\theta}$ ทิ้งจากสมการพลังงาน เหลือแค่ปัญหา 1 มิติของ $r(t)$ ในหลุมศักย์ยังผล $U_{\\text{eff}}(r)$ ที่อ่านจุดใกล้สุด-ไกลสุดและเสถียรภาพได้ทันที',
    everydayAnalogyTh:
      'เทอม $\\frac{L^2}{2\\mu r^2}$ ทำหน้าที่เหมือน "กำแพงพลังงานที่มองไม่เห็น" คอยสะท้อนดาวเคราะห์กลับออกมาเมื่อเข้าใกล้ดวงอาทิตย์มากเกินไป ทำให้ไม่พุ่งชนดวงอาทิตย์!',
    interactiveLabId: 'kepler-orbit-lab',
    extraLabIds: ['potential-well'],
    quickRecall: {
      questionTh: 'พลังงานรวม $E = -\\frac{GMm}{2a}$ ของวงโคจรวงรีขึ้นอยู่กับความรี (Eccentricity $\\epsilon$) หรือไม่?',
      answerTh: 'ไม่ขึ้นกับ $\\epsilon$ เลย! วงกลมกับวงรีที่ยืดยาวมากแต่มีความยาวแกนเอก $2a$ เท่ากัน จะมีพลังงานรวม $E$ และคาบโคจร $T$ เท่ากันเป๊ะ!',
    },
  },

  // =========================================================================
  // Chapter 8: Oscillations & Resonance
  // =========================================================================
  'shm-odes-and-energy-method': {
    levelTag: 'T = 2π√(m/k) → สมการอนุพันธ์ SHM & วิธี dE/dt = 0',
    basicLabelTh: 'สูตรคาบสปริงและลูกตุ้ม ม.ปลาย',
    basicFormulaLatex: 'T = 2\\pi\\sqrt{\\frac{m}{k}}, \\quad T = 2\\pi\\sqrt{\\frac{L}{g}}',
    advancedLabelTh: 'สมการอนุพันธ์อันดับ 2 & ทางลัดดิฟพลังงานรวม',
    advancedFormulaLatex: '\\frac{dE}{dt} = 0 \\implies \\ddot{x} + \\omega^2 x = 0',
    whyItBreaksTh:
      'เมื่อมีทั้งลูกตุ้มกลิ้ง ผสมสปริง หลายแกน หรือของเหลวในท่อตัวยู การเขียน FBD แตกแรงทั้งหมดเพื่อหาค่า $k_{\\text{eff}}$ มักติดแรงเสียดทานสถิตและแรงตึงเชือกที่ไม่รู้ค่า',
    howItEvolvesTh:
      'เขียนพลังงานกลรวม $E = K + U$ (ที่อนุรักษ์และไม่ขึ้นกับแรงภายใน) แล้วดิฟเทียบเวลาให้ $\\frac{dE}{dt} = 0$ และตัด $\\dot{x}$ ทิ้ง จะได้สมการ $\\ddot{x} + \\omega^2 x = 0$ ออกมาทันทีใน 3 บรรทัด!',
    everydayAnalogyTh:
      'เหมือนการส่องดูแค่ "กระเป๋าเงินรวม" ($E = K+U$) แทนที่จะคอยตามดูรายรับ-รายจ่ายของแรงภายในทุกตัว — เงินไหลเข้าจลน์เท่ากับไหลออกจากศักย์เสมอ',
    interactiveLabId: 'shm-phase-lab',
    extraLabIds: ['potential-well'],
    quickRecall: {
      questionTh: 'ทำไมวิธี $\\frac{dE}{dt} = 0$ จึงตัดแรงตึงเชือกและแรงเสียดทานสถิตในการกลิ้งไม่ไถลออกไปได้หมด?',
      answerTh: 'เพราะแรงข้อจำกัดอุดมคติเหล่านี้ **ไม่ทำงาน** จึงไม่โผล่ในสมการพลังงาน $E = K + U$ ตั้งแต่แรก!',
    },
  },
  'coupled-oscillators-normal-modes': {
    levelTag: 'ตัวสั่นเดี่ยว → ตัวสั่นคู่ควบ (Normal Modes & Beats)',
    basicLabelTh: 'มวลติดสปริงอิสระ 1 ตัว',
    basicFormulaLatex: '\\ddot{x} + \\omega_0^2 x = 0',
    advancedLabelTh: 'พิกัดปกติ $q_1, q_2$ สำหรับระบบคู่ควบ 2 มวล',
    advancedFormulaLatex: 'q_{1,2} = x_a \\pm x_b \\implies \\omega_1 = \\sqrt{\\frac{g}{l}}, \\; \\omega_2 = \\sqrt{\\frac{g}{l} + \\frac{2k}{m}}',
    whyItBreaksTh:
      'ทันทีที่ผูกสปริงเชื่อมระหว่างลูกตุ้ม 2 อัน สมการของมวล $a$ จะมีตัวแปร $x_b$ ปนอยู่ ทำให้แก้แยกทีละก้อนไม่ได้และพลังงานไหลกลับไปกลับมาตลอด',
    howItEvolvesTh:
      'เปลี่ยนตัวแปรไปสู่ **โหมดสมมาตร** ($q_1 = x_a + x_b$ ที่แกว่งไปทางเดียวกันจนสปริงไม่ยืด) และ **โหมดต้านสมมาตร** ($q_2 = x_a - x_b$ ที่แกว่งสวนทางกัน) สมการทั้งสองจะขาดออกจากกันอย่างสิ้นเชิงและแก้เป็น SHM ธรรมดาได้ทันที',
    everydayAnalogyTh:
      'แขวนลูกตุ้ม 2 อันบนเชือกขึงราวตากผ้าเดียวกัน: ถ้าผลักแค่อันซ้าย ไม่นานอันซ้ายจะหยุดนิ่งแล้วส่งพลังงานทั้งหมดไปให้อันขวาแกว่งแทน สลับกันไปมาเป็นจังหวะบีตส์!',
    interactiveLabId: 'coupled-oscillators',
    quickRecall: {
      questionTh: 'ถ้าลูกตุ้มคู่ควบด้วยสปริงอ่อน 2 อันถูกดึงออก **ไปทางเดียวกันเท่ากัน** ($x_a(0)=x_b(0)$) แล้วปล่อย จะเกิดการถ่ายเทพลังงานไปมาหรือไม่?',
      answerTh: 'ไม่เกิด! เพราะเราปลุกเฉพาะโหมดสมมาตร $q_1$ เพียงโหมดเดียว สปริงไม่เคยถูกยืดหด ทั้งคู่จึงแกว่งพร้อมกันด้วยความถี่ $\\sqrt{g/l}$ ตลอดไป',
    },
  },
  'damped-driven-resonance': {
    levelTag: 'SHM อุดมคติ → การหน่วง (Q) & เรโซแนนซ์เชิงซ้อน',
    basicLabelTh: 'การสั่นที่ไม่มีวันหยุด (แอมพลิจูดคงที่)',
    basicFormulaLatex: 'x(t) = A\\cos(\\omega_0 t + \\phi)',
    advancedLabelTh: 'สมการตัวสั่นมีแรงหน่วงและแรงขับภายนอก',
    advancedFormulaLatex: '\\ddot{x} + \\gamma\\dot{x} + \\omega_0^2 x = \\frac{F_0}{m}\\cos\\omega t, \\quad Q = \\frac{\\omega_0}{\\gamma}',
    whyItBreaksTh:
      'โลกจริงมีแรงเสียดทานทำให้การสั่นค่อยๆ เบาลงจนดับ (Damped) และหากมีแรงกระตุ้นภายนอกความถี่ $\\omega$ การแกว่งอาจระเบิดแอมพลิจูดสูงลิ่วเมื่อความถี่ตรงกัน (Resonance)',
    howItEvolvesTh:
      'ขยายสมการจริงเข้าสู่ระนาบเชิงซ้อนด้วย $z(t) = A e^{i(\\omega t - \\phi)}$ เพื่อเปลี่ยน $\\frac{d}{dt} \\to i\\omega$ ทำให้หาทั้งแอมพลิจูด $A(\\omega)$ มุมเฟสตามหลัง $\\phi$ และความกว้างแถบความถี่ FWHM $= \\gamma$ ได้ด้วยพีชคณิตง่ายๆ',
    everydayAnalogyTh:
      'ไกวชิงช้าเด็ก: ถ้าผลักตามจังหวะธรรมชาติของชิงช้า ($\\omega = \\omega_0$, เฟสตามหลังแรง $90^\\circ$ คือผลักตอนชิงช้าเคลื่อนไปข้างหน้าสุดแรง) พลังงานจะสะสมสูงสุดจนแกว่งสูงลิ่ว!',
    interactiveLabId: 'shm-resonance',
    quickRecall: {
      questionTh: 'ที่จุดสั่นพ้องพอดี ($\\omega = \\omega_0$) มุมเฟสตามหลัง $\\phi$ ระหว่างการกระจัด $x(t)$ กับแรงขับ $F(t)$ มีค่าเท่าใด และทำไม?',
      answerTh: '$\\phi = 90^\\circ$ ($\\pi/2$): ทำให้แรงขับมีเฟสตรงกับ **ความเร็ว** $\\dot{x}(t)$ เป๊ะ กำลังงานเฉลี่ย $\\overline{F\\dot{x}}$ จึงไหลเข้าสู่ระบบได้สูงสุด!',
    },
  },
};

export function getBridgeForLesson(slug: string, topicId: TopicId): ConceptBridge {
  if (LESSON_BRIDGES[slug]) {
    return LESSON_BRIDGES[slug];
  }
  const fallbackByTopic: Record<TopicId, string> = {
    'pre-mechanics': 'pre-units-newton-friction',
    'pre-fluids-thermo': 'pre-fluids-bernoulli',
    'pre-em': 'pre-electrostatics-capacitors',
    'pre-optics': 'pre-mirrors-reflection',
    'pre-waves': 'pre-waves-interference',
    'math-tools': 'single-variable-calculus-physics',
    'kinematics-calculus': 'calculus-kinematics-drag-force',
    'newton-constraints': 'pulley-wedge-kinematic-constraints',
    'momentum-variable-mass': 'variable-mass-rocket-momentum-flux',
    'work-energy-potentials': 'work-energy-conservative-fields',
    'rotation-dynamics': 'moment-of-inertia-calculus-rolling',
    'non-inertial-central-force': 'central-force-effective-potential-kepler',
    'shm-differential-eq': 'shm-odes-and-energy-method',
  };
  return LESSON_BRIDGES[fallbackByTopic[topicId]] ?? LESSON_BRIDGES['single-variable-calculus-physics'];
}
