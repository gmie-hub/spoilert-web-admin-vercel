import { useMemo, useState } from "react";

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

import { useGetBestPerformingQuery } from "@spt/hooks/api/useGetBestPerformingQuery";

import { FilterSelect } from "../../components/filterControls";

const TEAL = "#013B4D";

// Turns a "YYYY-MM" bucket into a short readable label e.g. "Aug 25".
const formatMonthLabel = (label: string) => {
  const [year, month] = label.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  if (Number.isNaN(date.getTime())) return label;
  return `${date.toLocaleString("en-US", { month: "short" })} ${year.slice(2)}`;
};

type Interval = "monthly" | "weekly" | "daily";
const intervalOptions: Interval[] = ["monthly", "weekly", "daily"];

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { value: number; payload: { spoil: string } }[];
}) => {
  if (!active || !payload?.length) return null;
  return (
    <Box
      bg={TEAL}
      color="white"
      px="3"
      py="2"
      borderRadius="md"
      maxW="130px"
      textAlign="center"
      boxShadow="md"
    >
      <Text fontSize="xs" lineHeight="1.4">{payload[0].payload.spoil}</Text>
    </Box>
  );
};

const CustomXTick = ({
  x,
  y,
  payload,
  currentMonth,
}: {
  x?: number;
  y?: number;
  payload?: { value: string };
  currentMonth?: string;
}) => {
  const isCurrent = payload?.value === currentMonth;
  return (
    <text
      x={x}
      y={(y ?? 0) + 16}
      textAnchor="middle"
      fill="#9ca3af"
      fontSize={isCurrent ? 16 : 12}
      fontWeight={isCurrent ? "700" : "400"}
    >
      {payload?.value}
    </text>
  );
};

export default function SpoilOverTime() {
  const [interval, setInterval] = useState<Interval>("monthly");

  const { data, isLoading, isError, errorMessage } = useGetBestPerformingQuery({
    interval,
  });

  // The graph holds one row per (month, spoil); for each month keep only the
  // top-performing spoil, then sort the months chronologically.
  const monthlyData = useMemo(() => {
    const byMonth = new Map<
      string,
      { label: string; spoil_name: string; total_enrollments: number }
    >();

    for (const point of data?.graph ?? []) {
      const existing = byMonth.get(point.label);
      if (!existing || point.total_enrollments > existing.total_enrollments) {
        byMonth.set(point.label, point);
      }
    }

    return Array.from(byMonth.values())
      .sort((a, b) => a.label.localeCompare(b.label))
      .map((point) => ({
        month: formatMonthLabel(point.label),
        value: point.total_enrollments,
        spoil: point.spoil_name,
      }));
  }, [data]);

  const currentMonth = monthlyData[monthlyData.length - 1]?.month;

  return (
    <Box>
      <Text
        fontSize={{ base: "xl", md: "2xl" }}
        fontWeight="600"
        mb={{ base: 4, md: 6 }}
        color="#212529"
      >
        Spoil Performance
      </Text>

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
            Best Performing Spoil Over Time
          </Text>
          <FilterSelect
            options={intervalOptions}
            value={interval}
            onChange={(value) => setInterval(value as Interval)}
          />
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
            <BarChart
              data={monthlyData}
              maxBarSize={48}
              barCategoryGap="20%"
              margin={{ top: 5, right: 20, left: -20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="" stroke="#f0f0f0" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={<CustomXTick currentMonth={currentMonth} />}
                interval="preserveStartEnd"
                minTickGap={12}
              />
              <YAxis
                domain={[0, "auto"]}
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(1,59,77,0.08)" }} />
              <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                {monthlyData.map((entry) => (
                  <Cell key={entry.month} fill={TEAL} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Box>
  );
}
