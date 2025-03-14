import type { FC, ReactNode } from "react";

import { Table } from "@chakra-ui/react";

interface ComponentProps {
  headerChildren: ReactNode;
  bodyChildren: ReactNode;
}

const CustomTable: FC<ComponentProps> = ({ headerChildren, bodyChildren }) => {
  return (
    <Table.Root size="md" interactive>
      <Table.Header>
        {headerChildren}
      </Table.Header>

      <Table.Body color="gray">{bodyChildren}</Table.Body>
    </Table.Root>
  );
};

export default CustomTable;
