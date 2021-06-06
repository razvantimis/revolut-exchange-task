import { CurrencyType } from '@app/state-management/exchange/enum';
import { FC } from 'react';
import {
  Container,
  RightPart,
} from './ExchangeCurrencyInfo.style';
import ExchangeCurrencyInputLeftPart from './ExchangeCurrencyInputLeftPart';

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
    <ExchangeCurrencyInputLeftPart
      balance={balance}
      currency={currency}
      onOpenCurrenyList={onOpenCurrenyList}
    />
    <RightPart>
      {children}
    </RightPart>
  </Container>
);

export default ExchangeCurrencyInput;
