import { CurrencyType } from '../exchange/enum';
import { Rates } from '../rates/types';

export function getMockEuroRate(rate?: number): Rates {
  return {
    [CurrencyType.EUR]: rate ?? 1,
    [CurrencyType.USD]: rate ?? 1.2188,
    [CurrencyType.GBP]: rate ?? 0.85870,
    [CurrencyType.RON]: rate ?? 4.9,
    [CurrencyType.CAD]: rate ?? 1.47,
  };
}

export function getMockWallet(money?: number): Rates {
  return {
    [CurrencyType.EUR]: money ?? 100,
    [CurrencyType.USD]: money ?? 100,
    [CurrencyType.GBP]: money ?? 100,
    [CurrencyType.RON]: money ?? 100,
    [CurrencyType.CAD]: money ?? 100,
  };
}
