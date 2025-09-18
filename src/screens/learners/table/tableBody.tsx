import type { FC } from "react";

import { Button, HStack, Image, Table, Text } from "@chakra-ui/react";
import { generatePath, useNavigate } from "react-router-dom";

import { Tag } from "@spt/components";
import { routes } from "@spt/routes";
import type { UserDatum } from "@spt/types/user";
import type { TableBodyProps } from "@spt/utils/types";

const TableBody: FC<TableBodyProps> = ({ items, currentPage, pageSize }) => {
  const navigate = useNavigate();

  const handleRowClick = (id: number) => {
    const path = generatePath(routes.main.learners.viewDetails, { id });
    navigate(path);
  };
  return (
    <>
      {items?.map((item:UserDatum, index:number) => (
        <Table.Row py="16" key={index}>
          <Table.Cell>{(currentPage - 1) * pageSize + index + 1}</Table.Cell>
          <Table.Cell>
            <HStack>
              <Image src={item?.avatar || "/user-icon.svg"} />
              <Text
                textOverflow={
                  item.first_name?.length > 10 ? "ellipsis" : "initial"
                }
              >
                {item?.first_name} {item?.middie_name} {item?.last_name}
              </Text>
            </HStack>
          </Table.Cell>

          <Table.Cell textOverflow="ellipsis">{item?.email}</Table.Cell>

          <Table.Cell>{item?.username}</Table.Cell>

          <Table.Cell>
            <Tag status={item?.is_active?.toString()} />
          </Table.Cell>

          <Table.Cell>
            <Button
              variant="yellowOutline"
              px="3"
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
