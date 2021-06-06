import { CurrencyType } from '@app/state-management/exchange/enum';
import { FC, memo } from 'react';
import BalanceText from '../BalanceText';
import {
  ArrowDown,
  CurrencyContainer,
  CurrencyText,
  LeftPart,
} from './ExchangeCurrencyInfo.style';

export type Props = {
  currency: CurrencyType,
  balance: number;
  onOpenCurrenyList: () => void;
};
const ExchangeCurrencyInputLeftPart: FC<Props> = ({
  currency,
  balance,
  onOpenCurrenyList,
}) => (
  <LeftPart>
    <CurrencyContainer>
      <CurrencyText data-testid="currency-text">{currency.toString()}</CurrencyText>
      <ArrowDown data-testid="arrow" onClick={onOpenCurrenyList} />
    </CurrencyContainer>
    <BalanceText
      currency={currency}
      balance={balance}
    />
  </LeftPart>

);

export default memo(ExchangeCurrencyInputLeftPart);
