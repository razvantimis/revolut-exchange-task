import { CurrencyType } from '../enum';
import { createAction } from '../utils/createAction';
import * as actionTypes from './actionTypes';
import type { Rates } from './types';

export function startPollingEuroRate(seconds: number) {
  return createAction({ type: actionTypes.startPollingEuroRate, seconds });
}

export function updateEuroRate(rateEuro: Rates[CurrencyType.EUR]) {
  return createAction({ type: actionTypes.updateEuroRate, rateEuro });
}

export function stopPollingEuroRate() {
  return createAction({ type: actionTypes.stopPollingEuroRate });
}
