import styled from 'styled-components';

export const ExchangeContainer = styled.div`
  background-color: var(--main-bg-color);
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 20px;
  position: relative;

  .exhange-currency-input {
    margin-top: 15px;
  }

`;

export const Overlay = styled.div`
  position: absolute;
  background: var(--main-bg-color);
  height: 100%;
  width: 100%;
  z-index: 2;
  top: 0;
`;

// #region -------- header ----------

export const ExchangeHeader = styled.div`

`;

export const ExchangeTitle = styled.h1`

`;

export const ExchangeSubTitle = styled.h2`
  color: var(--color-blue);
`;

// #endregion
