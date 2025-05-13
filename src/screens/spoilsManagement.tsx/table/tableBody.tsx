import type { FC } from "react";

import { Button, HStack, Image, Table, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { routes } from "@spt/routes";
import type { TableBodyProps } from "@spt/utils/types";

const TableBody: FC<TableBodyProps> = ({ items }) => {
  const navigate = useNavigate();

  const handleNavigation = () => navigate(routes.main.spoilMgt.spoilDetails);

  return (
    <>
      {items.map((item) => (
        <Table.Row py="16">
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

          <Table.Cell>{item.category}</Table.Cell>
          <Table.Cell>{item.amount}</Table.Cell>
          <Table.Cell>{item.enrolledLearners}</Table.Cell>
          <Table.Cell>{item.dateCreated}</Table.Cell>

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

export default TableBody;
