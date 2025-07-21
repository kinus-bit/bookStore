import React from 'react';
import { Input } from '../ui/Input';

const QuantitySelector = ({ value, onChange }) => {
  return (
    <Input
      type="number"
      min="1"
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-20"
    />
  );
};

export default QuantitySelector;
