import type { FC } from "react";

import { Stack } from "@chakra-ui/react";

import TransactionItem from "@spt/partials/transactionItem";

interface ComponentProps {
  item: Record<string, string>;
}

const SpoilPurchase: FC<ComponentProps> = ({ item }) => {
  return (
    <Stack gap="4">
      <TransactionItem title="Name of Learner" value="Ogunsola Omorinsola" />
      <TransactionItem title="Date & Time" value={item.dateTime} />
      <TransactionItem title="Transaction Type" value={item.transactionType} />
      <TransactionItem title="Description" value={item.description} />
      <TransactionItem title="Spoil Cost Fee" value={item.spoilCostFee} />
      <TransactionItem title="Administrator Fee" value={item.adminFee} />
      <TransactionItem title="Certificate Fee" value={item.certFee} />
      <TransactionItem title="V.A.T (7.5%)" value={item.vat} />
      <TransactionItem title="Total Amount Paid" value={item.totalAmountPaid} />
    </Stack>
  );
};

export default SpoilPurchase;
