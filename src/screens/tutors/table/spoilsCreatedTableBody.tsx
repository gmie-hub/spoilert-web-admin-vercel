import type { FC } from "react";

import { Button, HStack, Image, Table, Text } from "@chakra-ui/react";

import { Tag } from "@spt/components";
import type { TableBodyProps } from "@spt/utils/types";

interface ComponentProps extends TableBodyProps {
  handleNavigation: (item: any) => void;
}

const SpoilsCreatedTableBody: FC<ComponentProps> = ({
  items,
  handleNavigation,
}) => {
  return (
    <>
      {items.map((item, index) => (
        <Table.Row key={index} py="16">
          <Table.Cell>
            <HStack>
              <Image src="/user-icon.svg" />
              <Text color="gray">{item.spoiltTitle}</Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>{item.amount}</Table.Cell>
          <Table.Cell>{item.enrolledLearners}</Table.Cell>
          <Table.Cell>{item.amountEarned}</Table.Cell>
          <Table.Cell>{item.dateCreated}</Table.Cell>

          <Table.Cell>
            <Tag status={item.status} />
          </Table.Cell>

          <Table.Cell>
            <Button
              variant="yellowOutline"
              px="3"
              onClick={() => handleNavigation(item)}
            >
              View More
            </Button>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default SpoilsCreatedTableBody;
