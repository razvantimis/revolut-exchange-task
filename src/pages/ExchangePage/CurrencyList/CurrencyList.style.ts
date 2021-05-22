import styled from 'styled-components';
import { CurrencyFontStyle } from '../ExchangeCurrencyInfo/ExchangeCurrencyInfo.style';

export const CurrencyListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const CurrencyItem = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  background: white;
  padding: 15px;
  border: 1px solid transparent;
  & + & {
    margin-top: 10px;
  }

  :hover {
    border: 1px solid var(--color-grey);
  }
`;

export const CurrencyTitle = styled.div`
  ${CurrencyFontStyle}
`;

export const CurrencyBalance = styled.div`
  color: var(--color-grey);
  font-size: 1.3rem;
`;
