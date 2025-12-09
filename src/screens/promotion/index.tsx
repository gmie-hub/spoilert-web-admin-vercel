import { Box, Button, Flex, Heading, Image, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Card, NoData, Pagination, Table } from "@spt/components";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { routes } from "@spt/routes";
import {
  promotionsHeaders,
  promotionsTableData,
} from "@spt/utils/promotionsData";

import TableBody from "./table/tableBody";

const Promotion = () => {
  const navigate = useNavigate();
  const { page, pageSize, startRange, endRange, handlePageChange } =
    usePagination();

  const visibleItems = promotionsTableData?.slice(startRange, endRange);

  const handleSetupPromotion = () =>
    navigate(routes.main.promotions.setupPromotion);

  const hasPromotionData = promotionsTableData.length > 0;

  // if (isLoading) return <LoadingState />;

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

          {hasPromotionData ? (
            <>
              <Table
                headerChildren={<TableHeader headerItems={promotionsHeaders} />}
                bodyChildren={<TableBody data={visibleItems} />}
              />

              <Pagination
                page={page}
                pageSize={pageSize}
                items={promotionsTableData}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <NoData
              heading="You Haven’t Set Any Promotion Package Yet"
              description="You will see all your promotions package set up here once you do it"
            >
              <Button variant="yellow" onClick={handleSetupPromotion}>
                <Image src="/add-circle.svg" alt="add" />
                Set Up Promotion Package
              </Button>
            </NoData>
          )}
        </Stack>
      </Card>
    </Box>
  );
};

export default Promotion;
