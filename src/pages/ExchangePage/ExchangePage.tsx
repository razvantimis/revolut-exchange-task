import React, { FC } from 'react';
import { CurrencyType, OpenCurrencyListType } from '@app/state-management/enum';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@app/state-management/store';
import {
  setCurrencyFrom,
  setCurrencyTo,
  setOpenCurrencyList,
  setValueFrom,
  setValueTo,
} from '@app/state-management/exchangeSlice';
import ExchangeCurrencyInfo from './ExchangeCurrencyInfo';
import {
  ExchangeTitle,
  ExchangeSubTitle,
  ExchangeContainer,
  ExchangeHeader,
  Overlay,
} from './ExchangePage.style';
import NumberInput from './NumberInput';
import CurrencyList from './CurrencyList';

const ExchangePage: FC = () => {
  const currencyFrom = useSelector((state: RootState) => state.exchange.currencyFrom);
  const currencyTo = useSelector((state: RootState) => state.exchange.currencyTo);
  const wallets = useSelector((state: RootState) => state.wallets);
  const valueFrom = useSelector((state: RootState) => state.exchange.valueFrom);
  const valueTo = useSelector((state: RootState) => state.exchange.valueTo);
  const openCurrencyList = useSelector((state: RootState) => state.exchange.openCurrencyList);

  const dispatch = useDispatch();

  const handleSelectCurrency = (selectedCurrency: CurrencyType) => {
    switch (openCurrencyList) {
      case OpenCurrencyListType.from:
        dispatch(setCurrencyFrom(selectedCurrency));
        break;
      case OpenCurrencyListType.to:
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
        <ExchangeTitle data-testid="header-title">Sell RON</ExchangeTitle>
        <ExchangeSubTitle data-testid="header-subtitle">lei 1 = 0.454$</ExchangeSubTitle>
      </ExchangeHeader>
      <ExchangeCurrencyInfo
        className="exhange-currency-input"
        currency={currencyFrom}
        balance={wallets[currencyFrom]}
        onOpenCurrenyList={() => dispatch(setOpenCurrencyList(OpenCurrencyListType.from))}
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
        onOpenCurrenyList={() => dispatch(setOpenCurrencyList(OpenCurrencyListType.to))}
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
