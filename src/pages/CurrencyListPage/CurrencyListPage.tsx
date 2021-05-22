import { CurrencyType } from "@app/state-management/enum";
import { useSelector } from 'react-redux';
import React, { FC } from "react";
import { RootState } from "@app/state-management/store";
import { WalletsState } from "@app/state-management/walletsSlice";
import getCurrencySymbol from "@app/utils/getCurrencySymbol";
import {
  CurrencyBalance,
  CurrencyItem,
  CurrencyListContainer,
  CurrencyTitle
} from "./CurrencyListPage.style";

export type Props = {
  currencyList: CurrencyType[],
  onSelectCurrency: (selectedCurrency: CurrencyType) => void;
}

const CurrencyListPage: FC<Props> = ({ currencyList, onSelectCurrency }) => {
  const wallets = useSelector<RootState, WalletsState>((state) => state.wallets);

  return (
    <CurrencyListContainer data-testid="currency-list">
      {currencyList.map(currencyItem => (
        <CurrencyItem key={currencyItem + wallets[currencyItem]} onClick={() => onSelectCurrency(currencyItem)}>
          <CurrencyTitle>{currencyItem}</CurrencyTitle>
          <CurrencyBalance>Balance: {getCurrencySymbol(currencyItem)}{wallets[currencyItem]}</CurrencyBalance>
        </CurrencyItem>
      ))}
    </CurrencyListContainer>
  )
}

export default CurrencyListPage;