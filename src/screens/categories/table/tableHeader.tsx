import { Table } from "@chakra-ui/react";

import { categoriesHeader } from "@spt/utils/tableData";

const TableHeader = () => {
  return (
    <>
      <Table.Row bgColor="#FBFBFB" color="#212529">
        {categoriesHeader?.map((item, index) => (
          <Table.ColumnHeader key={index} py="3">
            {item}
          </Table.ColumnHeader>
        ))}
      </Table.Row>
    </>
  );
};

export default TableHeader;
