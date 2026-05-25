import { Box, Heading, Stack } from "@chakra-ui/react";

import { Card, NoData, Pagination, Table } from "@spt/components";
import LoadingState from "@spt/components/loadingState";
import { useGetPromotionsQuery } from "@spt/hooks/api/useGetPromotionsQuery";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { promotionManagementHeader } from "@spt/utils/promotionsData";

import TableBody from "./table/tableBody";

const PromotionsManagement = () => {
  const { page, pageSize, handlePageChange } = usePagination();

  const { data, isLoading, isError, errorMessage } =
    useGetPromotionsQuery(page);

  const items = data?.data ?? [];
  const hasPromotionData = items.length > 0;

  if (isLoading) return <LoadingState />;

  return (
    <Box>
      <Card>
        <Stack gap="4">
          <Heading size={{ base: "md", md: "xl" }}>Promotions Management</Heading>

          {isError && (
            <Box color="red.500">
              {errorMessage || "Failed to load promotions."}
            </Box>
          )}

          {hasPromotionData ? (
            <>
              <Table
                headerChildren={
                  <TableHeader headerItems={promotionManagementHeader} />
                }
                bodyChildren={<TableBody data={items} />}
              />

              <Pagination
                page={page}
                pageSize={pageSize}
                items={items}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            !isError && (
              <NoData
                heading="No Promotion Yet"
                description="Tutors haven’t promoted any spoil yet. You get to see all promoted Spoils here."
              />
            )
          )}
        </Stack>
      </Card>
    </Box>
  );
};

export default PromotionsManagement;
