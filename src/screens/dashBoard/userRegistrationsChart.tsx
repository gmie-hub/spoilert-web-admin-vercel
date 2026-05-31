import { useState } from "react";

import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

import { useGetSignupMethodQuery } from "@spt/hooks/api/useGetSignupMethodQuery";

// Formats a date as "YYYY-MM-DD" using local time (matches <input type="date">).
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const today = new Date();
const aMonthAgo = new Date();
aMonthAgo.setMonth(aMonthAgo.getMonth() - 1);

const UserRegistrationsChart = () => {
  const [from, setFrom] = useState(formatDate(aMonthAgo));
  const [to, setTo] = useState(formatDate(today));

  const { data, isLoading, isError, errorMessage } = useGetSignupMethodQuery({
    from,
    to,
  });

  const webSignups = data?.overview?.web ?? 0;
  const mobileSignups = data?.overview?.app ?? 0;

  const radialData = [
    { name: "Web Signups", value: webSignups, color: "blue" },
    { name: "Mobile App Signups", value: mobileSignups, color: "#D4A437" },
  ];

  const maxValue = Math.max(webSignups, mobileSignups, 1);

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
          User Registrations
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

      {isLoading ? (
        <Text fontSize="sm" color="gray.500" textAlign="center" py={10}>
          Loading user registrations...
        </Text>
      ) : isError ? (
        <Text fontSize="sm" color="red.500" textAlign="center" py={10}>
          {errorMessage}
        </Text>
      ) : (
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="center"
          gap={{ base: 6, md: 4 }}
        >
          {/* Radial Bar Chart */}
          <RadialBarChart
            width={300}
            height={300}
            cx={150}
            cy={150}
            innerRadius={80}
            outerRadius={140}
            barSize={8}
            data={radialData}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, maxValue]}
              angleAxisId={0}
              tick={false}
            />

            {radialData.map((entry, index) => (
              <RadialBar
                key={index}
                data={[entry]}
                dataKey="value"
                cornerRadius={20}
                background={{ fill: "#E0E0E0" }}
                fill={entry.color}
              />
            ))}
          </RadialBarChart>

          {/* Legend */}
          <Box ml={{ base: 0, md: 4 }}>
            {radialData.map((entry) => (
              <Box key={entry.name} mb={4}>
                <Flex align="center">
                  <Box w={3} h={3} bg={entry.color} borderRadius="full" mr={2} />

                  <Text fontSize="sm" color="gray.600">
                    {entry.name}
                  </Text>
                </Flex>

                <Text fontSize="lg" fontWeight="bold">
                  {entry.value}
                </Text>
              </Box>
            ))}
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default UserRegistrationsChart;
