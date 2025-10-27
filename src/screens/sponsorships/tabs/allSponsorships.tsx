import { Box, Stack } from "@chakra-ui/react";

import { NoData, Pagination, Table } from "@spt/components";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import type { SponsorshipsData } from "@spt/types/sponsorship";
import { sponsorshipsHeader } from "@spt/utils/sponsorshipData";

import TableBody from "../table/tableBody";

const AllSponsorships = ({ data }: { data: SponsorshipsData }) => {
  const isEmpty = data?.data?.length === 0;

  const { page, pageSize, startRange, endRange, handlePageChange } =
    usePagination();

  const visibleItems = data?.data?.slice(startRange, endRange);

  return (
    <Box>
      {isEmpty && (
        <NoData
          heading="No Sponsorship Yet!"
          description="This is where you see the list of people who have sponsored learners before"
        />
      )}

      {!isEmpty && (
        <Stack>
          <Table
            headerChildren={<TableHeader headerItems={sponsorshipsHeader} />}
            bodyChildren={<TableBody data={visibleItems} />}
          />

          <Pagination
            page={page}
            pageSize={pageSize}
            items={data?.data}
            onPageChange={handlePageChange}
          />
        </Stack>
      )}
    </Box>
  );
};

export default AllSponsorships;
