import { Color, COLORS } from '../backend';

type PickerProps = {
  onSelect: (color: Color) => void;
};

export const ColorPicker = ({ onSelect }: PickerProps) => (
  <div style={{ display: 'flex', gap: '8px' }}>
    {COLORS.map(color => (
      <button
        key={color}
        onClick={() => onSelect(color)}
        style={{ backgroundColor: color, width: '30px', height: '30px' }}
      />
    ))}
  </div>
);