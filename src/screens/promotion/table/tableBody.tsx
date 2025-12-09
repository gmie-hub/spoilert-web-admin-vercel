import type { FC } from "react";

import { Button, Table } from "@chakra-ui/react";
import { generatePath, useNavigate } from "react-router-dom";

import { routes } from "@spt/routes";
import type { PromotionData } from "@spt/utils/promotionsData";

interface TableProps {
  data: PromotionData;
}

const TableBody: FC<TableProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleRowClick = (id: number) => {
    const path = generatePath(routes.main.promotions.promotionsDetails, { id });
    navigate(path);
  };

  return (
    <>
      {data?.map((item) => (
        <Table.Row key={item.id} py="16">
          <Table.Cell>{item?.promotionName}</Table.Cell>
          <Table.Cell>{item?.duration}</Table.Cell>
          <Table.Cell>{item?.amount}</Table.Cell>
          <Table.Cell>
            {item?.date} | {item?.time}
          </Table.Cell>

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
