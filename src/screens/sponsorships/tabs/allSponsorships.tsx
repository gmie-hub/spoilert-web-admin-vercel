import { Stack } from "@chakra-ui/react";

import { Pagination, Table } from "@spt/components";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { sponsorshipsData, sponsorshipsHeader } from "@spt/utils/sponsorshipData";

import TableBody from "../table/tableBody";

const duplicatedItems = Array.from({ length: 15 }, (_, index) => ({
  ...sponsorshipsData,
  key: index,
}));

const AllSponsorships = () => {
  const { page, pageSize, startRange, endRange, handlePageChange } =
    usePagination();

  const visibleItems = duplicatedItems.slice(startRange, endRange);

  return (
    <Stack>
      <Table
        headerChildren={<TableHeader headerItems={sponsorshipsHeader} />}
        bodyChildren={<TableBody items={visibleItems} />}
      />

      <Pagination
        page={page}
        pageSize={pageSize}
        items={duplicatedItems}
        onPageChange={handlePageChange}
      />
    </Stack>
  );
};

export default AllSponsorships;