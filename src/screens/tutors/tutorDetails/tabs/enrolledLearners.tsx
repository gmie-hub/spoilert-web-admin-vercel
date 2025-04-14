import type { FC } from "react";

import { Box, Separator, Stack } from "@chakra-ui/react";

import { BackButton, Pagination, Table } from "@spt/components";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { enrolledLearnersData } from "@spt/utils/tutorData";
import type { TableProps } from "@spt/utils/types";

import EnrolledLearnersTableBody from "../../table/enrolledLearnersTableBody";

interface ComponentProps extends TableProps {
  handleBack: () => void;
}

const EnrolledLearners: FC<ComponentProps> = ({ handleBack, onClick }) => {
  const { page, pageSize, startRange, endRange, handlePageChange } =
    usePagination();

  const visibleItems = enrolledLearnersData.slice(startRange, endRange);

  return (
    <Stack>
      <Box>
        <BackButton handleNavigation={handleBack} />
      </Box>

      <Stack gap="4">
        <Separator />

        <Table
          headerChildren={<TableHeader headerItems={header} />}
          bodyChildren={
            <EnrolledLearnersTableBody
              items={visibleItems}
              handleNavigation={onClick}
            />
          }
        />

        <Pagination
          page={page}
          pageSize={pageSize}
          items={visibleItems}
          onPageChange={handlePageChange}
        />
      </Stack>
    </Stack>
  );
};

export default EnrolledLearners;

const header = [
  "Name of Learner",
  "Username",
  "Date Enrolled",
  "Status",
  "Action",
];