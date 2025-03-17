import { Button, HStack, Image, Table, Tag, Text } from "@chakra-ui/react";

import { transactionsData } from "@spt/utils/tableData";

const duplicatedItems = Array.from({ length: 15 }, (_, index) => ({
  ...transactionsData,
  key: index,
}));

const TableBody = () => {
  return (
    <>
      {duplicatedItems.map((item) => (
        <Table.Row py="16">
          <Table.Cell>
            <HStack>
              <Image src="/user-icon.svg" />
              <Text>{item.TransactionType}</Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>{item.TransactionId}</Table.Cell>

          <Table.Cell>{item.Amount}</Table.Cell>

          <Table.Cell>{item.DateCreated}</Table.Cell>

          <Table.Cell>
            <Tag.Root size="sm" colorPalette="green" px='2' py="1" borderRadius="xl">
              <Tag.Label>{item.status}</Tag.Label>
            </Tag.Root>
          </Table.Cell>

          <Table.Cell>
            <Button yellowOutline px="3" my="3">View More</Button>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default TableBody;
