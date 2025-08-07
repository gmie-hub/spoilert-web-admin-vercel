import type { FC } from "react";

import { Button, Table, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { routes } from "@spt/routes";
import type { TableBodyProps } from "@spt/utils/types";

const TableBody: FC<TableBodyProps> = ({ items }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(routes.main.sponsorships.details);
  };

  return (
    <>
      {items.map((item, index) => (
        <Table.Row key={index}>
          <Table.Cell>
            <Text>{item.sponsor}</Text>
          </Table.Cell>

          <Table.Cell>{item.email}</Table.Cell>
          <Table.Cell>{item.amountSponsored}</Table.Cell>
          <Table.Cell>{item.spoilsSponsored}</Table.Cell>
          <Table.Cell>{item.learnersSponsored}</Table.Cell>

          <Table.Cell>
            <Button variant="yellowOutline" px="3" onClick={handleNavigate}>
              View More
            </Button>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default TableBody;
