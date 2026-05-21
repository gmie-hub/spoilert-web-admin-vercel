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

import { FilterSelect } from "../../components/filterControls";

const TEAL = "#013B4D";

const monthlyData = [
  { month: "Jan", value: 38, spoil: "Introduction to React" },
  { month: "Feb", value: 105, spoil: "JavaScript Fundamentals" },
  { month: "Mar", value: 48, spoil: "CSS Mastery" },
  { month: "Apr", value: 68, spoil: "Node.js Basics" },
  { month: "May", value: 38, spoil: "Python for Beginners" },
  { month: "Jun", value: 35, spoil: "Data Structures" },
  { month: "Jul", value: 82, spoil: "Basic Design Principles" },
  { month: "Aug", value: 28, spoil: "UX Writing" },
  { month: "Sep", value: 58, spoil: "TypeScript Deep Dive" },
  { month: "Oct", value: 85, spoil: "React Advanced Patterns" },
  { month: "Nov", value: 17, spoil: "GraphQL Basics" },
  { month: "Dec", value: 45, spoil: "Next.js Framework" },
];

const currentMonth = "Dec";
const periodOptions = ["Monthly", "Weekly", "Daily"];

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
}: {
  x?: number;
  y?: number;
  payload?: { value: string };
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
  const [period, setPeriod] = useState("Monthly");

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="600" mb={6} color="#212529">
        Spoil Performance
      </Text>

      <Box bg="white" p={6} borderRadius="xl" border="1px solid #efefef" boxShadow="sm">
        <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={3}>
          <Text fontSize="md" fontWeight="600" color="#212529">
            Best Performing Spoil Over Time
          </Text>
          <FilterSelect
            options={periodOptions}
            value={period}
            onChange={setPeriod}
          />
        </Flex>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={monthlyData}
            barSize={48}
            margin={{ top: 5, right: 20, left: -20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={<CustomXTick />}
              interval={0}
            />
            <YAxis
              domain={[0, 120]}
              ticks={[0, 20, 40, 60, 80, 100, 120]}
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
      </Box>
    </Box>
  );
}
