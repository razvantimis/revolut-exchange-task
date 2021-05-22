import { FC } from 'react';
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

  </ExchangeContainer>
);

export default ExchangePage;
