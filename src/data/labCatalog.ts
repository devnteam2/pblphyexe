// src/data/labCatalog.ts
import { CurriculumTrack, TopicId } from '@/types/curriculum';
import { InteractiveLabId } from './lessonBridges';

export type HubLabId = InteractiveLabId | 'rigid-body';

export type LabCategory = 'flagship' | 'pre-camp-1' | 'camp-1-2';

export type LabDomain =
  | 'mechanics'
  | 'fluids-thermal'
  | 'electricity-magnetism'
  | 'optics'
  | 'waves-sound'
  | 'olympiad-calculus';

export interface LabDomainMeta {
  id: LabDomain;
  titleTh: string;
  shortLabelTh: string;
  subtitleEn: string;
  descriptionTh: string;
  badgeClass: string;
}

export const LAB_DOMAINS: LabDomainMeta[] = [
  {
    id: 'mechanics',
    titleTh: 'กลศาสตร์ & การเคลื่อนที่',
    shortLabelTh: 'กลศาสตร์',
    subtitleEn: 'Mechanics Lab',
    descriptionTh: 'กฎนิวตัน แรงเสียดทาน รอก โพรเจกไทล์ การชน งาน-พลังงาน วงกลม และสมดุลหมุน',
    badgeClass:
      'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300/80 dark:border-emerald-800',
  },
  {
    id: 'fluids-thermal',
    titleTh: 'ของไหล ความร้อน & แก๊ส',
    shortLabelTh: 'ของไหล & แก๊ส',
    subtitleEn: 'Fluids & Thermal Lab',
    descriptionTh: 'แรงลอยตัว ท่อเวนจูรี ถังรั่ว การไหลความร้อน และลูกสูบโมเลกุลแก๊สอุดมคติ',
    badgeClass:
      'bg-orange-50 dark:bg-orange-950/40 text-orange-800 dark:text-orange-300 border-orange-300/80 dark:border-orange-800',
  },
  {
    id: 'electricity-magnetism',
    titleTh: 'ไฟฟ้าสถิต วงจร & แม่เหล็ก',
    shortLabelTh: 'ไฟฟ้า & แม่เหล็ก',
    subtitleEn: 'Electrostatics, Circuits & Magnetism',
    descriptionTh: 'สนามไฟฟ้า 2D ตัวเก็บประจุ ต่อวงจร DC จริง แท่งแม่เหล็ก เข็มทิศ และรางฟาราเดย์',
    badgeClass:
      'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300/80 dark:border-amber-800',
  },
  {
    id: 'optics',
    titleTh: 'แสง กระจก เลนส์ & ปริซึม',
    shortLabelTh: 'แสง & เลนส์',
    subtitleEn: 'Light & Optics Lab',
    descriptionTh: 'รางแสงกระจก-เลนส์ ปริซึม 6 สี กฎสเนลล์–แฟร์มาต์ และระบบผสม 2 ชิ้น (ข้อ 28)',
    badgeClass:
      'bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border-purple-300/80 dark:border-purple-800',
  },
  {
    id: 'waves-sound',
    titleTh: 'คลื่น เสียง & ดอปเพลอร์',
    shortLabelTh: 'คลื่น & เสียง',
    subtitleEn: 'Waves & Sound Lab',
    descriptionTh: 'คลื่นแทรกสอด Buff/Debuff คลื่นนิ่ง บีตส์ ดอปเพลอร์ โซนิกบูม และท่อเสียง',
    badgeClass:
      'bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 border-sky-300/80 dark:border-sky-800',
  },
  {
    id: 'olympiad-calculus',
    titleTh: 'ค่าย 1–2 แคลคูลัส & ขั้นสูง',
    shortLabelTh: 'ค่าย 1–2',
    subtitleEn: 'Olympiad Calculus & Advanced',
    descriptionTh: 'อนุพันธ์ ปริพันธ์ หลุมศักย์ เวกเตอร์ จรวด จานหมุนคอริโอลิส เคปเลอร์ และเรโซแนนซ์',
    badgeClass:
      'bg-stone-100 dark:bg-stone-900 text-stone-800 dark:text-stone-300 border-stone-300 dark:border-stone-700',
  },
];

export interface LabCatalogItem {
  id: HubLabId;
  category: LabCategory;
  domain: LabDomain;
  titleTh: string;
  subtitleTh: string;
  quickTipTh: string;
  keywords: string;
  relatedLesson?: {
    track: CurriculumTrack;
    topicId: TopicId;
    slug: string;
  };
}

