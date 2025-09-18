import { Box, Stack, Text } from "@chakra-ui/react";

import { Card, NoData, Pagination, Table } from "@spt/components";
import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import { useGetAllUsersQuery } from "@spt/hooks/api/useGetAllUsersQuery";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import {  tutorHeaders } from "@spt/utils/tableData";

import TableBody from "./table/tableBody";


const Tutors = () => {
  const { page, pageSize,  handlePageChange } =
    usePagination();

  const { data, isLoading, isError, errorMessage } = useGetAllUsersQuery(
    "tutor",
    page
  );

  const hasNoData = data?.total === 0;

  if (isLoading) return <LoadingState />;
  if (isError) <ErrorState error={errorMessage} />;

  return (
    <Box>
      <Card>
        <Stack gap="4">
          <Text fontSize="lg" fontWeight="semibold">
            Tutors
          </Text>
          {!hasNoData && (
            <>
              <Table
                headerChildren={<TableHeader headerItems={tutorHeaders} />}
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
             heading="No Tutors Have Signed Up Yet!"
             description="Tutors who sign up will appear here."
           ></NoData>
            )}
        </Stack>
      </Card>
    </Box>
  );
};

export default Tutors;
