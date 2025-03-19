import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";

import { Card, Pagination, Table } from "@spt/components";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { sponsorshipsData, sponsorshipsHeader } from "@spt/utils/tableData";

import TableBody from "./table/tableBody";

const duplicatedItems = Array.from({ length: 15 }, (_, index) => ({
  ...sponsorshipsData,
  key: index,
}));

const Sponsorships = () => {
  const { page, pageSize, startRange, endRange, handlePageChange } =
    usePagination();

  const visibleItems = duplicatedItems.slice(startRange, endRange);

  return (
    <Box>
      <Card>
        <Stack gap="4">
          <Flex justify="space-between" align="center">
            <Text fontSize="lg" fontWeight="semibold">
              Sponsorships
            </Text>

            <Button colorScheme="blue">Sponsor A Spoil</Button>
          </Flex>

          <Table
            headerChildren={<TableHeader headerItems={sponsorshipsHeader} />}
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

export default Sponsorships;
