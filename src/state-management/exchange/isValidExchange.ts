import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { getSellAndBuyTransaction, isExchangeValid } from './exchangeTransaction';

const isValidExchange = createSelector(
  (state: RootState) => state.rates.rates,
  (state: RootState) => state.wallets,
  (state: RootState) => state.exchange,
  (rates, wallets, {
    currencyFrom,
    currencyTo,
    valueFrom,
    exchangeType,
  }) => {
    if (!rates) return false;

    const valueFromFloat = parseFloat(valueFrom);
    const transactions = getSellAndBuyTransaction(
      exchangeType,
      currencyFrom,
      currencyTo,
      valueFromFloat,
      rates!,
    );
    const isValid = isExchangeValid(transactions, wallets);

    return isValid;
  },
);

export default isValidExchange;
