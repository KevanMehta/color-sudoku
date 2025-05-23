import { Color } from '../backend/types';

type CellProps = {
    color: Color | null;
    isInitial: boolean;
    onClick: () => void;
    isSelected: boolean;
    isInvalid?: boolean; // New prop
  };

  export const SudokuCell = ({ 
    color, 
    isInitial, 
    onClick,
    isInvalid 
  }: CellProps) => (
    <button
      onClick={onClick}
      style={{ 
        backgroundColor: color || 'white',
        border: `2px solid ${isInvalid ? 'red' : '#ccc'}`,
        width: '40px',
        height: '40px',
        cursor: isInitial ? 'not-allowed' : 'pointer',
      }}
      disabled={isInitial}
    />
  );