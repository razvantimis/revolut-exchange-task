import React, { FC } from 'react';
import { Input } from './NumberInput.style';
import NUMBER_INPUT_PATTERN from './pattern';

export type Props = {
  value: string;
  onChange: (value: string) => void;
};
const NumberInput: FC<Props> = ({ value, onChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: nextValue } = event.currentTarget;
    const match = nextValue.match(NUMBER_INPUT_PATTERN);
    if (match) {
      onChange(nextValue);
    }
  };

  return (
    <Input
      data-testid="input"
      type="number"
      min="0"
      value={value}
      onChange={handleInputChange}
    />
  );
};

export default NumberInput;
