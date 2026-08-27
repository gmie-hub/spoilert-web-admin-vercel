import type { FC } from "react";

import { Button, Table, Text } from "@chakra-ui/react";
import { generatePath, useNavigate } from "react-router-dom";

import { routes } from "@spt/routes";
import type { CmsDatum } from "@spt/types/cms";
import { formatDate } from "@spt/utils/dateTime";

interface ComponentProps {
  items: CmsDatum[];
  /** Serial numbers continue across pages. */
  startIndex?: number;
}

const TableBody: FC<ComponentProps> = ({ items, startIndex = 0 }) => {
  const navigate = useNavigate();

  const handleViewMore = (id: number) => {
    navigate(generatePath(routes.main.cms.details, { id }));
  };

  return (
    <>
      {items?.map((item, index) => (
        <Table.Row key={item?.id}>
          <Table.Cell>{startIndex + index + 1}</Table.Cell>

          <Table.Cell>
            <Text>{item?.title}</Text>
          </Table.Cell>

          <Table.Cell>{item?.slug || "N/A"}</Table.Cell>

          <Table.Cell>{formatDate(item?.created_at)}</Table.Cell>

          <Table.Cell>
            <Button
              variant="yellowOutline"
              onClick={() => handleViewMore(item?.id)}
              px="3"
              my="3"
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
