import type { Rates, RatesActionTypes } from './types';
import * as actionType from './actionTypes';

type RatesState = {
  euroRates: Rates | null
};

const initialState: RatesState = {
  euroRates: null,
};

export default function rates(state = initialState, action: RatesActionTypes): RatesState {
  switch (action.type) {
    case actionType.updateEuroRate:
      return {
        ...state,
        euroRates: action.euroRates,
      };

    default:
      return state;
  }
}
