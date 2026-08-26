import type { FC, ReactNode } from "react";

import { Table } from "@chakra-ui/react";

interface ComponentProps {
  headerChildren: ReactNode;
  bodyChildren: ReactNode;
  /**
   * Width below which the table scrolls horizontally instead of squeezing its
   * columns. Raise it for wide tables (8+ columns) so they scroll rather than
   * cram everything in.
   */
  minW?: string;
}

const CustomTable: FC<ComponentProps> = ({
  headerChildren,
  bodyChildren,
  minW = "48rem",
}) => {
  return (
    // The scroll area needs an explicit width, otherwise it grows to fit the
    // table and the overflow spills out of the card instead of scrolling.
    <Table.ScrollArea w="full" maxW="100%" overflowX="auto">
      <Table.Root
        size="md"
        w="full"
        minW={minW}
        css={{
          // Column labels are short and must stay on one line — wrapping them
          // is what clipped "Full Name" down to "ll Name".
          "& th": { whiteSpace: "nowrap", verticalAlign: "middle" },
          // Long values (emails, titles) wrap inside their own column instead
          // of running past it into the neighbouring cell. `anywhere` rather
          // than `break-word` because only `anywhere` lets the table's layout
          // algorithm size a column narrower than its longest unbroken word.
          "& td": {
            whiteSpace: "normal",
            overflowWrap: "anywhere",
            verticalAlign: "middle",
          },
          // Avatars and row icons sit in flex cells; without this they get
          // squashed when the text beside them wraps.
          "& td img": { flexShrink: 0 },
        }}
      >
        <Table.Header>{headerChildren}</Table.Header>

        <Table.Body color="gray">{bodyChildren}</Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default CustomTable;
