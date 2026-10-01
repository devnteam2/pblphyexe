// src/types/problem.ts
import { TopicId, DifficultyLevel } from './curriculum';

export interface ProblemHint {
  tier: 1 | 2 | 3;
  type: 'physical_model' | 'governing_equations' | 'mathematical_trick';
  titleTh: string;
  contentTh: string;
  latexSnippets?: string[];
  diagramDescriptionTh?: string;
}

export interface SolutionStep {
  stepNumber: number;
  stepTitleTh: string;
  latexMath: string;
  explanationTh: string;
  keyWarningTh?: string;
}

export interface SelfCheckQuestion {
  id: string;
  promptTh: string;
  promptLatex?: string;
  optionsTh: string[];
  correctOptionIndex: number;
  explanationTh: string;
}

export interface POSNProblem {
  id: string;
  code: string;                  // e.g. "POSN-C1-2564-P03"
  sourceExam: string;            // e.g. "สอวน. ฟิสิกส์ ค่าย 1 รอบคัดเลือก พ.ศ. 2564"
  topicId: TopicId;
  difficulty: DifficultyLevel;
  titleTh: string;
  statementTh: string;
  statementLatex?: string;
  hints: [ProblemHint, ProblemHint, ProblemHint]; // Strictly enforces 3-tier scaffolding
  fullSolution: {
    approachOverviewTh: string;
    coordinateSystemSetupTh: string;
    steps: SolutionStep[];
    finalAnswerLatex: string;
    examTrapWarningTh?: string;
  };
  selfCheck: SelfCheckQuestion;
}
