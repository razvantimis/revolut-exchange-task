import { CurrencyType } from '@app/state-management/enum';
import { UnreachableCaseError } from 'ts-essentials';
import getCurrencySymbol from './getCurrencySymbol';

describe('Utils => getCurrencySymbol', () => {
  it('should return $ if currency = USD', () => {
    const value = getCurrencySymbol(CurrencyType.USD);
    expect(value).toBe('$');
  });
  it('should return $ if currency = EUR', () => {
    const value = getCurrencySymbol(CurrencyType.EUR);
    expect(value).toBe('€');
  });
  it('should return $ if currency = GPB', () => {
    const value = getCurrencySymbol(CurrencyType.GBP);
    expect(value).toBe('£');
  });

  it("should throw error if currency = 'abab'", () => {
    const wrongCurrency = 'abba';
    expect(() => {
      getCurrencySymbol(wrongCurrency as CurrencyType);
    }).toThrow(new UnreachableCaseError(wrongCurrency as never));
  });
});
