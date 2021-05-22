import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrencyType } from './enum';

type ExchangeState = {
  currencyFrom: CurrencyType;
  currencyTo: CurrencyType;
  valueFrom: string;
  valueTo: string;
};

const initialState: ExchangeState = {
  currencyFrom: CurrencyType.EUR,
  currencyTo: CurrencyType.USD,
  valueFrom: '0',
  valueTo: '0',
};

const exchangeSlice = createSlice({
  name: 'wallets',
  initialState,
  reducers: {
    switchCurrency(state) {
      const from = state.currencyFrom;
      state.currencyFrom = state.currencyTo;
      state.currencyTo = from;
    },
    setCurrencyFrom(state, action: PayloadAction<CurrencyType>) {
      state.currencyFrom = action.payload;
    },
    setCurrencyTo(state, action: PayloadAction<CurrencyType>) {
      state.currencyTo = action.payload;
    },
    setValueFrom(state, action: PayloadAction<string>) {
      state.valueFrom = action.payload;
    },
    setValueTo(state, action: PayloadAction<string>) {
      state.valueTo = action.payload;
    },
  },
});

export const {
  setCurrencyFrom,
  setCurrencyTo,
  switchCurrency,
  setValueFrom,
  setValueTo,
} = exchangeSlice.actions;
export default exchangeSlice.reducer;
