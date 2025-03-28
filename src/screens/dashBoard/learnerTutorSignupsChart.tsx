import { Box, Flex, Input, Text } from "@chakra-ui/react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Data for the chart
const barData = [
  { day: "Sun", learners: 60, tutors: 30 },
  { day: "Mon", learners: 70, tutors: 35 },
  { day: "Tue", learners: 65, tutors: 40 },
  { day: "Wed", learners: 80, tutors: 20 },
  { day: "Thu", learners: 75, tutors: 30 },
  { day: "Fri", learners: 85, tutors: 25 },
  { day: "Sat", learners: 60, tutors: 30 },
];

const LearnerTutorSignupsChart = () => {
  return (
    <Box flex={1} bg="white" p={6} borderRadius="lg" boxShadow="md">
      {/* Header */}
      <Flex justify="space-between" align="center" mb={4} direction={{ base: "column", md: "row" }} gap={{ base: 2, md: 0 }}>
        <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold" color="dark">
          Learner & Tutor Sign Ups
        </Text>
        <Flex gap={2} direction={{ base: "column", md: "row" }}>
          <Input type="date" size="sm" />
          <Input type="date" size="sm" />
        </Flex>
      </Flex>

      {/* Legend */}
      <Flex align="center" gap={4} mb={4}>
        <Box w={3} h={3} bg="#D4A017" borderRadius="full" />
        <Text fontSize={{ base: "sm", md: "md" }}>Learners</Text>
        <Box w={3} h={3} bg="#2D4BF0" borderRadius="full" />
        <Text fontSize={{ base: "sm", md: "md" }}>Tutors</Text>
      </Flex>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={barData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="learners" fill="#D4A017" barSize={10} radius={5} />
          <Bar dataKey="tutors" fill="#2D4BF0" barSize={10} radius={5} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default LearnerTutorSignupsChart;
