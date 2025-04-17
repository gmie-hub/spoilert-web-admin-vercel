import type { FC } from "react";

import { Stack } from "@chakra-ui/react";

import TransactionItem from "@spt/partials/transactionItem";

interface ComponentProps {
  item: Record<string, string>;
}

const Airtime: FC<ComponentProps> = ({ item }) => {
  return (
    <Stack gap="4">
      <TransactionItem title="Date & Time" value={item.dateTime} />
      <TransactionItem title="Transaction Type" value={item.transactionType} />
      <TransactionItem title="Description" value={item.description} />
      <TransactionItem title="Service Provider" value={item.serviceProvider} />
      <TransactionItem title="Amount" value={item.amount} />
      <TransactionItem title="Phone Number" value={item.phone} />
    </Stack>
  );
};

export default Airtime;
