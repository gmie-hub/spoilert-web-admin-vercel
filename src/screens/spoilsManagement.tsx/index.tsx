import { Box, Stack, Text } from "@chakra-ui/react";

import { Card, Pagination, Table } from "@spt/components";
import LoadingState from "@spt/components/loadingState";
import { useGetAllSpoilQuery } from "@spt/hooks/api/useGetAllSpoilQuery";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { spoilsMgtHeaders } from "@spt/utils/tableData";

import TableBody from "./table/tableBody";

const SpoilsManagement = () => {
  const { page, pageSize, handlePageChange } = usePagination();

  const { data, isLoading } = useGetAllSpoilQuery(page);

  if (isLoading) return <LoadingState />;

  return (
    <Box>
      <Card>
        <Stack gap="4">
          <Text fontSize="lg" fontWeight="semibold">
            Spoil Management
          </Text>

          <Table
            headerChildren={<TableHeader headerItems={spoilsMgtHeaders} />}
            bodyChildren={
              <TableBody
                data={data?.data}
                currentPage={page}
                pageSize={pageSize}
              />
            }
          />

          <Pagination
            page={page}
            pageSize={pageSize}
            items={data?.total}
            onPageChange={handlePageChange}
          />
        </Stack>
      </Card>
    </Box>
  );
};

export default SpoilsManagement;
