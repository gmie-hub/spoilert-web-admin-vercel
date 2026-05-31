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
  CustomTooltip,
  FilterControls,
  type Interval,
  ORANGE,
  TEAL,
  formatLabel,
} from "./insightsFilters";

export default function UserInsights() {
  // Active Learners filter UI is currently disabled, so only the values are read.
  const [activeFrom] = useState("2026-04-30");
  const [activeTo] = useState("2026-05-31");
  const [activeInterval] = useState<Interval>("daily");

  const [signUpFrom, setSignUpFrom] = useState("2026-04-30");
  const [signUpTo, setSignUpTo] = useState("2026-05-31");
  // Sign Ups has no interval dropdown; value is fixed.
  const [signUpInterval] = useState<Interval>("daily");

  const {
    data: activeLearners,
    isLoading: isActiveLearnersLoading,
    isError: isActiveLearnersError,
    errorMessage: activeLearnersError,
  } = useGetActiveLearnersQuery({
    from: activeFrom,
    to: activeTo,
    interval: activeInterval,
  });

  const activeLearnerData =
    activeLearners?.graph?.map((point) => ({
      month: formatLabel(point.label),
      active: point.active_learners,
    })) ?? [];

  const {
    data: signupMethod,
    isLoading: isSignUpsLoading,
    isError: isSignUpsError,
    errorMessage: signUpsError,
  } = useGetSignupMethodQuery({
    from: signUpFrom,
    to: signUpTo,
    interval: signUpInterval,
  });

  const signUpData = signupMethod
    ? [
        { name: "WEB", value: signupMethod.overview.web },
        { name: "APP", value: signupMethod.overview.app },
      ]
    : [];

  return (
    <Box>
      <Text
        fontSize={{ base: "xl", md: "2xl" }}
        fontWeight="600"
        mb={{ base: 4, md: 6 }}
        color="#212529"
      >
        User Insights
      </Text>

      <Flex direction="column" gap={6}>
        {/* Active Learners */}
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
              Active Learners
            </Text>
            {/* <FilterControls
              from={activeFrom}
              to={activeTo}
              interval={activeInterval}
              onFromChange={setActiveFrom}
              onToChange={setActiveTo}
              onIntervalChange={setActiveInterval}
            /> */}
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
                <CartesianGrid strokeDasharray="" stroke="#f0f0f0" vertical={false} />
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
            mb={4}
            wrap="wrap"
            gap={3}
          >
            <Text fontSize="md" fontWeight="600" color="#212529">
              User Sign Ups
            </Text>
            <FilterControls
              from={signUpFrom}
              to={signUpTo} 
              // interval={signUpInterval}
              onFromChange={setSignUpFrom}
              onToChange={setSignUpTo}
              // onIntervalChange={setSignUpInterval}
            />
          </Flex>

          <Flex align="center" gap={5} mb={5}>
            <Flex align="center" gap={2}>
              <Box w="10px" h="10px" bg={TEAL} borderRadius="full" />
              <Text fontSize="sm" color="#495057">
                Web
              </Text>
            </Flex>
            <Flex align="center" gap={2}>
              <Box w="10px" h="10px" bg={ORANGE} borderRadius="full" />
              <Text fontSize="sm" color="#495057">
                App
              </Text>
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
                maxBarSize={180}
                barCategoryGap="20%"
                margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="" stroke="#f0f0f0" vertical={false} />
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
