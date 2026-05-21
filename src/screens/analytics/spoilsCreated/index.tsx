import { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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
  { day: "Sun", value: 38 },
  { day: "Mon", value: 105 },
  { day: "Tue", value: 50 },
  { day: "Wed", value: 68 },
  { day: "Thu", value: 38 },
  { day: "Fri", value: 35 },
  { day: "Sat", value: 85 },
];

const ORANGE = "#D4A437";
const periodOptions = ["This Week", "This Month", "This Year", "All Time"];

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <Box
      bg={ORANGE}
      color="white"
      px="3"
      py="1.5"
      borderRadius="md"
      fontSize="sm"
      fontWeight="bold"
      boxShadow="md"
    >
      <Text fontSize="xs" opacity={0.85}>{label}</Text>
      <Text>{payload[0].value}</Text>
    </Box>
  );
};

export default function SpoilsCreated() {
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
          Spoils Created
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
        <BarChart
          data={weekData}
          barSize={60}
          margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
        >
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
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {weekData.map((entry) => (
              <Cell key={entry.day} fill={ORANGE} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
