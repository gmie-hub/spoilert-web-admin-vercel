import type { FC } from "react";

import { Button, HStack, Image, Table, Text } from "@chakra-ui/react";
import { generatePath, useNavigate } from "react-router-dom";

import { routes } from "@spt/routes";
import type { VerificationDatum } from "@spt/types/verification";
import { formatDate, formatTime } from "@spt/utils/dateTime";

interface ComponentProps {
  data: VerificationDatum[];
}

const TableBody: FC<ComponentProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleRowClick = (id: number) => {
    const path = generatePath(routes.main.pendingVerification.details, { id });
    navigate(path);
  };

  return (
    <>
      {data?.map((item) => (
        <Table.Row key={item?.id} py="16">
          <Table.Cell>
            <HStack>
              <Image src={item?.user?.avatar || "/user-icon.svg"} />
              <Text>{`${item?.user?.first_name} ${item?.user?.last_name}`}</Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>{item?.user?.email}</Table.Cell>
          <Table.Cell>{""}</Table.Cell>
          <Table.Cell>{item?.type}</Table.Cell>
          <Table.Cell>{`${formatDate(item?.created_at)} | ${formatTime(item?.created_at)}`}</Table.Cell>

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
