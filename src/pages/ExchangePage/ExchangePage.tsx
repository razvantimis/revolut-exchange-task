import { FC, useCallback, useEffect } from 'react';
import { CurrencyType, OpenCurrencyListType } from '@app/state-management/exchange/enum';
import {
  setCurrencyFrom,
  setCurrencyTo,
  setExchangeType,
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
import getRateBetweenFromAndTo from '@app/state-management/rates/getRateBetweenFromAndTo';
import ExchangeCurrencyInfo from './ExchangeCurrencyInfo';
import {
  ExchangeContainer,
  // Overlay,
  ExchangeButton,
  ExchangeContent,
} from './ExchangePage.style';
import NumberInput from './NumberInput';
import CurrencyList from './CurrencyList';
import ExchangeHeader from './ExchangeHeader';
import SwitchExchangeType from './SwitchExchangeType';
import { CURRENCY_LIST } from './constants';

const ExchangePage: FC = () => {
  const currencyFrom = useAppSelector((state) => state.exchange.currencyFrom);
  const currencyTo = useAppSelector((state) => state.exchange.currencyTo);
  const wallets = useAppSelector((state) => state.wallets);
  const valueFrom = useAppSelector((state) => state.exchange.valueFrom);
  const valueTo = useAppSelector((state) => state.exchange.valueTo);
  const openCurrencyList = useAppSelector((state) => state.exchange.openCurrencyList);
  const exchangeType = useAppSelector((state) => state.exchange.exchangeType);
  const isValid = useAppSelector(isValidExchange);
  const rateBetweenFromAndTo = useAppSelector(
    (state) => getRateBetweenFromAndTo(state, currencyFrom, currencyTo),
  );
  const rateBetweenToAndFrom = useAppSelector(
    (state) => getRateBetweenFromAndTo(state, currencyTo, currencyFrom),
  );
  const dispatch = useAppDispatch();

  const handleOpenCurrenyListFrom = useCallback(
    () => dispatch(setOpenCurrencyList(OpenCurrencyListType.From)),
    [],
  );
  const handleOpenCurrenyListTo = useCallback(
    () => dispatch(setOpenCurrencyList(OpenCurrencyListType.To)),
    [],
  );

  useEffect(() => {
    dispatch(startPollingEuroRate(REFRESH_RATE_IN_MILLISECONDS));
    return () => {
      dispatch(stopPollingEuroRate());
    };
  }, [REFRESH_RATE_IN_MILLISECONDS]);

  const handleSelectCurrency = useCallback((selectedCurrency: CurrencyType) => {
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
  }, []);

  return (
    <ExchangeContainer>
      {openCurrencyList === null
        && (
          // <Overlay>
          <CurrencyList
            currencyList={CURRENCY_LIST}
            wallets={wallets}
            onSelectCurrency={handleSelectCurrency}
          />
          // </Overlay>
        )}
      <ExchangeHeader
        currencyTo={currencyTo}
        currencyFrom={currencyFrom}
        rateBetweenFromAndTo={rateBetweenFromAndTo}
        exchangeType={exchangeType}
      />
      <ExchangeContent>
        <ExchangeCurrencyInfo
          className="exhange-currency-input"
          currency={currencyFrom}
          balance={wallets[currencyFrom]}
          onOpenCurrenyList={handleOpenCurrenyListFrom}
        >
          <NumberInput
            value={valueFrom}
            onChange={(value) => dispatch(setValueFrom({ value, rate: rateBetweenFromAndTo }))}
          />
        </ExchangeCurrencyInfo>
        <SwitchExchangeType
          className="switch-btn"
          exchangeType={exchangeType}
          onChange={(value) => dispatch(setExchangeType(value))}
        />
        <ExchangeCurrencyInfo
          className="exhange-currency-input"
          currency={currencyTo}
          balance={wallets[currencyTo]}
          onOpenCurrenyList={handleOpenCurrenyListTo}
        >
          <NumberInput
            value={valueTo}
            onChange={(value) => dispatch(setValueTo({ value, rate: rateBetweenToAndFrom }))}
          />
        </ExchangeCurrencyInfo>
      </ExchangeContent>
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
