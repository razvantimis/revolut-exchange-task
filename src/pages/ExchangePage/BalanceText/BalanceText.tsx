import { CurrencyType } from '@app/state-management/exchange/enum';
import getCurrencySymbol from '@app/utils/getCurrencySymbol';
import { FC } from 'react';
import { BalanceTextContainer } from './BalanceText.style';

type Props = {
  currency: CurrencyType;
  balance: number
};

const BalanceText: FC<Props> = ({ currency, balance }) => (
  <BalanceTextContainer data-testid="balance">
    Balance:
    {' '}
    {getCurrencySymbol(currency)}
    {balance.toFixed(2)}
  </BalanceTextContainer>
);

export default BalanceText;
