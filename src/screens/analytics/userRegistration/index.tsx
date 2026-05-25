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

import { useGetUserSignupsQuery } from "@spt/hooks/api/useGetUserSignupsQuery";

import {
  DatePickerButton,
  FilterSelect,
} from "../components/filterControls";

// Turns a "YYYY-MM" bucket into a short readable label e.g. "Aug 25".
const formatMonthLabel = (label: string) => {
  const [year, month] = label.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  if (Number.isNaN(date.getTime())) return label;
  return `${date.toLocaleString("en-US", { month: "short" })} ${year.slice(2)}`;
};

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

  const {
    data: userSignups,
    isLoading,
    isError,
    errorMessage,
  } = useGetUserSignupsQuery();

  const registrationData =
    userSignups?.graph?.map((point) => ({
      month: formatMonthLabel(point.label),
      value: point.total_users,
    })) ?? [];

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

      {isLoading ? (
        <Flex h="300px" align="center" justify="center">
          <Text fontSize="sm" color="#9ca3af">
            Loading…
          </Text>
        </Flex>
      ) : isError ? (
        <Flex h="300px" align="center" justify="center">
          <Text fontSize="sm" color="red.500">
            {errorMessage}
          </Text>
        </Flex>
      ) : registrationData.length === 0 ? (
        <Flex h="300px" align="center" justify="center">
          <Text fontSize="sm" color="#9ca3af">
            No data
          </Text>
        </Flex>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={registrationData}
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
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <YAxis
              domain={[0, "auto"]}
              allowDecimals={false}
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
      )}
    </Box>
  );
}
