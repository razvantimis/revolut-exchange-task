import { configureStore } from '@reduxjs/toolkit';
import exchange, {
  setCurrencyFrom,
  setCurrencyTo,
  setValueFrom,
  setValueTo,
} from '../exchangeSlice';
import { CurrencyType } from '../enum';
import getRates from '../getRates';

describe('Store => exchangeSilce', () => {
  const rateEuro = {
    [CurrencyType.EUR]: 1,
    [CurrencyType.USD]: 1.2188,
    [CurrencyType.GPB]: 0.85870,
  };
  const rates = getRates(rateEuro);

  const setupStore = () => {
    const store = configureStore({
      preloadedState: {
        exchange: {
          rateEuro,
          rates,
        }
      },
      reducer: {
        exchange,
      },
    });
    return store;
  };

  const getExchangeStore = (store: ReturnType<typeof setupStore>) => store.getState().exchange;

  it('should set currencyFrom to USD', () => {
    const store = setupStore();
    store.dispatch(setCurrencyFrom(CurrencyType.USD));

    expect(getExchangeStore(store).currencyFrom).toBe(CurrencyType.USD);
  });

  it('should set currencyTo to EUR', () => {
    const store = setupStore();
    store.dispatch(setCurrencyTo(CurrencyType.EUR));

    expect(getExchangeStore(store).currencyTo).toBe(CurrencyType.EUR);
  });

  it('should valueTo be 12.05 * rate(EURUSD) if user set valueFrom', () => {
    const store = setupStore();
    store.dispatch(setCurrencyFrom(CurrencyType.EUR));
    store.dispatch(setCurrencyTo(CurrencyType.USD));

    const nextValueFrom = '12.05';
    store.dispatch(setValueFrom(nextValueFrom));

    const rate = rates[CurrencyType.EUR][CurrencyType.USD];
    const expectedValueTo = parseFloat(nextValueFrom) * rate;

    expect(getExchangeStore(store).valueTo).toBe(expectedValueTo.toFixed(2));
    expect(getExchangeStore(store).valueFrom).toBe(nextValueFrom);
  });

  it('should valueFrom be 6.10 * rate(USDEUR) if user set valueTo', () => {
    const store = setupStore();
    store.dispatch(setCurrencyFrom(CurrencyType.EUR));
    store.dispatch(setCurrencyTo(CurrencyType.USD));

    const nextValueTo = '6.10';
    store.dispatch(setValueTo(nextValueTo));

    const rate = rates[CurrencyType.USD][CurrencyType.EUR];
    const expectedValueFrom = parseFloat(nextValueTo) * rate;

    expect(getExchangeStore(store).valueTo).toBe(nextValueTo);
    expect(getExchangeStore(store).valueFrom).toBe(expectedValueFrom.toFixed(2));
  });

  it('should valueFrom be 6.10 * rate(GBPEUR) if user set valueTo', () => {
    const store = setupStore();
    store.dispatch(setCurrencyFrom(CurrencyType.EUR));
    store.dispatch(setCurrencyTo(CurrencyType.GPB));

    const nextValueTo = '6.10';
    store.dispatch(setValueTo(nextValueTo));

    const rate = rates[CurrencyType.GPB][CurrencyType.EUR];
    const expectedValueFrom = parseFloat(nextValueTo) * rate;

    expect(getExchangeStore(store).valueTo).toBe(nextValueTo);
    expect(getExchangeStore(store).valueFrom).toBe(expectedValueFrom.toFixed(2));
  });
});
