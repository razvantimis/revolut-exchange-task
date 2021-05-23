import { CurrencyType } from '@app/state-management/enum';
import { UnreachableCaseError } from 'ts-essentials';

export default function getCurrencySymbol(currency: CurrencyType): string {
  switch (currency) {
    case CurrencyType.USD:
      return '$';
    case CurrencyType.EUR:
      return '€';
    case CurrencyType.GBP:
      return '£';
    default:
      throw new UnreachableCaseError(currency);
  }
}
