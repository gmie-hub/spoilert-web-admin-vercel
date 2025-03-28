import { Box, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import {
  FaChalkboardTeacher,
  FaGift,
  FaHandHoldingHeart,
  FaMoneyBillWave,
  FaUsers,
} from "react-icons/fa";

const stats = [
  { label: "Total Learners", value: "2,000", icon: FaUsers },
  { label: "Total Tutors", value: "1,200", icon: FaChalkboardTeacher },
  { label: "Total Spoils", value: "1,500", icon: FaGift },
  { label: "Revenue Generated", value: "₦1,100,000", icon: FaMoneyBillWave },
  { label: "Total Payout", value: "2,000", icon: FaMoneyBillWave },
  { label: "Total Sponsorships", value: "100", icon: FaHandHoldingHeart },
];

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
          <Box
            bg="yellow.100"
            p={2}
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="sm"
          >
            <Icon as={stat.icon} boxSize={6} color="yellow.600" />
          </Box>
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