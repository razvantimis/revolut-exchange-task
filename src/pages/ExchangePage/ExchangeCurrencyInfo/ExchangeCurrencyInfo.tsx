import { CurrencyType } from '@app/state-management/enum';
import { FC } from 'react';
import {
  ArrowDown,
  Container,
  CurrencyContainer,
  CurrencyText,
  LeftPart,
  RightPart,
  BalanceText,
} from './ExchangeCurrencyInfo.style';
import { getCurrencySymbol } from './utils';

export type Props = {
  className?: string;
  currency: CurrencyType,
  balance: number;
  onOpenCurrenyList: () => void;
};
const ExchangeCurrencyInput: FC<Props> = ({
  currency,
  balance,
  className,
  children,
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
      {children}
    </RightPart>
  </Container>
);

export default ExchangeCurrencyInput;
