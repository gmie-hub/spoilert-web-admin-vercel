import type { FC } from "react";

import { Box, Separator, Stack } from "@chakra-ui/react";

import { Pagination, Table } from "@spt/components";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import {
  enrolledLearnerHeaders,
  enrolledLearnersData,
} from "@spt/utils/spoilData";

import EnrolledLearnersTableBody from "../table/enrolledLearnersTable";

const duplicatedItems = Array.from({ length: 15 }, (_, index) => ({
  ...enrolledLearnersData,
  key: index,
}));

interface ComponentProps {
  handleNavigation: (item: any) => void;
}

const EnrolledLearners: FC<ComponentProps> = ({ handleNavigation }) => {
  const { page, pageSize, startRange, endRange, handlePageChange } =
    usePagination();

  const visibleItems = duplicatedItems.slice(startRange, endRange);

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
          items={duplicatedItems}
          onPageChange={handlePageChange}
        />
      </Box>
    </Stack>
  );
};

export default EnrolledLearners;
