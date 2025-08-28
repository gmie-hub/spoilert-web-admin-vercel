import { Box, Separator, Stack, Text } from "@chakra-ui/react";

import { Card, Pagination, Table } from "@spt/components";
import LoadingState from "@spt/components/loadingState";
import { useAllPendingVerification } from "@spt/hooks/api/useAllPendingVerificationQuery";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";

import TableBody from "./table/tableBody";

const PendingVerification = () => {
  const { page, pageSize, startRange, endRange, handlePageChange } =
    usePagination();

  const { data, isLoading } = useAllPendingVerification();

  const visibleItems = data?.data?.slice(startRange, endRange);

  if (isLoading) return <LoadingState />;

  return (
    <Box>
      <Card>
        <Stack mb="4">
          <Stack gap="4">
            <Text fontSize="lg" fontWeight="semibold">
              Pending Verifications
            </Text>

            <Table
              headerChildren={<TableHeader headerItems={tableHeader} />}
              bodyChildren={<TableBody data={visibleItems} />}
            />
          </Stack>

          <Separator />

          <Box px={{ md: "5" }} mt="3">
            <Pagination
              page={page}
              pageSize={pageSize}
              items={data?.data}
              onPageChange={handlePageChange}
            />
          </Box>
        </Stack>
      </Card>
    </Box>
  );
};

export default PendingVerification;

const tableHeader = [
  "Name of Tutor",
  "Email Address",
  "Country",
  "ID Type",
  "Date and Time",
  "Action",
];