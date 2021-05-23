import React, { FC, useEffect } from 'react';
import { CurrencyType, OpenCurrencyListType } from '@app/state-management/exchange/enum';
import {
  setCurrencyFrom,
  setCurrencyTo,
  setOpenCurrencyList,
  setValueFrom,
  setValueTo,
} from '@app/state-management/exchange/exchangeSlice';
import getExchangeButtonText from '@app/utils/getExchangeButtonText';
import { useAppDispatch, useAppSelector } from '@app/state-management/hooks';
import { startPollingEuroRate, stopPollingEuroRate } from '@app/state-management/rates/actions';
import { REFRESH_RATE_IN_MILLISECONDS } from '@app/config';
import exchangeTransaction from '@app/state-management/exchange/exchangeTransaction';
import isValidExchange from '@app/state-management/exchange/isValidExchange';
import getCurrencySymbol from '@app/utils/getCurrencySymbol';
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
import getRates from '@app/state-management/rates/getRates';

const ExchangePage: FC = () => {
  const currencyFrom = useAppSelector((state) => state.exchange.currencyFrom);
  const currencyTo = useAppSelector((state) => state.exchange.currencyTo);
  const wallets = useAppSelector((state) => state.wallets);
  const rates = useAppSelector(getRates);
  const valueFrom = useAppSelector((state) => state.exchange.valueFrom);
  const valueTo = useAppSelector((state) => state.exchange.valueTo);
  const openCurrencyList = useAppSelector((state) => state.exchange.openCurrencyList);
  const exchangeType = useAppSelector((state) => state.exchange.exchangeType);
  const isValid = useAppSelector(isValidExchange);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(startPollingEuroRate(REFRESH_RATE_IN_MILLISECONDS));
    return () => {
      dispatch(stopPollingEuroRate());
    };
  }, [REFRESH_RATE_IN_MILLISECONDS]);

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
        {rates && (
          <ExchangeSubTitle data-testid="header-subtitle">
            {getCurrencySymbol(currencyFrom)}
            1 =
            {' '}
            {getCurrencySymbol(currencyTo)}
            {rates[currencyFrom][currencyTo]}
          </ExchangeSubTitle>
        )}
      </ExchangeHeader>
      <ExchangeCurrencyInfo
        className="exhange-currency-input"
        currency={currencyFrom}
        balance={wallets[currencyFrom]}
        onOpenCurrenyList={() => dispatch(setOpenCurrencyList(OpenCurrencyListType.From))}
      >
        <NumberInput
          value={valueFrom}
          onChange={(value) => dispatch(setValueFrom({ value, rates }))}
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
          onChange={(value) => dispatch(setValueTo({ value, rates }))}
        />
      </ExchangeCurrencyInfo>
      <ExchangeButton
        disabled={!isValid}
        className="exchange-btn"
        onClick={() => isValid && dispatch(exchangeTransaction())}
      >
        {getExchangeButtonText(currencyFrom, currencyTo, exchangeType)}
      </ExchangeButton>
    </ExchangeContainer>
  );
};

export default ExchangePage;
