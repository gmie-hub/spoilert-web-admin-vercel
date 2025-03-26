import type { FC } from "react";

import { Button, HStack, Image, Table, Text } from "@chakra-ui/react";

import { Tag } from "@spt/components";
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
      {items.map((item, index) => (
        <Table.Row key={index}>
          <Table.Cell>
            <HStack>
              <Image src="/user-icon.svg" />
              <Text
                textOverflow={
                  item.spoilTitle.length > 10 ? "ellipsis" : "initial"
                }
                color="gray"
              >
                {item.spoilTitle}
              </Text>
            </HStack>
          </Table.Cell>

          <Table.Cell textOverflow="ellipsis">
            <HStack>
              <Image src="/user-icon.svg" />
              <Text
                textOverflow={
                  item.tutorName.length > 10 ? "ellipsis" : "initial"
                }
                color="gray"
              >
                {item.tutorName}
              </Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>{item.dateEnrolled}</Table.Cell>

          <Table.Cell>
            <Tag status={item.status} />
          </Table.Cell>

          <Table.Cell>
            <Button yellowOutline px="3" onClick={handleNavigation}>
              View More
            </Button>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default SpoilsEnrolledTableBody;
