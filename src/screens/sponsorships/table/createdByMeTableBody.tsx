import type { FC } from "react";

import { Button, HStack, Image, Table, Text } from "@chakra-ui/react";

import { Tag } from "@spt/components";
import { useSpoilIDStore } from "@spt/store";
import type { AdminSponsorshipsDatum } from "@spt/types/sponsorship";
import { formatDate } from "@spt/utils/dateTime";

interface ComponentProps {
  handleNavigation: () => void;
  items: AdminSponsorshipsDatum[];
}

const CreatedByMeTableBody: FC<ComponentProps> = ({
  items,
  handleNavigation,
}) => {
  const setSpoilID = useSpoilIDStore((state) => state.setSpoilID);

  const handleClick = (id: number) => {
    handleNavigation();
    setSpoilID(id);
  }
  return (
    <>
      {items?.map((item, index) => (
        <Table.Row key={index} py="16">
          <Table.Cell>
            <HStack>
              <Image src="/enrolled_spoils.png" boxSize="10" />
              <Text color="gray">{`${item?.sponsor?.first_name} ${item?.sponsor?.last_name}`}</Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>
            <HStack>
              <Image src="/user-icon.svg" />
              <Text color="gray">{item?.spoil?.title}</Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>{item?.spoil?.enrolled_users}</Table.Cell>
          <Table.Cell>{item?.total_amount}</Table.Cell>
          <Table.Cell>{formatDate(item?.created_at)}</Table.Cell>

          <Table.Cell>
            <Tag status={item.status} />
          </Table.Cell>

          <Table.Cell>
            <Button
              variant="yellowOutline"
              px="3"
              my="3"
              onClick={() => handleClick(item?.spoil_id)}
            >
              View More
            </Button>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default CreatedByMeTableBody;
