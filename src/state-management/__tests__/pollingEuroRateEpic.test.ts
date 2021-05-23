import { ActionsObservable } from 'redux-observable';
import { of } from 'rxjs';
import { startPollingEuroRate, updateEuroRate } from '../rates/actions';
import pollingEuroRateEpic from '../rates/pollingEuroRateEpic';
import { CurrencyType } from '../enum';

describe('pollingEuroRateEpic()', () => {
  const mockEuroRate = {
    [CurrencyType.EUR]: 1,
    [CurrencyType.USD]: 1,
    [CurrencyType.GBP]: 1,
  };

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
        expect(action.rateEuro).toEqual(mockEuroRate);
        countNumber += 1;
        if (countNumber === 5) {
          done();
        }
      });
  });
});
