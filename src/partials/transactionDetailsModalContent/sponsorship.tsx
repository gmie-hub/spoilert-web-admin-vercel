import type { FC } from "react";

import { Stack } from "@chakra-ui/react";

import TransactionItem from "@spt/partials/transactionItem";
import { formatCurrency } from "@spt/utils/currency";

interface ComponentProps {
  item: Record<string, string>;
}

const Sponsorship: FC<ComponentProps> = ({ item }) => {
  return (
    <Stack gap="4">
      <TransactionItem title="Name of Sponsor" value={item.username} />
      <TransactionItem title="Date & Time" value={item.dateTime} />
      <TransactionItem title="Transaction Type" value={item.transactionType} />
      <TransactionItem title="Payment Gateway" value={item.gateway} />
      <TransactionItem
        title="Spoil Cost"
        value={formatCurrency(item.net_amount, item.currency)}
      />
      <TransactionItem
        title="V.A.T (7.5%)"
        value={formatCurrency(item.tax_amount, item.currency)}
      />
      <TransactionItem
        title="Processing Charge"
        value={formatCurrency(item.charge, item.currency)}
      />
      <TransactionItem
        title="Total Amount Paid"
        value={formatCurrency(item.amount, item.currency)}
      />
    </Stack>
  );
};

export default Sponsorship;
