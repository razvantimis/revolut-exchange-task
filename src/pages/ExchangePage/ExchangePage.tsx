import { FC } from 'react';
import { CurrencyType } from '@app/state-management/enum';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@app/state-management/store';
import { WalletsState } from '@app/state-management/walletsSlice';
import { setValueFrom, setValueTo } from '@app/state-management/exchangeSlice';
import ExchangeCurrencyInfo from './ExchangeCurrencyInfo';
import {
  ExchangeTitle,
  ExchangeSubTitle,
  ExchangeContainer,
  ExchangeHeader,
} from './ExchangePage.style';
import NumberInput from './NumberInput';

const ExchangePage: FC = () => {
  const currencyFrom = useSelector<RootState, CurrencyType>((state) => state.exchange.currencyFrom);
  const currencyTo = useSelector<RootState, CurrencyType>((state) => state.exchange.currencyTo);
  const wallets = useSelector<RootState, WalletsState>((state) => state.wallets);
  const valueFrom = useSelector<RootState, string>((state) => state.exchange.valueFrom);
  const valueTo = useSelector<RootState, string>((state) => state.exchange.valueTo);

  const dispatch = useDispatch();

  return (
    <ExchangeContainer>
      <ExchangeHeader>
        <ExchangeTitle data-testid="header-title">Sell RON</ExchangeTitle>
        <ExchangeSubTitle data-testid="header-subtitle">lei 1 = 0.454$</ExchangeSubTitle>
      </ExchangeHeader>
      <ExchangeCurrencyInfo
        className="exhange-currency-input"
        currency={currencyFrom}
        balance={wallets[currencyFrom]}
        onOpenCurrenyList={() => {
          // TODO open list to change the current currency
        }}
      >
        <NumberInput
          value={valueFrom}
          onChange={(value) => dispatch(setValueFrom(value))}
        />
      </ExchangeCurrencyInfo>
      <ExchangeCurrencyInfo
        className="exhange-currency-input"
        currency={currencyTo}
        balance={wallets[currencyTo]}
        onOpenCurrenyList={() => {
          // TODO open list to change the current currency
        }}
      >
        <NumberInput
          value={valueTo}
          onChange={(value) => dispatch(setValueTo(value))}
        />

      </ExchangeCurrencyInfo>

    </ExchangeContainer>
  );
};

export default ExchangePage;
