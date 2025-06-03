
/**
 * Story Scene Interface
 * Defines the structure for interactive story scenes
 */
export interface Scene {
  id: string;
  img: number;
  text: string;
  branch?: {
    A: string;
    B: string;
  };
  choiceA?: string;
  choiceB?: string;
}

export interface StoryState {
  currentScene: string;
  history: string[];
  isFinished: boolean;
}
