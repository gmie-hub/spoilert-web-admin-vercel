import type { FC } from "react";

import { Button, HStack, Image, Table, Text } from "@chakra-ui/react";
import { generatePath, useNavigate } from "react-router-dom";

import { routes } from "@spt/routes";
import type { BannedUser } from "@spt/types/bannedUser";
import { formatDate } from "@spt/utils/dateTime";

interface ComponentProps {
  items: BannedUser[];
  currentPage: number;
  pageSize: number;
}

const TableBody: FC<ComponentProps> = ({ items, currentPage, pageSize }) => {
  const navigate = useNavigate();

  const handleViewMore = (item: BannedUser) => {
    navigate(generatePath(routes.main.bannedUsers.details, { id: item.id }), {
      state: { bannedUser: item },
    });
  };

  return (
    <>
      {items?.map((item, index) => (
        <Table.Row key={item.id}>
          <Table.Cell>{(currentPage - 1) * pageSize + index + 1}</Table.Cell>

          <Table.Cell>
            <HStack gap="2" minW="max-content">
              <Image
                boxSize="36px"
                borderRadius="full"
                src={item.user.avatar || "/user-icon.svg"}
                alt={item.user.name}
              />
              <Text whiteSpace="nowrap">{item.user.name}</Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>
            <Text whiteSpace="nowrap">{item.timeframe}</Text>
          </Table.Cell>

          <Table.Cell>
            <Text whiteSpace="nowrap">{formatDate(item.banStartDate)}</Text>
          </Table.Cell>

          <Table.Cell>
            <Text whiteSpace="nowrap">{formatDate(item.banEndDate)}</Text>
          </Table.Cell>

          <Table.Cell>
            <Button
              variant="yellowOutline"
              onClick={() => handleViewMore(item)}
              px="3"
              my="3"
            >
              View More
            </Button>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default TableBody;
