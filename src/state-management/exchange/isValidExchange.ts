import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { getSellAndBuyTransaction, isExchangeValid } from './exchangeTransaction';

const isValidExchange = createSelector(
  (state: RootState) => state.rates.euroRates,
  (state: RootState) => state.wallets,
  (state: RootState) => state.exchange,
  (baseRateEuro, wallets, {
    currencyFrom,
    currencyTo,
    valueFrom,
    exchangeType,
  }) => {
    if (!baseRateEuro) return false;

    const valueFromFloat = parseFloat(valueFrom);
    const transactions = getSellAndBuyTransaction(
      exchangeType,
      currencyFrom,
      currencyTo,
      valueFromFloat,
      baseRateEuro!,
    );
    const isValid = isExchangeValid(transactions, wallets);

    return isValid;
  },
);

export default isValidExchange;
