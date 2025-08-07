import type { FC } from "react";

import { Button, HStack, Image, Table, Text } from "@chakra-ui/react";

import { Tag } from "@spt/components";
import type { TableBodyProps } from "@spt/utils/types";

interface ComponentProps extends TableBodyProps {
  handleNavigation: () => void;
}

const SponsorshipBreakdownTableBody: FC<ComponentProps> = ({ items, handleNavigation }) => {
  return (
    <>
      {items.map((item, index) => (
        <Table.Row key={index} py="16">
          <Table.Cell>
            <HStack>
              <Image src="/enrolled_spoils.png" boxSize="10" />
              <Text color="gray">{item.spoilTitle}</Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>
            <HStack>
              <Image src="/user-icon.svg" />
              <Text color="gray">{item.nameOfTutor}</Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>{item.learnersSponsored}</Table.Cell>
          <Table.Cell>{item.amountPaid}</Table.Cell>
          <Table.Cell>{item.dateSponsored}</Table.Cell>
          
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
