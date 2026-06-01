import { useState } from "react";

import { Box, Flex, Input, Text } from "@chakra-ui/react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useGetUserTypeSignupsQuery } from "@spt/hooks/api/useGetUserTypeSignupsQuery";

// Formats a date as "YYYY-MM-DD" using local time (matches <input type="date">).
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const today = new Date();
const aYearAgo = new Date();
aYearAgo.setFullYear(aYearAgo.getFullYear() - 1);

const LearnerTutorSignupsChart = () => {
  const [from, setFrom] = useState(formatDate(aYearAgo));
  const [to, setTo] = useState(formatDate(today));

  const { data, isLoading, isError, errorMessage } = useGetUserTypeSignupsQuery({
    from,
    to,
  });

  const chartData = data?.graph ?? [];

  return (
    <Box flex={1} bg="white" p={6} borderRadius="lg" boxShadow="md">
      {/* Header */}
      <Flex
        justify="space-between"
        align="center"
        mb={4}
        direction={{ base: "column", md: "row" }}
        gap={{ base: 2, md: 0 }}
      >
        <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold" color="dark">
          Learner & Tutor Sign Ups
        </Text>
        <Flex gap={2} direction={{ base: "column", md: "row" }}>
          <Input
            type="date"
            size="sm"
            value={from}
            max={to || undefined}
            onChange={(e) => setFrom(e.target.value)}
          />
          <Input
            type="date"
            size="sm"
            value={to}
            min={from || undefined}
            onChange={(e) => setTo(e.target.value)}
          />
        </Flex>
      </Flex>

      {/* Legend */}
      <Flex align="center" gap={4} mb={4}>
        <Box w={3} h={3} bg="#D4A017" borderRadius="full" />
        <Text fontSize={{ base: "sm", md: "md" }}>Learners</Text>
        <Box w={3} h={3} bg="#2D4BF0" borderRadius="full" />
        <Text fontSize={{ base: "sm", md: "md" }}>Tutors</Text>
      </Flex>

      {isLoading ? (
        <Text fontSize="sm" color="gray.500" textAlign="center" py={10}>
          Loading sign ups...
        </Text>
      ) : isError ? (
        <Text fontSize="sm" color="red.500" textAlign="center" py={10}>
          {errorMessage}
        </Text>
      ) : chartData.length === 0 ? (
        <Text fontSize="sm" color="gray.500" textAlign="center" py={10}>
          No sign ups for the selected period.
        </Text>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="learners" fill="#D4A017" barSize={10} radius={5} />
            <Bar dataKey="tutors" fill="#2D4BF0" barSize={10} radius={5} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export default LearnerTutorSignupsChart;
