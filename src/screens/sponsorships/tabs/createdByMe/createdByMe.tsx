import type { FC } from "react";

import { Box, Stack } from "@chakra-ui/react";

import { NoData, Pagination, Table } from "@spt/components";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import type { AdminSponsorshipsDatum } from "@spt/types/sponsorship";
import {
  createdByMeHeaders,
} from "@spt/utils/sponsorshipData";

import CreatedByMeTableBody from "../../table/createdByMeTableBody";

interface ComponentProps {
  handleNavigation: () => void;
  data: AdminSponsorshipsDatum[]
}

const CreatedByMe: FC<ComponentProps> = ({ data, handleNavigation }) => {
  const { page, pageSize, startRange, endRange, handlePageChange } =
    usePagination();

  const isEmpty = data?.length === 0;

  const visibleItems = data?.slice(startRange, endRange);

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
            items={data}
            onPageChange={handlePageChange}
          />
        </Stack>
      )}
    </Box>
  );
};

export default CreatedByMe;
