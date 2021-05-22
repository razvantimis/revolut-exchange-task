// import { fireEvent, render } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import '@testing-library/jest-dom/extend-expect';
// import { CurrencyType } from '@app/state-management/enum';
// import { mockStore } from '@app/state-management/mockStore';
// import CurrencyListPage, { Props } from './CurrencyList';

// describe('<CurrencyListPage />', () => {
//   const getProps = (newProps?: Partial<Props>) => {
//     const mockProps: Props = {
//       onSelectCurrency: jest.fn(),
//       currencyList: [CurrencyType.EUR, CurrencyType.USD],
//     };
//     return {
//       ...mockProps,
//       ...newProps,
//     };
//   };

//   const getComponent = (newProps?: Partial<Props>) => {
//     const props = getProps(newProps);
//     const store = mockStore({ wallets: { EUR: 1, GPB: 2, USD: 2 } });
//     const component = render(
//       <Provider store={store}>
//         <CurrencyListPage {...props} />
//       </Provider>,
//     );
//     return component;
//   };

//   it('should render list of all currency', () => {
//     const { getByTestId } = getComponent({
//       currencyList: [CurrencyType.GPB, CurrencyType.USD],
//     });
//     const currencyListEl = getByTestId('currency-list');

//     expect(currencyListEl.childNodes.length).toBe(2);

//     const firstCurrencyItem = currencyListEl.childNodes[0];

//     expect(firstCurrencyItem.textContent).toBe('GPBBalance: £2');
//   });

//   it('should call onSelectCurrency if user are clicking on one currency item', () => {
//     const onSelectCurrency = jest.fn();
//     const { getByTestId } = getComponent({
//       onSelectCurrency,
//       currencyList: [CurrencyType.GPB, CurrencyType.USD],
//     });
//     const firstCurrencyItem = getByTestId('currency-list').childNodes[0];

//     fireEvent.click(firstCurrencyItem);
//     expect(onSelectCurrency).toBeCalledWith(CurrencyType.GPB);
//   });
// });
