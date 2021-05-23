import { CurrencyType } from '../exchange/enum';
import { Rates } from './types';

export default function getRates(euroRate: Rates[CurrencyType.EUR]): Rates {
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
