import { Button, HStack, Image, Table, Text } from "@chakra-ui/react";

import { communityData } from "@spt/utils/tableData";

const duplicatedItems = Array.from({ length: 15 }, (_, index) => ({
  ...communityData,
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
              <Text>{item.communityName}</Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>{item.spoilTitle}</Table.Cell>
          <Table.Cell>{item.nameOfTutor}</Table.Cell>
          <Table.Cell>{item.numberOfMembers}</Table.Cell>

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
