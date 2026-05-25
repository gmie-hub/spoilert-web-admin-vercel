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

  const {
    data: spoilsCreated,
    isLoading,
    isError,
    errorMessage,
  } = useGetSpoilsCreatedQuery();

  const spoilsData =
    spoilsCreated?.graph?.map((point) => ({
      month: formatMonthLabel(point.label),
      value: point.total_spoils,
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
