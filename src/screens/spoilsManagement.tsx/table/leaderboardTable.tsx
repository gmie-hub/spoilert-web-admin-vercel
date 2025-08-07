import type { FC } from "react";

import { Button, HStack, Image, Table, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { routes } from "@spt/routes";
import type { TableBodyProps } from "@spt/utils/types";

const LeaderboardTableBody: FC<TableBodyProps> = ({ items }) => {
  const navigate = useNavigate();

  const handleNavigation = () => navigate(routes.main.spoilMgt.spoilDetails);

  return (
    <>
      {items.map((item, index) => (
        <Table.Row key={index} py="16">
          <Table.Cell>
            <HStack>
              <Image src="/blue-triangle.svg" />
              <Text color="gray">{index + item.rank}</Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>
            <HStack>
              <Image src="/user-icon.svg" boxSize="10" />
              <Text color="gray">{item.nameOfUser}</Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>
            <Text color="gray">{item.score}</Text>
          </Table.Cell>

          <Table.Cell>
            <Button
              variant="yellowOutline"
              px="3"
              my="3"
              onClick={handleNavigation}
            >
              View Profile
            </Button>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default LeaderboardTableBody;
