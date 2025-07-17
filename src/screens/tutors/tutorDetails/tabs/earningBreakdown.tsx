import {
  Box,
  Center,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import { earningsBreakdownData, summaryData } from "@spt/utils/tutorData";

const duplicateItems = Array.from({ length: 10 }, (_, index) => ({
  ...earningsBreakdownData,
  key: index,
}));

const EarningBreakdown = () => {
  return (
    <Stack gap="6">
      <Text color="#495057">
        Track the tutor’s earnings from all their published Spoils
      </Text>

      <Flex flexDir={{ base: "column", md: "row" }} gap="6">
        {summaryData.map((item) => (
          <Stack
            w="full"
            key={item.id}
            bg={item.bg}
            border={`1px solid ${item.borderColor}`}
            borderRadius="xl"
            px="5"
            py="4"
          >
            <HStack alignItems="center">
              <Center bg={item.boxColor} p="2" borderRadius="md">
                <Image src={item.icon} alt={item.alt} />
              </Center>

              <Text color="#495057">{item.title}</Text>
            </HStack>

            <Text fontWeight="semibold" fontSize="lg">
              {item.value}
            </Text>
          </Stack>
        ))}
      </Flex>

      <Stack gap="3">
        <Text fontWeight="medium">Spoils Earning Breakdown</Text>

        <HStack flexWrap="wrap" columnGap="6" rowGap="4">
          {duplicateItems.map((item) => (
            <Box
              width={{ md: "calc(50% - 0.75rem)" }}
              bg="#ffffff"
              boxShadow="0 4px 40px 0 #2222220D"
              borderRadius="2xl"
              p="4"
            >
              <HStack gap="4">
                <Box>
                  <Image src="/spoil-image.png" alt="spoils" />
                </Box>

                <Stack>
                  <Box>
                    <Text>{item.course}</Text>
                    <Text>{item.category}</Text>
                  </Box>

                  <HStack>
                    <Image src="/profile.svg" alt="profile" />
                    <Text fontSize="sm" color="#495057">
                      {item.enrolleeNo} Enrolled
                    </Text>
                  </HStack>

                  <HStack>
                    <Image src="/grey-wallet.svg" alt="wallet" />
                    <Text fontSize="sm">{item.amount}</Text>
                  </HStack>
                </Stack>
              </HStack>
            </Box>
          ))}
        </HStack>
      </Stack>
    </Stack>
  );
};

export default EarningBreakdown;
