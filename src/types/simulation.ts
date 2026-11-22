// src/types/simulation.ts

export type SimulationMode = 'incline' | 'flywheel' | 'pendulum' | 'dzhanibekov';

export type RigidBodyShape =
  | 'solid_sphere'
  | 'hollow_sphere'
  | 'solid_cylinder'
  | 'thin_hoop'
  | 'rod'
  | 'custom';

export interface RigidBodyProfile {
  id: RigidBodyShape;
  nameTh: string;
  nameEn: string;
  beta: number; // I = beta * M * R^2
  formulaLatex: string;
  descriptionTh: string;
  color: string;
}

export const RIGID_BODY_PROFILES: Record<RigidBodyShape, RigidBodyProfile> = {
  solid_sphere: {
    id: 'solid_sphere',
    nameTh: 'ทรงกลมตัน (Solid Sphere)',
    nameEn: 'Solid Sphere',
    beta: 2 / 5, // 0.4
    formulaLatex: '\\frac{2}{5}MR^2',
    descriptionTh: 'มวลกระจุกใกล้แกนหมุนมากที่สุด มีความเร่งในการกลิ้งสูงสุด (เร็วที่สุด)',
    color: '#3B82F6', // Blue
  },
  solid_cylinder: {
    id: 'solid_cylinder',
    nameTh: 'ทรงกระบอกตัน / จานกลม (Solid Cylinder / Disk)',
    nameEn: 'Solid Cylinder / Disk',
    beta: 1 / 2, // 0.5
    formulaLatex: '\\frac{1}{2}MR^2',
    descriptionTh: 'มวลกระจายสม่ำเสมอใน 2 มิติ รัศมีหมุน k = R / sqrt(2)',
    color: '#10B981', // Emerald
  },
  hollow_sphere: {
    id: 'hollow_sphere',
    nameTh: 'ทรงกลมกลวง / เปลือกทรงกลม (Spherical Shell)',
    nameEn: 'Hollow Sphere',
    beta: 2 / 3, // ~0.667
    formulaLatex: '\\frac{2}{3}MR^2',
    descriptionTh: 'มวลทั้งหมดอยู่ที่ผิวรัศมี R ช้ากว่าทรงกลมตันและจานกลม',
    color: '#F59E0B', // Amber
  },
  thin_hoop: {
    id: 'thin_hoop',
    nameTh: 'วงแหวนบาง / ทรงกระบอกกลวงบาง (Thin Hoop / Ring)',
    nameEn: 'Thin Hoop / Ring',
    beta: 1.0, // 1.0
    formulaLatex: 'MR^2',
    descriptionTh: 'มวลทั้งหมดอยู่ที่ขอบนอกสุด I มากที่สุดในทรงกลม/กระบอก กลิ้งช้าที่สุด',
    color: '#EC4899', // Pink
  },
  rod: {
    id: 'rod',
    nameTh: 'แท่งวัตถุหมุนรอบ CM (Uniform Thin Rod)',
    nameEn: 'Uniform Thin Rod',
    beta: 1 / 12, // approx wrt length L
    formulaLatex: '\\frac{1}{12}ML^2',
    descriptionTh: 'แท่งวัตถุตรง สม่ำเสมอ หมุนรอบแกนที่ตั้งฉากและผ่านจุดศูนย์กลางมวล',
    color: '#8B5CF6', // Purple
  },
  custom: {
    id: 'custom',
    nameTh: 'วัตถุกำหนดเอง (Custom Geometry)',
    nameEn: 'Custom Rigid Body',
    beta: 0.35,
    formulaLatex: '\\beta M R^2',
    descriptionTh: 'ปรับแต่งค่าสัมประสิทธิ์ความเฉื่อย beta (I / MR^2) ได้อย่างอิสระ',
    color: '#06B6D4', // Cyan
  },
};

export interface InclineSimulationParams {
  shape: RigidBodyShape;
  customBeta: number;
  mass: number; // kg
  radius: number; // m
  angleDeg: number; // degrees
  staticFriction: number; // mu_s
  kineticFriction: number; // mu_k
  gravity: number; // m/s^2
  inclineLength: number; // m
  initialVelocity: number; // m/s
  initialAngularVelocity: number; // rad/s
  isRaceMode: boolean; // compare multiple bodies side-by-side
}

export interface FlywheelSimulationParams {
  flywheelMass: number; // kg
  flywheelRadius: number; // m
  drumRadius: number; // m (where string is wound)
  hangingMass: number; // kg
  externalTorque: number; // N*m
  dampingCoeff: number; // N*m*s/rad
  gravity: number; // m/s^2
  shape: RigidBodyShape;
}

export interface CompoundPendulumParams {
  shape: 'rod' | 'disk' | 'ring' | 'plate';
  mass: number; // kg
  length: number; // m (or radius)
  pivotOffset: number; // d: distance from CM to pivot (m)
  dampingCoeff: number;
  gravity: number;
  initialAngleDeg: number;
}

export interface DzhanibekovParams {
  I1: number; // kg*m^2 (smallest)
  I2: number; // kg*m^2 (intermediate - unstable!)
  I3: number; // kg*m^2 (largest)
  omega1: number; // rad/s
  omega2: number; // rad/s
  omega3: number; // rad/s
}

export interface SimulationPreset {
  id: string;
  nameTh: string;
  nameEn: string;
  mode: SimulationMode;
  descriptionTh: string;
  apply: () => void;
}
