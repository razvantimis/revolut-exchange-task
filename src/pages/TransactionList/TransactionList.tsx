import { useAppDispatch, useAppSelector } from '@app/state-management/hooks';
import { getTransactionAsyncAction } from '@app/state-management/transactions/getTransactions';
import React, { useEffect } from 'react';
import TransactionItem from './TransactionItem';
import { TransactionListContainer } from './TransactionList.style';

const TransactionList = () => {
  const list = useAppSelector((state) => state.transactions.list);
  const dispatch = useAppDispatch();
  const fetchTransactions = () => dispatch(getTransactionAsyncAction());
  useEffect(() => {
    fetchTransactions();
  }, []);
  console.log(list);

  return (
    <TransactionListContainer>
      {list.map((item) => (
        <TransactionItem key={item.id} amount={item.amount} />
      ))}

      <button type="button" onClick={fetchTransactions}>Load more</button>

    </TransactionListContainer>
  );
};

export default TransactionList;
