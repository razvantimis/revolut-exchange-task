import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { UnreachableCaseError } from 'ts-essentials';
import type { RootState } from '../store';
import { CurrencyType, ExchangeType } from './enum';

type Transaction = {
  value: number,
  currency: CurrencyType,
  type: ExchangeType
};

type ExchangeTransactionReturn = { sell: Transaction, buy: Transaction };

export const exchangeTransactionLogic: AsyncThunkPayloadCreator<
ExchangeTransactionReturn,
void
> = async (
  _, { getState },
) => {
  const state = getState() as RootState;
  const { rates } = state.rates;
  const {
    currencyFrom,
    currencyTo,
    valueFrom,
    exchangeType,
  } = state.exchange;
  const valueFromFloat = parseFloat(valueFrom);

  switch (exchangeType) {
    case ExchangeType.Sell: {
      const sellTranstion: Transaction = {
        currency: currencyFrom,
        value: -valueFromFloat,
        type: ExchangeType.Sell,
      };

      const buyValue = valueFromFloat * rates![currencyFrom][currencyTo];
      const buyTranstion: Transaction = {
        currency: currencyTo,
        value: buyValue,
        type: ExchangeType.Buy,
      };
      return {
        sell: sellTranstion,
        buy: buyTranstion,
      };
    }
    case ExchangeType.Buy: {
      const buyTranstion: Transaction = {
        currency: currencyFrom,
        value: valueFromFloat,
        type: ExchangeType.Buy,
      };

      const sellValue = valueFromFloat * rates![currencyTo][currencyFrom];
      const sellTranstion: Transaction = {
        currency: currencyTo,
        value: sellValue,
        type: ExchangeType.Sell,
      };
      return {
        sell: sellTranstion,
        buy: buyTranstion,
      };
    }
    default:
      throw new UnreachableCaseError(exchangeType);
  }
};

const exchangeTransaction = createAsyncThunk(
  'wallets/exchangeTransaction',
  exchangeTransactionLogic,
);

export default exchangeTransaction;
