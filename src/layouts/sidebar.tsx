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
      label: <NavLink to={routes.dashboard}>Overview</NavLink>,
      icon: <img src={Overview} alt="Overview" />,
    },
    {
      key: "Learners",
      label: "Learners",
      icon: <img src={Learners} alt="Learners" />,
    },
    {
      key: "Tutors",
      label: "Tutors",
      icon: <img src={Tutors} alt="Tutors" />,
    },
    {
      key: "Spoil Management",
      label: "Spoil Management",
      icon: <img src={Management} alt="Management" />,
    },
    {
      key: "Sponsorships",
      label: "Sponsorships",
      icon: <img src={Sponsorships} alt="Sponsorships" />,
    },
    {
      key: "Withdrawal Requests",
      label: "Withdrawal Requests",
      icon: <img src={Withdrawal} alt="Withdrawal" />,
    },
    {
      key: "Transactions",
      label: "Transactions",
      icon: <img src={Transactions} alt="Transactions" />,
    },
    {
      key: "Settings",
      icon: <img src={Settings} alt="Settings" />,
      label: <NavLink to={routes.transactions.transactions}>Settings</NavLink>,
    },
  ];

  return (
    <Flex flexDir="column" h="100%">
      <Box py="6">
        <Text fontSize="xl">LOGO</Text>
      </Box>

      <Stack
        ms="8"
        pt="10"
        gap="6"
        borderBlockStart="1px solid #efefef"
        borderInlineEnd="1px solid #efefef"
        overflowY="auto"
      >
        {items.map((items, index) => (
          <HStack key={index}>
            <Box>{items.icon}</Box>
            <Text fontSize="md">{items.label}</Text>
          </HStack>
        ))}
      </Stack>
    </Flex>
  );
};

export default Sidebar;
