import { CurrencyType } from '../exchange/enum';
import type { Rates, RatesActionTypes } from './types';
import * as actionType from './actionTypes';
import getRates from './getRates';

type RatesState = {
  rates: Rates | null;
  baseRateEuro: Rates[CurrencyType.EUR] | null
};

const initialState: RatesState = {
  baseRateEuro: null,
  rates: null,
};

export default function rates(state = initialState, action: RatesActionTypes): RatesState {
  switch (action.type) {
    case actionType.updateEuroRate:
      return {
        ...state,
        baseRateEuro: action.rateEuro,
        rates: getRates(action.rateEuro),
      };

    default:
      return state;
  }
}
