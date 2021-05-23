import { createAction } from '../utils/createAction';
import * as actionTypes from './actionTypes';
import type { Rates } from './types';

export function startPollingEuroRate(refreshRate: number) {
  return createAction({ type: actionTypes.startPollingEuroRate, refreshRate });
}

export function updateEuroRate(euroRates: Rates) {
  return createAction({ type: actionTypes.updateEuroRate, euroRates });
}

export function stopPollingEuroRate() {
  return createAction({ type: actionTypes.stopPollingEuroRate });
}
