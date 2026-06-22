import { type FC, useState } from "react";

import { Table } from "@chakra-ui/react";

import { Modal, Tag } from "@spt/components";
import TransactionDetails from "@spt/partials/transactionDetailsModalContent";
import { formatCurrency } from "@spt/utils/currency";
import { formatDateTime } from "@spt/utils/dateTime";
import type { TableBodyProps } from "@spt/utils/types";

// Maps the API payment `type` to the human-readable label the table and the
// details modal switch on.
const typeLabels: Record<string, string> = {
  spoil: "Spoil Purchase",
  sponsored_spoil: "Sponsorship",
};

const TableBody: FC<TableBodyProps> = ({ items }) => {
  const [transactionItem, setTransactionItem] =
    useState<Record<string, string>>();

  const handleTransactionItem = (item: Record<string, string>) => {
    setTransactionItem(item);
  };

  return (
    <>
      {items?.map((item: Record<string, any>, index: number) => {
        const transactionType =
          item.transactionType ?? typeLabels[item.type] ?? item.type;
        const transactionID = item.transactionID ?? item.reference ?? item.id;
        const dateTime = item.dateTime ?? formatDateTime(item.created_at);
        const row = { ...item, transactionType, transactionID, dateTime };

        return (
          <Table.Row key={transactionID ?? index} py="16">
            <Table.Cell>{transactionType}</Table.Cell>

            <Table.Cell>{transactionID}</Table.Cell>

            <Table.Cell>
              {item.amount ? formatCurrency(item.amount, item.currency) : item.amount}
            </Table.Cell>

            <Table.Cell>{dateTime}</Table.Cell>

            <Table.Cell>
              <Tag status={item.status} />
            </Table.Cell>

            <Table.Cell>
              <Modal
                buttonText="View More"
                variant="yellowOutline"
                size="md"
                onClick={() => handleTransactionItem(row)}
              >
                <TransactionDetails item={transactionItem} />
              </Modal>
            </Table.Cell>
          </Table.Row>
        );
      })}
    </>
  );
};

export default TableBody;
