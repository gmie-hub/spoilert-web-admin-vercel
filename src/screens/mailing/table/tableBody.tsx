import type { FC } from "react";

import { Button, Table, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { routes } from "@spt/routes";
import type { MailDatum } from "@spt/types/mailing";
import { formatDate } from "@spt/utils/dateTime";

interface ComponentProps {
  items: MailDatum[];
  currentPage?: number;
  pageSize?: number;
}

const TableBody: FC<ComponentProps> = ({
  items,
  currentPage = 1,
  pageSize = 20,
}) => {
  const navigate = useNavigate();

  const handleViewMore = (item: MailDatum) => {
    navigate(routes.main.mailing.details.replace(":id", String(item?.id)), {
      state: { mail: item },
    });
  };

  return (
    <>
      {items?.map((item, index) => (
        <Table.Row key={item?.id}>
          <Table.Cell>{(currentPage - 1) * pageSize + index + 1}</Table.Cell>

          <Table.Cell>{item?.title}</Table.Cell>

          <Table.Cell>
            <Text
              color={
                item?.subject?.toLowerCase() === "general"
                  ? "gray"
                  : "blue.100"
              }
            >
              {item?.subject}
            </Text>
          </Table.Cell>

          <Table.Cell>{formatDate(item?.created_at)}</Table.Cell>

          <Table.Cell>
            <Button
              variant="yellowOutline"
              onClick={() => handleViewMore(item)}
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
