import { CurrencyType } from '../enum';
import getRates, { Rates } from '../getRates';

describe('State operation => getRates', () => {
  const euroRate: Rates[CurrencyType.EUR] = {
    [CurrencyType.EUR]: 1,
    [CurrencyType.USD]: 1.2188,
    [CurrencyType.GPB]: 0.85870,
  };
  it('should computed rate from all currency by euroRate', () => {
    const rates = getRates(euroRate);

    expect(rates).toEqual({
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
    });
  });
});
