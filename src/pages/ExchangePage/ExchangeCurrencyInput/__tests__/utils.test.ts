import { CurrencyType } from '@app/store/enum';
import { UnreachableCaseError } from 'ts-essentials';
import { getCurrencySymbol } from '../utils';

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
    const value = getCurrencySymbol(CurrencyType.GPB);
    expect(value).toBe('£');
  });

  it("should throw error if currency = 'abab'", () => {
    const wrongCurrency = 'abba';
    expect(() => {
      getCurrencySymbol(wrongCurrency as CurrencyType);
    }).toThrow(new UnreachableCaseError(wrongCurrency as never));
  });
});
