import { createAsyncThunk } from '@reduxjs/toolkit';
import { CurrencyType, ExchangeType } from './enum';

type PayloadExchangeTransaction = {
  exchangeType: ExchangeType,
  currencyFrom: CurrencyType,
  currencyTo: CurrencyType,
  valueFrom: number,
};

const exchangeTransaction = createAsyncThunk(
  'wallets/exchangeTransaction',
  async (payload: PayloadExchangeTransaction, thunkAPI) => {

  },
);

export default exchangeTransaction;
