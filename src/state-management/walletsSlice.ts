import { createSlice } from '@reduxjs/toolkit';
import { CurrencyType } from './enum';

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
    // transaction(state, action: PayloadAction<{}>) {
    // },
  },
});

// export const { transaction } = walletsSlice.actions;
export default walletsSlice.reducer;
