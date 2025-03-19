import type { FC } from "react";

import { Button, HStack, Image, Table, Tag, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { routes } from "@spt/routes";

interface ComponentProps {
  items: Array<any>;
}

const TableBody: FC<ComponentProps> = ({ items }) => {
  const navigate = useNavigate();

  const handleNavigation = () => navigate(routes.main.learners.viewDetails);

  return (
    <>
      {items.map((item) => (
        <Table.Row py="16">
          <Table.Cell>
            <HStack>
              <Image src="/user-icon.svg" />
              <Text
                textOverflow={
                  item.fullName.length > 10 ? "ellipsis" : "initial"
                }
              >
                {item.fullName}
              </Text>
            </HStack>
          </Table.Cell>

          <Table.Cell textOverflow="ellipsis">{item.email}</Table.Cell>

          <Table.Cell>{item.username}</Table.Cell>


          <Table.Cell>
            <Tag.Root
              size="sm"
              colorPalette="green"
              px="2"
              py="1"
              borderRadius="xl"
            >
              <Tag.Label>{item.status}</Tag.Label>
            </Tag.Root>
          </Table.Cell>

          <Table.Cell>
            <Button yellowOutline px="3" my="3" onClick={handleNavigation}>
              View More
            </Button>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default TableBody;
