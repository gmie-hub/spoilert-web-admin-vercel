import { Stack } from "@chakra-ui/react";

import { Pagination, Table } from "@spt/components";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { findTransactionType } from "@spt/utils";
import { transactionsHeader } from "@spt/utils/tableData";

import TableBody from "../table/tableBody";

const Withdrawal = () => {
  const { page, pageSize, startRange, endRange, handlePageChange } =
    usePagination();

  const WITHDRAWAL = "Withdrawal";

  const duplicatedItems = findTransactionType(WITHDRAWAL);

  const visibleItems = duplicatedItems.slice(startRange, endRange);

  return (
    <Stack gap="3">
      <Table
        headerChildren={<TableHeader headerItems={transactionsHeader} />}
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

export default Withdrawal;
