import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { UnreachableCaseError } from 'ts-essentials';
import { getRateBetweenFromAndToLogic } from '../rates/getRateBetweenFromAndTo';
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

export function isExchangeValid(
  transaction: ExchangeTransactionReturn,
  wallets: WalletsState,
) {
  const { sell, buy } = transaction;

  if (sell.currency === buy.currency) {
    return false;
  }

  const sellBalance = wallets[sell.currency];
  if (sellBalance >= sell.value) {
    return true;
  }

  return false;
}

export function getSellAndBuyTransaction(
  exchangeType: ExchangeType,
  currencyFrom: CurrencyType,
  currencyTo: CurrencyType,
  valueFrom: number,
  euroRates: Rates,
) {
  switch (exchangeType) {
    case ExchangeType.Sell: {
      const sellTranstion: Transaction = {
        currency: currencyFrom,
        value: valueFrom,
        type: ExchangeType.Sell,
      };

      const buyValue = valueFrom * getRateBetweenFromAndToLogic(
        currencyFrom,
        currencyTo,
        euroRates,
      );
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

      const sellValue = valueFrom * getRateBetweenFromAndToLogic(
        currencyTo,
        currencyFrom,
        euroRates,
      );
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
  const { wallets } = state;
  const {
    currencyFrom,
    currencyTo,
    valueFrom,
    exchangeType,
  } = state.exchange;
  const rates = state.rates.euroRates;
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
