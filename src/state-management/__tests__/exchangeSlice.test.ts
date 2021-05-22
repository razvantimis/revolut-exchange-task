import { configureStore } from '@reduxjs/toolkit';
import exchange, {
  setCurrencyFrom,
  setCurrencyTo,
  setValueFrom,
  setValueTo,
  switchCurrency,
} from '../exchangeSlice';
import { CurrencyType } from '../enum';

describe('Store => exchangeSilce', () => {
  const setupStore = () => {
    const store = configureStore({
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

  it('should switch currency', () => {
    const store = setupStore();
    store.dispatch(setCurrencyTo(CurrencyType.EUR));
    store.dispatch(setCurrencyFrom(CurrencyType.GPB));
    store.dispatch(switchCurrency());

    expect(getExchangeStore(store).currencyTo).toBe(CurrencyType.GPB);
    expect(getExchangeStore(store).currencyFrom).toBe(CurrencyType.EUR);
  });

  it('should set valueTo  = 12.05', () => {
    const store = setupStore();
    const nextValue = "12.05"
    store.dispatch(setValueTo(nextValue));

    expect(getExchangeStore(store).valueTo).toBe(nextValue);
  });

  it('should set valueFrom  = 156.05', () => {
    const store = setupStore();
    const nextValue = "156.05"
    store.dispatch(setValueFrom(nextValue));

    expect(getExchangeStore(store).valueFrom).toBe(nextValue);
  });
});
