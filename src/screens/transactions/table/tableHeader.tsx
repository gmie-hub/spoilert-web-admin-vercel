import { Table } from "@chakra-ui/react";

import { transactionsHeader } from "@spt/utils/tableData";

const TableHeader = () => {
  return (
    <>
      <Table.Row bgColor="#FBFBFB" color="#212529">
        {transactionsHeader?.map((item, index) => (
          <Table.ColumnHeader key={index} py="3">
            {item}
          </Table.ColumnHeader>
        ))}
      </Table.Row>
    </>
  );
};

export default TableHeader;
