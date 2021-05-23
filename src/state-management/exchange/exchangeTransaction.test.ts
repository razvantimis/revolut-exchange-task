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
  allMoney?: number;
};

describe('async action exchangeTransaction', () => {
  const getThunkApiMock = ({
    from,
    to,
    value,
    rate,
    type,
    allMoney = 50,
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
      [CurrencyType.EUR]: allMoney,
      [CurrencyType.USD]: allMoney,
      [CurrencyType.GBP]: allMoney,
    };

    return {
      getState: (): Partial<RootState> => ({
        rates: ratesState,
        exchange: exchangeState,
        wallets: walletsState,
      }),
    } as any;
  };

  it('should sell 10 EUR for USD with rate(EURUSD) = 0.5', async () => {
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

  it('should buy 10 USD with EUR with rate(EURUSD) = 0.5', async () => {
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

  it('should throw an Error when Buy 345 GBP with EUR with rate(GBPEUR) = 1.5', async () => {
    const from = CurrencyType.GBP;
    const to = CurrencyType.EUR;
    const type = ExchangeType.Buy;
    const rate = 1.5;
    const value = '345';
    const allMoney = 100;

    const mockThunkApi = getThunkApiMock({
      from, to, type, rate, value, allMoney,
    });

    await expect(exchangeTransactionLogic(undefined, mockThunkApi)).rejects.toThrow(
      new Error('Invalid exchange transaction'),
    );
  });
});
