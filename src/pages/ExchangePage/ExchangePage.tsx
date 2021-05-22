import { FC } from 'react';
import { CurrencyType } from '@app/store/enum';
import ExchangeCurrencyInput from './components/ExchangeCurrencyInput';
import {
  ExchangeTitle,
  ExchangeSubTitle,
  ExchangeContainer,
  ExchangeHeader,
} from './ExchangePage.style';

type Props = {

};

const ExchangePage: FC<Props> = () => (
  <ExchangeContainer>
    <ExchangeHeader>
      <ExchangeTitle data-testid="header-title">Sell RON</ExchangeTitle>
      <ExchangeSubTitle data-testid="header-subtitle">lei 1 = 0.454$</ExchangeSubTitle>
    </ExchangeHeader>
    <ExchangeCurrencyInput
      className="exhange-currency-input"
      currency={CurrencyType.EUR}
      balance={10.34}
      onOpenCurrenyList={() => {
        // TODO open list to change the current currency
      }}
    />
    <ExchangeCurrencyInput
      className="exhange-currency-input"
      currency={CurrencyType.USD}
      balance={34.45}
      onOpenCurrenyList={() => {
        // TODO open list to change the current currency
      }}
    />

  </ExchangeContainer>
);

export default ExchangePage;
