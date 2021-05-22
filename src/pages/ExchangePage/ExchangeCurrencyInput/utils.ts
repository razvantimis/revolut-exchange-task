import { CurrencyType } from '@app/store/enum';
import { UnreachableCaseError } from 'ts-essentials';

export function getCurrencySymbol(currency: CurrencyType): string {
  switch (currency) {
    case CurrencyType.USD:
      return '$';
    case CurrencyType.EUR:
      return '€';
    case CurrencyType.GPB:
      return '£';
    default:
      throw new UnreachableCaseError(currency);
  }
}
