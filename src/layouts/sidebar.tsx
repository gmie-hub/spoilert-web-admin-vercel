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
      label: "Overview",
      icon: <img src={Overview} alt="Overview" />,
      to: routes.main.dashboard
    },
    {
      key: "Learners",
      label: "Learners",
      icon: <img src={Learners} alt="Learners" />,
      to: routes.main.learners.home,
    },
    {
      key: "Tutors",
      label: "Tutors",
      icon: <img src={Tutors} alt="Tutors" />,
      to: routes.main.tutors.home,
    },
    {
      key: "Categories",
      label: "Categories",
      icon: <img src="/category.svg" alt="category" />,
      to: routes.main.categories.home,
    },
    {
      key: "Spoil Management",
      label: "Spoil Management",
      icon: <img src={Management} alt="Management" />,
      to: routes.main.spoilMgt.home
    },
    {
      key: "Sponsorships",
      label: "Sponsorships",
      icon: <img src={Sponsorships} alt="Sponsorships" />,
      to: routes.main.sponsorships.home
    },
    {
      key: "Withdrawal Requests",
      label: "Withdrawal Requests",
      icon: <img src={Withdrawal} alt="Withdrawal" />,
      to: routes.main.withdrawalRequest.home
    },
    {
      key: "Transactions",
      label: "Transactions",
      icon: <img src={Transactions} alt="Transactions" />,
      to: routes.main.transactions.home
    },
    {
      key: "Community",
      label: "Community",
      icon: <img src="/community.svg" alt="Community" />,
      to: routes.main.community.home,
    },
    {
      key: "Customer Support",
      label: "Customer Support",
      icon: <img src="/customer.svg" alt="CustomerSupport" />,
      to: routes.main.customerSupport.home,
    },
    {
      key: "Settings",
      icon: <img src={Settings} alt="Settings" />,
      label: "Settings",
      to: routes.main.settings.home,
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
        py="6"
        borderBlockStart="1px solid #efefef"
        borderInlineEnd="1px solid #efefef"
        color="#495057"
        overflowY="auto"
      >
        {items.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
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
                bg: "yellow",
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
    </Flex>
  );
};

export default Sidebar;
