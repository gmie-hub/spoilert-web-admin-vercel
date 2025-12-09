import { Center, Grid, HStack, Image, Stack, Text } from "@chakra-ui/react";

import { Card } from "@spt/components";
import { metricData } from "@spt/utils/promotionsData";

const Metrics = () => {
  return (
    <Stack>
       <Grid templateColumns="repeat(3, 1fr)" gap="4">
        {metricData.map((item) => (
          <Card key={item.id} hasBoxShadow>
            <HStack gap="4" my="4">
              <Center w="12" h="12" borderRadius="full" bg={item.color}>
                <Image src={item.icon} alt={item.title} />
              </Center>

              <Stack gap="1">
                <Text fontSize="sm" color="gray">{item.title}</Text>
                <Text fontWeight="semibold" fontSize="lg">{item.value}</Text>
              </Stack>
            </HStack>
          </Card>
        ))}
      </Grid>
    </Stack>
  );
};

export default Metrics;