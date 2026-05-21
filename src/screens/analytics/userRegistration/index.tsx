import { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  DatePickerButton,
  FilterSelect,
} from "../components/filterControls";

const weekData = [
  { day: "Sun", value: 120 },
  { day: "Mon", value: 88 },
  { day: "Tue", value: 118 },
  { day: "Wed", value: 100 },
  { day: "Thu", value: 118 },
  { day: "Fri", value: 100 },
  { day: "Sat", value: 120 },
];

const ORANGE = "#D4A437";
const periodOptions = ["This Week", "This Month", "This Year", "All Time"];

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { value: number }[];
}) => {
  if (!active || !payload?.length) return null;
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
};

export default function UserRegistration() {
  const [period, setPeriod] = useState("This Week");

  return (
    <Box
      bg="white"
      p={6}
      borderRadius="xl"
      border="1px solid #efefef"
      boxShadow="sm"
    >
      <Flex
        justify="space-between"
        align="center"
        mb={6}
        wrap="wrap"
        gap={3}
      >
        <Text fontSize="md" fontWeight="600" color="#212529">
          User Registration
        </Text>
        <Flex gap={2} align="center" wrap="wrap">
          <FilterSelect
            options={periodOptions}
            value={period}
            onChange={setPeriod}
          />
          <DatePickerButton label="From" />
          <DatePickerButton label="To" />
        </Flex>
      </Flex>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={weekData}
          margin={{ top: 10, right: 20, left: -20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="registrationFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ORANGE} stopOpacity={0.18} />
              <stop offset="100%" stopColor={ORANGE} stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray=""
            stroke="#f0f0f0"
            vertical={false}
          />
          <XAxis
            dataKey="day"
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
          <Area
            type="monotone"
            dataKey="value"
            stroke={ORANGE}
            strokeWidth={2.5}
            fill="url(#registrationFill)"
            dot={false}
            activeDot={{
              r: 6,
              fill: "white",
              stroke: ORANGE,
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
}
