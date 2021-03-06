import { ActionsObservable } from 'redux-observable';
import { of } from 'rxjs';
import { startPollingEuroRate, updateEuroRate } from './actions';
import pollingEuroRateEpic from './pollingEuroRateEpic';
import { getMockEuroRate } from '../utils/getMockData';

describe('pollingEuroRateEpic()', () => {
  const mockEuroRate = getMockEuroRate();

  it('should trigger action updateEuroRate for 5 times', (done) => {
    const refreshRate = 1;
    const action$ = ActionsObservable.of(startPollingEuroRate(refreshRate));
    const dependencies = {
      getJSON: () => of({
        rates: { ...mockEuroRate },
      }),
      exchangeAccessKey: '',
    };

    const output$ = pollingEuroRateEpic(action$, null as any, dependencies);
    let countNumber = 0;
    output$
      .subscribe((action: ReturnType<typeof updateEuroRate>) => {
        expect(action.euroRates).toEqual(mockEuroRate);
        countNumber += 1;
        if (countNumber === 5) {
          done();
        }
      });
  });
});
