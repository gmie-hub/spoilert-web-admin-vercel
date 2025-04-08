import { Box, Button, HStack, Image, Stack, Text } from "@chakra-ui/react";

import { Card } from "@spt/components";

const UserDetails = () => {
  return (
    <Stack>
      <Card pb="4" pt="3">
        <Stack my="0" gap="4">
          <Text fontWeight="medium">Verified Document</Text>

          <HStack
            justifyContent="space-between"
            alignItems="center"
            bg="#F8F8F8"
            ps="4"
            py="2"
            borderRadius="lg"
          >
            <HStack>
              <Image src="/id-card.png" alt="idCard" />

              <Box>
                <Text fontSize="xs" fontWeight="medium">
                  NIN.png
                </Text>

                <Text fontSize="10px" color="gray.400">
                  3.5MB
                </Text>
              </Box>
            </HStack>

            <Button variant="ghost" px="0" py="0">
              <Image src="/maximize.svg" alt="arrow" />
            </Button>
          </HStack>
        </Stack>
      </Card>

      <Card>
        <Stack>
          <Box bg="#FFFAEE" borderRadius="xl" p="4" border="1px solid #F6EFDE">
            <Stack>
              <Text fontSize="xs" color="gray.500">
                Wallet Balance
              </Text>

              <Text fontWeight="semibold">N800,000</Text>
            </Stack>
          </Box>
        </Stack>
      </Card>
    </Stack>
  );
};

export default UserDetails;
