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
  CustomTooltip,
  FilterControls,
  type Interval,
  ORANGE,
  formatLabel,
} from "../userInsights/insightsFilters";

export default function UserRegistration() {
  const [from, setFrom] = useState("2026-04-30");
  const [to, setTo] = useState("2026-05-31");
  const [interval, setInterval] = useState<Interval>("daily");

  const {
    data: userSignups,
    isLoading,
    isError,
    errorMessage,
  } = useGetUserSignupsQuery({ from, to, interval });

  const registrationData =
    userSignups?.graph?.map((point) => ({
      month: formatLabel(point.label),
      value: point.total_users,
    })) ?? [];

  return (
    <Box
      bg="white"
      p={{ base: 4, md: 6 }}
      borderRadius="xl"
      border="1px solid #efefef"
      boxShadow="sm"
      w="100%"
    >
      <Flex
        justify="space-between"
        align={{ base: "flex-start", md: "center" }}
        direction={{ base: "column", md: "row" }}
        mb={6}
        wrap="wrap"
        gap={3}
      >
        <Text fontSize="md" fontWeight="600" color="#212529">
          User Registration
        </Text>
        <FilterControls
          from={from}
          to={to}
          interval={interval}
          onFromChange={setFrom}
          onToChange={setTo}
          onIntervalChange={setInterval}
        />
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
              interval="preserveStartEnd"
              minTickGap={20}
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
