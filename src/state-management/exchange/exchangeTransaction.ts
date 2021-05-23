import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { UnreachableCaseError } from 'ts-essentials';
import { Rates } from '../rates/types';
import type { RootState } from '../store';
import type { WalletsState } from '../walletsSlice';
import { CurrencyType, ExchangeType } from './enum';

type Transaction = {
  value: number,
  currency: CurrencyType,
  type: ExchangeType
};

type ExchangeTransactionReturn = { sell: Transaction, buy: Transaction };

function isExchangeValid(transaction: ExchangeTransactionReturn, wallets: WalletsState) {
  const { sell } = transaction;
  const sellBalance = wallets[sell.currency];

  if (sellBalance >= sell.value) {
    return true;
  }

  return false;
}

function getSellAndBuyTransaction(
  exchangeType: ExchangeType,
  currencyFrom: CurrencyType,
  currencyTo: CurrencyType,
  valueFrom: number,
  rates: Rates,
) {
  switch (exchangeType) {
    case ExchangeType.Sell: {
      const sellTranstion: Transaction = {
        currency: currencyFrom,
        value: valueFrom,
        type: ExchangeType.Sell,
      };

      const buyValue = valueFrom * rates[currencyFrom][currencyTo];
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
        value: valueFrom,
        type: ExchangeType.Buy,
      };

      const sellValue = valueFrom * rates[currencyTo][currencyFrom];
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
}

export const exchangeTransactionLogic: AsyncThunkPayloadCreator<
ExchangeTransactionReturn,
void
> = async (
  _, { getState },
) => {
  const state = getState() as RootState;
  const { rates } = state.rates;
  const { wallets } = state;
  const {
    currencyFrom,
    currencyTo,
    valueFrom,
    exchangeType,
  } = state.exchange;
  const valueFromFloat = parseFloat(valueFrom);

  const transactions = getSellAndBuyTransaction(
    exchangeType,
    currencyFrom,
    currencyTo,
    valueFromFloat,
    rates!,
  );

  const isValid = isExchangeValid(transactions, wallets);

  if (isValid) {
    return transactions;
  }

  throw new Error('Invalid exchange transaction');
};

const exchangeTransaction = createAsyncThunk(
  'wallets/exchangeTransaction',
  exchangeTransactionLogic,
);

export default exchangeTransaction;
