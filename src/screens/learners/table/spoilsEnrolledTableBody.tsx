import type { FC } from "react";

import { Button, HStack, Image, Table, Text } from "@chakra-ui/react";

import { Tag } from "@spt/components";
import { formatDate } from "@spt/utils/dateTime";
import type { TableBodyProps } from "@spt/utils/types";

interface ComponentProps extends TableBodyProps {
  handleNavigation: (item: any) => void;
}

const SpoilsEnrolledTableBody: FC<ComponentProps> = ({
  items,
  handleNavigation,
}) => {
  return (
    <>
      {items?.map((item, index) => (
        <Table.Row key={index}>
          <Table.Cell>
            <HStack>
              <Image
                boxSize="50px"
                src={item?.spoil?.cover_image_url || "/user-icon.svg"}
                borderRadius="full"
              />

              <Text
                textOverflow={
                  item?.spoil?.title?.length > 10 ? "ellipsis" : "initial"
                }
                color="gray"
              >
                {item?.spoil?.title}
              </Text>
            </HStack>
          </Table.Cell>

          <Table.Cell textOverflow="ellipsis">
            <HStack>
              <Image boxSize="50px"  borderRadius="full" src={item?.spoil?.tutor?.avatar || "/user-icon.svg"} />
              <Text
                textOverflow={
                  item?.spoil?.tutor?.first_name?.length > 10
                    ? "ellipsis"
                    : "initial"
                }
                color="gray"
              >
                {item?.spoil?.tutor?.first_name} {item?.spoil?.tutor?.last_name}
              </Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>{formatDate(item.created_at)}</Table.Cell>

          <Table.Cell>
            <Tag status={item.status} />
          </Table.Cell>

          <Table.Cell>
            <Button
              variant="yellowOutline"
              px="3"
              onClick={() => handleNavigation(item)}
            >
              View More
            </Button>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default SpoilsEnrolledTableBody;
