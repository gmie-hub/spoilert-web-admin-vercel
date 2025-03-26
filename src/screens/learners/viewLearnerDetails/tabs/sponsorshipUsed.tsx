import { Box, Separator, Stack } from "@chakra-ui/react";

import { Pagination, Table } from "@spt/components";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import {
  sponsorshipUsedHeader,
  sponsorshipUsedTableData,
} from "@spt/utils/learnerData";

import SponsorshipUsedTableBody from "../../table/sponsorshipUsedTableBody";

const SponsorshipUsed = () => {
  const { page, pageSize, startRange, endRange, handlePageChange } =
    usePagination();

  const visibleItems = sponsorshipUsedTableData.slice(startRange, endRange);

  return (
    <Stack>
      <Stack>
        <Table
          headerChildren={<TableHeader headerItems={sponsorshipUsedHeader} />}
          bodyChildren={<SponsorshipUsedTableBody items={visibleItems} />}
        />
      </Stack>

      <Separator />

      <Box px={{ md: "5" }} mt="3">
        <Pagination
          page={page}
          pageSize={pageSize}
          items={sponsorshipUsedTableData}
          onPageChange={handlePageChange}
        />
      </Box>
    </Stack>
  );
};

export default SponsorshipUsed;
