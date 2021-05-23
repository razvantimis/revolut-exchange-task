import { RootState } from '../store';
import { getMockEuroRate, getMockWallet } from '../utils/getMockData';
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
    const euroRates = getMockEuroRate(rate);

    const ratesState = {
      euroRates,
    };
    const exchangeState = {
      currencyFrom: from,
      currencyTo: to,
      valueFrom: value,
      valueTo: '10',
      exchangeType: type,
      openCurrencyList: null,
    };

    const walletsState = getMockWallet(allMoney);

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
      sell: { value: 10, currency: CurrencyType.EUR, type: ExchangeType.Sell },
      buy: { value: 5, currency: CurrencyType.USD, type: ExchangeType.Buy },
    });
  });

  it('should buy USD with 10 EUR with rate(EURUSD) = 1.22', async () => {
    const from = CurrencyType.EUR;
    const to = CurrencyType.USD;
    const type = ExchangeType.Buy;
    const rate = 1.22;
    const value = '10';

    const mockThunkApi = getThunkApiMock({
      from, to, type, rate, value,
    });

    const result = await exchangeTransactionLogic(undefined, mockThunkApi);

    expect(result).toEqual({
      sell: { value: 10 * rate, currency: CurrencyType.USD, type: ExchangeType.Sell },
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
