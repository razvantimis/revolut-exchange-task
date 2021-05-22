import { render } from '@testing-library/react';
import { Simulate } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';
import { CurrencyType } from '@app/store/enum';
import ExchangeCurrencyInput, { Props } from '../ExchangeCurrencyInput';

describe('<ExchangeCurrencyInput />', () => {
  const getProps = (newProps?: Partial<Props>) => {
    const mockProps: Props = {
      currency: CurrencyType.EUR,
      balance: 12,
      onOpenCurrenyList: jest.fn(),
    };
    return {
      ...mockProps,
      ...newProps,
    };
  };

  it('should render curreny text correctly', () => {
    const props = getProps({
      currency: CurrencyType.USD,
    });
    const component = render(<ExchangeCurrencyInput {...props} />);
    const currencyEl = component.getByTestId('currency-text');

    expect(currencyEl.textContent).toBe('USD');
  });

  it('should call onSwitchCurrency when user click on arrow', () => {
    const props = getProps();

    const component = render(<ExchangeCurrencyInput {...props} />);
    const arrowEl = component.getByTestId('arrow');
    Simulate.click(arrowEl);

    expect(props.onOpenCurrenyList).toBeCalled();
  });

  it('should render balance text correctly', () => {
    const balance = 12.34;
    const props = getProps({
      currency: CurrencyType.USD,
      balance,
    });

    const component = render(<ExchangeCurrencyInput {...props} />);
    const balanceEl = component.getByTestId('balance');

    expect(balanceEl.textContent).toBe('Balance: $12.34');

  });
});
