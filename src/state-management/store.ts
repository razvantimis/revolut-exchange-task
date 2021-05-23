import { configureStore } from '@reduxjs/toolkit';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import logger from 'redux-logger';
import { ajax } from 'rxjs/ajax';
import { EXCHANGE_ACCESS_KEY } from '@app/config';
import wallets from './walletsSlice';
import exchange from './exchangeSlice';
import rates from './rates/reducer';
import pollingEuroRateEpic from './rates/pollingEuroRateEpic';

export const rootEpic = combineEpics(
  pollingEuroRateEpic,
);

const dependencies = {
  getJSON: ajax.getJSON,
  exchangeAccessKey: EXCHANGE_ACCESS_KEY,
};
const epicMiddleware = createEpicMiddleware({
  dependencies,
});

const store = configureStore({
  reducer: {
    wallets,
    exchange,
    rates,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(epicMiddleware, logger),
});

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
export type DependenciesEpic = typeof dependencies;

export type AppDispatch = typeof store.dispatch;

export default store;
