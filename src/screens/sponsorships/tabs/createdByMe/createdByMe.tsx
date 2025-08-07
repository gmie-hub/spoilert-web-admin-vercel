import type { FC } from "react";

import { Box, Stack } from "@chakra-ui/react";

import { NoData, Pagination, Table } from "@spt/components";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import {
  createdByMeData,
  createdByMeHeaders,
} from "@spt/utils/sponsorshipData";

import CreatedByMeTableBody from "../../table/createdByMeTableBody";

interface ComponentProps {
  handleNavigation: () => void;
}

const duplicatedItems = Array.from({ length: 15 }, (_, index) => ({
  ...createdByMeData,
  key: index,
}));

const CreatedByMe: FC<ComponentProps> = ({ handleNavigation }) => {
  const { page, pageSize, startRange, endRange, handlePageChange } =
    usePagination();

  const isEmpty = false;

  const visibleItems = duplicatedItems.slice(startRange, endRange);

  return (
    <Box>
      {isEmpty && (
        <NoData
          heading="You Haven’t Sponsored Any Spoils Yet!"
          description="Start by selecting a spoil and sponsoring learners today!"
        />
      )}

      {!isEmpty && (
        <Stack>
          <Table
            headerChildren={<TableHeader headerItems={createdByMeHeaders} />}
            bodyChildren={
              <CreatedByMeTableBody
                items={visibleItems}
                handleNavigation={handleNavigation}
              />
            }
          />

          <Pagination
            page={page}
            pageSize={pageSize}
            items={duplicatedItems}
            onPageChange={handlePageChange}
          />
        </Stack>
      )}
    </Box>
  );
};

export default CreatedByMe;
