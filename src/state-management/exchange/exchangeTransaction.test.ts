import getRates from '../rates/getRates';
import { RootState } from '../store';
import { CurrencyType, ExchangeType } from './enum';
import { exchangeTransactionLogic } from './exchangeTransaction';

type ThunckApiArgs = {
  from: CurrencyType,
  to: CurrencyType,
  value: string,
  rate: number,
  type: ExchangeType
};

describe('async action exchangeTransaction', () => {
  const getThunkApiMock = ({
    from,
    to,
    value,
    rate,
    type,
  }: ThunckApiArgs) => {
    const baseRateEuro = {
      [CurrencyType.EUR]: 1,
      [CurrencyType.USD]: 1.2188,
      [CurrencyType.GBP]: 0.85870,
    };
    const rates = getRates(baseRateEuro);

    rates[from][to] = rate;
    rates[to][from] = 1 / rates[from][to];

    const ratesState = {
      baseRateEuro,
      rates,
    };
    const exchangeState = {
      currencyFrom: from,
      currencyTo: to,
      valueFrom: value,
      valueTo: '10',
      exchangeType: type,
      openCurrencyList: null,
    };

    const walletsState = {
      [CurrencyType.EUR]: 1000,
      [CurrencyType.USD]: 1000,
      [CurrencyType.GBP]: 100,
    };

    return {
      getState: (): Partial<RootState> => ({
        rates: ratesState,
        exchange: exchangeState,
        wallets: walletsState,
      }),
    } as any;
  };

  it('Sell 10 EUR for USD with rate(EURUSD) = 0.5', async () => {
    const from = CurrencyType.EUR;
    const to = CurrencyType.USD;
    const type = ExchangeType.Sell;
    const rate = 0.5;
    const value = '10';

    const mockThunkApi = getThunkApiMock({
      from, to, type, rate, value,
    });

    const result = await exchangeTransactionLogic(undefined, mockThunkApi);

    expect(result).toEqual({
      sell: { value: -10, currency: CurrencyType.EUR, type: ExchangeType.Sell },
      buy: { value: 5, currency: CurrencyType.USD, type: ExchangeType.Buy },
    });
  });

  it('Buy 10 USD with EUR with rate(EURUSD) = 0.5', async () => {
    const from = CurrencyType.EUR;
    const to = CurrencyType.USD;
    const type = ExchangeType.Buy;
    const rate = 0.5;
    const value = '10';

    const mockThunkApi = getThunkApiMock({
      from, to, type, rate, value,
    });

    const result = await exchangeTransactionLogic(undefined, mockThunkApi);

    expect(result).toEqual({
      sell: { value: 20, currency: CurrencyType.USD, type: ExchangeType.Sell },
      buy: { value: 10, currency: CurrencyType.EUR, type: ExchangeType.Buy },
    });
  });

  it('Buy 345 GBP with EUR with rate(GBPEUR) = 1.5', async () => {
    const from = CurrencyType.GBP;
    const to = CurrencyType.EUR;
    const type = ExchangeType.Buy;
    const rate = 1.5;
    const value = '345';

    const mockThunkApi = getThunkApiMock({
      from, to, type, rate, value,
    });

    const result = await exchangeTransactionLogic(undefined, mockThunkApi);

    expect(result).toEqual({
      sell: { value: 345 * (1 / 1.5), currency: CurrencyType.EUR, type: ExchangeType.Sell },
      buy: { value: 345, currency: CurrencyType.GBP, type: ExchangeType.Buy },
    });
  });
});
