import { CurrencyType } from '../enum';
import getRates from '../rates/getRates';
import { Rates } from '../rates/types';

describe('State operation => getRates', () => {
  const euroRate: Rates[CurrencyType.EUR] = {
    [CurrencyType.EUR]: 1,
    [CurrencyType.USD]: 1.2188,
    [CurrencyType.GBP]: 0.85870,
  };
  it('should computed rate from all currency by euroRate', () => {
    const rates = getRates(euroRate);

    expect(rates).toEqual({
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
    });
  });
});
