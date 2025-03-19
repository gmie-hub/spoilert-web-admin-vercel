import { Box, Stack, Text } from "@chakra-ui/react";

import { Card, Pagination, Table } from "@spt/components";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { withdrawalRequestData, withdrawalRequestHeader } from "@spt/utils/tableData";

import TableBody from "./table.tsx/tableBody";

const duplicatedItems = Array.from({ length: 15 }, (_, index) => ({
  ...withdrawalRequestData,
  key: index,
}));

const WithdrawalRequest = () => {
  const { page, pageSize, startRange, endRange, handlePageChange } =
    usePagination();

  const visibleItems = duplicatedItems.slice(startRange, endRange);

  return (
    <Box>
      <Card>
        <Stack gap="4">
          <Text fontSize="lg" fontWeight="semibold">
            Withdrawal Requests
          </Text>

          <Table
            headerChildren={
              <TableHeader headerItems={withdrawalRequestHeader} />
            }
            bodyChildren={<TableBody items={visibleItems} />}
          />

          <Pagination
            page={page}
            pageSize={pageSize}
            items={duplicatedItems}
            onPageChange={handlePageChange}
          />
        </Stack>
      </Card>
    </Box>
  );
};

export default WithdrawalRequest;
