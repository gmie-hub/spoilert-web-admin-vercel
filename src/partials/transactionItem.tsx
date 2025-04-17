import type { FC } from "react";

import { Box, HStack, Separator, Stack, Text } from "@chakra-ui/react";

interface ComponentProps {
  title: string;
  value: string;
}

const TransactionItem: FC<ComponentProps> = ({ title, value }) => {
  return (
    <Stack>
      <HStack justifyContent="space-between">
        <Box w="50%">
          <Text color="gray">{title}</Text>
        </Box>
        
        <Box w="50%">
          <Text fontWeight="medium" fontSize="md" textAlign="right">
            {value}
          </Text>
        </Box>
      </HStack>

      <Separator />
    </Stack>
  );
};

export default TransactionItem;
