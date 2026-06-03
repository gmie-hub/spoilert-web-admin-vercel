import type { FC } from "react";

import { Button, Table, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { routes } from "@spt/routes";
import type { NotificationDatum } from "@spt/types/notification";
import { formatDate } from "@spt/utils/dateTime";

interface ComponentProps {
  items: NotificationDatum[];
}

const TableBody: FC<ComponentProps> = ({ items }) => {
  const navigate = useNavigate();

  const handleViewMore = (item: NotificationDatum) => {
    navigate(routes.main.notifications.details.replace(":id", String(item?.id)), {
      state: { notification: item },
    });
  };

  return (
    <>
      {items?.map((item) => (
        <Table.Row key={item?.id}>
          <Table.Cell>
            <Text>{item?.title}</Text>
          </Table.Cell>

          <Table.Cell>{item?.type}</Table.Cell>

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
