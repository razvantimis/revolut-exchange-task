import { createSelector } from '@reduxjs/toolkit';
import { CurrencyType } from '../exchange/enum';
import type { RootState } from '../store';
import { Rates } from './types';

export function getRatesLogic(euroRate: Rates[CurrencyType.EUR]): Rates {
  const rates: Rates = {
    [CurrencyType.EUR]: euroRate,
    [CurrencyType.USD]: {
      [CurrencyType.USD]: 1,
      [CurrencyType.EUR]: 1 / euroRate.USD,
      [CurrencyType.GBP]: (1 / euroRate.USD) * euroRate.GBP,
    },
    [CurrencyType.GBP]: {
      [CurrencyType.GBP]: 1,
      [CurrencyType.EUR]: 1 / euroRate.GBP,
      [CurrencyType.USD]: (1 / euroRate.GBP) * euroRate.USD,
    },
  };

  return rates;
}

const getRates = createSelector(
  (state: RootState) => state.rates.baseRateEuro,
  (euroRate) => euroRate && getRatesLogic(euroRate),
);

export default getRates;
