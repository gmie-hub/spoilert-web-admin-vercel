import type { FC } from "react";

import { Table } from "@chakra-ui/react";

import type { TableBodyProps } from "@spt/utils/types";

const SponsorshipUsedTableBody: FC<TableBodyProps> = ({ items }) => {
  return (
    <>
      {items.map((item, index) => (
        <Table.Row key={index}>
          <Table.Cell>{item.sponsorName}</Table.Cell>

          <Table.Cell textOverflow="ellipsis">{item.spoiltTitle}</Table.Cell>

          <Table.Cell>{item.codeUsed}</Table.Cell>

          <Table.Cell>{item.dateUsed}</Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default SponsorshipUsedTableBody;
