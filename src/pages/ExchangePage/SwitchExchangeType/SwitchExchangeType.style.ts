import styled from 'styled-components';

export const SwitchExchangeTypeContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const SwitchButton = styled.button`
  border: none;
  border-radius: 10px;
  background-color: white;
  padding: 7px;
  font-size: 1.2rem;
  color: black;
  font-weight: bold;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid var(--color-blue);
    color: var(--color-blue);
  }
`;
