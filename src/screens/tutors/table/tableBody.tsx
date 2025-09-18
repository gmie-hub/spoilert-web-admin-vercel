import type { FC } from "react";

import { Button, HStack, Image, Table } from "@chakra-ui/react";
import { generatePath, useNavigate } from "react-router-dom";

import { Tag } from "@spt/components";
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
        <Table.Row py="16">
          <Table.Cell>{(currentPage - 1) * pageSize + index + 1}</Table.Cell>

          <Table.Cell>
            <HStack>
            <Image boxSize="50px"  borderRadius="full" src={item?.avatar || "/user-icon.svg"} />
            <Table.Cell>{`${item.first_name} ${item?.last_name}`}</Table.Cell>
            </HStack>
          </Table.Cell>

          <Table.Cell>{item.email}</Table.Cell>
          <Table.Cell>{item.username}</Table.Cell>
          <Table.Cell>{item.total_spoils_created}</Table.Cell>

          <Table.Cell>
            <Tag status={item.is_active?.toString()} />
          </Table.Cell>

          <Table.Cell>
            <Button
              variant="yellowOutline"
              px="3"
              onClick={() => handleNavigation(item?.id)}
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
