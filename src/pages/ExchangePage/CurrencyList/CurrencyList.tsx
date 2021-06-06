import { CurrencyType } from '@app/state-management/exchange/enum';
import { FC, memo } from 'react';
import { WalletsState } from '@app/state-management/walletsSlice';
import {
  CurrencyItem,
  CurrencyListContainer,
  CurrencyTitle,
} from './CurrencyList.style';
import BalanceText from '../BalanceText';

export type Props = {
  currencyList: CurrencyType[],
  wallets: WalletsState;
  onSelectCurrency: (selectedCurrency: CurrencyType) => void;
};

const CurrencyList: FC<Props> = ({ currencyList, wallets, onSelectCurrency }) => (
  <CurrencyListContainer data-testid="currency-list">
    {currencyList.map((currencyItem) => (
      <CurrencyItem
        key={currencyItem}
        onClick={() => onSelectCurrency(currencyItem)}
      >
        <CurrencyTitle>{currencyItem}</CurrencyTitle>
        <BalanceText currency={currencyItem} balance={wallets[currencyItem] ?? 0} />
      </CurrencyItem>
    ))}
  </CurrencyListContainer>
);

export default memo(CurrencyList);
