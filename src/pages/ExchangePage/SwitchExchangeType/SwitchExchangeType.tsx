import { ExchangeType } from '@app/state-management/exchange/enum';
import { FC } from 'react';
import { SwitchButton, SwitchExchangeTypeContainer } from './SwitchExchangeType.style';

type Props = {
  className?: string;
  exchangeType: ExchangeType;
  onChange: (value: ExchangeType) => void;
};

const SwitchExchangeType: FC<Props> = ({
  exchangeType,
  className,
  onChange,
}) => {
  const newValue = exchangeType === ExchangeType.Buy ? ExchangeType.Sell : ExchangeType.Buy;

  return (
    <SwitchExchangeTypeContainer className={className}>
      <SwitchButton onClick={() => onChange(newValue)}>
        Switch to
        {' '}
        {newValue}
      </SwitchButton>
    </SwitchExchangeTypeContainer>
  );
};

export default SwitchExchangeType;
