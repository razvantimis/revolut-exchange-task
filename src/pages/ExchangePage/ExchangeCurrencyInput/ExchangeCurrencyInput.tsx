import { CurrencyType } from '@app/state-management/enum';
import React, { FC } from 'react';
import {
  ArrowDown,
  Container,
  CurrencyContainer,
  CurrencyText,
  LeftPart,
  RightPart,
  BalanceText,
} from './ExchangeCurrencyInput.style';
import NumberInput from './NumberInput';
import { getCurrencySymbol } from './utils';

export type Props = {
  className?: string;
  currency: CurrencyType,
  balance: number;
  inputValue: number;
  onInputChange: (value: number) => void;
  onOpenCurrenyList: () => void;
};
const ExchangeCurrencyInput: FC<Props> = ({
  currency,
  balance,
  className,
  inputValue,
  onInputChange,
  onOpenCurrenyList,
}) => (
  <Container className={className}>
    <LeftPart>
      <CurrencyContainer>
        <CurrencyText data-testid="currency-text">{currency.toString()}</CurrencyText>
        <ArrowDown data-testid="arrow" onClick={onOpenCurrenyList} />
      </CurrencyContainer>
      <BalanceText data-testid="balance">
        Balance:
        {' '}
        {getCurrencySymbol(currency)}
        {balance}
      </BalanceText>
    </LeftPart>
    <RightPart>
      <NumberInput
        value={inputValue}
        onChange={onInputChange}
      />
    </RightPart>
  </Container>
);

export default ExchangeCurrencyInput;
