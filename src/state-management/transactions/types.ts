import { CurrencyType } from '../exchange/enum';

export type Transaction = {
  id: string,
  currency: CurrencyType
  amount: number,
  description: string
  createdDate: string
};
