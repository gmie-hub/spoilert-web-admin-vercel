import type { FC } from "react";

import { Table } from "@chakra-ui/react";


interface ComponentProps {
  headerItems: Array<any>;
}

const TableHeader: FC<ComponentProps> = ({ headerItems }) => {
  return (
    <>
      <Table.Row bgColor="#FBFBFB" color="#212529">
        {headerItems?.map((item, index) => (
          <Table.ColumnHeader key={index} py="3">
            {item}
          </Table.ColumnHeader>
        ))}
      </Table.Row>
    </>
  );
};

export default TableHeader;
