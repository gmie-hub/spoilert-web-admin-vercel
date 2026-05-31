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

import { useGetSpoilsCreatedQuery } from "@spt/hooks/api/useGetSpoilsCreatedQuery";

import {
  FilterControls,
  type Interval,
  ORANGE,
  formatLabel,
} from "../userInsights/insightsFilters";

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
  const [from, setFrom] = useState("2026-04-30");
  const [to, setTo] = useState("2026-05-31");
  const [interval, setInterval] = useState<Interval>("daily");

  const {
    data: spoilsCreated,
    isLoading,
    isError,
    errorMessage,
  } = useGetSpoilsCreatedQuery({ from, to, interval });

  const spoilsData =
    spoilsCreated?.graph?.map((point) => ({
      month: formatLabel(point.label),
      value: point.total_spoils,
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
          Spoils Created
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
      ) : spoilsData.length === 0 ? (
        <Flex h="300px" align="center" justify="center">
          <Text fontSize="sm" color="#9ca3af">
            No data
          </Text>
        </Flex>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={spoilsData}
            barSize={60}
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
              interval="preserveStartEnd"
              minTickGap={16}
            />
            <YAxis
              domain={[0, "auto"]}
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {spoilsData.map((entry) => (
                <Cell key={entry.month} fill={ORANGE} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
}
