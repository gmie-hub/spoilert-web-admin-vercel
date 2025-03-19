import { Box, Stack, Text } from "@chakra-ui/react";

import { Card, Table } from "@spt/components";

import TableBody from "./table/tableBody";
import TableHeader from "./table/tableHeader";

const Cummunity = () => {
  return (
    <Box>
      <Card>
        <Stack gap="4">
          <Text fontSize="lg" fontWeight="semibold">
          Cummunity
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

export default Cummunity;
