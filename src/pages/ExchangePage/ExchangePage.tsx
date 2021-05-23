import React, { FC, useEffect } from 'react';
import { CurrencyType, OpenCurrencyListType } from '@app/state-management/enum';
import {
  setCurrencyFrom,
  setCurrencyTo,
  setOpenCurrencyList,
  setValueFrom,
  setValueTo,
} from '@app/state-management/exchangeSlice';
import getExchangeButtonText from '@app/utils/getExchangeButtonText';
import { useAppDispatch, useAppSelector } from '@app/state-management/hooks';
import { startPollingEuroRate, stopPollingEuroRate } from '@app/state-management/rates/actions';
import { REFRESH_RATE } from '@app/config';
import ExchangeCurrencyInfo from './ExchangeCurrencyInfo';
import {
  ExchangeTitle,
  ExchangeSubTitle,
  ExchangeContainer,
  ExchangeHeader,
  Overlay,
  ExchangeButton,
} from './ExchangePage.style';
import NumberInput from './NumberInput';
import CurrencyList from './CurrencyList';

const ExchangePage: FC = () => {
  const currencyFrom = useAppSelector((state) => state.exchange.currencyFrom);
  const currencyTo = useAppSelector((state) => state.exchange.currencyTo);
  const wallets = useAppSelector((state) => state.wallets);
  const valueFrom = useAppSelector((state) => state.exchange.valueFrom);
  const valueTo = useAppSelector((state) => state.exchange.valueTo);
  const openCurrencyList = useAppSelector((state) => state.exchange.openCurrencyList);
  const exchangeType = useAppSelector((state) => state.exchange.exchangeType);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(startPollingEuroRate(REFRESH_RATE));
    return () => {
      dispatch(stopPollingEuroRate());
    };
  });

  const handleSelectCurrency = (selectedCurrency: CurrencyType) => {
    switch (openCurrencyList) {
      case OpenCurrencyListType.From:
        dispatch(setCurrencyFrom(selectedCurrency));
        break;
      case OpenCurrencyListType.To:
        dispatch(setCurrencyTo(selectedCurrency));
        break;
      default:
      // ignore
    }
    dispatch(setOpenCurrencyList(null));
  };

  return (
    <ExchangeContainer>
      {openCurrencyList !== null
        && (
          <Overlay>
            <CurrencyList
              currencyList={Object.values(CurrencyType)}
              wallets={wallets}
              onSelectCurrency={handleSelectCurrency}
            />
          </Overlay>
        )}
      <ExchangeHeader>
        <ExchangeTitle data-testid="header-title">
          {exchangeType}
          {' '}
          {currencyFrom}
        </ExchangeTitle>
        <ExchangeSubTitle data-testid="header-subtitle">lei 1 = 0.454$</ExchangeSubTitle>
      </ExchangeHeader>
      <ExchangeCurrencyInfo
        className="exhange-currency-input"
        currency={currencyFrom}
        balance={wallets[currencyFrom]}
        onOpenCurrenyList={() => dispatch(setOpenCurrencyList(OpenCurrencyListType.From))}
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
        onOpenCurrenyList={() => dispatch(setOpenCurrencyList(OpenCurrencyListType.To))}
      >
        <NumberInput
          value={valueTo}
          onChange={(value) => dispatch(setValueTo(value))}
        />
      </ExchangeCurrencyInfo>
      <ExchangeButton className="exchange-btn">
        {getExchangeButtonText(currencyFrom, currencyTo, exchangeType)}
      </ExchangeButton>
    </ExchangeContainer>
  );
};

export default ExchangePage;
