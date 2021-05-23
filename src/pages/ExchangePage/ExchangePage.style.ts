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
    margin-top: 20px;
  }

  .switch-btn {
    margin-top: 20px;
  }

  .exchange-btn {
    margin-top: 25px;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  background: var(--main-bg-color);
  height: 100%;
  width: 100%;
  z-index: 2;
  top: 0;
  left: 0;
`;

export const ExchangeContent = styled.div`
`;

export const ExchangeButton = styled.button`
  border: none;
  border-radius: 15px;
  background-color: var(--color-btn);
  padding: 10px;
  font-size: 1.4rem;
  color: white;
  font-weight: bold;
  border: 1px solid transparent;

  &:hover:not(&[disabled]) {
    border: 1px solid pink;
    color: pink;
  }

  &[disabled]{
    background-color: var(--color-grey);
    color: #666666;
  }
`;
