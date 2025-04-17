import { Stack } from "@chakra-ui/react";

import { Pagination, Table } from "@spt/components";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import {
  transactionsData,
  transactionsHeader,
} from "@spt/utils/tutorData";

import TransactionsTableBody from "../../table/transactionsTableBody";

const Transactions = () => {
  const { page, pageSize, startRange, endRange, handlePageChange } =
    usePagination();

  const visibleItems = transactionsData.slice(startRange, endRange);  

  return (
    <Stack gap="4">
      <Table
        headerChildren={<TableHeader headerItems={transactionsHeader} />}
        bodyChildren={<TransactionsTableBody items={visibleItems} />}
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


export default Transactions;