import type { FC } from "react";

import { Button, HStack, Image, Table, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { routes } from "@spt/routes";
import type { CommunitiesDatum } from "@spt/types/community";
import type { TableBodyProps } from "@spt/utils/types";

const TableBody: FC<TableBodyProps> = ({
  items,
}: {
  items: CommunitiesDatum[];
}) => {
  const navigate = useNavigate();

  const handleViewMore = (id: number) => {
    navigate(`${routes.main.community.details}?id=${id}`);
  };

  return (
    <>
      {items.map((item) => (
        <Table.Row key={item?.id} py="16">
          <Table.Cell>
            <HStack>
              <Image src="/user-icon.svg" />
              <Text>{item?.name}</Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>
            <HStack>
              {item?.spoil?.cover_image_url && (
                <Image src={item?.spoil?.cover_image_url} w={10} h={10} />
              )}
              <Text>{item?.spoil?.title ?? ""}</Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>
            <HStack>
              {item?.spoil?.tutor?.avatar && (
                <Image src={item?.spoil?.tutor?.avatar ?? ""} />
              )}
              <Text>{`${item?.spoil?.tutor?.first_name ?? ""} ${item?.spoil?.tutor?.last_name ?? ""}`}</Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>{item?.total_members}</Table.Cell>
          <Table.Cell>{""}</Table.Cell>

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
