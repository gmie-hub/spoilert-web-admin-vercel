import type { FC } from "react";

import { Button, HStack, Image, Table, Text } from "@chakra-ui/react";
import { generatePath, useNavigate } from "react-router-dom";

import { Tag } from "@spt/components";
import UserActionsMenu from "@spt/partials/userActionsMenu";
import { routes } from "@spt/routes";
import type { UserDatum } from "@spt/types/user";
import type { TableBodyProps } from "@spt/utils/types";

const TableBody: FC<TableBodyProps> = ({ items, currentPage, pageSize }) => {
  const navigate = useNavigate();

  const handleNavigation = (id: number) => {
    const path = generatePath(routes.main.tutors.tutorDetails, { id });
    navigate(path);
  };

  return (
    <>
      {items?.map((item:UserDatum,index:number) => (
        <Table.Row py="16" key={item?.id ?? index}>
          <Table.Cell>{(currentPage - 1) * pageSize + index + 1}</Table.Cell>

          <Table.Cell>
            <HStack>
              <Image boxSize="50px"  borderRadius="full" src={item?.avatar || "/user-icon.svg"} />
              <Text>{`${item.first_name} ${item?.last_name}`}</Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>{item.email}</Table.Cell>
          <Table.Cell>{item.username}</Table.Cell>
          <Table.Cell>{item.total_spoils_created}</Table.Cell>

          <Table.Cell>
            <Tag
              status={item?.email_verified_at ? "Verified" : "Not Verified"}
            />
          </Table.Cell>

          <Table.Cell>
            <Tag
              status={item?.phone_verified_at ? "Verified" : "Not Verified"}
            />
          </Table.Cell>

          <Table.Cell>
            <Tag status={item.is_active ? "Active" : "Inactive"} />
          </Table.Cell>

          <Table.Cell>
            <HStack gap="1">
              <Button
                variant="yellowOutline"
                px="3"
                onClick={() => handleNavigation(item?.id)}
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
