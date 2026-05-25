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

import { useGetPaymentsRevenueQuery } from "@spt/hooks/api/useGetPaymentsRevenueQuery";

import { FilterSelect } from "../components/filterControls";

const TEAL = "#013B4D";

// Turns a "YYYY-MM" bucket into a short readable label e.g. "Aug 25".
const formatMonthLabel = (label: string) => {
  const [year, month] = label.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  if (Number.isNaN(date.getTime())) return label;
  return `${date.toLocaleString("en-US", { month: "short" })} ${year.slice(2)}`;
};

const periodOptions = ["Monthly", "Weekly", "Daily"];
const yearOptions = ["2025", "2024", "2023", "2022"];

const formatYAxis = (value: number) =>
  value === 0 ? "0" : value.toLocaleString();

const formatRevenue = (value: number) =>
  `₦${value.toLocaleString()}`;

export default function RevenueGenerated() {
  const [period, setPeriod] = useState("Monthly");
  const [year, setYear] = useState("2025");

  const {
    data: paymentsRevenue,
    isLoading,
    isError,
    errorMessage,
  } = useGetPaymentsRevenueQuery();

  const monthlyData =
    paymentsRevenue?.graph?.map((point) => ({
      month: formatMonthLabel(point.label),
      revenue: point.revenue,
    })) ?? [];

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
        bg="#EAF4F8"
        border="1px solid #c5dfe8"
        px="3"
        py="2"
        borderRadius="md"
        boxShadow="sm"
        minW="120px"
      >
        <Text fontSize="xs" color="#4a7080" mb="1">
          {label}, {year}
        </Text>
        <Text fontSize="sm" fontWeight="700" color={TEAL}>
          {formatRevenue(payload[0].value)}
        </Text>
      </Box>
    );
  };

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="600" mb={6} color="#212529">
        Revenue Generated
      </Text>

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
            Monthly Revenue Generated
          </Text>
          <Flex gap={2} align="center">
            <FilterSelect
              options={periodOptions}
              value={period}
              onChange={setPeriod}
            />
            <FilterSelect
              options={yearOptions}
              value={year}
              onChange={setYear}
            />
          </Flex>
        </Flex>

        {isLoading ? (
          <Flex h="320px" align="center" justify="center">
            <Text fontSize="sm" color="#9ca3af">
              Loading…
            </Text>
          </Flex>
        ) : isError ? (
          <Flex h="320px" align="center" justify="center">
            <Text fontSize="sm" color="red.500">
              {errorMessage}
            </Text>
          </Flex>
        ) : monthlyData.length === 0 ? (
          <Flex h="320px" align="center" justify="center">
            <Text fontSize="sm" color="#9ca3af">
              No data
            </Text>
          </Flex>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart
              data={monthlyData}
              margin={{ top: 10, right: 20, left: 60, bottom: 5 }}
            >
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={TEAL} stopOpacity={0.12} />
                  <stop offset="100%" stopColor={TEAL} stopOpacity={0.02} />
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
                tickFormatter={formatYAxis}
                width={80}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: TEAL,
                  strokeDasharray: "5 4",
                  strokeWidth: 1,
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke={TEAL}
                strokeWidth={2}
                fill="url(#revenueGradient)"
                dot={false}
                activeDot={{
                  r: 6,
                  fill: "white",
                  stroke: TEAL,
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Box>
  );
}
