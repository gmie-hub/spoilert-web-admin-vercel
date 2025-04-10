import { Stack } from "@chakra-ui/react";

import { Pagination, Table } from "@spt/components";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import {
  spoilsCreatedHeader,
  spoilsCreatedTableData,
} from "@spt/utils/tutorData";

import SpoilsCreatedTableBody from "../../table/spoilsCreatedTableBody";

const SpoilsCreated = () => {
  const { page, pageSize, startRange, endRange, handlePageChange } =
    usePagination();

  const visibleItems = spoilsCreatedTableData.slice(startRange, endRange);  

  return (
    <Stack gap="4">
      <Table
        headerChildren={<TableHeader headerItems={spoilsCreatedHeader} />}
        bodyChildren={<SpoilsCreatedTableBody items={visibleItems} />}
      />

      <Pagination
        page={page}
        pageSize={pageSize}
        items={visibleItems}
        onPageChange={handlePageChange}
      />
    </Stack>
  );
};

export default SpoilsCreated;
