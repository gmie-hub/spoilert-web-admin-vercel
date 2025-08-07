import { type FC, useState } from "react";

import { Table } from "@chakra-ui/react";

import { Modal, Tag } from "@spt/components";
import TransactionDetails from "@spt/partials/transactionDetailsModalContent";
import type { TableBodyProps } from "@spt/utils/types";

const TableBody: FC<TableBodyProps> = ({ items }) => {
  const [transactionItem, setTransactionItem] =
    useState<Record<string, string>>();

  const handleTransactionItem = (item: Record<string, string>) => {
    setTransactionItem(item);
  };

  return (
    <>
      {items.map((item) => (
        <Table.Row py="16">
          <Table.Cell>{item.transactionType}</Table.Cell>

          <Table.Cell>{item.transactionID}</Table.Cell>

          <Table.Cell>{item.amount}</Table.Cell>

          <Table.Cell>{item.dateTime}</Table.Cell>

          <Table.Cell>
            <Tag status={item.status} />
          </Table.Cell>

          <Table.Cell>
            <Modal
              buttonText="View More"
              variant="yellowOutline"
              size="md"
              onClick={() => handleTransactionItem(item)}
            >
              <TransactionDetails item={transactionItem} />
            </Modal>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default TableBody;
