import { type FC, useEffect } from "react";

import { Box } from "@chakra-ui/react";

import { NoData, Pagination, Table } from "@spt/components";
import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import { useGetPaymentsQuery } from "@spt/hooks/api/useGetPaymentsQuery";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { transactionsHeader } from "@spt/utils/tableData";

import TableBody from "../table/tableBody";

interface ComponentProps {
  status?: string;
  search?: string;
}

const SpoilPurchase: FC<ComponentProps> = ({ status, search }) => {
  const { page, pageSize, handlePageChange, setPage } = usePagination();

  const { data, isLoading, isError, errorMessage } = useGetPaymentsQuery(
    "spoil",
    page,
    status,
    search
  );

  // Reset to the first page whenever a filter changes.
  useEffect(() => {
    setPage(1);
  }, [status, search, setPage]);

  const hasNoData = data?.total === 0;

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState error={errorMessage} />;

  return (
    <Box>
      {!hasNoData ? (
        <>
          <Table
            headerChildren={<TableHeader headerItems={transactionsHeader} />}
            bodyChildren={<TableBody items={data?.data} />}
          />

          <Pagination
            page={page}
            pageSize={pageSize}
            items={data?.total}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <NoData
          heading="No Spoil Purchases Yet!"
          description="Spoil purchase transactions will appear here."
        />
      )}
    </Box>
  );
};

export default SpoilPurchase;
