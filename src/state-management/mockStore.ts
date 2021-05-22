
import configureStore from 'redux-mock-store';
import { RootState } from './store';

export const mockStore = configureStore<Partial<RootState>>([])