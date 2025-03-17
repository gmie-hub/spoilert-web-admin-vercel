import { Box, Stack, Text } from "@chakra-ui/react";

import { Card, Table } from "@spt/components";

import TableBody from "./table.tsx/tableBody";
import TableHeader from "./table.tsx/tableHeader";

const WithdrawalRequest = () => {
  return (
    <Box>
      <Card>
        <Stack gap="4">
          <Text fontSize="lg" fontWeight="semibold">
          Withdrawal Requests
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

export default WithdrawalRequest;
