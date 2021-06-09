import React, { FC } from 'react';
import { ItemContainer } from './TransactionItem.style';

type Props = {
  amount: number;
};
const TransactionItem: FC<Props> = ({ amount }) => (
  <ItemContainer>
    {amount}
  </ItemContainer>
);

export default TransactionItem;
