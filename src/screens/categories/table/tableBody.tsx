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
              <Text>{item.categoryName}</Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>{item.NoOfSpoils}</Table.Cell>

          <Table.Cell>{item.dateCreated}</Table.Cell>

          <Table.Cell>
            <Button variant="yellowOutline" px="3" my="3">
              View More
            </Button>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default TableBody;
