import configureStore from 'redux-mock-store';
import { RootState } from '../store';

const mockStore = configureStore<Partial<RootState>>([]);

export default mockStore;
