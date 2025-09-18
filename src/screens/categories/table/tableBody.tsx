import type { FC } from "react";

import { Button, HStack, Image, Table, Text } from "@chakra-ui/react";
import { generatePath, useNavigate } from "react-router-dom";

import { routes } from "@spt/routes";
import type { CategoryDatum } from "@spt/types/category";
import type { TableBodyProps } from "@spt/utils/types";


const TableBody: FC<TableBodyProps> = ({ items, currentPage, pageSize }) => {
  const navigate = useNavigate();

  const handleRowClick = (id: number) => {
    const path = generatePath(routes.main.categories.categoryDetails, { id });
    navigate(path);
  };

  return (
    <>
      {items?.map((item: CategoryDatum, index:number) => (
        <Table.Row py="16">
          <Table.Cell>{(currentPage - 1) * pageSize + index + 1}</Table.Cell>

          <Table.Cell>
            <HStack>
              <Image
                boxSize="50px"
                borderRadius="50%"
                objectFit="cover"
                src={item?.url}
              />
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
