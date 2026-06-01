import type { FC } from "react";

import { Box, Separator, Stack } from "@chakra-ui/react";

import { Pagination, Table } from "@spt/components";
import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import { useGetEnrolledLearnersQuery } from "@spt/hooks/api/useGetEnrolledLearnersQuery";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { enrolledLearnerHeaders } from "@spt/utils/spoilData";

import EnrolledLearnersTableBody from "../table/enrolledLearnersTable";

interface ComponentProps {
  spoilId: number;
  handleNavigation: (item: any) => void;
}

const EnrolledLearners: FC<ComponentProps> = ({
  spoilId,
  handleNavigation,
}) => {
  const { page, pageSize, startRange, endRange, handlePageChange } =
    usePagination();

  const { data, isLoading, isError, errorMessage } =
    useGetEnrolledLearnersQuery(spoilId);

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState error={errorMessage} />;

  const learners = data?.learners ?? [];
  const visibleItems = learners.slice(startRange, endRange);

  return (
    <Stack mb="4">
      <Table
        headerChildren={<TableHeader headerItems={enrolledLearnerHeaders} />}
        bodyChildren={
          <EnrolledLearnersTableBody
            items={visibleItems}
            handleNavigation={handleNavigation}
          />
        }
      />

      <Separator />

      <Box px={{ md: "5" }} mt="3">
        <Pagination
          page={page}
          pageSize={pageSize}
          items={learners.length}
          onPageChange={handlePageChange}
        />
      </Box>
    </Stack>
  );
};

export default EnrolledLearners;
