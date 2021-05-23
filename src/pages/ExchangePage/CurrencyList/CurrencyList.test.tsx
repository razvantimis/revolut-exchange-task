import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CurrencyType } from '@app/state-management/exchange/enum';
import CurrencyListPage, { Props } from './CurrencyList';

describe('<CurrencyListPage />', () => {
  const getProps = (newProps?: Partial<Props>) => {
    const mockProps: Props = {
      onSelectCurrency: jest.fn(),
      wallets: { EUR: 1, GBP: 2, USD: 2 },
      currencyList: [CurrencyType.EUR, CurrencyType.USD],
    };
    return {
      ...mockProps,
      ...newProps,
    };
  };

  const getComponent = (newProps?: Partial<Props>) => {
    const props = getProps(newProps);
    const component = render(<CurrencyListPage {...props} />);
    return component;
  };

  it('should render list of all currency', () => {
    const { getByTestId } = getComponent({
      currencyList: [CurrencyType.GBP, CurrencyType.USD],
    });
    const currencyListEl = getByTestId('currency-list');

    expect(currencyListEl.childNodes.length).toBe(2);

    const firstCurrencyItem = currencyListEl.childNodes[0];

    expect(firstCurrencyItem.textContent).toBe('GBPBalance: £2.00');
  });

  it('should call onSelectCurrency if user are clicking on one currency item', () => {
    const onSelectCurrency = jest.fn();
    const { getByTestId } = getComponent({
      onSelectCurrency,
      currencyList: [CurrencyType.GBP, CurrencyType.USD],
    });
    const firstCurrencyItem = getByTestId('currency-list').childNodes[0];

    fireEvent.click(firstCurrencyItem);
    expect(onSelectCurrency).toBeCalledWith(CurrencyType.GBP);
  });
});
