import { Box, Button, Flex, Heading, Image, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Card, NoData, Pagination, Table } from "@spt/components";
import LoadingState from "@spt/components/loadingState";
import { useGetPromotionPackagesQuery } from "@spt/hooks/api/useGetPromotionPackagesQuery";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { routes } from "@spt/routes";
import { useEditStore } from "@spt/store";
import { promotionsHeaders } from "@spt/utils/promotionsData";

import TableBody from "./table/tableBody";

const Promotion = () => {
  const navigate = useNavigate();
  const { page, pageSize, handlePageChange } = usePagination();
  const setIsEdit = useEditStore((state) => state.setIsEdit);
  const setEditingId = useEditStore((state) => state.setEditingId);

  const { data, isLoading, isError, errorMessage } =
    useGetPromotionPackagesQuery(page);

  const items = data?.data ?? [];
  const hasPromotionData = items.length > 0;

  const handleSetupPromotion = () => {
    setIsEdit(false);
    setEditingId(null);
    navigate(routes.main.promotions.setupPromotion);
  };

  if (isLoading) return <LoadingState />;

  return (
    <Box>
      <Card>
        <Stack gap="4">
          <Flex
            direction={{ base: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Heading size={{ base: "md", md: "xl" }}>Promotions</Heading>

            {hasPromotionData && (
              <Button variant="yellow" onClick={handleSetupPromotion}>
                <Image src="/add-circle.svg" alt="add" />
                Set Up Promotion Package
              </Button>
            )}
          </Flex>

          {isError && (
            <Box color="red.500">
              {errorMessage || "Failed to load promotion packages."}
            </Box>
          )}

          {hasPromotionData ? (
            <>
              <Table
                headerChildren={<TableHeader headerItems={promotionsHeaders} />}
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
                heading="You Haven’t Set Any Promotion Package Yet"
                description="You will see all your promotions package set up here once you do it"
              >
                <Button variant="yellow" onClick={handleSetupPromotion}>
                  <Image src="/add-circle.svg" alt="add" />
                  Set Up Promotion Package
                </Button>
              </NoData>
            )
          )}
        </Stack>
      </Card>
    </Box>
  );
};

export default Promotion;
