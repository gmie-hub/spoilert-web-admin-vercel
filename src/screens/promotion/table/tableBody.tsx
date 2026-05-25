import type { FC } from "react";

import { Button, Table } from "@chakra-ui/react";
import { generatePath, useNavigate } from "react-router-dom";

import { routes } from "@spt/routes";
import type { PromotionPackage } from "@spt/types/promotion";

interface TableProps {
  data: PromotionPackage[];
}

const formatAmount = (amount: string | number) => {
  const value = Number(amount);
  if (Number.isNaN(value)) return amount;
  return `₦${value.toLocaleString()}`;
};

const formatDate = (iso: string) => {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const dateStr = date.toLocaleDateString();
  const timeStr = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${dateStr} | ${timeStr}`;
};

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
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>
            {item.duration} {Number(item.duration) === 1 ? "day" : "days"}
          </Table.Cell>
          <Table.Cell>{formatAmount(item.amount)}</Table.Cell>
          <Table.Cell>{formatDate(item.created_at)}</Table.Cell>

          <Table.Cell>
            <Button
              variant="yellowOutline"
              px="3"
              my="3"
              onClick={() => handleRowClick(item.id)}
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
