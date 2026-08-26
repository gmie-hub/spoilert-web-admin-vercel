import type { FC } from "react";

import { Button, HStack, Image, Table, Text } from "@chakra-ui/react";
import { generatePath, useNavigate } from "react-router-dom";

import { Tag } from "@spt/components";
import UserActionsMenu from "@spt/partials/userActionsMenu";
import { routes } from "@spt/routes";
import type { UserDatum } from "@spt/types/user";

import { buildFullName } from "../data";

interface ComponentProps {
  items: UserDatum[];
  /** Serial numbers continue across pages. */
  startIndex?: number;
}

const TableBody: FC<ComponentProps> = ({ items, startIndex = 0 }) => {
  const navigate = useNavigate();

  const handleViewMore = (id: number) => {
    navigate(generatePath(routes.main.subAdmins.details, { id }));
  };

  return (
    <>
      {items?.map((item, index) => (
        <Table.Row key={item?.id}>
          <Table.Cell>{startIndex + index + 1}</Table.Cell>

          <Table.Cell>
            <HStack>
              <Image
                src={item?.avatar || "/user-icon.svg"}
                boxSize="40px"
                borderRadius="full"
                objectFit="cover"
              />
              <Text>{buildFullName(item?.first_name, item?.last_name)}</Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>{item?.email}</Table.Cell>

          <Table.Cell>{item?.username || "N/A"}</Table.Cell>

          <Table.Cell>
            <Tag status={item?.is_active ? "Active" : "Inactive"} />
          </Table.Cell>

          <Table.Cell>
            <HStack gap="1">
              <Button
                variant="yellowOutline"
                onClick={() => handleViewMore(item?.id)}
                px="3"
                my="3"
              >
                View More
              </Button>

              <UserActionsMenu user={item} />
            </HStack>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default TableBody;
