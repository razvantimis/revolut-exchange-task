import { createSlice } from '@reduxjs/toolkit';
import { CurrencyType } from './exchange/enum';
import exchangeTransaction from './exchange/exchangeTransaction';

export type WalletsState = {
  [key in CurrencyType]: number;
};

const initialState: WalletsState = {
  [CurrencyType.USD]: 10.34,
  [CurrencyType.GBP]: 34.4,
  [CurrencyType.EUR]: 100.45,
};

const walletsSlice = createSlice({
  name: 'wallets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(exchangeTransaction.fulfilled, (state, action) => {
      const { sell, buy } = action.payload;

      state[sell.currency] += sell.value;
      state[buy.currency] += buy.value;
    });
  },
});

export default walletsSlice.reducer;
