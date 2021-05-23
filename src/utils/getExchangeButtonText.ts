import { CurrencyType, ExchangeType } from '@app/state-management/exchange/enum';
import { UnreachableCaseError } from 'ts-essentials';

export default function getExchangeButtonText(
  from: CurrencyType,
  to: CurrencyType,
  exchangeType: ExchangeType,
): string {
  switch (exchangeType) {
    case ExchangeType.Buy:
      return `Buy ${from} with ${to}`;
    case ExchangeType.Sell:
      return `Sell ${from} for ${to}`;
    default:
      throw new UnreachableCaseError(exchangeType);
  }
}
