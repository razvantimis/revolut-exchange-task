import { configureStore } from '@reduxjs/toolkit';
import exchange, {
  setCurrencyFrom,
  setCurrencyTo,
  setOpenCurrencyList,
  setValueFrom,
  setValueTo,
} from './exchangeSlice';
import { CurrencyType, OpenCurrencyListType } from './enum';
import { getRatesLogic } from '../rates/getRates';

describe('Store => exchangeSilce', () => {
  const rateEuro = {
    [CurrencyType.EUR]: 1,
    [CurrencyType.USD]: 1.2188,
    [CurrencyType.GBP]: 0.85870,
  };
  const rates = getRatesLogic(rateEuro);

  const setupStore = () => {
    const store = configureStore({
      reducer: {
        exchange,
      },
    });
    return store;
  };

  const getExchangeStore = (store: ReturnType<typeof setupStore>) => store.getState().exchange;

  it('should set openCurrencyList with "From"', () => {
    const store = setupStore();
    store.dispatch(setOpenCurrencyList(OpenCurrencyListType.From));

    expect(getExchangeStore(store).openCurrencyList).toBe(OpenCurrencyListType.From);
  });

  it('should set currencyTo to EUR', () => {
    const store = setupStore();
    store.dispatch(setCurrencyTo(CurrencyType.EUR));

    expect(getExchangeStore(store).currencyTo).toBe(CurrencyType.EUR);
  });

  it('should set currencyFrom to USD', () => {
    const store = setupStore();
    store.dispatch(setCurrencyFrom(CurrencyType.USD));

    expect(getExchangeStore(store).currencyFrom).toBe(CurrencyType.USD);
  });

  it('should valueTo be 12.05 * rate(EURUSD) if user set valueFrom', () => {
    const store = setupStore();
    store.dispatch(setCurrencyFrom(CurrencyType.EUR));
    store.dispatch(setCurrencyTo(CurrencyType.USD));

    const nextValueFrom = '12.05';
    store.dispatch(setValueFrom({ value: nextValueFrom, rates }));

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
    store.dispatch(setValueTo({ value: nextValueTo, rates }));

    const rate = rates[CurrencyType.USD][CurrencyType.EUR];
    const expectedValueFrom = parseFloat(nextValueTo) * rate;

    expect(getExchangeStore(store).valueTo).toBe(nextValueTo);
    expect(getExchangeStore(store).valueFrom).toBe(expectedValueFrom.toFixed(2));
  });

  it('should valueFrom be 6.10 * rate(GBPEUR) if user set valueTo', () => {
    const store = setupStore();
    store.dispatch(setCurrencyFrom(CurrencyType.EUR));
    store.dispatch(setCurrencyTo(CurrencyType.GBP));

    const nextValueTo = '6.10';
    store.dispatch(setValueTo({ value: nextValueTo, rates }));

    const rate = rates[CurrencyType.GBP][CurrencyType.EUR];
    const expectedValueFrom = parseFloat(nextValueTo) * rate;

    expect(getExchangeStore(store).valueTo).toBe(nextValueTo);
    expect(getExchangeStore(store).valueFrom).toBe(expectedValueFrom.toFixed(2));
  });
});
