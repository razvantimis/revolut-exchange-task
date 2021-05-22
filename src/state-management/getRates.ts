import { CurrencyType } from './enum';

export type Rates = {
  [key in CurrencyType]: {
    [innerKey in CurrencyType]: number
  }
};

export default function getRates(euroRate: Rates[CurrencyType.EUR]): Rates {
  const rates: Rates = {
    [CurrencyType.EUR]: euroRate,
    [CurrencyType.USD]: {
      [CurrencyType.USD]: 1,
      [CurrencyType.EUR]: 1 / euroRate.USD,
      [CurrencyType.GPB]: (1 / euroRate.USD) * euroRate.GPB,
    },
    [CurrencyType.GPB]: {
      [CurrencyType.GPB]: 1,
      [CurrencyType.EUR]: 1 / euroRate.GPB,
      [CurrencyType.USD]: (1 / euroRate.GPB) * euroRate.USD,
    },
  };

  return rates;
}
