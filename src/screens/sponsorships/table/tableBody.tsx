import type { FC } from "react";

import { Button, HStack, Image, Table, Text } from "@chakra-ui/react";

import type { TableBodyProps } from "@spt/utils/types";

const TableBody: FC<TableBodyProps> = ({ items }) => {
  return (
    <>
      {items.map((item,index) => (
  <Table.Row key={index} py="16">
          <Table.Cell>
            <HStack>
              <Image src="/user-icon.svg" />
              <Text>{item.spoilTitle}</Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>{item.nameOfTutor}</Table.Cell>

          <Table.Cell>{item.Category}</Table.Cell>
          <Table.Cell>{item.Amount}</Table.Cell>
          <Table.Cell>{item.enrolledLearners}</Table.Cell>
          <Table.Cell>{item.dateCreated}</Table.Cell>

          <Table.Cell>
            <Button yellowOutline={true}  px="3" my="3">
              View More
            </Button>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default TableBody;
