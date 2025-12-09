import { Box, Heading, Stack } from "@chakra-ui/react";

import { Card, NoData, Pagination, Table } from "@spt/components";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import {
  promotionManagementData,
  promotionManagementHeader,
} from "@spt/utils/promotionsData";

import TableBody from "./table/tableBody";

const PromotionsManagement = () => {
  const { page, pageSize, startRange, endRange, handlePageChange } =
    usePagination();

  const visibleItems = promotionManagementData?.slice(startRange, endRange);

  const hasPromotionData = promotionManagementData.length > 0;

  // if (isLoading) return <LoadingState />;

  return (
    <Box>
      <Card>
        <Stack gap="4">
          <Heading size={{ base: "md", md: "xl" }}>Promotions Management</Heading>

          {hasPromotionData ? (
            <>
              <Table
                headerChildren={
                  <TableHeader headerItems={promotionManagementHeader} />
                }
                bodyChildren={<TableBody data={visibleItems} />}
              />

              <Pagination
                page={page}
                pageSize={pageSize}
                items={promotionManagementData}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <NoData
              heading="No Promotion Yet"
              description="Tutors haven’t promoted any spoil yet. You get to see all promoted Spoils here."
            />
          )}
        </Stack>
      </Card>
    </Box>
  );
};

export default PromotionsManagement;
