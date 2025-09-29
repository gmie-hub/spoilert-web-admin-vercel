import type { FC } from "react";

import { HStack, Image, Table, Text } from "@chakra-ui/react";

import { Modal } from "@spt/components";
import type { TableBodyProps } from "@spt/utils/types";

import WithdrawalModalContent from "../modal/withdrawalModalContent";

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
            {/* <Button variant="yellowOutline" px="3" my="3">
              View More
            </Button> */}

            <Modal buttonText="View More" variant="yellowOutline" px="3" size="md">
              <WithdrawalModalContent />
            </Modal>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default TableBody;
