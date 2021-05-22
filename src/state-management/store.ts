import { configureStore } from '@reduxjs/toolkit';
import wallets from './walletsSlice';
import exchange from './exchangeSlice';

const store = configureStore({
  reducer: {
    wallets,
    exchange,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
