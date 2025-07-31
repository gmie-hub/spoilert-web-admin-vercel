import { transactionsData } from "./tutorData";

export const findTransactionType = (transactionType: string) => {
  const findWithdrawal = transactionsData?.find(
    (item) => item?.transactionType === transactionType
  );

  const duplicatedItems = Array.from({ length: 15 }, (_, index) => ({
    ...findWithdrawal,
    key: index,
  }));

  return duplicatedItems;
};