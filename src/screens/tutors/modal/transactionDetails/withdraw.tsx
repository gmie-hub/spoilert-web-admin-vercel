import type { FC } from "react";

import { Stack } from "@chakra-ui/react";

import TransactionItem from "@spt/partials/transactionItem";

interface ComponentProps {
  item: Record<string, string>;
}

const Withdraw: FC<ComponentProps> = ({ item }) => {
  return (
    <Stack gap="4">
      <TransactionItem title="Date & Time" value={item.dateTime} />
      <TransactionItem title="Transaction Type" value={item.transactionType} />
      <TransactionItem title="Description" value={item.description} />
      <TransactionItem title="Amount" value={item.amount} />
      <TransactionItem title="Account Credited" value={item.accountCredited} />
    </Stack>
  );
};

export default Withdraw;
