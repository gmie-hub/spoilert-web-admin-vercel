import { Box, Separator, Stack, Text } from "@chakra-ui/react";

import { Card, NoData, Pagination, Table } from "@spt/components";
import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import { useGetAllUsersQuery } from "@spt/hooks/api/useGetAllUsersQuery";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { learnerHeaders } from "@spt/utils/learnerData";

import TableBody from "./table/tableBody";

const Learners = () => {
  const { page, pageSize, handlePageChange } = usePagination();

  const { data, isLoading, isError, errorMessage } = useGetAllUsersQuery(
    "learner",
    page
  );

  const hasNoData = data?.total === 0;

  if (isLoading) return <LoadingState />;
  if (isError) <ErrorState error={errorMessage} />;

  return (
    <Box>
      <Card>
        <Stack mb="4">
          <Stack gap="4">
            <Text fontSize="lg" fontWeight="semibold">
              Learners
            </Text>
            {!hasNoData && (
              <>
                <Table
                  headerChildren={<TableHeader headerItems={learnerHeaders} />}
                  bodyChildren={
                    <TableBody
                      items={data?.data}
                      currentPage={page}
                      pageSize={pageSize}
                    />
                  }
                />

                <Pagination
                  page={page}
                  pageSize={pageSize}
                  items={data?.total}
                  onPageChange={handlePageChange}
                />
              </>
            )}
            {hasNoData && (
             <NoData
             heading="No Learners Have Signed Up Yet!"
             description="Learners who sign up will appear here."
           ></NoData>
            )}
          </Stack>

          <Separator />
        </Stack>
      </Card>
    </Box>
  );
};

export default Learners;
