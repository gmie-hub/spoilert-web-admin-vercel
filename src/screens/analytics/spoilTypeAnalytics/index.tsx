import type { ElementType } from "react";
import { Box, Center, SimpleGrid, Text } from "@chakra-ui/react";
import {
  HiOutlineBookOpen,
  HiOutlineCollection,
} from "react-icons/hi";

type StatCard = {
  label: string;
  value: string;
  Icon: ElementType;
  iconBg: string;
  iconColor: string;
};

const stats: StatCard[] = [
  {
    label: "Total Spoils",
    value: "8,000",
    Icon: HiOutlineBookOpen,
    iconBg: "#FFF3E0",
    iconColor: "#F97316",
  },
  {
    label: "Total Simple Spoils",
    value: "5,000",
    Icon: HiOutlineBookOpen,
    iconBg: "#E0F7FA",
    iconColor: "#00ACC1",
  },
  {
    label: "Total Advanced Spoils",
    value: "3,000",
    Icon: HiOutlineCollection,
    iconBg: "#DBEAFE",
    iconColor: "#3B82F6",
  },
  {
    label: "No of Users Enrolled in Simple Spoil",
    value: "2,000",
    Icon: HiOutlineBookOpen,
    iconBg: "#FCE4EC",
    iconColor: "#E91E63",
  },
  {
    label: "No of Users Enrolled in Advanced Spoil",
    value: "1,500",
    Icon: HiOutlineCollection,
    iconBg: "#F3E5F5",
    iconColor: "#9C27B0",
  },
  {
    label: "Users currently taking Simple Spoil",
    value: "800",
    Icon: HiOutlineBookOpen,
    iconBg: "#EDE7F6",
    iconColor: "#7C3AED",
  },
  {
    label: "Users currently taking Advanced Spoil",
    value: "500",
    Icon: HiOutlineCollection,
    iconBg: "#CCFBF1",
    iconColor: "#0D9488",
  },
  {
    label: "Users Who Have Completed Simple Spoil",
    value: "1,200",
    Icon: HiOutlineBookOpen,
    iconBg: "#FCE7F3",
    iconColor: "#DB2777",
  },
  {
    label: "Users Who Have Completed Advanced Spoil",
    value: "1,000",
    Icon: HiOutlineCollection,
    iconBg: "#FEF9C3",
    iconColor: "#CA8A04",
  },
];

export default function SpoilTypeAnalytics() {
  return (
    <Box>
      <Text fontSize="2xl" fontWeight="600" mb={6} color="#212529">
        Spoil Type Analytics
      </Text>

      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={4}>
        {stats.map((stat) => (
          <Box
            key={stat.label}
            bg="white"
            p={5}
            borderRadius="xl"
            border="1px solid #f0f0f0"
            boxShadow="sm"
            display="flex"
            alignItems="center"
            gap={4}
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

            <Box>
              <Text fontSize="sm" color="#727171" fontWeight="400" mb="1">
                {stat.label}
              </Text>
              <Text fontSize="xl" fontWeight="700" color="#212529">
                {stat.value}
              </Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
