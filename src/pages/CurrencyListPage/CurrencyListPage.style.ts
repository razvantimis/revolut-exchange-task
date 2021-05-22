import styled from 'styled-components';
import { CurrencyFontStyle } from '../ExchangePage/ExchangeCurrencyInfo/ExchangeCurrencyInfo.style';

export const CurrencyListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CurrencyItem = styled.div`
  display: flex;
  border-radius: 15px;
  background: white;
  padding: 15px;
`;

export const CurrencyTitle = styled.div`
  ${CurrencyFontStyle}
`;

export const CurrencyBalance = styled.div`
  color: var(--color-grey);
  font-size: 1.3rem;
`;
