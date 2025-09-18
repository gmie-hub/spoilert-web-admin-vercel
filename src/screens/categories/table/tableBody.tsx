import type { FC } from "react";

import { Button, HStack, Image, Table, Text } from "@chakra-ui/react";
import { generatePath, useNavigate } from "react-router-dom";

import { routes } from "@spt/routes";
import type { CategoryDatum } from "@spt/types/category";

interface TableProps {
  data: CategoryDatum[];
}

const TableBody: FC<TableProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleRowClick = (id: number) => {
    const path = generatePath(routes.main.categories.categoryDetails, { id });
    navigate(path);
  };

  return (
    <>
      {data?.map((item) => (
        <Table.Row key={item?.id} py="16">
          <Table.Cell>
            <HStack>
              <Image src="/user-icon.svg" />
              <Text>{item?.name}</Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>{item?.total_spoils}</Table.Cell>

          <Table.Cell>{item?.created_at}</Table.Cell>

          <Table.Cell>
            <Button
              variant="yellowOutline"
              px="3"
              my="3"
              onClick={() => handleRowClick(item?.id)}
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
