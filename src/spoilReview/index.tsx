import { Box, Stack, Text } from "@chakra-ui/react";

import { Card, Pagination, Table } from "@spt/components";
import LoadingState from "@spt/components/loadingState";
import { useGetSpoilsQuery } from "@spt/hooks/api/useGetSpoilsQuery";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { spoilsReviewHeaders } from "@spt/utils/tableData";

import TableBody from "./table/tableBody";

const SpoilsReview = () => {
  const { page, pageSize, startRange, endRange, handlePageChange } =
    usePagination();
  const { data, isLoading } = useGetSpoilsQuery();

  const visibleItems = data?.data?.slice(startRange, endRange);

  if (isLoading) return <LoadingState />;

  return (
    <Box>
      <Card>
        <Stack gap="4">
          <Text fontSize="lg" fontWeight="semibold">
            Spoil Review
          </Text>

          <Table
            headerChildren={<TableHeader headerItems={spoilsReviewHeaders} />}
            bodyChildren={<TableBody data={visibleItems} />}
          />

          <Pagination
            page={page}
            pageSize={pageSize}
            items={data?.data}
            onPageChange={handlePageChange}
          />
        </Stack>
      </Card>
    </Box>
  );
};

export default SpoilsReview;