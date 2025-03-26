import { Box, Separator, Stack, Text } from "@chakra-ui/react";

import { Card, Pagination, Table } from "@spt/components";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { learnerData, learnerHeaders } from "@spt/utils/learnerData";

import TableBody from "./table/tableBody";

const duplicatedItems = Array.from({ length: 15 }, (_, index) => ({
  ...learnerData,
  key: index,
}));

const Learners = () => {
  const { page, pageSize, startRange, endRange, handlePageChange } =
    usePagination();

  const visibleItems = duplicatedItems.slice(startRange, endRange);

  return (
    <Box>
      <Card>
        <Stack mb="4">
          <Stack gap="4">
            <Text fontSize="lg" fontWeight="semibold">
              Learners
            </Text>

            <Table
              headerChildren={<TableHeader headerItems={learnerHeaders} />}
              bodyChildren={<TableBody items={visibleItems} />}
            />
          </Stack>

          <Separator />

          <Box px={{ md: "5" }} mt="3">
            <Pagination
              page={page}
              pageSize={pageSize}
              items={duplicatedItems}
              onPageChange={handlePageChange}
            />
          </Box>
        </Stack>
      </Card>
    </Box>
  );
};

export default Learners;
