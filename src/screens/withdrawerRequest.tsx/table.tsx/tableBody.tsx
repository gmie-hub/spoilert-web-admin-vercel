import { Button, HStack, Image, Table, Text } from "@chakra-ui/react";

import { withdrawalRequestData } from "@spt/utils/tableData";

const duplicatedItems = Array.from({ length: 15 }, (_, index) => ({
  ...withdrawalRequestData,
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
