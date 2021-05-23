import { CurrencyType } from '../exchange/enum';
import type { Rates, RatesActionTypes } from './types';
import * as actionType from './actionTypes';

type RatesState = {
  baseRateEuro: Rates[CurrencyType.EUR] | null
};

const initialState: RatesState = {
  baseRateEuro: null,
};

export default function rates(state = initialState, action: RatesActionTypes): RatesState {
  switch (action.type) {
    case actionType.updateEuroRate:
      return {
        ...state,
        baseRateEuro: action.rateEuro,
      };

    default:
      return state;
  }
}
