import { useState } from "react";

import { Box, Stack, Text } from "@chakra-ui/react";

import { Card, Pagination, Table } from "@spt/components";
import { learnerData } from "@spt/utils/tableData";

import TableBody from "./table/tableBody";
import TableHeader from "./table/tableHeader";

const duplicatedItems = Array.from({ length: 150 }, (_, index) => ({
  ...learnerData,
  key: index,
}));

const Learners = () => {
  const [page, setPage] = useState(1);

  const pageSize = 10;
  const count = duplicatedItems.length;

  const startRange = (page - 1) * pageSize;
  const endRange = startRange + pageSize;

  const visibleItems = duplicatedItems.slice(startRange, endRange);

  const handlePageChange = (e) => setPage(e.page);

  return (
    <Box>
      <Card>
        <Stack gap="4">
          <Text fontSize="lg" fontWeight="semibold">
            Learners
          </Text>

          <Table
            headerChildren={<TableHeader />}
            bodyChildren={<TableBody items={visibleItems} />}
          />

          <Pagination
            count={count}
            page={page}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </Stack>
      </Card>
    </Box>
  );
};

export default Learners;
