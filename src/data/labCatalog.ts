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
    id: 'wave-interference',
    category: 'flagship',
    titleTh: 'ห้องทดลองคลื่น แทรกสอด Buff/Debuff & คลื่นนิ่ง',
    subtitleTh: 'ดูคลื่นเสริม (0°) คลื่นหักล้าง (180°) คลื่นนิ่ง Nodes/Antinodes และบีตส์สดๆ',
    keywords: 'wave interference buff debuff standing beats constructive destructive แทรกสอด คลื่น',
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
  // 2. PRE-CAMP 1 VISUAL LABS
  // =========================================================================
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
    titleTh: 'กล่องนำความร้อน & กระบอกสูบแก๊สอุดมคติ',
    subtitleTh: 'สมดุลฟลักซ์ความร้อน J₁=J₂ และการแบ่งพลังงาน ΔU กับงาน ΔW',
    keywords: 'thermal conduction heat gas piston thermo first law นำความร้อน แก๊ส',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-fluids-thermo',
      slug: 'pre-thermal-conduction-expansion',
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
      slug: 'pre-magnetic-field-wires',
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
  {
    id: 'projectile-collision',
    category: 'pre-camp-1',
    titleTh: 'กราฟวิถีโพรเจกไทล์ & ระยะตก',
    subtitleTh: 'เปรียบเทียบองค์ประกอบ v_x, v_y และมุมยิง 45° แบบรวดเร็ว',
    keywords: 'projectile range height apex โพรเจกไทล์',
    relatedLesson: {
      track: 'pre-camp-1',
      topicId: 'pre-mechanics',
      slug: 'pre-momentum-energy-projectile',
    },
  },

  // =========================================================================
  // 3. CAMP 1 -> 2 CALCULUS MICRO-LABS
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
];
