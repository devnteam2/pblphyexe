// src/types/curriculum.ts

export type CurriculumTrack = 'pre-camp-1' | 'camp-1-2';

export type TopicId =
  | 'pre-mechanics'
  | 'pre-fluids-thermo'
  | 'pre-em'
  | 'pre-optics'
  | 'pre-waves'
  | 'math-tools'
  | 'kinematics-calculus'
  | 'newton-constraints'
  | 'momentum-variable-mass'
  | 'work-energy-potentials'
  | 'rotation-dynamics'
  | 'non-inertial-central-force'
  | 'shm-differential-eq';

export type DifficultyLevel = 'PreCamp1_Entrance' | 'Camp1_Foundation' | 'Camp1_Advanced' | 'Camp2_Core';

export interface PhysicalAssumption {
  id: string;
  descriptionTh: string; // e.g. "เชือกเบา ไม่ยืดหยุ่น (Massless, inextensible string)"
  significanceTh: string;  // e.g. "ทำให้แรงตึงเชือก T สม่ำเสมอตลอดทั้งเส้น"
}

export interface IntermediateAnnotation {
  symbol: string;
  meaningTh: string;
}

export interface DerivationStep {
  stepNumber: number;
  titleTh: string;               // e.g. "ตั้งสมการอนุพันธ์อันดับสอง"
  latexMath: string;             // e.g. "m\\frac{d^2x}{dt^2} + kx = 0"
  physicalIntuitionTh: string;   // Deep explanation of physical reasoning
  mathOperationTh?: string;      // Specific technique (e.g. "คูณด้วย dx/dt ทั้งสองข้างเพื่อ integrate")
  intermediateAnnotations?: IntermediateAnnotation[];
  isCrucialLeap?: boolean;       // Highlights steps where students commonly stumble
}

export interface DerivationBlock {
  id: string;
  topicId: TopicId;
  titleTh: string;
  objectiveTh: string;
  startingAssumptions: PhysicalAssumption[];
  steps: DerivationStep[];
  finalResultLatex: string;
  takeawayTh: string;
}

export interface Lesson {
  id: string;
  slug: string;
  topicId: TopicId;
  order: number;
  titleTh: string;
  summaryTh: string;
  readTimeMinutes: number;
  theoryMarkdownTh: string;
  derivations: DerivationBlock[];
  relatedProblemIds: string[];
}

export interface Topic {
  id: TopicId;
  track: CurriculumTrack;
  titleTh: string;
  subtitleTh: string;
  iconName: string;
  colorAccent: string;
  descriptionTh: string;
  lessons: Lesson[];
}
