import type { Board } from './types';
import { isValidPlacement, COLORS } from './utils';


export const solveBoard = (board: Board): boolean => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === null) {
          for (const color of COLORS) {
            if (isValidPlacement(board, row, col, color)) {
              board[row][col] = color;
              if (solveBoard(board)) return true;
              board[row][col] = null;
            }
          }
          return false;
        }
      }
    }
    return true;
  };