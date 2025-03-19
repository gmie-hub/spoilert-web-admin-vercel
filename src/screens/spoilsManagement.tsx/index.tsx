import { Box, Stack, Text } from "@chakra-ui/react";

import { Card, Pagination, Table } from "@spt/components";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { SpoilsMgtData, SpoilsMgtHeaders } from "@spt/utils/tableData";

import TableBody from "./table/tableBody";

const duplicatedItems = Array.from({ length: 15 }, (_, index) => ({
  ...SpoilsMgtData,
  key: index,
}));

const SpoilsManagement = () => {
  const { page, pageSize, startRange, endRange, handlePageChange } =
    usePagination();

  const visibleItems = duplicatedItems.slice(startRange, endRange);
  
  return (
    <Box>
      <Card>
        <Stack gap="4">
          <Text fontSize="lg" fontWeight="semibold">
            Spoil Management
          </Text>

          <Table
            headerChildren={<TableHeader headerItems={SpoilsMgtHeaders} />}
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

export default SpoilsManagement;
