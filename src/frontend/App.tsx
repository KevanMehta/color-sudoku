import { useState } from 'react';
import { SudokuCell } from './SudokuCell';
import { ColorPicker } from './ColorPicker';

import { 
    Board, 
    Color, 
    createEmptyBoard, 
    solveBoard, 
    isValidPlacement, // Now properly imported
  } from '../backend'; 

export default function SudokuGame() {
    const [board, setBoard] = useState<Board>(createEmptyBoard());
    const [selectedColor, setSelectedColor] = useState<Color>('red');
    const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
    
    // Pre-filled initial board
    const [initialBoard] = useState<Board>(() => {
      const board = createEmptyBoard();
      board[0][0] = 'red';
      board[4][4] = 'blue';
      return board;
    });
  
    const handleReset = () => {
        setBoard(prev => {
          const newBoard = createEmptyBoard();
          return newBoard;
        });
        setSelectedColor('red'); // Optional: reset color picker
      };

    // Fixed cell click handler
    const handleCellClick = (row: number, col: number) => {
        if (initialBoard[row][col] !== null) return; // Ignore pre-filled cells
      
        setBoard(prev => {
          const newBoard = prev.map(r => [...r]);
          const currentColor = prev[row][col];
          
          // Toggle or validate new color
          if (currentColor === selectedColor) {
            newBoard[row][col] = null; // Clear cell if same color clicked
          } 
          else if (isValidPlacement(prev, row, col, selectedColor)) {
            newBoard[row][col] = selectedColor; // Set valid color
          }
          // Else do nothing (invalid move)
          
          return newBoard;
        });
      };
  
    // Render cells with selection state
    const renderCell = (rowIdx: number, colIdx: number) => {
      const isSelected = selectedCell?.[0] === rowIdx && selectedCell?.[1] === colIdx;
      const isInvalid = board[rowIdx][colIdx] === selectedColor && 
    !isValidPlacement(board, rowIdx, colIdx, selectedColor);

      return (
        <SudokuCell
          key={`${rowIdx}-${colIdx}`}
          color={board[rowIdx][colIdx]}
          isInitial={initialBoard[rowIdx][colIdx] !== null}
          onClick={() => handleCellClick(rowIdx, colIdx)}
          isSelected={isSelected}
          isInvalid={isInvalid}
        />
      );
    };
  
    return (
      <div style={{ padding: '20px' }}>
        <h1>Color Sudoku</h1>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(9, 40px)',
          gap: '2px',
          marginBottom: '20px'
        }}>
          {board.map((row, rowIdx) => 
            row.map((_, colIdx) => renderCell(rowIdx, colIdx))
          )}
        </div>
        <ColorPicker onSelect={setSelectedColor} />
        <button 
          onClick={() => {
            const boardCopy = board.map(row => [...row]);
            solveBoard(boardCopy);
            setBoard(boardCopy);
          }}
          style={{ marginTop: '10px' }}
        >
          Solve
        </button>
        <button onClick={handleReset}>Reset Board</button>
      </div>
      
    );
  }