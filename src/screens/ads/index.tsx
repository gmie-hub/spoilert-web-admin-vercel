import { Box, Button, Flex, Heading, Image, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Card, NoData, Pagination, Table } from "@spt/components";
import LoadingState from "@spt/components/loadingState";
import { useGetAllAdsQuery } from "@spt/hooks/api/useGetAllAdsQuery";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { routes } from "@spt/routes";
import { adsHeader } from "@spt/utils/adsData";

import TableBody from "./table/tableBody";

// import TableBody from "./table/tableBody";

const Ads = () => {
  const navigate = useNavigate();

  const { page, pageSize, handlePageChange } = usePagination();
  const {
    data: adsData,
    isLoading,
    isError,
    adsErrorMessage,
  } = useGetAllAdsQuery(page);
  const handleCreateAd = () => navigate(routes.main.ads.createAd);
  const hasAdsData = Array.isArray(adsData) && adsData.length > 0;
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
            <Heading size={{ base: "md", md: "xl" }}>Ads</Heading>

            {hasAdsData && (
              <Button variant="yellow" onClick={handleCreateAd}>
                <Image src="/add-circle.svg" alt="add" />
                Create Ads
              </Button>
            )}
          </Flex>

          {isLoading ? (
            <LoadingState />
          ) : isError ? (
            <div style={{ color: "red" }}>{adsErrorMessage}</div>
          ) : hasAdsData ? (
            <>
              <Table
                headerChildren={<TableHeader headerItems={adsHeader} />}
                bodyChildren={<TableBody data={adsData} />}
              />
              <Pagination
                page={page}
                pageSize={pageSize}
                items={adsData}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <NoData
              heading="You Haven’t Created Any Ads Yet"
              description="All the Ads you created will be visible here"
            >
              <Button variant="yellow" onClick={handleCreateAd}>
                <Image src="/add-circle.svg" alt="add" />
                Create Ads
              </Button>
            </NoData>
          )}
        </Stack>
      </Card>
    </Box>
  );
};

export default Ads;
