import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";

import { Card, Table } from "@spt/components";

import TableBody from "./table/tableBody";
import TableHeader from "./table/tableHeader";

const Sponsorships = () => {
  return (
    <Box>
      <Card>
        <Stack gap="4">
          <Flex justify="space-between" align="center">
            <Text fontSize="lg" fontWeight="semibold">
            Sponsorships
            </Text>

            <Button colorScheme="blue">Sponsor A Spoil</Button>
          </Flex>

          <Table
            headerChildren={<TableHeader />}
            bodyChildren={<TableBody />}
          />
        </Stack>
      </Card>
    </Box>
  );
};

export default Sponsorships;
