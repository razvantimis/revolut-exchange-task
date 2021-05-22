import { CurrencyType, ExchangeType } from '@app/state-management/enum';
import { UnreachableCaseError } from 'ts-essentials';
import getExchangeButtonText from './getExchangeButtonText';

describe('Utils => getExchangeButtonText', () => {
  it('should return "Sell EUR for USD"', () => {
    const value = getExchangeButtonText(CurrencyType.EUR, CurrencyType.USD, ExchangeType.Sell);
    expect(value).toBe('Sell EUR for USD');
  });
  it('should return "Buy EUR with USD"', () => {
    const value = getExchangeButtonText(CurrencyType.EUR, CurrencyType.USD, ExchangeType.Buy);
    expect(value).toBe('Buy EUR with USD');
  });

  it("should throw error if exchangeType = 'abab'", () => {
    const wrongCurrency = 'abba';
    expect(() => {
      getExchangeButtonText(CurrencyType.EUR, CurrencyType.USD, wrongCurrency as ExchangeType);
    }).toThrow(new UnreachableCaseError(wrongCurrency as never));
  });
});
