import type { Board, Color } from './types'; // Explicit type import

export const COLORS: Color[] = ['red','blue','green','yellow','purple','orange','pink','cyan','gray'];

export const createEmptyBoard = (): Board => 
  Array(9).fill(null).map(() => Array(9).fill(null));

  export const isValidPlacement = (board: Board, row: number, col: number, color: Color): boolean => {
    // Check row (excluding current cell)
    for (let i = 0; i < 9; i++) {
      if (i !== col && board[row][i] === color) return false;
    }
  
    // Check column (excluding current cell)
    for (let i = 0; i < 9; i++) {
      if (i !== row && board[i][col] === color) return false;
    }
  
    // Check 3x3 box (excluding current cell)
    const boxStartRow = Math.floor(row / 3) * 3;
    const boxStartCol = Math.floor(col / 3) * 3;
    
    for (let i = boxStartRow; i < boxStartRow + 3; i++) {
      for (let j = boxStartCol; j < boxStartCol + 3; j++) {
        if (i !== row && j !== col && board[i][j] === color) return false;
      }
    }
  
    return true;
  };