import { useState } from "react";

import { Box, Flex, Text } from "@chakra-ui/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useGetActiveLearnersQuery } from "@spt/hooks/api/useGetActiveLearnersQuery";
import { useGetSignupMethodQuery } from "@spt/hooks/api/useGetSignupMethodQuery";

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

  const {
    data: activeLearners,
    isLoading: isActiveLearnersLoading,
    isError: isActiveLearnersError,
    errorMessage: activeLearnersError,
  } = useGetActiveLearnersQuery();

  const activeLearnerData =
    activeLearners?.graph?.map((point) => ({
      month: formatMonthLabel(point.label),
      active: point.active_learners,
    })) ?? [];

  const {
    data: signupMethod,
    isLoading: isSignUpsLoading,
    isError: isSignUpsError,
    errorMessage: signUpsError,
  } = useGetSignupMethodQuery();

  const signUpData = signupMethod
    ? [
        { name: "WEB", value: signupMethod.overview.web },
        { name: "APP", value: signupMethod.overview.app },
      ]
    : [];

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

          {isActiveLearnersLoading ? (
            <Flex h="300px" align="center" justify="center">
              <Text fontSize="sm" color="#9ca3af">
                Loading…
              </Text>
            </Flex>
          ) : isActiveLearnersError ? (
            <Flex h="300px" align="center" justify="center">
              <Text fontSize="sm" color="red.500">
                {activeLearnersError}
              </Text>
            </Flex>
          ) : activeLearnerData.length === 0 ? (
            <Flex h="300px" align="center" justify="center">
              <Text fontSize="sm" color="#9ca3af">
                No data
              </Text>
            </Flex>
          ) : (
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
                  domain={[0, "auto"]}
                  allowDecimals={false}
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
          )}
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

          {isSignUpsLoading ? (
            <Flex h="300px" align="center" justify="center">
              <Text fontSize="sm" color="#9ca3af">
                Loading…
              </Text>
            </Flex>
          ) : isSignUpsError ? (
            <Flex h="300px" align="center" justify="center">
              <Text fontSize="sm" color="red.500">
                {signUpsError}
              </Text>
            </Flex>
          ) : signUpData.length === 0 ? (
            <Flex h="300px" align="center" justify="center">
              <Text fontSize="sm" color="#9ca3af">
                No data
              </Text>
            </Flex>
          ) : (
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
                  domain={[0, "auto"]}
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  <Cell fill={TEAL} />
                  <Cell fill={ORANGE} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
