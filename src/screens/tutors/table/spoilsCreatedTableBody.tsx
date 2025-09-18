import type { FC } from "react";

import { Button, HStack, Image, Table, Text } from "@chakra-ui/react";

import { Tag } from "@spt/components";
import type { SpoilsDatum } from "@spt/types/spoils";
import { formatDate } from "@spt/utils/dateTime";
import type { TableBodyProps } from "@spt/utils/types";

interface ComponentProps extends TableBodyProps {
  handleNavigation: (item: any) => void;
}

const SpoilsCreatedTableBody: FC<ComponentProps> = ({
  items,
  handleNavigation,
  currentPage,
  pageSize,
}) => {
  return (
    <>
      {items.map((item:SpoilsDatum, index:number) => (
        <Table.Row key={index} py="16">
          <Table.Cell>{(currentPage - 1) * pageSize + index + 1}</Table.Cell>

          <Table.Cell>
            <HStack>
            <Image src={item?.tutor?.avatar || "/user-icon.svg"} />
            <Text color="gray">{item.title}</Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>{`N ${item.display_amount}`}</Table.Cell>
          <Table.Cell>{item.enrolled_users}</Table.Cell>
          <Table.Cell>{item.amount}</Table.Cell>
          <Table.Cell>{formatDate(item.created_at)}</Table.Cell>

          <Table.Cell>
            <Tag status={item.status?.toString()} />
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
