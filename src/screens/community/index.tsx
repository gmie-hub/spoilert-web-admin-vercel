import { Box, Stack, Text } from "@chakra-ui/react";

import { Card, Pagination, Table } from "@spt/components";
import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import { useGetCommunitiesQuery } from "@spt/hooks/api/useGetCommunitiesQuery";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { communityHeader } from "@spt/utils/tableData";

import TableBody from "./table/tableBody";

const Community = () => {
  const { page, pageSize, startRange, endRange, handlePageChange } =
    usePagination();

  const { data, isLoading, isError, errorMessage } =
    useGetCommunitiesQuery(page);

  const visibleItems = data?.data?.slice(startRange, endRange);

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState error={errorMessage} />;

  return (
    <Box>
      <Card>
        <Stack gap="4">
          <Text fontSize="lg" fontWeight="semibold">
            Community
          </Text>

          <Table
            headerChildren={<TableHeader headerItems={communityHeader} />}
            bodyChildren={<TableBody items={visibleItems} />}
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

export default Community;