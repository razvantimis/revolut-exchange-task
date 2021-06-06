import { CurrencyType, ExchangeType } from '@app/state-management/exchange/enum';
import getCurrencySymbol from '@app/utils/getCurrencySymbol';
import { FC, memo } from 'react';
import { ExchangeHeaderContainer, ExchangeSubTitle, ExchangeTitle } from './ExchangeHeader.style';

type Props = {
  exchangeType: ExchangeType;
  currencyFrom: CurrencyType;
  currencyTo: CurrencyType;
  rateBetweenFromAndTo: number | null;
};

const ExchangeHeader: FC<Props> = ({
  exchangeType,
  currencyFrom,
  currencyTo,
  rateBetweenFromAndTo,
}) => (
  <ExchangeHeaderContainer>
    <ExchangeTitle data-testid="header-title">
      {exchangeType}
      {' '}
      {currencyFrom}
    </ExchangeTitle>
    {rateBetweenFromAndTo && (
      <ExchangeSubTitle data-testid="header-subtitle">
        {getCurrencySymbol(currencyFrom)}
        1 =
        {' '}
        {getCurrencySymbol(currencyTo)}
        {rateBetweenFromAndTo.toFixed(2)}
      </ExchangeSubTitle>
    )}
  </ExchangeHeaderContainer>
);

export default memo(ExchangeHeader);
