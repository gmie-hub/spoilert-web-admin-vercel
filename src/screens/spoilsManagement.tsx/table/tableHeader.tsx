import { Table } from "@chakra-ui/react";

import { SpoilsMgtHeaders } from "@spt/utils/tableData";

const TableHeader = () => {
  return (
    <>
      <Table.Row bgColor="#FBFBFB" color="#212529">
        {SpoilsMgtHeaders?.map((item, index) => (
          <Table.ColumnHeader key={index} py="3">
            {item}
          </Table.ColumnHeader>
        ))}
      </Table.Row>
    </>
  );
};

export default TableHeader;
