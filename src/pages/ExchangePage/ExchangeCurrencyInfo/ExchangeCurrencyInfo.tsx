import { CurrencyType } from '@app/state-management/exchange/enum';
import { FC } from 'react';
import getCurrencySymbol from '@app/utils/getCurrencySymbol';
import {
  ArrowDown,
  Container,
  CurrencyContainer,
  CurrencyText,
  LeftPart,
  RightPart,
  BalanceText,
} from './ExchangeCurrencyInfo.style';

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
        {balance.toFixed(2)}
      </BalanceText>
    </LeftPart>
    <RightPart>
      {children}
    </RightPart>
  </Container>
);

export default ExchangeCurrencyInput;
