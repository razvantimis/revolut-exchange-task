import { createSelector } from '@reduxjs/toolkit';
import { CurrencyType } from '../exchange/enum';
import type { RootState } from '../store';
import { Rates } from './types';

export function getRateBetweenFromAndToLogic(
  from: CurrencyType,
  to: CurrencyType,
  euroRates: Rates,
) {
  if (from === CurrencyType.EUR) {
    return euroRates[to];
  } if (to === CurrencyType.EUR) {
    const currencyToEuro = 1 / euroRates[from];
    return currencyToEuro;
  }
  // exemples
  // USD GBP => USD.EUR * EUR.GBP
  const currencyToEuro = 1 / euroRates[from];
  return currencyToEuro * euroRates[to];
}

const getRateBetweenFromAndTo = createSelector(
  (state: RootState) => state.rates.euroRates,
  (_: RootState, from: CurrencyType, to: CurrencyType) => ({ from, to }),
  (euroRates, currency) => euroRates
    && getRateBetweenFromAndToLogic(currency.from, currency.to, euroRates),
);

export default getRateBetweenFromAndTo;
