import { startPollingEuroRate, updateEuroRate } from '../rates/actions';
import { ActionsObservable } from 'redux-observable';
import pollingEuroRateEpic from '../rates/pollingEuroRateEpic';
import { of } from 'rxjs';
import { CurrencyType } from '../enum';

describe("pollingEuroRateEpic()", () => {
  const mockEuroRate = {
    [CurrencyType.EUR]: 1,
    [CurrencyType.USD]: 1,
    [CurrencyType.GBP]: 1,
  };

  it("should trigger action updateEuroRate", (done) => {
    const refreshRate = 2;
    const action$ = ActionsObservable.of(startPollingEuroRate(refreshRate))
    const dependencies = {
      getJSON: () => of({
        rates: mockEuroRate
      }),
      exchangeAccessKey: '',
    };

    const output$ = pollingEuroRateEpic(action$, null as any, dependencies);
    output$
      .subscribe((action: ReturnType<typeof updateEuroRate>) => {
        expect(action.rateEuro).toEqual(mockEuroRate);
        done();

      });

  });

})