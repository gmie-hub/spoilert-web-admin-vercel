import { Box, Center, Image, SimpleGrid, Text } from "@chakra-ui/react";

export default function StatsSection() {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4} flex="1" width="100%">
      {stats.map((stat, index) => (
        <Box
          key={index}
          bg="#FFFBF3"
          p={4}
          borderRadius="lg"
          border="8px solid white"
          boxShadow="md"
          display="flex"
          alignItems="center"
          gap={4}
          width="100%"
          alignSelf="flex-start"
        >
          <Center
            bg="#F7E6C0"
            p={2}
            borderRadius="full"
          >
            <Image src={stat.icon} />
          </Center>

          <Box>
            <Text fontWeight="400" fontSize="sm">
              {stat.label}
            </Text>

            <Text fontWeight="600" fontSize="lg">
              {stat.value}
            </Text>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
}

const stats = [
  { label: "Total Learners", value: "2,000", icon: "/total-learners.svg" },
  { label: "Total Tutors", value: "1,200", icon: "/total-tutors.svg" },
  { label: "Total Spoils", value: "1,500", icon: "/yellow-book.svg" },
  { label: "Revenue Generated", value: "₦1,100,000", icon: "yellow-moneys.svg" },
  { label: "Total Payout", value: "2,000", icon: "/wallet.svg" },
  { label: "Total Sponsorships", value: "100", icon: "/discount-circle.svg" },
];