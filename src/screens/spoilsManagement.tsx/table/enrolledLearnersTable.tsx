import type { FC } from "react";

import { Button, HStack, Image, Table, Text } from "@chakra-ui/react";

import { Tag } from "@spt/components";
import type { EnrolledLearner } from "@spt/types/spoils";
import { formatDate } from "@spt/utils/dateTime";

interface ComponentProps {
  items: EnrolledLearner[];
  handleNavigation: (item: any) => void;
}

const EnrolledLearnersTableBody: FC<ComponentProps> = ({
  handleNavigation,
  items,
}) => {
  return (
    <>
      {items.map((item) => {
        const fullName = `${item.first_name ?? ""} ${
          item.last_name ?? ""
        }`.trim();

        return (
          <Table.Row py="16" key={item.id}>
            <Table.Cell>
              <HStack>
                <Image
                  src={item.avatar || item.profile || "/user-icon.svg"}
                  boxSize="32px"
                  borderRadius="full"
                  objectFit="cover"
                />
                <Text textOverflow={fullName.length > 10 ? "ellipsis" : "initial"}>
                  {fullName}
                </Text>
              </HStack>
            </Table.Cell>

            <Table.Cell>{item.username || item.email}</Table.Cell>
            <Table.Cell>
              {item.created_at ? formatDate(item.created_at) : "—"}
            </Table.Cell>

            <Table.Cell>
              <Tag status={item.status || "Active"} />
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
        );
      })}
    </>
  );
};

export default EnrolledLearnersTableBody;
