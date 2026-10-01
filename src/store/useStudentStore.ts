// src/store/useStudentStore.ts
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserProgressState, ProblemState } from '@/types/student';

interface StudentStoreState extends UserProgressState {
  isHydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
  toggleLessonCompletion: (slug: string) => void;
  toggleDerivationBookmark: (derivationId: string) => void;
  unlockHintTier: (problemId: string, tier: 1 | 2 | 3) => void;
  revealSolution: (problemId: string) => void;
  recordSelfCheck: (problemId: string, selectedIndex: number, isCorrect: boolean) => void;
  toggleProblemMastery: (problemId: string) => void;
  setThemePreference: (theme: 'archival_paper' | 'slate_blackboard') => void;
  setFontSizeScale: (scale: 'normal' | 'large') => void;
  resetProgress: () => void;
}

const initialDefaultProblemState: ProblemState = {
  unlockedHintTiers: [],
  isSolutionRevealed: false,
  isSelfCheckCompleted: false,
  isMarkedMastered: false,
  lastAttemptedAt: new Date().toISOString(),
};

export const useStudentStore = create<StudentStoreState>()(
  persist(
    (set, get) => ({
      completedLessonSlugs: [],
      bookmarkedDerivationIds: [],
      problemProgress: {},
      currentStreakDays: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      themePreference: 'archival_paper',
      fontSizeScale: 'normal',
      isHydrated: false,

      setHydrated: (hydrated) => set({ isHydrated: hydrated }),

      toggleLessonCompletion: (slug) => {
        const completed = get().completedLessonSlugs;
        const exists = completed.includes(slug);
        const updated = exists
          ? completed.filter((s) => s !== slug)
          : [...completed, slug];
        set({ completedLessonSlugs: updated });
      },

      toggleDerivationBookmark: (derivationId) => {
        const bookmarks = get().bookmarkedDerivationIds;
        const exists = bookmarks.includes(derivationId);
        const updated = exists
          ? bookmarks.filter((id) => id !== derivationId)
          : [...bookmarks, derivationId];
        set({ bookmarkedDerivationIds: updated });
      },

      unlockHintTier: (problemId, tier) => {
        const current = get().problemProgress[problemId] || { ...initialDefaultProblemState };
        if (!current.unlockedHintTiers.includes(tier)) {
          const updatedTiers = [...current.unlockedHintTiers, tier].sort() as (1 | 2 | 3)[];
          set((state) => ({
            problemProgress: {
              ...state.problemProgress,
              [problemId]: {
                ...current,
                unlockedHintTiers: updatedTiers,
                lastAttemptedAt: new Date().toISOString(),
              },
            },
          }));
        }
      },

      revealSolution: (problemId) => {
        const current = get().problemProgress[problemId] || { ...initialDefaultProblemState };
        set((state) => ({
          problemProgress: {
            ...state.problemProgress,
            [problemId]: {
              ...current,
              isSolutionRevealed: true,
              lastAttemptedAt: new Date().toISOString(),
            },
          },
        }));
      },

      recordSelfCheck: (problemId, selectedIndex, isCorrect) => {
        const current = get().problemProgress[problemId] || { ...initialDefaultProblemState };
        set((state) => ({
          problemProgress: {
            ...state.problemProgress,
            [problemId]: {
              ...current,
              isSelfCheckCompleted: true,
              selectedOptionIndex: selectedIndex,
              isMarkedMastered: isCorrect || current.isMarkedMastered,
              lastAttemptedAt: new Date().toISOString(),
            },
          },
        }));
      },

      toggleProblemMastery: (problemId) => {
        const current = get().problemProgress[problemId] || { ...initialDefaultProblemState };
        set((state) => ({
          problemProgress: {
            ...state.problemProgress,
            [problemId]: {
              ...current,
              isMarkedMastered: !current.isMarkedMastered,
              lastAttemptedAt: new Date().toISOString(),
            },
          },
        }));
      },

      setThemePreference: (theme) => set({ themePreference: theme }),
      setFontSizeScale: (scale) => set({ fontSizeScale: scale }),

      resetProgress: () =>
        set({
          completedLessonSlugs: [],
          bookmarkedDerivationIds: [],
          problemProgress: {},
          currentStreakDays: 1,
        }),
    }),
    {
      name: 'openposn-student-progress-v1',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
          return localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
