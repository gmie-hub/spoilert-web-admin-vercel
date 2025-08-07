import type { FC } from "react";

import { Stack } from "@chakra-ui/react";

import { Pagination, Table } from "@spt/components";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import {
  spoilsCreatedHeader,
  spoilsCreatedTableData,
} from "@spt/utils/tutorData";

import SpoilsCreatedTableBody from "../../table/spoilsCreatedTableBody";

interface ComponentProps {
  onClick: (item: any) => void;
}

const SpoilsCreated: FC<ComponentProps> = ({ onClick }) => {
  const { page, pageSize, startRange, endRange, handlePageChange } =
    usePagination();

  const visibleItems = spoilsCreatedTableData.slice(startRange, endRange);  

  return (
    <Stack gap="4">
      <Table
        headerChildren={<TableHeader headerItems={spoilsCreatedHeader} />}
        bodyChildren={<SpoilsCreatedTableBody items={visibleItems} handleNavigation={onClick} />}
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
