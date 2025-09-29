import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import Management from "../assets/book.svg";
import Overview from "../assets/category.svg";
// import Sponsorships from "../assets/discount-circle.svg";
import Withdrawal from "../assets/moneys.svg";
import Learners from "../assets/people2.svg";
import Tutors from "../assets/profile-2user.svg";
import Settings from "../assets/setting-2.svg";
import Transactions from "../assets/wallet-3.svg";
import { routes } from "../routes";
import "../App.css";



const Sidebar = () => {
  const items = [
    {
      key: "Overview",
      label: "Overview",
      icon: <img src={Overview} alt="Overview" />,
      to: routes.main.dashboard,
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
      key: "Spoil Review",
      label: "Spoil Review",
      icon: <img src="/spoil.svg" alt="review" />,
      to: routes.main.spoilReview.home
    },
    {
      key: "Spoil Management",
      label: "Spoil Management",
      icon: <img src={Management} alt="Management" />,
      to: routes.main.spoilMgt.home
    },
    {
      key: "Pending Verifications",
      label: "Pending Verifications",
      icon: <img src="/verify.svg" alt="Management" />,
      to: routes.main.pendingVerification.home,
    },
    // {
    //   key: "Sponsorships",
    //   label: "Sponsorships",
    //   icon: <img src={Sponsorships} alt="Sponsorships" />,
    //   // to: routes.main.sponsorships.home
    // },
    {
      key: "Promotions",
      label: "Promotions ",
      icon: <img src={Withdrawal} alt="Promotions" />,
      to: routes.main.promotions.home,
    },
    {
      key: "PromotionsManagement",
      label: "Promotions Management",
      icon: <img src={Withdrawal} alt="PromotionsManagement" />,
      to: routes.main.promotions.promotionsManagement,
    },


    {
      key: "Withdrawal Requests",
      label: "Withdrawal Requests",
      icon: <img src={Withdrawal} alt="Withdrawal" />,
      to: routes.main.withdrawalRequest.home,
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
        overflowY="auto"
      >
        {items.map((item) => (
          <NavLink
            key={item.key}
            to={item.to}
            className={({ isActive }) =>
              isActive ? "navLink active" : "navLink"
            }
          >
            {({ isActive }) => (
              <HStack
                py="3"
                px="4"
                mx="3"
                gap="4"
                alignItems="center"
                bg={isActive ? "blue.100" : "transparent"}
                color={isActive ? "white" : "gray.700"}
                borderRadius="lg"
                _hover={{
                  transform: "scale(1.05)",
                  transition: "transform 0.2s ease-in-out",
                  bg: "blue.100",
                  borderRadius: "lg",
                  color: "#ffffff",
                  fill: "white",
                }}
              >
                <Box filter={isActive ? "brightness(0) invert(1)" : "none"}>
                  {item.icon}
                </Box>
                {item.label}
              </HStack>
            )}
          </NavLink>
        ))}
      </Stack>
    </Flex>
  );
};

export default Sidebar;
