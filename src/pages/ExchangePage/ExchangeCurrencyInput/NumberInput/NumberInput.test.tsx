import { fireEvent, render } from '@testing-library/react';
import NumberInput, { Props } from './NumberInput';

describe('<NumberInput />', () => {
  const getProps = (newProps?: Partial<Props>) => {
    const mockProps: Props = {
      value: 0,
      onChange: jest.fn(),
    };
    return {
      ...mockProps,
      ...newProps,
    };
  };

  it('should render correctly when value = 10', () => {
    const props = getProps({
      value: 10,
    });
    const component = render(<NumberInput {...props} />);
    const inputEl = component.getByTestId('input') as HTMLInputElement;
    expect(inputEl.value).toBe('10');
  });

  it('should render correctly when value = 10.56', () => {
    const props = getProps({
      value: 10.56,
    });
    const component = render(<NumberInput {...props} />);
    const inputEl = component.getByTestId('input') as HTMLInputElement;
    expect(inputEl.value).toBe('10.56');
  });

  it('should call onChange when user are typing 12.45', () => {
    const props = getProps();
    const component = render(<NumberInput {...props} />);
    const inputEl = component.getByTestId('input') as HTMLInputElement;

    const nextValue = '12.45';
    fireEvent.change(inputEl, { target: { value: nextValue } });
    expect(props.onChange).toBeCalledWith(parseFloat(nextValue));
  });

  it('should\'nt call onChange when user are typing 12.45555', () => {
    const props = getProps();
    const component = render(<NumberInput {...props} />);
    const inputEl = component.getByTestId('input') as HTMLInputElement;

    const nextValue = '12.45555';
    fireEvent.change(inputEl, { target: { value: nextValue } });
    expect(props.onChange).not.toBeCalled();
  });
});
