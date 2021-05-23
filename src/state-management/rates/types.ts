import { CurrencyType } from '../enum';
import type { ActionUnion } from '../utils/types';
import * as actions from './actions';

export type Rates = {
  [key in CurrencyType]: {
    [innerKey in CurrencyType]: number
  }
};

export type RatesActionTypes = ActionUnion<typeof actions>;
