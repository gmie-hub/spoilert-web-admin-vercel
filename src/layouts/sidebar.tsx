import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import Management from "../assets/book.svg";
import Overview from "../assets/category.svg";
import Sponsorships from "../assets/discount-circle.svg";
import Withdrawal from "../assets/moneys.svg";
import Learners from "../assets/people2.svg";
import Tutors from "../assets/profile-2user.svg";
import Settings from "../assets/setting-2.svg";
import Transactions from "../assets/wallet-3.svg";
import { routes } from "../routes";

const Sidebar = () => {
  const items = [
    {
      key: "Overview",
      label: <NavLink to={routes.main.dashboard}>Overview</NavLink>,
      icon: <img src={Overview} alt="Overview" />,
    },
    {
      key: "Learners",
      label: <NavLink to={routes.main.learners}>Learners</NavLink>,
      icon: <img src={Learners} alt="Learners" />,
    },
    {
      key: "Tutors",
      label: <NavLink to={routes.main.tutors}>Tutors</NavLink>,
      icon: <img src={Tutors} alt="Tutors" />,
    },
    {
      key: "Categories",
      label: <NavLink to={routes.main.categories}>Categories</NavLink>,
      icon: <img src="/category.svg" alt="category" />,
    },
    {
      key: "Spoil Management",
      label: <NavLink to={routes.main.spoilMgt}>Spoil Management</NavLink>,
      icon: <img src={Management} alt="Management" />,
    },
    {
      key: "Sponsorships",
      label: <NavLink to={routes.main.sponsorships}>Sponsorships</NavLink>,
      icon: <img src={Sponsorships} alt="Sponsorships" />,
    },
    {
      key: "Withdrawal Requests",
      label: <NavLink to={routes.main.withdrawalRequest}>Withdrawal Requests</NavLink>,
      icon: <img src={Withdrawal} alt="Withdrawal" />,
    },
    {
      key: "Transactions",
      label: <NavLink to={routes.main.transactions}>Transactions</NavLink>,
      icon: <img src={Transactions} alt="Transactions" />,
    },
    {
      key: "Community",
      label: "Community",
      icon: <img src="/community.svg" alt="Community" />,
    },
    {
      key: "Customer Support",
      label: "Customer Support",
      icon: <img src="/customer.svg" alt="CustomerSupport" />,
    },
    {
      key: "Settings",
      icon: <img src={Settings} alt="Settings" />,
      label: <NavLink to={routes.main.settings}>Settings</NavLink>,
    },
  ];

  return (
    <Flex flexDir="column" h="100%">
      <Box py="6" ps="4">
        <Text fontSize="xl" fontWeight="500">
          LOGO
        </Text>
      </Box>
      <Stack
        pt="10"
        borderBlockStart="1px solid #efefef"
        borderInlineEnd="1px solid #efefef"
        color="#495057"
        overflowY="auto"
      >
        {items.map((item, index) => (
          <NavLink
            key={index}
            to={routes.main[item.key.toLowerCase().replace(/\s/g, "")] || "#"}
            style={{ textDecoration: "none", width: "100%" }}
          >
            <HStack
              py="3"
              px="4"
              mx="3"
              gap="4"
              alignItems="center"
              _hover={{
                transform: "scale(1.05)",
                transition: "transform 0.2s ease-in-out",
                bg: "#D4A437",
                borderRadius: "lg",
                color: "white",
              }}
            >
              <Box>{item.icon}</Box>
              <Text fontSize="md">{item.label}</Text>
            </HStack>
          </NavLink>
        ))}
      </Stack>

      {/* 
      <Stack
        pt="10"
        borderBlockStart="1px solid #efefef"
        borderInlineEnd="1px solid #efefef"
        color="#495057"
        overflowY="auto"
      >
        {items.map((items, index) => (
          <HStack
            key={index}
            py="3"
            px="4"
            mx="3"
            gap="4"
            alignItems="center"
            _hover={{
              transform: "scale(1.05)",
              transition: "transform 0.2s ease-in-out",
              bg: "#D4A437",
              borderRadius: "lg",
              color: "white",
            }}
          >
            <Box>{items.icon}</Box>
            <Text fontSize="md">{items.label}</Text>
          </HStack>
        ))}
      </Stack> */}
    </Flex>
  );
};

export default Sidebar;
