import type { ReactNode } from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { HiChevronDown, HiOutlineChartBar } from "react-icons/hi";

import type { NavItem } from "./sidebarItems";

type Props = {
  isOpen: boolean;
  onToggle: () => void;
  subItems: NavItem[];
  renderItem: (item: NavItem) => ReactNode;
  footer?: ReactNode;
};

export default function AnalyticsAccordion({ isOpen, onToggle, subItems, renderItem, footer }: Props) {
  return (
    <Box>
      <HStack
        py="3"
        px="4"
        mx="3"
        gap="4"
        alignItems="center"
        color="gray.700"
        borderRadius="lg"
        cursor="pointer"
        onClick={onToggle}
        _hover={{
          transform: "scale(1.05)",
          transition: "transform 0.2s ease-in-out",
          bg: "blue.100",
          borderRadius: "lg",
          color: "#ffffff",
        }}
      >
        <Box>
          <HiOutlineChartBar size={20} />
        </Box>
        <Text flex="1" color="inherit">Analytics</Text>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <HiChevronDown size={16} />
        </motion.div>
      </HStack>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="analytics-submenu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            {subItems.map(renderItem)}
            {footer}
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
