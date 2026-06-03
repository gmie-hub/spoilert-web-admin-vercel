import type { FC } from "react";

import { Button, HStack, Image, Table, Text } from "@chakra-ui/react";
import { generatePath, useNavigate } from "react-router-dom";

import { routes } from "@spt/routes";
import type { ReportedSpoil } from "@spt/types/report";
import { formatDate } from "@spt/utils/dateTime";

interface ComponentProps {
  items: ReportedSpoil[];
  currentPage: number;
  pageSize: number;
}

const PersonCell = ({ name, avatar }: { name: string; avatar?: string }) => (
  <HStack gap="2" minW="max-content">
    <Image
      boxSize="36px"
      borderRadius="full"
      src={avatar || "/user-icon.svg"}
      alt={name}
    />
    <Text whiteSpace="nowrap">{name}</Text>
  </HStack>
);

const TableBody: FC<ComponentProps> = ({ items, currentPage, pageSize }) => {
  const navigate = useNavigate();

  const handleViewMore = (item: ReportedSpoil) => {
    navigate(
      generatePath(routes.main.reports.reportedSpoylz.details, { id: item.id }),
      { state: { report: item } }
    );
  };

  return (
    <>
      {items?.map((item, index) => (
        <Table.Row key={item.id}>
          <Table.Cell>{(currentPage - 1) * pageSize + index + 1}</Table.Cell>

          <Table.Cell>
            <HStack gap="3" minW="max-content">
              <Image
                boxSize="40px"
                borderRadius="md"
                objectFit="cover"
                src={item.spoil.thumbnail || "/spoil-image.png"}
                alt={item.spoil.title}
              />
              <Text maxW="180px">{item.spoil.title}</Text>
            </HStack>
          </Table.Cell>

          <Table.Cell>
            <PersonCell name={item.tutor.name} avatar={item.tutor.avatar} />
          </Table.Cell>

          <Table.Cell>
            <PersonCell
              name={item.reportedBy.name}
              avatar={item.reportedBy.avatar}
            />
          </Table.Cell>

          <Table.Cell>
            <Text whiteSpace="nowrap">{item.reason}</Text>
          </Table.Cell>

          <Table.Cell>
            <Text whiteSpace="nowrap">{formatDate(item.dateReported)}</Text>
          </Table.Cell>

          <Table.Cell>
            <Text whiteSpace="nowrap">{item.actionTaken}</Text>
          </Table.Cell>

          <Table.Cell>
            <Text whiteSpace="nowrap">{item.adminName}</Text>
          </Table.Cell>

          <Table.Cell>
            <Button
              variant="yellowOutline"
              onClick={() => handleViewMore(item)}
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
