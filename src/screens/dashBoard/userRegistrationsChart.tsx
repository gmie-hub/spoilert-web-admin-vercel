import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

// Sample data with correct colors
const radialData = [
  { name: "Web Signups", value: 5000, color: "blue" }, 
  { name: "Mobile App Signups", value: 20000, color:  "yellow"  }, 
];

const UserRegistrationsChart = () => {
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
          <Input type="date" size="sm" />
          <Input type="date" size="sm" />
        </Flex>
      </Flex>

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
            domain={[0, 20000]} // Adjusted for better scaling
            angleAxisId={0}
            tick={false}
          />

          {radialData.map((entry, index) => (
            <RadialBar
              key={entry.name}
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
                {entry.value / 1000}K
              </Text>
            </Box>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default UserRegistrationsChart;
