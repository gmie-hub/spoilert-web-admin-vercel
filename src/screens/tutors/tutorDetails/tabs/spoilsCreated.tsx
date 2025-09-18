import type { FC } from "react";

import { Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { Pagination, Table } from "@spt/components";
import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import { useGetAllSpoilByTutorQuery } from "@spt/hooks/api/useGetAllSpoilByTutorQuery";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { spoilsCreatedHeader } from "@spt/utils/tutorData";

import SpoilsCreatedTableBody from "../../table/spoilsCreatedTableBody";


interface ComponentProps {
  onClick: (item: any) => void;
}

const SpoilsCreated: FC<ComponentProps> = ({ onClick }) => {
  const { page, pageSize, handlePageChange } =
    usePagination();
    const { id } = useParams();


  const { data, isLoading, isError, errorMessage } = useGetAllSpoilByTutorQuery(
    Number(id),
    page
  );

  const hasNoData = data?.total === 0;

  if (isLoading) return <LoadingState />;
  if (isError) <ErrorState error={errorMessage} />;

  return (
    <Stack gap="4">
      {!hasNoData && (
        <>
          <Table
            headerChildren={<TableHeader headerItems={spoilsCreatedHeader} />}
            bodyChildren={
              <SpoilsCreatedTableBody
                items={data?.data}
                handleNavigation={onClick}
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
    </Stack>
  );
};

export default SpoilsCreated;
