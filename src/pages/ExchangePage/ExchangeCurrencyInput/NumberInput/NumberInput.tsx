import React, { FC } from 'react';
import { Input } from './NumberInput.style';
import NUMBER_INPUT_PATTERN from './pattern';

export type Props = {
  value: number;
  onChange: (value: number) => void;
};
const NumberInput: FC<Props> = ({ value, onChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: nextValue } = event.currentTarget;
    const match = nextValue.match(NUMBER_INPUT_PATTERN);
    if (match) {
      onChange(parseFloat(nextValue));
    }
  };

  return (
    <Input
      data-testid="input"
      value={value}
      onChange={handleInputChange}
    />
  );
};

export default NumberInput;
