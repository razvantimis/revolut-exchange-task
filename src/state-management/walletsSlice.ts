import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrencyType } from './exchange/enum';

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
  reducers: {
    updateAccount(state, action: PayloadAction<{ currency: CurrencyType, value: number }>) {
      const { currency, value } = action.payload;
      state[currency] += value;
    },
  },
});

export const { updateAccount } = walletsSlice.actions;
export default walletsSlice.reducer;
