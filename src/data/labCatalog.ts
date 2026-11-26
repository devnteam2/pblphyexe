// src/data/labCatalog.ts
import { CurriculumTrack, TopicId } from '@/types/curriculum';
import { InteractiveLabId } from './lessonBridges';

export type HubLabId = InteractiveLabId | 'rigid-body';

export type LabCategory = 'flagship' | 'pre-camp-1' | 'camp-1-2';

export interface LabCatalogItem {
  id: HubLabId;
  category: LabCategory;
  titleTh: string;
  subtitleTh: string;
  keywords: string;
  relatedLesson?: {
    track: CurriculumTrack;
    topicId: TopicId;
    slug: string;
  };
}

export const PHYSICS_LAB_CATALOG: LabCatalogItem[] = [
  // =========================================================================
  // 1. FLAGSHIP INTERACTIVE SIMULATIONS & EXERCISES
  // =========================================================================
  {
    id: 'projectile-shooter',
    category: 'flagship',
    titleTh: 'เกมฝึกยิงปืนใหญ่โพรเจกไทล์ (4 ด่าน)',
    subtitleTh: 'คำนวณ u และ θ ยิงพื้นราบ หน้าผา+กำแพง รถเป้าเคลื่อนที่ และพื้นเอียง',
    keywords: 'projectile shooter game range cliff moving incline trajectory โพรเจกไทล์ ยิงปืน',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-mechanics',
      slug: 'pre-projectile-kinematics',
    },
  },
  {
    id: 'momentum-collision',
    category: 'flagship',
    titleTh: 'แล็บการชนและโมเมนตัม (เพิ่ม/ลบมวล 2–4 ก้อน)',
    subtitleTh: 'ตั้งมวล ความเร็ว และค่าคืนตัว e ปล่อยชนสดเทียบโมเมนตัม vs พลังงานจลน์',
    keywords: 'momentum collision mass elastic inelastic restitution โมเมนตัม ชน มวล',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-mechanics',
      slug: 'pre-momentum-energy-projectile',
    },
  },
  {
    id: 'circuit-builder',
    category: 'flagship',
    titleTh: 'ห้องต่อวงจรไฟฟ้า DC (เพิ่มกิ่ง หลอดไฟ & สวิตช์)',
    subtitleTh: 'ต่อวงจรอนุกรม/ขนาน ใส่หลอดไฟสว่างตามกำลังวัตต์ P=I²R พร้อมจุดกระแสไหล',
    keywords: 'circuit builder dc ohm bulb resistor parallel series วงจรไฟฟ้า หลอดไฟ กระแส',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-em',
      slug: 'pre-dc-circuits-rc',
    },
  },
  {
    id: 'magnet-field',
    category: 'flagship',
    titleTh: 'แล็บแม่เหล็ก เข็มทิศ ขดลวดฟาราเดย์ & ประจุ qv×B',
    subtitleTh: 'เลื่อนแท่งแม่เหล็ก N/S ดูเข็มทิศหมุน หลอดไฟเหนี่ยวนำ และวงโคจรประจุ',
    keywords: 'magnet compass faraday coil lorentz cyclotron electromagnetic แม่เหล็ก เข็มทิศ ประจุ',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-em',
      slug: 'pre-magnetic-field-wires',
    },
  },
  {
    id: 'heat-flow',
    category: 'flagship',
    titleTh: 'แล็บการไหลของความร้อน (Q̇ = kAΔT / L)',
    subtitleTh: 'เห็นอนุภาคความร้อนไหลตามค่า K (ทองแดง/เหล็ก/ไม้) ขนาดหน้าตัด A และความยาว L',
    keywords: 'heat thermal conduction fourier temperature series rod ความร้อน นำความร้อน',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-fluids-thermo',
      slug: 'pre-thermal-conduction-expansion',
    },
  },
  {
    id: 'wave-interference',
    category: 'flagship',
    titleTh: 'ห้องทดลองคลื่น แทรกสอด Buff/Debuff & คลื่นนิ่ง',
    subtitleTh: 'ดูคลื่นเสริม (0°) คลื่นหักล้าง (180°) คลื่นนิ่ง Nodes/Antinodes และบีตส์สดๆ',
    keywords: 'wave interference buff debuff standing beats constructive destructive แทรกสอด คลื่น',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-waves',
      slug: 'pre-waves-interference',
    },
  },
  {
    id: 'snell-fermat',
    category: 'flagship',
    titleTh: 'พิสูจน์กฎสเนลล์ (เวลาสั้นสุดของแฟร์มาต์) & TIR',
    subtitleTh: 'กราฟ T(x) แสดงจุดเวลาสั้นสุด dT/dx=0 พร้อมมุมวิกฤตและมุมบริวสเตอร์',
    keywords: 'snell fermat least time refraction brewster tir critical angle สเนลล์ หักเห แสง',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-optics',
      slug: 'pre-refraction-lenses-combined',
    },
  },
  {
    id: 'rigid-body',
    category: 'flagship',
    titleTh: 'ห้องทดลองการหมุนวัตถุแข็งเกร็ง (Rigid Body Lab)',
    subtitleTh: 'พื้นเอียงกลิ้งไม่ไถล ฟลายวีล เพนดูลัมกายภาพ และเอฟเฟกต์ Dzhanibekov',
    keywords: 'rotation rigid body torque inertia rolling gyroscope dzhanibekov หมุน ล้อ พื้นเอียง',
    relatedLesson: {
      track: 'camp-1-2',
      topicId: 'rotation-dynamics',
      slug: 'moment-of-inertia-calculus-rolling',
    },
  },

  // =========================================================================
  // 2. PRE-CAMP 1 INTERACTIVE & VISUAL LABS (18 LABS TOTAL)
  // =========================================================================
  {
    id: 'newton-laws-lab',
    category: 'pre-camp-1',
    titleTh: 'แล็บกฎนิวตัน F=ma พื้นเอียง & ระบบรอก 2 มวล',
    subtitleTh: 'ปรับมวล แรงดัน มุมเอียง เสียดทาน f_s/f_k และสลับระบบรอก Table / Atwood',
    keywords: 'newton force mass acceleration pulley atwood friction FBD นิวตัน แรง กฎของนิวตัน รอก',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-mechanics',
      slug: 'pre-units-newton-friction',
    },
  },
  {
    id: 'work-energy-coaster',
    category: 'pre-camp-1',
    titleTh: 'แล็บงาน พลังงานกล รางรถไฟเหาะ & สปริงยิงวัตถุ',
    subtitleTh: 'ดูแท่ง K + U_g + E_ความร้อน สดๆ บนรางตัวยู เนินคู่ รางตีลังกา และเครื่องยิงสปริง',
    keywords: 'work energy roller coaster spring kinetic potential loop งาน พลังงาน สปริง ตีลังกา',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-mechanics',
      slug: 'pre-momentum-energy-projectile',
    },
  },
  {
    id: 'circular-motion-lab',
    category: 'pre-camp-1',
    titleTh: 'แล็บวงกลม ตัดเชือกพิสูจน์เส้นสัมผัส & ทางโค้งยกเอียง',
    subtitleTh: 'กดตัดเชือกดูการพุ่งเส้นตรงตามกฎข้อ 1 พร้อมทางโค้งยกมุม θ และตีลังกาแนวดิ่ง',
    keywords: 'circular centripetal cut string banked curve vertical loop วงกลม สู่ศูนย์กลาง ตัดเชือก',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-mechanics',
      slug: 'pre-circular-rotation-equilibrium',
    },
  },
  {
    id: 'fluid-buoyancy-lab',
    category: 'pre-camp-1',
    titleTh: 'แล็บแรงลอยตัวอาร์คิมีดิส ทอร์ริเชลลี & ไฮดรอลิก',
    subtitleTh: 'เทียบไม้/น้ำแข็ง/โลหะจมในน้ำและปรอท เจาะรูถังน้ำดู R_max และกดไฮดรอลิก',
    keywords: 'fluid buoyancy archimedes density torricelli hydraulic ของไหล แรงลอยตัว น้ำ ถังรั่ว',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-fluids-thermo',
      slug: 'pre-fluids-bernoulli',
    },
  },
  {
    id: 'ideal-gas-lab',
    category: 'pre-camp-1',
    titleTh: 'แล็บแก๊สอุดมคติ ลูกสูบโมเลกุล & กราฟ P–V สด',
    subtitleTh: 'โมเลกุลวิ่งชนตามอุณหภูมิ T กับลูกสูบ 5 โหมด (P/V/T คงที่ และ Adiabatic)',
    keywords: 'gas ideal piston pressure volume temperature adiabatic pv แก๊ส ลูกสูบ อุณหภูมิ',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-fluids-thermo',
      slug: 'pre-heat-gas-thermo',
    },
  },
  {
    id: 'electrostatics-field-lab',
    category: 'pre-camp-1',
    titleTh: 'แล็บสนามไฟฟ้า 2 มิติ (เพิ่ม/ลบประจุ & ปล่อย +q₀)',
    subtitleTh: 'วางขั้วคู่ แผ่นขนาน หรือเพิ่มประจุเอง แล้วแตะหย่อนประจุทดสอบดูเส้นทางวิ่ง',
    keywords: 'electrostatic electric field charge potential coulomb test charge ไฟฟ้าสถิต ประจุ สนามไฟฟ้า',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-em',
      slug: 'pre-electrostatics-capacitors',
    },
  },
  {
    id: 'faraday-em-wave-lab',
    category: 'pre-camp-1',
    titleTh: 'แล็บรางฟาราเดย์–เลนซ์ & คลื่นแม่เหล็กไฟฟ้า 3D',
    subtitleTh: 'ดูหลอดไฟสว่างและแรงเบรกเลนซ์พร้อมคลื่น E ⊥ B ⊥ c ทุกย่านสเปกตรัม',
    keywords: 'faraday lenz emf electromagnetic wave spectrum maxwell ฟาราเดย์ เลนซ์ คลื่นแม่เหล็กไฟฟ้า',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-em',
      slug: 'pre-magnetism-induction-maxwell',
    },
  },
  {
    id: 'light-optics-bench',
    category: 'pre-camp-1',
    titleTh: 'แล็บแสง รางกระจก–เลนส์ 4 ชนิด & ปริซึมรุ้ง 6 สี',
    subtitleTh: 'ทดลองวางวัตถุหน้ากระจก/เลนส์นูนเว้า พร้อมดูการกระจายแสงขาวผ่านปริซึม',
    keywords: 'light optics mirror lens prism dispersion rainbow แสง กระจก เลนส์ ปริซึม',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-optics',
      slug: 'pre-mirrors-reflection',
    },
  },
  {
    id: 'combined-optics-lab',
    category: 'pre-camp-1',
    titleTh: 'แล็บระบบผสมเลนส์–กระจก & วัตถุเสมือน u₂ < 0',
    subtitleTh: 'ฝึกโจทย์ข้อ 28 สอวน. ทั้ง 2 เลนส์และเลนส์+กระจกสะท้อนกลับครบ 3 ขั้น',
    keywords: 'combined optics lens mirror virtual object two elements ระบบผสม เลนส์ กระจก วัตถุเสมือน',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-optics',
      slug: 'pre-combined-optical-systems',
    },
  },
  {
    id: 'sound-doppler-lab',
    category: 'pre-camp-1',
    titleTh: 'แล็บเสียง ดอปเพลอร์ โซนิกบูม (Mach) & ท่อเรโซแนนซ์',
    subtitleTh: 'ดูหน้าคลื่นอัดตัว เกิดกรวย Mach cone (เปิดเสียงไซเรนได้) และคลื่นนิ่งในท่อเสียง',
    keywords: 'sound doppler sonic boom mach resonance pipe organ เสียง ดอปเพลอร์ ท่อ เรโซแนนซ์',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-waves',
      slug: 'pre-standing-beats-doppler',
    },
  },
  {
    id: 'incline-wedge',
    category: 'pre-camp-1',
    titleTh: 'ลิ่มและแรงเสียดทาน (Wedge & Friction)',
    subtitleTh: 'ทดสอบแรงเสียดทานสถิต f_s ≤ μ_s N เทียบกับจลน์ f_k บนพื้นเอียง',
    keywords: 'friction wedge incline static kinetic แรงเสียดทาน ลิ่ม พื้นเอียง',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-mechanics',
      slug: 'pre-units-newton-friction',
    },
  },
  {
    id: 'circular-equilibrium',
    category: 'pre-camp-1',
    titleTh: 'สมดุลสถิตบันไดพิงกำแพง (Static Torque)',
    subtitleTh: 'เลือกจุดหมุน O ตัดแรงไม่ทราบค่าและหา μ_min = 1/(2 tan θ)',
    keywords: 'static equilibrium torque ladder wall friction สมดุล ทอร์ก บันได',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-mechanics',
      slug: 'pre-circular-rotation-equilibrium',
    },
  },
  {
    id: 'bernoulli-pipe',
    category: 'pre-camp-1',
    titleTh: 'ท่อเวนจูรี & สมการ Bernoulli',
    subtitleTh: 'เห็นกับตาว่าท่อแคบลง น้ำเร็วขึ้น และความดันสถิตลดลงอย่างไร',
    keywords: 'fluid bernoulli venturi pressure velocity ของไหล ความดัน',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-fluids-thermo',
      slug: 'pre-fluids-bernoulli',
    },
  },
  {
    id: 'temperature-box',
    category: 'pre-camp-1',
    titleTh: 'กล่องอุณหภูมิ & กระบอกสูบแก๊ส (กฎข้อที่ 1)',
    subtitleTh: 'สมดุลความร้อนและการแบ่งพลังงาน ΔU กับงานขยายตัว ΔW',
    keywords: 'thermal conduction heat gas piston thermo first law แก๊ส ลูกสูบ',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-fluids-thermo',
      slug: 'pre-heat-gas-thermo',
    },
  },
  {
    id: 'electric-capacitor',
    category: 'pre-camp-1',
    titleTh: 'ตัวเก็บประจุ: เสียบแบต vs ถอดแบต',
    subtitleTh: 'สังเกตความเปลี่ยนแปลงของ C, E, Q และพลังงานสะสม U เมื่อดึงแผ่นออกห่าง',
    keywords: 'capacitor electric field energy density battery ตัวเก็บประจุ สนามไฟฟ้า',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-em',
      slug: 'pre-electrostatics-capacitors',
    },
  },
  {
    id: 'rc-circuit-box',
    category: 'pre-camp-1',
    titleTh: 'บทบาท R, C, L ในวงจรกระแสตรง (t = 0⁺ & t → ∞)',
    subtitleTh: 'เทียบลัดวงจร vs วงจรขาดของตัวเก็บประจุ C และตัวเหนี่ยวนำ L',
    keywords: 'circuit rc rl resistor capacitor inductor วงจรไฟฟ้า',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-em',
      slug: 'pre-dc-circuits-rc',
    },
  },
  {
    id: 'magnetic-wire',
    category: 'pre-camp-1',
    titleTh: 'ลวดนำกระแส B = μ₀i/2r & รางฟาราเดย์',
    subtitleTh: 'กฎมือขวาหาสนามแม่เหล็กใจกลางวงลวด และกฎของเลนซ์บนรางเคลื่อนที่',
    keywords: 'magnetic field wire loop faraday lenz emf สนามแม่เหล็ก ฟาราเดย์',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-em',
      slug: 'pre-magnetism-induction-maxwell',
    },
  },
  {
    id: 'optics-ray-tracer',
    category: 'pre-camp-1',
    titleTh: 'เครื่องเขียนทางเดินแสง เลนส์และกระจก',
    subtitleTh: 'ลากวัตถุหน้าเลนส์นูน/เว้า และกระจกเว้า/นูน ดูภาพจริงกับภาพเสมือนทันที',
    keywords: 'optics ray mirror lens focal magnification เลนส์ กระจก ภาพจริง',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-optics',
      slug: 'pre-mirrors-reflection',
    },
  },

  // =========================================================================
  // 3. CAMP 1 -> 2 CALCULUS & ADVANCED MECHANICS LABS
  // =========================================================================
  {
    id: 'derivative-slope',
    category: 'camp-1-2',
    titleTh: 'อนุพันธ์และเส้นสัมผัสกราฟ (Δt → 0)',
    subtitleTh: 'บีบช่วงเวลา Δt เข้าใกล้ศูนย์เพื่อดู Secant เปลี่ยนเป็น dx/dt',
    keywords: 'derivative calculus slope secant tangent อนุพันธ์ ดิฟ',
    relatedLesson: {
      track: 'camp-1-2',
      topicId: 'math-tools',
      slug: 'single-variable-calculus-physics',
    },
  },
  {
    id: 'integral-work',
    category: 'camp-1-2',
    titleTh: 'ปริพันธ์รีมันน์และพื้นที่ใต้กราฟ (∫F dx)',
    subtitleTh: 'แบ่งแถบสี่เหลี่ยม Δx → 0 เพื่อหางานจากแรงแปรผัน F(x) = 3x²',
    keywords: 'integral riemann work force curve อินทิเกรต งาน',
    relatedLesson: {
      track: 'camp-1-2',
      topicId: 'work-energy-potentials',
      slug: 'work-energy-conservative-fields',
    },
  },
  {
    id: 'potential-well',
    category: 'camp-1-2',
    titleTh: 'หลุมศักย์พลังงาน (Potential Well U(x))',
    subtitleTh: 'ตรวจจุดสมดุลเสถียร vs ไม่เสถียร จากความชัน -dU/dx และความเว้า d²U/dx²',
    keywords: 'potential energy well equilibrium stability หลุมศักย์ สมดุล',
    relatedLesson: {
      track: 'camp-1-2',
      topicId: 'work-energy-potentials',
      slug: 'conservative-forces-potential-wells',
    },
  },
  {
    id: 'pulley-capstan',
    category: 'camp-1-2',
    titleTh: 'แรงเสียดทานเชือกพันเสา Capstan (T_B = T_A e^(μθ))',
    subtitleTh: 'ดูการคูณแรงเสียดทานแบบเอกซ์โพเนนเชียลเมื่อพันเชือกหลายรอบเสา',
    keywords: 'capstan friction exponential tension rope pulley แคปสแตน เชือก',
    relatedLesson: {
      track: 'camp-1-2',
      topicId: 'newton-constraints',
      slug: 'continuous-mass-tension-capstan',
    },
  },
  {
    id: 'coriolis-disk',
    category: 'camp-1-2',
    titleTh: 'จานหมุนและแรงคอริโอลิส (Coriolis Frame)',
    subtitleTh: 'เทียบเส้นทางลูกบอลระหว่างกรอบอ้างอิงเฉื่อยกับกรอบที่กำลังหมุน',
    keywords: 'coriolis rotating frame inertial turntable centrifugal คอริโอลิส จานหมุน',
    relatedLesson: {
      track: 'camp-1-2',
      topicId: 'non-inertial-central-force',
      slug: 'accelerating-rotating-frames',
    },
  },
  {
    id: 'coupled-oscillators',
    category: 'camp-1-2',
    titleTh: 'ลูกตุ้มคู่ควบสปริง & Normal Modes',
    subtitleTh: 'ดูการถ่ายเทพลังงานไปมาระหว่าง 2 ลูกตุ้ม และโหมดสมมาตร/ต้านสมมาตร',
    keywords: 'coupled oscillator normal modes beats pendulum spring ลูกตุ้มคู่ควบ',
    relatedLesson: {
      track: 'camp-1-2',
      topicId: 'shm-differential-eq',
      slug: 'coupled-oscillators-normal-modes',
    },
  },
  {
    id: 'shm-resonance',
    category: 'camp-1-2',
    titleTh: 'กราฟสั่นพ้องแอมพลิจูด (Driven Resonance)',
    subtitleTh: 'ปรับความหน่วง γ และอัตราส่วนความถี่ ω/ω₀ เพื่อดูค่า Q-factor',
    keywords: 'shm resonance damped oscillator q-factor สั่นพ้อง เรโซแนนซ์',
    relatedLesson: {
      track: 'camp-1-2',
      topicId: 'shm-differential-eq',
      slug: 'damped-driven-resonance',
    },
  },
  {
    id: 'vector-calculus-lab',
    category: 'camp-1-2',
    titleTh: 'แล็บเวกเตอร์ Dot/Cross & พิกัดเชิงขั้ว (r̂, θ̂)',
    subtitleTh: 'หมุนเวกเตอร์ฐาน r̂(θ) และ θ̂(θ) พร้อมคำนวณ A·B และขนาดพื้นที่ A×B',
    keywords: 'vector dot cross product polar basis rhat thetahat เวกเตอร์ เชิงขั้ว',
    relatedLesson: {
      track: 'camp-1-2',
      topicId: 'math-tools',
      slug: 'vector-algebra-coordinate-systems',
    },
  },
  {
    id: 'drag-terminal-lab',
    category: 'camp-1-2',
    titleTh: 'แล็บแรงต้าน Stokes (F = -bv) & ความเร็วปลาย v_T',
    subtitleTh: 'ดูลูกบอลตกในของเหลวหนืดพร้อมกราฟ v(t) = v_T(1 - e^{-t/τ}) แบบเรียลไทม์',
    keywords: 'stokes drag terminal velocity differential equation exponential แรงต้านอากาศ ความเร็วปลาย',
    relatedLesson: {
      track: 'camp-1-2',
      topicId: 'kinematics-calculus',
      slug: 'calculus-kinematics-drag-force',
    },
  },
  {
    id: 'rocket-com-lab',
    category: 'camp-1-2',
    titleTh: 'แล็บสมการจรวดมวลแปรผัน (Tsiolkovsky Rocket)',
    subtitleTh: 'ปรับอัตราเร็วไอพ่น u_ex และสัดส่วนเชื้อเพลิง ดูกราฟ Δv = u_ex ln(m₀/m)',
    keywords: 'rocket variable mass tsiolkovsky thrust momentum flux จรวด มวลแปรผัน',
    relatedLesson: {
      track: 'camp-1-2',
      topicId: 'momentum-variable-mass',
      slug: 'variable-mass-rocket-momentum-flux',
    },
  },
  {
    id: 'rolling-race-lab',
    category: 'camp-1-2',
    titleTh: 'ศึกกลิ้งลงพื้นเอียง (กล่อง vs ทรงกลม vs ทรงกระบอก vs วงแหวน)',
    subtitleTh: 'พิสูจน์ว่าทำไมทรงกลมตัน (I=2/5 mR²) ชนะวงแหวนเสมอโดยไม่ขึ้นกับมวล',
    keywords: 'rolling inertia chasles incline race sphere hoop disk กลิ้ง โมเมนต์ความเฉื่อย',
    relatedLesson: {
      track: 'camp-1-2',
      topicId: 'rotation-dynamics',
      slug: 'chasles-theorem-rolling-motion',
    },
  },
  {
    id: 'kepler-orbit-lab',
    category: 'camp-1-2',
    titleTh: 'แล็บวงโคจรเคปเลอร์ (วงกลม วงรี & ความเร็วหลุดพ้น)',
    subtitleTh: 'ปรับอัตราเร็วปล่อย v₀/v_circ ดูความรี e และการกวาดพื้นที่ในกฎข้อ 2 ของเคปเลอร์',
    keywords: 'kepler orbit ellipse hyperbola escape velocity gravity เคปเลอร์ วงโคจร ดาวเคราะห์',
    relatedLesson: {
      track: 'camp-1-2',
      topicId: 'non-inertial-central-force',
      slug: 'central-force-effective-potential-kepler',
    },
  },
  {
    id: 'shm-phase-lab',
    category: 'camp-1-2',
    titleTh: 'แล็บ SHM & วงรีเฟสสเปซ (Phase Space x–v)',
    subtitleTh: 'ดูมวลติดสปริงสั่นซิงโครไนซ์กับจุดวิ่งวนตามเข็มนาฬิกาบนวงรีพลังงานในระนาบ (x, v)',
    keywords: 'shm phase space harmonic oscillator spring ellipse เฟสสเปซ การสั่น',
    relatedLesson: {
      track: 'camp-1-2',
      topicId: 'shm-differential-eq',
      slug: 'shm-odes-and-energy-method',
    },
  },
];
