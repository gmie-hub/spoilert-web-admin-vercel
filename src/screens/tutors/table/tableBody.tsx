import type { FC } from "react";

import { Button, HStack, Image, Table, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Tag } from "@spt/components";
import { routes } from "@spt/routes";
import type { TableBodyProps } from "@spt/utils/types";

const TableBody: FC<TableBodyProps> = ({ items }) => {
  const navigate = useNavigate();

  const handleNavigation = () => navigate(routes.main.tutors.tutorDetails);

  return (
    <>
      {items.map((item) => (
        <Table.Row py="16">
          <Table.Cell>
            <HStack>
              <Image src="/user-icon.svg" />
              <Text color="gray">{item.fullName}</Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>{item.email}</Table.Cell>
          <Table.Cell>{item.username}</Table.Cell>
          <Table.Cell>{item.totalSpoils}</Table.Cell>

          <Table.Cell>
            <Tag status={item.status} />
          </Table.Cell>

          <Table.Cell>
            <Button variant="yellowOutline" px="3" onClick={handleNavigation}>
              View More
            </Button>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default TableBody;