export const PHYSICS_LAB_CATALOG: LabCatalogItem[] = [
  // =========================================================================
  // 1. MECHANICS LABS (10)
  // =========================================================================
  {
    id: 'newton-laws-lab',
    category: 'pre-camp-1',
    domain: 'mechanics',
    titleTh: 'แล็บกฎนิวตัน F=ma พื้นเอียง & ระบบรอก 2 มวล',
    subtitleTh: 'ปรับมวล แรงดัน มุมเอียง เสียดทาน f_s/f_k และสลับระบบรอก Table / Atwood',
    quickTipTh: 'กดปุ่มตัวอย่างด้านล่างดูความต่างระหว่างกล่องหยุดนิ่ง vs ไถล หรือสลับแท็บข้างบนไปเล่นระบบรอก 2 มวลได้เลย!',
    keywords: 'newton force mass acceleration pulley atwood friction FBD นิวตัน แรง กฎของนิวตัน รอก',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-mechanics',
      slug: 'pre-units-newton-friction',
    },
  },
  {
    id: 'projectile-shooter',
    category: 'flagship',
    domain: 'mechanics',
    titleTh: 'เกมฝึกยิงปืนใหญ่โพรเจกไทล์ (4 ด่าน)',
    subtitleTh: 'คำนวณ u และ θ ยิงพื้นราบ หน้าผา+กำแพง รถเป้าเคลื่อนที่ และพื้นเอียง',
    quickTipTh: 'ปรับความเร็วต้นและมุมแล้วยิงเป้า! ลองยิงเองก่อน หรือถ้าอยากเช็กแนวให้กดปุ่ม "แสดงวิถีพาราโบลา (โกง)"',
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
    domain: 'mechanics',
    titleTh: 'แล็บการชนและโมเมนตัม (เพิ่ม/ลบมวล 2–4 ก้อน)',
    subtitleTh: 'ตั้งมวล ความเร็ว และค่าคืนตัว e ปล่อยชนสดเทียบโมเมนตัม vs พลังงานจลน์',
    quickTipTh: 'กด "+ เพิ่มก้อน" แล้วลากสไลเดอร์ความเร็ว/มวล จากนั้นกดปุ่ม "ปล่อยชน" ดูผลรวมโมเมนตัม ∑mv ด้านล่าง!',
    keywords: 'momentum collision mass elastic inelastic restitution โมเมนตัม ชน มวล',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-mechanics',
      slug: 'pre-momentum-energy-projectile',
    },
  },
  {
    id: 'work-energy-coaster',
    category: 'pre-camp-1',
    domain: 'mechanics',
    titleTh: 'แล็บงาน พลังงานกล รางรถไฟเหาะ & สปริงยิงวัตถุ',
    subtitleTh: 'ดูแท่ง K + U_g + E_ความร้อน สดๆ บนรางตัวยู เนินคู่ รางตีลังกา และเครื่องยิงสปริง',
    quickTipTh: 'เลือกราง "ตีลังกา" แล้วลองลดความสูงปล่อย h₀ ให้ต่ำกว่า 7 m ดูว่าทำไมรถถึงหลุดรางตรงยอด!',
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
    domain: 'mechanics',
    titleTh: 'แล็บวงกลม ตัดเชือกพิสูจน์เส้นสัมผัส & ทางโค้งยกเอียง',
    subtitleTh: 'กดตัดเชือกดูการพุ่งเส้นตรงตามกฎข้อ 1 พร้อมทางโค้งยกมุม θ และตีลังกาแนวดิ่ง',
    quickTipTh: 'กดปุ่มสีแดง "ตัดเชือก!" ตอนลูกบอลกำลังเหวี่ยง แล้วดูว่ามันพุ่งออกตามเส้นสัมผัส (ไม่กระเด็นถอยออกตรงๆ!)',
    keywords: 'circular centripetal cut string banked curve vertical loop วงกลม สู่ศูนย์กลาง ตัดเชือก',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-mechanics',
      slug: 'pre-circular-rotation-equilibrium',
    },
  },
  {
    id: 'incline-wedge',
    category: 'pre-camp-1',
    domain: 'mechanics',
    titleTh: 'ลิ่มและแรงเสียดทาน (Wedge & Friction)',
    subtitleTh: 'ทดสอบแรงเสียดทานสถิต f_s ≤ μ_s N เทียบกับจลน์ f_k บนพื้นเอียง',
    quickTipTh: 'ลากมุมเอียง θ ขึ้นช้าๆ จนเลยค่าวิกฤต แล้วดูป้ายเปลี่ยนจากหยุดนิ่งสีเขียวเป็นไถลลงสีแดงทันที!',
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
    domain: 'mechanics',
    titleTh: 'สมดุลสถิตบันไดพิงกำแพง (Static Torque)',
    subtitleTh: 'เลือกจุดหมุน O ตัดแรงไม่ทราบค่าและหา μ_min = 1/(2 tan θ)',
    quickTipTh: 'ลองเอนบันไดให้มุม θ ต่ำลงเรื่อยๆ ดูว่าแรงเสียดทานพื้นต้องใช้เพิ่มขึ้นแค่ไหนไม่ให้บันไดลื่น!',
    keywords: 'static equilibrium torque ladder wall friction สมดุล ทอร์ก บันได',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-mechanics',
      slug: 'pre-circular-rotation-equilibrium',
    },
  },
  {
    id: 'rolling-race-lab',
    category: 'camp-1-2',
    domain: 'mechanics',
    titleTh: 'ศึกกลิ้งลงพื้นเอียง (กล่อง vs ทรงกลม vs ทรงกระบอก vs วงแหวน)',
    subtitleTh: 'พิสูจน์ว่าทำไมทรงกลมตัน (I=2/5 mR²) ชนะวงแหวนเสมอโดยไม่ขึ้นกับมวล',
    quickTipTh: 'กด "ปล่อยแข่งใหม่" แล้วทายดูว่าทรงกลมตันกับวงแหวนกลวง อันไหนเข้าเส้นชัยก่อนกัน!',
    keywords: 'rolling inertia chasles incline race sphere hoop disk กลิ้ง โมเมนต์ความเฉื่อย',
    relatedLesson: {
      track: 'camp-1-2',
      topicId: 'rotation-dynamics',
      slug: 'chasles-theorem-rolling-motion',
    },
  },
  {
    id: 'pulley-capstan',
    category: 'camp-1-2',
    domain: 'mechanics',
    titleTh: 'แรงเสียดทานเชือกพันเสา Capstan (T_B = T_A e^(μθ))',
    subtitleTh: 'ดูการคูณแรงเสียดทานแบบเอกซ์โพเนนเชียลเมื่อพันเชือกหลายรอบเสา',
    quickTipTh: 'ลากเพิ่มจำนวนรอบเชือกที่พันรอบเสา ดูแรงตึงฝั่งดึงเบาแค่นิดเดียวแต่รั้งน้ำหนักมหาศาลได้!',
    keywords: 'capstan friction exponential tension rope pulley แคปสแตน เชือก',
    relatedLesson: {
      track: 'camp-1-2',
      topicId: 'newton-constraints',
      slug: 'continuous-mass-tension-capstan',
    },
  },
  {
    id: 'rigid-body',
    category: 'flagship',
    domain: 'mechanics',
    titleTh: 'ห้องทดลองการหมุนวัตถุแข็งเกร็ง (Rigid Body Lab)',
    subtitleTh: 'พื้นเอียงกลิ้งไม่ไถล ฟลายวีล เพนดูลัมกายภาพ และเอฟเฟกต์ Dzhanibekov',
    quickTipTh: 'เลือกโหมดด้านบน (กลิ้งพื้นเอียง / ฟลายวีล / เอฟเฟกต์ Dzhanibekov) แล้วปรับแรงบิดหรือรูปทรงวัตถุ',
    keywords: 'rotation rigid body torque inertia rolling gyroscope dzhanibekov หมุน ล้อ พื้นเอียง',
    relatedLesson: {
      track: 'camp-1-2',
      topicId: 'rotation-dynamics',
      slug: 'moment-of-inertia-calculus-rolling',
    },
  },

  // =========================================================================
  // 2. FLUIDS & THERMAL LABS (5)
  // =========================================================================
  {
    id: 'fluid-buoyancy-lab',
    category: 'pre-camp-1',
    domain: 'fluids-thermal',
    titleTh: 'แล็บแรงลอยตัวอาร์คิมีดิส ทอร์ริเชลลี & ไฮดรอลิก',
    subtitleTh: 'เทียบไม้/น้ำแข็ง/โลหะจมในน้ำและปรอท เจาะรูถังน้ำดู R_max และกดไฮดรอลิก',
    quickTipTh: 'ลองเลือก "ทองคำ" หย่อนลงใน "ปรอท" ดูว่าจะจมหรือลอย! หรือสลับแท็บไปลองเจาะรูถังน้ำให้พุ่งไกลสุด',
    keywords: 'fluid buoyancy archimedes density torricelli hydraulic ของไหล แรงลอยตัว น้ำ ถังรั่ว',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-fluids-thermo',
      slug: 'pre-fluids-bernoulli',
    },
  },
  {
    id: 'bernoulli-pipe',
    category: 'pre-camp-1',
    domain: 'fluids-thermal',
    titleTh: 'ท่อเวนจูรี & สมการ Bernoulli',
    subtitleTh: 'เห็นกับตาว่าท่อแคบลง น้ำเร็วขึ้น และความดันสถิตลดลงอย่างไร',
    quickTipTh: 'ลากอัตราส่วนท่อบีบแคบ A₁/A₂ ให้สูงขึ้น ดูความเร็ว v₂ พุ่งขึ้นพร้อมระดับความดันในหลอดวัดลดลง!',
    keywords: 'fluid bernoulli venturi pressure velocity ของไหล ความดัน',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-fluids-thermo',
      slug: 'pre-fluids-bernoulli',
    },
  },
  {
    id: 'heat-flow',
    category: 'flagship',
    domain: 'fluids-thermal',
    titleTh: 'แล็บการไหลของความร้อน (Q̇ = kAΔT / L)',
    subtitleTh: 'เห็นอนุภาคความร้อนไหลตามค่า K (ทองแดง/เหล็ก/ไม้) ขนาดหน้าตัด A และความยาว L',
    quickTipTh: 'สลับปุ่ม "ทองแดง (K=400)" เทียบกับ "ไม้ (K=0.15)" แล้วสังเกตความเร็วเม็ดความร้อนที่วิ่งผ่านแท่ง!',
    keywords: 'heat thermal conduction fourier temperature series rod ความร้อน นำความร้อน',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-fluids-thermo',
      slug: 'pre-thermal-conduction-expansion',
    },
  },
  {
    id: 'ideal-gas-lab',
    category: 'pre-camp-1',
    domain: 'fluids-thermal',
    titleTh: 'แล็บแก๊สอุดมคติ ลูกสูบโมเลกุล & กราฟ P–V สด',
    subtitleTh: 'โมเลกุลวิ่งชนตามอุณหภูมิ T กับลูกสูบ 5 โหมด (P/V/T คงที่ และ Adiabatic)',
    quickTipTh: 'เลือกโหมด "ไม่ถ่ายเท Q=0" แล้วลากปริมาตร V ให้เล็กลง — ดูอุณหภูมิกับโมเลกุลพุ่งแรงขึ้นทั้งที่ไม่ได้ต้ม!',
    keywords: 'gas ideal piston pressure volume temperature adiabatic pv แก๊ส ลูกสูบ อุณหภูมิ',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-fluids-thermo',
      slug: 'pre-heat-gas-thermo',
    },
  },
  {
    id: 'temperature-box',
    category: 'pre-camp-1',
    domain: 'fluids-thermal',
    titleTh: 'กล่องอุณหภูมิ & กระบอกสูบแก๊ส (กฎข้อที่ 1)',
    subtitleTh: 'สมดุลความร้อนและการแบ่งพลังงาน ΔU กับงานขยายตัว ΔW',
    quickTipTh: 'ปรับค่า K₁/K₂ ดูอุณหภูมิรอยต่อ หรือสลับไปแท็บกระบอกสูบแล้วเพิ่มความร้อน ΔQ',
    keywords: 'thermal conduction heat gas piston thermo first law แก๊ส ลูกสูบ',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-fluids-thermo',
      slug: 'pre-heat-gas-thermo',
    },
  },

  // =========================================================================
  // 3. ELECTRICITY & MAGNETISM LABS (7)
  // =========================================================================
  {
    id: 'electrostatics-field-lab',
    category: 'pre-camp-1',
    domain: 'electricity-magnetism',
    titleTh: 'แล็บสนามไฟฟ้า 2 มิติ (เพิ่ม/ลบประจุ & ปล่อย +q₀)',
    subtitleTh: 'วางขั้วคู่ แผ่นขนาน หรือเพิ่มประจุเอง แล้วแตะหย่อนประจุทดสอบดูเส้นทางวิ่ง',
    quickTipTh: 'แตะตรงไหนบนสนามก็ได้เพื่อหย่อนประจุทดสอบ +q₀ หรือกดปุ่ม "เพิ่ม +q / -q" ดูลูกศรสนามเปลี่ยนทิศ!',
    keywords: 'electrostatic electric field charge potential coulomb test charge ไฟฟ้าสถิต ประจุ สนามไฟฟ้า',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-em',
      slug: 'pre-electrostatics-capacitors',
    },
  },
  {
    id: 'electric-capacitor',
    category: 'pre-camp-1',
    domain: 'electricity-magnetism',
    titleTh: 'ตัวเก็บประจุ: เสียบแบต vs ถอดแบต',
    subtitleTh: 'สังเกตความเปลี่ยนแปลงของ C, E, Q และพลังงานสะสม U เมื่อดึงแผ่นออกห่าง',
    quickTipTh: 'ลองสลับ "เสียบแบตค้าง" กับ "ถอดแบต" แล้วลากระยะห่างแผ่น d เพิ่ม — ดูว่าตัวไหนพลังงานเพิ่ม/ลด!',
    keywords: 'capacitor electric field energy density battery ตัวเก็บประจุ สนามไฟฟ้า',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-em',
      slug: 'pre-electrostatics-capacitors',
    },
  },
  {
    id: 'circuit-builder',
    category: 'flagship',
    domain: 'electricity-magnetism',
    titleTh: 'ห้องต่อวงจรไฟฟ้า DC (เพิ่มกิ่ง หลอดไฟ & สวิตช์)',
    subtitleTh: 'ต่อวงจรอนุกรม/ขนาน ใส่หลอดไฟสว่างตามกำลังวัตต์ P=I²R พร้อมจุดกระแสไหล',
    quickTipTh: 'กด "+ เพิ่มกิ่ง" และลองสับสวิตช์แต่ละสาขา ดูหลอดไฟสว่างขึ้น-ดับลงและจุดกระแสไหลทันที!',
    keywords: 'circuit builder dc ohm bulb resistor parallel series วงจรไฟฟ้า หลอดไฟ กระแส',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-em',
      slug: 'pre-dc-circuits-rc',
    },
  },
  {
    id: 'rc-circuit-box',
    category: 'pre-camp-1',
    domain: 'electricity-magnetism',
    titleTh: 'บทบาท R, C, L ในวงจรกระแสตรง (t = 0⁺ & t → ∞)',
    subtitleTh: 'เทียบลัดวงจร vs วงจรขาดของตัวเก็บประจุ C และตัวเหนี่ยวนำ L',
    quickTipTh: 'สลับดู 3 ช่วงเวลา (t=0⁺, ระหว่างชาร์จ, t→∞) เทียบพฤติกรรมตรงข้ามกันระหว่าง C กับ L!',
    keywords: 'circuit rc rl resistor capacitor inductor วงจรไฟฟ้า',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-em',
      slug: 'pre-dc-circuits-rc',
    },
  },
  {
    id: 'magnet-field',
    category: 'flagship',
    domain: 'electricity-magnetism',
    titleTh: 'แล็บแม่เหล็ก เข็มทิศ ขดลวดฟาราเดย์ & ประจุ qv×B',
    subtitleTh: 'เลื่อนแท่งแม่เหล็ก N/S ดูเข็มทิศหมุน หลอดไฟเหนี่ยวนำ และวงโคจรประจุ',
    quickTipTh: 'ลากตำแหน่งแท่งแม่เหล็กหรือกด "เขย่าแม่เหล็กเข้า-ออก" ดูเข็มทิศ 6 ตัวหมุนตามและหลอดไฟติดสว่าง!',
    keywords: 'magnet compass faraday coil lorentz cyclotron electromagnetic แม่เหล็ก เข็มทิศ ประจุ',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-em',
      slug: 'pre-magnetic-field-wires',
    },
  },
  {
    id: 'faraday-em-wave-lab',
    category: 'pre-camp-1',
    domain: 'electricity-magnetism',
    titleTh: 'แล็บรางฟาราเดย์–เลนซ์ & คลื่นแม่เหล็กไฟฟ้า 3D',
    subtitleTh: 'ดูหลอดไฟสว่างและแรงเบรกเลนซ์พร้อมคลื่น E ⊥ B ⊥ c ทุกย่านสเปกตรัม',
    quickTipTh: 'สังเกตแท่งโลหะเลื่อนไป-มาบนราง: ลูกศรแดง F_ต้าน จะคอยดึงต้านการเคลื่อนที่เสมอตามกฎของเลนซ์!',
    keywords: 'faraday lenz emf electromagnetic wave spectrum maxwell ฟาราเดย์ เลนซ์ คลื่นแม่เหล็กไฟฟ้า',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-em',
      slug: 'pre-magnetism-induction-maxwell',
    },
  },
  {
    id: 'magnetic-wire',
    category: 'pre-camp-1',
    domain: 'electricity-magnetism',
    titleTh: 'ลวดนำกระแส B = μ₀i/2r & รางฟาราเดย์',
    subtitleTh: 'กฎมือขวาหาสนามแม่เหล็กใจกลางวงลวด และกฎของเลนซ์บนรางเคลื่อนที่',
    quickTipTh: 'ลากเพิ่มกระแสไฟฟ้า i หรือลดรัศมีวงลวด r ดูขนาดสนาม B = μ₀i/2r พุ่งสูงขึ้นตรงจุดศูนย์กลาง!',
    keywords: 'magnetic field wire loop faraday lenz emf สนามแม่เหล็ก ฟาราเดย์',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-em',
      slug: 'pre-magnetism-induction-maxwell',
    },
  },

  // =========================================================================
  // 4. OPTICS LABS (4)
  // =========================================================================
  {
    id: 'light-optics-bench',
    category: 'pre-camp-1',
    domain: 'optics',
    titleTh: 'แล็บแสง รางกระจก–เลนส์ 4 ชนิด & ปริซึมรุ้ง 6 สี',
    subtitleTh: 'ทดลองวางวัตถุหน้ากระจก/เลนส์นูนเว้า พร้อมดูการกระจายแสงขาวผ่านปริซึม',
    quickTipTh: 'ลากระยะวัตถุ u เข้าใกล้จุดโฟกัส F ดูขนาดภาพขยายโตขึ้นและพลิกจากภาพจริงเป็นภาพเสมือน หรือกดดูแท็บ "ปริซึมรุ้ง"!',
    keywords: 'light optics mirror lens prism dispersion rainbow แสง กระจก เลนส์ ปริซึม',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-optics',
      slug: 'pre-mirrors-reflection',
    },
  },
  {
    id: 'snell-fermat',
    category: 'flagship',
    domain: 'optics',
    titleTh: 'พิสูจน์กฎสเนลล์ (เวลาสั้นสุดของแฟร์มาต์) & TIR',
    subtitleTh: 'กราฟ T(x) แสดงจุดเวลาสั้นสุด dT/dx=0 พร้อมมุมวิกฤตและมุมบริวสเตอร์',
    quickTipTh: 'ลากจุดหักเหบนผิวน้ำให้เวลาเดินทาง T(x) ลงต่ำสุด จะเห็นเส้นแสงหักเหตรงกับกฎสเนลล์ n₁sinθ₁ = n₂sinθ₂ เป๊ะ!',
    keywords: 'snell fermat least time refraction brewster tir critical angle สเนลล์ หักเห แสง',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-optics',
      slug: 'pre-refraction-lenses-combined',
    },
  },
  {
    id: 'combined-optics-lab',
    category: 'pre-camp-1',
    domain: 'optics',
    titleTh: 'แล็บระบบผสมเลนส์–กระจก & วัตถุเสมือน u₂ < 0',
    subtitleTh: 'ฝึกโจทย์ข้อ 28 สอวน. ทั้ง 2 เลนส์และเลนส์+กระจกสะท้อนกลับครบ 3 ขั้น',
    quickTipTh: 'กดปุ่มตัวอย่างด้านบนดูทันทีว่า "วัตถุเสมือน u₂ < 0" เกิดขึ้นเมื่อภาพ I₁ ตกเลยหลังชิ้นที่ 2 อย่างไร!',
    keywords: 'combined optics lens mirror virtual object two elements ระบบผสม เลนส์ กระจก วัตถุเสมือน',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-optics',
      slug: 'pre-combined-optical-systems',
    },
  },
  {
    id: 'optics-ray-tracer',
    category: 'pre-camp-1',
    domain: 'optics',
    titleTh: 'เครื่องเขียนทางเดินแสง เลนส์และกระจก (แบบคลาสสิก)',
    subtitleTh: 'ลากวัตถุหน้าเลนส์นูน/เว้า และกระจกเว้า/นูน ดูภาพจริงกับภาพเสมือนทันที',
    quickTipTh: 'เลือกชนิดกระจกหรือเลนส์ด้านบน แล้วลากระยะวัตถุ u เทียบตำแหน่งจุดโฟกัส F',
    keywords: 'optics ray mirror lens focal magnification เลนส์ กระจก ภาพจริง',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-optics',
      slug: 'pre-mirrors-reflection',
    },
  },

  // =========================================================================
  // 5. WAVES & SOUND LABS (2)
  // =========================================================================
  {
    id: 'wave-interference',
    category: 'flagship',
    domain: 'waves-sound',
    titleTh: 'ห้องทดลองคลื่น แทรกสอด Buff/Debuff & คลื่นนิ่ง',
    subtitleTh: 'ดูคลื่นเสริม (0°) คลื่นหักล้าง (180°) คลื่นนิ่ง Nodes/Antinodes และบีตส์สดๆ',
    quickTipTh: 'เลื่อนเฟส Δφ ไปที่ 0° (Buff เสริมกันสูง 2 เท่า!) เทียบกับ 180° (Debuff หักล้างเงียบสนิท!) แล้วลองกดแท็บคลื่นนิ่ง',
    keywords: 'wave interference buff debuff standing beats constructive destructive แทรกสอด คลื่น',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-waves',
      slug: 'pre-waves-interference',
    },
  },
  {
    id: 'sound-doppler-lab',
    category: 'pre-camp-1',
    domain: 'waves-sound',
    titleTh: 'แล็บเสียง ดอปเพลอร์ โซนิกบูม (Mach) & ท่อเรโซแนนซ์',
    subtitleTh: 'ดูหน้าคลื่นอัดตัว เกิดกรวย Mach cone (เปิดเสียงไซเรนได้) และคลื่นนิ่งในท่อเสียง',
    quickTipTh: 'กด "เครื่องบินรบ (1.4 M)" เพื่อดูกรวยเสียงโซนิกบูม หรือกด "ลองเปิดเสียงไซเรน" ฟังเสียงสูง→ต่ำตอนวิ่งผ่านผู้ฟัง!',
    keywords: 'sound doppler sonic boom mach resonance pipe organ เสียง ดอปเพลอร์ ท่อ เรโซแนนซ์',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-waves',
      slug: 'pre-standing-beats-doppler',
    },
  },

  // =========================================================================
  // 6. OLYMPIAD CALCULUS & CAMP 1–2 LABS (11)
  // =========================================================================
  {
    id: 'derivative-slope',
    category: 'camp-1-2',
    domain: 'olympiad-calculus',
    titleTh: 'อนุพันธ์และเส้นสัมผัสกราฟ (Δt → 0)',
    subtitleTh: 'บีบช่วงเวลา Δt เข้าใกล้ศูนย์เพื่อดู Secant เปลี่ยนเป็น dx/dt',
    quickTipTh: 'ลาก Δt ลงเข้าใกล้ศูนย์ (หรือกดปุ่ม Δt=0.05s) เพื่อเห็นเส้นตัดกราฟค่อยๆ ซ้อนทับเส้นสัมผัสจริง!',
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
    domain: 'olympiad-calculus',
    titleTh: 'ปริพันธ์รีมันน์และพื้นที่ใต้กราฟ (∫F dx)',
    subtitleTh: 'แบ่งแถบสี่เหลี่ยม Δx → 0 เพื่อหางานจากแรงแปรผัน F(x) = 3x²',
    quickTipTh: 'เพิ่มจำนวนแท่ง N จาก 2 ไป 32 ดูพื้นที่ขั้นบันไดลู่เข้าค่าอินทิกรัลแท้ ∫F dx!',
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
    domain: 'olympiad-calculus',
    titleTh: 'หลุมศักย์พลังงาน (Potential Well U(x))',
    subtitleTh: 'ตรวจจุดสมดุลเสถียร vs ไม่เสถียร จากความชัน -dU/dx และความเว้า d²U/dx²',
    quickTipTh: 'ลากลูกแก้วบนโค้งหลุมศักย์ U(x) ดูทิศลูกศรแรงดึงกลับ F = -dU/dx ชี้กลับหาก้นหลุมเสมอ!',
    keywords: 'potential energy well equilibrium stability หลุมศักย์ สมดุล',
    relatedLesson: {
      track: 'camp-1-2',
      topicId: 'work-energy-potentials',
      slug: 'conservative-forces-potential-wells',
    },
  },
  {
    id: 'vector-calculus-lab',
    category: 'camp-1-2',
    domain: 'olympiad-calculus',
    titleTh: 'แล็บเวกเตอร์ Dot/Cross & พิกัดเชิงขั้ว (r̂, θ̂)',
    subtitleTh: 'หมุนเวกเตอร์ฐาน r̂(θ) และ θ̂(θ) พร้อมคำนวณ A·B และขนาดพื้นที่ A×B',
    quickTipTh: 'ลากมุม θ หมุนรอบวงกลม แล้วดูว่าเวกเตอร์ 1 หน่วย r̂ และ θ̂ เปลี่ยนทิศตามตลอดเวลา!',
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
    domain: 'olympiad-calculus',
    titleTh: 'แล็บแรงต้าน Stokes (F = -bv) & ความเร็วปลาย v_T',
    subtitleTh: 'ดูลูกบอลตกในของเหลวหนืดพร้อมกราฟ v(t) = v_T(1 - e^{-t/τ}) แบบเรียลไทม์',
    quickTipTh: 'ปรับค่าสัมประสิทธิ์แรงต้าน b ดูกราฟความเร็วเข้าสู่เส้นประความเร็วปลาย v_T = mg/b!',
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
    domain: 'olympiad-calculus',
    titleTh: 'แล็บสมการจรวดมวลแปรผัน (Tsiolkovsky Rocket)',
    subtitleTh: 'ปรับอัตราเร็วไอพ่น u_ex และสัดส่วนเชื้อเพลิง ดูกราฟ Δv = u_ex ln(m₀/m)',
    quickTipTh: 'เพิ่มสัดส่วนมวลเชื้อเพลิงแล้วกด "จุดระเบิดใหม่" ดูจรวดเร่งตัวต่อเนื่องเมื่อตัวจรวดเบาลง!',
    keywords: 'rocket variable mass tsiolkovsky thrust momentum flux จรวด มวลแปรผัน',
    relatedLesson: {
      track: 'camp-1-2',
      topicId: 'momentum-variable-mass',
      slug: 'variable-mass-rocket-momentum-flux',
    },
  },
  {
    id: 'coriolis-disk',
    category: 'camp-1-2',
    domain: 'olympiad-calculus',
    titleTh: 'จานหมุนและแรงคอริโอลิส (Coriolis Frame)',
    subtitleTh: 'เทียบเส้นทางลูกบอลระหว่างกรอบอ้างอิงเฉื่อยกับกรอบที่กำลังหมุน',
    quickTipTh: 'เทียบฝั่งกรอบนิ่ง (วิ่งเป็นเส้นตรงเป๊ะ) กับฝั่งกรอบหมุน (เห็นเส้นทางโค้งเบี่ยงเหมือนโดนแรงคอริโอลิสผลัก)!',
    keywords: 'coriolis rotating frame inertial turntable centrifugal คอริโอลิส จานหมุน',
    relatedLesson: {
      track: 'camp-1-2',
      topicId: 'non-inertial-central-force',
      slug: 'accelerating-rotating-frames',
    },
  },
  {
    id: 'kepler-orbit-lab',
    category: 'camp-1-2',
    domain: 'olympiad-calculus',
    titleTh: 'แล็บวงโคจรเคปเลอร์ (วงกลม วงรี & ความเร็วหลุดพ้น)',
    subtitleTh: 'ปรับอัตราเร็วปล่อย v₀/v_circ ดูความรี e และการกวาดพื้นที่ในกฎข้อ 2 ของเคปเลอร์',
    quickTipTh: 'ลากอัตราเร็วปล่อย v₀/v_circ ขึ้นถึง 1.41 (√2 เท่า) เพื่อยิงดาวเทียมหลุดพ้นแรงโน้มถ่วง!',
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
    domain: 'olympiad-calculus',
    titleTh: 'แล็บ SHM & วงรีเฟสสเปซ (Phase Space x–v)',
    subtitleTh: 'ดูมวลติดสปริงสั่นซิงโครไนซ์กับจุดวิ่งวนตามเข็มนาฬิกาบนวงรีพลังงานในระนาบ (x, v)',
    quickTipTh: 'สังเกตจุดสีแดงบนวงรีขวาเทียบกับบล็อกสปริงซ้าย — จังหวะผ่านจุดกลาง x=0 จะได้ความเร็ว v สูงสุด!',
    keywords: 'shm phase space harmonic oscillator spring ellipse เฟสสเปซ การสั่น',
    relatedLesson: {
      track: 'camp-1-2',
      topicId: 'shm-differential-eq',
      slug: 'shm-odes-and-energy-method',
    },
  },
  {
    id: 'coupled-oscillators',
    category: 'camp-1-2',
    domain: 'olympiad-calculus',
    titleTh: 'ลูกตุ้มคู่ควบสปริง & Normal Modes',
    subtitleTh: 'ดูการถ่ายเทพลังงานไปมาระหว่าง 2 ลูกตุ้ม และโหมดสมมาตร/ต้านสมมาตร',
    quickTipTh: 'เลือกโหมด "ถ่ายเทพลังงาน (Beats)" ดูลูกตุ้มซ้ายหยุดนิ่งแล้วส่งพลังงานทั้งหมดไปให้อีกฝั่งสลับกันไปมา!',
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
    domain: 'olympiad-calculus',
    titleTh: 'กราฟสั่นพ้องแอมพลิจูด (Driven Resonance)',
    subtitleTh: 'ปรับความหน่วง γ และอัตราส่วนความถี่ ω/ω₀ เพื่อดูค่า Q-factor',
    quickTipTh: 'กดปุ่ม "ω=ω₀!" แล้วลองลดความหน่วง γ ดูยอดกราฟแอมพลิจูดพุ่งทะลุเพดาน!',
    keywords: 'shm resonance damped oscillator q-factor สั่นพ้อง เรโซแนนซ์',
    relatedLesson: {
      track: 'camp-1-2',
      topicId: 'shm-differential-eq',
      slug: 'damped-driven-resonance',
    },
  },
];
