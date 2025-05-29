export type Difficulty = 'easy' | 'medium' | 'hard';

export const GAME_CONFIG = {
  easy:   { interval: 1000, points: 10 },
  medium: { interval:   750, points: 20 },
  hard:   { interval:   500, points: 30 },
  legend:   { interval:   400, points: 50 }
};

// Helper
export const DIFFICULTY_LIST: readonly Difficulty[] =
  Object.keys(GAME_CONFIG) as Difficulty[];

export const CELLS_COUNT = 9;