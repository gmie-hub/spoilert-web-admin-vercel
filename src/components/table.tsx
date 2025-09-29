import type { FC, ReactNode } from "react";

import { Table } from "@chakra-ui/react";

interface ComponentProps {
  headerChildren: ReactNode;
  bodyChildren: ReactNode;
}

const CustomTable: FC<ComponentProps> = ({ headerChildren, bodyChildren }) => {
  return (
    <Table.ScrollArea>
      <Table.Root size="md">
        <Table.Header>{headerChildren}</Table.Header>

        <Table.Body color="gray">{bodyChildren}</Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default CustomTable;
