import { Box, Center, Image, SimpleGrid, Text } from "@chakra-ui/react";

import { useGetAnalyticsQuery } from "@spt/hooks/api/useGetAnalyticsQuery";

export default function StatsSection() {
  const { data } = useGetAnalyticsQuery();

  // NOTE: field names mirror DashboardAnalyticsData — confirm against the API.
  const stats = [
    {
      label: "Total Learners",
      value: (data?.total_learners ?? 0).toLocaleString(),
      icon: "/total-learners.svg",
    },
    {
      label: "Total Tutors",
      value: (data?.total_tutors ?? 0).toLocaleString(),
      icon: "/total-tutors.svg",
    },
    {
      label: "Total Spoils",
      value: (data?.total_spoils ?? 0).toLocaleString(),
      icon: "/yellow-book.svg",
    },
    {
      label: "Revenue Generated",
      value: `₦${(data?.revenue_generated ?? 0).toLocaleString()}`,
      icon: "yellow-moneys.svg",
    },
    {
      label: "Total Payout",
      value: `₦${(data?.total_payout ?? 0).toLocaleString()}`,
      icon: "/wallet.svg",
    },
    {
      label: "Total Sponsorships",
      value: (data?.total_sponsorships ?? 0).toLocaleString(),
      icon: "/discount-circle.svg",
    },
  ];

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
          <Center bg="#F7E6C0" p={2} borderRadius="full">
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
