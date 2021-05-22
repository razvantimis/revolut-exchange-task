import { CurrencyType } from '@app/store/enum';
import { FC } from 'react';
import {
  ArrowDown,
  Container,
  CurrencyContainer,
  CurrencyText,
  LeftPart,
  RightPart,
  BalanceText,
} from './ExchangeCurrencyInput.style';
import { getCurrencySymbol } from './utils';

export type Props = {
  currency: CurrencyType,
  balance: number;
  onOpenCurrenyList: () => void;
};
const ExchangeCurrencyInput: FC<Props> = ({
  currency,
  balance,
  onOpenCurrenyList,
}) => (
  <Container>
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
    <RightPart />
  </Container>
);

export default ExchangeCurrencyInput;
