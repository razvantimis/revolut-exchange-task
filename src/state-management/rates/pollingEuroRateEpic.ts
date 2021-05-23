import {
  Epic,
  ofType,
  ActionsObservable,
  StateObservable,
} from 'redux-observable';
import {
  map,
  switchMap,
  takeUntil,
  distinctUntilChanged,
} from 'rxjs/operators';
import { timer, from } from 'rxjs';
import type { DependenciesEpic, RootState } from '../store';
import * as actions from './actions';
import * as actionTypes from './actionTypes';
import { CurrencyType } from '../exchange/enum';
import type { Rates } from './types';

const currencyList = Object.values(CurrencyType).join(',');
const fetchEuroRate = ({ getJSON, exchangeAccessKey }: DependenciesEpic) => from(
  getJSON(`http://data.fixer.io/api/latest?access_key=${exchangeAccessKey}&symbols=${currencyList}&format=1`),
).pipe(
  map((data: any) => data.rates as Rates[CurrencyType.EUR]),
  // catchError(() => of({ USD: 1.218125, EUR: 1, GBP: 0.860835 })),
);

const pollingEuroRateEpic: Epic = (
  action$: ActionsObservable<ReturnType<typeof actions.startPollingEuroRate>>,
  _state$: StateObservable<RootState>,
  deps: DependenciesEpic,
) => action$.pipe(
  ofType(actionTypes.startPollingEuroRate),
  switchMap(({ refreshRate }) => timer(0, refreshRate).pipe(
    switchMap(() => fetchEuroRate(deps)),
    distinctUntilChanged(),
    map((data) => actions.updateEuroRate(data)),
    takeUntil(action$.pipe(ofType(actionTypes.stopPollingEuroRate))),
  )),
);

export default pollingEuroRateEpic;
