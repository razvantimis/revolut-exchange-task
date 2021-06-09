import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { ajax } from 'rxjs/ajax';
import type { RootState } from '../store';
import { Transaction } from './types';

const getToken = () => 'c891f194-5e20-497a-a394-0a3ce9e4f543';

const getTransactions: AsyncThunkPayloadCreator<
  Transaction[],
  void
> = async (
  _, { getState },
  ) => {
    const state = getState() as RootState;

    const { limit, skipDate } = state.transactions;

    const params = [];
    if (skipDate) params.push(`to=${skipDate}`);
    if (limit) params.push(`limit=${limit}`);

    const result = ajax.getJSON<Transaction[]>(`https://awesome-bank.xyz/api/user/transactions?${params.join('&')}`, {
      'X-Access-Token': getToken(),
    });

    return result.toPromise();
  };

export const getTransactionAsyncAction = createAsyncThunk(
  'tranasaction/getTransactionAsyncAction',
  getTransactions,
);
export default getTransactions;
