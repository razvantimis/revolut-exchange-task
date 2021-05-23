import { CurrencyType } from '@app/state-management/exchange/enum';
import { UnreachableCaseError } from 'ts-essentials';

export default function getCurrencySymbol(currency: CurrencyType): string {
  switch (currency) {
    case CurrencyType.USD:
      return '$';
    case CurrencyType.EUR:
      return '€';
    case CurrencyType.GBP:
      return '£';
    case CurrencyType.RON:
      return 'lei';
    default:
      throw new UnreachableCaseError(currency);
  }
}
