// src/types/student.ts

export interface ProblemState {
  unlockedHintTiers: (1 | 2 | 3)[];
  isSolutionRevealed: boolean;
  isSelfCheckCompleted: boolean;
  selectedOptionIndex?: number;
  isMarkedMastered: boolean;
  lastAttemptedAt: string; // ISO 8601
}

export interface UserProgressState {
  completedLessonSlugs: string[];
  bookmarkedDerivationIds: string[];
  problemProgress: Record<string, ProblemState>;
  currentStreakDays: number;
  lastActiveDate: string;
  themePreference: 'oled_black' | 'dark_slate';
  fontSizeScale: 'normal' | 'large';
}
