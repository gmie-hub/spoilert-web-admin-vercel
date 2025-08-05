import type { FC } from "react";

import { Button, HStack, Image, Table, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { routes } from "@spt/routes";
import type { VerificationDatum } from "@spt/types/verification";
import { formatDate, formatTime } from "@spt/utils/dateTime";

interface ComponentProps {
  data: VerificationDatum[];
}

const TableBody: FC<ComponentProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleNavigation = () =>
    navigate(routes.main.pendingVerification.details);

  return (
    <>
      {data?.map((item) => (
        <Table.Row key={item?.id} py="16">
          <Table.Cell>
            <HStack>
              <Image src="/user-icon.svg" />
              <Text>{""}</Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>{""}</Table.Cell>
          <Table.Cell>{""}</Table.Cell>
          <Table.Cell>{item?.type}</Table.Cell>

          <Table.Cell>{`${formatDate(item?.created_at)} | ${formatTime(item?.created_at)}`}</Table.Cell>

          <Table.Cell>
            <Button
              variant="yellowOutline"
              px="3"
              my="3"
              onClick={handleNavigation}
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
