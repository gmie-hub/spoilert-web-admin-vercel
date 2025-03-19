import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";

import { Card, Pagination, Table } from "@spt/components";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { categoriesData, categoriesHeader } from "@spt/utils/tableData";

import TableBody from "./table/tableBody";

const duplicatedItems = Array.from({ length: 15 }, (_, index) => ({
  ...categoriesData,
  key: index,
}));

const Categories = () => {
  const { page, pageSize, startRange, endRange, handlePageChange } =
    usePagination();

  const visibleItems = duplicatedItems.slice(startRange, endRange);

  return (
    <Box>
      <Card>
        <Stack gap="4">
          <Flex justify="space-between" align="center">
            <Text fontSize="lg" fontWeight="semibold">
              Categories
            </Text>

            <Button yellow>Add Category</Button>
          </Flex>

          <Table
            headerChildren={<TableHeader headerItems={categoriesHeader} />}
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

export default Categories;
