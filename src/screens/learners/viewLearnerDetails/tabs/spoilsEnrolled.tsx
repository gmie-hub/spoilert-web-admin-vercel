import { type FC, useCallback } from "react";

import {
  Box,
  Center,
  Flex,
  HStack,
  Image,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";

import { Card, Pagination, Table } from "@spt/components";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import {
  spoilsEnrolledHeader,
  spoilsEnrolledTableData,
} from "@spt/utils/learnerData";

import SpoilsEnrolledTableBody from "../../table/spoilsEnrolledTableBody";

interface ComponentProps {
  onClick: (item: any) => void;
}

const SpoilsEnrolled: FC<ComponentProps> = ({ onClick }) => {
  const { page, pageSize, startRange, endRange, handlePageChange } =
    usePagination();

  const visibleItems = spoilsEnrolledTableData.slice(startRange, endRange);

  const handleNavigation = useCallback((item: any) => {
    () => onClick(item);
  }, []);

  return (
    <Stack gap="6" mt="6">
      <Flex
        flexDir={{ base: "column", md: "row" }}
        justifyContent="space-between"
        gap="8"
      >
        {cardItems.map((item, index) => (
          <Card key={index}>
            <HStack gap="4" mx={{ md: "4" }} alignItems="center">
              <Center bg={item.color} h="10" w="10" borderRadius="full">
                <Image src={item.icon} alt="icon" />
              </Center>

              <Box>
                <Text color="gray.300" fontSize="sm">
                  Total Spoils {item.status}
                </Text>
                <Text fontWeight="semibold" fontSize="lg">
                  {item.value}
                </Text>
              </Box>
            </HStack>
          </Card>
        ))}
      </Flex>

      <Stack gap="4">
        <Separator />

        <Table
          headerChildren={<TableHeader headerItems={spoilsEnrolledHeader} />}
          bodyChildren={
            <SpoilsEnrolledTableBody
              items={visibleItems}
              handleNavigation={handleNavigation}
            />
          }
        />

        <Pagination
          page={page}
          pageSize={pageSize}
          items={spoilsEnrolledTableData}
          onPageChange={handlePageChange}
        />
      </Stack>
    </Stack>
  );
};

export default SpoilsEnrolled;

const cardItems = [
  {
    color: "#375AD414",
    icon: "/purple-book.svg",
    status: "Enrolled",
    value: 7,
  },
  {
    color: "#FFF9E9",
    icon: "/yellow-book.svg",
    status: "Ongoing",
    value: 5,
  },
  {
    color: "#F0FFF4",
    icon: "/check.svg",
    status: "Completed",
    value: 2,
  },
];
