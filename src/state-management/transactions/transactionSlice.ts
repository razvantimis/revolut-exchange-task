import { createSlice } from '@reduxjs/toolkit';
import { getTransactionAsyncAction } from './getTransactions';
import { Transaction } from './types';

export type TransactionState = {
  list: Transaction[];
  limit: number,
  skipDate?: number,
};

const initialState: TransactionState = {
  limit: 10,
  skipDate: undefined,
  list: [],
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTransactionAsyncAction.fulfilled, (state, action) => {
      if (state.list.length > 0) {
        state.list.push(...action.payload);
      } else {
        state.list = action.payload;
      }
      const lastItem = action.payload[action.payload.length - 1];
      state.skipDate = lastItem ? new Date(lastItem.createdDate).getTime() : state.skipDate;
    });
  },
});

export default transactionSlice.reducer;
