import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrencyType } from './enum';

type ExchangeState = {
  currencyFrom: CurrencyType;
  currencyTo: CurrencyType;
};

const initialState: ExchangeState = {
  currencyFrom: CurrencyType.EUR,
  currencyTo: CurrencyType.USD,
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
  },
});

export const { setCurrencyFrom, setCurrencyTo, switchCurrency } = exchangeSlice.actions;
export default exchangeSlice.reducer;
