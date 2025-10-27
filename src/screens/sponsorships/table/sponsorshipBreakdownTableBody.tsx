import type { FC } from "react";

import { Button, HStack, Image, Table, Text } from "@chakra-ui/react";

import { Tag } from "@spt/components";
import type { SponsorshipDetailsDatum } from "@spt/types/sponsorship";
import { formatDate } from "@spt/utils/dateTime";

interface ComponentProps {
  handleNavigation: () => void;
  items: SponsorshipDetailsDatum[];
}

const SponsorshipBreakdownTableBody: FC<ComponentProps> = ({ items, handleNavigation }) => {
  return (
    <>
      {items.map((item, index) => (
        <Table.Row key={index} py="16">
          <Table.Cell>
            <HStack>
              <Image src="/enrolled_spoils.png" boxSize="10" />
              <Text color="gray">{item?.spoil_title}</Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>
            <HStack>
              <Image src="/user-icon.svg" />
              <Text color="gray">{item?.tutor_name}</Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>{item?.total_sponsored}</Table.Cell>
          <Table.Cell>{item?.total_amount}</Table.Cell>
          <Table.Cell>{formatDate(item?.date_sponsored)}</Table.Cell>
          
          <Table.Cell>
            <Tag status={item.status} />
          </Table.Cell>

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

export default SponsorshipBreakdownTableBody;
