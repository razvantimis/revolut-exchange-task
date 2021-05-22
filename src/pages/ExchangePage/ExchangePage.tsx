import { FC } from 'react';
import { CurrencyType } from '@app/state-management/enum';
import { useSelector } from 'react-redux';
import { RootState } from '@app/state-management/store';
import ExchangeCurrencyInput from './ExchangeCurrencyInput';
import {
  ExchangeTitle,
  ExchangeSubTitle,
  ExchangeContainer,
  ExchangeHeader,
} from './ExchangePage.style';

const ExchangePage: FC = () => {
  const currencyFrom = useSelector<RootState, CurrencyType>((state) => state.exchange.currencyFrom);
  const currencyTo = useSelector<RootState, CurrencyType>((state) => state.exchange.currencyTo);

  return (
    <ExchangeContainer>
      <ExchangeHeader>
        <ExchangeTitle data-testid="header-title">Sell RON</ExchangeTitle>
        <ExchangeSubTitle data-testid="header-subtitle">lei 1 = 0.454$</ExchangeSubTitle>
      </ExchangeHeader>
      <ExchangeCurrencyInput
        className="exhange-currency-input"
        currency={currencyFrom}
        balance={10.34}
        onOpenCurrenyList={() => {
          // TODO open list to change the current currency
        }}
        inputValue={10.34}
        onInputChange={() => { }}
      />
      <ExchangeCurrencyInput
        className="exhange-currency-input"
        currency={currencyTo}
        balance={34.45}
        onOpenCurrenyList={() => {
          // TODO open list to change the current currency
        }}
        inputValue={10.34}
        onInputChange={() => { }}
      />

    </ExchangeContainer>
  );
};

export default ExchangePage;
