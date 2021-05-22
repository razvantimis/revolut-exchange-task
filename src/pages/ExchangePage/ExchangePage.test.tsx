import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ExchangePage from './ExchangePage';

test('header renders with correct text', () => {
  const component = render(<ExchangePage />);
  const headerTitleEl = component.getByTestId('header-title');
  const headerSubTitleEl = component.getByTestId('header-subtitle');

  expect(headerTitleEl.textContent).toBe('Sell RON');
  expect(headerSubTitleEl.textContent).toBe('lei 1 = 0.454$');
});
