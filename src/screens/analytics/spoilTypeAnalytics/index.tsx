import type { ElementType } from "react";

import { Box, Center, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import {
  HiOutlineBookOpen,
  HiOutlineCollection,
} from "react-icons/hi";

import { useGetSpoilTypeQuery } from "@spt/hooks/api/useGetSpoilTypeQuery";
import type { SpoilTypeData } from "@spt/types/analytics";

type StatCard = {
  label: string;
  Icon: ElementType;
  iconBg: string;
  iconColor: string;
  getValue: (d: SpoilTypeData) => number;
};

const stats: StatCard[] = [
  {
    label: "Total Spoils",
    Icon: HiOutlineBookOpen,
    iconBg: "#FFF3E0",
    iconColor: "#F97316",
    getValue: (d) => d.totalSimpleSpoils + d.totalAdvancedSpoils,
  },
  {
    label: "Total Simple Spoils",
    Icon: HiOutlineBookOpen,
    iconBg: "#E0F7FA",
    iconColor: "#00ACC1",
    getValue: (d) => d.totalSimpleSpoils,
  },
  {
    label: "Total Advanced Spoils",
    Icon: HiOutlineCollection,
    iconBg: "#DBEAFE",
    iconColor: "#3B82F6",
    getValue: (d) => d.totalAdvancedSpoils,
  },
  {
    label: "No of Users Enrolled in Simple Spoil",
    Icon: HiOutlineBookOpen,
    iconBg: "#FCE4EC",
    iconColor: "#E91E63",
    getValue: (d) => d.enrolledSimpleUsers,
  },
  {
    label: "No of Users Enrolled in Advanced Spoil",
    Icon: HiOutlineCollection,
    iconBg: "#F3E5F5",
    iconColor: "#9C27B0",
    getValue: (d) => d.enrolledAdvancedUsers,
  },
  {
    label: "Users currently taking Simple Spoil",
    Icon: HiOutlineBookOpen,
    iconBg: "#EDE7F6",
    iconColor: "#7C3AED",
    getValue: (d) => d.ongoingSimpleUsers,
  },
  {
    label: "Users currently taking Advanced Spoil",
    Icon: HiOutlineCollection,
    iconBg: "#CCFBF1",
    iconColor: "#0D9488",
    getValue: (d) => d.ongoingAdvancedUsers,
  },
  {
    label: "Users Who Have Completed Simple Spoil",
    Icon: HiOutlineBookOpen,
    iconBg: "#FCE7F3",
    iconColor: "#DB2777",
    getValue: (d) => d.completedSimpleUsers,
  },
  {
    label: "Users Who Have Completed Advanced Spoil",
    Icon: HiOutlineCollection,
    iconBg: "#FEF9C3",
    iconColor: "#CA8A04",
    getValue: (d) => d.completedAdvancedUsers,
  },
];

export default function SpoilTypeAnalytics() {
  const { data, isLoading, isError, errorMessage } = useGetSpoilTypeQuery();

  return (
    <Box>
      <Text
        fontSize={{ base: "xl", md: "2xl" }}
        fontWeight="600"
        mb={{ base: 4, md: 6 }}
        color="#212529"
      >
        Spoil Type Analytics
      </Text>

      {isLoading ? (
        <Flex h="200px" align="center" justify="center">
          <Text fontSize="sm" color="#9ca3af">
            Loading…
          </Text>
        </Flex>
      ) : isError ? (
        <Flex h="200px" align="center" justify="center">
          <Text fontSize="sm" color="red.500">
            {errorMessage}
          </Text>
        </Flex>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={4}>
          {stats.map((stat) => (
            <Box
              key={stat.label}
              bg="white"
              p={{ base: 4, md: 5 }}
              borderRadius="xl"
              border="1px solid #f0f0f0"
              boxShadow="sm"
              display="flex"
              alignItems="center"
              gap={4}
              minW="0"
            >
              <Center
                w="46px"
                h="46px"
                borderRadius="full"
                bg={stat.iconBg}
                flexShrink={0}
              >
                <stat.Icon size={22} color={stat.iconColor} />
              </Center>

              <Box minW="0">
                <Text fontSize="sm" color="#727171" fontWeight="400" mb="1">
                  {stat.label}
                </Text>
                <Text fontSize="xl" fontWeight="700" color="#212529">
                  {data ? stat.getValue(data).toLocaleString() : "—"}
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
