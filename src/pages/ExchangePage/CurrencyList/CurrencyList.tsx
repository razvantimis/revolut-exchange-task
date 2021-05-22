import { CurrencyType } from '@app/state-management/enum';
import { FC } from 'react';
import { WalletsState } from '@app/state-management/walletsSlice';
import getCurrencySymbol from '@app/utils/getCurrencySymbol';
import {
  CurrencyBalance,
  CurrencyItem,
  CurrencyListContainer,
  CurrencyTitle,
} from './CurrencyList.style';

export type Props = {
  currencyList: CurrencyType[],
  wallets: WalletsState;
  onSelectCurrency: (selectedCurrency: CurrencyType) => void;
};

const CurrencyList: FC<Props> = ({ currencyList, wallets, onSelectCurrency }) => (
  <CurrencyListContainer data-testid="currency-list">
    {currencyList.map((currencyItem) => (
      <CurrencyItem
        key={currencyItem + wallets[currencyItem]}
        onClick={() => onSelectCurrency(currencyItem)}
      >
        <CurrencyTitle>{currencyItem}</CurrencyTitle>
        <CurrencyBalance>
          Balance:
          {' '}
          {getCurrencySymbol(currencyItem)}
          {wallets[currencyItem]}
        </CurrencyBalance>
      </CurrencyItem>
    ))}
  </CurrencyListContainer>
);

export default CurrencyList;
