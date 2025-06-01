
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface InvestmentGameState {
  // プレイヤーの状態
  totalMoney: number;
  currentWeek: number;
  completedWeeks: number[];
  
  // Week1の状態
  week1Money: number;
  week1Completed: boolean;
  week1Choices: Array<{
    choice: 'save' | 'invest';
    result: number;
    timestamp: number;
  }>;
  
  // 将来のWeek用スロット (Week2以降用)
  weekData: Record<number, any>;
  
  // アクション
  setTotalMoney: (amount: number) => void;
  setWeek1Money: (amount: number) => void;
  addWeek1Choice: (choice: 'save' | 'invest', result: number) => void;
  completeWeek1: () => void;
  resetWeek1: () => void;
  resetGame: () => void;
  
  // 汎用Week管理
  completeWeek: (weekNumber: number, data?: any) => void;
  setWeekData: (weekNumber: number, data: any) => void;
}

export const useInvestmentGameStore = create<InvestmentGameState>()(
  persist(
    (set, get) => ({
      // 初期状態
      totalMoney: 10000,
      currentWeek: 1,
      completedWeeks: [],
      week1Money: 1000,
      week1Completed: false,
      week1Choices: [],
      weekData: {},
      
      // アクション
      setTotalMoney: (amount) => set({ totalMoney: amount }),
      
      setWeek1Money: (amount) => set({ week1Money: amount }),
      
      addWeek1Choice: (choice, result) => {
        const state = get();
        set({
          week1Choices: [
            ...state.week1Choices,
            {
              choice,
              result,
              timestamp: Date.now()
            }
          ]
        });
      },
      
      completeWeek1: () => {
        const state = get();
        set({
          week1Completed: true,
          completedWeeks: [...state.completedWeeks, 1],
          totalMoney: state.totalMoney + (state.week1Money - 1000) // 初期額からの差分を総資産に反映
        });
      },
      
      resetWeek1: () => set({
        week1Money: 1000,
        week1Choices: []
      }),
      
      resetGame: () => set({
        totalMoney: 10000,
        currentWeek: 1,
        completedWeeks: [],
        week1Money: 1000,
        week1Completed: false,
        week1Choices: [],
        weekData: {}
      }),
      
      // 汎用Week管理 (Week2以降で使用)
      completeWeek: (weekNumber, data) => {
        const state = get();
        set({
          completedWeeks: [...state.completedWeeks.filter(w => w !== weekNumber), weekNumber],
          weekData: { ...state.weekData, [weekNumber]: data }
        });
      },
      
      setWeekData: (weekNumber, data) => {
        const state = get();
        set({
          weekData: { ...state.weekData, [weekNumber]: data }
        });
      }
    }),
    {
      name: 'investment-game-storage',
      version: 1
    }
  )
);
