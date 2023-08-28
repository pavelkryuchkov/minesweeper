export const LEVELS = {
  0: 'easy',
  1: 'medium',
  2: 'hard',
};

export const BOARD_PARAMS = {
  [LEVELS[0]]: {
    width: 9,
    height: 9,
    bombsCount: 10,
  },
  [LEVELS[1]]: {
    width: 16,
    height: 16,
    bombsCount: 40,
  },
  [LEVELS[2]]: {
    width: 30,
    height: 16,
    bombsCount: 99,
  },
};

export const RESULTS_LENGTH = 5;
