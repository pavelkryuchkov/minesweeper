import {
  addBombs,
  checkGameStatus,
  copyField,
  createEmptyField,
  getNeighbors,
  openCell,
  openCellsAround,
} from './helpers';
import { LEVELS, BOARD_PARAMS } from '../constants.js';

const DEFAULT_LEVEL = LEVELS[0];
const defaultState = {
  field: createEmptyField(
    BOARD_PARAMS[DEFAULT_LEVEL].width,
    BOARD_PARAMS[DEFAULT_LEVEL].height
  ),
  level: DEFAULT_LEVEL,
  flagsCount: 0,
  isGameStarted: false,
  isGameWon: false,
  isGameLost: false,
};

export const initializer = () => {
  const savedState = JSON.parse(localStorage.getItem('boardState'));
  if (savedState && (savedState.isGameLost || savedState.isGameWon)) {
    return {
      ...savedState,
      field: createEmptyField(
        BOARD_PARAMS[savedState.level].width,
        BOARD_PARAMS[savedState.level].height
      ),
      flagsCount: 0,
      isGameStarted: false,
      isGameWon: false,
      isGameLost: false,
    };
  }
  return savedState || defaultState;
};

export function boardStateReducer(boardState, action) {
  switch (action.type) {
    case 'start_new_game': {
      return {
        ...boardState,
        field: createEmptyField(
          BOARD_PARAMS[boardState.level].width,
          BOARD_PARAMS[boardState.level].height
        ),
        flagsCount: 0,
        isGameStarted: false,
        isGameWon: false,
        isGameLost: false,
      };
    }
    case 'change_game_level': {
      if (boardState.level !== action.level) {
        return {
          field: createEmptyField(
            BOARD_PARAMS[action.level].width,
            BOARD_PARAMS[action.level].height
          ),
          level: action.level,
          flagsCount: 0,
          isGameStarted: false,
          isGameWon: false,
          isGameLost: false,
        };
      } else {
        return boardState;
      }
    }
    case 'open_cell': {
      const cell = boardState.field[action.row][action.col];
      if (
        cell.isFlagged ||
        cell.isOpen ||
        boardState.isGameLost ||
        boardState.isGameWon
      ) {
        return boardState;
      }
      let newField = boardState.field;
      if (!boardState.isGameStarted) {
        newField = addBombs(
          newField,
          BOARD_PARAMS[boardState.level].bombsCount,
          [action.row, action.col]
        );
      }
      newField = openCell(newField, action.row, action.col);
      const status = checkGameStatus(newField);
      let isGameLost = boardState.isGameLost;
      let isGameWon = boardState.isGameWon;
      if (status === 'lost') {
        isGameLost = true;
      } else if (status === 'won') {
        isGameWon = true;
      }
      return {
        ...boardState,
        field: newField,
        isGameStarted: true,
        isGameLost,
        isGameWon,
      };
    }
    case 'open_cells_around': {
      const cell = boardState.field[action.row][action.col];
      if (!cell.isOpen || boardState.isGameLost || boardState.isGameWon) {
        return boardState;
      }
      const newField = openCellsAround(
        boardState.field,
        action.row,
        action.col
      );
      const status = checkGameStatus(newField);
      let isGameLost = boardState.isGameLost;
      let isGameWon = boardState.isGameWon;
      if (status === 'lost') {
        isGameLost = true;
      } else if (status === 'won') {
        isGameWon = true;
      }
      return {
        ...boardState,
        field: newField,
        isGameLost,
        isGameWon,
      };
    }
    case 'put_flag': {
      const cell = boardState.field[action.row][action.col];
      if (cell.isOpen || boardState.isGameLost || boardState.isGameWon) {
        return boardState;
      }
      const newField = copyField(boardState.field);
      newField[action.row][action.col].isFlagged =
        !newField[action.row][action.col].isFlagged;
      let flagsCount = boardState.flagsCount;
      if (newField[action.row][action.col].isFlagged) {
        flagsCount += 1;
      } else {
        flagsCount -= 1;
      }
      return {
        ...boardState,
        field: newField,
        flagsCount,
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export const startNewGameAction = () => ({
  type: 'start_new_game',
});

export const changeLevelAction = (level) => ({
  type: 'change_game_level',
  level,
});

export const openCellAction = (row, col) => ({
  type: 'open_cell',
  row,
  col,
});

export const openCellsAroundAction = (row, col) => ({
  type: 'open_cells_around',
  row,
  col,
});

export const putFlagAction = (row, col) => ({
  type: 'put_flag',
  row,
  col,
});
