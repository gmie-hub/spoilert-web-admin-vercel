import type { FC } from "react";

import { Button, HStack, Image, Table, Text } from "@chakra-ui/react";
import { generatePath, useNavigate } from "react-router-dom";

import { routes } from "@spt/routes";
import type { SpoilsDatum } from "@spt/types/spoils";
import { formatDate } from "@spt/utils/dateTime";

interface TableProps {
  data: SpoilsDatum[];
}

const TableBody: FC<TableProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleRowClick = (id: number) => {
    const path = generatePath(routes.main.spoilReview.spoilDetails, { id });
    navigate(path);
  };

  return (
    <>
      {data?.map((item) => (
        <Table.Row key={item?.id} py="16">
          <Table.Cell>
            <HStack>
              <Image src={item?.cover_image_url} boxSize="10" borderRadius="md" />
              <Text color="gray">{item?.title}</Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>
            <HStack>
              <Image src="/user-icon.svg" />
              <Text color="gray">{`${item?.tutor?.first_name} ${item?.tutor?.last_name}`}</Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>{item?.category?.name}</Table.Cell>
          <Table.Cell>{item?.amount}</Table.Cell>
          <Table.Cell>{item?.course_code}</Table.Cell>
          <Table.Cell>{`${formatDate(item?.created_at)}`}</Table.Cell>

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
