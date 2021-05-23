import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrencyType, ExchangeType, OpenCurrencyListType } from './enum';
import exchangeTransaction from './exchangeTransaction';

type ExchangeState = {
  currencyFrom: CurrencyType;
  currencyTo: CurrencyType;
  valueFrom: string;
  valueTo: string;
  openCurrencyList: OpenCurrencyListType | null;
  exchangeType: ExchangeType;
};

type PayloadSetValue = PayloadAction<{ value: string, rate: number | null }>;

const initialState: ExchangeState = {
  currencyFrom: CurrencyType.EUR,
  currencyTo: CurrencyType.USD,
  valueFrom: '0',
  valueTo: '0',
  openCurrencyList: null,
  exchangeType: ExchangeType.Sell,
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
    setValueFrom(state, action: PayloadSetValue) {
      const { payload: { value: newValueFrom, rate } } = action;
      if (!rate) return;

      const newValueTo = parseFloat(newValueFrom) * rate;

      state.valueFrom = newValueFrom;
      state.valueTo = newValueTo.toFixed(2);
    },
    setValueTo(state, action: PayloadSetValue) {
      const { payload: { value: newValueTo, rate } } = action;
      if (!rate) return;

      const newValueFrom = parseFloat(newValueTo) * rate;

      state.valueTo = newValueTo;
      state.valueFrom = newValueFrom.toFixed(2);
    },
    setOpenCurrencyList(state, action: PayloadAction<OpenCurrencyListType | null>) {
      state.openCurrencyList = action.payload;
    },
    setExchangeType(state, action: PayloadAction<ExchangeType>) {
      state.exchangeType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(exchangeTransaction.fulfilled, (state) => {
      state.valueFrom = '0';
      state.valueTo = '0';
    });
  },
});

export const {
  setCurrencyFrom,
  setCurrencyTo,
  setValueFrom,
  setValueTo,
  setOpenCurrencyList,
  setExchangeType,
} = exchangeSlice.actions;
export default exchangeSlice.reducer;
