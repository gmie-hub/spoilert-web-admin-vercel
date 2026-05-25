import { useEffect, useState } from "react";

import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";

import "../App.css";
import AnalyticsAccordion from "./analyticsAccordion";
import PromotionsAccordion from "./promotionsAccordion";
import {
  type NavItem,
  analyticsSubItems,
  bottomItems,
  mainItems,
  promotionsSubItems,
  spoilPerformanceSubItems,
} from "./sidebarItems";
import SpoilPerformanceAccordion from "./spoilPerformanceAccordion";

const Sidebar = ({ hideLogo, onNavClick }: { hideLogo?: boolean; onNavClick?: () => void }) => {
  const location = useLocation();
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [spoilPerfOpen, setSpoilPerfOpen] = useState(false);
  const [promotionsOpen, setPromotionsOpen] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith("/analytics")) {
      setAnalyticsOpen(true);
    }
    if (location.pathname.startsWith("/analytics/spoil-performance")) {
      setSpoilPerfOpen(true);
    }
    if (location.pathname.startsWith("/promotions")) {
      setPromotionsOpen(true);
    }
  }, [location.pathname]);

  const renderNavItem = (item: NavItem) => (
    <NavLink
      key={item.key}
      to={item.to}
      onClick={onNavClick}
      className={({ isActive }) => (isActive ? "navLink active" : "navLink")}
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
  );

  const spoilPerfNode = (
    <SpoilPerformanceAccordion
      isOpen={spoilPerfOpen}
      onToggle={() => setSpoilPerfOpen((p) => !p)}
      subItems={spoilPerformanceSubItems}
      renderItem={renderNavItem}
    />
  );

  return (
    <Flex flexDir="column" h="100%">
      {!hideLogo && (
        <Box py="6" ps="4">
          <Text fontSize="xl" fontWeight="500">LOGO</Text>
        </Box>
      )}

      <Stack
        py="6"
        borderBlockStart="1px solid #efefef"
        borderInlineEnd="1px solid #efefef"
        overflowY="auto"
      >
        {mainItems.map(renderNavItem)}

        <AnalyticsAccordion
          isOpen={analyticsOpen}
          onToggle={() => setAnalyticsOpen((prev) => !prev)}
          subItems={analyticsSubItems}
          renderItem={renderNavItem}
          footer={spoilPerfNode}
        />

        <PromotionsAccordion
          isOpen={promotionsOpen}
          onToggle={() => setPromotionsOpen((prev) => !prev)}
          subItems={promotionsSubItems}
          renderItem={renderNavItem}
        />

        {bottomItems.map(renderNavItem)}
      </Stack>
    </Flex>
  );
};

export default Sidebar;
