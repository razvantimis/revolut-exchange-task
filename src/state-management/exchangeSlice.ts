import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrencyType, ExchangeType, OpenCurrencyListType } from './enum';
import getRates, { Rates } from './getRates';

type ExchangeState = {
  currencyFrom: CurrencyType;
  currencyTo: CurrencyType;
  valueFrom: string;
  valueTo: string;
  openCurrencyList: OpenCurrencyListType | null;
  rateEuro: Rates[CurrencyType.EUR]
  exchangeType: ExchangeType;
  rates: Rates;
};

const rateEuro = {
  [CurrencyType.EUR]: 1,
  [CurrencyType.USD]: 1,
  [CurrencyType.GPB]: 1,
};

const initialState: ExchangeState = {
  currencyFrom: CurrencyType.EUR,
  currencyTo: CurrencyType.USD,
  valueFrom: '0',
  valueTo: '0',
  openCurrencyList: null,
  exchangeType: ExchangeType.Buy,
  rateEuro,
  rates: getRates(rateEuro),
};

const exchangeSlice = createSlice({
  name: 'wallets',
  initialState,
  reducers: {
    setCurrencyFrom(state, action: PayloadAction<CurrencyType>) {
      state.currencyFrom = action.payload;
      state.valueFrom = '0';
      state.valueTo = '0';
    },
    setCurrencyTo(state, action: PayloadAction<CurrencyType>) {
      state.currencyTo = action.payload;
      state.valueFrom = '0';
      state.valueTo = '0';
    },
    setValueFrom(state, action: PayloadAction<string>) {
      const { payload: newValueFrom } = action;
      const rate = state.rates[state.currencyFrom][state.currencyTo];
      const newValueTo = parseFloat(newValueFrom) * rate;

      state.valueFrom = newValueFrom;
      state.valueTo = newValueTo.toFixed(2);
    },
    setValueTo(state, action: PayloadAction<string>) {
      const { payload: newValueTo } = action;
      const rate = state.rates[state.currencyTo][state.currencyFrom];
      const newValueFrom = parseFloat(newValueTo) * rate;

      state.valueTo = newValueTo;
      state.valueFrom = newValueFrom.toFixed(2);
    },
    setOpenCurrencyList(state, action: PayloadAction<OpenCurrencyListType | null>) {
      state.openCurrencyList = action.payload;
    },
  },
});

export const {
  setCurrencyFrom,
  setCurrencyTo,
  setValueFrom,
  setValueTo,
  setOpenCurrencyList,
} = exchangeSlice.actions;
export default exchangeSlice.reducer;
