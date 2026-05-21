import { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  Cell,
} from "recharts";

import {
  DatePickerButton,
  FilterSelect,
} from "../components/filterControls";

const activeLearnerData = [
  { month: "Jan", active: 20 },
  { month: "Feb", active: 38 },
  { month: "Mar", active: 57 },
  { month: "Apr", active: 43 },
  { month: "May", active: 20 },
  { month: "Jun", active: 105 },
  { month: "Jul", active: 88 },
  { month: "Aug", active: 75 },
  { month: "Sep", active: 45 },
  { month: "Oct", active: 24 },
  { month: "Nov", active: 68 },
  { month: "Dec", active: 103 },
];

const signUpData = [
  { name: "WEB", value: 85 },
  { name: "APP", value: 115 },
];

const ORANGE = "#D4A437";
const TEAL = "#013B4D";

const periodOptions = ["This Month", "This Week", "This Year", "All Time"];
const signUpPeriodOptions = ["Today", "This Week", "This Month", "All Time"];

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { value: number }[] }) => {
  if (active && payload?.length) {
    return (
      <Box
        bg={ORANGE}
        color="white"
        px="3"
        py="1"
        borderRadius="md"
        fontSize="sm"
        fontWeight="bold"
        boxShadow="md"
      >
        {payload[0].value}
      </Box>
    );
  }
  return null;
};

export default function UserInsights() {
  const [activePeriod, setActivePeriod] = useState("This Month");
  const [signUpPeriod, setSignUpPeriod] = useState("Today");

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="600" mb={6} color="#212529">
        User Insights
      </Text>

      <Flex direction="column" gap={6}>
        {/* Active Learners */}
        <Box bg="white" p={6} borderRadius="xl" border="1px solid #efefef" boxShadow="sm">
          <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={3}>
            <Text fontSize="md" fontWeight="600" color="#212529">
              Active Learners
            </Text>
            <Flex gap={2} align="center" wrap="wrap">
              <FilterSelect
                options={periodOptions}
                value={activePeriod}
                onChange={setActivePeriod}
              />
              <DatePickerButton label="From" />
              <DatePickerButton label="To" />
            </Flex>
          </Flex>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={activeLearnerData}
              margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray=""
                stroke="#f0f0f0"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
              />
              <YAxis
                domain={[0, 120]}
                ticks={[0, 20, 40, 60, 80, 100, 120]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Line
                type="monotone"
                dataKey="active"
                stroke={ORANGE}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 6, fill: "white", stroke: ORANGE, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* User Sign Ups */}
        <Box bg="white" p={6} borderRadius="xl" border="1px solid #efefef" boxShadow="sm">
          <Flex justify="space-between" align="center" mb={4} wrap="wrap" gap={3}>
            <Text fontSize="md" fontWeight="600" color="#212529">
              User Sign Ups
            </Text>
            <Flex gap={2} align="center" wrap="wrap">
              <FilterSelect
                options={signUpPeriodOptions}
                value={signUpPeriod}
                onChange={setSignUpPeriod}
              />
              <DatePickerButton label="From" />
              <DatePickerButton label="To" />
            </Flex>
          </Flex>

          <Flex align="center" gap={5} mb={5}>
            <Flex align="center" gap={2}>
              <Box w="10px" h="10px" bg={TEAL} borderRadius="full" />
              <Text fontSize="sm" color="#495057">Web</Text>
            </Flex>
            <Flex align="center" gap={2}>
              <Box w="10px" h="10px" bg={ORANGE} borderRadius="full" />
              <Text fontSize="sm" color="#495057">App</Text>
            </Flex>
          </Flex>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={signUpData}
              barSize={220}
              margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray=""
                stroke="#f0f0f0"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
              />
              <YAxis
                domain={[0, 120]}
                ticks={[0, 20, 40, 60, 80, 100, 120]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: "rgba(0,0,0,0.04)" }}
                contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                <Cell fill={TEAL} />
                <Cell fill={ORANGE} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Flex>
    </Box>
  );
}
