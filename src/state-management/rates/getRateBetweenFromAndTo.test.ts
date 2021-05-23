import { CurrencyType } from '../exchange/enum';
import { getMockEuroRate } from '../utils/getMockData';
import { getRateBetweenFromAndToLogic } from './getRateBetweenFromAndTo';

describe('State operation => getRates', () => {
  const euroRate = getMockEuroRate();
  it('should get rate between EUR to USD', () => {
    const eurUsdRate = getRateBetweenFromAndToLogic(CurrencyType.EUR, CurrencyType.USD, euroRate);
    expect(eurUsdRate).toBe(1.2188);
  });

  it('should get rate between USD to EUR', () => {
    const eurUsdRate = getRateBetweenFromAndToLogic(CurrencyType.USD, CurrencyType.EUR, euroRate);
    expect(eurUsdRate).toBe(1 / 1.2188);
  });

  it('should get rate between USD to GBP', () => {
    const eurUsdRate = getRateBetweenFromAndToLogic(CurrencyType.USD, CurrencyType.GBP, euroRate);
    expect(eurUsdRate).toBe((1 / 1.2188) * 0.85870);
  });
});
