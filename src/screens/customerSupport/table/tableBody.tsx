import type { FC } from "react";

import { Button, HStack, Image, Table, Text } from "@chakra-ui/react";

import type { TableBodyProps } from "@spt/utils/types";

const TableBody: FC<TableBodyProps> = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <Table.Row py="16">
          <Table.Cell>
            <HStack>
              <Image src="/user-icon.svg" />
              <Text>{item.NameOfTutor}</Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>{item.AmountRequested}</Table.Cell>

          <Table.Cell>{item.DateCreated}</Table.Cell>

          <Table.Cell>
            <Button yellowOutline px="3" my="3">
              View More
            </Button>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default TableBody;
