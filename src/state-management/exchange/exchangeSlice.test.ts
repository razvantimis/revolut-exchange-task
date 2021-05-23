import { configureStore } from '@reduxjs/toolkit';
import exchange, {
  setCurrencyFrom,
  setCurrencyTo,
  setOpenCurrencyList,
  setValueFrom,
  setValueTo,
} from './exchangeSlice';
import { CurrencyType, OpenCurrencyListType } from './enum';
import { getRateBetweenFromAndToLogic } from '../rates/getRateBetweenFromAndTo';
import { getMockEuroRate } from '../utils/getMockData';

describe('Store => exchangeSilce', () => {
  const rateEuro = getMockEuroRate();

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
    const currencyFrom = CurrencyType.EUR;
    const currencyTo = CurrencyType.USD;
    store.dispatch(setCurrencyFrom(currencyFrom));
    store.dispatch(setCurrencyTo(currencyTo));

    const nextValueFrom = '12.05';
    const rate = getRateBetweenFromAndToLogic(currencyFrom, currencyTo, rateEuro);
    store.dispatch(setValueFrom({ value: nextValueFrom, rate }));

    const expectedValueTo = parseFloat(nextValueFrom) * rate;

    expect(getExchangeStore(store).valueTo).toBe(expectedValueTo.toFixed(2));
    expect(getExchangeStore(store).valueFrom).toBe(nextValueFrom);
  });

  it('should valueFrom be 6.10 * rate(USDEUR) if user set valueTo', () => {
    const store = setupStore();
    const currencyFrom = CurrencyType.EUR;
    const currencyTo = CurrencyType.USD;
    store.dispatch(setCurrencyFrom(currencyFrom));
    store.dispatch(setCurrencyTo(currencyTo));

    const nextValueTo = '6.10';
    const rate = getRateBetweenFromAndToLogic(currencyFrom, currencyTo, rateEuro);
    store.dispatch(setValueTo({ value: nextValueTo, rate }));

    const expectedValueFrom = parseFloat(nextValueTo) * rate;

    expect(getExchangeStore(store).valueTo).toBe(nextValueTo);
    expect(getExchangeStore(store).valueFrom).toBe(expectedValueFrom.toFixed(2));
  });

  it('should valueFrom be 6.10 * rate(GBPEUR) if user set valueTo', () => {
    const store = setupStore();
    const currencyFrom = CurrencyType.EUR;
    const currencyTo = CurrencyType.GBP;
    store.dispatch(setCurrencyFrom(currencyFrom));
    store.dispatch(setCurrencyTo(currencyTo));

    const nextValueTo = '6.10';
    const rate = getRateBetweenFromAndToLogic(currencyFrom, currencyTo, rateEuro);
    store.dispatch(setValueTo({ value: nextValueTo, rate }));

    const expectedValueFrom = parseFloat(nextValueTo) * rate;

    expect(getExchangeStore(store).valueTo).toBe(nextValueTo);
    expect(getExchangeStore(store).valueFrom).toBe(expectedValueFrom.toFixed(2));
  });
});
