import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  border-radius: 15px;
  background: white;
  padding: 15px;
`;

// #region ------ Left Part -------
export const LeftPart = styled.div`
 flex: 1;
`;

export const CurrencyContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

export const CurrencyFontStyle = css`
  color: var(--color-black);
  font-size: 1.5rem;
  font-weight: bold;
`;

export const CurrencyText = styled.span`
  ${CurrencyFontStyle}
  margin-right: 15px;
 
`;
export const ArrowDown = styled.span`
  border: solid var(--color-black);
  border-width: 0 4px 4px 0;
  display: inline-block;
  padding: 6px;
  margin-top: -8px;
  transform: rotate(45deg);

  &:hover {
    border: solid var(--color-grey);
    border-width: 0 4px 4px 0;
  }
`;

// #endregion

// #region ----- Right Part -----
export const RightPart = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

// #endregion
