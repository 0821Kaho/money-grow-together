
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
  completedModules: number[];
  currentModule: number;
  storyCompleted: boolean;
  
  // Actions
  completeModule: (moduleId: number) => void;
  setCurrentModule: (moduleId: number) => void;
  completeStory: () => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedModules: [],
      currentModule: 1,
      storyCompleted: false,
      
      completeModule: (moduleId) => {
        const { completedModules } = get();
        if (!completedModules.includes(moduleId)) {
          set({ 
            completedModules: [...completedModules, moduleId],
            currentModule: Math.max(moduleId + 1, get().currentModule)
          });
        }
      },
      
      setCurrentModule: (moduleId) => set({ currentModule: moduleId }),
      
      completeStory: () => set({ storyCompleted: true }),
      
      resetProgress: () => set({ 
        completedModules: [], 
        currentModule: 1, 
        storyCompleted: false 
      })
    }),
    {
      name: 'progress-storage',
      version: 1
    }
  )
);
