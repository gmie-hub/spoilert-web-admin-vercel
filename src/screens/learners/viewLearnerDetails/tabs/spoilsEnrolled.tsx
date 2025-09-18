import { type FC } from "react";

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
import { useParams } from "react-router-dom";

import { Card, NoData, Pagination, Table } from "@spt/components";
import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import { useLearnerSpoilOverviewQuery } from "@spt/hooks/api/useGetLearnerSpoilOverviewQuery";
import { useGetAllUserSpoilsQuery } from "@spt/hooks/api/useSpoilEnrolledQuery";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { spoilsEnrolledHeader } from "@spt/utils/learnerData";

import SpoilsEnrolledTableBody from "../../table/spoilsEnrolledTableBody";

interface ComponentProps {
  onClick: (item: any) => void;
}

const SpoilsEnrolled: FC<ComponentProps> = ({ onClick }) => {
  const { page, pageSize, handlePageChange } = usePagination();
  const { id } = useParams();

  const { data, isLoading, isError, errorMessage } = useGetAllUserSpoilsQuery(
    Number(id),
    page
  );
  const {
    overviewData,
    isOverviewLoading,
    overviewErrorMessage,
    overviewIsError,
  } = useLearnerSpoilOverviewQuery(Number(id));

  const cardItems = [
    {
      color: "#375AD414",
      icon: "/purple-book.svg",
      status: "Enrolled",
      value: overviewData?.total_spoils_enrolled,
    },
    {
      color: "#FFF9E9",
      icon: "/yellow-book.svg",
      status: "Ongoing",
      value: overviewData?.total_ongoing_spoils,
    },
    {
      color: "#F0FFF4",
      icon: "/check.svg",
      status: "Completed",
      value: overviewData?.total_completed_spoils,
    },
  ];

  const hasNoData = data?.total === 0;

  if (isLoading) return <LoadingState />;
  if (isError) <ErrorState error={errorMessage} />;

  return (
    <Stack gap="6" mt="6">
      <Flex
        flexDir={{ base: "column", md: "row" }}
        justifyContent="space-between"
        gap="8"
      >
        {isOverviewLoading ? (
          <LoadingState />
        ) : overviewIsError ? (
          <ErrorState error={overviewErrorMessage} />
        ) : (
          cardItems.map((item, index) => (
            <Card key={index} px="2">
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
          ))
        )}
      </Flex>

      <Stack gap="4">
        <Separator />
        {!hasNoData && (
          <>
            <Table
              headerChildren={
                <TableHeader headerItems={spoilsEnrolledHeader} />
              }
              bodyChildren={
                <SpoilsEnrolledTableBody
                  items={data?.data}
                  currentPage={page}
                  handleNavigation={onClick}
                />
              }
            />

            <Pagination
              page={page}
              pageSize={pageSize}
              items={data?.total}
              onPageChange={handlePageChange}
            />
          </>
        )}
        {hasNoData && (
          <NoData
            heading="No Spoils Enrolled Yet!"
            description="When this learner enrolls for a spoil, it will appear here."
          ></NoData>
        )}
      </Stack>
    </Stack>
  );
};

export default SpoilsEnrolled;
