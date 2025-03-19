import { Box, Stack, Text } from "@chakra-ui/react";

import { Card, Table } from "@spt/components";

import TableBody from "./table/tableBody";
import TableHeader from "./table/tableHeader";

const Transactions = () => {
  return (
    <Box>
      <Card>
        <Stack gap="4">
          <Text fontSize="lg" fontWeight="semibold">
          Transactions
          </Text>

          <Table
            headerChildren={<TableHeader />}
            bodyChildren={<TableBody />}
          />
        </Stack>
      </Card>
    </Box>
  );
};

export default Transactions;
